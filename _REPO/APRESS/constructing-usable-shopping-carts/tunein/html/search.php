<?php
  require_once "../includes/db.inc";
  require_once "../includes/cart_session.inc";
  require_once "../includes/location.inc";

  function go_err()
  {
    global $HTTP_REFERER;

    if( strpos($HTTP_REFERER,"?") === FALSE )
      $join = "?";
    else
      $join = "&";

    $err_flag = $join . "search_err=true";

    header("Location: $HTTP_REFERER$err_flag");
    exit;
  }

  if( isset($HTTP_POST_VARS["search"]) )
  {
    if( isset($HTTP_POST_VARS["subject"]) && isset($HTTP_POST_VARS["section"]) )
    {
      $subject = $HTTP_POST_VARS["subject"];
      $section = $HTTP_POST_VARS["section"];

      $illegal_chars = "/[^a-z0-9 ]/i";
      $nonspace = "/\S/";

      $subject = preg_replace($illegal_chars,"",$subject);
      if( !preg_match($nonspace,$subject) )
        go_err();


      $output = "<h2>Search Results:</h2>";

      switch($section)
      {
        case "albums":
          $query = "SELECT DISTINCT p.product_group_id,p.product_group_title,a.artist_name FROM product_groups p ";
          $query .= "LEFT JOIN tracks USING (product_group_id) LEFT JOIN artists a USING (artist_id)";
          $query .= "WHERE product_group_title LIKE '%$subject%' AND release_date<=CURDATE()";
          $query .= "ORDER BY product_group_title ASC";

          $output .= "<h3>Albums matching '$subject'</h3>";
          break;

        case "artists":
          $query = "SELECT artist_id,artist_name FROM artists ";
          $query .= "WHERE artist_name LIKE '%$subject%' ORDER BY artist_name ASC";

          $output .= "<h3>Artists matching \"$subject\"</h3>";
          break;

        case "genres":
          $query = "SELECT genre_id,genre_description FROM genres ";
          $query .= "WHERE genre_description LIKE '%$subject%' ORDER BY genre_description ASC";

          $output .= "<h3>Genres matching \"$subject\"</h3>";
          break;

        case "news":
          $query = "SELECT news_id,headline FROM news ";
          $query .= "WHERE headline LIKE '%$subject%' OR body LIKE '%$subject%' ";
          $query .= "AND start_date <= CURDATE() AND end_date >=CURDATE() ORDER BY headline ASC";

          $output .= "<h3>News stories matching \"$subject\"</h3>";
          break;

        case "shows":
          $query = "SELECT DISTINCT e.event_id,e.event_name,v.venue_city,e.event_datetime,a.artist_name ";
          $query .= "FROM events e LEFT JOIN venues v USING (venue_id) ";
          $query .= "LEFT JOIN artists_events r ON e.event_id=r.event_id ";
          $query .= "LEFT JOIN artists a USING (artist_id) ";
          $query .= "WHERE e.event_name LIKE '%$subject%' OR a.artist_name LIKE '%$subject%' ";
          $query .= "AND e.event_datetime>NOW() ORDER BY e.event_datetime ASC";

          $output .= "<h3>Events matching \"$subject\"</h3>";
          break;

        case "songs":
          $query = "SELECT s.song_title,p.product_group_id,p.product_group_title,a.artist_name ";
          $query .= "FROM songs s LEFT JOIN tracks t USING (song_id) ";
          $query .= "LEFT JOIN product_groups p USING (product_group_id) ";
          $query .= "LEFT JOIN artists a ON a.artist_id=t.artist_id ";
          $query .= "WHERE s.song_title LIKE '%$subject%' ORDER BY s.song_title ASC";

          $output .= "<h3>Songs matching \"$subject\"</h3>";
          break;

        default:
          go_err();
      }

      $result = mysql_query($query);

      if( mysql_num_rows($result) == 0 )
      {
        $output = "Sorry, no matches were found for \"$subject\" under " . strtoupper($section) . ".<br />";
        $output .= "Please try again.";
      }
      else
      {
        while( $row = mysql_fetch_array($result) )
        {
          switch($section)
          {
            case "albums":
              $id = $row["product_group_id"];
              $title = stripslashes( $row["product_group_title"] );
              $artist = $row["artist_name"];

              $output .= "<p><b>$title</b> ($artist) -- <a href=\"music.php?album=$id\">";
              $output .= "Details</a></p>\n";
              break;

            case "artists":
              $id = ".php?artist=" . $row["artist_id"];
              $name = $row["artist_name"];

              $output .= "<p><b>$name</b> -- <a href=\"music$id\">Albums</a> ";
              $output .= "-- <a href=\"events$id\">Shows</a> -- <a href=\"news$id\">News</a></p>\n";
              break;

            case "genres":
              $id = ".php?genre=" . $row["genre_id"];
              $name = $row["genre_description"];

              $output .= "<p><b>$name</b> -- <a href=\"music$id\">Albums</a> ";
              $output .= "-- <a href=\"events$id\">Shows</a> -- <a href=\"news$id\">News</a></p>\n";
              break;

            case "news":
              $id = $row["news_id"];
              $headline = stripslashes( $row["headline"] );

              $output .= "<p><b>$headline</b> -- <a href=\"news.php?story=$id\">Story</a></p>";
              break;

            case "shows":
              $id = $row["event_id"];
              $event = $row["event_name"];
              $artist = $row["artist_name"];

              $datetime = strtotime($row["event_datetime"]);
              $datetime = date("l, F jS, Y / g:i A",$datetime);

              $city = $row["venue_city"];

              $output .= "<p>$event (featuring $artist) -- $city, $datetime -- ";
              $output .= "<a href=\"events.php?event=$id\">Details</a></p>";
              break;

            case "songs":
              $song = stripslashes( $row["song_title"] );
              $id = $row["product_group_id"];
              $album = stripslashes( $row["product_group_title"] );
              $artist = $row["artist_name"];

              $output .= "<p><b>$song</b> -- from the album <em>$album</em> by ";
              $output .= "<em>$artist</em> -- <a href=\"music.php?album=$id\">Album Details</a></p>";
              break;

            default:
              go_err();
          }
        }
      }
    }
    else
    {
      go_err();
    }
  }
  else
    go_err();

?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
  <title>TuneIn - Search Results</title>
  <link rel="stylesheet" href="../styles/tunein.css" type="text/css">
</head>
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
<?php
  echo $output;
?>
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
