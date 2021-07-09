using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;

namespace GraphicsDraw_c
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
      this.ClientSize = new System.Drawing.Size(504, 629);
      this.Name = "Form1";
      this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
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
      Rectangle R1 = new Rectangle(10, 10, 40, 40);

      e.Graphics.SmoothingMode=SmoothingMode.HighQuality;

      e.Graphics.DrawRectangle(Pens.Black,R1);
      e.Graphics.TranslateTransform(50.0F, 0.0F);
      e.Graphics.FillRectangle(Brushes.Black,R1);

      //Draw three rectangles
      Rectangle[] ThreeRects = {new Rectangle(110, 10, 40, 40), 
                                new Rectangle(160, 10, 40, 40), 
                                new Rectangle(210, 10, 40, 40)};
      e.Graphics.ResetTransform();
      e.Graphics.DrawRectangles(Pens.Red, ThreeRects);

      //Draw three filled rectangles
      e.Graphics.ResetTransform();
      e.Graphics.TranslateTransform(100.0F, 0.0F);
      e.Graphics.FillRectangles(Brushes.Red, ThreeRects);


      //Use first rect to bound ellipse as circle
      e.Graphics.ResetTransform();
      e.Graphics.TranslateTransform(0.0F, 50.0F);
      e.Graphics.DrawEllipse(Pens.Green,R1);

      //Draw a filled ellipse
      e.Graphics.TranslateTransform(50.0F, 0.0F);
      e.Graphics.FillEllipse(Brushes.Green,R1);

      //Use first rect to bound pie 
      e.Graphics.ResetTransform();
      e.Graphics.TranslateTransform(100.0F, 50.0F);
      e.Graphics.DrawPie(Pens.DarkViolet, R1, 0, 60);

      //Use first rect to fill pie 
      e.Graphics.ResetTransform();
      e.Graphics.TranslateTransform(150.0F, 50.0F);
      e.Graphics.FillPie(Brushes.DarkViolet, R1, 0, 60);

      //Use first rect to bound arc 
      e.Graphics.ResetTransform();
      e.Graphics.TranslateTransform(200.0F, 50.0F);
      e.Graphics.DrawArc(Pens.DarkBlue, R1, 40, 160);

      PointDraw ( e.Graphics );
      PathDraw ( e.Graphics );
   }

    private void PointDraw( Graphics G )
    {
      //Start with clean slate
      G.ResetClip();
      G.ResetTransform();

      //Separate sections
      G.DrawLine(Pens.Black,10,110,this.Width-10,110);

      //------------ Draw Line -----------------------
      //Generate start and end points
      Point StartPt = new Point(10,130);
      Point EndPt = new Point(200,130);
      Pen P = new Pen(Brushes.CadetBlue, 5);
      G.DrawLine(P, StartPt, EndPt);

      //------------- Draw lines ----------------------
      //Translate in the Y Direction
      Size Xlate_Y = new Size(0,40);
      //Translate in the X Direction
      Size Xlate_X = new Size(200,0);
      Point Pt = StartPt;
      //Generate set of points based on offsets of original point
      Point[] ManyPoints = { (Pt + Xlate_X), 
                             (Pt = Pt + Xlate_X + Xlate_Y), 
                             (Pt = Pt + Xlate_X) };
      P.Color=Color.Firebrick;
      G.DrawLines(P, ManyPoints);

      //------------ DrawBezier and Polygon -------------------
      StartPt.X=10;
      StartPt.Y=250;
      Point CtlPtA = new Point(50,150);
      Point CtlPtB = new Point(350,300);
      EndPt.X=400;
      EndPt.Y=250;
      Point[] PolyPoints = { StartPt, CtlPtA, EndPt, CtlPtB };
      //Draw the controlling shape of the Bezier spline
      G.DrawPolygon ( Pens.DarkSeaGreen, PolyPoints );

      //Draw the actual Spline
      P.Color=Color.DarkSeaGreen;
      P.Width=3;
      G.DrawBezier( P, StartPt, CtlPtA, CtlPtB, EndPt );

      //---------- Draw two Bezier splines ---------------------
      Size Y = new Size(0,40);
      Size X = new Size(20,0);
      //Y Translated start of first spline
      //Same control points for first spline,
      //X,Y Translated end of first spline, 
      //X Translate control points for second spline,
      //X,Y New end point for second spline
      Point[] TwoSplines = { StartPt+Y, 
                             CtlPtA, 
                             CtlPtB, 
                             EndPt+Y-new Size(200,0), 
                             CtlPtA+X, 
                             CtlPtB+X, 
                             EndPt+Y+X };
      P.Color=Color.Gold;
      G.DrawBeziers (P, TwoSplines);

      //---------- Draw a closed curve -----------
      PolyPoints[0] = new Point(100, 350);
      PolyPoints[1] = new Point(250, 300);
      PolyPoints[2] = new Point(250, 400);
      PolyPoints[3] = new Point(150, 400);
      P.Color=Color.Olive;
      //Curve traces outside of polygon
      //Curve is closed cardinal spline & hits all points
      G.DrawPolygon (P, PolyPoints);
      G.DrawClosedCurve(P,PolyPoints);
      //Uncomment next line to fill the egg shape
      // G.FillClosedCurve(Brushes.AliceBlue,PolyPoints);

      //---------- Draw an open cardinal curve -----------
      Point[] CardPoints = { new Point( 310, 350 ),
                             new Point( 330, 360 ),
                             new Point( 360, 320 ),
                             new Point( 390, 370 ),
                             new Point( 400, 350 ),
                             new Point( 480, 340 )};
      P.Color=Color.DarkOrange;
      G.DrawCurve(P, CardPoints);

      P.Dispose();
    }
    private void PathDraw( Graphics G )
    {
      //Start with clean slate
      G.ResetClip();
      G.ResetTransform();

      //Separate sections
      G.DrawLine(Pens.Black, 10, 420, this.Width-10, 420);

      //Make a blank path and add shapes to it
      GraphicsPath gp = new GraphicsPath();
      Pen P = new Pen(Brushes.ForestGreen,3);
      gp.AddRectangle(new Rectangle(10, 450, 100, 100));
      gp.AddEllipse(120, 450, 100, 100);
      gp.AddPie ( 70, 500, 100, 100, 25, 120 );
      //Draw the outline of the path and fill it in
      G.DrawPath (P, gp );
      G.FillPath(Brushes.Bisque,gp);

      P.Dispose();
    }

	}
}
