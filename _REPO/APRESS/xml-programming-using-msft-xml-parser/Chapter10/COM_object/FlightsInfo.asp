<%@ LANGUAGE=VBScript %>
<%
Option Explicit
On Error Resume Next
Response.ContentType = "text/xml"
Dim SoapServer
If Not Application("SoapServerInitialized") Then
  Application.Lock
  If Not Application("SoapServerInitialized") Then
    Dim WSDLFilePath
    Dim WSMLFilePath
    WSDLFilePath = Server.MapPath("FlightsInfo.wsdl")
    WSMLFilePath = Server.MapPath("FlightsInfo.wsml")
    Set SoapServer = Server.CreateObject("MSSOAP.SoapServer")
    If Err Then SendFault "Cannot create SoapServer object. " & Err.Description
    SoapServer.Init WSDLFilePath, WSMLFilePath
    If Err Then SendFault "SoapServer.Init failed. " & Err.Description
    Set Application("FlightsInfoServer") = SoapServer
    Application("SoapServerInitialized") = True
  End If
  Application.UnLock
End If
Set SoapServer = Application("FlightsInfoServer")
SoapServer.SoapInvoke Request, Response, ""
If Err Then SendFault "SoapServer.SoapInvoke failed. " & Err.Description
Sub SendFault(ByVal LogMessage)
  Dim Serializer
  On Error Resume Next
  ' "URI Query" logging must be enabled for AppendToLog to work
  Response.AppendToLog " SOAP ERROR: " & LogMessage
  Set Serializer = Server.CreateObject("MSSOAP.SoapSerializer")
  If Err Then
    Response.AppendToLog "Could not create SoapSerializer object. " & Err.Description
    Response.Status = "500 Internal Server Error"
  Else
    Serializer.Init Response
    If Err Then
      Response.AppendToLog "SoapSerializer.Init failed. " & Err.Description
      Response.Status = "500 Internal Server Error"
    Else
      Serializer.startEnvelope
      Serializer.startBody
      Serializer.startFault "Server", "The request could not be processed due to a problem in the server. Please contact the system admistrator. " & LogMessage
      Serializer.endFault
      Serializer.endBody
      Serializer.endEnvelope
      If Err Then
        Response.AppendToLog "SoapSerializer failed. " & Err.Description
        Response.Status = "500 Internal Server Error"
      End If
    End If
  End If
  Response.End
End Sub
%>

