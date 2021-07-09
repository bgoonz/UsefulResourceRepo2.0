VERSION 5.00
Begin VB.Form Form1 
   Caption         =   "Form1"
   ClientHeight    =   825
   ClientLeft      =   60
   ClientTop       =   345
   ClientWidth     =   2910
   LinkTopic       =   "Form1"
   ScaleHeight     =   825
   ScaleWidth      =   2910
   StartUpPosition =   3  'Windows Default
End
Attribute VB_Name = "Form1"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Private Sub Form_Load()
    Dim SAXReader As New SAXXMLReader
    Dim XMLWriter As New MXXMLWriter
    
    '---For handling parsing events---
    Dim contentHandler As New contentHandler
    Dim errorHandler As New errorHandler
    
    Set SAXReader.contentHandler = contentHandler
    Set SAXReader.errorHandler = errorHandler
    MsgBox "Please make the necessary modifications when testing. This source is provided as a skeleton for the examples in the book"
    '---Parse the XML document---
    'On Error Resume Next
    SAXReader.parseURL ("c:\inetpub\apress\chapter 8 codes\test.xml")
    Exit Sub
End Sub
