<?php

// File Location: /site/login/reminder.php

require_once("tpl_unsecure.php");
require_once("class.users.php");
require_once("handlers.php");

if ($_POST) { // check for http post vars
    
    // assign post vars
    $sUser = $_POST["user"];
    $sEmail = $_POST["email"];
    
    // validate user name
    if (!validUser($sUser)) {
        
        catchErr("Enter a valid user name");
        $FORMOK = false;
    }
    
    // validate user email
    if (!validEmail($sEmail)) {
        
        catchErr("Enter a valid email address");
        $FORMOK = false;
    }
    
    // if forms variables validated
    if ($FORMOK) {
        
        // assign array values
        $aArgs["User Name"] = $sUser;
        $aArgs["Email"] = $sEmail;
        
        $oUsers = new users;
        
        // try login and redirect
        if ($oUsers->sendReminder($aArgs)) {
            
            header("Location: index.php");
        }
    }
    
} else { // post vars not sent
    
    // initialize page vars
    $sUser = null;
    $sEmail = null;
}

setHeader();
openPage();

?>

<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="header"><?php print ENTITY ?> Administrator Password 
        Reminder</div></td>
    </tr>
    <tr>
        <td><div class="copy">Please complete the form below to have your password
        reminder emailed to you. If your account information is correct you will be
        redirected to the login form.</div></td>
    </tr>
    <tr>
        <td><div class="error"><?php writeErrors() ?></div></td>
    </tr>
</table>

<form action="<?php print SELF ?>" method="post" name="wroxform">
<table border="0" cellpadding="0" cellspacing="0">
    <tr>
        <td><div class="formlabel">User Name:</div></td>
        <td><input type="text" name="user" value="<?php print clean($sUser) ?>" class="textfield" /></td>
    </tr>
    <tr>
        <td><div class="formlabel">Email Address:</div></td>
        <td><input type="text" name="email" value="<?php print clean($sEmail) ?>" class="textfield" /></td>
    </tr>
    <tr>
        <td class="dotrule" colspan="2"><img src="../../_img/spc.gif" width="1" height="15" alt="" border="0" /></td>
    </tr>
    <tr>
        <td align="right" colspan="2"><input type="image" src="../../_img/buttons/btn_submit.gif" width="58" height="15" alt="" border="0" onfocus="this.blur();" /></td>
    </tr>
    <tr>
        <td colspan="2"><a href="index.php">Return to login?</a></td>
    </tr>
</table>
</form>

<?php closePage(); ?>
