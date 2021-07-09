<?php

// File Location: /_lib/_classes/class.accounts.php

require_once("Mail.php");
require_once("DB.php");

/** 
 * handles account functions
 *
 * @author Mike Buzzard <src@cubancouncil.com>
 * @version 1.0
 * @since 1.0
 * @access public
 * @copyright Wrox Press
 *
 */
class accounts { // open the class definition
    
    /** 
     * unique identifier for an account
     *
     * @var integer
     * @access private
     * @see setAccountId()
     */
    var $_iAccountId;
    
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
     * @param integer $iAccountId [optional] account identifier
     * @access public
     */
    function accounts($iAccountId = '') {
        
        // implement pear mail object
        $this->_oMail =& Mail::factory("mail");
        
        if (Mail::isError($this->_oMail)) {
            
            catchExc($this->_oMail->getMessage());
        }
        
        // implement pear db object
        $this->_oConn =& DB::connect(DSN);
        
        if (DB::isError($this->_oConn) ) {
            
            catchExc($this->_oConn->getMessage());
        }
        
        // set account id
        if (is_int($iAccountId)) {
            
            $this->setAccountId($iAccountId);
        }
    }
    
    // PRIVATE METHODS ::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /** 
	 * sets session values for a user
	 *
     * @param array $aArgs session data
	 * @access private
	 */
    function _setSession($aArgs) {
        
        // create string from account array values
        $sVal = implode("|", $aArgs);
        
        // set account session cookie
        setcookie("cACCOUNT", $sVal, time()+(TIMEOUT / 2), "/", "", "");
    }
    
    /** 
     * verify unique screen name
     *
     * @param string $sScreenName screen name
     * @return integer
     * @access private
     */
    function _screenNameExists($sScreenName) {
        
        // check for matching screen name
        $sql = "SELECT 
                    account_id 
                FROM 
                    ".PREFIX."_accounts 
                WHERE 
                    account_screenname='".$sScreenName."' 
                    and deleted=0";
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // return matching number of rows
        $return = $rsTmp->numRows();
        return $return;
    }
    
    /** 
     * verify unique email address
     *
     * @param string $sEmail email address
     * @return integer
     * @access private
     */
    function _accountEmailExists($sEmail) {
        
        // check for valid _iAccountId member value
        if (is_int($this->_iAccountId)) {
            
            $sFilter = " AND account_id != ". $this->_iAccountId;
        }
        
        // get matching email address
        $sql = "SELECT 
                    account_id 
                FROM 
                    ".PREFIX."_accounts 
                WHERE 
                    account_email='".$sEmail."'".$sFilter." 
                    AND deleted=0";
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // returnmatching number of rows
        $return = $rsTmp->numRows();
        return $return;
    }
    
    /** 
     * send mail notification to user
     *
     * @param string $sBody email body to send
     * @return boolean
     * @access private
     */
    function _notifyAccount($sBody) {
        
        // get account information and assign mail members
        $aAccount = $this->getAccount();
        $aHeaders["To"] = $sRecipients = $aAccount["Email"];
        $aHeaders["From"] = ENTITY." <".EMAIL.">";
        $aHeaders["Subject"] = ENTITY." User Account Notification";
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
	 * authenticate user account
	 *
     * @param array $aArgs user login values
     * @return boolean
	 * @access private
	 */
    function _authenticate($aArgs) {
        
        // get account information
        $sql = "SELECT 
                    account_id, 
                    account_pass, 
                    account_email, 
                    account_screenname, 
                    status 
                FROM 
                    ".PREFIX."_accounts 
                WHERE 
                    account_email='".$aArgs["Email"]."' 
                    AND deleted=0";
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // capture query results
        $aRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC);
        
        // check if account exists
        if ($rsTmp->numRows() < 1) {
            
            catchErr("User Account does not exist");
            return false;   
            
        // check account status
        } elseif ($aRow["status"] < 1) {
            
            catchErr("Account inactive");
            return false;
            
        // make sure the password exists
        } elseif (!empty($aRow["account_pass"])) {
            
            // check acocunt password value against the user entered password
            if (strcmp(substr(md5($aArgs["Password"]), 3, 8), $aRow["account_pass"])) {
                
                catchErr("Invalid password");
                return false;
            }
            
            // assign account array values
            $aAccount = array($aRow["account_id"], $aRow["account_screenname"], 
                              $aRow["account_email"], $aRow["account_pass"]);
            
            // update account session
            settype($aRow["account_id"], "integer");
            $this->setAccountId($iAccountId);
            $this->_setSession($aAccount);
            return true;
        }
    }
    
    /** 
	 * update user login values
	 *
     * @return boolean
	 * @access private
	 */
    function _updateLogin() {
        
        // get remote user ip address
        $sAddress = $_SERVER["REMOTE_ADDR"];
        
        // lookup hostname if available
        $sHost = gethostbyaddr($sAddress);
        
        // update login records
        $sql = "UPDATE ".PREFIX."_accounts SET 
                    last_login_dt=(NOW()), 
                    last_login_ip='".$sAddress."', 
                    last_login_host='".$sHost."' 
                WHERE 
                    account_id=".$this->_iAccountId;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
    }
    
    // PUBLIC METHODS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /**
     * set the unique identifier variable for the class
     *
     * @param integer $iAccountId unique identifier
     * @access public
     */
    function setAccountId($iAccountId) {
        
        // assign unique identifier
        if (is_int($iAccountId)) {
            
            $this->_iAccountId = $iAccountId;
        }
    }
    
    /**
     * get the user account session values
     *
     * @return array session data
     * @access public
     */
    function getSession() {
        
        // check for account session cookie
        if (isset($_COOKIE["cACCOUNT"])) {
            
            // apply account session values to an array
            $aSess = explode("|", $_COOKIE["cACCOUNT"]);
            $return["Account Id"] = $aSess[0];
            $return["Screen Name"] = $aSess[1];
            $return["Email"] = $aSess[2];
            $return["Password"] = $aSess[3];
            return $return;
        }
        
        return false;
    }
    
    /**
     * validate the user account session
     *
     * @return boolean
     * @access public
     */
    function validateSession() {
        
        // if the session array is active
        if ($aUser = $this->getSession()) {
            
            // validate account credentials
            $sql = "SELECT 
                        account_id 
                    FROM 
                        ".PREFIX."_accounts 
                    WHERE 
                        account_id=".$aUser["Account Id"]." 
                        AND account_pass='".$aUser["Password"]."' 
                        AND account_email='".$aUser["Email"]."' 
                        AND account_screenname='".$aUser["Screen Name"]."' 
                        AND status=1 
                        AND deleted=0";
            
            if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
                
                catchExc($rsTmp->getMessage());
                return false;
            }
            
            // verify single record for account
            if (!strcmp(1, $rsTmp->numRows())) {
                
                // update session
                $this->_setSession($aUser);
                $iAccountId = (int) $aUser["Account Id"];
                $this->setAccountId($iAccountId);
                return true;
            }
            
            return false;
        }
        
        return false;
    }
    
    /**
     * send an account password reminder to the associated user
     *
     * @param array $aArgs user login data
     * @return boolean
     * @access public
     */
    function sendReminder($aArgs) {
        
        // get account info from screen name
        $sql = "SELECT 
                    account_id, 
                    account_email 
                FROM 
                    ".PREFIX."_accounts 
                WHERE 
                    account_screenname='".$aArgs["Screen Name"]."' 
                    AND status=1 and 
                    deleted=0";
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // verify single record
        if ($rsTmp->numRows() < 1) {
            
            catchErr("Cannot find user account information");
            return false;
        }
        
        // assign result values
        $aRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC);
        
        // compare email addresses
        if (strcmp($aRow["account_email"], $aArgs["Email"])) {
            
            catchErr("Account email does not match account information");
            return false;
        }
        
        // get account info
        settype($aRow["account_id"], "integer");
        $this->setAccountId($aRow["account_id"]);
        $aAccount = $this->getAccount();
        
        $sBody = "Your ".ENTITY." account login information is:\r\n\r\n";
        $sBody .= "Email: ".$aAccount["Email"]."\r\n";
        $sBody .= "Password: ".$aAccount["Password Reminder"];
        
        // send email
        return $this->_notifyAccount($sBody);
    }
    
    // SELECT METHODS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /** 
	 * login to a user account
	 *
     * @param array $aArgs user login data
     * @return boolean
	 * @access public
	 */
    function login($aArgs) {
        
        // try authentication
        if ($this->_authenticate($aArgs)) {
            
            // update login information
            $this->_updateLogin();
            return true;
        }
    }
    
    // SELECT METHODS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /** 
     * get a single account by account id
     *
     * @return array account data
     * @access public
     */
    function getAccount() {
        
        // get account values
        $sql = "SELECT 
                    account_id, 
                    account_pass, 
                    account_remind, 
                    account_email, 
                    account_screenname, 
                    last_login_ip, 
                    last_login_host, 
                    last_login_dt, 
                    status, 
                    created_dt, 
                    modified_dt 
                FROM 
                    ".PREFIX."_accounts 
                WHERE 
                    account_id=".$this->_iAccountId;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // assign account values
        $aRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC);
        
        // build associative array of account data
        $return["Account Id"] = $aRow["account_id"];
        $return["Password"] = $aRow["account_pass"];
        $return["Password Reminder"] = $aRow["account_remind"];
        $return["Email"] = $aRow["account_email"];
        $return["Screen Name"] = $aRow["account_screenname"];
        $return["Account Address"] = $this->getAccountAddress();
        $return["Account Preferences"] = $this->getPreferences();
        $return["Login Address"] = $aRow["last_login_ip"];
        $return["Login Host"] = $aRow["last_login_host"];
        $return["Login Date"] = strtotime($aRow["last_login_dt"]);
        $return["Status"] = $aRow["status"];
        $return["Created Date"] = strtotime($aRow["created_dt"]);
        $return["Modified Date"] = strtotime($aRow["modified_dt"]);
        return $return;
    }
    
    /** 
     * get account preferences for a user account
     *
     * @return array
     * @access public
     */
    function getPreferences() {
        
        // get account preferences
        $sql = "SELECT 
                    newsletter_recipient 
                FROM 
                    ".PREFIX."_account_prefs 
                WHERE 
                    account_id=".$this->_iAccountId;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // if preferences exist
        if ($rsTmp->numRows()) {
            
            // assign preferences to variables
            $aRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC);
            
            // build associative array of preferences
            $return["Newsletter Recipient"] = $aRow["newsletter_recipient"];
            return $return;
        }
    }
    
    /** 
     * get account address for a user account
     *
     * @return array
     * @access public
     */
    function getAccountAddress() {
        
        // get account address info
        $sql = "SELECT 
                    account_addr_id, 
                    account_addr_name, 
                    account_addr_company, 
                    account_addr_street, 
                    account_addr_street_ext, 
                    account_addr_city, 
                    account_addr_state, 
                    account_addr_country, 
                    account_addr_postal, 
                    account_addr_phone 
                FROM 
                    ".PREFIX."_account_addr 
                WHERE 
                    deleted=0 
                    AND account_id=".$this->_iAccountId;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // if address exists
        if ($rsTmp->numRows()) {
            
            // assign address values
            $aRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC);
            
            // build associative array of address values
            $return["Address Id"] = $aRow["account_addr_id"];
            $return["Address Name"] = $aRow["account_addr_name"];
            $return["Address Company"] = $aRow["account_addr_company"];
            $return["Address Street"] = $aRow["account_addr_street"];
            $return["Address Street Ext"] = $aRow["account_addr_street_ext"];
            $return["Address City"] = $aRow["account_addr_city"];
            $return["Address State"] = $aRow["account_addr_state"];
            $return["Address Country"] = $aRow["account_addr_country"];
            $return["Address Postal"] = $aRow["account_addr_postal"];
            $return["Address Phone"] = $aRow["account_addr_phone"];
            return $return;
        }
    }
    
    // INSERT METHODS ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /** 
     * add a new account record
     *
     * @param array $aArgs user account data
     * @return boolean
     * @access public
     */
    function addAccount($aArgs) {
        
        // assign password values
        $sPasswordRemind = $aArgs["Password"];
        $sPassword = substr(md5($sPasswordRemind), 3 , 8);
        
        // check for screen name
        if ($this->_screenNameExists($aArgs["Screen Name"])) {
            
            catchErr("This screen name already exists");
            return false;
            
        // check for email
        } else if ($this->_accountEmailExists($aArgs["Email"])) {
            
            catchErr("This email address already exists");
            return false;
            
        } else {
            
            // lock tables to capture unique id accurately
            $sql = "LOCK TABLES ".PREFIX."_accounts WRITE";
            
            if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
                
                catchExc($rsTmp->getMessage());
                return false;
            }
            
            // insert new account record
            $sql = "INSERT INTO ".PREFIX."_accounts (
                        account_pass, 
                        account_remind, 
                        account_email, 
                        account_screenname, 
                        status, 
                        created_dt, 
                        modified_dt
                    ) values (
                        '".$sPassword."', 
                        '".$sPasswordRemind."', 
                        '".$aArgs["Email"]."', 
                        '".$aArgs["Screen Name"]."', 
                        1, 
                        (NOW()), 
                        (NOW())
                    )";
            
            if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
                
                catchExc($rsTmp->getMessage());
                return false;
            }
            
            // get newest account identifier from added record
            $sql = "SELECT MAX(account_id) FROM ".PREFIX."_accounts";
            
            if (DB::isError($iAccountId = $this->_oConn->getOne($sql))) {
                
                catchExc($iAccountId->getMessage());
                return false;
            }
            
            // set unique identifier member variable
            settype($iAccountId, "integer");
            $this->setAccountId($iAccountId);
            
            // unlock tables
            $sql = "UNLOCK TABLES";
            
            if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
                
                catchExc($rsTmp->getMessage());
                return false;
            }
            
            // add new record for account preferences
            $sql = "INSERT INTO ".PREFIX."_account_prefs (
                        account_id,
                        created_dt
                    ) values (
                        ".$this->_iAccountId.", 
                        (NOW())
                    )";
            
            if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
                
                catchExc($rsTmp->getMessage());
                return false;
            }
            
            // build email body
            $sBody = "Your ".ENTITY." account has been created.\r\n";
            $sBody .= "Your login information is:\r\n\r\n"; 
            $sBody .= "Email: ".$aArgs["Email"]."\r\n";
            $sBody .= "Password: ".$sPasswordRemind;
            
            return $this->_notifyAccount($sBody);
        }
    }
    
    // UPDATE METHODS ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /** 
     * update an existing account record by acount id
     *
     * @param array $aArgs user account data
     * @return boolean
     * @access public
     */
    function updateAccount($aArgs) {
        
        // initialize sql filter
        $sFilter = "";
        
        // check for email address
        if ($this->_accountEmailExists($aArgs["Email"])) {
            
            catchErr("This email address already exists");
            return false;
        }
        
        // verify password value
        if (strcmp("", $aArgs["Password"])) {
            
            // create password variables
            $sPasswordRemind = $aArgs["Password"];
            $sPassword = substr(md5($sPasswordRemind), 3 , 8);
            
            // add sql filter
            $sFilter = " account_pass='".$sPassword."', 
            account_remind='".$sPasswordRemind."',";
        }
        
        // update account record
        $sql = "UPDATE ".PREFIX."_accounts SET 
                    account_email='".$aArgs["Email"]."', 
                    ".$sFilter." 
                    modified_dt=(NOW()) 
                WHERE 
                    account_id=".$this->_iAccountId;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        return true;
    }
    
    /** 
     * update account preferences by account id
     *
     * @param array $aArgs account preferences data
     * @return boolean
     * @access public
     */
    function updatePreferences($aArgs) {
        
        // update account preferences
        $sql = "UPDATE ".PREFIX."_account_prefs
                SET 
                    newsletter_recipient=".$aArgs["Newsletter Recipient"].", 
                    modified_dt=(NOW()) 
                WHERE 
                    account_id=".$this->_iAccountId;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchErr("This email address already exists");
            return false;
        }
        
        return true;
    }
    
    /** 
     * update account address by account id, insert a new record if one 
     * does not exist
     *
     * @param array $aArgs account billing address data
     * @return boolean
     * @access public
     */
    function updateAccountAddress($aArgs) {
        
        // update account address, check operation for add or edit
        if (!strcmp("add", $aArgs["Operation"])) {
            
            // insert new record
            $sql = "INSERT INTO ".PREFIX."_account_addr (
                        account_id, 
                        account_addr_name, 
                        account_addr_company, 
                        account_addr_street, 
                        account_addr_street_ext, 
                        account_addr_city, 
                        account_addr_state, 
                        account_addr_country, 
                        account_addr_postal, 
                        account_addr_phone, 
                        created_dt
                    ) values (
                        ".$this->_iAccountId.", 
                        '".$aArgs["Name"]."', 
                        '".$aArgs["Company"]."', 
                        '".$aArgs["Street"]."', 
                        '".$aArgs["Street Ext"]."', 
                        '".$aArgs["City"]."', 
                        '".$aArgs["State"]."', 
                        '".$aArgs["Country"]."', 
                        '".$aArgs["Postal"]."', 
                        '".$aArgs["Phone"]."', 
                        (NOW())
                    )";
            
        } elseif (!strcmp("edit", $aArgs["Operation"])) {
            
            // update existing record
            $sql = "UPDATE ".PREFIX."_account_addr SET 
                        account_addr_name='".$aArgs["Name"]."', 
                        account_addr_company='".$aArgs["Company"]."', 
                        account_addr_street='".$aArgs["Street"]."', 
                        account_addr_street_ext='".$aArgs["Street Ext"]."', 
                        account_addr_city='".$aArgs["City"]."', 
                        account_addr_state='".$aArgs["State"]."', 
                        account_addr_country='".$aArgs["Country"]."', 
                        account_addr_postal='".$aArgs["Postal"]."', 
                        account_addr_phone='".$aArgs["Phone"]."', 
                        modified_dt=(NOW()) 
                    WHERE 
                        account_id=".$this->_iAccountId;
        }
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        return true;
    }
} // close the class definition

?>