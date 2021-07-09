using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;
using System.Xml;

namespace ReadWriteDomExample
{
	/// <summary>
	/// Summary description for Form1.
	/// </summary>
	public class Form1 : System.Windows.Forms.Form
	{
		private System.Windows.Forms.OpenFileDialog openFileDialog1;
		private System.Windows.Forms.SaveFileDialog saveFileDialog1;
		private System.Windows.Forms.TextBox textBoxContents;
		private System.Windows.Forms.Label label1;
		private System.Windows.Forms.TextBox textBoxSource;
		private System.Windows.Forms.Button buttonBrowseSource;
		private System.Windows.Forms.Label label2;
		private System.Windows.Forms.TextBox textBoxDest;
		private System.Windows.Forms.Button buttonBrowseDest;
		private System.Windows.Forms.Button buttonRead;
		private System.Windows.Forms.Button buttonWrite;
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
			this.openFileDialog1 = new System.Windows.Forms.OpenFileDialog();
			this.saveFileDialog1 = new System.Windows.Forms.SaveFileDialog();
			this.textBoxContents = new System.Windows.Forms.TextBox();
			this.label1 = new System.Windows.Forms.Label();
			this.textBoxSource = new System.Windows.Forms.TextBox();
			this.buttonBrowseSource = new System.Windows.Forms.Button();
			this.label2 = new System.Windows.Forms.Label();
			this.textBoxDest = new System.Windows.Forms.TextBox();
			this.buttonBrowseDest = new System.Windows.Forms.Button();
			this.buttonRead = new System.Windows.Forms.Button();
			this.buttonWrite = new System.Windows.Forms.Button();
			this.SuspendLayout();
			// 
			// openFileDialog1
			// 
			this.openFileDialog1.Filter = "XML files (*.xml)|*.xml|All files (*.*)|*.*";
			// 
			// saveFileDialog1
			// 
			this.saveFileDialog1.FileName = "doc1.xml";
			this.saveFileDialog1.Filter = "XML files (*.xml)|*.xml|All files (*.*)|*.*";
			// 
			// textBoxContents
			// 
			this.textBoxContents.Anchor = (((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
				| System.Windows.Forms.AnchorStyles.Left) 
				| System.Windows.Forms.AnchorStyles.Right);
			this.textBoxContents.Location = new System.Drawing.Point(8, 64);
			this.textBoxContents.Multiline = true;
			this.textBoxContents.Name = "textBoxContents";
			this.textBoxContents.ReadOnly = true;
			this.textBoxContents.Size = new System.Drawing.Size(576, 248);
			this.textBoxContents.TabIndex = 0;
			this.textBoxContents.Text = "";
			// 
			// label1
			// 
			this.label1.Location = new System.Drawing.Point(24, 24);
			this.label1.Name = "label1";
			this.label1.Size = new System.Drawing.Size(56, 23);
			this.label1.TabIndex = 1;
			this.label1.Text = "Source";
			// 
			// textBoxSource
			// 
			this.textBoxSource.Anchor = ((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
				| System.Windows.Forms.AnchorStyles.Right);
			this.textBoxSource.Location = new System.Drawing.Point(104, 24);
			this.textBoxSource.Name = "textBoxSource";
			this.textBoxSource.Size = new System.Drawing.Size(272, 20);
			this.textBoxSource.TabIndex = 2;
			this.textBoxSource.Text = "";
			// 
			// buttonBrowseSource
			// 
			this.buttonBrowseSource.Anchor = (System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right);
			this.buttonBrowseSource.Location = new System.Drawing.Point(392, 24);
			this.buttonBrowseSource.Name = "buttonBrowseSource";
			this.buttonBrowseSource.TabIndex = 3;
			this.buttonBrowseSource.Text = "Browse";
			this.buttonBrowseSource.Click += new System.EventHandler(this.buttonBrowseSource_Click);
			// 
			// label2
			// 
			this.label2.Anchor = (System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left);
			this.label2.Location = new System.Drawing.Point(16, 328);
			this.label2.Name = "label2";
			this.label2.Size = new System.Drawing.Size(64, 23);
			this.label2.TabIndex = 4;
			this.label2.Text = "Destination";
			// 
			// textBoxDest
			// 
			this.textBoxDest.Anchor = ((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left) 
				| System.Windows.Forms.AnchorStyles.Right);
			this.textBoxDest.Location = new System.Drawing.Point(96, 328);
			this.textBoxDest.Name = "textBoxDest";
			this.textBoxDest.Size = new System.Drawing.Size(272, 20);
			this.textBoxDest.TabIndex = 5;
			this.textBoxDest.Text = "";
			// 
			// buttonBrowseDest
			// 
			this.buttonBrowseDest.Anchor = (System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right);
			this.buttonBrowseDest.Location = new System.Drawing.Point(384, 328);
			this.buttonBrowseDest.Name = "buttonBrowseDest";
			this.buttonBrowseDest.TabIndex = 6;
			this.buttonBrowseDest.Text = "Browse";
			this.buttonBrowseDest.Click += new System.EventHandler(this.buttonBrowseDest_Click);
			// 
			// buttonRead
			// 
			this.buttonRead.Anchor = (System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right);
			this.buttonRead.Location = new System.Drawing.Point(496, 24);
			this.buttonRead.Name = "buttonRead";
			this.buttonRead.TabIndex = 7;
			this.buttonRead.Text = "Read it in";
			this.buttonRead.Click += new System.EventHandler(this.buttonRead_Click);
			// 
			// buttonWrite
			// 
			this.buttonWrite.Anchor = (System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right);
			this.buttonWrite.Location = new System.Drawing.Point(488, 328);
			this.buttonWrite.Name = "buttonWrite";
			this.buttonWrite.TabIndex = 8;
			this.buttonWrite.Text = "Write it out";
			this.buttonWrite.Click += new System.EventHandler(this.buttonWrite_Click);
			// 
			// Form1
			// 
			this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
			this.ClientSize = new System.Drawing.Size(592, 366);
			this.Controls.AddRange(new System.Windows.Forms.Control[] {
																		  this.buttonWrite,
																		  this.buttonRead,
																		  this.buttonBrowseDest,
																		  this.textBoxDest,
																		  this.label2,
																		  this.buttonBrowseSource,
																		  this.textBoxSource,
																		  this.label1,
																		  this.textBoxContents});
			this.Name = "Form1";
			this.Text = "Read / Write DOM Example";
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

		private void buttonBrowseSource_Click(object sender, System.EventArgs e)
		{
			if ( openFileDialog1.ShowDialog() == DialogResult.OK )
			{
				textBoxSource.Text = openFileDialog1.FileName;
			}
		}

		private void buttonBrowseDest_Click(object sender, System.EventArgs e)
		{
			if ( saveFileDialog1.ShowDialog() == DialogResult.OK )
			{
				textBoxDest.Text = saveFileDialog1.FileName;
			}
		}

		private XmlDocument doc = new XmlDocument();

		private void buttonRead_Click(object sender, System.EventArgs e)
		{
			doc.Load( textBoxSource.Text );
			textBoxContents.Text = doc.OuterXml;
		}

		private void buttonWrite_Click(object sender, System.EventArgs e)
		{
			XmlTextWriter tw = new XmlTextWriter( textBoxDest.Text, null );
			tw.Formatting = Formatting.Indented;
			tw.Indentation = 4;
			doc.Save( tw );
			tw.Close();
		}
	}
}
