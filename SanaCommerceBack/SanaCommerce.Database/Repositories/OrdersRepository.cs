using Microsoft.EntityFrameworkCore;
using SanaCommerce.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;

namespace SanaCommerce.Database.Repositories;

public interface IOrdersRepository
{
    Task<Order> Create(Order order);
    Task<bool> Delete(int id);
    Task<IEnumerable<Order>> Get();
    Task<Order> Get(int id);
    Task<Order> Update(Order order);
    Task<List<Order>> GetByCustomerId(int CustomerId);
    Task<List<Order>> GetByProductId(int ProductId);
    Task<List<ProductOrder>> GetProductOrders(int id);

}

public class OrdersRepository : IOrdersRepository
{
    private readonly IDbContextFactory<SanaCommerceContext> _contextFactory;

    public OrdersRepository(IDbContextFactory<SanaCommerceContext> contextFactory)
    {
        _contextFactory = contextFactory;
    }

    public Task<IEnumerable<Order>> Get()
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            return Task.FromResult(context.Orders.AsEnumerable());
        }
    }
    public async Task<Order?> Get(int id)
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            return await context.Orders.FindAsync(id);
        }
    }
    public async Task<Order> Create(Order order)
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            context.Orders.Add(order);
            await context.SaveChangesAsync();
        }
        return order;

    }

    public async Task<Order> Update(Order order)
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            context.Orders.Update(order);
            await context.SaveChangesAsync();
        }
        return order;
    }

    public async Task<bool> Delete(int id)
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            var order = await context.Orders.FindAsync(id);
            if (order == null)
            {
                return false;
            }

            context.Orders.Remove(order);
            return await context.SaveChangesAsync() > 0;
        }
    }

    public Task<List<Order>> GetByCustomerId(int CustomerId)
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            return Task.FromResult(context.Orders.Where(o => o.CustomerId == CustomerId).ToList());
        }
    }

    public Task<List<Order>> GetByProductId(int ProductId)
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            var orders = context.Orders.Where(o => o.ProductOrders.Any(po => po.ProductId == ProductId)).Include(x=>x.ProductOrders);
            return Task.FromResult(orders.ToList());
        }
    }

    public Task<List<ProductOrder>> GetProductOrders(int id)
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            return Task.FromResult(context.ProductOrders.Where(po => po.ProductId == id).ToList());
        }
    }
}
