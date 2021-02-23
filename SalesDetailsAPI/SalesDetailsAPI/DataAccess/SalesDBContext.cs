using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SalesDetailsAPI.Models;

namespace SalesDetailsAPI.DataAccess
{
    public class SalesDBContext : DbContext
    {
        public virtual DbSet<Sales> SalesDetails { get; set; }
       
        public SalesDBContext(DbContextOptions<SalesDBContext> options) : base(options)
        {
            this.Database.EnsureCreated();
        }

        //Seed the initial data. This is only used for Demo.
        //In Real world scenario, we will use stored procedures to insert the values to database.
        //https://www.learnentityframeworkcore.com/migrations/seeding

        protected override void OnModelCreating(ModelBuilder modelBuilder){

            modelBuilder.Entity<Sales>().HasData(
                new Sales  { Id = 1, stateName = "Ohio", Month = "January", Value = 100 },
                new Sales { Id = 2, stateName = "Ohio", Month = "February", Value = 200 },
                new Sales { Id = 3, stateName = "Illinois", Month = "January", Value = 300 },
                new Sales { Id = 4, stateName = "Illinois", Month = "February", Value = 400 },
                new Sales { Id = 5, stateName = "Georgia", Month = "January", Value = 250 },
                new Sales { Id = 6, stateName = "Georgia", Month = "February", Value = 350 }
                );
        }
    }
}
