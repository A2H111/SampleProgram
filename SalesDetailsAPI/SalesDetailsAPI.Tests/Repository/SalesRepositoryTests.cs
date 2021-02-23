using System;
using NUnit.Framework;
using Microsoft.EntityFrameworkCore;
using SalesDetailsAPI.Models;
using SalesDetailsAPI.DataAccess;
using System.Threading.Tasks;
using SalesDetailsAPI.Repository;

namespace SalesDetailsAPI.Tests.Repository
{
    public class SalesRepositoryTests
    {
        private DbContextOptions<SalesDBContext> _options;

        [SetUp]
        public void Setup()
        {
            _options = new DbContextOptionsBuilder<SalesDBContext>()
                .UseInMemoryDatabase(databaseName: "SalesDetailsTest").Options;
        }

        [Test]
        public async Task Get_SalesDetails_Returns_All_Items()
        {
            var repository = new SalesRepository(_options);
            
            repository.OnDatabaseContextCreated += (sender, salesDBContext) =>
            {
                salesDBContext.Database.EnsureDeleted();
                salesDBContext.SalesDetails.Add(new Sales { stateName = "Ohio", Month = "April", Value = 100 });
                salesDBContext.SalesDetails.Add(new Sales { stateName = "Ohio", Month = "May", Value = 100 });
                salesDBContext.SaveChanges();                
            };
            var results = await repository.GetSalesDetails();
            Assert.AreEqual(2, results.Count);
        }

        [Test]
        public void Verify_whether_value_got_inserted_properly()
        {
            var repository = new SalesRepository(_options);

            repository.OnDatabaseContextCreated += (sender, salesDBContext) =>
            {
                salesDBContext.Database.EnsureDeleted();
                salesDBContext.SalesDetails.Add(new Sales { stateName = "Ohio", Month = "April", Value = 100 });
                salesDBContext.SalesDetails.Add(new Sales { stateName = "Ohio", Month = "May", Value = 100 });
                salesDBContext.SaveChanges();
            };
            Sales[] newEntry = new Sales[] { new Sales { stateName = "Ohio", Month = "April", Value = 100 } };
            var results = repository.InsertSalesDetails(newEntry);
            Assert.AreEqual("Sales Data already exists", results);

            newEntry = new Sales[] { new Sales { stateName = "New Hampshire", Month = "April", Value = 100 } };
            results = repository.InsertSalesDetails(newEntry);
            Assert.AreEqual("Sales Data entered Successfully", results);

        }
    }
}
