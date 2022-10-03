<?php
//namespace mainApp\mainLib;
require_once('config_class.php');
class mainApp {
    public $db;
    //private static $instance;
    protected $grantAccess = false;
    protected $userId=false;
    protected $userLevel=false;
    public $systemdb;
    
    public function __construct(){
        $this->systemdb = Config::read('db.systemdb');
        //db
        $this->db_handler();
    }
    private function db_handler(){
        try{
            $dsn = 'mysql:host=' . Config::read('db.host') . ';charset=utf8mb4';
            if(Config::read('db.systemdb'))$dsn .= ';dbname=' . Config::read('db.systemdb');
            if(Config::read('db.port'))$dsn .= ';port=' . Config::read('db.port');
            $this->db = new PDO($dsn, Config::read('db.user'), Config::read('db.pass'));
            $this->db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        }
        catch(PDOException $e){
            echo "ERR :: " . $e->getMessage();
        }
    }
}
?>