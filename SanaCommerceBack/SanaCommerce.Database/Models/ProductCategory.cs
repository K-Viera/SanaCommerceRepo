using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanaCommerce.Database.Models;
public class ProductCategory
{
    [Key]
    public int ProductCategoryId { get; set; }

    [Required]
    public int ProductId { get; set; }

    [Required]
    public int CategoryId { get; set; }

    [ForeignKey("ProductId")]
    public Product Product { get; set; } = null!;

    [ForeignKey("CategoryId")]
    public Category Category { get; set; } = null!;
}