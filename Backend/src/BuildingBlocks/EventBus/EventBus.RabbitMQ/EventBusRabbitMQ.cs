using EventBus.Base.Events;
using EventBus.Base;
using Newtonsoft.Json;
using Polly;
using RabbitMQ.Client.Events;
using RabbitMQ.Client.Exceptions;
using RabbitMQ.Client;
using System.Net.Sockets;
using System.Text;

namespace EventBus.RabbitMQ
{
    public class EventBusRabbitMQ : BaseEventBus
    {
        private RabbitMQPersistentConnection _persistentConnection;
        private readonly IConnectionFactory _connectionFactory;
        private readonly IModel _consumerChannel;

        public EventBusRabbitMQ(EventBusConfig config, IServiceProvider serviceProvider) : base(config, serviceProvider)
        {
            if (config.Connection != null)
            {
                var connJson = JsonConvert.SerializeObject(EventBusConfig, new JsonSerializerSettings()
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });

                _connectionFactory = JsonConvert.DeserializeObject<IConnectionFactory>(connJson);

            }
            else
            {
                _connectionFactory = new ConnectionFactory()
                {
                    HostName = "localhost",
                    UserName = "guest",
                    Password = "guest"
                };
            }
            _persistentConnection = new RabbitMQPersistentConnection(_connectionFactory, config.ConnectionRetryCount);
            _consumerChannel = CreateConsumerChannel();

            SubManager.OnEventRemoved += SubManager_OnEventRemoved;
        }



        public override void Publish(IntegrationEvent @event)
        {
            if (!_persistentConnection.IsConnected)
            {
                _persistentConnection.TryConnect();
            }
            var policy = Policy.Handle<BrokerUnreachableException>()
                .Or<SocketException>()
                .WaitAndRetry(EventBusConfig.ConnectionRetryCount, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)), (ex, time) =>
                {
                    //log
                });
            var eventName = @event.GetType().Name;
            eventName = ProcessEventName(eventName);

            _consumerChannel.ExchangeDeclare(exchange: EventBusConfig.DefaultTopicName, type: "direct");



            var message = JsonConvert.SerializeObject(@event);
            var body = Encoding.UTF8.GetBytes(message);

            policy.Execute(() =>
            {
                var properties = _consumerChannel.CreateBasicProperties();
                properties.DeliveryMode = 2; // persistent
                //_consumerChannel.QueueDeclare(
                //    queue: GetSubName(eventName),
                //    durable: true,
                //    exclusive: false,
                //    autoDelete: false,
                //    arguments: null);

                //_consumerChannel.QueueBind(queue: GetSubName(eventName),
                //                     exchange: EventBusConfig.DefaultTopicName,
                //                     routingKey: eventName);

                _consumerChannel.BasicPublish(
                    exchange: EventBusConfig.DefaultTopicName,
                    routingKey: eventName,
                    mandatory: true,
                    basicProperties: properties,
                    body: body);
            });
        }

        public override void Subscribe<T, TH>()
        {
            var eventName = typeof(T).Name;
            eventName = ProcessEventName(eventName);

            if (!SubManager.HasSubscriptionsForEvent(eventName))
            {
                if (!_persistentConnection.IsConnected)
                {
                    _persistentConnection.TryConnect();
                }
                _consumerChannel.QueueDeclare(queue: GetSubName(eventName),
                                      durable: true,
                                      exclusive: false,
                                      autoDelete: false,
                                      arguments: null);

                _consumerChannel.QueueBind(queue: GetSubName(eventName),
                                      exchange: EventBusConfig.DefaultTopicName,
                                      routingKey: eventName);
            }

            SubManager.AddSubscription<T, TH>();
            StartBasicConsume(eventName);
        }

        public override void Unsubscribe<T, TH>()
        {
            SubManager.RemoveSubscription<T, TH>();
        }

        private IModel CreateConsumerChannel()
        {
            if (!_persistentConnection.IsConnected)
            {
                _persistentConnection.TryConnect();
            }

            var channel = _persistentConnection.CreateModel();

            channel.ExchangeDeclare(exchange: EventBusConfig.DefaultTopicName, type: "direct");

            return channel;
        }

        private void StartBasicConsume(string eventName)
        {
            if (_consumerChannel != null)
            {
                var consumer = new EventingBasicConsumer(_consumerChannel);
                consumer.Received += Consumer_Received;
                _consumerChannel.BasicConsume(queue: GetSubName(eventName),
                                              autoAck: true,
                                              consumer: consumer);
            }
        }

        private async void Consumer_Received(object? sender, BasicDeliverEventArgs e)
        {
            var eventName = e.RoutingKey;
            eventName = ProcessEventName(eventName);
            var message = Encoding.UTF8.GetString(e.Body.Span);
            try
            {
                await ProcessEvent(eventName, message);
            }
            catch
            {
                //log
            }

            _consumerChannel.BasicAck(e.DeliveryTag, multiple: false);
        }
        private void SubManager_OnEventRemoved(object? sender, string eventName)
        {
            eventName = ProcessEventName(eventName);

            if (!_persistentConnection.IsConnected)
            {
                _persistentConnection.TryConnect();
            }

            _consumerChannel.QueueUnbind(queue: GetSubName(eventName),
                exchange: EventBusConfig.DefaultTopicName,
                routingKey: eventName);

            if (SubManager.IsEmpty)
            {
                _consumerChannel.Close();
            }
        }
    }
}
