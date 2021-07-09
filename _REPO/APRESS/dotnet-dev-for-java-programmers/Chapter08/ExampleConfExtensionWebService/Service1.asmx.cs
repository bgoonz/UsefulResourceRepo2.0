using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Web;
using System.Web.Services;
using System.Web.Services.Protocols;

using ExampleSoapExtensionLib;

namespace ExampleConfExtensionWebService
{
	/// <summary>
	/// Summary description for Service1.
	/// </summary>
	[WebService(Namespace="http://www.csharpwebservices.com/dummy ")]
	public class Service1 : System.Web.Services.WebService
	{
		public Service1()
		{
			//CODEGEN: This call is required by the ASP.NET Web Services Designer
			InitializeComponent();
		}

		#region Component Designer generated code
		
		//Required by the Web Services Designer 
		private IContainer components = null;
				
		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent()
		{
		}

		/// <summary>
		/// Clean up any resources being used.
		/// </summary>
		protected override void Dispose( bool disposing )
		{
			if(disposing && components != null)
			{
				components.Dispose();
			}
			base.Dispose(disposing);		
		}
		
		#endregion

		public SimpleAuthenticationSoapHeader header;

		[WebMethod]
		[ SoapHeader( "header" ) ]
		public string SayHello( string who )
		{
			return "Hello " + who + " from ASP.NET web services";
		}

		[WebMethod]
		[ SoapHeader( "header" ) ]
		public string SayGoodbye( string who )
		{
			return "Goodbye " + who + " from ASP.NET web services";
		}
	}
}
