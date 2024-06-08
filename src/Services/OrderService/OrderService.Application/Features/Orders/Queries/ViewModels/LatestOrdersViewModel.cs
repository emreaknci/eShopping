using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderService.Application.Features.Orders.Queries.ViewModels
{
    public class LatestOrdersViewModel
    {
       public List<OrderViewModel> Orders { get; set; }
    }

    public class OrderViewModel
    {
        public Guid OrderId { get; set; }
        public string BuyerName { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal Total { get; set; }
        public int OrderStatus { get; set; }
    }
}
