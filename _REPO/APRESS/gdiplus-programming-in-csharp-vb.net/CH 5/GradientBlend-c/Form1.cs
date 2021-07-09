using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Drawing2D;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;

namespace GradientBlend_c
{
  /// <summary>
	/// Summary description for Form1.
	/// </summary>
	public class Form1 : System.Windows.Forms.Form
	{
    private System.Windows.Forms.HScrollBar BlendWidth;
		private System.ComponentModel.Container components = null;
    private System.Windows.Forms.HScrollBar Skew;
    private System.Windows.Forms.Button cmdDoubleBuffer;

    private int BlWidth;
    private int SkewVal;
    private Rectangle EL1Rect;
    private Rectangle EL2Rect;
    private Region EL1Region;
    private Region EL2Region;
    private Region EL3Region;

		public Form1()
		{
			//
			// Required for Windows Form Designer support
			//
			InitializeComponent();

      //Set up rectangles to draw ellipses in
      EL1Rect = new Rectangle(10, 10, 150, 50);
      EL2Rect = EL1Rect;
      //I could make a new rectangle but I can offset without knowing 
      //anything about the previous rectangle.
      EL2Rect.Offset(200, 0);

      //Set up Regions for invalidation
      EL1Region = new Region(EL1Rect);
      EL2Region = new Region(EL2Rect);
      EL3Region = new Region( new Rectangle(new Point(0, 65), 
                                            new Size(this.Width, 50)));


      //Set up the blend scroll bar
      BlendWidth.Top = 120;
      BlendWidth.Left = this.Width/3;
      BlendWidth.Width = this.Width/3;
      BlendWidth.Minimum = 10;
      BlendWidth.Maximum = 200;
      BlendWidth.SmallChange = 1;
      BlendWidth.LargeChange = 10;
      BlendWidth.Value = BlendWidth.Minimum;

      //Set up the Skew Scroll Bar
      Skew.Top = 145;
      Skew.Left = this.Width/3;
      Skew.Width = this.Width/3;
      Skew.Minimum = 10;
      Skew.Maximum = 40;
      Skew.SmallChange = 1;
      Skew.LargeChange = 10;
      Skew.Value = Skew.Minimum;

      //Set up the double buffer button
      cmdDoubleBuffer.Top = Skew.Top + Skew.Height + 5;
      cmdDoubleBuffer.Width = Skew.Width;
      cmdDoubleBuffer.Left = Skew.Left;
      cmdDoubleBuffer.Text = "Allow Flicker";

      BlWidth = BlendWidth.Value;
      SkewVal = Skew.Value;

      // Set up for double buffering.
      //This, along with invalidating only those areas that need it TOTALY
      //eliminate flicker in this program
      this.SetStyle ( ControlStyles.AllPaintingInWmPaint, true);
      this.SetStyle ( ControlStyles.DoubleBuffer, true);
      this.SetStyle ( ControlStyles.UserPaint, true);

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
        //Dispose of our own objects
        EL1Region.Dispose();
        EL2Region.Dispose();
        EL3Region.Dispose();
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
      this.BlendWidth = new System.Windows.Forms.HScrollBar();
      this.Skew = new System.Windows.Forms.HScrollBar();
      this.cmdDoubleBuffer = new System.Windows.Forms.Button();
      this.SuspendLayout();
      // 
      // BlendWidth
      // 
      this.BlendWidth.Location = new System.Drawing.Point(32, 224);
      this.BlendWidth.Name = "BlendWidth";
      this.BlendWidth.Size = new System.Drawing.Size(192, 16);
      this.BlendWidth.TabIndex = 0;
      this.BlendWidth.Scroll += new System.Windows.Forms.ScrollEventHandler(this.BlendChange);
      // 
      // Skew
      // 
      this.Skew.Location = new System.Drawing.Point(192, 272);
      this.Skew.Name = "Skew";
      this.Skew.Size = new System.Drawing.Size(104, 16);
      this.Skew.TabIndex = 1;
      this.Skew.Scroll += new System.Windows.Forms.ScrollEventHandler(this.SkewColor);
      // 
      // cmdDoubleBuffer
      // 
      this.cmdDoubleBuffer.Location = new System.Drawing.Point(40, 304);
      this.cmdDoubleBuffer.Name = "cmdDoubleBuffer";
      this.cmdDoubleBuffer.Size = new System.Drawing.Size(248, 24);
      this.cmdDoubleBuffer.TabIndex = 2;
      this.cmdDoubleBuffer.Text = "button1";
      this.cmdDoubleBuffer.Click += new System.EventHandler(this.cmdDoubleBuffer_Click);
      // 
      // Form1
      // 
      this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
      this.ClientSize = new System.Drawing.Size(392, 373);
      this.Controls.AddRange(new System.Windows.Forms.Control[] {
                                                                  this.cmdDoubleBuffer,
                                                                  this.Skew,
                                                                  this.BlendWidth});
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

    protected override void OnPaint ( PaintEventArgs e )
    {
      e.Graphics.SmoothingMode=SmoothingMode.AntiAlias;

      StandardGradient( e.Graphics );
      e.Graphics.DrawLine(Pens.Black, 0, cmdDoubleBuffer.Bottom+10, this.Width,
                          cmdDoubleBuffer.Bottom+10);
      InterpolateGradient( e.Graphics );

      base.OnPaint(e);
    }

    private void StandardGradient( Graphics G )
    {
      //This brush defines how the color is distributed across the whole 
      //graphics container. Any filled object that gets drawn in the container
      //will pick up the color starting with the color gradient at that 
      //particular point on the screen.
      LinearGradientBrush B = new LinearGradientBrush(new PointF(0, 20),
                                           new PointF(BlWidth, SkewVal),
                                           Color.Blue,
                                           Color.Red);

      //Draw an image inside the second rectangle
      G.DrawImage(Image.FromFile("Colorbars.jpg"), EL2Rect);
      
      //Draw a line across the screen with the brush
      //to show the repeating pattern
      Pen P = new Pen(B, 15);
      G.DrawLine ( P, 0, 75, this.Width, 75 );
      //Draw a filled ellipse to show how the colors are used
      G.FillEllipse(B, EL1Rect);

      //Change the starting and ending colors
      //Set the alpha so the image below shows through
      Color[] c = {Color.FromArgb(100, Color.LightBlue),
                   Color.FromArgb(100, Color.DarkBlue)};
      B.LinearColors = c;
      P.Brush = B;
      G.DrawLine ( P, 0, 100, this.Width, 100 );
      G.FillEllipse(B, EL2Rect );

      //Reclaim some memory
      c = null;
      P.Dispose();
      B.Dispose();
    }

    private void InterpolateGradient ( Graphics G )
    {
      //Make a set of colors to use in the blend
      Color[] EndColors = {Color.Green,
                           Color.Yellow,
                           Color.Yellow,
                           Color.Blue,
                           Color.Red,
                           Color.Red};

      //These are the positions of the colors along the Gradient line
      float[] ColorPositions = {0.0f, .20f, .40f, .60f, .80f, 1.0f};

      //Fill the blend object with the colors and their positions
      ColorBlend C_Blend = new ColorBlend();
      C_Blend.Colors = EndColors;
      C_Blend.Positions = ColorPositions;
      
      //Make the linear brush and assign the custom blend to it
      LinearGradientBrush B = new LinearGradientBrush ( new Point(10, 110), 
                                                        new Point(140, 110), 
                                                        Color.White, 
                                                        Color.Black );
      B.InterpolationColors = C_Blend;

      //Make a graphics path that we can fill and show custom blended fill
      GraphicsPath Pth = new GraphicsPath();
      Pth.AddEllipse(20, 210, 120, 50);
      Pth.AddString("Filled String", new FontFamily("Impact"), 
                    (int)FontStyle.Italic, 30, new Point(200, 220), 
                    StringFormat.GenericDefault );
      G.FillPath(B, Pth);

      Pen P = new Pen(B, 20);
      G.DrawLine ( P, 0, 300, this.Width, 300 );

      if (P != null)
        P.Dispose();
      if (B != null)
        B.Dispose();
      if (Pth != null)
        Pth.Dispose();
    }
    private void BlendChange(object sender, 
                             System.Windows.Forms.ScrollEventArgs e)
    {
      BlWidth = BlendWidth.Value;
      //Redraw the first ellipse
      this.Invalidate(EL1Region);
      //Redraw the second ellipse
      this.Invalidate(EL2Region);
      //Redraw the lines
      this.Invalidate(EL3Region);
    }

    private void SkewColor(object sender, 
                           System.Windows.Forms.ScrollEventArgs e)
    {
      SkewVal = Skew.Value;
      //Redraw the first ellipse
      this.Invalidate(EL1Region);
      //Redraw the second ellipse
      this.Invalidate(EL2Region);
      //Redraw the lines
      Invalidate(EL3Region);
    }

    private void cmdDoubleBuffer_Click(object sender, System.EventArgs e)
    {
      if (  this.GetStyle( ControlStyles.AllPaintingInWmPaint ) && 
        this.GetStyle( ControlStyles.DoubleBuffer ) &&
        this.GetStyle( ControlStyles.UserPaint ) )
      {
        cmdDoubleBuffer.Text = "Eliminate Flicker";
        this.SetStyle ( ControlStyles.AllPaintingInWmPaint, false);
        this.SetStyle ( ControlStyles.DoubleBuffer, false);
      }
      else
      {
        cmdDoubleBuffer.Text = "Allow Flicker";
        this.SetStyle ( ControlStyles.AllPaintingInWmPaint, true);
        this.SetStyle ( ControlStyles.DoubleBuffer, true);
      }
    }
	}
}
