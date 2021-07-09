Option Strict On

Imports System.Drawing
Imports System.Drawing.Drawing2D
Imports System.Drawing.Imaging
Imports System.Runtime.InteropServices

Public Class Form1
  Inherits System.Windows.Forms.Form

  Dim mf As Metafile = New Metafile("mymeta.emf")

#Region " Windows Form Designer generated code "

  Public Sub New()
    MyBase.New()
    InitializeComponent()
  End Sub

  'Form overrides dispose to clean up the component list.
  Protected Overloads Overrides Sub Dispose(ByVal disposing As Boolean)
    If disposing Then
      If Not (components Is Nothing) Then
        components.Dispose()
      End If
    End If
    mf.Dispose()
    MyBase.Dispose(disposing)
  End Sub

  'Required by the Windows Form Designer
  Private components As System.ComponentModel.IContainer

  'NOTE: The following procedure is required by the Windows Form Designer
  'It can be modified using the Windows Form Designer.  
  'Do not modify it using the code editor.
  Friend WithEvents LB As System.Windows.Forms.ListBox
  <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
    Me.LB = New System.Windows.Forms.ListBox()
    Me.SuspendLayout()
    '
    'LB
    '
    Me.LB.Location = New System.Drawing.Point(224, 216)
    Me.LB.Name = "LB"
    Me.LB.Size = New System.Drawing.Size(152, 134)
    Me.LB.TabIndex = 0
    '
    'Form1
    '
    Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
    Me.ClientSize = New System.Drawing.Size(392, 373)
    Me.Controls.AddRange(New System.Windows.Forms.Control() {Me.LB})
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
    G.EnumerateMetafile(mf, New Point(50, 50), _
                 New Graphics.EnumerateMetafileProc(AddressOf Me.MetafileCallback))
  End Sub

  Private Function MetafileCallback(ByVal recordType As EmfPlusRecordType, _
                                    ByVal flags As Int32, _
                                    ByVal dataSize As Int32, _
                                    ByVal data As IntPtr, _
                                    ByVal callbackData As PlayRecordCallback) _
                                    As Boolean
    LB.Items.Add(recordType)
    If dataSize > 0 Then
      Dim D(dataSize) As Byte
      Marshal.Copy(data, D, 0, dataSize)
      mf.PlayRecord(recordType, flags, dataSize, D)
    End If
    Return True
  End Function




End Class
