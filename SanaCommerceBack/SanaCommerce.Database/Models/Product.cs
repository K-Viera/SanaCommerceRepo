using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanaCommerce.Database.Models;

public class Product
{
    [Key]
    public int ProductId { get; set; }

    [Required]
    [StringLength(100)]
    public string ProductName { get; set; } = null!;

    [Required]
    [StringLength(50)]
    public string ProductCode { get; set; } = null!;

    [StringLength(255)]
    public string Description { get; set; } = null!;

    [Required]
    public decimal Price { get; set; }

    [Required]
    public int Stock { get; set; }

    public ICollection<ProductCategory> ProductCategories { get; set; } = null!;
    public ICollection<ProductOrder> ProductOrders { get; set; } = null!;
}
