Option Strict On

Imports System
Imports System.Drawing
Imports System.Drawing.Drawing2D
Imports System.Drawing.Imaging

Public Class dtBitmap
  Inherits System.Windows.Forms.Form

  '/// <summary>
  '///  Copyright Nicholas Symmonds 2002
  '/// This software is for instructional purposes only.
  '/// It may not be sold as is.
  '/// 
  '/// This form is the one that holds the complete bitmap of the screen.  
  '/// The border is set to nothing and the form is maximized.  The cursor 
  '/// is also changed to tell the user (s)he can now drag a line and make 
  '/// a capture box. When the screen is captured this form shows up almost 
  '/// immediately.
  '/// </summary>

#Region "Class local storage"

  Private bmp As Bitmap
  Private InvalidRect As Rectangle = Rectangle.Empty
  Private mRectPen As Pen
  Private mbmpRect As Corectangle

#End Region

#Region " Windows Form Designer generated code "

  Public Sub New(ByVal b As Bitmap)
    MyBase.New()

    'This call is required by the Windows Form Designer.
    InitializeComponent()

    mbmpRect = New Corectangle()
    mRectPen = New Pen(Brushes.Red, 1)
    mRectPen.DashStyle = DashStyle.DashDot
    bmp = b.Clone(New RectangleF(0, 0, b.Width, b.Height), b.PixelFormat)

    Me.SetStyle(ControlStyles.AllPaintingInWmPaint, True)
    Me.SetStyle(ControlStyles.DoubleBuffer, True)
    Me.Size = bmp.Size
    Me.FormBorderStyle = FormBorderStyle.None
    Me.MaximizeBox = False
    Me.MinimizeBox = False
    Me.Cursor = New Cursor("hcross.cur")
    Me.BackgroundImage = bmp

    'Show as modal
    Me.ShowDialog()

  End Sub

  'Form overrides dispose to clean up the component list.
  Protected Overloads Overrides Sub Dispose(ByVal disposing As Boolean)
    If disposing Then
      If Not (components Is Nothing) Then
        components.Dispose()
      End If
    End If
    If Not bmp Is Nothing Then
      bmp.Dispose()
    End If
    MyBase.Dispose(disposing)
  End Sub

  'Required by the Windows Form Designer
  Private components As System.ComponentModel.IContainer

  'NOTE: The following procedure is required by the Windows Form Designer
  'It can be modified using the Windows Form Designer.  
  'Do not modify it using the code editor.
  <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
    '
    'dtBitmap
    '
    Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
    Me.ClientSize = New System.Drawing.Size(292, 273)
    Me.Name = "dtBitmap"
    Me.Text = "dtBitmap"

  End Sub

#End Region

  Private Sub dtBitmap_Load(ByVal sender As System.Object, _
                            ByVal e As System.EventArgs) Handles MyBase.Load

  End Sub

  Protected Overrides Sub OnPaint(ByVal e As PaintEventArgs)
    MyBase.OnPaint(e)
    e.Graphics.DrawRectangle(mRectPen, mbmpRect.Rect)
  End Sub

  Public ReadOnly Property GetBitmap() As Bitmap
    Get
      Return bmp
    End Get
  End Property

#Region "Squeek"
  Protected Overrides Sub OnMouseDown(ByVal e As MouseEventArgs)
    MyBase.OnMouseDown(e)

    If e.Button <> MouseButtons.Left Then
      Return
    End If

    mbmpRect = New Corectangle(e.X, e.Y)
  End Sub

  Protected Overrides Sub OnMouseUp(ByVal e As MouseEventArgs)
    MyBase.OnMouseUp(e)

    Invalidate()
    bmp = bmp.Clone(mbmpRect.Rect, bmp.PixelFormat)
    Me.Close()
  End Sub

  Protected Overrides Sub OnMouseMove(ByVal e As MouseEventArgs)
    MyBase.OnMouseMove(e)

    If e.Button <> MouseButtons.Left Then
      Return
    End If

    mbmpRect.EndX = e.X
    mbmpRect.EndY = e.Y
    Invalidate()
  End Sub

#End Region

End Class




