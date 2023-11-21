<?php
header('Access-Control-Allow-Origin: *');

$db = strval($_POST["dbname"]);
$con = mysqli_connect('127.0.0.1:3307','root','',$db);
if (!$con) {
    die('Could not connect: ' . mysqli_error($con));
}

function get_tables()
{
	$sql = "SHOW TABLES;";
	$result = mysqli_query($GLOBALS["con"], $sql);
	$array = array();
	if (($result)||(mysqli_errno($GLOBALS["con"]) == 0))
	{
	  if (mysqli_num_rows($result)>0)
	  {
		while ($rows = mysqli_fetch_array($result,MYSQLI_ASSOC))
		{
		  $i = 0;
		  foreach ($rows as $data)
		  {
			array_push($array,$data);
			$i++;
		  }
		}
		$json_encoded = json_encode($array);
		return $json_encoded;
	  }else{
		return json_encode("NO RESULTS FOUND");
	  }
	}else{
	  echo "Error in running query :". mysqli_error($GLOBALS["con"]);
	}
}

function get_columns($tableName)
{
	$sql = "SHOW COLUMNS FROM ".$tableName.";";
	$result = mysqli_query($GLOBALS["con"], $sql);
	$array = array();
	if (($result)||(mysqli_errno($GLOBALS["con"]) == 0))
	{
	  if (mysqli_num_rows($result)>0)
	  {
		while ($rows = mysqli_fetch_array($result,MYSQLI_ASSOC))
		{
			array_push($array,$rows["Field"]);
		}
		$json_encoded = json_encode($array);
		return $json_encoded;
	  }else{
		return json_encode("NO RESULTS FOUND");
	  }
	}else{
	  echo "Error in running query :". mysqli_error($GLOBALS["con"]);
	}
}

$colName = strval($_POST["func"]);

if ($colName != 'tables'){
	echo(get_columns($colName));
}
else if ($colName == 'tables'){
	echo(get_tables());
	}

?>
