Imports System

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
  Friend WithEvents Label1 As System.Windows.Forms.Label
  <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
    Me.Label1 = New System.Windows.Forms.Label()
    Me.SuspendLayout()
    '
    'Label1
    '
    Me.Label1.Location = New System.Drawing.Point(48, 32)
    Me.Label1.Name = "Label1"
    Me.Label1.Size = New System.Drawing.Size(192, 16)
    Me.Label1.TabIndex = 0
    Me.Label1.Text = "Label1"
    '
    'Form1
    '
    Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
    Me.ClientSize = New System.Drawing.Size(312, 293)
    Me.Controls.AddRange(New System.Windows.Forms.Control() {Me.Label1})
    Me.Name = "Form1"
    Me.Text = "Form1"
    Me.ResumeLayout(False)

  End Sub

#End Region

  Private Sub Form1_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load

  End Sub


  Public Sub MyMouseMove(ByVal sender As Object, _
                      ByVal e As System.Windows.Forms.MouseEventArgs) _
                      Handles MyBase.MouseMove

    Label1.Text = "X= " + e.X.ToString() + ", Y= " + e.Y.ToString()
  End Sub


  Protected Overrides Sub OnMouseMove(ByVal e As MouseEventArgs)
    Dim x As Boolean = True
    Dim y As Boolean = False

    Try
      If x Then
        'Do some complicated stuff
        Exit Sub
      End If

      If y Then
        'Do some complicated stuff
        Exit Sub
      End If

      'Do some really complicated stuff here.
    Finally
      MyBase.OnMouseMove(e)
    End Try
  End Sub





End Class
