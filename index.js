const validateRule = require("./validateRule.js");

const albionValidator=function(context){

    if(!context){
        context={};
    }

    var _rules={};

    this.verify=function(data,option){

        if(!option){
            option={};
        }

        var rules=_rules;

        if(context.rules){

            var ruleName="rules";
            if(option.ruleName){
                ruleName=option.ruleName;
            }
    
            rules=context[ruleName];            
        }

        if(option.rules){
            rules=option.rules;
        }

        var presetRule = new validateRule(data);

        var response=new validatorResponse();

        var colum=Object.keys(rules);

        for(var n=0;n<colum.length;n++){
            var field=colum[n];
            var r_=rules[field];

            var colum2=Object.keys(r_);
            for(var n2=0;n2<colum2.length;n2++){
                var ruleField=colum2[n2];
                var rr_=r_[ruleField];

                var rule=rr_.rule;
                if(typeof rule == "string"){
                    rule=[rule];
                }

                var message=rr_.message;
                if(!message){
                    message="index="+ruleField+", rule="+rule.toString();
                }

                var jugement=true;
                if(presetRule[rule[0]]){
                    jugement = presetRule[rule[0]](data[field],rule[1],rule[2],rule[3],rule[4]);
                }
                else if(context[rule[0]]){
                    jugement = context[rule[0]](data[field],rule[1],rule[2],rule[3],rule[4]);
                }

                if(!jugement){
                    
                    if(!response[field]){
                        response[field]=[];
                    }

                    if(!option.oneOutput){
                        response[field].push(message);    
                    }
                    else{
                        break;
                    }
                }
            }

            if(!jugement){
                if(option.oneOutput){
                    response[field].push(message);
                }    
            }
        }

        return response;
    };

    this.addRule=function(field, rule, message){
        var Length=0;
        if(_rules[field]){
            Length=Object.keys(_rules[field]).length;
        }
        return this.addRuleWithIndex(Length,field,rule,message);
    };

    this.addRuleWithIndex=function(indexName,field,rule,message){

        if(!_rules[field]){
            _rules[field]={};
        }

        var values={};
        values.rule=rule;
        if(message){
            values.message=message;
        }

        _rules[field][indexName]=values;

        return this;
    };

    this.deleteRule=function(field,index){

        if(index==undefined){
            delete _rules[field];
        }
        else{
            delete _rules[field][index];
        }

        return this;
    };

};
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

module.exports=albionValidator;