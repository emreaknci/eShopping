namespace EventBus.MassTransit.Events
{
    public class OrderPaymentFailed
    {
        public string OrderId { get; set; }
        public string ErrorMessage { get; set; }
        public Dictionary<int, int> Items { get; set; } // ProductId, Quantity

        public OrderPaymentFailed(string orderId, string errorMessage, Dictionary<int, int> items)
        {
            OrderId = orderId;
            ErrorMessage = errorMessage;
            Items = items;
        }

    }
}
