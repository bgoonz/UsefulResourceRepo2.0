<h2>New Releases:</h2>
<?php
  $r_query = "SELECT DISTINCT a.artist_name,p.product_group_title,p.release_date,p.product_group_id ";
  $r_query .= "FROM product_groups p LEFT JOIN tracks t USING (product_group_id) ";
  $r_query .= "LEFT JOIN artists a USING (artist_id) WHERE p.release_date <= CURDATE() ";
  $r_query .= "ORDER BY p.release_date DESC LIMIT $limit";
  $r_result = mysql_query($r_query);
  while($r_row = mysql_fetch_assoc($r_result))
  {
    $p_id = $r_row["product_group_id"];
    $r_title = $r_row["product_group_title"];
    $r_date = date("F jS",strtotime($r_row["release_date"]));
    $a_name = $r_row["artist_name"];
    echo "<p><b>$a_name</b> -- <em>$r_title</em> $r_date ";
    echo "(<a href=\"music.php?album=$p_id\">More Info...</a>)</p>\n";
  }
?>