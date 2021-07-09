using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;
using System.Xml;
using System.Xml.XPath;

namespace XPathExample
{
	/// <summary>
	/// Summary description for Form1.
	/// </summary>
	public class Form1 : System.Windows.Forms.Form
	{
		private System.Windows.Forms.MainMenu mainMenu1;
		private System.Windows.Forms.MenuItem menuItem1;
		private System.Windows.Forms.MenuItem menuItemOpen;
		private System.Windows.Forms.MenuItem menuItemExit;
		private System.Windows.Forms.MenuItem menuItem4;
		private System.Windows.Forms.MenuItem menuItemSelect;
		private System.Windows.Forms.MenuItem menuItemCount;
		private System.Windows.Forms.TextBox textBoxResult;
		private System.Windows.Forms.OpenFileDialog openFileDialog1;
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
			this.mainMenu1 = new System.Windows.Forms.MainMenu();
			this.menuItem1 = new System.Windows.Forms.MenuItem();
			this.menuItemOpen = new System.Windows.Forms.MenuItem();
			this.menuItemExit = new System.Windows.Forms.MenuItem();
			this.menuItem4 = new System.Windows.Forms.MenuItem();
			this.menuItemSelect = new System.Windows.Forms.MenuItem();
			this.menuItemCount = new System.Windows.Forms.MenuItem();
			this.textBoxResult = new System.Windows.Forms.TextBox();
			this.openFileDialog1 = new System.Windows.Forms.OpenFileDialog();
			this.SuspendLayout();
			// 
			// mainMenu1
			// 
			this.mainMenu1.MenuItems.AddRange(new System.Windows.Forms.MenuItem[] {
																					  this.menuItem1,
																					  this.menuItem4});
			// 
			// menuItem1
			// 
			this.menuItem1.Index = 0;
			this.menuItem1.MenuItems.AddRange(new System.Windows.Forms.MenuItem[] {
																					  this.menuItemOpen,
																					  this.menuItemExit});
			this.menuItem1.Text = "File";
			// 
			// menuItemOpen
			// 
			this.menuItemOpen.Index = 0;
			this.menuItemOpen.Text = "Open";
			this.menuItemOpen.Click += new System.EventHandler(this.menuItemOpen_Click);
			// 
			// menuItemExit
			// 
			this.menuItemExit.Index = 1;
			this.menuItemExit.Text = "Exit";
			this.menuItemExit.Click += new System.EventHandler(this.menuItemExit_Click);
			// 
			// menuItem4
			// 
			this.menuItem4.Index = 1;
			this.menuItem4.MenuItems.AddRange(new System.Windows.Forms.MenuItem[] {
																					  this.menuItemSelect,
																					  this.menuItemCount});
			this.menuItem4.Text = "Action";
			// 
			// menuItemSelect
			// 
			this.menuItemSelect.Enabled = false;
			this.menuItemSelect.Index = 0;
			this.menuItemSelect.Text = "Select names";
			this.menuItemSelect.Click += new System.EventHandler(this.menuItemSelect_Click);
			// 
			// menuItemCount
			// 
			this.menuItemCount.Enabled = false;
			this.menuItemCount.Index = 1;
			this.menuItemCount.Text = "Count names";
			this.menuItemCount.Click += new System.EventHandler(this.menuItemCount_Click);
			// 
			// textBoxResult
			// 
			this.textBoxResult.Dock = System.Windows.Forms.DockStyle.Fill;
			this.textBoxResult.Multiline = true;
			this.textBoxResult.Name = "textBoxResult";
			this.textBoxResult.Size = new System.Drawing.Size(292, 266);
			this.textBoxResult.TabIndex = 0;
			this.textBoxResult.Text = "";
			// 
			// Form1
			// 
			this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
			this.ClientSize = new System.Drawing.Size(292, 266);
			this.Controls.AddRange(new System.Windows.Forms.Control[] {
																		  this.textBoxResult});
			this.Menu = this.mainMenu1;
			this.Name = "Form1";
			this.Text = "XPath Example";
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

		private XPathDocument doc = null;

		private void menuItemOpen_Click(object sender, System.EventArgs e)
		{
			if ( openFileDialog1.ShowDialog( this ) == DialogResult.OK )
			{
				doc = new XPathDocument( openFileDialog1.OpenFile() );
				menuItemSelect.Enabled = true;
				menuItemCount.Enabled = true;
			}
		}

		private void menuItemExit_Click(object sender, System.EventArgs e)
		{
			Close();
		}

		private void menuItemSelect_Click(object sender, System.EventArgs e)
		{
			XPathNavigator nav = doc.CreateNavigator();
//			XPathNodeIterator ni = nav.Select( "//name" );
			XPathExpression xpe = nav.Compile( "//name" );
			XPathNodeIterator ni = nav.Select( xpe );
			textBoxResult.Text = "";
			while ( ni.MoveNext() )
			{
				textBoxResult.Text += ni.Current.Value + "\r\n";
			}
		}

		private void menuItemCount_Click(object sender, System.EventArgs e)
		{
			XPathNavigator nav = doc.CreateNavigator();
			double ct = (double)nav.Evaluate( "count(//name)" );
			textBoxResult.Text = "There are "+ ct + " names";
		}
	}
}
