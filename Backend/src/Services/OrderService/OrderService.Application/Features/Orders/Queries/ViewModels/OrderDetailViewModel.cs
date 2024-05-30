using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderService.Application.Features.Orders.Queries.ViewModels
{
    public class OrderDetailViewModel
    {
        public Guid OrderId { get; init; }
        public DateTime Date { get; init; }
        public Guid BuyerId { get; set; }
        public string BuyerName { get; set; }
        public int OrderStatus { get; set; }
        public string Street { get; init; }
        public string City { get; init; }
        public string ZipCode { get; init; }
        public string Country { get; init; }
        public int NumberOfInstallments { get; set; }


        public List<OrderItemViewModel> OrderItems { get; set; }
        public decimal Total { get; set; }

    }
}
