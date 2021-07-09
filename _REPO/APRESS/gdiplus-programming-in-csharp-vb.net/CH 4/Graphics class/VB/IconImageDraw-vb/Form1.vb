Imports System.Drawing
Imports System.Drawing.Imaging
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
    Me.ClientSize = New System.Drawing.Size(492, 373)
    Me.Name = "Form1"
    Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen
    Me.Text = "Form1"

  End Sub

#End Region

  '"R" holds the image, "Box" is the new image home currently being drawn by
  'holding the mouse down and dragging
  Private R As Rectangle = Rectangle.Empty
  Private Box As Rectangle = Rectangle.Empty
  Private I As Image = Image.FromFile("sample.jpg")
  Private ThisIcon As Icon = New Icon("usa.ico")
  Private OK2Paint As Boolean = False

  Private Sub Form1_Load(ByVal sender As System.Object, _
                         ByVal e As System.EventArgs) Handles MyBase.Load

  End Sub

  Protected Overrides Sub OnPaint(ByVal e As PaintEventArgs)

    'Always draw the icon
    e.Graphics.DrawIcon(ThisIcon, 1, 1)

    'Bail if rectangle is empty
    If R.IsEmpty Then
      Return
    End If

    If Not OK2Paint Then
      Return
    End If

    Dim P As Pen = New Pen(Brushes.Black, 3)
    e.Graphics.DrawRectangle(P, R)
    ' Draw image based on rectangle.
    e.Graphics.DrawImage(I, R)

    P.Dispose()

  End Sub

  Private Sub DrawBox(ByVal sender As System.Object, _
                      ByVal m As MouseEventArgs) Handles MyBase.MouseMove
    'Prints the x,y coordinates directly on the screen
    Dim G As Graphics = Me.CreateGraphics()
    Dim TextR As RectangleF = New RectangleF(10, Me.Height - 50, 100, 20)
    Dim B As SolidBrush = New SolidBrush(Me.BackColor)

    G.FillRectangle(B, TextR)
    G.DrawString(m.X.ToString() + ", " + m.Y.ToString(), _
                  New Font("Arial", 10), _
                  Brushes.Black, TextR, _
                  StringFormat.GenericDefault)

    B.Dispose()

    'Draw the box as the mouse drags
    If m.Button = MouseButtons.Left Then
      If Not Box.IsEmpty Then
        Dim P As Pen = New Pen(New SolidBrush(Me.BackColor), 1)
        G.DrawRectangle(P, Box)
        P.Dispose()
      End If
      Box = New Rectangle(R.X, R.Y, m.X - R.X, m.Y - R.Y)
      G.DrawRectangle(Pens.Black, Box)
    End If

  End Sub

  Private Sub StartBox(ByVal sender As System.Object, _
                       ByVal m As MouseEventArgs) Handles MyBase.MouseDown
    If m.Button = MouseButtons.Left Then
      R.X = m.X
      R.Y = m.Y
      OK2Paint = False
    End If
  End Sub

  Private Sub EndBox(ByVal sender As System.Object, _
                     ByVal m As MouseEventArgs) Handles MyBase.MouseUp
    R.Width = m.X - R.X
    R.Height = m.Y - R.Y
    OK2Paint = True
    Me.Refresh()
  End Sub

End Class
