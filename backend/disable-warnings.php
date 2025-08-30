<?php
ini_set('display_errors', '0');
ini_set('log_errors', '1');

set_error_handler(function($errno, $errstr, $errfile, $errline) {
    if (strpos($errstr, 'proc_open()') !== false && 
        strpos($errfile, 'sebastian/version') !== false) {
        return true;
    }
    
    if (strpos($errstr, 'proc_open()') !== false && 
        strpos($errstr, 'Exec failed') !== false) {
        return true;
    }
    
    return false;
}, E_WARNING);

putenv('GIT_DIR=');
putenv('GIT_WORK_TREE=');
?>