using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;
using System.Xml;

namespace SimpleDomExample
{
	/// <summary>
	/// Summary description for Form1.
	/// </summary>
	public class Form1 : System.Windows.Forms.Form
	{
		private System.Windows.Forms.TextBox textBoxResult;
		private System.Windows.Forms.TextBox textBoxTitle;
		private System.Windows.Forms.TextBox textBoxAuthor;
		private System.Windows.Forms.TextBox textBoxPrice;
		private System.Windows.Forms.Label label1;
		private System.Windows.Forms.Label label2;
		private System.Windows.Forms.Label label3;
		private System.Windows.Forms.Button buttonGenerate;
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
			this.textBoxTitle = new System.Windows.Forms.TextBox();
			this.textBoxAuthor = new System.Windows.Forms.TextBox();
			this.textBoxPrice = new System.Windows.Forms.TextBox();
			this.label1 = new System.Windows.Forms.Label();
			this.label2 = new System.Windows.Forms.Label();
			this.label3 = new System.Windows.Forms.Label();
			this.buttonGenerate = new System.Windows.Forms.Button();
			this.SuspendLayout();
			// 
			// textBoxResult
			// 
			this.textBoxResult.Anchor = ((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left) 
				| System.Windows.Forms.AnchorStyles.Right);
			this.textBoxResult.Location = new System.Drawing.Point(8, 168);
			this.textBoxResult.Multiline = true;
			this.textBoxResult.Name = "textBoxResult";
			this.textBoxResult.Size = new System.Drawing.Size(576, 192);
			this.textBoxResult.TabIndex = 0;
			this.textBoxResult.Text = "";
			// 
			// textBoxTitle
			// 
			this.textBoxTitle.Location = new System.Drawing.Point(72, 16);
			this.textBoxTitle.Name = "textBoxTitle";
			this.textBoxTitle.Size = new System.Drawing.Size(344, 20);
			this.textBoxTitle.TabIndex = 1;
			this.textBoxTitle.Text = "";
			// 
			// textBoxAuthor
			// 
			this.textBoxAuthor.Location = new System.Drawing.Point(72, 64);
			this.textBoxAuthor.Name = "textBoxAuthor";
			this.textBoxAuthor.Size = new System.Drawing.Size(344, 20);
			this.textBoxAuthor.TabIndex = 2;
			this.textBoxAuthor.Text = "";
			// 
			// textBoxPrice
			// 
			this.textBoxPrice.Location = new System.Drawing.Point(72, 104);
			this.textBoxPrice.Name = "textBoxPrice";
			this.textBoxPrice.Size = new System.Drawing.Size(72, 20);
			this.textBoxPrice.TabIndex = 3;
			this.textBoxPrice.Text = "";
			this.textBoxPrice.TextAlign = System.Windows.Forms.HorizontalAlignment.Right;
			// 
			// label1
			// 
			this.label1.Location = new System.Drawing.Point(8, 16);
			this.label1.Name = "label1";
			this.label1.Size = new System.Drawing.Size(56, 23);
			this.label1.TabIndex = 4;
			this.label1.Text = "Title";
			// 
			// label2
			// 
			this.label2.Location = new System.Drawing.Point(8, 64);
			this.label2.Name = "label2";
			this.label2.Size = new System.Drawing.Size(56, 23);
			this.label2.TabIndex = 5;
			this.label2.Text = "Author";
			// 
			// label3
			// 
			this.label3.Location = new System.Drawing.Point(8, 104);
			this.label3.Name = "label3";
			this.label3.Size = new System.Drawing.Size(56, 23);
			this.label3.TabIndex = 6;
			this.label3.Text = "Price";
			// 
			// buttonGenerate
			// 
			this.buttonGenerate.Location = new System.Drawing.Point(440, 104);
			this.buttonGenerate.Name = "buttonGenerate";
			this.buttonGenerate.Size = new System.Drawing.Size(96, 23);
			this.buttonGenerate.TabIndex = 7;
			this.buttonGenerate.Text = "Generate XML";
			this.buttonGenerate.Click += new System.EventHandler(this.buttonGenerate_Click);
			// 
			// Form1
			// 
			this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
			this.ClientSize = new System.Drawing.Size(592, 366);
			this.Controls.AddRange(new System.Windows.Forms.Control[] {
																		  this.buttonGenerate,
																		  this.label3,
																		  this.label2,
																		  this.label1,
																		  this.textBoxPrice,
																		  this.textBoxAuthor,
																		  this.textBoxTitle,
																		  this.textBoxResult});
			this.Name = "Form1";
			this.Text = "Simple DOM Example";
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

		private void buttonGenerate_Click(object sender, System.EventArgs e)
		{
			XmlDocument doc = new XmlDocument();

			XmlElement root = doc.CreateElement( "books" );
			doc.AppendChild( root );

			XmlElement eltBook = doc.CreateElement( "book" );
			root.AppendChild( eltBook );

			XmlElement eltTitle = doc.CreateElement( "title" );
			eltTitle.AppendChild( doc.CreateTextNode( textBoxTitle.Text ) );
			eltBook.AppendChild( eltTitle );

			XmlElement eltAuthor = doc.CreateElement( "author" );
			eltAuthor.AppendChild( doc.CreateTextNode(  textBoxAuthor.Text ) );
			eltBook.AppendChild( eltAuthor );

			XmlElement eltPrice = doc.CreateElement( "price" );
			eltPrice.AppendChild( doc.CreateTextNode(  textBoxPrice.Text ) );
			eltBook.AppendChild( eltPrice );

			textBoxResult.Text = doc.OuterXml;
		}
	}
}
