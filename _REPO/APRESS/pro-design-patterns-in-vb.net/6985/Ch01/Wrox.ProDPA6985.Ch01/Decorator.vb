Imports System.Windows.Forms
Module Decorator

    Sub Main()
        Dim objEmployee As New Employee()
        Dim objCountryTax As CountryTax
        Dim objRetirementPlan As RetirementPlan

        ' set employee's gross wage
        objEmployee.GrossWage = 1000D
        Console.WriteLine("Employee's gross wage: $" & objEmployee.GrossWage)

        ' pass objEmployee object to objCountryTax, and deduct tax
        objCountryTax = New CountryTax(objEmployee, "USA")
        objCountryTax.DeductTax()
        Console.WriteLine("Wage after Country Tax: $" & objEmployee.GetTakeHomePay)

        ' pass objEmployee object to objRetirementPlan, and deduct retirement plan contribution
        objRetirementPlan = New RetirementPlan(objCountryTax, "Defined Benefit")
        objRetirementPlan.ChargeContribution()
        Console.WriteLine("Wage after Retirement Plan Contribution: $" & objEmployee.GetTakeHomePay)

        ' pass objEmployee object to objRetirementPlan, and deduct retirement plan contribution
        Dim objCityTax As New CityTax(objEmployee, "NYC")
        objCityTax.DeductTax()
        Console.WriteLine("Wage after City Tax: $" & objEmployee.GetTakeHomePay)

        MessageBox.Show("Click OK to end")
    End Sub

    Public Interface TakeHomePay
        Property GrossWage()
        Sub AdjustGross(ByVal Adjustment As Double)
        Function GetTakeHomePay() As Double
    End Interface

    Public Class Employee : Implements TakeHomePay
        Private m_GrossWage As Double
        Private m_NetWage As Double

        Public Property GrossWage() Implements TakeHomePay.GrossWage
            Get
                Return m_GrossWage
            End Get
            Set(ByVal Value)
                m_GrossWage = Value
                m_NetWage = Value
            End Set
        End Property

        Public Sub AdjustGross(ByVal Adjustment As Double) Implements TakeHomePay.AdjustGross
            m_NetWage -= Adjustment
        End Sub

        Public Function GetTakeHomePay() As Double Implements TakeHomePay.GetTakeHomePay
            Return m_NetWage
        End Function
    End Class

    Public MustInherit Class WageAdjustment : Implements TakeHomePay
        Protected m_TakeHomePay As TakeHomePay

        Public Sub New(ByRef thp As TakeHomePay)
            m_TakeHomePay = thp
        End Sub

        Public Property GrossWage() Implements TakeHomePay.GrossWage
            Get
                Return m_TakeHomePay.GrossWage
            End Get
            Set(ByVal Value)
                m_TakeHomePay.GrossWage = Value
            End Set
        End Property

        Public Sub AdjustGross(ByVal Adjustment As Double) Implements TakeHomePay.AdjustGross
            m_TakeHomePay.AdjustGross(Adjustment)
        End Sub

        Public Overridable Function GetTakeHomePay() As Double Implements TakeHomePay.GetTakeHomePay
            Return m_TakeHomePay.GetTakeHomePay
        End Function
    End Class

    Public Class RetirementPlan : Inherits WageAdjustment
        Private m_PlanName As String

        Public Sub New(ByRef thp As TakeHomePay, ByVal PlanName As String)
            MyBase.New(thp)
            m_PlanName = PlanName
        End Sub

        Public Sub ChargeContribution()
            If m_PlanName.StartsWith("D") Then
                m_TakeHomePay.AdjustGross(0.02 * m_TakeHomePay.GrossWage)
            Else
                m_TakeHomePay.AdjustGross(0.1 * m_TakeHomePay.GrossWage)
            End If
        End Sub
    End Class

    Public Class CountryTax : Inherits WageAdjustment
        Private m_CountryName As String

        Public Sub New(ByRef thp As TakeHomePay, ByVal CountryName As String)
            MyBase.New(thp)
            m_CountryName = CountryName
        End Sub

        Public Sub DeductTax()
            If m_CountryName = "USA" Then
                m_TakeHomePay.AdjustGross(0.4 * m_TakeHomePay.GetTakeHomePay)
            ElseIf m_CountryName = "UK" Then
                m_TakeHomePay.AdjustGross(0.3 * m_TakeHomePay.GrossWage)
            End If
        End Sub
    End Class

    Public Class CityTax : Inherits WageAdjustment
        Private m_CityName As String

        Public Sub New(ByRef thp As TakeHomePay, ByVal CityName As String)
            MyBase.New(thp)
            m_CityName = CityName
        End Sub

        Public Sub DeductTax()
            If m_CityName = "NYC" Then
                m_TakeHomePay.AdjustGross(0.05 * m_TakeHomePay.GrossWage)
            End If
        End Sub
    End Class

End Module
