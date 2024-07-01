using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using SanaCommerce.Database;
using SanaCommerce.Database.Repositories;
using SanaCommerce.GraphQL;

var builder = WebApplication.CreateBuilder(args);

string connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? String.Empty;
builder.Services.AddPooledDbContextFactory<SanaCommerceContext>(options =>
{
    options.UseSqlServer(connectionString);
});

builder.Services.AddScoped<IOrdersRepository, OrdersRepository>();
builder.Services.AddScoped<ICustomersRepository, CustomersRepository>();

builder.Services
    .AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>()
    .AddProjections()
    .AddFiltering()
    .AddSorting();

var app = builder.Build();


app.UseHttpsRedirection();

app.MapGraphQL();


app.Run();

