Public MustInherit Class NWDSAAbstractFactory
    Public MustOverride Function ExecuteDataReader(ByRef Request As NWDSARequest) As NWDSADataReader
    Public MustOverride Function ExecuteDataSet(ByRef Request As NWDSARequest) As NWDSADataSet
End Class

