using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;

namespace MyPen_C
{
	/// <summary>
	/// Summary description for Form1.
	/// </summary>
	public class Form1 : System.Windows.Forms.Form
	{
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

      this.BackColor=Color.Black;

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
      // 
      // Form1
      // 
      this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
      this.ClientSize = new System.Drawing.Size(720, 421);
      this.Name = "Form1";
      this.Text = "Form1";
      this.Load += new System.EventHandler(this.Form1_Load);

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
    
    }

    protected override void OnPaint(PaintEventArgs e) 
    {
      Graphics G  = e.Graphics;
      Image Stripe  = new Bitmap("colorbars.jpg");
      TextureBrush B1  = new TextureBrush(Stripe);
      SolidBrush B2 =new SolidBrush(Color.Aquamarine);
      Pen P1;

      P1 =new Pen(B1, 10);
      G.DrawLine(P1, 20, 20, this.Width - 40, this.Height - 40);
      System.Threading.Thread.Sleep(1000);

      P1 =new Pen(B2, 10);
      G.DrawLine(P1, 20, 20, this.Width - 40, this.Height - 40);
      System.Threading.Thread.Sleep(1000);

      P1 = new Pen(Color.BlanchedAlmond, 10);
      G.DrawLine(P1, 20, 20, this.Width - 40, this.Height - 40);

      //Reclaim memory
      B1.Dispose();
      B2.Dispose();
      P1.Dispose();
    }
                          


	}
}
