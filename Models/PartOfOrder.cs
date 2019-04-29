using System.ComponentModel.DataAnnotations.Schema;

namespace OneMoreStore.Models
{
    [Table("PartsOfOrder")]
    public class PartOfOrder
    {
        public int Id { get; set; }
        public int Amount { get; set; }
        public int ItemId { get; set; }
        public Item Item { get; set; }
    }
}
