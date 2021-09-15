using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;

namespace StoredProcParmExample
{
	/// <summary>
	/// Summary description for Form1.
	/// </summary>
	public class Form1 : System.Windows.Forms.Form
	{
		private System.Windows.Forms.Button button1;
		private System.Windows.Forms.TextBox textBox1;
		private System.Windows.Forms.Label label1;
		/// <summary>
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.Container components = null;

		public Form1()
		{
			//
			// Required for Windows Form Designer support
			//
			InitializeComponent();

			//
			// TODO: Add any constructor code after InitializeComponent call
			//
		}

		/// <summary>
		/// Clean up any resources being used.
		/// </summary>
		protected override void Dispose( bool disposing )
		{
			if( disposing )
			{
				if (components != null) 
				{
					components.Dispose();
				}
			}
			base.Dispose( disposing );
		}

		#region Windows Form Designer generated code
		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent()
		{
			this.button1 = new System.Windows.Forms.Button();
			this.textBox1 = new System.Windows.Forms.TextBox();
			this.label1 = new System.Windows.Forms.Label();
			this.SuspendLayout();
			// 
			// button1
			// 
			this.button1.Location = new System.Drawing.Point(294, 40);
			this.button1.Name = "button1";
			this.button1.Size = new System.Drawing.Size(96, 23);
			this.button1.TabIndex = 8;
			this.button1.Text = "Who makes it?";
			this.button1.Click += new System.EventHandler(this.button1_Click);
			// 
			// textBox1
			// 
			this.textBox1.Location = new System.Drawing.Point(168, 40);
			this.textBox1.Name = "textBox1";
			this.textBox1.TabIndex = 7;
			this.textBox1.Text = "";
			// 
			// label1
			// 
			this.label1.Location = new System.Drawing.Point(42, 40);
			this.label1.Name = "label1";
			this.label1.TabIndex = 6;
			this.label1.Text = "Enter a language";
			// 
			// Form1
			// 
			this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
			this.ClientSize = new System.Drawing.Size(432, 102);
			this.Controls.AddRange(new System.Windows.Forms.Control[] {
																		  this.button1,
																		  this.textBox1,
																		  this.label1});
			this.Name = "Form1";
			this.Text = "Stored Procedure Parameter Example";
			this.ResumeLayout(false);

		}
		#endregion

		/// <summary>
		/// The main entry point for the application.
		/// </summary>
		[STAThread]
		static void Main() 
		{
			Application.Run(new Form1());
		}

		private void button1_Click(object sender, System.EventArgs e)
		{
			string cstr = @"Data Source=ALIEN\VSdotNET;" 
				+ @"Initial Catalog=Chapter6;" 
				+ @"Integrated Security=SSPI";
			using ( SqlConnection conn = new SqlConnection( cstr ) )
			{
				conn.Open();

				SqlCommand cmd = new SqlCommand( "QueryVendor", conn );
				cmd.CommandType = CommandType.StoredProcedure;

				// input parm
				SqlParameter name 
					= cmd.Parameters.Add( "@name", 
											SqlDbType.NVarChar, 
											15 );
				name.Value = textBox1.Text;

				// output parm
				SqlParameter vendor 
					= cmd.Parameters.Add( "@vendor", 
											SqlDbType.NVarChar, 
											15 );
				vendor.Direction = ParameterDirection.Output;

				// return value
				SqlParameter rowCount 
					= cmd.Parameters.Add( "@rowCount", 
											SqlDbType.Int );
				rowCount.Direction = ParameterDirection.ReturnValue;

				cmd.ExecuteNonQuery();

				if ( (int)rowCount.Value > 0 )
				{
					MessageBox.Show( this, 
										textBox1.Text 
										+ " is available from " 
										+ vendor.Value );
				}
				else
				{
					MessageBox.Show( this, 
										textBox1.Text 
										+ " is not available yet" );
				}
			}
		}
	}
}
