Option Strict On

Imports System.Drawing
Imports System.Drawing.Drawing2D
Imports System.Drawing.Imaging

Public Class Form1
  Inherits System.Windows.Forms.Form

#Region "Class Local Variables"

  Private WholeBMP As Bitmap
  Private SaveBMP As Bitmap
  Private TLBMP As Bitmap
  Private TRBMP As Bitmap
  Private BLBMP As Bitmap
  Private BRBMP As Bitmap

  Private DrawRect As Rectangle
  Private TLpt As Point
  Private TRpt As Point
  Private BLpt As Point
  Private BRpt As Point
  Private Counter As Int32 = 0

  Private Ia As ImageAttributes

#End Region

#Region " Windows Form Designer generated code "

  Public Sub New()
    MyBase.New()

    'This call is required by the Windows Form Designer.
    InitializeComponent()

    Me.SetStyle(ControlStyles.DoubleBuffer, True)
    Me.SetStyle(ControlStyles.AllPaintingInWmPaint, True)

    T1.Interval = 75
    T1.Enabled = False

    WholeBMP = New Bitmap("crane.jpg")
    DrawRect = New Rectangle(0, 0, WholeBMP.Width, WholeBMP.Height)
    DrawRect.X = CInt(Me.Width / 2 - WholeBMP.Width / 2)
    DrawRect.Y = CInt(Me.Height / 2 - WholeBMP.Height / 2)

  End Sub

  'Form overrides dispose to clean up the component list.
  Protected Overloads Overrides Sub Dispose(ByVal disposing As Boolean)
    If disposing Then
      If Not (components Is Nothing) Then
        components.Dispose()
      End If
    End If
    If Not WholeBMP Is Nothing Then
      WholeBMP.Dispose()
    End If
    If Not SaveBMP Is Nothing Then
      SaveBMP.Dispose()
    End If
    If Not TLBMP Is Nothing Then
      TLBMP.Dispose()
    End If
    If Not TRBMP Is Nothing Then
      TRBMP.Dispose()
    End If
    If Not BLBMP Is Nothing Then
      BLBMP.Dispose()
    End If
    If Not BRBMP Is Nothing Then
      BRBMP.Dispose()
    End If
    If Not Ia Is Nothing Then
      Ia.Dispose()
    End If
    MyBase.Dispose(disposing)
  End Sub

  'Required by the Windows Form Designer
  Private components As System.ComponentModel.IContainer

  'NOTE: The following procedure is required by the Windows Form Designer
  'It can be modified using the Windows Form Designer.  
  'Do not modify it using the code editor.
  Friend WithEvents cmdGo As System.Windows.Forms.Button
  Friend WithEvents T1 As System.Windows.Forms.Timer
  <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
    Me.components = New System.ComponentModel.Container()
    Me.cmdGo = New System.Windows.Forms.Button()
    Me.T1 = New System.Windows.Forms.Timer(Me.components)
    Me.SuspendLayout()
    '
    'cmdGo
    '
    Me.cmdGo.Location = New System.Drawing.Point(328, 328)
    Me.cmdGo.Name = "cmdGo"
    Me.cmdGo.Size = New System.Drawing.Size(48, 24)
    Me.cmdGo.TabIndex = 1
    Me.cmdGo.Text = "GO"
    '
    'T1
    '
    '
    'Form1
    '
    Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
    Me.ClientSize = New System.Drawing.Size(392, 373)
    Me.Controls.AddRange(New System.Windows.Forms.Control() {Me.cmdGo})
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

    If Not WholeBMP Is Nothing Then
      G.DrawImage(WholeBMP, DrawRect)
      Return
    End If

    If Not TLBMP Is Nothing Then
      G.DrawImage(TLBMP, New Rectangle(TLpt, TLBMP.Size), _
        0, 0, _
        TLBMP.Width, TLBMP.Height, _
        GraphicsUnit.Pixel, _
        Ia)
    End If


    If Not TRBMP Is Nothing Then
      G.DrawImage(TRBMP, New Rectangle(TRpt, TRBMP.Size), _
        0, 0, _
        TRBMP.Width, TRBMP.Height, _
        GraphicsUnit.Pixel, _
        Ia)
    End If

    If Not BLBMP Is Nothing Then
      G.DrawImage(BLBMP, New Rectangle(BLpt, BLBMP.Size), _
         0, 0, _
         BLBMP.Width, BLBMP.Height, _
         GraphicsUnit.Pixel, _
         Ia)
    End If

    If Not BRBMP Is Nothing Then
      G.DrawImage(BRBMP, New Rectangle(BRpt, BRBMP.Size), _
        0, 0, _
        BRBMP.Width, BRBMP.Height, _
        GraphicsUnit.Pixel, _
        Ia)
    End If

  End Sub

  Private Sub Explode(ByVal sender As System.Object, _
                      ByVal e As System.EventArgs) Handles cmdGo.Click

    If Not WholeBMP Is Nothing Then
      cmdGo.Enabled = False
      Dim L As Int32 = 0
      Dim T As Int32 = 0
      'Round down is safer
      Dim Cx As Int32 = CInt(Math.Floor(WholeBMP.Width / 2))
      Dim Cy As Int32 = CInt(Math.Floor(WholeBMP.Height / 2))

      SaveBMP = WholeBMP
      TLBMP = WholeBMP.Clone(New Rectangle(L, T, Cx, Cy), WholeBMP.PixelFormat)
      TRBMP = WholeBMP.Clone(New Rectangle(Cx, T, Cx, Cy), WholeBMP.PixelFormat)
      BLBMP = WholeBMP.Clone(New Rectangle(L, Cy, Cx, Cy), WholeBMP.PixelFormat)
      BRBMP = WholeBMP.Clone(New Rectangle(Cx, Cy, Cx, Cy), WholeBMP.PixelFormat)
      WholeBMP = Nothing

      Dim Gap As Int32 = 10
      TLpt = New Point(DrawRect.Left - Gap, DrawRect.Top - Gap)
      TRpt = New Point(DrawRect.Left + Cx + Gap, DrawRect.Top - Gap)
      BLpt = New Point(DrawRect.Left - Gap, DrawRect.Top + Cy + Gap)
      BRpt = New Point(DrawRect.Left + Cx + Gap, DrawRect.Top + Cy + Gap)

      T1.Enabled = True
      Invalidate()
    End If

  End Sub

  Private Sub T1_Tick(ByVal sender As System.Object, _
                      ByVal e As System.EventArgs) Handles T1.Tick

    Counter += 1
    If Counter = 62 Then
      Counter = 0
      cmdGo.Enabled = True
      T1.Enabled = False
      WholeBMP = SaveBMP
    End If

    TLpt.X -= 1
    TLpt.Y -= 1

    TRpt.X += 1
    TRpt.Y -= 1

    BLpt.X -= 1
    BLpt.Y += 1

    BRpt.X += 1
    BRpt.Y += 1

    ' Initialize a color matrix.
    'Set the alpha for the whole image
    Dim m()() As Single = {New Single() {1, 0, 0, 0, 0}, _
                  New Single() {0, 1, 0, 0, 0}, _
                  New Single() {0, 0, 1, 0, 0}, _
                  New Single() {0, 0, 0, (1 - CType(Counter, Single) / 62), 0}, _
                  New Single() {0, 0, 0, 0, 1}}
    Dim cm As ColorMatrix = New ColorMatrix(m)

    ' Create an ImageAttributes object and set its color matrix.
    Ia = New ImageAttributes()
    Ia.SetColorMatrix(cm, ColorMatrixFlag.Default, _
                            ColorAdjustType.Bitmap)

    TLBMP.RotateFlip(RotateFlipType.Rotate90FlipNone)
    TRBMP.RotateFlip(RotateFlipType.Rotate90FlipNone)
    BLBMP.RotateFlip(RotateFlipType.Rotate90FlipNone)
    BRBMP.RotateFlip(RotateFlipType.Rotate90FlipNone)

    Invalidate()

  End Sub
End Class
