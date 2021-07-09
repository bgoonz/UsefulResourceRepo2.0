Option Explicit On 
Option Strict On

Imports System
Imports General

Class CustomerManager
    Inherits MarshalByRefObject

    Public Function getCustomer(ByVal id As Integer) As Customer
        Dim tmp As New Customer()

        With tmp
            .FirstName = "John"
            .LastName = "Doe"
            .DateOfBirth = New DateTime(1970, 7, 4)
        End With

        Return tmp
    End Function
End Class

