Option Strict On

Imports MVC

Module Startup

    Public Sub Main()
        Dim ordersView As New OrdersView()
        With ordersView
            .initViewWin()
            .ShowDialog()
        End With
    End Sub

End Module
