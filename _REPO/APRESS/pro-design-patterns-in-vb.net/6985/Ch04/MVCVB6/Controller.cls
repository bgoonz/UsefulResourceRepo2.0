VERSION 1.0 CLASS
BEGIN
  MultiUse = -1  'True
  Persistable = 0  'NotPersistable
  DataBindingBehavior = 0  'vbNone
  DataSourceBehavior  = 0  'vbNone
  MTSTransactionMode  = 0  'NotAnMTSObject
END
Attribute VB_Name = "Controller"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = True
Attribute VB_PredeclaredId = False
Attribute VB_Exposed = False
Option Explicit

Private m_model As ADODB.Recordset
Private WithEvents m_ordersView As Form
Attribute m_ordersView.VB_VarHelpID = -1
Private WithEvents m_ordersGrid As DataGrid
Attribute m_ordersGrid.VB_VarHelpID = -1
Private WithEvents m_clickMeButton As CommandButton
Attribute m_clickMeButton.VB_VarHelpID = -1

Public Sub init(ByRef ordersView As Form, _
                ByRef ordersGrid As DataGrid, _
                ByRef clickMeButton As CommandButton)
  Set m_ordersView = ordersView
  Set m_ordersGrid = ordersGrid
  Set m_clickMeButton = clickMeButton
End Sub

Private Sub m_OrdersView_Load()
  Set m_model = getModel()
  With m_ordersGrid
    Set .DataSource = m_model
  End With
End Sub

Private Sub m_clickMeButton_Click()
  With m_model
    .MoveFirst
    .Fields("OrderDate") = Now
  End With
End Sub


