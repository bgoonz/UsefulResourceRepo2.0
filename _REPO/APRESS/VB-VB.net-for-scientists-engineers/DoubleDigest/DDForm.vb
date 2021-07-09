Imports Microsoft.VisualBasic.Compatibility.VB6
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
    Friend WithEvents AxMSFlexGrid1 As AxMSFlexGridLib.AxMSFlexGrid
    Friend WithEvents TextBox1 As System.Windows.Forms.TextBox
    Friend WithEvents Button1 As System.Windows.Forms.Button

    'Required by the Windows Form Designer
    Private components As System.ComponentModel.Container

    'NOTE: The following procedure is required by the Windows Form Designer
    'It can be modified using the Windows Form Designer.  
    'Do not modify it using the code editor.
    <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
        Dim resources As System.Resources.ResourceManager = New System.Resources.ResourceManager(GetType(Form1))
        Me.TextBox1 = New System.Windows.Forms.TextBox()
        Me.AxMSFlexGrid1 = New AxMSFlexGridLib.AxMSFlexGrid()
        Me.Button1 = New System.Windows.Forms.Button()
        CType(Me.AxMSFlexGrid1, System.ComponentModel.ISupportInitialize).BeginInit()
        Me.SuspendLayout()
        '
        'TextBox1
        '
        Me.TextBox1.Location = New System.Drawing.Point(80, 88)
        Me.TextBox1.Name = "TextBox1"
        Me.TextBox1.Size = New System.Drawing.Size(88, 22)
        Me.TextBox1.TabIndex = 1
        Me.TextBox1.Text = ""
        '
        'AxMSFlexGrid1
        '
        Me.AxMSFlexGrid1.Location = New System.Drawing.Point(16, 16)
        Me.AxMSFlexGrid1.Name = "AxMSFlexGrid1"
        Me.AxMSFlexGrid1.OcxState = CType(resources.GetObject("AxMSFlexGrid1.OcxState"), System.Windows.Forms.AxHost.State)
        Me.AxMSFlexGrid1.Size = New System.Drawing.Size(392, 200)
        Me.AxMSFlexGrid1.TabIndex = 0
        '
        'Button1
        '
        Me.Button1.Location = New System.Drawing.Point(136, 264)
        Me.Button1.Name = "Button1"
        Me.Button1.Size = New System.Drawing.Size(168, 64)
        Me.Button1.TabIndex = 2
        Me.Button1.Text = "Order Cut Sites"
        '
        'Form1
        '
        Me.AutoScaleBaseSize = New System.Drawing.Size(6, 15)
        Me.ClientSize = New System.Drawing.Size(424, 383)
        Me.Controls.AddRange(New System.Windows.Forms.Control() {Me.Button1, Me.TextBox1, Me.AxMSFlexGrid1})
        Me.Name = "Form1"
        Me.Text = "Form1"
        CType(Me.AxMSFlexGrid1, System.ComponentModel.ISupportInitialize).EndInit()
        Me.ResumeLayout(False)

    End Sub

#End Region

    Private Sub Form1_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load
        TextBox1.Visible = False
        TextBox1.Font = AxMSFlexGrid1.Font
        With AxMSFlexGrid1
            .Cols = 5
            .Rows = 10
            .FixedCols = 0
            .FixedRows = 1
            .Row = 0
            .Col = 0
            .Text = "Digest 1"
            .Col = 1
            .Text = "Digest 2"
            .Col = 2
            .Text = "Double Digest"
            .Col = 3
            .Text = "Ordered Cuts"
            .Row = 1
            .Col = 0
        End With
        DimTextBox()


    End Sub

    Private Sub DimTextBox()
        With AxMSFlexGrid1

            TextBox1.Location = New Point(TwipsToPixelsX(.CellLeft) + .Location.X, TwipsToPixelsX(.CellTop) + .Location.Y)
            TextBox1.Size = New Size(TwipsToPixelsY(.CellWidth), TwipsToPixelsY(.CellHeight))
            TextBox1.Visible = True
            TextBox1.Focus()
        End With
    End Sub
    Private Sub MSFlexGrid1_EnterCell(ByVal eventSender As System.Object, ByVal eventArgs As System.EventArgs) Handles AxMSFlexGrid1.EnterCell, AxMSFlexGrid1.Enter
        TextBox1.Text = AxMSFlexGrid1.Text
        DimTextBox()
    End Sub
    Private Sub Text1_TextChanged(ByVal eventSender As System.Object, ByVal eventArgs As System.EventArgs) Handles TextBox1.TextChanged
        AxMSFlexGrid1.Text = TextBox1.Text
    End Sub
    Private Sub Text1_KeyDown(ByVal eventSender As System.Object, ByVal eventArgs As System.Windows.Forms.KeyEventArgs) Handles TextBox1.KeyDown
        Dim KeyCode As Short = eventArgs.KeyCode
        Dim Shift As Short = eventArgs.KeyData \ &H10000
        With AxMSFlexGrid1
            Select Case KeyCode
                Case System.Windows.Forms.Keys.Down
                    If .Row < .Rows - 1 Then .Row = .Row + 1
                Case System.Windows.Forms.Keys.Up
                    If .Row > 1 Then .Row = .Row - 1
                Case System.Windows.Forms.Keys.Right
                    If .Col < .Cols - 1 Then .Col = .Col + 1
                Case System.Windows.Forms.Keys.Left
                    If .Col > 0 Then .Col = .Col - 1
            End Select
        End With
    End Sub
    Private Sub Text1_KeyPress(ByVal eventSender As System.Object, ByVal eventArgs As System.Windows.Forms.KeyPressEventArgs) Handles TextBox1.KeyPress
        Dim KeyAscii As Short = Asc(eventArgs.KeyChar)
        With AxMSFlexGrid1
            If KeyAscii = System.Windows.Forms.Keys.Return And .Row < .Rows - 1 Then
                .Row = .Row + 1
            End If
        End With
        If KeyAscii = 0 Then
            eventArgs.Handled = True
        End If
    End Sub
    Private Sub GetData(ByRef C1() As Integer, ByRef C2() As Integer, ByRef DD() As Integer)
        Dim I As Short
        Dim null As Boolean
        With AxMSFlexGrid1
            .Col = 0
            .Row = 1
            I = 0
            null = False
            Do Until null = True
                If .Text <> "" And IsNumeric(.Text) Then
                    I = I + 1
                    C1(I) = CInt(.Text)
                    .Row = I + 1
                Else : C1(0) = I
                    null = True
                End If
            Loop
            .Col = 1
            .Row = 1
            I = 0
            null = False
            Do Until null = True
                If .Text <> "" And IsNumeric(.Text) Then
                    I = I + 1
                    C2(I) = CInt(.Text)
                    .Row = I + 1
                Else : C2(0) = I
                    null = True
                End If
            Loop
            .Col = 2
            .Row = 1
            I = 0
            null = False
            Do Until null = True
                If .Text <> "" And IsNumeric(.Text) Then
                    I = I + 1
                    DD(I) = CInt(.Text)
                    .Row = I + 1
                Else : DD(0) = I
                    null = True
                End If
            Loop
        End With
    End Sub
    Private Sub FindEnd(ByVal C1() As Integer, ByVal C2() As Integer, ByVal DD() As Integer, ByRef row As Short, ByRef col As Short)
        Dim I, J, K As Short
        For I = 1 To DD(0)
            For J = 1 To C1(0)
                If C1(J) = DD(I) Then
                    row = I
                    col = 1
                    C1(J) = 0
                    Exit Sub
                End If
            Next J
            For K = 1 To C2(0)
                If C2(K) = DD(I) Then
                    row = I
                    col = 2
                    C2(J) = 0
                    Exit Sub
                End If
            Next K
        Next I
    End Sub
    Private Sub Order(ByVal C1() As Integer, ByVal C2() As Integer, ByVal DD() As Integer, ByVal Row As Short, ByVal col As Short)
        Dim Temp As Integer
        Dim ordered, I, J As Short
        With AxMSFlexGrid1
            .Col = 2
            .Row = Row
            Temp = CInt(.Text)
            .Col = 3
            .Row = 1
            .Text = Temp
            .Col = 4
            If col = 1 Then
                .Text = "Enzyme1"
            ElseIf col = 2 Then
                .Text = "Enzyme2"
            End If
            DD(Row) = 0
            ordered = 1
            Do Until ordered = DD(0)
                For J = 1 To C1(0)
                    For I = 1 To DD(0)
                        If DD(I) <> 0 And (DD(I) + Temp) = C1(J) Then
                            .Col = 3
                            ordered = ordered + 1
                            .Row = ordered
                            Temp = DD(I)
                            .Text = DD(I)
                            DD(I) = 0
                            .Col = 4
                            .Text = "Enzyme1"
                            C1(J) = 0
                            Exit For
                        End If
                    Next I
                Next J
                For J = 1 To C2(0)
                    For I = 1 To DD(0)
                        If DD(I) <> 0 And (DD(I) + Temp) = C2(J) Then
                            .Col = 3
                            ordered = ordered + 1
                            .Row = ordered
                            Temp = DD(I)
                            .Text = DD(I)
                            DD(I) = 0
                            .Col = 4
                            .Text = "Enzyme2"
                            C2(J) = 0
                            Exit For
                        End If
                    Next I
                Next J
            Loop
        End With
    End Sub

    Private Sub Button1_Click(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles Button1.Click
        Dim C1(11) As Integer
        Dim C2(11) As Integer
        Dim DD(11) As Integer
        Dim row, col As Short
        GetData(C1, C2, DD)
        FindEnd(C1, C2, DD, row, col)
        Order(C1, C2, DD, row, col)
    End Sub
End Class
