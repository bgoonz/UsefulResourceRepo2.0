Option Explicit On 
Option Strict On

Imports System
Imports System.Security.Principal
Imports General

Class CustomerManager
    Inherits MarshalByRefObject

    Public Function getCustomer(ByVal id As Integer) As Customer
        Dim machinename As String = Environment.MachineName
        Dim principal As IPrincipal = System.Threading.Thread.CurrentPrincipal

        If Not principal.IsInRole(machinename & "\RemotingUsers") Then
            Throw New UnauthorizedAccessException( _
                "The user is not in group RemotingUsers")
        End If

        Dim tmp As New Customer()

        With tmp
            .FirstName = "John"
            .LastName = "Doe"
            .DateOfBirth = New DateTime(1970, 7, 4)
        End With

        Return tmp
    End Function
End Class

