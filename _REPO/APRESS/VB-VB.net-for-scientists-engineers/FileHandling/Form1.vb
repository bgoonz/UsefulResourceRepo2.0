Imports System.IO
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
    Private components As System.ComponentModel.Container

    'NOTE: The following procedure is required by the Windows Form Designer
    'It can be modified using the Windows Form Designer.  
    'Do not modify it using the code editor.
    <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
        '
        'Form1
        '
        Me.AutoScaleBaseSize = New System.Drawing.Size(6, 15)
        Me.ClientSize = New System.Drawing.Size(292, 267)
        Me.Name = "Form1"
        Me.Text = "Form1"

    End Sub

#End Region

    Private Sub Form1_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load
        Dim A(4), Sum As Double
        Dim I As Short
        Dim fs As New FileStream("C:\test.txt", FileMode.Open, FileAccess.Read)
        Dim br As New StreamReader(fs)
        Sum = 0
        br.BaseStream.Seek(0, SeekOrigin.Begin)
        For I = 0 To 3
            A(I) = br.ReadLine()
            Sum = Sum + A(I)
        Next I
        br.Close()
        fs.close()
        Dim fs2 As New FileStream("C:\test.txt", FileMode.Open, FileAccess.Write)
        Dim bw As New StreamWriter(fs2)
        bw.BaseStream.Seek(0, SeekOrigin.End)
        bw.Write(ControlChars.CrLf & "Sum= " & Sum)
        bw.Close()
        fs2.Close()
    End Sub
End Class
