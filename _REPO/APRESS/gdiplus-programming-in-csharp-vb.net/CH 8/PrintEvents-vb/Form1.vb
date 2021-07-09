Option Strict On

Imports System
Imports System.IO
Imports System.Drawing
Imports System.Drawing.Printing

Public Class Form1
  Inherits System.Windows.Forms.Form

  Private PrintFont As Font
  Private PrintStream As StreamReader

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
      If Not PrintFont Is Nothing Then
        PrintFont.Dispose()
      End If

    End If
    MyBase.Dispose(disposing)
  End Sub

  'Required by the Windows Form Designer
  Private components As System.ComponentModel.IContainer

  'NOTE: The following procedure is required by the Windows Form Designer
  'It can be modified using the Windows Form Designer.  
  'Do not modify it using the code editor.
  Friend WithEvents lblEvents As System.Windows.Forms.Label
  Friend WithEvents cmdPrint As System.Windows.Forms.Button
  <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
    Me.lblEvents = New System.Windows.Forms.Label()
    Me.cmdPrint = New System.Windows.Forms.Button()
    Me.SuspendLayout()
    '
    'lblEvents
    '
    Me.lblEvents.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D
    Me.lblEvents.Location = New System.Drawing.Point(22, 17)
    Me.lblEvents.Name = "lblEvents"
    Me.lblEvents.Size = New System.Drawing.Size(248, 248)
    Me.lblEvents.TabIndex = 3
    '
    'cmdPrint
    '
    Me.cmdPrint.Location = New System.Drawing.Point(102, 281)
    Me.cmdPrint.Name = "cmdPrint"
    Me.cmdPrint.Size = New System.Drawing.Size(80, 24)
    Me.cmdPrint.TabIndex = 2
    Me.cmdPrint.Text = "Print"
    '
    'Form1
    '
    Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
    Me.ClientSize = New System.Drawing.Size(292, 323)
    Me.Controls.AddRange(New System.Windows.Forms.Control() {Me.lblEvents, Me.cmdPrint})
    Me.MaximizeBox = False
    Me.MinimizeBox = False
    Me.Name = "Form1"
    Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen
    Me.Text = "Form1"
    Me.ResumeLayout(False)

  End Sub

#End Region


  ' Print the file.
  Public Sub Print_It()
    Try
      'Get the file to print
      PrintStream = New StreamReader("Test.txt")
      Try
        PrintFont = New Font("Arial", 10)
        Dim pd As PrintDocument = New PrintDocument()

        'Assign my overloaded version of the standard print controller
        'Send it a reference to the label so it can tell us what is 
        'going on.
        pd.PrintController = New MyPrintController(lblEvents)

        'Install event handlers
        AddHandler pd.BeginPrint, _
                    New PrintEventHandler(AddressOf Me.pd_StartPrint)
        AddHandler pd.PrintPage, _
                    New PrintPageEventHandler(AddressOf Me.pd_PrintPage)
        AddHandler pd.EndPrint, _
                    New PrintEventHandler(AddressOf Me.pd_EndPrint)

        'Print the document.
        pd.Print()
      Finally
        PrintStream.Close()
      End Try
    Catch ex As Exception
      MessageBox.Show(ex.Message)
    End Try
  End Sub

  Private Sub pd_StartPrint(ByVal sender As Object, ByVal ev As PrintEventArgs)
    lblEvents.Text += "PrintDocument: BeginPrint" + vbCrLf
  End Sub

  ' The PrintPage event is raised for each page to be printed.
  Private Sub pd_PrintPage(ByVal sender As Object, _
                           ByVal ev As PrintPageEventArgs)
    Dim linesPerPage As Single = 0
    Dim yPos As Single = 0
    Dim count As Int32 = 0
    Dim leftMargin As Single = ev.MarginBounds.Left
    Dim topMargin As Single = ev.MarginBounds.Top
    Dim line As String = String.Empty

    lblEvents.Text += "PrintDocument:  PagePrint" + vbCrLf

    ' Calculate the number of lines per page.
    linesPerPage = ev.MarginBounds.Height / PrintFont.GetHeight(ev.Graphics)

    ' Iterate over the file, printing each line. Use a basic StringFormat
    While count < linesPerPage
      line = PrintStream.ReadLine()
      If line Is Nothing Then
        Exit While
      End If
      'Calculate vertical position of the line.
      yPos = topMargin + count * PrintFont.GetHeight(ev.Graphics)
      'This is the graphics object obtained by the PrintController
      'OnStartPage method.  We are drawing to the printer!!
      ev.Graphics.DrawString(line, PrintFont, Brushes.Black, leftMargin, _
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

  Private Sub pd_EndPrint(ByVal sender As Object, ByVal ev As PrintEventArgs)
    lblEvents.Text += "PrintDocument: EndPrinting" + vbCrLf
  End Sub

  Private Sub cmdPrint_Click(ByVal sender As System.Object, _
                             ByVal e As System.EventArgs) Handles cmdPrint.Click
    Print_It()
  End Sub
End Class
