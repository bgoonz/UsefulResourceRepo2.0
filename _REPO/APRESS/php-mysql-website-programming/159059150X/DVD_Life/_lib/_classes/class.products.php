<?php

// require PEAR objects
require_once("DB.php");

// require USER objects
require_once("config.php");
require_once("funcs.php");

/** 
 * Manages products
 *
 * @author Jessey White-Cinis <cinis@codeisart.com>
 * @version 1.0
 * @since 1.0
 * @access public
 * @copyright Code Is Art
 *
 */
class products {

    /** 
     * Property containing the PEAR database object reference
     * 
     * @var object
     * @access private
     */
    var $_oConn;
	
    /** 
     * Property containing the product unique identifier
     * 
     * @var object
     * @access private
     */
    var $_iProductId;
    
    
    // CONSTRUCTOR ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /** 
     * Constructor method.
     * 
	 * Instanciates the PEAR DB module to handle all database connectivity
     * 
     * @access private
     */
    function products() {
        
        // Instanciate the database connection
        $this->_oConn =& DB::connect(DSN);
        
        // Check for DB class exceptions
        if (DB::isError($this->_oConn)) {
            
            // Report class exceptions if present
            catchExc($this->_oConn->getMessage());
        }
    }
    
    
    // PRIVATE METHODS ::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /**
     * Checks to see if the requested quantity of a product is currently in
     * stock.
     * 
     * @access public
     * @param $iQuantity desired quantity of products
     * @return boolean
     */
    function _checkQuantity($iQuantity) {
        
        // Set default return value
        $return = false;
        
        // Build SQL query
        $sql = "SELECT 
                    product_quantity 
                FROM 
                    ".PREFIX."_products 
                WHERE 
                    product_id = '".$this->_iProductId."'
                ";
        
        // Get the returned quantity and check for DB errors 
        if (DB::isError($iNum = $this->_oConn->getOne($sql))) {
            
            // Report class exceptions if present
            catchExc($iNum->getMessage());
        } else {
            
            // Return true if quantity exists
            if($iNum >= $iQuantity) {
                $return = true;
            }
        }
        
        // Return boolean value
        return $return;
    }
    
    
    // PUBLIC METHODS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /** 
     * Sets the current product id
     * 
     * @access public
     * @param $iProductId product unique identifier
     * @return boolean
     */
    function setProductId($iProductId) {
        
        // Make sure that the product identifier is an integer
        settype($iProductId, "int");
        
        // If there is a valid product id, than set the member variable and 
        // return true otherwise return false.
        if($iProductId != 0) {
            $this->_iProductId = $iProductId;
            $return = true;
        } else {
            $return = false;
        }
        
        // return boolean value
        return $return;
    }
    
    
    // SELECT METHODS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /** 
     * Gets a product
     *
     * @param $iProductId message unique identifier
     * @return array message data
     * @access public
     */
    function getProduct() {
        
        // Set default return value
        $return = false;
        
        // Build SQL query
        $sql = "SELECT 
                    product_sku, 
                    product_name, 
                    product_desc, 
                    product_rating, 
                    product_format, 
                    product_release_dt, 
                    product_img_path, 
                    product_price, 
                    product_quantity, 
                    status, 
                    created_dt, 
                    modified_dt 
                FROM 
                    ".PREFIX."_products 
                WHERE 
                    deleted = 0 AND 
                    product_id = '".$this->_iProductId."'
               ";
        
        // Check for DB class exceptions
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            // Report exceptions if present
            catchExc($rsTmp->getMessage());
            
        // If the query returns a record set than begin to build the array
        } elseif ($rsTmp->numRows()>0) {
            
            // Get the first record
            $aTmpRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC);
            
            // Set the product id from the member variable
            $return["Product Id"] = $this->_iProductId;
            
            // Set the array key/value pairs that need no manipulation
            $return["SKU"] = $aTmpRow["product_sku"];
            $return["Name"] = $aTmpRow["product_name"];
            $return["Description"] = $aTmpRow["product_desc"];
            $return["Rating"] = $aTmpRow["product_rating"];
            $return["Format"] = $aTmpRow["product_format"];
            $return["Image"] = $aTmpRow["product_img_path"];
            $return["Price"] = $aTmpRow["product_price"];
            
            // Cast the quantity variable as an integer
            $return["Quantity"] = (int) $aTmpRow["product_quantity"];
            
            // Convert the release date to a UNIX timestring
            $return["Release Date"] = strtotime($aTmpRow["product_release_dt"]);
            
            // Cast the status variable as an integer
            $return["Status"] = (int) $aTmpRow["status"];
            
            // Convert the created date to a UNIX timestring            
            $return["Created Date"]  = strtotime($aTmpRow["created_dt"]);
            
            // Convert the modified date to a UNIX timestring 
            $return["Modified Date"] = strtotime($aTmpRow["modified_dt"]);
            
        }
        
        // free the result set
        $rsTmp->free();
        
        // Return the array or false
        return $return;
    }
    
    /** 
     * Gets products
     *
     * @access public
     * @param integer $sSort the sql "order by" attribute(s)
     * @param integer $iPage the sql "limit" cursor position
     * @param boolean $iStatus the published state of a record
     * @return array messages data
     */
    function getProducts($sSort, $iPage=0, $iStatus=false) {
        
        // Set the default return value.
        $return = false;
        
        // Build SQL filter
        // If $iStatus is true than only return published products
        $iStatus ? $sFilter = " AND status = 1" : $sFilter = "";
        
        // Build the SQL query
        $sql = "SELECT
                    product_id, 
                    product_sku, 
                    product_name, 
                    product_desc, 
                    product_rating, 
                    product_format, 
                    product_release_dt, 
                    product_img_path, 
                    product_price, 
                    product_quantity, 
                    status, 
                    created_dt, 
                    modified_dt
                FROM 
                    ".PREFIX."_products
                WHERE 
                    deleted = 0 
                    ".$sFilter."
                ORDER BY 
                    ".$sSort." 
                LIMIT
                    ".$iPage.", ".ROWCOUNT;
        
        // Check for DB class exceptions
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            // Report exceptions if present
            catchExc($rsTmp->getMessage());
        
        // If there are no class exceptions then begin to build the array
        } else {
            
            $i = 0;
            
            // Loop through the returned records
            while ($aTmpRow = $rsTmp->fetchRow(DB_FETCHMODE_ASSOC)) {
                
                // Cast the product id variable as an integer
                $return[$i]["Product Id"] = (int) $aTmpRow["product_id"];
                
                // Set the array key/value pairs that need no manipulation
                $return[$i]["SKU"] = $aTmpRow["product_sku"];
                $return[$i]["Name"] = $aTmpRow["product_name"];
                $return[$i]["Description"] = $aTmpRow["product_desc"];
                $return[$i]["Rating"] = $aTmpRow["product_rating"];
                $return[$i]["Format"] = $aTmpRow["product_format"];
                $return[$i]["Image"] = $aTmpRow["product_img_path"];
                $return[$i]["Price"] = $aTmpRow["product_price"];
                
                // Convert the release date to a UNIX timestring
                $return[$i]["Release Date"] = strtotime($aTmpRow["product_release_dt"]);
                
                // Cast the quantity variable as an integer
                $return[$i]["Quantity"] = (int) $aTmpRow["product_quantity"];
                
                // Cast the status variable as an integer
                $return[$i]["Status"] = (int) $aTmpRow["status"];
                
                // Convert the created date to a UNIX timestring
                $return[$i]["Created Date"] = strtotime($aTmpRow["created_dt"]);
                
                // Convert the modified date to a UNIX timestring
                $return[$i]["Modified Date"] = 
                    strtotime($aTmpRow["modified_dt"]);
                
                $i++;
            }
            
            // free the result set
            $rsTmp->free();
            
            // Return the built array or false
            return $return;
        }
    }
    
    /** 
     * Counts the number of products in the database
     * 
     * @param boolean $iStatus 
     * @return integer message count
     * @access public
     */
    function getProductsCount($iStatus=false) {
        
        // Set the default return value
        $return = 0;
        
        // Build SQL filter
        // If $iStatus is true than only return a count of published products
        $iStatus ? $sFilter .= " AND status = 1" : $sFilter .= "";
        
        // Build SQL query
        $sql = "SELECT 
                    COUNT(product_id) 
                FROM 
                    ".PREFIX."_products 
                WHERE 
                    deleted = 0 
                    ".$sFilter;
        
        // Check for DB class exceptions
        if (DB::isError($return = (int) $this->_oConn->getOne($sql))) {
            
            // Report exceptions if present
            catchExc($return->getMessage());
        }
        
        // Return the number of (active?) products in the database
        return $return;
    }
    
    // INSERT METHODS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /**
     * Adds a product to the database
     * 
     * @return integer inserted product id
     * @access public
     */
    function addProduct($aArgs) {
        
        // Set default return value
        $return = false;
        
        // Build SQL query
        // Convert the release date to a SQL date format
        $sql = "INSERT INTO ".PREFIX."_products (
                    product_sku, 
                    product_name, 
                    product_desc, 
                    product_rating, 
                    product_format, 
                    product_release_dt,
                    product_price, 
                    product_quantity, 
                    created_dt, 
                    modified_dt
                ) VALUES (
                    '".$aArgs["SKU"]."',
                    '".$aArgs["Name"]."',
                    '".$aArgs["Description"]."',
                    '".$aArgs["Rating"]."',
                    '".$aArgs["Format"]."',
                    '".date("Y-m-d",$aArgs["Release Date"])."',
                    '".$aArgs["Price"]."',
                    '".$aArgs["Quantity"]."',
                    NOW(), 
                    NOW()
                )";
        
        // Check for DB class exceptions
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            // Report exceptions if present
            catchExc($rsTmp->getMessage());
        
        // If there are no DB class exceptions then get the insert id
        } else {
            
            // Use MySQL's LAST_INSERT_ID() method to query for the insert id
            $sql = "SELECT LAST_INSERT_ID()";
            
            // Check for DB class exceptions
            if (DB::isError($iProductId = $this->_oConn->getOne($sql))) {
                
                // Report exceptions if present
                catchExc($iProductId->getMessage());
                
                // Unset the product id
                unset($iProductId);
            }
            
            // Check that the file is uploaded and that the product has been 
            // inserted into the database successfully
            if (strcmp("",$aArgs["Image"]["name"]) && 
                is_uploaded_file($aArgs["Image"]["tmp_name"]) && $iProductId) {
                
                // Move the uploaded file to the correct location
                move_uploaded_file($aArgs["Image"]["tmp_name"],
                    BASE_DIR."/_img/_products/".$iProductId.".jpg");
                
                // Build update query to include the image path in the database
                $sql = "UPDATE 
                            ".PREFIX."_products 
                        SET 
                            product_img_path = '".$iProductId.".jpg'
                        WHERE 
                            product_id = '".$iProductId."'";
                
                // Check for DB class exceptions
                if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
                    
                    // Report exceptions if present
                    catchExc($rsTmp->getMessage());
                }
            }
            
            // Set the return value as the inserted product id
            $return = $iProductId;
        }
        
        // Return either the inserted id or false
        return $return;
    }
    
    
    // UPDATE METHODS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    
    /**
     * Updates a product in the database
     * 
     * @return integer inserted product id
     * @access public
     */
    function editProduct($aArgs) {
        
        // Set default return value
        $return = false;
        
        // Build the SQL query
        // Convert the release date to an SQL date format
        $sql = "UPDATE 
                    ".PREFIX."_products 
                SET
                    product_sku = '".$aArgs["SKU"]."',
                    product_name = '".$aArgs["Name"]."',
                    product_desc = '".$aArgs["Description"]."',
                    product_rating = '".$aArgs["Rating"]."',
                    product_format = '".$aArgs["Format"]."',
                    product_release_dt = '".date("Y-m-d",$aArgs["Release Date"])."',
                    product_price = '".$aArgs["Price"]."',
                    product_quantity = '".$aArgs["Quantity"]."',
                    modified_dt = NOW()
                WHERE 
                    product_id = '".$this->_iProductId."'
                ";
        
        // Check for DB class exceptions
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            // Report exceptions if present
            catchExc($rsTmp->getMessage());

        // If there are no exceptions then check for an uploaded file
        } else {
            
            // Check for the uploaded file
            if (strcmp("",$aArgs["Image"]["name"]) && 
                is_uploaded_file($aArgs["Image"]["tmp_name"])) {
                
                // Move the uploaded file to the correct path location
                move_uploaded_file($aArgs["Image"]["tmp_name"],
                    BASE_DIR."/_img/_products/".$this->_iProductId.".jpg");
                
                // Build update query to include the image path in the database
                $sql = "UPDATE 
                            ".PREFIX."_products 
                        SET 
                            product_img_path = '".$this->_iProductId.".jpg'
                        WHERE 
                            product_id = '".$this->_iProductId."'";
                
                // Check for DB class exceptions
                if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
                    
                    // Report exceptions if present
                    catchExc($rsTmp->getMessage());
                }
            }
            
            // If no exceptions are present then set return = true
            $return = true;
        }
        
        // Return true on success
        return $return;
    }
    
    /**
     * Publishes a product
     * 
     * @return boolean
     * @access public
     */
    function publishProduct() {
        
        // Build the SQL query
        $sql = "UPDATE 
                    ".PREFIX."_products 
                SET 
                    status = 1, 
                    modified_dt = NOW() 
                WHERE 
                    product_id = '".$this->_iProductId."'
                ";
        
        // Check for DB class exceptions
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            // Report exceptions if present
            catchExc($rsTmp->getMessage());
            
            // Set return = false
            $return = false;
            
        } else {
            
            // If there are no exceptions then set return = true
            $return = true;
        }
        
        // return true on success
        return $return;
    }

    /**
     * Stages a product
     * 
     * @return boolean
     * @access public
     */
    function stageProduct() {
        
        // Build the SQL query
        $sql = "UPDATE 
                    ".PREFIX."_products 
                SET 
                    status = 0, 
                    modified_dt = NOW() 
                WHERE 
                    product_id = '".$this->_iProductId."'
                ";
        
        // Check for DB class exceptions
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            // Report exceptions if present
            catchExc($rsTmp->getMessage());
            
            // Set return = false
            $return = false;
        } else {
            
            // If there are no exceptions then set return = true
            $return = true;
        }
        
        // Return true on success
        return $return;
    }


    // DELETE METHODS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::

    /**
     * Soft-Deletes a product from the database
     * 
     * @return boolean
     * @access public
     */
    function deleteProduct() {
        
        // Build SQL query
        $sql = "UPDATE 
                    ".PREFIX."_products 
                SET
                    deleted = 1,
                    deleted_dt = NOW(),
                    modified_dt = NOW()
                WHERE 
                    product_id = '".$this->_iProductId."'
                ";
        
        // Check for DB class exceptions
        if (DB::isError($rsTmp = $this->_oConn->query($sql))) {
            
            // Report exceptions if present
            catchExc($rsTmp->getMessage());
            
            // Set return = false
            $return = false;
        } else {
            
            // If there are no exceptions then set return = true
            $return = true;
        }
        
        // Return true on success
        return $return;
    }
    
    
}

?>
