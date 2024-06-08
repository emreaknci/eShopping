using NpgsqlTypes;
using Serilog.Events;
using Serilog.Sinks.PostgreSQL;

namespace Web.Gateway.Configurations
{
    public class UserIdColumnWriter : ColumnWriterBase
    {
        public UserIdColumnWriter() : base(NpgsqlDbType.Varchar)
        {
        }

        public override object GetValue(LogEvent logEvent, IFormatProvider formatProvider = null)
        {
            var (username, value) = logEvent.Properties.FirstOrDefault(p => p.Key == "user_id");
            return value?.ToString() ?? null;
        }
    }
}
