Public Class NWDSASqlDataReader : Inherits NWDSADataReader
    Dim m_oReturnedDataReader As IDataReader

    Public Overrides Property ReturnedDataReader() As IDataReader
        Get
            ReturnedDataReader = m_oReturnedDataReader
        End Get
        Set(ByVal Value As IDataReader)
            m_oReturnedDataReader = Value
        End Set
    End Property
End Class


Public Class NWDSASqlDataSet : Inherits NWDSADataSet
    Dim m_oReturnedDataSet As DataSet

    Public Sub New()
        If m_oReturnedDataSet Is Nothing Then
            m_oReturnedDataSet = New DataSet()
        End If
    End Sub

    Public Overrides Property ReturnedDataSet() As DataSet
        Get
            ReturnedDataSet = m_oReturnedDataSet
        End Get
        Set(ByVal Value As DataSet)
            m_oReturnedDataSet = Value
        End Set
    End Property
End Class


