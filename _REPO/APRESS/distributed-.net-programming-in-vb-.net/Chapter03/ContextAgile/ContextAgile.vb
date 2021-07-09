Imports System.Runtime.Remoting.Contexts
Imports System.Threading

Module ContextAgile

   Sub Main()
      Dim myAgile As New MyAgileClass()

      'Display myAgile's context info. Since this is an agile object,
      'it should be in the default context.
      myAgile.DisplayContextInfo()

      'Send myAgile into the context bound object.
      Dim myBound As New MyContextBoundClass(myAgile)

      Console.ReadLine()
   End Sub

End Module

'A context bound class
<Synchronization()> _
Public Class MyContextBoundClass 
   Inherits ContextBoundObject

   Public Sub New()
      Console.WriteLine()
      Console.WriteLine("*** In MyContextBoundClass Constructor ***")
      Diagnostics.DisplayContextInfo()        
   End Sub

   Public Sub New(myAgile as MyAgileClass)
      Me.New()  'Execute the default ctor

      'Display the given object's context info. Since this is an agile
      'object, it should be in the context bound object's context.
      myAgile.DisplayContextInfo()
   End Sub
End Class

'This is a context agile class
Public Class MyAgileClass

   Public Sub DisplayContextInfo()
      Console.WriteLine()
	   Console.WriteLine("*** MyAgileClass.DisplayContextInfo() ***")
	   Diagnostics.DisplayContextInfo()
   End Sub

End Class

'Just a helper class to display context information
Public Class Diagnostics
   
   'Displays the context id and properties for the given context.
   Shared Sub DisplayContextInfo()
      Dim ctx As Context = Thread.CurrentContext
      Console.WriteLine("   Properties for context id: {0}", ctx.ContextID)

      Dim ctxProp As IContextProperty
      For Each ctxProp In ctx.ContextProperties
         Console.WriteLine("     {0}", ctxProp.Name)
      Next
   End Sub

End Class
