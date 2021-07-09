Option Strict On

Imports System
Imports System.Drawing
Imports System.Drawing.Drawing2D

Public Class Form1
  Inherits System.Windows.Forms.Form

  Private CenterPoint As PointF
  Private R As Rectangle
  Private Moon As Centroid = New Centroid(50, 50)

#Region " Windows Form Designer generated code "

  Public Sub New()
    MyBase.New()

    'This call is required by the Windows Form Designer.
    InitializeComponent()

    Dim G As Graphics = Graphics.FromHwnd(Me.Handle)
    G.SmoothingMode = SmoothingMode.AntiAlias

    Me.SetStyle(ControlStyles.AllPaintingInWmPaint, True)
    Me.SetStyle(ControlStyles.DoubleBuffer, True)
    Me.SetStyle(ControlStyles.UserPaint, True)

    'Rectangle R holds the ellipse
    R = New Rectangle(CInt(Me.Width / 6), CInt(Me.Height / 6), _
                      CInt(Me.Width / 3 * 2), CInt(Me.Height / 3 * 2))
    CenterPoint.X = Moon.X
    CenterPoint.Y = Moon.Y

  End Sub

  'Form overrides dispose to clean up the component list.
  Protected Overloads Overrides Sub Dispose(ByVal disposing As Boolean)
    If disposing Then
      If Not (components Is Nothing) Then
        components.Dispose()
      End If
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
    'Form1
    '
    Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
    Me.ClientSize = New System.Drawing.Size(292, 273)
    Me.Name = "Form1"
    Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen
    Me.Text = "Moon Over Mars"

  End Sub

#End Region

  Private Sub Form1_Load(ByVal sender As System.Object, _
                         ByVal e As System.EventArgs) Handles MyBase.Load

  End Sub

  Protected Overrides Sub OnPaint(ByVal e As PaintEventArgs)
    Dim path As GraphicsPath = New GraphicsPath()

    path.AddEllipse(R)

    ' Use the path to construct a path gradient brush.
    Dim B As PathGradientBrush = New PathGradientBrush(path)
    B.CenterColor = Color.Aqua
    B.CenterPoint = CenterPoint
    Dim c() As Color = {Color.Red}
    B.SurroundColors = c

    ' Fill the path with the path gradient brush.
    e.Graphics.FillPath(B, path)

    Moon.Draw(e.Graphics)

  End Sub

  Public Sub GetCoord(ByVal sender As Object, _
                      ByVal e As System.Windows.Forms.MouseEventArgs) _
                      Handles MyBase.MouseMove

    Me.Invalidate(Moon.Rect)
    If Moon.Relocate(e) Then
      CenterPoint = Moon.Center
      'Redraw the centroid
      Me.Invalidate(Moon.Rect)
      'Redraw the main ellipse
      Me.Invalidate(R)
    End If

  End Sub

End Class
