using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;
using System.IO;
using System.Xml;
using System.Xml.XPath;
using System.Xml.Xsl;

namespace TransformExtensionExample
{
	/// <summary>
	/// Summary description for Form1.
	/// </summary>
	public class Form1 : System.Windows.Forms.Form
	{
		private System.Windows.Forms.TextBox textBoxResult;
		private System.Windows.Forms.Panel panel1;
		private System.Windows.Forms.Button button1;
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
			this.textBoxResult = new System.Windows.Forms.TextBox();
			this.panel1 = new System.Windows.Forms.Panel();
			this.button1 = new System.Windows.Forms.Button();
			this.panel1.SuspendLayout();
			this.SuspendLayout();
			// 
			// textBoxResult
			// 
			this.textBoxResult.Dock = System.Windows.Forms.DockStyle.Fill;
			this.textBoxResult.Location = new System.Drawing.Point(0, 72);
			this.textBoxResult.Multiline = true;
			this.textBoxResult.Name = "textBoxResult";
			this.textBoxResult.Size = new System.Drawing.Size(292, 194);
			this.textBoxResult.TabIndex = 0;
			this.textBoxResult.Text = "";
			// 
			// panel1
			// 
			this.panel1.Controls.AddRange(new System.Windows.Forms.Control[] {
																				 this.button1});
			this.panel1.Dock = System.Windows.Forms.DockStyle.Top;
			this.panel1.Name = "panel1";
			this.panel1.Size = new System.Drawing.Size(292, 72);
			this.panel1.TabIndex = 1;
			// 
			// button1
			// 
			this.button1.Location = new System.Drawing.Point(104, 32);
			this.button1.Name = "button1";
			this.button1.TabIndex = 0;
			this.button1.Text = "Do it!";
			this.button1.Click += new System.EventHandler(this.button1_Click);
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

		private void button1_Click(object sender, System.EventArgs e)
		{
			try
			{
				XPathDocument doc = new XPathDocument( @"..\..\Sample.xml" );

				StringWriter sw = new StringWriter();
				XmlTextWriter tw = new XmlTextWriter( sw );
				tw.Formatting = Formatting.Indented;
				tw.Indentation = 4;

				XslTransform tr = new XslTransform();
				tr.Load( @"..\..\SampleTransform.xslt" );

				tr.Transform( doc.CreateNavigator(), null, tw );
				
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
}
