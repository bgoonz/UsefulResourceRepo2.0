using System;
using System.Drawing;
using System.Drawing.Printing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;

namespace PrintDialogs_c
{
	public class Form1 : System.Windows.Forms.Form
	{
    private Image MyImage;
    private PrintDocument pd;
    private PrintPreviewDialog Preview;

    private System.Windows.Forms.Button cmdShow;
    private System.Windows.Forms.Label lblPrint;
		private System.ComponentModel.Container components = null;

		public Form1()
		{
			InitializeComponent();

      MyImage = Bitmap.FromFile(@"d:\colorbars.jpg");
      Preview = new PrintPreviewDialog();
      Preview.UseAntiAlias = true;
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
			base.Dispose( disposing );
		}

		#region Windows Form Designer generated code
		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent()
		{
      this.cmdShow = new System.Windows.Forms.Button();
      this.lblPrint = new System.Windows.Forms.Label();
      this.SuspendLayout();
      // 
      // cmdShow
      // 
      this.cmdShow.Location = new System.Drawing.Point(352, 344);
      this.cmdShow.Name = "cmdShow";
      this.cmdShow.Size = new System.Drawing.Size(72, 24);
      this.cmdShow.TabIndex = 0;
      this.cmdShow.Text = "Show";
      this.cmdShow.Click += new System.EventHandler(this.cmdShow_Click);
      // 
      // lblPrint
      // 
      this.lblPrint.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
      this.lblPrint.Location = new System.Drawing.Point(144, 32);
      this.lblPrint.Name = "lblPrint";
      this.lblPrint.Size = new System.Drawing.Size(280, 136);
      this.lblPrint.TabIndex = 1;
      // 
      // Form1
      // 
      this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
      this.ClientSize = new System.Drawing.Size(442, 373);
      this.Controls.AddRange(new System.Windows.Forms.Control[] {
                                                                  this.lblPrint,
                                                                  this.cmdShow});
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
      pd = new PrintDocument();
      pd.PrintPage += new PrintPageEventHandler(this.pd_Print);
      
      Preview.Document = pd;
    }

    protected override void OnPaint(PaintEventArgs e)
    {
      DrawIt(e.Graphics);
    }

    private void pd_Print(object sender, PrintPageEventArgs e)
    {
      lblPrint.Text += "pd_Print pd= " + sender.ToString() + "\n" ;
      DrawIt(e.Graphics);
    }

    private void DrawIt(Graphics G)
    {
      G.SmoothingMode=SmoothingMode.AntiAlias;
      G.DrawImage(MyImage, 10, 10);

      LinearGradientBrush B = new LinearGradientBrush(
                              new Rectangle(0, 0, 50, 10),
                              Color.Red, Color.Blue, 
                              LinearGradientMode.ForwardDiagonal);
      G.FillEllipse(B, 10, 200, 200, 75);

      G.DrawString("Print Preview Test", 
                   new Font("Comic Sans MS",24), B, 50, 275);
    }

    private void cmdShow_Click(object sender, System.EventArgs e)
    {
      Preview.WindowState = FormWindowState.Maximized;
      pd.DocumentName = DateTime.Now.Ticks.ToString();
      Preview.ShowDialog();
    }
	}
}
