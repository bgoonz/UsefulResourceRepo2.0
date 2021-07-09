<?php

// require PEAR objects
require_once "Mail.php";
require_once "Mail/mime.php";
require_once "DB.php";

// require USER libraries
require_once "config.php";
require_once "funcs.php";

/** 
 * Manages newsletters and mass mailings.
 *
 * @author Jessey White-Cinis <cinis@codeisart.com>
 * @version 1.0
 * @since 1.0
 * @access public
 * @copyright Code Is Art
 *
 */
class newsletter {

    /** 
     * Property containing the PEAR mail object reference
     * 
     * @var object
     * @access private
     */
    var $_oMail;
    
    /** 
     * Property containing the PEAR database object reference
     * 
     * @var object
     * @access private
     */
    var $_oConn;
	
    /** 
     * Property containing the newsletter unique identifier
     * 
     * @var object
     * @access private
     */
    var $_iNewsletterId;
    
    
    // CONSTRUCTOR ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /** 
     * Constructor method.
     * 
	 * Instanciates both the PEAR mail object and the PEAR database object
     * to handle all of our SMTP and database connectivity
     * 
     * @access private
     */
    function newsletter() {
        
        // Instanciate the PEAR mail object and set the mail method, SMTP Server
        // and SMTP Port.  We use 'smtp' for our mail method so that we can use
        // an external SMTP server for relaying messages if nessisary. 
        $this->_oMail = & Mail::factory("smtp", array("host" => SMTP_HOST, 
                                                      "port" => SMTP_PORT));
        
        // Check and capture returned exceptions if present
        if (Mail::isError($this->_oMail)) {
            
            catchExc($this->_oMail->getMessage());
        }
        
        // Instancitate the PEAR DB module for database connectivity.  This will
        // accept our 'DSN' global that we defined in our 
        // /_lib/_base/_config.php configuration file.
        $this->_oConn = & DB::connect(DSN);
        
        // Check and capture returned exceptions if present
        if (DB::isError($this->_oConn)) {
            
            catchExc($this->_oConn->getMessage());
        }
        
    }
    
    
    // PRIVATE METHODS ::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /** 
     * Converts the send status integer to an english string representation
     * 
     * @access private
     * @param $iStatus integer send status
     * @return string
     */
    function _statusToString($iStatus) {
        
        // Make sure that the iStatus variable is an integer
        settype($iStatus, "int");
        
        // Determine the value of the passed integer and select the correct 
        // string representation to return.
        switch($iStatus) {
            
            case 3:
                $return = "Sent";
                break;
                
            case 2:
                $return = "Sending";
                break;
                
            case 1:
                $return = "Pending";
                break;
                
            default:
                $return = "Not Sent"; 
        }
        
        return $return;
    }
    
    
    // PUBLIC METHODS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /** 
     * Sets the current newsletter id
     * 
     * @access public
     * @param $iNewsletterId newsletter unique identifier
     * @return boolean
     */
    function setNewsletterId($iNewsletterId) {
        
        // set default return value
        $return = false;
        
        // make sure that the newsletter id is an integer
        settype($iNewsletterId, "int");
        
        // if the newsletter id is a valid integer then set the class variable
        if($iNewsletterId) {
            
            $this->_iNewsletterId = $iNewsletterId;
            $return = true;
        }
        
        // return success status
        return $return;
    }
    
    /**
     * Checks for a message being sent.  
     * Provides process blocking.
     * 
     * @return boolean Returns true if a message is sending
     * @access public
     */
    function checkSend() {
        
        // set default return value
        $return = false;
        
        // build SQL query
        $sql = "SELECT 
                    newsletter_id 
                FROM 
                    ".PREFIX."_newsletters 
                WHERE 
                    newsletter_send_status = 2 AND 
                    deleted = 0
                LIMIT 1";
        
        // Check and capture returned exceptions if present
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
        } else {
            
            // Check the returned number of active send processes
            if($rsTmp->numRows() > 0) {
                
                // Fetch the first record
                $aTmpRow = $rsTmp->fetchRow();
                
                // Set the return variable to the newsletter id value
                $return = $aTmpRow[0];
            }
        }
        
        return $return;
    }
    
    /** 
     * Sends a test message to the specified email address
     * 
     * @access public
     * @param $sEmail email address
     * @return boolean
     */
    function sendTest($sEmail) {
        
        // Retrieve all data associated with the defined newsletter
        $aNewsletter = $this->getNewsletter();
        
        // Build standard headers array
        $aHead = array(
                     "From" => FROM_NAME."<".FROM_EMAIL.">",
                     "Subject" => $aNewsletter["Subject"]
                 );
        
        // Build multi-part message
        // "\r\n" defines what characters to use as a line-break
        $oMime = new Mail_mime("\r\n");
        
        // set the plain-text body
        $oMime->setTxtBody($aNewsletter["Body Text"]);
        
        // set the HTML body
        $oMime->setHTMLBody($aNewsletter["Body HTML"]);
        
        // get multi-part body
        $sBody = $oMime->get();
        
        // get multi-part headers
        $aHeaders = $oMime->headers($aHead);
        
        // Send multi-part message to the passed recipient address
        // then check and capture returned exceptions if present
        if (Mail::isError($mailTmp = $this->_oMail->send($sEmail, 
                                                         $aHeaders, $sBody))) {
            catchExc($mailTmp->getMessage());
            $return = false;
        } else {
            
            $return = true;
        }
        
        // return success status
        return $return;
    }
    
    /**
     * Sends a newsletter to the mailing list and updates all of the status 
     * and logging fields accordingly
     * 
     * @return boolean
     * @access public
     */
    function sendNewsletter() {
        
        // Set the default return value
        $return = true;
        
        // Retrieve all data associated with the defined newsletter
        $aNewsletter = $this->getNewsletter();
        
        // Retrieve all email addresses subscribed to our mailing list
        $aMailingList = $this->getMailingList();
        
        // Update the newsletter_send_status for the defined newsletter and 
        // update the sent time for the record.  This will prevent any other
        // newsletters from being sent while the current one is sending.
        $sql = "UPDATE
                    ".PREFIX."_newsletters 
                SET
                    newsletter_send_status = 2,
                    newsletter_sent = NOW()
                WHERE
                    newsletter_id = '".$this->_iNewsletterId."'";
        
        // Check and capture returned exceptions if present
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            $return = false;
        }

        // Build static headers
        $aHead = array(
                     "From" => FROM_NAME."<".FROM_EMAIL.">",
                     "Subject" => $aNewsletter["Subject"]
                 );
        
        // Build multi-part message
        // "\r\n" defines what characters to use as a line-break
        $oMime = new Mail_mime("\r\n");
        
        // Set the plain-text body
        $oMime->setTXTBody($aNewsletter["Body Text"]);
                          
        // Set the HTML body
        $oMime->setHTMLBody($aNewsletter["Body HTML"]);
        
        // Get the multi-part body string
        $sBody = $oMime->get();
        
        // Get multi-part headers array
        $aHeaders = $oMime->headers($aHead);
        
        // Loop through the mailing list and send to each recipient
        $i=0;
        $iRecpCnt = count($aMailingList);
        while($i < $iRecpCnt) {
            
            $sEmail = $aMailingList[$i];
            
            // Check and capture returned exceptions if present
            if (Mail::isError($mailTmp = $this->_oMail->send($sEmail, 
                                                             $aHeaders, 
                                                             $sBody))) {
                catchExc($mailTmp->getMessage());
                $return = false;
                break;
            }
            
            $i++;
        }
        
        // Set the number of emails sent
        $iNumSent = $i;
        
        // Update the newsletter_send_status to unlock the send process and 
        // allow other sends to begin.  Also, update the completed time and 
        // the number of recipients.
        $sql = "UPDATE
                    ".PREFIX."_newsletters 
                SET
                    newsletter_send_status = 3,
                    newsletter_send_complete = NOW(),
                    newsletter_recp_cnt = ".$iNumSent."
                WHERE
                    newsletter_id = '".$this->_iNewsletterId."'";
        
        // Check and capture returned exceptions if present
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            $return = false;
        }
        
        return $return;
    }
    
    
    // SELECT METHODS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /** 
     * Gets one message needing to be sent 
     *
     * @return integer newsletter_id
     * @access public
     */
    function getNewsletterToSend() {
        
        // Set the default return value
        $return = true;
        
        // Build the SQL query
        $sql = "SELECT 
                    newsletter_id 
                FROM 
                    ".PREFIX."_newsletters 
                WHERE 
                    newsletter_send_status = 1 AND 
                    deleted=0 AND 
                    status=1 AND 
                    newsletter_send < NOW() AND 
                    ISNULL(newsletter_sent) 
                ORDER BY 
                    modified_dt DESC 
                LIMIT 1";
        
        // Check and capture returned exceptions if present
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            $return = false;
        } else {
            
            // Check to see if there are returned records
            if($rsTmp->numRows() > 0) {
                
                // Fetch the first returned row
                $aTmpRow = $rsTmp->fetchRow();
                
                // Set the return value to the newsletter id of the returned
                // record
                $return = $aTmpRow[0];
            }
        }
        
        // Return a newsletter id or false
        return $return;
    }
 
    /** 
     * Gets the mailing list
     *
     * @return array settings data
     * @access public
     */
    function getMailingList() {
        
        // Build the SQL query
        $sql = "SELECT
                    account.account_email
                FROM
                    ".PREFIX."_accounts as account, 
                    ".PREFIX."_account_prefs as prefs 
                WHERE 
                    account.account_id = prefs.account_id AND 
                    account.deleted = 0 AND 
                    account.status = 1 AND 
                    prefs.newsletter_recipient = 1";
        
        // Check and capture returned exceptions if present
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            $return = false;
            
        } else {
            
            // For each record, push the email address into the return array
            while ($aTmpRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC)) {
                
                array_push($return, $aTmpRow["account_email"]);
            } 
        }
        
        // return the mailing list array
        return $return;
    }
    
    /** 
     * Gets a newsletter
     *
     * @param $iMsgId message unique identifier
     * @return array message data
     * @access public
     */
    function getNewsletter() {
        
        // Build the SQL query
        $sql = "SELECT 
                    admin_user_id, 
                    newsletter_subject, 
                    newsletter_body_text, 
                    newsletter_body_html, 
                    newsletter_send, 
                    newsletter_sent, 
                    newsletter_recp_cnt, 
                    newsletter_send_status, 
                    newsletter_send_complete, 
                    status, 
                    created_dt, 
                    modified_dt 
                FROM 
                    ".PREFIX."_newsletters 
                WHERE 
                    deleted = 0 AND 
                    newsletter_id = ".$this->_iNewsletterId;
        
        // Check and capture returned exceptions if present
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            $return = false;
        
        // Check and make sure that there were records returned
        } elseif ($rsTmp->numRows() > 0) {
            
            // Fetch the first returned record
            $aTmpRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC);
            
            // Set all array key values that need no manipulation
            $return["Newsletter Id"] = $iMsgId;
            $return["User Id"] = $aTmpRow["admin_user_id"];
            $return["Subject"] = $aTmpRow["newsletter_subject"];
            $return["Body Text"] = $aTmpRow["newsletter_body_text"];
            $return["Body HTML"] = $aTmpRow["newsletter_body_html"];
            $return["Recipients"] = $aTmpRow["newsletter_recp_cnt"];
            $return["Send Status Int"] = $aTmpRow["newsletter_send_status"];
            $return["Status"]        = $aTmpRow["status"];
            
            // Set all array key values that need data checked or manipulated
            
            // Check for a newsletter_send date string
            if(!strcmp($aTmpRow["newsletter_send"],"")) {
                $return["Send"] = false;
            } else {
                
                // Convert datetime to a UNIX timestring
                $return["Send"] = strtotime($aTmpRow["newsletter_send"]);
            }
                
            // Check for a newsletter_sent date string
            if(!strcmp($aTmpRow["newsletter_sent"],"")) {
                $return["Sent"] = false;
            } else {
                
                // Convert datetime to a UNIX timestring
                $return["Sent"] = strtotime($aTmpRow["newsletter_sent"]);
            }
            
            // Check for newsletter_send_complete date string
            if(!strcmp($aTmpRow["newsletter_send_complete"],"")) {
                $return["Completed"] = false;
            } else {
                
                // Convert date to a UNIX timestring
                $return["Completed"] = 
                    strtotime($aTmpRow["newsletter_send_complete"]);
            }
            
            // Convert the send status to a string using the private method
            $return["Send Status"] = 
                $this->_statusToString($aTmpRow["newsletter_send_status"]);
            
            // Convert date to a UNIX timestring
            $return["Created Date"]  = strtotime($aTmpRow["created_dt"]);
            
            // Convert date to a UNIX timestring
            $return["Modified Date"] = strtotime($aTmpRow["modified_dt"]);
            
        } else {
            
            $return = false;
        }
        
        // return an associative array or false
        return $return;
    }
    
    /** 
     * Gets the current newsletter
     *
     * @access public
     * @param $sSort the sql "order by" attribute(s)
     * @param $iPage the sql "limit" cursor position
     * @return array messages data
     */
    function getNewsletters($sSort, $iPage=0) {
        
        // Build the SQL query
        $sql = "SELECT
                    newsletter_id, 
                    admin_user_id, 
                    newsletter_subject, 
                    newsletter_body_text, 
                    newsletter_body_html, 
                    newsletter_send, 
                    newsletter_sent, 
                    newsletter_recp_cnt, 
                    newsletter_send_status, 
                    status, 
                    created_dt, 
                    modified_dt 
                FROM 
                    ".PREFIX."_newsletters 
                WHERE 
                    deleted = 0 
                ORDER BY 
                    ".$sSort." 
                LIMIT
                    ".$iPage.", ".ROWCOUNT;
        
        // Check and capture returned exceptions if present
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            $return = false;    
        } else {
            
            $i = 0;
            while ($aTmpRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC)) {
                
                // Set all array key values that need no manipulation
                $return[$i]["Newsletter Id"] = $aTmpRow["newsletter_id"];
                $return[$i]["User Id"] = $aTmpRow["admin_user_id"];
                $return[$i]["Subject"] = $aTmpRow["newsletter_subject"];
                $return[$i]["Body Text"] = $aTmpRow["newsletter_body_text"];
                $return[$i]["Body HTML"] = $aTmpRow["newsletter_body_html"];
                $return[$i]["Recipient Count"] = 
                    $aTmpRow["newsletter_recp_cnt"];
                $return[$i]["Send Status Int"] = 
                    $aTmpRow["newsletter_send_status"];
                $return[$i]["Status"] = $aTmpRow["status"];
                    
                // Set all array key values that need data checked or manipulated
                
                // Check for a newsletter_send date string
                if(!strcmp($aTmpRow["newsletter_send"],"")) {
                    $return[$i]["Send"] = false;
                } else {
                
                    // Convert to a UNIX timestring
                    $return[$i]["Send"] = 
                        strtotime($aTmpRow["newsletter_send"]);
                }
                
                // Check for a newsletter_sent date string
                if(!strcmp($aTmpRow["newsletter_sent"],"")) {
                    $return[$i]["Sent"] = false;
                } else {
                    
                    // Convert to a UNIX timestring
                    $return[$i]["Sent"] = 
                        strtotime($aTmpRow["newsletter_sent"]);
                }

                // Convert the send status integer to a string representation
                $return[$i]["Send Status"] = 
                    $this->_statusToString($aTmpRow["newsletter_send_status"]);
                
                // Convert to a UNIX timestring
                $return[$i]["Created Date"] = 
                    strtotime($aTmpRow["created_dt"]);
                
                // Convert to a UNIX timestring
                $return[$i]["Modified Date"] = 
                    strtotime($aTmpRow["modified_dt"]);
                
                $i++;
            }
            
            // return the array of newsletters and associated data
            return $return;
        }
        
    }
    
    /** 
     * Counts the number of newsletters in the database
     *
     * @return integer message count
     * @access public
     */
    function getNewsletterCount() {
        
        // Build the SQL query
        $sql = "SELECT 
                    count(newsletter_id) 
                FROM 
                    ".PREFIX."_newsletters 
                WHERE 
                    deleted = 0";
        
        // Use the PEAR DB's getOne method to return the first value of the 
        // first returned array and then free the result set.
        $iCnt = $this->_oConn->getOne($sql);
        
        // return a count of the active newsletters in the database
        return $iCnt;
    }
    
    
    // INSERT METHODS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /**
     * Adds a newsletter to the database
     * 
     * @return integer inserted newsletter id
     * @access public
     */
    function addNewsletter($aArgs) {
        
        // Build the SQL query
        $sql = "INSERT INTO ".PREFIX."_newsletters (
                    admin_user_id, 
                    newsletter_subject, 
                    newsletter_body_text,
                    newsletter_body_html,
                    newsletter_send,
                    created_dt,
                    modified_dt
                ) VALUES (
                    '".$aArgs["User Id"]."',
                    '".$aArgs["Subject"]."',
                    '".$aArgs["Body Text"]."',
                    '".$aArgs["Body HTML"]."',
                    '".date("Y-m-d H:i:s", $aArgs["Send"])."',
                    NOW(),
                    NOW()
                )";
        
        // Check and capture returned exceptions if present
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            $return = false;
        } else {
            
            // Get the id of the record that we just inserted
            $sql = "SELECT LAST_INSERT_ID()";
            $iMsgId = $this->_oConn->getOne($sql);
            $return = $iMsgId;
        }
        
        // return an id for the inserted record or false
        return $return;
    }
    
    
    // UPDATE METHODS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /**
     * Updates a newsletter in the database
     * 
     * @return integer inserted newsletter id
     * @access public
     */
    function updateNewsletter($aArgs) {
        
        // Set the default return value
        $return = true;
        
        $sql = "UPDATE 
                    ".PREFIX."_newsletters 
                SET 
                    admin_user_id = '".$aArgs["User Id"]."', 
                    newsletter_subject = '".$aArgs["Subject"]."', 
                    newsletter_body_text = '".$aArgs["Body Text"]."',
                    newsletter_body_html = '".$aArgs["Body HTML"]."',
                    newsletter_send = '".date("Y-m-d H:i:s",$aArgs["Send"])."',
                    modified_dt = NOW() 
                WHERE 
                    newsletter_id = '".$this->_iNewsletterId."'
                ";
        
        // Check and capture returned exceptions if present
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            $return = false;
        }
        
        // return the update success state
        return $return;
    }
    
    /**
     * Marks a newsletter to be sent by the send daemon
     * 
     * @return boolean
     * @access public
     */
    function markToBeSent() {
        
        // Set the default return value
        
        // Retrieve all data associated with the defined newsletter
        $aNewsletter = $this->getNewsletter();
        
        // Check to make sure that the message has not already been sent
        if(($aNewsletter["Send Status Int"]) > 0) {
            
            catchExc("This newsletter has already been sent");
        } else {
            
            // Build the SQL query
            $sql = "UPDATE 
                        ".PREFIX."_newsletters 
                    SET 
                        status = 1, 
                        newsletter_send_status = 1,
                        modified_dt = NOW() 
                    WHERE 
                        newsletter_id = '".$this->_iNewsletterId."'";
            
            // Check and capture returned exceptions if present
            if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
                
                catchExc($rsTmp->getMessage());
            } else {
                
                $return = true;
            }
        }
        
        // return update success status
        return $return;
    }

    /**
     * Pulls the message from being sent
     * 
     * This only works if the cron script has not already picked up the
     * newsletter for sending.
     *
     * @return boolean
     * @access public
     * @see stageNewsletter()
     */
    function draftNewsletter() {
        
        // Set the default return value
        $return = false;
        
        // Retrieve all data associated with the defined newsletter
        $aNewsletter = $this->getNewsletter();
        
        // Check to make sure that the message has not already been sent
        if(($aNewsletter["Send Status Int"]) > 1) {

            catchExc("This newsletter has already been sent");
        } else {
            
            // Build the SQL query
            $sql = "UPDATE 
                        ".PREFIX."_newsletters 
                    SET 
                        status = 0, 
                        newsletter_send_status = 0,
                        modified_dt = NOW() 
                    WHERE 
                        newsletter_id = '".$this->_iNewsletterId."'";
            
            // Check and capture returned exceptions if present
            if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
                catchExc($rsTmp->getMessage());
            } else {
            
                $return = true;
            }
        }
        
        // return the update success status
        return $return;
    }
    
    
    // DELETE METHODS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    /**
     * Deletes a newsletter from the database
     * 
     * @return boolean
     * @access public
     */
    function deleteNewsletter() {
        
        // Set the default return value
        $return = true;
        
        // Build the SQL query
        $sql = "UPDATE
                    ".PREFIX."_newsletters 
                SET
                    deleted = 1,
                    deleted_dt = NOW()
                WHERE 
                    newsletter_id = '".$this->_iNewsletterId."'";
        
         // Check and capture returned exceptions if present
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            $return = false;
        }
        
        // return the update success status
        return $return;
    }
    
// End of class
}

?>
