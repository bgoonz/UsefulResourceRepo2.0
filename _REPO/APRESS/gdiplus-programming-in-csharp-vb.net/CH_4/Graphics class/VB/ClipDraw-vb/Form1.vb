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
  Friend WithEvents B1 As System.Windows.Forms.Button
  Friend WithEvents B2 As System.Windows.Forms.Button
  Friend WithEvents B3 As System.Windows.Forms.Button
  Friend WithEvents B4 As System.Windows.Forms.Button
  Friend WithEvents B5 As System.Windows.Forms.Button

  'Required by the Windows Form Designer
  Private components As System.ComponentModel.IContainer

  'NOTE: The following procedure is required by the Windows Form Designer
  'It can be modified using the Windows Form Designer.  
  'Do not modify it using the code editor.
  <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
    Me.B1 = New System.Windows.Forms.Button()
    Me.B2 = New System.Windows.Forms.Button()
    Me.B3 = New System.Windows.Forms.Button()
    Me.B4 = New System.Windows.Forms.Button()
    Me.B5 = New System.Windows.Forms.Button()
    Me.SuspendLayout()
    '
    'B1
    '
    Me.B1.Location = New System.Drawing.Point(8, 240)
    Me.B1.Name = "B1"
    Me.B1.Size = New System.Drawing.Size(48, 24)
    Me.B1.TabIndex = 0
    Me.B1.Text = "Clip"
    '
    'B2
    '
    Me.B2.Location = New System.Drawing.Point(72, 240)
    Me.B2.Name = "B2"
    Me.B2.Size = New System.Drawing.Size(72, 24)
    Me.B2.TabIndex = 1
    Me.B2.Text = "SetClip"
    '
    'B3
    '
    Me.B3.Location = New System.Drawing.Point(160, 240)
    Me.B3.Name = "B3"
    Me.B3.Size = New System.Drawing.Size(88, 24)
    Me.B3.TabIndex = 2
    Me.B3.Text = "ExcludeClip"
    '
    'B4
    '
    Me.B4.Location = New System.Drawing.Point(160, 200)
    Me.B4.Name = "B4"
    Me.B4.Size = New System.Drawing.Size(88, 24)
    Me.B4.TabIndex = 3
    Me.B4.Text = "Intersect"
    '
    'B5
    '
    Me.B5.Location = New System.Drawing.Point(256, 240)
    Me.B5.Name = "B5"
    Me.B5.Size = New System.Drawing.Size(88, 24)
    Me.B5.TabIndex = 4
    Me.B5.Text = "IntersectClip"
    '
    'Form1
    '
    Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
    Me.ClientSize = New System.Drawing.Size(352, 273)
    Me.Controls.AddRange(New System.Windows.Forms.Control() {Me.B5, Me.B4, Me.B3, Me.B2, Me.B1})
    Me.Name = "Form1"
    Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen
    Me.Text = "Form1"
    Me.ResumeLayout(False)

  End Sub

#End Region


  Private G_obj As Graphics


  Private Sub Form1_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load

  End Sub

  Private Sub Form1Mouse(ByVal sender As System.Object, _
                         ByVal e As MouseEventArgs) Handles MyBase.MouseMove
    If G_obj Is Nothing Then Exit Sub
    If G_obj.IsVisible(e.X, e.Y) Then
      G_obj.FillRectangle(Brushes.BlueViolet, e.X, e.Y, 1, 1)
    End If
  End Sub

  Private Sub B1_Click(ByVal sender As System.Object, _
                       ByVal e As System.EventArgs) Handles B1.Click
    Dim G As Graphics = Me.CreateGraphics
    Dim R As New Rectangle(50.0F, 50.0F, 100.0F, 100.0F)

    G.Clear(Color.Gainsboro)
    'Outline the rectangle and create the clipping region
    G.DrawRectangle(Pens.Black, R)
    G.Clip = New Region(R)

    'Draw line the sidth of the form
    G.DrawLine(Pens.Blue, 0, 75, Me.Width, 75)
    'Draw a circle 1/4 inside clipping region
    G.FillEllipse(Brushes.LawnGreen, New Rectangle(75, 75, 150, 150))

    G.Dispose()
  End Sub

  Private Sub B2_Click(ByVal sender As System.Object, _
                       ByVal e As System.EventArgs) Handles B2.Click
    Dim G As Graphics = Me.CreateGraphics
    Dim R As New Rectangle(20.0F, 20.0F, 100.0F, 100.0F)
    Dim path As New GraphicsPath()

    G.Clear(Color.Gainsboro)
    path.AddEllipse(R)
    G.DrawPath(Pens.Black, path)
    G.SetClip(path)

    ' Draw some clipped strings.
    Dim F As New Font("Arial", 16)
    G.DrawString("ABCDEFGHIJKLM", F, Brushes.DeepPink, 15, 25)
    G.DrawString("NOPQRSTUVWXYZ", F, Brushes.DeepPink, 15, 68)
    F.Dispose()

    G.Dispose()
  End Sub

  Private Sub B3_Click(ByVal sender As System.Object, _
                       ByVal e As System.EventArgs) Handles B3.Click
    Dim G As Graphics = Me.CreateGraphics
    Dim R As New Rectangle(40.0F, 20.0F, 100.0F, 100.0F)
    Dim path As New GraphicsPath()

    G.Clear(Color.Gainsboro)
    path.AddEllipse(R)
    G.DrawPath(Pens.Black, path)

    G.ExcludeClip(New Region(path))

    ' Draw some clipped strings.
    Dim F As New Font("Arial", 16)
    G.DrawString("ABCDEFGHIJKLM", F, Brushes.DeepPink, 15, 25)
    G.DrawString("NOPQRSTUVWXYZ", F, Brushes.DeepPink, 15, 68)

    path.Dispose()
  End Sub

  Private Sub B4_Click(ByVal sender As System.Object, _
                       ByVal e As System.EventArgs) Handles B4.Click
    Dim G As Graphics = Me.CreateGraphics
    Dim R As New Rectangle(40.0F, 20.0F, 100.0F, 100.0F)
    Dim R2 As New Rectangle(60.0F, 20.0F, 120.0F, 120.0F)
    Dim P1 As New GraphicsPath()
    Dim P2 As New GraphicsPath()

    G.Clear(Color.Gainsboro)
    P1.AddEllipse(R)
    G.DrawPath(Pens.Black, P1)

    P2.AddEllipse(R2)
    G.DrawPath(Pens.Black, P2)

    G.SetClip(P1)
    G.SetClip(P2, CombineMode.Intersect)

    ' Draw some clipped strings.
    Dim F As New Font("Arial", 16)
    G.DrawString("ABCDEFGHIJKLM", F, Brushes.DeepPink, 15, 25)
    G.DrawString("NOPQRSTUVWXYZ", F, Brushes.DeepPink, 15, 68)

    G_obj = G
    P1.Dispose()
    P2.Dispose()
  End Sub

  Private Sub B5_Click(ByVal sender As System.Object, _
                       ByVal e As System.EventArgs) Handles B5.Click

    'Bail out if not set
    If G_obj Is Nothing Then Exit Sub
    Dim R2 As New Rectangle(75, 75, 150, 150)

    G_obj.IntersectClip(R2)
    G_obj.FillRectangle(New SolidBrush(Color.Blue), 0, 0, 500, 500)

  End Sub
End Class
