Imports System.Runtime.Remoting 'RemotingServices class
Imports System.Runtime.Remoting.Contexts 'Synchronization attribute
	
Module SimpleContext

   Sub Main()
      Dim myBound As New MyContextBoundClass()
      Dim myAgile As New MyAgileClass()

      'Are they in or out of context?
      Console.WriteLine()
      Console.WriteLine("Is myBound out of context? {0}", _
         RemotingServices.IsObjectOutOfContext(myBound))

      Console.WriteLine("Is myAgile out of context? {0}", _
         RemotingServices.IsObjectOutOfContext(myAgile))

      'Direct reference or proxy?
      Console.WriteLine()
      Console.WriteLine("Is myBound a proxy? {0}", _
         RemotingServices.IsTransparentProxy(myBound))

      Console.WriteLine("Is myAgile a proxy? {0}", _
         RemotingServices.IsTransparentProxy(myAgile))

      Console.ReadLine()
   End Sub

End Module

'A context bound class
<Synchronization()> _
Public Class MyContextBoundClass 
   Inherits ContextBoundObject
End Class

'This is a context agile class
Public Class MyAgileClass
End Class
	   
