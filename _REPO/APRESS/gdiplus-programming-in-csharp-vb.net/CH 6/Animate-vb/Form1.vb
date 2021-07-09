Option Strict On

Imports System.Drawing
Imports System.Drawing.Drawing2D
Imports System.Drawing.Imaging

Public Class Form1
  Inherits System.Windows.Forms.Form

  Dim RotatingBlocks As Bitmap
  Dim DrawHere As Point
  Dim InvalidRect As Rectangle
  Dim InProcess As Boolean = False

#Region " Windows Form Designer generated code "

  Public Sub New()
    MyBase.New()

    'This call is required by the Windows Form Designer.
    InitializeComponent()

    RotatingBlocks = New Bitmap("blocks.gif")
    DrawHere = New Point(10, 10)
    InvalidRect = New Rectangle(DrawHere, RotatingBlocks.Size)

    Me.SetStyle(ControlStyles.AllPaintingInWmPaint, True)
    Me.SetStyle(ControlStyles.DoubleBuffer, True)
    cmdStop.Enabled = False

  End Sub

  'Form overrides dispose to clean up the component list.
  Protected Overloads Overrides Sub Dispose(ByVal disposing As Boolean)
    If disposing Then
      If Not (components Is Nothing) Then
        components.Dispose()
      End If
    End If
    RotatingBlocks.Dispose()
    MyBase.Dispose(disposing)
  End Sub

  'Required by the Windows Form Designer
  Private components As System.ComponentModel.IContainer

  'NOTE: The following procedure is required by the Windows Form Designer
  'It can be modified using the Windows Form Designer.  
  'Do not modify it using the code editor.
  Friend WithEvents cmdStop As System.Windows.Forms.Button
  Friend WithEvents cmdGo As System.Windows.Forms.Button
  <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
    Me.cmdStop = New System.Windows.Forms.Button()
    Me.cmdGo = New System.Windows.Forms.Button()
    Me.SuspendLayout()
    '
    'cmdStop
    '
    Me.cmdStop.Location = New System.Drawing.Point(248, 120)
    Me.cmdStop.Name = "cmdStop"
    Me.cmdStop.Size = New System.Drawing.Size(56, 32)
    Me.cmdStop.TabIndex = 3
    Me.cmdStop.Text = "Stop"
    '
    'cmdGo
    '
    Me.cmdGo.Location = New System.Drawing.Point(168, 120)
    Me.cmdGo.Name = "cmdGo"
    Me.cmdGo.Size = New System.Drawing.Size(64, 32)
    Me.cmdGo.TabIndex = 2
    Me.cmdGo.Text = "Animate"
    '
    'Form1
    '
    Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
    Me.ClientSize = New System.Drawing.Size(312, 157)
    Me.Controls.AddRange(New System.Windows.Forms.Control() {Me.cmdStop, Me.cmdGo})
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

    If Not InProcess Then Return

    'Get the next block ready to display.
    ImageAnimator.UpdateFrames(RotatingBlocks)
    'Draw the next frame in the RotatingBlocks animation.
    e.Graphics.DrawImage(RotatingBlocks, DrawHere)
  End Sub

  Private Sub OnFrameChanged(ByVal o As Object, ByVal e As EventArgs)
    'Force a call to the Paint event handler.
    Me.Invalidate(InvalidRect)
  End Sub


  Private Sub cmdGo_Click(ByVal sender As System.Object, _
                          ByVal e As System.EventArgs) Handles cmdGo.Click
    If Not InProcess Then
      If ImageAnimator.CanAnimate(RotatingBlocks) Then
        'Begin the animation only once.
        ImageAnimator.Animate(RotatingBlocks, AddressOf Me.OnFrameChanged)
        InProcess = True
        cmdGo.Enabled = False
        cmdStop.Enabled = True
      End If
    End If

  End Sub

  Private Sub cmdStop_Click(ByVal sender As System.Object, _
                            ByVal e As System.EventArgs) Handles cmdStop.Click
    ImageAnimator.StopAnimate(RotatingBlocks, AddressOf Me.OnFrameChanged)
    InProcess = False
    cmdGo.Enabled = True
    cmdStop.Enabled = False
  End Sub
End Class
