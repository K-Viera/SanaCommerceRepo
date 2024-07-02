using HotChocolate;
using SanaCommerce.Database.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanaCommerce.GraphQL.Types;
public class CategoryType
{
    public int CategoryId { get; set; }
    public string CategoryName { get; set; }

    public async Task<List<ProductType>> Products([Service] IProductsRepository productsRepository)
    {
        var products = await productsRepository.GetByCategoryId(CategoryId);
        return products.Select(p => new ProductType
        {
            ProductId = p.ProductId,
            ProductName = p.ProductName,
            ProductCode = p.ProductCode,
            Description = p.Description,
            Price = p.Price,
            Stock = p.Stock
        }).ToList();
    }
}
