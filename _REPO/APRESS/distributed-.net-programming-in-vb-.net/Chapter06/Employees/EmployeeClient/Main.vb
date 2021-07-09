Imports EmpClient.localhost

Module ClientMain

   Sub Main()
      Dim empService AS New EmployeeService()
      Dim emp As EmployeeData = empService.GetEmployee(1)
   
      Console.WriteLine("Employee name: {0}", emp.Name)
      Console.WriteLine("Employee ToString: {0}", emp.ToString())
      
      'Get an array of Employee objects and print info on each
      Dim emps As Object() = empService.GetAllEmployees()

      Dim e As EmployeeData
      For Each e In emps
         Console.WriteLine("Employee name: {0}", e.Name)
         Console.WriteLine("Employee ToString: {0}", e.ToString())

         'Pass employee object back to Web service for pay calculation
         'Note: polymorphism in action!
         Console.WriteLine("Employee pay is: {0}", _
            empService.ComputeEmployeePay(e))
      Next

      

      Console.ReadLine()
   End Sub
   
End Module
