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

namespace TransformParameterExample
{
	/// <summary>
	/// Summary description for Form1.
	/// </summary>
	public class Form1 : System.Windows.Forms.Form
	{
		private System.Windows.Forms.TextBox textBoxResult;
		private System.Windows.Forms.Panel panel1;
		private System.Windows.Forms.Button buttonTransform;
		private System.Windows.Forms.Label label1;
		private System.Windows.Forms.TextBox textBoxValue;
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
			this.buttonTransform = new System.Windows.Forms.Button();
			this.label1 = new System.Windows.Forms.Label();
			this.textBoxValue = new System.Windows.Forms.TextBox();
			this.panel1.SuspendLayout();
			this.SuspendLayout();
			// 
			// textBoxResult
			// 
			this.textBoxResult.Dock = System.Windows.Forms.DockStyle.Fill;
			this.textBoxResult.Location = new System.Drawing.Point(0, 100);
			this.textBoxResult.Multiline = true;
			this.textBoxResult.Name = "textBoxResult";
			this.textBoxResult.Size = new System.Drawing.Size(292, 166);
			this.textBoxResult.TabIndex = 0;
			this.textBoxResult.Text = "";
			// 
			// panel1
			// 
			this.panel1.Controls.AddRange(new System.Windows.Forms.Control[] {
																				 this.textBoxValue,
																				 this.label1,
																				 this.buttonTransform});
			this.panel1.Dock = System.Windows.Forms.DockStyle.Top;
			this.panel1.Name = "panel1";
			this.panel1.Size = new System.Drawing.Size(292, 100);
			this.panel1.TabIndex = 1;
			// 
			// buttonTransform
			// 
			this.buttonTransform.Location = new System.Drawing.Point(200, 64);
			this.buttonTransform.Name = "buttonTransform";
			this.buttonTransform.TabIndex = 0;
			this.buttonTransform.Text = "Transform";
			this.buttonTransform.Click += new System.EventHandler(this.buttonTransform_Click);
			// 
			// label1
			// 
			this.label1.Location = new System.Drawing.Point(16, 16);
			this.label1.Name = "label1";
			this.label1.TabIndex = 1;
			this.label1.Text = "Value";
			// 
			// textBoxValue
			// 
			this.textBoxValue.Location = new System.Drawing.Point(144, 16);
			this.textBoxValue.Name = "textBoxValue";
			this.textBoxValue.Size = new System.Drawing.Size(128, 20);
			this.textBoxValue.TabIndex = 2;
			this.textBoxValue.Text = "";
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

		private void buttonTransform_Click(object sender, System.EventArgs e)
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

				XsltArgumentList arg = new XsltArgumentList();
				arg.AddParam( "arg", "", textBoxValue.Text );

				tr.Transform( doc.CreateNavigator(), arg, tw );
				
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
