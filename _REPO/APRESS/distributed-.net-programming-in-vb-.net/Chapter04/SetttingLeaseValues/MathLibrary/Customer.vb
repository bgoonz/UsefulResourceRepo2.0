Imports System.Runtime.Remoting.Lifetime 'ILease

Public Class Customer
   Inherits MarshalByRefObject

   Private mName As String

   Public Sub New()
      Console.WriteLine("Customer.ctor()")
   End Sub

   Public Sub New(name As String)
      Console.WriteLine("Customer.ctor({0})", name)
      mName = name
   End Sub
   
   Public Function SayHello() As String
      Console.WriteLine("Customer.SayHello()")

      'Show the lease information for this object
      Diagnostics.ShowLeaseInfo(CType(Me.GetLifetimeService(), ILease))

      Return "Hello " & mName
   End Function

   Public Overrides Function InitializeLifetimeService() As Object
      'Call base class version
      Dim leaseInfo As ILease
      leaseInfo = CType(MyBase.InitializeLifetimeService(), ILease)

      'Set lease values
      leaseInfo.InitialLeaseTime = TimeSpan.FromSeconds(7)
      leaseInfo.RenewOnCallTime = TimeSpan.FromSeconds(3)
      Return leaseInfo   
   End Function
     
End Class