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
	Public WithEvents Command2 As System.Windows.Forms.Button
	Public WithEvents Text3 As System.Windows.Forms.TextBox
	Public WithEvents Command1 As System.Windows.Forms.Button
	Public WithEvents Text2 As System.Windows.Forms.TextBox
	Public WithEvents Text1 As System.Windows.Forms.TextBox
	Public WithEvents MSFlexGrid1 As AxMSFlexGridLib.AxMSFlexGrid
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
		Me.Command2 = New System.Windows.Forms.Button
		Me.Text3 = New System.Windows.Forms.TextBox
		Me.Command1 = New System.Windows.Forms.Button
		Me.Text2 = New System.Windows.Forms.TextBox
		Me.Text1 = New System.Windows.Forms.TextBox
		Me.MSFlexGrid1 = New AxMSFlexGridLib.AxMSFlexGrid
		Me.Label2 = New System.Windows.Forms.Label
		Me.Label1 = New System.Windows.Forms.Label
		CType(Me.MSFlexGrid1, System.ComponentModel.ISupportInitialize).BeginInit()
		Me.Text = "Form1"
		Me.ClientSize = New System.Drawing.Size(859, 768)
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
		Me.Command2.TextAlign = System.Drawing.ContentAlignment.MiddleCenter
		Me.Command2.Text = "Perform Iteration"
		Me.Command2.Size = New System.Drawing.Size(161, 41)
		Me.Command2.Location = New System.Drawing.Point(430, 70)
		Me.Command2.TabIndex = 7
		Me.Command2.Font = New System.Drawing.Font("Arial", 8!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
		Me.Command2.BackColor = System.Drawing.SystemColors.Control
		Me.Command2.CausesValidation = True
		Me.Command2.Enabled = True
		Me.Command2.Cursor = System.Windows.Forms.Cursors.Default
		Me.Command2.RightToLeft = System.Windows.Forms.RightToLeft.No
		Me.Command2.TabStop = True
		Me.Command2.Name = "Command2"
		Me.Text3.AutoSize = False
		Me.Text3.Size = New System.Drawing.Size(141, 31)
		Me.Text3.Location = New System.Drawing.Point(230, 70)
		Me.Text3.TabIndex = 6
		Me.Text3.Font = New System.Drawing.Font("Arial", 8!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
		Me.Text3.AcceptsReturn = True
		Me.Text3.TextAlign = System.Windows.Forms.HorizontalAlignment.Left
		Me.Text3.BackColor = System.Drawing.SystemColors.Window
		Me.Text3.CausesValidation = True
		Me.Text3.Enabled = True
		Me.Text3.ForeColor = System.Drawing.SystemColors.WindowText
		Me.Text3.HideSelection = True
		Me.Text3.ReadOnly = False
		Me.Text3.Maxlength = 0
		Me.Text3.Cursor = System.Windows.Forms.Cursors.IBeam
		Me.Text3.MultiLine = False
		Me.Text3.RightToLeft = System.Windows.Forms.RightToLeft.No
		Me.Text3.ScrollBars = System.Windows.Forms.ScrollBars.None
		Me.Text3.TabStop = True
		Me.Text3.Visible = True
		Me.Text3.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D
		Me.Text3.Name = "Text3"
		Me.Command1.TextAlign = System.Drawing.ContentAlignment.MiddleCenter
		Me.Command1.Text = "Format Data Entry Grid"
		Me.Command1.Size = New System.Drawing.Size(161, 41)
		Me.Command1.Location = New System.Drawing.Point(430, 10)
		Me.Command1.TabIndex = 4
		Me.Command1.Font = New System.Drawing.Font("Arial", 8!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
		Me.Command1.BackColor = System.Drawing.SystemColors.Control
		Me.Command1.CausesValidation = True
		Me.Command1.Enabled = True
		Me.Command1.Cursor = System.Windows.Forms.Cursors.Default
		Me.Command1.RightToLeft = System.Windows.Forms.RightToLeft.No
		Me.Command1.TabStop = True
		Me.Command1.Name = "Command1"
		Me.Text2.AutoSize = False
		Me.Text2.Size = New System.Drawing.Size(141, 31)
		Me.Text2.Location = New System.Drawing.Point(230, 10)
		Me.Text2.TabIndex = 3
		Me.Text2.Font = New System.Drawing.Font("Arial", 8!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
		Me.Text2.AcceptsReturn = True
		Me.Text2.TextAlign = System.Windows.Forms.HorizontalAlignment.Left
		Me.Text2.BackColor = System.Drawing.SystemColors.Window
		Me.Text2.CausesValidation = True
		Me.Text2.Enabled = True
		Me.Text2.ForeColor = System.Drawing.SystemColors.WindowText
		Me.Text2.HideSelection = True
		Me.Text2.ReadOnly = False
		Me.Text2.Maxlength = 0
		Me.Text2.Cursor = System.Windows.Forms.Cursors.IBeam
		Me.Text2.MultiLine = False
		Me.Text2.RightToLeft = System.Windows.Forms.RightToLeft.No
		Me.Text2.ScrollBars = System.Windows.Forms.ScrollBars.None
		Me.Text2.TabStop = True
		Me.Text2.Visible = True
		Me.Text2.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D
		Me.Text2.Name = "Text2"
		Me.Text1.AutoSize = False
		Me.Text1.Size = New System.Drawing.Size(91, 31)
		Me.Text1.Location = New System.Drawing.Point(150, 260)
		Me.Text1.TabIndex = 1
		Me.Text1.Font = New System.Drawing.Font("Arial", 8!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
		Me.Text1.AcceptsReturn = True
		Me.Text1.TextAlign = System.Windows.Forms.HorizontalAlignment.Left
		Me.Text1.BackColor = System.Drawing.SystemColors.Window
		Me.Text1.CausesValidation = True
		Me.Text1.Enabled = True
		Me.Text1.ForeColor = System.Drawing.SystemColors.WindowText
		Me.Text1.HideSelection = True
		Me.Text1.ReadOnly = False
		Me.Text1.Maxlength = 0
		Me.Text1.Cursor = System.Windows.Forms.Cursors.IBeam
		Me.Text1.MultiLine = False
		Me.Text1.RightToLeft = System.Windows.Forms.RightToLeft.No
		Me.Text1.ScrollBars = System.Windows.Forms.ScrollBars.None
		Me.Text1.TabStop = True
		Me.Text1.Visible = True
		Me.Text1.BorderStyle = System.Windows.Forms.BorderStyle.Fixed3D
		Me.Text1.Name = "Text1"
		MSFlexGrid1.OcxState = CType(resources.GetObject("MSFlexGrid1.OcxState"), System.Windows.Forms.AxHost.State)
		Me.MSFlexGrid1.Size = New System.Drawing.Size(841, 581)
		Me.MSFlexGrid1.Location = New System.Drawing.Point(10, 140)
		Me.MSFlexGrid1.TabIndex = 0
		Me.MSFlexGrid1.Name = "MSFlexGrid1"
		Me.Label2.Text = "Enter in the Convergence Criterion"
		Me.Label2.Size = New System.Drawing.Size(191, 31)
		Me.Label2.Location = New System.Drawing.Point(10, 70)
		Me.Label2.TabIndex = 5
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
		Me.Label1.Text = "Enter in the number of nodes"
		Me.Label1.Size = New System.Drawing.Size(191, 31)
		Me.Label1.Location = New System.Drawing.Point(10, 10)
		Me.Label1.TabIndex = 2
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
		Me.Controls.Add(Command2)
		Me.Controls.Add(Text3)
		Me.Controls.Add(Command1)
		Me.Controls.Add(Text2)
		Me.Controls.Add(Text1)
		Me.Controls.Add(MSFlexGrid1)
		Me.Controls.Add(Label2)
		Me.Controls.Add(Label1)
		CType(Me.MSFlexGrid1, System.ComponentModel.ISupportInitialize).EndInit()
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
    Public NumNodes As Short
    Public MaxRow As Short
    Private Sub Command1_Click(ByVal eventSender As System.Object, ByVal eventArgs As System.EventArgs) Handles Command1.Click
        Dim y As Short
        Dim x As Short
        With MSFlexGrid1
            For x = 0 To NumNodes + 3
                For y = 0 To MaxRow + 1
                    .Col = x
                    .Row = y
                    .Text = ""
                Next y
            Next x
            .Row = 0
            NumNodes = CShort(Text2.Text)
            For x = 1 To NumNodes
                .Col = x
                .Text = "ai" & x
            Next x
            .Col = NumNodes + 1
            .Text = "Ci"
            .Col = NumNodes + 2
            .Text = "Estimations"
            .Col = 0
            For x = 1 To NumNodes
                .Row = x
                .Text = CStr(x)
            Next x
            MaxRow = .Row
            .Row = 1
            .Col = 1
        End With
    End Sub

    Private Sub Command2_Click(ByVal eventSender As System.Object, ByVal eventArgs As System.EventArgs) Handles Command2.Click
        Dim K As Short
        Dim J As Short
        Dim I As Short
        Dim z As Short
        Dim y As Short
        Dim x As Short
        Dim a(,) As Double
        Dim C() As Double
        Dim T1() As Double
        Dim T2() As Double
        Dim T3() As Double
        Dim N As Integer
        N = CShort(Text2.Text)
        ReDim a(N, N)
        ReDim C(N)
        ReDim T1(N)
        ReDim T2(N)
        ReDim T3(N)
        Dim Conv As Boolean
        Dim E As Double 'convergence criterion
        Dim Count As Short
        Dim S1 As Double
        Dim S2 As Double
        E = CDbl(Text3.Text)
        For x = 1 To N
            For y = 1 To N
                MSFlexGrid1.Row = x
                MSFlexGrid1.Col = y
                a(x, y) = CDbl(MSFlexGrid1.Text)
            Next y
        Next x
        For z = 1 To N
            MSFlexGrid1.Col = NumNodes + 1
            MSFlexGrid1.Row = z
            C(z) = CDbl(MSFlexGrid1.Text)
            MSFlexGrid1.Col = NumNodes + 2
            T2(z) = CDbl(MSFlexGrid1.Text)
        Next z
        MSFlexGrid1.Row = NumNodes + 2
        MSFlexGrid1.Col = 0
        MSFlexGrid1.Text = "Iteration"
        For I = 1 To NumNodes
            MSFlexGrid1.Col = I
            MSFlexGrid1.Text = "T" & I
        Next I
        Count = 1
        Do Until Conv = True
            Conv = True
            MSFlexGrid1.Row = MSFlexGrid1.Row + 1
            MSFlexGrid1.Col = 0
            MSFlexGrid1.Text = CStr(Count)
            For I = 1 To N
                S1 = 0
                S2 = 0
                T1(I) = (C(I) / a(I, I))
                If I - 1 > 0 Then
                    For J = 1 To I - 1
                        S1 = S1 + (a(I, J) / a(I, I)) * T2(J)
                    Next J
                    T1(I) = T1(I) - S1
                End If
                If I + 1 <= N Then
                    For K = I + 1 To N
                        S2 = S2 + (a(I, K) / a(I, I)) * T2(K)
                    Next K
                    T1(I) = T1(I) - S2
                End If
                MSFlexGrid1.Col = MSFlexGrid1.Col + 1
                MSFlexGrid1.Text = (System.Math.Round(T1(I) * 10000) / 10000)
                If T1(I) - T2(I) > E Then
                    Conv = False
                End If
                T3(I) = T2(I)
                T2(I) = T1(I)
            Next I
            Count = Count + 1
        Loop
        MaxRow = MSFlexGrid1.Row
    End Sub

    Private Sub Form1_Load(ByVal eventSender As System.Object, ByVal e As System.EventArgs) _
    Handles MyBase.Load
        Text1.Visible = False
        Text1.Font = MSFlexGrid1.Font
        Dim x As Short
        With MSFlexGrid1
            .Cols = 100
            .Rows = 2000
            Show()
            .Col = 0
            .Row = 0
            .Text = "Equation #"
            For x = 1 To 4
                .Col = x
                .Text = "ai" & x
            Next x
            .Col = 5
            .Text = "Ci"
            .Col = 6
            .Text = "Estimations"
            .Col = 0
            For x = 1 To 4
                .Row = x
                .Text = CStr(x)
            Next x
            .Row = 1
            .Col = 1
        End With
        NumNodes = 4
        MaxRow = 4
        DimTextBox()
    End Sub
    Private Sub DimTextBox()
        With MSFlexGrid1
            Text1.Left = VB6.TwipsToPixelsX(.CellLeft + VB6.PixelsToTwipsX(.Left))
            Text1.Top = VB6.TwipsToPixelsY(.CellTop + VB6.PixelsToTwipsY(.Top))
            Text1.Width = VB6.TwipsToPixelsX(.CellWidth)
            Text1.Height = VB6.TwipsToPixelsY(.CellHeight)
            Text1.Visible = True
            Text1.Focus()
        End With
    End Sub
    Private Sub MSFlexGrid1_EnterCell(ByVal eventSender As System.Object, ByVal eventArgs As System.EventArgs) Handles MSFlexGrid1.EnterCell
        Text1.Text = MSFlexGrid1.Text
        DimTextBox()
    End Sub
    Private Sub Text1_TextChanged(ByVal eventSender As System.Object, ByVal eventArgs As System.EventArgs) Handles Text1.TextChanged
        MSFlexGrid1.Text = Text1.Text
    End Sub
    Private Sub Text1_KeyDown(ByVal eventSender As System.Object, ByVal eventArgs As System.Windows.Forms.KeyEventArgs) Handles Text1.KeyDown
        Dim KeyCode As Short = eventArgs.KeyCode
        Dim Shift As Short = eventArgs.KeyData \ &H10000
        With MSFlexGrid1
            Select Case KeyCode
                Case System.Windows.Forms.Keys.Down
                    If .Row < .Rows - 1 Then .Row = .Row + 1
                Case System.Windows.Forms.Keys.Up
                    If .Row > 1 Then .Row = .Row - 1
                Case System.Windows.Forms.Keys.Right
                    If .Col < .Cols - 1 Then .Col = .Col + 1
                Case System.Windows.Forms.Keys.Left
                    If .Col > 1 Then .Col = .Col - 1
            End Select
        End With
    End Sub
    Private Sub Text1_KeyPress(ByVal eventSender As System.Object, ByVal eventArgs As System.Windows.Forms.KeyPressEventArgs) Handles Text1.KeyPress
        Dim KeyAscii As Short = Asc(eventArgs.KeyChar)
        With MSFlexGrid1
            If KeyAscii = System.Windows.Forms.Keys.Return And .Row < .Rows - 1 Then
                .Row = .Row + 1
            End If
        End With
        If KeyAscii = 0 Then
            eventArgs.Handled = True
        End If
    End Sub
End Class