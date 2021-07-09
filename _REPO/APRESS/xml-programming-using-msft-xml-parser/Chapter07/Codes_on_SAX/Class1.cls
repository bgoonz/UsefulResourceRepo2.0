VERSION 1.0 CLASS
BEGIN
  MultiUse = -1  'True
  Persistable = 0  'NotPersistable
  DataBindingBehavior = 0  'vbNone
  DataSourceBehavior  = 0  'vbNone
  MTSTransactionMode  = 0  'NotAnMTSObject
END
Attribute VB_Name = "contentHandler"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = True
Attribute VB_PredeclaredId = False
Attribute VB_Exposed = False
Implements IVBSAXContentHandler
Dim ISBNFound As Boolean
Dim titleFound As Boolean
Dim displayTitle As Boolean
Dim title As String


Private Sub IVBSAXContentHandler_characters(strChars As String)
   'Debug.Print "Element text"
   If ISBNFound And strChars = "189311595X" Then
      titleFound = True
   End If
   
   If displayTitle Then
      title = title & strChars
      'End
   End If
End Sub

Private Property Set IVBSAXContentHandler_documentLocator(ByVal RHS As MSXML2.IVBSAXLocator)

End Property

Private Sub IVBSAXContentHandler_endDocument()
   Debug.Print "End of XML document"
End Sub

Private Sub IVBSAXContentHandler_endElement(strNamespaceURI As String, strLocalName As String, strQName As String)
'   Debug.Print "End of element detected. Element is </" & strLocalName & ">"
    If displayTitle Then
       MsgBox title
       End
    End If
End Sub

Private Sub IVBSAXContentHandler_endPrefixMapping(strPrefix As String)
MsgBox "end " & strPrefix
End Sub

Private Sub IVBSAXContentHandler_ignorableWhitespace(strChars As String)

End Sub

Private Sub IVBSAXContentHandler_processingInstruction(strTarget As String, strData As String)

End Sub

Private Sub IVBSAXContentHandler_skippedEntity(strName As String)

End Sub

Private Sub IVBSAXContentHandler_startDocument()
   Debug.Print "Start of XML document"
End Sub

Private Sub IVBSAXContentHandler_startElement(strNamespaceURI As String, strLocalName As String, strQName As String, ByVal oAttributes As MSXML2.IVBSAXAttributes)
'   Debug.Print "Start of element detected. Element name is <" & strLocalName & ">"
'   If oAttributes.length > 0 Then
'      For i = 0 To oAttributes.length - 1
'         Debug.Print "Attribute: " & oAttributes.getLocalName(i) & "=" & oAttributes.getValue(i)
'      Next i
'   End If

If strLocalName = "ISBN" Then
   ISBNFound = True
End If

If titleFound And strLocalName = "TITLE" Then
   displayTitle = True
End If

End Sub

Private Sub IVBSAXContentHandler_startPrefixMapping(strPrefix As String, strURI As String)
MsgBox "start " & strPrefix
End Sub
