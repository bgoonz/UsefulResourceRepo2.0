Imports System.Runtime.Remoting.Lifetime 'ILease
Imports System.Threading

Public Class Customer
   Inherits MarshalByRefObject
   Implements IDisposable

   Private mName As String

   Public Sub New()
      Console.WriteLine("Customer.ctor()")
   End Sub

   Public Sub New(name As String)
      Console.WriteLine("Customer.ctor({0}) on thread {1}", name, _
         Thread.CurrentThread.GetHashCode())
      mName = name
   End Sub

   Public Function SayHello() As String
      Console.WriteLine("Customer.SayHello() on thread {0}", _
         Thread.CurrentThread.GetHashCode())
      Return "Hello " & mName
   End Function

   Public Overrides Function InitializeLifetimeService() As Object
      'Call base class version
      Dim leaseInfo As ILease
      leaseInfo = CType(MyBase.InitializeLifetimeService(), ILease)

      'Register a CustomerSponsor object as a sponsor.
      leaseInfo.Register(New CustomerSponsor())
      
      'Register a DisposingSponsor object
      leaseInfo.Register(New DisposingSponsor(Me))
      
      Return leaseInfo
   End Function

   Public Sub Dispose() Implements IDisposable.Dispose
      Console.WriteLine("Customer.Dispose() on thread {0}", _
         Thread.CurrentThread.GetHashCode())
      GC.SuppressFinalize(Me)
   End Sub

   Protected Overrides Sub Finalize()
      Console.WriteLine("Customer.Finalize()")
      MyBase.Finalize()
   End Sub
End Class

Class CustomerSponsor
   Implements ISponsor

   Private mRenewCount As Integer = 0

   Public Function Renewal(leaseInfo As ILease) As TimeSpan _
      Implements ISponsor.Renewal

      'Just a trace message for testing
      Console.WriteLine("CustomerSponsor.Renewal()")

      If mRenewCount < 3 Then
         mRenewCount += 1
         Return TimeSpan.FromSeconds(5)
      Else
         Return TimeSpan.FromSeconds(0)
      End If
   End Function

End Class
