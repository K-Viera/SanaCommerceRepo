using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanaCommerce.Database.Models;
public class ProductOrder
{
    [Key]
    public int ProductOrderId { get; set; }

    [Required]
    public int OrderId { get; set; }

    [Required]
    public int ProductId { get; set; }

    [Required]
    public int Quantity { get; set; }

    [Required]
    public decimal UnitPrice { get; set; }

    [ForeignKey("OrderId")]
    public Order Order { get; set; } = null!;

    [ForeignKey("ProductId")]
    public Product Product { get; set; } = null!;
}
