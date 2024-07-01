using HotChocolate;
using SanaCommerce.Database.Models;
using SanaCommerce.Database.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanaCommerce.GraphQL.Types;
public class OrderType
{
    public int OrderId { get; set; }
    public DateTime OrderDate { get; set; }
    public int CustomerId { get; set; }
    [GraphQLNonNullType]
    public async Task<CustomerType?> Customer([Service] ICustomersRepository customersRepository)
    {
        var customer = await customersRepository.Get(CustomerId);
        if (customer == null)
        {
            return null;
        }
        return new CustomerType
        {
            CustomerId = customer.CustomerId,
            FirstName = customer.FirstName,
            LastName = customer.LastName,
            Email = customer.Email
        };
    }
}

