Option Strict On

Imports System
Imports System.IO
Imports System.Drawing
Imports System.Drawing.Drawing2D

Public Class Form1
  Inherits System.Windows.Forms.Form

#Region "Class Local Storage"

  Private Const CLOSED_ICON As Int32 = 0
  Private Const OPEN_ICON As Int32 = 1
  Private Const DRAW_ICON As Int32 = 2
  Private Const DRAG_ICON As Int32 = 3

  Private mImageList As ImageList
  Private mOriginalPath As GraphicsPath
  Private mSmoothPath As GraphicsPath
  Private m_StartPoint As Point
  Private m_LastPoint As Point
  Private mInvalidRect As Rectangle
  Private mDrawCursor As Cursor
  Private mDragCursor As Cursor
  Private mDrawIcon As Icon
  Private mRecallFileName As String

  Private mAllowDrawing As Boolean
  Private m_Drawing As Boolean
  Private mDraging As Boolean

#End Region

#Region " Windows Form Designer generated code "

  Public Sub New()
    MyBase.New()

    'This call is required by the Windows Form Designer.
    InitializeComponent()

    'Initialize class variables
    mDrawIcon = New Icon("draw.ico")
    mDrawCursor = New Cursor("Pen.cur")
    mDragCursor = New Cursor("drag.cur")
    mImageList = New ImageList()
    mOriginalPath = New GraphicsPath()
    mSmoothPath = New GraphicsPath()
    m_Drawing = False
    mInvalidRect = Rectangle.Empty

    'Set the screen
    Me.Icon = mDrawIcon
    Me.Size = New Size(800, 600)
    Me.SetStyle(ControlStyles.AllPaintingInWmPaint, True)
    Me.SetStyle(ControlStyles.DoubleBuffer, True)

    'Set up the image list
    mImageList.Images.Add(New Icon("closed.ico"))
    mImageList.Images.Add(New Icon("open.ico"))
    mImageList.Images.Add(mDrawIcon)
    mImageList.Images.Add(New Icon("drag.ico"))

    'Set RichTextBox properties
    DebugWindow.ReadOnly = True
    DebugWindow.Height = CInt(Me.Height / 8)
    DebugWindow.Text = ""

    'Set up the splitters
    PanelSplitter.Height = 3
    PanelSplitter.BackColor = Color.Blue
    TreeSplitter.BackColor = Color.Blue
    TreeSplitter.Location = New Point(PathTree.Width, 0)
    TreeSplitter.Size = New Size(3, Me.Height)

    ' Set properties of TreeView control.
    PathTree.Width = CInt(Me.ClientSize.Width / 6)
    PathTree.TabIndex = 0
    PathTree.ImageList = mImageList
    AddHandler PathTree.MouseDown, New MouseEventHandler( _
                                    AddressOf Me.TreeMouseDown)
    AddHandler PathTree.MouseMove, New MouseEventHandler( _
                                    AddressOf Me.TreeMouseMove)
    AddHandler PathTree.AfterCollapse, New TreeViewEventHandler( _
                                    AddressOf Me.TreeExpandCollapse)
    AddHandler PathTree.AfterExpand, New TreeViewEventHandler( _
                                    AddressOf Me.TreeExpandCollapse)

    'Set Drawing Panel Properties
    P1.BackColor = Color.Bisque
    P1.AllowDrop = True
    AddHandler P1.DragEnter, New DragEventHandler(AddressOf Me.PanelDragEnter)
    AddHandler P1.DragDrop, New DragEventHandler(AddressOf Me.PanelDragDrop)
    AddHandler P1.Paint, New PaintEventHandler(AddressOf Me.PanelPaint)
    AddHandler P1.MouseDown, New MouseEventHandler(AddressOf Me.M_Down)
    AddHandler P1.MouseUp, New MouseEventHandler(AddressOf Me.M_Up)
    AddHandler P1.MouseMove, New MouseEventHandler(AddressOf Me.M_Move)

    'Set all the border styles to none.
    BasePanel.BorderStyle = BorderStyle.None
    P1.BorderStyle = BorderStyle.None
    PathTree.BorderStyle = BorderStyle.None
    DebugWindow.BorderStyle = BorderStyle.None

    'Disable some menu selections
    mnuSpawnForm.Enabled = False
    mnuSpawnSmooth.Enabled = False

  End Sub

  'Form overrides dispose to clean up the component list.
  Protected Overloads Overrides Sub Dispose(ByVal disposing As Boolean)
    If disposing Then
      If Not (components Is Nothing) Then
        components.Dispose()
      End If
    End If
    mOriginalPath.Dispose()
    mSmoothPath.Dispose()
    MyBase.Dispose(disposing)
  End Sub

  'Required by the Windows Form Designer
  Private components As System.ComponentModel.IContainer

  'NOTE: The following procedure is required by the Windows Form Designer
  'It can be modified using the Windows Form Designer.  
  'Do not modify it using the code editor.
  Friend WithEvents DebugWindow As System.Windows.Forms.RichTextBox
  Friend WithEvents PanelSplitter As System.Windows.Forms.Splitter
  Friend WithEvents BasePanel As System.Windows.Forms.Panel
  Friend WithEvents PathTree As System.Windows.Forms.TreeView
  Friend WithEvents TreeSplitter As System.Windows.Forms.Splitter
  Friend WithEvents P1 As System.Windows.Forms.Panel
  Friend WithEvents mainMenu1 As System.Windows.Forms.MainMenu
  Friend WithEvents menuItem1 As System.Windows.Forms.MenuItem
  Friend WithEvents mnuExit As System.Windows.Forms.MenuItem
  Friend WithEvents menuItem3 As System.Windows.Forms.MenuItem
  Friend WithEvents mnuCreate As System.Windows.Forms.MenuItem
  Friend WithEvents mnuSmooth As System.Windows.Forms.MenuItem
  Friend WithEvents menuItem2 As System.Windows.Forms.MenuItem
  Friend WithEvents mnuSaveShape As System.Windows.Forms.MenuItem
  Friend WithEvents menuItem7 As System.Windows.Forms.MenuItem
  Friend WithEvents None As System.Windows.Forms.MenuItem
  Friend WithEvents mnuSpawnForm As System.Windows.Forms.MenuItem
  Friend WithEvents mnuSpawnSmooth As System.Windows.Forms.MenuItem
  <System.Diagnostics.DebuggerStepThrough()> Private Sub InitializeComponent()
    Me.DebugWindow = New System.Windows.Forms.RichTextBox()
    Me.PanelSplitter = New System.Windows.Forms.Splitter()
    Me.BasePanel = New System.Windows.Forms.Panel()
    Me.P1 = New System.Windows.Forms.Panel()
    Me.TreeSplitter = New System.Windows.Forms.Splitter()
    Me.PathTree = New System.Windows.Forms.TreeView()
    Me.mainMenu1 = New System.Windows.Forms.MainMenu()
    Me.menuItem1 = New System.Windows.Forms.MenuItem()
    Me.mnuExit = New System.Windows.Forms.MenuItem()
    Me.menuItem3 = New System.Windows.Forms.MenuItem()
    Me.mnuCreate = New System.Windows.Forms.MenuItem()
    Me.mnuSmooth = New System.Windows.Forms.MenuItem()
    Me.menuItem2 = New System.Windows.Forms.MenuItem()
    Me.mnuSaveShape = New System.Windows.Forms.MenuItem()
    Me.menuItem7 = New System.Windows.Forms.MenuItem()
    Me.None = New System.Windows.Forms.MenuItem()
    Me.mnuSpawnForm = New System.Windows.Forms.MenuItem()
    Me.mnuSpawnSmooth = New System.Windows.Forms.MenuItem()
    Me.BasePanel.SuspendLayout()
    Me.SuspendLayout()
    '
    'DebugWindow
    '
    Me.DebugWindow.Dock = System.Windows.Forms.DockStyle.Bottom
    Me.DebugWindow.Location = New System.Drawing.Point(0, 333)
    Me.DebugWindow.Name = "DebugWindow"
    Me.DebugWindow.Size = New System.Drawing.Size(492, 40)
    Me.DebugWindow.TabIndex = 4
    Me.DebugWindow.Text = ""
    '
    'PanelSplitter
    '
    Me.PanelSplitter.Dock = System.Windows.Forms.DockStyle.Bottom
    Me.PanelSplitter.Location = New System.Drawing.Point(0, 325)
    Me.PanelSplitter.Name = "PanelSplitter"
    Me.PanelSplitter.Size = New System.Drawing.Size(492, 8)
    Me.PanelSplitter.TabIndex = 5
    Me.PanelSplitter.TabStop = False
    '
    'BasePanel
    '
    Me.BasePanel.Controls.AddRange(New System.Windows.Forms.Control() {Me.P1, Me.TreeSplitter, Me.PathTree})
    Me.BasePanel.Dock = System.Windows.Forms.DockStyle.Fill
    Me.BasePanel.Name = "BasePanel"
    Me.BasePanel.Size = New System.Drawing.Size(492, 325)
    Me.BasePanel.TabIndex = 6
    '
    'P1
    '
    Me.P1.Dock = System.Windows.Forms.DockStyle.Fill
    Me.P1.Location = New System.Drawing.Point(96, 0)
    Me.P1.Name = "P1"
    Me.P1.Size = New System.Drawing.Size(396, 325)
    Me.P1.TabIndex = 6
    '
    'TreeSplitter
    '
    Me.TreeSplitter.Location = New System.Drawing.Point(88, 0)
    Me.TreeSplitter.Name = "TreeSplitter"
    Me.TreeSplitter.Size = New System.Drawing.Size(8, 325)
    Me.TreeSplitter.TabIndex = 5
    Me.TreeSplitter.TabStop = False
    '
    'PathTree
    '
    Me.PathTree.Dock = System.Windows.Forms.DockStyle.Left
    Me.PathTree.ImageIndex = -1
    Me.PathTree.Name = "PathTree"
    Me.PathTree.SelectedImageIndex = -1
    Me.PathTree.Size = New System.Drawing.Size(88, 325)
    Me.PathTree.TabIndex = 3
    '
    'mainMenu1
    '
    Me.mainMenu1.MenuItems.AddRange(New System.Windows.Forms.MenuItem() {Me.menuItem1, Me.menuItem3, Me.menuItem7})
    '
    'menuItem1
    '
    Me.menuItem1.Index = 0
    Me.menuItem1.MenuItems.AddRange(New System.Windows.Forms.MenuItem() {Me.mnuExit})
    Me.menuItem1.Text = "&File"
    '
    'mnuExit
    '
    Me.mnuExit.Index = 0
    Me.mnuExit.Text = "&Exit"
    '
    'menuItem3
    '
    Me.menuItem3.Index = 1
    Me.menuItem3.MenuItems.AddRange(New System.Windows.Forms.MenuItem() {Me.mnuCreate, Me.mnuSmooth, Me.menuItem2, Me.mnuSaveShape})
    Me.menuItem3.Text = "&Shape"
    '
    'mnuCreate
    '
    Me.mnuCreate.Index = 0
    Me.mnuCreate.Text = "Create"
    '
    'mnuSmooth
    '
    Me.mnuSmooth.Index = 1
    Me.mnuSmooth.Text = "Smooth"
    '
    'menuItem2
    '
    Me.menuItem2.Index = 2
    Me.menuItem2.Text = "-"
    '
    'mnuSaveShape
    '
    Me.mnuSaveShape.Index = 3
    Me.mnuSaveShape.Text = "Save Shape"
    '
    'menuItem7
    '
    Me.menuItem7.Index = 2
    Me.menuItem7.MenuItems.AddRange(New System.Windows.Forms.MenuItem() {Me.None})
    Me.menuItem7.Text = "&Form"
    '
    'None
    '
    Me.None.Index = 0
    Me.None.MenuItems.AddRange(New System.Windows.Forms.MenuItem() {Me.mnuSpawnForm, Me.mnuSpawnSmooth})
    Me.None.Text = "Spawn"
    '
    'mnuSpawnForm
    '
    Me.mnuSpawnForm.Index = 0
    Me.mnuSpawnForm.Text = "Original"
    '
    'mnuSpawnSmooth
    '
    Me.mnuSpawnSmooth.Index = 1
    Me.mnuSpawnSmooth.Text = "Smooth"
    '
    'Form1
    '
    Me.AutoScaleBaseSize = New System.Drawing.Size(5, 13)
    Me.ClientSize = New System.Drawing.Size(492, 373)
    Me.Controls.AddRange(New System.Windows.Forms.Control() {Me.BasePanel, Me.PanelSplitter, Me.DebugWindow})
    Me.Menu = Me.mainMenu1
    Me.Name = "Form1"
    Me.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen
    Me.Text = "Form1"
    Me.BasePanel.ResumeLayout(False)
    Me.ResumeLayout(False)

  End Sub

#End Region

  Private Sub Form1_Load(ByVal sender As System.Object, _
                         ByVal e As System.EventArgs) Handles MyBase.Load
    FillTree()
  End Sub

  Private Sub PanelPaint(ByVal sender As Object, ByVal e As PaintEventArgs)
    PaintMe(e.Graphics)
  End Sub

  Private Sub PaintMe(ByVal G As Graphics)
    G.SmoothingMode = SmoothingMode.HighSpeed

    If mOriginalPath.PointCount > 0 Then
      G.DrawPath(Pens.Black, mOriginalPath)
    End If

    If mSmoothPath.PointCount > 0 Then
      G.SmoothingMode = SmoothingMode.HighQuality
      G.DrawPath(Pens.Red, mSmoothPath)
    End If
  End Sub

#Region "Squeek events for Panel"

  Private Sub M_Down(ByVal sender As Object, ByVal m As MouseEventArgs)
    If mAllowDrawing And m.Button = MouseButtons.Left Then
      m_StartPoint = New Point(m.X, m.Y)
      m_LastPoint = m_StartPoint
      mOriginalPath = New GraphicsPath()
      m_Drawing = True
      DebugWindow.AppendText("Starting Path\n")
      DebugWindow.ScrollToCaret()
      P1.Invalidate()
    End If
  End Sub

  Private Sub M_Up(ByVal sender As Object, ByVal m As MouseEventArgs)
    If m_Drawing Then
      mOriginalPath.CloseFigure()
      m_Drawing = False
      mAllowDrawing = False
      P1.Cursor = Cursors.Default
      If mOriginalPath.PointCount > 2 Then
        mnuSpawnForm.Enabled = True
        DebugWindow.AppendText("Path Points: " + _
                                mOriginalPath.PointCount.ToString() + _
                                vbCrLf)
        DebugWindow.AppendText("Path Ended" + vbCrLf)
      Else
        mnuSpawnForm.Enabled = False
        mnuSpawnSmooth.Enabled = False
        DebugWindow.SelectionColor = Color.Red
        DebugWindow.AppendText("!!!INVALID PATH!!!" + vbCrLf)
        DebugWindow.SelectionColor = Color.Black
        DebugWindow.AppendText("Path Ended" + vbCrLf)
      End If

      'Draw the paths and make a window.
      P1.Invalidate()
    End If
  End Sub

  Private Sub M_Move(ByVal sender As Object, ByVal m As MouseEventArgs)
    If m_Drawing And m.Button = MouseButtons.Left Then
      mOriginalPath.AddLine(m_LastPoint.X, m_LastPoint.Y, m.X, m.Y)
      m_LastPoint.X = m.X
      m_LastPoint.Y = m.Y

      mInvalidRect = Rectangle.Truncate(mOriginalPath.GetBounds())
      mInvalidRect.Inflate(New Size(2, 2))
      P1.Invalidate(mInvalidRect)
    End If
  End Sub

#End Region

#Region "Drag-n-Drop events for TreeView and Panel"

  Private Sub TreeMouseDown(ByVal sender As Object, ByVal m As MouseEventArgs)
    If m.Button = MouseButtons.Left Then
      mDraging = True
    End If
  End Sub

  Private Sub TreeMouseMove(ByVal sender As Object, ByVal m As MouseEventArgs)
    If Not mDraging Then
      Return
    End If

    If m.Button <> MouseButtons.Left Then
      Return
    End If

    'Initial condition
    If PathTree.SelectedNode Is Nothing Then
      Return
    End If

    mRecallFileName = CType(PathTree.SelectedNode.Tag, String)

    'Make sure that there is a filename associated with this node
    If mRecallFileName = String.Empty Then
      mDraging = False
      Return
    End If
    DebugWindow.AppendText("Dragging File: " + mRecallFileName + vbCrLf)
    PathTree.DoDragDrop(mRecallFileName, _
                        DragDropEffects.Copy Or DragDropEffects.Move)
  End Sub

  Private Sub PanelDragEnter(ByVal sender As Object, ByVal e As DragEventArgs)
    If e.Data.GetDataPresent(DataFormats.Text) Then
      e.Effect = DragDropEffects.Copy
    Else
      e.Effect = DragDropEffects.None
    End If
  End Sub

  Private Sub PanelDragDrop(ByVal sender As Object, ByVal e As DragEventArgs)
    mDraging = False

    mOriginalPath = WindowPath.GetPath(mRecallFileName)
    mSmoothPath.Reset()
    P1.Invalidate()

    mnuSpawnSmooth.Enabled = False
    If mOriginalPath.PointCount = 0 Then
      DebugWindow.AppendText("Empty Path File: " + mRecallFileName + vbCrLf)
    Else
      mnuSpawnForm.Enabled = True
      DebugWindow.AppendText("Path Complete" + vbCrLf)
    End If
  End Sub

  Private Sub TreeExpandCollapse(ByVal sender As Object, _
                                 ByVal e As TreeViewEventArgs)
    'No need to detect which node this is since only the base node can be
    'expanded or contracted
    If e.Action = TreeViewAction.Collapse Then
      PathTree.Nodes(0).SelectedImageIndex = CLOSED_ICON
    Else
      PathTree.Nodes(0).SelectedImageIndex = OPEN_ICON
    End If
  End Sub
#End Region

#Region "Menu functions"

  Private Sub mnuExit_Click(ByVal sender As System.Object, _
                            ByVal e As System.EventArgs) _
                            Handles mnuExit.Click
    Me.Close()
  End Sub

  Private Sub mnuCreate_Click(ByVal sender As System.Object, _
                              ByVal e As System.EventArgs) _
                              Handles mnuCreate.Click
    P1.Cursor = mDrawCursor
    mSmoothPath.Reset()
    mOriginalPath.Reset()

    mnuSpawnForm.Enabled = False
    mnuSpawnSmooth.Enabled = False
    mAllowDrawing = True
    P1.Invalidate()
  End Sub

  Private Sub mnuSmooth_Click(ByVal sender As System.Object, _
                              ByVal e As System.EventArgs) _
                              Handles mnuSmooth.Click
    'Smooth out the path by reducing lines that make up path
    mSmoothPath = SmootherPath(mOriginalPath)

    'Translate a little to the side and below
    Dim Q As Matrix = New Matrix()
    Q.Translate(5, 5)
    mSmoothPath.Transform(Q)

    'Enable the ability to create smooth forms
    mnuSpawnSmooth.Enabled = True

    P1.Invalidate()
    DebugWindow.AppendText("Original Path Points: " + _
                            mOriginalPath.PointCount.ToString() + vbCrLf)
    DebugWindow.SelectionColor = Color.Red
    DebugWindow.AppendText("Smooth Path Points: " + _
                            mSmoothPath.PointCount.ToString() + vbCrLf)
    DebugWindow.SelectionColor = Color.Black
  End Sub

  Private Sub mnuSaveShape_Click(ByVal sender As System.Object, _
                                 ByVal e As System.EventArgs) _
                                Handles mnuSaveShape.Click
    Dim frm As SaveMe = New SaveMe(mOriginalPath)
    frm.ShowDialog()
    FillTree()
  End Sub

  Private Sub mnuSpawnForm_Click(ByVal sender As System.Object, _
                                 ByVal e As System.EventArgs) _
                                 Handles mnuSpawnForm.Click
    DebugWindow.AppendText("Spawning Window based on original path" + vbCrLf)
    MakeWindow(mOriginalPath)
  End Sub

  Private Sub mnuSpawnSmooth_Click(ByVal sender As System.Object, _
                                   ByVal e As System.EventArgs) _
                                   Handles mnuSpawnSmooth.Click
    DebugWindow.AppendText("Spawning Window based on smoothed path" + vbCrLf)
    MakeWindow(mSmoothPath)
  End Sub

#End Region

#Region "Helper Functions"

  '/// <doc>
  '/// Start first with reducing the number of lines in this graphics path
  '/// 1. read first point
  '/// 2. if x value of next point = x value of last point then skip
  '/// 3. if x value of next point != value of last point then...
  '/// 3a. make line based on these two points
  '/// 3b. add line to new path
  '/// 3c. first point = next point 
  '/// 4. repeat 1-3c
  '/// 5. Repeat 1-4 for both X and Y
  '/// </doc>
  Private Function SmootherPath(ByVal gp As GraphicsPath) As GraphicsPath
    Dim pd As PathData = gp.PathData
    Dim pt1 As PointF = New PointF(-1, -1)

    'First do all values in the X range
    Dim FixedPath_X As GraphicsPath = New GraphicsPath()
    Dim p As PointF
    For Each p In pd.Points
      If pt1.X = -1 Then
        pt1 = p
      Else
        ' If I introduced an error factor here I could smooth it out even more
        If p.X <> pt1.X Then
          FixedPath_X.AddLine(pt1, p)
          pt1 = p
        End If
      End If
    Next
    FixedPath_X.CloseFigure()

    'Second do all values in the Y range
    pd = FixedPath_X.PathData
    pt1 = New PointF(-1, -1)
    Dim FixedPath_Y As GraphicsPath = New GraphicsPath()
    For Each p In pd.Points
      If pt1.Y = -1 Then
        pt1 = p
      Else
        ' If I introduced an error factor here I could smooth it out even more
        If p.Y <> pt1.Y Then
          FixedPath_Y.AddLine(pt1, p)
          pt1 = p
        End If
      End If
    Next
    FixedPath_Y.CloseFigure()

    Return FixedPath_Y
  End Function

  Private Sub MakeWindow(ByVal ArgPath As GraphicsPath)
    Dim frm As Form = New Form()
    Dim path As GraphicsPath = CType(ArgPath.Clone(), GraphicsPath)
    Dim Xlate As Matrix = New Matrix()

    'Find the lowest Y value and normalize all Y values to zero
    'Find the lowest X value and normalize all X values to zero
    'Doing this always gives me some part of a title bar
    Dim p() As PointF = path.PathPoints
    Dim Xoffset As Int32 = 9999
    Dim Yoffset As Int32 = 9999
    Dim p2 As PointF
    For Each p2 In p
      If p2.X < Xoffset Then
        Xoffset = CInt(p2.X)
      End If
      If p2.Y < Yoffset Then
        Yoffset = CInt(p2.Y)
      End If
    Next
    Xlate.Translate(-Xoffset, -Yoffset)
    path.Transform(Xlate)

    ' Set the paractical viewing region of the form
    frm.Region = New Region(path)

    'Set the size of the form
    Dim frmRect As Rectangle = Rectangle.Truncate(path.GetBounds())
    frm.Size = frmRect.Size

    'Set some other parameters
    frm.StartPosition = FormStartPosition.CenterParent
    frm.FormBorderStyle = FormBorderStyle.FixedSingle

    'Show as modal because the form will be disposed of
    'This is, after all, just and example
    frm.ShowDialog()

    frm.Dispose()
    Xlate.Dispose()
  End Sub

  Private Sub FillTree()
    Dim BaseNode As TreeNode
    Dim NodeX As TreeNode
    Dim AllFileNames() As String = WindowPath.GraphicsPathFileNames

    PathTree.Nodes.Clear()

    'Create the base node
    BaseNode = New TreeNode("All Window Paths")
    BaseNode.ImageIndex = OPEN_ICON
    BaseNode.SelectedImageIndex = BaseNode.ImageIndex
    BaseNode.ExpandAll()
    BaseNode.Tag = String.Empty

    'Create each node in the tree under the base node
    Dim s As String
    For Each s In AllFileNames
      If s <> String.Empty Then
        NodeX = New TreeNode()
        NodeX.ImageIndex = DRAW_ICON
        NodeX.SelectedImageIndex = NodeX.ImageIndex
        NodeX.Text = Path.GetFileNameWithoutExtension(s)
        NodeX.Tag = s
        BaseNode.Nodes.Add(NodeX)
      End If
    Next

    PathTree.Nodes.Add(BaseNode)
  End Sub

#End Region


End Class
