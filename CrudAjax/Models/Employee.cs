using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CrudAjax.Models
{
    [Table("Employee")]
    public class Employee
    {
        public int EmployeeID { get; set; }
        public string EmployeeName { get; set; }
        public int Age { get; set; }
        public string EmployeeState { get; set;}
        public string Country { get; set; }
    }
}