using System;
using System.Web.Services.Protocols;

namespace ExampleHeaderWebService
{
	/// <summary>
	/// Summary description for SimpleAuthenticationSoapHeader.
	/// </summary>
	public class SimpleAuthenticationSoapHeader : SoapHeader
	{
		private string m_password;

		public string Password
		{
			get
			{
				return m_password;
			}
			set
			{
				m_password = value;
			}
		}
	}
}
