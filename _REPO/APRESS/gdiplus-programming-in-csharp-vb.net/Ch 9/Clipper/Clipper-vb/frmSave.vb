Option Strict On

Imports System
Imports System.Drawing
Imports System.Drawing.Drawing2D
Imports System.Drawing.Imaging
Imports System.Drawing.Printing

Public Class frmSave
  Inherits System.Windows.Forms.Form

  ' /// <summary>
  ' /// Copyright Nicholas Symmonds 2002
  ' /// This software is for instructional purposes only.
  ' /// It may not be sold as is.
  ' /// 
  ' /// Allow the user to select a frame for the image before saving it.
  '/// </summary>

#Region "Class Local Storage"

  Private m_Pic As PictureBox
  Private m_bmp As Bitmap
  Private m_OriginalBmp As Bitmap
  Private Pv As PrintPreviewDialog
  Private Ps As PageSetupDialog
  Private Pd As PrintDocument
  Private Pr As PrintDialog
  Private FooterFont As Font = New Font("Arial", 8)
  Private PrintCount As Int32 = 0

#End Region

#Region " Windows Form Designer generated code "

  Public Sub New(ByVal bmp As Bitmap)
    MyBase.New()

    'This call is required by the Windows Form Designer.
    InitializeComponent()

    m_bmp = CType(bmp.Clone(), Bitmap)
    m_OriginalBmp = CType(bmp.Clone(), Bitmap)
    P1.BackgroundImage = GetPanelImage()
    P1.Dock = DockStyle.Fill

    m_Pic = New PictureBox()
    m_Pic.BorderStyle = BorderStyle.None
    m_Pic.SizeMode = PictureBoxSizeMode.AutoSize
    m_Pic.Image = m_bmp
    P1.Controls.Add(m_Pic)
    P1.Controls(0).Location = New Point(1, 1)

    'Set up the prnting 
    Pv = New PrintPreviewDialog()
    Ps = New PageSetupDialog()
    Pr = New PrintDialog()
    Pd = New PrintDocument()

    Pd.DocumentName = "ScreenShot"
    Pv.Document = Pd
    Ps.Document = Pd
    Pr.Document = Pd

    AddHandler Pd.BeginPrint, New PrintEventHandler(AddressOf Me.pd_BeginPrint)
    AddHandler Pd.PrintPage, New PrintPageEventHandler(AddressOf Me.pd_Print)

  End Sub

  'Form overrides dispose to clean up the component list.
  Protected Overloads Overrides Sub Dispose(ByVal disposing As Boolean)
    If disposing Then
      If Not (components Is Nothing) Then
        components.Dispose()
      End If
    End If
    P1.Dispose()
    MyBase.Dispose(disposing)
  End Sub

  'Required by the Windows Form Designer
  Private components As System.ComponentModel.IContainer

  'NOTE: The following procedure is required by the Windows Form Designer
  'It can be modified using the Windows Form Designer.  
  'Do not modify it using the code editor.
  Friend WithEvents mainMenu1 As System.Windows.Forms.MainMenu
  Friend WithEvents mnuFile As System.Windows.Forms.MenuItem
  Friend WithEvents mnuSave As System.Windows.Forms.MenuItem
  Friend WithEvents mnuClose As System.Windows.Forms.MenuItem
  Friend WithEvents NoMenu As System.Windows.Forms.MenuItem
  Friend WithEvents mnuAttr As System.Windows.Forms.MenuItem
  Friend WithEvents mnuBorder As System.Windows.Forms.MenuItem
  Friend WithEvents mnuPrint As System.Windows.Forms.MenuItem
  Friend WithEvents mnuPrintPreview As System.Windows.Forms.MenuItem
  Friend WithEvents mnuPrintNow As System.Windows.Forms.MenuItem
  Friend WithEvents P1 As System.Windows.Forms.Panel
  <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
    Me.mainMenu1 = New System.Windows.Forms.MainMenu()
    Me.mnuFile = New System.Windows.Forms.MenuItem()
    Me.mnuSave = New System.Windows.Forms.MenuItem()
    Me.mnuClose = New System.Windows.Forms.MenuItem()
    Me.NoMenu = New System.Windows.Forms.MenuItem()
    Me.mnuAttr = New System.Windows.Forms.MenuItem()
    Me.mnuBorder = New System.Windows.Forms.MenuItem()
    Me.mnuPrint = New System.Windows.Forms.MenuItem()
    Me.mnuPrintPreview = New System.Windows.Forms.MenuItem()
    Me.mnuPrintNow = New System.Windows.Forms.MenuItem()
    Me.P1 = New System.Windows.Forms.Panel()
    Me.SuspendLayout()
    '
    'mainMenu1
    '
    Me.mainMenu1.MenuItems.AddRange(New System.Windows.Forms.MenuItem() {Me.mnuFile, Me.NoMenu, Me.mnuPrint})
    '
    'mnuFile
    '
    Me.mnuFile.Index = 0
    Me.mnuFile.MenuItems.AddRange(New System.Windows.Forms.MenuItem() {Me.mnuSave, Me.mnuClose})
    Me.mnuFile.Text = "&File"
    '
    'mnuSave
    '
    Me.mnuSave.Index = 0
    Me.mnuSave.Text = "&Save"
    '
    'mnuClose
    '
    Me.mnuClose.Index = 1
    Me.mnuClose.Text = "&Close"
    '
    'NoMenu
    '
    Me.NoMenu.Index = 1
    Me.NoMenu.MenuItems.AddRange(New System.Windows.Forms.MenuItem() {Me.mnuAttr, Me.mnuBorder})
    Me.NoMenu.Text = "&Attributes"
    '
    'mnuAttr
    '
    Me.mnuAttr.Index = 0
    Me.mnuAttr.Text = "Resolution"
    '
    'mnuBorder
    '
    Me.mnuBorder.Index = 1
    Me.mnuBorder.Text = "Border"
    '
    'mnuPrint
    '
    Me.mnuPrint.Index = 2
    Me.mnuPrint.MenuItems.AddRange(New System.Windows.Forms.MenuItem() {Me.mnuPrintPreview, Me.mnuPrintNow})
    Me.mnuPrint.Text = "&Print"
    '
    'mnuPrintPreview
    '
    Me.mnuPrintPreview.Index = 0
    Me.mnuPrintPreview.Text = "Pre&view"
    '
    'mnuPrintNow
    '
    Me.mnuPrintNow.Index = 1
    Me.mnuPrintNow.Text = "&Print"
    '
    'P1
    '
    Me.P1.AutoScroll = True
    Me.P1.BackColor = System.Drawing.SystemColors.Control
    Me.P1.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D
    Me.P1.Location = New System.Drawing.Point(12, 16)
    Me.P1.Name = "P1"
    Me.P1.Size = New System.Drawing.Size(768, 520)
    Me.P1.TabIndex = 1
    '
    'frmSave
    '
    Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
    Me.ClientSize = New System.Drawing.Size(792, 573)
    Me.Controls.AddRange(New System.Windows.Forms.Control() {Me.P1})
    Me.Menu = Me.mainMenu1
    Me.Name = "frmSave"
    Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen
    Me.Text = "Save Image"
    Me.ResumeLayout(False)

  End Sub

#End Region

  Private Sub frmSave_Load(ByVal sender As System.Object, _
                           ByVal e As System.EventArgs) Handles MyBase.Load

  End Sub

  Private Function GetPanelImage() As Image
    Dim i As Image = New Bitmap(50, 50)
    Dim G As Graphics = Graphics.FromImage(i)

    Try
      'No need for high quality here.  We need Speed!!!
      G.SmoothingMode = SmoothingMode.HighSpeed
      Dim B As Brush = New HatchBrush(HatchStyle.Cross, _
                                      Color.Cyan, Color.LightCyan)
      G.FillRectangle(B, 0, 0, i.Width, i.Height)
    Finally
      G.Dispose()
    End Try

    Return i
  End Function

#Region "Printer routines"

  Private Sub pd_BeginPrint(ByVal sender As Object, ByVal e As PrintEventArgs)
    Pd.DocumentName = "ScreenShot " + (++PrintCount).ToString()
  End Sub

  Private Sub pd_Print(ByVal sender As Object, ByVal e As PrintPageEventArgs)
    Dim G As Graphics = e.Graphics
    Dim LeftMargin As Single = e.MarginBounds.Left
    Dim TopMargin As Single = e.MarginBounds.Top
    Dim BottomMargin As Single = e.MarginBounds.Bottom

    Dim sf As StringFormat = New StringFormat()
    sf.Alignment = StringAlignment.Far
    sf.LineAlignment = StringAlignment.Center

    Dim Border As Rectangle = e.MarginBounds
    Border.Inflate(1, 1)
    Dim Footer As RectangleF = New RectangleF(e.MarginBounds.Left, _
                                      e.MarginBounds.Bottom, _
                                      e.MarginBounds.Width, _
                                      e.PageBounds.Bottom - e.MarginBounds.Bottom)

    'Type in the footer
    G.DrawString(Pd.DocumentName, FooterFont, Brushes.Black, Footer, sf)
    sf.Alignment = StringAlignment.Near
    G.DrawString(DateTime.Now.ToLongDateString(), FooterFont, Brushes.Black, Footer, sf)

    'Draw the rectangle and the image.  Image is stretched to fit!!!
    G.DrawRectangle(Pens.Black, Border)
    G.DrawImage(m_bmp, e.MarginBounds)

    sf.Dispose()

  End Sub

  Private Sub mnuPrintPreview_Click(ByVal sender As Object, ByVal e As System.EventArgs)
    Pv.WindowState = FormWindowState.Maximized
    Pv.ShowDialog()
  End Sub

  Private Sub mnuPrintNow_Click(ByVal sender As Object, ByVal e As System.EventArgs)
    If Pr.ShowDialog() = DialogResult.OK Then
      Pd.Print()
    End If
  End Sub

#End Region

  Private Sub mnuSave_Click(ByVal sender As System.Object, _
                            ByVal e As System.EventArgs) Handles mnuSave.Click
    Dim sd As SaveFileDialog = New SaveFileDialog()

    sd.Filter = "Bitmap (*.bmp)|*.bmp|" + _
                "JPEG (*.jpg)|*.jpg|" + _
                "GIF (*.Gif)|*.gif|" + _
                "TIFF (*.tif)|*.tif|" + _
                "PNG (*.png)|*.png|" + _
                "EMF (*.emf)|*.emf"
    sd.FilterIndex = 1
    sd.RestoreDirectory = True
    sd.AddExtension = True

    If sd.ShowDialog() = DialogResult.OK Then
      If sd.FileName.Length <> 0 Then
        Select Case (sd.FilterIndex)
          Case 1
            'Save as bitmap
            m_bmp.Save(sd.FileName, ImageFormat.Bmp)
          Case 2
            'Save as JPEG
            m_bmp.Save(sd.FileName, ImageFormat.Jpeg)
          Case 3
            'Save as GIF
            m_bmp.Save(sd.FileName, ImageFormat.Gif)
          Case 4
            'Save as TIFF
            m_bmp.Save(sd.FileName, ImageFormat.Tiff)
          Case 5
            'Save as PNG
            m_bmp.Save(sd.FileName, ImageFormat.Png)
          Case 6
            'Save as EMF
            m_bmp.Save(sd.FileName, ImageFormat.Emf)
        End Select
      End If
    End If

  End Sub

  Private Sub mnuClose_Click(ByVal sender As System.Object, _
                             ByVal e As System.EventArgs) Handles mnuClose.Click
    Me.Close()
  End Sub

  Private Sub mnuAttr_Click(ByVal sender As System.Object, _
                            ByVal e As System.EventArgs) _
                            Handles mnuAttr.Click
    Dim frm As Attributes = New Attributes(m_bmp.HorizontalResolution, _
                                           m_bmp.Size)
    frm.ShowDialog()
    m_bmp.SetResolution(frm.SaveRes, frm.SaveRes)
  End Sub

  Private Sub mnuBorder_Click(ByVal sender As System.Object, _
                              ByVal e As System.EventArgs) _
                              Handles mnuBorder.Click
    If mnuBorder.Checked = False Then
      Dim G As Graphics = Graphics.FromImage(m_bmp)
      Dim P As Pen = New Pen(Brushes.Black, 2)
      Try
        G.DrawRectangle(P, New Rectangle(0, 0, m_bmp.Size.Width, _
                                         m_bmp.Size.Height))
        m_Pic.Image = m_bmp
        mnuBorder.Checked = True
      Finally
        G.Dispose()
        P.Dispose()
      End Try
    Else
      m_bmp = CType(m_OriginalBmp.Clone(), Bitmap)
      m_Pic.Image = m_bmp
      mnuBorder.Checked = False
    End If

  End Sub

  Private Sub mnuPrintPreview_Click_1(ByVal sender As System.Object, _
                                      ByVal e As System.EventArgs) _
                                      Handles mnuPrintPreview.Click
    Pv.WindowState = FormWindowState.Maximized
    Pv.ShowDialog()
  End Sub

  Private Sub mnuPrintNow_Click_1(ByVal sender As System.Object, _
                                  ByVal e As System.EventArgs) _
                                  Handles mnuPrintNow.Click
    If Pr.ShowDialog() = DialogResult.OK Then
      Pd.Print()
    End If
  End Sub

End Class
