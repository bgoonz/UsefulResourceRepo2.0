<?php

require_once("tpl_secure.php");
require_once("class.products.php");

$oProducts = new products;

$aProducts = $oProducts->getProducts("created_dt DESC", $iCursor);
$iCnt = $oProducts->getProductsCount();

if (count($aProducts)>0) {
    
    $i = 0;
    while ($i < count($aProducts)) {
        $aData[$i]["Id"] = $aProducts[$i]["Product Id"];
        $aData[$i]["Name"] = $aProducts[$i]["Name"];
        $aData[$i]["Status"] = $aProducts[$i]["Status"];
        $aData[$i]["Created"] =$aProducts[$i]["Created Date"];
        ++$i;
    }
}

if ($id) {
    
    settype($id, "integer");
    $oProducts->setProductId($id);
    
    if (!strcmp($op, "del")) {
        
        $oProducts->deleteProduct();
        header("Location: ".SELF);
        
    } elseif (!strcmp($op, "act")) {
        
        $oProducts->publishProduct();
        header("Location: ".SELF);
        
    } elseif (!strcmp($op, "deact")) {
        
        $oProducts->stageProduct();
        header("Location: ".SELF);
    }
}

setHeader();
openPage();

?>

<table width="608" border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td colspan="2"><div class="header"><?php print ENTITY ?> Product Administration</div></td>
    </tr>
    <tr>
        <td colspan="2"><div class="copy">To manage products, select a user action from the list below.</div></td>
    </tr>
    <tr>
        <td><div class="error"><?php writeErrors() ?></div></td>
        <td align="right" valign="top"><?php if ($iPerm > 1) { ?><a href="form.php?op=add"><img src="../../_img/buttons/btn_additem.gif" width="58" height="15" alt="" border="0" /></a><?php } ?></td>
    </tr>
</table>

<?php renderList($iCnt, $aData) ?>

<?php closePage(); ?>