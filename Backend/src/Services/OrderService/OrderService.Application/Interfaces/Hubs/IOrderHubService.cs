using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderService.Application.Interfaces.Hubs
{
    public interface IOrderHubService
    {
        Task OrderPaymentSuccededMessageAsync(string buyerId);
        Task OrderPaymentFailedMessageAsync(string buyerId);
    }
}
