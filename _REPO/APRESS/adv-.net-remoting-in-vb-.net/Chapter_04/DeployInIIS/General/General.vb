Option Explicit On 
Option Strict On

Imports System

<Serializable()> _
Public Class Customer

    Public FirstName As String
    Public LastName As String
    Public DateOfBirth As DateTime

    Public Sub New()
        Console.WriteLine("Customer.constructor: Object created")
    End Sub

    Public Function getAge() As Integer
        Console.WriteLine("Customer.getAge(): Calculating age of {0}, born " & _
            " on {1}", FirstName, DateOfBirth)

        Dim tmp As TimeSpan = DateTime.Today.Subtract(DateOfBirth)
        Return tmp.Days \ 365 ' rough estimation
    End Function
End Class
