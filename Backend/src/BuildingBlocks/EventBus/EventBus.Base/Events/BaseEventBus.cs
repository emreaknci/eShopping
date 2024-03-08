using EventBus.Base.Abstraction;
using EventBus.Base.SubManagers;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;


namespace EventBus.Base.Events
{
    public abstract class BaseEventBus : IEventBus
    {
        public readonly IServiceProvider ServiceProvider;
        public readonly IEventBusSubscriptionManager SubManager;

        private EventBusConfig _config;
        public BaseEventBus(EventBusConfig config, IServiceProvider serviceProvider)
        {
            _config = config;
            ServiceProvider = serviceProvider;
            SubManager = new InMemoryEventBusSubscriptionManager(ProcessEventName);
        }

        public virtual string ProcessEventName(string eventName)
        {
            if (_config.DeleteEventPrefix)
                return eventName.TrimStart(_config.EventNamePrefix.ToArray());
            if (_config.DeleteEventSuffix)
                return eventName.TrimEnd(_config.EventNameSuffix.ToArray());

            return eventName;
        }
        public virtual string GetSubName(string eventName)
        {
            return $"{_config.SubscriberClientAppName}.{ProcessEventName(eventName)}";

        }
        public virtual void Dispose()
        {
            _config = null;
        }
        public async Task<bool> ProcessEvent(string eventName, string message)
        {
            eventName = ProcessEventName(eventName);

            var processed = false;

            if (SubManager.HasSubscriptionsForEvent(eventName))
            {
                var subscriptions = SubManager.GetHandlersForEvent(eventName);
                using var scope = ServiceProvider.CreateScope();
                foreach (var subscription in subscriptions)
                {
                    var handler = ServiceProvider.GetService(subscription.HandlerType);
                    if (handler == null) continue;

                    var eventType = SubManager.GetEventTypeByName($"{_config.EventNamePrefix}{eventName}{_config.EventNameSuffix}");
                    var integrationEvent = JsonConvert.DeserializeObject(message, eventType);

                    var concreteType = typeof(IIntegrationEventHandler<>).MakeGenericType(eventType);
                    await (Task)concreteType.GetMethod("Handle").Invoke(handler, new object[] { integrationEvent });
                }
                processed = true;

            }
            return processed;
        }

        public abstract void Publish(IntegrationEvent @event);


        public abstract void Subscribe<T, TH>()
            where T : IntegrationEvent
            where TH : IIntegrationEventHandler<T>;

        public abstract void Unsubscribe<T, TH>()
            where T : IntegrationEvent
            where TH : IIntegrationEventHandler<T>;
    }
}
