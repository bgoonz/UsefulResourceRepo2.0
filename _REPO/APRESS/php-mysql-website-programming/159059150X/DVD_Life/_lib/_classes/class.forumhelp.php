<?php


/*
 * class that provides some helper functions to
 * other forum classes for our app
 */

require_once("DB.php");
require_once("funcs.php");

class forumhelp {

    /**
     * @var boolean
     */
    var $_bStripHtml;

    /**
     * @var string
     */
    var $_sAllowTags;

    /**
     * @var object
     */
    var $_oConn;


    // {{{ CONSTRUCTOR

    /**
     * @access public
     */
    function forumhelp() {

        $this->_oConn = DB::connect(DSN);
		if( DB::isError($this->_oConn) ) {
		  // remember that getMessage() is inherited from
		  // the PEAR::ERROR object
		    catchExc($this->_oConn->getMessage());
		}

		$this->_bStripHtml = true;
		$this->_sAllowTags = '';
	}

    // }}}
    // {{{ _stripHtml

    /**
     * conditionally strips HTML tags
     *
     * @access private
     * @return string
     */
    function _stripHtml($sString) {

	    if( !$this->_bStripHtml ) {
            return $sString;
        }

        if( !strcmp($this->_sAllowTags,'') ) {
            return strip_tags($sString);
        } else {
            return strip_tags($sString , $this->_sAllowTags);
        }

    }

    // }}}
    // {{{ setAllowTags

    /**
     * specify the allowable HTML tags
     *
     * @param string allowable tags
     */
    function setAllowTags($sAllowTags) {
        if( is_string($sAllowTags) ) {
            $this->_sAllowTags = $sAllowTags;
        } else {
            catchExc("Tried to set allowable HTML tags to non-string in " . __FILE__);
        }
    }

    // }}}
    // {{{ setStripHtml

    /**
     * set the allow HTML variable
     *
     * @param boolean allow HTML value
     */
    function setStripHtml($bAllow) {
        if( is_boolean($bAllow) ) {
            $this->_bStripHtml = $bAllow;
        } else {
            catchExc("Tried to set _bStripHtml to non-bool value in " . __FILE__);
        }
    }

    // }}}
    // {{{ getSreennameFromId
    
    /**
     * get a username from a user id
     *
     * @param integer user id
     * @access public
     * @return string
     */
    function getScreennameFromId($iUserId) {
        if( !is_integer($iUserId) ) {
            catchExc("Tried to get user name with non-int user id in " . __FILE__);
            return;
        }
        
        $sql = "SELECT account_screenname FROM ".PREFIX."_accounts
                WHERE account_id = $iUserId";
        $rsTmp = $this->_oConn->getOne($sql);
        
        if( DB::isError($rsTmp) ) {
            catchExc($rsTmp->getMessage());
        } else {
            return $rsTmp;
        }
    }
    
    // }}}
    // {{{ getEmailFromId
    
    /**
     * get a email from a user id
     *
     * @param integer user id
     * @access public
     * @return string
     */
    function getEmailFromId($iUserId) {
        if( !is_integer($iUserId) ) {
            catchExc("Tried to get email with non-int user id in " . __FILE__);
            return;
        }
        
        $sql = "SELECT account_email FROM ".PREFIX."_accounts
                WHERE account_id = $iUserId";
        $rsTmp = $this->_oConn->getOne($sql);
        
        if( DB::isError($rsTmp) ) {
            catchExc($rsTmp->getMessage());
        } else {
            return $rsTmp;
        }
    }
    
    // }}}

} // end class forumhelp

?>
