var validateMeModule = (function () {

    var formId = '';
    var fields = {};
    var formObj;
    
    var message = {
        'formNotExist': 'Form Does not exist, Validate Me can not validate you :('
    };
    
    function _shout(message){
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

    function _createFormObj() {
        var formObj = document.getElementById(formId);
        if (typeof (formObj) != 'undefined' && formObj != null)
        {
            // Form Exist
        }else{
            _shout(message.formNotExist);
        }
    }


    function publicInit(options) {
        if (typeof options === 'object') {
            formId = options.formId;
            fields = options.fields;
        }
        _createFormObj();
        _log();
    }

    return {
        init: publicInit
    };

})();


