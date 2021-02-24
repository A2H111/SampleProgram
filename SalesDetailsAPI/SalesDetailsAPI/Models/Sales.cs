using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SalesDetailsAPI.Models
{
    public class Sales
    {
        public int? Id { get; set; }
        public string stateName { get; set;}
        public string Month { get; set; }
        public int Value { get; set; }
    }
}
