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

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAnyOrigin",
        builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();

// Apply the CORS policy
app.UseCors("AllowAnyOrigin");

app.UseHttpsRedirection();

app.MapGraphQL();

app.Run();
app.UseHttpsRedirection();

app.MapGraphQL();


app.Run();
