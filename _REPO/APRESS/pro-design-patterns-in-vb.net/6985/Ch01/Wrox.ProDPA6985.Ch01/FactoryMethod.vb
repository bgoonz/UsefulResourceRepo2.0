Imports System.Windows.Forms
Module FactoryMethod

    Sub Main()
        Dim objSnowWhiteDwarfFactory As New DwarfFactory()
        objSnowWhiteDwarfFactory.AddDwarfs()
        objSnowWhiteDwarfFactory.ShowDwarfs()

        Dim objSnowWhiteIIDwarfFactory As New SnowWhiteIIDwarfFactory()
        objSnowWhiteIIDwarfFactory.AddDwarfs()
        objSnowWhiteIIDwarfFactory.ShowDwarfs()

        MessageBox.Show("Click OK to end")
    End Sub


    Public Class Dwarf
        Private m_Name As String

        Public Sub New(ByVal Name As String)
            m_Name = Name & " the " & TypeName(Me).ToString
        End Sub

        Public ReadOnly Property Name() As String
            Get
                Return m_Name
            End Get
        End Property
    End Class

    Public Class DwarfFactory
        Protected m_Dwarfs As New ArrayList()

        Public Overridable Sub AddDwarfs()
            m_Dwarfs.Add(New Dwarf("Bashful"))
            m_Dwarfs.Add(New Dwarf("Doc"))
            m_Dwarfs.Add(New Dwarf("Dopey"))
            m_Dwarfs.Add(New Dwarf("Grumpy"))
            m_Dwarfs.Add(New Dwarf("Happy"))
            m_Dwarfs.Add(New Dwarf("Sleepy"))
            m_Dwarfs.Add(New Dwarf("Sneezy"))
        End Sub

        Public Sub ShowDwarfs()
            Dim aDwarf As Dwarf
            Console.WriteLine("Created by " & TypeName(Me).ToString & ":")
            For Each aDwarf In m_Dwarfs
                Console.WriteLine(aDwarf.Name)
            Next
        End Sub
    End Class

    Public Class SnowWhiteIIDwarfFactory : Inherits DwarfFactory
        Public Overrides Sub AddDwarfs()
            m_Dwarfs.Add(New Dwarf("Dopey"))
            m_Dwarfs.Add(New Dwarf("Cousin Morag"))
            m_Dwarfs.Add(New Dwarf("Cousin Murdo"))
        End Sub
    End Class




End Module
