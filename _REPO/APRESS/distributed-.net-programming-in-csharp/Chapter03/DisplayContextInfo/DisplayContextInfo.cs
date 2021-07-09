using System;
using System.Runtime.Remoting.Contexts; // Synchronization attribute
using System.Runtime.Remoting;          // RemotingServices class
using System.Threading;                 // Thread class

namespace DisplayContextInfo
{
   class DisplayContextInfoMain
   {
      static void Main(string[] args)
      {     
         // Display the default context info
         Console.WriteLine("\n*** In Main *** ");
         Diagnostics.DisplayContextInfo();

         // Constructor displays synchronized context info
         MyContextBoundClass myBound = new MyContextBoundClass();

         Console.ReadLine();
      }
   }

   // A context bound class
   [Synchronization]
   public class MyContextBoundClass : ContextBoundObject
   { 
      public MyContextBoundClass()
      {
         Console.WriteLine("\n*** In MyContextBoundClass Constructor ***");
         Diagnostics.DisplayContextInfo();        
      }
   }

   // This is a context agile class
   public class MyAgileClass
   { }

   // Just a helper class to display context information
   public class Diagnostics
   {
      // Displays the context id and properties for the given context.
      public static void DisplayContextInfo()
      {
         Context ctx = Thread.CurrentContext;
         Console.WriteLine("   Properties for context id: {0}", ctx.ContextID);
         foreach(IContextProperty ctxProp in ctx.ContextProperties)
         {
            Console.WriteLine("     {0}", ctxProp.Name);
         }
      }
   }
}
