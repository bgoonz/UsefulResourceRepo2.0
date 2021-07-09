Imports System.Runtime.Remoting.Messaging 'CallContext class

Module CallContextMain

   Sub Main()
      'Look ma! No parameter passing!
      SetName()
      GetName()
      Console.ReadLine()
   End Sub
   
   Sub SetName()
      CallContext.SetData("name", "Homer")
   End Sub

   Sub GetName()
      Dim name As String = CType(CallContext.GetData("name"), String)
      Console.WriteLine("The name is: {0}", name)
   End Sub

End Module
