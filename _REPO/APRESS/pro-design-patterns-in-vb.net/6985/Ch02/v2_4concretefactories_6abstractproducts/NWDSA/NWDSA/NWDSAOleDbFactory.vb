Imports System.Data
Imports System.Data.OleDb
Imports System.Xml
Imports System.IO

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
                For Each oParam In Request.Parameters
                    prmOLEDB = cmdOLEDB.Parameters.Add(oParam.ParamName, oParam.ParamValue)
                Next
            End If

            If Request.Transactional Then
                tranOLEDB = conOLEDB.BeginTransaction()
            End If

            daOLEDB = New OleDbDataAdapter(cmdOLEDB)

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

    Public Overrides Function ExecuteXMLDocument(ByRef Request As NWDSARequest) As NWDSAXmlDoc
        Dim sConnectStr As String
        Dim cmdOLEDB As New OleDbCommand()
        Dim prmOLEDB As OleDbParameter
        Dim oParam As NWDSARequest.Parameter
        Dim colOLEDBParams As OleDbParameterCollection
        Dim daOLEDB As OleDbDataAdapter
        Dim dsOLEDB As New DataSet()
        Dim xmlDoc As New XmlDocument()
        Dim oXmlDocOLEDB As New NWDSAOdbcXmlDoc()
        Dim tranOLEDB As OleDbTransaction


        Try
            m_conOLEDB = New OleDbConnection(g_ConnStrings.GetInstance.GetConnectStringByRole(Request.Role))

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

            If Request.Transactional Then
                tranOLEDB = m_conOLEDB.BeginTransaction()
            End If

            daOLEDB = New OleDbDataAdapter(cmdOLEDB)
            daOLEDB.Fill(dsOLEDB)
            xmlDoc.LoadXml(dsOLEDB.GetXml)

            oXmlDocOLEDB.ReturnedXmlDoc = xmlDoc

            Return oXmlDocOLEDB

        Catch exOLEDB As OleDbException
            Debug.WriteLine(exOLEDB.Message)
            Request.Exception = exOLEDB
            tranOLEDB.Rollback()

        Catch ex As Exception
            Debug.WriteLine(ex.Message)
            Request.Exception = ex
            tranOLEDB.Rollback()

        Finally
            If Request.Transactional Then
                tranOLEDB.Commit()
            End If
        End Try

    End Function

    Public Overrides Function ExecuteXmlReader(ByRef Request As NWDSARequest) As NWDSAXmlReader

        Dim sConnectStr As String
        Dim cmdOLEDB As New OleDbCommand()
        Dim prmOLEDB As OleDbParameter
        Dim oParam As NWDSARequest.Parameter
        Dim colSQLParams As OleDbParameterCollection
        Dim daOLEDB As OleDbDataAdapter
        Dim dsOLEDB As New DataSet()
        Dim xmlDoc As New XmlDocument()
        Dim xmlReader As XmlReader
        Dim oXmlReaderOLEDB As New NWDSAOleDbXmlReader()
        Dim tranOLEDB As OleDbTransaction
        Dim dsDataSet As New DataSet()

        Try
            m_conOLEDB = New OleDbConnection(g_ConnStrings.GetInstance.GetConnectStringByRole(Request.Role))

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

            If Request.Transactional Then
                tranOLEDB = m_conOLEDB.BeginTransaction()
            End If

            daOLEDB = New OleDbDataAdapter(cmdOLEDB)
            daOLEDB.Fill(dsDataSet)

            Dim strmStream As New MemoryStream()
            dsDataSet.WriteXml(strmStream, XmlWriteMode.IgnoreSchema)
            dsDataSet.WriteXml("output.xml", XmlWriteMode.IgnoreSchema)

            'xmlReader = New XmlTextReader(strmStream)
            xmlReader = New XmlTextReader("output.xml")
            oXmlReaderOLEDB.ReturnedXmlReader = xmlReader

            Return oXmlReaderOLEDB

        Catch exOLEDB As OleDbException
            Debug.WriteLine(exOLEDB.Message)
            Request.Exception = exOLEDB
            tranOLEDB.Rollback()

        Catch ex As Exception
            Debug.WriteLine(ex.Message)
            Request.Exception = ex
            tranOLEDB.Rollback()

        Finally
            If Request.Transactional Then
                tranOLEDB.Commit()
            End If
        End Try

    End Function


    Public Overrides Function ExecuteScalar(ByRef Request As NWDSARequest) As NWDSAScalar

        Dim sConnectStr As String
        Dim cmdOLEDB As New OleDbCommand()
        Dim prmOLEDB As OleDbParameter
        Dim oParam As NWDSARequest.Parameter
        Dim colOLEDBParams As OleDbParameterCollection
        Dim iRows As Integer
        Dim oReturnScalar As New NWDSAOledbScalar()
        Dim tranOLEDB As OleDbTransaction

        Try
            m_conOLEDB.ConnectionString = g_ConnStrings.GetInstance.GetConnectStringByRole(Request.Role)

            ' attempt to open OLEDB connection and exec command
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

            If Request.Transactional Then
                tranOLEDB = m_conOLEDB.BeginTransaction()
            End If

            Dim drOLEDB As OleDbDataReader
            drOLEDB = cmdOLEDB.ExecuteReader()
            drOLEDB.Read()
            oReturnScalar.ReturnedScalar = drOLEDB.GetValue(0)
            Return oReturnScalar


        Catch exOLEDB As OleDbException
            Debug.WriteLine(exOLEDB.Message)
            Request.Exception = exOLEDB
            tranOLEDB.Rollback()

        Catch ex As Exception
            Debug.WriteLine(ex.Message)
            Request.Exception = ex
            tranOLEDB.Rollback()

        Finally
            If Request.Transactional Then
                tranOLEDB.Commit()
            End If
        End Try

    End Function

    Public Overrides Function ExecuteNonQuery(ByRef Request As NWDSARequest) As NWDSANonQuery
        Dim sConnectStr As String
        Dim cmdOLEDB As New OleDbCommand()
        Dim prmOLEDB As OleDbParameter
        Dim oParam As NWDSARequest.Parameter
        Dim colOLEDBParams As OleDbParameterCollection
        Dim iRows As Integer
        Dim oReturnNonQuery As New NWDSAOleDbNonQuery()
        Dim tranOLEDB As OleDbTransaction

        Try
            m_conOLEDB.ConnectionString = g_ConnStrings.GetInstance.GetConnectStringByRole(Request.Role)

            ' attempt to open OLEDB connection and exec command
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

            If Request.Transactional Then
                tranOLEDB = m_conOLEDB.BeginTransaction()
            End If

            oReturnNonQuery.AffectedRecords() = cmdOLEDB.ExecuteNonQuery()
            Return oReturnNonQuery

        Catch exOLEDB As OleDbException
            Debug.WriteLine(exOLEDB.Message)
            Request.Exception = exOLEDB
            tranOLEDB.Rollback()

        Catch ex As Exception
            Debug.WriteLine(ex.Message)
            Request.Exception = ex
            tranOLEDB.Rollback()

        Finally
            If Request.Transactional Then
                tranOLEDB.Commit()
            End If
        End Try

    End Function

End Class