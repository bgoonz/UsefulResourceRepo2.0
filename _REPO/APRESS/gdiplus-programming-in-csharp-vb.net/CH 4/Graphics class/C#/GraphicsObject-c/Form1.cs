using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;

namespace GraphicsObject_c
{
	/// <summary>
	/// Summary description for Form1.
	/// </summary>
  public class Form1 : System.Windows.Forms.Form
  {
    private System.Windows.Forms.PictureBox P1;
  	private System.Windows.Forms.Panel Panel1;
    private System.Windows.Forms.Button B1;
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

      this.P1.Paint += new System.Windows.Forms.PaintEventHandler
        (this.AllPaint);
      this.Panel1.Paint += new System.Windows.Forms.PaintEventHandler
        (this.AllPaint);
      this.B1.Paint += new System.Windows.Forms.PaintEventHandler
        (this.AllPaint);
      
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
      this.P1 = new System.Windows.Forms.PictureBox();
      this.Panel1 = new System.Windows.Forms.Panel();
      this.B1 = new System.Windows.Forms.Button();
      this.SuspendLayout();
      // 
      // P1
      // 
      this.P1.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
      this.P1.Location = new System.Drawing.Point(192, 16);
      this.P1.Name = "P1";
      this.P1.Size = new System.Drawing.Size(152, 168);
      this.P1.TabIndex = 0;
      this.P1.TabStop = false;
      this.P1.Click += new System.EventHandler(this.P1_Click);
      // 
      // Panel1
      // 
      this.Panel1.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
      this.Panel1.Location = new System.Drawing.Point(16, 168);
      this.Panel1.Name = "Panel1";
      this.Panel1.Size = new System.Drawing.Size(120, 120);
      this.Panel1.TabIndex = 2;
      // 
      // B1
      // 
      this.B1.Location = new System.Drawing.Point(192, 216);
      this.B1.Name = "B1";
      this.B1.Size = new System.Drawing.Size(152, 120);
      this.B1.TabIndex = 3;
      this.B1.Text = "button1";
      this.B1.Click += new System.EventHandler(this.B1_Click);
      // 
      // Form1
      // 
      this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
      this.ClientSize = new System.Drawing.Size(424, 373);
      this.Controls.AddRange(new System.Windows.Forms.Control[] {
                                                                  this.B1,
                                                                  this.Panel1,
                                                                  this.P1});
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

    protected override void OnPaint( PaintEventArgs e )
    {
      Graphics G = e.Graphics;

      G.DrawLine(Pens.Black,20,20,100,100);
      base.OnPaint(e);
    }

//----------------------------------------------------------------------------
	  void P1Paint( object sender,PaintEventArgs e )
	  {
		  Graphics G = e.Graphics;

		  G.DrawLine(Pens.Black,20,20,100,100);
		  base.OnPaint(e);
	  }

    void Panel1Paint( object sender,PaintEventArgs e )
    {
      Graphics G = e.Graphics;

      G.DrawLine(Pens.Black,20,20,100,100);
      base.OnPaint(e);
    }

    void ButtonPaint( object sender,PaintEventArgs e )
    {
      Graphics G = e.Graphics;

      G.DrawLine(Pens.Black,20,20,100,100);
      base.OnPaint(e);
    }

    void AllPaint( object sender, PaintEventArgs e )
    {
      Graphics G = e.Graphics;

      if ( sender.GetType() == Panel1.GetType() )
        if ( ((Panel)sender).Name == "Panel1" )
          G.DrawLine(Pens.Red,20,20,100,100);

      if ( sender.GetType() == B1.GetType() )
        if ( ((Button)sender).Name == "B1" )
          G.DrawLine(Pens.Green,20,20,100,100);

      if ( sender.GetType() == P1.GetType() )
        if ( ((PictureBox)sender).Name == "P1" )
          G.DrawLine(Pens.Blue,20,20,100,100);

      base.OnPaint(e);
    }

    private void B1_Click(object sender, System.EventArgs e)
    {
      Graphics G;
      Graphics G2;

      G = this.CreateGraphics();
      G.DrawLine ( new Pen(Color.DarkMagenta,10),50,10,50,100 );

      G2 = Graphics.FromHwnd(this.Handle);
      G2.DrawLine(new Pen(Color.DarkCyan, 10), 70, 10, 70, 100);

      // Create new graphics object using handle to device context.
      Graphics G3  = Graphics.FromHdc(G2.GetHdc());
      G3.DrawLine(new Pen(Color.Black, 10), 85, 10, 85, 100);
      G3.Dispose();

      G.Dispose();
     // G2.Dispose(); 
    }

    private void P1_Click(object sender, System.EventArgs e)
    {
      Image img = Image.FromFile("crane.jpg");
      Graphics G = Graphics.FromImage(img);

      G.DrawLine(new Pen(Color.Aquamarine, 10), 0,(int)(img.Height / 2), 
                                                  (int)(img.Width), 
                                                  (int)(img.Height / 2));
      P1.Image=img;
      G.Dispose();
    }

  }
}
