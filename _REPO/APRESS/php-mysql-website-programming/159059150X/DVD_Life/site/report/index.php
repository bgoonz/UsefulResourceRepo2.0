<?php

// File Location: /site/report/index.php

require_once("tpl_unsecure.php");
require_once("class.ads.php");

$oAds = new ads;

$aReport = $oAds->getAdsReport();

// generate the header info
setHeader();

// start a new page with a banner ad
openPage();

?>
<!-- main content -->
<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="header"><?php echo ENTITY; ?> Adventisements Report</div></td>
    </tr>
</table>

<br />

<table width="608" border="0" cellpadding="0" cellspacing="0">
    <?php if (count($aReport)) { ?>
    <tr>
        <td><div class="section">Advertisment Info</div></td>
        <td><div class="section">Client Info</div></td>
        <td><div class="section">Report Month</div></td>
    </tr>
    <tr>
        <td colspan="3" class="dotrule"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <?php
        $i = 0;
        while ($i < count($aReport)) {
            
            $sDate = mktime(0, 0, 0, $aReport[$i]["Month"], 1, $aReport[$i]["Year"]);
    ?>
    <tr>
        <td valign="top"><div class="copy"><?php print format($aReport[$i]["Title"]) ?><br />
        <?php print format($aReport[$i]["URL"]) ?><br />
        Views: <?php print format($aReport[$i]["View Count"]) ?><br />
        Clicks: <?php print format($aReport[$i]["Click Count"]) ?><br />
        Created: <?php print date("m-d-Y", $aReport[$i]["Created Date"]) ?></div></td>
        <td valign="top"><div class="copy"><?php print format($aReport[$i]["Client"]["Name"]) ?><br />
        <?php print format($aReport[$i]["Client"]["Contact"]) ?><br />
        <?php print format($aReport[$i]["Client"]["Email"]) ?><br />
        <?php print format($aReport[$i]["Client"]["Phone"]) ?></div></td>
        <td valign="top"><div class="copy"><?php print date("F Y", $sDate) ?></div></td>
    </tr>
    <tr>
        <td colspan="3" class="dotrule"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <?php
            ++$i;
        }
    ?>
    <?php } else { ?>
    <tr>
        <td><div class="copy">Sorry, there are no statistics to report at this time.</div></td>
    </tr>
    <?php  } ?>
</table>
</form>

<?php

// print out footer information
closePage();

?>
