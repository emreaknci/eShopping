using Polly;
using RabbitMQ.Client.Events;
using RabbitMQ.Client.Exceptions;
using RabbitMQ.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Threading.Tasks;

namespace EventBus.RabbitMQ
{
    public class RabbitMQPersistentConnection : IDisposable
    {
        private IConnection connection;
        private readonly IConnectionFactory _connectionFactory;
        private readonly int _retryCount;
        private object lockObject = new object();
        private bool _disposed;
        public bool IsConnected => connection != null && connection.IsOpen;


        public RabbitMQPersistentConnection(IConnectionFactory connectionFactory, int retryCount = 5)
        {
            _connectionFactory = connectionFactory;
            _retryCount = retryCount;
        }
        public IModel CreateModel() => connection.CreateModel();

        public void Dispose()
        {
            _disposed = true;
            connection.Dispose();
        }

        public bool TryConnect()
        {
            lock (lockObject)
            {
                var policy = Policy
                    .Handle<Exception>(ex => { return ex is SocketException || ex is BrokerUnreachableException; })
                    .WaitAndRetry(_retryCount, retryAttempt => TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)), (ex, time) =>
                    {
                        Console.WriteLine(ex.ToString());
                    });


                policy.Execute(() =>
                {
                    connection = _connectionFactory.CreateConnection();
                });

                if (IsConnected)
                {
                    connection.ConnectionShutdown += Connection_ConnectionShutdown;
                    connection.CallbackException += Connection_CallbackException;
                    connection.ConnectionBlocked += Connection_ConnectionBlocked;
                    return true;
                }
                return false;
            }
        }

        private void Connection_ConnectionBlocked(object? sender, ConnectionBlockedEventArgs e)
        {
            if (_disposed) return;
            TryConnect();
        }

        private void Connection_CallbackException(object? sender, CallbackExceptionEventArgs e)
        {
            if (_disposed) return;

            TryConnect();
        }

        private void Connection_ConnectionShutdown(object? sender, ShutdownEventArgs e)
        {
            if (_disposed) return;

            TryConnect();
        }
    }
}
