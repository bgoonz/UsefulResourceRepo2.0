Imports System
Imports System.Drawing
Imports System.Drawing.Drawing2D
Imports System.Drawing.Text
Imports System.Drawing.Printing

Public Class Form1
  Inherits System.Windows.Forms.Form

  Private Pv As PrintPreviewDialog
  Private Ps As PageSetupDialog
  Private Pd As PrintDocument
  Private Pr As PrintDialog

#Region " Windows Form Designer generated code "

  Public Sub New()
    MyBase.New()

    'This call is required by the Windows Form Designer.
    InitializeComponent()

    Pv = New PrintPreviewDialog()
    Ps = New PageSetupDialog()
    Pr = New PrintDialog()
    Pd = New PrintDocument()

    Pd.DocumentName = "My New Document"
    Pv.Document = Pd
    Ps.Document = Pd
    Pr.Document = Pd

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
  Friend WithEvents cmdQuit As System.Windows.Forms.Button
  Friend WithEvents MainMenu1 As System.Windows.Forms.MainMenu
  Friend WithEvents mnuFile As System.Windows.Forms.MenuItem
  Friend WithEvents mnuPreview As System.Windows.Forms.MenuItem
  Friend WithEvents mnuPrint As System.Windows.Forms.MenuItem
  Friend WithEvents mnuSetup As System.Windows.Forms.MenuItem
  <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
    Me.cmdQuit = New System.Windows.Forms.Button()
    Me.MainMenu1 = New System.Windows.Forms.MainMenu()
    Me.mnuFile = New System.Windows.Forms.MenuItem()
    Me.mnuSetup = New System.Windows.Forms.MenuItem()
    Me.mnuPreview = New System.Windows.Forms.MenuItem()
    Me.mnuPrint = New System.Windows.Forms.MenuItem()
    Me.SuspendLayout()
    '
    'cmdQuit
    '
    Me.cmdQuit.Location = New System.Drawing.Point(264, 280)
    Me.cmdQuit.Name = "cmdQuit"
    Me.cmdQuit.Size = New System.Drawing.Size(64, 32)
    Me.cmdQuit.TabIndex = 1
    Me.cmdQuit.Text = "Quit"
    '
    'MainMenu1
    '
    Me.MainMenu1.MenuItems.AddRange(New System.Windows.Forms.MenuItem() {Me.mnuFile})
    '
    'mnuFile
    '
    Me.mnuFile.Index = 0
    Me.mnuFile.MenuItems.AddRange(New System.Windows.Forms.MenuItem() {Me.mnuSetup, Me.mnuPreview, Me.mnuPrint})
    Me.mnuFile.Text = "File"
    '
    'mnuSetup
    '
    Me.mnuSetup.Index = 0
    Me.mnuSetup.Text = "Page Setup"
    '
    'mnuPreview
    '
    Me.mnuPreview.Index = 1
    Me.mnuPreview.Text = "Print Preview"
    '
    'mnuPrint
    '
    Me.mnuPrint.Index = 2
    Me.mnuPrint.Text = "mnuPrint"
    '
    'Form1
    '
    Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
    Me.ClientSize = New System.Drawing.Size(342, 323)
    Me.Controls.AddRange(New System.Windows.Forms.Control() {Me.cmdQuit})
    Me.MaximizeBox = False
    Me.Menu = Me.MainMenu1
    Me.MinimizeBox = False
    Me.Name = "Form1"
    Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen
    Me.Text = "Form1"
    Me.ResumeLayout(False)

  End Sub

#End Region

  Private Sub Form1_Load(ByVal sender As System.Object, _
                         ByVal e As System.EventArgs) Handles MyBase.Load
    AddHandler Pd.PrintPage, New PrintPageEventHandler(AddressOf Me.pd_Print)
  End Sub

  Protected Overrides Sub OnPaint(ByVal e As PaintEventArgs)
    DrawIt(e.Graphics)
  End Sub

  Private Sub DrawIt(ByVal G As Graphics)
    G.SmoothingMode = SmoothingMode.AntiAlias
    Dim P1 As Pen = New Pen(Brushes.Violet, 5)

    G.DrawString("Test of Print dialog and page setup", _
                  New Font("Time New Roman", 16), _
                  Brushes.Blue, _
                  New PointF(5, 5))
    G.DrawPie(P1, 10, 10, 150, 150, 28, 57)
    G.FillEllipse(Brushes.BurlyWood, 10, 200, Me.Width - 50, 50)
  End Sub

  Private Sub pd_Print(ByVal sender As Object, ByVal e As PrintPageEventArgs)
    DrawIt(e.Graphics)
  End Sub

  Private Sub mnuSetup_Click(ByVal sender As System.Object, _
                             ByVal e As System.EventArgs) _
                             Handles mnuSetup.Click
    Ps.ShowDialog()
    Pd.DefaultPageSettings = Ps.PageSettings
    Pd.PrinterSettings = Ps.PrinterSettings
  End Sub

  Private Sub mnuPreview_Click(ByVal sender As System.Object, _
                               ByVal e As System.EventArgs) _
                              Handles mnuPreview.Click
    Pv.WindowState = FormWindowState.Maximized
    Pv.ShowDialog()
  End Sub


  Private Sub cmdQuit_Click(ByVal sender As System.Object, _
                            ByVal e As System.EventArgs) _
                            Handles cmdQuit.Click
    Me.Dispose()
  End Sub

  Private Sub mnuPrint_Click(ByVal sender As System.Object, _
                             ByVal e As System.EventArgs) _
                            Handles mnuPrint.Click
    If Pr.ShowDialog() = DialogResult.OK Then
      Pd.Print()
    End If
  End Sub

End Class
