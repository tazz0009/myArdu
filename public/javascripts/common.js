$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    console.log(a);
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};  


    /*
 * ajax 호출
 * param	:	strServiceId - callback service id
 * 				strUrl	-	service URL
 * 				strCallBack	-	callback 함수(String or Function)
 * 				jsonParam	-	param(Json 타입)
 * 				objGrd	-	ajax호출 grid object
 * 				bAsync	-	async 여부(default : true)
 * return	:	
 * ex)
 * 	var strCallBack	=	"fn_callBack";
    var strUrl	=	"/signIn";
    var strServiceId	=	"FIND";
    var jsonParam	=	{
                                savesmlCd	:	$('#savesmlCd').val()
                            ,	loctCd		:	$('#loctCd').val()
                        };
    //조회
    fn_cmmAjax( strServiceId, strUrl, strCallBack, jsonParam);
 */
window.fn_cmmAjax = function (strServiceId, strUrl, strCallBack, jsonParam, bAsync) {
    if (bAsync == null) {
        bAsync = true;
    }
    
    console.log(jsonParam);

    var ajaxOption = {
        url: strUrl,
        data: jsonParam,
        type: "POST",
        dataType: 'json',
        async: bAsync,
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            if (data == null || data.exceptionModel) {
                fn_cmmCallBack(strServiceId, strCallBack, "exception", data, null, "exception");
                return;
            }

            fn_cmmCallBack(strServiceId, strCallBack, textStatus, data, jqXHR, null);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            fn_cmmCallBack(strServiceId, strCallBack, textStatus, null, jqXHR, errorThrown);
        }
    };
    $.ajax(ajaxOption);
};

/*
 * 공통 callback
 * param	:	strObjId - element id
 * 				selHead - 
 * 				dataList - option 데이터 list
 * 				strCdCol - value column(default : CD)
 * 				strNmCol - name column(default : CD_NM)
 * return	:
 * ex)	
 */
window.fn_cmmCallBack = function (strServiceId, strFnCallBack, textStatus, data, jqXHR, errorThrown) {
    if (errorThrown != "exception" && strServiceId == "SAVE") {
    }

    if (typeof strFnCallBack == "function") {
        strFnCallBack(strServiceId, textStatus, data, jqXHR, errorThrown);
    } else {
        window[strFnCallBack](strServiceId, textStatus, data, jqXHR, errorThrown);
    }
};





