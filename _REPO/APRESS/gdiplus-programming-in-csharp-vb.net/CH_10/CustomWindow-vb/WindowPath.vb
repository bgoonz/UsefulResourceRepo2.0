Option Strict On

Imports System
Imports System.IO
Imports System.Drawing
Imports System.Drawing.Drawing2D

Public NotInheritable Class WindowPath

  Private Shared mP As GraphicsPath
  Private Shared mFileNames() As String
  Private Shared mIOerror As String

  Public Shared Function GetPath(ByVal fname As String) As GraphicsPath
    Dim BeginP As Point = Point.Empty
    Dim EndP As Point = Point.Empty
    Dim P As Point = Point.Empty
    Dim s As String
    Dim x() As String
    mP = New GraphicsPath()

    Dim sr As StreamReader = New StreamReader(fname)
    sr.BaseStream.Seek(0, SeekOrigin.Begin)
    While (sr.Peek() > -1)
      s = sr.ReadLine()
      x = s.Split(New Char() {CType(",", Char)})
      P.X = Convert.ToInt32(x(0))
      P.Y = Convert.ToInt32(x(1))

      If Point.op_Equality(BeginP, Point.Empty) Then
        BeginP = P
      Else
        EndP = P
        mP.AddLine(BeginP, EndP)
        BeginP = EndP
      End If
    End While
    mP.CloseFigure()

    Return mP
  End Function

  Public Shared Sub SavePath(ByVal fname As String, ByVal P As GraphicsPath)
    Dim fs As FileStream = New FileStream(fname, FileMode.Create)
    Dim sw As StreamWriter = New StreamWriter(fs)
    Dim p2 As PointF
    For Each p2 In P.PathPoints
      sw.Write(p2.X.ToString() + "," + p2.Y.ToString() + vbCrLf)
    Next
    sw.Close()
    GetFileNames()
  End Sub

  Public Shared ReadOnly Property GraphicsPathFileNames() As String()
    Get
      GetFileNames()
      Return mFileNames
    End Get
  End Property

  Public Shared ReadOnly Property LastError() As String
    Get
      Return mIOerror
    End Get
  End Property

  Private Shared Sub GetFileNames()
    Dim a As ArrayList = New ArrayList()
    Dim k As Int32

    mIOerror = ""
    Try
      mFileNames = Directory.GetFiles(Directory.GetCurrentDirectory())

      'We are only interested in the graphics path filenames which end in .pth
      For k = 0 To mFileNames.Length - 1
        If Path.GetExtension(mFileNames(k).ToLower()) = ".pth" Then
          a.Add(Path.GetFileName(mFileNames(k)))
        End If
      Next

      'Convert the explicit array to implicit array so I can return string[]
      a.TrimToSize()
      If a.Count > 0 Then
        ReDim mFileNames(a.Count - 1)
        For k = 0 To a.Count - 1
          mFileNames(k) = CType(a(k), String)
        Next
      Else
        ReDim mFileNames(0)
        mFileNames(0) = String.Empty
      End If

    Catch ex As ArgumentNullException
      mIOerror = "Path is a null reference."
    Catch ex As System.Security.SecurityException
      mIOerror = "The caller does not have the required permission."
    Catch ex As ArgumentException
      mIOerror = "Path is an empty string, contains only white spaces, " + _
                 "or contains invalid characters."
    Catch ex As System.IO.DirectoryNotFoundException
      mIOerror = "The path encapsulated in the Directory object does not exist."
    End Try
  End Sub
End Class
