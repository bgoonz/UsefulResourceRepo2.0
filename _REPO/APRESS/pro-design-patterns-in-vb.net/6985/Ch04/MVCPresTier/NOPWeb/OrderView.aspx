<%@ Page Language="vb" AutoEventWireup="false" Codebehind="OrderView.aspx.vb" Inherits="NOPWeb.OrderView"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
	<HEAD>
		<title>OrderView</title>
		<meta name="GENERATOR" content="Microsoft Visual Studio.NET 7.0">
		<meta name="CODE_LANGUAGE" content="Visual Basic 7.0">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="Form1" method="post" runat="server">
			<asp:Label id="orderLabel" style="Z-INDEX: 101; LEFT: 15px; POSITION: absolute; TOP: 13px" runat="server" Font-Size="X-Large">Order</asp:Label>
			<asp:Label id="Label1" style="Z-INDEX: 102; LEFT: 15px; POSITION: absolute; TOP: 57px" runat="server">Customer ID</asp:Label>
			<asp:Label id="Label2" style="Z-INDEX: 103; LEFT: 17px; POSITION: absolute; TOP: 113px" runat="server">Order Date</asp:Label>
			<asp:Label id="Label3" style="Z-INDEX: 104; LEFT: 19px; POSITION: absolute; TOP: 169px" runat="server">Products</asp:Label>
			<asp:TextBox id="customerIDText" style="Z-INDEX: 105; LEFT: 15px; POSITION: absolute; TOP: 80px" runat="server" Width="159px"></asp:TextBox>
			<asp:TextBox id="orderDateText" style="Z-INDEX: 106; LEFT: 16px; POSITION: absolute; TOP: 136px" runat="server" Width="159px"></asp:TextBox>
			<asp:DataGrid id="productsGrid" style="Z-INDEX: 107; LEFT: 35px; POSITION: absolute; TOP: 195px" runat="server" Width="377px" AutoGenerateColumns="False">
				<HeaderStyle Font-Bold="True"></HeaderStyle>
				<Columns>
					<asp:BoundColumn DataField="Name" HeaderText="Name"></asp:BoundColumn>
					<asp:BoundColumn DataField="Qty" HeaderText="Quantity"></asp:BoundColumn>
					<asp:BoundColumn DataField="Price" HeaderText="Price"></asp:BoundColumn>
					<asp:BoundColumn DataField="RequiredDate" HeaderText="Required Date"></asp:BoundColumn>
				</Columns>
			</asp:DataGrid>
			<asp:Button id="orderButton" style="Z-INDEX: 108; LEFT: 332px; POSITION: absolute; TOP: 342px" runat="server" Text="Order" Width="78px" Height="34px"></asp:Button>
			<asp:Label id="messageLabel" style="Z-INDEX: 109; LEFT: 20px; POSITION: absolute; TOP: 387px" runat="server" ForeColor="Red" Width="384px" Height="48px"></asp:Label>
			<asp:Button id="backToOrdersButton" style="Z-INDEX: 110; LEFT: 15px; POSITION: absolute; TOP: 449px" runat="server" Text="< Back to Orders" Width="152px" Height="41px"></asp:Button>
		</form>
	</body>
</HTML>
