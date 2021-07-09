<?php

/* COPYRIGHT NOTICE
This software is copyright ©2002 Code Is Artô and licensed for use by 
distribution from Code Is Artô only.  This source code may not be 
redistibuted without written consent from the above mentioned entity. 
*/

// require USER objects
require_once("class.products.php");

/** 
 * Manages a user's shopping cart
 *
 * @author Jessey White-Cinis <cinis@codeisart.com>
 * @version 1.0
 * @since 1.0
 * @access public
 * @copyright Code Is Art
 *
 */
class shopping_cart extends products {
    
    /**
     * Member variable contiaing the total added price of items in the shopping
     * cart.
     * 
     * @var integer float
     * @access private
     */
    var $_iTotalPrice = 0;
    
    
    // CONSTRUCTOR ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /**
     * Constructor method.
     * 
	 * Instanciates parent object 'products'
     * 
     * @access private
     */
    function shopping_cart() {
        
        // Execute constructor for parent object
        $this->products();
    }
    
    // PRIVATE METHODS ::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /**
     * Creates an array from the shopping cart string which is stored as a 
     * cookie.
     * 
     * @access public
     * @return array
     */
    function _getCart() {
        
        // Convert the shopping cart cookie to a useable associative array
        return unserialize($_COOKIE["cart"]);
    }
    
    /**
     * Stores the passed array for future use
     * 
     * @param array $aCart
     * @access public
     * @return boolean
     */
    function setCart($aCart) {
        
        // Covert the passed array to a storable string and set it in a cookie
        setcookie("cart", serialize($aCart), false, "/" , "", "");
        
        // Always return true.
        return true;
    }
    
    /**
     * Gets the quantity of a product is in the user's shopping cart.
     * 
     * @access public
     * @param $iProductId product unique identifier
     * @return boolean
     */
    function _getQuantity($iProductId) {
        
        // Get the current cookie array
        $aCart = $this->_getCart();
        
        // Check for the product id and return the quantity
        if($aCart[$iProductId] > 0) {
            
            $return = $aCart[$iProductId];
        } else {
            
            // return false if the item does not exist in the user's cart
            $return = false;
        }

        return $return;        
    }
    
    /**
     * Returns the total price of items in a user's shopping cart.
     * 
     * @access public
     * @return integer
     */
    function getTotalPrice() {
        
        // Check for a set member variable.
        // getCartItems() has to be run prior to executing this method, so if a
        // value does not exist, than run the method.
        if ($this->_iTotalPrice == 0) {
            $aCartItems = $this->getCartItems();
        }
        
        // return the member variable
        return $this->_iTotalPrice;
    }
    
    
    // PUBLIC METHODS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /**
     * Returns an array of active products in a user's shopping cart
     * 
     * @access public
     * @return array
     */
    function getCartItems() {
        
        // Set default return value
        $return = array();
        
        // get the current shopping cart array
        $aCartItems = $this->_getCart();
        
        // Check for cart items
        if($aCartItems) {
        
            // build SQL filter
            if(count($aCartItems)){
                
                // get a list of all product ids in the shopping cart
                $aKeys = array_keys($aCartItems);
                
                $i=0;
                while($i<count($aKeys)){
                    
                    if($i != 0){
                        $sFilter .= ",";
                    }
                    
                    $sFilter .= $aKeys[$i];
                    $i++;
                }
            }
            
            // build the SQL query
            $sql = "SELECT 
                        product_id, 
                        product_name, 
                        product_price 
                    FROM 
                        ".PREFIX."_products 
                    WHERE 
                        status = 1 AND 
                        deleted = 0 AND 
                        product_id IN (".$sFilter.")
                   ";
            
            // Check for DB class exceptions
            if(DB::isError($rsTmp = $this->_oConn->query($sql))){
                
                catchExc($rsTmp->getMessage());
                $return = false;
            } else {
                
                $i=0;
                while ($aTmpRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC)) {
                
                    $return[$i]["Product Id"] = $aTmpRow["product_id"];
                    $return[$i]["Name"] = $aTmpRow["product_name"];
                    $return[$i]["Price"] = round($aTmpRow["product_price"],2);
                    $return[$i]["Quantity"] = (int) $aCartItems[$aTmpRow["product_id"]];
                    
                    // Multiply the quantity and the price to get a combined price
                    $return[$i]["Combined Price"] = $return[$i]["Quantity"] * $return[$i]["Price"];
                    
                    // Add the combined price to the total
                    $iTotal = $iTotal + $return[$i]["Combined Price"];
                    
                    $i++;
                }
            }
            
            // Set class member variable to the added total price
            $this->_iTotalPrice = $iTotal;
    
            if(count($return) == 0) { $return = array(); }
        }
        
        // return the array of cart items
        return $return;
    }
    
    /**
     * Adds an item to the shopping cart
     * 
     * @param integer $iProductId
     * @param integer $iQuantity
     * @access public
     * @return boolean
     */
    function addCartItem($iProductId, $iQuantity) {
        
        // get the current shopping cart array
        $aCart = $this->_getCart();
        
        // add the desired item and quantity to the array
        $aCart[$iProductId] = ( $aCart[$iProductId] + $iQuantity );
        
        // set the cart
        $this->setCart($aCart);
        
        // always returns true.
        return true;
    }

    /**
     * Updates an item and sets its quantity to the given amount
     * 
     * @param integer $iProductId
     * @param integer $iQuantity
     * @access public
     * @return boolean
     */
    function updateCartItem($iProductId, $iQuantity) {
        
        // get the current shopping cart array
        $aCart = $this->_getCart();
        
        // replace the item's quantity with the new quantity
        $aCart[$iProductId] = $iQuantity;
        
        // set the cart
        $this->setCart($aCart);
        
        // always return true
        return true;
    }
    
    /**
     * Deletes an item to the shopping cart
     * 
     * @param integer $iProductId
     * @access public
     * @return boolean
     */
    function deleteCartItem($iProductId) {
        
        // get the current shopping cart array
        $aCart = $this->_getCart();
        
        // remove the associated array key/value pair
        unset($aCart[$iProductId]);
        
        // set the cart
        $this->setCart($aCart);
        
        // always return true
        return true;
    }
    
    /**
     * Clear the account user's shopping cart
     * 
     * @access public
     * @return boolean
     */
    function clearCart() {
        
        // set an empty cart
        $this->setCart(array());
        
        // always return true
        return true;
    }
    
}