Imports MathLibrary
Imports System.Reflection


Module Reflection

   Sub Main()
      'The many ways of getting a Type object ...
      Dim t As Type

      'Use the GetType operator
      t = GetType(SimpleMath)

      ' Use the GetType method inherited from Object
      t = New SimpleMath().GetType()

      ' Use the shared Type.GetType method.
      ' String format: "<namespace>.<classname>, <assemblyname>"
      t = Type.GetType("MathLibrary.SimpleMath, MathLibrary")

      t = GetType(SimpleMath)

      Dim mi As MethodInfo
      For Each mi In t.GetMethods()
         Console.WriteLine(mi.ToString())
      Next

   End Sub

End Module


