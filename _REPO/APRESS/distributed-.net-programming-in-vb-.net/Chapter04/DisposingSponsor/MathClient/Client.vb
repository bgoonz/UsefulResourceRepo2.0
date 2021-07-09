Imports System.Runtime.Remoting 'General remoting stuff
Imports System.Runtime.Remoting.Lifetime 'ILease
Imports MathLibrary

Module MathClient

   Sub Main()
      RemotingConfiguration.Configure("MathClient.exe.config")
      Dim cust As New Customer("Homer")
        
      'Loop until user enters "q" to quit
      Console.WriteLine("Enter 'q' to quit: ")
      Do
         Console.WriteLine("Server returns: {0}", cust.SayHello())
      Loop While Console.ReadLine() <> "q"
   End Sub

End Module

