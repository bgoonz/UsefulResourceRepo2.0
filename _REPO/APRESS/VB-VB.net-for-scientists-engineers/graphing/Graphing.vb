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
    Private components As System.ComponentModel.IContainer
	'Required by the Windows Form Designer
		Public ToolTip1 As System.Windows.Forms.ToolTip
	Public WithEvents Text2 As System.Windows.Forms.TextBox
	Public WithEvents Text1 As System.Windows.Forms.TextBox
	Public WithEvents Combo1 As System.Windows.Forms.ComboBox
	Public WithEvents Command1 As System.Windows.Forms.Button
	Public WithEvents MSChart1 As AxMSChart20Lib.AxMSChart
	Public WithEvents MSFlexGrid1 As AxMSFlexGridLib.AxMSFlexGrid
	'NOTE: The following procedure is required by the Windows Form Designer
	'It can be modified using the Windows Form Designer.
	'Do not modify it using the code editor.
	<System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
        Me.components = New System.ComponentModel.Container()
        Dim resources As System.Resources.ResourceManager = New System.Resources.ResourceManager(GetType(Form1))
        Me.ToolTip1 = New System.Windows.Forms.ToolTip(Me.components)
        Me.MSChart1 = New AxMSChart20Lib.AxMSChart()
        Me.Text1 = New System.Windows.Forms.TextBox()
        Me.Command1 = New System.Windows.Forms.Button()
        Me.Combo1 = New System.Windows.Forms.ComboBox()
        Me.MSFlexGrid1 = New AxMSFlexGridLib.AxMSFlexGrid()
        Me.Text2 = New System.Windows.Forms.TextBox()
        CType(Me.MSChart1, System.ComponentModel.ISupportInitialize).BeginInit()
        CType(Me.MSFlexGrid1, System.ComponentModel.ISupportInitialize).BeginInit()
        Me.SuspendLayout()
        '
        'MSChart1
        '
        Me.MSChart1.Location = New System.Drawing.Point(38, 341)
        Me.MSChart1.Name = "MSChart1"
        Me.MSChart1.OcxState = CType(resources.GetObject("MSChart1.OcxState"), System.Windows.Forms.AxHost.State)
        Me.MSChart1.Size = New System.Drawing.Size(872, 486)
        Me.MSChart1.TabIndex = 1
        '
        'Text1
        '
        Me.Text1.AcceptsReturn = True
        Me.Text1.AutoSize = False
        Me.Text1.BackColor = System.Drawing.SystemColors.Window
        Me.Text1.Cursor = System.Windows.Forms.Cursors.IBeam
        Me.Text1.Font = New System.Drawing.Font("Arial", 8!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Text1.ForeColor = System.Drawing.SystemColors.WindowText
        Me.Text1.Location = New System.Drawing.Point(653, 144)
        Me.Text1.MaxLength = 0
        Me.Text1.Name = "Text1"
        Me.Text1.RightToLeft = System.Windows.Forms.RightToLeft.No
        Me.Text1.Size = New System.Drawing.Size(142, 54)
        Me.Text1.TabIndex = 4
        Me.Text1.Text = ""
        '
        'Command1
        '
        Me.Command1.BackColor = System.Drawing.SystemColors.Control
        Me.Command1.Cursor = System.Windows.Forms.Cursors.Default
        Me.Command1.Font = New System.Drawing.Font("Arial", 8!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Command1.Location = New System.Drawing.Point(640, 210)
        Me.Command1.Name = "Command1"
        Me.Command1.RightToLeft = System.Windows.Forms.RightToLeft.No
        Me.Command1.Size = New System.Drawing.Size(219, 67)
        Me.Command1.TabIndex = 2
        Me.Command1.Text = "Graph It"
        '
        'Combo1
        '
        Me.Combo1.BackColor = System.Drawing.SystemColors.Window
        Me.Combo1.Cursor = System.Windows.Forms.Cursors.Default
        Me.Combo1.DropDownWidth = 219
        Me.Combo1.Font = New System.Drawing.Font("Arial", 8!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Combo1.ForeColor = System.Drawing.SystemColors.WindowText
        Me.Combo1.Location = New System.Drawing.Point(640, 66)
        Me.Combo1.Name = "Combo1"
        Me.Combo1.RightToLeft = System.Windows.Forms.RightToLeft.No
        Me.Combo1.Size = New System.Drawing.Size(219, 24)
        Me.Combo1.TabIndex = 3
        '
        'MSFlexGrid1
        '
        Me.MSFlexGrid1.Location = New System.Drawing.Point(51, 26)
        Me.MSFlexGrid1.Name = "MSFlexGrid1"
        Me.MSFlexGrid1.OcxState = CType(resources.GetObject("MSFlexGrid1.OcxState"), System.Windows.Forms.AxHost.State)
        Me.MSFlexGrid1.Size = New System.Drawing.Size(501, 290)
        Me.MSFlexGrid1.TabIndex = 0
        '
        'Text2
        '
        Me.Text2.AcceptsReturn = True
        Me.Text2.AutoSize = False
        Me.Text2.BackColor = System.Drawing.SystemColors.Window
        Me.Text2.Cursor = System.Windows.Forms.Cursors.IBeam
        Me.Text2.Font = New System.Drawing.Font("Arial", 8!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Text2.ForeColor = System.Drawing.SystemColors.WindowText
        Me.Text2.Location = New System.Drawing.Point(384, 393)
        Me.Text2.MaxLength = 0
        Me.Text2.Name = "Text2"
        Me.Text2.RightToLeft = System.Windows.Forms.RightToLeft.No
        Me.Text2.Size = New System.Drawing.Size(168, 41)
        Me.Text2.TabIndex = 5
        Me.Text2.Text = ""
        Me.Text2.Visible = False
        '
        'Form1
        '
        Me.AutoScaleBaseSize = New System.Drawing.Size(6, 16)
        Me.ClientSize = New System.Drawing.Size(944, 849)
        Me.Controls.AddRange(New System.Windows.Forms.Control() {Me.Text2, Me.Text1, Me.Combo1, Me.Command1, Me.MSChart1, Me.MSFlexGrid1})
        Me.Font = New System.Drawing.Font("Arial", 8!, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, CType(0, Byte))
        Me.Location = New System.Drawing.Point(4, 29)
        Me.Name = "Form1"
        Me.Text = "Graphing Data"
        CType(Me.MSChart1, System.ComponentModel.ISupportInitialize).EndInit()
        CType(Me.MSFlexGrid1, System.ComponentModel.ISupportInitialize).EndInit()
        Me.ResumeLayout(False)

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
	Private Sub Command1_Click(ByVal eventSender As System.Object, ByVal eventArgs As System.EventArgs) Handles Command1.Click
        Dim I As Short
		MSChart1.ColumnCount = 4
		MSChart1.RowCount = 10
		With Combo1
			If .Text = "3DBar" Then
				MSChart1.chartType = MSChart20Lib.VtChChartType.VtChChartType3dBar
			ElseIf .Text = "2DBar" Then 
				MSChart1.chartType = MSChart20Lib.VtChChartType.VtChChartType2dBar
			ElseIf .Text = "3DLine" Then 
				MSChart1.chartType = MSChart20Lib.VtChChartType.VtChChartType3dLine
			ElseIf .Text = "2DLine" Then 
				MSChart1.chartType = MSChart20Lib.VtChChartType.VtChChartType2dLine
			End If
		End With
		For I = 1 To 10
			MSChart1.Row = I
			MSChart1.RowLabel = I
		Next I
		PlotData()
		MSChart1.Visible = True
	End Sub
	
	Private Sub Form1_Load(ByVal eventSender As System.Object, ByVal eventArgs As System.EventArgs) Handles MyBase.Load
		Text1.Visible = False
		MSChart1.Visible = False
		Text1.Font = MSFlexGrid1.Font
		Dim x As Short
		With MSFlexGrid1
			.Cols = 5
			.Rows = 11
			Show()
			.Row = 0
			For x = 1 To 4
				.Col = x
				.Text = Chr(64 + x)
			Next x
			.Col = 0
			For x = 1 To 10
				.Row = x
				.Text = CStr(x)
			Next x
			.Row = 1
			.Col = 1
		End With
		DimTextBox()
		FillCombo()
		ChartLayout()
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
	
	
	Private Sub MSChart1_TitleSelected(ByVal eventSender As System.Object, ByVal eventArgs As AxMSChart20Lib._DMSChartEvents_TitleSelectedEvent) Handles MSChart1.TitleSelected
		Text2.Text = MSChart1.Title.Text
		Text2.Visible = True
		Text2.Focus()
    End Sub
    Private Sub Text2_KeyUp(ByVal sender As Object, ByVal e As System.Windows.Forms.KeyEventArgs) Handles Text2.KeyUp
        If e.KeyCode = Keys.Enter Then
            MSChart1.Title.Text = Text2.Text
        End If
    End Sub

    
    Private Sub mschart1_DblClick(ByVal eventSender As System.Object, ByVal eventArgs As System.EventArgs) Handles MSChart1.DblClick
        Text2.Visible = False
    End Sub
    Private Sub MSFlexGrid1_EnterCell(ByVal eventSender As System.Object, ByVal eventArgs As System.EventArgs) Handles MSFlexGrid1.EnterCell, MSFlexGrid1.Enter
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
    Private Sub FillCombo()
        Combo1.Text = "3DBar"
        Combo1.Items.Add("3DBar")
        Combo1.Items.Add("2DBar")
        Combo1.Items.Add("3DLine")
        Combo1.Items.Add("2DLine")
    End Sub
    Private Sub ChartLayout()
        With MSChart1
            .TitleText = "Leaf Growth Curves"
            .Plot.Axis(MSChart20Lib.VtChAxisId.VtChAxisIdX).AxisTitle._Text = "Number of Days"
            .Plot.Axis(MSChart20Lib.VtChAxisId.VtChAxisIdX).ValueScale.Auto = True
            .Plot.Axis(MSChart20Lib.VtChAxisId.VtChAxisIdY).AxisTitle._Text = "Length of Leaf (mm)"
            .Plot.Axis(MSChart20Lib.VtChAxisId.VtChAxisIdY).ValueScale.Auto = True
        End With
    End Sub
    Private Sub PlotData()
        Dim I As Short
        Dim J As Short
        With MSChart1
            For J = 1 To 4
                For I = 1 To 10
                    MSFlexGrid1.Col = J
                    MSFlexGrid1.Row = I
                    .Column = J
                    .Row = I
                    .Data = MSFlexGrid1.Text
                Next I
            Next J
        End With
    End Sub
End Class