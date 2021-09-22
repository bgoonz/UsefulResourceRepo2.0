Option Explicit On 
Option Strict On

Imports System
Imports System.Security.Principal
Imports General

Class CustomerManager
    Inherits MarshalByRefObject

    Public Function getCustomer(ByVal id As Integer) As Customer
        Dim principal As IPrincipal = System.Threading.Thread.CurrentPrincipal

        Dim tmp As New Customer()

        With tmp
            .FirstName = principal.Identity.Name
            .LastName = "User"
            .DateOfBirth = New DateTime(1970, 7, 4)
        End With

        Return tmp
    End Function
End Class

