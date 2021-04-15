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
                    jugement = presetRule[rule[0]](rule[1],rule[2],rule[3],rule[4]);
                }
                else if(context[rule[0]]){
                    jugement = context[rule[0]](rule[1],rule[2],rule[3],rule[4]);
                }

                if(!jugement){
                    if(!option.oneOutput){
                        if(!response[field]){
                            response[field]=[];
                        }
                        response[field].push(message);    
                    }
                    else{
                        break;
                    }
                }
            }

            if(!jugement){
                if(option.oneOutput){
                    response[field]=message;
                }    
            }
        }

        if(Object.keys(response).length){
            return response;
        }
        else{
            return null;
        }
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
const validatorResponse = function(){};

module.exports=albionValidator;