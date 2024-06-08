using AutoMapper;
using OrderService.Application.Features.Orders.Commands.CreateOrder;
using OrderService.Application.Features.Orders.Queries.ViewModels;
using OrderService.Domain.AggregateModels.OrderAggregate;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderService.Application.Mapping.OrderMapping
{
    public class OrderMappingProfile : Profile
    {

        public OrderMappingProfile()
        {
            CreateMap<Order, CreateOrderCommand>()
                .ReverseMap();

            CreateMap<OrderItem, OrderItemDto>()
                .ReverseMap();

            CreateMap<Order,OrderDetailViewModel>()
                .ForMember(x=>x.OrderId,y=>y.MapFrom(z=>z.Id))
                .ForMember(x=>x.City,y=>y.MapFrom(z=>z.Address.City))
                .ForMember(x=>x.Country,y=>y.MapFrom(z=>z.Address.Country))
                .ForMember(x=>x.Street,y=>y.MapFrom(z=>z.Address.Street))
                .ForMember(x=>x.ZipCode,y=>y.MapFrom(z=>z.Address.ZipCode))
                .ForMember(x=>x.Date,y=>y.MapFrom(z=>z.OrderDate))
                .ForMember(x=>x.OrderStatus,y=>y.MapFrom(z=>z.OrderStatusId))
                .ForMember(x=>x.Total,y=>y.MapFrom(z=>z.OrderItems.Sum(i=>i.Units*i.UnitPrice)))
                .ForMember(x=>x.OrderItems,y=>y.MapFrom(z=>z.OrderItems))
                .ForMember(x=>x.BuyerName,y=>y.MapFrom(z=>z.Buyer.FullName))
                .ReverseMap();

            CreateMap<OrderItem, OrderItemViewModel>();
        }
    }
}
