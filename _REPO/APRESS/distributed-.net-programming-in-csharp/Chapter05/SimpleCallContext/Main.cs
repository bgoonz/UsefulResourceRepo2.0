using System;
using System.Runtime.Remoting.Messaging;

namespace SimpleCallContext
{
class CallContextMain
{
	
	static void Main(string[] args)
	{
      // Look ma! No parameter passing!
      SetName();
      GetName();
		Console.ReadLine();
	}

   static void SetName()
   {
      CallContext.SetData("name", "Homer");
   }

   static void GetName()
   {
      string name = (string)CallContext.GetData("name");
      Console.WriteLine("The name is: {0}", name);
   }
}
}
