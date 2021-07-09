<%@ Page Language="vb" AutoEventWireup="false" Codebehind="OrdersView.aspx.vb" Inherits="NOPWeb.OrdersView"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
	<HEAD>
		<title>OrdersView</title>
		<meta name="GENERATOR" content="Microsoft Visual Studio.NET 7.0">
		<meta name="CODE_LANGUAGE" content="Visual Basic 7.0">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="Form1" method="post" runat="server">
			<asp:Label id="Label1" style="Z-INDEX: 101; LEFT: 20px; POSITION: absolute; TOP: 19px" runat="server" Width="274px" Height="52px" Font-Size="X-Large">Orders</asp:Label>
			<asp:DataGrid id="ordersGrid" style="Z-INDEX: 102; LEFT: 26px; POSITION: absolute; TOP: 82px" runat="server" Width="357px" AutoGenerateColumns="False">
				<HeaderStyle Font-Bold="True"></HeaderStyle>
				<Columns>
					<asp:BoundColumn DataField="CustomerID" HeaderText="Customer ID"></asp:BoundColumn>
					<asp:BoundColumn DataField="OrderDate" HeaderText="Order Date"></asp:BoundColumn>
					<asp:BoundColumn DataField="OrderType" HeaderText="Order Type"></asp:BoundColumn>
					<asp:ButtonColumn Text="View" CommandName="ViewOrder"></asp:ButtonColumn>
				</Columns>
			</asp:DataGrid>
		</form>
	</body>
</HTML>
