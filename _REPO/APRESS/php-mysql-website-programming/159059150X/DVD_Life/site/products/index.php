<?php

// get the tpl_unsecure.php file that has the needed
// functions for the rest of this page
require_once("tpl_unsecure.php");
require_once("class.products.php");

$oProducts = new products;

// get products and count
$aProducts = $oProducts->getProducts("product_release_dt DESC", $iPage=0, true);
$iCnt = $oProducts->getProductsCount(true);

// generate the header info
setHeader();

// start a new page with a banner ad
openPage(true);

?>
<!-- main content -->
<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="header"><?php echo ENTITY; ?> Products</div></td>
    </tr>
    <tr>
        <td><div class="error"><?php writeErrors(); ?></div></td>
    </tr>
</table>

<table width="608" border="0" cellpadding="0" cellspacing="0">
    <?php
    
    if (count($aProducts)) {
        
        $i = 0;
        while ($i < count($aProducts)) {
        
    ?>
    <tr>
        <td><div class="section"><a href="detail.php?id=<?php print $aProducts[$i]["Product Id"] ?>"><?php print format($aProducts[$i]["Name"]." (".date("Y",$aProducts[$i]["Release Date"]).")") ?></a></div></td>
        <td align="right"><div class="copy">$<?php print $aProducts[$i]["Price"] ?></div></td>
        <td align="right" width="80">
            <div class="copy">
                <?php if ($aProducts[$i]["Quantity"] > 0) { ?>
                    <i><a href="../shopping_cart/index.php?opt=add&id=<?php print $aProducts[$i]["Product Id"] ?>">Add To Cart</a></i>
                <?php } else { ?>
                    <i>Out Of Stock</i>
                <?php } ?>
            </div>
        </td>
    </tr>
    <tr>
        <td colspan="3" class="dotrule"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <?php
            ++$i;
        }
    ?>
    <tr>
        <td colspan="3"><?php renderPaging($iCursor, $iCnt, "&type=".$iType) ?></td>
    </tr>
    <?php
    } else {
    ?>
    <tr>
        <td><div class="copy">I am sorry, there are no products available.</div></td>
    </tr>
    <?php } ?>
</table>
</form>

<?php

// print out footer information
closePage();

?>
