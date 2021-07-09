<?php

// File Location: /_lib/_classes/class.polls.php

require_once("DB.php");

/** 
 * handles poll functions
 *
 * @author Mike Buzzard <src@cubancouncil.com>
 * @version 1.0
 * @since 1.0
 * @access public
 * @copyright Wrox Press
 *
 */
class polls { // open the class definition
    
    /** 
     * unique identifier for a poll
     *
     * @var integer
     * @access private
     * @see setPollId()
     */
    var $_iPollId;
    
    /** 
     * unique identifier for a poll answer
     *
     * @var integer
     * @access private
     * @see setAnswerId()
     */
    var $_iAnswerId;
    
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
     * @param integer $iPollId [optional] poll id
     * @access public
     */
    function polls($iPollId = '') {
        
        // implement db object
        $this->_oConn =& DB::connect(DSN);
        
        if (DB::isError($this->_oConn) ) {
            
            catchExc($this->_oConn->getMessage());
        }
        
        // set unique identifier
        if (is_int($iPollId)) {
            
            $this->setPollId($iPollId);
        }
    }
    
    // PUBLIC METHODS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /**
     * set the _iPollId variable for the class
     *
     * @param integer $iPollId unique poll identifier
     * @access public
     */
    function setPollId($iPollId) {
        
        if (is_int($iPollId)) {
            
            $this->_iPollId = $iPollId;
        }
    }
    
    /**
     * set the _iAnswerId variable for the class
     *
     * @param integer $iAnswerId unique answer identifier
     * @access public
     */
    function setAnswerId($iAnswerId) {
        
        if (is_int($iAnswerId)) {
            
            $this->_iAnswerId = $iAnswerId;
        }
    }
    
    // SELECT METHODS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /** 
     * get polls count for paging
     *
     * @param boolean $iStatus status of poll
     * @return boolean
     * @access private
     */
    function getPollsCount($iStatus=false) {
        
        // set sql filter
        $iStatus ? $sFilter .= " AND status=1" : $sFilter .= "";
        
        $sql = "SELECT 
                    count(poll_id) AS poll_cnt 
                FROM 
                    ".PREFIX."_polls 
                WHERE deleted=0".$sFilter;
        
        if (DB::isError($iCnt = $this->_oConn->getOne($sql))) {
            
            catchExc($iCnt->getMessage());
            return false;
        }
        
        return $iCnt;
    }
    
    /** 
     * get polls list
     *
     * @param string $sSort sort key
     * @param integer $iPage [optional] cursor
     * @return array poll data
     * @access public
     */
    function getPolls($sSort, $iPage=0) {
        
        $sql = "SELECT 
                    poll_id, 
                    poll_vote_cnt, 
                    poll_question, 
                    status, 
                    created_dt, 
                    modified_dt 
                FROM 
                    ".PREFIX."_polls 
                WHERE 
                    deleted=0 
                ORDER BY 
                    ".$sSort." 
                LIMIT ".$iPage.", ".ROWCOUNT;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // loop result and build return array
        $i = 0;
        while ($aRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC)) {
            
            $return[$i]["Poll Id"] = $aRow["poll_id"];
            $return[$i]["Vote Count"] = $aRow["poll_vote_cnt"];
            $return[$i]["Question"] = $aRow["poll_question"];
            $return[$i]["Status"] = $aRow["status"];
            $return[$i]["Created Date"] = strtotime($aRow["created_dt"]);
            $return[$i]["Modified Date"] = strtotime($aRow["modified_dt"]);
            ++$i;
        }
        return $return;
    }
    
    /** 
     * get active polls list
     *
     * @param integer $iPage [optional] cursor
     * @return array active poll data
     * @access public
     */
    function getActivePolls($iPage=0) {
        
        $sql = "SELECT 
                    poll_id, 
                    poll_vote_cnt, 
                    poll_question 
                FROM 
                    ".PREFIX."_polls 
                WHERE 
                    status=1 
                    AND deleted=0 
                ORDER BY 
                    created_dt desc 
                LIMIT ".$iPage.", 1";
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // check for results
        if ($rsTmp->numRows() > 0) {
            
            // assign result to array
            $aRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC);
            
            $return["Poll Id"] = $aRow["poll_id"];
            $return["Vote Count"] = $aRow["poll_vote_cnt"];
            $return["Question"] = $aRow["poll_question"];
            $return["Answers"] = $this->getPollAnswers($aRow["poll_id"]);
            return $return;     
        }   
    }
    
    /** 
     * get a single poll
     *
     * @return array
     * @access public
     */
    function getPoll() {
        
        $sql = "SELECT 
                    poll_id, 
                    poll_vote_cnt, 
                    poll_question, 
                    status, 
                    created_dt, 
                    modified_dt 
                FROM 
                    ".PREFIX."_polls 
                WHERE 
                    poll_id=".$this->_iPollId;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // assign result to array
        $aRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC);
        
        // build return array
        $return["Poll Id"] = $aRow["poll_id"];
        $return["Vote Count"] = $aRow["poll_vote_cnt"];
        $return["Question"] = $aRow["poll_question"];
        $return["Answers"] = $this->getPollAnswers($aRow["poll_id"]);
        $return["Status"] = $aRow["status"];
        $return["Created Date"] = strtotime($aRow["created_dt"]);
        $return["Modified Date"] = strtotime($aRow["modified_dt"]);
        return $return;
    }
    
    /** 
     * get poll answers or options
     *
     * @param integer $iPollId poll id
     * @return array
     * @access public
     */
     function getPollAnswers($iPollId) {
        
        $sql = "SELECT 
                    poll_answer_id, 
                    poll_answer, 
                    poll_answer_cnt 
                FROM 
                    ".PREFIX."_polls_answers 
                WHERE 
                    poll_id=".$iPollId;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // loop through result and build return array
        $i = 0;
        while ($aRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC)) {
            
            $return[$i]["Answer Id"] = $aRow["poll_answer_id"];
            $return[$i]["Answer"] = $aRow["poll_answer"];
            $return[$i]["Answer Count"] = $aRow["poll_answer_cnt"];
            ++$i;
        }
        return $return;
     }
     
    // INSERT METHODS ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /** 
     * add a poll record
     *
     * @param array $aArgs poll data
     * @return boolean
     * @access public
     */
    function addPoll($aArgs) {
        
        // lock tables to capture unique identifier
        $sql = "LOCK TABLES ".PREFIX."_polls WRITE";
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // add new record
        $sql = "INSERT INTO ".PREFIX."_polls (
                    poll_question, 
                    status, 
                    created_dt, 
                    modified_dt
                ) values (
                    '".$aArgs["Question"]."', 
                    1,
                    (NOW()), 
                    (NOW())
                )";
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // get last unique identifier from entry
        $sql = "SELECT MAX(poll_id) FROM ".PREFIX."_polls";
        
        if (DB::isError($iPollId = $this->_oConn->getOne($sql))) {
            
            catchExc($iPollId->getMessage());
            return false;
        }
        
        $sql = "UNLOCK TABLES";
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // set unique identifier member variable
        settype($iPollId, "integer");
        $this->setPollId($iPollId);
        
        // loop through answers and add records
        $i = 0;
        while (list($key, $val) = each($aArgs["Answers"])) {
            
            if (strcmp("", $val)) {
                
                // add records
                $sql = "INSERT INTO ".PREFIX."_polls_answers (
                            poll_id, 
                            poll_answer
                        ) values (
                            ".$this->_iPollId.", 
                            '".$aArgs["Answers"][$i]."'
                        )";
                        
                if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
                    
                    catchExc($rsTmp->getMessage());
                    return false;
                }
            }
            ++$i;
        }
        
        return true;
    }
    
    // UPDATE METHODS ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /** 
     * edit a poll record
     *
     * @param array $aArgs poll data
     * @return boolean
     * @access public
     */
    function editPoll($aArgs) {
        
        $sql = "UPDATE ".PREFIX."_polls SET 
                    poll_question='".$aArgs["Question"]."', 
                    modified_dt=(NOW())                
                WHERE 
                    poll_id=".$this->_iPollId;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // loop through answers and update records
        $i = 0;
        while (list($key, $val) = each($aArgs["Answers"])) {
            
            if (strcmp("", $val)) {
                
                $sql = "UPDATE ".PREFIX."_polls_answers SET 
                            poll_answer='".$val."' 
                        WHERE 
                            poll_answer_id=".$key;
                        
                if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
                    
                    catchExc($rsTmp->getMessage());
                    return false;
                }
            }
        }
        return true;
    }
    
    /** 
     * add a poll vote
     *
     * @return boolean
     * @access public
     */
    function addVote() {
        
        // increment poll count
        $sql = "UPDATE ".PREFIX."_polls SET 
                    poll_vote_cnt=poll_vote_cnt+1 
                WHERE 
                    poll_id=".$this->_iPollId;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // increment poll answer count
        $sql = "UPDATE ".PREFIX."_polls_answers SET 
                    poll_answer_cnt=poll_answer_cnt+1 
                WHERE 
                    poll_answer_id=".$this->_iAnswerId;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        // set poll vote cookie
        setcookie("cPOLL", $this->_iPollId, time()+3600*24*56, "/", "", "");
    }
    
    /** 
     * delete a poll record
     *
     * @return boolean
     * @access public
     */
    function deletePoll() {
        
        $sql = "UPDATE ".PREFIX."_polls SET 
                    deleted=1, 
                    deleted_dt=(NOW()) 
                WHERE 
                    poll_id=".$this->_iPollId;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        $this->deactivatePoll();
        return true;
    }
    
    /** 
     * activate a poll record
     *
     * @return boolean
     * @access public
     */
    function activatePoll() {
        
        $sql = "UPDATE ".PREFIX."_polls SET 
                    status=1 
                WHERE 
                    poll_id=".$this->_iPollId;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
    }
    
    /** 
     * deactivate a poll record
     *
     * @return boolean
     * @access public
     */
    function deactivatePoll() {
        
        $sql = "UPDATE ".PREFIX."_polls SET 
                    status=0 
                WHERE 
                    poll_id=".$this->_iPollId;
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            return false;
        }
    }
    
} // close the class definition

?>