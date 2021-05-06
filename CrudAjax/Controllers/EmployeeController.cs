using CrudAjax.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CrudAjax.Controllers
{
    public class EmployeeController : Controller
    {
        EmployeeDB employeeDB = new EmployeeDB();
        // GET: Employee
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult List()
        {
            return Json(employeeDB.ListAll(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Add(Employee emp)
        {
            return Json(employeeDB.Add(emp), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetbyID(int ID)
        {
            var Employee = employeeDB.ListAll().Find(x => x.EmployeeID.Equals(ID));
            return Json(Employee, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Employee emp)
        {
            return Json(employeeDB.Update(emp), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(employeeDB.Delete(ID), JsonRequestBehavior.AllowGet);
        }
    }
}