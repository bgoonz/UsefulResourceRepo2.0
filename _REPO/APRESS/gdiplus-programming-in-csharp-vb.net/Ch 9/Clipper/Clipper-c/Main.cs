using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Drawing.Text;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;

namespace Clipper_c
{
  /// <summary>
  /// Copyright Nicholas Symmonds 2002
  /// This software is for instructional purposes only.
  /// It may not be sold as is.
  /// </summary>
	public class Form1 : System.Windows.Forms.Form
	{

    #region Class Local Storage
    Bitmap bmp;
    NotifyIcon trayIcon       = new  NotifyIcon();
    ContextMenu trayIconMenu  = new ContextMenu();
    #endregion

    private System.Windows.Forms.Button cmdCatch;
    private System.Windows.Forms.Button cmdQuit;
    /// <summary>
    /// Required designer variable.
    /// </summary>
		private System.ComponentModel.Container components = null;

		public Form1()
		{
			InitializeComponent();

      this.Icon = new Icon("icon.ico");
      this.BackColor          = Color.BlanchedAlmond;
      this.TransparencyKey    = this.BackColor;
      this.cmdCatch.BackColor = Color.Tomato;
      this.cmdQuit.BackColor  = Color.Tomato;

      trayIconMenu.MenuItems.Add("Catch", 
                                  new EventHandler(this.cmdCatch_Click));
      trayIconMenu.MenuItems.Add("Always On Top", 
                                  new EventHandler(this.ClipperOnTop));
      trayIconMenu.MenuItems.Add("Show",  
                                  new EventHandler(this.Show_Main));
      trayIconMenu.MenuItems.Add("Quit",  
                                  new EventHandler(this.cmdQuit_Click));

      trayIcon.Icon = new Icon("icon.ico");
      trayIcon.Text = "Clipper - Screen Capture";
      trayIcon.ContextMenu = trayIconMenu;
      trayIcon.Visible = true;
      
      this.ShowInTaskbar = false;

		}

    protected override void Dispose( bool disposing )
    {
	    if( disposing )
	    {
		    if (components != null) 
		    {
			    components.Dispose();
		    }

        if (bmp != null)
          bmp.Dispose();

        trayIcon.Dispose();
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
      this.cmdCatch = new System.Windows.Forms.Button();
      this.cmdQuit = new System.Windows.Forms.Button();
      this.SuspendLayout();
      // 
      // cmdCatch
      // 
      this.cmdCatch.ImageAlign = System.Drawing.ContentAlignment.MiddleLeft;
      this.cmdCatch.Location = new System.Drawing.Point(16, 24);
      this.cmdCatch.Name = "cmdCatch";
      this.cmdCatch.Size = new System.Drawing.Size(88, 32);
      this.cmdCatch.TabIndex = 0;
      this.cmdCatch.Text = "&Capture";
      this.cmdCatch.Click += new System.EventHandler(this.cmdCatch_Click);
      // 
      // cmdQuit
      // 
      this.cmdQuit.Location = new System.Drawing.Point(144, 24);
      this.cmdQuit.Name = "cmdQuit";
      this.cmdQuit.Size = new System.Drawing.Size(64, 32);
      this.cmdQuit.TabIndex = 1;
      this.cmdQuit.Text = "&Quit";
      this.cmdQuit.Click += new System.EventHandler(this.cmdQuit_Click);
      // 
      // Form1
      // 
      this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
      this.ClientSize = new System.Drawing.Size(224, 75);
      this.Controls.AddRange(new System.Windows.Forms.Control[] {
                                                                  this.cmdQuit,
                                                                  this.cmdCatch});
      this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
      this.MaximizeBox = false;
      this.Name = "Form1";
      this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
      this.Text = "Screen Capture";
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
    }

    protected override void OnResize(EventArgs e)
    {
      base.OnResize(e);

      if (this.WindowState == FormWindowState.Minimized)
        this.Opacity = 0;
      else
        this.Opacity = 1;
    }

    /// <summary>
    /// The desktop capture method makes this form invisible before 
    /// showing the picture. Once the Save form has run this form becomes
    /// visible. Making this form invisible is done via the forms opacity.
    /// </summary>
    private void cmdCatch_Click(object sender, System.EventArgs e)
    {
      bmp = DeskTop.Capture();
      
      //Make the form invisible
      this.Opacity = 0;
      dtBitmap bmpShow = new dtBitmap(bmp);
      bmp = bmpShow.GetBitmap;

      if (bmp != null)
      {
        frmSave frm = new frmSave(bmp);
        frm.ShowDialog();
      }
      this.Opacity = 1;
    }

    private void cmdQuit_Click(object sender, System.EventArgs e)
    {
      trayIcon.Visible = false;
      this.Close();
    }

    private void Show_Main(object sender, System.EventArgs e)
    {
      this.Visible = true;
      this.WindowState = FormWindowState.Normal;
    }

    private void ClipperOnTop(object sender, System.EventArgs e)
    {
      if ( trayIconMenu.MenuItems[1].Checked )
      {
        trayIconMenu.MenuItems[1].Checked = false;
        this.TopMost = false;
      }
      else
      {
        trayIconMenu.MenuItems[1].Checked = true;
        this.TopMost = true;
      }
    }
  }
}
