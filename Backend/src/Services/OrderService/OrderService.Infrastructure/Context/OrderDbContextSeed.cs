using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Npgsql;
using OrderService.Domain.AggregateModels.BuyerAggregate;
using OrderService.Domain.AggregateModels.OrderAggregate;
using OrderService.Domain.SeedWork;
using Polly;
using Polly.Retry;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderService.Infrastructure.Context
{
    public class OrderDbContextSeed
    {


        //private IEnumerable<OrderStatus> orderStatuses= new List<OrderStatus>()
        //{

        //}

        public async Task SeedAsync(OrderDbContext context, ILogger<OrderDbContext> logger)
        {
            var policy = CreatePolicy(logger, nameof(OrderDbContextSeed));

            await policy.ExecuteAsync(async () =>
            {
                context.Database.Migrate();

                var useCustomizationData = false;
                var contentRootPath = "Seeding/Setup";

                if (!context.CardTypes.Any())
                {
                    var cardTypes = useCustomizationData
                                    ? GetCardTypesFromFile(contentRootPath, logger)
                                    : GetPredefinedCardTypes();

                    context.CardTypes.AddRange(cardTypes);
                    await context.SaveChangesAsync();
                }

                if (!context.OrderStatuses.Any())
                {
                    var orderStatuses = useCustomizationData
                                        ? GetOrderStatusesFromFile(contentRootPath, logger)
                                        : GetPredefinedOrderStatuses();

                    context.OrderStatuses.AddRange(orderStatuses);
                    await context.SaveChangesAsync();
                }
            });
        }


        private IEnumerable<CardType> GetCardTypesFromFile(string contentRootPath, ILogger<OrderDbContext> logger)
        {
            string filename = "CardType.txt";
            if (!File.Exists(filename))
            {
                return GetPredefinedCardTypes();
            }

            var fileContent = File.ReadAllLines(filename);
            var id = 1;

            var list = fileContent.Select(i => new CardType(id++, i)).Where(i => i != null);

            return list;
        }

        private IEnumerable<CardType> GetPredefinedCardTypes()
        {
            return Enumeration.GetAll<CardType>();
        }

        private IEnumerable<OrderStatus> GetOrderStatusesFromFile(string contentRootPath, ILogger<OrderDbContext> logger)
        {
            string filename = "OrderStatus.txt";
            if (!File.Exists(filename))
            {
                return GetPredefinedOrderStatuses();
            }

            var fileContent = File.ReadAllLines(filename);
            var id = 1;

            var list = fileContent.Select(i => new OrderStatus(id++, i)).Where(i => i != null);

            return list;
        }

        private IEnumerable<OrderStatus> GetPredefinedOrderStatuses()
        {
            return Enumeration.GetAll<OrderStatus>();
        }

        private AsyncRetryPolicy CreatePolicy(ILogger<OrderDbContext> logger, string prefix, int retries = 3)
        {
            return Policy.Handle<PostgresException>().
                WaitAndRetryAsync(
                retryCount: retries,
                sleepDurationProvider: retry => TimeSpan.FromSeconds(5),
                onRetry: (exception, timespan, retryCount, context) =>
                {
                    logger.LogWarning(exception,"[{prefix}] Exception {ExceptionType} with message {Message} detected on attempt {retryCount} of {retries}", prefix, exception.GetType().Name, exception.Message, retryCount, retries);
                });

        }
    }
}
