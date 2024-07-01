using HotChocolate;
using SanaCommerce.Database.Models;
using SanaCommerce.Database.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanaCommerce.GraphQL.Types;
public class CustomerType
{
    public int CustomerId { get; set; }
    public string FirstName { get; set; }
    public string? LastName { get; set; }
    public string Email { get; set; }
    public async Task<List<OrderType?>> Orders([Service] IOrdersRepository ordersRepository)
    {
        List<Order> orders = new List<Order>();
        orders = await ordersRepository.GetByCustomerId(CustomerId);
        var result = orders.Select(o => new OrderType
        {
            OrderId = o.OrderId,
            OrderDate = o.OrderDate,
            CustomerId = o.CustomerId
        }).ToList();
        return result;

    }
}
