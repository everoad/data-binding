'use strict';


let ItemAPI = {

    baseUrl: '/items/',

    getItems: function (cb) {
        Service.get(this.baseUrl).then(cb)
    },

    addItem: function (params, cb) {
        Service.postJSON(this.baseUrl, params).then(cb)
    },

    editItem: function (id, params, cb) {
        Service.putJSON(this.baseUrl + id, params).then(cb)
    },

    removeItem: function (id, cb) {
        Service.del(this.baseUrl + id).then(cb)
    }

}