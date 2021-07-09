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

  if( isset($HTTP_GET_VARS["special"]) )
  {
?>
<h2>A Special Offer From Tune<em>In</em>!...</h2>
<?php
    $special = $HTTP_GET_VARS["special"];

    $s_query = "SELECT s.item_type_id,s.product_group_or_event_id,s.short_description,";
    $s_query .= "s.long_description,s.end_date FROM specials s WHERE special_id=$special";
    $s_result = mysql_query($s_query);
    if( mysql_numrows($s_result) == 0 )
        die("<p>No such special appears to exist.<br />Please click <a href=\"$HTTP_REFERER\">here</a> to continue.</p>");
    $s_row = mysql_fetch_assoc($s_result);

    $s_item = $s_row["item_type_id"];

    switch($s_item)
    {
      case 1:
        $page = "music";
        $product = "album";
        break;
      case 2:
        $page = "events";
        $product = "event";
        break;
      default:
        die("<p>No such special appears to exist.<br />
          Please click <a href=\"$HTTP_REFERER\">here</a> to continue.</p>");
        break;
    }

    $s_code = $s_row["product_group_or_event_id"];
    $s_blurb = stripslashes( $s_row["short_description"] );
    $s_text = stripslashes( $s_row["long_description"] );
    $s_end = date("l, F dS",strtotime($s_row["end_date"]));

    echo "<p>$s_blurb</p>\n";
    echo "<p>$s_text</p>";
    echo "<p>Order now! Offer ends $s_end:<br />";
    echo "Click <a href=\"$page.php?$product=$s_code\">here</a> for order form.</p>";
  }
  else
    echo "<p>No such special appears to exist.<br />
      Please click <a href=\"$HTTP_REFERER\">here</a> to continue.</p>";
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
