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
<table width="100%" border="0">
<?php
  if($update_msg != "")
    echo "<tr><td colspan=\"3\">$update_msg</td></tr>";
?>
<tr><td>
<?php

  if( isset($HTTP_GET_VARS["album"]) || isset($HTTP_POST_VARS["album"]) )
  {
    if( isset($HTTP_GET_VARS["album"]) )
      $album = $HTTP_GET_VARS["album"];
    elseif( isset($HTTP_POST_VARS["album"]) )
      $album = $HTTP_POST_VARS["album"];

    $a_query = "SELECT DISTINCT p.product_group_title,p.genre_id,g.genre_description,p.release_date,";
    $a_query .= "a.artist_name,a.artist_id FROM product_groups p ";
    $a_query .= "LEFT JOIN tracks USING (product_group_id) ";
    $a_query .= "LEFT JOIN artists a USING (artist_id) ";
    $a_query .= "LEFT JOIN genres g ON g.genre_id=p.genre_id ";
    $a_query .= "WHERE p.product_group_id=$album";
    $a_result = mysql_query($a_query);

    $a_row = mysql_fetch_assoc($a_result);
    $a_title = stripslashes( $a_row["product_group_title"] );
    $g_id = $a_row["genre_id"];
    $g_name = stripslashes( $a_row["genre_description"] );
    $a_artist = stripslashes( $a_row["artist_name"] );
    $a_id = $a_row["artist_id"];
    $a_date = strtotime($a_row["release_date"]);

    echo "<h3>$a_artist:<br /><em>$a_title</em></h3><p><b>Tracks</b>:</p><ul>\n";

    $t_query = "SELECT s.song_title FROM songs s LEFT JOIN tracks t USING (song_id)";
    $t_query .= "WHERE t.product_group_id=$album ORDER BY t.track_number ASC";
    $t_result = mysql_query($t_query);

    while($t_row = mysql_fetch_assoc($t_result))
    {
      $t_name = stripslashes( $t_row["song_title"] );
      echo "<li>$t_name</li>\n";
    }
    echo "</ul></td><td>";

    if(time() >= $a_date)
    {
      $s_query = "SELECT s.special_percentage FROM specials s ";
      $s_query .= "WHERE s.product_group_or_event_id=$album ";
      $s_query .= "AND s.start_date<=CURDATE() AND s.end_date>=CURDATE() ";
      $s_query .= "AND s.item_type_id=1";
      $s_result = mysql_query($s_query);
      if(mysql_numrows($s_result) > 0)
      {
        $discount = mysql_result($s_result,0);
        $percentage = 1 - $discount/100;

        echo "<p>Prices shown reflect a <b>$discount% discount</b>.<br />";
        echo "Order today while supplies last!</p>\n";
      }
      else
        $percentage = 1;
?>
  <script type="text/javascript">
    function checkFormat(form)
    {
      var value = false;
      var numFormats = form.cart_item.length;

      for(var i=0; i < numFormats; i++)
      {
        if(form.cart_item[i].checked)
        {
          value = true;
          break;
        }
      }

      if(!value)
        alert("Please select a recording format, then try again.");

      return value;
    }
  </script>
<?php
      $self = $PHP_SELF . "?" . $HTTP_SERVER_VARS["QUERY_STRING"];
      echo "<form action=\"$self\" method=\"POST\" onsubmit=\"return checkFormat(this);\"><p>Available in:<br />";
      $p_query = "SELECT f.format_description,p.product_code_id,";
      $p_query .= "p.product_code_inventory,p.product_code_price ";
      $p_query .= "FROM formats f LEFT JOIN product_codes p ";
      $p_query .= "USING (format_id) WHERE p.product_group_id=$album ";
      $p_query .= "ORDER BY f.format_id ASC";

      $p_result = mysql_query($p_query);
      while($p_row = mysql_fetch_assoc($p_result))
      {
        $p_descr = stripslashes( $p_row["format_description"] );
        $p_id = $p_row["product_code_id"];
        $p_amt = $p_row["product_code_inventory"];
        $p_price = $p_row["product_code_price"] * $percentage;

        echo "$p_descr -- ";
        if($p_amt > 0)
        {
          echo "\$";
          printf("%.2f",$p_price);
          echo " <input type=\"radio\" name=\"cart_item\" class=\"format\" value=\"$p_id\" />\n";
        }
        else
          echo "*OUT OF STOCK*";
        echo "<br />\n";
      }
      echo "<input type=\"hidden\" name=\"item_quantity\" value=\"1\" />\n";
      echo "<input type=\"hidden\" name=\"item_type\" value=\"1\" />\n";
      echo "<input type=\"hidden\" name=\"album\" value=\"$album\" />\n";
      echo "<input type=\"submit\" class=\"addCart\" name=\"add_cart\" value=\"Add To Cart\"></p></form>\n";
    }
    else
    {
      $r_date = date("F jS, Y",$a_date);
      echo "<p>This album will be available $r_date.</p>";
    }

    echo "<p>(More music from <a href=\"music.php?artist=$a_id\">$a_artist</a>)</p>\n";
    echo "<p>(Upcoming <a href=\"events.php?artist=$a_id\">$a_artist shows</a>)</p>\n";
    echo "<p>(<a href=\"news.php?artist=$a_id\">$a_artist</a> in the news)</p>\n";
    echo "<p>(More <a href=\"music.php?genre=$g_id\">$g_name</a> music)</p>\n";
  }
  else
  {
    if( isset($HTTP_GET_VARS["artist"]) )
    {
      $a_id = $HTTP_GET_VARS["artist"];

      $a_query = "SELECT artist_name FROM artists WHERE artist_id=$a_id";
      $a_result = mysql_query($a_query);
      $a_name = stripslashes (mysql_result($a_result,0) );

      echo "<h3>Albums by <em>$a_name</em>:</h3>\n";

      $p_query = "SELECT DISTINCT t.product_group_id,p.product_group_title ";
      $p_query .= "FROM tracks t LEFT JOIN product_groups p USING (product_group_id) ";
      $p_query .= "WHERE t.artist_id=$a_id";
      $p_result = mysql_query($p_query);
      while($p_row = mysql_fetch_assoc($p_result))
      {
        $p_id = $p_row["product_group_id"];
        $p_title = stripslashes( $p_row["product_group_title"] );
        echo "<p>$p_title (<a href=\"music.php?album=$p_id\">Info</a>)</p>\n";
      }
    }
    else
    {
      if( isset($HTTP_GET_VARS["genre"]) )
      {
        $items_per_page = 5;

        $genre = $HTTP_GET_VARS["genre"];
        $g_query = "SELECT genre_description FROM genres WHERE genre_id=$genre";
        $g_result = mysql_query($g_query);
        $g_name = stripslashes (mysql_result($g_result,0) );

        echo "<h3>$g_name Albums:</h3>\n";

        $c_query = "SELECT COUNT(*) AS pcount FROM product_groups WHERE genre_id=$genre";
        $c_result = mysql_query($c_query);
        $p_count = mysql_result($c_result,0);

        $p_query = "SELECT product_group_id,product_group_title FROM product_groups ";
        $p_query .= "WHERE genre_id=$genre ";

        $p_query .= "ORDER BY product_group_id LIMIT ";
        if( isset($HTTP_GET_VARS["page"]) )
        {
          $page = $HTTP_GET_VARS["page"];
          $p_query .= "$page,";
        }
        $p_query .= $items_per_page;
        $p_result = mysql_query($p_query);
        while($p_row = mysql_fetch_assoc($p_result))
        {
          $p_id = $p_row["product_group_id"];
          $p_title = stripslashes( $p_row["product_group_title"] );

          $a_query = "SELECT a.artist_name FROM artists a ";
          $a_query .= "LEFT JOIN tracks t USING (artist_id) ";
          $a_query .= "WHERE t.product_group_id=$p_id LIMIT 1";
          $a_result = mysql_query($a_query);
          $artist = stripslashes( mysql_result($a_result,0) );

          echo "<p>$artist: <em>$p_title</em> (<a href=\"music.php?album=$p_id\">Info</a>)</p><p>\n";
        }
        if( $page >= $items_per_page)
        {
          echo "(<a href=\"music.php?genre=$genre&amp;page=";
          echo ($page - $items_per_page);
          echo "\">Previous $g_name Albums...</a>) ";
        }
        $page += $items_per_page;
        if($page < $p_count)
          echo "(<a href=\"music.php?genre=$genre&amp;page=$page\">More $g_name Albums...</a>)</p>\n";
      }
      else
      {
        $limit = 10;
        require_once "../includes/new_releases.inc";
  ?></td><td valign="top">
  <h2>Upcoming Releases:</h2>
  <?php
      $r_query = "SELECT product_group_id,product_group_title,release_date FROM product_groups ";
      $r_query .= "WHERE release_date > CURDATE() ORDER BY release_date ASC LIMIT 5";
      $r_result = mysql_query($r_query);
      while($r_row = mysql_fetch_assoc($r_result))
      {
        $p_id = $r_row["product_group_id"];

        $a_query = "SELECT a.artist_name FROM artists a ";
        $a_query .= "LEFT JOIN tracks t USING (artist_id) ";
        $a_query .= "WHERE t.product_group_id=$p_id LIMIT 1";
        $a_result = mysql_query($a_query);
        $artist = stripslashes( mysql_result($a_result,0) );

        $r_title = $r_row["product_group_title"];
        $r_date = date("F jS",strtotime($r_row["release_date"]));
        echo "<p><b>$artist</b> -- <em>$r_title</em> $r_date ";
        echo"(<a href=\"music.php?album=$p_id\">More Info...</a>)</p>\n";
      }
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
