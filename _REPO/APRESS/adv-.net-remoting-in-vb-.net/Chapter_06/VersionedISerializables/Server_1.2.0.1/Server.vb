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
        tmp.Title = "CEO"

        Console.WriteLine(("CustomerManager.getCustomer(): Returning " & _
            "Customer-Object"))

        Return tmp
    End Function

    Public Sub setCustomer(ByVal cust As Customer) _
    Implements ICustomerManager.setCustomer
        ' do nothing specific
    End Sub

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


