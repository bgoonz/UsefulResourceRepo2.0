using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;
using System.Messaging;

namespace ConsumerExample
{
	/// <summary>
	/// Summary description for Form1.
	/// </summary>
	public class Form1 : System.Windows.Forms.Form
	{
		private System.Windows.Forms.ListBox listBox1;
		private System.Messaging.MessageQueue messageQueue1;
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
			this.listBox1 = new System.Windows.Forms.ListBox();
			this.messageQueue1 = new System.Messaging.MessageQueue();
			this.SuspendLayout();
			// 
			// listBox1
			// 
			this.listBox1.Dock = System.Windows.Forms.DockStyle.Fill;
			this.listBox1.Name = "listBox1";
			this.listBox1.Size = new System.Drawing.Size(292, 264);
			this.listBox1.TabIndex = 0;
			// 
			// messageQueue1
			// 
			this.messageQueue1.Path = "FormatName:DIRECT=OS:alien\\private$\\example";
			this.messageQueue1.SynchronizingObject = this;
			this.messageQueue1.ReceiveCompleted += new System.Messaging.ReceiveCompletedEventHandler(this.messageQueue1_ReceiveCompleted);
			// 
			// Form1
			// 
			this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
			this.ClientSize = new System.Drawing.Size(292, 266);
			this.Controls.AddRange(new System.Windows.Forms.Control[] {
																		  this.listBox1});
			this.Name = "Form1";
			this.Text = "Consumer Example";
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
			messageQueue1.BeginReceive();
		}

		private delegate int AddListboxItemDelegate( object obj );

		private void messageQueue1_ReceiveCompleted(object sender, System.Messaging.ReceiveCompletedEventArgs e)
		{
			MessageQueue mq = (MessageQueue)sender;
			System.Messaging.Message msg = mq.EndReceive( e.AsyncResult );
			msg.Formatter = new XmlMessageFormatter( new String[] { "System.String, mscorlib", } );

			AddListboxItemDelegate ali = new AddListboxItemDelegate( listBox1.Items.Add );
			listBox1.BeginInvoke( ali, new object[] { (string)msg.Body, } );

			mq.BeginReceive();
		}
	}
}
