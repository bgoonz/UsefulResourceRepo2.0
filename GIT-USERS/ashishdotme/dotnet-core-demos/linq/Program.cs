/**
 * Created by Ashish Patel
 * Copyright © 2018 ashish.me
 * ashishsushilpatel@gmail.com 
 */

using Newtonsoft.Json;
using System;
using System.Collections;
using System.Linq;

namespace linq
{
	class Employee
	{
		public int EmployeeID { get; set; }
		public String EmployeeName { get; set; }
		public int Age { get; set; }
	}

	public static class Program
    {
        static void Main(string[] args)
        {
			Employee[] EmployeeArray = {
					new Employee() { EmployeeID = 1, EmployeeName = "Ashish Patel", Age = 18 } ,
					new Employee() { EmployeeID = 1, EmployeeName = "Ansu Patel", Age = 18 } ,
					new Employee() { EmployeeID = 2, EmployeeName = "Rahul Patel",  Age = 21 } ,
					new Employee() { EmployeeID = 3, EmployeeName = "Tushar Patel",  Age = 25 } ,
					new Employee() { EmployeeID = 4, EmployeeName = "Amit Patel" , Age = 20 } ,
				};


			// Where
			Console.WriteLine("-== WHERE ==-");
			var employeeList = EmployeeArray.Where(s => s.Age == 18).ToList<Employee>();
			foreach (Employee item in employeeList)
			{
				Console.WriteLine(JsonConvert.SerializeObject(item, Formatting.Indented));
			}
			Console.WriteLine("__________________________________________");

			// OrderBy
			Console.WriteLine("-== ORDER BY ==-");
			var employeeListOrdered = EmployeeArray.OrderBy(s => s.Age).ToList<Employee>();
			foreach (Employee item in employeeListOrdered)
			{
				Console.WriteLine(JsonConvert.SerializeObject(item, Formatting.Indented));
			}
			Console.WriteLine("__________________________________________");

			// OfType
			Console.WriteLine("-== OFTYPE ==-");
			ArrayList data = new ArrayList();
			data.Add(4);
			data.Add("June");
			data.Add(4);
			data.Add("My birthday");
			var filteredData = data.OfType<string>().ToList();
			filteredData.ForEach(Console.WriteLine);
			Console.WriteLine("__________________________________________");

			// ThenBy
			Console.WriteLine("-== THEN BY ==-");
			employeeListOrdered = EmployeeArray.OrderBy(s => s.Age).ThenBy(s => s.EmployeeName).ToList<Employee>();
			foreach (Employee item in employeeListOrdered)
			{
				Console.WriteLine(JsonConvert.SerializeObject(item, Formatting.Indented));
			}
			Console.WriteLine("__________________________________________");

			// GroupBy
			Console.WriteLine("-== GROUP BY ==-");
			var groupedEmployee = EmployeeArray.GroupBy(s => s.Age).ToList();
			foreach (var item in groupedEmployee)
			{
				Console.WriteLine(JsonConvert.SerializeObject(item, Formatting.Indented));
			}
			Console.WriteLine("__________________________________________");

		}
    }
}
