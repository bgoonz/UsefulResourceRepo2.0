using System;
using System.Runtime.Remoting.Messaging; // Call Context stuff

namespace MathLibrary
{
[Serializable]
public class CallContextData : ILogicalThreadAffinative
{
   private object mData;
	public CallContextData(object data)
	{
		mData = data;
	}

   public object Data
   {
      get { return mData; }
   }
}
}
