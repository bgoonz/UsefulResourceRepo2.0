Option Strict On

Imports System
Imports System.Drawing
Imports System.Drawing.Drawing2D
Imports System.Drawing.Imaging

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
    Me.MaximizeBox = False
    Me.MinimizeBox = False
    Me.Name = "Form1"
    Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen
    Me.Text = "Form1"

  End Sub

#End Region

  Private Sub Form1_Load(ByVal sender As System.Object, _
                         ByVal e As System.EventArgs) Handles MyBase.Load

    ' Create a graphics object from the forms graphics object
    ' and get the handle to it.
    Dim FormGraphics As Graphics = Me.CreateGraphics()
    Dim hdc As IntPtr = FormGraphics.GetHdc()

    ' Now create a blank metafile using the graphics handle
    ' This is the metafile where all drawing instructions will 
    ' be recorded.
    Dim mf As Metafile = New Metafile("mymeta.emf", hdc)

    ' In order to record drawing commands we need to draw on something
    ' That something is a new graphics object
    Dim MetaGraphics As Graphics = Graphics.FromImage(mf)

    MetaGraphics.SmoothingMode = SmoothingMode.AntiAlias

    'Now we are ready to draw on the metagraphics object
    MetaGraphics.DrawRectangle(Pens.Black, 10, 10, 100, 50)
    MetaGraphics.DrawLine(Pens.Orange, 10, 70, 150, 100)

    'Dispose of temporary stuff
    MetaGraphics.Dispose()
    mf.Dispose()
    FormGraphics.ReleaseHdc(hdc)
    FormGraphics.Dispose()

  End Sub

  Protected Overrides Sub OnPaint(ByVal e As PaintEventArgs)

    Dim mf As Metafile = New Metafile("mymeta.emf")
    e.Graphics.DrawImage(mf, New Point(10, 10))

  End Sub
End Class
