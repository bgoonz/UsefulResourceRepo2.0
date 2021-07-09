using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;

namespace CustomWindow
{
	public class SaveMe : System.Windows.Forms.Form
	{
    private GraphicsPath mPath;

    private System.Windows.Forms.Button cmdSave;
    private System.Windows.Forms.TextBox txtSave;
		private System.ComponentModel.Container components = null;

		public SaveMe(GraphicsPath p)
		{
      InitializeComponent();

      mPath = p;
      this.txtSave.TabIndex = 0;
      this.cmdSave.TabIndex = 1;
		}

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
      this.cmdSave = new System.Windows.Forms.Button();
      this.txtSave = new System.Windows.Forms.TextBox();
      this.SuspendLayout();
      // 
      // cmdSave
      // 
      this.cmdSave.Location = new System.Drawing.Point(112, 56);
      this.cmdSave.Name = "cmdSave";
      this.cmdSave.Size = new System.Drawing.Size(72, 32);
      this.cmdSave.TabIndex = 0;
      this.cmdSave.Text = "&Save";
      this.cmdSave.Click += new System.EventHandler(this.cmdSave_Click);
      // 
      // txtSave
      // 
      this.txtSave.Location = new System.Drawing.Point(8, 24);
      this.txtSave.Name = "txtSave";
      this.txtSave.Size = new System.Drawing.Size(176, 20);
      this.txtSave.TabIndex = 1;
      this.txtSave.Text = "";
      // 
      // SaveMe
      // 
      this.AutoScaleBaseSize = new System.Drawing.Size(5, 13);
      this.ClientSize = new System.Drawing.Size(194, 95);
      this.Controls.AddRange(new System.Windows.Forms.Control[] {
                                                                  this.txtSave,
                                                                  this.cmdSave});
      this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedDialog;
      this.MaximizeBox = false;
      this.MinimizeBox = false;
      this.Name = "SaveMe";
      this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
      this.Text = "Choose Saved File Name";
      this.Load += new System.EventHandler(this.SaveMe_Load);
      this.ResumeLayout(false);

    }
		#endregion

    private void SaveMe_Load(object sender, System.EventArgs e)
    {
    }

    private void cmdSave_Click(object sender, System.EventArgs e)
    {
      if (txtSave.Text != string.Empty && mPath.PointCount !=0)
        WindowPath.SavePath(txtSave.Text + ".pth", mPath);

      this.Close();
    }
	}
}
