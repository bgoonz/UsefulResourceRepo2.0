using System;
using System.Web.Services.Protocols;

namespace ExampleSoapExtensionLib
{
	/// <summary>
	/// Summary description for ExampleSoapExtension.
	/// </summary>
	public class ExampleSoapExtension : SoapExtension
	{
		public ExampleSoapExtension()
		{
		}

		public override object GetInitializer( Type wsType )
		{
			return "one4all";
		}

		public override object GetInitializer( LogicalMethodInfo methodInfo, SoapExtensionAttribute attribute )
		{
			return ( ( ExampleSoapExtensionAttribute)attribute ).Password;
		}

		private string m_password;

		public override void Initialize( object initializer )
		{
			m_password = (string)initializer;
		}

		public override void ProcessMessage( SoapMessage message ) 
		{
			switch ( message.Stage ) 
			{
				case SoapMessageStage.BeforeSerialize:
					break;

				case SoapMessageStage.AfterSerialize:
					break;

				case SoapMessageStage.BeforeDeserialize:
					break;

				case SoapMessageStage.AfterDeserialize:
				{
					bool found = false;

					foreach ( SoapHeader header in message.Headers )
					{
						if ( header is SimpleAuthenticationSoapHeader )
						{
							if ( ((SimpleAuthenticationSoapHeader)header).Password == m_password )
							{
								found = true;
							}
							else
							{
								throw new SoapHeaderException( "Wrong password!", SoapException.ClientFaultCode, message.Url.ToString() );
							}
						}
					}
					if ( !found )
					{
						throw new SoapHeaderException( "Missing password!", SoapException.ClientFaultCode, message.Url.ToString() );
					}
				}
					break;

				default: // should never happen
					throw new Exception( "Unrecognised SoapMessageStage " + message.Stage.ToString() );
			}
		}

	}
}
