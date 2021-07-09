<%@ Page Language="vb" AutoEventWireup="false" Codebehind="NWDSAWebTestApp.aspx.vb" Inherits="NWDSAWebTestApp.NWDSAWebTestApp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
	<HEAD>
		<title>NWDSAWebTestApp</title>
		<meta name="GENERATOR" content="Microsoft Visual Studio.NET 7.0">
		<meta name="CODE_LANGUAGE" content="Visual Basic 7.0">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="Form1" method="post" runat="server">
			<asp:Label id="Label1" style="Z-INDEX: 101; LEFT: 16px; POSITION: absolute; TOP: 17px" runat="server" Height="46px" Width="175px" Font-Size="X-Large">Orders</asp:Label>
			<asp:TextBox id="txtCustomerID" style="Z-INDEX: 102; LEFT: 105px; POSITION: absolute; TOP: 76px" runat="server"></asp:TextBox>
			<asp:Button id="btnGetOrders" style="Z-INDEX: 103; LEFT: 274px; POSITION: absolute; TOP: 77px" runat="server" Text="Get Orders" Width="92px"></asp:Button>
			<asp:DataGrid id="dgOrders" style="Z-INDEX: 104; LEFT: 14px; POSITION: absolute; TOP: 114px" runat="server" AutoGenerateColumns="False">
				<HeaderStyle Font-Bold="True"></HeaderStyle>
				<Columns>
					<asp:BoundColumn DataField="OrderID" HeaderText="Order ID"></asp:BoundColumn>
					<asp:BoundColumn DataField="OrderDate" HeaderText="Order Date"></asp:BoundColumn>
					<asp:BoundColumn DataField="RequiredDate" HeaderText="Required Date"></asp:BoundColumn>
					<asp:BoundColumn DataField="ShippedDate" HeaderText="Shipped Date"></asp:BoundColumn>
				</Columns>
			</asp:DataGrid>
			<asp:Label id="Label2" style="Z-INDEX: 105; LEFT: 16px; POSITION: absolute; TOP: 76px" runat="server" Height="26px" Width="87px">Customer ID: </asp:Label>
		</form>
	</body>
</HTML>
