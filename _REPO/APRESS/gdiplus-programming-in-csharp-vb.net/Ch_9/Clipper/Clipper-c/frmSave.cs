using System;
using System.Drawing;
using System.Drawing.Printing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;

namespace Clipper_c
{
  /// <summary>
  /// Copyright Nicholas Symmonds 2002
  /// This software is for instructional purposes only.
  /// It may not be sold as is.
  /// 
  /// Allow the user to select a frame for the image before saving it.
  /// </summary>
	public class frmSave : System.Windows.Forms.Form
	{

    #region Class Local Storage

    private PictureBox          m_Pic;
    private Bitmap              m_bmp;
    private Bitmap              m_OriginalBmp;
    private PrintPreviewDialog  Pv;
    private PageSetupDialog     Ps;
    private PrintDocument       Pd;
    private PrintDialog         Pr;
    private Font                FooterFont = new Font("Arial", 8);
    private int                 PrintCount = 0;

    #endregion


    private System.Windows.Forms.Panel P1;
    private System.Windows.Forms.MainMenu mainMenu1;
    private System.Windows.Forms.MenuItem mnuFile;
    private System.Windows.Forms.MenuItem mnuSave;
    private System.Windows.Forms.MenuItem mnuPrint;
    private System.Windows.Forms.MenuItem mnuClose;
    private System.Windows.Forms.MenuItem mnuPrintPreview;
    private System.Windows.Forms.MenuItem mnuPrintNow;
    private System.Windows.Forms.MenuItem NoMenu;
    private System.Windows.Forms.MenuItem mnuAttr;
    private System.Windows.Forms.MenuItem mnuBorder;

    private System.ComponentModel.Container components = null;

		public frmSave(Bitmap bmp)
		{
			InitializeComponent();

      m_bmp = (Bitmap)bmp.Clone();
      m_OriginalBmp = (Bitmap)bmp.Clone();
      P1.BackgroundImage = GetPanelImage();
      P1.Dock = DockStyle.Fill;
      
      m_Pic = new PictureBox();
      m_Pic.BorderStyle = BorderStyle.None;
      m_Pic.SizeMode = PictureBoxSizeMode.AutoSize;
      m_Pic.Image = m_bmp;
      P1.Controls.Add(m_Pic);
      P1.Controls[0].Location = new Point(1, 1);

      //Set up the prnting 
      Pv = new PrintPreviewDialog();
      Ps = new PageSetupDialog();
      Pr = new PrintDialog();
      Pd = new PrintDocument();

      Pd.DocumentName = "ScreenShot";
      Pv.Document = Pd;
      Ps.Document = Pd;
      Pr.Document = Pd;

      Pd.BeginPrint += new PrintEventHandler(this.pd_BeginPrint);
      Pd.PrintPage += new PrintPageEventHandler(this.pd_Print);

		}

    protected override void Dispose( bool disposing )
    {
      if( disposing )
      {
        if(components != null)
        {
          components.Dispose();
        }
        P1.Dispose();
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
      this.P1 = new System.Windows.Forms.Panel();
      this.mainMenu1 = new System.Windows.Forms.MainMenu();
      this.mnuFile = new System.Windows.Forms.MenuItem();
      this.mnuSave = new System.Windows.Forms.MenuItem();
      this.mnuClose = new System.Windows.Forms.MenuItem();
      this.NoMenu = new System.Windows.Forms.MenuItem();
      this.mnuAttr = new System.Windows.Forms.MenuItem();
      this.mnuBorder = new System.Windows.Forms.MenuItem();
      this.mnuPrint = new System.Windows.Forms.MenuItem();
      this.mnuPrintPreview = new System.Windows.Forms.MenuItem();
      this.mnuPrintNow = new System.Windows.Forms.MenuItem();
      this.SuspendLayout();
      // 
      // P1
      // 
      this.P1.AutoScroll = true;
      this.P1.BackColor = System.Drawing.SystemColors.Control;
      this.P1.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
      this.P1.Location = new System.Drawing.Point(8, 16);
      this.P1.Name = "P1";
      this.P1.Size = new System.Drawing.Size(768, 520);
      this.P1.TabIndex = 0;
      // 
      // mainMenu1
      // 
      this.mainMenu1.MenuItems.AddRange(new System.Windows.Forms.MenuItem[] {
                                                                              this.mnuFile,
                                                                              this.NoMenu,
                                                                              this.mnuPrint});
      // 
      // mnuFile
      // 
      this.mnuFile.Index = 0;
      this.mnuFile.MenuItems.AddRange(new System.Windows.Forms.MenuItem[] {
                                                                            this.mnuSave,
                                                                            this.mnuClose});
      this.mnuFile.Text = "&File";
      // 
      // mnuSave
      // 
      this.mnuSave.Index = 0;
      this.mnuSave.Text = "&Save";
      this.mnuSave.Click += new System.EventHandler(this.mnuSave_Click);
      // 
      // mnuClose
      // 
      this.mnuClose.Index = 1;
      this.mnuClose.Text = "&Close";
      this.mnuClose.Click += new System.EventHandler(this.mnuClose_Click);
      // 
      // NoMenu
      // 
      this.NoMenu.Index = 1;
      this.NoMenu.MenuItems.AddRange(new System.Windows.Forms.MenuItem[] {
                                                                           this.mnuAttr,
                                                                           this.mnuBorder});
      this.NoMenu.Text = "&Attributes";
      this.NoMenu.Click += new System.EventHandler(this.mnuAttr_Click);
      // 
      // mnuAttr
      // 
      this.mnuAttr.Index = 0;
      this.mnuAttr.Text = "Resolution";
      this.mnuAttr.Click += new System.EventHandler(this.mnuAttr_Click);
      // 
      // mnuBorder
      // 
      this.mnuBorder.Index = 1;
      this.mnuBorder.Text = "Border";
      this.mnuBorder.Click += new System.EventHandler(this.mnuBorder_Click);
      // 
      // mnuPrint
      // 
      this.mnuPrint.Index = 2;
      this.mnuPrint.MenuItems.AddRange(new System.Windows.Forms.MenuItem[] {
                                                                             this.mnuPrintPreview,
                                                                             this.mnuPrintNow});
      this.mnuPrint.Text = "&Print";
      // 
      // mnuPrintPreview
      // 
      this.mnuPrintPreview.Index = 0;
      this.mnuPrintPreview.Text = "Pre&view";
      this.mnuPrintPreview.Click += new System.EventHandler(this.mnuPrintPreview_Click);
      // 
      // mnuPrintNow
      // 
      this.mnuPrintNow.Index = 1;
      this.mnuPrintNow.Text = "&Print";
      this.mnuPrintNow.Click += new System.EventHandler(this.mnuPrintNow_Click);
      // 
      // frmSave
      // 
      this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
      this.ClientSize = new System.Drawing.Size(792, 553);
      this.Controls.AddRange(new System.Windows.Forms.Control[] {
                                                                  this.P1});
      this.Menu = this.mainMenu1;
      this.MinimizeBox = false;
      this.Name = "frmSave";
      this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
      this.Text = "Save Image";
      this.Load += new System.EventHandler(this.frmSave_Load);
      this.ResumeLayout(false);

    }
		#endregion

    private void frmSave_Load(object sender, System.EventArgs e)
    {
    }

    /// <summary>
    /// This routine makes a blank image and colors it with a hatch brush
    /// This image is handed back to the caller who then uses this image as 
    /// the background image for the panel.  The panel will tile this image 
    /// for as many times as it takes to fill the panel.
    /// </summary>
    private Image GetPanelImage()
    {
      Image i = new Bitmap(50, 50);
      using(Graphics G = Graphics.FromImage(i))
      {
        //No need for high quality here.  We need Speed!!!
        G.SmoothingMode = SmoothingMode.HighSpeed;
        Brush B = new HatchBrush(HatchStyle.Cross, Color.Cyan, Color.LightCyan);
        G.FillRectangle(B, 0, 0, i.Width, i.Height);
      }
      return i;
    }

    private void mnuAttr_Click(object sender, System.EventArgs e)
    {
      Attributes frm = new Attributes(m_bmp.HorizontalResolution, m_bmp.Size);
      frm.ShowDialog();
      m_bmp.SetResolution(frm.SaveRes, frm.SaveRes);
    }

    private void mnuClose_Click(object sender, System.EventArgs e)
    {
      this.Close();
    }

    private void mnuSave_Click(object sender, System.EventArgs e)
    {
      SaveFileDialog sd = new SaveFileDialog();
 
      sd.Filter = "Bitmap (*.bmp)|*.bmp|" +
                  "JPEG (*.jpg)|*.jpg|" + 
                  "GIF (*.Gif)|*.gif|"  +
                  "TIFF (*.tif)|*.tif|"  +
                  "PNG (*.png)|*.png|"  +
                  "EMF (*.emf)|*.emf"  ;
      sd.FilterIndex = 1 ;
      sd.RestoreDirectory = true ;
      sd.AddExtension = true;
 
      if(sd.ShowDialog() == DialogResult.OK)
      {
        if (sd.FileName.Length != 0)
        {
          switch(sd.FilterIndex)
          {
            case 1:
              //Save as bitmap
              m_bmp.Save(sd.FileName, ImageFormat.Bmp);
              break;
            case 2:
              //Save as JPEG
              m_bmp.Save(sd.FileName, ImageFormat.Jpeg);
              break;
            case 3:
              //Save as GIF
              m_bmp.Save(sd.FileName, ImageFormat.Gif);
              break;
            case 4:
              //Save as TIFF
              m_bmp.Save(sd.FileName, ImageFormat.Tiff);
              break;
            case 5:
              //Save as PNG
              m_bmp.Save(sd.FileName, ImageFormat.Png);
              break;
            case 6:
              //Save as EMF
              m_bmp.Save(sd.FileName, ImageFormat.Emf);
              break;
            default:
              break;
          }
        }
      }
    }

    #region Printer routines

    private void pd_BeginPrint ( object sender, PrintEventArgs e)
    {
      Pd.DocumentName = "ScreenShot " + (++PrintCount).ToString();
    }
    private void pd_Print(object sender, PrintPageEventArgs e)
    {
      Graphics G = e.Graphics;
      float LeftMargin = e.MarginBounds.Left;
      float TopMargin = e.MarginBounds.Top;
      float BottomMargin = e.MarginBounds.Bottom;

      StringFormat sf = new StringFormat();
      sf.Alignment = StringAlignment.Far;
      sf.LineAlignment = StringAlignment.Center;

      Rectangle Border = e.MarginBounds;
      Border.Inflate(1, 1);
      RectangleF Footer = new Rectangle(e.MarginBounds.Left, 
                                        e.MarginBounds.Bottom,
                                        e.MarginBounds.Width,
                                        e.PageBounds.Bottom - 
                                        e.MarginBounds.Bottom);

      //Type in the footer
      G.DrawString(Pd.DocumentName, FooterFont, Brushes.Black, Footer, sf);
      sf.Alignment = StringAlignment.Near;
      G.DrawString(DateTime.Now.ToLongDateString(), FooterFont, 
                   Brushes.Black, 
                   Footer, sf);

      //Draw the rectangle and the image.  Image is stretched to fit!!!
      G.DrawRectangle(Pens.Black, Border);
      G.DrawImage(m_bmp, e.MarginBounds);

      sf.Dispose();

    }

    private void mnuPrintPreview_Click(object sender, System.EventArgs e)
    {
      Pv.WindowState = FormWindowState.Maximized;
      Pv.ShowDialog();
    }

    private void mnuPrintNow_Click(object sender, System.EventArgs e)
    {
      if (Pr.ShowDialog() == DialogResult.OK)
        Pd.Print();
    }

    #endregion

    private void mnuBorder_Click(object sender, System.EventArgs e)
    {
      if (!mnuBorder.Checked)
      {
        using (Graphics G = Graphics.FromImage(m_bmp))
        {
          using (Pen P = new Pen(Brushes.Black, 2))
          {
            G.DrawRectangle(P, new Rectangle(0, 0, m_bmp.Size.Width, 
                            m_bmp.Size.Height));
            m_Pic.Image = m_bmp;
            mnuBorder.Checked = true;
          }
        }
      }
      else
      {
        m_bmp = (Bitmap)m_OriginalBmp.Clone();
        m_Pic.Image = m_bmp;
        mnuBorder.Checked = false;
      }
    }

	}
}
