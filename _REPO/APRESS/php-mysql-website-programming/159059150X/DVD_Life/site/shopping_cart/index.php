<?php

// get the tpl_unsecure.php file that has the needed
// functions for the rest of this page
require_once("tpl_unsecure.php");
require_once("class.shopping_cart.php");

$oCart = new shopping_cart;

if(!strcmp("add",$_GET["opt"]) && $id > 0){
    
    $oCart->addCartItem($id, 1);
    header("Location: ".SELF);
} elseif(!strcmp("del",$_GET["opt"]) && $id > 0) {
    
    $oCart->deleteCartItem($id);
    header("Location: ".SELF);
} elseif(!strcmp("edit",$_GET["opt"]) && $_POST ) {
        
    $aCartItems = array();
    
    while(list($sKey,$sVal) = @each($_POST)){
        
        if(ereg("^update_[0-9]+$",$sKey)){
            
            $id = str_replace("update_","",$sKey);
            $iQnt = $sVal;
            settype($id,"integer");
            settype($iQnt,"integer");

            if($iQnt == 0) {
                
                unset($aCartItems[$id]);
            } else {
                
                $aCartItems[$id] = $iQnt;
            }
        }
    }
    
    $oCart->setCart($aCartItems);
    
    header("Location: ".SELF);
}

// get cart items
$aProducts = $oCart->getCartItems();

// generate the header info
setHeader();

// start a new page with a banner ad
openPage(true);

?>
<!-- main content -->
<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="header"><?php echo ENTITY; ?> Shopping Cart</div></td>
    </tr>
    <tr>
        <td><div class="error"><?php writeErrors(); ?></div></td>
    </tr>
</table>

<form name="wroxform" action="<?php print SELF ?>?opt=edit" method="post">
<table width="608" border="0" cellpadding="0" cellspacing="0">
    <?php

    if ($aProducts[0]["Product Id"]) {    
    ?>
    
    <tr>
        <td align="left" class="copy"><b>Title<b/></td>
        <td align="center" class="copy"><b>Qty</b></td>
        <td align="right" class="copy"><b>Per Unit<b/></td>
        <td align="right" class="copy"><b>Cmb Price<b/></td>
        <td align="right" class="copy"><b>Delete<b/></td>
    </tr>
    <tr>
        <td colspan="5" class="dotrule"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <?php
        $i = 0;
        while ($i < count($aProducts)) {
    ?>
    <tr>
        <td><div class="section"><a href="../products/detail.php?id=<?php print $aProducts[$i]["Product Id"] ?>"><?php print format($aProducts[$i]["Name"]) ?></a></div></td>
        <td align="right"><div class="copy"><input type="text" name="update_<?php print $aProducts[$i]["Product Id"] ?>" value="<?php print $aProducts[$i]["Quantity"] ?>" size="2"/></div></td>
        <td align="right"><div class="copy"><i>$<?php print $aProducts[$i]["Price"] ?></i></div></td>
        <td align="right"><div class="copy"><i>$<?php print $aProducts[$i]["Combined Price"] ?></i></div></td>
        <td align="right"><div class="copy"><a href="<?php print SELF ?>?opt=del&id=<?php print $aProducts[$i]["Product Id"] ?>">Delete</a></div></td>
    </tr>
    <tr>
        <td colspan="5" class="dotrule"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <?php
            ++$i;
        }
    ?>
    <tr>
        <td colspan="5" align="right"><b>Total Price: $<?php print $oCart->getTotalPrice() ?></b></td>
    </tr>
    <tr>
        <td colspan="5" class="dotrule"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <tr>
        <td colspan="5" align="right"><a href="checkout.php"><img src="../../_img/buttons/btn_checkout.gif" border="0" alt="Check Out"/></a> <input type="image" src="../../_img/buttons/btn_update.gif" alt="" border="0" onfocus="this.blur();" /></td>
    </tr>
    <?php
    } else {
    ?>
    <tr>
        <td><div class="copy">I am sorry, there are no products in your shopping cart.</div></td>
    </tr>
    <?php } ?>
</form>
</table>
</form>

<?php

// print out footer information
closePage();

?>
