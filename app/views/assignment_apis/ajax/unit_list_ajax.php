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
?>