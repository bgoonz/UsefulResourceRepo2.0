Imports System.Data
Imports System.Data.OleDb

Public Class NWDSAOleDbFactory : Inherits NWDSAAbstractFactory

    Private m_conOLEDB As New OleDbConnection()

    Protected Overrides Sub Finalize()
        If Not (m_conOLEDB.State = ConnectionState.Closed) Or _
           Not (m_conOLEDB.State = ConnectionState.Broken) Then
            m_conOLEDB.Close()
        End If
        MyBase.Finalize()
    End Sub

    Public Overrides Function ExecuteDataReader(ByRef Request As NWDSARequest) As NWDSADataReader
        ' Returns a NWDSADataReader object, which wraps an object of type IDataReader
        ' Uses OleDb .NET Server data provider, hence the wrapped object is a OleDbDataReader object 
        ' An OleDbDataReader object is a read-only, forward-only data stream. 
        ' NOTE: DataReaders won't be used in queries that perform transactions.

        Dim sConnectStr As String
        Dim cmdOLEDB As New OleDbCommand()
        Dim prmOLEDB As OleDbParameter
        Dim oParam As NWDSARequest.Parameter
        Dim colOLEDBParams As OleDbParameterCollection
        Dim drOLEDB As OleDbDataReader
        Dim oDataReaderOLEDB As New NWDSAOleDbDataReader()

        Try
            m_conOLEDB.ConnectionString = g_ConnStrings.GetInstance.GetConnectStringByRole(Request.Role)

            ' open connection, and begin to set properties of command
            m_conOLEDB.Open()
            cmdOLEDB.Connection = m_conOLEDB
            cmdOLEDB.CommandText = Request.Command
            cmdOLEDB.CommandType = Request.CommandType

            ' add parameters if they exist
            If Request.Parameters.Count > 0 Then
                For Each oParam In Request.Parameters
                    prmOLEDB = cmdOLEDB.Parameters.Add(oParam.ParamName, oParam.ParamValue)
                Next
            End If

            drOLEDB = cmdOLEDB.ExecuteReader()

            oDataReaderOLEDB.ReturnedDataReader = drOLEDB
            Return oDataReaderOLEDB

        Catch exOLEDB As OleDbException
            Debug.WriteLine(exOLEDB.Message)
            Request.Exception = exOLEDB

        Catch ex As Exception
            Debug.WriteLine(ex.Message)
            Request.Exception = ex

        Finally

        End Try
    End Function

    Public Overrides Function ExecuteDataSet(ByRef Request As NWDSARequest) As NWDSADataSet
        ' Returns a NWDSADataSet object, which wraps an object of type DataSet
        ' Uses OLE DB .NET data provider if a data provider is necessary 
        ' - hence uses a OleDbDataAdapter to fill the DataSet

        Dim sConnectStr As String
        Dim conOLEDB As New OleDbConnection()
        Dim cmdOLEDB As New OleDbCommand()
        Dim prmOLEDB As OleDbParameter
        Dim oParam As NWDSARequest.Parameter
        Dim colOLEDBParams As OleDbParameterCollection
        Dim daOLEDB As OleDbDataAdapter
        Dim oDataSetOLEDB As New NWDSAOleDbDataSet()
        Dim tranOLEDB As OleDbTransaction

        Try
            conOLEDB.ConnectionString = g_ConnStrings.GetInstance.GetConnectStringByRole(Request.Role)

            ' open connection, and begin to set properties of command            
            conOLEDB.Open()
            cmdOLEDB.Connection = conOLEDB
            cmdOLEDB.CommandText = Request.Command
            cmdOLEDB.CommandType = Request.CommandType

            ' add parameters if they exist
            If Request.Parameters.Count > 0 Then
                'ICommand.Parameters is readonly
                For Each oParam In Request.Parameters
                    prmOLEDB = cmdOLEDB.Parameters.Add(oParam.ParamName, oParam.ParamValue)
                Next
            End If

            If Request.Transactional Then
                tranOLEDB = conOLEDB.BeginTransaction()
            End If

            daOLEDB = New OleDbDataAdapter(cmdOLEDB)

            ' allow generic naming - NewDataSet
            daOLEDB.Fill(oDataSetOLEDB.ReturnedDataSet)

            Return oDataSetOLEDB

        Catch exOLEDB As OleDbException
            Debug.WriteLine(exOLEDB.Message)
            Request.Exception = exOLEDB
            If Request.Transactional Then
                tranOLEDB.Rollback()
            End If

        Catch ex As Exception
            Debug.WriteLine(ex.Message)
            Request.Exception = ex
            If Request.Transactional Then
                tranOLEDB.Rollback()
            End If

        Finally
            If Request.Transactional Then
                tranOLEDB.Commit()
            End If
            If conOLEDB.State = ConnectionState.Open Then
                conOLEDB.Close()
            End If
        End Try
    End Function

End Class