using HotChocolate;
using Microsoft.EntityFrameworkCore;
using SanaCommerce.Database;
using SanaCommerce.Database.Models;
using SanaCommerce.Database.Repositories;
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
    public IQueryable<OrderType> GetOrders([ScopedService] SanaCommerceContext context)
    {
        var orders = context.Orders.Include(x => x.Customer);
        var result = orders.Select(o => new OrderType
        {
            OrderDate = o.OrderDate,
            OrderId = o.OrderId,
            CustomerId = o.CustomerId
        });

        return result;
    }
}

public partial class Mutation
{
    private readonly IOrdersRepository _ordersRepository;
    public Mutation(IOrdersRepository ordersRepository)
    {
        _ordersRepository = ordersRepository;
    }
    public async Task<CreateOrderResponse> CreateOrder(int customerId)
    {
        var order = new Order
        {
            CustomerId = customerId,
            OrderDate = DateTime.Now
        };
        var createdOrder = await _ordersRepository.Create(order);
        return new CreateOrderResponse
        {
            OrderId = createdOrder.OrderId,
            CustomerId = createdOrder.CustomerId,
            OrderDate = createdOrder.OrderDate
        };
    }
}

public class CreateOrderResponse
{
    public int OrderId { get; set; }
    public int CustomerId { get; set; }
    public DateTime OrderDate { get; set; }
}