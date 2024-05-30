using Microsoft.EntityFrameworkCore;
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

        public IQueryable<Order> GetOrders(int? statusId, string? searchText = null)
        {
            var orders = _dbContext.Orders.AsQueryable();

            if (statusId.HasValue)
                orders = orders.Where(x => x.OrderStatusId == statusId.Value);

            if (!string.IsNullOrEmpty(searchText))
                orders = orders.Where(x => x.Buyer.FullName.ToLower().Contains(searchText.ToLower())
                     || x.BuyerId.ToString().Contains(searchText)
                     || x.Id.ToString().Contains(searchText));

            return orders.Include(x => x.Buyer).Include(x => x.OrderItems);
        }
    }
}
