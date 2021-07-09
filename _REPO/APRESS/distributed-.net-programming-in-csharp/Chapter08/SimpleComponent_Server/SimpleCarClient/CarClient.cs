using System;
using SimpleCarLibrary;
using System.Runtime.Remoting;

namespace SimpleCarClient
{
   class CarMain
   {
      static void Main(string[] args)
      {
         CarService carSvc = new CarService();
         
         Console.WriteLine(carSvc.GetInfo());
                  
         Console.ReadLine();
      }
   }
}
