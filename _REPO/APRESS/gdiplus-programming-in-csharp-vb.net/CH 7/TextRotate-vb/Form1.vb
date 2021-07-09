Option Strict On

Imports System
Imports System.Drawing
Imports System.Drawing.Drawing2D
Imports System.Drawing.Imaging
Imports System.Drawing.Text

Public Class Form1
  Inherits System.Windows.Forms.Form

  Dim bmp As Bitmap
  Dim UL, UR, BL As Point
  Dim InvRect As Rectangle
  Dim Direction As Int32 = -1
  Dim s As String = "ROTATING TEXT"
  Dim fnt As Font = New Font("Arial", 12)

#Region " Windows Form Designer generated code "

  Public Sub New()
    MyBase.New()

    'This call is required by the Windows Form Designer.
    InitializeComponent()

    Skew.Minimum = 50
    Skew.Maximum = 250
    Skew.SmallChange = 1
    Skew.LargeChange = 10
    Skew.Value = 150

    Dim G As Graphics = Me.CreateGraphics()
    Dim sz As Size = Size.Truncate(G.MeasureString(s, fnt))
    bmp = New Bitmap(CInt(sz.Width), CInt(sz.Height))

    Dim k, j As Int32
    For k = 0 To bmp.Height - 1
      For j = 0 To bmp.Width - 1
        bmp.SetPixel(j, k, Color.White)
      Next
    Next
    bmp.MakeTransparent(Color.White)

    UL = New Point(150, 150)
    UR = New Point(UL.X + bmp.Width, Skew.Value)
    BL = New Point(150, UL.Y + bmp.Height)
    InvRect = New Rectangle(-UR.X, Skew.Minimum, 2 * UR.X, Skew.Maximum)

    G = Graphics.FromImage(bmp)
    G.SmoothingMode = SmoothingMode.AntiAlias
    G.TextRenderingHint = TextRenderingHint.AntiAlias
    G.DrawString(s, fnt, Brushes.Black, 0, 0)
    G.Dispose()

    Me.SetStyle(ControlStyles.AllPaintingInWmPaint, True)
    Me.SetStyle(ControlStyles.DoubleBuffer, True)

    T1.Interval = 10 'milliseconds
    T1.Enabled = False

  End Sub

  'Form overrides dispose to clean up the component list.
  Protected Overloads Overrides Sub Dispose(ByVal disposing As Boolean)
    If disposing Then
      If Not (components Is Nothing) Then
        components.Dispose()
      End If
    End If
    bmp.Dispose()
    fnt.Dispose()
    MyBase.Dispose(disposing)
  End Sub

  'Required by the Windows Form Designer
  Private components As System.ComponentModel.IContainer

  'NOTE: The following procedure is required by the Windows Form Designer
  'It can be modified using the Windows Form Designer.  
  'Do not modify it using the code editor.
  Friend WithEvents Skew As System.Windows.Forms.VScrollBar
  Friend WithEvents T1 As System.Windows.Forms.Timer
  <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
    Me.components = New System.ComponentModel.Container()
    Me.Skew = New System.Windows.Forms.VScrollBar()
    Me.T1 = New System.Windows.Forms.Timer(Me.components)
    Me.SuspendLayout()
    '
    'Skew
    '
    Me.Skew.Location = New System.Drawing.Point(352, 40)
    Me.Skew.Name = "Skew"
    Me.Skew.Size = New System.Drawing.Size(16, 264)
    Me.Skew.TabIndex = 2
    '
    'T1
    '
    '
    'Form1
    '
    Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
    Me.ClientSize = New System.Drawing.Size(392, 373)
    Me.Controls.AddRange(New System.Windows.Forms.Control() {Me.Skew})
    Me.MaximizeBox = False
    Me.MinimizeBox = False
    Me.Name = "Form1"
    Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen
    Me.Text = "Form1"
    Me.ResumeLayout(False)

  End Sub

#End Region

  Private Sub Form1_Load(ByVal sender As System.Object, _
                         ByVal e As System.EventArgs) Handles MyBase.Load

  End Sub

  Protected Overrides Sub OnPaint(ByVal e As PaintEventArgs)
    Dim dest() As Point = {UL, UR, BL}

    ' Draw the image mapped to the parallelogram.
    e.Graphics.DrawImage(bmp, dest)
    e.Graphics.DrawLine(Pens.Black, UL, Point.op_Addition(BL, New Size(0, 20)))
    If T1.Enabled = False Then
      T1.Enabled = True
    End If

  End Sub

  Private Sub Skew_Scroll(ByVal sender As System.Object, _
                          ByVal e As System.Windows.Forms.ScrollEventArgs) _
                          Handles Skew.Scroll
    UR.Y = Skew.Value
  End Sub

  Private Sub T1_Tick(ByVal sender As System.Object, _
                      ByVal e As System.EventArgs) Handles T1.Tick

    UR.X += Direction
    If UR.X = UL.X + bmp.Width * Direction Then
      Direction *= -1
    End If

    Invalidate(InvRect)
  End Sub
End Class
