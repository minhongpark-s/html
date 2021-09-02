<?php
    // 연결 정보
    $db_host = 'localhost';
    $db_user = 'minhongpark';
    $db_pwd = '1234';
    $database = 'xy';
    $table = 'xy_1'; 

    $call_stack = $_GET['call_stack'];
    $dbc = mysqli_connect($db_host, $db_user, $db_pwd, $database )
        or die("Can't connect to database");
    $query1 = "select count(*) from {$table}";
    $query2 = "select x,y from $table where num= $call_stack";
    $result1 = mysqli_query($dbc,$query1)
        or die("Error querying database.");
    $result2 = mysqli_query($dbc,$query2)
        or die("Error querying database.");
    $row1=mysqli_fetch_array($result1);
    $count1 = $row1['count(*)'];
    $row2=mysqli_fetch_array($result2);
    if($call_stack<=$count1){
        $return = $row2['x'].','.$row2['y'].','.$call_stack;
        if(ob_get_length()) ob_clean();
        header('Expires: Fri, 25 Dec 1980 00:00:00 GMT');
        header('Last-Modified: ' . gmdate('D,d M Y H:i:s'). 'GMT');
        header('Cache-Control: no-cache, must-revalidate');
        header('pragma: no-cache');
        echo $return;
    }
    mysqli_close($dbc);
?>