<?php
//
// class to handle the creation of a new forum
// topic
//

require_once("class.forumhelp.php");

class forumtopic extends forumhelp {

    /**
     * @var integer
     */
    var $_iTopicId;
    
    /**
     * @var string
     */
    var $_sTopicName;
    
    /**
     * @var string
     */
    var $_sTopicText;
    
    /**
     * @var integer
     */
    var $_iAccountId;
    
    /**
     * @var integer
     */
    var $_iReplyCount;
    
    // {{{ CONSTRUCTOR
    
    /*
     * constructor
     *
     * @access public
     */
    function forumtopic() {

        parent::forumhelp();

    }

    // }}}
    // {{{ setAccountId()

    /*
     * Set the Creator ID variable
     *
     * @param integer account id
     * @access public
     */
    function setAccountId($iAccountId) {
        if( is_numeric($iAccountId) ) {
            $this->_iAccountId = $iAccountId;
        } else {
            catchExc("Tried to set topic creator id to non-int value in " . __FILE__);
            return false;
        }
    }
    
    // }}}
    // {{{ getAccountId()
    
    /*
     * Get the Creator ID variable
     *
     * @access public
     * @return integer
     */
    function getAccountId() {
        return $this->_iAccountId;
    }

    // }}}
    // {{{ setTopicName()

    /*
     * Set the Topic Name variable
     *
     * @param string topic name
     * @access public
     */
    function setTopicName($sTopicName) {
        if( is_string($sTopicName) ) {
            $this->_sTopicName = $this->_stripHtml($sTopicName);
        } else {
            catchExc("Tried to set topic name to non-string value in " . __FILE__);
            return false;
        }
    }
    
    // }}}
    // {{{ getTopicName()
    
    /*
     * Get the Topic Name variable
     *
     * @access public
     * @return string
     */
    function getTopicName() {
        return $this->_sTopicName;
    }
    
    // }}}
    // {{{ setTopicText()
    
    /*
     * Set the Topic Text variable
     *
     * @param string topic text
     * @access public
     */
    function setTopicText($sTopicText) {
        if( is_string($sTopicText) ) {
            $this->_sTopicText = $this->_stripHtml($sTopicText);
        } else {
            catchExc("Tried to set topic text to non-string value in " . __FILE__);
            return false;
        }
    }
    
    // }}}
    // {{{ getTopicText()
    
    /*
     * Get the Topic Text variable
     *
     * @access public
     * @return string
     */
    function getTopicText() {
        return $this->_sTopicText;
    }

    // }}}
    // {{{ createTopic()
    
    /*
     * Create new Topic in database
     *
     * @access public
     */
    function createTopic() {

		// first, we'll do some checks to make sure the data is the right types
        if( !is_numeric($this->_iAccountId) ) {
            catchExc("Tried to create new topic without valid creator id in " . __FILE__);
            return false;
        }
        
        if( !is_string($this->_sTopicName) ) {
            catchExc("Tried to create new topic without valid topic name in " . __FILE__);
            return false;
        }
        
        if( !is_string($this->_sTopicText) ) {
            catchExc("Tried to create new topic without valid topic text in " . __FILE__);
            return false;
        }

        // create new row in wrox_forums table, note that we're using the
		// DB::quote() method to quote the strings properly before insertion
        $sql = "INSERT INTO ".PREFIX."_forums
                (account_id , forum_name , forum_topic , created_dt , modified_dt)
                VALUES ('" . $this->_iAccountId . "' ,
                        " . $this->_oConn->quote($this->_sTopicName) . " ,
                        " . $this->_oConn->quote($this->_sTopicText) . " ,
                        NOW() , NOW())";

		// run the query and check for errors
        $rsTmp = $this->_oConn->query($sql);
        
        if( DB::isError($rsTmp) ) {
            catchExc($rsTmp->getMessage());
            return false;
        }

        // return true if everything worked
        return true;
    }

    // }}}
    // {{{ getTopicFromDb()

    /*
     * Set member variables based on values in DB
     *
     * @param integer topic id
     * @access public
     * @return array
     */
    function getTopicFromDb($iTopicId) {

        if( !is_numeric($iTopicId) ) {
            catchExc("Tried to get topic info without valid topic id in " . __FILE__);
            return false;
        }

        // date format string for MySQL
        // form of Sun Dec 22nd, 2002 at HH:MM:SS
        $sDateFormat = "%a %b %D, %Y at %r";

		// LEFT JOIN wrox_forums and wrox_accounts tables since we need
		// the account screenname from the accounts table
        $sql = "SELECT account_screenname,forum_name,forum_topic,
                forum_reply_cnt,DATE_FORMAT(forums.created_dt,\"$sDateFormat\") as date
                FROM ".PREFIX."_forums forums
                LEFT JOIN ".PREFIX."_accounts accounts
                ON (forums.account_id=accounts.account_id)
                WHERE forums.deleted = 0 AND forum_id = $iTopicId";

		// run query and catch any errors
        $rsTmp = $this->_oConn->getRow($sql);
        if( DB::isError($rsTmp) ) {
            catchExc($rsTmp->getMessage());
            return false;
        }

        // return associative array with the desired information
        $aReturn["TopicId"] = $iTopicId;
        $aReturn["ScreenName"] = $rsTmp[0];
        $aReturn["TopicName"] = $rsTmp[1];
        $aReturn["TopicText"] = $rsTmp[2];
        $aReturn["ReplyCount"] = $rsTmp[3];
        $aReturn["CreatedDate"] = $rsTmp[4];

        return $aReturn;

    }

    // }}}
    // {{{ deleteTopic()

    /*
     * Set deleted field in DB to 1 for this topic
     *
     * @param integer forum id to delete
     * @access public
     */
    function deleteTopic($iTopicId) {
        if( !is_numeric($iTopicId) ) {
            catchExc("Tried to delete Forum with non-int forum id in " . __FILE__);
            return false;
        }
        
        $sql = "UPDATE ".PREFIX."_forums
                SET deleted = 1 , deleted_dt = NOW() , modified_dt = NOW()
                WHERE forum_id = " . $iTopicId;
        
        $rsTmp = $this->_oConn->query($sql);
        if( DB::isError($rsTmp) ) {
            catchExc($rsTmp->getMessage());
            return false;
        }
    }
    
    // }}}
    // {{{ undeleteTopic()
    
    /*
     * Set deleted field in DB to 0 for this forum
     *
     * @param integer forum id to reactivate
     * @access public
     */
    function undeleteTopic($iTopicId) {
        if( !is_numeric($iTopicId) ) {
            catchExc("Tried to reinstate Forum with non-int forum id in " . __FILE__);
            return;
        }
        
        $sql = "UPDATE ".PREFIX."_forums
                SET deleted = 0 , deleted_dt = NOW() , modified_dt = NOW()
                WHERE forum_id = " . $iTopicId;
        $rsTmp = $this->_oConn->query($sql);
        if( DB::isError($rsTmp) ) {
            catchExc($rsTmp->getMessage());
            return false;
        }
    }
    
    // }}}
    // {{{ getReplyCount()
    
    /**
     * Get the number of replies for this Forum
     *
     * @access public
     * @param integer Forum Id [optional]
     * @return integer
     */
    function getReplyCount($iTopicId = '') {

        if( !strcmp($iTopicId,'') && !strcmp($this->_iTopicId , '') ) {
            catchExc("Tried to get count for forum without id in " . __FILE__);
            return false;
        }

        // if a topic id isn't supplied, then assume it's the topic
		// represented by this object
        if( !strcmp($iTopicId,'') && isset($this->_iTopicId) ) {
            $iTopicId = $this->_iTopicId;
        }

		// simple SQL statement to get reply count
        $sql = "SELECT forum_reply_cnt FROM ".PREFIX."_forums
                WHERE forum_id = $iTopicId";
                
        $rsTmp = $this->_oConn->getOne($sql);
        if( DB::isError($rsTmp) ) {
            catchExc($rsTmp->getMessage());
            return false;
        }
        
        return $rsTmp;
    }
    
    // }}}
    // {{{ addFavorites()

    /**
     * add indicated topics to favorites
     *
     * @param array favorites ids
     * @param integer account id
     * @return boolean
     */
    function addFavorites($aFavorite,$iAccountId) {
        if( !is_array($aFavorite) ) {
            catchExc("Passed non-array value for favorites.");
            return false;
        }

        if( !is_numeric($iAccountId) ) {
            catchExc("Passed numeric value for account id.");
            return false;
        }

        for( $i=0 ; $i < count($aFavorite) ; ++$i ) {

            // only want to add this if it's not already in the database
            $sql = "SELECT COUNT(forum_pref_id) FROM ".PREFIX."_forums_prefs
   	                WHERE forum_topic_id = " . $aFavorite[$i] . "
                    AND account_id = $iAccountId";

            if( $this->_oConn->getOne($sql) == 0 ) {
                $sql = "INSERT INTO ".PREFIX."_forums_prefs
        	            (forum_topic_id , account_id)
                        VALUES ('" . $aFavorite[$i] . "' , '$iAccountId')";

                $rsTmp = $this->_oConn->query($sql);
                if( DB::isError($rsTmp) ) {
                    catchExc($rsTmp->getMessage());
                    return false;
                }
            }
        }
        return true;
    } 

    // }}}
    // {{{ delFavorites

    /**
     * delete indicated topics from favorites
     *
     * @param array favorites ids
     * @param integer account id
     * @return boolean
     */
    function delFavorites($aFavorite,$iAccountId) {

        if( !is_array($aFavorite) ) {
            catchExc("Passed non-array value for favorites.");
            return false;
        }

        if( !is_numeric($iAccountId) ) {
            catchExc("Passed non-numeric value for account id.");
            return false;
        }

        for( $i=0 ; $i < count($aFavorite) ; ++$i ) {

            $sql = "DELETE FROM ".PREFIX."_forums_prefs
                    WHERE forum_topic_id = " . $aFavorite[$i] . "
                    AND account_id = $iAccountId";
            $rsTmp = $this->_oConn->query($sql);
            if( DB::isError($rsTmp) ) {
                catchExc($rsTmp->getMessage());
                return false;
            }
        }
        return true;
    }

    // }}}
    // {{{ getTopicDisplay

    /**
     * get the data to be displayed
     *
     * @param integer cursor position
     * @param string view mode
     * @param integer account id
     * @return array
     */
    function getTopicDisplay($iCursor,$sView,$iAccountId) {

        if( !strcmp($sView,"recent") ) {
            $sql = "SELECT forum_id,forum_name,forum_reply_cnt FROM ".PREFIX."_forums
           	    WHERE deleted = 0
                    ORDER BY modified_dt DESC
                    LIMIT $iCursor,".ROWCOUNT;
        } else {
            $sql = "SELECT forum_id,forum_name,forum_reply_cnt
                    FROM ".PREFIX."_forums forums, ".PREFIX."_forums_prefs prefs
                    WHERE deleted = 0
                    AND forums.forum_id = prefs.forum_topic_id
                    AND prefs.account_id = $iAccountId
                    ORDER BY modified_dt DESC
                    LIMIT $iCursor,".ROWCOUNT;
        }

        $rsTmp = $this->_oConn->query($sql);
        if( DB::isError($rsTmp) ) {
            catchExc($rsTmp->getMessage());
        } else {
            // counter for $topic array
            $i=0;
            while( list($id,$name,$replyCount) = $rsTmp->fetchRow(DB_FETCHMODE_ORDERED) ) {
                $aTopic[$i]["Id"] = $id;
                $aTopic[$i]["Name"] = $name;
                $aTopic[$i]["ReplyCount"] = $replyCount;
                ++$i;
            }
        }
        return $aTopic;
    }

    // }}}
    // {{{ getTotalTopics

    /**
     * get total number of undeleted topics
     *
     * @param string view
     * @param integer account id
     * @return integer
     */
    function getTotalTopics($sView,$iAccountId) {
        // need to know total number of topics for paging
        if( !strcmp($sView,"recent") ) {
            $sql = "SELECT COUNT(forum_id) FROM ".PREFIX."_forums 
        	    WHERE deleted = 0";
        } else {

	    $sql = "SELECT COUNT(forum_topic_id)
                    FROM ".PREFIX."_forums_prefs prefs
                    LEFT JOIN ".PREFIX."_forums forums
                    ON (prefs.forum_topic_id=forums.forum_id)
                    WHERE deleted = 0 AND prefs.account_id = $iAccountId";
        }
        return $this->_oConn->getOne($sql);
    }

    // }}}

} // end class forumtopic

?>
