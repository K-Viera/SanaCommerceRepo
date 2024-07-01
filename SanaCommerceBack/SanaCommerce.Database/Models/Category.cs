using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanaCommerce.Database.Models;
public class Category
{
    [Key]
    public int CategoryId { get; set; }

    [Required]
    [StringLength(100)]
    public string CategoryName { get; set; } = null!;

    public ICollection<ProductCategory> ProductCategories { get; set; } = null!;
}
