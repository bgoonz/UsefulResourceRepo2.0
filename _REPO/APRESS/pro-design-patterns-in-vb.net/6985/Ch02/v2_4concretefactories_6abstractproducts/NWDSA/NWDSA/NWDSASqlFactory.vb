Imports System.Data
Imports System.Data.SqlClient
Imports System.Xml
Imports System.IO


Public Class NWDSASqlFactory : Inherits NWDSAAbstractFactory

    Private m_conSQL As New SqlConnection()

    Protected Overrides Sub Finalize()
        If Not (m_conSQL.State = ConnectionState.Closed) Or _
           Not (m_conSQL.State = ConnectionState.Broken) Then
            m_conSQL.Close()
        End If
        MyBase.Finalize()
    End Sub

    Public Overrides Function ExecuteDataReader(ByRef Request As NWDSARequest) As NWDSADataReader
        ' Returns a NWDSADataReader object, which wraps an object of type IDataReader
        ' Uses SQL Server .NET data provider, hence the wrapped object is a SqlDataReader object 
        ' A SqlDataReader object is a read-only, forward-only data stream. 
        ' NOTE: DataReaders won't be used in queries that perform transactions.

        Dim sConnectStr As String
        Dim cmdSQL As New SqlCommand()
        Dim prmSQL As SqlParameter
        Dim oParam As NWDSARequest.Parameter
        Dim colSQLParams As SqlParameterCollection
        Dim drSQL As SqlDataReader
        Dim oDataReaderSQL As New NWDSASqlDataReader()

        Try
            m_conSQL.ConnectionString = g_ConnStrings.GetInstance.GetConnectStringByRole(Request.Role)

            ' open connection, and begin to set properties of command
            m_conSQL.Open()
            cmdSQL.Connection = m_conSQL
            cmdSQL.CommandText = Request.Command
            cmdSQL.CommandType = Request.CommandType

            ' add parameters if they exist
            If Request.Parameters.Count > 0 Then
                For Each oParam In Request.Parameters
                    prmSQL = cmdSQL.Parameters.Add(oParam.ParamName, oParam.ParamValue)
                Next
            End If

            drSQL = cmdSQL.ExecuteReader()

            oDataReaderSQL.ReturnedDataReader = drSQL
            Return oDataReaderSQL

        Catch exSQL As SqlException
            Debug.WriteLine(exSQL.Message)
            Request.Exception = exSQL

        Catch ex As Exception
            Debug.WriteLine(ex.Message)
            Request.Exception = ex

        Finally

        End Try
    End Function

    Public Overrides Function ExecuteDataSet(ByRef Request As NWDSARequest) As NWDSADataSet
        ' Returns a NWDSADataSet object, which wraps an object of type DataSet
        ' Uses SQL Server .NET data provider if a data provider is necessary 
        ' - hence uses a SqlDataAdapter to fill the DataSet

        Dim sConnectStr As String
        Dim conSQL As New SqlConnection()
        Dim cmdSQL As New SqlCommand()
        Dim prmSQL As SqlParameter
        Dim oParam As NWDSARequest.Parameter
        Dim colSQLParams As SqlParameterCollection
        Dim daSQL As SqlDataAdapter
        Dim oDataSetSQL As New NWDSASqlDataSet()
        Dim tranSQL As SqlTransaction

        Try
            conSQL.ConnectionString = g_ConnStrings.GetInstance.GetConnectStringByRole(Request.Role)

            ' open connection, and begin to set properties of command
            conSQL.Open()
            cmdSQL.Connection = conSQL
            cmdSQL.CommandText = Request.Command
            cmdSQL.CommandType = Request.CommandType

            ' add parameters if they exist
            If Request.Parameters.Count > 0 Then
                For Each oParam In Request.Parameters
                    prmSQL = cmdSQL.Parameters.Add(oParam.ParamName, oParam.ParamValue)
                Next
            End If

            If Request.Transactional Then
                tranSQL = conSQL.BeginTransaction()
            End If

            daSQL = New SqlDataAdapter(cmdSQL)

            ' allow generic naming - NewDataSet
            daSQL.Fill(oDataSetSQL.ReturnedDataSet)

            Return oDataSetSQL

        Catch exSQL As SqlException
            Debug.WriteLine(exSQL.Message)
            Request.Exception = exSQL
            If Request.Transactional Then
                tranSQL.Rollback()
            End If

        Catch ex As Exception
            Debug.WriteLine(ex.Message)
            Request.Exception = ex
            If Request.Transactional Then
                tranSQL.Rollback()
            End If

        Finally
            If Request.Transactional Then
                tranSQL.Commit()
            End If
            If conSQL.State = ConnectionState.Open Then
                conSQL.Close()
            End If
        End Try
    End Function

    Public Overrides Function ExecuteXMLDocument(ByRef Request As NWDSARequest) As NWDSAXmlDoc

        Dim sConnectStr As String
        Dim cmdSQL As New SqlCommand()
        Dim prmSQL As SqlParameter
        Dim oParam As NWDSARequest.Parameter
        Dim colSQLParams As SqlParameterCollection
        Dim daSQL As SqlDataAdapter
        Dim dsSQL As New DataSet()
        Dim xmlDoc As New XmlDocument()
        Dim oXmlDocSQL As New NWDSASqlXmlDoc()
        Dim tranSQL As SqlTransaction

        Try
            m_conSQL = New SqlConnection(g_ConnStrings.GetInstance.GetConnectStringByRole(Request.Role))

            ' open connection, and begin to set properties of command
            m_conSQL.Open()
            cmdSQL.Connection = m_conSQL
            cmdSQL.CommandText = Request.Command
            cmdSQL.CommandType = Request.CommandType

            ' add parameters if they exist
            If Request.Parameters.Count > 0 Then
                For Each oParam In Request.Parameters
                    prmSQL = cmdSQL.Parameters.Add(oParam.ParamName, oParam.ParamValue)
                Next
            End If

            If Request.Transactional Then
                tranSQL = m_conSQL.BeginTransaction()
            End If

            daSQL = New SqlDataAdapter(cmdSQL)
            daSQL.Fill(dsSQL)
            xmlDoc.LoadXml(dsSQL.GetXml)

            oXmlDocSQL.ReturnedXmlDoc = xmlDoc

            Return oXmlDocSQL

        Catch exSQL As SqlException
            Debug.WriteLine(exSQL.Message)
            Request.Exception = exSQL
            tranSQL.Rollback()

        Catch ex As Exception
            Debug.WriteLine(ex.Message)
            Request.Exception = ex
            tranSQL.Rollback()

        Finally
            If Request.Transactional Then
                tranSQL.Commit()
            End If
        End Try

    End Function

    Public Overrides Function ExecuteXmlReader(ByRef Request As NWDSARequest) As NWDSAXmlReader

        Dim sConnectStr As String
        Dim cmdSQL As New SqlCommand()
        Dim prmSQL As SqlParameter
        Dim oParam As NWDSARequest.Parameter
        Dim colSQLParams As SqlParameterCollection
        Dim daSQL As SqlDataAdapter
        Dim dsSQL As New DataSet()
        Dim xmlDoc As New XmlDocument()
        Dim xmlReader As XmlReader
        Dim oXmlReaderSQL As New NWDSASqlXmlReader()
        Dim tranSQL As SqlTransaction
        Dim dsDataSet As New DataSet()

        Try
            m_conSQL = New SqlConnection(g_ConnStrings.GetInstance.GetConnectStringByRole(Request.Role))

            ' open connection, and begin to set properties of command
            m_conSQL.Open()
            cmdSQL.Connection = m_conSQL
            cmdSQL.CommandText = Request.Command
            cmdSQL.CommandType = Request.CommandType

            ' add parameters if they exist
            If Request.Parameters.Count > 0 Then
                For Each oParam In Request.Parameters
                    prmSQL = cmdSQL.Parameters.Add(oParam.ParamName, oParam.ParamValue)
                Next
            End If

            If Request.Transactional Then
                tranSQL = m_conSQL.BeginTransaction()
            End If

            daSQL = New SqlDataAdapter(cmdSQL)
            daSQL.Fill(dsDataSet)

            Dim strmStream As New MemoryStream()
            dsDataSet.WriteXml(strmStream, XmlWriteMode.IgnoreSchema)
            dsDataSet.WriteXml("output.xml", XmlWriteMode.IgnoreSchema)

            'xmlReader = New XmlTextReader(strmStream)
            xmlReader = New XmlTextReader("output.xml")
            oXmlReaderSQL.ReturnedXmlReader = xmlReader

            Return oXmlReaderSQL

        Catch exSQL As SqlException
            Debug.WriteLine(exSQL.Message)
            Request.Exception = exSQL
            tranSQL.Rollback()

        Catch ex As Exception
            Debug.WriteLine(ex.Message)
            Request.Exception = ex
            tranSQL.Rollback()

        Finally
            If Request.Transactional Then
                tranSQL.Commit()
            End If
        End Try
    End Function

    Public Overrides Function ExecuteScalar(ByRef Request As NWDSARequest) As NWDSAScalar

        Dim sConnectStr As String
        Dim cmdSQL As New SqlCommand()
        Dim prmSQL As SqlParameter
        Dim oParam As NWDSARequest.Parameter
        Dim colSQLParams As SqlParameterCollection
        Dim iRows As Integer
        Dim oReturnScalar As New NWDSASqlScalar()
        Dim tranSQL As SqlTransaction

        Try
            m_conSQL.ConnectionString = g_ConnStrings.GetInstance.GetConnectStringByRole(Request.Role)

            ' attempt to open sql connection and exec command
            m_conSQL.Open()
            cmdSQL.Connection = m_conSQL
            cmdSQL.CommandText = Request.Command
            cmdSQL.CommandType = Request.CommandType

            ' add parameters if they exist
            If Request.Parameters.Count > 0 Then
                For Each oParam In Request.Parameters
                    prmSQL = cmdSQL.Parameters.Add(oParam.ParamName, oParam.ParamValue)
                Next
            End If

            If Request.Transactional Then
                tranSQL = m_conSQL.BeginTransaction()
            End If

            Dim drSQL As SqlDataReader
            drSQL = cmdSQL.ExecuteReader()
            drSQL.Read()
            oReturnScalar.ReturnedScalar = drSQL.GetValue(0)
            Return oReturnScalar

        Catch exSQL As SqlException
            Debug.WriteLine(exSQL.Message)
            Request.Exception = exSQL
            tranSQL.Rollback()

        Catch ex As Exception
            Debug.WriteLine(ex.Message)
            Request.Exception = ex
            tranSQL.Rollback()

        Finally
            If Request.Transactional Then
                tranSQL.Commit()
            End If
        End Try

    End Function

    Public Overrides Function ExecuteNonQuery(ByRef Request As NWDSARequest) As NWDSANonQuery
        Dim sConnectStr As String
        Dim cmdSQL As New SqlCommand()
        Dim prmSQL As SqlParameter
        Dim oParam As NWDSARequest.Parameter
        Dim colSQLParams As SqlParameterCollection
        Dim iRows As Integer
        Dim oReturnNonQuery As New NWDSASqlNonQuery()
        Dim tranSQL As SqlTransaction

        Try
            m_conSQL.ConnectionString = g_ConnStrings.GetInstance.GetConnectStringByRole(Request.Role)

            ' attempt to open sql connection and exec command
            m_conSQL.Open()
            cmdSQL.Connection = m_conSQL
            cmdSQL.CommandText = Request.Command
            cmdSQL.CommandType = Request.CommandType

            ' add parameters if they exist
            If Request.Parameters.Count > 0 Then
                For Each oParam In Request.Parameters
                    prmSQL = cmdSQL.Parameters.Add(oParam.ParamName, oParam.ParamValue)
                Next
            End If

            If Request.Transactional Then
                tranSQL = m_conSQL.BeginTransaction()
            End If

            oReturnNonQuery.AffectedRecords = cmdSQL.ExecuteNonQuery()
            Return oReturnNonQuery

        Catch exSQL As SqlException
            Debug.WriteLine(exSQL.Message)
            Request.Exception = exSQL
            tranSQL.Rollback()

        Catch ex As Exception
            Debug.WriteLine(ex.Message)
            Request.Exception = ex
            tranSQL.Rollback()

        Finally
            If Request.Transactional Then
                tranSQL.Commit()
            End If
        End Try

    End Function


End Class