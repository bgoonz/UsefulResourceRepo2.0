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
    <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
    '
    'Form1
    '
    Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
    Me.ClientSize = New System.Drawing.Size(292, 323)
    Me.MaximizeBox = False
    Me.MinimizeBox = False
    Me.Name = "Form1"
    Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen
    Me.Text = "Form1"

  End Sub

#End Region

  Private Sub Form1_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load

  End Sub

  Protected Overrides Sub OnPaint(ByVal e As PaintEventArgs)
    Dim G As Graphics = e.Graphics
    G.TextRenderingHint = Drawing.Text.TextRenderingHint.AntiAlias
    Dim y As Int32 = 0

    y += 40
    G.DrawString("Regular", Fonts.Arial_20, Brushes.Black, 50, y)
    y += 40
    G.DrawString("Italic", Fonts.ArialItalic_20, Brushes.Black, 50, y)
    y += 40
    G.DrawString("Regular", Fonts.Chain_20, Brushes.Black, 50, y)
    y += 40
    G.DrawString("Italic", Fonts.ChainItalic_20, Brushes.Black, 50, y)
    y += 40
    G.DrawString("Regular", Fonts.Comic_20, Brushes.Black, 50, y)
    y += 40
    G.DrawString("Italic", Fonts.ComicItalic_20, Brushes.Black, 50, y)
  End Sub
End Class
