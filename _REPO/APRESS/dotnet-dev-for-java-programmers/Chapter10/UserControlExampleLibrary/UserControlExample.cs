using System;
using System.Collections;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Windows.Forms;

namespace UserControlExampleLibrary
{
	/// <summary>
	/// Summary description for UserControl1.
	/// </summary>
	public class UserControlExample : System.Windows.Forms.UserControl
	{
		private System.Windows.Forms.TextBox textBox1;
		private System.Windows.Forms.VScrollBar vScrollBar1;
		/// <summary>
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.Container components = null;

		public UserControlExample()
		{
			// This call is required by the Windows.Forms Form Designer.
			InitializeComponent();

			// TODO: Add any initialization after the InitForm call

		}

		/// <summary>
		/// Clean up any resources being used.
		/// </summary>
		protected override void Dispose( bool disposing )
		{
			if( disposing )
			{
				if( components != null )
					components.Dispose();
			}
			base.Dispose( disposing );
		}

		#region Component Designer generated code
		/// <summary>
		/// Required method for Designer support - do not modify 
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent()
		{
			this.textBox1 = new System.Windows.Forms.TextBox();
			this.vScrollBar1 = new System.Windows.Forms.VScrollBar();
			this.SuspendLayout();
			// 
			// textBox1
			// 
			this.textBox1.Location = new System.Drawing.Point(8, 8);
			this.textBox1.Name = "textBox1";
			this.textBox1.ReadOnly = true;
			this.textBox1.Size = new System.Drawing.Size(48, 20);
			this.textBox1.TabIndex = 0;
			this.textBox1.Text = "";
			this.textBox1.TextAlign = System.Windows.Forms.HorizontalAlignment.Right;
			// 
			// vScrollBar1
			// 
			this.vScrollBar1.Location = new System.Drawing.Point(64, 8);
			this.vScrollBar1.Name = "vScrollBar1";
			this.vScrollBar1.Size = new System.Drawing.Size(17, 24);
			this.vScrollBar1.TabIndex = 1;
			this.vScrollBar1.Scroll += new System.Windows.Forms.ScrollEventHandler(this.vScrollBar1_Scroll);
			// 
			// UserControlExample
			// 
			this.Controls.AddRange(new System.Windows.Forms.Control[] {
																		  this.vScrollBar1,
																		  this.textBox1});
			this.Name = "UserControlExample";
			this.Size = new System.Drawing.Size(96, 40);
			this.ResumeLayout(false);

		}
		#endregion

		private int m_min = int.MinValue;
		private int m_max = int.MaxValue;
		private int m_current = 0;

		private void vScrollBar1_Scroll(object sender, System.Windows.Forms.ScrollEventArgs e)
		{
			if ( e.Type == ScrollEventType.SmallIncrement )
			{
				try
				{
					Current -= 1;
				}
				catch
				{
				}
			}
			else
			{
				if ( e.Type == ScrollEventType.SmallDecrement )
				{
					try
					{
						Current += 1;
					}
					catch
					{
					}
				}
			}
			vScrollBar1.Value = 50;
		}

		public int Min
		{
			get
			{
				return m_min;
			}
			set
			{
				m_min = value;
			}
		}

		public int Max
		{
			get
			{
				return m_max;
			}
			set
			{
				m_max = value;
			}
		}

		public int Current
		{
			get
			{
				return m_current;
			}
			set
			{
				if ( ( value > m_max ) || ( value < m_min ) )
				{
					throw new ArgumentOutOfRangeException( "Current" );
				}
				m_current = value;
				textBox1.Text = m_current.ToString();
			}
		}
	}
}
