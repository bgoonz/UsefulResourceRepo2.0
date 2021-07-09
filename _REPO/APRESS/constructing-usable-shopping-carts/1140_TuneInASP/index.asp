<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!-- #include file="include\config.asp" -->
<%

Function GenerateNewReleases()
	Dim HTMLString 'as String
	Dim sqlQuery 'as String
	Dim rs 'as ADODB.Recordset
	sqlQuery = "up_GetNewReleasesTop5"
	Set rs = Server.CreateObject("ADODB.Recordset")
	Set rs = dbConn.Execute(sqlQuery)
	If rs.EOF and rs.BOF Then
		HTMLString="An Error Occurred"
	Else
		Do While Not rs.Eof
			HTMLString = HTMLString & "<b>" & rs("ArtistName") & "</b> -- "
			HTMLString = HTMLString & rs("ProductGroupTitle") & " -- "
			HTMLString = HTMLString & rs("ReleaseDate") & " "
			HTMLString = HTMLString & "<a href=""music.asp?AlbumID=" & rs("ProductGroupID") & """>(More Info)</a><br>" & vbcrlf
			rs.MoveNext
		Loop
	End IF
	Set rs = Nothing
	GenerateNewReleases = HTMLString
End Function
Function GenerateUpcomingShows()
	Dim HTMLString 'as String
	Dim sqlQuery 'as String
	Dim rs 'as ADODB.Recordset
	Dim sqlQuery2 'as String
	Dim rs2 'as ADODB.Recordset
	sqlQuery = "up_GetUpcomingShowsTop5"
	Set rs = Server.CreateObject("ADODB.Recordset")
	Set rs2 = Server.CreateObject("ADODB.Recordset")
	Set rs = dbConn.Execute(sqlQuery)
		If rs.EOF and rs.BOF Then
		HTMLString="An Error Occurred"
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
	Set rs = Nothing
	Set rs2 = Nothing
	GenerateUpcomingShows = HTMLString
End Function
Function GenerateMusicNews()
	Dim HTMLString 'as String
	Dim sqlQuery 'as String
	Dim rs 'as ADODB.Recordset
	sqlQuery = "up_GetMusicNewsTop5"
	Set rs = Server.CreateObject("ADODB.Recordset")
	Set rs = dbConn.Execute(sqlQuery)
	If rs.EOF and rs.BOF Then
		HTMLString="An Error Occurred"
	Else
		Do While Not rs.Eof
			HTMLString = HTMLString & "<b>" & rs("Headline") & "</b> -- "
			HTMLString = HTMLString & "<a href=""news.asp?NewsID=" & rs("NewsID") & """>(Story...)</a><br>" & vbcrlf
			rs.MoveNext
		Loop
	End IF
	Set rs = Nothing
	GenerateMusicNews = HTMLString
End Function
Function GenerateSpecialOffers()
	Dim HTMLString 'as String
	Dim sqlQuery 'as String
	Dim rs 'as ADODB.Recordset
	sqlQuery = "up_GetSpecialOffersTop5"
	Set rs = Server.CreateObject("ADODB.Recordset")
	Set rs = dbConn.Execute(sqlQuery)
	If rs.EOF and rs.BOF Then
		HTMLString="An Error Occurred"
	Else
		Do While Not rs.Eof
			HTMLString = HTMLString & "<b>" & rs("ShortDescription") & "</b> -- "
			HTMLString = HTMLString & "<a href=""specials.asp?SpecialID=" & rs("SpecialID") & """>(Complete Info...)</a><br>" & vbcrlf
			rs.MoveNext
		Loop
	End IF
	GenerateSpecialOffers = HTMLString
End Function

Dim NewReleasesHTML 'as String
Dim UpcomingShowsHTML 'as String
Dim MusicNewsHTML 'as String
Dim SpecialOffersHTML 'as String

NewReleasesHTML = GenerateNewReleases()
UpcomingShowsHTML = GenerateUpcomingShows()
MusicNewsHTML = GenerateMusicNews()
SpecialOffersHTML = GenerateSpecialOffers()

%>
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
		<table width="99%" cellspacing=5 cellpadding=5 border=0>
			<tr>
				<td valign="top">
					<h1>New Releases</h1>
					<%=NewReleasesHTML%>
				</td>
				<td valign="top">
					<h1>Upcoming Shows</h1>
					<%=UpcomingShowsHTML%>
				</td>
			</tr>
			<tr>
				<td valign="top">
					<h1>Music News</h1>
					<%=MusicNewsHTML%>
				</td>
				<td valign="top">
					<h1>Special Offers</h1>
					<%=SpecialOffersHTML%>
				</td>
			</tr>
		</table>
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