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
    Me.ClientSize = New System.Drawing.Size(292, 273)
    Me.Name = "Form1"
    Me.Text = "Form1"

  End Sub

#End Region

  Private Sub Form1_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load

  End Sub

  Protected Overrides Sub OnPaint(ByVal e As PaintEventArgs)
    Dim G As Graphics = e.Graphics

    'Brushes class
    G.Clear(Color.BurlyWood)
    Dim r As Rectangle = New Rectangle(New Point(50, 50), _
                        New Size(CInt(Me.Width - 100), CInt(Me.Height - 100)))
    Dim b As Brush = Brushes.Crimson
    G.FillRectangle(b, r)
    G.FillRectangle(Brushes.Crimson, r)

    b.Dispose()
  End Sub

End Class
