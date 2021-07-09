<!--  STANDARD INCLUDES (DOCUMENT HEAD) -->

//  show error message and link back to Cart page
//  if user doesn't have anything in cart

<!--  START DOCUMENT BODY  -->

<!--  CONTENT AREA  -->

<?php
  if( isset($HTTP_POST_VARS["addressing"]) )
  //  if shipping option has been finalised
  {
    require_once "../includes/validate.inc";
    //  include PHP validation script

    if( isset($HTTP_POST_VARS["submit_button"]) )
      $valid = validate();
      //  call validation function; returns TRUE or FALSE

    if( $err_msg != "<p class=\"error\">There were problems with the following fields:</p>\n<p>" )
    //  if error message string defined in validate.inc
    //  is no longer equal to its initial value
    {

      //  OUTPUT ERROR MESSAGE
    }

    if( isset($HTTP_POST_VARS["submit_button"]) && $valid )
    //  if contact/address form has been submitted
    //  and has been validated
    {

      //  CREATE NEW CUSTOMER RECORD

?>

<!--  PAYMENT OPTIONS DISPLAY  -->

<?php
    } //  end if( isset($submit_button) && $valid )
    else
    {
?>
<script type="text/javascript" src="../scripts/validate.js"></script>
//  clientside validation script

<!--  CONTACT AND ADDRESS FORM DISPLAY  -->

<?php
    } // end else
  } //  end if( isset($HTTP_POST_VARS["addressing"]) )
  else
  //  if the shipping option hasn't been finalised yet
  {
    if( isset($HTTP_POST_VARS["shipping"]) )
    {
    //  if the shipping options form has been submitted
      if( isset($HTTP_POST_VARS["ship_type"]) )
      {
      //  if a shipping option has been selected
?>
<!--  SHIPPING CHARGES DISPLAY (BASED ON CUSTOMER SELECTION)  -->
<?php
      }   //  end if( isset($HTTP_POST_VARS["ship_type"]) )
      else
      {
        //  SET ERROR FLAG ($no_choice)
      }
    } //  end if( isset($HTTP_POST_VARS["shipping"]) )

    if($no_choice)  //  if error flag is set
    {
      //  NO SHIPPING OPTION SELECTED; DISPLAY ERROR MESSAGE
    }

    if( !isset($HTTP_POST_VARS["shipping"]) || (isset($HTTP_POST_VARS["shipping"]) && $no_choice) )
    //  if the shipping form hasn't yet been submitted, or if it has, but no selection was made
    {
?>
<!--  SHIPPING METHOD OPTIONS DISPLAY  -->
<?php
      if( !$no_choice )
        require_once "../includes/short_cart.inc";
    } //  end if( !isset($HTTP_POST_VARS["shipping"]) || (isset($HTTP_POST_VARS["shipping"]) && $no_choice) )
  } //  end else {* if( isset($HTTP_POST_VARS["addressing"]) ) *}
?>
<!--  END OF DOCUMENT -->