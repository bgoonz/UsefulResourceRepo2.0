<?php

// File Location: /site/accounts/logout.php

require_once("tpl_unsecure.php");

// clear and destroy session cookie
setcookie("cACCOUNT", null, time()-3600, "/", "", "");
unset($_COOKIE["cACCOUNT"]);

setHeader();
openPage(true);

?>

<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="header"><?php print ENTITY ?> My Account Logout</div></td>
    </tr>
    <tr>
        <td><div class="copy">You have successfully logged out of the accounts
        management system.</div></td>
    </tr>
    <tr>
        <td><div class="error"><?php writeErrors() ?></div></td>
    </tr>
</table>

<?php closePage(); ?>
