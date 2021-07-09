VERSION 1.0 CLASS
BEGIN
  MultiUse = -1  'True
  Persistable = 0  'NotPersistable
  DataBindingBehavior = 0  'vbNone
  DataSourceBehavior  = 0  'vbNone
  MTSTransactionMode  = 0  'NotAnMTSObject
END
Attribute VB_Name = "FlightSchedules"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = True
Attribute VB_PredeclaredId = False
Attribute VB_Exposed = True

Public Function searchFlights(flyFrom As String, flyTo As String, depdate As String) As String
   Dim conn As New Connection
   Dim rs As New Recordset
   Dim connStr, sql, xmlStr As String
   Dim discount As Integer

      connStr = "Provider=SQLOLEDB.1;Password=secret;Persist Security Info=True;User ID=sa;Initial Catalog=FlightSchedules;Data Source=WIN2000AS"

      conn.Open connStr
      sql = "SELECT * FROM Schedules WHERE FlyFrom='" & flyFrom & "' AND FlyTo='" & flyTo & "' AND FlyDate='" & depdate & "'"
      Set rs = conn.Execute(sql)
      xmlStr = "<?xml version='1.0'?>"
      xmlStr = xmlStr & "<FlightsInfo>"
      xmlStr = xmlStr & "<From>" & flyFrom & "</From>"
      xmlStr = xmlStr & "<To>" & flyTo & "</To>"
      xmlStr = xmlStr & "<Date>" & depdate & "</Date>"
      
      While Not rs.EOF
         xmlStr = xmlStr & "<Flight>"
         xmlStr = xmlStr & "<FlightNo>" & rs("FlightNo") & "</FlightNo>"
         xmlStr = xmlStr & "<DepTime>" & rs("DepTime") & "</DepTime>"
         If CInt(rs("AddDays")) = 0 Then
            xmlStr = xmlStr & "<ArrTime>" & rs("ArrTime") & "</ArrTime>"
         Else
            xmlStr = xmlStr & "<ArrTime>" & rs("ArrTime") & "(+" & rs("AddDays") & ")</ArrTime>"
         End If
         xmlStr = xmlStr & "<Operating>" & rs("Operating") & "</Operating>"
         xmlStr = xmlStr & "<Stops>" & rs("Stops") & "</Stops>"
         xmlStr = xmlStr & "<AircraftType>" + rs("AircraftType") & "</AircraftType>"
         xmlStr = xmlStr & "</Flight>"
         rs.MoveNext
      Wend
      xmlStr = xmlStr & "</FlightsInfo>"
      searchFlights = xmlStr
End Function

