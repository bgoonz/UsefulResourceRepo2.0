<?php

class rssfeed
{

    /**
     * @var array
     */
    var $_aChannel;

    /**
     * @var array
     */
    var $_aChannelItems;

    /**
     * @var array
     */
    var $_aItems;

    /**
     * @var string
     */
    var $_sEncoding;

    /**
     * @var integer
     */
    var $_iCurrentItem;


    // {{{ CONSTRUCTOR

    /**
     * @access public
     */
    function rssfeed() {
        $this->_aChannel = array();
        $this->_aChannelItems = array();
        $this->_aItems = array();
        $this->_sEncoding = "ISO-8859-1";
        $this->_iCurrentItem = 0;
    }

    // }}}
    // {{{ setEncoding()

    /**
     * sets the value of the _sEncoding variable
     *
     * @access public
     */
    function setEncoding($sEncoding) {
        $this->_sEncoding = $sEncoding;
    }

    // }}}
    // {{{ _writeHeader()

    /**
     * generates the beginning XML needed for the RSS feed
     *
     * @access private
     * @return string
     */
    function _writeHeader() {

        $sHeader .= "<?xml version=\"1.0\" encoding=\"" . $this->_sEncoding . "\"?>\n";
        $sHeader .= "<rdf:RDF\n";
        $sHeader .= "  xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\"\n";
        $sHeader .= "  xmlns=\"http://purl.org/rss/1.0/\"\n";
        $sHeader .= ">\n";
    
        return $sHeader;
    }

    // }}}
    // {{{ _writeClose()

    /**
     * generates the closing XML needed for the RSS feed
     *
     * @access private
     * @return string
     */
    function _writeClose() {
        return "</rdf:RDF>\n";
    }

    // }}}
    // {{{ _fixEntities()

    /**
     * replace bad XML characters with XML entities
     *
     * @param string string to be fixed
     * @return string
     * @access private
     */
    function _fixEntities($sVar) {
        $sVar = str_replace("<" , "&lt;" , $sVar);
        $sVar = str_replace(">" , "&gt;" , $sVar);
        $sVar = str_replace("&" , "&amp;" , $sVar);
        
        return $sVar;
    }
    
    // }}}
    // {{{ setChannelTitle()

    /**
     * sets the title for the RSS channel
     *
     * @param string channel title
     * @access public
     */
    function setChannelTitle($sVar) {
        $this->_aChannel["title"] = $this->_fixEntities($sVar);
    }

    // }}}
    // {{{ setChannelLink()

    /**
     * sets the link for the RSS channel
     *
     * @param string channel link
     * @access public
     */
    function setChannelLink($sVar) {
        $this->_aChannel["link"] = $this->_fixEntities($sVar);
    }

    // }}}
    // {{{ setChannelDescription()

    /**
     * sets the description for the RSS channel
     *
     * @param string description
     * @access public
     */
    function setChannelDescription($sVar) {
        $this->_aChannel["description"] = $this->_fixEntities($sVar);
    }

    // }}}
    // {{{ setChannelAbout()

    /**
     * sets the about attribute for the RSS channel
     *
     * @param string about attribute
     * @access public
     */
    function setChannelAbout($sVar) {
        $this->_aChannel["about"] = $this->_fixEntities($sVar);
    }

    // }}}
    // {{{ startItem()

    /**
     * just returns the current item id
     *
     * @access public
     * @return integer
     */
    function startItem() {
        return $this->_iCurrentItem;
    }

    // }}}
    // {{{ setItemTitle()

    /**
     * sets the item title for the current item
     *
     * @param string title value
     * @access public
     */
    function setItemTitle($sVar) {
        $this->_aItems[$this->_iCurrentItem]["title"] = $this->_fixEntities($sVar);
    }

    // }}}
    // {{{ setItemLink()

    /**
     * sets the item link for the current item
     *
     * @param string link value
     * @access public
     */
    function setItemLink($sVar) {
        $this->_aItems[$this->_iCurrentItem]["link"] = $this->_fixEntities($sVar);
        $this->_addChannelItem($sVar);
    }

    // }}}
    // {{{ setItemDescription()

    /**
     * sets the description for the current item
     *
     * @param string description value
     * @param boolean whether description value is XML CDATA
     * @access public
     */
    function setItemDescription($sVar,$bCdata = FALSE) {
        if( $bCdata ) {
            $this->_aItems[$this->_iCurrentItem]["description"] = "<![CDATA[$sVar]]>";
        } else {
            $this->_aItems[$this->_iCurrentItem]["description"] = $this->_fixEntities($sVar);
        }
    }

    // }}}
    // {{{ _addChannelItem()

    /**
     * adds this item to the items element in the channel
     *
     * @param string resource link
     * @access private
     */
    function _addChannelItem($sVar) {
        $this->_aChannelItems[$this->_iCurrentItem] = $this->_fixEntities($sVar);
    }

    // }}}
    // {{{ endItem()

    /**
     * increments the current item id
     *
     * @access public
     */
    function endItem() {
        $this->_iCurrentItem++;
    }

    // }}}
    // {{{ getRssFeed()

    /**
     * returns a string with the RSS XML file
     *
     * @access public
     */
    function getRssFeed() {
    
        // get the header info
        $sRssFeed .= $this->_writeHeader();
    
        // write out channel info
        $sRssFeed .= "  <channel rdf:about=\"" . $this->_aChannel["about"] . "\">\n";
        foreach ( $this->_aChannel as $sKey => $sValue ) {
            // "about" is an attribute, not an element
            if( 0 != strcmp($sKey , "about") ) {
                $sRssFeed .= "    <$sKey>$sValue</$sKey>\n";
            }
        }
    
        // generate the <items> element nested in the <channel> element
        $sRssFeed .= "    <items>\n";
        $sRssFeed .= "      <rdf:Seq>\n";
        foreach( $this->_aChannelItems as $sResource ) {
            $sRssFeed .= "        <rdf:li resource=\"$sResource\" />\n";
        }
        $sRssFeed .= "      </rdf:Seq>\n";
        $sRssFeed .= "    </items>\n";
        $sRssFeed .= "  </channel>\n";
    
        //write out all of our items
        for( $i = 0 ; $i < count($this->_aItems) ; ++$i ) {
            $sRssFeed .= "  <item rdf:about=\"" . $this->_aItems[$i]["link"] . "\">\n";
            foreach( $this->_aItems[$i] as $sKey => $sValue ) {
                $sRssFeed .= "    <$sKey>$sValue</$sKey>\n";
            }
            $sRssFeed .= "  </item>\n";
        }
    
        // get close
        $sRssFeed .= $this->_writeClose();
    
        return $sRssFeed;
    }

    // }}}
    
} // end class rssfeed

?>