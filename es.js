       
var es={
    el : qs("#J_ca"),
    ael : qs("#J_ca dl"),
    ens : [],
    c_se : function(d){
        es.ael.appendChild(ce('dt', d.name));
        es.ael.appendChild(ce('dd', '<b id="J_'+ d.topic +'">&nbsp;</b><em>'+ d.unit +'</em>'));
    },
    ce : function(d){
        switch(d.type){
            case "sensor":
                es.c_se(d);
                break;
            default:
                es.uv(d);
        }
    },
    uv : function(d){
        for(i in d){
            if(qs("#J_"+i)){
                ih(qs("#J_"+i), d[i]);
            }
        }
    },
    ws : function(d){
        if(d.topic && es.ens.indexOf(d.topic) == -1){
            es.ce(d);
            es.ens.push(d.topic);
        } else {
            es.uv(d);
        }
    }
};
/*
        if(da.type && da.type == "sensors"){
            html = '<legend>Sensors Demo</legend>';
            html += '<dl class="bp gp-1">';
            for(i in da.data){
                html += '<dt>'+ da.data[i].name +'</dt><dd><b id="J_'+ da.data[i].topic +'">&nbsp;</b><em>'+ da.data[i].unit +'</em></dd>';
            }
            html += '</dl>';
            ih(qs("#J_ca"), html);
        }else{
            for(i in da){
                ih(qs("#J_"+i), da[i]);
            }
        }
        */
        /*
        if(da.type && da.type == "switchs"){
            html = '<legend>Multiple Switchs Demo</legend>';
            html += '<p class="bp gp-2" style="margin-top: 40px;">';
            for(i in da.data){
                html += '<a id="J_'+ da.data[i].topic +'" class="btn btn-w" href="#a=toggle&id='+ da.data[i].topic +'">'+ da.data[i].name +'</a>';
            }
            html += '</p>';
            ih(qs("#J_ca"), html);
        }else{
            for(i in da){
                if(da[i]){
                    //qs("#J_"+i).className = "btn";
                    co(qs("#J_"+i), "btn");
                }else{
                    //qs("#J_"+i).className = "btn btn-w";
                    co(qs("#J_"+i), "btn btn-w");
                }
            }
        }
        */