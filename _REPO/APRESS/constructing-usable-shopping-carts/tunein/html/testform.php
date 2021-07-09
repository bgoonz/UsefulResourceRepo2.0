<?php
  $err_msg = "<p>There were problems with the following fields:</p>\n<p>";

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

      if($currency)
      {
        if( $value!="" && !preg_match($is_currency, preg_replace("/[\$ге\,]*/" , "", $value)) )
        {
          $err_msg .= "<b>$field_name</b> is not a valid currency value.<br />\n";
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
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
 "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta name="Author" content="jon stephens" />
<title>Sample Form -- PHP Validation</title>

</head>

<body bgcolor="#FFFFFF" text="#000000">
<?php
  if( $err_msg != "<p>There were problems with the following fields:</p>\n<p>" )
  {
    echo "<table border=\"2\" bordercolor=\"#CC0033\" bgcolor=\"#FFFEE\" cellpadding=\"2\">\n<tr><td>";
    echo $err_msg;
    echo "</td></tr>\n</table>\n";
  }

  if( isset($submit_button) && $valid )
  {
    echo "<table><thead>\n";
    echo "<tr><th colspan=\"2\">Form successfully processed.</th></tr>\n";
    echo "<tr><th colspan=\"2\">Results:</th></tr><thead>\n";
    echo "<tbody><tr><th>Field:</th><th>Value:</th></tr>\n";
    foreach($HTTP_POST_VARS as $field => $value)
    {
      $field_name = explode( "_", $field);
      echo "<tr><td>" . str_replace("0", " ", $field_name[0]) . "</td>";
      echo "<td>" . stripslashes($value) . "</td></tr>\n";
    }
    echo "</tbody></table>\n";
  }
  else
  {
?>
<p>Required fields are marked with an asterisk *.</p>
<form method="POST" action="<? echo $PHP_SELF; ?>">
<table border="0" cellpadding="1">
<tr><td colspan="3" align="center">
*First Name: <input type="text" name="First0Name_required_alphabetic" value="<?php if(isset($First0Name_required_alphabetic))echo stripslashes($First0Name_required_alphabetic); ?>" />
  &nbsp;*Last Name: <input type="text" name="Last0Name_required_alphabetic" value="<?php if(isset($Last0Name_required_alphabetic))echo stripslashes($Last0Name_required_alphabetic); ?>" />
</td></tr><tr><td colspan="3" align="center">
*Address Line 1: <input type="text" name="Address0Line01_required_address" value="<?php if(isset($Address0Line01_required_address))echo $Address0Line01_required_address; ?>" />
  &nbsp;Address Line 2: <input type="text" name="Address0Line02_address" value="<?php if(isset($Address0Line02_address))echo $Address0Line02_address; ?>" />
</td></tr><tr><td>
*City: <input type="text" name="City_required_alphabetical" value="<?php if(isset($City_required_alphabetical))echo $City_required_alphabetical; ?>" /></td>
<td>&nbsp;*State: <select name="State_required">
      			<option value="" <?php if( !isset($State_required) )echo "selected=\"selected\""; ?>>[ choose one ]</option>
<?php
    $states = array("AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID",
                    "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO",
                    "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA",
                    "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY");
    $state_count = count($states);
    for($i=0; $i<$state_count; $i++)
    {
      echo "<option value=\"$states[$i]\"";
      if( isset($State_required) && $State_required == $states[$i] )
        echo " selected=\"selected\"";
      echo ">$states[$i]</option>\n";
    }
?>
          </select></td><td>
  &nbsp;*ZIP Code: <input type="text" name="ZIP0Code_required_uszip" value="<?php if(isset($ZIP0Code_required_uszip))echo $ZIP0Code_required_uszip; ?>" />
</td></tr>
<tr><td>*Email Address: <input type="text" name="Email0Address_required_email" value="<?php if(isset($Email0Address_required_email))echo $Email0Address_required_email; ?>" /></td>
<td>
*Telephone Number: <input type="text" name="Telephone0Number_required_usphone" value="<?php if(isset($Telephone0Number_required_usphone))echo $Telephone0Number_required_usphone; ?>" />
</td></tr>
<tr><td colspan="2">*Amount of Contribution: <input type="text" name="Amount0Of0Contribution_required_currency" value="<?php if(isset($Amount0Of0Contribution_required_currency))echo $Amount0Of0Contribution_required_currency; ?>" /></td>
<td>Feedback:<br /><textarea name="Feedback_comment" rows="10" cols="30">
<?php if( isset($Feedback_comment))echo stripslashes($Feedback_comment); ?>
</textarea></td></tr>

<tr><td colspan="3" align="center"><input type="submit" name="submit_button" value="Submit" />
  &nbsp;<input type="reset" name="reset" value="Reset" /></td></tr>
</table>
</form>
<?php
  } // end else
?>
</body>
</html>