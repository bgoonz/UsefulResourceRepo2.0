<?php

// File Location: /_lib/_classes/class.session.php

require_once("class.users.php");

/** 
 * user access security
 *
 * @author Mike Buzzard <src@cubancouncil.com>
 * @version 1.0
 * @since 1.0
 * @access public
 * @copyright Wrox Press
 *
 */
class session extends users { // open the class definition
    
    /** 
     * string file path
     *
     * @var string
     * @access private
     */
    var $_sFilePath;
    
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
	 * @access public
	 */
    function session() {
        
        // implement db object
        $this->_oConn =& DB::connect(DSN);
        
        if (DB::isError($this->_oConn) ) {
            
            catchExc($this->_oConn->getMessage());
        }
        
        // assign file path variable
        $this->_sFilePath =  str_replace($_SERVER["DOCUMENT_ROOT"], "", 
                                         $_SERVER["SCRIPT_FILENAME"]);
    }
    
    // PRIVATE METHODS ::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /** 
	 * set session
	 *
     * @param array $aArgs session data
	 * @access private
	 */
    function _setSession($aArgs) {
        
        // start session
        session_start();
        
        // check session state
        if (!session_is_registered("sUSER")) {
            
            // register session
            session_register("sUSER");
            $_SESSION["sUSER"] = array();
        }
        
        // assign session value
        $sVal = implode("|", $aArgs);
        $_SESSION["sUSER"] = $sVal;
    }
    
    /** 
	 * authenticate user
	 *
     * @param array $aArgs user login
     * @return boolean
	 * @access private
	 */
    function _authenticate($aArgs) {
        
        $sql = "SELECT 
                    admin_user_id, 
                    admin_user_pass, 
                    admin_user_email, 
                    status 
                FROM 
                    ".PREFIX."_admin_users 
                WHERE 
                    admin_user_name='".$aArgs["User Name"]."' 
                    AND deleted=0";
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // assign result to array
        $aRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC);
        
        // check row count
        if ($rsTmp->numRows() < 1) {
            
            catchErr("User does not exist");
            return false;   
            
        // check record status
        } elseif ($aRow["status"] < 1) {
            
            catchErr("Account inactive");
            return false;
            
        // check password string
        } elseif (!empty($aRow["admin_user_pass"])) {
            
            // match passwords
            if (strcmp(substr(md5($aArgs["Password"]), 3, 8), $aRow["admin_user_pass"])) {
                
                catchErr("Invalid password");
                return false;
            }
            
            // assign user session array
            $aUser = array($aRow["admin_user_id"], $aArgs["User Name"], 
                           $aRow["admin_user_pass"], $aRow["admin_user_email"]);
            
            // set user session
            settype($aRow["admin_user_id"], "integer");
            $this->setUserId($aRow["admin_user_id"]);
            $this->_setSession($aUser);
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
        
        // get user ip address
        $sAddress = $_SERVER["REMOTE_ADDR"];
        
        // get user host name
        $sHost = gethostbyaddr($sAddress);
        
        $sql = "UPDATE ".PREFIX."_admin_users SET 
                    last_login_dt=(NOW()), 
                    last_login_ip='".$sAddress."', 
                    last_login_host='".$sHost."' 
                WHERE 
                    admin_user_id=".$this->_iUserId;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
    }
    
    // SELECT METHODS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /** 
	 * login user
	 *
     * @param array $aArgs user data
     * @return string
	 * @access public
	 */
    function login($aArgs) {
        
        // authenticate user
        if (!$this->_authenticate($aArgs)) {
            
            catchErr("Could not authenticate user");
            return false;
        }
        
        $sql = "SELECT 
                    app.admin_app_path 
                FROM 
                    ".PREFIX."_admin_apps app, 
                    ".PREFIX."_admin_perms perm 
                WHERE 
                    app.admin_app_id=perm.admin_app_id 
                    and perm.admin_user_id=".$this->_iUserId." 
                    and perm.admin_perm > 0 
                ORDER BY 
                    app.admin_app_id 
                LIMIT 0, 1";
        
        if (DB::isError($sPath = $this->_oConn->getOne($sql))) {
            
            catchExc($sPath->getMessage());
            return false;
        }
        
        // verify path value
        if (empty($sPath)) {
            
            catchErr("No acceptable application permissions");
            return false;
        }
        
        // update login and return path
        $this->_updateLogin();
        return $sPath;
    }
    
    /** 
	 * get user permissions
	 *
     * @param array user$aArgs session data
     * @return array
	 * @access public
	 */
    function getPerms($aArgs) {
        
        // apply path parts to array
        $sFile = array_pop(explode("/", $this->_sFilePath));
        
        // reformat path value
        $sApp = str_replace($sFile, "", $this->_sFilePath);
        
        $sql = "SELECT 
                    perm.admin_perm 
                FROM 
                    ".PREFIX."_admin_perms perm, 
                    ".PREFIX."_admin_apps app, 
                    ".PREFIX."_admin_users user 
                WHERE 
                    user.admin_user_name='".$aArgs[1]."' 
                    AND user.admin_user_pass='".$aArgs[2]."' 
                    AND user.admin_user_id=".$aArgs[0]." 
                    AND perm.admin_app_id=app.admin_app_id 
                    AND perm.admin_user_id=user.admin_user_id 
                    AND app.admin_app_path='".$sApp."'";
        
        if (DB::isError($iPerm = $this->_oConn->getOne($sql))) {
            
            catchExc($iPerm->getMessage());
            return false;
        }
        
        // if permitted, set session and return permission
        if ($iPerm > 0) {
            
            $this->_setSession($aArgs);
            return $iPerm;
        }
        
        return false;
    }
    
    /** 
	 * get application menu
	 *
     * @return array
	 * @access public
	 */
    function getMenu() {
        
        $sql = "SELECT 
                    app.admin_app_name, 
                    app.admin_app_path, 
                    perm.admin_perm 
                FROM 
                    ".PREFIX."_admin_apps app, 
                    ".PREFIX."_admin_perms perm 
                WHERE 
                    app.admin_app_id=perm.admin_app_id 
                    AND perm.admin_user_id=".$this->_iUserId." 
                    AND perm.admin_perm > 0 
                ORDER BY 
                    app.admin_app_id";
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // loop result and build return array
        $i = 0;
        while ($aRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC)) {
            $return[$i]["App Name"] = $aRow["admin_app_name"];
            $return[$i]["App Path"] = $aRow["admin_app_path"];
            $return[$i]["App Perm"] = $aRow["admin_app_perm"];
            ++$i;
        }
        return $return;
    }
} // close the class definition

?>