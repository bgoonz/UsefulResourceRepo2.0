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
    Me.Name = "Form1"
    Me.Text = "Form1"

  End Sub

#End Region

  Private Sub Form1_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load
    Dim cp As ColorPalette
    Dim s As String
    Dim bmp As Bitmap = New Bitmap("lock.bmp")

    cp = bmp.Palette
    Dim c As Color
    For Each c In cp.Entries
      s = c.ToString()
    Next

  End Sub

  Protected Overrides Sub OnPaint(ByVal e As PaintEventArgs)
    Dim bmp As Bitmap = New Bitmap("crane.jpg")
    Dim c As Color
    Dim x, y As Int32

    e.Graphics.DrawImage(bmp, 10, 30)

    For x = 0 To bmp.Width - 1
      For y = 0 To bmp.Height - 1
        c = bmp.GetPixel(x, y)
        c = Color.FromArgb(c.ToArgb() + 100)
        bmp.SetPixel(x, y, c)
      Next
    Next

    e.Graphics.DrawImage(bmp, 150, 30)
  End Sub
End Class
