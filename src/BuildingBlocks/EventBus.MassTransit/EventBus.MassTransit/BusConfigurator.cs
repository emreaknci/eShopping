using MassTransit;

namespace EventBus.MassTransit
{
    public class BusConfigurator
    {
        public static IBusControl ConfigureBus(Action<IRabbitMqBusFactoryConfigurator> registrationAction = null)
        {
            return Bus.Factory.CreateUsingRabbitMq(configuration =>
            {
                configuration.Host(EventBusConstants.Uri, hostConfiguration =>
                {
                    hostConfiguration.Username(EventBusConstants.Username);
                    hostConfiguration.Password(EventBusConstants.Password);
                });

                registrationAction?.Invoke(configuration);
            });
        }
    }
}
