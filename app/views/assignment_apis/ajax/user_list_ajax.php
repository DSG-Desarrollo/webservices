<?php
     session_start();
     include('../../../../classes/main_app_class.php');
     Config::write('auth.initLogin',TRUE);
     $mainApp = new mainApp();
     $db = $mainApp->db;
     $flag = $_POST["flag"];
     $response = array();

     if ($flag == "get_client_list") {
          try {
               $query = "CALL sp_listado_clientes();";
               // print_r($query);exit();          
               $stmt = $db->prepare($query);
               $stmt->execute();
               $array["data"] = [];/*devuelve un arreglo vacio por si no hay registros en la base de datos*/
               while($data = $stmt->fetch(PDO::FETCH_ASSOC)){
                    $array["data"][] = $data; 
                    array_map("utf8_encode", $data);
               }
               echo json_encode($array);
          } catch (PDOException $error) {
               echo $error->getMessage();
          }
     }

     if ($flag == "edit_status_client") {
          try {
               $query = "CALL sp_actualizar_estado_usuario(?,?);";
               $stmt = $db->prepare($query);
               $stmt->bindParam(1, $_POST["status"]);
               $stmt->bindParam(2, $_POST["user_id"]);
               $rs = $stmt->execute();
               if ($rs) {
                    $response["status"] = $rs;
                    $response["message"] = "Exito al realizar la operación";
               } else {
                    $response["status"] = false;
                    $response["message"] = "Error al realizar la operación";
               }
          } catch (PDOException $error) {
               $response["status"] = false;
               $response["message"] =  $error->getMessage();
          }
          echo json_encode($response);
     }

     if($flag == "authorize_api"){

     }
?>