Option Strict On

Imports System
Imports System.Drawing

Public Class Attributes
  Inherits System.Windows.Forms.Form

  Private m_Res As Single

#Region " Windows Form Designer generated code "

  Public Sub New(ByVal CurrentResolution As Single, ByVal sz As Size)
    MyBase.New()

    'This call is required by the Windows Form Designer.
    InitializeComponent()

    m_Res = CurrentResolution
    lblRes.Text = m_Res.ToString() + " DPI"
    lblSizeVal.Text = sz.Width.ToString() + "w X " + sz.Height.ToString() + "h"
    optCurrent.Checked = True
    Me.Opacity = 1.0

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
  Friend WithEvents lblSizeVal As System.Windows.Forms.Label
  Friend WithEvents lblSize As System.Windows.Forms.Label
  Friend WithEvents groupBox1 As System.Windows.Forms.GroupBox
  Friend WithEvents opt300 As System.Windows.Forms.RadioButton
  Friend WithEvents opt150 As System.Windows.Forms.RadioButton
  Friend WithEvents opt120 As System.Windows.Forms.RadioButton
  Friend WithEvents optCurrent As System.Windows.Forms.RadioButton
  Friend WithEvents cmdOK As System.Windows.Forms.Button
  Friend WithEvents lblRes As System.Windows.Forms.Label
  Friend WithEvents lblCurrentRes As System.Windows.Forms.Label
  <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
    Me.lblSizeVal = New System.Windows.Forms.Label()
    Me.lblSize = New System.Windows.Forms.Label()
    Me.groupBox1 = New System.Windows.Forms.GroupBox()
    Me.opt300 = New System.Windows.Forms.RadioButton()
    Me.opt150 = New System.Windows.Forms.RadioButton()
    Me.opt120 = New System.Windows.Forms.RadioButton()
    Me.optCurrent = New System.Windows.Forms.RadioButton()
    Me.cmdOK = New System.Windows.Forms.Button()
    Me.lblRes = New System.Windows.Forms.Label()
    Me.lblCurrentRes = New System.Windows.Forms.Label()
    Me.groupBox1.SuspendLayout()
    Me.SuspendLayout()
    '
    'lblSizeVal
    '
    Me.lblSizeVal.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D
    Me.lblSizeVal.Location = New System.Drawing.Point(186, 29)
    Me.lblSizeVal.Name = "lblSizeVal"
    Me.lblSizeVal.Size = New System.Drawing.Size(88, 16)
    Me.lblSizeVal.TabIndex = 11
    '
    'lblSize
    '
    Me.lblSize.Location = New System.Drawing.Point(186, 13)
    Me.lblSize.Name = "lblSize"
    Me.lblSize.Size = New System.Drawing.Size(88, 16)
    Me.lblSize.TabIndex = 10
    Me.lblSize.Text = "Size"
    '
    'groupBox1
    '
    Me.groupBox1.Controls.AddRange(New System.Windows.Forms.Control() {Me.opt300, Me.opt150, Me.opt120, Me.optCurrent})
    Me.groupBox1.Location = New System.Drawing.Point(18, 61)
    Me.groupBox1.Name = "groupBox1"
    Me.groupBox1.Size = New System.Drawing.Size(168, 128)
    Me.groupBox1.TabIndex = 9
    Me.groupBox1.TabStop = False
    Me.groupBox1.Text = "Save Resolution"
    '
    'opt300
    '
    Me.opt300.Location = New System.Drawing.Point(16, 96)
    Me.opt300.Name = "opt300"
    Me.opt300.Size = New System.Drawing.Size(104, 16)
    Me.opt300.TabIndex = 3
    Me.opt300.Text = "300 DPI"
    '
    'opt150
    '
    Me.opt150.Location = New System.Drawing.Point(16, 72)
    Me.opt150.Name = "opt150"
    Me.opt150.Size = New System.Drawing.Size(104, 16)
    Me.opt150.TabIndex = 2
    Me.opt150.Text = "150 DPI"
    '
    'opt120
    '
    Me.opt120.Location = New System.Drawing.Point(16, 48)
    Me.opt120.Name = "opt120"
    Me.opt120.Size = New System.Drawing.Size(104, 16)
    Me.opt120.TabIndex = 1
    Me.opt120.Text = "120 DPI"
    '
    'optCurrent
    '
    Me.optCurrent.Location = New System.Drawing.Point(16, 24)
    Me.optCurrent.Name = "optCurrent"
    Me.optCurrent.Size = New System.Drawing.Size(104, 16)
    Me.optCurrent.TabIndex = 0
    Me.optCurrent.Text = "Current"
    '
    'cmdOK
    '
    Me.cmdOK.Location = New System.Drawing.Point(226, 157)
    Me.cmdOK.Name = "cmdOK"
    Me.cmdOK.Size = New System.Drawing.Size(48, 32)
    Me.cmdOK.TabIndex = 8
    Me.cmdOK.Text = "OK"
    '
    'lblRes
    '
    Me.lblRes.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D
    Me.lblRes.Location = New System.Drawing.Point(18, 29)
    Me.lblRes.Name = "lblRes"
    Me.lblRes.Size = New System.Drawing.Size(152, 16)
    Me.lblRes.TabIndex = 7
    '
    'lblCurrentRes
    '
    Me.lblCurrentRes.Location = New System.Drawing.Point(18, 13)
    Me.lblCurrentRes.Name = "lblCurrentRes"
    Me.lblCurrentRes.Size = New System.Drawing.Size(160, 16)
    Me.lblCurrentRes.TabIndex = 6
    Me.lblCurrentRes.Text = "Current Resolution"
    '
    'Attributes
    '
    Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
    Me.ClientSize = New System.Drawing.Size(292, 203)
    Me.Controls.AddRange(New System.Windows.Forms.Control() {Me.lblSizeVal, Me.lblSize, Me.groupBox1, Me.cmdOK, Me.lblRes, Me.lblCurrentRes})
    Me.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle
    Me.MaximizeBox = False
    Me.MinimizeBox = False
    Me.Name = "Attributes"
    Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen
    Me.Text = "Attributes"
    Me.groupBox1.ResumeLayout(False)
    Me.ResumeLayout(False)

  End Sub

#End Region

  Private Sub Attributes_Load(ByVal sender As System.Object, _
                              ByVal e As System.EventArgs) Handles MyBase.Load

  End Sub

  Public ReadOnly Property SaveRes() As Single
    Get
      Return m_Res
    End Get
  End Property

  Private Sub cmdOK_Click(ByVal sender As System.Object, _
                          ByVal e As System.EventArgs) Handles cmdOK.Click
    If opt120.Checked Then
      m_Res = 120.0F
    End If

    If opt150.Checked Then
      m_Res = 150.0F
    End If

    If opt300.Checked Then
      m_Res = 300.0F
    End If

    Me.Close()

  End Sub

End Class
