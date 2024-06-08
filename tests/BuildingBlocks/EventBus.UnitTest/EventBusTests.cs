using EventBus.UnitTest.Events.EventHandlers;
using EventBus.UnitTest.Events.Events;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace EventBus.UnitTest
{
    public class EventBusTests
    {

        private ServiceCollection services;

        public EventBusTests()
        {
            services = new ServiceCollection();

            services.AddLogging(configure => configure.AddConsole());
        }

        [Fact]
        public void Subscribe_Event_On_RabbitMQ_Test()
        {
            services.AddSingleton<IEventBus>(sp =>
            {
                return EventBusFactory.Create(GetRabbitMQConfig(), sp);
            });
            var sp = services.BuildServiceProvider();

            var eventBus = sp.GetRequiredService<IEventBus>();

            eventBus.Subscribe<OrderCreatedIntegrationEvent, OrderCreatedIntegrationEventHandler>();
            eventBus.Unsubscribe<OrderCreatedIntegrationEvent, OrderCreatedIntegrationEventHandler>();
        }
        [Fact]
        public void Subscribe_Event_On_Azure_Test()
        {
            services.AddSingleton<IEventBus>(sp =>
            {
                return EventBusFactory.Create(GetAzureConfig(), sp);
            });
            var sp = services.BuildServiceProvider();

            var eventBus = sp.GetRequiredService<IEventBus>();

            eventBus.Subscribe<OrderCreatedIntegrationEvent, OrderCreatedIntegrationEventHandler>();
            eventBus.Unsubscribe<OrderCreatedIntegrationEvent, OrderCreatedIntegrationEventHandler>();
        }

        [Fact]
        public void Send_Message_To_RabbitMQ_Test()
        {
            services.AddSingleton<IEventBus>(sp =>
            {
                return EventBusFactory.Create(GetRabbitMQConfig(), sp);
            });
            var sp = services.BuildServiceProvider();

            var eventBus = sp.GetRequiredService<IEventBus>();

            eventBus.Publish(new OrderCreatedIntegrationEvent(1));
        }
        [Fact]
        public void Send_Message_To_Azure_Test()
        {
            services.AddSingleton<IEventBus>(sp =>
            {
                return EventBusFactory.Create(GetAzureConfig(), sp);
            });
            var sp = services.BuildServiceProvider();

            var eventBus = sp.GetRequiredService<IEventBus>();

            eventBus.Publish(new OrderCreatedIntegrationEvent(1));
        }

        private EventBusConfig GetAzureConfig()
        {
            return new EventBusConfig
            {
                ConnectionRetryCount = 5,
                SubscriberClientAppName = "EventBus.UnitTest",
                DefaultTopicName = "eShoppingTopicName",
                EventBusType = EventBusType.AzureServiceBus,
                EventNameSuffix = "IntegrationEvent",
                EventBusConnectionString = "Endpoint=sb://eshopping.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=xxx"
            };
        }

        private EventBusConfig GetRabbitMQConfig()
        {
            return new EventBusConfig
            {
                ConnectionRetryCount = 5,
                SubscriberClientAppName = "EventBus.UnitTest",
                DefaultTopicName = "eShoppingTopicName",
                EventBusType = EventBusType.RabbitMQ,
                EventNameSuffix = "IntegrationEvent",
                //Connection=new ConnectionFactory()
                //{
                //    HostName="localhost",
                //    Port=5672,
                //    UserName="guest",
                //    Password="guest",
                //}
            };
        }
    }

}