using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;
using System.Web.Services.Protocols;

namespace ExampleHeaderWebServiceClient
{
	/// <summary>
	/// Summary description for Form1.
	/// </summary>
	public class Form1 : System.Windows.Forms.Form
	{
		private System.Windows.Forms.TextBox nameTextBox;
		private System.Windows.Forms.Label label1;
		private System.Windows.Forms.Button helloButton;
		private System.Windows.Forms.Label label2;
		private System.Windows.Forms.TextBox passwordTextBox;
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
			this.nameTextBox = new System.Windows.Forms.TextBox();
			this.label1 = new System.Windows.Forms.Label();
			this.helloButton = new System.Windows.Forms.Button();
			this.label2 = new System.Windows.Forms.Label();
			this.passwordTextBox = new System.Windows.Forms.TextBox();
			this.SuspendLayout();
			// 
			// nameTextBox
			// 
			this.nameTextBox.Location = new System.Drawing.Point(112, 24);
			this.nameTextBox.Name = "nameTextBox";
			this.nameTextBox.Size = new System.Drawing.Size(248, 20);
			this.nameTextBox.TabIndex = 5;
			this.nameTextBox.Text = "";
			// 
			// label1
			// 
			this.label1.Location = new System.Drawing.Point(16, 24);
			this.label1.Name = "label1";
			this.label1.TabIndex = 4;
			this.label1.Text = "Enter Your Name";
			// 
			// helloButton
			// 
			this.helloButton.Location = new System.Drawing.Point(280, 128);
			this.helloButton.Name = "helloButton";
			this.helloButton.TabIndex = 3;
			this.helloButton.Text = "Say Hello";
			this.helloButton.Click += new System.EventHandler(this.helloButton_Click);
			// 
			// label2
			// 
			this.label2.Location = new System.Drawing.Point(16, 72);
			this.label2.Name = "label2";
			this.label2.Size = new System.Drawing.Size(96, 23);
			this.label2.TabIndex = 6;
			this.label2.Text = "Password";
			// 
			// passwordTextBox
			// 
			this.passwordTextBox.Location = new System.Drawing.Point(112, 72);
			this.passwordTextBox.Name = "passwordTextBox";
			this.passwordTextBox.Size = new System.Drawing.Size(248, 20);
			this.passwordTextBox.TabIndex = 7;
			this.passwordTextBox.Text = "";
			// 
			// Form1
			// 
			this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
			this.ClientSize = new System.Drawing.Size(376, 174);
			this.Controls.AddRange(new System.Windows.Forms.Control[] {
																		  this.passwordTextBox,
																		  this.label2,
																		  this.nameTextBox,
																		  this.label1,
																		  this.helloButton});
			this.Name = "Form1";
			this.Text = "Ex. Web Service Client using SOAP Headers";
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

		private void helloButton_Click(object sender, System.EventArgs e)
		{
			localhost.Service1 svc = new localhost.Service1();
			svc.SimpleAuthenticationSoapHeaderValue = new localhost.SimpleAuthenticationSoapHeader();
			svc.SimpleAuthenticationSoapHeaderValue.Password = passwordTextBox.Text;
			try
			{
				String resp = svc.SayHello( nameTextBox.Text );
				MessageBox.Show( this, 
					resp, 
					"Web Service Response", 
					MessageBoxButtons.OK, 
					MessageBoxIcon.Information );
			}
			catch( SoapHeaderException she)
			{
				MessageBox.Show( this, 
					she.Message, 
					"Web Service Response", 
					MessageBoxButtons.OK, 
					MessageBoxIcon.Error );
			}
		}
	}
}
