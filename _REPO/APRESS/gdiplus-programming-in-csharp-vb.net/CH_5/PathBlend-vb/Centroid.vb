Option Strict On

Imports System
Imports System.Drawing
Imports System.Drawing.Drawing2D

Public Class Centroid

  Const w As Int32 = 20
  Const h As Int32 = 20

  Private m_StartX As Int32     ' Top left X
  Private m_StartY As Int32     ' Top left Y
  Private r As Rectangle        ' Rectangle that holds the circle

#Region "Constructor/Destructor"
  Public Sub New()
    m_StartX = 10
    m_StartY = 10
    r.X = 10
    r.Y = 10
    r.Width = w
    r.Height = h
  End Sub

  Public Sub New(ByVal X As Int32, ByVal Y As Int32)
    m_StartX = X
    m_StartY = Y
    r.X = X
    r.Y = Y
    r.Width = w
    r.Height = h
  End Sub
#End Region

#Region "Properties"
  Public Property X() As Int32
    Get
      Return m_StartX
    End Get
    Set(ByVal Value As Int32)
      m_StartX = Value
    End Set
  End Property

  Public Property Y() As Int32
    Get
      Return m_StartY
    End Get
    Set(ByVal Value As Int32)
      m_StartY = Value
    End Set
  End Property

  Public ReadOnly Property Center() As PointF
    Get
      Return (New PointF((r.Left + CInt(r.Width / 2)), _
                          r.Top + CInt(r.Height / 2)))
    End Get
  End Property

  Public ReadOnly Property Rect() As Rectangle
    Get
      Return r
    End Get
  End Property
#End Region

#Region "Methods"
  Public Sub Draw(ByVal G As Graphics)
    G.FillEllipse(Brushes.Aqua, r)
  End Sub

  Public Function Relocate(ByVal e As System.Windows.Forms.MouseEventArgs) _
                          As Boolean
    If e.Button = System.Windows.Forms.MouseButtons.Left Then
      If ((e.X > r.Left) And (e.X < r.Right) And _
          (e.Y > r.Top) And (e.Y < r.Bottom)) Then
        'Must make the center of the rectangle = x,y
        'If you don't you will loose track of the ball
        r.X = e.X - CInt(r.Width / 2)
        m_StartX = r.X
        r.Y = e.Y - CInt(r.Height / 2)
        m_StartY = r.Y
        Return (True)
      End If
    End If
    Return (False)
  End Function
#End Region

End Class
