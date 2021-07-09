Option Strict On

Imports System
Imports System.Drawing
Imports System.Drawing.Text

Public NotInheritable Class Fonts

  Private Shared PFC As PrivateFontCollection
  Private Shared Arial_FF As FontFamily
  Private Shared Comic_FF As FontFamily
  Private Shared Chain_FF As FontFamily

  Shared Sub New()
    PFC = New PrivateFontCollection()
    PFC.AddFontFile("C:\\WINNT\\Fonts\\Arial.ttf")
    Arial_FF = PFC.Families(0)
    PFC.AddFontFile("chainletters.ttf")
    Chain_FF = PFC.Families(1)
    PFC.AddFontFile("C:\\WINNT\\Fonts\\comic.ttf")
    Comic_FF = PFC.Families(2)
  End Sub


  Shared ReadOnly Property Families() As FontFamily()
    Get
      Return PFC.Families
    End Get
  End Property

#Region "Arial Font"
  Shared ReadOnly Property Arial_20() As Font
    Get
      Return New Font(Arial_FF, 20, FontStyle.Regular, GraphicsUnit.Point)
    End Get
  End Property

  Shared ReadOnly Property ArialItalic_20() As Font
    Get
      Return New Font(Arial_FF, 20, FontStyle.Italic, GraphicsUnit.Point)
    End Get
  End Property
#End Region

#Region "Chain letter font"
  Shared ReadOnly Property Chain_20() As Font
    Get
      Return New Font(Chain_FF, 20, FontStyle.Regular, GraphicsUnit.Point)
    End Get
  End Property

  Shared ReadOnly Property ChainItalic_20() As Font
    Get
      Return New Font(Chain_FF, 20, FontStyle.Italic, GraphicsUnit.Point)
    End Get
  End Property
#End Region

#Region "Comic Font"
  Shared ReadOnly Property Comic_20() As Font
    Get
      Return New Font(Comic_FF, 20, FontStyle.Regular, GraphicsUnit.Point)
    End Get
  End Property

  Shared ReadOnly Property ComicItalic_20() As Font
    Get
      Return New Font(Comic_FF, 20, FontStyle.Italic, GraphicsUnit.Point)
    End Get
  End Property
#End Region




End Class
