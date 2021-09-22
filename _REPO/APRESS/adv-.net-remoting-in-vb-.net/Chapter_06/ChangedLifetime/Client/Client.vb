Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting
Imports System.Threading
Imports Server

Module Client

    Sub Main()
        Dim filename As [String] = "client.exe.config"
        RemotingConfiguration.Configure(filename)

        Dim def As New DefaultLifeTimeSingleton()
        Dim lng As New LongerLivingSingleton()
        Dim inf As New InfinitelyLivingSingleton()

        ' *** FIRST BLOCK ****
        Console.WriteLine("Calling DefaultLifeTimeSingleton")
        def.doSomething()
        Console.WriteLine("Sleeping 100 msecs")
        Thread.Sleep(100)
        Console.WriteLine("Calling DefaultLifeTimeSingleton (will be new)")
        def.doSomething() ' this will be a new instance

        ' *** SECOND BLOCK ****
        Console.WriteLine("Calling LongerLivingSingleton")
        lng.doSomething()
        Console.WriteLine("Sleeping 100 msecs")
        Thread.Sleep(100)
        Console.WriteLine("Calling LongerLivingSingleton (will be same)")
        lng.doSomething() ' this will be the same instance
        Console.WriteLine("Sleeping 6 seconds")
        Thread.Sleep(6000)
        Console.WriteLine("Calling LongerLivingSingleton (will be new)")
        lng.doSomething() ' this will be a new same instance

        ' *** THIRD BLOCK ****
        Console.WriteLine("Calling InfinitelyLivingSingleton")
        inf.doSomething()
        Console.WriteLine("Sleeping 100 msecs")
        Thread.Sleep(100)
        Console.WriteLine("Calling InfinitelyLivingSingleton (will be same)")
        inf.doSomething() ' this will be the same instance
        Console.WriteLine("Sleeping 6 seconds")
        Thread.Sleep(6000)
        Console.WriteLine("Calling InfinitelyLivingSingleton (will be same)")
        inf.doSomething() ' this will be a new same instance

        Console.ReadLine()
    End Sub
End Module
