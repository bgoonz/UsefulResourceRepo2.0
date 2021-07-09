Option Explicit On 
Option Strict On

Imports System
Imports System.Runtime.Remoting.Lifetime
Imports System.Runtime.Remoting


Public Class DefaultLifeTimeSingleton
    Inherits MarshalByRefObject

    Public Sub New()
        Console.WriteLine("DefaultLifeTimeSingleton.CTOR called")
    End Sub

    Public Sub doSomething()
        Console.WriteLine("DefaultLifeTimeSingleton.doSomething called")
    End Sub
End Class


Public Class LongerLivingSingleton
    Inherits MarshalByRefObject

    Public Overrides Function InitializeLifetimeService() As Object
        Dim tmp As ILease = CType(MyBase.InitializeLifetimeService(), ILease)
        If tmp.CurrentState = LeaseState.Initial Then
            tmp.InitialLeaseTime = TimeSpan.FromSeconds(5)
            tmp.RenewOnCallTime = TimeSpan.FromSeconds(1)
        End If
        Return tmp
    End Function

    Public Sub New()
        Console.WriteLine("LongerLivingSingleton.CTOR called")
    End Sub

    Public Sub doSomething()
        Console.WriteLine("LongerLivingSingleton.doSomething called")
    End Sub
End Class


Public Class InfinitelyLivingSingleton
    Inherits MarshalByRefObject

    Public Overrides Function InitializeLifetimeService() As Object
        Return Nothing
    End Function

    Public Sub New()
        Console.WriteLine("InfinitelyLivingSingleton.CTOR called")
    End Sub

    Public Sub doSomething()
        Console.WriteLine("InfinitelyLivingSingleton.doSomething called")
    End Sub
End Class


Module ServerStartup
    Sub Main()
        RemotingConfiguration.Configure("server.exe.config")
        Console.WriteLine("Press <return> to exit")
        Console.ReadLine()
    End Sub
End Module
