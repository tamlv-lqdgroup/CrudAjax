using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace CrudAjax.Models
{
    public class EmployeeDB
    {
        string cs = ConfigurationManager.ConnectionStrings["crudajax"].ConnectionString;

        public List<Employee> ListAll()
        {
            List<Employee> lst = new List<Employee>();

            using(SqlConnection con = new SqlConnection(cs))
            {
                // Mở kết nối
                con.Open();

                SqlCommand comm = new SqlCommand("SelectEmployee", con);
                comm.CommandType = CommandType.StoredProcedure;
                SqlDataReader rdr = comm.ExecuteReader();

                while (rdr.Read())
                {
                    lst.Add(new Employee
                    {
                        EmployeeID = Convert.ToInt32(rdr["EmployeeID"]),
                        EmployeeName = rdr["EmployeeName"].ToString(),
                        Age = Convert.ToInt32(rdr["Age"]),
                        EmployeeState = rdr["EmployeeState"].ToString(),
                        Country = rdr["Country"].ToString()
                    });
                }

                con.Close();

                return lst;
            }
        }

        public int Add(Employee emp)
        {
            int i; 

            using(SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand comm = new SqlCommand("InsertUpdateEmployee", con);

                comm.CommandType = CommandType.StoredProcedure;
                comm.Parameters.AddWithValue("@ID", emp.EmployeeID);
                comm.Parameters.AddWithValue("@Name", emp.EmployeeName);
                comm.Parameters.AddWithValue("@Age", emp.Age);
                comm.Parameters.AddWithValue("@State", emp.EmployeeState);
                comm.Parameters.AddWithValue("@Country", emp.Country);
                comm.Parameters.AddWithValue("@Action", "Insert");

                i = comm.ExecuteNonQuery();
            }
            return i;
        }

        public int Update(Employee emp)
        {
            int i;

            using (SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand comm = new SqlCommand("InsertUpdateEmployee", con);

                comm.CommandType = CommandType.StoredProcedure;
                comm.Parameters.AddWithValue("@ID", emp.EmployeeID);
                comm.Parameters.AddWithValue("@Name", emp.EmployeeName);
                comm.Parameters.AddWithValue("@Age", emp.Age);
                comm.Parameters.AddWithValue("@State", emp.EmployeeState);
                comm.Parameters.AddWithValue("@Country", emp.Country);
                comm.Parameters.AddWithValue("@Action", "Update");

                i = comm.ExecuteNonQuery();
            }
            return i;
        }

        public int Delete(int ID)
        {
            int i;
            using(SqlConnection con = new SqlConnection(cs))
            {
                con.Open();

                SqlCommand com = new SqlCommand("DeleteEmployee", con);
                com.CommandType = CommandType.StoredProcedure;
                com.Parameters.AddWithValue("@Id", ID);
                i = com.ExecuteNonQuery();

                con.Close();
            }

            return i;
        }
    }
}