<h2>Music News:</h2>
<?php
  $n_query = "SELECT news_id,headline FROM news WHERE start_date <= CURDATE() ";
  $n_query .= "AND end_date >= CURDATE() LIMIT $limit";
  $n_result = mysql_query($n_query);
  while($n_row = mysql_fetch_assoc($n_result))
  {
    $n_id = $n_row["news_id"];
    $n_hd = $n_row["headline"];
    echo "<p>$n_hd";
    echo " (<a href=\"news.php?story=$n_id\">Story...</a>)</p>";
  }
?>