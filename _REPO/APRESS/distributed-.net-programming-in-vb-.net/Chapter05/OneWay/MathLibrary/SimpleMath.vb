Imports System.Threading
Imports System.Runtime.Remoting.Messaging 'For OneWayAttribute

Public Class SimpleMath
   Inherits MarshalByRefObject
   
   <OneWay()> _
   Public Sub WriteToConsole(msg as String)
      'Waste some time
      Thread.Sleep(5000)
      Console.WriteLine("The message from client is {0}", msg)
   End Sub

   Public Sub New()
      Console.WriteLine("SimpleMath ctor called")
   End Sub

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