using HotChocolate;
using SanaCommerce.Database.Models;
using SanaCommerce.Database.Repositories;
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
    public IQueryable<ProductType> GetProducts([ScopedService] SanaCommerceContext context)
    {
        var products = context.Products;
        var result = products.Select(p => new ProductType
        {
            ProductId = p.ProductId,
            ProductName = p.ProductName,
            ProductCode = p.ProductCode,
            Description = p.Description,
            Price = p.Price,
            Stock = p.Stock
        });

        return result;
    }
}

public partial class Mutation
{
    private readonly IProductsRepository _productsRepository;

    public Mutation(IProductsRepository productsRepository)
    {
        _productsRepository = productsRepository;
    }

    public async Task<CreateProductResponse> CreateProduct(string productName, string productCode, string description, decimal price, int stock)
    {
        var product = new Product
        {
            ProductName = productName,
            ProductCode = productCode,
            Description = description,
            Price = price,
            Stock = stock
        };

        var createdProduct = await _productsRepository.Create(product);

        return new CreateProductResponse
        {
            ProductId = createdProduct.ProductId,
            ProductName = createdProduct.ProductName,
            ProductCode = createdProduct.ProductCode,
            Description = createdProduct.Description,
            Price = createdProduct.Price,
            Stock = createdProduct.Stock
        };
    }
}

public class CreateProductResponse
{
    public int ProductId { get; set; }
    public string ProductName { get; set; }
    public string ProductCode { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public int Stock { get; set; }
}
