using System;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;

namespace ThreadPoolExample
{
	/// <summary>
	/// Summary description for ThreadPoolExample.
	/// </summary>
	class ThreadPoolExample
	{
		const int dayTimePort = 7777;

		static void ServiceClient( Object obj )
		{
			using ( Socket s = (Socket)obj )
			{
				string response = DateTime.Now.ToLongDateString()
					+ "  " + DateTime.Now.ToLongTimeString();

				Encoding enc = Encoding.GetEncoding( "ASCII" );
				Byte[] buff = enc.GetBytes( response );
				s.Send( buff );
				s.Shutdown( SocketShutdown.Both );
				s.Close();
			}
		}

		/// <summary>
		/// The main entry point for the application.
		/// </summary>
		[STAThread]
		static void Main(string[] args)
		{
			using ( Socket svr = new Socket( AddressFamily.InterNetwork, 
						SocketType.Stream, 
						ProtocolType.Tcp ) )
			{
				svr.Bind( new IPEndPoint( IPAddress.Loopback, dayTimePort ) );
				svr.Listen( 5 );
				while ( true )
				{
					Socket req = svr.Accept();
					ThreadPool.QueueUserWorkItem( new WaitCallback( ServiceClient ), req );
				}
			}
		}
	}
}
