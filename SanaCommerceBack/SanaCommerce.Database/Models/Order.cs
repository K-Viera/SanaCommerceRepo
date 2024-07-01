using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SanaCommerce.Database.Models;
public class Order
{
    [Key]
    public int OrderId { get; set; }

    [Required]
    public int CustomerId { get; set; }

    [Required]
    public DateTime OrderDate { get; set; } = DateTime.Now;

    [ForeignKey("CustomerId")]
    public Customer Customer { get; set; } = null!;

    public ICollection<ProductOrder> ProductOrders { get; set; } = new List<ProductOrder>();
}
