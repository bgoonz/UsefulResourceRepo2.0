Attribute VB_Name = "Module1"
Option Explicit

Public Function getModel() As ADODB.Recordset
  Dim rs As ADODB.Recordset
  Set rs = New ADODB.Recordset

  With rs
    .CursorLocation = adUseClient
    .LockType = adLockBatchOptimistic

    'create schema
    .Fields.Append "OrderID", adInteger
    .Fields.Append "CustomerID", adBSTR
    .Fields.Append "OrderDate", adDate
    .Fields.Append "OrderType", adSmallInt

    'add sample data
    .Open
    .AddNew
    .Fields("OrderID") = 100
    .Fields("CustomerID") = "pete"
    .Fields("OrderDate") = #1/1/2002#
    .Fields("OrderType") = 0
    .AddNew
    .Fields("OrderID") = 101
    .Fields("CustomerID") = "jon"
    .Fields("OrderDate") = #2/1/2002#
    .Fields("OrderType") = 1
  End With

  Set getModel = rs
End Function

