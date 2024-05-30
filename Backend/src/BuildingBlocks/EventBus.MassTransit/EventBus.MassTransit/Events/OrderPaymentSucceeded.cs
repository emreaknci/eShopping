namespace EventBus.MassTransit.Events
{
    public class OrderPaymentSucceeded
    {
        public string OrderId { get; set; }
        public string BuyerId { get; set; }
        public string BuyerEmail { get; set; } // For email notification
    }
}
