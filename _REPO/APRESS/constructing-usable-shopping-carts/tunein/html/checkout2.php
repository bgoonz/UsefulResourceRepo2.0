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
  if( isset($HTTP_POST_VARS["addressing"]) )
  {
      $err_msg = "<p class=\"error\">There were problems with the following fields:</p>\n<p>";

  function validate()
  {
    global $HTTP_POST_VARS;
    global $err_msg;

    $validated = TRUE;

    $not_whitespace = "/\S/";
    $is_alpha = "/[a-z \-\.\,\']/i";
    $not_alphanumeric = "/[^a-z0-9]/i";
    $not_address = "/[^\w \-#\.\,\/]/i";
    $has_spaces = "/\s/";
    $not_int = "/\D/";
    $is_decimal = "/^\d+(\.\d+)?$/";
    $is_uszip = "/^\d{5}(-\d{4})?$/";
    $is_usphone = "/^\d{3}[-\.]\d{3}[-\.]\d{4}$/";
    $is_email = "/^\w(\.?[\w-])+@\w(\.?[\w-])+\.[a-z]{2,4}(\.[a-z]{2})?$/i";
    $is_comment = "/[a-zA-Z0-9\.\,;:%&#@!\^-_~`\"'\[\]\{\}\*\/\?\(\)\n\r]/";

    $requirements = array("required","alphabetic","address","alphanumeric","nospace",
                          "integer","decimal","minlength","maxlength","uszip",
                          "usphone","email","currency","percent","comment");

    $req_length = count( $requirements );

    foreach($HTTP_POST_VARS as $field => $value)
    {
      $field_name = explode("_", $field);
      $field_name = str_replace("0", " ", $field_name[0]);
      for($i = 0; $i < $req_length; $i++)
        eval( "\$" . $requirements[$i] . " = " . (strpos($field, $requirements[$i])!==FALSE?"TRUE":"FALSE") . ";" );

      if($required)
      {
        if( $value == "" || !preg_match($not_whitespace, $value) )
        {
          $err_msg .= "No response for the required <b>$field_name</b> field.<br />\n";
          $validated = FALSE;
        }
      }

      if($alphabetic)
      {
        if( $value!="" && !preg_match($is_alpha, stripslashes($value)) )
        {
          $err_msg .= "Illegal characters in the <b>$field_name</b> field.<br />\n";
          $validated = FALSE;
        }
      }

      if($address)
      {
        if( $value!="" && preg_match($not_address, $value) )
        {
          $err_msg .= "Invalid address format in <b>$field_name</b>.<br />\n";
          $validated = FALSE;
        }
      }

      if($alphanumeric)
      {
        if( $value!="" && preg_match($not_alphanumeric, $value) )
        {
          $err_msg .= "Illegal characters in the <b>$field_name</b> field.<br />\n";
          $validated = FALSE;
        }
      }

      if($nospace)
      {
        if( $value!="" && preg_match($has_spaces, $value) )
        {
          $err_msg .= "Spaces not allowed in <b>$field_name</b>.<br />\n";
          $validated = FALSE;
        }
      }

      if($integer)
      {
        if( $value!="" && preg_match($not_int, $value) )
        {
          $err_msg .= "<b>$field_name</b> should contain only digits 0-9.<br />\n";
          $validated = FALSE;
        }
      }

      if($decimal)
      {
        if( $value!="" && !preg_match($is_decimal, $value) )
        {
          $err_msg .= "The <b>$field_name</b> field does not contain a decimal value.<br />\n";
          $validated = FALSE;
        }
      }

      if($uszip)
      {
        if( $value!="" && !preg_match($is_uszip, $value) )
        {
          $err_msg .= "<b>$field_name</b> is not a valid 5 or 9 digit ZIP Code.<br />\n";
          $validated = FALSE;
        }
      }

      if($usphone)
      {
        if( $value!="" && !preg_match($is_usphone, $value) )
        {
          $err_msg .= "<b>$field_name</b> is not a valid telephone number<br />(dots, dashes, and numbers only, please).<br />\n";
          $validated = FALSE;
        }
      }

      if($email)
      {
        if( $value!="" && !preg_match($is_email, $value) )
        {
          $err_msg .= "The value entered for <b>$field_name</b> is not a valid email address.<br />\n";
          $validated = FALSE;
        }
      }

      if($comment)
      {
        if( $value!="" && !preg_match($is_comment, $value) )
        {
          $err_msg .= "Illegal characters in <b>$field_name</b>.<br />\n";
          $validated = FALSE;
        }
      }
    }

    if(!$validated)
      $err_msg .= "</p>";

    return $validated;
  }

  $valid = TRUE;

  if( isset($submit_button) )
  {
      $valid = validate();
  }
    if( $err_msg != "<p class=\"error\">There were problems with the following fields:</p>\n<p>" )
    {
      echo "<table border=\"2\" bordercolor=\"#CC0033\" bgcolor=\"#FFFEE\" ";
      echo "cellpadding=\"2\" align=\"center\">\n<tr><td>";
      echo $err_msg;
      echo "</td></tr>\n</table>\n";
    }

    if( isset($submit_button) && $valid )
    {
      if( isset($HTTP_POST_VARS["pmt_cc"]) || isset($HTTP_POST_VARS["pmt_other"])  )
      {
      }
      else
      {
?>
<h2>Step 3: Payment Options</h2>
<table>
  <tr>
    <td width="50%">
      <p><b>Option #1</b>: Online Credit Card.</p>
      <p>We currently accept Visa, MasterCard, and American Express.</p>
      <p>Click the button below to proceed to our secure credit card form.</p>
    </td>
    <td>
      <p><b>Option #2</b>: Other.</p>
      <p>Click the button below to view a printable copy of your order which you can then use
      for phoning, faxing, or mailing your order in to us.</p>
      <p>Please note that we cannot process your order until payment is received.</p>
    </td>
  </tr>
  <tr>
    <td align="center"><input type="submit" name="pmt_cc" class="search" value="Credit Card" /></td>
    <td align="center"><input type="submit" name="pmt_other" class="search" value="Other" /></td>
  </tr>
</table>
<?php
        foreach($HTTP_POST_VARS as $field => $value)
        {
          echo "<input type=\"hidden\" name=\"$field\" value=\"$value\" />\n";
        }
      }
?>
</form>
<?php
    }
    else
    {
?>
<h2>Step 2. Address &amp; Contact Information</h2>
<p>Required fields are marked with an asterisk *.</p>
<form action="<?php echo $PHP_SELF; ?>" method="POST">
<input type="hidden" name="addressing" value="<?php echo $HTTP_POST_VARS["addressing"]; ?>" />
<input type="hidden" name="ship_type" value="<?php echo $HTTP_POST_VARS["ship_type"]; ?>" />
<input type="hidden" name="order_total" value="<?php echo $HTTP_POST_VARS["order_total"]; ?>" />
<table border="0" cellpadding="1">
  <tr>
    <td class="cart">
      *First Name: <input type="text" name="First0Name_required_alphabetic" value="<?php if(isset($HTTP_POST_VARS["First0Name_required_alphabetic"]))echo stripslashes($HTTP_POST_VARS["First0Name_required_alphabetic"]); ?>" />
    </td>
    <td class="cart">
      *Last Name: <input type="text" name="Last0Name_required_alphabetic" value="<?php if(isset($HTTP_POST_VARS["Last0Name_required_alphabetic"]))echo stripslashes($HTTP_POST_VARS["Last0Name_required_alphabetic"]); ?>" />
    </td>
  </tr>
  <tr>
    <td class="cart">
      *Address Line 1: <input type="text" name="Address0Line01_required_address" value="<?php if(isset($HTTP_POST_VARS["Address0Line01_required_address"]))echo $HTTP_POST_VARS["Address0Line01_required_address"]; ?>" />
    </td>
    <td class="cart">
      Address Line 2: <input type="text" name="Address0Line02_address" value="<?php if(isset($HTTP_POST_VARS["Address0Line02_address"]))echo $HTTP_POST_VARS["Address0Line02_address"]; ?>" />
    </td>
  </tr>
  <tr>
    <td class="cart" colspan="2">
      *City: <input type="text" name="City_required_alphabetical" value="<?php if(isset($HTTP_POST_VARS["City_required_alphabetical"]))echo $HTTP_POST_VARS["City_required_alphabetical"]; ?>" />
      &nbsp;*State: <select name="State_required">
        <option value="" <?php if( !isset($HTTP_POST_VARS["State_required"]) )echo "selected=\"selected\""; ?>>[ choose one ]</option>
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
      &nbsp;*ZIP Code: <input type="text" name="ZIP0Code_required_uszip" value="<?php if(isset($HTTP_POST_VARS["ZIP0Code_required_uszip"]))echo $HTTP_POST_VARS["ZIP0Code_required_uszip"]; ?>" />
    </td>
  </tr>
  <tr>
    <td class="cart">*Email Address: <input type="text" name="Email0Address_required_email" value="<?php if(isset($HTTP_POST_VARS["Email0Address_required_email"]))echo $HTTP_POST_VARS["Email0Address_required_email"]; ?>" />
    </td>
    <td class="cart">*Telephone Number: <input type="text" name="Telephone0Number_required_usphone" value="<?php if(isset($HTTP_POST_VARS["Telephone0Number_required_usphone"]))echo $HTTP_POST_VARS["Telephone0Number_required_usphone"]; ?>" />
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
<p>(Order total: $<?php echo $HTTP_POST_VARS["order_total"]; ?>)</p>
</form>
<?php
    } // end else
  } //  end if( isset($HTTP_POST_VARS["addressing"]) )
  else
  {
?>
    <meta http_equiv="Refresh" content="0;URL=checkout3.php" />
<?php
  }
?>
      </td>
    </tr>
  </table>
</body>
</html>
