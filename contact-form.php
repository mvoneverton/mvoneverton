
<?php

$servername = "127.0.0.1";
$username = "root";
$password = "";
$db = "mvoneverton";

// Create connection
$dbconn = new PDO("mysql:host=$servername;dbname=$db", $username, $password);

// Check connection
if ($dbconn->connect_error) {
  die("Connection failed: " . $dbconn->connect_error);
} 

// Save input to the database
// if(isset($_POST[""]))
$nameval = $_POST["name1"];
$emailval = $_POST["&email"];
$phoneval = $_POST["&phone"];
$messageval = $_POST["&message"];
$sql = "INSERT INTO user (name, email, phone, message)
VALUES ('$nameval', '$emailval', '$phoneval', '$messageval')";


if ($dbconn->query($sql) == True) {
	echo "New record created successfully";
} else {
	echo "Error: " . $sql . "<br>" . $conn->error;
}

?>