using System;
using System.Diagnostics;              // event Logging
using System.EnterpriseServices;       // ServicedComponent
using System.Runtime.InteropServices;  // Class Interface
using System.Text;                     // StringBuilder
using System.Threading;

namespace SimpleCarLibrary
{
   [Guid("5A1BB09D-8D4B-481a-A441-DC6D8D48F396")]
   public interface IGetInfo
   {
      string GetInfo();
      void AnotherMethod();
   }

   [JustInTimeActivation(), 
    Guid("00E1160C-F65B-45fa-A92D-C24AB92831C8"),
    EventTrackingEnabled(),
    ClassInterface(ClassInterfaceType.None)]
   public class CarService : ServicedComponent, IGetInfo
   {
      public CarService()
      {
         string logMsg = string.Format("Created Object: {0}", this.GetHashCode());
         EventLog.WriteEntry("CarService.ctor()", logMsg);
      }

      public string GetInfo()
      {
         StringBuilder ctxInfo = new StringBuilder();
         
         // Use ContextUtil to fetch context information
         ctxInfo.AppendFormat("Context ID:  {0}\n", ContextUtil.ContextId);
         ctxInfo.AppendFormat("Activity ID: {0}\n", ContextUtil.ActivityId);
        
         // If in transaction, get transaction ID
         string txId = "No Tx";
         if (ContextUtil.IsInTransaction)
            txId = ContextUtil.TransactionId.ToString();

         ctxInfo.AppendFormat("Transaction ID:    {0}\n", txId);
         ctxInfo.AppendFormat("Security Enabled?: {0}\n", 
            ContextUtil.IsSecurityEnabled);

         return ctxInfo.ToString();
      }

      public void AnotherMethod() { }
   }
}