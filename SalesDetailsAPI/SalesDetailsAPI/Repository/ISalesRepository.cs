using SalesDetailsAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesDetailsAPI.Repository
{
    public interface ISalesRepository
    {
        Task<List<Sales>> GetSalesDetails();
        string InsertSalesDetails(Sales[] saleValue);
    }
}
