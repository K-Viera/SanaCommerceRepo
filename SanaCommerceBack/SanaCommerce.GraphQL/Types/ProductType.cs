using HotChocolate;
using SanaCommerce.Database.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanaCommerce.GraphQL.Types;
public class ProductType
{
    public int ProductId { get; set; }
    public string ProductName { get; set; }
    public string ProductCode { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public int Stock { get; set; }

    //[GraphQLNonNullType]
    //public async Task<List<CategoryType>> Categories([Service] ICategoriesRepository categoriesRepository)
    //{
    //    var categories = await categoriesRepository.GetByProductId(ProductId);
    //    return categories.Select(c => new CategoryType
    //    {
    //        CategoryId = c.CategoryId,
    //        CategoryName = c.CategoryName
    //    }).ToList();
    //}

    [GraphQLNonNullType]
    public async Task<List<OrderTypeQuantity>> Orders([Service] IOrdersRepository ordersRepository)
    {
        var orders = await ordersRepository.GetByProductId(ProductId);
        return orders.Select(o => new OrderTypeQuantity
        {
            Quantity = o.ProductOrders.FirstOrDefault(po => po.ProductId == this.ProductId &&po.OrderId==o.OrderId)?.Quantity,
            OrderId = o.OrderId,
            OrderDate = o.OrderDate,
            CustomerId = o.CustomerId
        }).ToList();
    }
}

public class OrderTypeQuantity:OrderType
{
    public int? Quantity { get; set; }
}
