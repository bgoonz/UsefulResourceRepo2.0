<?php
  //  check for updates/deletes

  $update_msg = "";

  if( isset($HTTP_POST_VARS["quantity"]) )
    $quantity = intval( $HTTP_POST_VARS["quantity"] );
  else
    $quantity = 0;

  if( isset($HTTP_POST_VARS["item"]) )
    $item = $HTTP_POST_VARS["item"];

  if( isset($HTTP_POST_VARS["code"]) )
    $code = $HTTP_POST_VARS["code"];

  $update = isset($HTTP_POST_VARS["update"]) && $quantity > 0;
  $delete = isset($HTTP_POST_VARS["delete"]);

  if( $update )
  {
    $p_query = "SELECT item_type_id FROM carts WHERE cart_id=$item";
    $p_result = mysql_query($p_query)
      or die("<h3>*Server Error: Unable to update cart.*</h3>
                <p>Please <a href=\"$HTTP_REFERER\">try again</a>, or contact our
                <a href=\"mailto:webmaster@tunein.site\">webmaster</a> if the problem persists.</p>");
    $p_type = mysql_result($p_result,0);

    $i_query = "";

    switch($p_type)
    {
      case 1:
        $i_query = "SELECT product_code_inventory FROM product_codes ";
        $i_query .= "WHERE product_code_id = $code";
        $p_description = "copies of the album in this format";
        break;

      case 2:
        $i_query = "SELECT (v.capacity-e.event_seats_sold) FROM events e ";
        $i_query .= "LEFT JOIN venues v USING (venue_id) WHERE e.event_id=$code";
        $p_description = "tickets to this show";
        break;

      default:
        $update_msg = "<h3>*Server Error: Unable to update cart.*</h3>";
        $update_msg .= "<p>Please <a href=\"$HTTP_REFERER\">try again</a>, or contact our ";
        $update_msg .= "<a href=\"mailto:webmaster@tunein.site\">webmaster</a> if the problem persists.</p>";
        break;
    }

    if($i_query != "")
    {
      $i_result = mysql_query($i_query);
      $i_avail = mysql_result($i_result,0);

      if($i_avail < $quantity)
      {
        $update_msg = "<h3>*Insufficient inventory to meet request.*</h3>";
        $update_msg .= "<p>(There are currently $i_avail $p_description in stock.)</p>";
      }
      else
      {
        $u_query = "UPDATE carts SET quantity=$quantity WHERE cart_id=$item";
        $u_result = mysql_query($u_query)
          or die("<h3>*Error: Unable to update cart.*</h3>
                    <p>Please <a href=\"$HTTP_REFERER\">try again</a>, or contact our
                          <a href=\"mailto:webmaster@tunein.site\">webmaster</a> if the problem persists.</p>");
        $update_msg = "<h3>*Quantity changed -- Cart updated.*</h3>";
      }
    }
    else
      $update_msg = "<h3>*Error: Unable to update cart.*</h3>
                    <p>Please <a href=\"$HTTP_REFERER\">try again</a>, or contact our
                          <a href=\"mailto:webmaster@tunein.site\">webmaster</a> if the problem persists.</p>";
  }
  else
  {
    if( $delete || ($update && $quantity <= 0) )
    {
      $d_query = "DELETE FROM carts WHERE cart_id=$item";
      $d_result = mysql_query($d_query)
        or die("<h3>*Error: Unable to delete item.*</h3>
                  <p>Please <a href=\"$HTTP_REFERER\">try again</a>, or contact our
                        <a href=\"mailto:webmaster@tunein.site\">webmaster</a> if the problem persists.</p>");
      $update_msg = "<h3>*Item deleted -- Cart updated.*</h3>";
    }
  }
?>