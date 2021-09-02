var xmlHttp = null; //

function createXmlHttpRequestObject()
{
    var xmlHttp
    xmlHttp=new XMLHttpRequest();
     
    if(!xmlHttp)
        alert("XMLHttpRequest 객체를 생성하는 중 오류가 발생했습니다.");
    else
        return xmlHttp;
}

function ajaxRequest(url,callback)
{
    var innerCallback = callback;
    if(!xmlHttp)
        xmlHttp=createXmlHttpRequestObject();
    if(xmlHttp && (xmlHttp.readyState==4 || xmlHttp.readyState==0))
    {
        xmlHttp.onreadystatechange = handleGettingResults;
        xmlHttp.open("GET",url,true);
        xmlHttp.send(null);
    }
    else
    {
        setTimeout("ajaxRequest(url,callback)",1000);
    }

    function handleGettingResults()
    {
        if(xmlHttp.readyState==4)
        {
            if(xmlHttp.status==200)
            {
                innerCallback(xmlHttp.responseText);
            }
            else
            {
                alert("서버에 접속할 수 없습니다.");
            }
        }
    }
}
