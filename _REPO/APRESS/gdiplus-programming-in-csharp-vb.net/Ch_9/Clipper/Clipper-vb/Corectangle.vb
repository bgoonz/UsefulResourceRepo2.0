Option Strict On

Imports System

Public Class Corectangle

  ' /// <summary>
  '/// This class takes any starting point and any ending point
  '/// structures and makes a rectangle.  Using this class you can use the mouse
  '/// to draw a rectangle on the screen from any starting point to any ending
  '/// point.  You cannot do this with a regular rectangle.
  '/// </summary>

#Region "Class Local Variables"

  Private mStart As Point
  Private mEnd As Point
  Private mRealStart As Point
  Private mRealEnd As Point
  Private mRealSize As Size
  Private mRect As Rectangle

#End Region

  Public Sub New()
    mStart = Point.Empty
    mEnd = Point.Empty
    mRealStart = Point.Empty
    mRealEnd = Point.Empty
    mRealSize = Size.Empty

    mStart.X = 0
    mStart.Y = 0
    mRealStart.X = 0
    mRealStart.Y = 0

    mRect = Rectangle.Empty
  End Sub

  Public Sub New(ByVal X As Int32, ByVal Y As Int32)
    mStart = Point.Empty
    mEnd = Point.Empty
    mRealStart = Point.Empty
    mRealEnd = Point.Empty
    mRealSize = Size.Empty

    mStart.X = X
    mStart.Y = Y
    mRealStart.X = X
    mRealStart.Y = Y

    mRect = Rectangle.Empty
  End Sub

  Public WriteOnly Property EndX() As Int32
    Set(ByVal Value As Int32)
      mEnd.X = Value
    End Set
  End Property

  Public WriteOnly Property EndY() As Int32
    Set(ByVal Value As Int32)
      mEnd.Y = Value
    End Set
  End Property

  Public ReadOnly Property Rect() As Rectangle
    Get
      MakeReal()
      mRect.Location = mRealStart
      mRect.Size = mRealSize
      Return mRect
    End Get
  End Property

  Private Sub MakeReal()
    'Started top left, ended bottom right
    If mEnd.X > mStart.X And mEnd.Y > mStart.Y Then
      mRealStart = mStart
      mRealEnd = mEnd
      mRealSize = New Size(mRealEnd.X - mRealStart.X, mRealEnd.Y - mRealStart.Y)
      Return
    End If

    'Started bottom right, ended top left
    If mEnd.X < mStart.X And mEnd.Y < mStart.Y Then
      mRealEnd = mStart
      mRealStart = mEnd
      mRealSize = New Size(mRealEnd.X - mRealStart.X, mRealEnd.Y - mRealStart.Y)
      Return
    End If

    'Started top right left, ended bottom left
    If mEnd.X < mStart.X And mEnd.Y > mStart.Y Then
      mRealStart.X = mEnd.X
      mRealStart.Y = mStart.Y
      mRealEnd.X = mStart.X
      mRealEnd.Y = mEnd.Y
      mRealSize = New Size(mRealEnd.X - mRealStart.X, mRealEnd.Y - mRealStart.Y)
      Return
    End If

    'Started bottom left, ended top right
    If mEnd.X > mStart.X And mEnd.Y < mStart.Y Then
      mRealStart.X = mStart.X
      mRealStart.Y = mEnd.Y
      mRealEnd.X = mEnd.X
      mRealEnd.Y = mStart.Y
      mRealSize = New Size(mRealEnd.X - mRealStart.X, mRealEnd.Y - mRealStart.Y)
      Return
    End If

  End Sub
End Class
