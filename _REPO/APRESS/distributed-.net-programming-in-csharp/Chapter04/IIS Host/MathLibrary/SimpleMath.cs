using System;
using System.Threading;
using System.Diagnostics;

namespace MathLibrary
{  
   public class SimpleMath : MarshalByRefObject
   {
      public SimpleMath()
      {
         WriteLogEntry("SimpleMath ctor called");
      }

      public int Add(int n1, int n2)
      {
         WriteLogEntry(string.Format("SimpleMath.Add({0},{1})", n1, n2));
         return n1 + n2;
      }

      public int Subtract(int n1, int n2)
      {
         WriteLogEntry(string.Format("SimpleMath.Subtract({0},{1})", n1, n2));
         return n1 - n2;
      }

      private void WriteLogEntry(string msg)
      {
         EventLog.WriteEntry("MathService", msg);
      }
   }
}
