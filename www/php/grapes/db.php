<?php

require_once("GrapesDB.class.php");
require_once("../util/log.php");

define("HOST", "localhost");
define("USER_NAME", "happymuslim_f");
define("USER_PASS", "happymuslim");
define("DB_NAME", "happymuslim");

$result = array();
$result["_id"] = $_REQUEST['_id'];

$grapesDB = new GrapesDB(HOST, USER_NAME, USER_PASS, DB_NAME);

$api = $_REQUEST['api'];

switch ($api){
    case "user":
        Logger::log('user');
        $data = $grapesDB->getUser($_REQUEST['user']);
        break;
    case "users":
        Logger::log('users');
        $data = $grapesDB->getUsers($_REQUEST['count']);
        break;
    case "act":
        Logger::log('act');
        $data = $grapesDB->getActivity($_REQUEST['act']);
        break;
    case "act_detail":
        Logger::log('act_detail');
        $data = $grapesDB->getActivityDetail($_REQUEST['act']);
        break;
    case "acts":
        Logger::log('acts');
        $data = $grapesDB->getActivities($_REQUEST['count']);
        break;
    case "user_acts":
        Logger::log('user_acts');
        $data = $grapesDB->getUserActivities($_REQUEST['user']);
        break;
    case "act_members":
        Logger::log('act_members');
        $data = $grapesDB->getActivityMembers($_REQUEST['act']);
        break;
    default:
        $data = array();
}

$result["data"] = $data;

$res_type = $_REQUEST['res'];

if($res_type == 'jsonp'){
    echo $_REQUEST['_callback']."(".json_encode($result).")";
} else {
    echo json_encode($result);
}

?>