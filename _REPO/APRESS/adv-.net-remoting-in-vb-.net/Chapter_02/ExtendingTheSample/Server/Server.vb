Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting
Imports General
Imports System.Runtime.Remoting.Channels.Http
Imports System.Runtime.Remoting.Channels

Class CustomerManager
    Inherits MarshalByRefObject
    Implements ICustomerManager

    Public Sub New()
        Console.WriteLine("CustomerManager.constructor: Object created")
    End Sub


    Public Function getCustomer(ByVal id As Integer) As Customer _
    Implements ICustomerManager.getCustomer
        Console.WriteLine("CustomerManager.getCustomer): Called")

        Dim tmp As New Customer()
        tmp.FirstName = "John"
        tmp.LastName = "Doe"
        tmp.DateOfBirth = New DateTime(1970, 7, 4)

        Console.WriteLine(("CustomerManager.getCustomer(): Returning " & _
            "Customer-Object"))

        Return tmp
    End Function


    Public Function validate(ByVal cust As Customer) As ValidationResult _
    Implements ICustomerManager.validate

        Dim age As Integer = cust.getAge()
        Console.WriteLine("CustomerManager.validate() for {0} aged {1}", _
            cust.FirstName, age)

        If cust.FirstName Is Nothing Or cust.FirstName.Length = 0 Then
            Return New ValidationResult(False, "Firstname missing")
        End If

        If cust.LastName Is Nothing Or cust.LastName.Length = 0 Then
            Return New ValidationResult(False, "Lastname missing")
        End If

        If age < 0 Or age > 120 Then
            Return New ValidationResult(False, "Customer must be younger than 120 years")
        End If

        Return New ValidationResult(True, "Validation succeeded")
    End Function

End Class

Module ServerStartup

    Sub Main()
        Console.WriteLine("ServerStartup.Main(): Server started")

        Dim chnl As New HttpChannel(1234)
        ChannelServices.RegisterChannel(chnl)

        RemotingConfiguration.RegisterWellKnownServiceType( _
            GetType(CustomerManager), _
            "CustomerManager.soap", _
            WellKnownObjectMode.Singleton)

        ' the server will keep running until keypress.
        Console.ReadLine()

    End Sub
End Module


