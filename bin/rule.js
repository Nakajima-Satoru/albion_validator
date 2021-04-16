/**
 * ==================================================
 * 
 * ALBION_VALIDATOR Ver 1.0.0
 * 
 * rule.js (ValidateRule)
 * 
 * CopyLight: Nakajima-Satoru since 0201/04/16
 * 
 * ==================================================
 */

const ValidateRule = function(_value){

	/**
	 * required
	 * @param {*} value 
	 * @returns 
	 */
	this.required = function(value){

		if(value){
			return true;
		}

		return false;
	};

	/**
	 * requiredIf
	 * @param {*} value 
	 * @param {*} arg1 
	 * @param {*} arg2 
	 * @returns 
	 */
	this.requiredIf = function(value,arg1,arg2){

		if(this._value[arg1]){
			if(this._value[arg1]==arg2){
				if(value){
					return true;
				}
				return false;
			}
		}

		return true;

	};

	/**
	 * requiredWith
	 * @param {*} value 
	 * @param {*} arg1 
	 * @param {*} arg2 
	 * @returns 
	 */
	this.requiredWith = function(value,arg1,arg2){

		if(typeof arg1=="string"){
			arg1=[arg1];
		}

		for(var n=0;n<arg1.length;n++){
			var a_=arg1[n];
			if(!this._value[a_]){
				return true;
			}
		}

		if(value){
			return true;
		}

		return false;
	};

	/**
	 * requiredWithOr
	 * @param {*} value 
	 * @param {*} arg1 
	 * @param {*} arg2 
	 * @returns 
	 */
	this.requiredWithOr = function(value,arg1,arg2){

		if(typeof arg1=="string"){
			arg1=[arg1];
		}

		var juge=false;
		for(var n=0;n<arg1.length;n++){
			var a_=arg1[n];
			if(this._value[a_]){
				juge=true;
			}
		}

		if(!juge){
			return true;
		}

		if(value){
			return true;
		}

		return false;
	};

	/**
	 * confirmed
	 * @param {*} value 
	 * @param {*} arg1 
	 * @returns 
	 */
	this.confirmed = function(value,arg1){

		if(!value){
			return true;
		}

		if(this._value[arg1]==value){
			return true;
		}

		return false;

	};

	/**
	 * alphaNumeric
	 * @param {*} value 
	 * @param {*} arg1 
	 * @returns 
	 */
	this.alphaNumeric = function(value,arg1){
		
		if(!value){
			return true;
		}

		if(arg1){
			for(var n=0;n<arg1.length;n++){
				value=value.split(arg1[n]).join("");
			}	
		}

		var reg="^[a-zA-Z0-9]+$";

		if(jsf3.validateRule.regex(value,reg)){
			return true;
		}

		return false;
	};

	/**
	 * numeric
	 * @param {*} value 
	 * @param {*} arg1 
	 * @returns 
	 */
	this.numeric = function(value,arg1){
		
		if(!value){
			return true;
		}

		if(arg1){
			for(var n=0;n<arg1.length;n++){
				value=value.split(arg1[n]).join("");
			}
		}
		
		var reg="^[0-9]+$";

		if(jsf3.validateRule.regex(value,reg)){
			return true;
		}

		return false;
	};

	/**
	 * length
	 * @param {*} value 
	 * @param {*} arg1 
	 * @returns 
	 */
	this.length = function(value,arg1){

		if(!value){
			return true;
		}

		if(value.length==arg1){
			return true;
		}

		return false;
	};

	/**
	 * minLength
	 * @param {*} value 
	 * @param {*} arg1 
	 * @returns 
	 */
	this.minLength = function(value,arg1){

		if(!value){
			return true;
		}

		if(value.length>=arg1){
			return true;
		}
		return false;
	};

	/**
	 * maxLength
	 * @param {*} value 
	 * @param {*} arg1 
	 * @returns 
	 */
	this.maxLength = function(value,arg1){

		if(!value){
			return true;
		}

		if(value.length<=arg1){
			return true;
		}

		return false;
	};

	/**
	 * betweenLength
	 * @param {*} value 
	 * @param {*} arg1 
	 * @param {*} arg2 
	 * @returns 
	 */
	this.betweenLength = function(value,arg1,arg2){

		if(!value){
			return true;
		}

		if(value.length>=arg1 && value.length<=arg2){
			return true;
		}

		return false;

	};

	/**
	 * value
	 * @param {*} value 
	 * @param {*} arg1 
	 * @returns 
	 */
	this.value = function(value,arg1){

		if(!value){
			return true;
		}

		if(value==arg1){
			return true;
		}

		return false;

	};

	/**
	 * minValue
	 * @param {*} value 
	 * @param {*} arg1 
	 * @returns 
	 */
    this.minValue = function(value,arg1){

		if(!value){
			return true;
		}

		if(value>=arg1){
			return true;
		}

		return false;
	};

	/**
	 * maxValue
	 * @param {*} value 
	 * @param {*} arg1 
	 * @returns 
	 */
	this.maxValue = function(value,arg1){

		if(!value){
			return true;
		}

		if(value<=arg1){
			return true;
		}
	
		return false;
	};

	/**
	 * betweenValue
	 * @param {*} value 
	 * @param {*} arg1 
	 * @param {*} arg2 
	 * @returns 
	 */
	this.betweenValue = function(value,arg1,arg2){

		if(!value){
			return true;
		}

		if(parseInt(value)>=parseInt(arg1) && parseInt(value)<=parseInt(arg2)){
			return true;
		}
		
		return false;	
	};

	/**
	 * selectedCount
	 * @param {*} value 
	 * @param {*} arg1 
	 * @returns 
	 */
	this.selectedCount = function(value,arg1){

		if(!value){
			return true;
		}

		if(value.length==arg1){
			return true;
		}

		return false;
	};

	/**
	 * minSelectedCount
	 * @param {*} value 
	 * @param {*} arg1 
	 * @returns 
	 */
	this.minSelectedCount = function(value,arg1){

		if(!value){
			return true;
		}

		if(value.length>=arg1){
			return true;
		}

		return false;
	};

	/**
	 * maxSelectedCount
	 * @param {*} value 
	 * @param {*} arg1 
	 * @returns 
	 */
	this.maxSelectedCount = function(value,arg1){

		if(!value){
			return true;
		}

		if(value.length<=arg1){
			return true;
		}

		return false;
	};

	/**
	 * betweenSelectedCount
	 * @param {*} value 
	 * @param {*} arg1 
	 * @param {*} arg2 
	 * @returns 
	 */
	this.betweenSelectedCount = function(value,arg1,arg2){

		if(!value){
			return true;
		}

		if(value.length>=arg1 && value.length<=arg2){
			return true;
		}

		return false;
	};

	/**
	 * like
	 * @param {*} value 
	 * @param {*} arg1 
	 * @returns 
	 */
	this.like = function(value,arg1){

		if(!value){
			return true;
		}
	
		if(value.indexOf(arg1)>-1){
			return true;
		}

		return false;	
	};

	/**
	 * any
	 * @param {*} value 
	 * @param {*} arg1 
	 * @returns 
	 */
	this.any = function(value,arg1){

		if(!value){
			return true;
		}

		if(typeof value == "string"){
			value=[value];
		}

		if(typeof arg1 == "string"){
			arg1=[arg1];
		}

		var arg1Length=arg1.length;
		var juges=false;
		for(var n=0;n<arg1Length;n++){
			var valueLength=value.length;
			for(var n2=0;n2<valueLength;n2++){
				if(arg1[n]==value[n2]){
					juges=true;
					break;
				}
			}
		}

		return juges;

	};

	/**
	 * date
	 * @param {*} value 
	 * @returns 
	 */
	this.date = function(value){

		if(!value){
			return true;
		}

		var tims=new Date(value);
		var juges=parseInt(tims.getTime());

		if(juges>0){
			return true;
		}

		return false;
	};

	/**
	 * minDate
	 * @param {*} value 
	 * @param {*} arg1 
	 * @returns 
	 */
	this.minDate = function(value,arg1){

		if(!value){
			return true;
		}

		var tims=new Date(value);
		var target_date=parseInt(tims.getTime());

		var tims2=new Date(arg1);
		var mindate=parseInt(tims2.getTime());

		if(target_date>=mindate){
			return true;
		}

		return false;
	};

	/**
	 * maxDate
	 * @param {*} value 
	 * @param {*} arg1 
	 * @returns 
	 */
	this.maxDate = function(value,arg1){

		if(!value){
			return true;
		}

		var tims=new Date(value);
		var target_date=parseInt(tims.getTime());

		var tims2=new Date(arg1);
		var mindate=parseInt(tims2.getTime());

		if(target_date<=mindate){
			return true;
		}

		return false;
	};

	/**
	 * betweenDate
	 * @param {*} value 
	 * @param {*} arg1 
	 * @param {*} arg2 
	 * @returns 
	 */
	this.betweenDate = function(value,arg1,arg2){

		if(!value){
			return true;
		}

		var tims=new Date(value);
		var target_date=parseInt(tims.getTime());

		var tims2=new Date(arg1);
		var mindate=parseInt(tims2.getTime());

		var tims3=new Date(arg2);
		var mindate2=parseInt(tims3.getTime());

		if(target_date>=mindate && target_date<=mindate2){
			return true;
		}

		return false;
	};

	/**
	 * isInt
	 * @param {*} value 
	 * @returns 
	 */
	this.isInt = function(value){

		if(!value){
			return true;
		}

		if(value[0]==0){
			return false;
		}

		if(!isNaN(value)){
			return true;
		}

		return false;
	};

	/**
	 * isBool
	 * @param {*} value 
	 * @returns 
	 */
	this.isBool = function(value){

		if(!value){
			return true;
		}

		if(value==0 || value==1){
			return true;
		}

		return false;
	};

	/**
	 * isEmail
	 * @param {*} value 
	 * @returns 
	 */
	this.isEmail = function(value){

		if(!value){
			return true;
		}

		if(value.match(/^[0-9a-z_./?-]+@([0-9a-z_./?-]+\.)+[0-9a-z-]+$/)){
			return true;
		}

		return false;
	};

	/**
	 * isTel
	 * @param {*} value 
	 * @returns 
	 */
	this.isTel = function(value){

		if(!value){
			return true;
		}

		if(value.match(/^[0-9]{2,4}-[0-9]{2,4}-[0-9]{3,4}$/)){
			return true;
		}

		if(value.match(/^[0-9]{1,15}$/)){
			return true;
		}

		return false;
	};

	/**
	 * isIp
	 * @param {*} value 
	 * @returns 
	 */
	this.isIp = function(value){

		if(!value){
			return true;
		}

		if(value.match(/(([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])/)){
			return true;
		}

		return false;
	};

	/**
	 * isUrl
	 * @param {*} value 
	 * @returns 
	 */
	this.isUrl = function(value){

		if(!value){
			return true;
		}

		if(value.match(/^(http|https|ftp):\/\/([A-Z0-9][A-Z0-9_-]*(?:\.[A-Z0-9][A-Z0-9_-]*)+):?(\d+)?\/?/i)){
			return true;
		}

		return false;	
	};

	/**
	 * regex
	 * @param {*} value 
	 * @param {*} arg1 
	 * @returns 
	 */
	this.regex = function(value,arg1){

		if(!value){
			return true;
		}

		if(arg1.substring(arg1.length-2)=="/i"){
			arg1=arg1.substring(0,(arg1.length-2));
		}
		if(arg1[0]=="/"){
			arg1=arg1.substring(1);
		}

		regExp=new RegExp(arg1,"i");
		if(value.match(regExp)){
			return true;
		}

		return false;	
	};

	/**
	 * isZipJP
	 * @param {*} value 
	 * @param {*} arg1 
	 * @param {*} arg2 
	 * @returns 
	 */
	this.isZipJP = function(value,arg1,arg2){

		if(!value){
			return true;
		}

		if(value.match(/^([0-9]{3}-[0-9]{4})?$|^[0-9]{7}$/)){
			return true;
		}

		return false;
	};

	/**
	 * isKatakana
	 * @param {*} value 
	 * @param {*} arg1 
	 * @param {*} arg2 
	 * @returns 
	 */
	this.isKatakana = function(value,arg1,arg2){

		if(!value){
			return true;
		}

		if(arg1){
			for(var n=0;n<arg1.length;n++){
				value=value.split(arg1[n]).join("");
			}	
		}

		if(value.match(/^[ァ-ヶー]+$/u)){
			return true;
		}

		return false;
	};

	/**
	 * isHiragana
	 * @param {*} value 
	 * @param {*} arg1 
	 * @param {*} arg2 
	 * @returns 
	 */
	this.isHiragana = function(value,arg1,arg2){

		if(!value){
			return true;
		}

		if(arg1){
			for(var n=0;n<arg1.length;n++){
				value=value.split(arg1[n]).join("");
			}
		}

		if(value.match(/^[ぁ-ん]+$/u)){
			return true;
		}

		return false;
	};

	/**
	 * allowedBeforeToday
	 * @param {*} value 
	 * @returns 
	 */
	this.allowedBeforeToday = function(value){

		if(!value){
			return true;
		}

		var toDay=new Date();
		var jugeToday=parseInt(toDay.getTime());
		var tims=new Date(value);
		var juges=parseInt(tims.getTime());

		if(juges <= jugeToday){
			return true;
		}

		return false;
	};

	/**
	 * allowedAfterToday
	 * @param {*} value 
	 * @returns 
	 */
	this.allowedAfterToday = function(value){

		if(!value){
			return true;
		}

		var toDay=new Date();
		var jugeToday=parseInt(toDay.getTime());
		var tims=new Date(value);
		var juges=parseInt(tims.getTime());

		if(juges >= jugeToday){
			return true;
		}

		return false;
	};

};
module.exports = ValidateRule;