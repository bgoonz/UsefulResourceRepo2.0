<form style="display:inline" action="search.php" method="POST">
<table>
  <tr>
    <td align="right" class="cart">S E A R C H --></td>
    <td align="center" class="cart">FOR:<br />
      <select name="s_artist" size="1">
        <option value="">[artist name:]</option>
<?php
  $s_query = "SELECT DISTINCT artist_name,artist_id FROM artists ORDER BY artist_name ASC";
  $s_result = mysql_query($s_query);
  while($s_row = mysql_fetch_assoc($s_result))
  {
    $a_name = $s_row["artist_name"];
    $a_id = $s_row["artist_id"];

    echo "<option value=\"$a_id\">$a_name</option>\n";
  }

?>

      </select>
    </td>
    <td align="center" class="cart">IN:<br />
      <select name="s_product" size="1">
          <option value="">[choose one:]</option>
          <option value="music">MUSIC</option>
          <option value="events">SHOWS</option>
          <option value="news">NEWS</option>
<!--      <option value="posters">POSTERS</option>  -->
        </select>
    </td>
    <td align="center" valign="bottom">
      <input type="submit" class="search" name="search" value="Search" title="Click here to start search" />
    </td>
  </tr>
</table>
</form>