Imports System
Imports System.Runtime.Remoting
Imports System.Runtime.Remoting.Channels.Http
Imports System.Runtime.Remoting.Channels
Imports System.Collections
Imports General
Imports Server   ' from the "SoapSuds_Generated"-project

Module Client

    Sub Main()
        Dim filename As String = "client.exe.config"
        RemotingConfiguration.Configure(filename)

        Dim mgr As New CustomerManager()
        Console.WriteLine("Client.Main(): Reference to CustomerManager" & _
                          " acquired")

        Dim props As IDictionary = ChannelServices.GetChannelSinkProperties(mgr)
        props("username") = "dummyremotinguser"
        props("password") = "12345"

        Try
            Dim cust As General.Customer = mgr.getCustomer(4711)
            Dim age As Integer = cust.getAge()

            Console.WriteLine("Client.Main(): Customer {0} {1} is {2} years old.", _
               cust.FirstName, cust.LastName, age)
        Catch e As Exception
            Console.WriteLine("EX: {0}", e.Message)
        End Try

        Console.ReadLine()
    End Sub
End Module