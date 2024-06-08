using Serilog.Sinks.PostgreSQL;
using Serilog;
using Web.Gateway.Configurations;

namespace Web.Gateway.Utils.Logging
{
    public static class CustomLoggerFactory
    {
        public static Serilog.Core.Logger CustomLogger(IConfiguration configuration)
        {
            var log = new LoggerConfiguration()
              .WriteTo.Console()
              .WriteTo.File("logs/log.txt")
              .WriteTo.PostgreSQL(configuration.GetConnectionString("PostgreSQL"), "logs", needAutoCreateTable: true, columnOptions: new Dictionary<string, ColumnWriterBase>()
              {
                {"message",new RenderedMessageColumnWriter()},
                {"message_template",new MessageTemplateColumnWriter()},
                {"level",new LevelColumnWriter()},
                {"time_stamp",new TimestampColumnWriter()},
                {"exception",new ExceptionColumnWriter()},
                {"log_event",new LogEventSerializedColumnWriter()},
                {"user_id", new UserIdColumnWriter() }
              }).WriteTo.Seq(configuration["Seq:ServerURL"])
              .Enrich.FromLogContext()
              .MinimumLevel.Information()
              .CreateLogger();


            return log;
        }
    }
}
