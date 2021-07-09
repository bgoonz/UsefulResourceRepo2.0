using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;
using System.Threading;

namespace ControlInvokeExample
{
	/// <summary>
	/// Summary description for Form1.
	/// </summary>
	public class Form1 : System.Windows.Forms.Form
	{
		private System.Windows.Forms.Label label1;
		private System.Windows.Forms.Label label2;
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
			this.SuspendLayout();
			// 
			// label1
			// 
			this.label1.Location = new System.Drawing.Point(94, 89);
			this.label1.Name = "label1";
			this.label1.Size = new System.Drawing.Size(104, 24);
			this.label1.TabIndex = 0;
			this.label1.Text = "Now you see me";
			// 
			// label2
			// 
			this.label2.Location = new System.Drawing.Point(94, 153);
			this.label2.Name = "label2";
			this.label2.Size = new System.Drawing.Size(104, 24);
			this.label2.TabIndex = 1;
			this.label2.Text = "Now you don\'t";
			this.label2.Visible = false;
			// 
			// Form1
			// 
			this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
			this.ClientSize = new System.Drawing.Size(292, 266);
			this.Controls.AddRange(new System.Windows.Forms.Control[] {
																		  this.label2,
																		  this.label1});
			this.Name = "Form1";
			this.Text = "Control Invoke Example";
			this.Load += new System.EventHandler(this.Form1_Load);
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

		private void Form1_Load(object sender, System.EventArgs e)
		{
//			Thread t = new Thread( new ThreadStart( this.DemoInvoke ) );
			Thread t = new Thread( new ThreadStart( this.DemoBeginInvoke ) );
			t.IsBackground = true;
			t.Start();
		}

		private delegate void ShowHideDelegate();

		private void DemoInvoke()
		{
			ShowHideDelegate l1h = new ShowHideDelegate( label1.Hide );
			ShowHideDelegate l2h = new ShowHideDelegate( label2.Hide );
			ShowHideDelegate l1s = new ShowHideDelegate( label1.Show );
			ShowHideDelegate l2s = new ShowHideDelegate( label2.Show );

			while ( true )
			{
				Thread.Sleep( 3000 );
				label1.Invoke( l1h );
				label2.Invoke( l2s );

				Thread.Sleep( 3000 );
				label1.Invoke( l1s );
				label2.Invoke( l2h );
			}
		}

		private Color SetBackColor( Color c )
		{
			Color old = BackColor;
			BackColor = c;

			return old;
		}

		private delegate Color BackColorDelegate( Color c );

		private void DemoBeginInvoke()
		{
			ShowHideDelegate l1h = new ShowHideDelegate( label1.Hide );
			ShowHideDelegate l2h = new ShowHideDelegate( label2.Hide );
			ShowHideDelegate l1s = new ShowHideDelegate( label1.Show );
			ShowHideDelegate l2s = new ShowHideDelegate( label2.Show );
			BackColorDelegate bcd = new BackColorDelegate( this.SetBackColor );

			while ( true )
			{
				Thread.Sleep( 3000 );
				IAsyncResult ar = BeginInvoke( bcd, new Object[] { Color.Red, } );
				label1.BeginInvoke( l1h );
				label2.BeginInvoke( l2s );

				Thread.Sleep( 3000 );

				Color oldColor = (Color)EndInvoke( ar );

				BeginInvoke( bcd, new Object[] { oldColor, } );
				label1.BeginInvoke( l1s );
				label2.BeginInvoke( l2h );
			}
		}

	}
}
