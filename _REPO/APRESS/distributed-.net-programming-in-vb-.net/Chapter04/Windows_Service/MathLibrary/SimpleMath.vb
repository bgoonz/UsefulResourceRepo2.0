Public Class SimpleMath
   Inherits MarshalByRefObject

   Public Sub New()
      WriteLogEntry("SimpleMath ctor called")
   End Sub

   Public Function Add(n1 As Integer, n2 As Integer) As Integer
      WriteLogEntry(String.Format("SimpleMath.Add({0}, {1})", n1, n2))
      Return n1 + n2
   End Function

   Public Function Subtract(n1 As Integer, n2 As Integer) As Integer
      WriteLogEntry(String.Format("SimpleMath.Subtract({0}, {1})", n1, n2))
      Return n1 - n2
   End Function

   Public Shared Sub WriteLogEntry(msg As String)
      EventLog.WriteEntry("MathService", msg)
   End Sub

End Class