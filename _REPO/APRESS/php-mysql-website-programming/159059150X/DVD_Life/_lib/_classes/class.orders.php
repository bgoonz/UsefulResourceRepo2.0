<?php

// require PEAR objects
require_once("DB.php");

// require USER objects
require_once("config.php");
require_once("funcs.php");

/** 
 * Manages product orders
 *
 * @author Jessey White-Cinis <cinis@codeisart.com>
 * @version 1.0
 * @since 1.0
 * @access public
 * @copyright Code Is Art
 *
 */
class orders {

    /** 
     * Property containing the PEAR database object reference
     * 
     * @var object
     * @access private
     */
    var $_oConn;
	
    /** 
     * Property containing the order unique identifier
     * 
     * @var integer
     * @access private
     */
    var $_iOrderId;
    

    // CONSTRUCTOR ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /** 
     * Constructor method.
     * 
	 * Instanciates the PEAR DB module to handle all database connectivity
     * 
     * @access private
     */
    function orders() {
        
        $this->_oConn =& DB::connect(DSN);
        
        if (DB::isError($this->_oConn)) {
            
            catchExc($this->_oConn->getMessage());
        }
    }
    
    
    // PRIVATE METHODS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    
        
    // PUBLIC METHODS ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /**
     * Sets the order unique identifier for use with all data function
     * 
     * @param integer $iOrderId Order Unique Identifier
     * @return boolean
     * @access public
     */
    function setOrderId($iOrderId) {
        
        settype($iOrderId, "integer");
        
        if($iOrderId != 0) {
            
            $this->_iOrderId = $iOrderId;
            $return = true;
        } else {
            
            $return = false;
        }
        
        return $return;
    }
    
    /**
     * Processes the submitted credit card data
     * 
     * @param string $sCCNumber
     * @param string $sCCDate
     * @access public
     * @return boolean
     */
    function processCreditCard($sCCNumber, $iCCDate, $iAmount, $iTest = 0) {
        
        // define server
        if ($iTest == 1) { 
            $sServer = "test-payflow.verisign.com";
        } else {
            $sServer = "connect.signio.com";
        }
        
        if ($iTest == 0 || $iTest == 1) {
            
            pfpro_init();
            
            // This will define your transaction as well as your VeriSign user info
            $aTransArgs = array(
                'USER' => 'mylogin',
                'PWD'  => 'mypassword',
                'PARTNER' => 'VeriSign',
                'TRXTYPE' => 'S',
                'TENDER'  => 'C',
                'AMT'     => $iAmount,
                'ACCT'    => $sCCNumber,
                'EXPDATE' => date("my",$iCCDate)
            );
        
            $aResp = pfpro_process($aTransArgs, $sServer);
            
            if (!$aResp) {
                
                $return = false;
            } else {
                
                $return = $aResp['RESULT'];
            }
        
            pfpro_cleanup();
        } elseif($iTest == 2) {
            
            $return = "TEST CONFERMATION STRING";
        } else {
            
            $return = false;
        }
        
        return $return;
    }
    
    // SELECT METHODS ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /** 
     * Gets an order
     *
     * @return array order data
     * @access public
     */
    function getOrder() {
        
        $sql = "SELECT 
                    account_id, 
                    order_total_price, 
                    order_cc_number, 
                    order_cc_exp_dt,
                    order_ship_dt,
                    order_pfp_confirm,
                    status,
                    created_dt
                FROM 
                    ".PREFIX."_orders
                WHERE 
                    order_id = '".$this->_iOrderId."'
                ";
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            $return = false;
            
        } elseif ( $rsTmp->numRows() > 0 ) {
            
            $return = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC);
            
            $return["order_id"] = $this->_iOrderId;
            
            // check for ship date
            if(!strcmp("",$return["order_ship_dt"])){
                $return["order_ship_dt"] = false;
            } else {
                $return["order_ship_dt"] = strtotime($return["order_ship_dt"]);
            }
            
            $return["created_dt"] = strtotime($return["created_dt"]);
            
        } else {
            
            $return = false;
        }
        
        return $return;
    }
    
    /** 
     * Gets the active orders from the database.
     * 
     * @param integer $sSort the sql "order by" attribute(s)
     * @param integer $iPage the sql "limit" cursor position
     * @param boolean $iStatus 
     * @return array message data
     * @access public
     */
    function getOrders($sSort, $iPage=0, $iStatus=false) {
        
        $sql = "SELECT 
                    order_id,
                    account_id, 
                    order_total_price, 
                    order_cc_number, 
                    order_cc_exp_dt,
                    order_ship_dt,
                    order_pfp_confirm,
                    status,
                    created_dt
                FROM 
                    ".PREFIX."_orders
                WHERE 
                    status = 1 
                ORDER BY 
                    ".$sSort." 
                LIMIT 
                    ".$iPage.", ".ROWCOUNT;
                
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            $return = false;
            
        } elseif ( $rsTmp->numRows() > 0 ) {
            
            $i=0;
            while($aTmpRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC)) {
                
                // copy row to return array
                $return[$i] = $aTmpRow;
                
                $return[$i]["order_cc_exp_dt"] = 
                    strtotime($return[$i]["order_cc_exp_dt"]);
                
                // check for ship date
                if(!strcmp("",$return[$i]["order_ship_dt"])) {
                    $return[$i]["order_ship_dt"] = false;
                } else {
                    $return[$i]["order_ship_dt"] = strtotime($return[$i]["order_ship_dt"]);
                }
                
                $return[$i]["created_dt"] = strtotime($return[$i]["created_dt"]);
            
            $i++;
            }
            
        } else {
            
            $return = false;
        }
        
        return $return;
    }
    
    /** 
     * Counts the number of orders in the database
     * 
     * @return integer orders count
     * @access public
     */
    function getOrdersCount() {
        
        $sql = "SELECT 
                    COUNT(order_id) 
                FROM 
                    ".PREFIX."_orders 
               ";
                
        $iCnt = $this->_oConn->getOne($sql);
        
        return $iCnt;
    }
    
    /** 
     * Gets the ordered items associated with an order
     * 
     * @return array order items
     * @access public
     */
    function getOrderItems() {
        
        $sql = "SELECT 
                    item_id,
                    order_id,
                    item_name, 
                    item_price, 
                    item_quantity
                FROM 
                    ".PREFIX."_order_items
                WHERE 
                    order_id = '".$this->_iOrderId."'
               ";
                
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            $return = false;
            
        } elseif ( $rsTmp->numRows() > 0 ) {
            
            $i=0;
            while($aTmpRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC)) {
                
                // copy row to return array
                $return[$i] = $aTmpRow;
                
            $i++;
            }
            
        } else {
            
            $return = false;
        }
        
        return $return;
    }
    
    /** 
     * Gets the active orders related to a user
     * 
     * @param integer $iAccountId account user id
     * @return array message data
     * @access public
     */
    function getAccountOrders($iAccountId) {
        
        $sql = "SELECT 
                    orders.order_id,
                    orders.account_id, 
                    orders.order_total_price, 
                    orders.order_cc_number, 
                    orders.order_cc_exp_dt,
                    orders.order_ship_dt,
                    orders.order_pfp_confirm,
                    orders.status,
                    orders.created_dt, 
                    COUNT(items.item_id) AS item_count
                FROM 
                    ".PREFIX."_orders AS orders,
                    ".PREFIX."_order_items AS items
                WHERE 
                    orders.order_id = items.order_id AND
                    orders.account_id = '".$iAccountId."'
                GROUP BY
                    orders.order_id
                ORDER BY 
                    orders.order_id DESC
                ";
                
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            $return = false;
            
        } elseif ( $rsTmp->numRows() > 0 ) {
            
            $i=0;
            while($aTmpRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC)) {
                
                // copy row to return array
                $return[$i] = $aTmpRow;
                
                $return[$i]["order_cc_exp_dt"] = 
                    strtotime($return[$i]["order_cc_exp_dt"]);
                
                // check for ship date
                if(!strcmp("",$return[$i]["order_ship_dt"])) {
                    $return[$i]["order_ship_dt"] = false;
                } else {
                    $return[$i]["order_ship_dt"] = strtotime($return[$i]["order_ship_dt"]);
                }
                
                $return[$i]["created_dt"] = strtotime($return[$i]["created_dt"]);
            
            $i++;
            }
            
        } else {
            
            $return = false;
        }
        
        return $return;
    }

    // INSERT METHODS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /**
     * Adds as order to the database
     * 
     * @param array $aArgs
     * @return integer inserted product id
     * @access public
     */
    function addOrder($aArgs) {
        
        $sql = "INSERT INTO ".PREFIX."_orders (
                    account_id, 
                    order_total_price, 
                    order_cc_number, 
                    order_cc_exp_dt,
                    status,
                    created_dt
                ) VALUES ( 
                    '".$aArgs["account_id"]."',
                    '".$aArgs["order_total_price"]."',
                    '".$aArgs["order_cc_number"]."',
                    '".date("Y-m-d",$aArgs["order_cc_exp_dt"])."',
                    '1',
                    NOW()
                )
               ";
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            $return = false;
        } else {
            
            $sql = "SELECT LAST_INSERT_ID()";
            $iOrderId = $this->_oConn->getOne($sql);
            $return = $iOrderId;
        }
        
        return $return;
    }

    /**
     * Adds an item to the account user's final order
     * 
     * @param array $aArgs
     * @return integer boolean
     * @access public
     */
    function addOrderItem($aArgs) {
        
        $sql = "INSERT INTO ".PREFIX."_order_items ( 
                    order_id,
                    item_name,
                    item_price,
                    item_quantity
                ) VALUES ( 
                    '".$this->_iOrderId."',
                    '".$aArgs["item_name"]."',
                    '".$aArgs["item_price"]."',
                    '".$aArgs["item_quantity"]."'
                )
               ";
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            $return = false;
        } else {
            
            $sql = "SELECT LAST_INSERT_ID()";
            $iItemId = $this->_oConn->getOne($sql);
            $return = $iItemId;
            
            $sql = "UPDATE 
                        ".PREFIX."_products 
                    SET 
                        product_quanity = product_quantity - ".$aArgs["item_quantity"]."
                    WHERE
                        product_id = '".$aArgs["product_id"]."'
                   ";
            
            if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
                catchExc($rsTmp->getMessage());
                $return = false;
            }
        }
                    
        return $return;
    }

    // UPDATE METHODS ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /** 
     * Updates an order to include the payment confirmation
     * 
     * @param string $sConfirm PayFlow Pro confirmation number
     * @access public
     * @return boolean
     */
    function confirmPayment($sConfirm) {
        
        $sql = "UPDATE 
                    ".PREFIX."_orders
                SET 
                    order_pfp_confirm = '".$sConfirm."',
                    status = 1
                WHERE 
                    order_id = '".$this->_iOrderId."'
               ";
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            $return = false;
        } else {
            
            $return = true;
        }
        
        return $return;
    }
    
    /**
     * Updates the shipping date and status fields of an order to show order 
     * completion
     * 
     * @access public
     * @return boolean
     */
    function completeOrder() {
        
        $sql = "UPDATE 
                    ".PREFIX."_orders
                SET 
                    order_ship_dt = NOW(),
                    status = 0
                WHERE 
                    order_id = '".$this->_iOrderId."'
               ";
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            $return = false;
        } else {
            
            $return = true;
        }
        
        return $return;
    }
    
    // DELETE METHODS ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /**
     * Perminantly deletes an order from the database
     * 
     * @return boolean
     * @access public
     */
    function deleteOrder() {
        
        $sql = "DELETE FROM ".PREFIX."_orders 
                WHERE order_id = '".$this->_iOrderId."'";
        
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            catchExc($rsTmp->getMessage());
            $return = false;
        } else {
            
            $return = true;
        }
        
        return $return;
    }

}
