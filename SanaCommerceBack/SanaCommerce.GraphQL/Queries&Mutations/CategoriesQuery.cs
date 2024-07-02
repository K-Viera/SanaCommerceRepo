using HotChocolate;
using SanaCommerce.Database.Models;
using SanaCommerce.Database.Repositories;
using SanaCommerce.Database;
using SanaCommerce.GraphQL.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanaCommerce.GraphQL;
public partial class Query
{
    [UseDbContext(typeof(SanaCommerceContext))]
    [UseProjection]
    [UseFiltering]
    [UseSorting]
    public IQueryable<CategoryType> GetCategories([ScopedService] SanaCommerceContext context)
    {
        var categories = context.Categories;
        var result = categories.Select(c => new CategoryType
        {
            CategoryId = c.CategoryId,
            CategoryName = c.CategoryName
        });

        return result;
    }
}
