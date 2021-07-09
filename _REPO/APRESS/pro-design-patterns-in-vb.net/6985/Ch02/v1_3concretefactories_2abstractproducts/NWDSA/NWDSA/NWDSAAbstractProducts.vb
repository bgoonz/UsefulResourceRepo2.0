Public MustInherit Class NWDSADataReader
    Public MustOverride Property ReturnedDataReader() As IDataReader
End Class

Public MustInherit Class NWDSADataSet
    Public MustOverride Property ReturnedDataSet() As DataSet
End Class

