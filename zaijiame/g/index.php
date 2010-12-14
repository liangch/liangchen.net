<?php
$move301 = FALSE;
$chunked = FALSE;
$auth = FALSE;

function header_callback($curl, $header) {
		global $move301, $chunked;
		if(!strcasecmp(substr($header,0,12),"HTTP/1.1 301") || !strcasecmp(substr($header,0,12),"HTTP/1.1 302"))
			$move301 = TRUE;
		elseif(!strcasecmp(substr($header,0,12),"HTTP/1.1 200"))
			$move301 = FALSE;
		if(!strcasecmp(substr($header,0,17),"Transfer-Encoding"))
			$chunked = TRUE;
		if(!$move301 && strcasecmp(substr($header,0,17),"Transfer-Encoding")){
			// error_log('lmao: '. $header);
			header($header);
		}
		return strlen($header);	
}

if(!function_exists('apache_request_headers')) {
	function apache_request_headers() {
		$headers = array();
		foreach($_SERVER as $key => $value) {
			if(substr($key, 0, 5) == 'HTTP_') {
				$headers[str_replace(' ', '-', ucwords(str_replace('_', ' ', strtolower(substr($key, 5)))))] = $value;
			}
		}
		return $headers;
	}
}

function outputlineheader($headerdict){
	global $auth;
	$headerline = array();
	foreach($headerdict as $key => $value){
		if(!strcasecmp($key,"Host") || !strcasecmp($key,"Zcreal-Nsurl")|| 
		!strcasecmp($key,"content-type") || !strcasecmp($key, "Referer"))
		 	continue;
		if($key == "Authorization")
			$auth = TRUE;
		array_push($headerline, $key . ": " . $value);
	}
	return $headerline;
}


$content_type = "";
if(isset($_SERVER['CONTENT_TYPE'])){
	$content_type = $_SERVER['CONTENT_TYPE'];
}

$user_agent = $_SERVER['HTTP_USER_AGENT'];

$curl = curl_init();
$url = "";

if(isset($_SERVER['HTTP_ZCREAL_NSURL'])){
	$url = $_SERVER['HTTP_ZCREAL_NSURL'];
}
elseif(isset($_GET['url'])){
	//do twice base64 decoding and dig out the URL
	$url = base64_decode(base64_decode($_GET['url']));
}
else{
	$url = "";
}

// error_log($url);

if(isset($_SERVER['PHP_AUTH_USER']) || isset($_SERVER['PHP_AUTH_PW'])){
	$username = $_SERVER['PHP_AUTH_USER'];
	$password = $_SERVER['PHP_AUTH_PW'];
}
$header_dict = apache_request_headers();
$curl_headers = outputlineheader($header_dict); //array

$body = @file_get_contents('php://input');

if(isset($HTTP_RAW_POST_DATA)){
	$body = $HTTP_RAW_POST_DATA;
}
elseif(isset($GLOBALS['HTTP_RAW_POST_DATA'])){
	$body = $GLOBALS['HTTP_RAW_POST_DATA'];
}
elseif(isset($_SERVER['HTTP_RAW_POST_DATA'])){
	$body = $_SERVER['HTTP_RAW_POST_DATA'];
}

if (isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION']) && !$auth) {
	array_push($curl_headers, "Authorization: " . $_SERVER['REDIRECT_HTTP_AUTHORIZATION']);
}

$content_type = str_replace("form-data-alternate-alternate", "form-data", $content_type);

if($content_type != ""){
	array_push($curl_headers, "Content-Type: " . $content_type);
}

// foreach($curl_headers as $key => $value) {
	// error_log("name: " . $key . " value: " . $value . "\n");
// }

// error_log($body);


curl_setopt_array($curl, array(
	CURLOPT_URL => $url,
	CURLOPT_HTTPHEADER => $curl_headers,
	CURLOPT_SSL_VERIFYPEER => 0,
	CURLOPT_FOLLOWLOCATION => 1,
	CURLOPT_HEADERFUNCTION => 'header_callback',
	// CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_0,
	// CURLOPT_RETURNTRANSFER => 1,
	// CURLOPT_BINARYTRANSFER => 1,
));

if (isset($username, $password)) {
	curl_setopt($curl, CURLOPT_USERPWD, "$username:$password");
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {	
	curl_setopt_array($curl, array(
		CURLOPT_POST => 1,
		CURLOPT_POSTFIELDS => $body
	));
}
$result = curl_exec($curl);
if($chunked){
	header("Content-Length: ". strlen($result) . "\r\n");
	// error_log("Content-Length: ". strlen($result) . "\r\n");
}

curl_close($curl);
// print $result;
?>