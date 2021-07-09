<?php

// File Location: /_lib/_classes/class.users.php

require_once("Mail.php");
require_once("DB.php");

/** 
 * handles user functions
 *
 * @author Mike Buzzard <src@cubancouncil.com>
 * @version 1.0
 * @since 1.0
 * @access public
 * @copyright Wrox Press
 *
 */
class users { // open the class definition
    
    /** 
     * class member variables
     *
     * @var integer
     * @access private
     * @see setUserId()
     */
    var $_iUserId;
    
    /** 
     * PEAR mail object
     *
     * @var object
     * @access private
     */
    var $_oMail;
    
    /** 
     * PEAR db object
     *
     * @var object
     * @access private
     */
    var $_oConn;
    
    // CONSTRUCTOR ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /** 
     * class constructor
     *
     * @param integer user id [optional]
     * @access public
     */
    function users($iUserId = '') {
        
        // implement pear mail object
        $this->_oMail =& Mail::factory("mail");
        
        if (Mail::isError($this->_oMail)) {
            
            catchExc($this->_oMail->getMessage());
        }
        
        // implement db object
        $this->_oConn =& DB::connect(DSN);
        
        if (DB::isError($this->_oConn) ) {
            
            catchExc($this->_oConn->getMessage());
        }
        
        // set unique identifier
        if (is_int($iUserId)) {
            
            $this->setUserId($iUserId);
        }
    }
    
    // PRIVATE METHODS ::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /** 
     * reset user password
     *
     * @return boolean
     * @access private
     */
    function _resetPassword() {
        
        // generate random unique password
        $sPasswordRemind = substr(md5(uniqid(rand(1, 100000))), 3, 8);
        
        // encrypt password
        $sPassword = substr(md5($sPasswordRemind), 3, 8);
        
        // update user account record
        $sql = "UPDATE ".PREFIX."_admin_users SET 
                    admin_user_pass='".$sPassword."', 
                    admin_user_remind='".$sPasswordRemind."', 
                    modified_dt=(NOW()) 
                WHERE 
                    admin_user_id=".$this->_iUserId;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // send user email
        $sBody = "Your ".ENTITY." password has been reset.\r\n\r\n";
        $sBody .= "Your new password is ".$sPasswordRemind;
        
        return $this->_notifyUser($sBody);
    }
    
    /** 
     * verify unique user name
     *
     * @param string $sUser user name
     * @return boolean
     * @access private
     */
    function _userExists($sUser) {
        
        $sql = "SELECT 
                    admin_user_id 
                FROM 
                    ".PREFIX."_admin_users 
                WHERE 
                    admin_user_name='".$sUser."' 
                    AND deleted=0";
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // return number of matches
        $return = $rsTmp->numRows();
        return $return;
    }
    
    /** 
     * verify unique email address
     *
     * @param string $sEmail email address
     * @return boolean
     * @access private
     */
    function _emailExists($sEmail) {
        
        $sql = "SELECT 
                    admin_user_id 
                FROM 
                    ".PREFIX."_admin_users 
                WHERE 
                    admin_user_email='".$sEmail."' 
                    AND deleted=0";
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // reutrn number of matches
        $return = $rsTmp->numRows();
        return $return;
    }
    
    /** 
     * send email notification
     *
     * @param string $sBody email body
     * @return boolean
     * @access private
     */
    function _notifyUser($sBody) {
        
        // assign mail properties
        $aUser = $this->getUser();
        $aHeaders["To"] = $sRecipients = $aUser["Email"];
        $aHeaders["From"] = ENTITY." Admin <".EMAIL.">";
        $aHeaders["Subject"] = ENTITY." System Account Notification";
        $aHeaders["Priority"] = "3";
        
        // try to send mail
        if (Mail::isError($mailTmp = $this->_oMail->send($sRecipients, 
                                                         $aHeaders, $sBody))) {
            catchExc($mailTmp->getMessage());
            return false;
        }
        
        return true;
    }
    
    /** 
	 * set user permissions
	 *
     * @param array permissions
     * @return boolean
	 * @access private
	 */
    function _setPerms($aPerms) {
        
        // check perms array
        if (count($aPerms)) {
            
            $sql = "DELETE FROM 
                        ".PREFIX."_admin_perms 
                    WHERE 
                        admin_user_id=".$this->_iUserId;
            
            if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
                
                catchExc($rsTmp->getMessage());
                return false;
            }
            
            // loop through permissions array
            while (list($key, $val) = each($aPerms)) {
                
                // add new permission record
                $sql = "INSERT INTO ".PREFIX."_admin_perms (
                            admin_user_id, 
                            admin_app_id, 
                            admin_perm
                        ) values (
                            ".$this->_iUserId.", 
                            ".$key.", 
                            ".$val."
                        )";
                
                if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
                    
                    catchExc($rsTmp->getMessage());
                    return false;
                }
            }
            
            return true;
        }
    }
     
    // PUBLIC METHODS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /**
     * set the _iUserId variable for the class
     *
     * @param integer $iUserId unique identifier
     * @access public
     */
    function setUserId($iUserId) {
        
        if (is_int($iUserId)) {
            
            $this->_iUserId = $iUserId;
        }
    }
    
    // SELECT METHODS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /**
     * send password reminder
     *
     * @param array $aArgs user values
     * @return boolean
     * @access public
     */
    function sendReminder($aArgs) {
        
        $sql = "SELECT 
                    admin_user_id, 
                    admin_user_email 
                FROM 
                    ".PREFIX."_admin_users 
                WHERE 
                    admin_user_name='".$aArgs["User Name"]."' 
                    AND status=1 
                    AND deleted=0";
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
            
        if ($rsTmp->numRows() > 0) {
            
            $aRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC);
            
            if (strcmp($aRow["admin_user_email"], $aArgs["Email"])) {
                
                catchErr("User email does not match account information");
                return false;
            }
            
            // set clas memeber unique identifier and get user data
            settype($aRow["admin_user_id"], "integer");
            $this->setUserId($aRow["admin_user_id"]);
            $aUser = $this->getUser();
            
            // build email body
            $sBody = "Your ".ENTITY." account login information is:\r\n\r\n";
            $sBody .= "User Name: ".$aUser["User Name"]."\r\n";
            $sBody .= "Password: ".$aUser["Password Reminder"];
            
            return $this->_notifyUser($sBody);
            
        } else {
            
            catchErr("Cannot find user account information");
            return false;
        }
    }
    
    /** 
     * get a user single user by id
     *
     * @return array user data
     * @access public
     */
    function getUser() {
        
        $sql = "SELECT 
                    admin_user_id, 
                    admin_user_name, 
                    admin_user_pass, 
                    admin_user_remind, 
                    admin_user_email, 
                    last_login_dt, 
                    last_login_ip, 
                    last_login_host, 
                    status, 
                    created_dt, 
                    modified_dt 
                FROM 
                    ".PREFIX."_admin_users 
                WHERE 
                    admin_user_id=".$this->_iUserId;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // assign result to array
        $aRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC);
        
        // build user array to return
        $return["User Id"] = $aRow["admin_user_id"];
        $return["User Name"] = $aRow["admin_user_name"];
        $return["Password"] = $aRow["admin_user_pass"];
        $return["Password Reminder"] = $aRow["admin_user_remind"];
        $return["Email"] = $aRow["admin_user_email"];
        $return["Login Date"] = strtotime($aRow["last_login_dt"]);
        $return["Login Address"] = $aRow["last_login_ip"];
        $return["Login Host"] = $aRow["last_login_host"];
        $return["Status"] = $aRow["status"];
        $return["Created Date"] = strtotime($aRow["created_dt"]);
        $return["Modified Date"] = strtotime($aRow["modified_dt"]);
        
        // get permissions for user
        $sql = "SELECT 
                    app.admin_app_id, 
                    perm.admin_perm 
                FROM 
                    ".PREFIX."_admin_apps app, 
                    ".PREFIX."_admin_perms perm 
                WHERE 
                    perm.admin_app_id=app.admin_app_id 
                    AND perm.admin_user_id=".$this->_iUserId." 
                ORDER BY 
                    app.admin_app_id";
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // build permissions array to return
        while ($aRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC)) {
            
            $return["Perms"][$aRow["admin_app_id"]] = $aRow["admin_perm"];
        }
        
        return $return;
    }
    
    /** 
     * get users count for paging
     *
     * @return integer record count
     * @access public
     */
     function getUsersCount() {
        
        $sql = "SELECT COUNT(admin_user_id) AS user_cnt 
                FROM 
                    ".PREFIX."_admin_users 
                WHERE 
                    deleted=0 
                    AND admin_user_name != 'admin'";
        
        if (DB::isError($iCnt = $this->_oConn->getOne($sql))) {
            
            catchExc($iCnt->getMessage());
            return false;
        }
        
        return $iCnt;
     }
     
    /** 
     * get users list
     *
     * @param string $sSort sort key
     * @param integer $iPage [optional] cursor
     * @return array user data
     * @access public
     */
    function getUsers($sSort, $iPage=0) {
        
        // get a list of all users
        $sql = "SELECT 
                    admin_user_id, 
                    admin_user_name, 
                    admin_user_pass, 
                    admin_user_remind, 
                    admin_user_email, 
                    status, 
                    created_dt, 
                    modified_dt 
                FROM 
                    ".PREFIX."_admin_users 
                WHERE 
                    deleted=0 
                    AND admin_user_name != 'admin' 
                ORDER BY 
                    ".$sSort." 
                LIMIT ".$iPage.", ".ROWCOUNT;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // loop through result and build return array
        $i = 0;
        while ($aRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC)) {
            
            $return[$i]["User Id"] = $aRow["admin_user_id"];
            $return[$i]["User Name"] = $aRow["admin_user_name"];
            $return[$i]["User Password"] = $aRow["admin_user_pass"];
            $return[$i]["User Password Reminder"] = $aRow["admin_user_remind"];
            $return[$i]["User Email"] = $aRow["admin_user_email"];
            $return[$i]["Status"] = $aRow["status"];
            $return[$i]["Created Date"] = strtotime($aRow["created_dt"]);
            $return[$i]["Modified Date"] = strtotime($aRow["modified_dt"]);
            ++$i;
        }
        return $return;
    }    
    
    /** 
     * get applications list
     *
     * @return array applications data
     * @access public
     */
    function getApps() {
        
        $sql = "SELECT 
                    admin_app_id, 
                    admin_app_name 
                FROM 
                    ".PREFIX."_admin_apps 
                ORDER BY 
                    admin_app_id";
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        $i = 0;
        while ($aRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC)) {
        
            $return[$i]["App Id"] = $aRow["admin_app_id"];
            $return[$i]["App Name"] = $aRow["admin_app_name"];
            $return[$i]["Perm"] = 0;
            ++$i;
        }
        return $return;
    }
     
    // INSERT METHODS ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /** 
     * add a new user record
     *
     * @param array $aArgs user data
     * @return boolean
     * @access public
     */
    function addUser($aArgs) {
        
        // generate random unique password
        $sPasswordRemind = substr(md5(uniqid(rand(1, 100000))), 3, 8);
        
        // encrypt new password
        $sPassword = substr(md5($sPasswordRemind), 3 , 8);
        
        // check for existing user name
        if ($this->_userExists($aArgs["User Name"])) {
            
            catchErr("This user name already exists");
            return false;
            
        // check for existing email
        } else if ($this->_emailExists($aArgs["Email"])) {
            
            catchErr("This email address already exists");
            return false;
            
        } else {
            
            // lock tables to capture unique identifier
            $sql = "LOCK TABLES ".PREFIX."_admin_users WRITE";
            
            if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
                
                catchExc($rsTmp->getMessage());
                return false;
            }
            
            // add new user record
            $sql = "INSERT INTO ".PREFIX."_admin_users (
                        admin_user_name, 
                        admin_user_pass, 
                        admin_user_remind, 
                        admin_user_email, 
                        status, 
                        created_dt, 
                        modified_dt
                    ) values (
                        '".$aArgs["User Name"]."', 
                        '".$sPassword."', 
                        '".$sPasswordRemind."', 
                        '".$aArgs["Email"]."', 
                        1, 
                        (NOW()), 
                        (NOW())
                    )";
            
            if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
                
                catchExc($rsTmp->getMessage());
                return false;
            }
            
            // get unique identifier for new record
            $sql = "SELECT MAX(admin_user_id) FROM ".PREFIX."_admin_users";
            
            if (DB::isError($iUserId = $this->_oConn->getOne($sql))) {
                
                catchExc($iUserId->getMessage());
                return false;
            }
            
            $sql = "UNLOCK TABLES";
            
            if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
                
                catchExc($rsTmp->getMessage());
                return false;
            }
            
            // set member variable for unique identifier
            settype($iUserId, "integer");
            $this->setUserId($iUserId);
            
            // set permissions values
            $this->_setPerms($aArgs["Perms"]);
            
            // build user email
            $sBody = "Your ".ENTITY." account has been created.\r\n";
            $sBody .= "Your login information is:\r\n\r\n"; 
            $sBody .= "User Name: ".$aArgs["User Name"]."\r\n";
            $sBody .= "Password: ".$sPasswordRemind;
            
            return $this->_notifyUser($sBody);
        }
    }
    
    // UPDATE METHODS ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /** 
     * edit an existing user record
     *
     * @param array user data
     * @return boolean
     * @access public
     */
    function editUser($aArgs) {
        
        // update user record
        $sql = "UPDATE ".PREFIX."_admin_users SET 
                    admin_user_email='".$aArgs["Email"]."', 
                    modified_dt=(NOW()) 
                WHERE 
                    admin_user_id=".$this->_iUserId;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // check to reset user password
        if ($aArgs["Reset"]) {
            
            // reset user password
            $this->_resetPassword();
        }
        
        // update user permission records
        $this->_setPerms($aArgs["Perms"]);
        return true;
    }
    
    /** 
     * update user settings
     *
     * @param array user data
     * @return boolean
     * @access public
     */
    function updateSettings($aArgs) {
        
        // initialize sql filter
        $sFilter = "";
        
        if (!empty($aArgs["Password"])) {
            
            // generate new password and add sql filter
            $sPasswordRemind = $aArgs["Password"];
            $sPassword = substr(md5($sPasswordRemind), 3 , 8);
            $sFilter = " admin_user_pass='".$sPassword."', 
            admin_user_remind='".$sPasswordRemind."',";
        }
        
        // update user record
        $sql = "UPDATE ".PREFIX."_admin_users SET 
                    admin_user_email='".$aArgs["Email"]."',".$sFilter." 
                    modified_dt=(NOW()) 
                WHERE 
                    admin_user_id=".$this->_iUserId;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        return true;
    }
    
    /** 
     * delete a user record
     *
     * @return boolean
     * @access public
     */
    function deleteUser() {
        
        $sql = "UPDATE ".PREFIX."_admin_users SET 
                    deleted=1, 
                    deleted_dt=(NOW()) 
                WHERE 
                    admin_user_id=".$this->_iUserId;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        $this->deactivateUser();
        return true;
    }
    
    /** 
     * activate a user record
     *
     * @return boolean
     * @access public
     */
    function activateUser() {
        
        $sql = "UPDATE ".PREFIX."_admin_users SET 
                    status=1 
                WHERE 
                    admin_user_id=".$this->_iUserId;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // build user email
        $aUser = $this->getUser();
        $sBody = "Your ".ENTITY." account has been activated.\r\n";
        $sBody .= "Your login information is:\r\n\r\n";
        $sBody .= "User Name: ".$aUser["User Name"]."\r\n";
        $sBody .= "Password: ".$aUser["Password Reminder"];
        
        return $this->_notifyUser($sBody);
    }
    
    /** 
     * deactivate a user record
     *
     * @return boolean
     * @access public
     */
    function deactivateUser() {
        
        $sql = "UPDATE ".PREFIX."_admin_users SET 
                    status=0 
                WHERE 
                    admin_user_id=".$this->_iUserId;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // build user email
        $sBody = "Your ".ENTITY." account has been deactivated.";
        
        return $this->_notifyUser($sBody);
    }
} // close the class definition

?>
