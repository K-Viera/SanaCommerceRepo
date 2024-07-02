using SanaCommerce.Database.Models;
using SanaCommerce.Database.Repositories;
using SanaCommerce.GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanaCommerce.GraphQL;
public class Mutation
{
    private readonly ICategoriesRepository _categoriesRepository;
    private readonly IOrdersRepository _ordersRepository;
    private readonly IProductsRepository _productsRepository;
    private readonly ICustomersRepository _customersRepository;
    public Mutation(ICategoriesRepository categoriesRepository,
                    IOrdersRepository ordersRepository,
                    IProductsRepository productsRepository,
                    ICustomersRepository customersRepository)
    {
        _categoriesRepository = categoriesRepository;
        _ordersRepository = ordersRepository;
        _productsRepository = productsRepository;
        _customersRepository = customersRepository;
    }
    public async Task<CreateCategoryResponse> CreateCategory(string categoryName)
    {
        var category = new Category
        {
            CategoryName = categoryName
        };

        var createdCategory = await _categoriesRepository.Create(category);

        return new CreateCategoryResponse
        {
            CategoryId = createdCategory.CategoryId,
            CategoryName = createdCategory.CategoryName
        };
    }

    public async Task<CreateProductResponse> CreateProduct(string productName, string productCode, string description, decimal price, int stock)
    {
        try
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
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }


    }

    public async Task<CreateOrderResponse> CreateOrder(CreateOrderRequest orderRequest)
    {
        try
        {
            var customer = await _customersRepository.FindByEmail(orderRequest.CustomerEmail);

            if (customer == null)
            {
                customer = await _customersRepository.Create(new Customer
                {
                    FirstName = orderRequest.FirstName ?? "",
                    LastName = orderRequest.LastName ?? "",
                    Email = orderRequest.CustomerEmail
                });
            }
            if (customer == null)
            {
                throw new Exception("Customer not found or created");
            }

            var order = new Order
            {
                CustomerId = customer.CustomerId,
                OrderDate = DateTime.Now
            };

            foreach (var orderLine in orderRequest.OrderLines)
            {
                var productOrder = new ProductOrder
                {
                    ProductId = orderLine.ProductId,
                    Quantity = orderLine.Quantity
                };
                order.ProductOrders.Add(productOrder);
            }
            var createdOrder = await _ordersRepository.Create(order);
            return new CreateOrderResponse
            {
                OrderId = createdOrder.OrderId,
                CustomerId = createdOrder.CustomerId,
                OrderDate = createdOrder.OrderDate
            };
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }
}


public class CreateCategoryResponse
{
    public int CategoryId { get; set; }
    public string CategoryName { get; set; }
}

public class CreateOrderResponse
{
    public int OrderId { get; set; }
    public int CustomerId { get; set; }
    public DateTime OrderDate { get; set; }
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