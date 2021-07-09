using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;
using System.Data.SqlClient;

namespace RelationExample
{
	/// <summary>
	/// Summary description for Form1.
	/// </summary>
	public class Form1 : System.Windows.Forms.Form
	{
		private System.Windows.Forms.Panel panel1;
		private System.Windows.Forms.TabControl tabControl1;
		private System.Windows.Forms.Splitter splitter1;
		private System.Windows.Forms.TextBox listTextBox;
		private System.Windows.Forms.Button loadDataButton;
		private System.Windows.Forms.TabPage languageTabPage;
		private System.Windows.Forms.TabPage developerTabPage;
		private System.Windows.Forms.Label label1;
		private System.Windows.Forms.Label label2;
		private System.Windows.Forms.ComboBox languageComboBox;
		private System.Windows.Forms.Button languageButton;
		private System.Windows.Forms.ComboBox developerComboBox;
		private System.Windows.Forms.Button developerButton;
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
			this.panel1 = new System.Windows.Forms.Panel();
			this.loadDataButton = new System.Windows.Forms.Button();
			this.tabControl1 = new System.Windows.Forms.TabControl();
			this.languageTabPage = new System.Windows.Forms.TabPage();
			this.label2 = new System.Windows.Forms.Label();
			this.languageComboBox = new System.Windows.Forms.ComboBox();
			this.languageButton = new System.Windows.Forms.Button();
			this.developerTabPage = new System.Windows.Forms.TabPage();
			this.label1 = new System.Windows.Forms.Label();
			this.developerComboBox = new System.Windows.Forms.ComboBox();
			this.developerButton = new System.Windows.Forms.Button();
			this.splitter1 = new System.Windows.Forms.Splitter();
			this.listTextBox = new System.Windows.Forms.TextBox();
			this.panel1.SuspendLayout();
			this.tabControl1.SuspendLayout();
			this.languageTabPage.SuspendLayout();
			this.developerTabPage.SuspendLayout();
			this.SuspendLayout();
			// 
			// panel1
			// 
			this.panel1.Controls.AddRange(new System.Windows.Forms.Control[] {
																				 this.loadDataButton});
			this.panel1.Dock = System.Windows.Forms.DockStyle.Bottom;
			this.panel1.Location = new System.Drawing.Point(0, 226);
			this.panel1.Name = "panel1";
			this.panel1.Size = new System.Drawing.Size(492, 40);
			this.panel1.TabIndex = 0;
			// 
			// loadDataButton
			// 
			this.loadDataButton.Dock = System.Windows.Forms.DockStyle.Fill;
			this.loadDataButton.Name = "loadDataButton";
			this.loadDataButton.Size = new System.Drawing.Size(492, 40);
			this.loadDataButton.TabIndex = 0;
			this.loadDataButton.Text = "Load Data";
			this.loadDataButton.Click += new System.EventHandler(this.loadDataButton_Click);
			// 
			// tabControl1
			// 
			this.tabControl1.Controls.AddRange(new System.Windows.Forms.Control[] {
																					  this.languageTabPage,
																					  this.developerTabPage});
			this.tabControl1.Dock = System.Windows.Forms.DockStyle.Left;
			this.tabControl1.Name = "tabControl1";
			this.tabControl1.SelectedIndex = 0;
			this.tabControl1.Size = new System.Drawing.Size(200, 226);
			this.tabControl1.TabIndex = 1;
			// 
			// languageTabPage
			// 
			this.languageTabPage.Controls.AddRange(new System.Windows.Forms.Control[] {
																						  this.label2,
																						  this.languageComboBox,
																						  this.languageButton});
			this.languageTabPage.Location = new System.Drawing.Point(4, 22);
			this.languageTabPage.Name = "languageTabPage";
			this.languageTabPage.Size = new System.Drawing.Size(192, 200);
			this.languageTabPage.TabIndex = 0;
			this.languageTabPage.Text = "language";
			// 
			// label2
			// 
			this.label2.Anchor = ((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
				| System.Windows.Forms.AnchorStyles.Right);
			this.label2.Location = new System.Drawing.Point(8, 8);
			this.label2.Name = "label2";
			this.label2.Size = new System.Drawing.Size(170, 25);
			this.label2.TabIndex = 5;
			this.label2.Text = "Choose a language";
			// 
			// languageComboBox
			// 
			this.languageComboBox.Anchor = ((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
				| System.Windows.Forms.AnchorStyles.Right);
			this.languageComboBox.Location = new System.Drawing.Point(10, 50);
			this.languageComboBox.Name = "languageComboBox";
			this.languageComboBox.Size = new System.Drawing.Size(170, 21);
			this.languageComboBox.TabIndex = 4;
			// 
			// languageButton
			// 
			this.languageButton.Dock = System.Windows.Forms.DockStyle.Bottom;
			this.languageButton.Location = new System.Drawing.Point(0, 150);
			this.languageButton.Name = "languageButton";
			this.languageButton.Size = new System.Drawing.Size(192, 50);
			this.languageButton.TabIndex = 3;
			this.languageButton.Text = "Which developers know this language?";
			this.languageButton.Click += new System.EventHandler(this.languageButton_Click);
			// 
			// developerTabPage
			// 
			this.developerTabPage.Controls.AddRange(new System.Windows.Forms.Control[] {
																						   this.label1,
																						   this.developerComboBox,
																						   this.developerButton});
			this.developerTabPage.Location = new System.Drawing.Point(4, 22);
			this.developerTabPage.Name = "developerTabPage";
			this.developerTabPage.Size = new System.Drawing.Size(192, 200);
			this.developerTabPage.TabIndex = 1;
			this.developerTabPage.Text = "developer";
			// 
			// label1
			// 
			this.label1.Anchor = ((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
				| System.Windows.Forms.AnchorStyles.Right);
			this.label1.Location = new System.Drawing.Point(8, 8);
			this.label1.Name = "label1";
			this.label1.Size = new System.Drawing.Size(170, 25);
			this.label1.TabIndex = 2;
			this.label1.Text = "Choose a developer";
			// 
			// developerComboBox
			// 
			this.developerComboBox.Anchor = ((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
				| System.Windows.Forms.AnchorStyles.Right);
			this.developerComboBox.Location = new System.Drawing.Point(8, 50);
			this.developerComboBox.Name = "developerComboBox";
			this.developerComboBox.Size = new System.Drawing.Size(170, 21);
			this.developerComboBox.TabIndex = 1;
			// 
			// developerButton
			// 
			this.developerButton.Dock = System.Windows.Forms.DockStyle.Bottom;
			this.developerButton.Location = new System.Drawing.Point(0, 150);
			this.developerButton.Name = "developerButton";
			this.developerButton.Size = new System.Drawing.Size(192, 50);
			this.developerButton.TabIndex = 0;
			this.developerButton.Text = "What languages do they know?";
			this.developerButton.Click += new System.EventHandler(this.developerButton_Click);
			// 
			// splitter1
			// 
			this.splitter1.Location = new System.Drawing.Point(200, 0);
			this.splitter1.Name = "splitter1";
			this.splitter1.Size = new System.Drawing.Size(3, 226);
			this.splitter1.TabIndex = 2;
			this.splitter1.TabStop = false;
			// 
			// listTextBox
			// 
			this.listTextBox.Dock = System.Windows.Forms.DockStyle.Fill;
			this.listTextBox.Location = new System.Drawing.Point(203, 0);
			this.listTextBox.Multiline = true;
			this.listTextBox.Name = "listTextBox";
			this.listTextBox.Size = new System.Drawing.Size(289, 226);
			this.listTextBox.TabIndex = 3;
			this.listTextBox.Text = "";
			// 
			// Form1
			// 
			this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
			this.ClientSize = new System.Drawing.Size(492, 266);
			this.Controls.AddRange(new System.Windows.Forms.Control[] {
																		  this.listTextBox,
																		  this.splitter1,
																		  this.tabControl1,
																		  this.panel1});
			this.Name = "Form1";
			this.Text = "Relation Example";
			this.panel1.ResumeLayout(false);
			this.tabControl1.ResumeLayout(false);
			this.languageTabPage.ResumeLayout(false);
			this.developerTabPage.ResumeLayout(false);
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

		private void loadDataButton_Click(object sender, System.EventArgs e)
		{
			ds = new DataSet();

			using ( SqlConnection conn = new SqlConnection( connstr ) )
			{
				conn.Open();

				// get the raw data

				SqlDataAdapter da1 
					= new SqlDataAdapter( "select * from dotnetlanguages",
											conn );
				da1.Fill( ds, "dotnetlanguages" );

				SqlDataAdapter da2 
					= new SqlDataAdapter( "select * from developers", 
											conn );
				da2.Fill( ds, "developers" );

				SqlDataAdapter da3 
					= new SqlDataAdapter( "select * from devlanglink", 
											conn );
				da3.Fill( ds, "devlanglink" );

				// create the relationships
				ds.Relations.Add( "langlink",
					ds.Tables[ "dotnetlanguages" ].Columns[ "id" ],
					ds.Tables[ "devlanglink" ].Columns[ "langid" ] );

				ds.Relations.Add( "devlink",
					ds.Tables[ "developers" ].Columns[ "empno" ],
					ds.Tables[ "devlanglink" ].Columns[ "empno" ] );

				// establish data binding

				languageComboBox.DataSource = ds.Tables[ "dotnetlanguages" ];
				languageComboBox.DisplayMember = "name";

				developerComboBox.DataSource = ds.Tables[ "developers" ];
				developerComboBox.DisplayMember = "name";
			}
		}

		private void languageButton_Click(object sender, System.EventArgs e)
		{
			if ( ds == null )
			{
				MessageBox.Show( this, "You must load the data first" );
			}
			else
			{
				listTextBox.Text = "";
				// languageComboBox combobox is databound to the 
				// languages DataTable
				DataRow lang = ( (DataRowView)languageComboBox.SelectedValue ).Row;
				foreach( DataRow row in lang.GetChildRows( "langlink" ) )
				{
					DataRow dev = row.GetParentRow( "devlink" );
					listTextBox.Text += dev[ "name" ].ToString() + "\r\n";
				}
			}
		}

		private void developerButton_Click(object sender, System.EventArgs e)
		{
			if ( ds == null )
			{
				MessageBox.Show( this, "You must load the data first" );
			}
			else
			{
				listTextBox.Text = "";
				// developerComboBox combobox is databound to the 
				// developers DataTable
				DataRow dev = ( (DataRowView)developerComboBox.SelectedValue ).Row;
				foreach( DataRow row in dev.GetChildRows( "devlink" ) )
				{
					DataRow lang = row.GetParentRow( "langlink" );
					listTextBox.Text += lang[ "name" ].ToString() + "\r\n";
				}
			}
		}
	}
}
