<?php
     session_start();
     include('../../../../classes/main_app_class.php');
     Config::write('auth.initLogin',TRUE);
     $mainApp = new mainApp();
     $db = $mainApp->db;
     $flag = $_POST["flag"];

     if ($flag == "get_units_list") {
          try {
               $query = 'CALL sp_listado_unidades(?);';       
               $stmt = $db->prepare($query);
               $stmt->bindParam(1,$_POST["user_id"]);
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

     if ($flag = "edit") {
          $data = $_POST["data"];
          try {
               foreach ($data as $key => $value) {
                    $query = "CALL sp_actualizar_unidad_api(?,?,?,?,?,?,?);";
                    $stmt = $db->prepare($query);
                    $stmt->bindParam(1, $value["Tid"]);
                    $stmt->bindParam(2, $value["Uid"]);
                    $stmt->bindParam(3, $value["wa_name"]);
                    $stmt->bindParam(4, $value["wa_unit_id"]);
                    $stmt->bindParam(5, $value["FleetName"]);
                    $stmt->bindParam(6, $value["estado_unidad"]);
                    $stmt->bindParam(7, $key);
                    $rs = $stmt->execute();
                    if ($rs) {
                         $response["status"] = $rs;
                         $response["message"] = "Exito al realizar la operación";
                    } else {
                         $response["status"] = false;
                         $response["message"] = "Error al realizar la operación";
                    }
                    //echo json_encode($key);
               }
          } catch (PDOException $error) {
               $response["status"] = false;
               $response["message"] =  $error->getMessage();
          }
          //echo json_encode($response);
     }
?>