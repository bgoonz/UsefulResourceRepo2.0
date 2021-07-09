<?php

require_once("class.forumhelp.php");

class forumreply extends forumhelp {

    /**
     * @var integer
     */
    var $_iTopicId;

    /**
     * @var string
     */
    var $_sReply;
    
    /**
     * @var integer
     */
    var $_iAccountId;


    // {{{ Constructor
    
    /**
     * constructor
     *
     * @access public
     * @param integer forum id [optional]
     */
    function forumreply($iAccountId = '', $iTopicId = '') {

	// make sure we have everything from the parent class
        parent::forumhelp();
    
	// set account ID if supplied
        if( strcmp($iAccountId,'') ) {
            if( is_numeric($iAccountId) ){
                $this->_iAccountId = $iAccountId;
            } else {
                catchExc("Tried to set poster id to non-int value in " . __FILE__);
            }
        }

	// set topic ID if supplied
        if( strcmp($iTopicId,'') ) {
            if( is_numeric($iTopicId) ) {
                $this->_iTopicId = $iTopicId;
            } else {
                catchExc("Tried to set forum id to non-int value in " . __FILE__);
            }
        }
    }

    // }}}
    // {{{ setTopicId
    
    /**
     * Set the Forum ID variable
     *
     * @param integer forum id
     */
    function setTopicId($iTopicId) {
        if( is_numeric($iTopicId) ) {
            $this->_iTopicId = $iTopicId;
        } else {
            catchExc("Tried to set forum id to non-int value in " . __FILE__);
            return false;
        }
    }

    // }}}
    // {{{ setAccountId
    
    /**
     * Set the Poster ID variable
     *
     * @param integer poster id
     */
    function setAccountId($iAccountId) {
        if( is_numeric($iAccountId) ) {
            $this->_iAccountId = $iAccountId;
        } else {
            catchExc("Tried to set poster id to non-int value in " . __FILE__);
            return false;
        }
    }

    // }}}
    // {{{ setReply

    /**
     * Set the reply
     *
     * @param string the reply
     */
    function setReply($sReply) {
        if( !is_string($sReply) ) {
            catchExc("Tried to set post reply to non-string value in " . __FILE__);
            return false;
        }

        if( $this->_bStripHtml ) {
            $this->_sReply = $this->_stripHtml($sReply);
        } else {
            $this->_sReply = $sReply;
        }
    }

    // }}}
    // {{{ getReplyFromDB

    /**
     * get the relevant post information for a given id
     *
     * @param integer the post id
     * @return array assocative array with data
     */
    function getReplyFromDB($iReplyId) {
        if( !is_numeric($iReplyId) ) {
            catchExc("Tried to get post info with non-int post id in " . __FILE__);
            return false;
        }

        // date format string for MySQL
        // form of Sun Dec 22nd, 2002 at HH:MM:SS
        $sDateFormat = "%a %b %D, %Y at %r";

		$sql = "SELECT r.account_id,forum_reply,
                DATE_FORMAT(r.created_dt,\"$sDateFormat\") as postdate,
                a.account_screenname
                FROM ".PREFIX."_forums_replies r
                LEFT JOIN ".PREFIX."_accounts a
                ON (r.account_id=a.account_id)
                WHERE r.forum_reply_id = $iReplyId";

        $rsTmp = $this->_oConn->query($sql);
        if( DB::isError($rsTmp) ) {
            catchExc($rsTmp->getMessage());
        }

        list($id, $reply, $postDate, $screenName) = $rsTmp->fetchRow();

        $aReturn["Id"] = $id;
        $aReturn["Reply"] = $reply;
        $aReturn["PostDate"] = $postDate;
        $aReturn["ScreenName"] = $screenName;

        return $aReturn;
    }

    // }}}
    // {{{ createReply

    /**
     * put a new reply into the db
     *
     * @access public
     */
    function createReply() {
        if( !is_numeric($this->_iTopicId) ) {
            catchErr("Tried to use non-int forum id for post in " . __FILE__);
            return false;
        }

        if( !is_numeric($this->_iAccountId) ) {
            catchExc("Tried to use non-int poster id for post in " .  __FILE__);
            return false;
        }

        if( !is_string($this->_sReply) ) {
            catchExc("Tried to use non-string reply for post in " . __FILE__);
            return false;
        }

        $sql = "INSERT INTO ".PREFIX."_forums_replies
                (forum_topic_id , account_id , forum_reply , created_dt , modified_dt)
                VALUES ('" . $this->_iTopicId . "' , '" . $this->_iAccountId . "' ,
                        " . $this->_oConn->quote($this->_sReply) . " , NOW() , NOW())";

        $rsTmp = $this->_oConn->query($sql);
        if( DB::isError($rsTmp) ) {
            catchExc($rsTmp->getMessage());
            return false;
        }

        $sql = "UPDATE ".PREFIX."_forums
                SET forum_reply_cnt = forum_reply_cnt + 1, modified_dt = NOW()
                WHERE forum_id = " . $this->_iTopicId;
        $rsTmp = $this->_oConn->query($sql);
        if( DB::isError($rsTmp) ) {
            catchExc($rsTmp->getMessage());
            return false;
        }
        return true;
    }

    // }}}
    // {{{ deleteReply

    /**
     * Set deleted flag for a reply to 1
     *
     * @param integer reply id
     */
    function deleteReply($iReplyId) {
        if( !is_numeric($iReplyId) ) {
            catchExc("Tried to delete reply with non-int reply id in " . __FILE__);
            return false;
        }

	// we need the topic ID, because we will need to update the
	// reply count for this topic once we delete the reply
        $sql = "SELECT forum_topic_id FROM ".PREFIX."_forums_replies
                WHERE forum_reply_id = " . $iReplyId;

        $iTopicId = $this->_oConn->getOne($sql);
        if( DB::isError($iTopicId) ) {
            catchExc($iTopicId->getMessage());
            return false;
        }

        // set the indicated id as deleted, and set the deleted and
        // modified dates
        $sql = "UPDATE ".PREFIX."_forums_replies
                SET deleted = 1, deleted_dt = NOW() , modified_dt = NOW()
                WHERE forum_reply_id = " . $iReplyId;

        $rsTmp = $this->_oConn->query($sql);
        if( DB::isError($rsTmp) ) {
            catchExc($rsTmp->getMessage());
            return false;
        }

	// now, update the forums table to fix the reply count
        $sql = "UPDATE ".PREFIX."_forums
                SET forum_reply_cnt = forum_reply_cnt - 1
                WHERE forum_id = " . $iTopicId;
        $rsTmp = $this->_oConn->query($sql);
        if( DB::isError($rsTmp) ) {
            catchExc($rsTmp->getMessage());
            return false;
        }
    }

    // }}}
    // {{{ undeleteReply

    /**
     * Set deleted flag for a reply to 0
     *
     * @param integer reply id
     */
    function undeleteReply($iReplyId) {
        if( !is_numeric($iReplyId) ) {
            catchExc("Tried to undelete reply with non numeric reply id in " . __FILE__);
            return false;
        }

	// we'll need the forum topic id so that we can update the reply count
        $sql = "SELECT forum_topic_id FROM ".PREFIX."_forums_replies
                WHERE forum_reply_id = $iReplyId";

        $iTopicId = $this->_oConn->getOne($sql);
        if( DB::isError($iTopicId) ) {
            catchExc($iTopicId->getMessage());
            return false;
        }

	// set the deleted flag for the indicated reply to 0
        $sql = "UPDATE ".PREFIX."_forums_replies
                SET deleted = 0, modified_dt = NOW()
                WHERE forum_reply_id = " . $iReplyId;

        $rsTmp = $this->_oConn->query($sql);
        if( DB::isError($rsTmp) ) {
	        catchExc($rsTmp->getMessage());
            return false;
        }

	// increment the reply count for this forum
        $sql = "UPDATE ".PREFIX."_forums
                SET forum_reply_cnt = forum_reply_cnt + 1
                WHERE forum_id = " . $iTopicId;
        $rsTmp = $this->_oConn->query($sql);
        if( DB::isError($rsTmp) ) {
            catchExc($rsTmp->getMessage());
            return false;
        }
    }

    // }}}
    // {{{ getReplyIds

    /**
     * get the ids of the replies we want to show
     *
     * @param integer cursor position
     * @param integer forum id
     * @return array
     */
    function getReplyIds($iCursor,$iTopicId) {

	// we will return the $aReplyId array
	$aReplyId = array();

        $sql = "SELECT forum_reply_id FROM ".PREFIX."_forums_replies
                WHERE forum_topic_id = $iTopicId
                AND deleted = 0
                ORDER BY created_dt
                LIMIT $iCursor, " . ROWCOUNT;

	    $rsTmp = $this->_oConn->query($sql);
	    if( DB::isError($rsTmp) ) {
            catchExc($rsTmp->getMessage());
            return false;
        }

	// loop through our results
        while( list($id) = $rsTmp->fetchRow() ) {
            $aReplyId[] = $id;
        }
        return $aReplyId;
    }

    // }}}

} // end class forumreply


?>
