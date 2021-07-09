<?php
  function report($field)
  {
    global $HTTP_POST_VARS;

    $value = $HTTP_POST_VARS[$field];

    if( isset($value) )
      echo stripslashes($value);
  }

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
                          "usphone","email","currency","percent","comment","ccnumber");

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

      if($ccnumber)
      {
        $value = preg_replace("/( -)/+","",$value);
        if( $value!="" && preg_match($not_int, $value ) )
        {
          $err_msg .= "The <b>$field_name</b> may only contain the digits 0-9.<br />\n";
          $validated = FALSE;
        }
        else
        {
          if( isset($HTTP_POST_VARS["Credit0Card0Type_required"]) )
          {
            $cc_type = $HTTP_POST_VARS["Credit0Card0Type_required"];
            $cc_number = $value;
            $cc_length = strlen($cc_number);

            switch($cc_type)
            {
              case "MasterCard":
                $validated = $validated && $cc_length == 16;
                break;
              case "Visa":
                $validated = $validated && ($cc_length == 13 || $cc_length == 16);
                break;
              case "American Express":
                $validated = $validated && $cc_length == 15;
                break;
            }

            if(!$validated)
              $err_msg .= "Wrong number of digits for $cc_type.<br >\n";
            else
            {
              switch($cc_type)
              {
                case "MasterCard":
                  $prefix = substr($cc_number, 0, 2);
                  $validated = $validated && ($prefix > 50 && $prefix < 56);
                  break;
                case "Visa":
                  $prefix = substr($cc_number, 0, 1);
                  $validated = $validated && ($prefix == 4);
                  break;
                case "American Express":
                  $prefix = substr($cc_number, 0, 2);
                  $validated = $validated && ($prefix == 34 || $prefix == 37);
                  break;
              }

              /*
                  -Other cards-
                  Discover: prefix 6011; 16 digits
                  Diners Club/Carte Blanche: prefixes 300-305, 36, 38; 14 digits
                  JCB: prefix 3; 16 digits
                    OR prefix 2131 1800; 15 digits
              */

              if(!$validated)
                $err_msg .= "Invalid prefix for $cc_type number.<br />\n";
              else
              {
                $copy = strrev($cc_number);
                $length = strlen($cc_number);
                $sum = 0;

                for($c = 0; $c < $length; $c++)
                {
                  $digit = substr($copy,$c,1);
                  if($c % 2 == 1)
                  {
                    $digit *= 2;
                    if($digit > 9)
                    {
                      $first = substr($digit,0,1);
                      $second = substr($digit,1,1);
                      $digit = $first + $second;
                    }
                  }
                  $sum += $digit;
                }

                if($sum % 10 != 0)
                {
                  $err_msg .= "The $cc_type number failed to validate. Please check the number on your card.<br />\n";
                  $validated = FALSE;
                }
                else
                {
                  $thismonth = date("n");
                  $thisyear = date("Y");
                  if( $HTTP_POST_VARS["Expiration0Year_required"] == $thisyear && $HTTP_POST_VARS["Expiration0Month_required"] < $thismonth )
                  {
                    $err_msg .= "Invalid expiration date (date indicated is in the past).<br />\n";
                    $validated = FALSE;
                  }
                }
              }
            }
          }
        }

      }
    }

    if(!$validated)
      $err_msg .= "</p>";

    return $validated;
  }


//  standalone function:

/*

  function check_cc()
  {
    global $HTTP_POST_VARS;
    global $err_msg;

    if( !isset($HTTP_POST_VARS["Credit0Card0Type_required"]) )
    {
      $cc_type = $HTTP_POST_VARS["Credit0Card0Type_required"];
      $cc_number = $HTTP_POST_VARS["Credit0Card0Number_required_ccnumber"];
      $cc_length = strlen($cc_number);
      $test = TRUE;

      switch($cc_type)
      {
        case "MasterCard":
          $test = $cc_length == 16;
          break;
        case "Visa":
          $test = ($cc_length == 13 || $cc_length == 16);
          break;
        case "American Express":
          $test = $cc_length == 15;
      }

      if(!$test)
        $err_msg .= "Wrong number of digits for $cc_type.<br >\n";
      else
      {
        switch($cc_type)
        {
          case "MasterCard":
            $prefix = substr($cc_number, 0, 2);
            $test = ($prefix > 50 && $prefix < 56);
            break;
          case "Visa":
            $prefix = substr($cc_number, 0, 1);
            $test = ($prefix == 4);
            break;
          case "American Express":
            $prefix = substr($cc_number, 0, 2);
            $test = ($prefix == 34 || $prefix == 37);
            break;
        }
        if(!$test)
          $err_msg .= "Invalid prefix for $cc_type number.<br />\n";
        else
        {
          $copy = strrev($cc_number);
          $length = strlen($cc_number);
          $sum = 0;

          for($c = 0; $c < $length; $c++)
          {
            $digit = $copy{$c};
            if($c % 2 == 1)
            {
              $digit *= 2;
              if($digit > 9)
                $digit = $digit{0} + $digit{1};
            }
            $sum += $digit;
          }

          if($sum % 10 != 0)
          {
            $err_msg .= "The $cc_type number failed to validate. Please check the number on your card.<br />\n";
            $test = FALSE;
          }
          else
          {
            $thismonth = date("n");
            $thisyear = date("Y");
            if( $HTTP_POST_VARS["Expiration0Year_required"] == $thisyear && $HTTP_POST_VARS["Expiration0Month_required"] < $thismonth )
            {
              $err_msg .= "Invalid expiration date (date indicated is in the past).<br />\n";
              $test = FALSE;
            }
          }
        }
      }
    }
    return $test;
  }
*/
?>