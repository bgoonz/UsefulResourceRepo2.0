Attribute VB_Name = "General"
Option Explicit


Public Const PS_SOLID = 0
Public Const PIXEL_MODE = 3


'============================== Windows API functions ==========================================
Declare Function CreatePen Lib "gdi32" (ByVal nPenStyle As Long, _
                                        ByVal nWidth As Long, _
                                        ByVal crColor As Long) As Long
                                        
Declare Function CreateEllipticRgn Lib "gdi32" (ByVal X1 As Long, _
                                                ByVal Y1 As Long, _
                                                ByVal X2 As Long, _
                                                ByVal Y2 As Long) As Long
                                                
Declare Function CreateSolidBrush Lib "gdi32" (ByVal crColor As Long) As Long

Declare Function DeleteObject Lib "gdi32" (ByVal hObject As Long) As Long

Declare Function Ellipse Lib "gdi32" (ByVal hdc As Long, _
                                      ByVal X1 As Long, _
                                      ByVal Y1 As Long, _
                                      ByVal X2 As Long, _
                                      ByVal Y2 As Long) As Long
                                      
Declare Function Rectangle Lib "gdi32" (ByVal hdc As Long, _
                                        ByVal X1 As Long, _
                                        ByVal Y1 As Long, _
                                        ByVal X2 As Long, _
                                        ByVal Y2 As Long) As Long
                                        
Declare Function RestoreDC Lib "gdi32" (ByVal hdc As Long, _
                                        ByVal nSavedDC As Long) As Long
                                        
Declare Function SaveDC Lib "gdi32" (ByVal hdc As Long) As Long

Declare Function SelectClipRgn Lib "gdi32" (ByVal hdc As Long, _
                                            ByVal hRgn As Long) As Long
                                            
Declare Function SelectObject Lib "gdi32" (ByVal hdc As Long, _
                                           ByVal hObject As Long) As Long

Declare Sub Sleep Lib "Kernel32" (ByVal dwMilliseconds As Long)
'=================================================================================================

