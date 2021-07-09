Imports System.Runtime.Remoting.Lifetime 'ISponsor and ILease

Public Class CustomerClientSponsor
   Inherits MarshalByRefObject
   Implements ISponsor
   
   Private mRenewCount As Integer = 0
      
   'Implements ISponsor.Renewal
   Public Function Renewal(leaseInfo As ILease) As TimeSpan _
      Implements ISponsor.Renewal
      
      If mRenewCount < 3 Then        
         mRenewCount += 1

         'Just a trace messsage for testing.
         Console.WriteLine("CustomerClientSponsor.Renewal()")
         Return TimeSpan.FromSeconds(5)       
      Else
         'Just a trace messsage for testing.
         Console.WriteLine("CustomerClientSponsor.Renewal(), returning 0 time!")
         Return TimeSpan.FromSeconds(0)     
      End If
   End Function
   
End Class