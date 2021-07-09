Imports System.Runtime.Remoting.Messaging 'CallContext Class
Imports MathLibrary

Module MathClient

   Sub Main()
            
      'Get a proxy to the remote object
      Dim obj As Object = Activator.GetObject( _
                             GetType(MathLibrary.SimpleMath), _
                             "http://localhost:13101/SimpleMath.soap" _
                          )
                          
      'Cast returned object to the ISimpleMath interface
      Dim math as ISimpleMath = CType(obj, ISimpleMath)

      'Store security token info in the call context
      Dim ctxData As New CallContextData("MyToken")
      CallContext.SetData("token", ctxData)

      'Use the remote object. 
      Console.WriteLine("5 + 2 = {0}", math.Add(5,2))
	     
      'Ask user to press Enter
      Console.Write("Press enter to end")
      Console.ReadLine()
   End Sub

End Module
