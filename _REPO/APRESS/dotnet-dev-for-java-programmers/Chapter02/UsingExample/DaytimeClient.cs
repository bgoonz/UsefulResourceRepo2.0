using System;
using System.IO;
using System.Net.Sockets;

namespace UsingExample
{
    /// <summary>
    /// Invokes the TCP Daytime service on the local machine
    /// </summary>
    class DaytimeClient
    {
        static void Main(string[] args)
        {
            using ( TcpClient c = new TcpClient( "localhost", 13 ) )
            {
                using( StreamReader rdr = new StreamReader( c.GetStream() ) )
                {
                    string str = rdr.ReadToEnd();
                    System.Console.WriteLine( str );
                }
            }
        }
    }
}
