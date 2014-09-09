<?php

//print_r($_REQUEST);

//需要PHP 5 以上以及安装curl扩展

//AppKey 信息，请替换
define('APPKEY','86484869');

//AppSecret 信息，请替换
define('SECRET','0c7c60d99eca4f7a9c02b1dcec69367c');


//API 请求地址
define('URL', $_REQUEST['url']);
print(in_array('city', $_REQUEST));
//示例请求参数
$params = array();  
$params["city"]=in_array('city', $_REQUEST) ? $_REQUEST['city'] : "上海";  
$params["latitude"]=in_array('latitude', $_REQUEST) ? $_REQUEST['latitude'] : "31.218775";  
$params["longitude"]=in_array('longitude', $_REQUEST) ? $_REQUEST['longitude'] : "121.464059";  
$params["category"]=in_array('category', $_REQUEST) ? $_REQUEST['category'] : "美食";  
//$params["region"]="黄浦区";  
$params["limit"]=in_array('limit', $_REQUEST) ? $_REQUEST['limit'] : "20";  
$params["radius"]=in_array('radius', $_REQUEST) ? $_REQUEST['radius'] : "5000";  
$params["offset_type"]=in_array('offset_type', $_REQUEST) ? $_REQUEST['offset_type'] : "2";  
$params["has_coupon"]=in_array('has_coupon', $_REQUEST) ? $_REQUEST['has_coupon'] : "1";  
$params["has_deal"]=in_array('has_deal', $_REQUEST) ? $_REQUEST['has_deal'] : "1";  
$params["keyword"]=in_array('keyword', $_REQUEST) ? $_REQUEST['keyword'] : "清真菜 新疆菜";
$params["sort"]=in_array('sort', $_REQUEST) ? $_REQUEST['sort'] : "7";

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

$sign = strtoupper(sha1($codes));

$url= URL . '?appkey='.APPKEY.'&sign='.$sign.$queryString;

$curl = curl_init();

// 设置你要访问的URL
curl_setopt($curl, CURLOPT_URL, $url);

// 设置cURL 参数，要求结果保存到字符串中还是输出到屏幕上。
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

curl_setopt($curl, CURLOPT_ENCODING, 'UTF-8');

// 运行cURL，请求API
$output = curl_exec($curl);
//echo $output;

print_r($output);
// $data = json_decode($output, true);

// 关闭URL请求
curl_close($curl);

// print('Your request based on: ');
// print('<br/>');
// print_r($params);
// print('<br/>');
// print('Result:');
// print('<hr/>');

// var_dump($data);
 
?>