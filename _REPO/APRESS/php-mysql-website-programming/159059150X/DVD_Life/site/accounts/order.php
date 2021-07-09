<?php

// require libraries
require_once("tpl_unsecure.php");
require_once("class.accounts.php");
require_once("handlers.php");
require_once("class.orders.php");

$oAccounts = new accounts;
$oAccounts->validateSession() ? $aSess = $oAccounts->getSession() : header("Location: index.php");

// Instanciate Orders
$oOrders = new orders;

// check for an id
if(strcmp($_GET["id"],"")){
    
    $id = $_GET["id"];

    // initialize page vars
    $oOrders->setOrderId($id);
    $aOrder = $oOrders->getOrder($id);
    $aItems = $oOrders->getOrderItems();
    
    if($aOrder["account_id"] != $aSess["Account Id"]){
        
        $aOrder = false;
        $aItems = false;
        
        header("Location: orders.php");
    }
} else {
    
    $id = false;
}

setHeader();
openPage(true);

?>

<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td class="dotrule"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <tr>
        <td>
            <a href="manage.php">My Settings</a> |
            <a href="prefs.php">My Preferences</a> |
            <a href="shipping.php">My Shipping Info</a> |
            <a href="orders.php">My Orders</a>
        </td>
    </tr>
    <tr>
        <td class="dotrule"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
</table>

<br />

<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="header"><?php print ENTITY ?> Order Details</div></td>
    </tr>
    <tr>
        <td><div class="copy">This is a detailed representation of an order you made.  Feel free to print this as a recipt of your purchase.</div></td>
    </tr>
    <tr>
        <td><div class="error"><?php writeErrors() ?></div></td>
    </tr>
</table>

<div class="header">Order Details</div>
<table border="0" cellpadding="0" cellspacing="0" width="608">
    <tr>
        <td class="dotrule" colspan="2"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <tr>
        <td align="left" width="100"><div class="copy"><b>Order Date: </b></div></td>
        <td align="left" width="508"><div class="copy"><?php print date("l, F jS, Y",$aOrder["created_dt"]) ?></div></td>
    </tr>
    <tr>
        <td align="left" width="100"><div class="copy"><b>Order Id: </b></div></td>
        <td align="left" width="508"><div class="copy"><?php print $aOrder["order_id"] ?></div></td>
    </tr>
    <tr>
        <td align="left" width="100"><div class="copy"><b>Shipped Date: </b></div></td>
        <td align="left" width="508"><div class="copy"><?php if($aOrder["order_ship_dt"]){ print date("l, F jS, Y",$aOrder["order_ship_dt"]); } else { ?><i>Not Yet Shipped</i><?php }?></div></td>
    </tr>
    <tr>
        <td align="left" width="100"><div class="copy"><b>Credit Card: </b></div></td>
        <td align="left" width="508"><div class="copy">XXXXXXXXXXXX<?php print $aOrder["order_cc_number"] ?></div></td>
    </tr>
    <tr>
        <td align="left" width="100"><div class="copy"><b>Confirmation: </b></div></td>
        <td align="left" width="508"><div class="copy"><?php print $aOrder["order_pfp_confirm"] ?></div></td>
    </tr>
    <tr>
        <td align="left" width="100"><div class="copy"><b>Total Price: </b></div></td>
        <td align="left" width="508"><div class="copy"><?php print $aOrder["order_total_price"] ?></div></td>
    </tr>
    <tr>
        <td colspan="2" class="dotrule"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
</table>
<br/>

<div class="header">Items Ordered</div><br/>
<table border="0" cellpadding="0" cellspacing="0" width="608">
    <tr>
        <td align="left"><div class="listrow">Item Name</div></td>
        <td align="center"><div class="listrow">Quantity</div></td>
        <td align="center"><div class="listrow">Unit Price</div></td>
        <td align="center"><div class="listrow">Combined Price</div></td>
    </tr>
    <tr>
        <td class="dotrule" colspan="4"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    
    <?php
    
    $i=0;
    while ($i<count($aItems)) {
        
        ?>
        <tr>
            <td align="left"><div class="copy"><?php print format($aItems[$i]["item_name"]) ?></div></td>
            <td align="center"><div class="copy"><?php print format($aItems[$i]["item_quantity"]) ?></div></td>
            <td align="center"><div class="copy">$<?php print format($aItems[$i]["item_price"]) ?></div></td>
            <td align="center"><div class="copy">$<?php print number_format($aItems[$i]["item_price"] * $aItems[$i]["item_quantity"],2) ?></div></td>
        </tr>
        <?
        $i++;
    }
    
    ?>
        
    <tr>
        <td colspan="4" class="dotrule"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
</table>
<br/>

<div class="header">Legal Terms</div><br/>
<div class="copy">
Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Curabitur elit. Morbi erat sem, ultrices quis, elementum a, tempor at, nulla. Sed fermentum. Nulla est. Pellentesque eros metus, dapibus vel, lacinia eu, tempus auctor, ipsum. Vestibulum consequat velit ac dolor. In est dui, mattis quis, consectetuer non, cursus quis, nisl. Mauris sagittis faucibus neque. Sed orci nunc, egestas id, tincidunt ut, ultrices sit amet, ipsum. Sed pretium commodo risus. Cras consectetuer molestie ligula. Suspendisse cursus. In a odio nec est congue tempor.<br/>
<br/>
Donec posuere vulputate justo. Aliquam est diam, luctus ac, pulvinar at, hendrerit at, velit. Fusce faucibus, orci in pellentesque facilisis, mi massa hendrerit neque, vel cursus massa velit nec nulla. Sed pede. Donec et nisl eget tellus vehicula luctus. Aliquam malesuada sagittis enim. Integer in libero. Mauris non nunc. Nam sodales sollicitudin arcu. Phasellus volutpat mauris et libero. Curabitur auctor. Nulla facilisi. Donec sit amet magna nec turpis consequat sagittis. Phasellus volutpat dignissim purus. Nunc dignissim rhoncus risus. Donec at leo. Proin iaculis.<br/>
<br/>
Suspendisse et sem ut libero egestas volutpat. Proin nibh. Proin consequat ante in felis. Donec sodales tortor et pede. Ut suscipit augue quis nulla. Suspendisse vulputate sapien ut mi. Nulla imperdiet. Vestibulum sed felis. Vestibulum eu quam quis leo elementum fermentum. Nulla malesuada, dui non venenatis interdum, elit ligula elementum urna, quis venenatis magna sapien quis arcu. Quisque malesuada lorem in est pretium feugiat. Nunc vitae neque. Vestibulum tempor elit eleifend tortor. Proin id tortor id sem commodo tempor.<br/>
<br/>
Donec dapibus fringilla lectus. Etiam turpis quam, tincidunt a, ultricies sed, dictum id, diam. Suspendisse potenti. Fusce wisi augue, hendrerit a, rhoncus nec, aliquam eu, justo. Donec dictum imperdiet pede. Nulla est pede, eleifend non, lacinia quis, porttitor vel, turpis. Integer aliquam enim et lacus. Sed semper. Maecenas vestibulum auctor diam. Mauris quis turpis.<br/>
<br/>
Quisque semper faucibus elit. Aenean vestibulum mollis mauris. Praesent at dui. Maecenas sit amet ligula ac ipsum rutrum accumsan. Phasellus ornare, magna vitae feugiat posuere, sapien orci dapibus leo, sed volutpat ligula dui quis massa. Morbi elementum varius odio. Ut at metus quis diam venenatis tempor. Maecenas vestibulum. Praesent dolor justo, consectetuer sed, facilisis quis, porttitor in, pede. Vestibulum nec urna sit amet mi bibendum consectetuer. Aliquam mi pede, viverra a, mollis ut, faucibus non, augue. Phasellus id lectus. Etiam mauris. Quisque gravida sapien rhoncus lorem. Nunc justo est, fermentum a, adipiscing vitae, interdum at, dui. Pellentesque congue. Aliquam erat volutpat.<br/>
</div>


<?php closePage(); ?>
