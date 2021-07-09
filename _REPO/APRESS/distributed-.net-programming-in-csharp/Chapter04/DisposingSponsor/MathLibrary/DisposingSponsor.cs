using System;
using System.Runtime.Remoting.Lifetime;

namespace MathLibrary
{
	class DisposingSponsor : ISponsor
	{
      private IDisposable mSponsoredObject;

		public DisposingSponsor(IDisposable sponsoredObject)
		{
			mSponsoredObject = sponsoredObject;
		}

      public TimeSpan Renewal(ILease leaseInfo)
      {
         mSponsoredObject.Dispose();
         return TimeSpan.FromSeconds(0);
      }
	}
}
