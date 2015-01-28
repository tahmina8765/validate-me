var validateMeModule = (function () {

    var formId = '';
    var fields = {};
    var formObj;

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
            alert('Form Does not exist');
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


