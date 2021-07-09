using System;
using System.Messaging;

namespace InternalTransactionConsumer
{
	class Class1
	{
		[STAThread]
		static void Main(string[] args)
		{
			MessageQueue txq2 = new MessageQueue( @".\Private$\txq2" );

			while ( true )
			{
				Message msgIn = txq2.Receive( MessageQueueTransactionType.Single );
				msgIn.Formatter = new XmlMessageFormatter( new String[] { "System.String, mscorlib", } );
				System.Console.WriteLine( "Received: {0}", (string)msgIn.Body );
			}
		}
	}
}
