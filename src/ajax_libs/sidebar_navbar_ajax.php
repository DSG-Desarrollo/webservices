<?php 
    session_start();
    // @error_reporting(E_ERROR); 
    include('../../classes/main_app_class.php');
    Config::write('auth.initLogin',TRUE);
    $mainApp = new mainApp();
    $db = $mainApp->db;
    try {
        $user_level = $_SESSION['sess_user_level_code'];/*nivel del usuario*/ 

        $query = "CALL sp_access_level(?);";
        $data = $db->prepare($query);
        $data->bindParam(1,$user_level);
        $data->execute();
        
        $result['sidebar'] = $data->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($result);
    } catch (PDOException $error) {
        echo $error->getMessage();
    }
?>