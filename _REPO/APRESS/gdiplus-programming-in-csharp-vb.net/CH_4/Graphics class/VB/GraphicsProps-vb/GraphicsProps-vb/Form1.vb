Imports System.Drawing.Drawing2D
Imports System.Drawing.Text

Public Class Form1
  Inherits System.Windows.Forms.Form

#Region " Windows Form Designer generated code "

  Public Sub New()
    MyBase.New()

    'This call is required by the Windows Form Designer.
    InitializeComponent()

    'Add any initialization after the InitializeComponent() call

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
  Friend WithEvents B0 As System.Windows.Forms.Button
  Friend WithEvents B1 As System.Windows.Forms.Button

  'Required by the Windows Form Designer
  Private components As System.ComponentModel.IContainer

  'NOTE: The following procedure is required by the Windows Form Designer
  'It can be modified using the Windows Form Designer.  
  'Do not modify it using the code editor.
  <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
    Me.B0 = New System.Windows.Forms.Button()
    Me.B1 = New System.Windows.Forms.Button()
    Me.SuspendLayout()
    '
    'B0
    '
    Me.B0.Location = New System.Drawing.Point(8, 240)
    Me.B0.Name = "B0"
    Me.B0.Size = New System.Drawing.Size(48, 24)
    Me.B0.TabIndex = 0
    Me.B0.Text = "B0"
    '
    'B1
    '
    Me.B1.Location = New System.Drawing.Point(80, 240)
    Me.B1.Name = "B1"
    Me.B1.Size = New System.Drawing.Size(48, 24)
    Me.B1.TabIndex = 1
    Me.B1.Text = "B1"
    '
    'Form1
    '
    Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
    Me.ClientSize = New System.Drawing.Size(288, 273)
    Me.Controls.AddRange(New System.Windows.Forms.Control() {Me.B1, Me.B0})
    Me.Name = "Form1"
    Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen
    Me.Text = "Form1"
    Me.ResumeLayout(False)

  End Sub

#End Region

  Private Sub Form1_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load
  End Sub

  Protected Overrides Sub OnPaint(ByVal e As PaintEventArgs)
    Dim G As Graphics = e.Graphics

    'Get a base color for the Graphics region
    G.Clear(Color.Bisque)

    'Change one of the attributes of the Graphics object
    'then save the state.
    G.SmoothingMode = SmoothingMode.AntiAlias
    Dim OldG As GraphicsState = G.Save()

    'Restore the Smoothing mode state and draw a line
    G.SmoothingMode = SmoothingMode.Default
    G.DrawLine(New Pen(Color.DarkMagenta, 20), 10, 50, _
                                CInt(Me.Width - 10), 140)

    'Restore the old Graphics state and draw another line
    G.Restore(OldG)
    G.DrawLine(New Pen(Color.DarkMagenta, 20), 10, 100, _
                                CInt(Me.Width - 10), 190)

    G.Dispose()
  End Sub

  Private Sub B0_Click(ByVal sender As System.Object, _
                       ByVal e As System.EventArgs) Handles B0.Click
    BeginContainerNoArg(Me.CreateGraphics())
  End Sub

  Private Sub B1_Click(ByVal sender As System.Object, _
                       ByVal e As System.EventArgs) Handles B1.Click
    'BeginContainerIntRectArg(Me.CreateGraphics())
    ' World2PageXform(Me.CreateGraphics())
    RenderText(Me.CreateGraphics())
  End Sub

  Public Sub BeginContainerNoArg(ByVal G As Graphics)

    G.Clear(Color.Bisque)

    'Change one of the attributes of the Graphics object
    'then save the state.
    G.SmoothingMode = SmoothingMode.AntiAlias
    Dim OldG As GraphicsContainer = G.BeginContainer()

    'Restore the Smoothing mode state and draw a line
    G.SmoothingMode = SmoothingMode.Default
    G.DrawLine(New Pen(Color.Chocolate, 20), 10, 50, _
                                CInt(Me.Width - 10), 150)

    'Restore the old Graphics state and draw another line
    G.EndContainer(OldG)
    G.DrawLine(New Pen(Color.Chocolate, 20), 10, 100, _
                                CInt(Me.Width - 10), 200)

    G.Dispose()
  End Sub

  Public Sub BeginContainerIntRectArg(ByVal G As Graphics)

    G.Clear(Color.Bisque)

    ' Define transformation for container.
    Dim srcRect As New Rectangle(0, 0, 200, 200)
    Dim destRect As New Rectangle(0, 0, 100, 100)
    ' Begin graphics container.
    Dim containerState As GraphicsContainer = G.BeginContainer(destRect, _
                                              srcRect, GraphicsUnit.Pixel)

    G.DrawLine(New Pen(Color.DarkOrchid, 20), 10, 100, 200, 100)
    G.EndContainer(containerState)

    G.DrawLine(New Pen(Color.DarkOrchid, 20), 10, 100, 200, 100)

    G.Dispose()
  End Sub

  Public Sub World2PageXform(ByVal G As Graphics)
    Dim EndX As Int32 = 1
    Dim EndY As Int32 = 1

    G.Clear(Color.Azure)
    G.PageUnit = GraphicsUnit.Inch
    G.TranslateTransform(1, 1)
    G.DrawLine(Pens.Blue, 0, 0, EndX, EndY)

    Dim Xpix As Int32 = EndX * CInt(G.DpiX)
    Dim Ypix As Int32 = EndX * CInt(G.DpiY)
  End Sub

  Public Sub RenderText(ByVal G As Graphics)
    Dim F As New Font("Arial", 16)
    Dim B As New SolidBrush(Color.Black)

    G.Clear(Color.Azure)
    G.TextRenderingHint = TextRenderingHint.SingleBitPerPixel
    G.DrawString("SingleBitPerPixel", F, B, New PointF(10, 10))

    G.TextRenderingHint = TextRenderingHint.AntiAlias
    G.DrawString("AntiAlias default Contrast", F, B, New PointF(10, 60))

    G.TextContrast = 12
    G.DrawString("AntiAlias Low Contrast", F, B, New PointF(10, 90))

    G.TextContrast = 1
    G.DrawString("AntiAlias High Contrast", F, B, New PointF(10, 120))

    B.Dispose()
    F.Dispose()
  End Sub



End Class
