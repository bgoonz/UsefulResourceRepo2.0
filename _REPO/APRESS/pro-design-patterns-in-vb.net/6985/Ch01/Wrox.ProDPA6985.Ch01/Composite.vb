Imports System.Windows.Forms
Module Composite

    Sub Main()
        ' create some arbitrary heirarchy of containers
        Dim objRoot As New Container("Root")
        Dim objChild1 As New Container("Child1")
        Dim objGrandChild1 As New Container("Grandchild1")
        Dim objChild2 As New Leaf("Child2")

        objRoot.Add(objChild1)
        objRoot.Add(objChild2)
        objRoot.Add(New Container("Child3"))

        objChild1.Add(objGrandChild1)
        objGrandChild1.Add(New Leaf("GreatGrandchild1"))
        objGrandChild1.Add(New Leaf("GreatGrandchild2"))

        ' output the contents of the root (including all subcontainers)
        objRoot.PrintSelfAndContents()

        MessageBox.Show("Click OK to end")
    End Sub

    Public Interface Node
        Function GetName() As String
        Sub PrintSelfAndContents()
    End Interface

    Public Class Container : Implements Node
        Private m_Name As String
        Private m_Nodes As New ArrayList()

        Sub New(ByVal Name As String)
            m_Name = "Container_" & Name
        End Sub

        Sub Add(ByRef Item As Node)
            m_Nodes.Add(Item)
        End Sub

        Function GetName() As String Implements Node.GetName
            Return m_Name
        End Function

        Sub PrintSelfAndContents() Implements Node.PrintSelfAndContents
            Console.WriteLine(m_Name)
            Dim tmpNode As Node
            For Each tmpNode In m_Nodes
                tmpNode.PrintSelfAndContents()
            Next
        End Sub
    End Class

    Public Class Leaf : Implements Node
        Private m_Name As String

        Sub New(ByVal Name As String)
            m_Name = "Leaf_" & Name
        End Sub

        Function GetName() As String Implements Node.GetName
            Return m_Name
        End Function

        Sub PrintSelfAndContents() Implements Node.PrintSelfAndContents
            Console.WriteLine(m_Name)
        End Sub
    End Class


End Module
