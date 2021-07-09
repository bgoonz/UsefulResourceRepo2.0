Option Explicit On 
Option Strict On

Imports System
Imports System.Security.Principal

Public Class TestSAO
    Inherits MarshalByRefObject

    Public Function GetPrincipalName() As String
        Dim principal As IPrincipal = _
            System.Threading.Thread.CurrentPrincipal()
        Return principal.Identity.Name
    End Function
End Class