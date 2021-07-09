using System;
using EmployeeClient.localhost;

namespace EmployeeClient
{
   class ClientMain
   {	
      static void Main(string[] args)
      {
         EmployeeService empService = new EmployeeService();

         // Get a Boss object and call some methods on it
         EmployeeData emp = empService.GetEmployee(1);
         Console.WriteLine("Employee name: {0}", emp.Name);
         Console.WriteLine("Employee ToString: {0}", emp.ToString());

         // Get an array of Employee objects and print info on each
         object[] emps = empService.GetAllEmployees();
         foreach(EmployeeData e in emps)
         {
            Console.WriteLine("Employee name: {0}", e.Name);
            Console.WriteLine("Employee ToString: {0}", e.ToString());
            
            // Pass employee object back to Web service for pay calculation
            // Note: polymorphism in action!
            Console.WriteLine("Employee pay is: {0}", 
               empService.ComputeEmployeePay(e));
         }

         Console.ReadLine();
      }
   }
}
