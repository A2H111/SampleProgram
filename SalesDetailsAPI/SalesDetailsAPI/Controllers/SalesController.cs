using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using SalesDetailsAPI.Models;
using SalesDetailsAPI.Repository;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SalesDetailsAPI.Controllers
{
    [Route("api/[controller]")]
    public class SalesController : Controller
    {
        private readonly ISalesRepository _salesRepository;

        public SalesController(ISalesRepository salesRepository)
        {
            _salesRepository = salesRepository;
        }

        
        [HttpGet]
        public IActionResult Get()
        {
            var results = _salesRepository.GetSalesDetails();
            return Ok(results);
        }

        [HttpPost]
        public IActionResult Post([FromBody]Sales[] saleValue)
        {
            var result = _salesRepository.InsertSalesDetails(saleValue);
            return Ok(result);
        }


      
    }
}
