<?php
//需要PHP 5 以上以及安装curl扩展

// var_dump($_REQUEST);

$api = $_REQUEST['_'];
$api = json_decode(base64_decode($api));

//API 请求地址
$api_url = $api->url;

if(array_key_exists('params', $api)){
	$api_params = $api->params;
}else{	
	$api_params = array();
}

if(array_key_exists('postData', $api)){
	$api_post_data = $api->postData;
}else{	
	$api_post_data = array();
}

if(array_key_exists('headers', $api)){
	$api_headers = $api->headers;
}else{	
	$api_headers = array();
}

if(array_key_exists('callback', $_GET)){
	$api_callback = $_GET['callback'];
}else{	
	$api_callback = NULL;
}

$excludes = array('url');
//示例请求参数
$params = array();
foreach($api_params as $key=>$value) {
	if(in_array($key, $excludes)){
		continue;
	}
	$params[$key] = $value;
}

//按照参数名排序
ksort($params);
// var_dump($params);

//请求的URL参数
$queryString = '';
while (list($key, $val) = each($params)){
	if($queryString === ''){
  		$queryString .=($key.'='.urlencode($val));
	}else{
  		$queryString .=('&'.$key.'='.urlencode($val));
	}

}
$url= $api_url.'?'.$queryString;
// var_dump($url);

// 设置Header
$headers = array();
foreach($api_headers as $n => $v ) { 
    $headers[] = $n .':' . $v;
}
// var_dump($headers);

// 设置Post数据
$post_data = array();
foreach($api_post_data as $key => $value ) { 
    $post_data[$key] = $value;
}
// var_dump($post_data);


$curl = curl_init();

// 设置你要访问的URL
curl_setopt($curl, CURLOPT_URL, $url);

// 设置cURL 参数，要求结果保存到字符串中还是输出到屏幕上。
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);

// 设置编码
curl_setopt($curl, CURLOPT_ENCODING, 'UTF-8');

// 设置Header
if(count($headers) > 0){
	curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
}

// 设置Post数据
if(count($post_data) > 0){
	curl_setopt($curl, CURLOPT_POSTFIELDS, $post_data);
}

// 运行cURL，请求API
$output = curl_exec($curl);

if($api_callback){
	header("Content-type:text/javascript;charset=utf8");
	echo $api_callback.'('.$output.')';
}else{
	// header("Content-type:application/json;charset=utf8");
	// header("Content-Type:application/javascript;charset=utf8");
	echo $output;
}

// print_r($output);
// $data = json_decode($output, true);

// 关闭URL请求
curl_close($curl);
 
?>