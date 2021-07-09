using System;
using System.Reflection;

namespace CustomAttributes
{	
   class MyCustomAttributeDriver
   {
      static void Main(string[] args)
      {
         // Process the attributes applied to the class. This works
         // because Type derives from the MemberInfo class.
         ProcessCustomAttributes(typeof(Car));

         // Process the attributes applied to all members in the Car class
         foreach (MemberInfo mi in typeof(Car).GetMembers())
         {
            ProcessCustomAttributes(mi);
         }

         // Create a HorseAndBuggy object. Compiler issues obsolete warning
         HorseAndBuggy hb = new HorseAndBuggy();

         Console.ReadLine();
      }

      // Process all the attributes on any given member.
      private static void ProcessCustomAttributes(MemberInfo info)
      {
         MyCustomAttribute myAttr;
         foreach (Attribute a in info.GetCustomAttributes(false))
         {
            if ((myAttr = a as MyCustomAttribute) != null)
            {
               Console.WriteLine(myAttr.Description);
            }
         }
      }
   }

   [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
   public class MyCustomAttribute : Attribute
   {
      private string mDescription;

      public MyCustomAttribute(string Description)
      {
         mDescription = Description;
      }

      public string Description
      {
         get {return mDescription;}
      }
   }

   [MyCustom("This is yet another car class")]
   public class Car
   {
      // Uncomment line below to get compile error.
      //[MyCustom("Can't apply to a field")]
      private string mColor;

      [MyCustom("Apply to a method")]
      public int Accelerate()
      {return 0;}
   }

   // You can apply multiple attributes
   [Serializable(),
    Obsolete(@"No one uses horse and buggies anymore. Use the Car class instead", false)]
   public class HorseAndBuggy
   { }
}
   