Imports System.Runtime.Remoting 'General remoting stuff
Imports MathLibrary

Module MathClient

   Sub Main()
      'Load the configuration file
      RemotingConfiguration.Configure("MathClient.exe.config")
	
	   'Get a proxy to the remote object
	   Dim math As New SimpleMath()

      'Use the remote object. 
      Console.WriteLine("5 + 2 = {0}", math.Add(5,2))
      Console.WriteLine("5 - 2 = {0}", math.Subtract(5,2))
	     
      'Ask user to press Enter
      Console.Write("Press enter to end")
      Console.ReadLine()
   End Sub

End Module
