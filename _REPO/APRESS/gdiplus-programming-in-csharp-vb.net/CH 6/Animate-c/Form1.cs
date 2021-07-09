using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;

namespace Animate_c
{
	public class Form1 : System.Windows.Forms.Form
	{
    private System.Windows.Forms.Button cmdGo;
		/// <summary>
		/// Required designer variable.
		/// </summary>
		/// 

    Bitmap RotatingBlocks;
    Point DrawHere;
    Rectangle InvalidRect;
    bool InProcess = false;
    private System.Windows.Forms.Button cmdStop;

		private System.ComponentModel.Container components = null;

		public Form1()
		{
      InitializeComponent();

      RotatingBlocks = new Bitmap("blocks.gif");
      DrawHere = new Point(10, 10);
      InvalidRect = new Rectangle(DrawHere, RotatingBlocks.Size);

      this.SetStyle(ControlStyles.AllPaintingInWmPaint,true);
      this.SetStyle(ControlStyles.DoubleBuffer,true);
      cmdStop.Enabled = false;
    }

		protected override void Dispose( bool disposing )
		{
			if( disposing )
			{
				if (components != null) 
				{
					components.Dispose();
				}
			}
      RotatingBlocks.Dispose();
			base.Dispose( disposing );
		}

		#region Windows Form Designer generated code
		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent()
		{
      this.cmdGo = new System.Windows.Forms.Button();
      this.cmdStop = new System.Windows.Forms.Button();
      this.SuspendLayout();
      // 
      // cmdGo
      // 
      this.cmdGo.Location = new System.Drawing.Point(160, 120);
      this.cmdGo.Name = "cmdGo";
      this.cmdGo.Size = new System.Drawing.Size(64, 32);
      this.cmdGo.TabIndex = 0;
      this.cmdGo.Text = "Animate";
      this.cmdGo.Click += new System.EventHandler(this.cmdGo_Click);
      // 
      // cmdStop
      // 
      this.cmdStop.Location = new System.Drawing.Point(240, 120);
      this.cmdStop.Name = "cmdStop";
      this.cmdStop.Size = new System.Drawing.Size(56, 32);
      this.cmdStop.TabIndex = 1;
      this.cmdStop.Text = "Stop";
      this.cmdStop.Click += new System.EventHandler(this.cmdStop_Click);
      // 
      // Form1
      // 
      this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
      this.ClientSize = new System.Drawing.Size(312, 157);
      this.Controls.AddRange(new System.Windows.Forms.Control[] {
                                                                  this.cmdStop,
                                                                  this.cmdGo});
      this.MaximizeBox = false;
      this.MinimizeBox = false;
      this.Name = "Form1";
      this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
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

    private void OnFrameChanged(object o, EventArgs e) 
    {
      //Force a call to the Paint event handler.
      this.Invalidate(InvalidRect);
    }

    protected override void OnPaint(PaintEventArgs e) 
    {
      if ( !InProcess )
        return;
      
      //Get the next block ready to display.
      ImageAnimator.UpdateFrames(RotatingBlocks);
      //Draw the next frame in the RotatingBlocks animation.
      e.Graphics.DrawImage(RotatingBlocks, DrawHere);
    }

    private void cmdGo_Click(object sender, System.EventArgs e)
    {
      if (!InProcess) 
      {
        if ( ImageAnimator.CanAnimate(RotatingBlocks) )
        {
          //Begin the animation only once.
          ImageAnimator.Animate(RotatingBlocks, 
                                new EventHandler(this.OnFrameChanged));
          InProcess = true;
          cmdGo.Enabled = false;
          cmdStop.Enabled = true;
        }
      }
    }

    private void cmdStop_Click(object sender, System.EventArgs e)
    {
      ImageAnimator.StopAnimate(RotatingBlocks, 
                                new EventHandler(this.OnFrameChanged));
      InProcess = false;
      cmdGo.Enabled = true;
      cmdStop.Enabled = false;
    }

  }
}
