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

        Console.WriteLine("Client.Main(): Reference to CustomerManager acquired")

        Dim cust As Customer = mgr.getCustomer(4711)
        mgr.setCustomer(cust)

        Console.WriteLine("Done. Everything worked as expected")
        Console.ReadLine()

    End Sub
End Module