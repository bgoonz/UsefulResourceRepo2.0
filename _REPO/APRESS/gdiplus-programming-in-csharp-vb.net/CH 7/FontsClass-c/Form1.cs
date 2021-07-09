using System;
using System.Drawing;
using System.Drawing.Text;
using System.Collections;
using System.ComponentModel;
using System.Windows.Forms;
using System.Data;

namespace FontsClass_c
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
      this.ClientSize = new System.Drawing.Size(292, 323);
      this.MaximizeBox = false;
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
      G.TextRenderingHint=TextRenderingHint.AntiAlias;
      int y = 0;

      G.DrawString("Regular", Fonts.Arial_20, Brushes.Black, 50, y+=40);
      G.DrawString("Italic", Fonts.ArialItalic_20, Brushes.Black, 50, y+=40);
      G.DrawString("Regular", Fonts.Chain_20, Brushes.Black, 50, y+=40);
      G.DrawString("Italic", Fonts.ChainItalic_20, Brushes.Black, 50, y+=40);
      G.DrawString("Regular", Fonts.Comic_20, Brushes.Black, 50, y+=40);
      G.DrawString("Italic", Fonts.ComicItalic_20, Brushes.Black, 50, y+=40);
    }
	}
}
