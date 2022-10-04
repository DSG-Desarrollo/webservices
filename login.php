<?php
    session_start();
    include('classes/main_app_class.php');
    Config::write('auth.initLogin',TRUE);
    $mainApp = new mainApp();
    $db = $mainApp->db;
    //$response = array();
    if ($_POST["user_id_web_1"]) {
        $sql = 'CALL sp_auth0(?)';
        $stmt = $db->prepare($sql);
        $stmt->bindParam(1,$_POST['user_id_web_1']);
        $stmt->execute();
        $udata = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($udata["ID"]) {
            $response["status"] = true;
            $_SESSION["sess_user_id"] = $udata["ID"];
            $_SESSION["sess_name_user"] = $udata["Nombre"];
            $_SESSION["sess_last_name"] = $udata["Apellido"];
            $_SESSION["sess_user_type"] = $udata["Tipo"];
            $_SESSION["sess_name_type"] = $udata["Nombre_Usuario"];
            $_SESSION["sess_user_level_code"] = $udata["user_level_code"];
            $sPage = "index.php";
            header ("Location: $sPage");
        } else {
            $response["status"] = false;
        }
        //echo json_encode($response);
    }
    header ("Location: $sPage");
    exit();
?>