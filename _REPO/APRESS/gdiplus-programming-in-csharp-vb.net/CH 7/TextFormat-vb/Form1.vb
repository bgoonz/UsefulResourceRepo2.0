Option Strict On

Imports System.Drawing
Imports System.Drawing.Drawing2D
Imports System.Drawing.Text
Imports System.Text

Public Class Form1
  Inherits System.Windows.Forms.Form

#Region "Class Local Variables"
  Dim UserRect As Rectangle = Rectangle.Empty
  Dim RectStarted As Boolean = False
  Dim RectFinished As Boolean = False
  Dim Typing As Boolean = False
  Dim InsideRect As Boolean = False
  Dim ClientCursor As Cursor = Cursors.Default
  Dim RectText As String = String.Empty
  Dim BoxFormat As StringFormat = StringFormat.GenericDefault
#End Region


#Region " Windows Form Designer generated code "

  Public Sub New()
    MyBase.New()

    'This call is required by the Windows Form Designer.
    InitializeComponent()

    'All the mouse move events use the same delegate
    AddHandler cmdNew.MouseMove, New MouseEventHandler(AddressOf _
                                                       Me.Button_MouseMove)
    AddHandler cmdLeft.MouseMove, New MouseEventHandler(AddressOf _
                                                        Me.Button_MouseMove)
    AddHandler cmdTop.MouseMove, New MouseEventHandler(AddressOf _
                                                       Me.Button_MouseMove)

    AddHandler Me.KeyPress, New KeyPressEventHandler(AddressOf Me.FormKeyPress)

    BoxFormat.Alignment = StringAlignment.Center
    BoxFormat.LineAlignment = StringAlignment.Center

  End Sub

  'Form overrides dispose to clean up the component list.
  Protected Overloads Overrides Sub Dispose(ByVal disposing As Boolean)
    If disposing Then
      If Not (components Is Nothing) Then
        components.Dispose()
      End If
    End If
    ClientCursor.Dispose()
    MyBase.Dispose(disposing)
  End Sub

  'Required by the Windows Form Designer
  Private components As System.ComponentModel.IContainer

  'NOTE: The following procedure is required by the Windows Form Designer
  'It can be modified using the Windows Form Designer.  
  'Do not modify it using the code editor.
  Friend WithEvents cmdTop As System.Windows.Forms.Button
  Friend WithEvents cmdLeft As System.Windows.Forms.Button
  Friend WithEvents cmdNew As System.Windows.Forms.Button
  <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
    Me.cmdTop = New System.Windows.Forms.Button()
    Me.cmdLeft = New System.Windows.Forms.Button()
    Me.cmdNew = New System.Windows.Forms.Button()
    Me.SuspendLayout()
    '
    'cmdTop
    '
    Me.cmdTop.Location = New System.Drawing.Point(256, 328)
    Me.cmdTop.Name = "cmdTop"
    Me.cmdTop.Size = New System.Drawing.Size(104, 24)
    Me.cmdTop.TabIndex = 5
    Me.cmdTop.Text = "Top Left Align"
    '
    'cmdLeft
    '
    Me.cmdLeft.Location = New System.Drawing.Point(112, 328)
    Me.cmdLeft.Name = "cmdLeft"
    Me.cmdLeft.Size = New System.Drawing.Size(104, 24)
    Me.cmdLeft.TabIndex = 4
    Me.cmdLeft.Text = "Center Left Align"
    '
    'cmdNew
    '
    Me.cmdNew.Location = New System.Drawing.Point(24, 328)
    Me.cmdNew.Name = "cmdNew"
    Me.cmdNew.Size = New System.Drawing.Size(56, 24)
    Me.cmdNew.TabIndex = 3
    Me.cmdNew.Text = "&New"
    '
    'Form1
    '
    Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
    Me.ClientSize = New System.Drawing.Size(392, 373)
    Me.Controls.AddRange(New System.Windows.Forms.Control() {Me.cmdTop, Me.cmdLeft, Me.cmdNew})
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

  End Sub

  Protected Overrides Sub OnPaint(ByVal e As PaintEventArgs)
    Dim G As Graphics = e.Graphics
    Dim P As Pen = New Pen(Brushes.Black, 1)

    If Not RectFinished Then
      P.DashStyle = DashStyle.Dash
    End If

    G.DrawRectangle(P, UserRect)

    If RectFinished And ClientCursor Is Cursors.IBeam Then
      G.DrawString(RectText, New Font("Arial", 16), Brushes.Black, _
                   RectangleF.op_Implicit(UserRect), BoxFormat)
    End If
    P.Dispose()

    MyBase.OnPaint(e)
  End Sub



  Private Sub FormKeyPress(ByVal sender As Object, ByVal e As KeyPressEventArgs)
    'Handle backspace key
    If e.KeyChar = vbBack Then
      If Not RectText = String.Empty Then
        RectText = RectText.Remove(RectText.Length - 1, 1)
      End If
    Else
      RectText += e.KeyChar
    End If
    Invalidate()
  End Sub


  Protected Overrides Sub OnMouseDown(ByVal e As MouseEventArgs)
    'If left button then start the rectangle
    If e.Button = MouseButtons.Left Then
      If UserRect.IsEmpty Then
        UserRect.X = e.X
        UserRect.Y = e.Y
        RectStarted = True
        RectFinished = False
      End If
    ElseIf e.Button = MouseButtons.Right Then
      'If right button then start the edit
      If Not UserRect.IsEmpty Then
        ClientCursor = Cursors.IBeam
        Me.Cursor = ClientCursor
        Dim pos As Point = New Point(UserRect.X + CInt(UserRect.Width / 2), _
                                 UserRect.Y + CInt(UserRect.Height / 2))
        'Translate cursor screen postion to position on form
        Dim Offset As Int32 = Me.Height - Me.ClientRectangle.Height
        pos = Point.op_Addition(pos, New Size(Me.Location.X, _
                                              Me.Location.Y + Offset))
        Cursor.Position = pos
        Typing = True
        Me.KeyPreview = True
      End If
    End If

    MyBase.OnMouseDown(e)
  End Sub

  Protected Overrides Sub OnMouseUp(ByVal e As MouseEventArgs)
    MyBase.OnMouseUp(e)

    ' A negative rectangle is not allowed.
    ' Mouse_down then Mouse_up without Mouse_move is not allowed
    If UserRect.Width <= 0 Or UserRect.Height <= 0 Then
      UserRect = Rectangle.Empty
    End If

    'Rectangle has ended
    RectStarted = False
    RectFinished = True
    Invalidate()
  End Sub

  Protected Overrides Sub OnMouseMove(ByVal e As MouseEventArgs)
    MyBase.OnMove(e)

    'Let program know if cursor is inside user rectangle
    InsideRect = False
    If Not UserRect.IsEmpty Then
      If UserRect.Contains(New Point(e.X, e.Y)) Then
        InsideRect = True
      End If
    End If

    Me.Cursor = ClientCursor
    'Increase the size of the rectangle each time the mouse moves.
    If RectStarted Then
      Dim s As Size = New Size(e.X - UserRect.X, e.Y - UserRect.Y)
      UserRect.Size = s
      Invalidate()
    End If
  End Sub



  Private Sub Button_MouseMove(ByVal sender As Object, ByVal e As MouseEventArgs)
    Me.Cursor = Cursors.Default
  End Sub

  Private Sub cmdNew_Click(ByVal sender As System.Object, _
                           ByVal e As System.EventArgs) Handles cmdNew.Click
    If Typing And InsideRect Then
      Return
    End If

    ' Start a new blank form
    UserRect = Rectangle.Empty
    ClientCursor = Cursors.Default
    RectStarted = False
    RectFinished = False
    RectText = String.Empty
    Me.KeyPreview = False
    Invalidate()
  End Sub

  Private Sub cmdLeft_Click(ByVal sender As System.Object, _
                            ByVal e As System.EventArgs) Handles cmdLeft.Click
    'Change horizontal alignement and redraw
    BoxFormat.Alignment = StringAlignment.Near
    Invalidate()
  End Sub

  Private Sub cmdTop_Click(ByVal sender As System.Object, _
                           ByVal e As System.EventArgs) Handles cmdTop.Click
    'Chnage vertical alignment and redraw
    BoxFormat.LineAlignment = StringAlignment.Near
    Invalidate()
  End Sub


  Private Sub bs()




  End Sub

End Class
