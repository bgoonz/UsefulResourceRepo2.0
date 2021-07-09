Option Strict On

Imports System
Imports System.IO
Imports System.Drawing
Imports System.Drawing.Printing

Public Class Form1
  Inherits System.Windows.Forms.Form

#Region "Class Local Storage"
  Private Pd As PrintDocument
  Private Pf As Font
  Private file As TextReader
  Private Pages As Int32 = 0
#End Region


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
  Friend WithEvents label3 As System.Windows.Forms.Label
  Friend WithEvents lstRes As System.Windows.Forms.ListBox
  Friend WithEvents label2 As System.Windows.Forms.Label
  Friend WithEvents lstPaper As System.Windows.Forms.ListBox
  Friend WithEvents cmdStartPrint As System.Windows.Forms.Button
  Friend WithEvents label1 As System.Windows.Forms.Label
  Friend WithEvents cmbPrinters As System.Windows.Forms.ComboBox
  <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
    Me.label3 = New System.Windows.Forms.Label()
    Me.lstRes = New System.Windows.Forms.ListBox()
    Me.label2 = New System.Windows.Forms.Label()
    Me.lstPaper = New System.Windows.Forms.ListBox()
    Me.cmdStartPrint = New System.Windows.Forms.Button()
    Me.label1 = New System.Windows.Forms.Label()
    Me.cmbPrinters = New System.Windows.Forms.ComboBox()
    Me.SuspendLayout()
    '
    'label3
    '
    Me.label3.Location = New System.Drawing.Point(17, 92)
    Me.label3.Name = "label3"
    Me.label3.Size = New System.Drawing.Size(256, 16)
    Me.label3.TabIndex = 13
    Me.label3.Text = "Printer Resolution"
    '
    'lstRes
    '
    Me.lstRes.Location = New System.Drawing.Point(17, 108)
    Me.lstRes.Name = "lstRes"
    Me.lstRes.Size = New System.Drawing.Size(256, 56)
    Me.lstRes.TabIndex = 12
    '
    'label2
    '
    Me.label2.Location = New System.Drawing.Point(19, 12)
    Me.label2.Name = "label2"
    Me.label2.Size = New System.Drawing.Size(256, 16)
    Me.label2.TabIndex = 11
    Me.label2.Text = "Paper Size"
    '
    'lstPaper
    '
    Me.lstPaper.Location = New System.Drawing.Point(17, 28)
    Me.lstPaper.Name = "lstPaper"
    Me.lstPaper.Size = New System.Drawing.Size(256, 56)
    Me.lstPaper.TabIndex = 10
    '
    'cmdStartPrint
    '
    Me.cmdStartPrint.Location = New System.Drawing.Point(89, 228)
    Me.cmdStartPrint.Name = "cmdStartPrint"
    Me.cmdStartPrint.Size = New System.Drawing.Size(88, 32)
    Me.cmdStartPrint.TabIndex = 9
    Me.cmdStartPrint.Text = "Start Print"
    '
    'label1
    '
    Me.label1.Location = New System.Drawing.Point(17, 180)
    Me.label1.Name = "label1"
    Me.label1.Size = New System.Drawing.Size(256, 16)
    Me.label1.TabIndex = 8
    Me.label1.Text = "Installed Printers"
    '
    'cmbPrinters
    '
    Me.cmbPrinters.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList
    Me.cmbPrinters.Location = New System.Drawing.Point(17, 196)
    Me.cmbPrinters.Name = "cmbPrinters"
    Me.cmbPrinters.Size = New System.Drawing.Size(256, 21)
    Me.cmbPrinters.TabIndex = 7
    '
    'Form1
    '
    Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
    Me.ClientSize = New System.Drawing.Size(292, 273)
    Me.Controls.AddRange(New System.Windows.Forms.Control() {Me.label3, Me.lstRes, Me.label2, Me.lstPaper, Me.cmdStartPrint, Me.label1, Me.cmbPrinters})
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
    Init()
  End Sub

  Private Sub cmdStartPrint_Click(ByVal sender As System.Object, _
                                  ByVal e As System.EventArgs) _
                                  Handles cmdStartPrint.Click
    Try
      file = New StreamReader("Test.txt")
      Try
        'Create the document and give it a somewhat unique name
        Pd = New PrintDocument()
        Pd.DocumentName = DateTime.Now.Millisecond.ToString()

        'Install event handlers
        AddHandler Pd.BeginPrint, _
                    New PrintEventHandler(AddressOf Me.BeginPrint)
        AddHandler Pd.PrintPage, _
                    New PrintPageEventHandler(AddressOf Me.PagePrint)
        AddHandler Pd.EndPrint, _
                    New PrintEventHandler(AddressOf Me.EndPrint)

        ' Print the document.
        Pd.Print()
      Finally
        file.Close()
        If Not Pd Is Nothing Then
          Pd.Dispose()
        End If
        If Not Pf Is Nothing Then
          Pf.Dispose()
        End If
      End Try
    Catch ex As Exception
      MessageBox.Show(ex.Message)
    End Try

  End Sub


  Private Sub Init()
    Dim p As String

    For Each p In PrinterSettings.InstalledPrinters
      cmbPrinters.Items.Add(p)
    Next

    If cmbPrinters.Items.Count > 0 Then
      cmbPrinters.SelectedIndex = 0
    End If

    'Add a few paper sizes to the list box
    lstPaper.Items.Add(PaperKind.A4.ToString())
    lstPaper.Items.Add(PaperKind.Letter.ToString())
    lstPaper.Items.Add(PaperKind.CSheet.ToString())

    'Add all the printer resolutions to the list box
    lstRes.Items.Add(PrinterResolutionKind.Custom.ToString())
    lstRes.Items.Add(PrinterResolutionKind.Draft.ToString())
    lstRes.Items.Add(PrinterResolutionKind.High.ToString())
    lstRes.Items.Add(PrinterResolutionKind.Low.ToString())
    lstRes.Items.Add(PrinterResolutionKind.Medium.ToString())
  End Sub

  Private Sub BeginPrint(ByVal sender As Object, ByVal ev As PrintEventArgs)
    Dim Psettings As PageSettings = Pd.DefaultPageSettings

    'Initialize the font
    Pf = New Font("Times New Roman", 10)

    Pd.PrinterSettings.PrinterName = cmbPrinters.SelectedItem.ToString()

    Dim ps As PaperSize
    For Each ps In Pd.PrinterSettings.PaperSizes
      If ps.PaperName = lstPaper.SelectedItem.ToString() Then
        Psettings.PaperSize = ps
        Exit For
      End If
    Next

    Dim pr As PrinterResolution
    For Each pr In Pd.PrinterSettings.PrinterResolutions
      If pr.Kind.ToString() = lstRes.SelectedItem.ToString() Then
        Psettings.PrinterResolution = pr
        Exit For
      End If
    Next

    'Make 1/4 inch margins all around
    Psettings.Margins = New Margins(25, 25, 25, 25)
    Pd.DefaultPageSettings = Psettings
    'Reset the pages 
    Pages = 0
  End Sub

  Private Sub EndPrint(ByVal sender As Object, ByVal ev As PrintEventArgs)
    Pf.Dispose()
  End Sub

  Private Sub PagePrint(ByVal sender As Object, ByVal ev As PrintPageEventArgs)
    Dim linesPerPage As Single = 0
    Dim yPos As Single = 0
    Dim count As Int32 = 0
    Dim leftMargin As Single = ev.MarginBounds.Left
    Dim topMargin As Single = ev.MarginBounds.Top
    Dim line As String = String.Empty

    'Keep track of pages as they are printed
    Pages += 1

    If Pages = 2 Then
      Try
        ev.PageSettings.Landscape = True
      Catch ex As Exception
        ev.PageSettings.Landscape = False
      End Try
    Else
      ev.PageSettings.Landscape = False
    End If

    ' Calculate the number of lines per page.
    linesPerPage = ev.MarginBounds.Height / Pf.GetHeight(ev.Graphics)

    ' Iterate over the file, printing each line. Use a basic StringFormat
    While count < linesPerPage
      line = file.ReadLine()
      If line Is Nothing Then
        Exit While
      End If
      'Calculate vertical position of the line.
      yPos = topMargin + count * Pf.GetHeight(ev.Graphics)
      'This is the graphics object obtained by the PrintController
      'OnStartPage method.  We are drawing to the printer!!
      ev.Graphics.DrawString(line, Pf, Brushes.Black, leftMargin, _
                              yPos, New StringFormat())
      count += 1
    End While

    ' If more lines exist, print another page.
    If Not line Is Nothing Then
      ev.HasMorePages = True
    Else
      ev.HasMorePages = False
    End If

  End Sub



End Class
