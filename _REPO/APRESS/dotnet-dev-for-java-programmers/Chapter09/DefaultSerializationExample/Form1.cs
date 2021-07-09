using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;
using System.IO;
using System.Xml;
using System.Xml.Serialization;

namespace DefaultSerializationExample
{
	/// <summary>
	/// Summary description for Form1.
	/// </summary>
	public class Form1 : System.Windows.Forms.Form
	{
		private System.Windows.Forms.Panel panel1;
		private System.Windows.Forms.Button buttonDoit;
		private System.Windows.Forms.TextBox textBoxResult;
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
			this.buttonDoit = new System.Windows.Forms.Button();
			this.textBoxResult = new System.Windows.Forms.TextBox();
			this.panel1.SuspendLayout();
			this.SuspendLayout();
			// 
			// panel1
			// 
			this.panel1.Controls.AddRange(new System.Windows.Forms.Control[] {
																				 this.buttonDoit});
			this.panel1.Dock = System.Windows.Forms.DockStyle.Top;
			this.panel1.Name = "panel1";
			this.panel1.Size = new System.Drawing.Size(292, 64);
			this.panel1.TabIndex = 0;
			// 
			// buttonDoit
			// 
			this.buttonDoit.Location = new System.Drawing.Point(109, 21);
			this.buttonDoit.Name = "buttonDoit";
			this.buttonDoit.TabIndex = 0;
			this.buttonDoit.Text = "Do It!";
			this.buttonDoit.Click += new System.EventHandler(this.buttonDoit_Click);
			// 
			// textBoxResult
			// 
			this.textBoxResult.Dock = System.Windows.Forms.DockStyle.Fill;
			this.textBoxResult.Location = new System.Drawing.Point(0, 64);
			this.textBoxResult.Multiline = true;
			this.textBoxResult.Name = "textBoxResult";
			this.textBoxResult.Size = new System.Drawing.Size(292, 202);
			this.textBoxResult.TabIndex = 1;
			this.textBoxResult.Text = "";
			// 
			// Form1
			// 
			this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
			this.ClientSize = new System.Drawing.Size(292, 266);
			this.Controls.AddRange(new System.Windows.Forms.Control[] {
																		  this.textBoxResult,
																		  this.panel1});
			this.Name = "Form1";
			this.Text = "Form1";
			this.panel1.ResumeLayout(false);
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

		private void buttonDoit_Click(object sender, System.EventArgs e)
		{
			try
			{
				XGroup g = new XGroup( "group name" );
				g.members[0] = new XMember( "mem 1" );
				g.members[1] = new XMember( "mem 2" );
				g.members[2] = new XMember( "mem 3" );

				StringWriter sw = new StringWriter();
				XmlTextWriter tw = new XmlTextWriter( sw );
				tw.Formatting = Formatting.Indented;
				tw.Indentation = 4;

				XmlSerializer ser = new XmlSerializer( typeof( XGroup ) );
				ser.Serialize( tw, g );

				tw.Close();
				sw.Close();

				textBoxResult.Text = sw.ToString();
			}
			catch( Exception exc )
			{
				MessageBox.Show( this, exc.Message );
			}
		
		}
	}

	public class XGroup
	{
		public XGroup()
		{
			members = new XMember[5];
		}
		public XGroup( string name ) : this()
		{
			m_name = name;
		}

		public string m_name;
		public XMember[] members;
	}

	public class XMember
	{
		public XMember()
		{
		}
		public XMember( string name ) :this()
		{
			m_name = name;
		}

		public string m_name;
	}
}
