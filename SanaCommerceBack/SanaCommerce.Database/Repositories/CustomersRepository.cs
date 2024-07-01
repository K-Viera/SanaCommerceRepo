using Microsoft.EntityFrameworkCore;
using SanaCommerce.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanaCommerce.Database.Repositories;

public interface ICustomersRepository
{
    Task<Customer> Create(Customer customer);
    Task<bool> Delete(int customerId);
    IEnumerable<Customer> Get();
    Task<Customer?> Get(int customerId);
    Task<Customer> Update(Customer customer);
}

public class CustomersRepository : ICustomersRepository
{
    private readonly IDbContextFactory<SanaCommerceContext> _contextFactory;

    public CustomersRepository(IDbContextFactory<SanaCommerceContext> contextFactory)
    {
        _contextFactory = contextFactory;
    }

    public IEnumerable<Customer> Get()
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            var customers = context.Customers;
            return customers;
        }
    }

    public async Task<Customer?> Get(int customerId)
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            return await context.Customers.FindAsync(customerId);
        }
    }

    public async Task<Customer> Create(Customer customer)
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            context.Customers.Add(customer);
            await context.SaveChangesAsync();
        }
        return customer;
    }

    public async Task<Customer> Update(Customer customer)
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            context.Customers.Update(customer);
            await context.SaveChangesAsync();
        }
        return customer;
    }

    public async Task<bool> Delete(int customerId)
    {
        using (var context = _contextFactory.CreateDbContext())
        {
            var customer = await context.Customers.FindAsync(customerId);
            if (customer == null)
            {
                return false;
            }

            context.Customers.Remove(customer);
            return await context.SaveChangesAsync() > 0;
        }
    }

}
