using System;
using System.IO;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Soap;

namespace Serialization
{	
   class SerializationMain
   {
      static void Main(string[] args)
      {
         Car myCar =  new Car("Christine", 150, "Red");
         FileStream mySoapFile = File.Create("Car.txt");
         
         // Use a SOAP formatter object to serialize the object.
         SoapFormatter formatter = new SoapFormatter();
         formatter.Context = new StreamingContext(StreamingContextStates.File);
         formatter.Serialize(mySoapFile, myCar);
                  
         mySoapFile.Close();

         Rehydrate();
         Console.ReadLine();
      }

      static void Rehydrate()
      {
         FileStream mySoapFile = File.Open("Car.txt", FileMode.Open);
         
         Car myCar = (Car)new SoapFormatter().Deserialize(mySoapFile);
         mySoapFile.Close();

         // Use the myCar object ...    
      }
   }
   
   // The car class implements the ISerializable interface
   [Serializable]
   public class Car : ISerializable
   {
      private string mColor;
      static private int mTopSpeed;

      private Radio mRadio;

      [NonSerialized]
      private string mNickName;

      // Required by the ISerializable interface
      public void GetObjectData(SerializationInfo info, StreamingContext context)
      {
         // If serializing across process, then skip the radio object
         if (context.State != StreamingContextStates.CrossProcess)
         {
            info.AddValue("mRadio", mRadio);
         }
         info.AddValue("mColor", mColor);
         info.AddValue("mTopSpeed", mTopSpeed); 
      }

      // This contructor is required to deserialize the object
      private Car(SerializationInfo info, StreamingContext context)
      {
         mTopSpeed = info.GetInt32("mTopSpeed");
         mColor = info.GetString("mColor");
      
         if ((context.State & StreamingContextStates.CrossProcess) != 0)
         {
            mRadio = (Radio)info.GetValue("mRadio", typeof(Radio));
         }
      }

      public Car(string nickName, int topSpeed, string color)
      {
         mNickName = nickName;
         mTopSpeed = topSpeed;
         mColor = color;
         mRadio = new Radio();
      }
   }

   [Serializable]
   public class Radio
   {
      public int Volume;

      public override string ToString()
      {
         return string.Format("(Volume={0})", Volume);
      }
   }
}