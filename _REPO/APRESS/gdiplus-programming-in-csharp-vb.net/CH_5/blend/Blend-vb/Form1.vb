Option Strict On

Imports System.Drawing
Imports System.Drawing.Drawing2D
Imports System.Drawing.Imaging

Public Class Form1
  Inherits System.Windows.Forms.Form

  Private AlphaFactor As Int32 = 255
  Private GammaFactor As Single = 1.0F
  Private R As Rectangle = New Rectangle(40, 20, 100, 100)
  Private I As Image = Image.FromFile("Colorbars.jpg")
  Private ImWidth As Int32
  Private ImHeight As Int32
  Private Ia As ImageAttributes = New ImageAttributes()

#Region " Windows Form Designer generated code "

  Public Sub New()
    MyBase.New()

    'This call is required by the Windows Form Designer.
    InitializeComponent()

    AlphaScroll.Minimum = 20
    AlphaScroll.Maximum = 245
    AlphaScroll.SmallChange = 5
    AlphaScroll.LargeChange = 5
    AlphaScroll.Left = R.Left
    AlphaScroll.Width = R.Width
    AlphaScroll.Top = R.Bottom

    GammaScroll.Minimum = 1
    GammaScroll.Maximum = 50
    GammaScroll.SmallChange = 1
    GammaScroll.LargeChange = 5
    GammaScroll.Left = R.Left
    GammaScroll.Top = R.Top - GammaScroll.Height
    GammaScroll.Width = R.Width

    ImWidth = I.Width
    ImHeight = I.Height

    AlphaScroll.Value = CType((AlphaScroll.Maximum - AlphaScroll.Minimum) / 2, _
                              Int32)
    GammaScroll.Value = CType((GammaScroll.Maximum - GammaScroll.Minimum) / 2, _
                              Int32)
    AlphaFactor = AlphaScroll.Value
    GammaFactor = CType(GammaScroll.Value, Single) / 10

  End Sub

  'Form overrides dispose to clean up the component list.
  Protected Overloads Overrides Sub Dispose(ByVal disposing As Boolean)
    If disposing Then
      If Not (components Is Nothing) Then
        components.Dispose()
      End If
      If Not I Is Nothing Then I.Dispose()
      If Not Ia Is Nothing Then Ia.Dispose()
    End If
    MyBase.Dispose(disposing)
  End Sub
  Friend WithEvents GammaScroll As System.Windows.Forms.HScrollBar
  Friend WithEvents AlphaScroll As System.Windows.Forms.HScrollBar

  'Required by the Windows Form Designer
  Private components As System.ComponentModel.IContainer

  'NOTE: The following procedure is required by the Windows Form Designer
  'It can be modified using the Windows Form Designer.  
  'Do not modify it using the code editor.
  <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
    Me.GammaScroll = New System.Windows.Forms.HScrollBar()
    Me.AlphaScroll = New System.Windows.Forms.HScrollBar()
    Me.SuspendLayout()
    '
    'GammaScroll
    '
    Me.GammaScroll.Location = New System.Drawing.Point(32, 24)
    Me.GammaScroll.Name = "GammaScroll"
    Me.GammaScroll.Size = New System.Drawing.Size(96, 16)
    Me.GammaScroll.TabIndex = 0
    '
    'AlphaScroll
    '
    Me.AlphaScroll.Location = New System.Drawing.Point(32, 136)
    Me.AlphaScroll.Name = "AlphaScroll"
    Me.AlphaScroll.Size = New System.Drawing.Size(96, 16)
    Me.AlphaScroll.TabIndex = 1
    '
    'Form1
    '
    Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
    Me.ClientSize = New System.Drawing.Size(292, 273)
    Me.Controls.AddRange(New System.Windows.Forms.Control() {Me.AlphaScroll, Me.GammaScroll})
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

    AlphaBlend(e.Graphics)
    MyBase.OnPaint(e)

  End Sub

  Private Sub AlphaBlend(ByVal G As Graphics)
    'AlphaFactor is variable depeneding upon scroll bars
    Dim P As Pen = New Pen(Color.FromArgb(AlphaFactor, 200, 0, 100), 20)
    Dim bmp As Bitmap = New Bitmap(120, 120)
    Dim G2 As Graphics = Graphics.FromImage(bmp)
    Dim B As Brush = New SolidBrush(Color.FromArgb(AlphaFactor, 50, 200, 50))

    Try
      ' Set the brightness while rendering image
      Ia.SetGamma(GammaFactor)
      G.DrawImage(I, R, 0, 0, ImWidth, ImHeight, GraphicsUnit.Pixel, Ia)
      'Draw transparent line on top of image
      G.DrawLine(P, 10, 100, 200, 100)

      ' Draw inside the image contained in memory
      G2.FillEllipse(B, 0, 0, 75, 75)
      G.DrawImage(I, New Rectangle(140, 140, 120, 120))
      G.CompositingQuality = CompositingQuality.GammaCorrected
      G.CompositingMode = CompositingMode.SourceOver
      G.DrawImage(bmp, New Rectangle(150, 150, 150, 150))

    Finally
      If Not bmp Is Nothing Then bmp.Dispose()
      If Not G2 Is Nothing Then G2.Dispose()
      If Not B Is Nothing Then B.Dispose()
      If Not P Is Nothing Then P.Dispose()
    End Try

  End Sub

  Private Sub GammaScroll_Scroll(ByVal sender As System.Object, _
                          ByVal e As System.Windows.Forms.ScrollEventArgs) _
                          Handles GammaScroll.Scroll
    GammaFactor = CType(GammaScroll.Value / 10, Single)
    Me.Refresh()

  End Sub

  Private Sub AlphaScroll_Scroll(ByVal sender As System.Object, _
                          ByVal e As System.Windows.Forms.ScrollEventArgs) _
                          Handles AlphaScroll.Scroll
    AlphaFactor = AlphaScroll.Value
    Me.Refresh()

  End Sub
End Class
