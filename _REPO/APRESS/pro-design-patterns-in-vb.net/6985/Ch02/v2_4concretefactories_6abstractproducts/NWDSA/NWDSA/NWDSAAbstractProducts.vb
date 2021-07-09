Imports System.Xml

Public MustInherit Class NWDSADataReader
    Public MustOverride Property ReturnedDataReader() As IDataReader
End Class

Public MustInherit Class NWDSADataSet
    Public MustOverride Property ReturnedDataSet() As DataSet
End Class

Public MustInherit Class NWDSAXmlDoc
    Public MustOverride Property ReturnedXmlDoc() As XmlDocument
End Class

Public MustInherit Class NWDSAXmlReader
    Public MustOverride Property ReturnedXmlReader() As XmlReader
End Class

Public MustInherit Class NWDSAScalar
    Public Enum ScalarTypes
        stInteger = 1
        stString = 2
        stDouble = 3
    End Enum

    'Public MustOverride Property ScalarType() As ScalarTypes
    Public MustOverride Property ReturnedScalar() As Object
End Class

Public MustInherit Class NWDSANonQuery
    Public MustOverride Property AffectedRecords() As Integer
End Class

