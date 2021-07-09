Option Strict On

Imports System.Drawing
Imports System.Drawing.Drawing2D

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
    Me.Text = "Form1"

  End Sub

#End Region

  Private Sub Form1_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load

  End Sub

  Protected Overrides Sub OnPaint(ByVal e As PaintEventArgs)
    Dim G As Graphics = e.Graphics
    Dim P As Pen = New Pen(Color.Blue, 1)
    Dim Pts() As Point = {New Point(10, 10), _
                    New Point(15, 10), _
                    New Point(20, 15), _
                    New Point(20, 20), _
                    New Point(15, 25), _
                    New Point(10, 25), _
                    New Point(5, 20), _
                    New Point(5, 15), _
                    New Point(10, 10)}
    Dim Path As GraphicsPath = New GraphicsPath()

    Path.AddLines(Pts)

    G.SmoothingMode = SmoothingMode.AntiAlias
    Dim Lc As CustomLineCap = New CustomLineCap(Nothing, Path)
    Lc.BaseInset = 0
    Lc.WidthScale = 1
    Lc.StrokeJoin = LineJoin.Miter
    P.CustomEndCap = Lc
    P.CustomStartCap = Lc

    G.DrawLine(P, 50, 150, 200, 150)
    G.DrawLine(P, 150, 50, 150, 200)

    Lc.Dispose()
    Path.Dispose()
    P.Dispose()
  End Sub

End Class
