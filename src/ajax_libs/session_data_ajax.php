<?php 
    session_start();
    include('../../classes/main_app_class.php');
    $return = array(
        "sess_user_id"=>$_SESSION["sess_user_id"],
        "sess_name_user"=>$_SESSION["sess_name_user"],
        "sess_last_name"=>$_SESSION["sess_last_name"],
        "sess_user_type"=>$_SESSION["sess_user_type"],
        "sess_name_type"=>$_SESSION["sess_name_type"],
        "sess_user_level_code"=>$_SESSION["sess_user_level_code"],
    );
    echo json_encode($return);    
?>