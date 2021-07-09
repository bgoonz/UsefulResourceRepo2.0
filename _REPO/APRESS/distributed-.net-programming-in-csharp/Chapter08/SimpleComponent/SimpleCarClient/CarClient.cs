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
         
         do
         {
            Console.WriteLine(carSvc.GetInfo());
         }while(Console.ReadLine() != "q");
      }
   }
}
