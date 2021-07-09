<form style="display: inline" action="search.php" method="POST">
  <table border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td class="cart" colspan="3" align="center">
        <p>
          <?php
  if( isset($HTTP_GET_VARS["search_err"]) && $HTTP_GET_VARS["search_err"] == "true" )
    echo "Please enter a search term and select an area of the site.";
  else
    echo "S E A R C H";
?>
        </p>
      </td>
    </tr>
    <tr>
      <td class="cart">
        FOR&nbsp;
        <input
          type="text"
          name="subject"
          size="20"
          maxlength="50"
          title="1. Enter search text here."
        />
      </td>
      <td class="cart">
        &nbsp;IN&nbsp;
        <select
          name="section"
          size="1"
          title="2. Select an area of the site to search."
        >
          <option value="">[choose one:]</option>
          <option value="albums">ALBUMS</option>
          <option value="artists">ARTISTS</option>
          <option value="genres">GENRES</option>
          <option value="news">NEWS</option>
          <option value="shows">SHOWS</option>
          <option value="songs">SONGS</option>
        </select>
      </td>
      <td>
        &nbsp;
        <input
          type="submit"
          class="search"
          name="search"
          value="Search"
          title="3. Click here to start search."
        />
      </td>
    </tr>
  </table>
</form>
