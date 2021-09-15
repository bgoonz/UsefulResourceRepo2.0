<?php

// File Location: /_lib/_classes/class.ads.php

require_once("DB.php");

/** 
 * handles advertisement functions
 *
 * @author Mike Buzzard <src@cubancouncil.com>
 * @version 1.0
 * @since 1.0
 * @access public
 * @copyright Wrox Press
 *
 */
class ads { // open the class definition
    
    /** 
     * unique identifier for an advertisement
     *
     * @var integer
     * @access private
     * @see setId()
     */
    var $_id;
    
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
     * @param integer $id [optional] advertisement identifier
     * @access public
     */
    function ads($id = '') {
        
        // implement pear db object
        $this->_oConn =& DB::connect(DSN);
        
        if (DB::isError($this->_oConn) ) {
            
            catchExc($this->_oConn->getMessage());
        }
        
        // set ad id
        if (is_int($id)) {
            
            $this->setId($id);
        }
    }
    
    // PUBLIC METHODS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /**
     * set the _id member variable for the class
     *
     * @param integer $id unique identifier
     * @access public
     */
    function setId($id) {
        
        if (is_int($id)) {
            
            $this->_id = $id;
        }
    }
    
    // SELECT METHODS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /** 
     * get advertisements count for paging
     *
     * @return boolean
     * @access private
     */
    function getAdsCount() {
        
        $sql = "SELECT 
                    count(ad_id) AS cnt 
                FROM 
                    ".PREFIX."_ads 
                WHERE 
                    deleted=0";
        
        if (DB::isError($iCnt = $this->_oConn->getOne($sql))) {
            
            catchExc($iCnt->getMessage());
            return false;
        }
        
        return $iCnt;
    }
    
    /** 
     * get clients count for paging
     *
     * @return boolean
     * @access private
     */
    function getClientsCount() {
        
        $sql = "SELECT 
                    count(ad_client_id) AS cnt 
                FROM 
                    ".PREFIX."_ads_clients 
                WHERE 
                    deleted=0";
        
        if (DB::isError($iCnt = $this->_oConn->getOne($sql))) {
            
            catchExc($iCnt->getMessage());
            return false;
        }
        
        return $iCnt;
    }
    
    /** 
     * get advertisements list
     *
     * @param string $sSort sort key
     * @param integer $iPage [optional] cursor
     * @return array advertisements data
     * @access public
     */
    function getAds($sSort, $iPage=0) {
        
        $sql = "SELECT 
                    ad_id, 
                    ad_title, 
                    status, 
                    created_dt, 
                    modified_dt 
                FROM 
                    ".PREFIX."_ads 
                WHERE 
                    deleted=0 
                ORDER BY 
                    ".$sSort." 
                LIMIT ".$iPage.", ".ROWCOUNT;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // loop through result and return data collection
        $i = 0;
        while ($aRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC)) {
            
            $return[$i]["Ad Id"] = $aRow["ad_id"];
            $return[$i]["Title"] = $aRow["ad_title"];
            $return[$i]["Status"] = $aRow["status"];
            $return[$i]["Created Date"] = strtotime($aRow["created_dt"]);
            $return[$i]["Modified Date"] = strtotime($aRow["modified_dt"]);
            ++$i;
        }
        return $return;
    }
    
    /** 
     * get clients list
     *
     * @param string $sSort sort key
     * @param integer $iPage [optional] cursor
     * @return array advertisements data
     * @access public
     */
    function getClients($sSort, $iPage=0) {
        
        $sql = "SELECT 
                    ad_client_id, 
                    ad_client_name, 
                    status, 
                    created_dt, 
                    modified_dt 
                FROM 
                    ".PREFIX."_ads_clients 
                WHERE 
                    deleted=0 
                ORDER BY 
                    ".$sSort." 
                LIMIT ".$iPage.", ".ROWCOUNT;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // loop through result and return data collection
        $i = 0;
        while ($aRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC)) {
            
            $return[$i]["Client Id"] = $aRow["ad_client_id"];
            $return[$i]["Client"] = $aRow["ad_client_name"];
            $return[$i]["Status"] = $aRow["status"];
            $return[$i]["Created Date"] = strtotime($aRow["created_dt"]);
            $return[$i]["Modified Date"] = strtotime($aRow["modified_dt"]);
            ++$i;
        }
        return $return;
    }
    
    /** 
     * get single advertisement by id
     *
     * @return array
     * @access public
     */
    function getAd() {
        
        // get advertisement record
        $sql = "SELECT 
                    a.ad_id, 
                    a.ad_client_id, 
                    a.ad_url, 
                    a.ad_title, 
                    a.ad_path, 
                    c.ad_client_name, 
                    c.ad_client_contact, 
                    c.ad_client_email, 
                    c.ad_client_phone, 
                    a.status, 
                    a.deleted, 
                    a.deleted_dt, 
                    a.created_dt, 
                    a.modified_dt 
                FROM 
                    ".PREFIX."_ads a, 
                    ".PREFIX."_ads_clients c 
                WHERE 
                    c.ad_client_id=a.ad_client_id 
                    AND a.ad_id=".$this->_id;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // capture results row in an array
        $aRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC);
        
        // build return array
        $return["Ad Id"] = $aRow["ad_id"];
        $return["Client Id"] = $aRow["ad_client_id"];
        $return["URL"] = $aRow["ad_url"];
        $return["Title"] = $aRow["ad_title"];
        $return["Path"] = $aRow["ad_path"];
        $return["Client"]["Name"] = $aRow["ad_client_name"];
        $return["Client"]["Contact"] = $aRow["ad_client_contact"];
        $return["Client"]["Email"] = $aRow["ad_client_email"];
        $return["Client"]["Phone"] = $aRow["ad_client_phone"];
        $return["Status"] = $aRow["status"];
        $return["Deleted"] = $aRow["deleted"];
        $return["Deleted Date"] = strtotime($aRow["deleted_dt"]);
        $return["Created Date"] = strtotime($aRow["created_dt"]);
        $return["Modified Date"] = strtotime($aRow["modified_dt"]);
        return $return;
    }
    
    /** 
     * get single client by id
     *
     * @return array
     * @access public
     */
    function getClient() {
        
        // get advertisement record
        $sql = "SELECT 
                    ad_client_name, 
                    ad_client_contact, 
                    ad_client_email, 
                    ad_client_phone, 
                    status, 
                    deleted, 
                    deleted_dt, 
                    created_dt, 
                    modified_dt 
                FROM 
                    ".PREFIX."_ads_clients 
                WHERE 
                    ad_client_id=".$this->_id;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // capture results row in an array
        $aRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC);
        
        // build return array
        $return["Name"] = $aRow["ad_client_name"];
        $return["Contact"] = $aRow["ad_client_contact"];
        $return["Email"] = $aRow["ad_client_email"];
        $return["Phone"] = $aRow["ad_client_phone"];
        $return["Status"] = $aRow["status"];
        $return["Deleted"] = $aRow["deleted"];
        $return["Deleted Date"] = strtotime($aRow["deleted_dt"]);
        $return["Created Date"] = strtotime($aRow["created_dt"]);
        $return["Modified Date"] = strtotime($aRow["modified_dt"]);
        return $return;
    }
    
    /** 
     * get actively associated clients list
     *
     * @return array
     * @access public
     */
    function getClientsList() {
        
        // get clients from db
        $sql = "SELECT 
                    ad_client_id, 
                    ad_client_name 
                FROM 
                    ".PREFIX."_ads_clients 
                WHERE 
                    deleted=0 
                    and status=1 
                ORDER BY 
                    ad_client_name";
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // loop through results and build return array
        $i = 0;
        while ($aRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC)) {
            
            $return[$i]["Client Id"] = $aRow["ad_client_id"];
            $return[$i]["Client"] = $aRow["ad_client_name"];
            ++$i;
        }
        return $return;
    }
    
    /** 
     * get advertisements activity report data
     *
     * @return array
     * @access public
     */
    function getAdsReport() {
        
        // get report data
        $sql = "SELECT 
                    a.ad_title, 
                    a.ad_url, 
                    a.created_dt, 
                    c.ad_client_name, 
                    c.ad_client_contact, 
                    c.ad_client_email, 
                    c.ad_client_phone, 
                    r.ad_view_cnt, 
                    r.ad_click_cnt, 
                    r.ad_activity_month, 
                    r.ad_activity_year 
                FROM 
                    ".PREFIX."_ads a, 
                    ".PREFIX."_ads_clients c, 
                    ".PREFIX."_ads_activity r 
                WHERE 
                    a.ad_client_id=c.ad_client_id 
                    AND r.ad_id=a.ad_id 
                    AND a.deleted=0 
                ORDER BY 
                    r.ad_activity_year desc, 
                    r.ad_activity_month desc";
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // loop through result and build return array
        $i = 0;
        while ($aRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC)) {
            
            $return[$i]["Title"] = $aRow["ad_title"];
            $return[$i]["URL"] = $aRow["ad_url"];
            $return[$i]["Client"]["Name"] = $aRow["ad_client_name"];
            $return[$i]["Client"]["Contact"] = $aRow["ad_client_contact"];
            $return[$i]["Client"]["Email"] = $aRow["ad_client_email"];
            $return[$i]["Client"]["Phone"] = $aRow["ad_client_phone"];
            $return[$i]["View Count"] = $aRow["ad_view_cnt"];
            $return[$i]["Click Count"] = $aRow["ad_click_cnt"];
            $return[$i]["Month"] = $aRow["ad_activity_month"];
            $return[$i]["Year"] = $aRow["ad_activity_year"];
            $return[$i]["Created Date"] = strtotime($aRow["created_dt"]);
            ++$i;
        }
        return $return;
    }
    
    // INSERT METHODS ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /** 
     * add new advertisement record
     *
     * @param array $aArgs advertisement data
     * @return boolean
     * @access public
     */
    function addAd($aArgs) {
        
        // if no client id was passed
        if (empty($aArgs["Client Id"])) {
            
            $aArgs["Client Id"] = $this->addClient($aArgs);
        }
        
        // insert new advertisement record
        $sql = "INSERT INTO ".PREFIX."_ads (
                    ad_client_id, 
                    ad_url, 
                    ad_title, 
                    ad_path, 
                    status, 
                    created_dt, 
                    modified_dt
                ) values (
                    ".$aArgs["Client Id"].", 
                    '".$aArgs["URL"]."', 
                    '".$aArgs["Title"]."', 
                    '".$aArgs["Path"]."', 
                    1, 
                    (NOW()), 
                    (NOW())
                )";
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        return true;
    }
    
    /** 
     * add new client record
     *
     * @param array $aArgs client data
     * @return boolean
     * @access public
     */
    function addClient($aArgs) {
        
        // lock tables to capture unique identifier
        $sql = "LOCK TABLES ".PREFIX."_ads_clients WRITE";
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // insert new client record
        $sql = "INSERT INTO ".PREFIX."_ads_clients (
                    ad_client_name, 
                    ad_client_contact, 
                    ad_client_email, 
                    ad_client_phone 
                ) values (
                    '".$aArgs["Client"]["Name"]."', 
                    '".$aArgs["Client"]["Contact"]."', 
                    '".$aArgs["Client"]["Email"]."', 
                    '".$aArgs["Client"]["Phone"]."'
                )";
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // get unique client id
        $sql = "SELECT MAX(ad_client_id) FROM ".PREFIX."_ads_clients";
        
        if (DB::isError($iClientId = $this->_oConn->getOne($sql))) {
            
            catchExc($iClientId->getMessage());
            return false;
        }
        
        // unlock tables
        $sql = "UNLOCK TABLES";
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        return $iClientId;
    }
    
    // UPDATE METHODS ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /** 
     * edit a advertisement record
     *
     * @param array $aArgs advertisement data
     * @return boolean
     * @access public
     */
    function editAd($aArgs) {
        
        // initialize sql filter
        $sFilter = "";
        
        // if a file was uploaded, ad path value to sql filter
        if (!empty($aArgs["Path"])) $sFilter = "ad_path='".$aArgs["Path"]."', ";
        
        // update advertisement record
        $sql = "UPDATE ".PREFIX."_ads SET 
                    ad_client_id=".$aArgs["Client Id"].", 
                    ad_url='".$aArgs["URL"]."', 
                    ad_title='".$aArgs["Title"]."', 
                    ".$sFilter."
                    modified_dt=(NOW())                
                WHERE 
                    ad_id=".$this->_id;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        return true;
    }
    
    /** 
     * edit a client record
     *
     * @param array $aArgs client data
     * @return boolean
     * @access public
     */
    function editClient($aArgs) {
        
        // update client record
        $sql = "UPDATE ".PREFIX."_ads_clients SET 
                    ad_client_name='".$aArgs["Client"]["Name"]."', 
                    ad_client_contact='".$aArgs["Client"]["Contact"]."', 
                    ad_client_email='".$aArgs["Client"]["Email"]."', 
                    ad_client_phone='".$aArgs["Client"]["Phone"]."', 
                    modified_dt=(NOW())                
                WHERE 
                    ad_client_id=".$this->_id;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        return true;
    }
    
    /** 
     * get a random advertisement
     *
     * @return array
     * @access public
     */
    function getRandomAd() {
        
        $sql = "SELECT 
                    ad_id, 
                    ad_client_id, 
                    ad_title, 
                    ad_url, 
                    ad_path 
                FROM 
                    ".PREFIX."_ads 
                WHERE 
                    status=1 
                    AND deleted=0 
                ORDER BY 
                    rand() 
                LIMIT 0, 1";
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // assign result to array
        $aRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC);
        
        // assign return array values
        $return["Ad Id"] = $aRow["ad_id"];
        $return["Client Id"] = $aRow["ad_client_id"];
        $return["Title"] = $aRow["ad_title"];
        $return["URL"] = $aRow["ad_url"];
        $return["Path"] = $aRow["ad_path"];
        
        // update advertisement activity
        $sql = "UPDATE ".PREFIX."_ads_activity SET 
                    ad_view_cnt=ad_view_cnt+1, 
                    ad_activity_month=".date("m").", 
                    ad_activity_year=".date("Y")." 
                WHERE 
                    ad_id=".$aRow["ad_id"]." 
                    AND ad_activity_month=".date("m")." 
                    AND ad_activity_year=".date("Y");
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // check i update affected any rows
        if ($this->_oConn->affectedRows() < 1) {
            
            // add new record for auditing
            $sql = "INSERT INTO ".PREFIX."_ads_activity (
                        ad_id, 
                        ad_view_cnt, 
                        ad_activity_month, 
                        ad_activity_year
                    ) values (
                        ".$aRow["ad_id"].", 
                        1, 
                        ".date("m").", 
                        ".date("Y")."
                    )";
            
            if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
                
                catchExc($rsTmp->getMessage());
                return false;
            }
        }
        
        return $return;
    }
    
    /** 
     * redirect advertisement on user click
     *
     * @return boolean
     * @access public
     */
    function redirectAd() {
        
        // update activity logs
        $sql = "UPDATE ".PREFIX."_ads_activity SET 
                    ad_click_cnt=ad_click_cnt+1, 
                    ad_activity_month=".date("m").", 
                    ad_activity_year=".date("Y")." 
                WHERE 
                    ad_id=".$this->_id." 
                    AND ad_activity_month=".date("m")." 
                    AND ad_activity_year=".date("Y");
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // check if any rows were updated
        if ($this->_oConn->affectedRows() < 1) {
            
            // add new activity record
            $sql = "INSERT INTO ".PREFIX."_ads_activity (
                        ad_id, 
                        ad_click_cnt, 
                        ad_activity_month, 
                        ad_activity_year
                    ) values (
                        ".$iAdId.", 
                        1, 
                        ".date("m").", 
                        ".date("Y")."
                    )";
            
            if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
                
                catchExc($rsTmp->getMessage());
                return false;
            }
        }
        
        return true;
    }
    
    /** 
     * delete an advertisement record
     *
     * @return boolean
     * @access public
     */
    function deleteAd() {
        
        $sql = "UPDATE ".PREFIX."_ads SET 
                    deleted=1, 
                    deleted_dt=(NOW()) 
                WHERE 
                    ad_id=".$this->_id;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        $this->deactivateAd();
        return true;
    }
    
    /** 
     * delete a client record
     *
     * @return boolean
     * @access public
     */
    function deleteClient() {
        
        $sql = "UPDATE ".PREFIX."_ads_clients SET 
                    status=0, 
                    deleted=1, 
                    deleted_dt=(NOW()) 
                WHERE 
                    ad_client_id=".$this->_id;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        $sql = "UPDATE ".PREFIX."_ads SET 
                    status=0, 
                    deleted=1, 
                    deleted_dt=(NOW() ) 
                WHERE 
                    ad_client_id=".$this->_id;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
    }
    
    /** 
     * activate an advertisement record
     *
     * @return boolean
     * @access public
     */
    function activateAd() {
        
        $sql = "UPDATE ".PREFIX."_ads SET 
                    status=1 
                WHERE 
                    ad_id=".$this->_id;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
    }
    
    /** 
     * activate a client record
     *
     * @return boolean
     * @access public
     */
    function activateClient() {
        
        $sql = "UPDATE ".PREFIX."_ads_clients SET 
                    status=1 
                WHERE 
                    ad_client_id=".$this->_id;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
    }
    
    /** 
     * deactivate an advertisement record
     *
     * @return boolean
     * @access public
     */
    function deactivateAd() {
        
        $sql = "UPDATE ".PREFIX."_ads SET 
                    status=0 
                WHERE 
                    ad_id=".$this->_id;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
    }
    
    /** 
     * deactivate a client record
     *
     * @return boolean
     * @access public
     */
    function deactivateClient() {
        
        $sql = "UPDATE ".PREFIX."_ads_clients SET 
                    status=0 
                WHERE 
                    ad_client_id=".$this->_id;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
    }
    
} // close the class definition

?>