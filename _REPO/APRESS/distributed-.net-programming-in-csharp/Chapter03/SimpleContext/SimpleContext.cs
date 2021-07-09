
namespace SimpleContext
{
   using System;
   using System.Runtime.Remoting.Contexts; // Synchronization attribute
   using System.Runtime.Remoting;          // RemotingServices class
   
	class SimpleContextMain
	{
		static void Main(string[] args)
		{
			MyContextBoundClass myBound = new MyContextBoundClass();
         MyAgileClass myAgile = new MyAgileClass();

         // Are they in or out of context?
         Console.WriteLine("\nIs myBound out of context? {0}",
            RemotingServices.IsObjectOutOfContext(myBound));

         Console.WriteLine("Is myAgile out of context? {0}",
            RemotingServices.IsObjectOutOfContext(myAgile));

         // Direct reference or proxy?
         Console.WriteLine("\nIs myBound a proxy? {0}",
            RemotingServices.IsTransparentProxy(myBound));

         Console.WriteLine("Is myAgile a proxy? {0}",
            RemotingServices.IsTransparentProxy(myAgile));
  
         Console.ReadLine();
		}
	}

   // A context bound class
   [Synchronization]
   public class MyContextBoundClass : ContextBoundObject
   {}
   
   // This is a context agile class
   public class MyAgileClass
   {}    
}
