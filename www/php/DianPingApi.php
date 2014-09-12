<?php

// var_dump($_REQUEST);

//需要PHP 5 以上以及安装curl扩展

//AppKey 信息，请替换
// define('APPKEY','86484869');
define('APPKEY', $_GET['appkey']);

//AppSecret 信息，请替换
// define('SECRET','0c7c60d99eca4f7a9c02b1dcec69367c');
define('SECRET', $_GET['secret']);


//API 请求地址
define('URL', $_GET['url']);

$excludes = array('url', 'secret', 'appkey', 'sign');
//示例请求参数
$params = array();

foreach($_GET as $key=>$value) {
	if(in_array($key, $excludes)){
		continue;
	}
	$params[$key] = $value;
}

//按照参数名排序
ksort($params);
var_dump($params);

//连接待加密的字符串
$codes = APPKEY;

//请求的URL参数
$queryString = '';

while (list($key, $val) = each($params))
{
  $codes .=($key.$val);
  $queryString .=('&'.$key.'='.urlencode($val));
}

$codes .=SECRET;
//print($codes);

// $sign = strtoupper(sha1($codes));
$sign = $_GET['sign'];

$url= URL . '?appkey='.APPKEY.'&sign='.$sign.$queryString;

$curl = curl_init();

// 设置你要访问的URL
curl_setopt($curl, CURLOPT_URL, $url);

// 设置cURL 参数，要求结果保存到字符串中还是输出到屏幕上。
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

curl_setopt($curl, CURLOPT_ENCODING, 'UTF-8');

// 运行cURL，请求API
$output = curl_exec($curl);
echo $output;

// print_r($output);
// $data = json_decode($output, true);

// 关闭URL请求
curl_close($curl);
 
?>