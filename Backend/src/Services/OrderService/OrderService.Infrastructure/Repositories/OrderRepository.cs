using Microsoft.EntityFrameworkCore;
using OrderService.Application.Features.Orders.Queries.GetOrderList;
using OrderService.Application.Interfaces.Repositories;
using OrderService.Domain.AggregateModels.OrderAggregate;
using OrderService.Infrastructure.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace OrderService.Infrastructure.Repositories
{
    public class OrderRepository : GenericRepository<Order>, IOrderRepository
    {

        private readonly OrderDbContext _dbContext;
        public OrderRepository(OrderDbContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public int CalculateLatestOrderCount(int daysAgo)
        {
            DateTime startDate = DateTime.UtcNow.Date.AddDays(-daysAgo);
            return _dbContext.Orders.Count(x => x.CreatedDate >= startDate);
        }

        public decimal CalculateLatestOrderRevenue(int daysAgo)
        {
            DateTime startDate = DateTime.UtcNow.Date.AddDays(-daysAgo);
            return _dbContext.OrderItems
                            .Where(x => x.CreatedDate >= startDate)
                            .Sum(x => x.UnitPrice * x.Units);
        }

        public int CalculateTotalOrderCount()
        {
            return _dbContext.Orders.Count();
        }

        public decimal CalculateTotalOrderRevenue()
        {
            return _dbContext.OrderItems.Sum(x => x.UnitPrice * x.Units);
        }

        public override async Task<Order> GetByIdAsync(Guid id, params Expression<Func<Order, object>>[] includes)
        {
            var entity = await base.GetByIdAsync(id, includes);

            if (entity == null)
            {
                entity = _dbContext.Orders.Local.FirstOrDefault(x => x.Id == id);
            }

            return entity;
        }

        public IQueryable<Order> GetLatestOrders(int count)
        {
            return _dbContext.Orders.OrderByDescending(x => x.CreatedDate).Take(count).Include(x => x.Buyer).Include(x => x.OrderItems);
        }

        public IQueryable<Order> GetOrders(DateOption? dateOption = DateOption.AllTime, int? statusId = null, string? searchText = null)
        {
            var orders = _dbContext.Orders.AsQueryable();

            if (statusId.HasValue)
                orders = orders.Where(x => x.OrderStatusId == statusId.Value);

            if (!string.IsNullOrEmpty(searchText))
                orders = orders.Where(x => x.Buyer.FullName.ToLower().Contains(searchText.ToLower())
                     || x.BuyerId.ToString().Contains(searchText)
                     || x.Id.ToString().Contains(searchText));

            if (dateOption.HasValue)
            {
                var now = DateTimeOffset.UtcNow;
                switch (dateOption)
                {
                    case DateOption.AllTime:
                        orders = orders.Where(x => x.OrderDate >= DateTimeOffset.MinValue && x.OrderDate <= DateTimeOffset.MaxValue);
                        break;
                    case DateOption.LastMonth:
                        orders = orders.Where(x => x.OrderDate >= now.AddMonths(-1) && x.OrderDate <= now);
                        break;
                    case DateOption.Last3Months:
                        orders = orders.Where(x => x.OrderDate >= now.AddMonths(-3) && x.OrderDate <= now);
                        break;
                    case DateOption.Last6Months:
                        orders = orders.Where(x => x.OrderDate >= now.AddMonths(-6) && x.OrderDate <= now);
                        break;
                    case DateOption.LastYear:
                        orders = orders.Where(x => x.OrderDate >= now.AddYears(-1) && x.OrderDate <= now);
                        break;
                    case DateOption.Last2Years:
                        orders = orders.Where(x => x.OrderDate >= now.AddYears(-2) && x.OrderDate <= now);
                        break;
                    case DateOption.Last5Years:
                        orders = orders.Where(x => x.OrderDate >= now.AddYears(-5) && x.OrderDate <= now);
                        break;
                    default:
                        orders = orders.Where(x => x.OrderDate >= DateTimeOffset.MinValue && x.OrderDate <= DateTimeOffset.MaxValue);
                        break;
                }
            }

            orders = orders.OrderByDescending(x => x.OrderDate);

            return orders.Include(x => x.Buyer).Include(x => x.OrderItems);
        }
    }
}
