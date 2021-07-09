using System;
using System.Runtime.Remoting;

namespace RemotingServer
{
	/// <summary>
	/// Summary description for RemotingServer.
	/// </summary>
	class RemotingServer
	{
		/// <summary>
		/// The main entry point for the application.
		/// </summary>
		[STAThread]
		static void Main(string[] args)
		{
			RemotingConfiguration.Configure( "RemotingServer.exe.config" );

			System.Console.WriteLine( "Press enter to exit" );
			System.Console.ReadLine();
		}
	}
}
