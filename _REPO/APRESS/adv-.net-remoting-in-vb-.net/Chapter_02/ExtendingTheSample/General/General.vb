Option Explicit On 
Option Strict On

Imports System

Public Interface ICustomerManager
    Function getCustomer(ByVal id As Integer) As Customer
    Function validate(ByVal cust As Customer) As ValidationResult
End Interface


<Serializable()> _
Public Class ValidationResult

    Public Sub New(ByVal ok As Boolean, ByVal msg As String)
        Console.WriteLine("ValidationResult.ctor: Object created")
        Me.Ok = ok
        Me.ValidationMessage = msg
    End Sub 'New

    Public Ok As Boolean
    Public ValidationMessage As String

End Class

<Serializable()> _
Public Class Customer

    Public FirstName As String
    Public LastName As String
    Public DateOfBirth As DateTime


    Public Sub New()
        Console.WriteLine("Customer.constructor: Object created")
    End Sub 'New


    Public Function getAge() As Integer
        Console.WriteLine("Customer.getAge(): Calculating age of {0}, " & _
            "born on {1}.", FirstName, DateOfBirth.ToShortDateString())

        Dim tmp As TimeSpan = DateTime.Today.Subtract(DateOfBirth)
        Return tmp.Days \ 365 ' rough estimation
    End Function
End Class
