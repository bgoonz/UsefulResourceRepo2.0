using System;
using System.Net;
using System.Net.Sockets;
using System.Text;

namespace EchoClientLowExample
{
	class EchoClientLow
	{
		const int echoPort = 7;

		[STAThread]
		static void Main( string[] args )
		{
			Socket s = new Socket( AddressFamily.InterNetwork, 
				SocketType.Stream, 
				ProtocolType.Tcp );
			s.Connect( new IPEndPoint( IPAddress.Loopback, echoPort ) );

			UTF8Encoding enc = new UTF8Encoding();
			s.Send( enc.GetBytes( "test message" ) );
			Byte[] buff = new Byte[ 1024 ];
			s.Receive( buff );
			System.Console.WriteLine( enc.GetString( buff ) );
		}
	}
}
