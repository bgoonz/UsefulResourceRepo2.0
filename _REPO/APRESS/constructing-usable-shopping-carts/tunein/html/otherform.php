<?php
  require_once "../includes/top_checkout.inc";
?>
<body>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr> <!--Masthead table row-->
      <td bgcolor="#CCCCCC" width="150" class="tunein">
        <h1>Tune<em class="in">In</em>!</h1>
      </td>
      <td bgcolor="#CCCCCC" align="right">&nbsp;</td>
    </tr>
  </table>
  <table width="90%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td valign="top">
<!-- CONTENT AREA -->

<?php

  $s_id = $HTTP_POST_VARS["s_id"];

  $s_query = "SELECT c.customer_email,c.customer_first_name,c.customer_last_name,";
  $s_query .= "c.customer_street_1,c.customer_street_2,c.customer_city,c.customer_zip,";
  $s_query .= "c.customer_phone,s.state_code FROM customers c LEFT JOIN states s ";
  $s_query .= "USING (state_id) WHERE c.customer_session_id='$s_id'";

  echo "<p>$s_query</p>";

  $s_result = mysql_query($s_query);
  $s_row = mysql_fetch_array($s_result);

  $email = $s_row["customer_email"];
  $first_name = $s_row["customer_first_name"];
  $last_name = $s_row["customer_last_name"];
  $street1 = $s_row["customer_street_1"];
  $street2 = $s_row["customer_street_2"];
  $city = $s_row["customer_city"];
  $zip = $s_row["customer_zip"];
  $phone = $s_row["customer_phone"];
  $state = $s_row["state_code"];
?>

<p><b>Name:</b> <?php echo "$first_name $last_name."; ?></p>
<p><b> Street Address:</b> <?php echo "$street_1". is_null($street_2)?"":"<br />$street_2" . "<br />$city, $state $zip."; ?></p>
<p><b>Telephone Number:</b> <?php echo "$phone."; ?></p>
<p><b>Email Address</b> <?php echo "$email."; ?></p>
<p><b>Reference Number: </b><?php echo "$s_id." ?></p>

<table border="0" width="80%" cellpadding="1" cellspacing="0">
  <tr>
    <th>QUANTITY</th><th>DESCRIPTION</th><th>UNIT PRICE</th><th>AMOUNT</th>
  </tr>
<?php
  //  album detail...

  $a_query = "SELECT c.cart_id,c.quantity,pg.product_group_title,f.format_description,pc.product_code_price ";
  $a_query .= "* CASE WHEN ISNULL(s.special_percentage) OR s.start_date>CURDATE() OR s.end_date<CURDATE() ";
  $a_query .= "THEN 1 ELSE (100-s.special_percentage)*.01 END AS price FROM product_codes pc ";
  $a_query .= "LEFT JOIN product_groups pg USING (product_group_id) ";
  $a_query .= "LEFT JOIN formats f ON f.format_id=pc.format_id ";
  $a_query .= "LEFT JOIN carts c ON pc.product_code_id=c.product_code_or_event_id ";
  $a_query .= "LEFT JOIN specials s ON pg.product_group_id=s.product_group_or_event_id ";
  $a_query .= "WHERE c.session_id='$s_id' AND c.item_type_id=1";
  $a_result = mysql_query($a_query);

  echo "<p>$a_query</p>";

  $albums = 0;
  $album_total = 0;
  $line = 0;

  if(mysql_num_rows($a_result) > 0)
  {
    while($a_row = mysql_fetch_assoc($a_result))
    {
      $c_id = $a_row["cart_id"];
      $quantity = $a_row["quantity"];
      $price = $a_row["price"];
      $code = $a_row["product_or_event_code"];
      $title = $a_row["product_group_title"];
      $format = $a_row["format_description"];

      $item_amount = $quantity * $price;

      $albums += $quantity;
      $album_total += $item_amount;

      $bgcolor = $line % 2 == 1?"":" bgcolor=\"#EEEEEE\"";

      echo "<tr><td class=\"cart\"$bgcolor align=\"center\">$quantity</td>\n";
      echo "<td class=\"cart\"$bgcolor>$format -- $title</td>\n";
      echo "<td class=\"cart\"$bgcolor align=\"center\">\$";
      printf("%.2f", $price);
      echo "</td>\n<td class=\"cart\"$bgcolor align=\"right\">\$";
      printf("%.2f", $item_amount);
      echo "</td>\n</tr>\n";
      $line++;
    }
    echo "<tr><td colspan=\"3\" align=\"right\"><b>$albums ALBUMS:</b></td><td align=\"right\"><b>\$";
    printf("%.2f", $album_total);
    echo "</b></td></tr>\n";
  }

//  ticket detail...

  $t_query = "SELECT c.cart_id,c.quantity,e.event_name,e.event_datetime,e.event_price ";
  $t_query .= "* CASE WHEN ISNULL(s.special_percentage) OR s.start_date>CURDATE() OR s.end_date<CURDATE() ";
  $t_query .= "THEN 1 ELSE (100-s.special_percentage)*.01 END AS price,v.venue_city,st.state_code ";
  $t_query .= "FROM events e LEFT JOIN venues v USING (venue_id) ";
  $t_query .= "LEFT JOIN states st USING (state_id) ";
  $t_query .= "LEFT JOIN tunein.carts c ON e.event_id=c.product_code_or_event_id ";
  $t_query .= "LEFT JOIN tunein.specials s ON e.event_id=s.product_group_or_event_id ";
  $t_query .= "WHERE c.session_id='$s_id' AND c.item_type_id=2";
  $t_result = mysql_query($t_query);

  $tickets = 0;
  $ticket_total = 0;
  $line = 0;

  if(mysql_num_rows($t_result) > 0)
  {
    while($t_row = mysql_fetch_assoc($t_result))
    {
      $c_id = $t_row["cart_id"];
      $quantity = $t_row["quantity"];
      $price = $t_row["price"];
      $code = $t_row["event_id"];
      $event = $t_row["event_name"];
      $datetime = strtotime($t_row["event_datetime"]);
      $date = date( "F jS", $datetime);
      $time = date( "g:i A", $datetime);
      $city = $t_row["venue_city"];

      $item_amount = $quantity * $price;

      $tickets += $quantity;
      $ticket_total += $item_amount;

      $bgcolor = $line % 2 == 1?"":" bgcolor=\"#EEEEEE\"";

      echo "<tr><td align=\"center\" class=\"cart\"$bgcolor>$quantity</td>\n";
      echo "<td class=\"cart\"$bgcolor>$event -- $city, $date, $time</td>\n";
      echo "<td align=\"center\" class=\"cart\"$bgcolor>\$";
      printf("%.2f", $price);
      echo "</td>\n<td align=\"right\" class=\"cart\"$bgcolor>\$";
      printf("%.2f", $item_amount);
      echo "</td></tr>\n";

      $line++;
    }
    echo "<tr><td colspan=\"3\" align=\"right\"><b>$tickets TICKETS:</b></td><td align=\"right\"><b>\$";
    printf("%.2f", $ticket_total);
    echo "</td></tr>\n";
  }
  echo "<tr><td colspan=\"4\" align=\"right\"><h3>TOTAL ITEMS: ";
  echo ($albums + $tickets) . "<br />TOTAL AMOUNT: \$";
  printf("%.2f", ($album_total + $ticket_total));
  echo "</h3><p>(Less shipping and handling.)</p></td></tr>";
?>
      </td>
    </tr>
    <tr>
      <td class="cart" colspan="4" align="center">
        <script type="text/javascript">
          <!--
            if(window.print)
            {
              document.writeln("<form action=\"<?php echo $PHP_SELF; ?>\" method=\"POST\">");
              document.writeln("<input type=\"button\" class=\"search\" value=\"Print Page\" ");
              document.writeln("title=\"Click here to print this page.\" onclick=\"window.print();\" /></form>");
            }
            else
            {
              document.writeln("<p>Please use your browser\'s Print button to print a copy of this page.</p>");
            }
          //-->
        </script>
        <noscript><p>Please use your browser\'s Print button to print a copy of this page.</p></noscript>
      </td>
    </tr>
  </table>
  <p><a href="checkout_help.html" target="_blank">HELP</a></p>
</body>
</html>
