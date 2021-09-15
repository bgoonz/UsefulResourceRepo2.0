using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;
using System.Data.SqlClient;

namespace UpdateExample
{
	/// <summary>
	/// Summary description for Form1.
	/// </summary>
	public class Form1 : System.Windows.Forms.Form
	{
		private System.Windows.Forms.Panel panel3;
		private System.Windows.Forms.Panel panel1;
		private System.Windows.Forms.Button storeDataButton;
		private System.Windows.Forms.Button loadDataButton;
		private System.Windows.Forms.ListBox developerListBox;
		private System.Windows.Forms.Panel panel2;
		private System.Windows.Forms.Button addDeveloperButton;
		private System.Windows.Forms.TextBox newDeveloperTextBox;
		private System.Windows.Forms.Label label1;
		private System.Windows.Forms.Splitter splitter1;
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
			this.panel3 = new System.Windows.Forms.Panel();
			this.panel1 = new System.Windows.Forms.Panel();
			this.storeDataButton = new System.Windows.Forms.Button();
			this.loadDataButton = new System.Windows.Forms.Button();
			this.developerListBox = new System.Windows.Forms.ListBox();
			this.panel2 = new System.Windows.Forms.Panel();
			this.addDeveloperButton = new System.Windows.Forms.Button();
			this.newDeveloperTextBox = new System.Windows.Forms.TextBox();
			this.label1 = new System.Windows.Forms.Label();
			this.splitter1 = new System.Windows.Forms.Splitter();
			this.panel3.SuspendLayout();
			this.panel1.SuspendLayout();
			this.panel2.SuspendLayout();
			this.SuspendLayout();
			// 
			// panel3
			// 
			this.panel3.Controls.AddRange(new System.Windows.Forms.Control[] {
																				 this.panel1,
																				 this.developerListBox});
			this.panel3.Dock = System.Windows.Forms.DockStyle.Fill;
			this.panel3.Name = "panel3";
			this.panel3.Size = new System.Drawing.Size(400, 166);
			this.panel3.TabIndex = 4;
			// 
			// panel1
			// 
			this.panel1.Controls.AddRange(new System.Windows.Forms.Control[] {
																				 this.storeDataButton,
																				 this.loadDataButton});
			this.panel1.Dock = System.Windows.Forms.DockStyle.Bottom;
			this.panel1.Location = new System.Drawing.Point(0, 102);
			this.panel1.Name = "panel1";
			this.panel1.Size = new System.Drawing.Size(400, 64);
			this.panel1.TabIndex = 2;
			// 
			// storeDataButton
			// 
			this.storeDataButton.Anchor = ((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
				| System.Windows.Forms.AnchorStyles.Right);
			this.storeDataButton.Enabled = false;
			this.storeDataButton.Location = new System.Drawing.Point(104, 24);
			this.storeDataButton.Name = "storeDataButton";
			this.storeDataButton.TabIndex = 1;
			this.storeDataButton.Text = "Store Data";
			this.storeDataButton.Click += new System.EventHandler(this.storeDataButton_Click);
			// 
			// loadDataButton
			// 
			this.loadDataButton.Anchor = ((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
				| System.Windows.Forms.AnchorStyles.Left);
			this.loadDataButton.Location = new System.Drawing.Point(8, 24);
			this.loadDataButton.Name = "loadDataButton";
			this.loadDataButton.TabIndex = 0;
			this.loadDataButton.Text = "Load Data";
			this.loadDataButton.Click += new System.EventHandler(this.loadDataButton_Click);
			// 
			// developerListBox
			// 
			this.developerListBox.Dock = System.Windows.Forms.DockStyle.Fill;
			this.developerListBox.Name = "developerListBox";
			this.developerListBox.Size = new System.Drawing.Size(400, 160);
			this.developerListBox.TabIndex = 1;
			// 
			// panel2
			// 
			this.panel2.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
			this.panel2.Controls.AddRange(new System.Windows.Forms.Control[] {
																				 this.addDeveloperButton,
																				 this.newDeveloperTextBox,
																				 this.label1});
			this.panel2.Dock = System.Windows.Forms.DockStyle.Right;
			this.panel2.Location = new System.Drawing.Point(200, 0);
			this.panel2.Name = "panel2";
			this.panel2.Size = new System.Drawing.Size(200, 166);
			this.panel2.TabIndex = 7;
			// 
			// addDeveloperButton
			// 
			this.addDeveloperButton.Enabled = false;
			this.addDeveloperButton.Location = new System.Drawing.Point(16, 88);
			this.addDeveloperButton.Name = "addDeveloperButton";
			this.addDeveloperButton.Size = new System.Drawing.Size(160, 23);
			this.addDeveloperButton.TabIndex = 2;
			this.addDeveloperButton.Text = "Add developer";
			this.addDeveloperButton.Click += new System.EventHandler(this.addDeveloperButton_Click);
			// 
			// newDeveloperTextBox
			// 
			this.newDeveloperTextBox.Enabled = false;
			this.newDeveloperTextBox.Location = new System.Drawing.Point(16, 40);
			this.newDeveloperTextBox.Name = "newDeveloperTextBox";
			this.newDeveloperTextBox.Size = new System.Drawing.Size(160, 20);
			this.newDeveloperTextBox.TabIndex = 1;
			this.newDeveloperTextBox.Text = "";
			// 
			// label1
			// 
			this.label1.Location = new System.Drawing.Point(16, 16);
			this.label1.Name = "label1";
			this.label1.Size = new System.Drawing.Size(160, 23);
			this.label1.TabIndex = 0;
			this.label1.Text = "Enter a new developers name";
			// 
			// splitter1
			// 
			this.splitter1.Dock = System.Windows.Forms.DockStyle.Right;
			this.splitter1.Location = new System.Drawing.Point(197, 0);
			this.splitter1.Name = "splitter1";
			this.splitter1.Size = new System.Drawing.Size(3, 166);
			this.splitter1.TabIndex = 8;
			this.splitter1.TabStop = false;
			// 
			// Form1
			// 
			this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
			this.ClientSize = new System.Drawing.Size(400, 166);
			this.Controls.AddRange(new System.Windows.Forms.Control[] {
																		  this.splitter1,
																		  this.panel2,
																		  this.panel3});
			this.Name = "Form1";
			this.Text = "Update Example";
			this.panel3.ResumeLayout(false);
			this.panel1.ResumeLayout(false);
			this.panel2.ResumeLayout(false);
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

		const string connstr = @"Data Source=ALIEN\VSdotNET;" 
			+ @"Initial Catalog=Chapter6;" 
			+ @"Integrated Security=SSPI";

		private DataSet ds = null;

		int empno;

		private void loadDataButton_Click(object sender, System.EventArgs e)
		{
			Cursor savedCursor = this.Cursor;

			try 
			{
				this.Cursor = Cursors.WaitCursor;

				ds = new DataSet();

				using ( SqlConnection conn = new SqlConnection( connstr ) )
				{
					conn.Open();

					// get the raw data

					SqlDataAdapter da = new SqlDataAdapter( "select * from developers", conn );
					da.Fill( ds, "developers" );

					// establish data binding

					developerListBox.DataSource = ds.Tables[ "developers" ];
					developerListBox.DisplayMember = "name";

					empno = 0;

					foreach( DataRow row in ds.Tables[ "developers" ].Rows )
					{
						if ( (int)row[ "empno" ] > empno )
						{
							empno = (int)row[ "empno" ];
						}
					}
				}

				addDeveloperButton.Enabled = true;
				newDeveloperTextBox.Enabled = true;
				storeDataButton.Enabled = false;
			}
			finally 
			{
				this.Cursor = savedCursor;
			}
		}

		private void addDeveloperButton_Click(object sender, System.EventArgs e)
		{
			Cursor savedCursor = this.Cursor;

			try 
			{
				this.Cursor = Cursors.WaitCursor;

				if ( ds != null )
				{
					if ( ( newDeveloperTextBox.Text != null ) 
						&& ( newDeveloperTextBox.Text.Trim().Length > 0 ) )
					{
						DataRow row = ds.Tables[ "developers" ].NewRow();
						row[ "empno" ] = ++empno;
						row[ "name" ] = newDeveloperTextBox.Text;
						ds.Tables[ "developers" ].Rows.Add( row );

						newDeveloperTextBox.Text = null;	

						storeDataButton.Enabled = true;
					}
				}
			}
			finally 
			{
				this.Cursor = savedCursor;
			}
		}

		private void storeDataButton_Click(object sender, System.EventArgs e)
		{
			Cursor savedCursor = this.Cursor;

			try 
			{
				this.Cursor = Cursors.WaitCursor;

				using ( SqlConnection conn = new SqlConnection( connstr ) )
				{
					conn.Open();

					// update the data

					// you can build the command(s) explicitly
					SqlDataAdapter da = new SqlDataAdapter( "select * from developers", conn );
					da.InsertCommand = new SqlCommand( "INSERT INTO developers( empno, name ) values ( @empno, @name )", conn );
					da.InsertCommand.Parameters.Add( "@empno", SqlDbType.Int, 4, "empno" );
					da.InsertCommand.Parameters.Add( "@name", SqlDbType.NVarChar, 50, "name" );

					// or in this case you could use the command builder
					//SqlCommandBuilder cb = new SqlCommandBuilder( da );

					da.Update( ds, "developers" );
				}

				storeDataButton.Enabled = false;
			}
			finally 
			{
				this.Cursor = savedCursor;
			}
		}
	}
}
