<%
IF Request.Form("SubmitForm") = "Add to Cart" Then
	Dim ProductCode 	'as String
	Dim Quantity 	'as String
	Dim SessionID	'as String
	Dim boolInsert  'as boolean
	boolInsert = true
	ProductCode = Request.Form("ProductCode")
	Quantity = Request.Form("Quantity")
	SessionID = Session.SessionID
	ItemType = Request.Form("ItemType")
	If len(ProductCode) < 1 or len(quantity) < 1 or len(ItemType) < 1 Then
		boolInsert = False
	End If
	If boolInsert Then
		sqlQuery = "up_InsertIntoCart " & ProductCode & ", " & Quantity & ", " & SessionID & ", " & ItemType
		Set rs = Server.CreateObject("ADODB.Recordset")
		Set rs = dbConn.Execute(sqlQuery)
		If rs.EOF AND rs.BOF Then
			HTMLString = HTMLString & "<h1>An Error Occured and your request was not processed</h1>"
		Else
			HTMLString = HTMLString & "<h2>The item was added to your cart.</h2>"
		End IF
	Else
		HTMLString = HTMLString & "<h1>Problem processing your request</h1>"
		HTMLString = HTMLString & "<p>There was a problem processing your request.<br>"
		HTMLString = HTMLString & "It appears that the information was incomplete. Please "
		HTMLString = HTMLString & "<a href=""javascript:history.go(-1)"">Click here</a> or use "
		HTMLString = HTMLString & "your browser's back button to resubmit the request.</p>"
		Response.Write(HTMLString)
		Response.End
	End If	
End If
%>