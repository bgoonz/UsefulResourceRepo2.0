Option Strict On

Imports System
Imports System.Drawing
Imports System.Drawing.Drawing2D

Public Class SaveMe
  Inherits System.Windows.Forms.Form

  Private mPath As GraphicsPath

#Region " Windows Form Designer generated code "

  Public Sub New(ByVal p As GraphicsPath)
    MyBase.New()

    'This call is required by the Windows Form Designer.
    InitializeComponent()

    mPath = p
    Me.txtSave.TabIndex = 0
    Me.cmdSave.TabIndex = 1

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
  Friend WithEvents txtSave As System.Windows.Forms.TextBox
  Friend WithEvents cmdSave As System.Windows.Forms.Button
  <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
    Me.txtSave = New System.Windows.Forms.TextBox()
    Me.cmdSave = New System.Windows.Forms.Button()
    Me.SuspendLayout()
    '
    'txtSave
    '
    Me.txtSave.Location = New System.Drawing.Point(8, 14)
    Me.txtSave.Name = "txtSave"
    Me.txtSave.Size = New System.Drawing.Size(176, 20)
    Me.txtSave.TabIndex = 3
    Me.txtSave.Text = ""
    '
    'cmdSave
    '
    Me.cmdSave.Location = New System.Drawing.Point(112, 46)
    Me.cmdSave.Name = "cmdSave"
    Me.cmdSave.Size = New System.Drawing.Size(72, 32)
    Me.cmdSave.TabIndex = 2
    Me.cmdSave.Text = "&Save"
    '
    'SaveMe
    '
    Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
    Me.ClientSize = New System.Drawing.Size(192, 93)
    Me.Controls.AddRange(New System.Windows.Forms.Control() {Me.txtSave, Me.cmdSave})
    Me.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedDialog
    Me.MaximizeBox = False
    Me.MinimizeBox = False
    Me.Name = "SaveMe"
    Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen
    Me.Text = "SaveMe"
    Me.ResumeLayout(False)

  End Sub

#End Region

  Private Sub SaveMe_Load(ByVal sender As System.Object, _
                          ByVal e As System.EventArgs) Handles MyBase.Load

  End Sub

  Private Sub cmdSave_Click(ByVal sender As System.Object, _
                            ByVal e As System.EventArgs) Handles cmdSave.Click
    If txtSave.Text <> String.Empty And mPath.PointCount <> 0 Then
      WindowPath.SavePath(txtSave.Text + ".pth", mPath)
    End If

    Me.Close()
  End Sub

End Class
