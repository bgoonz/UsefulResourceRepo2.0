Option Strict On

Imports System.Drawing.Drawing2D

Public Class Form1
  Inherits System.Windows.Forms.Form

#Region " Windows Form Designer generated code "

  Public Sub New()
    MyBase.New()

    'This call is required by the Windows Form Designer.
    InitializeComponent()

    'Add any initialization after the InitializeComponent() call

  End Sub

  'Form overrides dispose to clean up the component list.
  Protected Overloads Overrides Sub Dispose(ByVal disposing As Boolean)
    If disposing Then
      If Not (components Is Nothing) Then
        components.Dispose()
      End If
    End If
    MyBase.Dispose(disposing)
  End Sub

  'Required by the Windows Form Designer
  Private components As System.ComponentModel.IContainer

  'NOTE: The following procedure is required by the Windows Form Designer
  'It can be modified using the Windows Form Designer.  
  'Do not modify it using the code editor.
  <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
    '
    'Form1
    '
    Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
    Me.ClientSize = New System.Drawing.Size(504, 629)
    Me.Name = "Form1"
    Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen
    Me.Text = "Form1"

  End Sub

#End Region

  Private Sub Form1_Load(ByVal sender As System.Object, ByVal e As System.EventArgs) Handles MyBase.Load

  End Sub

  Protected Overrides Sub OnPaint(ByVal e As PaintEventArgs)
    Dim R1 As New Rectangle(10, 10, 40, 40)

    e.Graphics.SmoothingMode = SmoothingMode.HighQuality

    e.Graphics.DrawRectangle(Pens.Black, R1)
    e.Graphics.TranslateTransform(50.0F, 0.0F)
    e.Graphics.FillRectangle(Brushes.Black, R1)

    'Draw three rectangles
    Dim ThreeRects() As Rectangle = {New Rectangle(110, 10, 40, 40), _
                              New Rectangle(160, 10, 40, 40), _
                              New Rectangle(210, 10, 40, 40)}
    e.Graphics.ResetTransform()
    e.Graphics.DrawRectangles(Pens.Red, ThreeRects)

    'Draw three filled rectangles
    e.Graphics.ResetTransform()
    e.Graphics.TranslateTransform(100.0F, 0.0F)
    e.Graphics.FillRectangles(Brushes.Red, ThreeRects)


    'Use first rect to bound ellipse as circle
    e.Graphics.ResetTransform()
    e.Graphics.TranslateTransform(0.0F, 50.0F)
    e.Graphics.DrawEllipse(Pens.Green, R1)

    'Draw a filled ellipse
    e.Graphics.TranslateTransform(50.0F, 0.0F)
    e.Graphics.FillEllipse(Brushes.Green, R1)

    'Use first rect to bound pie 
    e.Graphics.ResetTransform()
    e.Graphics.TranslateTransform(100.0F, 50.0F)
    e.Graphics.DrawPie(Pens.DarkViolet, R1, 0, 60)

    'Use first rect to fill pie 
    e.Graphics.ResetTransform()
    e.Graphics.TranslateTransform(150.0F, 50.0F)
    e.Graphics.FillPie(Brushes.DarkViolet, R1, 0, 60)

    'Use first rect to bound arc 
    e.Graphics.ResetTransform()
    e.Graphics.TranslateTransform(200.0F, 50.0F)
    e.Graphics.DrawArc(Pens.DarkBlue, R1, 40, 160)


    PointDraw(e.Graphics)
    PathDraw(e.Graphics)
  End Sub

  Private Sub PointDraw(ByVal G As Graphics)
    'Start with clean slate
    G.ResetClip()
    G.ResetTransform()

    'Separate sections
    G.DrawLine(Pens.Black, 10, 110, Me.Width - 10, 110)

    '------------ Draw Line -----------------------
    'Generate start and end points
    Dim StartPt As Point = New Point(10, 130)
    Dim EndPt As Point = New Point(200, 130)
    Dim P As Pen = New Pen(Brushes.CadetBlue, 5)
    G.DrawLine(P, StartPt, EndPt)

    '------------- Draw lines ----------------------
    'Translate in the Y Direction
    Dim Xlate_Y As Size = New Size(0, 40)
    'Translate in the X Direction
    Dim Xlate_X As Size = New Size(200, 0)
    Dim Pt As Point = StartPt
    'Generate set of points based on offsets of original point
    Dim ManyPoints As Point() = {Point.op_Addition(Pt, Xlate_X), _
                                Point.op_Addition(Pt, _
                                Size.op_Addition(Xlate_X, Xlate_Y)), _
                                Point.op_Addition(Pt, Xlate_X)}

    P.Color = Color.Firebrick
    G.DrawLines(P, ManyPoints)

    '------------ DrawBezier and Polygon -------------------
    StartPt.X = 10
    StartPt.Y = 250
    Dim CtlPtA As Point = New Point(50, 150)
    Dim CtlPtB As Point = New Point(350, 300)
    EndPt.X = 400
    EndPt.Y = 250
    Dim PolyPoints As Point() = {StartPt, CtlPtA, EndPt, CtlPtB}
    'Draw the controlling shape of the Bezier spline
    G.DrawPolygon(Pens.DarkSeaGreen, PolyPoints)

    'Draw the actual Spline
    P.Color = Color.DarkSeaGreen
    P.Width = 3
    G.DrawBezier(P, StartPt, CtlPtA, CtlPtB, EndPt)

    '---------- Draw two Bezier splines ---------------------
    Dim Y As Size = New Size(0, 40)
    Dim X As Size = New Size(20, 0)
    'Y Translated start of first spline
    'Same control points for first spline,
    'X,Y Translated end of first spline, 
    'X Translate control points for second spline,
    'X,Y New end point for second spline
    Dim TwoSplines As Point() = {Point.op_Addition(StartPt, Y), _
                           CtlPtA, _
                           CtlPtB, _
                           Point.op_Addition(EndPt, _
                           Size.op_Subtraction(Y, New Size(200, 0))), _
                           Point.op_Addition(CtlPtA, X), _
                           Point.op_Addition(CtlPtB, X), _
                           Point.op_Addition(EndPt, Size.op_Addition(Y, X))}

    P.Color = Color.Gold
    G.DrawBeziers(P, TwoSplines)

    '---------- Draw a closed curve -----------
    PolyPoints(0) = New Point(100, 350)
    PolyPoints(1) = New Point(250, 300)
    PolyPoints(2) = New Point(250, 400)
    PolyPoints(3) = New Point(150, 400)
    P.Color = Color.Olive
    'Curve traces outside of polygon
    'Curve is closed cardinal spline & hits all points
    G.DrawPolygon(P, PolyPoints)
    G.DrawClosedCurve(P, PolyPoints)
    'Uncomment next line to fill the egg shape
    'G.FillClosedCurve(Brushes.AliceBlue, PolyPoints)

    '---------- Draw an open cardinal curve -----------
    Dim CardPoints As Point() = {New Point(310, 350), _
                           New Point(330, 360), _
                           New Point(360, 320), _
                           New Point(390, 370), _
                           New Point(400, 350), _
                           New Point(480, 340)}
    P.Color = Color.DarkOrange
    G.DrawCurve(P, CardPoints)

    P.Dispose()
  End Sub

  Private Sub PathDraw(ByVal G As Graphics)
    'Start with clean slate
    G.ResetClip()
    G.ResetTransform()

    'Separate sections
    G.DrawLine(Pens.Black, 10, 420, Me.Width - 10, 420)

    'Make a blank path and add shapes to it
    Dim gp As GraphicsPath = New GraphicsPath()
    Dim P As Pen = New Pen(Brushes.ForestGreen, 3)
    gp.AddRectangle(New Rectangle(10, 450, 100, 100))
    gp.AddEllipse(120, 450, 100, 100)
    gp.AddPie(70, 500, 100, 100, 25, 120)
    'Draw the outline of the path and fill it in
    G.DrawPath(P, gp)
    G.FillPath(Brushes.Bisque, gp)

    P.Dispose()
  End Sub

End Class
