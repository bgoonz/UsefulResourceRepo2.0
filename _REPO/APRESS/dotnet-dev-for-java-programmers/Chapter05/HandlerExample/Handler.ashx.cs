using System.Web;

namespace HandlerExample
{
	public class Handler : IHttpHandler
	{
		public void ProcessRequest(HttpContext context) 
		{
			HttpRequest request = context.Request;
			HttpResponse response = context.Response;

			response.ContentType = "text/plain";
			response.Write( "Hello World!" );
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
