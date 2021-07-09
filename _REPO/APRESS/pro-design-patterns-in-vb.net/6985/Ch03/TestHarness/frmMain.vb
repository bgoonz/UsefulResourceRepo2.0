Option Strict On
Option Explicit On 

Imports System.Xml
Imports ReceiveDocument.Receive

Public Class frmMain

    Inherits System.Windows.Forms.Form
    Dim m_DocReceive As ReceiveDocument.Receive

#Region " Windows Form Designer generated code "

    Public Sub New()
        MyBase.New()

        'This call is required by the Windows Form Designer.
        InitializeComponent()

        'Add any initialization after the InitializeComponent() call
        rbSpecialOrder.Checked = True
        cmdSubmit.Focus()
        m_DocReceive = ReceiveDocument.Receive.GetInstance

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
    Friend WithEvents Label1 As System.Windows.Forms.Label
    Friend WithEvents Label2 As System.Windows.Forms.Label
    Friend WithEvents Label3 As System.Windows.Forms.Label
    Friend WithEvents lblSubmitResult As System.Windows.Forms.Label
    Friend WithEvents txtXML As System.Windows.Forms.TextBox
    Friend WithEvents cmdSubmit As System.Windows.Forms.Button
    Friend WithEvents cmdStatus As System.Windows.Forms.Button
    Friend WithEvents GroupBox1 As System.Windows.Forms.GroupBox
    Friend WithEvents rbOrder As System.Windows.Forms.RadioButton
    Friend WithEvents rbSpecialOrder As System.Windows.Forms.RadioButton
    Friend WithEvents txtCheckResult As System.Windows.Forms.TextBox
    <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
        Me.Label1 = New System.Windows.Forms.Label()
        Me.Label2 = New System.Windows.Forms.Label()
        Me.Label3 = New System.Windows.Forms.Label()
        Me.lblSubmitResult = New System.Windows.Forms.Label()
        Me.txtXML = New System.Windows.Forms.TextBox()
        Me.txtCheckResult = New System.Windows.Forms.TextBox()
        Me.cmdSubmit = New System.Windows.Forms.Button()
        Me.cmdStatus = New System.Windows.Forms.Button()
        Me.GroupBox1 = New System.Windows.Forms.GroupBox()
        Me.rbSpecialOrder = New System.Windows.Forms.RadioButton()
        Me.rbOrder = New System.Windows.Forms.RadioButton()
        Me.GroupBox1.SuspendLayout()
        Me.SuspendLayout()
        '
        'Label1
        '
        Me.Label1.Location = New System.Drawing.Point(8, 48)
        Me.Label1.Name = "Label1"
        Me.Label1.TabIndex = 0
        Me.Label1.Text = "XML"
        '
        'Label2
        '
        Me.Label2.Location = New System.Drawing.Point(144, 232)
        Me.Label2.Name = "Label2"
        Me.Label2.TabIndex = 1
        Me.Label2.Text = "Document ID:"
        '
        'Label3
        '
        Me.Label3.Location = New System.Drawing.Point(8, 296)
        Me.Label3.Name = "Label3"
        Me.Label3.TabIndex = 2
        Me.Label3.Text = "Order Status"
        '
        'lblSubmitResult
        '
        Me.lblSubmitResult.Location = New System.Drawing.Point(216, 232)
        Me.lblSubmitResult.Name = "lblSubmitResult"
        Me.lblSubmitResult.Size = New System.Drawing.Size(264, 24)
        Me.lblSubmitResult.TabIndex = 3
        Me.lblSubmitResult.Text = "Submit Order"
        '
        'txtXML
        '
        Me.txtXML.Location = New System.Drawing.Point(8, 64)
        Me.txtXML.Multiline = True
        Me.txtXML.Name = "txtXML"
        Me.txtXML.ScrollBars = System.Windows.Forms.ScrollBars.Vertical
        Me.txtXML.Size = New System.Drawing.Size(472, 160)
        Me.txtXML.TabIndex = 4
        Me.txtXML.Text = "TextBox1"
        '
        'txtCheckResult
        '
        Me.txtCheckResult.Location = New System.Drawing.Point(8, 312)
        Me.txtCheckResult.Multiline = True
        Me.txtCheckResult.Name = "txtCheckResult"
        Me.txtCheckResult.ReadOnly = True
        Me.txtCheckResult.ScrollBars = System.Windows.Forms.ScrollBars.Vertical
        Me.txtCheckResult.Size = New System.Drawing.Size(472, 48)
        Me.txtCheckResult.TabIndex = 5
        Me.txtCheckResult.Text = "TextBox1"
        '
        'cmdSubmit
        '
        Me.cmdSubmit.Location = New System.Drawing.Point(8, 232)
        Me.cmdSubmit.Name = "cmdSubmit"
        Me.cmdSubmit.Size = New System.Drawing.Size(104, 23)
        Me.cmdSubmit.TabIndex = 6
        Me.cmdSubmit.Text = "Submit Order"
        '
        'cmdStatus
        '
        Me.cmdStatus.Location = New System.Drawing.Point(8, 264)
        Me.cmdStatus.Name = "cmdStatus"
        Me.cmdStatus.Size = New System.Drawing.Size(144, 23)
        Me.cmdStatus.TabIndex = 7
        Me.cmdStatus.Text = "Check Order Status"
        '
        'GroupBox1
        '
        Me.GroupBox1.Controls.AddRange(New System.Windows.Forms.Control() {Me.rbSpecialOrder, Me.rbOrder})
        Me.GroupBox1.Location = New System.Drawing.Point(296, 8)
        Me.GroupBox1.Name = "GroupBox1"
        Me.GroupBox1.Size = New System.Drawing.Size(184, 48)
        Me.GroupBox1.TabIndex = 8
        Me.GroupBox1.TabStop = False
        Me.GroupBox1.Text = "Type"
        '
        'rbSpecialOrder
        '
        Me.rbSpecialOrder.Location = New System.Drawing.Point(8, 16)
        Me.rbSpecialOrder.Name = "rbSpecialOrder"
        Me.rbSpecialOrder.TabIndex = 1
        Me.rbSpecialOrder.Text = "Special Order"
        '
        'rbOrder
        '
        Me.rbOrder.Location = New System.Drawing.Point(120, 16)
        Me.rbOrder.Name = "rbOrder"
        Me.rbOrder.Size = New System.Drawing.Size(56, 24)
        Me.rbOrder.TabIndex = 0
        Me.rbOrder.Text = "Order"
        '
        'frmMain
        '
        Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
        Me.ClientSize = New System.Drawing.Size(488, 365)
        Me.Controls.AddRange(New System.Windows.Forms.Control() {Me.GroupBox1, Me.cmdStatus, Me.cmdSubmit, Me.txtCheckResult, Me.txtXML, Me.lblSubmitResult, Me.Label3, Me.Label2, Me.Label1})
        Me.Name = "frmMain"
        Me.Text = "Order Test Processing"
        Me.GroupBox1.ResumeLayout(False)
        Me.ResumeLayout(False)

    End Sub

#End Region

    Private Sub rbSpecialOrder_CheckedChanged(ByVal sender As System.Object, ByVal e As System.EventArgs) _
                            Handles rbSpecialOrder.CheckedChanged
        LoadXML()
    End Sub

    Private Sub rbOrder_CheckedChanged(ByVal sender As System.Object, ByVal e As System.EventArgs) _
                                    Handles rbOrder.CheckedChanged
        LoadXML()
    End Sub


    Private Sub LoadXML()
        Dim objXML As XmlTextReader
        With txtXML
            .Text = "<?xml version='1.0'?>" & vbCrLf
            If rbSpecialOrder.Checked Then
                .Text &= "<!DOCTYPE SpecialOrder SYSTEM 'SpecialOrder.dtd'>" & vbCrLf
                objXML = New XmlTextReader(Environment.CurrentDirectory & "\SpecialOrder.xml")
            Else
                objXML = New XmlTextReader(Environment.CurrentDirectory & "\Order.xml")
            End If
            While objXML.Read
                .Text &= objXML.ReadOuterXml
            End While
            .Focus()
            .Select(0, 0)
        End With
        txtCheckResult.Text = ""
        lblSubmitResult.Text = ""
    End Sub

    Private Sub cmdSubmit_Click( _
            ByVal sender As System.Object, ByVal e As System.EventArgs) _
                                                     Handles cmdSubmit.Click
        txtCheckResult.Text = ""
        lblSubmitResult.Text = ""
        lblSubmitResult.Text = m_DocReceive.Persist(txtXML.Text)
    End Sub

    Private Sub cmdStatus_Click( _
            ByVal sender As System.Object, ByVal e As System.EventArgs) _
                                                     Handles cmdStatus.Click
        txtCheckResult.Text = ""
        txtCheckResult.Text = m_DocReceive.GetStatus(lblSubmitResult.Text)
    End Sub


End Class
