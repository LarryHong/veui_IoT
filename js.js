//获取节点
function qs(i){
    return document.querySelector(i)
};
//获取所有节点
function qsa(i){
    return document.querySelectorAll(i)
};
//写入HTML
function ih(n,h){
    n.innerHTML=h
};
//插入HTML
function ah(n,h){
    e=document.createElement("div")
    ih(e,h)
    console.log(e.childNodes, n)
    e.childNodes[0].appendChild(n)
    document.removeChild(e)
}
//创建节点
function ce(t,c,e){
    e=document.createElement(t)
    e.innerHTML=c
    return e
}
//写入ClassName
function co(n,c){
    n.className=c
}
//写入Value
function val(n,h){
    n.value=h
};
//事件监听
function ael(n,t,f){
    n.addEventListener(t,f)
};
//Ajax
function aj(u,f,e){
    var x=new XMLHttpRequest();
    x.onreadystatechange=function(){
        if(this.readyState==4){
            if(this.status==200){
                if(f){
                    f(JSON.parse(x.responseText))
                }
            }else{
                if(e){
                    e()
                }
            }
        }
    };
    x.open('GET',u,true);x.send()
};
//WebSocket
var ws,wst,wsu,wsf;
function wsa(u,f){
    wsu=u;
    wsf=f;
    wsc()
};
function wsc(){
    ws=new WebSocket(wsu);
    wsi()
}
function wsi(){
    ws.onopen=function(e){
      ws.send('OPEN')
    };
    ws.onclose=function(e){
      clearInterval(wst)
      wsc()
    }
    // ws.onerror=function(v){
    //   console.log(v)
    //   clearInterval(wst)
    // }
    ws.onmessage=function(e){
      console.log(e.data);
      if(e.data != "PONG"){
        wsf(eval("("+ e.data +")"));
      }
    }
    //心跳 30s
    wst = setInterval(function(){
        ws.send('PING')
    }, 30000);
}
//自动弹出confirm
function cfm(n){
    n = n || qs('.J-cf');
    ael(n, 'click', function(e){
        e.preventDefault();
        if(confirm(this.getAttribute("data-tips"))){
            location=this.href
        }
    });
}
//自动发送请求
function ag(n,b){
    n.addEventListener('click',function(e,m,u){
        m=e.target;
        if(m.tagName=='A'||m.parentElement.tagName=='A'){
            e.preventDefault();
            u=m.href||m.parentElement.href;
            if(!b){
                aj(u)
            }else{
                aj(b+u.split('#')[1])
            }
        }
    })
}
function h2r(h,s,v,r,g,b,p,q,t,f,i){
    v=1;
    s/=100;
    i=parseInt((h/60)%6);
    f=h/60-i;
    p=1-s;
    q=1-f*s;t=1-(1-f)*s;
    switch(i){
        case 0:
            r=v;
            g=t;
            b=p;
            break;
        case 1:
            r=q;
            g=v;
            b=p;
            break;
        case 2:
            r=p;
            g=v;
            b=t;
            break;
        case 3:
            r=p;
            g=q;
            b=v;
            break;
        case 4:
            r=t;
            g=p;
            b=v;
            break;
        case 5:
            r=v;
            g=p;
            b=q;
            break;
    }
    return [parseInt(r*255),parseInt(g*255),parseInt(b*255)];
};
function co(n){
    n.addEventListener('click',function(e,h,w){
        h=n.offsetHeight;
        w=n.offsetWidth;
        console.log(h2r(e.offsetX/w*360, e.offsetY/h*100))
    });
}
