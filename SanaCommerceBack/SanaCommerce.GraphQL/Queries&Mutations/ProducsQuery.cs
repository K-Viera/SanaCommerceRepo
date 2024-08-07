﻿using HotChocolate;
using SanaCommerce.Database.Models;
using SanaCommerce.Database.Repositories;
using SanaCommerce.Database;
using SanaCommerce.GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using HotChocolate.Types;

namespace SanaCommerce.GraphQL;
public partial class Query
{
    [UseDbContext(typeof(SanaCommerceContext))]
    [UsePaging(DefaultPageSize = 10)]
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
    [UseDbContext(typeof(SanaCommerceContext))]
    public ProductType GetProduct([ScopedService] SanaCommerceContext context,int productId)
    {
        var product = context.Products.FirstOrDefault(p => p.ProductId == productId);
        return new ProductType
        {
            ProductId = product.ProductId,
            ProductName = product.ProductName,
            ProductCode = product.ProductCode,
            Description = product.Description,
            Price = product.Price,
            Stock = product.Stock
        };
    }
}