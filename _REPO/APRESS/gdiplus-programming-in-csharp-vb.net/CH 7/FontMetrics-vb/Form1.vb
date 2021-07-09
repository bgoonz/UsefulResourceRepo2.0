Option Strict On

Imports System.Drawing
Imports System.Drawing.Drawing2D
Imports System.Drawing.Text

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
  Friend WithEvents cmdCourier As System.Windows.Forms.Button
  Friend WithEvents cmdComic As System.Windows.Forms.Button
  Friend WithEvents cmdArial As System.Windows.Forms.Button
  Friend WithEvents cmdRoman As System.Windows.Forms.Button
  <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
    Me.cmdCourier = New System.Windows.Forms.Button()
    Me.cmdComic = New System.Windows.Forms.Button()
    Me.cmdArial = New System.Windows.Forms.Button()
    Me.cmdRoman = New System.Windows.Forms.Button()
    Me.SuspendLayout()
    '
    'cmdCourier
    '
    Me.cmdCourier.Location = New System.Drawing.Point(376, 240)
    Me.cmdCourier.Name = "cmdCourier"
    Me.cmdCourier.Size = New System.Drawing.Size(104, 24)
    Me.cmdCourier.TabIndex = 7
    Me.cmdCourier.Text = "Courier New"
    '
    'cmdComic
    '
    Me.cmdComic.Location = New System.Drawing.Point(256, 240)
    Me.cmdComic.Name = "cmdComic"
    Me.cmdComic.Size = New System.Drawing.Size(104, 24)
    Me.cmdComic.TabIndex = 6
    Me.cmdComic.Text = "Comic Sans MS"
    '
    'cmdArial
    '
    Me.cmdArial.Location = New System.Drawing.Point(136, 240)
    Me.cmdArial.Name = "cmdArial"
    Me.cmdArial.Size = New System.Drawing.Size(104, 24)
    Me.cmdArial.TabIndex = 5
    Me.cmdArial.Text = "Arial Black"
    '
    'cmdRoman
    '
    Me.cmdRoman.Location = New System.Drawing.Point(16, 240)
    Me.cmdRoman.Name = "cmdRoman"
    Me.cmdRoman.Size = New System.Drawing.Size(104, 24)
    Me.cmdRoman.TabIndex = 4
    Me.cmdRoman.Text = "Times Roman"
    '
    'Form1
    '
    Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
    Me.ClientSize = New System.Drawing.Size(492, 273)
    Me.Controls.AddRange(New System.Windows.Forms.Control() {Me.cmdCourier, Me.cmdComic, Me.cmdArial, Me.cmdRoman})
    Me.MaximizeBox = False
    Me.MinimizeBox = False
    Me.Name = "Form1"
    Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen
    Me.Text = "Form1"
    Me.ResumeLayout(False)

  End Sub

#End Region


  Private Sub DisplayFontMetrics(ByVal ff As FontFamily, ByVal fnt As Font)
    'Create graphics object and make it pretty
    Dim G As Graphics = Me.CreateGraphics()
    G.SmoothingMode = SmoothingMode.AntiAlias
    G.TextRenderingHint = TextRenderingHint.AntiAlias

    'Get some metrics
    Dim LineSpace As Int32 = CInt(ff.GetLineSpacing(fnt.Style) * _
                          fnt.Size / ff.GetEmHeight(fnt.Style))
    Dim Descent As Int32 = CInt(ff.GetCellDescent(fnt.Style) * _
                          fnt.Size / ff.GetEmHeight(fnt.Style))
    Dim Ascent As Int32 = CInt(ff.GetCellAscent(fnt.Style) * _
                          fnt.Size / ff.GetEmHeight(fnt.Style))

    'Create the base line to sit the text on
    Dim BaseLineStart As Point = New Point(15, CInt(Me.Height * 3 / 5))
    Dim BaseLineEnd As Point = New Point(Me.Width - 15, CInt(Me.Height * 3 / 5))
    'Top left corner of text is the ascent
    Dim StringPoint As Point = New Point(75, CInt(BaseLineStart.Y - Ascent))

    'Clear the screen and draw the string on a base line
    G.Clear(Color.AliceBlue)
    G.DrawString("A j Q", fnt, Brushes.Blue, Point.op_Implicit(StringPoint))
    G.DrawLine(Pens.Black, BaseLineStart, BaseLineEnd)

    'Draw the annotation lines 
    Dim LineSize As Size = New Size(0, LineSpace)
    Dim AscentSize As Size = New Size(0, Ascent)
    Dim DescentSize As Size = New Size(0, Descent)
    G.DrawLine(Pens.Black, Point.op_Subtraction(BaseLineStart, LineSize), _
                           Point.op_Subtraction(BaseLineEnd, LineSize))
    G.DrawLine(Pens.Red, Point.op_Subtraction(BaseLineStart, AscentSize), _
                           Point.op_Subtraction(BaseLineEnd, AscentSize))
    G.DrawLine(Pens.DarkGreen, Point.op_Addition(BaseLineStart, DescentSize), _
                                 Point.op_Addition(BaseLineEnd, DescentSize))

    'Annotate
    Dim AnnoFont As Font = New Font("Arial", 10)
    G.DrawString("Line Space = " + LineSpace.ToString(), AnnoFont, _
      Brushes.Black, _
      20, _
      CInt(BaseLineStart.Y - LineSpace - 12))

    G.DrawString("Ascent = " + Ascent.ToString(), AnnoFont, _
      Brushes.Red, _
      250, _
      CInt(BaseLineStart.Y - Ascent - 12))

    G.DrawString("Descent = " + Descent.ToString(), AnnoFont, _
      Brushes.DarkGreen, _
      350, _
      CInt(BaseLineStart.Y + Descent / 8))
  End Sub


  Private Sub cmdRoman_Click(ByVal sender As System.Object, _
                             ByVal e As System.EventArgs) Handles cmdRoman.Click
    Dim ff As FontFamily = New FontFamily("Times New Roman")
    Dim f As Font = New Font(ff, 75, FontStyle.Regular, GraphicsUnit.Pixel)

    DisplayFontMetrics(ff, f)

  End Sub

  Private Sub cmdArial_Click(ByVal sender As System.Object, _
                             ByVal e As System.EventArgs) Handles cmdArial.Click
    Dim ff As FontFamily = New FontFamily("Arial Black")
    Dim f As Font = New Font(ff, 75, FontStyle.Regular, GraphicsUnit.Pixel)

    DisplayFontMetrics(ff, f)

  End Sub

  Private Sub cmdComic_Click(ByVal sender As System.Object, _
                             ByVal e As System.EventArgs) Handles cmdComic.Click
    Dim ff As FontFamily = New FontFamily("Comic Sans MS")
    Dim f As Font = New Font(ff, 75, FontStyle.Regular, GraphicsUnit.Pixel)

    DisplayFontMetrics(ff, f)

  End Sub

  Private Sub cmdCourier_Click(ByVal sender As System.Object, _
                               ByVal e As System.EventArgs) _
                               Handles cmdCourier.Click
    Dim ff As FontFamily = New FontFamily("Courier New")
    Dim f As Font = New Font(ff, 75, FontStyle.Regular, GraphicsUnit.Pixel)

    DisplayFontMetrics(ff, f)
  End Sub
End Class
