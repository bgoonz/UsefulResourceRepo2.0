<?php

require_once("tpl_unsecure.php");
require_once("class.products.php");

$oProducts = new products;

// set product id
$oProducts->setProductId($id);

// get product array
$aProduct = $oProducts->getProduct();

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
</table>

<form action="<?php print SELF ?>?id=<?php print $id ?>" method="post" name="wroxform">
<table width="608" border="0" cellpadding="0" cellspacing="0">
    <?php if (is_array($aProduct)) { ?>
    <tr>
        <td colspan="2"><div class="section"><?php print format($aProduct["Name"]." (".date("Y", $aProduct["Release Date"]).")") ?></div></td>
    </tr>
    <tr>
        <td colspan="2">
            <div class="copy">
                <?php if(strcmp("",$aProduct["Image"])) { ?><img src="../../_img/_products/<?php print $aProduct["Image"] ?>" align="right" style="padding:10px"/><?php } ?>
                <?php print format($aProduct["Description"]) ?>
            </div>
        </td>
    </tr>
    <tr>
        <td colspan="2" class="dotrule"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <tr>
        <td colspan="1"><div class="copy">Rating: <?php print format($aProduct["Rating"]) ?></div></td>
        <td colspan="1"><div class="copy">Format: <?php print format($aProduct["Format"]) ?></div></td>
    </tr>
    <tr>
        <td colspan="2" class="dotrule"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <tr>
        <td colspan="1"><div class="copy">Release Date: <?php print format(date("F j, Y", $aProduct["Release Date"])) ?></div></td>
        <td colspan="1"><div class="copy">Product Number: <?php print format($aProduct["SKU"]) ?></div></td>
    </tr>
    <tr>
        <td colspan="2" class="dotrule"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <tr>
        <td><div class="copy">Price: $<?php print $aProduct["Price"] ?></div></td>
        <td>
            <div class="copy">
                <?php if($aProduct["Quantity"]>0) { ?>
                    <a href="../shopping_cart/index.php?opt=add&id=<?php print $aProduct["Product Id"] ?>">Add To Shopping Cart</a>
                <?php } else { ?>
                    Out of Stock
                <?php } ?>
            </div>
        </td>
    </tr>
    <tr>
        <td colspan="2" class="dotrule"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <?php
    } else {
    ?>
    <tr>
        <td><div class="copy">I am sorry, the article you have requested cannot be found.</div></td>
    </tr>
    <?php } ?>
</table>
</form>

<?php

// print out footer information
closePage();

?>
