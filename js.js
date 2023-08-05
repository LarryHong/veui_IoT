
function qs(i){
    return document.querySelector(i)
};
function qsa(i){
    return document.querySelectorAll(i)
};
function ih(n,h){
    n.innerHTML=h
};
function val(n,h){
    n.value=h
};
function ael(n,t,f){
    n.addEventListener(t,f)
};
function cfm(){
    qs('.J-cf').onclick=function(e){
        e.preventDefault();
        if(confirm(this.getAttribute("data-tips"))){
            location=this.href
        }
    }
}
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
var ws;
function sw(){
    ws=new WebSocket('ws://'+location.hostname+':81/',['arduino']);
    ws.onmessage=function(e){
        var v=e.data.split(':');
        if(wd_fns[v[0]]){
            wd_fns[v[0]](v[1])
        }
    }
};
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