<%@ Page language="c#" Codebehind="WebForm1.aspx.cs" AutoEventWireup="false" Inherits="WebFormsHelloWorld.WebForm1" %>
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
			<asp:Label id="Label1" style="Z-INDEX: 101; LEFT: 40px; POSITION: absolute; TOP: 32px" runat="server">Hello World</asp:Label>
			<asp:TextBox id="TextBox1" style="Z-INDEX: 102; LEFT: 40px; POSITION: absolute; TOP: 128px" runat="server"></asp:TextBox>
			<asp:Button id="Button1" style="Z-INDEX: 103; LEFT: 40px; POSITION: absolute; TOP: 184px" runat="server" Text="Say Hello"></asp:Button>
		</form>
	</body>
</HTML>
