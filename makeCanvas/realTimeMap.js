var call_stack = 1;
var updateInterval = 1000;
var x1=0,y1=0;
var x2=0,y2=0;
var x3=0,y3=0;
var x4=0,y4=0;
var x5=0,y5=0;
var color="";

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
    drawLineTo_1(newCoords[0],newCoords[1],newCoords[2]);
    drawLineTo_2(newCoords[3],newCoords[4],newCoords[5]);
    drawLineTo_3(newCoords[6],newCoords[7],newCoords[8]);
    drawLineTo_4(newCoords[9],newCoords[10],newCoords[11]);
    drawLineTo_5(newCoords[12],newCoords[13],newCoords[14]);
    // 스택 증가
    if(newCoords[0]) call_stack++;
    // 반환값 확인
    div1.innerHTML += call_stack-1 +"번째 반복입니다. <br/>" 
    +"서버로부터 반환된 xy_1의 값은 X:" + newCoords[0] + " , Y: " + newCoords[1] + ", 선의 색상은: "+ newCoords[2]+ "<br/>"
    +"서버로부터 반환된 xy_2의 값은 X:" + newCoords[3] + " , Y: " + newCoords[4] + ", 선의 색상은: "+ newCoords[5]+ "<br/>"
    +"서버로부터 반환된 xy_3의 값은 X:" + newCoords[6] + " , Y: " + newCoords[7] + ", 선의 색상은: "+ newCoords[8]+ "<br/>"
    +"서버로부터 반환된 xy_4의 값은 X:" + newCoords[9] + " , Y: " + newCoords[10] + ", 선의 색상은: "+ newCoords[11]+ "<br/>"
    +"서버로부터 반환된 xy_5의 값은 X:" + newCoords[12] + " , Y: " + newCoords[13] + ", 선의 색상은: "+ newCoords[14]+ "<br/><br/>";
    // updateInterval 후 반복.
    setTimeout("updateChart()",updateInterval);
}

//선 그리는 함수
function drawLineTo_1(x,y,color)
{
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    if(x1==0) ctx.strokeStyle='white';
    else ctx.strokeStyle=color;
    if(x){
        ctx.moveTo(x1,y1);
        ctx.lineTo(x,y);
        ctx.lineWidth=2;
        ctx.stroke();
        ctx.closePath();
        x1=x;
        y1=y;
    }
    else{
        ctx.moveTo(x1,y1);
        ctx.lineTo(x1,y1);
        ctx.lineWidth=2;
        ctx.stroke();
        ctx.closePath();
    }
}

function drawLineTo_2(x,y,color)
{
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    if(x2==0) ctx.strokeStyle='white';
    else ctx.strokeStyle=color;
    if(x){
        ctx.moveTo(x2,y2);
        ctx.lineTo(x,y);
        ctx.lineWidth=2;
        ctx.stroke();
        ctx.closePath();
        x2=x;
        y2=y;
    }
    else{
        ctx.moveTo(x2,y2);
        ctx.lineTo(x2,y2);
        ctx.lineWidth=2;
        ctx.stroke();
        ctx.closePath();
    }
}

function drawLineTo_3(x,y,color)
{
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    if(x3==0) ctx.strokeStyle='white';
    else ctx.strokeStyle=color;
    if(x){
        ctx.moveTo(x3,y3);
        ctx.lineTo(x,y);
        ctx.lineWidth=2;
        ctx.stroke();
        ctx.closePath();
        x3=x;
        y3=y;
    }
    else{
        ctx.moveTo(x3,y3);
        ctx.lineTo(x3,y3);
        ctx.lineWidth=2;
        ctx.stroke();
        ctx.closePath();
    }
}

function drawLineTo_4(x,y,color)
{
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    if(x4==0) ctx.strokeStyle='white';
    else ctx.strokeStyle=color;
    if(x){
        ctx.moveTo(x4,y4);
        ctx.lineTo(x,y);
        ctx.lineWidth=2;
        ctx.stroke();
        ctx.closePath();
        x4=x;
        y4=y;
    }
    else{
        ctx.moveTo(x4,y4);
        ctx.lineTo(x4,y4);
        ctx.lineWidth=2;
        ctx.stroke();
        ctx.closePath();
    }
}

function drawLineTo_5(x,y,color)
{
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    if(x5==0) ctx.strokeStyle='white';
    else ctx.strokeStyle=color;
    if(x){
        ctx.moveTo(x5,y5);
        ctx.lineTo(x,y);
        ctx.lineWidth=2;
        ctx.stroke();
        ctx.closePath();
        x5=x;
        y5=y;
    }
    else {
        ctx.moveTo(x5,y5);
        ctx.lineTo(x5,y5);
        ctx.lineWidth=2;
        ctx.stroke();
        ctx.closePath();
    }
}