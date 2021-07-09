using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Drawing.Drawing2D;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;

namespace IconImageDraw_c
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

      this.MouseMove += new MouseEventHandler(this.DrawBox);
      this.MouseDown += new MouseEventHandler(this.StartBox);
      this.MouseUp += new MouseEventHandler(this.EndBox);
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
      this.ClientSize = new System.Drawing.Size(492, 373);
      this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
      this.MinimizeBox = false;
      this.Name = "Form1";
      this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
      this.Text = "Form1";
      this.Load += new System.EventHandler(this.Form1_Load);

    }
		#endregion

    /// <summary>
    /// The main entry point for the application.
    /// </summary>
    /// 

    //"R" holds the image, "Box" is the new image home currently being 
    //drawn by holding the mouse down and dragging
    private Rectangle R = Rectangle.Empty;
    private Rectangle Box = Rectangle.Empty;
    private Image I = Image.FromFile("sample.jpg");
    private Icon ThisIcon = new Icon("usa.ico");
    private bool OK2Paint = false;

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
      //Always draw the icon
      e.Graphics.DrawIcon(ThisIcon, 1, 1);

      //Bail if rectangle is empty
      if ( R == Rectangle.Empty )
        return;

      if ( !OK2Paint )
        return;

      Pen P = new Pen(Brushes.Black, 3);
      e.Graphics.DrawRectangle(P, R);
      // Draw image based on rectangle.
      e.Graphics.DrawImage(I, R);

      P.Dispose();
    }

    private void DrawBox ( System.Object sender , MouseEventArgs m )
    {
      //Prints the x,y coordinates directly on the screen
      Graphics G = this.CreateGraphics();
      Rectangle TextR = new Rectangle(10, this.Height-50, 100, 20 );
      SolidBrush B = new SolidBrush(this.BackColor);

      G.FillRectangle(B, TextR);
      G.DrawString ( m.X.ToString() + ", " + m.Y.ToString(), 
                      new Font("Arial", 10),
                      Brushes.Black, TextR, StringFormat.GenericDefault );

      B.Dispose();

      //Draw the box as the mouse drags
      if ( m.Button == MouseButtons.Left )
      {
        if ( Box != Rectangle.Empty )
        {
          Pen P = new Pen(new SolidBrush(this.BackColor),1);
          G.DrawRectangle ( P, Box );
          P.Dispose();
        }
        Box = new Rectangle ( R.X, R.Y, m.X - R.X, m.Y - R.Y );
        G.DrawRectangle( Pens.Black, Box );
      }
    }

    private void StartBox( System.Object sender , MouseEventArgs m )
    {
      if ( m.Button == MouseButtons.Left )
      {
        R.X=m.X;
        R.Y=m.Y;
        OK2Paint = false;
      }
    }
    private void EndBox( System.Object sender , MouseEventArgs m )
    {
      R.Width = m.X - R.X;
      R.Height = m.Y - R.Y;
      OK2Paint = true;
      this.Refresh();
    }
  }
}
