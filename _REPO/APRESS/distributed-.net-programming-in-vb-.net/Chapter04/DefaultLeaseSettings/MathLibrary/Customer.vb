Imports System.Runtime.Remoting.Lifetime

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
    
End Class