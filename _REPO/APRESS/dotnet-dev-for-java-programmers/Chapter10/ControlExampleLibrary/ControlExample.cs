using System;
using System.Collections;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Windows.Forms;

namespace ControlExampleLibrary
{
	/// <summary>
	/// Summary description for ControlExample.
	/// </summary>
	public class ControlExample : System.Windows.Forms.Control
	{
		public ControlExample()
		{
			ResizeRedraw = true;
		}

		protected override void OnPaint(PaintEventArgs pe)
		{
			// TODO: Add custom paint code here

			using ( SolidBrush b = new SolidBrush( Color.SteelBlue ) )
			{
				pe.Graphics.FillEllipse( b, DisplayRectangle );
			}

			// Calling the base class OnPaint
			base.OnPaint(pe);
		}
	}
}
