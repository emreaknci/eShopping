namespace EventBus.MassTransit.Events
{
    public class OrderPaymentSucceeded
    {
        public string OrderId { get; set; }
        public string BuyerId { get; set; }
    }
}
