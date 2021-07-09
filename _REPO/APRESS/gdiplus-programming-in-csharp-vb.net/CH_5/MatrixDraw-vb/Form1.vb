Option Strict On

Imports System.Drawing
Imports System.Drawing.Drawing2D

Public Class Form1
  Inherits System.Windows.Forms.Form

  Dim XlateY As Int32
  Dim Angle As Single
  Dim DrawingRect As Rectangle = New Rectangle(25, 25, 225, 225)

#Region " Windows Form Designer generated code "

  Public Sub New()
    MyBase.New()

    'This call is required by the Windows Form Designer.
    InitializeComponent()

    Angle = 0
    Xlatey = 0
    xlate.Minimum = -50
    xlate.Maximum = 50
    xlate.SmallChange = 1
    xlate.LargeChange = 5
    xlate.Value = 0

    rotate.Minimum = -180
    rotate.Maximum = 180
    rotate.SmallChange = 1
    rotate.LargeChange = 10
    rotate.Value = 0

    Me.SetStyle(ControlStyles.AllPaintingInWmPaint, True)
    Me.SetStyle(ControlStyles.DoubleBuffer, True)
    Me.SetStyle(ControlStyles.UserPaint, True)

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
  Friend WithEvents xlate As System.Windows.Forms.VScrollBar
  Friend WithEvents rotate As System.Windows.Forms.HScrollBar
  <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
    Me.xlate = New System.Windows.Forms.VScrollBar()
    Me.rotate = New System.Windows.Forms.HScrollBar()
    Me.SuspendLayout()
    '
    'xlate
    '
    Me.xlate.Location = New System.Drawing.Point(264, 32)
    Me.xlate.Name = "xlate"
    Me.xlate.Size = New System.Drawing.Size(16, 200)
    Me.xlate.TabIndex = 0
    '
    'rotate
    '
    Me.rotate.Location = New System.Drawing.Point(8, 240)
    Me.rotate.Name = "rotate"
    Me.rotate.Size = New System.Drawing.Size(240, 16)
    Me.rotate.TabIndex = 1
    '
    'Form1
    '
    Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
    Me.ClientSize = New System.Drawing.Size(292, 273)
    Me.Controls.AddRange(New System.Windows.Forms.Control() {Me.rotate, Me.xlate})
    Me.MaximizeBox = False
    Me.MinimizeBox = False
    Me.Name = "Form1"
    Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen
    Me.Text = "Form1"
    Me.ResumeLayout(False)

  End Sub

#End Region

  Private Sub Form1_Load(ByVal sender As System.Object, _
                         ByVal e As System.EventArgs) _
                         Handles MyBase.Load

  End Sub

  Protected Overrides Sub OnPaint(ByVal e As PaintEventArgs)
    Dim G As Graphics = e.Graphics

    G.SmoothingMode = SmoothingMode.AntiAlias

    ' Create a graphics path, add a rectangle, set colors
    Dim Path As New GraphicsPath()
    Path.AddRectangle(New Rectangle(75, 100, 100, 75))
    Dim Pts As PointF() = Path.PathPoints
    Dim B As New PathGradientBrush(Pts)
    B.CenterColor = Color.Aqua
    Dim SColor As Color() = {Color.Blue}
    B.SurroundColors = SColor

    'We will translate the brush!  NOT the rectangle!
    Dim m As New Matrix()
    m.Translate(0, Xlatey, MatrixOrder.Append)
    m.RotateAt(Angle, B.CenterPoint, MatrixOrder.Append)
    B.MultiplyTransform(m, MatrixOrder.Append)
    G.FillRectangle(B, DrawingRect)

    MyBase.OnPaint(e)
    m.Dispose()
    B.Dispose()
    Path.Dispose()

  End Sub

  Private Sub xlate_Scroll(ByVal sender As System.Object, _
                           ByVal e As System.Windows.Forms.ScrollEventArgs) _
                           Handles xlate.Scroll

    Xlatey = xlate.Value
    Me.Invalidate(DrawingRect)

  End Sub

  Private Sub rotate_Scroll(ByVal sender As System.Object, _
                            ByVal e As System.Windows.Forms.ScrollEventArgs) _
                            Handles rotate.Scroll

    Angle = rotate.Value
    Me.Invalidate(DrawingRect)

  End Sub
End Class
