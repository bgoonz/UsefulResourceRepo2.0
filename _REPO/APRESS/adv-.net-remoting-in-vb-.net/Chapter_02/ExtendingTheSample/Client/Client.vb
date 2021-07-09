Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting
Imports General
Imports System.Runtime.Remoting.Channels.Http
Imports System.Runtime.Remoting.Channels

Module Client

    Sub Main()
        Dim channel As New HttpChannel()
        ChannelServices.RegisterChannel(channel)

        Dim mgr As ICustomerManager = CType(Activator.GetObject( _
            GetType(ICustomerManager), "http://localhost:1234/CustomerManager.soap"), _
            ICustomerManager)
        Console.WriteLine("Client.main(): Reference to rem. object acquired")

        Console.WriteLine("Client.main(): Creating customer")
        Dim cust As New Customer()
        cust.FirstName = "Joe"
        cust.LastName = "Smith"
        cust.DateOfBirth = New DateTime(1800, 5, 12)

        Console.WriteLine("Client.main(): Will call validate")
        Dim res As ValidationResult = mgr.validate(cust)
        Console.WriteLine("Client.main(): Validation finished")

        Console.WriteLine("Validation result for {0} {1}" & vbCrLf & _
            "-> {2}: {3}", cust.FirstName, cust.LastName, res.Ok.ToString(), _
            res.ValidationMessage)

        Console.ReadLine()

    End Sub
End Module