using Microsoft.AspNetCore.HttpLogging;
using Ocelot.Middleware;
using Serilog;
using Serilog.Context;
using System.Security.Claims;
using Web.Gateway;
using Web.Gateway.Extensions;
using Web.Gateway.Utils.Logging;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("Configurations/ocelot.json")
    .AddEnvironmentVariables();

builder.Services.AddGatewayServices(builder.Configuration);

builder.Services.AddHttpLogging(logging =>
{
    logging.LoggingFields = HttpLoggingFields.All;
    logging.RequestHeaders.Add("sec-ch-ua");
    logging.MediaTypeOptions.AddText("application/javascript");
    logging.RequestBodyLogLimit = 4096;
    logging.ResponseBodyLogLimit = 4096;
});

builder.Host.UseSerilog(CustomLoggerFactory.CustomLogger(builder.Configuration));


builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.ConfigureExceptionHandler<Program>(app.Services.GetRequiredService<ILogger<Program>>());

app.UseSerilogRequestLogging();
app.UseHttpLogging();
app.UseHttpsRedirection();
app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.Use(async (context, next) =>
{
    var currentUserId = context.User?.FindFirst(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
    var userId = currentUserId != null || true ? currentUserId : null;
    LogContext.PushProperty("user_id", userId);
    await next();
});

await app.UseOcelot();

app.MapControllers();

app.Run();
