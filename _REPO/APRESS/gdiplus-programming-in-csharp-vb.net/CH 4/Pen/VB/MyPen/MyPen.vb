Option Strict On

Imports System
Imports System.Windows.Forms
Imports System.Drawing

Public Class Form1
  Inherits System.Windows.Forms.Form

#Region " Windows Form Designer generated code "

  Public Sub New()
    MyBase.New()


    'This call is required by the Windows Form Designer.
    InitializeComponent()
    Me.BackColor = Color.Black
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
    Me.ClientSize = New System.Drawing.Size(696, 437)
    Me.Name = "Form1"
    Me.Text = "Form1"

  End Sub

#End Region

  Private Sub Form1_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load

  End Sub

  Protected Overrides Sub OnPaint(ByVal e As PaintEventArgs)
    Dim G As Graphics = e.Graphics
    Dim Stripe As Image = New Bitmap("colorbars.jpg")
    Dim B1 As TextureBrush = New TextureBrush(Stripe)
    Dim B2 As SolidBrush = New SolidBrush(Color.Aquamarine)
    Dim P1 As Pen


    P1 = New Pen(B1, 10)
    G.DrawLine(P1, 20, 20, Me.Width - 40, Me.Height - 40)
    System.Threading.Thread.CurrentThread.Sleep(1000)

    P1 = New Pen(B2, 10)
    G.DrawLine(P1, 20, 20, Me.Width - 40, Me.Height - 40)
    System.Threading.Thread.CurrentThread.Sleep(1000)

    P1 = New Pen(Color.BlanchedAlmond, 10)
    G.DrawLine(P1, 20, 20, Me.Width - 40, Me.Height - 40)

    'reclaim memory
    B1.Dispose()
    B2.Dispose()
    P1.Dispose()

  End Sub

End Class
