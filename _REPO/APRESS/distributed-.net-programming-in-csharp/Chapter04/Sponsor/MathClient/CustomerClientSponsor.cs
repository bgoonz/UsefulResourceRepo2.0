using System;
using System.Runtime.Remoting.Lifetime;

namespace MathClient
{
   class CustomerClientSponsor : MarshalByRefObject, ISponsor
   {
      private int mRenewCount = 0;
      
      // Implements ISponsor.Renewal
      public TimeSpan Renewal(ILease leaseInfo)
      {
         if (mRenewCount < 3)
         {
            mRenewCount++;

            // Just a trace messsage for testing.
            Console.WriteLine("CustomerClientSponsor.Renewal()");
            return TimeSpan.FromSeconds(5);
         } 
         else 
         {
            // Just a trace messsage for testing.
            Console.WriteLine("CustomerClientSponsor.Renewal(), returning 0 time!");
            return TimeSpan.FromSeconds(0);
         }
      }
   }
}
