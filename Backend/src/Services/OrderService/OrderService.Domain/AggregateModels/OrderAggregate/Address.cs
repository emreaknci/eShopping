using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderService.Domain.AggregateModels.OrderAggregate
{
    public record Address //: ValueObject
    {
        public String Street { get; private set; }
        public String City { get; private set; }
        public String State { get; private set; }
        public String Country { get; private set; }
        public String ZipCode { get; private set; }
        public Address() { }
        public Address(String street, String city, String state, String country, String zipCode)
        {
            Street = street;
            City = city;
            State = state;
            Country = country;
            ZipCode = zipCode;
        }

        //protected override IEnumerable<object> GetEqualityComponents()
        //{
        //    yield return Street;
        //    yield return City;
        //    yield return State;
        //    yield return Country;
        //    yield return ZipCode;
        //}
    }
}
