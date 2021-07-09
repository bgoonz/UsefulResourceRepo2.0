<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<!-- #include file="include\config.asp" -->
<html>
<head>
	<title>TuneIn - Order Page - Template Wireframe</title>
	<link rel="stylesheet" href="tunein.css" type="text/css"> 
</head>

<body>
<form name="form1" method="post" action="" enctype="multipart/form-data">
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

If Len(Request.QueryString("NewsID")) > 0 Then
	sqlQuery = "up_GetNewsStory " & Request.QueryString("NewsID")
	Set rs = Server.CreateObject("ADODB.Recordset")
	Set rs = dbConn.Execute(sqlQuery)
	If rs.EOF and rs.BOF Then
		HTMLString="An Error Occurred"
	Else
		HTMLString = HTMLString & "<h1>" & rs("HeadLine") & "</h1>"
		HTMLString = HTMLString & "<p>" & rs("body") & "</p>"
		If Len(request.querystring("ArtistID") >0 Then
		HTMLString = HTMLString & "(More <a href=""news.asp?ArtistID=" & rs("ArtistID") & """>" & rs("ArtistName") & " in the news</a>)<br>"
		End IF
		If Len(Request.Querystring("GenreID") > 0 Then
		HTMLString = HTMLString & "(More <a href=""news.asp?GenreID=" & rs("GenreID") & """>" & rs("GenreDescription") & "</a> artists in the news)<br>"
		End If
		If Len(Request.Querystring("ArtistID") > 0 Then
		HTMLString = HTMLString & "(Music By <a href=""music.asp?ArtistID=" & rs("ArtistID") & """>" & rs("ArtistName") & "</a>)<br>"	
		HTMLString = HTMLString & "(Upcoming <a href=""shows.asp?ArtistID=" & rs("ArtistID") & """>" & rs("ArtistName") & "</a> Shows)<br>"
		End If

	End If
ElseIF Len(Request.QueryString("ArtistID")) > 0 Then
	sqlQuery = "up_GetNewsStorybyArtist " & Request.QueryString("ArtistID")
	Set rs = Server.CreateObject("ADODB.Recordset")
	Set rs = dbConn.Execute(sqlQuery)
	If rs.EOF and rs.BOF Then
		HTMLString="<p>There are no news articles on file for this artist</p><p><a href=""news.asp"">Click here</a> for current news items</p>"
	Else
		Do While Not rs.EOF
			HTMLString = HTMLString & "<p><b>" & rs("HeadLine") 
			HTMLString = HTMLString & "</b> (<a href=""news.asp?NewsID" & rs("newsID") & """>Story</a>)</p>"
			rs.MoveNext
		Loop
	End If
	
ElseIF Len(Request.QueryString("GenreID")) > 0 Then
	sqlQuery = "up_GetNewsStorybyGenre " & Request.QueryString("GenreID")
	Set rs = Server.CreateObject("ADODB.Recordset")
	Set rs = dbConn.Execute(sqlQuery)
	If rs.EOF and rs.BOF Then
		HTMLString="<p>There are no news articles on file for this genre</p><p><a href=""news.asp"">Click here</a> for current news items</p>"
	Else
		Do While Not rs.EOF
			HTMLString = HTMLString & "<p><b>" & rs("HeadLine") 
			HTMLString = HTMLString & "</b> (<a href=""news.asp?NewsID" & rs("newsID") & """>Story</a>)</p>"
			rs.MoveNext
		Loop
	End If

Else
	sqlQuery = "up_GetMusicNewsTop10"
	Set rs = Server.CreateObject("ADODB.Recordset")
	Set rs = dbConn.Execute(sqlQuery)
	If rs.EOF and rs.BOF Then
		HTMLString="An Error Occurred"
	Else
		HTMLString = "<h1>Music News</h1>" & vbcrlf
		Do While Not rs.Eof
			HTMLString = HTMLString & "<b>" & rs("Headline") & "</b> -- "
			HTMLString = HTMLString & "<a href=""news.asp?NewsID=" & rs("NewsID") & """>(Story...)</a><br>" & vbcrlf
			rs.MoveNext
		Loop
	End IF
End If
Set rs = Nothing
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
</form>
</body>
</html>
<!-- include virtual="include/deconfig.asp" -->