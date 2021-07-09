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
		<h1>Search Results</h1>
<%
If Len(Request.Form("SearchType")) < 1 Then
	Response.Redirect("index.asp")
Else
	Dim HTMLString 'as String
	Dim sqlQuery 'as String
	Dim rs 'as ADODB.Recordset
	Set rs = Server.CreateObject("ADODB.Recordset")
	SearchType = Request.Form("SearchType")
	SearchField = Request.Form("SearchField")
	Select Case SearchType
		Case "Music"
			sqlQuery = "up_SearchMusic " & SearchField
		Case "Music_Artist" 
			sqlQuery = "up_SearchMusicArtist " & SearchField
		Case "Music_Album" 
			sqlQuery = "up_SearchMusicAlbum " & SearchField
		Case "Music_Song"
			sqlQuery = "up_SearchMusicSong " & SearchField
		Case "Shows"
			sqlQuery = "up_SearchShows " & SearchField
		Case "Shows_Artist"
			sqlQuery = "up_SearchShowsArtist " & SearchField
		Case "News"
			sqlQuery = "up_SearchNews " & SearchField
	End Select
	Set rs = dbConn.Execute(sqlQuery)
	If rs.EOF and rs.BOF Then
		HTMLString="<p>I'm sorry, there were no results for your search</p>"
	Else
		Do While Not rs.Eof
			'Output Formatting Goes Here
			HTMLString = HTMLString & rs("SearchDescription") & " (<a href=" & rs("URL") & ">Details</a>)<br>"
			rs.MoveNext
		Loop
	End IF
	Response.Write(HTMLString)
End If
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