using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;
using System.IO;
using System.Xml;
using System.Xml.Serialization;

namespace ShapedSerializationExample
{
	/// <summary>
	/// Summary description for Form1.
	/// </summary>
	public class Form1 : System.Windows.Forms.Form
	{
		private System.Windows.Forms.Panel panel1;
		private System.Windows.Forms.TextBox textBoxResult;
		private System.Windows.Forms.Button buttonDoit;
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
			this.textBoxResult = new System.Windows.Forms.TextBox();
			this.buttonDoit = new System.Windows.Forms.Button();
			this.panel1.SuspendLayout();
			this.SuspendLayout();
			// 
			// panel1
			// 
			this.panel1.Controls.AddRange(new System.Windows.Forms.Control[] {
																				 this.buttonDoit});
			this.panel1.Dock = System.Windows.Forms.DockStyle.Top;
			this.panel1.Name = "panel1";
			this.panel1.Size = new System.Drawing.Size(292, 100);
			this.panel1.TabIndex = 0;
			// 
			// textBoxResult
			// 
			this.textBoxResult.Dock = System.Windows.Forms.DockStyle.Fill;
			this.textBoxResult.Location = new System.Drawing.Point(0, 100);
			this.textBoxResult.Multiline = true;
			this.textBoxResult.Name = "textBoxResult";
			this.textBoxResult.Size = new System.Drawing.Size(292, 166);
			this.textBoxResult.TabIndex = 1;
			this.textBoxResult.Text = "";
			// 
			// buttonDoit
			// 
			this.buttonDoit.Location = new System.Drawing.Point(109, 39);
			this.buttonDoit.Name = "buttonDoit";
			this.buttonDoit.TabIndex = 0;
			this.buttonDoit.Text = "Do It!";
			this.buttonDoit.Click += new System.EventHandler(this.buttonDoit_Click);
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
				ShapedRoot sr = new ShapedRoot();
				sr.node = new Shaped();
				sr.node.s1 = "a value";
				sr.node.s2 = "another value";
				sr.node.s3 = "uuid:1AE0964A-2B30-4a02-96F2-325B92B4E92C";

				StringWriter sw = new StringWriter();
				XmlTextWriter tw = new XmlTextWriter( sw );
				tw.Formatting = Formatting.Indented;
				tw.Indentation = 4;

				XmlSerializer ser = new XmlSerializer( typeof( ShapedRoot ) );
				ser.Serialize( tw, sr );

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

	[XmlRoot( ElementName="sroot", Namespace="urn:my-examples:shaping" )]
	public class ShapedRoot
	{
		public ShapedRoot()
		{
		}

		public Shaped node;
	}

	[XmlType( Namespace="urn:my-examples:shaping" )]
	public class Shaped
	{
		public Shaped()
		{
		}

		[XmlAttribute]
		public string s1;

		[XmlElement( ElementName = "string2" )]
		public string s2;

		[XmlElement( DataType = "anyURI" )]
		public string s3;
	}
}
