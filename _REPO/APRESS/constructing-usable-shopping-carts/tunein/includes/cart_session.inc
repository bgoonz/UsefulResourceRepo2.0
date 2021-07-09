<?php
  session_start();

  $s_id = session_id();

//  add item to cart

  $update_msg = "";

  if( isset($HTTP_POST_VARS["add_cart"]) )
  {
    $p_type = $HTTP_POST_VARS["item_type"];
    $p_code = $HTTP_POST_VARS["cart_item"];
    $p_quantity = $HTTP_POST_VARS["item_quantity"];

    if($p_code < 1)
      $update_msg = "<h3>*Please select a format, and try again.*</h3>";
    else
    {
      if($p_quantity < 1)
        $update_msg = "<h3>*Please enter a valid quantity, and try again.*</h3>";
      else
      {
        $i_query = "";
        switch($p_type)
        {
          case 1:
            $i_query = "SELECT product_code_inventory FROM product_codes ";
            $i_query .= "WHERE product_code_id = $p_code";
            $p_description = "copies of the album in this format";
            break;

          case 2:
            $i_query = "SELECT (v.capacity-e.event_seats_sold) FROM events e ";
            $i_query .= "LEFT JOIN venues v USING (venue_id) WHERE e.event_id=$p_code";
            $p_description = "tickets to this show";
            break;

          default:
            $update_msg = "<h3>Server Error: Unable to add item to cart.</h3>";
            $update_msg .= "<p>Please <a href=\"$HTTP_REFERER\">try again</a>, or contact our ";
            $update_msg .= "<a href=\"mailto:webmaster@tunein.site\">webmaster</a> if the problem persists.</p>";
            break;
        }

        if($i_query != "")
        {
          $i_result = mysql_query($i_query);
          $i_avail = mysql_result($i_result,0);

          if($i_avail < $p_quantity)
          {
            $update_msg = "<h3>*Insufficient inventory to meet request.*</h3>";
            $update_msg .= "<p>(There are currently $i_avail $p_description in stock.)</p>";
          }
          else
          {
            $a_query = "INSERT INTO carts (session_id,item_type_id,product_code_or_event_id,quantity) ";
            $a_query .= "VALUES ('$s_id','$p_type','$p_code','$p_quantity')";
            $a_result = mysql_query($a_query)
              or die("<h3>*Error: Failed to add item to cart.*</h3>
                        <p>Please <a href=\"$HTTP_REFERER\">try again</a>, or contact our
                          <a href=\"mailto:webmaster@tunein.site\">webmaster</a> if the problem persists.</p>");
            //  or die("<p>Failed to add item to cart. <b>" . mysql_errno() . ": " . mysql_error() . "</b>.</p>");
            $update_msg = "<h3>*Item added to cart.*</h3>";
          } //  end else
        } //  end if($i_query !="")
      } //  end else
    } //  end else
  } // end if( isset($HTTP_POST_VARS["add_cart"]) )
?>
