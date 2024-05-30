﻿using OrderService.Domain.AggregateModels.OrderAggregate;

namespace OrderService.Application.Interfaces.Repositories
{
    public interface IOrderRepository : IGenericRepository<Order>
    {
        decimal CalculateLatestOrderRevenue(int daysAgo);
        decimal CalculateTotalOrderRevenue();
        int CalculateLatestOrderCount(int daysAgo);
        int CalculateTotalOrderCount();

        IQueryable<Order> GetLatestOrders(int count);
        IQueryable<Order> GetOrders(int? statusId = null, string? searchText = null);
    }
}
