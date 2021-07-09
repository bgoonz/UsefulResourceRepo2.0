using System;
using System.Drawing;
using System.Drawing.Text;
using System.Drawing.Drawing2D;
using System.Drawing.Printing;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;

namespace UIPrint_c
{
	public class Form1 : System.Windows.Forms.Form
	{
    private PrintPreviewDialog Pv;
    private PageSetupDialog Ps;
    private PrintDocument Pd;
    private PrintDialog Pr;

    private System.Windows.Forms.MainMenu mainMenu1;
    private System.Windows.Forms.MenuItem mnuFile;
    private System.Windows.Forms.MenuItem mnuSetup;
    private System.Windows.Forms.MenuItem mnuPreview;
    private System.Windows.Forms.MenuItem mnuPrint;
    private System.Windows.Forms.Button cmdQuit;



		private System.ComponentModel.Container components = null;

		public Form1()
		{
			InitializeComponent();

      Pv = new PrintPreviewDialog();
      Ps = new PageSetupDialog();
      Pr = new PrintDialog();
      Pd = new PrintDocument();

      Pd.DocumentName = "My New Document";
      Pv.Document = Pd;
      Ps.Document = Pd;
      Pr.Document = Pd;
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
      this.mainMenu1 = new System.Windows.Forms.MainMenu();
      this.mnuFile = new System.Windows.Forms.MenuItem();
      this.mnuSetup = new System.Windows.Forms.MenuItem();
      this.mnuPreview = new System.Windows.Forms.MenuItem();
      this.mnuPrint = new System.Windows.Forms.MenuItem();
      this.cmdQuit = new System.Windows.Forms.Button();
      this.SuspendLayout();
      // 
      // mainMenu1
      // 
      this.mainMenu1.MenuItems.AddRange(new System.Windows.Forms.MenuItem[] {
                                                                              this.mnuFile});
      // 
      // mnuFile
      // 
      this.mnuFile.Index = 0;
      this.mnuFile.MenuItems.AddRange(new System.Windows.Forms.MenuItem[] {
                                                                            this.mnuSetup,
                                                                            this.mnuPreview,
                                                                            this.mnuPrint});
      this.mnuFile.Text = "File";
      // 
      // mnuSetup
      // 
      this.mnuSetup.Index = 0;
      this.mnuSetup.Text = "Page Setup";
      this.mnuSetup.Click += new System.EventHandler(this.mnuSetup_Click);
      // 
      // mnuPreview
      // 
      this.mnuPreview.Index = 1;
      this.mnuPreview.Text = "Print Preview";
      this.mnuPreview.Click += new System.EventHandler(this.mnuPreview_Click);
      // 
      // mnuPrint
      // 
      this.mnuPrint.Index = 2;
      this.mnuPrint.Text = "Print";
      this.mnuPrint.Click += new System.EventHandler(this.mnuPrint_Click);
      // 
      // cmdQuit
      // 
      this.cmdQuit.Location = new System.Drawing.Point(256, 256);
      this.cmdQuit.Name = "cmdQuit";
      this.cmdQuit.Size = new System.Drawing.Size(64, 32);
      this.cmdQuit.TabIndex = 0;
      this.cmdQuit.Text = "Quit";
      this.cmdQuit.Click += new System.EventHandler(this.cmdQuit_Click);
      // 
      // Form1
      // 
      this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
      this.ClientSize = new System.Drawing.Size(342, 303);
      this.Controls.AddRange(new System.Windows.Forms.Control[] {
                                                                  this.cmdQuit});
      this.MaximizeBox = false;
      this.Menu = this.mainMenu1;
      this.MinimizeBox = false;
      this.Name = "Form1";
      this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
      this.Text = "Form1";
      this.Load += new System.EventHandler(this.Form1_Load);
      this.ResumeLayout(false);

    }
		#endregion

		[STAThread]
		static void Main() 
		{
			Application.Run(new Form1());
		}

    private void Form1_Load(object sender, System.EventArgs e)
    {
      Pd.PrintPage += new PrintPageEventHandler(this.pd_Print);
    }

    protected override void OnPaint(PaintEventArgs e)
    {
      DrawIt(e.Graphics);
    }

    private void DrawIt(Graphics G)
    {
      G.SmoothingMode = SmoothingMode.AntiAlias;
      Pen P1 = new Pen(Brushes.Violet, 5);
      
      G.DrawString("Test of Print dialog and page setup",
                    new Font("Time New Roman", 16),
                    Brushes.Blue,
                    new Point(5, 5));
      G.DrawPie(P1, 10, 10, 150, 150, 28, 57);
      G.FillEllipse(Brushes.BurlyWood, 10, 200, this.Width-50, 50);
    }

    private void pd_Print(object sender, PrintPageEventArgs e)
    {
      DrawIt(e.Graphics);
    }

    private void mnuSetup_Click(object sender, System.EventArgs e)
    {
      Ps.ShowDialog();
      Pd.DefaultPageSettings = Ps.PageSettings;
      Pd.PrinterSettings = Ps.PrinterSettings;
    }

    private void mnuPreview_Click(object sender, System.EventArgs e)
    {
      Pv.WindowState = FormWindowState.Maximized;
      Pv.ShowDialog();
    }

    private void mnuPrint_Click(object sender, System.EventArgs e)
    {
      if (Pr.ShowDialog() == DialogResult.OK)
        Pd.Print();
    }

    private void cmdQuit_Click(object sender, System.EventArgs e)
    {
      this.Dispose();
    }

	}
}
