Imports System
Imports System.Runtime.Remoting
Imports Server ' from generated_meta.dll
Imports System.Threading

Module Client

    Sub Main()
        Dim filename As [String] = "client.exe.config"
        RemotingConfiguration.Configure(filename)

        Dim obj As New TestSAO()
        test(obj)

        Thread.CurrentThread.Priority = ThreadPriority.Highest
        test(obj)

        Thread.CurrentThread.Priority = ThreadPriority.Lowest
        test(obj)

        Thread.CurrentThread.Priority = ThreadPriority.Normal
        test(obj)

        Console.ReadLine()
    End Sub

    Sub test(ByVal obj As TestSAO)
        Console.WriteLine("----------------- START TEST CASE ---------------")
        Console.WriteLine("   Local Priority: {0}", _ 
            Thread.CurrentThread.Priority.ToString())

        Dim priority1 As String = obj.GetPriority()

        Console.WriteLine("   Remote priority: {0}", priority1.ToString())
        Console.WriteLine("----------------- END TEST CASE ---------------")
    End Sub

End Module

