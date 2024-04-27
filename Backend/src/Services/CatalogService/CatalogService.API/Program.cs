using CatalogService.API;
using CatalogService.API.Context;
using CatalogService.API.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCatalogServices(builder.Configuration);

var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseStaticFiles();
app.MapControllers();

app.MigrateDbContext<CatalogDbContext>((context, services) =>
{
    var logger = services.GetService<ILogger<CatalogDbContext>>();
    var dbContextSeeder = new CatalogDbContextSeed();
    dbContextSeeder.SeedAsync(context, logger)
        .Wait();
});

app.Start();

app.RegisterWithConsul();

app.WaitForShutdown();


