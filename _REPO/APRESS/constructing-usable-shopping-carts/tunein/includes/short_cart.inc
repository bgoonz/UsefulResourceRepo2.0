<!--  SHORT CART DISPLAY  -->

<table border="1" cellspacing="0" cellpadding="0">
  <tr>
    <td bgcolor="#CCCCCC">
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td colspan="2" class="cart" nowrap="nowrap">
            <a href="cart.php" class="cart" title="View or modify your cart">Shopping Cart</a> |
            <a href="checkout.php" class="cart" title="Proceed to checkout">Checkout</a></td>
        </tr>
<?php


  $c_query = "SELECT SUM(c.quantity) ";
  $c_query .= "FROM carts c WHERE c.session_id='$s_id' ";
  $c_query .= "AND c.item_type_id=1";
  $c_result = mysql_query($c_query)
      or die("Server Error: Please <a href=\"$HTTP_REFERER\">try again</a>.");

  $c_albums = mysql_numrows($c_result) == 0 ? " " : mysql_result($c_result,0);

  $c_query = "SELECT SUM(c.quantity) ";
  $c_query .= "FROM carts c WHERE c.session_id='$s_id' ";
  $c_query .= "AND c.item_type_id=2";
  $c_result = mysql_query($c_query)
      or die("Server Error: Please <a href=\"$HTTP_REFERER\">try again</a>.");

  $c_tickets = mysql_numrows($c_result) == 0 ? " " : mysql_result($c_result,0);

  if($c_albums > 0)
  {
    $s_query = "SELECT SUM(c.quantity * p.product_code_price * CASE WHEN ";
    $s_query .= "ISNULL(s.special_percentage) OR s.start_date>CURDATE() OR s.end_date<CURDATE() ";
    $s_query .= "THEN 1 ELSE (100-s.special_percentage)*.01 END) ";
    $s_query .= "FROM carts c LEFT JOIN specials s ON ";
    $s_query .= "(c.item_type_id=s.item_type_id AND ";
    $s_query .= "c.product_code_or_event_id=s.product_group_or_event_id) ";
    $s_query .= "LEFT JOIN product_codes p ON c.product_code_or_event_id=p.product_code_id ";
    $s_query .= "WHERE c.session_id='$s_id' AND c.item_type_id=1";

    $s_result = mysql_query($s_query)
      or die("Server Error: Please <a href=\"$HTTP_REFERER\">try again</a>.");
    $s_albums = mysql_result($s_result,0);
  }

  if($c_tickets > 0)
  {
    $s_query = "SELECT SUM(c.quantity * e.event_price * CASE WHEN ISNULL(s.special_percentage) ";
    $s_query .= "OR s.start_date>CURDATE() OR s.end_date<CURDATE() THEN 1 ";
    $s_query .= "ELSE (100-s.special_percentage)*.01 END) ";
    $s_query .= "FROM carts c LEFT JOIN specials s ";
    $s_query .= "ON (c.item_type_id=s.item_type_id  AND c.product_code_or_event_id=s.product_group_or_event_id) ";
    $s_query .= "LEFT JOIN events e ON c.product_code_or_event_id=e.event_id WHERE c.session_id='$s_id' ";
    $s_query .= "AND c.item_type_id=2";


    $s_result = mysql_query($s_query)
      or die("Server Error: Please <a href=\"$HTTP_REFERER\">try again</a>.");
    $s_tickets = mysql_result($s_result,0);
  }

  $s_total = $s_albums + $s_tickets;
?>

        <tr>
          <td bgcolor="#FFFFFF" align="right" valign="bottom" width="50%" class="cart">
            <?php echo $c_albums; ?> Albums:<br />
            <?php echo $c_tickets; ?> Tickets:
          </td>
          <td bgcolor="#FFFFFF" align="right" valign="bottom" class="cart">
            <?php if($c_albums > 0)
                    echo "\$" . sprintf("%.2f", $s_albums);
                  else
                    echo "[none]"; ?>&nbsp;<br />
            <?php if($c_tickets > 0)
                    echo "\$" . sprintf("%.2f", $s_tickets);
                  else
                    echo "[none]"; ?>&nbsp;
          </td>
        </tr>
        <tr>
          <td colspan="2" bgcolor="#FFFFFF" class="cart"><hr width="100%" noshade="noshade" /></td>
        </tr>
        <tr>
          <td bgcolor="#FFFFFF" width="50%" class="cart" align="right" valign="middle">Total:</td>
          <td bgcolor="#FFFFFF" class="cart" align="right" valign="middle">
            <?php if($c_albums + $c_tickets > 0)
                    echo "\$" . sprintf("%.2f", $s_total);
                  else
                    echo "-0-&nbsp;&nbsp;&nbsp;"; ?>&nbsp;
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>