using System;
using System.Runtime.Remoting;

using RemotingLib;

namespace RemotingClient
{
	/// <summary>
	/// Summary description for RemotingClient.
	/// </summary>
	class RemotingClient
	{
		/// <summary>
		/// The main entry point for the application.
		/// </summary>
		[STAThread]
		static void Main(string[] args)
		{
			RemotingConfiguration.Configure( "RemotingClient.exe.config" );

			RemotingExample re = new RemotingExample();
			System.Console.WriteLine( re.SayHello( "dear reader" ) );
		}
	}
}
