<?php
//Connect to DB
$servername = "localhost";
$username = "agroinve_usr";
$password = "passw0rd";
$dbname = "agroinve_dbt";


$personIP = $_SERVER['REMOTE_ADDR'];
$refererA = $_SERVER['HTTP_REFERER'];
$userAgent = $_SERVER['HTTP_USER_AGENT'];

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
$data = $_POST['sTpageOn'];
$data1 = $_POST['sTclickPos'];
$data2 = $_POST['sTmousePos'];
$data3 = $_POST['sTscrollPos'];
$data4 = $_POST['sTwaitTime'];
$data5 = $_POST['sTpageDim'];
$data6 = $_POST['sTactionList'];
$data7 = $_POST['sTswitchTimes'];
$data8 = $_POST['tehDate'];
$data9 = $_POST['tehLeave'];


$data = addslashes($data);
$data1 = addslashes($data1);
$data2 = addslashes($data2);
$data3 = addslashes($data3);
$data4 = addslashes($data4);
$data5 = addslashes($data5);
$data6 = addslashes($data6);
$data7 = addslashes($data7);
$data8 = addslashes($data8);
$data9 = addslashes($data9);
		echo "INSERT INTO `trackTable`(`pageOn`, `clickPos`, `mousePos`, `scrollPos`, `waitTime`, `pageDim`, `actionList`, `switchTimes`, `entryDate`, `leaveDate`, `aIP`, `aReferer`, `aToken`, `userAgent`) VALUES ('".$data."','".$data1."','".$data2."','".$data3."','".$data4."','".$data5."','".$data6."','".$data7."','".$data8."','".$data9."','".$personIP."','".$refererA."','','".$userAgent."')";
		//echo "time_elapsed_A: ".time_elapsed_A($data3-$data2)."\n";
		
$inserter = $conn->prepare("INSERT INTO `trackTable`(`pageOn`, `clickPos`, `mousePos`, `scrollPos`, `waitTime`, `pageDim`, `actionList`, `switchTimes`, `entryDate`, `leaveDate`, `aIP`, `aReferer`, `aToken`, `userAgent`) VALUES ('".$data."','".$data1."','".$data2."','".$data3."','".$data4."','".$data5."','".$data6."','".$data7."','".$data8."','".$data9."','".$personIP."','".$refererA."','','".$userAgent."')");

	$inserter->execute();
	
    }
catch(PDOException $e)
    {
		
    echo "Connection failed: " . $e->getMessage();
    }

	/*
	function time_elapsed_A($secs){
    $bit = array(
        'y' => $secs / 31556926 % 12,
        'w' => $secs / 604800 % 52,
        'd' => $secs / 86400 % 7,
        'h' => $secs / 3600 % 24,
        'm' => $secs / 60 % 60,
        's' => $secs % 60
        );
       
    foreach($bit as $k => $v)
        if($v > 0)$ret[] = $v . $k;
       
    return join(' ', $ret);
    }
	*/
	

?>