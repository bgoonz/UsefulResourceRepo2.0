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
<?php
  if($update_msg != "")
    echo $update_msg;

  if( isset($HTTP_GET_VARS["event"]) || isset($HTTP_POST_VARS["cart_item"]) )
  {
    if( isset($HTTP_GET_VARS["event"]) )
      $event = $HTTP_GET_VARS["event"];
    elseif( isset($HTTP_POST_VARS["cart_item"]) )
      $event = $HTTP_POST_VARS["cart_item"];

    $e_query = "SELECT e.event_name,e.event_datetime,e.event_price,e.event_seats_sold,v.venue_name,";
    $e_query .= "v.capacity,v.venue_street_1,v.venue_street_2,v.venue_city,t.state_code,";
    $e_query .= "y.seating_type_description FROM events e ";
    $e_query .= "LEFT JOIN venues v USING (venue_id) ";
    $e_query .= "LEFT JOIN states t USING (state_id) ";
    $e_query .= "LEFT JOIN seating_types y ON y.seating_type_id=v.seating_type_id ";
    $e_query .= "WHERE event_id=$event";
    $e_result = mysql_query($e_query);
    $e_row = mysql_fetch_assoc($e_result);

    $e_name = stripslashes( $e_row["event_name"] );
    $e_datetime = strtotime($e_row["event_datetime"]);
    $e_datetime = date("l, F jS, Y; g:i A",$e_datetime);

    $e_price = $e_row["event_price"];
    $v_name = stripslashes( $e_row["venue_name"] );

    $v_street = $e_row["venue_street_1"];
    if( !is_null($e_row["venue_street_2"]) )
      $v_street .= " " . $e_row["venue_street_2"];

    $v_city = $e_row["venue_city"];
    $v_state = $e_row["state_code"];

    $v_capacity = $e_row["capacity"];
    $e_sold = $e_row["event_seats_sold"];
    $sold_out = $v_capacity == $e_sold;

    $v_seat_type = $e_row["seating_type_description"];

    echo "<h2>$e_name</h2><p><em>$v_name, $v_street, $v_city, $v_state</em><br />";
    echo "<b>$e_datetime</b></p>";

    echo "<p><b>Featured artists:</b><br />";

    $a_query = "SELECT a.artist_name,a.artist_id ";
    $a_query .= "FROM artists a ";
    $a_query .= "LEFT JOIN artists_events e ";
    $a_query .= "USING (artist_id) WHERE e.event_id=$event";
    $a_result = mysql_query($a_query);
    $a_num_rows = mysql_numrows($a_result);
    $a_count = 1;
    while($a_row = mysql_fetch_assoc($a_result))
    {
      $a_name = stripslashes( $a_row["artist_name"] );
      $a_id = $a_row["artist_id"];
      echo "$a_name (<a href=\"events.php?artist=$a_id\">More $a_name shows</a>) ";
      echo "(<a href=\"music.php?artist=$a_id\">Music by $a_name</a>) ";
      echo"(<a href=\"news.php?artist=$a_id\">$a_name in the news</a>)";
      if($a_count < $a_num_rows)
        echo "<br />\n";
      $a_count++;
    }
    echo "</p>";

    if($sold_out)
      echo "<p>*SOLD OUT*</p>";
    else
    {
      $s_query = "SELECT s.special_percentage FROM specials s ";
      $s_query .= "WHERE s.product_group_or_event_id=$event ";
      $s_query .= "AND s.start_date<=CURDATE() AND s.end_date>=CURDATE() ";
      $s_query .= "AND s.item_type_id=2";
      $s_result = mysql_query($s_query);
      if(mysql_numrows($s_result) > 0)
      {
        $discount = mysql_result($s_result,0);
        $percentage = 1 - $discount/100;

        $e_price *= $percentage;
        echo "<p>Price shown reflects a limited-time <b>$discount% discount</b>...<br />";
        echo "Good seats are still available, but they're going fast -- Order today!</p>\n";
      }
      else
        $percentage = 1;

      echo "<p>Seating: $v_seat_type; Price: \$";
      printf("%.2f",$e_price);
?>
  <script type="text/javascript">
    function checkQuant(form)
    {
      var value = true;
      var numSeats = form.item_quantity.value;
      var notInt = /\D/g;

      if(notInt.test(numSeats) || numSeats < 1)
      {
        alert("Not a valid quantity. Please enter a number greater than zero, and try again.");
        form.item_quantity.focus();
        value = false;
      }

      return value;
    }
  </script>
<?php
      $self = $PHP_SELF . "?" . $HTTP_SERVER_VARS["QUERY_STRING"];
      echo "</p><form action=\"$self\" method=\"POST\" onsubmit=\"return checkQuant(this);\">\n";
      echo "<p>Number of seats: <input type=\"text\" size=\"2\" name=\"item_quantity\" value=\"1\" />\n";
      echo "<input type=\"hidden\" name=\"cart_item\" value=\"$event\" />";
      echo "<input type=\"hidden\" name=\"item_type\" value=\"2\" />";
      echo "<input type=\"submit\" class=\"addCart\" name=\"add_cart\" value=\"Add to Cart\" /></p>\n</form>\n";
    }
  }
  else
  {
    if( isset($HTTP_GET_VARS["artist"]) )
    {
      $artist = $HTTP_GET_VARS["artist"];

      $a_query = "SELECT artist_name FROM artists WHERE artist_id=$artist";
      $a_result = mysql_query($a_query);
      $a_name = mysql_result($a_result,0);

      echo "<h3>Upcoming appearances by <em>$a_name:</em></h3>\n";

      $e_query = "SELECT a.event_id,e.event_datetime,v.venue_name,v.venue_city,s.state_code ";
      $e_query .= "FROM tunein.artists_events a LEFT JOIN tunein.events e ";
      $e_query .= "USING (event_id) LEFT JOIN tunein.venues v ";
      $e_query .= "USING (venue_id) LEFT JOIN tunein.states s ";
      $e_query .= "USING (state_id) WHERE a.artist_id=$artist ";
      $e_query .= "AND e.event_datetime >= CURDATE() ORDER BY e.event_datetime ASC";
      $e_result = mysql_query($e_query);

      if( mysql_numrows($e_result) == 0 )
        echo "<p>No shows featuring this artist are currently scheduled.</p>";

      while($e_row = mysql_fetch_assoc($e_result))
      {
        $e_id = $e_row["event_id"];
        $e_date = date("l, F jS",strtotime($e_row["event_datetime"]));

        $v_name = stripslashes( $e_row["venue_name"] );
        $v_city = $e_row["venue_city"];
        $v_state = $e_row["state_code"];

        echo "<p>$e_date: $v_name, $v_city, $v_state (<a href=\"events.php?event=$e_id\">More info...</a>)</p>";
      }
    }
    else
    {
      $limit = 10;
      require_once "../includes/shows.inc";
    }
  }
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
