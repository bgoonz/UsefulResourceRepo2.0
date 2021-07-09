Imports System.Runtime.Remoting.Contexts 'Context class
Imports System.Threading   'Thread class

Module DisplayContextInfo

    Sub Main()
      'Display the default context info
      Console.WriteLine()
      Console.WriteLine("*** In Main *** ")
      Diagnostics.DisplayContextInfo()

      'Constructor displays synchronized context info
      Dim myBound As New MyContextBoundClass()

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
End Class

'This is a context agile class
Public Class MyAgileClass
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