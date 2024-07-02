using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using SanaCommerce.Database;
using SanaCommerce.Database.Repositories;
using SanaCommerce.GraphQL;
using SanaCommerce.GraphQL.Types;

var builder = WebApplication.CreateBuilder(args);

string connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? String.Empty;
builder.Services.AddPooledDbContextFactory<SanaCommerceContext>(options =>
{
    options.UseSqlServer(connectionString);
});

builder.Services.AddScoped<IOrdersRepository, OrdersRepository>();
builder.Services.AddScoped<ICustomersRepository, CustomersRepository>();
builder.Services.AddScoped<IProductsRepository, ProductsRepository>();
builder.Services.AddScoped<ICategoriesRepository, CategoriesRepository>();

builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddType<CreateOrderRequestType>()
    .AddType<OrderLineType>()
    .AddType<CreateOrderResponseType>()
    .AddProjections()
    .AddFiltering()
    .AddSorting();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAnyOrigin",
        builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();

app.UseCors("AllowAnyOrigin");

app.UseHttpsRedirection();

app.MapGraphQL();

app.Run();
app.UseHttpsRedirection();

app.MapGraphQL();


app.Run();
