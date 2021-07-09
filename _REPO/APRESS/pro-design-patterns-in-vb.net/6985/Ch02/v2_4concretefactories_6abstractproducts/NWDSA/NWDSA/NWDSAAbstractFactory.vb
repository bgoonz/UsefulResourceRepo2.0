Public MustInherit Class NWDSAAbstractFactory
    Public MustOverride Function ExecuteDataReader(ByRef Request As NWDSARequest) As NWDSADataReader
    Public MustOverride Function ExecuteDataSet(ByRef Request As NWDSARequest) As NWDSADataSet
    Public MustOverride Function ExecuteXMLDocument(ByRef Request As NWDSARequest) As NWDSAXmlDoc
    Public MustOverride Function ExecuteXmlReader(ByRef Request As NWDSARequest) As NWDSAXmlReader
    Public MustOverride Function ExecuteScalar(ByRef Request As NWDSARequest) As NWDSAScalar
    Public MustOverride Function ExecuteNonQuery(ByRef Request As NWDSARequest) As NWDSANonQuery
End Class

