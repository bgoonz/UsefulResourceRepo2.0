using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;

namespace ImageClass
{
	/// <summary>
	/// Summary description for Form1.
	/// </summary>
	public class Form1 : System.Windows.Forms.Form
	{
    private System.Windows.Forms.OpenFileDialog ofdBitmap;
    private System.Windows.Forms.Button cmdOpen;
		/// <summary>
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.Container components = null;
    private System.Windows.Forms.GroupBox groupBox1;
    private System.Windows.Forms.Label label1;
    private System.Windows.Forms.Label label2;
    private System.Windows.Forms.Label label3;
    private System.Windows.Forms.Label label4;
    private System.Windows.Forms.Label label5;
    private System.Windows.Forms.Label lblHT;
    private System.Windows.Forms.Label lblWidth;
    private System.Windows.Forms.Label lblHdpi;
    private System.Windows.Forms.Label lblVdpi;
    private System.Windows.Forms.Label lblFormat;
    private System.Windows.Forms.Label label6;
    private System.Windows.Forms.Label lblSize;
    private System.Windows.Forms.Label lblDIM;
    private System.Windows.Forms.Label label8;
    private System.Windows.Forms.Button cmdSetRes;

    #region Class local variables
    Bitmap Bmp;
    RectangleF BMPContainer;
    #endregion

		public Form1()
		{
			//
			// Required for Windows Form Designer support
			//
			InitializeComponent();

      ofdBitmap.Filter= "Image Files(*.BMP;*.JPG;*.GIF)|*.BMP;*.JPG;*.GIF";
      ofdBitmap.InitialDirectory = "";
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
      if (Bmp != null)
        Bmp.Dispose();
			base.Dispose( disposing );
		}

		#region Windows Form Designer generated code
		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent()
		{
      this.ofdBitmap = new System.Windows.Forms.OpenFileDialog();
      this.cmdOpen = new System.Windows.Forms.Button();
      this.groupBox1 = new System.Windows.Forms.GroupBox();
      this.label1 = new System.Windows.Forms.Label();
      this.label2 = new System.Windows.Forms.Label();
      this.label3 = new System.Windows.Forms.Label();
      this.label4 = new System.Windows.Forms.Label();
      this.label5 = new System.Windows.Forms.Label();
      this.lblHT = new System.Windows.Forms.Label();
      this.lblWidth = new System.Windows.Forms.Label();
      this.lblHdpi = new System.Windows.Forms.Label();
      this.lblVdpi = new System.Windows.Forms.Label();
      this.lblFormat = new System.Windows.Forms.Label();
      this.label6 = new System.Windows.Forms.Label();
      this.lblSize = new System.Windows.Forms.Label();
      this.lblDIM = new System.Windows.Forms.Label();
      this.label8 = new System.Windows.Forms.Label();
      this.cmdSetRes = new System.Windows.Forms.Button();
      this.groupBox1.SuspendLayout();
      this.SuspendLayout();
      // 
      // ofdBitmap
      // 
      this.ofdBitmap.FileOk += new System.ComponentModel.CancelEventHandler(this.OpenFile);
      // 
      // cmdOpen
      // 
      this.cmdOpen.Location = new System.Drawing.Point(16, 320);
      this.cmdOpen.Name = "cmdOpen";
      this.cmdOpen.Size = new System.Drawing.Size(72, 32);
      this.cmdOpen.TabIndex = 0;
      this.cmdOpen.Text = "Open";
      this.cmdOpen.Click += new System.EventHandler(this.Open);
      // 
      // groupBox1
      // 
      this.groupBox1.Controls.AddRange(new System.Windows.Forms.Control[] {
                                                                            this.lblDIM,
                                                                            this.label8,
                                                                            this.lblSize,
                                                                            this.label6,
                                                                            this.lblFormat,
                                                                            this.lblVdpi,
                                                                            this.lblHdpi,
                                                                            this.lblWidth,
                                                                            this.lblHT,
                                                                            this.label5,
                                                                            this.label4,
                                                                            this.label3,
                                                                            this.label2,
                                                                            this.label1});
      this.groupBox1.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((System.Byte)(0)));
      this.groupBox1.Location = new System.Drawing.Point(144, 80);
      this.groupBox1.Name = "groupBox1";
      this.groupBox1.Size = new System.Drawing.Size(224, 224);
      this.groupBox1.TabIndex = 2;
      this.groupBox1.TabStop = false;
      this.groupBox1.Text = "Attributes";
      // 
      // label1
      // 
      this.label1.Location = new System.Drawing.Point(8, 24);
      this.label1.Name = "label1";
      this.label1.Size = new System.Drawing.Size(64, 16);
      this.label1.TabIndex = 0;
      this.label1.Text = "Height";
      // 
      // label2
      // 
      this.label2.Location = new System.Drawing.Point(8, 72);
      this.label2.Name = "label2";
      this.label2.Size = new System.Drawing.Size(64, 16);
      this.label2.TabIndex = 1;
      this.label2.Text = "Hdpi";
      // 
      // label3
      // 
      this.label3.Location = new System.Drawing.Point(8, 48);
      this.label3.Name = "label3";
      this.label3.Size = new System.Drawing.Size(64, 16);
      this.label3.TabIndex = 2;
      this.label3.Text = "Width";
      // 
      // label4
      // 
      this.label4.Location = new System.Drawing.Point(8, 96);
      this.label4.Name = "label4";
      this.label4.Size = new System.Drawing.Size(64, 16);
      this.label4.TabIndex = 3;
      this.label4.Text = "Vdpi";
      // 
      // label5
      // 
      this.label5.Location = new System.Drawing.Point(8, 120);
      this.label5.Name = "label5";
      this.label5.Size = new System.Drawing.Size(64, 16);
      this.label5.TabIndex = 4;
      this.label5.Text = "Format";
      // 
      // lblHT
      // 
      this.lblHT.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
      this.lblHT.Location = new System.Drawing.Point(80, 24);
      this.lblHT.Name = "lblHT";
      this.lblHT.Size = new System.Drawing.Size(136, 16);
      this.lblHT.TabIndex = 5;
      // 
      // lblWidth
      // 
      this.lblWidth.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
      this.lblWidth.Location = new System.Drawing.Point(80, 48);
      this.lblWidth.Name = "lblWidth";
      this.lblWidth.Size = new System.Drawing.Size(136, 16);
      this.lblWidth.TabIndex = 6;
      // 
      // lblHdpi
      // 
      this.lblHdpi.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
      this.lblHdpi.Location = new System.Drawing.Point(80, 72);
      this.lblHdpi.Name = "lblHdpi";
      this.lblHdpi.Size = new System.Drawing.Size(136, 16);
      this.lblHdpi.TabIndex = 7;
      // 
      // lblVdpi
      // 
      this.lblVdpi.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
      this.lblVdpi.Location = new System.Drawing.Point(80, 96);
      this.lblVdpi.Name = "lblVdpi";
      this.lblVdpi.Size = new System.Drawing.Size(136, 16);
      this.lblVdpi.TabIndex = 8;
      // 
      // lblFormat
      // 
      this.lblFormat.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
      this.lblFormat.Location = new System.Drawing.Point(80, 120);
      this.lblFormat.Name = "lblFormat";
      this.lblFormat.Size = new System.Drawing.Size(136, 16);
      this.lblFormat.TabIndex = 9;
      // 
      // label6
      // 
      this.label6.Location = new System.Drawing.Point(8, 160);
      this.label6.Name = "label6";
      this.label6.Size = new System.Drawing.Size(64, 16);
      this.label6.TabIndex = 10;
      this.label6.Text = "Size";
      // 
      // lblSize
      // 
      this.lblSize.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
      this.lblSize.Location = new System.Drawing.Point(80, 160);
      this.lblSize.Name = "lblSize";
      this.lblSize.Size = new System.Drawing.Size(136, 16);
      this.lblSize.TabIndex = 11;
      // 
      // lblDIM
      // 
      this.lblDIM.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
      this.lblDIM.Location = new System.Drawing.Point(80, 184);
      this.lblDIM.Name = "lblDIM";
      this.lblDIM.Size = new System.Drawing.Size(136, 16);
      this.lblDIM.TabIndex = 13;
      // 
      // label8
      // 
      this.label8.Location = new System.Drawing.Point(8, 184);
      this.label8.Name = "label8";
      this.label8.Size = new System.Drawing.Size(64, 16);
      this.label8.TabIndex = 12;
      this.label8.Text = "Dimensions";
      // 
      // cmdSetRes
      // 
      this.cmdSetRes.Location = new System.Drawing.Point(144, 320);
      this.cmdSetRes.Name = "cmdSetRes";
      this.cmdSetRes.Size = new System.Drawing.Size(128, 32);
      this.cmdSetRes.TabIndex = 3;
      this.cmdSetRes.Text = "Reset Resolution";
      this.cmdSetRes.Click += new System.EventHandler(this.SetRes);
      // 
      // Form1
      // 
      this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
      this.ClientSize = new System.Drawing.Size(392, 373);
      this.Controls.AddRange(new System.Windows.Forms.Control[] {
                                                                  this.cmdSetRes,
                                                                  this.groupBox1,
                                                                  this.cmdOpen});
      this.MaximizeBox = false;
      this.MinimizeBox = false;
      this.Name = "Form1";
      this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
      this.Text = "Form1";
      this.Load += new System.EventHandler(this.Form1_Load);
      this.groupBox1.ResumeLayout(false);
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

    protected override void OnPaint( PaintEventArgs e)
    {
      Graphics G = e.Graphics;
      if ( Bmp != null )
      {
        //OK Folks. This is a BitBlt!
        G.DrawImage(Bmp, BMPContainer);
      }

      base.OnPaint(e);
    }

    private void Open(object sender, System.EventArgs e)
    {
      ofdBitmap.ShowDialog();
    }

    private void OpenFile(object sender, 
                          System.ComponentModel.CancelEventArgs e)
    {
      //Wondering what sender is?  Use reflection!
      if ( !( sender is System.Windows.Forms.OpenFileDialog ) )
        return;

      Bmp = new Bitmap( ofdBitmap.FileName );
      if ( Bmp != null )
      {
        ShowStats();
        DrawBMP();
      }
    }

    private void SetRes(object sender, System.EventArgs e)
    {
      if ( Bmp != null )
      {
        Bmp.SetResolution(150, 150);
        DrawBMP();
      }
    }

    private void DrawBMP()
    {
      if ( Bmp != null )
      {
        //Invalidate only the area where the image will be drawn
        Graphics G = this.CreateGraphics();
        GraphicsUnit GU = G.PageUnit;
        BMPContainer = Bmp.GetBounds( ref GU ); //X,Y = 0
        ShowStats();
        this.Invalidate( Rectangle.Round( BMPContainer ) );
        G.Dispose();
      }
    }
    private void ShowStats()
    {
      if ( Bmp != null )
      {
        //Show some properties here
        lblHT.Text = Bmp.Height.ToString();
        lblWidth.Text = Bmp.Width.ToString();
        lblVdpi.Text = Bmp.VerticalResolution.ToString();
        lblHdpi.Text = Bmp.HorizontalResolution.ToString();
        lblFormat.Text = Bmp.PixelFormat.ToString();
        lblSize.Text = Bmp.Size.ToString();
        lblDIM.Text = Bmp.PhysicalDimension.ToString();
      }
    }
	}
}
