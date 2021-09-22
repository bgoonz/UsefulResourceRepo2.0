Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Serialization

<Serializable()> _
Public Class Customer
    Implements ISerializable

    Public FirstName As String
    Public LastName As String
    Public DateOfBirth As DateTime
    Public Title As String

    Public Sub New()
        ' default constructor
    End Sub

    Public Sub New(ByVal info As SerializationInfo, _
                ByVal context As StreamingContext)

        FirstName = info.GetString("FirstName")
        LastName = info.GetString("LastName")
        DateOfBirth = info.GetDateTime("DateOfBirth")
        Try
            Title = info.GetString("Title")
        Catch
            Title = "n/a"
        End Try
    End Sub

    Public Sub GetObjectData(ByVal info As SerializationInfo, _
                ByVal context As StreamingContext) _
                Implements ISerializable.GetObjectData

        info.AddValue("FirstName", FirstName)
        info.AddValue("LastName", LastName)
        info.AddValue("DateOfBirth", DateOfBirth)
        info.AddValue("Title", Title)
    End Sub

End Class

Public Interface ICustomerManager
    Function getCustomer(ByVal id As Integer) As Customer
    Sub setCustomer(ByVal cust As Customer)
End Interface
