<%@ Page language="c#" Codebehind="WebForm1.aspx.cs" AutoEventWireup="false" Inherits="WebFormsUserControlExample.WebForm1" %>
<%@ Register TagPrefix="uc1" TagName="WebUserControl1" Src="WebUserControl1.ascx" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<title>WebForm1</title>
		<meta name="GENERATOR" Content="Microsoft Visual Studio 7.0">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="Form1" method="post" runat="server">
			<asp:Label id="Label1" style="Z-INDEX: 101; LEFT: 32px; POSITION: absolute; TOP: 56px" runat="server">Filler for the example</asp:Label>
			<asp:TextBox id="TextBox1" style="Z-INDEX: 102; LEFT: 104px; POSITION: absolute; TOP: 104px" runat="server"></asp:TextBox>
			<asp:Button id="Button1" style="Z-INDEX: 103; LEFT: 88px; POSITION: absolute; TOP: 184px" runat="server" Text="Button"></asp:Button>
			<HR style="Z-INDEX: 104; LEFT: 8px; POSITION: absolute; TOP: 240px" width="100%" SIZE="1">
			<DIV style="Z-INDEX: 105; LEFT: 24px; WIDTH: 336px; POSITION: absolute; TOP: 280px; HEIGHT: 100px" align="center" ms_positioning="FlowLayout">
				<uc1:WebUserControl1 id="WebUserControl11" runat="server"></uc1:WebUserControl1></DIV>
		</form>
	</body>
</HTML>
