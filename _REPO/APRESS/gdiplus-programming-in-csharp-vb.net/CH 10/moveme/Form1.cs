using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;
using System.Runtime.InteropServices;

namespace moveme
{
  public class Form1 : System.Windows.Forms.Form
  {
    private const int WM_NCLBUTTONDOWN = 0xA1;

    [DllImport("user32.dll")]
    internal extern static int ReleaseCapture();
    [DllImport("user32.dll")]
    internal extern static int SendMessageA( IntPtr windowHandle, int wMsg, 
                                             int wPAram, int lParam );

    private System.ComponentModel.Container components = null;

    public Form1()
    {
      InitializeComponent();

      this.MouseMove += new MouseEventHandler(this.MyMouseMove);
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

    [STAThread]
    static void Main() 
    {
      Application.Run(new Form1());
    }

    private void Form1_Load(object sender, System.EventArgs e)
    {
    }

    private void MyMouseMove(object sender, MouseEventArgs e)
    {
      if (e.Button==MouseButtons.Left)
      {
        ReleaseCapture();
        SendMessageA( this.Handle, WM_NCLBUTTONDOWN, 2, 0);
      }
    }
	}
}
