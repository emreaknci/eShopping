using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderService.Infrastructure.SignalR
{
    public static class ReceiveFunctionNames
    {
        public const string OrderPaymentSuccededMessage = "receiveOrderPaymentSuccededMessage";
        public const string OrderPaymentFailedMessage = "receiveOrderPaymentFailedMessage";
    }
}
