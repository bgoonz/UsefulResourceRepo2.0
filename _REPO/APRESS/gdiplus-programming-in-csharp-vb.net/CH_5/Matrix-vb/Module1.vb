Option Strict On

Imports System.Drawing
Imports System.Drawing.Drawing2D

Module Module1

  Sub Main()
    Dim m As Matrix = New Matrix()
    m.Rotate(90, MatrixOrder.Append)
    m.Translate(7, 12, MatrixOrder.Append)
    Dim p() As Point = {New Point(20, 45)}
    Console.WriteLine(p.GetValue(0).ToString())
    m.TransformPoints(p)
    Console.WriteLine(p.GetValue(0).ToString())

    Console.ReadLine()

  End Sub

End Module
