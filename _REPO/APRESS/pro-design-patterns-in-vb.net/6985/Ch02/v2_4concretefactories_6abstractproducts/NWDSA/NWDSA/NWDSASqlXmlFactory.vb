Imports System.Data
Imports Microsoft.Data.SqlXml
Imports System.Xml

Public Class NWDSASqlXmlFactory : Inherits NWDSAAbstractFactory

    Public Overrides Function ExecuteDataReader(ByRef Request As NWDSARequest) As NWDSADataReader
        ' Not applicable
    End Function

    Public Overrides Function ExecuteDataSet(ByRef Request As NWDSARequest) As NWDSADataSet

        Dim sConnectStr As String
        Dim prmSQLXML As SqlXmlParameter
        Dim oParam As NWDSARequest.Parameter
        Dim strmSQLXML As System.IO.Stream
        Dim rdrSQLXML As System.IO.StreamReader
        Dim cmdSQLXML As SqlXmlCommand
        Dim dsReturn As New DataSet()
        Dim oDataSetSQLXML As New NWDSASqlXmlDataSet()
        Dim iCounter As Integer
        Dim sParamMarks As String

        Try
            sConnectStr = g_ConnStrings.GetInstance.GetConnectStringByRole(Request.Role)
            cmdSQLXML = New SqlXmlCommand(sConnectStr)
            cmdSQLXML.ClientSideXml = True

            ' Must insert a root tag, otherwise we may finish up with multiple root elements! We'll call ours "Root"
            cmdSQLXML.RootTag = "Root"

            'When running any SQL command using SQLXML, cmdXML.CommandType must be SqlXmlCommandType.Sql
            cmdSQLXML.CommandType = SqlXmlCommandType.Sql

            ' Use Request.CommandType to decide how to format the command for SQLXML
            ' See http://msdn.microsoft.com/library/en-us/dnsql2k/html/sqlxml_intromanagedclasses.asp
            ' First construct necessary parameter marks ?, ?, ? (etc - one for each parameter)
            For iCounter = 1 To Request.Parameters.Count
                sParamMarks &= " ?"
                If (iCounter < Request.Parameters.Count) Then sParamMarks &= ","
            Next
            ' Now use it to construct the string
            Select Case Request.CommandType
                Case CommandType.StoredProcedure
                    cmdSQLXML.CommandText = "EXEC " & Request.Command & sParamMarks & " FOR XML RAW"
                Case CommandType.Text
                    cmdSQLXML.CommandText = Request.Command & sParamMarks & " FOR XML AUTO"
            End Select

            ' Add Parameters to the command if they exist
            If Request.Parameters.Count > 0 Then
                For Each oParam In Request.Parameters
                    prmSQLXML = cmdSQLXML.CreateParameter()
                    prmSQLXML.Name = oParam.ParamName
                    prmSQLXML.Value = oParam.ParamValue
                Next
            End If

            strmSQLXML = cmdSQLXML.ExecuteStream()
            rdrSQLXML = New System.IO.StreamReader(strmSQLXML)

            ' Load dataset with returned XML.  
            ' Notes: 
            ' 1. Auto is default, but we nention it specifically so that the dataset can use implicit schema generation
            ' 2. The default name of the returned table is "row", but we can (and must) change it to something the calling app expects (in this case, "Table")
            dsReturn.ReadXml(rdrSQLXML, XmlReadMode.Auto)
            dsReturn.Tables(0).TableName = "Table"
            oDataSetSQLXML.ReturnedDataSet = dsReturn

        Catch exSQLXML As SqlXmlException
            Debug.WriteLine(exSQLXML.Message)
            Request.Exception = exSQLXML

        Catch ex As Exception
            Debug.WriteLine(ex.Message)
            Request.Exception = ex
        End Try

        Return oDataSetSQLXML

    End Function

    Public Overrides Function ExecuteXMLDocument(ByRef Request As NWDSARequest) As NWDSAXmlDoc
        ' load and return an XML Document from stream

        Dim sConnectStr As String
        Dim prmSQLXML As SqlXmlParameter
        Dim oParam As NWDSARequest.Parameter
        Dim strmSQLXML As System.IO.Stream
        Dim rdrSQLXML As System.IO.StreamReader
        Dim cmdSQLXML As Microsoft.Data.SqlXml.SqlXmlCommand
        Dim xmlReturn As New XmlDocument()
        Dim oXmlDocSQLXML As New NWDSASqlXmlXmlDoc()
        Dim iCounter As Integer
        Dim sParamMarks As String

        Try
            sConnectStr = g_ConnStrings.GetInstance.GetConnectStringByRole(Request.Role)
            cmdSQLXML = New SqlXmlCommand(sConnectStr)
            cmdSQLXML.ClientSideXml = True

            ' Must insert a root tag, otherwise we may finish up with multiple root elements! We'll call ours "Root"
            cmdSQLXML.RootTag = "Root"

            'When running any SQL command using SQLXML, cmdXML.CommandType must be SqlXmlCommandType.Sql
            cmdSQLXML.CommandType = SqlXmlCommandType.Sql

            ' Use Request.CommandType to decide how to format the command for SQLXML
            ' See http://msdn.microsoft.com/library/en-us/dnsql2k/html/sqlxml_intromanagedclasses.asp
            ' First construct necessary parameter marks ?, ?, ? (etc - one for each parameter)
            For iCounter = 1 To Request.Parameters.Count
                sParamMarks &= " ?"
                If (iCounter < Request.Parameters.Count) Then sParamMarks &= ","
            Next
            ' Now use it to construct the string
            Select Case Request.CommandType
                Case CommandType.StoredProcedure
                    cmdSQLXML.CommandText = "EXEC " & Request.Command & sParamMarks & " FOR XML RAW"
                Case CommandType.Text
                    cmdSQLXML.CommandText = Request.Command & sParamMarks & " FOR XML AUTO"
            End Select

            ' Add Parameters to the command if they exist
            If Request.Parameters.Count > 0 Then
                For Each oParam In Request.Parameters
                    prmSQLXML = cmdSQLXML.CreateParameter()
                    prmSQLXML.Name = oParam.ParamName
                    prmSQLXML.Value = oParam.ParamValue
                Next
            End If

            strmSQLXML = cmdSQLXML.ExecuteStream()
            rdrSQLXML = New System.IO.StreamReader(strmSQLXML)
            xmlReturn.LoadXml(rdrSQLXML.ReadToEnd.ToString)

            oXmlDocSQLXML.ReturnedXmlDoc = xmlReturn

        Catch exSQLXML As SqlXmlException
            Debug.WriteLine(exSQLXML.Message)
            Request.Exception = exSQLXML

        Catch ex As Exception
            Debug.WriteLine(ex.Message)
            Request.Exception = ex
        End Try

        Return oXmlDocSQLXML

    End Function

    Public Overrides Function ExecuteXMLReader(ByRef Request As NWDSARequest) As NWDSAXmlReader

        ' load and return an XML Reader using the SQLXML Command's ExecuteReader method

        Dim sConnectStr As String
        Dim prmSQLXML As SqlXmlParameter
        Dim oParam As NWDSARequest.Parameter
        Dim strmXML As System.IO.Stream
        Dim rdrXML As System.IO.StreamReader
        Dim cmdSQLXML As SqlXmlCommand
        Dim oReaderSQLXML As New NWDSASQlXmlXmlReader()
        Dim iCounter As Integer
        Dim sParamMarks As String

        Try
            sConnectStr = g_ConnStrings.GetInstance.GetConnectStringByRole(Request.Role)
            cmdSQLXML = New SqlXmlCommand(sConnectStr)
            cmdSQLXML.ClientSideXml = True

            ' Must insert a root tag, otherwise we may finish up with multiple root elements! We'll call ours "Root"
            cmdSQLXML.RootTag = "Root"

            'When running any SQL command using SQLXML, cmdXML.CommandType must be SqlXmlCommandType.Sql
            cmdSQLXML.CommandType = SqlXmlCommandType.Sql

            ' Use Request.CommandType to decide how to format the command for SQLXML
            ' See http://msdn.microsoft.com/library/en-us/dnsql2k/html/sqlxml_intromanagedclasses.asp
            ' First construct necessary parameter marks ?, ?, ? (etc - one for each parameter)
            For iCounter = 1 To Request.Parameters.Count
                sParamMarks &= " ?"
                If (iCounter < Request.Parameters.Count) Then sParamMarks &= ","
            Next
            ' Now use it to construct the string
            Select Case Request.CommandType
                Case CommandType.StoredProcedure
                    cmdSQLXML.CommandText = "EXEC " & Request.Command & sParamMarks & " FOR XML RAW"
                Case CommandType.Text
                    cmdSQLXML.CommandText = Request.Command & sParamMarks & " FOR XML AUTO"
            End Select

            ' Add Parameters to the command if they exist
            If Request.Parameters.Count > 0 Then
                For Each oParam In Request.Parameters
                    prmSQLXML = cmdSQLXML.CreateParameter()
                    prmSQLXML.Name = oParam.ParamName
                    prmSQLXML.Value = oParam.ParamValue
                Next
            End If

            oReaderSQLXML.ReturnedXmlReader = cmdSQLXML.ExecuteXmlReader

        Catch exSQLXML As SqlXmlException
            Debug.WriteLine(exSQLXML.Message)
            Request.Exception = exSQLXML

        Catch ex As Exception
            Debug.WriteLine(ex.Message)
            Request.Exception = ex
        End Try

        Return oReaderSQLXML

    End Function

    Public Overrides Function ExecuteScalar(ByRef Request As NWDSARequest) As NWDSAScalar

        ' load and return an XML Reader using the SQLXML Command's ExecuteReader method

        Dim sConnectStr As String
        Dim prmSQLXML As SqlXmlParameter
        Dim oParam As NWDSARequest.Parameter
        Dim strmSQLXML As System.IO.Stream
        Dim rdrSQLXML As System.IO.StreamReader
        Dim cmdSQLXML As SqlXmlCommand
        Dim oScalarSQLXML As New NWDSASqlXmlScalar()
        Dim iCounter As Integer
        Dim sParamMarks As String
        Dim xmlDoc As New XmlDocument()
        Dim xmlRootNode As XmlNode
        Dim xmlChildNode As XmlNode

        Try
            sConnectStr = g_ConnStrings.GetInstance.GetConnectStringByRole(Request.Role)
            cmdSQLXML = New SqlXmlCommand(sConnectStr)
            cmdSQLXML.ClientSideXml = True

            ' Must insert a root tag, otherwise we may finish up with multiple root elements! We'll call ours "Root"
            cmdSQLXML.RootTag = "Root"

            'When running any SQL command using SQLXML, cmdXML.CommandType must be SqlXmlCommandType.Sql
            cmdSQLXML.CommandType = SqlXmlCommandType.Sql

            ' Use Request.CommandType to decide how to format the command for SQLXML
            ' See http://msdn.microsoft.com/library/en-us/dnsql2k/html/sqlxml_intromanagedclasses.asp
            ' First construct necessary parameter marks ?, ?, ? (etc - one for each parameter)
            For iCounter = 1 To Request.Parameters.Count
                sParamMarks &= " ?"
                If (iCounter < Request.Parameters.Count) Then sParamMarks &= ","
            Next
            ' Now use it to construct the string
            Select Case Request.CommandType
                Case CommandType.StoredProcedure
                    cmdSQLXML.CommandText = "EXEC " & Request.Command & sParamMarks & " FOR XML RAW"
                Case CommandType.Text
                    cmdSQLXML.CommandText = Request.Command & sParamMarks & " FOR XML AUTO"
            End Select

            ' Add Parameters to the command if they exist
            If Request.Parameters.Count > 0 Then
                For Each oParam In Request.Parameters
                    prmSQLXML = cmdSQLXML.CreateParameter()
                    prmSQLXML.Name = oParam.ParamName
                    prmSQLXML.Value = oParam.ParamValue
                Next
            End If

            strmSQLXML = cmdSQLXML.ExecuteStream()
            rdrSQLXML = New System.IO.StreamReader(strmSQLXML)
            xmlDoc.LoadXml(rdrSQLXML.ReadToEnd.ToString)

            ' Expect something like this, with a single Element node as a child of <Root/>: 
            ' <Root>
            '       <Customers CustomerName="Alfreds Futterkiste" />
            ' </Root>

            ' Navigate the DOM to get the atttribute value
            xmlRootNode = xmlDoc.DocumentElement
            xmlChildNode = xmlRootNode.FirstChild
            oScalarSQLXML.ReturnedScalar = xmlChildNode.Attributes(0).Value

        Catch exSQLXML As SqlXmlException
            Debug.WriteLine(exSQLXML.Message)
            Request.Exception = exSQLXML

        Catch ex As Exception
            Debug.WriteLine(ex.Message)
            Request.Exception = ex
        End Try

        Return oScalarSQLXML

    End Function

    Public Overrides Function ExecuteNonQuery(ByRef Request As NWDSARequest) As NWDSANonQuery

        ' load and return an XML Reader using the SQLXML Command's ExecuteReader method

        Dim sConnectStr As String
        Dim prmSQLXML As SqlXmlParameter
        Dim oParam As NWDSARequest.Parameter
        Dim strmXML As System.IO.Stream
        Dim rdrXML As System.IO.StreamReader
        Dim cmdSQLXML As SqlXmlCommand
        Dim oNonQuerySQLXML As New NWDSASqlXmlNonQuery()
        Dim iCounter As Integer
        Dim sParamMarks As String
        Dim RECORDS_AFFECTED_UNKNOWN As Integer = -1

        Try
            sConnectStr = g_ConnStrings.GetInstance.GetConnectStringByRole(Request.Role)
            cmdSQLXML = New SqlXmlCommand(sConnectStr)
            cmdSQLXML.ClientSideXml = True

            ' Must insert a root tag, otherwise we may finish up with multiple root elements! We'll call ours "Root"
            cmdSQLXML.RootTag = "Root"

            'When running any SQL command using SQLXML, cmdXML.CommandType must be SqlXmlCommandType.Sql
            cmdSQLXML.CommandType = SqlXmlCommandType.Sql

            ' Use Request.CommandType to decide how to format the command for SQLXML
            ' See http://msdn.microsoft.com/library/en-us/dnsql2k/html/sqlxml_intromanagedclasses.asp
            ' First construct necessary parameter marks ?, ?, ? (etc - one for each parameter)
            For iCounter = 1 To Request.Parameters.Count
                sParamMarks &= " ?"
                If (iCounter < Request.Parameters.Count) Then sParamMarks &= ","
            Next
            ' Now use it to construct the string
            Select Case Request.CommandType
                Case CommandType.StoredProcedure
                    cmdSQLXML.CommandText = "EXEC " & Request.Command & sParamMarks & " FOR XML RAW"
                Case CommandType.Text
                    cmdSQLXML.CommandText = Request.Command & sParamMarks & " FOR XML AUTO"
            End Select

            ' Add Parameters to the command if they exist
            If Request.Parameters.Count > 0 Then
                For Each oParam In Request.Parameters
                    prmSQLXML = cmdSQLXML.CreateParameter()
                    prmSQLXML.Name = oParam.ParamName
                    prmSQLXML.Value = oParam.ParamValue
                Next
            End If

            ' SqlXmlCommand.ExecuteNonQuery() does not return a value; 
            ' but we can run the query anyway and return a constant indicating that the number of affected records is unknown
            cmdSQLXML.ExecuteNonQuery()
            oNonQuerySQLXML.AffectedRecords = RECORDS_AFFECTED_UNKNOWN

        Catch exSQLXML As SqlXmlException
            Debug.WriteLine(exSQLXML.Message)
            Request.Exception = exSQLXML

        Catch ex As Exception
            Debug.WriteLine(ex.Message)
            Request.Exception = ex
        End Try

        Return oNonQuerySQLXML

    End Function







End Class