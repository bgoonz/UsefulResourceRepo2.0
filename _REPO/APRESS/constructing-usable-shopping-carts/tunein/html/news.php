<?php
  require_once "../includes/top.inc";
?>
<body>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr> <!--Masthead table row-->
      <td bgcolor="#CCCCCC" width="150" class="tunein">
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
<table border="0" width="100%"><tr><td>
<?php
if( isset($HTTP_GET_VARS["story"]) )
{
  $story = $HTTP_GET_VARS["story"];
  $s_query = "SELECT n.headline,n.body,a.artist_id,a.artist_name,g.genre_id,g.genre_description ";
  $s_query .= "FROM tunein.news n LEFT JOIN tunein.artists a ";
  $s_query .= "USING (artist_id) LEFT JOIN tunein.genres g ";
  $s_query .= "ON (g.genre_id=n.genre_id) WHERE n.news_id=$story";
  $s_result = mysql_query($s_query);
  $s_row = mysql_fetch_assoc($s_result);

  $s_headline = stripslashes( $s_row["headline"] );
  $s_body = stripslashes( $s_row["body"] );

  echo "<h3>$s_headline</h3>\n";
  echo "<p>$s_body</p>\n";

  if( !is_null($s_row["artist_id"]) )
  {
    $a_id = $s_row["artist_id"];
    $a_name = stripslashes( $s_row["artist_name"] );
    echo "<p>(More <a href=\"news.php?artist=$a_id\">$a_name</a> in the news)</p>";
    echo "<p>(Music by <a href=\"music.php?artist=$a_id\">$a_name</a>)</p>\n";
    echo "<p>(Upcoming <a href=\"events.php?artist=$a_id\">$a_name</a> shows)</p>\n";
  }

  if( !is_null($s_row["genre_id"]) )
  {
    $g_id = $s_row["genre_id"];
    $g_name = $s_row["genre_description"];
    echo "<p>(More <a href=\"news.php?genre=$g_id\">$g_name</a> artists in the news)</p>";
  }
}
else
{
  if( isset($HTTP_GET_VARS["artist"]) )
  {
    $artist = $HTTP_GET_VARS["artist"];
    $n_query = "SELECT news_id,headline FROM news WHERE start_date <= CURDATE() ";
    $n_query .= "AND end_date >= CURDATE() AND artist_id=$artist";
    $n_result = mysql_query($n_query);
    while($n_row = mysql_fetch_assoc($n_result))
    {
      $n_id = stripslashes( $n_row["news_id"] );
      $n_hd = stripslashes( $n_row["headline"] );
      echo "<p>$n_hd";
      echo " (<a href=\"news.php?story=$n_id\">Story...</a>)</p>";
    }
  }
  else
  {
    if( isset($HTTP_GET_VARS["genre"]) )
    {
      $genre = $HTTP_GET_VARS["genre"];
      $n_query = "SELECT g.genre_description,n.news_id,n.headline FROM genres g,news n ";
      $n_query .= "WHERE g.genre_id=$genre AND n.genre_id=$genre ";
      $n_query .= "AND n.start_date <= CURDATE() AND n.end_date >= CURDATE()";
      $n_result = mysql_query($n_query);
      while($n_row = mysql_fetch_assoc($n_result))
      {
        if( !isset($g_name) )
        {
          $g_name = $n_row["genre_description"];
          echo "<h3>$g_name Artists In The News...</h3>\n";
        }
        $n_id = $n_row["news_id"];
        $n_hd = stripslashes( $n_row["headline"] );
        echo "<p>$n_hd";
        echo " (<a href=\"news.php?story=$n_id\">Story...</a>)</p>";
      }
    }
    else
    {
      $limit = 10;
      require_once "../includes/news_headlines.inc";
    }
  }
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
