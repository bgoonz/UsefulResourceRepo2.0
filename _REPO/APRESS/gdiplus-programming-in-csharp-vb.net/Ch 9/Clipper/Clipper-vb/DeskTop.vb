Option Strict On

Imports System
Imports System.Drawing
Imports System.Drawing.Imaging
Imports System.Runtime.InteropServices

Public NotInheritable Class DeskTop

  '/// <summary>
  '/// Copyright Nicholas Symmonds 2002
  '/// This software is for instructional purposes only.
  '/// It may not be sold as is.
  '/// 
  '/// This class encapsulates the API functions necessary to get the
  '/// desktop image and form a bitmap from it.
  '/// Not everything can be done in GDI+ :)
  '/// </summary>

  Declare Function GetDesktopWindow Lib "user32.dll" () As IntPtr
  Declare Function GetDC Lib "user32.dll" (ByVal windowHandle As IntPtr) _
                                            As IntPtr
  Declare Function GetCurrentObject Lib "gdi32.dll" (ByVal hdc As IntPtr, _
                                           ByVal objectType As Short) As IntPtr
  Declare Sub ReleaseDC Lib "user32.dll" (ByVal hdc As IntPtr)
  Declare Sub UpdateWindow Lib "user32.dll" (ByVal hwnd As IntPtr)

  Public Shared Function Capture() As Bitmap
    'Get a pointer to the desktop window
    Dim desktopWindow As IntPtr = GetDesktopWindow()
    'Get a device context from the desktop window
    Dim desktopDC As IntPtr = GetDC(desktopWindow)
    'Get a GDI handle to the image
    Dim desktopBitmap As IntPtr = GetCurrentObject(desktopDC, 7)
    'This call takes as an argument the handle to a GDI image
    Dim desktopImage As Bitmap = Image.FromHbitmap(desktopBitmap)

    'Do not create any memory leaks
    ReleaseDC(desktopDC)

    Return desktopImage
  End Function


End Class
