<%@ Page language="c#" Codebehind="WebForm1.aspx.cs" AutoEventWireup="false" Inherits="ApplicationStateExample.WebForm1" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<title>Application State Example</title>
		<meta name="GENERATOR" Content="Microsoft Visual Studio 7.0">
		<meta name="CODE_LANGUAGE" Content="C#">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="Form1" method="post" runat="server">
			<asp:Label id="CurrentStateLabel" style="Z-INDEX: 101; LEFT: 24px; POSITION: absolute; TOP: 56px" runat="server">The current value is </asp:Label>
			<asp:Label id="Label2" style="Z-INDEX: 102; LEFT: 24px; POSITION: absolute; TOP: 112px" runat="server">Enter a new value</asp:Label>
			<asp:TextBox id="NewValueTextBox" style="Z-INDEX: 103; LEFT: 144px; POSITION: absolute; TOP: 112px" runat="server" Width="176px"></asp:TextBox>
			<asp:Button id="NewValueButton" style="Z-INDEX: 104; LEFT: 352px; POSITION: absolute; TOP: 112px" runat="server" Text="Change It!"></asp:Button>
		</form>
	</body>
</HTML>
