Imports System.Threading

Public Class SimpleMathResult
   Inherits MarshalByRefObject
   
   Public Sub MathCallback(result As Integer)
      
      'Display the current thread ID
      Console.WriteLine("MathCallback executing on thread {0}", _
         Thread.CurrentThread.GetHashCode())

      Console.WriteLine("Add result is {0}", result)
   End Sub
End Class