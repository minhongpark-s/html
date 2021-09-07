<?php

    $resetNum = $_GET['resetNum'];
    if($resetNum){
        echo "<h3>getted</h3>";
    }
    else
    {
        echo "<h3>ungetted</h3>";
    }
    function clear_data($resetNum)
    {
        $db_host = 'localhost';
        $db_user = 'minhongpark';
        $db_pwd = '1234';
        $database = 'xy';
        $string = "";

        $dbc = mysqli_connect($db_host, $db_user, $db_pwd, $database )
            or die("Can't connect to database");
        echo "<h1>connect good</h1>";
        $query="delete from xy_".$resetNum;
        echo "<h1>$query</h1>";
        $result = mysqli_query($dbc,$query)
            or die("Error querying database.");

        mysqli_close($dbc);
    }

    clear_data($resetNum);

    if($resetNum==2){
        echo "<h3>checked1</h3>";
        echo "<h3>checked</h3>";
    }


    echo "<h1>clear_data finished.</h1>";
    require_once("index_input.html");
?>