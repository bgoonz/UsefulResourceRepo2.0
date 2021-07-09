Imports System.Data
Imports Microsoft.Data.Odbc

Public Class NWDSAOdbcFactory : Inherits NWDSAAbstractFactory

    Private m_conODBC As New OdbcConnection()

    Protected Overrides Sub Finalize()
        If Not (m_conODBC.State = ConnectionState.Closed) Or _
           Not (m_conODBC.State = ConnectionState.Broken) Then
            m_conODBC.Close()
        End If
        MyBase.Finalize()
    End Sub

    Public Overrides Function ExecuteDataReader(ByRef Request As NWDSARequest) As NWDSADataReader
        ' Returns a NWDSADataReader object, which wraps an object of type IDataReader
        ' Uses ODBC .NET data provider, hence the wrapped object is a OdbcDataReader object 
        ' A OdbcDataReader object is a read-only, forward-only data stream. 
        ' NOTE: DataReaders won't be used in queries that perform transactions.

        Dim sConnectStr As String
        Dim cmdODBC As New OdbcCommand()
        Dim prmODBC As OdbcParameter
        Dim oParam As NWDSARequest.Parameter
        Dim colODBCParams As OdbcParameterCollection
        Dim drODBC As OdbcDataReader
        Dim oDataReaderODBC As New NWDSAOdbcDataReader()

        Try
            m_conODBC.ConnectionString = g_ConnStrings.GetInstance.GetConnectStringByRole(Request.Role)

            ' open connection, and begin to set properties of command
            m_conODBC.Open()
            cmdODBC.Connection = m_conODBC
            cmdODBC.CommandType = Request.CommandType

            ' Check for parameters, and set Command property accordingly
            Dim iCounter As Integer
            If Request.Parameters.Count > 0 Then
                'ODBC data provider requires something of the form "{call CustOrdersOrders(?, ?, ?)}" for parameterised stored procedures
                'see http://support.microsoft.com/default.aspx?scid=kb;EN-US;Q309486
                cmdODBC.CommandText = "{call " & Request.Command & "("
                For iCounter = 1 To Request.Parameters.Count
                    cmdODBC.CommandText &= "?"
                    If (iCounter < Request.Parameters.Count) Then cmdODBC.CommandText &= ", "
                Next
                cmdODBC.CommandText &= ")}"
            Else
                cmdODBC.CommandText = Request.Command
            End If

            ' Add parameters to Parameters property if they exist
            If Request.Parameters.Count > 0 Then
                For Each oParam In Request.Parameters
                    prmODBC = cmdODBC.Parameters.Add(oParam.ParamName, oParam.ParamValue)
                Next
            End If

            drODBC = cmdODBC.ExecuteReader()

            oDataReaderODBC.ReturnedDataReader = drODBC
            Return oDataReaderODBC

        Catch exODBC As OdbcException
            Debug.WriteLine(exODBC.Message)
            Request.Exception = exODBC

        Catch ex As Exception
            Debug.WriteLine(ex.Message)
            Request.Exception = ex

        Finally

        End Try
    End Function

    Public Overrides Function ExecuteDataSet(ByRef Request As NWDSARequest) As NWDSADataSet
        ' Returns a NWDSADataSet object, which wraps an object of type DataSet
        ' Uses ODBC .NET data provider if a data provider is necessary 
        ' - hence uses a OdbcDataAdapter to fill the DataSet

        Dim sConnectStr As String
        Dim conODBC As New OdbcConnection()
        Dim cmdODBC As New OdbcCommand()
        Dim prmODBC As OdbcParameter
        Dim oParam As NWDSARequest.Parameter
        Dim colODBCParams As OdbcParameterCollection
        Dim daODBC As OdbcDataAdapter
        Dim oDataSetODBC As New NWDSAOdbcDataSet()
        Dim tranODBC As OdbcTransaction

        Try
            conODBC.ConnectionString = g_ConnStrings.GetInstance.GetConnectStringByRole(Request.Role)

            ' open connection, and begin to set properties of command            
            conODBC.Open()
            cmdODBC.Connection = conODBC
            cmdODBC.CommandType = Request.CommandType

            ' Check for parameters, and set Command property accordingly
            Dim iCounter As Integer
            If Request.Parameters.Count > 0 Then
                'ODBC data provider requires something of the form "{call CustOrdersOrders(?, ?, ?)}" for parameterised stored procedures
                'see http://support.microsoft.com/default.aspx?scid=kb;EN-US;Q309486
                cmdODBC.CommandText = "{call " & Request.Command & "("
                For iCounter = 1 To Request.Parameters.Count
                    cmdODBC.CommandText &= "?"
                    If (iCounter < Request.Parameters.Count) Then cmdODBC.CommandText &= ", "
                Next
                cmdODBC.CommandText &= ")}"
                Debug.WriteLine("cmdODBC.CommandText = """ & cmdODBC.CommandText & """")
            Else
                cmdODBC.CommandText = Request.Command
            End If

            ' Add parameters to Parameters property if they exist
            If Request.Parameters.Count > 0 Then
                For Each oParam In Request.Parameters
                    prmODBC = cmdODBC.Parameters.Add(oParam.ParamName, oParam.ParamValue)
                Next
            End If

            If Request.Transactional Then
                tranODBC = conODBC.BeginTransaction()
            End If

            daODBC = New OdbcDataAdapter(cmdODBC)

            daODBC.Fill(oDataSetODBC.ReturnedDataSet)
            Return oDataSetODBC

        Catch exODBC As OdbcException
            Debug.WriteLine(exODBC.Message)
            Request.Exception = exODBC
            If Request.Transactional Then
                tranODBC.Rollback()
            End If

        Catch ex As Exception
            Debug.WriteLine(ex.Message)
            Request.Exception = ex
            If Request.Transactional Then
                tranODBC.Rollback()
            End If

        Finally
            If Request.Transactional Then
                tranODBC.Commit()
            End If
            If conODBC.State = ConnectionState.Open Then
                conODBC.Close()
            End If
        End Try
    End Function

End Class