using System;
using SimpleCarLibrary;
using System.Runtime.Remoting;

namespace SimpleCarClient
{
   class CarMain
   {
      static void Main(string[] args)
      {
         SomeClientFunction();
                  
         Console.ReadLine();
      }

      static void SomeClientFunction()
      {     
         CarService carSvc = new CarService();
         Console.WriteLine(carSvc.GetInfo());
         carSvc.AnotherMethod();
      }

   }
}
