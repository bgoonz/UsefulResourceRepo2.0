using System;
using System.Threading;

namespace MutexExample
{
	/// <summary>
	/// Summary description for MutexExample.
	/// </summary>
	class MutexExample
	{
		const int servers = 3;
		const int clients = 20;

		/// <summary>
		/// The main entry point for the application.
		/// </summary>
		[STAThread]
		static void Main(string[] args)
		{
			Server[] srvArray = new Server[ servers ];
			for ( int i = 0; i < servers; i ++ )
			{
				srvArray[ i ] = new Server( "Server " + i );
			}

			for ( int j = 0; j < clients; j++ )
			{
				Client c = new Client( j, srvArray );
			}
		}
	}
}
