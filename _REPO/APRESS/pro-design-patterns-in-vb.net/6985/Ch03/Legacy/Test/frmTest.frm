VERSION 5.00
Begin VB.Form frmTest 
   Caption         =   "Test VB6 Applications"
   ClientHeight    =   3210
   ClientLeft      =   60
   ClientTop       =   345
   ClientWidth     =   3480
   LinkTopic       =   "Form1"
   ScaleHeight     =   3210
   ScaleWidth      =   3480
   StartUpPosition =   3  'Windows Default
   Begin VB.TextBox txtPrice 
      Height          =   285
      Left            =   1680
      TabIndex        =   6
      Text            =   "18.00"
      Top             =   1320
      Width           =   1095
   End
   Begin VB.TextBox txtProductID 
      Height          =   285
      Left            =   1680
      TabIndex        =   3
      Text            =   "1"
      Top             =   240
      Width           =   1095
   End
   Begin VB.CommandButton cmdPriceCheck 
      Caption         =   "Price Check"
      Height          =   495
      Left            =   120
      TabIndex        =   1
      Top             =   1800
      Width           =   3135
   End
   Begin VB.CommandButton cmdGetCount 
      Caption         =   "Get Count"
      Height          =   495
      Left            =   120
      TabIndex        =   0
      Top             =   600
      Width           =   3135
   End
   Begin VB.Label Label1 
      Caption         =   "Price"
      Height          =   255
      Index           =   1
      Left            =   600
      TabIndex        =   5
      Top             =   1320
      Width           =   855
   End
   Begin VB.Label lblResult 
      Height          =   375
      Left            =   120
      TabIndex        =   4
      Top             =   2640
      Width           =   3135
   End
   Begin VB.Label Label1 
      Caption         =   "Product ID"
      Height          =   255
      Index           =   0
      Left            =   600
      TabIndex        =   2
      Top             =   240
      Width           =   855
   End
End
Attribute VB_Name = "frmTest"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Dim m_objProduct As Inventory.Product

Private Sub cmdCheckCredit_Click()

End Sub

Private Sub cmdGetCount_Click()
    lblResult = "Product " & txtProductID & " count equals "
    lblResult = lblResult & m_objProduct.InstockCount(CInt(txtProductID))
End Sub

Private Sub cmdPriceCheck_Click()
    If m_objProduct.PriceCheck(CInt(txtProductID), CDbl(txtPrice)) > 0 Then
        lblResult = "The price is right!"
    Else
        lblResult = "The price is NOT right!"
    End If
End Sub

Private Sub Form_Load()
    Set m_objProduct = New Inventory.Product
End Sub
