Imports System.Windows.Forms
Module State

    Sub Main()
        Dim objTravelManager As New TravelManager()

        With objTravelManager
            Console.WriteLine("Requesting a trip to Alberta....")
            .GoToAlberta()
            Console.WriteLine("Now requesting a trip to Hawaii....")
            .GoToHawaii()
            Console.WriteLine("Now requesting a trip to Washington....")
            .GoToWashington()
            Console.WriteLine("Now let's try requesting the Washington trip again....")
            .GoToWashington()
        End With

        MessageBox.Show("Click OK to end")
    End Sub

    Class TravelManager
        Private m_State As State

        Public Sub New()
            Console.WriteLine("Travel Manager starting...")
            m_State = Washington.Instance
        End Sub

        Public Sub ChangeState(ByVal s As State)
            m_State = s
        End Sub

        Public Sub GoToAlberta()
            m_State.GoToAlberta(Me)
        End Sub

        Public Sub GoToWashington()
            m_State.GoToWashington(Me)
        End Sub

        Public Sub GoToHawaii()
            m_State.GoToHawaii(Me)
        End Sub
    End Class

    MustInherit Class State
        Protected Sub New()
        End Sub

        MustOverride Sub GoToAlberta(ByRef tm As TravelManager)
        MustOverride Sub GoToWashington(ByRef tm As TravelManager)
        MustOverride Sub GoToHawaii(ByRef tm As TravelManager)

        Protected Sub ChangeState(ByRef tm As TravelManager, ByRef s As State)
            tm.ChangeState(s)
        End Sub
    End Class

    Public Class Alberta : Inherits State
        Private Shared m_State = New Alberta()

        Private Sub New()
        End Sub

        Public Shared Function Instance() As State
            Console.WriteLine("Welcome to Alberta!")
            Return m_State
        End Function

        Public Overrides Sub GoToAlberta(ByRef tm As TravelManager)
            Console.WriteLine("You are already in Alberta.")
        End Sub

        Public Overrides Sub GoToWashington(ByRef tm As TravelManager)
            Console.WriteLine("Enjoy the drive to America.")
            ChangeState(tm, Washington.Instance)
        End Sub

        Public Overrides Sub GoToHawaii(ByRef tm As TravelManager)
            Console.WriteLine("Enjoy your flight to Hawaii.")
            ChangeState(tm, Hawaii.Instance)
        End Sub
    End Class

    Public Class Hawaii : Inherits State
        Private Shared m_State = New Hawaii()

        Private Sub New()
        End Sub

        Public Shared Function Instance() As State
            Console.WriteLine("Welcome to Hawaii!")
            Return m_State
        End Function

        Public Overrides Sub GoToAlberta(ByRef tm As TravelManager)
            Console.WriteLine("Enjoy your flight to Canada.")
            ChangeState(tm, Alberta.Instance)
        End Sub

        Public Overrides Sub GoToWashington(ByRef tm As TravelManager)
            Console.WriteLine("Enjoy your flight to Washington.")
            ChangeState(tm, Washington.Instance)
        End Sub

        Public Overrides Sub GoToHawaii(ByRef tm As TravelManager)
            Console.WriteLine("You are already in Hawaii.")
        End Sub
    End Class

    Public Class Washington : Inherits State
        Private Shared m_State = New Washington()

        Private Sub New()
        End Sub

        Public Shared Function Instance() As State
            Console.WriteLine("Welcome to Washington!")
            Return m_State
        End Function

        Public Overrides Sub GoToAlberta(ByRef tm As TravelManager)
            Console.WriteLine("Enjoy the drive to Canada.")
            ChangeState(tm, Alberta.Instance)
        End Sub

        Public Overrides Sub GoToWashington(ByRef tm As TravelManager)
            Console.WriteLine("You are already in Washington.")
        End Sub

        Public Overrides Sub GoToHawaii(ByRef tm As TravelManager)
            Console.WriteLine("Enjoy your flight to Hawaii.")
            ChangeState(tm, Hawaii.Instance)
        End Sub
    End Class


End Module
