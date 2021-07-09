using System;
using System.Runtime.Remoting.Contexts; // Synchronization attribute
using System.Runtime.Remoting;          // RemotingServices class
using System.Threading;                 // Thread class

namespace ContextAgile
{
   class ContextAgileMain
   {
      static void Main(string[] args)
      {
         MyAgileClass myAgile = new MyAgileClass();
      
         // Display myAgile's context info. Since this is an agile object,
         // it should be in the default context.
         myAgile.DisplayContextInfo();

         // Send myAgile into the context bound object.
         MyContextBoundClass myBound = new MyContextBoundClass(myAgile);

         Console.ReadLine();
      }
   }

   // A context bound class
   [Synchronization]
   public class MyContextBoundClass : ContextBoundObject
   { 
      public MyContextBoundClass()
      {
         Console.WriteLine("\n*** MyContextBoundClass Constructor ***");
         Diagnostics.DisplayContextInfo();        
      }

      // The " : this()" at the end calls the default constructor
      // before executing the code in this constructor.
      public MyContextBoundClass(MyAgileClass myAgile) : this()
      {
         // Display the given object's context info. Since this is an agile
         // object, it should be in the context bound object's context.
         myAgile.DisplayContextInfo();
      }
   }
   
   // This is a context agile class
   public class MyAgileClass
   { 
      public void DisplayContextInfo()
      {
         Console.WriteLine("\n*** MyAgileClass.DisplayContextInfo() ***");
         Diagnostics.DisplayContextInfo();
      }
   }

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
