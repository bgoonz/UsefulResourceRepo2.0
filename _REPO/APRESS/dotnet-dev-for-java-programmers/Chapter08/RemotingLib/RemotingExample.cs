using System;

namespace RemotingLib
{
	/// <summary>
	/// Summary description for RemotingExample.
	/// </summary>
	public class RemotingExample : MarshalByRefObject
	{
		public RemotingExample()
		{
		}

		public string SayHello( string who )
		{
			string result = "Hello " + who + " from .NET remoting";
			System.Console.WriteLine( "Returning: " + result );
			return result;
		}
	}
}
