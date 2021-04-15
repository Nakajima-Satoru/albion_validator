const validatorResponse = function(){

    this.set=function(field,value){

        if(!this[field]){
            this[field]=[];
        }
        this[field].push(value);

    }

    this.get=function(field){

        var str="";

        if(field){
            if(!this[field]){
                return;
            }

            for(var n=0;n<this[field].length;n++){
                str+=this[field][n]+"\n";
            }
        }
        else{
            var colum=Object.keys(this);
            for(var n=0;n<colum.length;n++){
                var f_=colum[n];
                if(f_!="get" && f_!="set"){                   
                    var strb=this.get(f_);
                    if(strb){
                        str+=strb;
                    }
                }
            }

        }

        if(str){
            return str;
        }
        else{
            return null;
        }
    };

};
module.exports=validatorResponse;