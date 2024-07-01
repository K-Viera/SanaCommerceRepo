using HotChocolate;
using Microsoft.EntityFrameworkCore;
using SanaCommerce.Database;
using SanaCommerce.GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanaCommerce.GraphQL;
public partial class Query
{
    [UseDbContext(typeof(SanaCommerceContext))]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<CustomerType> GetCustomers([ScopedService] SanaCommerceContext context)
    {
        var customers = context.Customers.Include(x => x.Orders);
        var result = customers.Select(c => new CustomerType
        {
            CustomerId = c.CustomerId,
            FirstName = c.FirstName,
            LastName = c.LastName,
            Email = c.Email,
        });

        return result;
    }
}
