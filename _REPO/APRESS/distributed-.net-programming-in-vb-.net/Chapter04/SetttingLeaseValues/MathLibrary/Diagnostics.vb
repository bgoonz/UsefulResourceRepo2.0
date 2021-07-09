Imports System.Runtime.Remoting.Lifetime

Public Class Diagnostics
   Public Shared Sub ShowLeaseInfo(leaseInfo As ILease)
      Console.WriteLine("*** Lease Information ***")

      If Not leaseInfo Is Nothing Then
         'Show the current lease time
         Console.WriteLine("  Current Lease time: {0}:{1}", _
            leaseInfo.CurrentLeaseTime.Minutes, _
            leaseInfo.CurrentLeaseTime.Seconds _
         )

         'Show the initial lease time
         Console.WriteLine("  Initial Lease time: {0}:{1}", _
            leaseInfo.InitialLeaseTime.Minutes, _
            leaseInfo.InitialLeaseTime.Seconds _
         )

         'Show the renew on call time
         Console.WriteLine("  Renew on call time: {0}:{1}", _
            leaseInfo.RenewOnCallTime.Minutes, _
            leaseInfo.RenewOnCallTime.Seconds _
         )

         'Show the current state
         Console.WriteLine("  Current state: {0}", leaseInfo.CurrentState)
      Else
         'No lease information
         Console.WriteLine("  No Lease Info!!")
      End If
   End Sub

End Class
