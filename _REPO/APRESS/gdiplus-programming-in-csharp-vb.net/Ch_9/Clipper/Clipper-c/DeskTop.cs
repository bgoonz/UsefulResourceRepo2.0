using System;
using System.Drawing;
using System.Runtime.InteropServices;

namespace Clipper_c
{
	/// <summary>
  /// Copyright Nicholas Symmonds 2002
  /// This software is for instructional purposes only.
  /// It may not be sold as is.
  /// 
	/// This class encapsulates the API functions necessary to get the
	/// desktop image and form a bitmap from it.
	/// Not everything can be done in GDI+ :)
	/// </summary>
	
	public sealed class DeskTop
	{

    [DllImport("user32.dll")]
    internal extern static IntPtr GetDesktopWindow();
    [DllImport("user32.dll")]
    internal extern static IntPtr GetDC( IntPtr windowHandle );
    [DllImport("gdi32.dll")]
    internal extern static IntPtr GetCurrentObject( IntPtr hdc, 
                                                    ushort objectType );
    [DllImport("user32.dll")]
    internal extern static void ReleaseDC( IntPtr hdc );
    [DllImport("user32.dll")]
    internal extern static void UpdateWindow( IntPtr hwnd );

    public static Bitmap Capture()
      {
      //Get a pointer to the desktop window
      IntPtr	desktopWindow = GetDesktopWindow();
      //Get a device context from the desktop window
      IntPtr	desktopDC = GetDC( desktopWindow );
      //Get a GDI handle to the image
      IntPtr	desktopBitmap = GetCurrentObject( desktopDC, 7 );
      //This call takes as an argument the handle to a GDI image
      Bitmap	desktopImage = Image.FromHbitmap( desktopBitmap );

      //Do not create any memory leaks
      ReleaseDC( desktopDC );

      return desktopImage;
    }

	}
}
