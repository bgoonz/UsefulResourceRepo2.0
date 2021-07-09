using System;
using System.Drawing;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;

namespace Clipper_c
{
	/// <summary>
	/// Summary description for Attributes.
	/// </summary>
	public class Attributes : System.Windows.Forms.Form
	{
    private float m_Res;

    private System.Windows.Forms.Label lblCurrentRes;
    private System.Windows.Forms.Label lblRes;
    private System.Windows.Forms.Button cmdOK;
    private System.Windows.Forms.GroupBox groupBox1;
    private System.Windows.Forms.RadioButton optCurrent;
    private System.Windows.Forms.RadioButton opt120;
    private System.Windows.Forms.RadioButton opt150;
    private System.Windows.Forms.RadioButton opt300;
    private System.Windows.Forms.Label lblSize;
    private System.Windows.Forms.Label lblSizeVal;
		/// <summary>
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.Container components = null;

		public Attributes(float CurrentResolution, Size sz)
		{
			InitializeComponent();

      m_Res = CurrentResolution;
      lblRes.Text = m_Res.ToString() + " DPI";
      lblSizeVal.Text = sz.Width.ToString() + "w X " + sz.Height.ToString() + "h";
      optCurrent.Checked = true;
      this.Opacity = 1.0;
		}

		/// <summary>
		/// Clean up any resources being used.
		/// </summary>
		protected override void Dispose( bool disposing )
		{
			if( disposing )
			{
				if(components != null)
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
      this.lblCurrentRes = new System.Windows.Forms.Label();
      this.lblRes = new System.Windows.Forms.Label();
      this.cmdOK = new System.Windows.Forms.Button();
      this.groupBox1 = new System.Windows.Forms.GroupBox();
      this.opt300 = new System.Windows.Forms.RadioButton();
      this.opt150 = new System.Windows.Forms.RadioButton();
      this.opt120 = new System.Windows.Forms.RadioButton();
      this.optCurrent = new System.Windows.Forms.RadioButton();
      this.lblSize = new System.Windows.Forms.Label();
      this.lblSizeVal = new System.Windows.Forms.Label();
      this.groupBox1.SuspendLayout();
      this.SuspendLayout();
      // 
      // lblCurrentRes
      // 
      this.lblCurrentRes.Location = new System.Drawing.Point(24, 16);
      this.lblCurrentRes.Name = "lblCurrentRes";
      this.lblCurrentRes.Size = new System.Drawing.Size(160, 16);
      this.lblCurrentRes.TabIndex = 0;
      this.lblCurrentRes.Text = "Current Resolution";
      // 
      // lblRes
      // 
      this.lblRes.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
      this.lblRes.Location = new System.Drawing.Point(24, 32);
      this.lblRes.Name = "lblRes";
      this.lblRes.Size = new System.Drawing.Size(152, 16);
      this.lblRes.TabIndex = 1;
      // 
      // cmdOK
      // 
      this.cmdOK.Location = new System.Drawing.Point(232, 160);
      this.cmdOK.Name = "cmdOK";
      this.cmdOK.Size = new System.Drawing.Size(48, 32);
      this.cmdOK.TabIndex = 2;
      this.cmdOK.Text = "OK";
      this.cmdOK.Click += new System.EventHandler(this.cmdOK_Click);
      // 
      // groupBox1
      // 
      this.groupBox1.Controls.AddRange(new System.Windows.Forms.Control[] {
                                                                            this.opt300,
                                                                            this.opt150,
                                                                            this.opt120,
                                                                            this.optCurrent});
      this.groupBox1.Location = new System.Drawing.Point(24, 64);
      this.groupBox1.Name = "groupBox1";
      this.groupBox1.Size = new System.Drawing.Size(168, 128);
      this.groupBox1.TabIndex = 3;
      this.groupBox1.TabStop = false;
      this.groupBox1.Text = "Save Resolution";
      // 
      // opt300
      // 
      this.opt300.Location = new System.Drawing.Point(16, 96);
      this.opt300.Name = "opt300";
      this.opt300.Size = new System.Drawing.Size(104, 16);
      this.opt300.TabIndex = 3;
      this.opt300.Text = "300 DPI";
      // 
      // opt150
      // 
      this.opt150.Location = new System.Drawing.Point(16, 72);
      this.opt150.Name = "opt150";
      this.opt150.Size = new System.Drawing.Size(104, 16);
      this.opt150.TabIndex = 2;
      this.opt150.Text = "150 DPI";
      // 
      // opt120
      // 
      this.opt120.Location = new System.Drawing.Point(16, 48);
      this.opt120.Name = "opt120";
      this.opt120.Size = new System.Drawing.Size(104, 16);
      this.opt120.TabIndex = 1;
      this.opt120.Text = "120 DPI";
      // 
      // optCurrent
      // 
      this.optCurrent.Location = new System.Drawing.Point(16, 24);
      this.optCurrent.Name = "optCurrent";
      this.optCurrent.Size = new System.Drawing.Size(104, 16);
      this.optCurrent.TabIndex = 0;
      this.optCurrent.Text = "Current";
      // 
      // lblSize
      // 
      this.lblSize.Location = new System.Drawing.Point(192, 16);
      this.lblSize.Name = "lblSize";
      this.lblSize.Size = new System.Drawing.Size(88, 16);
      this.lblSize.TabIndex = 4;
      this.lblSize.Text = "Size";
      // 
      // lblSizeVal
      // 
      this.lblSizeVal.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D;
      this.lblSizeVal.Location = new System.Drawing.Point(192, 32);
      this.lblSizeVal.Name = "lblSizeVal";
      this.lblSizeVal.Size = new System.Drawing.Size(88, 16);
      this.lblSizeVal.TabIndex = 5;
      // 
      // Attributes
      // 
      this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
      this.ClientSize = new System.Drawing.Size(294, 205);
      this.Controls.AddRange(new System.Windows.Forms.Control[] {
                                                                  this.lblSizeVal,
                                                                  this.lblSize,
                                                                  this.groupBox1,
                                                                  this.cmdOK,
                                                                  this.lblRes,
                                                                  this.lblCurrentRes});
      this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
      this.MaximizeBox = false;
      this.MinimizeBox = false;
      this.Name = "Attributes";
      this.StartPosition = System.Windows.Forms.FormStartPosition.CenterParent;
      this.Text = "Attributes";
      this.Load += new System.EventHandler(this.Attributes_Load);
      this.groupBox1.ResumeLayout(false);
      this.ResumeLayout(false);

    }
		#endregion

    private void Attributes_Load(object sender, System.EventArgs e)
    {
    }

    public float SaveRes { get{return m_Res;} }

    private void cmdOK_Click(object sender, System.EventArgs e)
    {
      if (opt120.Checked)
        m_Res = 120f;

      if (opt150.Checked)
        m_Res = 150f;

      if (opt300.Checked)
        m_Res = 300f;

      this.Close();
    }
	}
}
