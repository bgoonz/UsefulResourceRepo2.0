<h2>Upcoming Shows:</h2>
<?php
  $e_query = "SELECT e.event_id,e.event_name,e.event_datetime,e.venue_id,v.venue_city ";
  $e_query .= "FROM events e LEFT JOIN venues v USING (venue_id) ";
  $e_query .= "WHERE e.event_datetime > NOW() ORDER BY e.event_datetime LIMIT $limit";
  $e_result = mysql_query($e_query);
  while($e_row = mysql_fetch_assoc($e_result))
  {
    $e_id = $e_row["event_id"];
    $e_name = $e_row["event_name"];
    $e_dt = date("l, F dS",strtotime($e_row["event_datetime"]));
    $e_city = $e_row["venue_city"];

    echo "<p><b>$e_name</b> featuring <em>";

    $a_query = "SELECT a.artist_name FROM artists a LEFT JOIN artists_events e ";
    $a_query .= "USING (artist_id) WHERE e.event_id=$e_id";
    $a_result = mysql_query($a_query);
    $a_num_rows = mysql_numrows($a_result);
    $a_count = 1;
    while($a_row = mysql_fetch_assoc($a_result))
    {
      echo $a_row["artist_name"];
      if($a_count < $a_num_rows)
        echo ", ";
      $a_count++;
    }

    echo "</em> -- $e_city, $e_dt. (<a href=\"events.php?event=$e_id\">Details...</a>)</p>\n";
  }
?>