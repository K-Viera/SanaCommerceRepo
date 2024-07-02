using Microsoft.EntityFrameworkCore;
using SanaCommerce.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SanaCommerce.Database.Repositories;

public interface ICategoriesRepository
{
    Task<Category> Create(Category category);
    Task<bool> Delete(int categoryId);
    Task<IEnumerable<Category>> Get();
    Task<Category?> Get(int categoryId);
    Task<Category> Update(Category category);
    Task<List<Category>> GetByProductId(int ProductId);
}

public class CategoriesRepository : ICategoriesRepository
{
    private readonly IDbContextFactory<SanaCommerceContext> _contextFactory;

    public CategoriesRepository(IDbContextFactory<SanaCommerceContext> contextFactory)
    {
        _contextFactory = contextFactory;
    }

    public async Task<IEnumerable<Category>> Get()
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            return await context.Categories.ToListAsync();
        }
    }

    public async Task<Category?> Get(int categoryId)
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            return await context.Categories.FindAsync(categoryId);
        }
    }

    public async Task<Category> Create(Category category)
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            context.Categories.Add(category);
            await context.SaveChangesAsync();
        }
        return category;
    }

    public async Task<Category> Update(Category category)
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            context.Categories.Update(category);
            await context.SaveChangesAsync();
        }
        return category;
    }

    public async Task<bool> Delete(int categoryId)
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            var category = await context.Categories.FindAsync(categoryId);
            if (category == null)
            {
                return false;
            }

            context.Categories.Remove(category);
            return await context.SaveChangesAsync() > 0;
        }
    }

    public Task<List<Category>> GetByProductId(int ProductId) 
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            //serach by product id
            return Task.FromResult(context.Categories.Where(c=>c.ProductCategories.Any(pc=>pc.ProductId==ProductId)).ToList());
        }
    }
}