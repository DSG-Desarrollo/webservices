<?php
ini_set('display_errors', 0);

$__config = 'Config';
Config::write('db.host','54.163.39.72');
Config::write('db.user','mrrobot');
Config::write('db.pass','Dsg2019*');
Config::write('db.dbname',false);
Config::write('db.dbport',false);
Config::write('db.systemdb','dsg_web_services_db');

class Config {
    static $confArray;
    public static function read($name){
        if(array_key_exists($name,self::$confArray))return self::$confArray[$name];
        else return false;
    }
    public static function write($name, $value){
        self::$confArray[$name]=$value;
    }
    public static function show(){
        return self::$confArray;
    }
}
?>