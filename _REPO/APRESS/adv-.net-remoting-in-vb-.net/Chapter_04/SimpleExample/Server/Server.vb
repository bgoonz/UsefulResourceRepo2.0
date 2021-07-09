Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting
Imports General
Imports System.Runtime.Remoting.Channels.Http
Imports System.Runtime.Remoting.Channels

Class CustomerManager
    Inherits MarshalByRefObject

    Public Sub New()
        Console.WriteLine("CustomerManager.constructor: Object created")
    End Sub

    Public Function getCustomer(ByVal id As Integer) As Customer
        Console.WriteLine("CustomerManager.getCustomer(): called")
        Dim tmp As New Customer()

        With tmp
            .FirstName = "John"
            .LastName = "Doe"
            .DateOfBirth = New DateTime(1970, 7, 4)
        End With

        Console.WriteLine("CustomerManager.getCustomer(): Returning customer object")
        Return tmp
    End Function
End Class


Module ServerStartup
    Sub Main()
        Console.WriteLine("ServerStartup.Main(): Server started")

        Dim filename As String = "server.exe.config"
        RemotingConfiguration.Configure(filename)

        ' the server will keep running until keypress.
        Console.WriteLine("Server is running, Press <return> to exit.")
        Console.ReadLine()
    End Sub
End Module


