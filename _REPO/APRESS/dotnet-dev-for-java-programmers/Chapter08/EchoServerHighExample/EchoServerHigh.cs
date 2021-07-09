using System;
using System.IO;
using System.Net.Sockets;

namespace EchoServerHighExample
{
	class EchoServerHigh
	{
		const int echoPort = 7;
		const int bufferSize = 1024;
		
		static Byte[] buff = new Byte[ bufferSize ];

		[STAThread]
		static void Main(string[] args)
		{
			TcpListener tl = new TcpListener( echoPort );
			tl.Start();

			using ( TcpClient tc = tl.AcceptTcpClient() )
			{
				NetworkStream ns = tc.GetStream();

				for ( int count = ns.Read( buff, 0, bufferSize );
					count > 0;
					count = ns.Read( buff, 0, bufferSize ) )
				{
					ns.Write( buff, 0, count );
				}
				ns.Flush();
			}

			tl.Stop();
		}
	}
}
