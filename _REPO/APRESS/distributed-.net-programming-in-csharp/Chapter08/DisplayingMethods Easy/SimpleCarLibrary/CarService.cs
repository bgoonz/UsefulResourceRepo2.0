using System;
using System.Diagnostics;              // event Logging
using System.EnterpriseServices;       // ServicedComponent
using System.Runtime.InteropServices;  // Class Interface
using System.Text;                     // StringBuilder
using System.Threading;

namespace SimpleCarLibrary
{
   [JustInTimeActivation(), 
    EventTrackingEnabled(),
    ClassInterface(ClassInterfaceType.AutoDual)]
   public class CarService : ServicedComponent
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

      public void AnotherMethod() {}

   }
}