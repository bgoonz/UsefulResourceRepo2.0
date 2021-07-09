Option Strict Off
Option Explicit On
Friend Class Form1
	Inherits System.Windows.Forms.Form
#Region "Windows Form Designer generated code "
	Public Sub New()
		MyBase.New()
		If m_vb6FormDefInstance Is Nothing Then
			If m_InitializingDefInstance Then
				m_vb6FormDefInstance = Me
			Else
				Try 
					'For the start-up form, the first instance created is the default instance.
					If System.Reflection.Assembly.GetExecutingAssembly.EntryPoint.DeclaringType Is Me.GetType Then
						m_vb6FormDefInstance = Me
					End If
				Catch
				End Try
			End If
		End If
		'This call is required by the Windows Form Designer.
		InitializeComponent()
	End Sub
	'Form overrides dispose to clean up the component list.
	Protected Overloads Overrides Sub Dispose(ByVal Disposing As Boolean)
		If Disposing Then
			If Not components Is Nothing Then
				components.Dispose()
			End If
		End If
		MyBase.Dispose(Disposing)
	End Sub
	'Required by the Windows Form Designer
	Private components As System.ComponentModel.Container
	Public ToolTip1 As System.Windows.Forms.ToolTip
	Public WithEvents Command1 As System.Windows.Forms.Button
	Public WithEvents RichTextBox3 As AxRichTextLib.AxRichTextBox
	Public WithEvents RichTextBox2 As AxRichTextLib.AxRichTextBox
	Public WithEvents RichTextBox1 As AxRichTextLib.AxRichTextBox
	Public WithEvents Label3 As System.Windows.Forms.Label
	Public WithEvents Label2 As System.Windows.Forms.Label
	Public WithEvents Label1 As System.Windows.Forms.Label
	'NOTE: The following procedure is required by the Windows Form Designer
	'It can be modified using the Windows Form Designer.
	'Do not modify it using the code editor.
	<System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
		Dim resources As System.Resources.ResourceManager = New System.Resources.ResourceManager(GetType(Form1))
		Me.components = New System.ComponentModel.Container()
		Me.ToolTip1 = New System.Windows.Forms.ToolTip(components)
		Me.ToolTip1.Active = True
		Me.Command1 = New System.Windows.Forms.Button
		Me.RichTextBox3 = New AxRichTextLib.AxRichTextBox
		Me.RichTextBox2 = New AxRichTextLib.AxRichTextBox
		Me.RichTextBox1 = New AxRichTextLib.AxRichTextBox
		Me.Label3 = New System.Windows.Forms.Label
		Me.Label2 = New System.Windows.Forms.Label
		Me.Label1 = New System.Windows.Forms.Label
		CType(Me.RichTextBox3, System.ComponentModel.ISupportInitialize).BeginInit()
		CType(Me.RichTextBox2, System.ComponentModel.ISupportInitialize).BeginInit()
		CType(Me.RichTextBox1, System.ComponentModel.ISupportInitialize).BeginInit()
		Me.Text = "Genes to Proteins"
		Me.ClientSize = New System.Drawing.Size(771, 680)
		Me.Location = New System.Drawing.Point(4, 29)
		Me.StartPosition = System.Windows.Forms.FormStartPosition.WindowsDefaultLocation
		Me.Font = New System.Drawing.Font("Arial", 8!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
		Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
		Me.BackColor = System.Drawing.SystemColors.Control
		Me.FormBorderStyle = System.Windows.Forms.FormBorderStyle.Sizable
		Me.ControlBox = True
		Me.Enabled = True
		Me.KeyPreview = False
		Me.MaximizeBox = True
		Me.MinimizeBox = True
		Me.Cursor = System.Windows.Forms.Cursors.Default
		Me.RightToLeft = System.Windows.Forms.RightToLeft.No
		Me.ShowInTaskbar = True
		Me.HelpButton = False
		Me.WindowState = System.Windows.Forms.FormWindowState.Normal
		Me.Name = "Form1"
		Me.Command1.TextAlign = System.Drawing.ContentAlignment.MiddleCenter
		Me.Command1.Text = "Make Protien"
		Me.Command1.Size = New System.Drawing.Size(141, 31)
		Me.Command1.Location = New System.Drawing.Point(440, 10)
		Me.Command1.TabIndex = 6
		Me.Command1.Font = New System.Drawing.Font("Arial", 8!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
		Me.Command1.BackColor = System.Drawing.SystemColors.Control
		Me.Command1.CausesValidation = True
		Me.Command1.Enabled = True
		Me.Command1.Cursor = System.Windows.Forms.Cursors.Default
		Me.Command1.RightToLeft = System.Windows.Forms.RightToLeft.No
		Me.Command1.TabStop = True
		Me.Command1.Name = "Command1"
		RichTextBox3.OcxState = CType(resources.GetObject("RichTextBox3.OcxState"), System.Windows.Forms.AxHost.State)
		Me.RichTextBox3.Size = New System.Drawing.Size(741, 181)
		Me.RichTextBox3.Location = New System.Drawing.Point(10, 390)
		Me.RichTextBox3.TabIndex = 5
		Me.RichTextBox3.Name = "RichTextBox3"
		RichTextBox2.OcxState = CType(resources.GetObject("RichTextBox2.OcxState"), System.Windows.Forms.AxHost.State)
		Me.RichTextBox2.Size = New System.Drawing.Size(721, 101)
		Me.RichTextBox2.Location = New System.Drawing.Point(10, 210)
		Me.RichTextBox2.TabIndex = 3
		Me.RichTextBox2.Name = "RichTextBox2"
		RichTextBox1.OcxState = CType(resources.GetObject("RichTextBox1.OcxState"), System.Windows.Forms.AxHost.State)
		Me.RichTextBox1.Size = New System.Drawing.Size(711, 101)
		Me.RichTextBox1.Location = New System.Drawing.Point(10, 50)
		Me.RichTextBox1.TabIndex = 1
		Me.RichTextBox1.Name = "RichTextBox1"
		Me.Label3.Text = "The possible proteins from each of the three reading frames are"
		Me.Label3.Size = New System.Drawing.Size(551, 41)
		Me.Label3.Location = New System.Drawing.Point(10, 330)
		Me.Label3.TabIndex = 4
		Me.Label3.Font = New System.Drawing.Font("Arial", 8!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
		Me.Label3.TextAlign = System.Drawing.ContentAlignment.TopLeft
		Me.Label3.BackColor = System.Drawing.SystemColors.Control
		Me.Label3.Enabled = True
		Me.Label3.ForeColor = System.Drawing.SystemColors.ControlText
		Me.Label3.Cursor = System.Windows.Forms.Cursors.Default
		Me.Label3.RightToLeft = System.Windows.Forms.RightToLeft.No
		Me.Label3.UseMnemonic = True
		Me.Label3.Visible = True
		Me.Label3.AutoSize = False
		Me.Label3.BorderStyle = System.Windows.Forms.BorderStyle.None
		Me.Label3.Name = "Label3"
		Me.Label2.Text = "The mRNA resulting from transcription (5'->3')"
		Me.Label2.Size = New System.Drawing.Size(511, 31)
		Me.Label2.Location = New System.Drawing.Point(10, 170)
		Me.Label2.TabIndex = 2
		Me.Label2.Font = New System.Drawing.Font("Arial", 8!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
		Me.Label2.TextAlign = System.Drawing.ContentAlignment.TopLeft
		Me.Label2.BackColor = System.Drawing.SystemColors.Control
		Me.Label2.Enabled = True
		Me.Label2.ForeColor = System.Drawing.SystemColors.ControlText
		Me.Label2.Cursor = System.Windows.Forms.Cursors.Default
		Me.Label2.RightToLeft = System.Windows.Forms.RightToLeft.No
		Me.Label2.UseMnemonic = True
		Me.Label2.Visible = True
		Me.Label2.AutoSize = False
		Me.Label2.BorderStyle = System.Windows.Forms.BorderStyle.None
		Me.Label2.Name = "Label2"
		Me.Label1.Text = "Enter the gene sequence to be transcribed (5'->3')"
		Me.Label1.Size = New System.Drawing.Size(471, 31)
		Me.Label1.Location = New System.Drawing.Point(10, 10)
		Me.Label1.TabIndex = 0
		Me.Label1.Font = New System.Drawing.Font("Arial", 8!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
		Me.Label1.TextAlign = System.Drawing.ContentAlignment.TopLeft
		Me.Label1.BackColor = System.Drawing.SystemColors.Control
		Me.Label1.Enabled = True
		Me.Label1.ForeColor = System.Drawing.SystemColors.ControlText
		Me.Label1.Cursor = System.Windows.Forms.Cursors.Default
		Me.Label1.RightToLeft = System.Windows.Forms.RightToLeft.No
		Me.Label1.UseMnemonic = True
		Me.Label1.Visible = True
		Me.Label1.AutoSize = False
		Me.Label1.BorderStyle = System.Windows.Forms.BorderStyle.None
		Me.Label1.Name = "Label1"
		Me.Controls.Add(Command1)
		Me.Controls.Add(RichTextBox3)
		Me.Controls.Add(RichTextBox2)
		Me.Controls.Add(RichTextBox1)
		Me.Controls.Add(Label3)
		Me.Controls.Add(Label2)
		Me.Controls.Add(Label1)
		CType(Me.RichTextBox3, System.ComponentModel.ISupportInitialize).EndInit()
		CType(Me.RichTextBox2, System.ComponentModel.ISupportInitialize).EndInit()
		CType(Me.RichTextBox1, System.ComponentModel.ISupportInitialize).EndInit()
	End Sub
#End Region 
#Region "Upgrade Support "
	Private Shared m_vb6FormDefInstance As Form1
	Private Shared m_InitializingDefInstance As Boolean
	Public Shared Property DefInstance() As Form1
		Get
			If m_vb6FormDefInstance Is Nothing OrElse m_vb6FormDefInstance.IsDisposed Then
				m_InitializingDefInstance = True
				m_vb6FormDefInstance = New Form1()
				m_InitializingDefInstance = False
			End If
			DefInstance = m_vb6FormDefInstance
		End Get
		Set
			m_vb6FormDefInstance = Value
		End Set
	End Property
#End Region 
    Private Function Transcribe(ByVal DNA As String) As String
        Dim I As Integer
        Dim mRNA As String
        DNA = UCase(DNA)
        For I = 1 To Len(DNA)
            If Mid(DNA, I, 1) = "A" Then
                mRNA = "U" & mRNA
            ElseIf Mid(DNA, I, 1) = "T" Then
                mRNA = "A" & mRNA
            ElseIf Mid(DNA, I, 1) = "G" Then
                mRNA = "C" & mRNA
            ElseIf Mid(DNA, I, 1) = "C" Then
                mRNA = "G" & mRNA
            Else : MsgBox("Error in gene sequence")
            End If
        Next I
        Transcribe = mRNA
    End Function
    Private Function Translate(ByVal RNA As String, ByVal RF As Short) As String
        Dim STP As Boolean
        Dim Start As Boolean
        Dim Prot As String
        Dim Codon As String
        Dim StartNum As Integer
        Dim RFV As Short
        STP = False
        Start = False
        RFV = RF
        Do Until Start = True Or RFV > (Len(RNA) - 2)
            If Mid(RNA, RFV, 3) = "AUG" Then
                Start = True
                StartNum = RFV
            End If
            RFV = RFV + 3
        Loop
        RFV = StartNum
        If Start = True Then
            Do Until STP = True Or RFV > (Len(RNA) - 2)
                Codon = Mid(RNA, RFV, 3)
                If Codon = "AUG" Then
                    Prot = Prot & "M"
                ElseIf Codon = "UGA" Then
                    STP = True
                ElseIf Codon = "UUU" Then
                    Prot = Prot & "F"
                ElseIf Codon = "UUC" Then
                    Prot = Prot & "F"
                ElseIf Codon = "UUA" Then
                    Prot = Prot & "L"
                ElseIf Codon = "UUG" Then
                    Prot = Prot & "L"
                ElseIf Codon = "CUU" Then
                    Prot = Prot & "L"
                ElseIf Codon = "CUC" Then
                    Prot = Prot & "L"
                ElseIf Codon = "CUA" Then
                    Prot = Prot & "L"
                ElseIf Codon = "CUG" Then
                    Prot = Prot & "L"
                ElseIf Codon = "AUU" Then
                    Prot = Prot & "I"
                ElseIf Codon = "AUC" Then
                    Prot = Prot & "I"
                ElseIf Codon = "AUA" Then
                    Prot = Prot & "I"
                ElseIf Codon = "GUU" Then
                    Prot = Prot & "V"
                ElseIf Codon = "GUC" Then
                    Prot = Prot & "V"
                ElseIf Codon = "GUA" Then
                    Prot = Prot & "V"
                ElseIf Codon = "GUG" Then
                    Prot = Prot & "V"
                ElseIf Codon = "UAU" Then
                    Prot = Prot & "Y"
                ElseIf Codon = "UAC" Then
                    Prot = Prot & "Y"
                ElseIf Codon = "UAA" Then
                    STP = True
                ElseIf Codon = "UAG" Then
                    STP = True
                ElseIf Codon = "UCU" Then
                    Prot = Prot & "S"
                ElseIf Codon = "UCC" Then
                    Prot = Prot & "S"
                ElseIf Codon = "UCA" Then
                    Prot = Prot & "S"
                ElseIf Codon = "UCG" Then
                    Prot = Prot & "S"
                ElseIf Codon = "CCU" Then
                    Prot = Prot & "P"
                ElseIf Codon = "CCC" Then
                    Prot = Prot & "P"
                ElseIf Codon = "CCA" Then
                    Prot = Prot & "P"
                ElseIf Codon = "CCG" Then
                    Prot = Prot & "P"
                ElseIf Codon = "ACU" Then
                    Prot = Prot & "T"
                ElseIf Codon = "ACC" Then
                    Prot = Prot & "T"
                ElseIf Codon = "ACA" Then
                    Prot = Prot & "T"
                ElseIf Codon = "ACG" Then
                    Prot = Prot & "T"
                ElseIf Codon = "GCU" Then
                    Prot = Prot & "A"
                ElseIf Codon = "GCC" Then
                    Prot = Prot & "A"
                ElseIf Codon = "GCA" Then
                    Prot = Prot & "A"
                ElseIf Codon = "GCG" Then
                    Prot = Prot & "A"
                ElseIf Codon = "CAU" Then
                    Prot = Prot & "H"
                ElseIf Codon = "CAC" Then
                    Prot = Prot & "H"
                ElseIf Codon = "CAA" Then
                    Prot = Prot & "Q"
                ElseIf Codon = "CAG" Then
                    Prot = Prot & "Q"
                ElseIf Codon = "AAU" Then
                    Prot = Prot & "N"
                ElseIf Codon = "AAC" Then
                    Prot = Prot & "N"
                ElseIf Codon = "AAA" Then
                    Prot = Prot & "K"
                ElseIf Codon = "AAG" Then
                    Prot = Prot & "K"
                ElseIf Codon = "GAU" Then
                    Prot = Prot & "D"
                ElseIf Codon = "GAC" Then
                    Prot = Prot & "D"
                ElseIf Codon = "GAA" Then
                    Prot = Prot & "E"
                ElseIf Codon = "GAG" Then
                    Prot = Prot & "E"
                ElseIf Codon = "UGU" Then
                    Prot = Prot & "C"
                ElseIf Codon = "UGC" Then
                    Prot = Prot & "C"
                ElseIf Codon = "UGG" Then
                    Prot = Prot & "W"
                ElseIf Codon = "CGU" Then
                    Prot = Prot & "R"
                ElseIf Codon = "CGC" Then
                    Prot = Prot & "R"
                ElseIf Codon = "CGA" Then
                    Prot = Prot & "R"
                ElseIf Codon = "CGG" Then
                    Prot = Prot & "R"
                ElseIf Codon = "AGU" Then
                    Prot = Prot & "S"
                ElseIf Codon = "AGC" Then
                    Prot = Prot & "S"
                ElseIf Codon = "AGA" Then
                    Prot = Prot & "R"
                ElseIf Codon = "AGG" Then
                    Prot = Prot & "R"
                ElseIf Codon = "GGU" Then
                    Prot = Prot & "G"
                ElseIf Codon = "GGC" Then
                    Prot = Prot & "G"
                ElseIf Codon = "GGA" Then
                    Prot = Prot & "G"
                ElseIf Codon = "GGG" Then
                    Prot = Prot & "G"
                End If
                RFV = RFV + 3
            Loop
        Else : Prot = "No Start Codon in reading frame"
        End If
        Translate = Prot
    End Function
    Private Sub Command1_Click(ByVal eventSender As System.Object, ByVal eventArgs As System.EventArgs) Handles Command1.Click
        Dim DNA As String
        Dim RNA As String
        Dim RF1 As String
        Dim RF2 As String
        Dim RF3 As String
        DNA = RichTextBox1.Text
        RNA = Transcribe(DNA)
        RichTextBox2.Text = RNA
        RF1 = Translate(RNA, 1)
        RF2 = Translate(RNA, 2)
        RF3 = Translate(RNA, 3)
        RichTextBox3.Text = "Reading Frame 1" & ControlChars.CrLf & ControlChars.CrLf & RF1 & ControlChars.CrLf & ControlChars.CrLf & "Reading Frame 2" & ControlChars.CrLf & ControlChars.CrLf & RF2 & ControlChars.CrLf & ControlChars.CrLf & "Reading Frame 3" & ControlChars.CrLf & ControlChars.CrLf & RF3
    End Sub
End Class