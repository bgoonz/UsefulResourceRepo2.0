<?php

require_once("tpl_unsecure.php");
require_once("class.accounts.php");
require_once("handlers.php");
require_once("class.orders.php");

$oAccounts = new accounts;
$oAccounts->validateSession() ? $aSess = $oAccounts->getSession() : header("Location: index.php");

$oOrders = new orders;


    
// initialize page vars
$aOrders = $oOrders->getAccountOrders($aSess["Account Id"]);


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
        <td><div class="header"><?php print ENTITY ?> Manage My Account Orders</div></td>
    </tr>
    <tr>
        <td><div class="copy">All orders that you have made will be displayed here.  Please click on the date of the order to view more information about this order.</div></td>
    </tr>
    <tr>
        <td><div class="error"><?php writeErrors() ?></div></td>
    </tr>
</table>

<table border="0" cellpadding="0" cellspacing="0" width="608">
    <tr>
        <td align="center"><div class="listrow">Order Date</div></td>
        <td align="center"><div class="listrow">Items</div></td>
        <td align="center"><div class="listrow">Total Price</div></td>
        <td align="center"><div class="listrow">Shipping Status</div></td>
    </tr>
    <tr>
        <td class="dotrule" colspan="4"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>

    <?php
    if ($aOrders[0]) {
        
        $i = 0;
        while ($i < count($aOrders)) {
        
    ?>
    <tr>
        <td align="center"><div class="copy"><a href="order.php?id=<?php print $aOrders[$i]["order_id"] ?>"><?php print date("l, F jS, Y",$aOrders[$i]["created_dt"]) ?></a></div></td>
        <td align="center"><div class="copy"><?php print $aOrders[$i]["item_count"] ?></div></td>
        <td align="center"><div class="copy">$<?php print $aOrders[$i]["order_total_price"] ?></div></td>
        <td align="center">
            <div class="copy">
                <?php if ($aOrders[$i]["order_ship_dt"]) { ?>
                    <i><?php print "Shipped ".date("m/d/Y",$aOrders[$i]["order_ship_dt"]) ?></i>
                <?php } else { ?>
                    <i>Has Not Shipped</i>
                <?php } ?>
            </div>
        </td>
    </tr>
    <tr>
        <td colspan="4" class="dotrule"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <?php
            $i++;
        }
    } else {
    ?>
    
    <tr>
        <td colspan="4" class="copy">You have not made any orders.</td>
    </tr>
    <tr>
        <td colspan="4" class="dotrule"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <?php
    }
    ?>
</table>

<?php closePage(); ?>
