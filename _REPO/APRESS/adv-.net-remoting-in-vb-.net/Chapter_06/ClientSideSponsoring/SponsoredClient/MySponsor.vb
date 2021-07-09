Imports System.Runtime.Remoting.Lifetime

Public Class MySponsor
    Inherits MarshalByRefObject
    Implements ISponsor

    Public doRenewal As Boolean = True

    Public Function Renewal(ByVal lease As ILease) As TimeSpan _
    Implements ISponsor.Renewal
        Console.WriteLine("{0} SPONSOR: Renewal() called", DateTime.Now)

        If doRenewal Then
            Console.WriteLine("{0} SPONSOR: Will renew (10 secs) ", DateTime.Now)
            Return TimeSpan.FromSeconds(10)
        Else
            Console.WriteLine("{0} SPONSOR: Won't renew further", DateTime.Now)
            Return TimeSpan.Zero
        End If
    End Function
End Class