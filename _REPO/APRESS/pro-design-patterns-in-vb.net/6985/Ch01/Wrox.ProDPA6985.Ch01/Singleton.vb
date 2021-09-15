Imports System.Windows.Forms
Module Singleton

    Sub Main()
        Dim objTest1 As MySingleton
        Dim objTest2 As MySingleton
        Dim i As Integer

        ' call GetInstance()
        objTest1 = MySingleton.GetInstance()
        Console.WriteLine("GetInstance() called at " & Now.ToLongTimeString & "; " & _
                          "objTest1.TimeOfBirth()=" & objTest1.TimeOfBirth())

        ' wait a while
        For i = 1 To 500000000
        Next

        ' call GetInstance() again
        objTest2 = MySingleton.GetInstance()
        Console.WriteLine("GetInstance() called at " & Now.ToLongTimeString & "; " & _
                          "objTest2.TimeOfBirth()=" & objTest2.TimeOfBirth())

        MessageBox.Show("Click OK to end")
    End Sub

    Public Class MySingleton
        ' Private members
        Private Shared m_Instance As MySingleton
        Private Shared m_TimeOfBirth As String

        ' Private New constructor
        Private Sub New()
            Console.WriteLine("Creating Singleton at " & Now.ToLongTimeString)
            m_TimeOfBirth = Now.ToLongTimeString
        End Sub

        ' Public method for "creating" the instance
        Public Shared Function GetInstance() As MySingleton
            If m_Instance Is Nothing Then
                m_Instance = New MySingleton()
            End If
            Return m_Instance
        End Function

        ' Public property
        Public ReadOnly Property TimeOfBirth() As String
            Get
                Return m_TimeOfBirth
            End Get
        End Property

    End Class

    Public Class MySafeSingleton
        ' Private members
        Private Shared m_Instance As MySafeSingleton
        Private Shared m_TimeOfBirth As String
        Private Shared m_Mutex As New System.Threading.Mutex()

        ' Private New constructor
        Private Sub New()
            Console.WriteLine("Creating Singleton at " & Now.ToLongTimeString)
            m_TimeOfBirth = Now.ToLongTimeString
        End Sub

        ' Public method for "creating" the instance
        Public Shared Function GetInstance() As MySafeSingleton
            m_Mutex.WaitOne()
            If m_Instance Is Nothing Then
                m_Instance = New MySafeSingleton()
            End If
            m_Mutex.ReleaseMutex()
            Return m_Instance
        End Function

        ' Public property
        Public ReadOnly Property TimeOfBirth() As String
            Get
                Return m_TimeOfBirth
            End Get
        End Property
    End Class


End Module
