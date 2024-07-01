using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;


namespace SanaCommerce.Database;
public static class DatabaseInjection
{
    public static void Inject(IServiceCollection services, string connectionString)
    {

        services.AddPooledDbContextFactory<SanaCommerceContext>(options =>
        {
            options.UseSqlServer(connectionString);
        });

        //services.AddDbContext<SanaCommerceContext>(options =>
        //{
        //    options.UseSqlServer(connectionString);
        //});
    }
}
