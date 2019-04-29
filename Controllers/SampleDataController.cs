using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OneMoreStore.Models;

namespace OneMoreStore.Controllers
{
    [Route("api")]
    public class SampleDataController : Controller
    {
        ApplicationContext db;
        public SampleDataController(ApplicationContext context)
        {
            db = context;
            if (!db.Categories.Any())
            {
                CreateDatabase();
            }
        }
        [HttpGet("categories")]
        public IEnumerable<Category> GetCategoriesName()
        {
            return db.Categories.ToList();
        }

        [HttpGet("categories/{id}")]
        public IEnumerable<Item> GetItems(int id)
        {
            return db.Items.Where(p => p.Category.Id == id).ToList();
        }

        [HttpGet("categories/all_items")]
        public IEnumerable<Item> GetAllItems()
        {
            return db.Items.ToList();
        }

        [HttpPost("createOrder")]
        public IActionResult Post([FromBody]Order order)
        {
            if (ModelState.IsValid)
            {
                foreach(var doNull in order.PartOfOrders) { doNull.Item = null; }
                db.Orders.Add(order);
                db.SaveChanges();
                return Ok(order);
            }
            return BadRequest(ModelState);
        }

        private void CreateDatabase()
        {
            Category phones = new Category { Name = "Phones" };
            Category laptops = new Category { Name = "Laptops" };
            Category tablets = new Category { Name = "Tablets" };
            db.Categories.Add(phones);
            db.Categories.Add(laptops);
            db.Categories.Add(tablets);
            db.SaveChanges();
            List<Item> firstPhones = new List<Item> {
                    new Item{Company = "Apple", Model = "7 32Gb", Price = 25000, Description = "Iphone 7 is newer than Iphone 6", Category = phones},
                    new Item{Company = "Apple", Model = "8 32Gb", Price = 30000, Description = "Iphone 8 is newer than Iphone 7", Category = phones},
                    new Item{Company = "Apple", Model = "6 32Gb", Price = 15000, Description = "Iphone 7 is newer than Iphone 5", Category = phones}};
            List<Item> firstLaptops = new List<Item> {
                    new Item{Company = "Apple", Model = "MacBook Pro 15'", Price = 50000, Description = "The biggest and most powerful MacBook", Category = laptops},
                    new Item{Company = "Apple", Model = "MacBook Pro 13'", Price = 35000, Description = "MacBook Pro 13' is better than MacBook Air", Category = laptops},
                    new Item{Company = "Apple", Model = "MacBook Air", Price = 25000, Description = "MacBook Air is small and lightweight", Category = laptops}};
            List<Item> firstTablets = new List<Item> {
                    new Item{Company = "Apple", Model = "iPad Pro 12'", Price = 48000, Description = "The biggest and most powerful iPad", Category = tablets},
                    new Item{Company = "Apple", Model = "iPad Pro 10'", Price = 32000, Description = "iPad Pro 10' is better than iPad mini", Category = tablets},
                    new Item{Company = "Apple", Model = "iPad mini", Price = 25000, Description = "iPad Air is small and lightweight", Category = tablets}};
            db.Items.AddRange(firstPhones);
            db.Items.AddRange(firstLaptops);
            db.Items.AddRange(firstTablets);
            db.SaveChanges();
        }

    }    
}
