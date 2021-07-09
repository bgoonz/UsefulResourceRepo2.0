using System;
using System.Messaging;

namespace InternalTransactionProducer
{
	class Class1
	{
		[STAThread]
		static void Main(string[] args)
		{
			MessageQueue txq1 = new MessageQueue( @".\Private$\txq1" );

			for ( int i =1; i <= 20; i++ )
			{
				Message msgOut = new Message();
				msgOut.Body = "Message " + i;
				txq1.Send( msgOut, MessageQueueTransactionType.Single );
			}
		}
	}
}
