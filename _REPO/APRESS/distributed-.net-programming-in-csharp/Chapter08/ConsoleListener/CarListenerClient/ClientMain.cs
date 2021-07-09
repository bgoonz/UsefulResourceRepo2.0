using System;
using SimpleCarLibrary;

namespace CarListenerClient
{
   class CarMain
   {
      static void Main(string[] args)
      {
         
         // Activate the well known object
         CarService carSvc = (CarService) Activator.GetObject(
            typeof(SimpleCarLibrary.CarService),
            "tcp://localhost:13101/CarService"
         );
                          
         // Invoke a method
         do 
         {
            Console.WriteLine(carSvc.GetInfo());
         }while(Console.ReadLine() != "q");
      }
   }
}
