<?php
  if( !isset($HTTP_POST_VARS)
      ||
      ( $HTTP_REFERER != $PHP_SELF && strpos($HTTP_REFERER,"checkout.php") === FALSE )
    )
  {
    die("<p>You appear to have reached this page in error.</p>
          <p>Please <a href=\"index.php\">click here</a> to go to our Home Page.</p>");
  }

  if( !isset($HTTP_POST_VARS["$cc_submit"]) )
  {
    session_start();
    session_unset();
    session_destroy();
    if( isset($HTTP_COOKIE_VARS[session_name()]) )
      unset( $HTTP_COOKIE_VARS[session_name()] );
  }
  require_once "../includes/db.inc";
  require_once "../includes/location.inc";
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
  <title>TuneIn - <?php echo $title; ?></title>
  <link rel="stylesheet" href="../styles/tunein.css" type="text/css">
</head>
<body>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr> <!--Masthead table row-->
      <td bgcolor="#CCCCCC" width="150" class="tunein">
        <h1>Tune<em class="in">In</em>!</h1>
      </td>
      <td bgcolor="#CCCCCC" align="right">&nbsp;</td>
    </tr>
  </table>
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td valign="top">
<!-- CONTENT AREA -->
<?php

  $err_msg = "<p class=\"error\">There were problems with the following fields:</p>\n<p>";
  require_once "../includes/validate.inc";

  $valid = TRUE;

  if( isset($HTTP_POST_VARS["$cc_submit"]) )
  {
    $cc_submit = $HTTP_POST_VARS["$cc_submit"];
    $valid = validate();
  }

  if( $err_msg != "<p class=\"error\">There were problems with the following fields:</p>\n<p>" )
  {
    echo "<table border=\"2\" bordercolor=\"#CC0033\" bgcolor=\"#FFFEE\" cellpadding=\"2\">\n<tr><td>";
    echo $err_msg;
    echo "</td></tr>\n</table>\n";
  }

  if( isset($cc_submit) && $valid )
  {
    $ship_type = $HTTP_POST_VARS["ship_type"];
    $order_total = $HTTP_POST_VARS["order_total"];
    $s_id = $HTTP_POST_VARS["s_id"];

    $d_query = "DELETE FROM orders WHERE session_id='$s_id'";
    $d_result = mysql_query($d_query);

    $o_query = "INSERT INTO orders (session_id,shipping_type_id,order_total,order_datetime) ";
    $o_query .= "VALUES ('$s_id','$ship_type','$order_total',NOW())";
    $o_result = mysql_query($o_query);

    $i_query = "SELECT item_type_id,product_code_or_event_id,quantity ";
    $i_query .= "FROM carts WHERE session_id='$s_id'";

    echo "<p>$o_query</p><p>$i_query</p>";

    $i_result = mysql_query($i_query);

    while($i_row = mysql_fetch_assoc($i_result))
    {
      $i_type = $i_row["item_type_id"];
      $i_code = $i_row["product_code_or_event_id"];
      $i_quantity = $i_row["quantity"];

      if($i_type == 1)
      {
        $table = "product_codes";
        $id = "product_code_id";
        $change = "product_code_inventory = product_code_inventory - $i_quantity";
      }
      else
      {
        $table = "events";
        $id = "event_id";
        $change = "event_seats_sold = event_seats_sold + $i_quantity";
      }

      $u_query = "UPDATE $table SET $change WHERE $id = $i_code";
      $u_result = mysql_query($u_query)
        or email("admin@tunein.site","Inventory DB Error","Inventory was not updated for order $s_id.");
    }

    $to = $HTTP_POST_VARS["Email_required_email"];
    $name = $HTTP_POST_VARS["First0Name-required_alphabetical"];
    $subject = "TuneIn! Order Confirmation";
    $message = "Dear $name,\n\nYour order for\n\n";

    $a_query = "SELECT c.cart_id,c.quantity,pg.product_group_title,f.format_description,pc.product_code_price ";
    $a_query .= "* CASE WHEN ISNULL(s.special_percentage) OR s.start_date>CURDATE() OR s.end_date<CURDATE() ";
    $a_query .= "THEN 1 ELSE (100-s.special_percentage)*.01 END AS price FROM product_codes pc ";
    $a_query .= "LEFT JOIN product_groups pg USING (product_group_id) ";
    $a_query .= "LEFT JOIN formats f ON f.format_id=pc.format_id ";
    $a_query .= "LEFT JOIN carts c ON pc.product_code_id=c.product_or_event_code ";
    $a_query .= "LEFT JOIN specials s ON pc.product_code_id=s.product_group_or_event_id ";
    $a_query .= "WHERE c.session_id='$s_id' AND c.item_type_id=1";
    $a_result = mysql_query($a_query);

    $album_total = 0;

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

        $album_total += $item_amount;

        $message .= "($quantity)\t$format -- $title @ \$";
        $message .= sprintf("%.2f", $price) . "--> \t\$" . sprintf("%.2f", $item_amount);
        $message .= "\n";
      }
    }

    $message .= "\n\n";

//  ticket detail...

    $t_query = "SELECT c.cart_id,c.quantity,e.event_name,e.event_datetime,e.event_price ";
    $t_query .= "* CASE WHEN ISNULL(s.special_percentage) OR s.start_date>CURDATE() OR s.end_date<CURDATE() ";
    $t_query .= "THEN 1 ELSE (100-s.special_percentage)*.01 END AS price,v.venue_city,st.state_code ";
    $t_query .= "FROM events e LEFT JOIN venues v USING (venue_id) ";
    $t_query .= "LEFT JOIN states st USING (state_id) ";
    $t_query .= "LEFT JOIN tunein.carts c ON e.event_id=c.product_or_event_code ";
    $t_query .= "LEFT JOIN tunein.specials s ON e.event_id=s.product_or_event_code ";
    $t_query .= "WHERE c.session_id='$s_id' AND c.item_type_id=2";
    $t_result = mysql_query($t_query);

    $ticket_total = 0;

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

        $ticket_total += $item_amount;

        $message .= "($quantity)\t$event -- $city, $date, $time @ \$";
        $message .= sprintf("%.2f", $price) . "--> \t\$" . sprintf("%.2f", $item_amount);
        $message .= "\n";
      }
    }

    $currtime = date("g:i:s");
    $currdate = date("l, j F, Y");
    $message .= "\nwas processed at $currtime on $currdate.\n\n";

    $merch_total = $album_total + $ticket_total;
    $shipping = $order_total - $merch_total;

    $s_query = "SELECT shipping_type_description FROM shipping_types ";
    $s_query .= "WHERE shipping_type_id = $ship_type";
    $s_result = mysql_query($s_query);
    $s_description = mysql_result($s_result,0);

    $message .= "MERCHANDISE TOTAL: \$";
    $message .= sprintf("%.2f",$merch_total) . "\n";
    $message .= "SHIPPING ($s_description): \$";
    $message .= sprintf("%.2f",$shipping) . "\n";
    $message .= "MERCHANDISE TOTAL: \$";
    $message .= sprintf("%.2f",$order_total) . "\n";
    $message .= "\n\nThank for your order. Your reference number is $s_id.\n";

    mail($to, $subject, $message);
?>

<h2>Thank You!</h2>
<p>You order in the amount of $<?php printf("%.2f",$order_total); ?> has been processed.</p>
<p>You will be receiving a confirmation notice via email shortly.</p>
<p>Your reference code is <?php echo $s_id; ?> -- please include this in all correspondence concerning this order.</p>

<?php
  }
  else
  {
?>

<h2>Credit Card Information</h2>
<p>All fields are required.</p>

<form action="<?php echo $PHP_SELF; ?>" method="POST">
<table width="80%" cellpadding="1" cellspacing="0" border="0">
  <tr>
    <th class="cart" colspan="2">Your name as it appears on your card:</th>
  </tr>
  <tr>
    <td class="cart" colspan="2" align="center">
      <input type="text" name="Cardholder0Name_required_alphabetic" size="50"
        value="<?php report("Cardholder0Name_required_alphabetic"); ?>" />
    </td>
  </tr>
  <tr>
    <td colspan="2"><hr noshade="noshade" /></td>
  </tr>
  <tr>
    <th class="cart" colspan="2">Type of card:</th>
  </tr>
  <tr>
    <td class="cart" align="right" width="50%">Visa</td>
    <td class="cart">
      <input type="radio" name="Credit0Card0Type_required"
        value="Visa"<?php if( isset($HTTP_POST_VARS["Credit0Card0Type_required"]) && $HTTP_POST_VARS["Credit0Card0Type_required"] == "Visa" )
                            echo " checked=\"checked\""; ?> /></td>
  </tr>
  <tr>
    <td class="cart" align="right">MasterCard</td>
    <td class="cart">
      <input type="radio" name="Credit0Card0Type_required"
        value="MasterCard"<?php if( isset($HTTP_POST_VARS["Credit0Card0Type_required"]) && $HTTP_POST_VARS["Credit0Card0Type_required"] == "MasterCard" )
                                  echo " checked=\"checked\""; ?> /></td>
  </tr>
  <tr>
    <td class="cart" align="right">American Express</td>
    <td class="cart">
      <input type="radio" name="Credit0Card0Type_required"
        value="American Express"<?php if( isset($HTTP_POST_VARS["Credit0Card0Type_required"]) && $HTTP_POST_VARS["Credit0Card0Type_required"] == "American Express" )
                                        echo " checked=\"checked\""; ?> /></td>
  </tr>
  <tr>
    <td colspan="2"><hr noshade="noshade" /></td>
  </tr>
  <tr>
    <th class="cart" colspan="2">Expiration date:</th>
  </tr>
  <tr>
    <td class="cart" align="center">Month:<br /><select name="Expiration0Month_required">
          <option value=""<?php if( !isset($HTTP_POST_VARS["Expiration0Month_required"]) )
                                echo " selected=\"selected\""; ?>>[choose month:]</option>
<?php
  	for ($m=1;$m<13;$m++)
  	{
  	  $month = date ("M",mktime(0,0,0,$m,1,0));
  	  echo "<option value=\"$m\"";
  	  if( isset($HTTP_POST_VARS["Expiration0Month_required"]) && $HTTP_POST_VARS["Expiration0Month_required"] == $m)
  	    echo " selected=\"selected\"";
  	  echo ">$month</option>\n";
  	}
?>
        </select>
    </td>
    <td class="cart" align="center">Year:<br />
      <select name="Expiration0Year_required">
        <option value=""<?php if( !isset($HTTP_POST_VARS["Expiration0Year_required"]) )
                                  echo " selected=\"selected\""; ?>>[choose year:]</option>
<?php
    $thisyear = date("Y");
    for($y=0;$y<=5;$y++)
    {
      $theyear = $thisyear + $y;
      echo "<option value=\"$thisyear\"";
	    if( isset($HTTP_POST_VARS["Expiration0Year_required"]) && $HTTP_POST_VARS["Expiration0Year_required"] == $thisyear)
	      echo " selected=\"selected\"";
      echo ">$theyear</option>\n";
    }
?>
        </select>
    </td>
  </tr>
  <tr>
    <td colspan="2"><hr noshade="noshade" /></td>
  </tr>
  <tr>
    <td class="cart" align="center">Card Number:<br />
      <input type="text" name="Credit0Card0Number_ccnumber_required" size="16"
        value="<?php report("Credit0Card0Number_ccnumber_required"); ?>" /></td>
    <td class="cart" align="center">Zip Code where you receive your statement:<br />
      <input type="text" name="Billing0Zip0Code_uszip_required" size="10"
        value="<?php report("Billing0Zip0Code_uszip_required"); ?>" /></td>
  </tr>
  <tr>
    <td colspan="2"><hr noshade="noshade" /></td>
  </tr>
  <tr>
    <td align="center"><input type="submit" name="cc_submit" class="search" value="Submit" /></td>
    <td align="center"><input type="reset" name="reset" class="search" value="Reset" /></td>
  </tr>
</table>
  <input type="hidden" name="ship_type" value="<?php echo $HTTP_POST_VARS["ship_type"]; ?>" />
  <input type="hidden" name="order_total" value="<?php echo $HTTP_POST_VARS["order_total"]; ?>" />
  <input type="hidden" name="s_id" value="<?php echo $s_id; ?>" />
</form>
<?php
  }
?>

      </td>
    </tr>
  </table>
  <p><a href="checkout_help.html" target="_blank">HELP</a></p>
</body>
</html>
