using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;
using System.IO;
using System.IO.IsolatedStorage;

namespace BrowserLaunchExample
{
	/// <summary>
	/// Summary description for Form1.
	/// </summary>
	public class Form1 : System.Windows.Forms.Form
	{
		private System.Windows.Forms.Label label1;
		private System.Windows.Forms.TextBox textBox1;
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
			try
			{
				using ( IsolatedStorageFile ifs = IsolatedStorageFile.GetUserStoreForDomain() )
				{
					using ( IsolatedStorageFileStream isfs = new IsolatedStorageFileStream( "ble.txt", FileMode.Open, ifs ) )
					{
						using ( StreamReader sr = new StreamReader( isfs ) )
						{
							textBox1.Text = sr.ReadLine();
						}
					}
				}
			}
			catch
			{
				// tolerate when the file does not exist yet
			}
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
			this.textBox1 = new System.Windows.Forms.TextBox();
			this.button1 = new System.Windows.Forms.Button();
			this.SuspendLayout();
			// 
			// label1
			// 
			this.label1.Location = new System.Drawing.Point(24, 32);
			this.label1.Name = "label1";
			this.label1.Size = new System.Drawing.Size(40, 23);
			this.label1.TabIndex = 0;
			this.label1.Text = "Name";
			// 
			// textBox1
			// 
			this.textBox1.Location = new System.Drawing.Point(88, 32);
			this.textBox1.Name = "textBox1";
			this.textBox1.Size = new System.Drawing.Size(184, 20);
			this.textBox1.TabIndex = 1;
			this.textBox1.Text = "";
			// 
			// button1
			// 
			this.button1.Location = new System.Drawing.Point(192, 64);
			this.button1.Name = "button1";
			this.button1.TabIndex = 2;
			this.button1.Text = "Say hello";
			this.button1.Click += new System.EventHandler(this.button1_Click);
			// 
			// Form1
			// 
			this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
			this.ClientSize = new System.Drawing.Size(292, 134);
			this.Controls.AddRange(new System.Windows.Forms.Control[] {
																		  this.button1,
																		  this.textBox1,
																		  this.label1});
			this.Name = "Form1";
			this.Text = "Browser Launch Example";
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
			using ( IsolatedStorageFile ifs = IsolatedStorageFile.GetUserStoreForDomain() )
			{
				using ( IsolatedStorageFileStream isfs = new IsolatedStorageFileStream( "ble.txt", FileMode.Create, ifs ) )
				{
					using ( StreamWriter sw = new StreamWriter( isfs ) )
					{
						sw.WriteLine( textBox1.Text );
					}
				}
			}
			MessageBox.Show( this, "Hello " + textBox1.Text );
		}
	}
}
