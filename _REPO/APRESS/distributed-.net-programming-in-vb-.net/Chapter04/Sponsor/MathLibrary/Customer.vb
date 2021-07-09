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

      'Register a CustomerSponsor object as a sponsor.
      leaseInfo.Register(New CustomerSponsor())
      Return leaseInfo
   End Function
     
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
