using Microsoft.EntityFrameworkCore;
using SanaCommerce.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanaCommerce.Database.Repositories;
public interface IProductsRepository
{
    Task<Product> Create(Product product);
    Task<bool> Delete(int id);
    Task<IEnumerable<Product>> Get();
    Task<Product> Get(int id);
    Task<Product> Update(Product product);
    Task<List<Product>> GetByProductCode(string productCode);
    Task<List<ProductOrder>> GetProductOrders(int id);
    Task<List<Product>> GetByCategoryId(int categoryId);
}

public class ProductsRepository : IProductsRepository
{
    private readonly IDbContextFactory<SanaCommerceContext> _contextFactory;

    public ProductsRepository(IDbContextFactory<SanaCommerceContext> contextFactory)
    {
        _contextFactory = contextFactory;
    }

    public async Task<IEnumerable<Product>> Get()
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            return await context.Products.ToListAsync();
        }
    }

    public async Task<Product?> Get(int id)
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            return await context.Products.FindAsync(id);
        }
    }

    public async Task<Product> Create(Product product)
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            context.Products.Add(product);
            await context.SaveChangesAsync();
        }
        return product;
    }

    public async Task<Product> Update(Product product)
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            context.Products.Update(product);
            await context.SaveChangesAsync();
        }
        return product;
    }

    public async Task<bool> Delete(int id)
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            var product = await context.Products.FindAsync(id);
            if (product == null)
            {
                return false;
            }

            context.Products.Remove(product);
            return await context.SaveChangesAsync() > 0;
        }
    }

    public async Task<List<Product>> GetByProductCode(string productCode)
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            return await context.Products.Where(p => p.ProductCode == productCode).Include(x=>x.ProductOrders).ToListAsync();
        }
    }

    public Task<List<ProductOrder>> GetProductOrders(int id)
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            return Task.FromResult(context.ProductOrders.Where(po => po.ProductId == id).ToList());
        }
    }

    public Task<List<Product>> GetByCategoryId(int categoryId)
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            return Task.FromResult(context.Products.Where(p => p.ProductCategories.Any(pc => pc.CategoryId == categoryId)).ToList());
        }
    }
}
