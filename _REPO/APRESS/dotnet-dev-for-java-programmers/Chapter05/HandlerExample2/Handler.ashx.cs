using System.Web;
using System.IO;

namespace HandlerExample
{
	public class Handler : IHttpHandler
	{
		public void ProcessRequest(HttpContext context) 
		{
			HttpRequest request = context.Request;
			HttpResponse response = context.Response;

			response.ContentType = "image/gif";

			FileStream fs = new FileStream( @"c:\inetpub\wwwroot\winxp.gif", FileMode.Open, FileAccess.Read, FileShare.Read );
			long rem = fs.Length;

			byte[] buffer = new byte[ 4096 ];
			while ( rem >= 4096 )
			{
				fs.Read( buffer, 0, 4096 );
				response.BinaryWrite( buffer );
				rem -= 4096;
			}
			if ( rem > 0 )
			{
				buffer = new byte[ rem ];
				fs.Read( buffer, 0, (int)rem );
				response.BinaryWrite( buffer );
			}
			fs.Close();

			response.End();
		}

		public bool IsReusable
		{
			get
			{
				return true;
			}
		}
	}
}
