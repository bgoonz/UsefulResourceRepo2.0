using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;
using System.DirectoryServices;

namespace AddUser
{
	/// <summary>
	/// Summary description for Form1.
	/// </summary>
	public class Form1 : System.Windows.Forms.Form
	{
		private System.Windows.Forms.Label label1;
		private System.Windows.Forms.Label label2;
		private System.Windows.Forms.Label label3;
		private System.Windows.Forms.Label label4;
		private System.Windows.Forms.TextBox textBox1;
		private System.Windows.Forms.TextBox textBox2;
		private System.Windows.Forms.TextBox textBox3;
		private System.Windows.Forms.TextBox textBox4;
		private System.Windows.Forms.Button button1;
		private System.DirectoryServices.DirectoryEntry directoryEntry1;
		private System.DirectoryServices.DirectoryEntry directoryEntry2;
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
			this.label1 = new System.Windows.Forms.Label();
			this.label2 = new System.Windows.Forms.Label();
			this.label3 = new System.Windows.Forms.Label();
			this.label4 = new System.Windows.Forms.Label();
			this.textBox1 = new System.Windows.Forms.TextBox();
			this.textBox2 = new System.Windows.Forms.TextBox();
			this.textBox3 = new System.Windows.Forms.TextBox();
			this.textBox4 = new System.Windows.Forms.TextBox();
			this.button1 = new System.Windows.Forms.Button();
			this.directoryEntry1 = new System.DirectoryServices.DirectoryEntry();
			this.directoryEntry2 = new System.DirectoryServices.DirectoryEntry();
			this.SuspendLayout();
			// 
			// label1
			// 
			this.label1.Location = new System.Drawing.Point(16, 16);
			this.label1.Name = "label1";
			this.label1.Size = new System.Drawing.Size(72, 23);
			this.label1.TabIndex = 0;
			this.label1.Text = "User name";
			this.label1.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
			// 
			// label2
			// 
			this.label2.Location = new System.Drawing.Point(16, 69);
			this.label2.Name = "label2";
			this.label2.Size = new System.Drawing.Size(72, 23);
			this.label2.TabIndex = 1;
			this.label2.Text = "Full name";
			this.label2.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
			// 
			// label3
			// 
			this.label3.Location = new System.Drawing.Point(16, 122);
			this.label3.Name = "label3";
			this.label3.Size = new System.Drawing.Size(72, 23);
			this.label3.TabIndex = 2;
			this.label3.Text = "Description";
			this.label3.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
			// 
			// label4
			// 
			this.label4.Location = new System.Drawing.Point(16, 175);
			this.label4.Name = "label4";
			this.label4.Size = new System.Drawing.Size(72, 23);
			this.label4.TabIndex = 3;
			this.label4.Text = "Password";
			this.label4.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
			// 
			// textBox1
			// 
			this.textBox1.Location = new System.Drawing.Point(88, 16);
			this.textBox1.Name = "textBox1";
			this.textBox1.Size = new System.Drawing.Size(192, 20);
			this.textBox1.TabIndex = 4;
			this.textBox1.Text = "";
			// 
			// textBox2
			// 
			this.textBox2.Location = new System.Drawing.Point(88, 72);
			this.textBox2.Name = "textBox2";
			this.textBox2.Size = new System.Drawing.Size(192, 20);
			this.textBox2.TabIndex = 5;
			this.textBox2.Text = "";
			// 
			// textBox3
			// 
			this.textBox3.Location = new System.Drawing.Point(88, 128);
			this.textBox3.Name = "textBox3";
			this.textBox3.Size = new System.Drawing.Size(192, 20);
			this.textBox3.TabIndex = 6;
			this.textBox3.Text = "";
			// 
			// textBox4
			// 
			this.textBox4.Location = new System.Drawing.Point(88, 176);
			this.textBox4.Name = "textBox4";
			this.textBox4.PasswordChar = '*';
			this.textBox4.Size = new System.Drawing.Size(192, 20);
			this.textBox4.TabIndex = 7;
			this.textBox4.Text = "";
			// 
			// button1
			// 
			this.button1.Location = new System.Drawing.Point(192, 224);
			this.button1.Name = "button1";
			this.button1.TabIndex = 8;
			this.button1.Text = "Add User";
			this.button1.Click += new System.EventHandler(this.button1_Click);
			// 
			// directoryEntry1
			// 
			this.directoryEntry1.AuthenticationType = System.DirectoryServices.AuthenticationTypes.Secure;
			this.directoryEntry1.Path = "WinNT://MSHOME/alien";
			// 
			// directoryEntry2
			// 
			this.directoryEntry2.Path = "WinNT://MSHOME/alien/Users";
			// 
			// Form1
			// 
			this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
			this.ClientSize = new System.Drawing.Size(292, 266);
			this.Controls.AddRange(new System.Windows.Forms.Control[] {
																		  this.button1,
																		  this.textBox4,
																		  this.textBox3,
																		  this.textBox2,
																		  this.textBox1,
																		  this.label4,
																		  this.label3,
																		  this.label2,
																		  this.label1});
			this.Name = "Form1";
			this.Text = "Add User Example";
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
				DirectoryEntry newUser 
					= directoryEntry1.Children.Add( textBox1.Text, "User" );
				newUser.Properties[ "FullName" ].Add( textBox2.Text );
				newUser.Properties[ "Description" ].Add( textBox3.Text );
				newUser.Invoke( "SetPassword", new object[] { textBox4.Text, } );
				newUser.Properties[ "PasswordExpired" ].Add( 1 );
				newUser.CommitChanges();
				directoryEntry2.Invoke( "Add", new Object[] { newUser.Path, } );
				directoryEntry2.CommitChanges();
				MessageBox.Show( this, textBox1.Text + " added" );
			}
			catch( Exception exc )
			{
				MessageBox.Show( this, exc.ToString() );
			}

		}
	}
}
