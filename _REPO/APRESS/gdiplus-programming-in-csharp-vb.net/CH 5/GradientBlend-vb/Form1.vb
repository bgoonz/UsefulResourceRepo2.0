Option Strict On

Imports System
Imports System.Drawing
Imports System.Drawing.Imaging
Imports System.Drawing.Drawing2D

Public Class Form1
  Inherits System.Windows.Forms.Form

  Private BlWidth As Int32
  Private SkewVal As Int32
  Private EL1Rect As Rectangle
  Private EL2Rect As Rectangle
  Private EL1Region As Region
  Private EL2Region As Region
  Private EL3Region As Region

#Region " Windows Form Designer generated code "

  Public Sub New()
    MyBase.New()

    'This call is required by the Windows Form Designer.
    InitializeComponent()

    'Set up rectangles to draw ellipses in
    EL1Rect = New Rectangle(10, 10, 150, 50)
    EL2Rect = EL1Rect
    'I could make a new rectangle but I can offset without knowing 
    'anything about the previous rectangle.
    EL2Rect.Offset(200, 0)

    'Set up Regions for invalidation
    EL1Region = New Region(EL1Rect)
    EL2Region = New Region(EL2Rect)
    EL3Region = New Region(New Rectangle(New Point(0, 65), _
                                          New Size(Me.Width, 50)))

    'Set up the blend scroll bar
    BlendWidth.Top = 120
    BlendWidth.Left = CType(Me.Width / 3, Int32)
    BlendWidth.Width = CType(Me.Width / 3, Int32)
    BlendWidth.Minimum = 10
    BlendWidth.Maximum = 200
    BlendWidth.SmallChange = 1
    BlendWidth.LargeChange = 10
    BlendWidth.Value = BlendWidth.Minimum

    'Set up the Skew Scroll Bar
    Skew.Top = 145
    Skew.Left = CType(Me.Width / 3, Int32)
    Skew.Width = CType(Me.Width / 3, Int32)
    Skew.Minimum = 10
    Skew.Maximum = 40
    Skew.SmallChange = 1
    Skew.LargeChange = 10
    Skew.Value = Skew.Minimum

    'Set up the double buffer button
    cmdDoubleBuffer.Top = Skew.Top + Skew.Height + 5
    cmdDoubleBuffer.Width = Skew.Width
    cmdDoubleBuffer.Left = Skew.Left
    cmdDoubleBuffer.Text = "Allow Flicker"

    BlWidth = BlendWidth.Value
    SkewVal = Skew.Value

    ' Set up for double buffering.
    'This, along with invalidating only those areas that need it TOTALY
    'eliminate flicker in this program
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
      'Dispose of our own objects
      EL1Region.Dispose()
      EL2Region.Dispose()
      EL3Region.Dispose()
    End If
    MyBase.Dispose(disposing)
  End Sub

  'Required by the Windows Form Designer
  Private components As System.ComponentModel.IContainer

  'NOTE: The following procedure is required by the Windows Form Designer
  'It can be modified using the Windows Form Designer.  
  'Do not modify it using the code editor.
  Friend WithEvents cmdDoubleBuffer As System.Windows.Forms.Button
  Friend WithEvents Skew As System.Windows.Forms.HScrollBar
  Friend WithEvents BlendWidth As System.Windows.Forms.HScrollBar
  <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
    Me.cmdDoubleBuffer = New System.Windows.Forms.Button()
    Me.Skew = New System.Windows.Forms.HScrollBar()
    Me.BlendWidth = New System.Windows.Forms.HScrollBar()
    Me.SuspendLayout()
    '
    'cmdDoubleBuffer
    '
    Me.cmdDoubleBuffer.Location = New System.Drawing.Point(40, 296)
    Me.cmdDoubleBuffer.Name = "cmdDoubleBuffer"
    Me.cmdDoubleBuffer.Size = New System.Drawing.Size(248, 24)
    Me.cmdDoubleBuffer.TabIndex = 5
    Me.cmdDoubleBuffer.Text = "button1"
    '
    'Skew
    '
    Me.Skew.Location = New System.Drawing.Point(192, 264)
    Me.Skew.Name = "Skew"
    Me.Skew.Size = New System.Drawing.Size(104, 16)
    Me.Skew.TabIndex = 4
    '
    'BlendWidth
    '
    Me.BlendWidth.Location = New System.Drawing.Point(32, 216)
    Me.BlendWidth.Name = "BlendWidth"
    Me.BlendWidth.Size = New System.Drawing.Size(192, 16)
    Me.BlendWidth.TabIndex = 3
    '
    'Form1
    '
    Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
    Me.ClientSize = New System.Drawing.Size(392, 373)
    Me.Controls.AddRange(New System.Windows.Forms.Control() {Me.cmdDoubleBuffer, Me.Skew, Me.BlendWidth})
    Me.Name = "Form1"
    Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen
    Me.Text = "Form1"
    Me.ResumeLayout(False)

  End Sub

#End Region

  Private Sub Form1_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load
  End Sub

  Protected Overrides Sub OnPaint(ByVal e As PaintEventArgs)

    e.Graphics.SmoothingMode = SmoothingMode.AntiAlias

    StandardGradient(e.Graphics)
    e.Graphics.DrawLine(Pens.Black, 0, cmdDoubleBuffer.Bottom + 10, Me.Width, _
                          cmdDoubleBuffer.Bottom + 10)
    InterpolateGradient(e.Graphics)

    MyBase.OnPaint(e)

  End Sub

  Private Sub StandardGradient(ByVal G As Graphics)
    'This brush defines how the color is distributed across the whole 
    'graphics container. Any filled object that gets drawn in the container
    'will pick up the color starting with the color gradient at that 
    'particular point on the screen.
    Dim B As LinearGradientBrush = New LinearGradientBrush(New PointF(0, 20), _
                                         New PointF(BlWidth, SkewVal), _
                                         Color.Blue, _
                                         Color.Red)

    'Draw an image inside the second rectangle
    G.DrawImage(Image.FromFile("Colorbars.jpg"), EL2Rect)

    'Draw a line across the screen with the brush
    'to show the repeating pattern
    Dim P As Pen = New Pen(B, 15)
    G.DrawLine(P, 0, 75, Me.Width, 75)
    'Draw a filled ellipse to show how the colors are used
    G.FillEllipse(B, EL1Rect)

    'Change the starting and ending colors
    'Set the alpha so the image below shows through
    Dim c() As Color = {Color.FromArgb(100, Color.LightBlue), _
                   Color.FromArgb(100, Color.DarkBlue)}
    B.LinearColors = c
    P.Brush = B
    G.DrawLine(P, 0, 100, Me.Width, 100)
    G.FillEllipse(B, EL2Rect)

    'Reclaim some memory
    c = Nothing
    If Not P Is Nothing Then
      P.Dispose()
    End If
    If Not B Is Nothing Then
      B.Dispose()
    End If
  End Sub

  Private Sub InterpolateGradient(ByVal G As Graphics)
    'Make a set of colors to use in the blend
    Dim EndColors() As Color = {Color.Green, _
                           Color.Yellow, _
                           Color.Yellow, _
                           Color.Blue, _
                           Color.Red, _
                           Color.Red}

    'These are the positions of the colors along the Gradient line
    Dim ColorPositions() As Single = {0.0F, 0.2F, 0.4F, 0.6F, 0.8F, 1.0F}

    'Fill the blend object with the colors and their positions
    Dim C_Blend As ColorBlend = New ColorBlend()
    C_Blend.Colors = EndColors
    C_Blend.Positions = ColorPositions

    'Make the linear brush and assign the custom blend to it
    Dim B As LinearGradientBrush = New LinearGradientBrush(New Point(10, 110), _
                                                        New Point(140, 110), _
                                                        Color.White, _
                                                        Color.Black)
    B.InterpolationColors = C_Blend

    'Make a graphics path that we can fill and show custom blended fill
    Dim Pth As GraphicsPath = New GraphicsPath()
    Pth.AddEllipse(20, 210, 120, 50)
    Pth.AddString("Filled String", New FontFamily("Impact"), _
                  CType(FontStyle.Italic, Int32), 30, New Point(200, 220), _
                  StringFormat.GenericDefault)
    G.FillPath(B, Pth)

    Dim P As Pen = New Pen(B, 20)
    G.DrawLine(P, 0, 300, Me.Width, 300)

    If Not P Is Nothing Then
      P.Dispose()
    End If
    If Not B Is Nothing Then
      B.Dispose()
    End If
    If Not Pth Is Nothing Then
      Pth.Dispose()
    End If
  End Sub

  Private Sub BlendWidth_Scroll(ByVal sender As System.Object, ByVal e As System.Windows.Forms.ScrollEventArgs) Handles BlendWidth.Scroll

    BlWidth = BlendWidth.Value
    'Redraw the first ellipse
    Me.Invalidate(EL1Region)
    'Redraw the second ellipse
    Me.Invalidate(EL2Region)
    'Redraw the lines
    Me.Invalidate(EL3Region)
  End Sub

  Private Sub Skew_Scroll(ByVal sender As System.Object, ByVal e As System.Windows.Forms.ScrollEventArgs) Handles Skew.Scroll

    SkewVal = Skew.Value
    'Redraw the first ellipse
    Me.Invalidate(EL1Region)
    'Redraw the second ellipse
    Me.Invalidate(EL2Region)
    '/Redraw the lines
    Invalidate(EL3Region)
  End Sub

  Private Sub cmdDoubleBuffer_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles cmdDoubleBuffer.Click

    If Me.GetStyle(ControlStyles.AllPaintingInWmPaint) And _
        Me.GetStyle(ControlStyles.DoubleBuffer) And _
        Me.GetStyle(ControlStyles.UserPaint) Then
      cmdDoubleBuffer.Text = "Eliminate Flicker"
      Me.SetStyle(ControlStyles.AllPaintingInWmPaint, False)
      Me.SetStyle(ControlStyles.DoubleBuffer, False)
    Else
      cmdDoubleBuffer.Text = "Allow Flicker"
      Me.SetStyle(ControlStyles.AllPaintingInWmPaint, True)
      Me.SetStyle(ControlStyles.DoubleBuffer, True)
    End If

  End Sub
End Class
