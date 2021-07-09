Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting
Imports System.Collections
Imports System.Threading
Imports System.Runtime.Remoting.Channels
Imports UrlAuthenticationSink
Imports Service

Module Client

    Sub Main()
        Dim filename As String = "testclient.exe.config"
        RemotingConfiguration.Configure(filename)

        UrlAuthenticator.AddAuthenticationEntry( _ 
            "http://localhost", _ 
            "dummyremotinguser", _ 
            "12345")

        UrlAuthenticator.AddAuthenticationEntry( _ 
            "http://www.somewhere.org", _ 
            "MyUser", _ 
            "12345")

        Dim obj As New TestSAO()
        Dim res As String = obj.GetPrincipalName()

        Console.WriteLine("Remote principal: {0}", res)
        Console.ReadLine()
    End Sub

End Module

