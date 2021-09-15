<%@ Page language="c#" Codebehind="WebForm1.aspx.cs" AutoEventWireup="false" Inherits="WebFormsValidationExample.WebForm1" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
	<HEAD>
		<title>WebForm1</title>
		<meta content="Microsoft Visual Studio 7.0" name="GENERATOR">
		<meta content="C#" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="Form1" method="post" runat="server">
			<asp:TextBox id="TextBox1" style="Z-INDEX: 101; LEFT: 32px; POSITION: absolute; TOP: 24px" runat="server"></asp:TextBox>
			<asp:Button id="Button1" style="Z-INDEX: 102; LEFT: 32px; POSITION: absolute; TOP: 88px" runat="server" Text="Try it"></asp:Button>
			<asp:RequiredFieldValidator id="RequiredFieldValidator1" style="Z-INDEX: 103; LEFT: 224px; POSITION: absolute; TOP: 24px" runat="server" ErrorMessage="You must make an entry" ControlToValidate="TextBox1"></asp:RequiredFieldValidator>
			<asp:RegularExpressionValidator id="RegularExpressionValidator1" style="Z-INDEX: 104; LEFT: 224px; POSITION: absolute; TOP: 24px" runat="server" ErrorMessage="Not a valid Social Security number" ControlToValidate="TextBox1" ValidationExpression="[0-9]{3}-[0-9]{2}-[0-9]{4}"></asp:RegularExpressionValidator>
			<asp:Label id="Label1" style="Z-INDEX: 105; LEFT: 32px; POSITION: absolute; TOP: 152px" runat="server"></asp:Label></form>
	</body>
</HTML>
