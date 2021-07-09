<?php
  require_once "../includes/top.inc";

  $i_query = "SELECT COUNT(*) FROM carts WHERE session_id='$s_id'";
  $i_result = mysql_query($i_query);
  $i_count = $i_result == NULL ? 0 : mysql_result($i_result,0);

  if($i_result == 0)
  {
?>
<body>
<p>You don't have any items in your cart.</p>
<p>Please <a href="cart.php">click here</a> to continue.</p>
</body>
</html>
<?php
    exit;
  }

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
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td colspan="2" valign="top">
<!-- CONTENT AREA -->
<?php
  if( isset($HTTP_POST_VARS["addressing"]) )
  {
    $err_msg = "<p class=\"error\">There were problems with the following fields:</p>\n<p>";

    require_once "../includes/validate.inc";

    $valid = TRUE;

    if( isset($HTTP_POST_VARS["submit_button"]) )
      $valid = validate();

    if( $err_msg != "<p class=\"error\">There were problems with the following fields:</p>\n<p>" )
    {
      echo "<table border=\"2\" bordercolor=\"#CC0033\" bgcolor=\"#FFFEE\" ";
      echo "cellpadding=\"2\" align=\"center\">\n<tr><td>";
      echo $err_msg;
      echo "</td></tr>\n</table>\n";
    }

    if( isset($HTTP_POST_VARS["submit_button"]) && $valid )
    {
      $i_query = "INSERT INTO customers (customer_session_id,customer_email,";
      $i_query .= "customer_first_name,customer_last_name,customer_street_1,";

      $email = $HTTP_POST_VARS["Email0Address_required_email"];
      $first_name = $HTTP_POST_VARS["First0Name_required_alphabetic"];
      $last_name = $HTTP_POST_VARS["Last0Name_required_alphabetic"];
      $street1 = $HTTP_POST_VARS["Address0Line01_required_address"];

      if( isset($HTTP_POST_VARS["Address0Line02_address"]) )
      {
        $street2 = $HTTP_POST_VARS["Address0Line02_address"];
        $i_query .= "customer_street_2,";
      }

      $i_query .= "customer_city,state_id,customer_zip,customer_phone) VALUES ";
      $i_query .= "('$s_id','$email','$first_name','$last_name','$street1',";

      if( isset($HTTP_POST_VARS["Address0Line02_address"]) )
        $i_query .= "'$street2',";

      $city = $HTTP_POST_VARS["City_required_alphabetic"];
      $state = $HTTP_POST_VARS["State_required"];
      $zip = $HTTP_POST_VARS["ZIP0Code_required_uszip"];
      $phone = $HTTP_POST_VARS["Telephone0Number_required_usphone"];

      $i_query .= "'$city','$state','$zip','$phone')";

      $i_result = mysql_query($i_query)
        or die("<p>There was a problem in completing the order process.
                   Please email or telephone for further assistance.
                   Your reference code is <b>$s_id</b>.</p>");
?>
<h2>Step 3: Payment Options</h2>
<table cellpadding="5" cellspacing="0" border="1" width="80%">
  <tr>
    <td width="50%" valign="top" colspan="2">
      <p><b>Option #1</b>: Online Credit Card.</p>
      <p>We currently accept Visa, MasterCard, and American Express.</p>
      <p>Click the button below to proceed to our secure credit card form.
      Please have your credit card ready, and be sure that the ZIP code you
      enter  on the next page matches the one to which your monthly statement
      is mailed.</p>
    </td>
    <td valign="top" colspan="2">
      <p><b>Option #2</b>: Phone, Fax or Mail.</p>
      <p>Click the button below to view a printable copy of your order which you can then use
      to phone, fax or mail your order to us.</p>
      <p>Please note that we cannot process your order until payment is received. For your
      protection, please do <b>not</b> send your credit card number by email.</p>
    </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td align="right">
      <form action="ccform.php" method="POST">
        <input type="hidden" name="ship_type" value="<?php echo $HTTP_POST_VARS["ship_type"]; ?>" />
        <input type="hidden" name="order_total" value="<?php echo $HTTP_POST_VARS["order_total"]; ?>" />
        <input type="hidden" name="s_id" value="<?php echo $s_id; ?>" />
        <p><input type="submit" name="pmt_cc" class="search" value="Credit Card" title="Place credit card order." /></p>
      </form>
    </td>
    <td align="left">
      <form action="otherform.php" method="POST">
        <input type="hidden" name="ship_type" value="<?php echo $HTTP_POST_VARS["ship_type"]; ?>" />
        <input type="hidden" name="order_total" value="<?php echo $HTTP_POST_VARS["order_total"]; ?>" />
        <input type="hidden" name="s_id" value="<?php echo $s_id; ?>" />
        <p><input type="submit" name="pmt_other" class="search" value="Printable Form" title="View printable order form." /></p>
      </form>
    </td>
    <td>&nbsp;</td>
  </tr>
</table>

<?php
    } //  end if( isset($submit_button) && $valid )
    else
    {
?>
<script type="text/javascript" src="../scripts/validate.js"></script>
<h2>Step 2. Address &amp; Contact Information</h2>
<p>Required fields are marked with an asterisk *.</p>
<form action="<?php echo $PHP_SELF; ?>" method="POST">
<input type="hidden" name="addressing" value="<?php echo $HTTP_POST_VARS["addressing"]; ?>" />
<input type="hidden" name="ship_type" value="<?php echo $HTTP_POST_VARS["ship_type"]; ?>" />
<input type="hidden" name="order_total" value="<?php echo $HTTP_POST_VARS["order_total"]; ?>" />
<input type="hidden" name="ship_total" value="<?php echo $HTTP_POST_VARS["ship_total"]; ?>" />
<table border="0" cellpadding="1" width="80%">
  <tr>
    <td class="cart" align="right" width="200">*First Name: </td>
    <td class="cart"><input type="text" name="First0Name_required_alphabetic"
                      value="<?php report("First0Name_required_alphabetic"); ?>" />
    </td>
  </tr>
  <tr>
    <td class="cart" align="right">*Last Name: </td>
    <td class="cart"><input type="text" name="Last0Name_required_alphabetic"
                    value="<?php report("Last0Name_required_alphabetic"); ?>" />
    </td>
  </tr>
  <tr>
    <td class="cart" align="right">*Address Line 1: </td>
    <td class="cart"><input type="text" name="Address0Line01_required_address"
                          value="<?php report("Address0Line01_required_address"); ?>" />
    </td>
  </tr>
  <tr>
    <td class="cart" align="right">Address Line 2: </td>
    <td class="cart"><input type="text" name="Address0Line02_address"
                        value="<?php report("Address0Line02_address"); ?>" />
    </td>
  </tr>
  <tr>
    <td class="cart" align="right">*City: </td>
    <td><input type="text" name="City_required_alphabetic"
              value="<?php report("City_required_alphabetic"); ?>" />
    </td>
  </tr>
  <tr>
    <td class="cart" align="right">*State: </td>
    <td><select name="State_required">
        <option value=""<?php if( !isset($HTTP_POST_VARS["State_required"]) )
                                echo " selected=\"selected\""; ?>>[ choose one ]</option>
<?php
    $s_query = "SELECT state_id,state_code FROM states ORDER BY state_code";
    $s_result = mysql_query($s_query);
    while($s_row = mysql_fetch_assoc($s_result))
    {
      $state_id = $s_row["state_id"];
      $state_code = $s_row["state_code"];

      echo "<option value=\"$state_id\"";
      if( isset($HTTP_POST_VARS["State_required"]) && $HTTP_POST_VARS["State_required"] == $state_id )
        echo " selected=\"selected\"";
      echo ">$state_code</option>\n";
    }
?>
      </select>
    </td>
  </tr>
  <tr>
    <td class="cart" align="right">*ZIP Code: </td>
    <td><input type="text" name="ZIP0Code_required_uszip" size="10"
                        value="<?php report("ZIP0Code_required_uszip"); ?>" />
    </td>
  </tr>
  <tr>
    <td class="cart" align="right">*Email Address:
    </td>
    <td><input type="text" name="Email0Address_required_email"
               value="<?php report("Email0Address_required_email"); ?>" />
    </td>
  </tr>
  <tr>
    <td class="cart" align="right">*Telephone Number with area code:</td>
    <td><input type="text" name="Telephone0Number_required_usphone"
               value="<?php report("Telephone0Number_required_usphone"); ?>" />
    </td>
  </tr>
  <tr>
    <td class="cart" align="center">
      <input type="submit" name="submit_button" class="search" value="Submit" />
    </td>
    <td class="cart" align="center">
      <input type="reset" name="reset" class="search" value="Reset" />
    </td>
  </tr>
</table>
<p>(Order total: $<?php printf("%.2f",$HTTP_POST_VARS["order_total"]); ?>)</p>
</form>
<?php
    } // end else
  } //  end if( isset($HTTP_POST_VARS["addressing"]) )
  else
  {
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
          $c_query .= "ON c.product_code_or_event_id=p.product_code_id ";
          $c_query .= "WHERE c.session_id='$s_id' ";
          $c_query .= "AND c.item_type_id=1 AND p.format_id=$i";
          $c_result = mysql_query($c_query)
            or die("Server Error: Please <a href=\"$HTTP_REFERER\">try again</a>.");

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
        $s_query .= "ON (c.item_type_id=s.item_type_id AND c.product_code_or_event_id=s.product_group_or_event_id) ";
        $s_query .= "LEFT JOIN product_codes p ON c.product_code_or_event_id=p.product_code_id ";
        $s_query .= "WHERE c.session_id='$s_id' AND c.item_type_id=1";

        $s_result = mysql_query($s_query);
        $s_albums = mysql_result($s_result,0);

        $s_query = "SELECT SUM(c.quantity * CASE WHEN ISNULL(s.special_percentage) ";
        $s_query .= "OR s.start_date>CURDATE() OR s.end_date<CURDATE() THEN e.event_price ";
        $s_query .= "ELSE (100-s.special_percentage)*.01*e.event_price END) ";
        $s_query .= "FROM carts c LEFT JOIN specials s ";
        $s_query .= "USING (item_type_id) LEFT JOIN events e ";
        $s_query .= "ON c.product_code_or_event_id=e.event_id WHERE c.session_id='$s_id' ";
        $s_query .= "AND c.item_type_id=2 AND c.product_code_or_event_id=s.product_group_or_event_id";

        $s_result = mysql_query($s_query);
        $s_tickets = mysql_result($s_result,0);

        $s_total = $s_albums + $s_tickets;
?>
<p>Shipping Method: You chose <?php echo $ship_name; ?>.</p>
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
      <form action="<?php echo $PHP_SELF; ?>" method="POST">
        <p>If everything appears in order, then click here to continue to the address form.</p>
        <input type="submit" class="addCart" name="addressing" value="Continue" title="Continue to address form." />
        <input type="hidden" name="ship_type" value="<?php echo $ship_type; ?>" />
        <input type="hidden" name="ship_total" value="<?php echo $ship_total; ?>" />
        <input type="hidden" name="order_total" value="<?php echo $order_total; ?>" />
      </form>
    </td>
    <td colspan="2" align="center">
      <form action="<?php echo $PHP_SELF; ?>" method="GET">
      <p>If you wish to change the shipping method, click here to go back to the previous screen.</p>
        <script type="text/javascript">
          document.writeln("<input type=\"button\" class=\"addCart\" ");
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

    if($no_choice)
      echo "<p class=\"error\">Please select a shipping method.</p>";

    if( !isset($HTTP_POST_VARS["shipping"]) || (isset($HTTP_POST_VARS["shipping"]) && $no_choice) )
    {
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
        echo "name=\"ship_type\" value=\"$s_type\" class=\"radio\" /></td></tr>\n";

        $row_count++;
      }
?>
<tr>
  <td colspan="3" align="right">Select shipping method:</td>
  <td colspan="2"><input type="submit" name="shipping" value="Submit" class="search"
                         title="Click here to view order total, including shipping." /></td>
</tr>
</table>
</form>
      </td>
      <td valign="top" align="right" width="200">
<?php
      if( !$no_choice )
        require_once "../includes/short_cart.inc";
    } //  end if( !isset($HTTP_POST_VARS["shipping"]) || (isset($HTTP_POST_VARS["shipping"]) && $no_choice) )
  } //  end else {* if( isset($HTTP_POST_VARS["addressing"]) ) *}
?>
      </td>
    </tr>
  </table>
  <p><a href="checkout_help.html" target="_blank">HELP</a></p>
</body>
</html>