Option Strict On
Option Explicit On 

Imports System.IO
Imports System.Xml
Imports System.Xml.Schema

Public Interface ProcessDocument
    Sub Load(ByVal docType As DocumentCodes.Type, ByVal docID As String, ByVal xmlText As String)
    ReadOnly Property DocID() As String
    ReadOnly Property DocXML() As XmlDocument
    Property DocType() As DocumentCodes.Type
    Property DocStatus() As DocumentCodes.Status
    Property DocErrors() As String
End Interface

Public Class Document : Implements ProcessDocument

    Private m_DocType As DocumentCodes.Type = DocumentCodes.Type.Unknown
    Private m_DocStatus As DocumentCodes.Status = DocumentCodes.Status.Processing
    Private m_DocErrors As String
    Private m_DocID As String
    Private m_Xml As New XmlDocument()

    Public Sub Load(ByVal docType As DocumentCodes.Type, ByVal docID As String, ByVal xmlText As String) _
                                          Implements ProcessDocument.Load
        m_DocType = docType
        m_DocID = docID
        LoadXMLDoc(xmlText)
    End Sub

    Public ReadOnly Property DocID() As String _
                                         Implements ProcessDocument.DocID
        Get
            Return m_DocID
        End Get
    End Property

    Public ReadOnly Property DocXML() As XmlDocument _
                                        Implements ProcessDocument.DocXML
        Get
            Return m_Xml
        End Get
    End Property

    Public Property DocType() As DocumentCodes.Type _
                                       Implements ProcessDocument.DocType
        Get
            Return m_DocType
        End Get
        Set(ByVal Value As DocumentCodes.Type)
            If m_DocType = DocumentCodes.Type.Unknown Then
                m_DocType = Value
            End If
        End Set
    End Property

    Public Property DocStatus() As DocumentCodes.Status _
                                     Implements ProcessDocument.DocStatus
        Get
            Return m_DocStatus
        End Get
        Set(ByVal Value As DocumentCodes.Status)
            If m_DocStatus <> DocumentCodes.Status.Errors Then
                m_DocStatus = Value
            End If
        End Set
    End Property

    Public Property DocErrors() As String _
                                     Implements ProcessDocument.DocErrors
        Get
            Return m_DocErrors
        End Get
        Set(ByVal Value As String)
            m_DocErrors &= Value & vbCrLf
            If m_DocStatus <> DocumentCodes.Status.Errors Then
                m_DocStatus = DocumentCodes.Status.Errors
            End If
        End Set
    End Property

    Private Sub LoadXMLDoc(ByVal xmlText As String)
        Try
            Dim stringReader As New StringReader(xmlText.Replace(ControlChars.Quote, "'"))

            Dim xmlReader As New XmlTextReader(stringReader)
            Dim xmlValidator As New XmlValidatingReader(xmlReader)

            xmlValidator.ValidationType = ValidationType.Auto
            AddHandler xmlValidator.ValidationEventHandler, AddressOf XMLValidationEventHandler

            While xmlValidator.Read
            End While

            If m_DocStatus <> DocumentCodes.Status.Errors Then
                m_Xml.LoadXml(xmlText)
            End If

        Catch e As Exception
            DocErrors = e.Message
        End Try
    End Sub

    Public Sub XMLValidationEventHandler(ByVal sender As Object, ByVal args As ValidationEventArgs)
        DocErrors = args.Message
    End Sub

End Class

Public MustInherit Class Processes : Implements ProcessDocument
    Protected m_Document As ProcessDocument

    Public Sub New(ByRef doc As ProcessDocument)
        m_Document = doc
    End Sub

    Sub Load(ByVal docType As DocumentCodes.Type, ByVal docID As String, ByVal xmlText As String) _
                                          Implements ProcessDocument.Load
        m_Document.Load(docType, docID, xmlText)
    End Sub

    Public ReadOnly Property DocID() As String Implements ProcessDocument.DocID
        Get
            Return m_Document.DocID
        End Get
    End Property

    Public ReadOnly Property DocXML() As XmlDocument Implements ProcessDocument.DocXML
        Get
            Return m_Document.DocXML
        End Get
    End Property

    Public Property DocType() As DocumentCodes.Type Implements ProcessDocument.DocType
        Get
            Return m_Document.DocType
        End Get
        Set(ByVal Value As DocumentCodes.Type)
            m_Document.DocType = Value
        End Set
    End Property

    Public Property DocStatus() As DocumentCodes.Status Implements ProcessDocument.DocStatus
        Get
            Return m_Document.DocStatus
        End Get
        Set(ByVal Value As DocumentCodes.Status)
            m_Document.DocStatus = Value
        End Set
    End Property

    Public Property DocErrors() As String Implements ProcessDocument.DocErrors
        Get
            Return m_Document.DocErrors
        End Get
        Set(ByVal Value As String)
            m_Document.DocErrors = Value
        End Set
    End Property

End Class

Public Class DocumentCodes
    Public Enum Status
        Processing
        Errors
        Complete
    End Enum

    Public Enum Type
        Unknown
        SpecialOrder
        Order
    End Enum
End Class

