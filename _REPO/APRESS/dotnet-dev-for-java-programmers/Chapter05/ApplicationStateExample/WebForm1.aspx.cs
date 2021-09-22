using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Web;
using System.Web.SessionState;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;

namespace ApplicationStateExample
{
	/// <summary>
	/// Summary description for WebForm1.
	/// </summary>
	public class WebForm1 : System.Web.UI.Page
	{
		protected System.Web.UI.WebControls.Label CurrentStateLabel;
		protected System.Web.UI.WebControls.Label Label2;
		protected System.Web.UI.WebControls.TextBox NewValueTextBox;
		protected System.Web.UI.WebControls.Button NewValueButton;
	
		private void Page_Load(object sender, System.EventArgs e)
		{
			try
			{
				Application.Lock();
				CurrentStateLabel.Text = (string)Application[ "TestKey" ];
			}
			finally
			{
				Application.UnLock();
			}
		}

		#region Web Form Designer generated code
		override protected void OnInit(EventArgs e)
		{
			//
			// CODEGEN: This call is required by the ASP.NET Web Form Designer.
			//
			InitializeComponent();
			base.OnInit(e);
		}
		
		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent()
		{    
			this.NewValueButton.Click += new System.EventHandler(this.NewValueButton_Click);
			this.Load += new System.EventHandler(this.Page_Load);

		}
		#endregion

		private void NewValueButton_Click(object sender, System.EventArgs e)
		{
			try
			{
				Application.Lock();
				Application[ "TestKey" ] = NewValueTextBox.Text;
			}
			finally
			{
				Application.UnLock();
			}
			CurrentStateLabel.Text = "The current value is " + NewValueTextBox.Text;
			NewValueTextBox.Text = null;

			Session[ "Who" ] = "Paul";
		}
	}
}
