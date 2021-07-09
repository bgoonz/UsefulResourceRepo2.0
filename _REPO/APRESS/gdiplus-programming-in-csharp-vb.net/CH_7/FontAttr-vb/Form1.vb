Option Strict On

Imports System
Imports System.Drawing
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
  Friend WithEvents P1 As System.Windows.Forms.Panel
  Friend WithEvents cmdGo As System.Windows.Forms.Button
  <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
    Me.P1 = New System.Windows.Forms.Panel()
    Me.cmdGo = New System.Windows.Forms.Button()
    Me.SuspendLayout()
    '
    'P1
    '
    Me.P1.AutoScroll = True
    Me.P1.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D
    Me.P1.Location = New System.Drawing.Point(19, 21)
    Me.P1.Name = "P1"
    Me.P1.Size = New System.Drawing.Size(304, 240)
    Me.P1.TabIndex = 3
    '
    'cmdGo
    '
    Me.cmdGo.Location = New System.Drawing.Point(267, 277)
    Me.cmdGo.Name = "cmdGo"
    Me.cmdGo.Size = New System.Drawing.Size(56, 24)
    Me.cmdGo.TabIndex = 2
    Me.cmdGo.Text = "GO"
    '
    'Form1
    '
    Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
    Me.ClientSize = New System.Drawing.Size(342, 323)
    Me.Controls.AddRange(New System.Windows.Forms.Control() {Me.P1, Me.cmdGo})
    Me.MaximizeBox = False
    Me.MinimizeBox = False
    Me.Name = "Form1"
    Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen
    Me.Text = "Form1"
    Me.ResumeLayout(False)

  End Sub

#End Region

  Private Sub Form1_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load
  End Sub



  Private Sub EnumInstalledFonts()
    Dim Style As FontStyle
    Dim y As Int32 = 0
    Dim ff As FontFamily

    For Each ff In FontFamily.Families
      Style = FontStyle.Regular
      If ff.IsStyleAvailable(Style) Then
        AddString(ff, y, Style)
      End If
      Style = FontStyle.Bold
      If ff.IsStyleAvailable(Style) Then
        AddString(ff, y, Style)
      End If
      Style = FontStyle.Italic
      If ff.IsStyleAvailable(Style) Then
        AddString(ff, y, Style)
      End If
      Style = FontStyle.Strikeout
      If ff.IsStyleAvailable(Style) Then
        AddString(ff, y, Style)
      End If
      Style = FontStyle.Underline
      If ff.IsStyleAvailable(Style) Then
        AddString(ff, y, Style)
      End If
    Next
  End Sub

  Private Sub AddString(ByVal ff As FontFamily, ByRef y As Int32, ByVal Style As FontStyle)
    Dim fnt As Font = New Font(ff, 12, Style, GraphicsUnit.Pixel)
    Dim LineSpace As Int32 = CInt((ff.GetLineSpacing(Style)) * _
                              fnt.Size / ff.GetEmHeight(Style))
    y += LineSpace + 2

    Dim P As PictureBox = New PictureBox()
    P.Height = LineSpace
    P.Width = P1.Width
    Dim B As Bitmap = New Bitmap(P.Width, P.Height)
    Dim G As Graphics = Graphics.FromImage(B)
    G.DrawString(ff.Name + " : Style = " + Style.ToString(), _
                    fnt, Brushes.Black, 0, 0)
    P.Image = B
    P1.Controls.Add(P)
    P1.Controls(P1.Controls.Count - 1).Location = New Point(2, y)
    If y < P1.Height Then
      P1.Refresh()
    End If

    fnt.Dispose()
    G.Dispose()
  End Sub

  Private Sub cmdGo_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles cmdGo.Click
    EnumInstalledFonts()
  End Sub
End Class
