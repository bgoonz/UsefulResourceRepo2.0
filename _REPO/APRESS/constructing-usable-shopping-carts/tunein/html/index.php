<?php
  require_once "../includes/top.inc";
?>
<body>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr> <!--Masthead table row-->
      <td bgcolor="#99999" width="150" class="tunein">
        <h1>Tune<em class="in">In</em>!</h1>
      </td>
      <td bgcolor="#CCCCCC" align="right">
<!-- SEARCH -->
<?php
  require_once "../includes/search.inc";
?>
      </td>
    </tr>
  </table>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td valign="top" align="left" width="150" bgcolor="#CCCCCC">
<!-- NAVIGATION -->
<?php
  require_once "../includes/navbar.inc";
?>
      </td>
      <td valign="top">
<!-- CONTENT AREA -->
<table width="100%" border="0">
<tr>
  <td width="50%" valign="top">
<?php
  $limit = 5;
  require_once "../includes/new_releases.inc";
?>
  </td>
  <td width="50%" valign="top">
<?php
  $limit = 5;
  require_once "../includes/shows.inc";
?>
</td></tr><tr><td width="50%" valign="top">
<?php
  $limit = 5;
  require_once "../includes/news_headlines.inc";
?>
</td><td width="50%" valign="top">
<h2>Specials:</h2>
<?php
  $sp_query = "SELECT special_id,short_description FROM specials ";
  $sp_query .= "WHERE start_date <= CURDATE() AND end_date >= CURDATE()";
  $sp_result = mysql_query($sp_query);
  while($sp_row = mysql_fetch_assoc($sp_result))
  {
    $sp_id = $sp_row["special_id"];
    $sp_descr = $sp_row["short_description"];
    echo "<p>$sp_descr (<a href=\"specials.php?special=$sp_id\">Complete Info...</a>)</p>\n";
  }
?>
</td></tr></table>
      </td>
      <td valign="top" align="right" width="200">
<?php
  require_once "../includes/short_cart.inc";
?>
      </td>
    </tr>
  </table>
</body>
</html>
