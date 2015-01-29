/**
 * 
 * Javascript Form Validation
 * Author: Tahmina Khatoon and Ahad Ahmed
 * This library has been developed as a part of SOL Project
 * @type validate-me_L4.validate-meAnonym$0|Function
 * 
 */
var validateMeModule = (function () {

    var formId = '';
    var fields = {};
    var formObj;
    var mode = 'dev'; // dev|prod

    var message = {
        'formNotExist': 'Form Does not exist, Validate Me can not validate you :(',
        'empty': 'This field can not be empty',
        'email': 'Invalid email address'
    };

    var indexOf = function (needle) {
        if (typeof Array.prototype.indexOf === 'function') {
            indexOf = Array.prototype.indexOf;
        } else {
            indexOf = function (needle) {
                var i = -1, index = -1;

                for (i = 0; i < this.length; i++) {
                    if (this[i] === needle) {
                        index = i;
                        break;
                    }
                }

                return index;
            };
        }
        return indexOf.call(this, needle);
    };

    var validate = {
        'nonempty': function (fieldValue) {
            var result = true;
            if (!fieldValue) {
                result = false;
            }
            return result;
        },
        'equelto': function (fieldValue, matchValue) {
            var result = true;
            if (fieldValue != matchValue) {
                result = false;
            }
            return result;
        },
        'email': function (fieldValue) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(fieldValue);
        },
        'regex': function (fieldValue, expression) {
            console.log(expression);
            var re = new RegExp('^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$');
            var result = re.test(fieldValue);
            console.log(result);
            return result;
        }
    };

    function _validationUnit(key, value, arg1) {
        var isValid = true;
        if (key === 'nonempty') {
            isValid = validate.nonempty(value);
        }
        if (key === 'equelto') {
            isValid = validate.equelto(value, arg1);
        }
        if (key === 'email') {
            isValid = validate.email(value);
        }
        if (key === 'regex') {
            isValid = validate.regex(value, arg1);
        }
        return isValid;
    }

    function _validateFields() {
        var validtionResult = [];
        if (fields) {
            for (var key in fields) {
                if (fields.hasOwnProperty(key)) {
                    var fieldValue = document.getElementById(key).value;
                    var type = (typeof fields[key]);
                    if (type === 'string') {
                        validtionResult.push(_validationUnit(fields[key], fieldValue));
                    }
                    if (type === 'object') {
                        for (var rule in fields[key]) {
//                            console.log(rule + ':' + fields[key][rule] + ':' + fieldValue);
                            validtionResult.push(_validationUnit(rule, fieldValue, fields[key][rule]));
                        }
                    }
                }
            }
        }
        if(indexOf.call(validtionResult, false) < 0){
            return true;
        }
        console.log(validtionResult);
        return false;
    }

    function _submit(e) {
        var isValid = _validateFields();
        if (!isValid) {
            alert("Please check your fields!");
            e.preventDefault();
            return false;
        }
        else {
            //you are good to go
            return true;
        }

        if (fields) {
            for (var key in fields) {
                if (fields.hasOwnProperty(key)) {
                    console.log(key + " -> " + fields[key]);
                }
            }
        }
    }


    function _createFormObj() {
        var formObj = document.getElementById(formId);
        if (typeof (formObj) == 'undefined' || formObj == null)
        {
            _shout(message.formNotExist);
        } else {
            if (formObj.addEventListener) {
                formObj.addEventListener("submit", _submit, false);  //Modern browsers
            } else if (formObj.attachEvent) {
                formObj.attachEvent('onsubmit', _submit);            //Old IE
            }
        }
    }


    function _shout(message) {
        alert(message);
    }

    function _log() {
        console.log(formId);
        if (fields) {
            for (var key in fields) {
                if (fields.hasOwnProperty(key)) {
                    console.log(key + " -> " + fields[key]);
                }
            }
        }
    }

    function publicInit(options) {
        if (typeof options === 'object') {
            formId = options.formId;
            fields = options.fields;
            mode = options.mode;
        }
        _createFormObj();
    }

    return {
        init: publicInit
    };

})();


