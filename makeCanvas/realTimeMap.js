console.log("realTimeMap.js called!");
var call_stack;
var updateInterval = 1000;
var x1=0,y1=0;
var x2=0,y2=0;
var x3=0,y3=0;
var x4=0,y4=0;
var x5=0,y5=0;
var color="";
var start_bin=0;
var check_count=0;


var start_cnt=1;
console.log("called!");

function start()
{
    start_bin=1;
    console.log("start() called");
    console.log("start_bin:"+start_bin);
}

function reset()
{
    console.log("test called");
    var resetNum= document.getElementById("resetNum");
    console.log(resetNum);
    param = "?resetNum="+resetNum;
    div1.innerHTML+="resetNum값 "+resetNum+" 를 전송하려합니다. <br/>"
    //지원되는 AJAX 이용하여 요청을 보냄.
    if(window.getURL)
    {
        getURL("clear_data.php"+param,handleResults_forReset); // 서버에 요청을 보내고 응답오면 콜백할 함수 지정
    }
    else
    {
        ajaxRequest("clear_data.php"+param, handleResults_forReset);
    }
}

//그림판 초기화 함수
function init()
{
    if(start_cnt){
        call_stack=1;

        xDivSize=40;
        yDivSize=40;

        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext("2d");
        xCut=canvas.width/xDivSize;
        yCut=canvas.height/yDivSize;
        for(var i=1; i<xCut; i++){
            ctx.beginPath();
            ctx.strokeStyle='gray';
            ctx.lineWidth='1';
            ctx.moveTo(xDivSize*i,0)
            ctx.lineTo(xDivSize*i,canvas.height);
            ctx.setLineDash([5]);
            ctx.stroke();
            ctx.closePath();
        }
        for(var i=1; i<yCut; i++){
            ctx.beginPath();
            ctx.strokeStyle='gray';
            ctx.lineWidth='1';
            ctx.moveTo(0,yDivSize*i)
            ctx.lineTo(canvas.width,yDivSize*i);
            ctx.setLineDash([5]);
            ctx.stroke();
            ctx.closePath();
        }
        for(var i=1; i<=xCut; i++){
            ctx.font = "15px Arial";
            ctx.strokeStyle='black';
            ctx.fillText(xDivSize*i,xDivSize*i-17,13);
            ctx.strokeText(xDivSize*i,xDivSize*i-17,13);
        }
        for(var i=1; i<=yCut; i++){
            ctx.strokeStyle='black';
            ctx.fillText(xDivSize*i,0,yDivSize*i);
            ctx.strokeText(xDivSize*i,0,yDivSize*i);
        }
        ctx.lineWidth='2';
        ctx.fillText('0',3,10);
        ctx.strokeText('0',3,10);
        ctx.setLineDash([0]); // 점선 간격 제거
        console.log("board init finished");
    }
    console.log("start_cnt:"+start_cnt);
    console.log("start_bin:"+start_bin);
    //반복적인 서버 요청 시작
    if(start_bin){
        setTimeout("updateChart()", updateInterval);
        console.log("Trying to start updateChart()")
    }
    else{
        start_cnt=0;
        setTimeout(init, updateInterval*5);
        console.log("Trying to recall init()")
    }
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
    div1.innerHTML += "서버로부터 돌아온 값은"+responseText+" 입니다.<br/>";
    // 서버 응답을 나눈다.
    var newCoords = responseText.split(",");
    // 좌표를 노드에 그린다.

    check_count=0;
    for(var i=0; i<15; i++)
    {
        if(newCoords[i]!='noData')
            check_count++;
    }
    console.log("check_count: "+check_count);

    if(check_count==15){
        drawLineTo_1(newCoords[0],newCoords[1],newCoords[2]);
        drawLineTo_2(newCoords[3],newCoords[4],newCoords[5]);
        drawLineTo_3(newCoords[6],newCoords[7],newCoords[8]);
        drawLineTo_4(newCoords[9],newCoords[10],newCoords[11]);
        drawLineTo_5(newCoords[12],newCoords[13],newCoords[14]);
        call_stack++;
        for(var j=0;j<5;j++){
            div1.innerHTML += "서버로부터 반환된 xy_"+(j+1)+"의 값은 X: "+newCoords[3*j]+", Y: "+newCoords[3*j+1]+", 선의 색상은: "+newCoords[3*j+2]+"<br/>";
        }
    }
    else{
        div1.innerHTML += "서버로부터 적절한 응답을 기다리는 중입니다...<br/>"
    }

    // 스택 증가
    //if(newCoords[0]) call_stack++;
    // 반환값 확인
    div1.innerHTML += (call_stack-1) +"번째 반복입니다. <br/><br/>";

    // updateInterval 후 반복.
    setTimeout("updateChart()",updateInterval);
}

function handleResults_forReset(data)
{
    // 서버 응답을 읽는다.
    if(window.getURL){
        responseText = data.content;
    }
    else{
        responseText = data;
    }
    // 응답 확인
    div1.innerHTML+= "<br>좌표값이 초기화 되었습니다.<br/>";
}

//선 그리는 함수
function drawLineTo_1(x,y,color)
{
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    if(x1==0){ 
        ctx.strokeStyle='white';
        ctx.globalAlpha = 0;
    }
    else{
        ctx.strokeStyle=color;
        ctx.globalAlpha =1;
    }
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
    if(x2==0){ 
        ctx.strokeStyle='white';
        ctx.globalAlpha = 0;
    }
    else{
        ctx.strokeStyle=color;
        ctx.globalAlpha =1;
    }
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
    if(x3==0){ 
        ctx.strokeStyle='white';
        ctx.globalAlpha = 0;
    }
    else{
        ctx.strokeStyle=color;
        ctx.globalAlpha =1;
    }
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
    if(x4==0){ 
        ctx.strokeStyle='white';
        ctx.globalAlpha = 0;
    }
    else{
        ctx.strokeStyle=color;
        ctx.globalAlpha =1;
    }
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
    if(x5==0){ 
        ctx.strokeStyle='white';
        ctx.globalAlpha = 0;
    }
    else{
        ctx.strokeStyle=color;
        ctx.globalAlpha =1;
    }
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