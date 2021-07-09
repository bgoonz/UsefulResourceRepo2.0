<?php

// get the tpl_unsecure.php file that has the needed
// functions for the rest of this page
require_once("tpl_unsecure.php");
require_once("class.accounts.php");
require_once("class.shopping_cart.php");
require_once("class.orders.php");

$oAccounts = new accounts;
$oCart = new shopping_cart;
$oOrders = new orders;

// validate session get account info
if (isset($_COOKIE["cACCOUNT"]) && $oAccounts->validateSession()) {
    
    $aSess = $oAccounts->getSession();
    $aAddress = $oAccounts->getAccountAddress();
    
    // error handling
    if  (
        !strcmp("",$aAddress["Address Name"]) ||
        !strcmp("",$aAddress["Address Street"]) ||
        !strcmp("",$aAddress["Address City"]) ||
        !strcmp("",$aAddress["Address State"]) ||
        !strcmp("",$aAddress["Address Country"]) ||
        !strcmp("",$aAddress["Address Postal"]) ||
        !strcmp("",$aAddress["Address Phone"])
        ) {
        
        catchErr("Your shipping info is not valid. Please correct it.");
        $iShippingOK = false;
    } else {
        
        $iShippingOK = true;
    }

} else {
    
    catchErr("You must be logged in to purchase products");
}

// get cart items
$aProducts = $oCart->getCartItems();
$iTotalPrice = $oCart->getTotalPrice();

// error reporting
if(!strcmp("",$aProducts[0]["Product Id"])) {
    
    catchErr("Your shopping cart is empty.");
    $iProductsOK = false;
} else {
    $iProductsOK = true;
}

// check for all needed session variables and check for posted data
if($_POST && $aSess && $iShippingOK && $iProductsOK) {
    
    // error checking
    $sCCExpDate = $_POST["cc_exp_y"]."-".$_POST["cc_exp_m"]."-01";
    is_numeric($_POST["cc_number"]) ? $sCCNumber = $_POST["cc_number"] : catchErr("Please enter a valid credit card number.");
    
    // fill argument array
    $aArgs["account_id"] = $aSess["Account Id"];
    $aArgs["order_total_price"] = $iTotalPrice;
    $aArgs["order_cc_number"] = substr($sCCNumber,-4,4);
    $aArgs["order_cc_exp_dt"] = strtotime($sCCExpDate);
    
    // add order to database if credit card is processed
    $iOrderId = $oOrders->addOrder($aArgs);
    $oOrders->setOrderId($iOrderId);
    
    // reset argument array
    $aArgs = array();
    
    if($sConfirm = $oOrders->processCreditCard($sCCNumber,$sCCExpDate,$iTotalPrice,$iTest = 2) && $iOrderId) {
        
        $oOrders->confirmPayment($sConfirm);
        
        if( !$ERRORS && $iOrderId > 0 ) {
            
            // loop through products adding them to the order.
            $i=0;
            while($i < count($aProducts)) {
                
                $aArgs["product_id"] = $aProducts[$i]["Product Id"];
                $aArgs["item_name"] = $aProducts[$i]["Name"];
                $aArgs["item_price"] = $aProducts[$i]["Price"];
                $aArgs["item_quantity"] = $aProducts[$i]["Quantity"];
                $oOrders->addOrderItem($aArgs);
                $i++;
            }
            
            $oCart->clearCart();
        }
    } else {
        
        catchErr("Your credit card was not accepted, please check your submission and try again");
        $oOrders->deleteOrder($iOrderId);
    }
    
    // if no errors than forward to confermation page
    if(!$ERRORS) {
        header("Location: ../accounts/order.php?id=".$iOrderId);
    }
}


// generate the header info
setHeader();

// start a new page with a banner ad
openPage(true);

?>
<!-- main content -->
<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="header"><?php echo ENTITY; ?> Check Out</div></td>
    </tr>
    <tr>
        <td><div class="error"><?php writeErrors(); ?></div></td>
    </tr>
</table>


<?php 

// check to see if the account user is logged in
if ($aSess) { 

?>

<form name="wroxform" action="<?php print SELF ?>" method="post">

<table width="608" border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td align="left" valign="top" width="304">
            <table border="0" cellpadding="0" cellspacing="0">
                <tr><td align="left" colspan="2"><div class="header"><b>Shipping Info</b> <a href="../accounts/shipping.php">[ Edit ]</a></div></td></tr>
                <tr><td align="left"><div class="formlabel"><b>Name</b></div></td><td align="left"><div class="copy"><?php print $aAddress["Address Name"] ?></div></td></tr>
                <tr><td align="left"><div class="formlabel"><b>Company</b></div></td><td align="left"><div class="copy"><?php print $aAddress["Address Company"] ?></div></td></tr>
                <tr><td align="left"><div class="formlabel"><b>Street</b></div></td><td align="left"><div class="copy"><?php print $aAddress["Address Street"] ?></div></td></tr>
                <tr><td align="left"><div class="formlabel"><b>Street</b></div></td><td align="left"><div class="copy"><?php print $aAddress["Address Street Ext"] ?></div></td></tr>
                <tr><td align="left"><div class="formlabel"><b>City</b></div></td><td align="left"><div class="copy"><?php print $aAddress["Address City"] ?></div></td></tr>
                <tr><td align="left"><div class="formlabel"><b>State</b></div></td><td align="left"><div class="copy"><?php print $aAddress["Address State"] ?></div></td></tr>
                <tr><td align="left"><div class="formlabel"><b>Country</b></div></td><td align="left"><div class="copy"><?php print $aAddress["Address Country"] ?></div></td></tr>
                <tr><td align="left"><div class="formlabel"><b>Postal</b></div></td><td align="left"><div class="copy"><?php print $aAddress["Address Postal"] ?></div></td></tr>
                <tr><td align="left"><div class="formlabel"><b>Phone</b></div></td><td align="left"><div class="copy"><?php print $aAddress["Address Phone"] ?></div></td></tr>
            </table>
        </td>
        <td align="left" valign="top" width="304">
            <table border="0" cellpadding="0" cellspacing="0">
                <tr><td align="left" colspan="2"><div class="header"><b>Credit Card Info</b></div></td></tr>
                <tr><td align="left"><div class="formlabel">Number</div></td><td align="left"><input type="text" name="cc_number" value=""/></td></tr>
                <tr>
                    <td align="left"><div class="formlabel">Expiration</div></td>
                    <td align="left">
                        <select name="cc_exp_m" style="padding-right:5px;">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                        <select name="cc_exp_y" style="padding-right:5px;">
                            <?php
                            
                            $i = date("Y");
                            $j = $i+6;
                            while($i <= $j) { ?>
                            <option value="<?php print $i ?>"><?php print $i ?></option>
                            <?php 
                            $i++;
                            } ?>
                        </select>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>

<br/>
<br/>

<table width="608" border="0" cellpadding="0" cellspacing="0">
    <?php

    if ($aProducts[0]["Product Id"]) {    
    ?>
    
    <tr><td align="left" colspan="4"><div class="header"><b>Selected Products</b> <a href="../shopping_cart/">[ Edit ]</a></div></td></tr>
    
    <tr>
        <td align="left" class="copy"><b>Title<b/></td>
        <td align="right" class="copy"><b>Qty</b></td>
        <td align="right" class="copy"><b>Per Unit<b/></td>
        <td align="right" class="copy"><b>Cmb Price<b/></td>
    </tr>
    <tr>
        <td colspan="4" class="dotrule"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <?php
        $i = 0;
        while ($i < count($aProducts)) {
    ?>
    <tr>
        <td><div class="section"><a href="../products/detail.php?id=<?php print $aProducts[$i]["Product Id"] ?>"><?php print format($aProducts[$i]["Name"]) ?></a></div></td>
        <td align="right"><div class="copy"><input type="hidden" name="purchase_<?php print $aProducts[$i]["Product Id"] ?>" value="<?php print $aProducts[$i]["Quantity"] ?>" size="2"/><?php print $aProducts[$i]["Quantity"] ?></div></td>
        <td align="right"><div class="copy"><i>$<?php print $aProducts[$i]["Price"] ?></i></div></td>
        <td align="right"><div class="copy"><i>$<?php print $aProducts[$i]["Combined Price"] ?></i></div></td>
    </tr>
    <tr>
        <td colspan="4" class="dotrule"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <?php
            ++$i;
        }
    ?>
    <tr>
        <td colspan="4" align="right"><b>Total Price: $<?php print $iTotalPrice ?></b></td>
    </tr>
    <tr>
        <td colspan="4" class="dotrule"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>

    <tr><td colspan="4"><div class="header" style="padding-top: 10px"><b>Legal Disclaimer</b></div></td></tr>
    <tr>
        <td colspan="4">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Vestibulum feugiat nulla id ipsum. Integer augue nisl, condimentum nec, ullamcorper id, varius quis, magna. Cras interdum molestie risus. Mauris ac nulla.  Duis ornare libero in eros. Ut consequat libero at lorem. Duis tincidunt, dui nec porta venenatis, nunc arcu viverra sapien, vel cursus mauris velit tincidunt urna. Suspendisse auctor nonummy velit. Integer a massa venenatis erat vestibulum vulputate. Mauris sit amet velit. Nulla facilisis. Morbi rutrum consectetuer nisl. Morbi urna lorem, gravida sit amet, tristique sit amet, volutpat ac, tellus.<br/>
            <br/>
            Maecenas erat lectus, eleifend quis, tempor in, pulvinar eu, eros. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla a lectus eget justo laoreet cursus. In mattis enim sed dolor congue gravida. Vivamus metus. Vivamus risus. Nullam vitae lectus. Pellentesque orci lorem, aliquet sed, condimentum eu, consectetuer a, risus. Nullam sem est, pharetra quis, bibendum non, fringilla id, enim. Praesent porttitor diam ut magna. Nullam semper, felis vel dignissim rhoncus, nisl pede egestas quam, nec placerat purus leo a ligula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Pellentesque lectus lacus, pellentesque in, lacinia vel, malesuada sit amet, tortor. Donec sem. Vivamus id metus quis arcu congue ornare. Morbi eu quam. Praesent varius tempor nibh.<br/>
            <br/>
            Maecenas facilisis rutrum lectus. Donec libero. Fusce tempus ultricies lectus. Aliquam eget ipsum id pede sodales vestibulum. Nam commodo molestie augue. Etiam enim ante, commodo eget, adipiscing id, bibendum at, leo. Etiam dictum arcu sit amet sem. Integer nonummy est vitae magna. Suspendisse ullamcorper varius est. In hac habitasse platea dictumst. Donec erat dolor, ultricies ut, vulputate at, nonummy ac, sem. Integer dignissim molestie felis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum ac dui. Phasellus tincidunt sapien ut nunc.<br/>
        </td>
    </tr>

    <tr>
        <td colspan="4" class="dotrule"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>

    <?php if(!$ERRORS || ($iShippingOK && $iProductsOK)) { ?>
    <tr>
        <td colspan="4" align="right"><input type="image" src="../../_img/buttons/btn_submit.gif" width="58" height="15" alt="" border="0" onfocus="this.blur();" /></a></td>
    </tr>
    <?php } ?>

    <?php
    } else {
    ?>
    <tr>
        <td><div class="copy">I am sorry, there are no products in your shopping cart.</div></td>
    </tr>
    <?php } ?>
</form>
</table>

<?php 

// if account user is not logged in
} else {

?>

<div class="copy">Please <a href="../accounts/">log in</a> if you would like to purchase products</div>


<?php } ?>

<?php

// print out footer information
closePage();

?>