Imports System.Windows.Forms
Module Proxy
    Sub Main()
        Dim power As New PowerProxy()
        Dim voltage As Integer

        Console.WriteLine("Let's request a power supply of 450 volts...")
        voltage = power.getVoltage(450)
        Console.WriteLine("The voltage supplied is {0} volts.", voltage)
        Console.WriteLine("")

        Console.WriteLine("Now let's request a power supply of 2000 volts...")
        voltage = power.getVoltage(2000)
        Console.WriteLine("The voltage supplied is {0} volts.", voltage)

        MessageBox.Show("Click OK to end")
    End Sub


    Interface Power
        Function getVoltage(ByVal volts As Integer) As Integer
    End Interface

    Class PowerSource : Implements Power
        Function getVoltage(ByVal volts As Integer) As Integer Implements Power.getVoltage
            getVoltage = volts
        End Function
    End Class

    Class PowerProxy : Implements Power
        Private powerSrc As PowerSource

        Public Sub New()
            powerSrc = New PowerSource()
        End Sub

        Function getVoltage(ByVal volts As Integer) As Integer Implements Power.getVoltage
            If volts <= 1400 Then
                getVoltage = powerSrc.getVoltage(volts)
            Else
                getVoltage = 1400
            End If
        End Function
    End Class

End Module

