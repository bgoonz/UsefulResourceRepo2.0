using System;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.ComponentModel;
using System.Collections.Specialized;

namespace WebFormsServerControlExample
{
	/// <summary>
	/// Summary description for WebCustomControl1.
	/// </summary>
	[DefaultProperty("Text"), 
		ToolboxData("<{0}:WebCustomControl1 runat=server></{0}:WebCustomControl1>")]
	public class WebCustomControl1 : 
		System.Web.UI.WebControls.WebControl,
		IPostBackDataHandler
	{
		private string text;
	
		[Bindable(true), 
			Category("Appearance"), 
			DefaultValue("")] 
		public string Text 
		{
			get
			{
				return (string)ViewState[ "Text" ];
			}

			set
			{
				ViewState[ "Text" ] = value;
			}
		}

		/// <summary> 
		/// Render this control to the output parameter specified.
		/// </summary>
		/// <param name="output"> The HTML writer to write out to </param>
		protected override void Render(HtmlTextWriter output)
		{
			output.WriteBeginTag( "input" );
			output.WriteAttribute( "type", "input" );
			output.WriteAttribute( "name", UniqueID );
			output.WriteAttribute( "id", UniqueID );
			if ( ( Text != null ) && ( Text.Length > 0 ) )
			{
				output.WriteAttribute( "value", Text );
			}
			output.WriteEndTag( "input" );
		}

		public virtual bool LoadPostData(string postDataKey, NameValueCollection postCollection) 
		{
			string currText = Text;
			string newText = postCollection[postDataKey];
			if (currText != newText)
			{
				Text = newText;
				return true;
			}
			else
			{
				return false;
			}
		}

		public virtual void RaisePostDataChangedEvent() 
		{
			// typically change events would be fired here
		}
	}
}
