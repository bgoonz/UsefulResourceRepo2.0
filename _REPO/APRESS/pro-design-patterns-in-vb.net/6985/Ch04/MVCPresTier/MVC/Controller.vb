Option Strict On

Public MustInherit Class Controller
    Protected _view As IView
    Protected _viewArgs() As Object
    Protected _models() As Object

    Public Sub init(ByRef view As IView, ByRef viewArgs() As Object, ByRef models() As Object)
        'set reference to View
        _view = view
        'set reference Model(s)
        _models = models
        'set reference to view arguments
        _viewArgs = viewArgs
        'allow subclasses to set strongly typed reference to View
        setTypedViewReference()
        'allow subclasses to set strongly typed Model references
        setTypedModelReferences()
        'allow subclasses to set View event handling references
        setViewWithEventsReferences()
        'allow subclasses to set View data binding
        setViewDataBindings()
    End Sub

    Protected MustOverride Sub setTypedViewReference()
    Protected MustOverride Sub setTypedModelReferences()
    Protected MustOverride Sub setViewWithEventsReferences()
    Protected MustOverride Sub setViewDataBindings()
End Class


Public MustInherit Class ControllerFactory
    Protected _view As IView
    Protected _viewArgs() As Object
    Protected _models() As Object

    Public Function createController(ByRef view As IView, ByRef viewArgs() As Object) As Controller
        _view = view
        _viewArgs = viewArgs
        _models = getModels()
        Dim controller As Controller = getController()
        controller.init(view, viewArgs, _models)
        Return controller
    End Function

    Protected MustOverride Function getModels() As Object()
    Protected MustOverride Function getController() As Controller
End Class
