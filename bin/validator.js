/**
 * ==================================================
 * 
 * ALBION_VALIDATOR Ver 1.0.0
 * 
 * validator.js (albionValidator)
 * 
 * CopyLight: Nakajima-Satoru since 0201/04/16
 * 
 * ==================================================
 */

const ValidateRule = require("./rule.js");
const ValidatorResponse = require("./response.js");

const albionValidator=function(context){

    if(!context){
        context={};
    }

    var _rules={};

    /**
     * verify
     * @param {*} data 
     * @param {*} option 
     * @returns 
     */
    this.verify=function(data,option){

        if(context.beforeValidate){
            context.beforeValidate(data);
        }

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

        var validateRule = new ValidateRule(data);
        var response=new ValidatorResponse();

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
                if(validateRule[rule[0]]){
                    jugement = validateRule[rule[0]](data[field],rule[1],rule[2],rule[3],rule[4]);
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

    /**
     * addRule
     * @param {*} field 
     * @param {*} rule 
     * @param {*} message 
     * @returns 
     */
    this.addRule=function(field, rule, message){
        var Length=0;
        if(_rules[field]){
            Length=Object.keys(_rules[field]).length;
        }
        return this.addRuleWithIndex(Length,field,rule,message);
    };

    /**
     * addRuleWithIndex
     * @param {*} indexName 
     * @param {*} field 
     * @param {*} rule 
     * @param {*} message 
     * @returns 
     */
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

    /**
     * deleteRule
     * @param {*} field 
     * @param {*} index 
     * @returns 
     */
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
module.exports=albionValidator;