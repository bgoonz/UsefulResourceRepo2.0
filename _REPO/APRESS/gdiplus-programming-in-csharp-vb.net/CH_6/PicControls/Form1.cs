using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;

namespace PicControls
{
	/// <summary>
	/// Summary description for Form1.
	/// </summary>
	public class Form1 : System.Windows.Forms.Form
	{
    private System.Windows.Forms.PictureBox p;
    private System.Windows.Forms.Panel PicPanel;
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
      this.p = new System.Windows.Forms.PictureBox();
      this.PicPanel = new System.Windows.Forms.Panel();
      this.SuspendLayout();
      // 
      // p
      // 
      this.p.Location = new System.Drawing.Point(32, 40);
      this.p.Name = "p";
      this.p.Size = new System.Drawing.Size(136, 104);
      this.p.TabIndex = 0;
      this.p.TabStop = false;
      // 
      // PicPanel
      // 
      this.PicPanel.Location = new System.Drawing.Point(200, 120);
      this.PicPanel.Name = "PicPanel";
      this.PicPanel.Size = new System.Drawing.Size(200, 184);
      this.PicPanel.TabIndex = 1;
      // 
      // Form1
      // 
      this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
      this.ClientSize = new System.Drawing.Size(424, 349);
      this.Controls.AddRange(new System.Windows.Forms.Control[] {
                                                                  this.PicPanel,
                                                                  this.p});
      this.Name = "Form1";
      this.Text = "Form1";
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
      Bitmap b = new Bitmap("crane.jpg");
      //PictureBox is "p"
      p.Image = (Image)b;
    }






	}
}
