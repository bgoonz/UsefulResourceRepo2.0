using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;
using System.Web.Services.Protocols;

namespace ExampleConfExtensionWebServiceClient
{
	/// <summary>
	/// Summary description for Form1.
	/// </summary>
	public class Form1 : System.Windows.Forms.Form
	{
		private System.Windows.Forms.TextBox passwordTextBox;
		private System.Windows.Forms.Label label2;
		private System.Windows.Forms.TextBox nameTextBox;
		private System.Windows.Forms.Label label1;
		private System.Windows.Forms.Button helloButton;
		private System.Windows.Forms.Button goodbyeButton;
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
			this.passwordTextBox = new System.Windows.Forms.TextBox();
			this.label2 = new System.Windows.Forms.Label();
			this.nameTextBox = new System.Windows.Forms.TextBox();
			this.label1 = new System.Windows.Forms.Label();
			this.helloButton = new System.Windows.Forms.Button();
			this.goodbyeButton = new System.Windows.Forms.Button();
			this.SuspendLayout();
			// 
			// passwordTextBox
			// 
			this.passwordTextBox.Location = new System.Drawing.Point(112, 64);
			this.passwordTextBox.Name = "passwordTextBox";
			this.passwordTextBox.Size = new System.Drawing.Size(248, 20);
			this.passwordTextBox.TabIndex = 12;
			this.passwordTextBox.Text = "";
			// 
			// label2
			// 
			this.label2.Location = new System.Drawing.Point(16, 64);
			this.label2.Name = "label2";
			this.label2.Size = new System.Drawing.Size(96, 23);
			this.label2.TabIndex = 11;
			this.label2.Text = "Password";
			// 
			// nameTextBox
			// 
			this.nameTextBox.Location = new System.Drawing.Point(112, 16);
			this.nameTextBox.Name = "nameTextBox";
			this.nameTextBox.Size = new System.Drawing.Size(248, 20);
			this.nameTextBox.TabIndex = 10;
			this.nameTextBox.Text = "";
			// 
			// label1
			// 
			this.label1.Location = new System.Drawing.Point(16, 16);
			this.label1.Name = "label1";
			this.label1.TabIndex = 9;
			this.label1.Text = "Enter Your Name";
			// 
			// helloButton
			// 
			this.helloButton.Location = new System.Drawing.Point(264, 120);
			this.helloButton.Name = "helloButton";
			this.helloButton.Size = new System.Drawing.Size(88, 23);
			this.helloButton.TabIndex = 8;
			this.helloButton.Text = "Say Hello";
			this.helloButton.Click += new System.EventHandler(this.helloButton_Click);
			// 
			// goodbyeButton
			// 
			this.goodbyeButton.Location = new System.Drawing.Point(264, 160);
			this.goodbyeButton.Name = "goodbyeButton";
			this.goodbyeButton.Size = new System.Drawing.Size(88, 23);
			this.goodbyeButton.TabIndex = 13;
			this.goodbyeButton.Text = "Say Goodbye";
			this.goodbyeButton.Click += new System.EventHandler(this.goodbyeButton_Click);
			// 
			// Form1
			// 
			this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
			this.ClientSize = new System.Drawing.Size(368, 198);
			this.Controls.AddRange(new System.Windows.Forms.Control[] {
																		  this.goodbyeButton,
																		  this.passwordTextBox,
																		  this.label2,
																		  this.nameTextBox,
																		  this.label1,
																		  this.helloButton});
			this.Name = "Form1";
			this.Text = "Web Service Client using Extension (conf)";
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
			string resp = null;

			localhost.Service1 svc = new localhost.Service1();
			svc.SimpleAuthenticationSoapHeaderValue = new localhost.SimpleAuthenticationSoapHeader();
			svc.SimpleAuthenticationSoapHeaderValue.Password = passwordTextBox.Text;
			try
			{
				resp = svc.SayHello( nameTextBox.Text );

				MessageBox.Show( this, resp, "Web Service Response", 
					MessageBoxButtons.OK, 
					MessageBoxIcon.Information );
			}
			catch( SoapHeaderException she)
			{
				resp = she.Message;

				MessageBox.Show( this, resp, "Web Service Response", 
					MessageBoxButtons.OK, 
					MessageBoxIcon.Error );
			}
		}

		private void goodbyeButton_Click(object sender, System.EventArgs e)
		{
			string resp = null;

			localhost.Service1 svc = new localhost.Service1();
			svc.SimpleAuthenticationSoapHeaderValue = new localhost.SimpleAuthenticationSoapHeader();
			svc.SimpleAuthenticationSoapHeaderValue.Password = passwordTextBox.Text;
			try
			{
				resp = svc.SayGoodbye( nameTextBox.Text );

				MessageBox.Show( this, resp, "Web Service Response", 
					MessageBoxButtons.OK, 
					MessageBoxIcon.Information );
			}
			catch( SoapHeaderException she)
			{
				resp = she.Message;

				MessageBox.Show( this, resp, "Web Service Response", 
					MessageBoxButtons.OK, 
					MessageBoxIcon.Error );
			}
		}
	}
}
