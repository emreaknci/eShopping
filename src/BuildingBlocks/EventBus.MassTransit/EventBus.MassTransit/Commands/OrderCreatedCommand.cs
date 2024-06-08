using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EventBus.MassTransit.Commands
{
    public class OrderCreatedCommand
    {
        public string UserId { get; set; }
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public int OrderId { get; set; }
        public Address ShippingAddress { get; set; }
        public PaymentDetails PaymentDetails { get; set; }
        public string Buyer { get; set; }
        public CustomerBasket Basket { get; set; }

        public OrderCreatedCommand(string userId, string userName, Address shippingAddress, PaymentDetails paymentDetails, string buyer, CustomerBasket basket, string userEmail)
        {
            UserId = userId;
            UserName = userName;
            ShippingAddress = shippingAddress;
            PaymentDetails = paymentDetails;

            Buyer = buyer;
            Basket = basket;
            UserEmail = userEmail;
        }

    }



    public class Address
    {
        public Address(string city, string street, string state, string country, string zipCode)
        {
            City = city;
            Street = street;
            State = state;
            Country = country;
            ZipCode = zipCode;
        }
        public Address()
        {
            
        }

        public string City { get; set; }
        public string Street { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string ZipCode { get; set; }

        
    }

    public class PaymentDetails
    {
        public PaymentDetails(string cardNumber, string cardHolderName, DateTime cardExpiration, string cardSecurityNumber, int cardTypeId, int numberOfInstallments)
        {
            CardNumber = cardNumber;
            CardHolderName = cardHolderName;
            CardExpiration = cardExpiration;
            CardSecurityNumber = cardSecurityNumber;
            CardTypeId = cardTypeId;
            NumberOfInstallments = numberOfInstallments;
        }
        public PaymentDetails()
        {
            
        }

        public string CardNumber { get; set; }
        public string CardHolderName { get; set; }
        public DateTime CardExpiration { get; set; }
        public string CardSecurityNumber { get; set; }
        public int CardTypeId { get; set; }
        public int NumberOfInstallments { get; set; }
    }

    public class CustomerBasket
    {
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; }

        public CustomerBasket()
        {
            
        }
        public CustomerBasket(string customerId, List<BasketItem> ıtems)
        {
            BuyerId = customerId;
            Items = ıtems;
        }

    }

    public class BasketItem
    {
        public BasketItem(int id, int productId, string productName, decimal unitPrice, decimal oldUnitPrice, int quantity, string pictureUrl)
        {
            Id = id;
            ProductId = productId;
            ProductName = productName;
            UnitPrice = unitPrice;
            OldUnitPrice = oldUnitPrice;
            Quantity = quantity;
            PictureUrl = pictureUrl;
        }

        public BasketItem()
        {
            
        }

        public int Id { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal OldUnitPrice { get; set; }
        public int Quantity { get; set; }
        public string PictureUrl { get; set; }
    }
}
