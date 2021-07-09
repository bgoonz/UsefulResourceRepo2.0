<?php

// File Location: /_lib/_base/handlers.php

/** 
 * Form error handling functions
 *
 * @author Mike Buzzard <src@cubancouncil.com>
 * @version 1.0
 * @since 1.0
 * @access public
 * @copyright Cuban Council
 *
 */

// validate any input
function validInput($sVal, $iMin, $iMax) {
    $return = preg_match("/^(.){".$iMin.",".$iMax."}$/", $sVal);
    return $return;
}

// validate email
function validEmail($sVal) {
    $return = preg_match("/[a-z0-9|_|-|\.]+\@[a-z0-9|\.|-]+\.[a-z]{2,3}$/i", $sVal);
    return $return;
}

// validate user name
function validUser($sVal) {
    $return = preg_match("/^[a-z0-9|_|-]{1,50}$/i", $sVal);
    return $return;
}

// validate password
function validPass($sVal) {
    $return = preg_match("/^[a-z0-9|_|-]{1,32}$/i", $sVal);
    return $return;
}

/* validate url string */
function validUrl($sVal) {
    $return = preg_match("/^http(s?):\/\/[a-z0-9|\.|-]+\.+[a-z]{2,3}/i", $sVal);
    return $return;
}

// validate a file upload
function validFile($sVal) {
    
    global $FILES;
    $sExt = strtolower(array_pop(explode(".", $_FILES[$sVal]["name"])));
    
    if (!in_array($sExt, $FILES)) {
        
        $sTypes = "";
        
        while(list($key, $val) = each($FILES)) {
            
            $sTypes .= " ".$val;
        }
        
        catchErr("Select a valid image type. Acceptable types are".$sTypes);
        
    } else if ($_FILES[$sVal]["name"] > FILEMAX) {
        
        catchErr("Your image is too large, it must be ".FILEMAX." bytes or smaller in size");
        
    } else {
        
        return $sExt;
    }
}

// validate a date value
function validDate($sVal) {
    
    if (!preg_match("/^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/", trim($sVal))) {
        
        catchErr("Enter a valid date format");
        $return =  false;
        
    } else {
        
        $aDate = explode("/", $sVal);
        
        if (checkdate($aDate[0], $aDate[1], $aDate[2])) {
            
            $return =  true;
            
        } else {
            
            catchErr("Enter a valid date");
            $return =  false;
        }
    }
    
    return $return;
}

?>
