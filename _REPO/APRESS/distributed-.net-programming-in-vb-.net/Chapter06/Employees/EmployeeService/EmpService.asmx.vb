Imports System.Web.Services
Imports System.Xml.Serialization

Public Class EmployeeService

   <WebMethod()> _
   Public Function GetEmployee(id as Integer) As EmployeeData
      If id = 1 Then
         Return New Boss(id, "Marge", "333-33-3333")
      Else
         Return New WageEmployee(id, "Homer", "444-44-4444")
      End If
   End Function
   
   <WebMethod()> _
   Public Function ComputeEmployeePay(emp As EmployeeData) As Double
      Return emp.ComputePay()
   End Function

   <WebMethod()> _
   Public Function GetAllEmployees() As ArrayList
      Dim emps As New ArrayList()
      emps.Add(New Boss(1, "Marge", "333-33-3333"))
      emps.Add(New WageEmployee(2, "Homer", "444-44-4444"))
      Return emps
   End Function
   
End Class

<XmlInclude(GetType(WageEmployee)), XmlInclude(GetType(Boss))> _
Public MustInherit Class EmployeeData
   Public Name As String
   Public SSN As String

   <XmlAttribute()> Public Id As Integer
   
   Public MustOverride Function ComputePay() As Double

   Public Sub New(id As Integer, name As String, ssn As String)
      Me.Id = id : Me.Name = name : Me.SSN = ssn
   End Sub

   Public Overrides Function ToString() as String
      Return string.Format("ID={0};Name={1};SSN={2}", Id, Name, SSN)
   End Function

   'Required by XmlSerializer
   Public Sub New()
   End Sub   
End Class

Public Class WageEmployee 
   Inherits EmployeeData

   Public Wage As Double
   Public Hours As Double

   Public Overrides Function ComputePay() as Double
      Return Wage * Hours
   End Function   

   Friend Sub New(id As Integer, name As String, ssn As String)
      MyBase.New(id, name, ssn)
      Wage = 10 : Hours = 40
   End Sub 
   
   Public Sub New
   End Sub     
End Class

Public Class Boss 
   Inherits EmployeeData

   Public Salary As Double

   Public Overrides Function ComputePay() as Double
      Return Salary
   End Function   

   Friend Sub New(id As Integer, name As String, ssn As String)
      MyBase.New(id, name, ssn)
      Salary = 9999
   End Sub  
   
   Public Sub New
   End Sub     
End Class

