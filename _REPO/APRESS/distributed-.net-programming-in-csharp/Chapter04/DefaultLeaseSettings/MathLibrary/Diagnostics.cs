using System;
using System.Runtime.Remoting.Lifetime;

namespace MathLibrary
{
   public class Diagnostics
   {
      public static void ShowLeaseInfo(ILease leaseInfo)
      {
         Console.WriteLine("*** Lease Information ***");
         //ILease leaseInfo = (ILease)mbrObj.GetLifetimeService();
         if (leaseInfo != null)
         {
            // Show the current lease time
            Console.WriteLine("  Current Lease time: {0}:{1}", 
               leaseInfo.CurrentLeaseTime.Minutes, 
               leaseInfo.CurrentLeaseTime.Seconds
               );
   
            // Show the initial lease time
            Console.WriteLine("  Initial Lease time: {0}:{1}",
               leaseInfo.InitialLeaseTime.Minutes, 
               leaseInfo.InitialLeaseTime.Seconds
               );

            // Show the renew on call time
            Console.WriteLine("  Renew on call time: {0}:{1}", 
               leaseInfo.RenewOnCallTime.Minutes, 
               leaseInfo.RenewOnCallTime.Seconds
               );
            
            // Show the current state
            Console.WriteLine("  Current state: {0}", leaseInfo.CurrentState);
         }
         else
         {
            // No lease information
            Console.WriteLine("  No Lease Info!!");
         }
      }  
   }

}
