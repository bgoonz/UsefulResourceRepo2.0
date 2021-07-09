using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;

namespace MouseHandler_c
{
	/// <summary>
	/// Summary description for Form1.
	/// </summary>
	public class Form1 : System.Windows.Forms.Form
	{
    private System.Windows.Forms.Label label1;
    private System.Windows.Forms.Button Off;
    private System.Windows.Forms.Button On;
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

      this.MouseMove += new 
                     System.Windows.Forms.MouseEventHandler(this.MyMouseHandler);

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
      this.Off = new System.Windows.Forms.Button();
      this.On = new System.Windows.Forms.Button();
      this.SuspendLayout();
      // 
      // label1
      // 
      this.label1.Location = new System.Drawing.Point(40, 56);
      this.label1.Name = "label1";
      this.label1.Size = new System.Drawing.Size(176, 16);
      this.label1.TabIndex = 0;
      this.label1.Text = "label1";
      // 
      // Off
      // 
      this.Off.Location = new System.Drawing.Point(40, 216);
      this.Off.Name = "Off";
      this.Off.Size = new System.Drawing.Size(72, 24);
      this.Off.TabIndex = 1;
      this.Off.Text = "Off";
      this.Off.Click += new System.EventHandler(this.Off_Click);
      // 
      // On
      // 
      this.On.Location = new System.Drawing.Point(152, 216);
      this.On.Name = "On";
      this.On.Size = new System.Drawing.Size(72, 24);
      this.On.TabIndex = 2;
      this.On.Text = "On";
      this.On.Click += new System.EventHandler(this.On_Click);
      // 
      // Form1
      // 
      this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
      this.ClientSize = new System.Drawing.Size(292, 273);
      this.Controls.AddRange(new System.Windows.Forms.Control[] {
                                                                  this.On,
                                                                  this.Off,
                                                                  this.label1});
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
    private void MyMouseHandler(object sender, 
                                System.Windows.Forms.MouseEventArgs e)
    {
      label1.Text = "X= " + e.X.ToString() + ", Y= " + e.Y.ToString();
    }

    protected override void OnMouseMove( MouseEventArgs e )
    {
      base.OnMouseMove(e);
    }

    private void Off_Click(object sender, System.EventArgs e)
    {
      this.MouseMove -= new 
        System.Windows.Forms.MouseEventHandler(this.MyMouseHandler);
    }

    private void On_Click(object sender, System.EventArgs e)
    {
      this.MouseMove += new 
        System.Windows.Forms.MouseEventHandler(this.MyMouseHandler);
    }

	}
}
