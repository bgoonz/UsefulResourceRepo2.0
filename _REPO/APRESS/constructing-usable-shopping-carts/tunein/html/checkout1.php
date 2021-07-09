<?php
  require_once "../includes/top.inc";
?>
<body>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr> <!--Masthead table row-->
      <td bgcolor="#CCCCCC" width="120" class="tunein">
        <h1>Tune<em class="in">In</em>!</h1>
      </td>
      <td bgcolor="#CCCCCC" align="right">&nbsp;</td>
    </tr>
  </table>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td colspan="2" valign="top">
<!-- CONTENT AREA -->
<?php

if( isset($HTTP_POST_VARS["shipping"]) )
{
  if( isset($HTTP_POST_VARS["ship_type"]) )
  {
    $ship_type = $HTTP_POST_VARS["ship_type"];

    $s_query = "SELECT shipping_type_description,shipping_per_cd_cass,";
    $s_query .= "shipping_per_lp,shipping_per_ticket FROM ";
    $s_query .= "shipping_types WHERE shipping_type_id=$ship_type";
    $s_result = mysql_query($s_query);
    $s_row = mysql_fetch_assoc($s_result);
    $ship_name = $s_row["shipping_type_description"];
    $ship_charge[] = $s_row["shipping_per_cd_cass"];
    $ship_charge[] = $s_row["shipping_per_cd_cass"];
    $ship_charge[] = $s_row["shipping_per_lp"];
    $ship_charge[] = $s_row["shipping_per_ticket"];

    for($i=1;$i<4;$i++)
    {
      $c_query = "SELECT SUM(c.quantity) FROM carts c ";
      $c_query .= "LEFT JOIN product_codes p ";
      $c_query .= "ON c.product_or_event_code=p.product_code_id ";
      $c_query .= "WHERE c.session_id='$s_id' ";
      $c_query .= "AND c.item_type_id=1 AND p.format_id=$i";
      $c_result = mysql_query($c_query);

      $c_count[] = $c_result == NULL ? 0 : mysql_result($c_result,0);
    }

    $c_query = "SELECT SUM(c.quantity) ";
    $c_query .= "FROM carts c WHERE c.session_id='$s_id' ";
    $c_query .= "AND c.item_type_id=2";
    $c_result = mysql_query($c_query);

    $c_count[] = $c_result == NULL ? 0 : mysql_result($c_result,0);

    $s_query = "SELECT SUM(c.quantity * CASE WHEN ISNULL(s.special_percentage) ";
    $s_query .= "OR s.start_date>CURDATE() OR s.end_date<CURDATE() THEN p.product_code_price ";
    $s_query .= "ELSE (100-s.special_percentage)*.01*p.product_code_price END) ";
    $s_query .= "FROM carts c LEFT JOIN specials s ";
    $s_query .= "USING (item_type_id,product_or_event_code) LEFT JOIN product_codes p ";
    $s_query .= "ON c.product_or_event_code=p.product_code_id ";
    $s_query .= "WHERE c.session_id='$s_id' AND c.item_type_id=1";

    $s_result = mysql_query($s_query);
    $s_albums = mysql_result($s_result,0);

    $s_query = "SELECT SUM(c.quantity * CASE WHEN ISNULL(s.special_percentage) ";
    $s_query .= "OR s.start_date>CURDATE() OR s.end_date<CURDATE() THEN e.event_price ";
    $s_query .= "ELSE (100-s.special_percentage)*.01*e.event_price END) ";
    $s_query .= "FROM carts c LEFT JOIN specials s ";
    $s_query .= "USING (item_type_id,product_or_event_code) LEFT JOIN events e ";
    $s_query .= "ON c.product_or_event_code=e.event_id WHERE c.session_id='$s_id' ";
    $s_query .= "AND c.item_type_id=2";

    $s_result = mysql_query($s_query);
    $s_tickets = mysql_result($s_result,0);

    $s_total = $s_albums + $s_tickets;
?>
<p><b>Shipping Method</b>: You chose <?php echo $ship_name; ?>.</p>
<table border="0" cellpadding="2" cellspacing="0" width="95%">
  <tr>
    <th align="left">Item Type</th><th>Quantity</th><th>Shipping per Item</th><th align="right">Shipping Charge</th>
  </tr>
<?php
    $item_types = array("CDs","Cassettes","Vinyl LPs","Tickets");
    $ship_total = 0;
    for($j=0;$j<4;$j++)
    {
      echo "<tr><td class=\"cart\">$item_types[$j]</td>";
      echo "<td class=\"cart\" align=\"center\">$c_count[$j]";
      if($c_count[$j]>5)
      {
        $c_count[$j] = 5;
        echo " (counts as 5)";
      }
      echo "</td><td class=\"cart\" align=\"center\">";
      printf("%.2f",$ship_charge[$j]);
      echo "</td><td class=\"cart\" align=\"right\">";
      $ship_cost[$j] = $ship_charge[$j]*$c_count[$j];
      $ship_total += $ship_cost[$j];
      printf("%.2f",$ship_cost[$j]);
      echo "</td></tr>\n";
    }
    $order_total = $ship_total + $s_total;
?>
  <tr>
    <td colspan="4" align="center"><hr noshade="noshade" /></td>
  </tr>
  <tr>
    <td class="cart" colspan="3" align="right">Shipping Total:</td>
    <td class="cart" align="right">$<?php printf("%.2f",$ship_total); ?></td>
  </tr>
  <tr>
    <td class="cart" colspan="3" align="right">Merchandise Total:</td>
    <td class="cart" align="right">$<?php printf("%.2f",$s_total); ?></td>
  </tr>
  <tr>
    <td colspan="4" align="center"><hr noshade="noshade" /></td>
  </tr>
  <tr>
    <td class="cart" colspan="3" align="right"><b>Order Total:</b></td>
    <td class="cart" align="right"><b>$<?php printf("%.2f",$order_total); ?></b></td>
  </tr>
  <tr>
    <td colspan="2" align="center">
      <form action="checkout2.php" method="POST">
        <p>If everything appears in order, then click here to continue to the address form.</p>
        <input type="submit" class="search" name="addressing" value="Continue" title="Continue to address form." />
        <input type="hidden" name="ship_type" value="<?php echo $ship_type; ?>" />
        <input type="hidden" name="order_total" value="<?php echo $order_total; ?>" />
      </form>
    </td>
    <td colspan="2" align="center">
      <form action="<?php echo $PHP_SELF; ?>" method="GET">
      <p>If you wish to change the shipping method, click here to go back to the previous screen.</p>
        <script type="text/javascript">
          document.writeln("<input type=\"button\" class=\"search\" ");
          document.writeln("name=\"goback\" value=\"Go Back\" ");
          document.writeln("onclick=\"self.location.href='<?php echo $PHP_SELF; ?>';\" ");
          document.writeln("title=\"Back to 'Shipping Options'.\" />");
        </script>
        <noscript><a href="<?php echo $HTTP_REFERER; ?>">Go Back to 'Shipping Options'</a></noscript>
      </form>
    </td>
  </tr>
</table>
<?php
    }   //  end if( isset($HTTP_POST_VARS["ship_type"]) )
    else
      $no_choice = TRUE;
  } //  end if( isset($HTTP_POST_VARS["shipping"]) )
  else
  {
    if( !isset($HTTP_POST_VARS["shipping"]) || $no_choice )
    {
      if($no_choice)
        echo "<p class=\"error\">Please select a shipping type.</p>";
?>
<h2>Step 1: Shipping Options</h2>
<p>Important Information:</p>
<ol>
  <li>Currently we can ship to USA addresses only.</li>
  <li>Shipping is free for any additional items in excess of 5 items of each type.</li>
</ol>
<form action="<?php echo $PHP_SELF; ?>" method="POST">
<table cellpadding="2" cellspacing="0">
<tr>
  <th>Shipping Method</th>
  <th>per <em>Compact Disc</em> or <em>Cassette</em>:</th>
  <th>per <em>Vinyl LP</em>:</th>
  <th>per <em>Event Ticket</em>:</th>
  <th>[choose one:]</th>
</tr>
<?php
      $row_count=0;

      $s_query = "SELECT shipping_type_id,shipping_type_description,shipping_per_cd_cass,shipping_per_lp,";
      $s_query .= "shipping_per_ticket FROM shipping_types ORDER BY shipping_type_id";
      $s_result = mysql_query($s_query);
      while($s_row = mysql_fetch_assoc($s_result))
      {
        $s_type = $s_row["shipping_type_id"];
        $s_descr = $s_row["shipping_type_description"];
        $s_cd = $s_row["shipping_per_cd_cass"];
        $s_lp = $s_row["shipping_per_lp"];
        $s_ticket = $s_row["shipping_per_ticket"];

        echo "<tr bgcolor=\"#" . ($row_count%2==1?"EEEEEE":"999999") . "\">";
        echo "<td class=\"cart\">$s_descr</td>\n";
        echo "<td class=\"cart\" align=\"center\">\$";
        printf("%1.2f",$s_cd);
        echo "</td>\n<td class=\"cart\" align=\"center\">\$";
        printf("%1.2f",$s_lp);
        echo "</td>\n<td class=\"cart\" align=\"center\">\$";
        printf("%1.2f",$s_ticket);
        echo "</td>\n<td align=\"center\"><input type=\"radio\" ";
        echo "name=\"ship_type\" value=\"$s_type\" /></td></tr>\n";

        $row_count++;
      }
    }
?>
<tr>
  <td colspan="3" align="right">Select shipping method:</td>
  <td colspan="2"><input type="submit" name="shipping" value="Submit" class="search" title="Click here to view order total, including shipping." /></td>
</tr>
</table>
</form>
      </td>
      <td valign="top" align="right" width="200">
<?php
    require_once "../includes/short_cart.inc";
  }
?>
      </td>
    </tr>
  </table>
</body>
</html>
