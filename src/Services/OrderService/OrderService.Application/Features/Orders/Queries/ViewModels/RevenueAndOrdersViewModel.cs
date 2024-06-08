using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderService.Application.Features.Orders.Queries.ViewModels
{
    public class RevenueAndOrdersViewModel
    {
        public decimal TotalRevenue { get; set; }
        public decimal TodayRevenue { get; set; }
        public int TotalOrders { get; set; }
        public int TodayOrders { get; set; }

    }
}
