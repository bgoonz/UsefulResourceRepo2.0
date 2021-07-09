Imports System.Xml

Public Class NWDSASqlXmlDataReader : Inherits NWDSADataReader
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

Public Class NWDSASqlXmlDataSet : Inherits NWDSADataSet
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

Public Class NWDSASqlXmlXmlDoc : Inherits NWDSAXmlDoc

    Dim m_oReturnedXmlDoc As XmlDocument

    Public Sub New()
        If m_oReturnedXmlDoc Is Nothing Then
            m_oReturnedXmlDoc = New XmlDocument()
        End If
    End Sub

    Public Overrides Property ReturnedXmlDoc() As XmlDocument
        Get
            ReturnedXmlDoc = m_oReturnedXmlDoc
        End Get
        Set(ByVal Value As XmlDocument)
            m_oReturnedXmlDoc = Value
        End Set
    End Property
End Class

Public Class NWDSASQlXmlXmlReader : Inherits NWDSAXmlReader

    Dim m_oReturnedXmlReader As XmlReader

    Public Sub New()
    End Sub

    Public Overrides Property ReturnedXmlReader() As XmlReader
        Get
            ReturnedXmlReader = m_oReturnedXmlReader
        End Get
        Set(ByVal Value As XmlReader)
            m_oReturnedXmlReader = Value
        End Set
    End Property
End Class

Public Class NWDSASqlXmlScalar : Inherits NWDSAScalar

    Dim m_oReturnedScalar As Object

    Public Sub New()
        If m_oReturnedScalar Is Nothing Then
            m_oReturnedScalar = New Object()
        End If
    End Sub

    Public Overrides Property ReturnedScalar() As Object
        Get
            ReturnedScalar = m_oReturnedScalar
        End Get
        Set(ByVal Value As Object)
            m_oReturnedScalar = Value
        End Set
    End Property
End Class

Public Class NWDSASqlXmlNonQuery : Inherits NWDSANonQuery

    Dim m_iAffectedRecords As Integer

    Public Sub New()
    End Sub

    Public Overrides Property AffectedRecords() As Integer
        Get
            AffectedRecords = m_iAffectedRecords
        End Get
        Set(ByVal Value As Integer)
            m_iAffectedRecords = Value
        End Set
    End Property
End Class







