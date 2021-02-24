'use strict'

let Service = {

    get: function (url, params, errorFnc) {
        return $.ajax({
            url: url, data: params, type: 'get', error: function (jqXHR) {
                Service.error(jqXHR, errorFnc)
            }
        })
    },

    post: function (url, params, errorFnc) {
        return $.ajax({
            url: url, data: params, type: 'post', error: function (jqXHR) {
                Service.error(jqXHR, errorFnc)
            }
        })
    },

    put: function (url, params, errorFnc) {
        return $.ajax({
            url: url, data: params, type: 'put', error: function (jqXHR) {
                Service.error(jqXHR, errorFnc)
            }
        })
    },

    del: function (url, params, errorFnc) {
        return $.ajax({
            url: url, data: params, type: 'delete', error: function (jqXHR) {
                Service.error(jqXHR, errorFnc)
            }
        })
    },

    getJSON: function (url, params, errorFnc) {
        return $.ajax({
            url: url,
            data: JSON.stringify(params),
            type: 'get',
            contentType: "application/json",
            error: function (jqXHR) {
                Service.error(jqXHR, errorFnc)
            }
        })
    },

    postJSON: function (url, params, errorFnc) {
        return $.ajax({
            url: url,
            data: JSON.stringify(params),
            type: 'post',
            contentType: "application/json",
            error: function (jqXHR) {
                Service.error(jqXHR, errorFnc)
            }
        })
    },

    putJSON: function (url, params, errorFnc) {
        return $.ajax({
            url: url,
            data: JSON.stringify(params),
            type: 'put',
            contentType: "application/json",
            error: function (jqXHR) {
                Service.error(jqXHR, errorFnc)
            }
        })
    },

    delJSON: function (url, params, errorFnc) {
        return $.ajax({
            url: url,
            data: JSON.stringify(params),
            type: 'delete',
            contentType: "application/json",
            error: function (jqXHR) {
                Service.error(jqXHR, errorFnc)
            }
        })
    },

    wait: function (type, url, params, cb, errorFnc) {
        var d = $.Deferred()
        this[type](url, params, errorFnc).then(function (res) {
            if (cb) {
                cb(res)
            }
            d.resolve(res)
        })
        return d.promise()
    },

    apply: function (params, cb) {
        $.when.apply($, params).then(function () {
            cb(arguments)
        })
    },

    upload: function (url, formData, errorFnc) {
        return $.ajax({
            url: url,
            data: formData,
            processData: false,
            contentType: false,
            type: 'post',
            error: function (jqXHR) {
                Service.error(jqXHR, errorFnc)
            }
        })
    },

    error: function (jqXHR, errorFnc) {
        if (errorFnc && errorFnc(jqXHR)) {
            return
        }
        let response
        if (jqXHR.hasOwnProperty("responseJSON")) {
        	response = jqXHR.responseJSON
		}
        switch (jqXHR.status) {
            case 401:
                location.href = '/login'
                break
            default:
                alert(response.errors[0].defaultMessage)
                break
        }
    }

}