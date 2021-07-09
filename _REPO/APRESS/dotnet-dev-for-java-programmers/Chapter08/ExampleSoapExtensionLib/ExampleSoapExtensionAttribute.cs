using System;
using System.Web.Services.Protocols;

namespace ExampleSoapExtensionLib
{
	/// <summary>
	/// Summary description for ExampleSoapExtensionAttribute.
	/// </summary>
	[ AttributeUsage( AttributeTargets.Method ) ]
	public class ExampleSoapExtensionAttribute : SoapExtensionAttribute 
	{
		public override Type ExtensionType 
		{
			get 
			{ 
				return typeof( ExampleSoapExtension );
			}
		}

		private int m_priority;

		public override int Priority 
		{
			get
			{
				return m_priority;
			}
			set
			{
				m_priority = value;
			}
		}

		private string m_password = null;

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
