using Microsoft.EntityFrameworkCore;
using SanaCommerce.Database.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanaCommerce.Database;
public class SanaCommerceContext : DbContext
{
    public SanaCommerceContext(DbContextOptions<SanaCommerceContext> options) : base(options)
    {
    }

    public DbSet<Category> Categories { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<ProductOrder> ProductOrders { get; set; }
    public DbSet<ProductCategory> ProductCategories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ProductOrder>()
            .HasKey(po => new { po.ProductOrderId });

        modelBuilder.Entity<ProductCategory>()
            .HasKey(pc => new { pc.ProductCategoryId });

        modelBuilder.Entity<ProductOrder>()
            .HasOne(po => po.Order)
            .WithMany(o => o.ProductOrders)
            .HasForeignKey(po => po.OrderId);

        modelBuilder.Entity<ProductOrder>()
            .HasOne(po => po.Product)
            .WithMany(p => p.ProductOrders)
            .HasForeignKey(po => po.ProductId);

        modelBuilder.Entity<ProductCategory>()
            .HasOne(pc => pc.Product)
            .WithMany(p => p.ProductCategories)
            .HasForeignKey(pc => pc.ProductId);

        modelBuilder.Entity<ProductCategory>()
            .HasOne(pc => pc.Category)
            .WithMany(c => c.ProductCategories)
            .HasForeignKey(pc => pc.CategoryId);
    }
}
