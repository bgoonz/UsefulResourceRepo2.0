VERSION 5.00
Begin VB.Form FishBowl 
   BorderStyle     =   1  'Fixed Single
   Caption         =   "Form1"
   ClientHeight    =   6375
   ClientLeft      =   45
   ClientTop       =   330
   ClientWidth     =   5250
   DrawWidth       =   253
   LinkTopic       =   "Form1"
   MaxButton       =   0   'False
   MinButton       =   0   'False
   ScaleHeight     =   6375
   ScaleWidth      =   5250
   StartUpPosition =   2  'CenterScreen
   Begin VB.CommandButton cmdNative 
      Caption         =   "&Native Paint"
      Height          =   435
      Left            =   1800
      TabIndex        =   3
      Top             =   5760
      Width           =   1215
   End
   Begin VB.CommandButton cmdAPI 
      Caption         =   "&API Paint"
      Height          =   435
      Left            =   240
      TabIndex        =   2
      Top             =   5760
      Width           =   1215
   End
   Begin VB.CommandButton cmdQuit 
      Caption         =   "&Quit"
      Height          =   435
      Left            =   4080
      TabIndex        =   1
      Top             =   5760
      Width           =   855
   End
   Begin VB.PictureBox picBowl 
      AutoRedraw      =   -1  'True
      Height          =   4700
      Left            =   240
      ScaleHeight     =   4635
      ScaleWidth      =   4635
      TabIndex        =   0
      Top             =   240
      Width           =   4700
   End
   Begin VB.Label lblTime 
      BorderStyle     =   1  'Fixed Single
      Height          =   255
      Left            =   1440
      TabIndex        =   5
      Top             =   5160
      Width           =   1935
   End
   Begin VB.Label Label1 
      Caption         =   "Elapsed Time"
      Height          =   255
      Left            =   240
      TabIndex        =   4
      Top             =   5160
      Width           =   1095
   End
End
Attribute VB_Name = "FishBowl"
Attribute VB_GlobalNameSpace = False
Attribute VB_Creatable = False
Attribute VB_PredeclaredId = True
Attribute VB_Exposed = False
Option Explicit

Private tm As Single

'This piece of code creates a stack of 3 blocks that fill the whole picture control
'There is a clipping region that is made in the form of a cirlce
'It is the clipping region that make it appear to the user that the circle is being filled.
Private Sub cmdapi_Click()
  Dim k As Single
  Dim j As Integer
  
  lblTime.Caption = ""
  cmdQuit.Enabled = False
  
  tm = Timer
 ' For j = 0 To 10
    For k = 0.1 To 0.8 Step 0.01
      Call FillBowlAPI(k, 0.1)
      DoEvents
    Next
'  Next

  lblTime.Caption = Format(Timer - tm, "0.###")
  cmdQuit.Enabled = True
  
End Sub

Private Sub cmdNative_Click()
  Dim k As Single
  
  lblTime.Caption = ""
  cmdQuit.Enabled = False
  
  tm = Timer
  For k = 0.1 To 0.8 Step 0.01
    Call FillBowlNoAPI(k, 0.1)
    DoEvents
  Next
  
  lblTime.Caption = Format(Timer - tm, "0.###")
  cmdQuit.Enabled = True
  
End Sub

Private Sub cmdQuit_Click()
  End
End Sub

Private Sub FillBowlAPI(BK1ht As Single, BK3ht As Single)
  Dim Brush    As Long
  Dim Pen      As Long
  Dim OldPen   As Long
  Dim OldBrush As Long
  Dim OldDc    As Long
  Dim hRegion  As Long
  
  Dim ScaleDiameter  As Integer
  Dim MidRect        As Integer
  Dim BottomRect     As Integer
  
  'Make sure that the mode is in pixels because that is what the
  'WIN API functions need
  picBowl.ScaleMode = PIXEL_MODE
  picBowl.Cls
  
  ScaleDiameter = picBowl.ScaleHeight
  If BK1ht > 1 Then BK1ht = 1
  If BK3ht > 1 Then BK3ht = 1
  MidRect = BK1ht * ScaleDiameter
  BottomRect = BK3ht * ScaleDiameter
  
  'save the device context
  OldDc = SaveDC(picBowl.hdc)
  
  'The cirlce and clipping region only needs to be done once for the tank as a whole
  'Create a series of stacking rectangles within the circle to represent the levels
  ' Create the clipping region for the circle
  hRegion = CreateEllipticRgn(2, 2, picBowl.ScaleWidth - 2, ScaleDiameter - 2)
  Call SelectClipRgn(picBowl.hdc, hRegion)
  
  'Draw the main rectangle
  'This draws a rectangle that starts above the bottom and ends at the bottom
  Pen = CreatePen(PS_SOLID, 1, vbBlue)
  OldPen = SelectObject(picBowl.hdc, Pen)
  Brush = CreateSolidBrush(vbBlue)
  OldBrush = SelectObject(picBowl.hdc, Brush)
  Call Rectangle(picBowl.hdc, 0, ScaleDiameter - MidRect, picBowl.ScaleWidth, _
                  ScaleDiameter)
  'First restore original objects into the device context
  Call SelectObject(picBowl.hdc, OldPen)
  Call SelectObject(picBowl.hdc, OldBrush)
  'Destroy objects to prevent memory leaks
  Call DeleteObject(Pen)
  Call DeleteObject(Brush)
  
  'Draw the top rectangle
  'This draws a rectangle that starts at the top and ends at the top of the previous rectangle
  Pen = CreatePen(PS_SOLID, 1, vbWhite)
  OldPen = SelectObject(picBowl.hdc, Pen)
  Brush = CreateSolidBrush(vbWhite)
  OldBrush = SelectObject(picBowl.hdc, Brush)
  Call Rectangle(picBowl.hdc, 0, 0, picBowl.ScaleWidth, ScaleDiameter - MidRect)
  'First restore original objects into the device context
  Call SelectObject(picBowl.hdc, OldPen)
  Call SelectObject(picBowl.hdc, OldBrush)
  'Destroy objects to prevent memory leaks
  Call DeleteObject(Pen)
  Call DeleteObject(Brush)
  
  'Draw the bottom rectangle
  'This draws a rectangle that starts above the bottom and ends at the bottom
  'It overwrites a portion of the first rectangle
  Pen = CreatePen(PS_SOLID, 1, vbBlack)
  OldPen = SelectObject(picBowl.hdc, Pen)
  Brush = CreateSolidBrush(vbBlack)
  OldBrush = SelectObject(picBowl.hdc, Brush)
  Call Rectangle(picBowl.hdc, 0, ScaleDiameter - BottomRect, picBowl.ScaleWidth, _
                  ScaleDiameter)
  'First restore original objects into the device context
  Call SelectObject(picBowl.hdc, OldPen)
  Call SelectObject(picBowl.hdc, OldBrush)
  'Destroy objects to prevent memory leaks
  Call DeleteObject(Pen)
  Call DeleteObject(Brush)
  
  'Destroy the region to avoid memory leaks
  Call DeleteObject(hRegion)
  Call RestoreDC(picBowl.hdc, OldDc)

  picBowl.Refresh
  Me.Refresh
  
End Sub

Private Sub FillBowlNoAPI(ht As Single, Sandht As Single)

  'The vb6 circle command draws either a cirle, ellipse, or an arc.
  'The vb6 line command draws a line or a rectangle
  Dim x           As Integer
  Dim y           As Integer
  Dim r           As Integer
  Dim k           As Single
  Dim MaxY        As Integer
  Dim SandY       As Integer
  Dim SandColor   As Long
  Dim WaterColor  As Long
  Dim Clr         As Long
  
  'Setup the object parameters
  picBowl.ScaleMode = PIXEL_MODE
  picBowl.Cls
  picBowl.DrawMode = 13            'blackness
  picBowl.DrawWidth = 1
  
  'Normalizing the circle parameters to the limits of the control
  x = picBowl.ScaleWidth / 2
  y = picBowl.ScaleHeight / 2
  r = (picBowl.ScaleHeight - 5) / 2
  
  'Draw the circle
  picBowl.FillColor = vbWhite
  picBowl.FillStyle = 0
  picBowl.Circle (x, y), r, vbBlack
  
  'This is so the water will not overflow the bowl :)
  If ht > 1# Then ht = 1#
  If Sandht > 1# Then Sandht = 1#
  
  'Normalize the heights to the limits of the control
  MaxY = picBowl.ScaleHeight - (ht * picBowl.ScaleHeight)
  SandY = picBowl.ScaleHeight - (Sandht * picBowl.ScaleHeight)
  
  SandColor = vbBlack
  WaterColor = vbBlue
  
'---------- Fill in using points ---------------------------------------------------------
'  'This is how you would do it by setting each point individually
'  For y = picBowl.ScaleHeight To MaxY Step -1
'    If y > SandY Then
'      Clr = SandColor
'    Else
'      Clr = WaterColor
'    End If
'    For k = 0 To picBowl.ScaleWidth
'      If picBowl.Point(k, y) = vbWhite Then
'        picBowl.PSet (k, y), Clr
'      End If
'    Next
'  Next
  
'---------- Fill in by using line --------------------------------------------------------
  'Start at the left end and search till you get a white point.  This is StartX
  'Keep searching till you get a NOT white point.  This is EndX
  Dim StartX  As Integer
  Dim EndX    As Integer
  For y = picBowl.ScaleHeight To MaxY Step -1
    If y > SandY Then
      Clr = SandColor
    Else
      Clr = WaterColor
    End If

    For k = 0 To picBowl.ScaleWidth
      If picBowl.Point(k, y) = vbWhite Then
        StartX = k
        Exit For
      End If
    Next
    For k = StartX To picBowl.ScaleWidth
      If picBowl.Point(k, y) <> vbWhite Then
        EndX = k
        Exit For
      End If
    Next
    picBowl.Line (StartX, y)-(EndX, y), Clr
  Next

  picBowl.Refresh
  
End Sub

