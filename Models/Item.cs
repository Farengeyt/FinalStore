using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OneMoreStore.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string Company { get; set; }
        public string Model { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public Category Category { get; set; }
    }
}
