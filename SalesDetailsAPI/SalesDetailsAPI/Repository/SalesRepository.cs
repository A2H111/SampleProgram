using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SalesDetailsAPI.DataAccess;
using SalesDetailsAPI.Models;

namespace SalesDetailsAPI.Repository
{
    public class SalesRepository : ISalesRepository
    {
        private readonly DbContextOptions<SalesDBContext> _options;
        //an event is raised so that stored procedures can be tested
        //this is just a testing hook and is not part of the interface
        public delegate void DatabaseContextCreated(object sender, SalesDBContext salesDBContext);
        public event DatabaseContextCreated OnDatabaseContextCreated;

        public SalesRepository(DbContextOptions<SalesDBContext> options)
        {
            _options = options;
        }      

        private SalesDBContext CreateSalesDBContext()
        {
            var context = new SalesDBContext(_options);
            OnDatabaseContextCreated?.Invoke(this, context);
            return context;
        }

        public async Task<List<Sales>> GetSalesDetails()
        {
            using (var dataContext = CreateSalesDBContext())
            {
                var sales = await dataContext.SalesDetails.OrderBy(s => s.Id).ToListAsync();
                return sales;
            }
        }

        public string InsertSalesDetails(Sales[] saleValue)
        {
            int EntryCount = 0;
            using (var dataContext = CreateSalesDBContext())
            {                
                foreach (Sales item in saleValue)
                {                    
                    List<Sales> sales = dataContext.SalesDetails.Where(s => s.stateName == item.stateName & s.Month == item.Month && s.Value == item.Value).ToList();
                    if (sales.Count == 0)
                    {
                        EntryCount++;
                        dataContext.SalesDetails.Add(new Sales() { stateName = item.stateName, Month = item.Month, Value = item.Value });
                    }
                    dataContext.SaveChanges();
                }                
            }
            if(EntryCount > 0)
            {
                return "Sales Data entered Successfully";
            }
            else
            {
                return "Sales Data already exists";
            }
            
        }
    }
}
