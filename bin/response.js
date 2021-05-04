/**
 * ==================================================
 * 
 * FW_DAGGER_VALIDATOR Ver 1.0.0
 * 
 * response.js (validatorResponse)
 * 
 * CopyLight: Nakajima-Satoru since 0201/04/16
 * 
 * ==================================================
 */

const validatorResponse = function(){

    /**
     * set
     * @param {*} field 
     * @param {*} value 
     */
    this.set=function(field,value){

        if(!this[field]){
            this[field]=[];
        }
        this[field].push(value);

    }

    /**
     * get
     * @param {*} field 
     * @returns 
     */
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