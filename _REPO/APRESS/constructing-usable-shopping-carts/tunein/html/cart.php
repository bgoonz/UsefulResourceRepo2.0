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
  require_once "../includes/change_cart.inc";
  if($update_msg != "")
    echo "$update_msg";
?>
<script type="text/javascript">

  var button;
  var formSubmit;

  function setButtonValue(formButton)
  {
    button = "change";
    formSubmit = true;
    var inputValue = formButton.form.quantity.value;
    var nonDigit = /\D/g;

    if( nonDigit.test(inputValue) )
    {
      formSubmit = false;
      alert("Please enter a valid quantity, and try again");
      formButton.form.quantity.value = "";
      formButton.form.quantity.focus();
    }
    else
    {
      if(inputValue == 0)
        button = "delete";
    }
  }

  function checkConfirm(form)
  {
    var value = true;

    if(!formSubmit)
      value = false;
    else
      value = confirm("Are you sure you want to " + button + " this item?");

    return value;
  }
</script>
<h2>Cart Detail:</h2>
<table border="0" width="100%" cellpadding="1" cellspacing="0">
  <tr>
    <th>QUANTITY</th><th>DESCRIPTION</th><th>UNIT PRICE</th><th>AMOUNT</th>
  </tr>
<?php

  //  display full cart

  //  album detail...

  $a_query = "SELECT c.cart_id,c.quantity,pg.product_group_title,f.format_description,";
  $a_query .= "pc.product_code_id,pc.product_code_price ";
  $a_query .= "* CASE WHEN ISNULL(s.special_percentage) OR s.start_date>CURDATE() OR s.end_date<CURDATE() ";
  $a_query .= "THEN 1 ELSE (100-s.special_percentage)*.01 END AS price FROM product_codes pc ";
  $a_query .= "LEFT JOIN product_groups pg USING (product_group_id) ";
  $a_query .= "LEFT JOIN formats f ON f.format_id=pc.format_id ";
  $a_query .= "LEFT JOIN carts c ON pc.product_code_id=c.product_code_or_event_id ";
  $a_query .= "LEFT JOIN specials s ON pg.product_group_id=s.product_group_or_event_id ";
  $a_query .= "WHERE c.session_id='$s_id' AND c.item_type_id=1";
  $a_result = mysql_query($a_query)
    or die("<h3>*Server Error*</h3><p>Please try again later.</p>");

  $albums = 0;
  $album_total = 0;
  $line = 0;

  if(mysql_num_rows($a_result) == 0)
    echo "<tr><td colspan=\"4\" align=\"center\">[NO ALBUMS SELECTED]</td></tr>\n";
  else
  {
    while($a_row = mysql_fetch_assoc($a_result))
    {
      $c_id = $a_row["cart_id"];
      $quantity = $a_row["quantity"];
      $price = $a_row["price"];
      $code = $a_row["product_code_id"];
      $title = stripslashes( $a_row["product_group_title"] );
      $format = stripslashes( $a_row["format_description"] );

      $item_amount = $quantity * $price;

      $albums += $quantity;
      $album_total += $item_amount;

      $bgcolor = $line % 2 == 1?"":" bgcolor=\"#EEEEEE\"";
      $button_class = "changeCart" . ($bgcolor == ""?"1":"2");
      $line++;

      echo "<tr><td class=\"cart\" align=\"right\" nowrap=\"nowrap\"$bgcolor>\n<form action=\"cart.php\" ";
      echo "method=\"POST\" onsubmit=\"return checkConfirm(this);\">\n";
      echo "<input type=\"text\" name=\"quantity\" size=\"2\" value=\"$quantity\" />\n";
      echo "<input type=\"hidden\" name=\"item\" value=\"$c_id\" />\n";
      echo "<input type=\"hidden\" name=\"code\" value=\"$code\" />\n";

      if( isset($HTTP_POST_VARS["last_page"]) )
        $last_page = $HTTP_POST_VARS["last_page"];
      else
        $last_page = $HTTP_REFERER;
      echo "<input type=\"hidden\" name=\"last_page\" value=\"$last_page\" />\n";

      echo "<input type=\"submit\" class=\"$button_class\" name=\"update\" value=\"Change\" ";
      echo "onclick=\"setButtonValue(this);\" ";
      echo "title=\"Click here to change item quantity.\" /><br />\n";
      echo "<input type=\"submit\" class=\"$button_class\" name=\"delete\" value=\"Delete\" ";
      echo "onclick=\"button='delete';formSubmit=true;\" title=\"Click here to delete this item.\" /></form></td>";
      echo "<td class=\"cart\"$bgcolor>$format -- $title</td>\n";
      echo "<td class=\"cart\"$bgcolor align=\"center\">\$";
      printf("%.2f", $price);
      echo "</td>\n<td class=\"cart\"$bgcolor align=\"right\">\$";
      printf("%.2f", $item_amount);
      echo "</td></tr>\n";
    }
    echo "<tr><td colspan=\"3\" align=\"right\"><b>$albums ALBUMS:</b></td><td align=\"right\"><b>\$";
    printf("%.2f", $album_total);
    echo "</b></td></tr>\n";
  }

//  ticket detail...

  $t_query = "SELECT c.cart_id,c.quantity,e.event_name,e.event_datetime,e.event_id,e.event_price ";
  $t_query .= "* CASE WHEN ISNULL(s.special_percentage) OR s.start_date>CURDATE() OR s.end_date<CURDATE() ";
  $t_query .= "THEN 1 ELSE (100-s.special_percentage)*.01 END AS price,v.venue_city,st.state_code ";
  $t_query .= "FROM events e LEFT JOIN venues v USING (venue_id) ";
  $t_query .= "LEFT JOIN states st USING (state_id) ";
  $t_query .= "LEFT JOIN carts c ON e.event_id=c.product_code_or_event_id ";
  $t_query .= "LEFT JOIN specials s ON e.event_id=s.product_group_or_event_id ";
  $t_query .= "WHERE c.session_id='$s_id' AND c.item_type_id=2";
  $t_result = mysql_query($t_query)
    or die("<h3>*Server Error*</h3><p>Please try again later.</p>");

  $tickets = 0;
  $ticket_total = 0;
  $line = 0;

  if(mysql_num_rows($t_result) == 0)
    echo "<tr><td colspan=\"4\" align=\"center\">[NO TICKETS SELECTED]</td></tr>\n";
  else
  {
    while($t_row = mysql_fetch_assoc($t_result))
    {
      $c_id = $t_row["cart_id"];
      $quantity = $t_row["quantity"];
      $price = $t_row["price"];
      $code = $t_row["event_id"];
      $event = stripslashes( $t_row["event_name"] );
      $datetime = strtotime($t_row["event_datetime"]);
      $date = date( "F jS", $datetime);
      $time = date( "g:i A", $datetime);
      $city = $t_row["venue_city"];

      $item_amount = $quantity * $price;

      $tickets += $quantity;
      $ticket_total += $item_amount;

      $bgcolor = $line % 2 == 1?"":" bgcolor=\"#EEEEEE\"";
      $button_class = "changeCart" . ($bgcolor == ""?"1":"2");
      $line++;

      echo "<tr><td class=\"cart\" align=\"right\" nowrap=\"nowrap\"$bgcolor>\n<form action=\"cart.php\" ";
      echo "method=\"POST\" onsubmit=\"return checkConfirm();\">\n";
      echo "<input type=\"text\" name=\"quantity\" class=\"cart\" size=\"2\" value=\"$quantity\" />\n";
      echo "<input type=\"hidden\" name=\"item\" value=\"$c_id\" />\n";
      echo "<input type=\"hidden\" name=\"code\" value=\"$code\" />\n";

      if( isset($HTTP_POST_VARS["last_page"]) && $HTTP_POST_VARS["last_page"] != "")
        $last_page = $HTTP_POST_VARS["last_page"];
      else
        $last_page = $HTTP_REFERER;
      echo "<input type=\"hidden\" name=\"last_page\" value=\"$last_page\" />\n";

      echo "<input type=\"submit\" class=\"$button_class\" name=\"update\" value=\"Change\" ";
      echo "onclick=\"setButtonValue(this);\" ";
      echo "title=\"Click here to change item quantity.\" /><br />\n";
      echo "<input type=\"submit\" class=\"$button_class\" name=\"delete\" value=\"Delete\" ";
      echo "onclick=\"button='delete';formSubmit=true;\" title=\"Click here to delete this item.\" /></form></td>\n";
      echo "<td class=\"cart\"$bgcolor>$event -- $city, $date, $time</td>\n";
      echo "<td align=\"center\" class=\"cart\"$bgcolor>\$";
      printf("%.2f", $price);
      echo "</td>\n<td align=\"right\" class=\"cart\"$bgcolor>\$";
      printf("%.2f", $item_amount);
      echo "</td></tr>\n";

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
</table>
<p align="center"><a href="<?php echo $last_page; ?>">&lt;&lt;&lt;Back To Previous Page</a>
 | | | <a href="checkout.php">Proceed to Checkout &gt;&gt;&gt; </a></p>
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
