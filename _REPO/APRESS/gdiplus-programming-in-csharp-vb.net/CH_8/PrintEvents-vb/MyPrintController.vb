Option Strict On

Imports System
Imports System.IO
Imports System.Drawing
Imports System.Drawing.Printing

Public Class MyPrintController
  Inherits StandardPrintController

  Private lblEvents As Label

  Public Sub New(ByRef lbl As Label)
    MyBase.New()
    lblEvents = lbl
  End Sub

  Public Overrides Sub OnStartPrint(ByVal doc As PrintDocument, _
                                    ByVal e As PrintEventArgs)
    lblEvents.Text += "      PrintController: OnStartPrint" + vbCrLf
    MyBase.OnStartPrint(doc, e)
  End Sub

  Public Overrides Function OnStartPage(ByVal doc As PrintDocument, _
                                        ByVal e As PrintPageEventArgs) _
                                        As Graphics
    lblEvents.Text += "      PrintController: OnStartPage" + vbCrLf
    Return (MyBase.OnStartPage(doc, e))
  End Function

  Public Overrides Sub OnEndPage(ByVal doc As PrintDocument, _
                                 ByVal e As PrintPageEventArgs)
    lblEvents.Text += "      PrintController: OnEndPage" + vbCrLf
    MyBase.OnEndPage(doc, e)
  End Sub

  Public Overrides Sub OnEndPrint(ByVal doc As PrintDocument, _
                                  ByVal e As PrintEventArgs)
    lblEvents.Text += "      PrintController: OnEndPrint" + vbCrLf
    MyBase.OnEndPrint(doc, e)
  End Sub


End Class
