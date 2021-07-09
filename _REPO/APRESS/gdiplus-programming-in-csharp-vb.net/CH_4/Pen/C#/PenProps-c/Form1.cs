using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;

namespace PenProps_c
{
	/// <summary>
	/// Summary description for Form1.
	/// </summary>
	public class Form1 : System.Windows.Forms.Form
	{
    private System.Windows.Forms.Label lblType;
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
      this.lblType = new System.Windows.Forms.Label();
      this.SuspendLayout();
      // 
      // lblType
      // 
      this.lblType.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
      this.lblType.Location = new System.Drawing.Point(56, 184);
      this.lblType.Name = "lblType";
      this.lblType.Size = new System.Drawing.Size(328, 16);
      this.lblType.TabIndex = 0;
      // 
      // Form1
      // 
      this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
      this.ClientSize = new System.Drawing.Size(464, 237);
      this.Controls.AddRange(new System.Windows.Forms.Control[] {
                                                                  this.lblType});
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
    
    }

    protected override void OnPaint(PaintEventArgs e) 
    {
      Graphics G  = e.Graphics;

//      Pen P1=new Pen(Color.Blue, 10);
//
//      G.DrawLine(P1, 20, this.Height/2, this.Width - 20, this.Height/2);
//
//      //Change color and width
//      P1.Color=Color.DarkOrange;
//      P1.Width=5;
//      G.DrawLine(P1, 20, this.Height/2, this.Width - 20, this.Height/2);
//      P1.Width=20;
//
//      //Change brush
//      Pen P2=new Pen(Color.Blue, 10);
//      G.DrawLine(P2, 20, this.Height/3, this.Width - 20, this.Height/3);
//      P2.Brush=new TextureBrush(new Bitmap("colorbars.jpg"));
//      G.DrawLine(P2, 20, this.Height/2, this.Width - 20, this.Height/2);
//      P1.Dispose();

      Pen P2=new Pen(Color.Blue, 10);
      float[] Pts = {3, 1, 2, 5};
      P2.DashStyle=System.Drawing.Drawing2D.DashStyle.Dash;
      P2.DashPattern=Pts;
   //'   P2.DashOffset=40;
      P2.DashCap=System.Drawing.Drawing2D.DashCap.Triangle;
      P2.StartCap = System.Drawing.Drawing2D.LineCap.Round;
      P2.EndCap = System.Drawing.Drawing2D.LineCap.ArrowAnchor;

      G.DrawLine(P2, 20, this.Height/2, this.Width - 20, this.Height/2);

      //pentype
      G.Clear(Color.Khaki);
      Pen P3=new Pen(Color.Blue, 10);
      P3.Brush=new TextureBrush(new Bitmap("colorbars.jpg"));
      G.DrawLine(P3, 20, this.Height/2, this.Width - 20, this.Height/2);
      lblType.Text = "PenType is " + P3.PenType.ToString();

      //Compoundarray
      P3.Dispose();
      G.Clear(Color.Khaki);
      Single[] lines = {0.0f, 0.1f, 0.9f, 1.0f};
      P3=new Pen(Color.Blue, 20);
      P3.CompoundArray=lines;
      G.DrawLine(P3, 20, this.Height/2, this.Width - 20, this.Height/2);

      //pens class
      P3.Dispose();
      G.Clear(Color.Khaki);
      P3 = Pens.LightSlateGray;
      G.DrawLine(P3, 20, this.Height/2, this.Width - 20, this.Height/2);
      G.DrawLine(Pens.Violet, 20, this.Height/2, 
                this.Width - 20, this.Height/2);

      if (P2 != null)
        P2.Dispose();
    }

	}
}
