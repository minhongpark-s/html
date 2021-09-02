<?php
    // 연결 정보
    $db_host = 'localhost';
    $db_user = 'minhongpark';
    $db_pwd = '1234';
    $database = 'xy';
    $table = 'xy_1'; 

    // get 방식으로 넘겨온 값 읽음
    $call_stack = $_GET['call_stack'];
    // 데이터베이스와 연결
    $dbc = mysqli_connect($db_host, $db_user, $db_pwd, $database )
        or die("Can't connect to database");
    // Query 문자열 생성
    $query1 = "select count(*) from {$table}";
    $query2 = "select x,y from $table where num= $call_stack";
    // 데이터베이스에 Query 실행명령
    $result1 = mysqli_query($dbc,$query1)
        or die("Error querying database.");
    $result2 = mysqli_query($dbc,$query2)
        or die("Error querying database.");
    // 행 추출
    $row1=mysqli_fetch_array($result1);
    $count1 = $row1['count(*)'];
    $row2=mysqli_fetch_array($result2);
    // 반복문
    if($call_stack<=$count1){
        $return = $row2['x'].','.$row2['y'].','.$call_stack;
        // 입력창 제거
        if(ob_get_length()) ob_clean();
        // 캐시 제거
        header('Expires: Fri, 25 Dec 1980 00:00:00 GMT');
        header('Last-Modified: ' . gmdate('D,d M Y H:i:s'). 'GMT');
        header('Cache-Control: no-cache, must-revalidate');
        header('pragma: no-cache');
        // 클라이언트로 문자열 반환
        echo $return;
    }
    // 데이터베이스 연결 닫음
    mysqli_close($dbc);
?>