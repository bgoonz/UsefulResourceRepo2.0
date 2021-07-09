VERSION 5.00
Object = "{EAB22AC0-30C1-11CF-A7EB-0000C05BAE0B}#1.1#0"; "shdocvw.dll"
Object = "{86CF1D34-0C5F-11D2-A9FC-0000F8754DA1}#2.0#0"; "mscomct2.ocx"
Begin VB.Form frmFlightsInfo 
   Caption         =   "Flights Information System"
   ClientHeight    =   4005
   ClientLeft      =   60
   ClientTop       =   345
   ClientWidth     =   11250
   LinkTopic       =   "Form1"
   ScaleHeight     =   4005
   ScaleWidth      =   11250
   StartUpPosition =   3  'Windows Default
   Begin MSComCtl2.MonthView selectedDate 
      Height          =   2370
      Left            =   240
      TabIndex        =   7
      Top             =   960
      Width           =   2700
      _ExtentX        =   4763
      _ExtentY        =   4180
      _Version        =   393216
      ForeColor       =   -2147483630
      BackColor       =   -2147483633
      Appearance      =   1
      StartOfWeek     =   22740993
      CurrentDate     =   37034
   End
   Begin SHDocVwCtl.WebBrowser WebBrowser1 
      Height          =   3735
      Left            =   3240
      TabIndex        =   6
      Top             =   120
      Width           =   7935
      ExtentX         =   13996
      ExtentY         =   6588
      ViewMode        =   0
      Offline         =   0
      Silent          =   0
      RegisterAsBrowser=   0
      RegisterAsDropTarget=   1
      AutoArrange     =   0   'False
      NoClientEdge    =   0   'False
      AlignLeft       =   0   'False
      NoWebView       =   0   'False
      HideFileNames   =   0   'False
      SingleClick     =   0   'False
      SingleSelection =   0   'False
      NoFolders       =   0   'False
      Transparent     =   0   'False
      ViewID          =   "{0057D0E0-3573-11CF-AE69-08002B2E1262}"
      Location        =   ""
   End
   Begin VB.CommandButton cmdSearch 
      Caption         =   "Search"
      Height          =   375
      Left            =   240
      TabIndex        =   5
      Top             =   3480
      Width           =   2655
   End
   Begin VB.ComboBox ComboTo 
      Height          =   315
      ItemData        =   "frmFlightsInfo.frx":0000
      Left            =   1680
      List            =   "frmFlightsInfo.frx":000D
      TabIndex        =   2
      Text            =   "Destination City"
      Top             =   480
      Width           =   1455
   End
   Begin VB.ComboBox ComboFrom 
      Height          =   315
      ItemData        =   "frmFlightsInfo.frx":0020
      Left            =   120
      List            =   "frmFlightsInfo.frx":002D
      TabIndex        =   1
      Text            =   "Departure City"
      Top             =   480
      Width           =   1455
   End
   Begin VB.TextBox Text1 
      Height          =   1935
      Left            =   2400
      MultiLine       =   -1  'True
      TabIndex        =   0
      Top             =   5640
      Width           =   4455
   End
   Begin VB.Label Label3 
      AutoSize        =   -1  'True
      Caption         =   "To"
      BeginProperty Font 
         Name            =   "MS Sans Serif"
         Size            =   8.25
         Charset         =   0
         Weight          =   700
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      Height          =   195
      Left            =   1680
      TabIndex        =   4
      Top             =   120
      Width           =   240
   End
   Begin VB.Label Label2 
      AutoSize        =   -1  'True
      Caption         =   "From"
      BeginProperty Font 
         Name            =   "MS Sans Serif"
         Size            =   8.25
         Charset         =   0
         Weight          =   700
         Underline       =   0   'False
         Italic          =   0   'False
         Strikethrough   =   0   'False
      EndProperty
      Height          =   195
      Left            =   120
      TabIndex        =   3
      Top             =   120
      Width           =   420
   End
End
Attribute VB_Name = "frmFlightsInfo"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Dim SoapClient As New SoapClient

Private Sub cmdSearch_Click()

Dim xmldoc As New MSXML2.DOMDocument30
Dim xsldoc As New MSXML2.DOMDocument30
Dim seldate As String

'---creates the selected date---
seldate = selectedDate.Year & "/" & Format(selectedDate.Month, "0#") & "/" & Format(selectedDate.Day, "0#")

'===debugging purposes===
'Text1.Text = SoapClient.searchFlights(ComboFrom, ComboTo, seldate)
'========================

'---load the XML result returned from the web service---
xmldoc.async = False

On Error Resume Next
xmldoc.loadXML SoapClient.searchFlights(ComboFrom, ComboTo, seldate)
If SoapClient.detail <> "" Then
   MsgBox SoapClient.detail & ". Please try again."
End If

'---load the XSL stylesheet for transforming the XML result into HTML---
xsldoc.async = False
xsldoc.Load "c:\Flights.xsl"

'---writes the result into c:\---
Open "c:\output.html" For Output As #1
Print #1, CStr(xmldoc.transformNode(xsldoc))
Close 1
'---loads the HTML result into the web browser---
WebBrowser1.Navigate "c:\output.html"

End Sub

Private Sub Form_Load()

'   On Error Resume Next
   '---Initialise the SOAP client---
   SoapClient.mssoapinit "http://win2000as/FlightsInfo.wsdl", "FlightsInfo", "FlightSchedulesSoapPort"
   SoapClient.ConnectorProperty("EndPointURL") = "http://lwm:iloveMac@win2000as/FlightsInfo.wsdl"
   
   If SoapClient.detail <> "" Then
      MsgBox SoapClient.detail
      End
   End If
   WebBrowser1.Navigate "http://www.singaporeair.com"
End Sub
