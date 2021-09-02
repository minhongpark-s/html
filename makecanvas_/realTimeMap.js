var call_stack = 1;
var updateInterval = 1000;
var x0=0,y0=0;

//그림판 초기화 함수
function init()
{
    call_stack=1;

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext("2d");
    ctx.beginPath();

    //반복적인 서버 요청 시작
    setTimeout("updateChart()", updateInterval);
}

function updateChart()
{
    // Query 문자열 생성
    param = "?call_stack="+call_stack;
    div1.innerHTML+="call_stack값 "+call_stack+"를 전송하려합니다. <br/>"
    //지원되는 AJAX 이용하여 요청을 보냄.
    if(window.getURL)
    {
        getURL("send_xy.php"+param,handleResults); // 서버에 요청을 보내고 응답오면 콜백할 함수 지정
    }
    else
    {
        ajaxRequest("send_xy.php"+param, handleResults);
    }
}

function handleResults(data)
{
    // 서버 응답을 읽는다.
    if(window.getURL){
        responseText = data.content;
    }
    else{
        responseText = data;
    }
    // 응답 확인
    div1.innerHTML+= "돌아온 값은: "+responseText+"<br/>";
    // 서버 응답을 나눈다.
    var newCoords = responseText.split(",");
    // 좌표를 노드에 그린다.
    drawLineTo(newCoords[0],newCoords[1]);
    // 스택 증가
    call_stack++;
    // 반환값 확인
    div1.innerHTML += call_stack +"번째 반복입니다. 서버로부터 반환된 값은 X:" + newCoords[0] + " , Y: " + newCoords[1] + ", 돌아온 콜스택 수는:"+ newCoords[2]+ "<br/><br/>";
    // updateInterval 후 반복.
    setTimeout("updateChart()",updateInterval);
}

//선 그리는 함수
function drawLineTo(x,y)
{
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext("2d");
    ctx.moveTo(x0,y0);
    ctx.lineTo(x,y);
    ctx.stroke();
    x0=x;
    y0=y;
}

