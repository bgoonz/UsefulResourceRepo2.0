Imports System
Imports System.Runtime.Remoting.Lifetime
Imports System.Runtime.Remoting
Imports Server ' for ExtendedMBRObject

Namespace Sponsors

    Public Class InstanceSponsor
        Inherits ExtendedMBRObject
        Implements ISponsor
        Public lastKeepAlive As DateTime

        Public Sub New()
            Console.WriteLine("{0} SPONSOR: Created ", DateTime.Now)
            lastKeepAlive = DateTime.Now
        End Sub

        Public Sub KeepAlive()
            Console.WriteLine("{0} SPONSOR: KeepAlive() called", DateTime.Now)
            ' tracks the time of the last keepalive call
            lastKeepAlive = DateTime.Now
        End Sub

        Public Function Renewal(ByVal lease As ILease) As TimeSpan _
        Implements ISponsor.Renewal
            Console.WriteLine("{0} SPONSOR: Renewal() called", DateTime.Now)

            ' keepalive needs to be called at least every 5 seconds
            Dim duration As TimeSpan = DateTime.Now.Subtract(lastKeepAlive)
            If duration.TotalSeconds < 5 Then
                Console.WriteLine("{0} SPONSOR: Will renew (10 secs) ", _
                    DateTime.Now)
                Return TimeSpan.FromSeconds(10)
            Else
                Console.WriteLine("{0} SPONSOR: Won't renew further", _
                    DateTime.Now)
                Return TimeSpan.Zero
            End If
        End Function

    End Class
End Namespace