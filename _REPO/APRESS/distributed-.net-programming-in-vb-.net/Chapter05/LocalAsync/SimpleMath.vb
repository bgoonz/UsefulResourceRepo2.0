Imports System.Threading

Public Class SimpleMath
   
   Public Function Add(n1 As Integer, n2 As Integer) As Integer
      
      'Display the current thread id
      Console.WriteLine("SimpleMath.Add() executing on thread {0}", _
         Thread.CurrentThread.GetHashCode())

      'Waste some time
      Thread.Sleep(5000)

      Return n1 + n2
   End Function
   
   Public Function Subtract(n1 As Integer, n2 As Integer) As Integer
      
      'Display the current thread id
      Console.WriteLine("SimpleMath.Subtract() executing on thread {0}", _
         Thread.CurrentThread.GetHashCode())

      'Waste some time
      Thread.Sleep(5000)
      
      Return n1 - n2
   End Function 
End Class