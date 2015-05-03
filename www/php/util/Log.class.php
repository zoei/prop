<?php

class Logger {
    public static $FILE = 'server.log';
    public static function log($content){
        return file_put_contents(self::$FILE, $content."\r\n", FILE_APPEND);
    }
}

?>