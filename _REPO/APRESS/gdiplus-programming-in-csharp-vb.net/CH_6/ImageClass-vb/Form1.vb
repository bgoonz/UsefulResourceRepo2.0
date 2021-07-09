Option Strict On

Imports System.Drawing
Imports System.Drawing.Drawing2D
Imports System.Drawing.Imaging

Public Class Form1
  Inherits System.Windows.Forms.Form

#Region "Class local variables"
  Dim Bmp As Bitmap
  Dim BMPContainer As RectangleF
#End Region

#Region " Windows Form Designer generated code "

  Public Sub New()
    MyBase.New()

    'This call is required by the Windows Form Designer.
    InitializeComponent()

    ofdBitmap.Filter = "Image Files(*.BMP;*.JPG;*.GIF)|*.BMP;*.JPG;*.GIF"
    ofdBitmap.InitialDirectory = ""

  End Sub

  'Form overrides dispose to clean up the component list.
  Protected Overloads Overrides Sub Dispose(ByVal disposing As Boolean)
    If disposing Then
      If Not (components Is Nothing) Then
        components.Dispose()
      End If
    End If
    If Not Bmp Is Nothing Then
      Bmp.Dispose()
    End If
    MyBase.Dispose(disposing)
  End Sub

  'Required by the Windows Form Designer
  Private components As System.ComponentModel.IContainer

  'NOTE: The following procedure is required by the Windows Form Designer
  'It can be modified using the Windows Form Designer.  
  'Do not modify it using the code editor.
  Friend WithEvents cmdSetRes As System.Windows.Forms.Button
  Friend WithEvents groupBox1 As System.Windows.Forms.GroupBox
  Friend WithEvents lblDIM As System.Windows.Forms.Label
  Friend WithEvents label8 As System.Windows.Forms.Label
  Friend WithEvents lblSize As System.Windows.Forms.Label
  Friend WithEvents label6 As System.Windows.Forms.Label
  Friend WithEvents lblFormat As System.Windows.Forms.Label
  Friend WithEvents lblVdpi As System.Windows.Forms.Label
  Friend WithEvents lblHdpi As System.Windows.Forms.Label
  Friend WithEvents lblWidth As System.Windows.Forms.Label
  Friend WithEvents lblHT As System.Windows.Forms.Label
  Friend WithEvents label5 As System.Windows.Forms.Label
  Friend WithEvents label4 As System.Windows.Forms.Label
  Friend WithEvents label3 As System.Windows.Forms.Label
  Friend WithEvents label2 As System.Windows.Forms.Label
  Friend WithEvents label1 As System.Windows.Forms.Label
  Friend WithEvents cmdOpen As System.Windows.Forms.Button
  Friend WithEvents ofdBitmap As System.Windows.Forms.OpenFileDialog
  <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
    Me.cmdSetRes = New System.Windows.Forms.Button()
    Me.groupBox1 = New System.Windows.Forms.GroupBox()
    Me.lblDIM = New System.Windows.Forms.Label()
    Me.label8 = New System.Windows.Forms.Label()
    Me.lblSize = New System.Windows.Forms.Label()
    Me.label6 = New System.Windows.Forms.Label()
    Me.lblFormat = New System.Windows.Forms.Label()
    Me.lblVdpi = New System.Windows.Forms.Label()
    Me.lblHdpi = New System.Windows.Forms.Label()
    Me.lblWidth = New System.Windows.Forms.Label()
    Me.lblHT = New System.Windows.Forms.Label()
    Me.label5 = New System.Windows.Forms.Label()
    Me.label4 = New System.Windows.Forms.Label()
    Me.label3 = New System.Windows.Forms.Label()
    Me.label2 = New System.Windows.Forms.Label()
    Me.label1 = New System.Windows.Forms.Label()
    Me.cmdOpen = New System.Windows.Forms.Button()
    Me.ofdBitmap = New System.Windows.Forms.OpenFileDialog()
    Me.groupBox1.SuspendLayout()
    Me.SuspendLayout()
    '
    'cmdSetRes
    '
    Me.cmdSetRes.Location = New System.Drawing.Point(152, 328)
    Me.cmdSetRes.Name = "cmdSetRes"
    Me.cmdSetRes.Size = New System.Drawing.Size(128, 32)
    Me.cmdSetRes.TabIndex = 6
    Me.cmdSetRes.Text = "Reset Resolution"
    '
    'groupBox1
    '
    Me.groupBox1.Controls.AddRange(New System.Windows.Forms.Control() {Me.lblDIM, Me.label8, Me.lblSize, Me.label6, Me.lblFormat, Me.lblVdpi, Me.lblHdpi, Me.lblWidth, Me.lblHT, Me.label5, Me.label4, Me.label3, Me.label2, Me.label1})
    Me.groupBox1.Font = New System.Drawing.Font("Microsoft Sans Serif", 8.25!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
    Me.groupBox1.Location = New System.Drawing.Point(152, 88)
    Me.groupBox1.Name = "groupBox1"
    Me.groupBox1.Size = New System.Drawing.Size(224, 224)
    Me.groupBox1.TabIndex = 5
    Me.groupBox1.TabStop = False
    Me.groupBox1.Text = "Attributes"
    '
    'lblDIM
    '
    Me.lblDIM.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D
    Me.lblDIM.Location = New System.Drawing.Point(80, 184)
    Me.lblDIM.Name = "lblDIM"
    Me.lblDIM.Size = New System.Drawing.Size(136, 16)
    Me.lblDIM.TabIndex = 13
    '
    'label8
    '
    Me.label8.Location = New System.Drawing.Point(8, 184)
    Me.label8.Name = "label8"
    Me.label8.Size = New System.Drawing.Size(64, 16)
    Me.label8.TabIndex = 12
    Me.label8.Text = "Dimensions"
    '
    'lblSize
    '
    Me.lblSize.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D
    Me.lblSize.Location = New System.Drawing.Point(80, 160)
    Me.lblSize.Name = "lblSize"
    Me.lblSize.Size = New System.Drawing.Size(136, 16)
    Me.lblSize.TabIndex = 11
    '
    'label6
    '
    Me.label6.Location = New System.Drawing.Point(8, 160)
    Me.label6.Name = "label6"
    Me.label6.Size = New System.Drawing.Size(64, 16)
    Me.label6.TabIndex = 10
    Me.label6.Text = "Size"
    '
    'lblFormat
    '
    Me.lblFormat.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D
    Me.lblFormat.Location = New System.Drawing.Point(80, 120)
    Me.lblFormat.Name = "lblFormat"
    Me.lblFormat.Size = New System.Drawing.Size(136, 16)
    Me.lblFormat.TabIndex = 9
    '
    'lblVdpi
    '
    Me.lblVdpi.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D
    Me.lblVdpi.Location = New System.Drawing.Point(80, 96)
    Me.lblVdpi.Name = "lblVdpi"
    Me.lblVdpi.Size = New System.Drawing.Size(136, 16)
    Me.lblVdpi.TabIndex = 8
    '
    'lblHdpi
    '
    Me.lblHdpi.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D
    Me.lblHdpi.Location = New System.Drawing.Point(80, 72)
    Me.lblHdpi.Name = "lblHdpi"
    Me.lblHdpi.Size = New System.Drawing.Size(136, 16)
    Me.lblHdpi.TabIndex = 7
    '
    'lblWidth
    '
    Me.lblWidth.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D
    Me.lblWidth.Location = New System.Drawing.Point(80, 48)
    Me.lblWidth.Name = "lblWidth"
    Me.lblWidth.Size = New System.Drawing.Size(136, 16)
    Me.lblWidth.TabIndex = 6
    '
    'lblHT
    '
    Me.lblHT.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D
    Me.lblHT.Location = New System.Drawing.Point(80, 24)
    Me.lblHT.Name = "lblHT"
    Me.lblHT.Size = New System.Drawing.Size(136, 16)
    Me.lblHT.TabIndex = 5
    '
    'label5
    '
    Me.label5.Location = New System.Drawing.Point(8, 120)
    Me.label5.Name = "label5"
    Me.label5.Size = New System.Drawing.Size(64, 16)
    Me.label5.TabIndex = 4
    Me.label5.Text = "Format"
    '
    'label4
    '
    Me.label4.Location = New System.Drawing.Point(8, 96)
    Me.label4.Name = "label4"
    Me.label4.Size = New System.Drawing.Size(64, 16)
    Me.label4.TabIndex = 3
    Me.label4.Text = "Vdpi"
    '
    'label3
    '
    Me.label3.Location = New System.Drawing.Point(8, 48)
    Me.label3.Name = "label3"
    Me.label3.Size = New System.Drawing.Size(64, 16)
    Me.label3.TabIndex = 2
    Me.label3.Text = "Width"
    '
    'label2
    '
    Me.label2.Location = New System.Drawing.Point(8, 72)
    Me.label2.Name = "label2"
    Me.label2.Size = New System.Drawing.Size(64, 16)
    Me.label2.TabIndex = 1
    Me.label2.Text = "Hdpi"
    '
    'label1
    '
    Me.label1.Location = New System.Drawing.Point(8, 24)
    Me.label1.Name = "label1"
    Me.label1.Size = New System.Drawing.Size(64, 16)
    Me.label1.TabIndex = 0
    Me.label1.Text = "Height"
    '
    'cmdOpen
    '
    Me.cmdOpen.Location = New System.Drawing.Point(24, 328)
    Me.cmdOpen.Name = "cmdOpen"
    Me.cmdOpen.Size = New System.Drawing.Size(72, 32)
    Me.cmdOpen.TabIndex = 4
    Me.cmdOpen.Text = "Open"
    '
    'ofdBitmap
    '
    '
    'Form1
    '
    Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
    Me.ClientSize = New System.Drawing.Size(392, 373)
    Me.Controls.AddRange(New System.Windows.Forms.Control() {Me.cmdSetRes, Me.groupBox1, Me.cmdOpen})
    Me.MaximizeBox = False
    Me.MinimizeBox = False
    Me.Name = "Form1"
    Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen
    Me.Text = "Form1"
    Me.groupBox1.ResumeLayout(False)
    Me.ResumeLayout(False)

  End Sub

#End Region

  Private Sub Form1_Load(ByVal sender As System.Object, _
                         ByVal e As System.EventArgs) Handles MyBase.Load

  End Sub

  Protected Overrides Sub OnPaint(ByVal e As PaintEventArgs)
    Dim G As Graphics = e.Graphics

    If Not Bmp Is Nothing Then
      'OK Folks. This is a BitBlt!
      G.DrawImage(Bmp, BMPContainer)
    End If

    MyBase.OnPaint(e)
  End Sub

  Private Sub Open(ByVal sender As System.Object, _
                       ByVal e As System.EventArgs) Handles cmdOpen.Click
    ofdBitmap.ShowDialog()
  End Sub

  Private Sub OpenFile(ByVal sender As System.Object, _
                       ByVal e As System.ComponentModel.CancelEventArgs) _
                                                Handles ofdBitmap.FileOk
    'Wondering what sender is?  Use reflection!
    If Not sender.GetType() Is GetType(System.Windows.Forms.OpenFileDialog) Then
      Return
    End If

    Bmp = New Bitmap(ofdBitmap.FileName)
    If Not Bmp Is Nothing Then
      ShowStats()
      DrawBMP()
    End If
  End Sub

  Private Sub SetRes(ByVal sender As System.Object, _
                     ByVal e As System.EventArgs) Handles cmdSetRes.Click
    If Not Bmp Is Nothing Then
      Bmp.SetResolution(150, 150)
      DrawBMP()
    End If

  End Sub

  Private Sub DrawBMP()
    If Not Bmp Is Nothing Then
      'Invalidate only the area where the image will be drawn
      Dim G As Graphics = Me.CreateGraphics()
      Dim GU As GraphicsUnit = G.PageUnit
      BMPContainer = Bmp.GetBounds(GU) 'x,y=0
      ShowStats()
      Me.Invalidate(Rectangle.Round(BMPContainer))
      G.Dispose()
    End If
  End Sub

  Private Sub ShowStats()
    If Not Bmp Is Nothing Then
      'Show some properties here
      lblHT.Text = Bmp.Height.ToString()
      lblWidth.Text = Bmp.Width.ToString()
      lblVdpi.Text = Bmp.VerticalResolution.ToString()
      lblHdpi.Text = Bmp.HorizontalResolution.ToString()
      lblFormat.Text = Bmp.PixelFormat.ToString()
      lblSize.Text = Bmp.Size.ToString()
      lblDIM.Text = Bmp.PhysicalDimension.ToString()
    End If
  End Sub

End Class
