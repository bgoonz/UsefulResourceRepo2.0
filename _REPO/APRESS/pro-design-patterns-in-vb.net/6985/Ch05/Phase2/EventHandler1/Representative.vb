Imports System
Imports System.Threading
Imports System.Runtime.Remoting
Imports System.Runtime.Remoting.Messaging
Imports System.Collections
Imports Microsoft.VisualBasic
Imports CallCenter

Namespace Representative

    'Event handler interface.	
    Public Interface ICallEventHandler
        Sub onCall(al As ArrayList)
    End Interface 
	
    Public Class CSR 
        Inherits MarshalByRefObject 
        Implements ICallEventHandler

        'Event handler function.
        'For simplicity, we the CSR handles the event by writing the event 
        'properties to the console, and then sleeping for 10 seconds
        Public Sub onCall(al As ArrayList) Implements ICallEventHandler.onCall
            Console.WriteLine("Event passed with an array of {0} properties", al.Count)
            Dim infoItem As InfoItem
            For Each infoItem In al 
                Console.WriteLine("  {0}: {1}", _
                                infoItem.Name, infoItem.Value)
            Next
            Thread.Sleep(10000)
            Console.WriteLine("Slept 10 seconds.")
        End Sub 'onCall
    End Class

End Namespace



