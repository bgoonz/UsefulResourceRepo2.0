Option Strict On

Imports System.Drawing
Imports System.Drawing.Drawing2D

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
  Friend WithEvents listBox1 As System.Windows.Forms.ListBox
  Friend WithEvents label3 As System.Windows.Forms.Label
  Friend WithEvents label2 As System.Windows.Forms.Label
  Friend WithEvents label1 As System.Windows.Forms.Label
  <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
    Me.listBox1 = New System.Windows.Forms.ListBox()
    Me.label3 = New System.Windows.Forms.Label()
    Me.label2 = New System.Windows.Forms.Label()
    Me.label1 = New System.Windows.Forms.Label()
    Me.SuspendLayout()
    '
    'listBox1
    '
    Me.listBox1.Location = New System.Drawing.Point(40, 216)
    Me.listBox1.Name = "listBox1"
    Me.listBox1.Size = New System.Drawing.Size(192, 69)
    Me.listBox1.TabIndex = 7
    '
    'label3
    '
    Me.label3.Location = New System.Drawing.Point(56, 328)
    Me.label3.Name = "label3"
    Me.label3.Size = New System.Drawing.Size(160, 16)
    Me.label3.TabIndex = 6
    '
    'label2
    '
    Me.label2.Location = New System.Drawing.Point(56, 312)
    Me.label2.Name = "label2"
    Me.label2.Size = New System.Drawing.Size(160, 16)
    Me.label2.TabIndex = 5
    '
    'label1
    '
    Me.label1.Location = New System.Drawing.Point(56, 296)
    Me.label1.Name = "label1"
    Me.label1.Size = New System.Drawing.Size(160, 16)
    Me.label1.TabIndex = 4
    '
    'Form1
    '
    Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
    Me.ClientSize = New System.Drawing.Size(292, 373)
    Me.Controls.AddRange(New System.Windows.Forms.Control() {Me.listBox1, Me.label3, Me.label2, Me.label1})
    Me.Name = "Form1"
    Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen
    Me.Text = "Form1"
    Me.ResumeLayout(False)

  End Sub

#End Region

  Private Sub Form1_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load

  End Sub

  Protected Overrides Sub OnPaint(ByVal e As PaintEventArgs)
    Dim G As Graphics = e.Graphics

    Dim p As GraphicsPath = New GraphicsPath()
    Dim pts() As PointF = {New PointF(50.0F, 50.0F), _
                       New PointF(150.0F, 25.0F), _
                       New PointF(200.0F, 50.0F)}
    p.AddCurve(pts)
    p.AddRectangle(New Rectangle(60, 60, 50, 50))
    p.AddPie(100, 100, 80, 80, 0, 35)
    G.DrawPath(Pens.Black, p)

    Dim iter As GraphicsPathIterator = New GraphicsPathIterator(p)
    label1.Text = "Num pts in path = " + iter.Count.ToString()
    label2.Text = "Num subpaths in path = " + iter.SubpathCount.ToString()
    label3.Text = "Path has curve = " + iter.HasCurve().ToString()

    Dim StartIndex As Int32
    Dim EndIndex As Int32
    Dim i As Int32
    Dim IsClosed As Boolean
    ' Rewind the Iterator.
    iter.Rewind()
    ' List the Subpaths.
    For i = 0 To iter.SubpathCount - 1
      iter.NextSubpath(StartIndex, EndIndex, IsClosed)
      listBox1.Items.Add("Start: " + StartIndex.ToString() + _
                         "  End: " + EndIndex.ToString() + _
                         "  IsClosed: " + IsClosed.ToString())
    Next

  End Sub
End Class
