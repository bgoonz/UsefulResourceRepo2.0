<?php

require_once("tpl_secure.php");
require_once("handlers.php");
require_once("class.products.php");

$oProducts = new products;

if ($id) {
    
    settype($id, "integer");
    $oProducts->setProductId($id);
}

if ($_POST) {
    
    $sSku = $_POST["sku"];
    $sName = $_POST["name"];
    $sDesc = $_POST["description"];
    $sRating = $_POST["rating"];
    $sFormat = $_POST["format"];
    $sReleaseDate = $_POST["release_dt"];
    $sPrice = round($_POST["price"], 2);
    $iQuantity = $_POST["quantity"];
    settype($iQuantity, "integer");

    if (!strcmp("", $sSku)) {
        catchErr("Enter a SKU number");
        $FORMOK = false;
    }
    
    if (!strcmp("", $sName)) {
        catchErr("Enter a Product Name");
        $FORMOK = false;
    }
    
    if (!validDate($sReleaseDate)) {
        $FORMOK = false;
    }
    
    if (!strcmp("", $sPrice)) {
        catchErr("Enter a Product Price");
        $FORMOK = false;
    }

    if (!strcmp("", $iQuantity)) {
        catchErr("Enter a Quantity");
        $FORMOK = false;
    }
    
    // Set default image value
    $aImage = false;
    
    // Check for a posted file
    if(strcmp("", $_FILES["image"]["name"])) {
        
        // See if the file was uploaded successfully
        if(is_uploaded_file($_FILES["image"]["tmp_name"])) {
            
            // Get info associated with the image
            $aImageInfo = getImage($_FILES["image"]["tmp_name"]);
            
            // Check to make sure that the image is of the correct dimensions
            if($aImageInfo["x"] == 178 && $aImageInfo["y"] == 244) {
                
                // Validate the file
                validFile("image");
                
                // Set the image array to the passed value set
                $aImage = $_FILES["image"];
            } else {
                
                // Report the error
                catchErr("Incorrect file dimensions");
            }
            
        }
    }


    if ($FORMOK) {
        
        $aArgs["SKU"] = $sSku;
        $aArgs["Name"] = $sName;
        $aArgs["Description"] = $sDesc;
        $aArgs["Rating"] = $sRating;
        $aArgs["Format"] = $sFormat;
        $aArgs["Release Date"] = strtotime($sReleaseDate);
        $aArgs["Price"] = $sPrice;
        $aArgs["Quantity"] = $iQuantity;
        $aArgs["Image"] = $aImage;

        if (!strcmp("edit", $op)) {
            
            $FORMOK = $oProducts->editProduct($aArgs);

        } elseif (!strcmp("add", $op)) {
            
            $FORMOK = $oProducts->addProduct($aArgs);
        }
        
        if ($FORMOK) {

            header("Location: index.php");
        }
    }
    
} else {
    
    if (!strcmp("edit", $op)) {
        
        $aProduct = $oProducts->getProduct();

        $sSku = $aProduct["SKU"];
        $sName = $aProduct["Name"];
        $sDesc = $aProduct["Description"];
        $sRating = $aProduct["Rating"];
        $sFormat = $aProduct["Format"];
        $sReleaseDate = date("m/d/Y", $aProduct["Release Date"]);
        $sPrice = round($aProduct["Price"],2);
        $iQuantity = $aProduct["Quantity"];
        settype($iQuantity,"integer");

    } else if (!strcmp("add", $op)) {
        
        $sReleaseDate = date("m/d/Y");
    }
    
}

$aApps = $oSess->getApps();

setHeader();
openPage();

?>

<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="header"><?php print ENTITY ?> Product Administration</div></td>
    </tr>
    <tr>
        <td><div class="copy">To <?php print $op ?> this item in the system, please complete the form below.</div></td>
    </tr>
    <tr>
        <td><div class="error"><?php writeErrors() ?></div></td>
    </tr>
</table>

<form action="<?php print SELF ?>?op=<?php print $op ?>&id=<?php print $id ?>" method="post" enctype="multipart/form-data" name="wroxform">
<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="formlabel">DVD Title:</div></td>
        <td><input type="text" name="name" value="<?php print clean($sName) ?>" class="textfield" /></td>
    </tr>
    <tr>
        <td class="dotrule" colspan="2"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <tr>
        <td><div class="formlabel">DVD SKU:</div></td>
        <td><input type="text" name="sku" value="<?php print($sSku) ?>" class="textfield" /></td>
    </tr>
    <tr>
        <td class="dotrule" colspan="2"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <tr>
        <td valign="top"><div class="formlabel">Description:</div></td>
        <td><textarea name="description" rows="18" cols="39" wrap="virtual" class="textarea"><?php print clean($sDesc) ?></textarea></td>
    </tr>
    <tr>
        <td class="dotrule" colspan="2"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <tr>
        <td valign="top"><div class="formlabel">Rating:</div></td>
        <td>
            <select name="rating" class="textfield">
                <?

                $aRatings = array("G","PG","PG-13","R","NC-17","NR");
                $i=0;
                while($i < count($aRatings)) {
                    ?>
                    <option value = "<?php print($aRatings[$i]); ?>" <?php if(!strcmp($sRating,$aRatings[$i])) { ?>SELECTED<? } ?>><?php print($aRatings[$i]); ?></option>
                    <?
                    $i++;
                }

                ?>
            </select>
        </td>
    </tr>
    <tr>
        <td valign="top"><div class="formlabel">Video Format:</div></td>
        <td>
            <select name="format" class="textfield">
                <?

                $aFormats = array("NTSC","PAL","SECAM");
                $i=0;
                while($i < count($aFormats)) {
                    ?>
                    <option value = "<?php print($aFormats[$i]); ?>" <?php if(!strcmp($sFormat,$aFormats[$i])) { ?>SELECTED<? } ?>><?php print($aFormats[$i]); ?></option>
                    <?
                    $i++;
                }

                ?>
            </select>
        </td>
    </tr>
    <tr>
        <td><div class="formlabel">Release Date:</div></td>
        <td><input type="text" name="release_dt" value="<?php print $sReleaseDate ?>" class="textfield" /></td>
    </tr>
    <tr>
        <td><div class="formlabel">Price:</div></td>
        <td><input type="text" name="price" value="<?php print($sPrice) ?>" class="textfield" /></td>
    </tr>
    <tr>
        <td><div class="formlabel">Quantity:</div></td>
        <td><input type="text" name="quantity" value="<?php print($iQuantity) ?>" class="textfield" /></td>
    </tr>
    <tr>
        <td><div class="formlabel">Image:</div></td>
        <td><input type="file" name="image" class="textfield" /> ( image size = 178x244 )</td>
    </tr>

    <?php if (is_file(BASE_DIR."/_img/_products/".$aProduct["Image"])) { ?>
    <tr>
        <td class="dotrule" colspan="2"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <tr>
        <td align="left" colspan="2"><img src="../../_img/_products/<?php print $aProduct["Image"] ?>" alt="product image" border="0" /></td>
    </tr>
    <?php } ?>
    <tr>
        <td class="dotrule" colspan="2"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <tr>
        <td align="right" colspan="2"><input type="image" src="../../_img/buttons/btn_submit.gif" width="58" height="15" alt="" border="0" onfocus="this.blur();" /></td>
    </tr>

</table>
</form>

<?php closePage(); ?>