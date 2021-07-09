<?php

// File Location: /_lib/_classes/class.news.php

require_once("DB.php");

/** 
 * handles news functions
 *
 * @author Mike Buzzard <src@cubancouncil.com>
 * @version 1.0
 * @since 1.0
 * @access public
 * @copyright Wrox Press
 *
 */
class news { // open the class definition
    
    /** 
     * unique identifier for a news item
     *
     * @var integer
     * @access private
     * @see setNewsId()
     */
    var $_iNewsId;
    
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
     * @param integer $iNewsId [optional] unique news identifier
     * @access public
     */
    function news($iNewsId = '') {
        
        // implement pear db object
        $this->_oConn =& DB::connect(DSN);
        
        if (DB::isError($this->_oConn) ) {
            
            catchExc($this->_oConn->getMessage());
        }
        
        // assign member variable
        if (is_int($iNewsId)) {
            
            $this->setNewsId($iNewsId);
        }
    }
    
    // PUBLIC METHODS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /**
     * set the _iNewsId variable for the class
     *
     * @param integer $iNewsId news identifier
     * @access public
     */
    function setNewsId($iNewsId) {
        
        if (is_int($iNewsId)) {
            
            $this->_iNewsId = $iNewsId;
        }
    }
    
    // SELECT METHODS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /** 
     * get news count for paging
     *
     * @param boolean $iStatus status
     * @param integer $iType news type identifier
     * @return boolean
     * @access private
     */
    function getNewsCount($iStatus=false, $iType=0) {
        
        // set sql filter values
        $sFilter = "";
        if ($iStatus) $sFilter .= " AND status=1";
        if ($iType) $sFilter .= " AND news_type_id=".$iType;
        
        $sql = "SELECT 
                    count(news_id) AS news_cnt 
                FROM 
                    ".PREFIX."_news 
                WHERE 
                    deleted=0".$sFilter;
        
        if (DB::isError($iCnt = $this->_oConn->getOne($sql))) {
            
            catchExc($iCnt->getMessage());
            return false;
        }
        
        return $iCnt;
    }
    
    /** 
     * get news items list
     *
     * @param string $sSort sort key
     * @param integer $iPage [optional] cursor
     * @return array news data
     * @access public
     */
    function getNewsItems($sSort, $iPage=0) {
        
        // get news items from db
        $sql = "SELECT 
                    news_id, 
                    news_type_id, 
                    news_title, 
                    news_article, 
                    news_release_dt, 
                    news_expire_dt, 
                    status, 
                    created_dt, 
                    modified_dt 
                FROM 
                    ".PREFIX."_news 
                WHERE 
                    deleted=0 
                ORDER BY 
                    ".$sSort." 
                LIMIT ".$iPage.", ".ROWCOUNT;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // build return array
        $i = 0;
        while ($aRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC)) {
            
            $return[$i]["News Id"] = $aRow["news_id"];
            $return[$i]["News Type Id"] = $aRow["news_type_id"];
            $return[$i]["Title"] = $aRow["news_title"];
            $return[$i]["Article"] = $aRow["news_article"];
            $return[$i]["Release Date"] = strtotime($aRow["news_release_dt"]);
            $return[$i]["Expire Date"] = strtotime($aRow["news_expire_dt"]);
            $return[$i]["Status"] = $aRow["status"];
            $return[$i]["Created Date"] = strtotime($aRow["created_dt"]);
            $return[$i]["Modified Date"] = strtotime($aRow["modified_dt"]);
            ++$i;
        }
        return $return;
    }
    
    /** 
     * get active news items list
     *
     * @param integer $iPage [optional] cursor
     * @param integer $iType [optional] news type id
     * @return array active news data
     * @access public
     */
    function getActiveNewsItems($iPage=0, $iType=0) {
        
        // set sql filter
        $sFilter = "";
        if ($iType) $sFilter = " AND news_type_id=".$iType;
        
        $sDate = date("Y-m-d");
        
        $sql = "SELECT 
                    n.news_id, 
                    n.news_title, 
                    n.news_article, 
                    n.news_release_dt, 
                    COUNT(c.news_comment_id) AS cmt_cnt 
                FROM 
                    ".PREFIX."_news n 
                    LEFT JOIN ".PREFIX."_news_comments c ON (c.news_id=n.news_id)
                WHERE 
                    deleted=0 
                    and status=1 
                    and news_release_dt <= '".$sDate."' 
                    and news_expire_dt > '".$sDate."'".$sFilter." 
                GROUP BY 
                    n.news_id 
                ORDER BY 
                    news_release_dt desc 
                LIMIT ".$iPage.", ".ROWCOUNT;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // build return array
        $i = 0;
        while ($aRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC)) {
            
            $return[$i]["News Id"] = $aRow["news_id"];
            $return[$i]["Title"] = $aRow["news_title"];
            $return[$i]["Article"] = $aRow["news_article"];
            $return[$i]["Comment Count"] = $aRow["cmt_cnt"];
            $return[$i]["Release Date"] = strtotime($aRow["news_release_dt"]);
            ++$i;
        }
        return $return;
    }
    
    /** 
     * get news types list
     *
     * @return array news types
     * @access public
     */
    function getNewsTypes() {
        
        $sql = "SELECT 
                    news_type_id, 
                    news_type 
                FROM 
                    ".PREFIX."_news_types";
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // build return array
        $i = 0;
        while ($aRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC)) {
            
            $return[$i]["News Type Id"] = $aRow["news_type_id"];
            $return[$i]["News Type"] = $aRow["news_type"];
            ++$i;
        }
        return $return;
    }
    
    /** 
     * get a single news item
     *
     * @return array
     * @access public
     */
    function getNewsItem() {
        
        $sql = "SELECT 
                    news_type_id, 
                    news_title, 
                    news_article, 
                    news_release_dt, 
                    news_expire_dt, 
                    status, 
                    deleted, 
                    created_dt, 
                    modified_dt 
                FROM 
                    ".PREFIX."_news 
                WHERE 
                    news_id=".$this->_iNewsId;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // assign result to array
        $aRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC);
        
        // build data return array
        $return["News Type Id"] = $aRow["news_type_id"];
        $return["Title"] = $aRow["news_title"];
        $return["Article"] = $aRow["news_article"];
        $return["Release Date"] = strtotime($aRow["news_release_dt"]);
        $return["Expire Date"] = strtotime($aRow["news_expire_dt"]);
        $return["Status"] = $aRow["status"];
        $return["Deleted"] = $aRow["deleted"];
        $return["Created Date"] = strtotime($aRow["created_dt"]);
        $return["Modified Date"] = strtotime($aRow["modified_dt"]);
        return $return;
    }
    
    /** 
     * get news item comments by news id
     *
     * @return array
     * @access public
     */
    function getNewsComments() {
        
        $sql = "SELECT 
                    c.news_comment, 
                    c.created_dt, 
                    a.account_screenname 
                FROM 
                    ".PREFIX."_news_comments c, 
                    ".PREFIX."_accounts a
                WHERE 
                    news_id=".$this->_iNewsId." 
                    AND c.account_id=a.account_id 
                ORDER BY 
                    created_dt desc";
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // loop through result and build return array
        $i = 0;
        while ($aRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC)) {
            
            $return[$i]["Comment"] = $aRow["news_comment"];
            $return[$i]["Screen Name"] = $aRow["account_screenname"];
            $return[$i]["Comment Date"] = strtotime($aRow["created_dt"]);
            ++$i;
        }
        return $return;
    }
     
    // INSERT METHODS ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /** 
     * add a news record
     *
     * @param array $aArgs news item values
     * @return boolean
     * @access public
     */
    function addNews($aArgs) {
        
        // create new news record
        $sql = "INSERT INTO ".PREFIX."_news (
                    news_type_id, 
                    news_title, 
                    news_article, 
                    news_release_dt, 
                    news_expire_dt, 
                    status, 
                    created_dt, 
                    modified_dt
                ) values (
                    ".$aArgs["Type Id"].", 
                    '".$aArgs["Title"]."', 
                    '".$aArgs["Article"]."', 
                    '".date("Y-m-d", $aArgs["Release Date"])."', 
                    '".date("Y-m-d", $aArgs["Expire Date"])."', 
                    1, 
                    NOW(), 
                    NOW()
                )";
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
                
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        return true;
    }
    
    /** 
     * add a comment by news id
     *
     * @param array $aArgs news comment values
     * @return boolean
     * @access public
     */
    function addComment($aArgs) {
        
        $sql = "INSERT INTO ".PREFIX."_news_comments (
                    news_id, 
                    account_id, 
                    news_comment, 
                    created_dt
                ) values (
                    ".$this->_iNewsId.", 
                    ".$aArgs["Account Id"].", 
                    '".$aArgs["Comment"]."', 
                    (NOW())
                )";
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
                
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        return true;
    }
    
    // UPDATE METHODS ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /** 
     * edit a news record
     *
     * @param array $aArgs news values
     * @return boolean
     * @access public
     */
    function editNews($aArgs) {
        
        // update news record
        $sql = "UPDATE ".PREFIX."_news SET 
                    news_type_id=".$aArgs["Type Id"].", 
                    news_title='".$aArgs["Title"]."', 
                    news_article='".$aArgs["Article"]."', 
                    news_release_dt='".date("Y-m-d", $aArgs["Release Date"])."', 
                    news_expire_dt='".date("Y-m-d", $aArgs["Expire Date"])."', 
                    modified_dt=(NOW()) 
                WHERE 
                    news_id=".$this->_iNewsId;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
                
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        return true;
    }
    
    /** 
     * delete a news record
     *
     * @return boolean
     * @access public
     */
    function deleteNews() {
        
        $sql = "UPDATE ".PREFIX."_news SET 
                    deleted=1, 
                    deleted_dt=(NOW()) 
                WHERE 
                    news_id=".$this->_iNewsId;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        $this->deactivateNews();
        return true;
    }
    
    /** 
     * activate a news record
     *
     * @return boolean
     * @access public
     */
    function activateNews() {
        
        $sql = "UPDATE ".PREFIX."_news SET 
                    status=1 
                WHERE 
                    news_id=".$this->_iNewsId;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
    }
    
    /** 
     * deactivate a news record
     *
     * @return boolean
     * @access public
     */
    function deactivateNews() {
        
        $sql = "UPDATE ".PREFIX."_news SET 
                    status=0 
                WHERE 
                    news_id=".$this->_iNewsId;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
    }
    
} // close the class definition

?>