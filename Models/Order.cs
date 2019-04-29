using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OneMoreStore.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string TelephoneNumber { get; set; }
        public string Address { get; set; }
        public List<PartOfOrder> PartOfOrders { get; set; }
        
    }
}
