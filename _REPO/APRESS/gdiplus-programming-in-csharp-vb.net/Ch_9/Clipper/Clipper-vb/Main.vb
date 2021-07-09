Option Strict On

Imports System
Imports System.Drawing
Imports System.Drawing.Drawing2D

Public Class Form1
  Inherits System.Windows.Forms.Form

#Region "Class Local Storage"
  Dim bmp As Bitmap
  Dim trayIcon As NotifyIcon = New NotifyIcon()
  Dim trayIconMenu As ContextMenu = New ContextMenu()
#End Region

#Region " Windows Form Designer generated code "

  Public Sub New()
    MyBase.New()

    'This call is required by the Windows Form Designer.
    InitializeComponent()

    Me.Icon = New Icon("icon.ico")
    Me.BackColor = Color.BlanchedAlmond
    Me.TransparencyKey = Me.BackColor
    Me.cmdCatch.BackColor = Color.Tomato
    Me.cmdQuit.BackColor = Color.Tomato

    trayIconMenu.MenuItems.Add("Catch", _
                               New EventHandler(AddressOf Me.cmdCatch_Click))
    trayIconMenu.MenuItems.Add("Always On Top", _
                               New EventHandler(AddressOf Me.ClipperOnTop))
    trayIconMenu.MenuItems.Add("Show", _
                               New EventHandler(AddressOf Me.Show_Main))
    trayIconMenu.MenuItems.Add("Quit", _
                               New EventHandler(AddressOf Me.cmdQuit_Click))

    trayIcon.Icon = New Icon("icon.ico")
    trayIcon.Text = "Clipper - Screen Capture"
    trayIcon.ContextMenu = trayIconMenu
    trayIcon.Visible = True

    Me.ShowInTaskbar = False

  End Sub

  'Form overrides dispose to clean up the component list.
  Protected Overloads Overrides Sub Dispose(ByVal disposing As Boolean)
    If disposing Then
      If Not (components Is Nothing) Then
        components.Dispose()
      End If
    End If
    If Not bmp Is Nothing Then
      bmp.Dispose()
    End If

    trayIcon.Dispose()
    MyBase.Dispose(disposing)
  End Sub

  'Required by the Windows Form Designer
  Private components As System.ComponentModel.IContainer

  'NOTE: The following procedure is required by the Windows Form Designer
  'It can be modified using the Windows Form Designer.  
  'Do not modify it using the code editor.
  Friend WithEvents cmdQuit As System.Windows.Forms.Button
  Friend WithEvents cmdCatch As System.Windows.Forms.Button
  <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
    Me.cmdQuit = New System.Windows.Forms.Button()
    Me.cmdCatch = New System.Windows.Forms.Button()
    Me.SuspendLayout()
    '
    'cmdQuit
    '
    Me.cmdQuit.Location = New System.Drawing.Point(143, 20)
    Me.cmdQuit.Name = "cmdQuit"
    Me.cmdQuit.Size = New System.Drawing.Size(64, 32)
    Me.cmdQuit.TabIndex = 3
    Me.cmdQuit.Text = "&Quit"
    '
    'cmdCatch
    '
    Me.cmdCatch.ImageAlign = System.Drawing.ContentAlignment.MiddleLeft
    Me.cmdCatch.Location = New System.Drawing.Point(15, 20)
    Me.cmdCatch.Name = "cmdCatch"
    Me.cmdCatch.Size = New System.Drawing.Size(88, 32)
    Me.cmdCatch.TabIndex = 2
    Me.cmdCatch.Text = "&Capture"
    '
    'Form1
    '
    Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
    Me.ClientSize = New System.Drawing.Size(222, 73)
    Me.Controls.AddRange(New System.Windows.Forms.Control() {Me.cmdQuit, Me.cmdCatch})
    Me.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle
    Me.Name = "Form1"
    Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen
    Me.Text = "Form1"
    Me.ResumeLayout(False)

  End Sub

#End Region

  Private Sub Form1_Load(ByVal sender As System.Object, _
                         ByVal e As System.EventArgs) Handles MyBase.Load

  End Sub

  Protected Overrides Sub OnResize(ByVal e As EventArgs)
    MyBase.OnResize(e)
    If Me.WindowState = FormWindowState.Minimized Then
      Me.Opacity = 0
    Else
      Me.Opacity = 1
    End If
  End Sub

  Private Sub cmdCatch_Click(ByVal sender As System.Object, _
                             ByVal e As System.EventArgs) Handles cmdCatch.Click
    bmp = DeskTop.Capture()

    'Make the form invisible
    Me.Opacity = 0
    Dim bmpShow As dtBitmap = New dtBitmap(bmp)
    bmp = bmpShow.GetBitmap

    If Not bmp Is Nothing Then
      Dim frm As frmSave = New frmSave(bmp)
      frm.ShowDialog()
    End If
    Me.Opacity = 1

  End Sub

  Private Sub cmdQuit_Click(ByVal sender As System.Object, _
                            ByVal e As System.EventArgs) Handles cmdQuit.Click
    Me.Close()
  End Sub

  Private Sub Show_Main(ByVal sender As Object, ByVal e As EventArgs)
    Me.Visible = True
    Me.WindowState = FormWindowState.Normal
  End Sub

  Private Sub ClipperOnTop(ByVal sender As Object, ByVal e As EventArgs)
    If trayIconMenu.MenuItems(1).Checked Then
      trayIconMenu.MenuItems(1).Checked = False
      Me.TopMost = False
    Else
      trayIconMenu.MenuItems(1).Checked = True
      Me.TopMost = True
    End If
  End Sub

End Class
