<?php
    include('classes/main_app_class.php');
    Config::write('auth.initLogin',TRUE);
    $mainApp = new mainApp();
    $db = $mainApp->db;
    $response = array();
    if ($_POST["user_id_web_1"]) {
        $sql = 'CALL sp_auth0(?)';
        $stmt = $db->prepare($sql);
        $stmt->bindParam(1,$_POST['user_id_web_1']);
        $stmt->execute();
        $udata = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($udata["ID"]) {
            $response["status"] = true;
        } else {
            $response["status"] = false;
        }
        echo json_encode($response);
    }
    exit();
?>