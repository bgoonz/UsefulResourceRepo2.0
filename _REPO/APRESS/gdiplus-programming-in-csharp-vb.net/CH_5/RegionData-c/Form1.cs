using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;

namespace RegionData_c
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
      this.ClientSize = new System.Drawing.Size(292, 273);
      this.Name = "Form1";
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
      // Create a rectangle and draw it to the screen in black.
      Rectangle regionRect = new Rectangle(20, 20, 100, 100);
      Region myRegion = new Region(regionRect);
      RegionData Rd = myRegion.GetRegionData();
      int RdLength = Rd.Data.Length;
      DisplayRegionData(e, RdLength, Rd);
    }
    // THIS IS A HELPER FUNCTION FOR GetRegionData.
    public void DisplayRegionData(PaintEventArgs e,
      int len,
      RegionData dat)
    {
      // Display the result.
      int i;
      float x = 20, y = 140;
      Font myFont = new Font("Arial", 8);
      SolidBrush myBrush = new SolidBrush(Color.Black);
      e.Graphics.DrawString("myRegionData = ",
        myFont,
        myBrush,
        new PointF(x, y));
      y = 160;
      for(i = 0; i < len; i++)
      {
        if(x > 300)
        {
          y += 20;
          x = 20;
        }
        e.Graphics.DrawString(dat.Data[i].ToString(),
          myFont,
          myBrush,
          new PointF(x, y));
        x += 30;
      }
    }
	}
}
