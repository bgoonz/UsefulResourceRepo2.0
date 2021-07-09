Imports System.Runtime.Remoting 'General remoting stuff
Imports MathLibrary
Imports System.Threading

Module MathClient

   Sub Main()
      'Load the configuration file
      RemotingConfiguration.Configure("MathClient.exe.config")
      
      'Get a proxy to the remote object
      Dim math As New SimpleMath()
	
      'Call the OneWay WriteToConsole method
      Console.WriteLine("Calling the OneWay method ...")
      math.WriteToConsole("Hello server!")
	
      'Ask user to press enter
      Console.Write("Press enter to end")
      Console.ReadLine()
   End Sub
End Module
