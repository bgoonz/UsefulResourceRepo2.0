Option Strict On
Imports System
Imports System.Drawing
Imports System.Drawing.Drawing2D
Imports System.Drawing.Text
Imports System.Drawing.Printing
Imports System.IO

Public Class Form1
  Inherits System.Windows.Forms.Form

  Private MyImage As Image
  Private pd As PrintDocument
  Private Preview As PrintPreviewDialog

#Region " Windows Form Designer generated code "

  Public Sub New()
    MyBase.New()

    InitializeComponent()

    MyImage = Bitmap.FromFile("d:\colorbars.jpg")
    Preview = New PrintPreviewDialog()
    Preview.UseAntiAlias = True

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
  Friend WithEvents lblPrint As System.Windows.Forms.Label
  Friend WithEvents cmdShow As System.Windows.Forms.Button
  <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
    Me.lblPrint = New System.Windows.Forms.Label()
    Me.cmdShow = New System.Windows.Forms.Button()
    Me.SuspendLayout()
    '
    'lblPrint
    '
    Me.lblPrint.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D
    Me.lblPrint.Location = New System.Drawing.Point(152, 16)
    Me.lblPrint.Name = "lblPrint"
    Me.lblPrint.Size = New System.Drawing.Size(280, 136)
    Me.lblPrint.TabIndex = 3
    '
    'cmdShow
    '
    Me.cmdShow.Location = New System.Drawing.Point(360, 328)
    Me.cmdShow.Name = "cmdShow"
    Me.cmdShow.Size = New System.Drawing.Size(72, 24)
    Me.cmdShow.TabIndex = 2
    Me.cmdShow.Text = "Show"
    '
    'Form1
    '
    Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
    Me.ClientSize = New System.Drawing.Size(442, 373)
    Me.Controls.AddRange(New System.Windows.Forms.Control() {Me.lblPrint, Me.cmdShow})
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
    pd = New PrintDocument()
    AddHandler pd.PrintPage, New PrintPageEventHandler(AddressOf Me.pd_Print)

    Preview.Document = pd

  End Sub

  Protected Overrides Sub OnPaint(ByVal e As PaintEventArgs)
    DrawIt(e.Graphics)
  End Sub

  Private Sub pd_Print(ByVal sender As Object, ByVal e As PrintPageEventArgs)
    lblPrint.Text += "pd_Print pd= " + sender.ToString() + vbCrLf
    DrawIt(e.Graphics)
  End Sub

  Private Sub DrawIt(ByVal G As Graphics)
    G.SmoothingMode = SmoothingMode.AntiAlias
    G.DrawImage(MyImage, 10, 10)

    Dim B As LinearGradientBrush = New LinearGradientBrush( _
                                   New Rectangle(0, 0, 50, 10), _
                                   Color.Red, Color.Blue, _
                                   LinearGradientMode.ForwardDiagonal)
    G.FillEllipse(B, 10, 200, 200, 75)

    G.DrawString("Print Preview Test", _
                 New Font("Comic Sans MS", 24), B, 50, 275)
  End Sub

  Private Sub cmdShow_Click(ByVal sender As System.Object, _
                            ByVal e As System.EventArgs) Handles cmdShow.Click
    Preview.WindowState = FormWindowState.Maximized
    pd.DocumentName = DateTime.Now.Ticks.ToString()
    Preview.ShowDialog()
  End Sub

End Class
