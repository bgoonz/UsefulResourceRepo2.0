<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!-- #include file="include\config.asp" -->
<html>
<head>
	<title>TuneIn - Order Page - Template Wireframe</title>
	<link rel="stylesheet" href="tunein.css" type="text/css"> 
</head>

<body>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr> <!--Masthead table row-->
      <td bgcolor="#CCCCCC" colspan="2">
	  <!--Breadcrumb trail goes here-->
		<!--#include file="include\breadcrumb.asp"-->
	</td>
	<td bgcolor="#CCCCCC" align="right">
		<!--search goes here-->
		<!--#include file="include\search.asp"-->
      </td>
    </tr>
</table>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr> 
      <td valign="top" align="left" width="120" bgcolor="#CCCCCC"> 
	  <!--Navigation goes here -->
        <div class="tunein"> 
			TuneIn!<br>
			<hr width="80" align="center" noshade>
		</div>
        <!-- navigation goes here-->
		<!--#include file="include\navigation.asp"-->

	</td>
    <td valign="top"> 
	<%
    Dim HTMLString 'as String
	Dim sqlQuery 'as String
	Dim rs 'as ADODB.Recordset
	Dim sqlQuery2 'as String
	Dim rs2 'as ADODB.Recordset
	Set rs = Server.CreateObject("ADODB.Recordset")
	Set rs2 = Server.CreateObject("ADODB.Recordset")
	
%>	
<!--#include file="include\addtocart.asp"-->
<%	
	
	If len(Request.QueryString("ShowID")) > 0 Then
		sqlQuery = "up_GetShowInfo " & Request.QueryString("ShowID")
		Set rs = dbConn.Execute(sqlQuery)
		If rs.EOF and rs.BOF Then
			HTMLString = HTMLString & "An Error Occurred"
		Else
			HTMLString = HTMLString & "<h1>" & rs("EventName") & "</h1>"
			HTMLString = HTMLString & "<i>" & rs("VenueName") & ", " & rs("street1") & ", "
			If len(rs("street2")) > 0 Then
				HTMLString = HTMLString & rs("Street2") & ", "
			End If
			HTMLString = HTMLString & rs("City") & ", " & rs("StateCode") & "</i><br>"
			HTMLString = HTMLString & "<b>" & rs("EventDateTime") & "</b><br><p>"
			sqlQuery2 = "up_GetShowArtists " & rs("EventID")
			Set rs2 = dbConn.Execute(sqlQuery2)

			IF rs2.EOF and rs2.BOF Then
				HTMLString = HTMLString & "<b>An Error Occurred: No Artists listed for this show</b>"
			Else
				HTMLString = HTMLString & "<h3>Featured Artists:</h3>"
				Do While Not rs2.EOF
					HTMLString = HTMLString & rs2("ArtistName") & " (<a href=""shows.asp?ArtistID=" 
					HTMLString = HTMLString & rs2("ArtistID") & """>More " & rs2("ArtistName") & " Shows</a>)"
					HTMLString = HTMLString & " (<a href=""music.asp?ArtistID=" & rs2("artistID") & """>Music By " 
					HTMLString = HTMLString & rs2("ArtistName") & "</a>) (<a href=""news.asp?ArtistID=" & rs2("ArtistID") & """>"
					HTMLString = HTMLString & rs2("ArtistName") & " in the News</a>)"
					HTMLString = HTMLString & "<br>"
					rs2.MoveNext
				Loop
			End IF
			rs2.Close
			HTMLString = HTMLString & "</p>Seating: " & rs("SeatingType") & "; Price: " & rs("EventPrice")
			HTMLString = HTMLString & "<form name=""ticketOrder"" Method=POST action=""shows.asp"">"
			HTMLString = HTMLString & "Number of Seats: <input type=""text"" name=""quantity"" size=5>"
			HTMLString = HTMLString & "<input type=""submit"" name=""SubmitForm"" value=""Add to Cart"">"
			HTMLString = HTMLString & "<input type=""hidden"" name=""ProductCode"" value=""" & rs("EventID") & """>"
			HTMLString = HTMLString & "<input type=""hidden"" name=""ItemType"" value=""2"">"
			HTMLString = HTMLString & "</form>"
									
		End IF
		rs.Close
		
	ElseIf Len(Request.QueryString("ArtistID"))>0 Then
		sqlQuery = "up_GetShowsForArtist " & Request.QueryString("ArtistID")
		Set rs = dbConn.Execute(sqlQuery)
		If rs.EOF and rs.BOF Then
			HTMLString = HTMLString & "An error occurred"
		Else
			Dim Counter 'as integer
			Counter = 0 
			Do While Not rs.EOF
				If Counter = 0 Then
					HTMLString = HTMLString & "<h1>Upcoming Appearances By " & rs("ArtistName") & "</h1>"
				End IF
					HTMLString = HTMLString & rs("EventDateTime") & ": " & rs("VenueName") & ", "
					HTMLString = HTMLString & rs("City") & ", " & rs("StateCode") 
					HTMLString = HTMLString & " (<a href=""shows.asp?ShowID=" & rs("EventID") & """> More Info...</a>)<br>"			
				Counter = Counter +1
				rs.MoveNext
			Loop
		End If
		rs.Close
		
	Else
		HTMLString = HTMLString & "<h1>Upcoming Shows</h1>"
		sqlQuery = "up_GetUpcomingShowsTop10"
		Set rs = dbConn.Execute(sqlQuery)
		If rs.EOF and rs.BOF Then
			HTMLString=HTMLString & "An Error Occurred"
		Else
			Do While Not rs.Eof
				HTMLString = HTMLString & "<b>" & rs("EventName") & "</b> -- "
				sqlQuery2 = "up_GetDenormalizedArtistsForEvent "  & rs("EventID")
				Set rs2 = dbConn.Execute(sqlQuery2)
				HTMLString = HTMLString & "<i>" & rs2("Artists") & "</i> -- "
				rs2.Close
				HTMLString = HTMLString & rs("City") & " -- "
				HTMLString = HTMLString & rs("EventDateTime") & " -- "
				HTMLString = HTMLString & "<a href=""shows.asp?ShowID=" & rs("EventID") & """>(More Info)</a><br>" & vbcrlf
				rs.MoveNext
			Loop
		End IF
		rs.Close
	End IF
	Response.Write(HTMLString)
	Set rs = Nothing
	Set rs2 = Nothing
	%>
    </td>
      <td valign="top" align="right" width=200> 
        <table border="1" cellspacing="0" cellpadding="0">
          <tr> 
            <td bgcolor="#CCCCCC"> 
			<!-- Shopping Cart Include Goes Here -->
            <!-- #include file="include\cartinfo.asp" -->  
        </td>
      </tr>
    </table>
	</td>
	</tr>
	</table>
</body>
</html>
<!-- include virtual="include/deconfig.asp" -->