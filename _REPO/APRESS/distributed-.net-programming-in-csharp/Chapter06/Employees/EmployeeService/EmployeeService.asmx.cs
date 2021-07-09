using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Web;
using System.Web.Services;
using System.Xml.Serialization;

namespace Employees
{
   public class EmployeeService : System.Web.Services.WebService
   {
      [WebMethod]
      public EmployeeData GetEmployee(int Id)
      {
         if (Id == 1)
         {
            return new Boss(Id, "Marge", "333-33-3333");
         }
         else
         {
            return new WageEmployee(Id, "Homer", "444-44-4444");
         }
      }

      [WebMethod]
      public double ComputeEmployeePay(EmployeeData emp)
      {
         return emp.ComputePay();
      }

      [WebMethod]
      public ArrayList GetAllEmployees()
      {
         ArrayList emps = new ArrayList();
         emps.Add(new Boss(1, "Marge", "333-33-3333"));
         emps.Add(new WageEmployee(2, "Homer", "444-44-4444"));
         return emps;
      }
   }

   [XmlInclude(typeof(WageEmployee)), XmlInclude(typeof(Boss))]
   public abstract class EmployeeData
   {
      public string Name;
      public string SSN;

      [XmlAttribute()]
      public int Id;

      public EmployeeData(int id, string name, string ssn)
      {
         Id = id; Name = name; SSN = ssn;
      }

      public override string ToString()
      {
         return string.Format("ID={0};Name={1};SSN={2}", Id, Name, SSN);
      }

      public abstract double ComputePay();

      // Required by XmlSerializer
      public EmployeeData(){}
   }

   public class WageEmployee : EmployeeData
   {
      public double Wage;
      public double Hours;

      public override double ComputePay()
      { 
         return Wage * Hours; 
      }

      internal WageEmployee(int  id, string name, string ssn)
         : base(id, name, ssn) 
      {
         Wage = 10; 
         Hours = 40;
      }

      public WageEmployee(){}
   }

   public class Boss : EmployeeData
   {
      public double Salary;

      public override double ComputePay()
      { 
         return Salary; 
      }

      internal Boss(int id, string name, string ssn)
         : base(id, name, ssn) 
      {
         Salary = 9999; 
      }

      public Boss(){}
   }
}
