'use strict';

(function () {
    //== 템플릿 조회 및 저장 ==//
    Handlebars.getTemplate = function (name) {
        let d = $.Deferred()
        Handlebars.templates = Handlebars.templates || {}
        if (Handlebars.templates[name] === undefined) {
            Handlebars.templates[name] = d
            Service.get('/hbs/' + name + '.hbs').then(function (data) {
                Handlebars.templates[name] = Handlebars.compile(data)
                d.resolve(Handlebars.templates[name])
            })
        } else {
            if (Handlebars.templates[name].hasOwnProperty('promise')) {
                return Handlebars.templates[name].promise()
            } else {
                d.resolve(Handlebars.templates[name])
            }
        }
        return d.promise()
    }

}) ()