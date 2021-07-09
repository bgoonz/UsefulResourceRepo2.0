Imports System.Drawing

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
  Friend WithEvents lblType As System.Windows.Forms.Label

  'Required by the Windows Form Designer
  Private components As System.ComponentModel.IContainer

  'NOTE: The following procedure is required by the Windows Form Designer
  'It can be modified using the Windows Form Designer.  
  'Do not modify it using the code editor.
  <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
    Me.lblType = New System.Windows.Forms.Label()
    Me.SuspendLayout()
    '
    'lblType
    '
    Me.lblType.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D
    Me.lblType.Location = New System.Drawing.Point(16, 176)
    Me.lblType.Name = "lblType"
    Me.lblType.Size = New System.Drawing.Size(360, 24)
    Me.lblType.TabIndex = 0
    '
    'Form1
    '
    Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
    Me.ClientSize = New System.Drawing.Size(392, 213)
    Me.Controls.AddRange(New System.Windows.Forms.Control() {Me.lblType})
    Me.Name = "Form1"
    Me.Text = "Form1"
    Me.ResumeLayout(False)

  End Sub

#End Region

  Private Sub Form1_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load

  End Sub

  Protected Overrides Sub OnPaint(ByVal e As PaintEventArgs)
    Dim G As Graphics = e.Graphics
    Dim P1 As Pen = New Pen(Color.Blue, 10)

    'G.DrawLine(P1, 20, CInt(Me.Height / 2), Me.Width - 20, CInt(Me.Height / 2))

    'P1.Color = Color.DarkOrange
    'P1.Width = 5
    'G.DrawLine(P1, 20, CInt(Me.Height / 2), Me.Width - 20, CInt(Me.Height / 2))
    'P1.Width = 20

    'Change brush
    'Dim P2 As Pen = New Pen(Color.Blue, 10)
    'G.DrawLine(P2, 20, CInt(Me.Height / 3), Me.Width - 20, CInt(Me.Height / 3))

    'P2.Brush = New TextureBrush(New Bitmap("colorbars.jpg"))
    'G.DrawLine(P2, 20, CInt(Me.Height / 2), Me.Width - 20, CInt(Me.Height / 2))
    'P1.Dispose()

    'DashStyle ================================================
    Dim P2 As Pen = New Pen(Color.Blue, 10)
    Dim pts() As Single = {3, 1, 2, 5}


    P2.DashStyle = Drawing.Drawing2D.DashStyle.Dash
    P2.DashPattern = pts
    '  P2.DashOffset = 40
    P2.DashCap = Drawing.Drawing2D.DashCap.Triangle
    P2.StartCap = Drawing.Drawing2D.LineCap.Round
    P2.EndCap = Drawing.Drawing2D.LineCap.ArrowAnchor
    G.DrawLine(P2, 20, CInt(Me.Height / 2), Me.Width - 20, CInt(Me.Height / 2))

    'pentype
    G.Clear(Color.Khaki)
    Dim P3 As Pen = New Pen(Color.Blue, 10)
    P3.Brush = New TextureBrush(New Bitmap("colorbars.jpg"))
    G.DrawLine(P3, 20, CInt(Me.Height / 2), Me.Width - 20, CInt(Me.Height / 2))
    lblType.Text = "PenType is " + P3.PenType.ToString


    'compoundarray
    P3.Dispose()
    G.Clear(Color.Khaki)
    P3 = New Pen(Color.Blue, 20)
    Dim lines() As Single = {0.0, 0.1, 0.9, 1.0}
    P3.CompoundArray = lines
    G.DrawLine(P3, 20, CInt(Me.Height / 2), Me.Width - 20, CInt(Me.Height / 2))

    'pens class
    P3.Dispose()
    G.Clear(Color.Khaki)
    P3 = Pens.LightSlateGray
    G.DrawLine(P3, 20, CInt(Me.Height / 2), Me.Width - 20, CInt(Me.Height / 2))
    G.DrawLine(Pens.Violet, 20, CInt(Me.Height / 2), _
                Me.Width - 20, CInt(Me.Height / 2))


    If Not P2 Is Nothing Then
      P2.Dispose()
    End If

  End Sub

End Class
