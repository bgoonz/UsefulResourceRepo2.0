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
  Friend WithEvents P1 As System.Windows.Forms.PictureBox
  Friend WithEvents Panel1 As System.Windows.Forms.Panel

    'Required by the Windows Form Designer
    Private components As System.ComponentModel.IContainer

    'NOTE: The following procedure is required by the Windows Form Designer
    'It can be modified using the Windows Form Designer.  
    'Do not modify it using the code editor.
    <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
    Me.B1 = New System.Windows.Forms.Button()
    Me.P1 = New System.Windows.Forms.PictureBox()
    Me.Panel1 = New System.Windows.Forms.Panel()
    Me.SuspendLayout()
    '
    'B1
    '
    Me.B1.Location = New System.Drawing.Point(216, 272)
    Me.B1.Name = "B1"
    Me.B1.Size = New System.Drawing.Size(136, 104)
    Me.B1.TabIndex = 0
    Me.B1.Text = "Button1"
    '
    'P1
    '
    Me.P1.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D
    Me.P1.Location = New System.Drawing.Point(176, 24)
    Me.P1.Name = "P1"
    Me.P1.Size = New System.Drawing.Size(248, 232)
    Me.P1.TabIndex = 1
    Me.P1.TabStop = False
    '
    'Panel1
    '
    Me.Panel1.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle
    Me.Panel1.Location = New System.Drawing.Point(16, 232)
    Me.Panel1.Name = "Panel1"
    Me.Panel1.Size = New System.Drawing.Size(136, 128)
    Me.Panel1.TabIndex = 2
    '
    'Form1
    '
    Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
    Me.ClientSize = New System.Drawing.Size(448, 413)
    Me.Controls.AddRange(New System.Windows.Forms.Control() {Me.Panel1, Me.P1, Me.B1})
    Me.Name = "Form1"
    Me.Text = "Form1"
    Me.ResumeLayout(False)

  End Sub

#End Region

  Private Sub Form1_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load


  End Sub

  Protected Overrides Sub OnPaint(ByVal e As PaintEventArgs)
    Dim G As Graphics = e.Graphics

    G.DrawLine(Pens.Black, 20, 20, 100, 100)
    MyBase.OnPaint(e)
  End Sub


  'Private Sub P1Paint(ByVal sender As System.Object, _
  '                    ByVal e As PaintEventArgs) Handles P1.Paint
  '  Dim G As Graphics = e.Graphics

  '  G.DrawLine(Pens.Black, 20, 20, 100, 100)
  '  MyBase.OnPaint(e)
  'End Sub

  'Private Sub Panel1Paint(ByVal sender As System.Object, _
  '                        ByVal e As PaintEventArgs) Handles Panel1.Paint
  '  Dim G As Graphics = e.Graphics

  '  G.DrawLine(Pens.Black, 20, 20, 100, 100)
  '  MyBase.OnPaint(e)
  'End Sub

  'Private Sub ButtonPaint(ByVal sender As System.Object, _
  '                        ByVal e As PaintEventArgs) Handles B1.Paint
  '  Dim G As Graphics = e.Graphics

  '  G.DrawLine(Pens.Black, 20, 20, 100, 100)
  '  MyBase.OnPaint(e)
  'End Sub

  Private Sub AllPaint(ByVal sender As System.Object, _
                       ByVal e As PaintEventArgs) _
                       Handles B1.Paint, P1.Paint, Panel1.Paint

    Dim G As Graphics = e.Graphics

    If sender.GetType Is GetType(Panel) Then
      If CType(sender, Panel).Name = "Panel1" Then
        G.DrawLine(Pens.Red, 20, 20, 100, 100)
      End If
    End If

    If sender.GetType Is GetType(Button) Then
      If CType(sender, Button).Name = "B1" Then
        G.DrawLine(Pens.Green, 20, 20, 100, 100)
      End If
    End If

    If sender.GetType Is GetType(PictureBox) Then
      If CType(sender, PictureBox).Name = "P1" Then
        G.DrawLine(Pens.Blue, 20, 20, 100, 100)
      End If
    End If
    MyBase.OnPaint(e)
  End Sub



  Private Sub B1_Click(ByVal sender As System.Object, _
                       ByVal e As System.EventArgs) Handles B1.Click
    Dim G As Graphics
    Dim G2 As Graphics

    G = Me.CreateGraphics
    G.DrawLine(New Pen(Color.DarkMagenta, 10), 50, 10, 50, 100)

    G2 = Graphics.FromHwnd(Me.Handle)
    G2.DrawLine(New Pen(Color.DarkCyan, 10), 70, 10, 70, 100)

    ' Create new graphics object using handle to device context.
    Dim G3 As Graphics = Graphics.FromHdc(G2.GetHdc())
    G3.DrawLine(New Pen(Color.Black, 10), 85, 10, 85, 100)
    G3.Dispose()

    G.Dispose()
    '   G2.Dispose()
  End Sub


  Private Sub P1_Click(ByVal sender As System.Object, _
                       ByVal e As System.EventArgs) Handles P1.Click

    Dim img As Image = Image.FromFile("CRANE.JPG")
    Dim G As Graphics = Graphics.FromImage(img)

    G.DrawLine(New Pen(Color.Aquamarine, 10), 0, CInt(img.Height / 2), _
                                                 CInt(img.Width), _
                                                 CInt(img.Height / 2))

    P1.Image = img
    G.Dispose()
  End Sub
End Class
