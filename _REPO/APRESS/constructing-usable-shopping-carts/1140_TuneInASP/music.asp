<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!-- #include file="include\config.asp" -->
<html>
<head>
	<title>TuneIn - Music</title>
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
<!-- Page Content Goes Here-->
<%
	Dim MusicID 'as String
	Dim sqlQuery 'as String
	Dim sqlQuery2 'as String
	Dim sqlQuery3 'as String
	Dim rs 'as ADODB.Recordset
	Dim rs2 'as ADODB.Recordset
	Dim rs3 'as ADODB.Recordset
	Dim HTMLString 'as String
	Dim iCounter 'as Integer
%>	
<!--#include file="include\addtocart.asp"-->
<%	
If Len(Request.QueryString("AlbumID")) > 0 Then 
'Then we have a specific album to display

	
	MusicID = Request.QueryString("AlbumID")
	sqlQuery = "up_GetAlbumInfo " & MusicID
	Set rs = Server.CreateObject("ADODB.Recordset")
	Set rs2 = Server.CreateObject("ADODB.Recordset")
	Set rs3 = Server.CreateObject("ADODB.Recordset")
	Set rs = dbConn.Execute(sqlQuery)
	sqlQuery2 = "up_GetAlbumProductInfo " & rs("ProductGroupID")
	sqlQuery3 = "up_getAlbumTrackInfo " & rs("ProductGroupID")
	Set rs2 = dbConn.Execute(sqlQuery2)
	Set rs3 = dbConn.Execute(sqlQuery3)

	
	HTMLString = HTMLString & "<h1>" & rs("ArtistName") & " <i>" & rs("ProductGroupTitle") & "</i></h1>"
	'Output Track Listing
	HTMLString = HTMLString & "<table width=50" & chr(37) & ">"
	HTMLString = HTMLString & "<tr><th>Track Number</th><th>Song Title</th></tr>"
	Do While Not rs3.EOF
		HTMLString = HTMLString & "<tr><td>" & rs3("TrackNumber") & "</td><td>" & rs3("SongTitle") & "</td></tr>"
		rs3.MoveNext
	Loop
	HTMLString = HTMLString & "</table><br clear=all>"
	
	'output available products for album
	HTMLString = HTMLString & "<form name=""AddItemToCart"" Method=POST Action=""Music.asp"">"
	HTMLString = HTMLString & "<table width=50" & chr(37) & ">"
	Do While Not rs2.EOF
		HTMLString = HTMLString & "<tr><td>" & rs2("FormatDescription") & "--" & FormatCurrency(rs2("ProductPrice"),2) & "</td>"
		HTMLString = HTMLString & "<td><input type=""radio"" Name=""ProductCode"" value=""" & rs2("ProductCodeID") & """></td><td>Quantity:<input size=5 type=""text"" name=""quantity""></td></tr>"
		rs2.MoveNext
	Loop
	HTMLString = HTMLString & VBCRLF & "<tr><td colspan=3 align=""center""><input type=""hidden"" name=""ItemType"" value=""1"">"
	HTMLString = HTMLString & VBCRLF & "<input name=""SubmitForm"" type=""submit"" Value=""Add to Cart"" class=""submitButton""></td></tr>"
	HTMLString = HTMLString & VBCRLF & "</table></form><br clear=all>"
	
	'additional options
	HTMLString = HTMLString & "(More Music From <a href=""music.asp?ArtistID=" & rs("ArtistID") & """>" & rs("ArtistName") & "</a>)<br>"
	HTMLString = HTMLString & "(Upcoming <a href=""shows.asp?ArtistID=" & rs("ArtistID") & """>" & rs("ArtistName") & "</a> Shows)<br>"
	HTMLString = HTMLString & "(<a href=""news.asp?ArtistID=" & rs("ArtistID") & """>" & rs("ArtistName") & "</a> In The News)<br>"	
	HTMLString = HTMLString & "(More <a href=""music.asp?GenreID=" & rs("GenreID") & """>" & rs("GenreDescription") & "</a> music)<br>"
		
	rs.Close
	rs2.Close
	rs3.Close
	Set rs = Nothing
	Set rs2 = Nothing
	Set rs3 = Nothing
	
ElseIf Len(Request.QueryString("ArtistID")) > 0 Then
	sqlQuery = "up_GetArtistAlbumList " & Request.QueryString("ArtistID")
	Set rs = Server.CreateObject("ADODB.Recordset")
	Set rs = dbConn.Execute(sqlQuery)
	iCount = 0
	Do While Not rs.EOF
		If iCount = 0 Then
			HTMLString = HTMLString & "<h1>" & rs("ArtistName") & "</h1>"
		End If
			HTMLString = HTMLString & rs("ProductGroupTitle") & " <a href=""music.asp?AlbumID=" & rs("ProductGroupID") & """>(More)</a><br>"	
		iCount = iCount + 1
		rs.MoveNext
	Loop
	rs.Close
	Set rs=nothing
	
ElseIF Len(Request.QueryString("GenreID")) > 0 Then
	'How many records per page do we want to show?
	Const iRecordsPerPage = 5

	Dim currentPage	 'what page are we on??
	Dim bolLastPage	 'are we on the last page?
	
	if len(Request.QueryString("page")) = 0 then
		currentPage = 1
	else
		currentPage = CInt(Request.QueryString("page"))
	end if

	'Show the paged results
	sqlQuery = "up_GenrePagedItems " & Request.QueryString("GenreID") & "," & currentPage & "," & iRecordsPerPage
	Set rs = dbConn.Execute(sqlQuery)
	
	'See if we're on the last page
	if Not rs.EOF then
		if CInt(rs("MoreRecords")) > 0 then
			bolLastPage = False
		else
			bolLastPage = True
		end if
	end if
	Do While Not rs.EOF
		HTMLString = HTMLString & rs("ArtistName") & ": <i>" & rs("ProductGroupTitle") & "</i> "
		HTMLString = HTMLString & "<a href=""music.asp?AlbumID=" & rs("AlbumID") & """>(More)</a><br><p></p>"
		rs.MoveNext
	Loop

	'Only show the previous button if we are NOT on the first page
	if currentPage > 1 then
	 	HTMLString = HTMLString & "<a href=""music.asp?page=" & currentPage-1 & "&GenreID=" & Request.QueryString("GenreID") & """><< Previous " & iMaxRecords & " Records</a> "
		HTMLString = HTMLString & "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
	end if 

	'Only show the next button if we are NOT on the last page
	if Not bolLastPage then 
		HTMLString = HTMLString & "<a href=""music.asp?page=" & currentPage+1 & "&GenreID=" & Request.QueryString("GenreID") & """> Next " & iMaxRecords & " Records >></a> "
	end if


	
Else
'We need to display the generic music screen

	sqlQuery = "up_GetNewReleasesTop5"
	Set rs = Server.CreateObject("ADODB.Recordset")
	Set rs = dbConn.Execute(sqlQuery)
	If rs.EOF and rs.BOF Then
		HTMLString=HtmlString & "An Error Occurred"
	Else
		HTMLString = HTMLString & "<h1>New Releases</h1>"
		Do While Not rs.Eof
			HTMLString = HTMLString & "<b>" & rs("ArtistName") & "</b> -- "
			HTMLString = HTMLString & rs("ProductGroupTitle") & " -- "
			HTMLString = HTMLString & rs("ReleaseDate") & " "
			HTMLString = HTMLString & "<a href=""music.asp?AlbumID=" & rs("ProductGroupID") & """>(More Info)</a><br clear=all>" & vbcrlf
			rs.MoveNext
		Loop
	End IF

	sqlQuery = "up_GetUpcomingReleasesTop5"
	Set rs = dbConn.Execute(sqlQuery)
	If rs.EOF and rs.BOF Then
		HTMLString=HtmlString & "<h6>An Error Occurred There are no upcoming releases</h6>"
	Else
		HTMLString = HTMLString & "<h1>Upcoming Releases</h1>"
		Do While Not rs.Eof
			HTMLString = HTMLString & "<b>" & rs("ArtistName") & "</b> -- "
			HTMLString = HTMLString & rs("ProductGroupTitle") & " -- "
			HTMLString = HTMLString & rs("ReleaseDate") & " "
			HTMLString = HTMLString & "<a href=""music.asp?AlbumID=" & rs("ProductGroupID") & """>(More Info)</a><br>" & vbcrlf
			rs.MoveNext
		Loop
	End IF
	
	
	Set rs = Nothing


End If
	Response.Write(HTMLString)
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