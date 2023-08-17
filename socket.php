<?php
$d = array(
    "switch" => array(
        "status" => "off",
        "off_time" => 100
    ),
    "sensors" => array(
    
    )
);
/* Sensors */
$conf = array(
    "type" => "sensors",
    "data" => array(
        array(
            "type" => "sensor",
            "topic" => "t",
            "name" => "Temperature",
            "unit" => "°C"
        ),
        array(
            "type" => "sensor",
            "topic" => "h",
            "name" => "Humidity",
            "unit" => "%"
        ),
        array(
            "type" => "sensor",
            "topic" => "pm25",
            "name" => "PM2.5",
            "unit" => "µg/m³"
        ),
        array(
            "type" => "sensor",
            "topic" => "choh",
            "name" => "CHOH",
            "unit" => "mg/m³"
        )
    )
);
$vals = array(
    "t" => 32,
    "h" => 46,
    "pm25" => 9,
    "choh" => 0.003
);

/* Switch */
/*
$conf = array(
    "type" => "switchs",
    "data" => array(
        array(
            "topic" => "s1",
            "name" => "开关一"
        ),
        array(
            "topic" => "s2",
            "name" => "开关二"
        ),
        array(
            "topic" => "s3",
            "name" => "开关三"
        ),
        array(
            "topic" => "s4",
            "name" => "开关四"
        )
    )
);
$vals = array(
    "s1" => true,
    "s2" => true,
    "s3" => false,
    "s4" => true
);
*/


$server = new Swoole\Websocket\Server('0.0.0.0', 81);

$server->on('start', function ($server) {
    echo "Websocket Server is started at ws://0.0.0.0:81\n";
});

$server->on('open', function($server, $req) {
    echo "connection open: {$req->fd}\n";
});

$server->on('message', function($server, $frame) {
    global $conf, $vals;
    echo "received message: {$frame->data}\n";
    if($frame->data == "OPEN"){
        $server->push($frame->fd, json_encode(array("title"=>"Sensors Demo", "type"=>"sensors")));
        foreach($conf['data'] as $v){
            $server->push($frame->fd, json_encode($v));
        }
    }else{
        $server->push($frame->fd, "PONG");
    }
    $server->push($frame->fd, json_encode($vals));
    //$server->push($frame->fd, json_encode(['hello', 'world']));
});

$server->on('close', function($server, $fd) {
    echo "connection close: {$fd}\n";
});

$server->start();
