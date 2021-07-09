Imports System.Runtime.Remoting.Lifetime

Public Class DisposingSponsor
   Implements ISponsor

   Private mSponsoredObject As IDisposable

   Public Sub New(sponsoredObject As IDisposable)
      mSponsoredObject = sponsoredObject
   End Sub

   Public Function Renewal(lease As ILease) As TimeSpan _
      Implements ISponsor.Renewal

      mSponsoredObject.Dispose()
      Return TimeSpan.FromSeconds(0)
   End Function
End Class
