using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;

namespace MIsc2D_c
{
	/// <summary>
	/// Summary description for Form1.
	/// </summary>
	public class Form1 : System.Windows.Forms.Form
	{
    private System.Windows.Forms.Label label1;
    private System.Windows.Forms.Label label2;
    private System.Windows.Forms.Label label3;
    private System.Windows.Forms.ListBox listBox1;
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
      this.label1 = new System.Windows.Forms.Label();
      this.label2 = new System.Windows.Forms.Label();
      this.label3 = new System.Windows.Forms.Label();
      this.listBox1 = new System.Windows.Forms.ListBox();
      this.SuspendLayout();
      // 
      // label1
      // 
      this.label1.Location = new System.Drawing.Point(40, 280);
      this.label1.Name = "label1";
      this.label1.Size = new System.Drawing.Size(160, 16);
      this.label1.TabIndex = 0;
      // 
      // label2
      // 
      this.label2.Location = new System.Drawing.Point(40, 296);
      this.label2.Name = "label2";
      this.label2.Size = new System.Drawing.Size(160, 16);
      this.label2.TabIndex = 1;
      // 
      // label3
      // 
      this.label3.Location = new System.Drawing.Point(40, 312);
      this.label3.Name = "label3";
      this.label3.Size = new System.Drawing.Size(160, 16);
      this.label3.TabIndex = 2;
      // 
      // listBox1
      // 
      this.listBox1.Location = new System.Drawing.Point(24, 200);
      this.listBox1.Name = "listBox1";
      this.listBox1.Size = new System.Drawing.Size(192, 69);
      this.listBox1.TabIndex = 3;
      // 
      // Form1
      // 
      this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
      this.ClientSize = new System.Drawing.Size(292, 373);
      this.Controls.AddRange(new System.Windows.Forms.Control[] {
                                                                  this.listBox1,
                                                                  this.label3,
                                                                  this.label2,
                                                                  this.label1});
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

    protected override void OnPaint(PaintEventArgs e)
    {
      Graphics G = e.Graphics;

      GraphicsPath p = new  GraphicsPath();
      PointF[] pts = { new PointF(50,  50),
                       new PointF(150, 25),
                       new PointF(200, 50)};
      p.AddCurve(pts);
      p.AddRectangle(new Rectangle(60, 60, 50, 50));
      p.AddPie(100, 100, 80, 80, 0, 35);
      G.DrawPath(Pens.Black,p);

      GraphicsPathIterator iter = new GraphicsPathIterator(p);
      label1.Text = "Num pts in path = " + iter.Count.ToString();
      label2.Text = "Num subpaths in path = " + iter.SubpathCount.ToString();
      label3.Text = "Path has curve = " + iter.HasCurve().ToString();

      int StartIndex;
      int EndIndex;
      int i;
      bool IsClosed; 
      // Rewind the Iterator.
      iter.Rewind();
      // List the Subpaths.
      for(i=0;i<iter.SubpathCount;i++)
      {
        iter.NextSubpath(out StartIndex, out EndIndex, out IsClosed);
        listBox1.Items.Add("Start: " + StartIndex.ToString() +
                           "  End: " + EndIndex.ToString() +
                           "  IsClosed: " + IsClosed.ToString());
      }

    }
	}
}
