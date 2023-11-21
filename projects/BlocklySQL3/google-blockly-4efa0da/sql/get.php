<?php
header('Access-Control-Allow-Origin: *');

$db_link = mysqli_connect("127.0.0.1:3307", "root", "");
mysqli_set_charset($db_link, "utf8");

$db_sel = mysqli_select_db($db_link, $_POST["database"]) or die(mysqli_error($db_link));

$sql = preg_replace('/\\\\/iU', "", $_POST["code"]);

$sql = str_replace('lessThanEquals', '<=', $sql);
$sql = str_replace('lessThan', '<', $sql);

if (preg_match('/(DROP)|(DELETE)|(INSERT)|(ALTER)|(PASSWORD)|(UPDATE)|(SHOW)/iU', $sql)) {

  echo('<h1><font color=red>Moeglich sind nur SELECT-Anfragen.</font></h1>
       SQL-Anweisungen, die die Datenbank veraendern, sind nicht erlaubt.');
	}
else {
  $db_erg = mysqli_query($db_link, $sql);
	if (!$db_erg) {
	   echo('<br><br><font color=red>Ungültige Abfrage:</font> '.mysqli_error($db_link));
	}
  else {

		$ErgebnisArray = array_keys(mysqli_fetch_array($db_erg, MYSQLI_ASSOC));
		$db_erg = mysqli_query($db_link, $sql);

		echo '<br><br><table border="1">';

		foreach ($ErgebnisArray as $attribut) {
		    echo '<th>'.$attribut.'</th>';
		}

		while ($zeile = mysqli_fetch_array($db_erg, MYSQLI_ASSOC)) {
		    echo "<tr>";

        for($i=0; $i<count($ErgebnisArray); $i++) {
				      echo "<td>".$zeile[$ErgebnisArray[$i]]."</td>";
				}

        echo "</tr>";
		}

    echo "</table>";
		}
}
?>
