using System;
using System.Collections;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Web;
using System.Web.SessionState;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;

namespace WebGridEditExample
{
	/// <summary>
	/// Summary description for WebForm1.
	/// </summary>
	public class WebForm1 : System.Web.UI.Page
	{
		protected System.Web.UI.WebControls.DataGrid DataGrid1;
	
		// need to turn off anonymous acces for this to work
		// it authenticates to SQL Server using the account used to access IIS
		private const string connstr = @"Data Source=ALIEN\VSdotNET;" 
			+ @"Initial Catalog=Chapter6;" 
			+ @"Integrated Security=SSPI";

		private DataSet ds;

		private void PopulateAndBind()
		{
			ds = new DataSet();

			using ( SqlConnection conn = new SqlConnection( connstr ) )
			{
				conn.Open();

				SqlDataAdapter da1 = new SqlDataAdapter( "select * from developers", conn );
				da1.Fill( ds, "developers" );

				DataGrid1.DataSource = ds.Tables[ "developers" ];
				DataGrid1.DataBind();
			}
		}

		private void Page_Load(object sender, System.EventArgs e)
		{
			// Put user code to initialize the page here

			if ( !this.IsPostBack )
			{
				PopulateAndBind();
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
			this.DataGrid1.CancelCommand += new System.Web.UI.WebControls.DataGridCommandEventHandler(this.DataGrid1_Cancel);
			this.DataGrid1.EditCommand += new System.Web.UI.WebControls.DataGridCommandEventHandler(this.DataGrid1_Edit);
			this.DataGrid1.UpdateCommand += new System.Web.UI.WebControls.DataGridCommandEventHandler(this.DataGrid1_Update);
			this.Load += new System.EventHandler(this.Page_Load);

		}
		#endregion


		public void DataGrid1_Edit(Object sender, DataGridCommandEventArgs E)
		{
			DataGrid1.EditItemIndex = (int)E.Item.ItemIndex;
			PopulateAndBind();
		}

		public void DataGrid1_Update(Object sender, DataGridCommandEventArgs E)
		{
			int row = (int)E.Item.ItemIndex;

			int empno = Int32.Parse( ((TextBox)E.Item.Cells[1].Controls[0]).Text );
			String name = ((TextBox)E.Item.Cells[2].Controls[0]).Text;

			ds = new DataSet();

			using ( SqlConnection conn = new SqlConnection( connstr ) )
			{
				conn.Open();

				SqlDataAdapter da1 = new SqlDataAdapter( "select * from developers", conn );
				da1.Fill( ds, "developers" );

				SqlCommandBuilder cb = new SqlCommandBuilder( da1 );

				DataRow dr = ds.Tables[ "developers" ].Rows[ row ];
				dr[ "empno" ] = empno;
				dr[ "name" ] = name;

				da1.Update( ds, "developers" );

				DataGrid1.EditItemIndex = -1;
				DataGrid1.DataSource = ds.Tables[ "developers" ];
				DataGrid1.DataBind();
			}
		}

		public void DataGrid1_Cancel(Object sender, DataGridCommandEventArgs E)
		{
			DataGrid1.EditItemIndex = -1;
			PopulateAndBind();
		}

	}
}
