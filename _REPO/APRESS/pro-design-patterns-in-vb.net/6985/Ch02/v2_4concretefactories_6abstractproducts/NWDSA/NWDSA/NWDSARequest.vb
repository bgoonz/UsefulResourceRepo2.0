Public Class NWDSARequest

    Public Enum UserRole
        External = 1
        Internal = 2
        SuperUser = 3
        Admin = 4
    End Enum

    Public Class Parameter

        Private m_sParamName As String
        Private m_sParamValue As String

        Public Property ParamName() As String
            Get
                ParamName = m_sParamName
            End Get
            Set(ByVal Value As String)
                m_sParamName = Value
            End Set
        End Property

        Public Property ParamValue() As String
            Get
                ParamValue = m_sParamValue
            End Get
            Set(ByVal Value As String)
                m_sParamValue = Value
            End Set
        End Property

    End Class

    Private m_lUserRole As UserRole
    Private m_lCommandType As CommandType
    Private m_sCommand As String
    Private m_bTransactional As Boolean
    Private m_colParameters As New Collection()
    Private m_DataSet As DataSet
    Private m_oException As Exception

    Public Property Role() As UserRole
        Get
            Role = m_lUserRole
        End Get
        Set(ByVal Value As UserRole)
            m_lUserRole = Value
        End Set
    End Property

    Public Property CommandType() As CommandType
        Get
            CommandType = m_lCommandType
        End Get
        Set(ByVal Value As CommandType)
            m_lCommandType = Value
        End Set
    End Property

    Public Property Command() As String
        Get
            Command = m_sCommand
        End Get
        Set(ByVal Value As String)
            m_sCommand = Value
        End Set
    End Property

    Public Property Parameters() As Collection
        Get
            Parameters = m_colParameters
        End Get
        Set(ByVal Value As Collection)
            m_colParameters = Value
        End Set
    End Property

    Public Property Transactional() As Boolean
        Get
            Transactional = m_bTransactional
        End Get
        Set(ByVal Value As Boolean)
            m_bTransactional = Value
        End Set
    End Property

    Public Property Exception() As Exception
        Get
            Exception = m_oException
        End Get
        Set(ByVal Value As Exception)
            m_oException = Value
        End Set
    End Property
End Class
