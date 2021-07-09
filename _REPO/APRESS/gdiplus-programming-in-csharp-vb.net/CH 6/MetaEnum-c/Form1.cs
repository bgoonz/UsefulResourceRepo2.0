using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;
using System.Runtime.InteropServices;

namespace MetaEnum_c
{
	public class Form1 : System.Windows.Forms.Form
	{
		private System.ComponentModel.Container components = null;
    private System.Windows.Forms.ListBox LB;

    Metafile mf = new  Metafile("mymeta.emf");

		public Form1()
		{
			InitializeComponent();
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
      mf.Dispose();
			base.Dispose( disposing );
		}

		#region Windows Form Designer generated code
		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent()
		{
      this.LB = new System.Windows.Forms.ListBox();
      this.SuspendLayout();
      // 
      // LB
      // 
      this.LB.Location = new System.Drawing.Point(208, 232);
      this.LB.Name = "LB";
      this.LB.Size = new System.Drawing.Size(168, 121);
      this.LB.TabIndex = 1;
      // 
      // Form1
      // 
      this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
      this.ClientSize = new System.Drawing.Size(392, 373);
      this.Controls.AddRange(new System.Windows.Forms.Control[] {
                                                                  this.LB});
      this.MaximizeBox = false;
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
    }

    protected override void OnPaint(PaintEventArgs e)
    {
      Graphics G = e.Graphics;
      G.EnumerateMetafile( mf, new Point( 50, 50 ), 
                   new Graphics.EnumerateMetafileProc(this.MetafileCallback) );

    }

    // Define callback method.
    private bool MetafileCallback( EmfPlusRecordType recordType, int flags, 
                                                 int dataSize, IntPtr data,
                                                 PlayRecordCallback callbackData)
    {
      LB.Items.Add(recordType);
      if ( dataSize > 0 )
      {
        byte[] D = new byte[dataSize];
        Marshal.Copy(data, D, 0, dataSize);
        mf.PlayRecord(recordType, flags, dataSize, D);
      }
      return true;
    }
	}
}
