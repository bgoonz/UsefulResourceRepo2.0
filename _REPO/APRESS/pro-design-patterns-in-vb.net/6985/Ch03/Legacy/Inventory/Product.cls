VERSION 1.0 CLASS
BEGIN
  MultiUse = -1  'True
  Persistable = 0  'NotPersistable
  DataBindingBehavior = 0  'vbNone
  DataSourceBehavior  = 0  'vbNone
  MTSTransactionMode  = 0  'NotAnMTSObject
END
Attribute VB_Name = "Product"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = True
Attribute VB_PredeclaredId = False
Attribute VB_Exposed = True
Option Explicit

Public Function InstockCount(ByVal ProductID As Integer) As Integer
    
    On Error GoTo LocalError
    
    Dim intResult As Integer
    Dim strQuery As String
    Dim cn As ADODB.Connection
    Dim rs As ADODB.Recordset
   
    strQuery = "SELECT UnitsInStock FROM Products WHERE ProductID = " & ProductID
    
    Set cn = New ADODB.Connection
    cn.Open GetConnectionString
        
    Set rs = cn.Execute(strQuery)
 
    If Not (rs.BOF Or rs.EOF) Then
        intResult = rs(0)
    Else
        intResult = -1
    End If
   
    rs.Close
    cn.Close
    
    GoTo ExitFunction
LocalError:
    Err.Raise Err.Number, "InstockCount", Err.Description
ExitFunction:
     InstockCount = intResult
CleanUp:
    If Not rs Is Nothing Then
        Set rs = Nothing
    End If
    If Not cn Is Nothing Then
        Set cn = Nothing
    End If
End Function

Public Function PriceCheck(ByVal ProductID As Long, ByVal Price As Double) As Integer
    
    On Error GoTo LocalError
    
    Dim intResult As Integer
    Dim cn As ADODB.Connection
    Dim rs As ADODB.Recordset
    Dim strQuery As String
    
    strQuery = "SELECT * FROM Products WHERE "
    strQuery = strQuery & "ProductID = " & ProductID
    strQuery = strQuery & " AND "
    strQuery = strQuery & "UnitPrice = " & Price
    
    Set cn = New ADODB.Connection
    cn.Open GetConnectionString
    
    Set cn = New ADODB.Connection
    cn.Open GetConnectionString
        
    Set rs = cn.Execute(strQuery)
 
    If Not (rs.BOF Or rs.EOF) Then
        intResult = 1
    Else
        intResult = -1
    End If
   
    rs.Close
    cn.Close
        
    GoTo ExitFunction
LocalError:
    Err.Raise Err.Number, "PriceCheck", Err.Description
ExitFunction:
     PriceCheck = intResult
CleanUp:
    If Not rs Is Nothing Then
        Set rs = Nothing
    End If
    If Not cn Is Nothing Then
        Set cn = Nothing
    End If
End Function

