'use strict';

(function () {
    //== 템플릿 조회 및 저장 ==//
    Handlebars.getTemplate = function (name) {
        let d = $.Deferred()
        if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
            Service.get('/hbs/' + name + '.hbs').then(function (data) {
                if (Handlebars.templates === undefined) {
                    Handlebars.templates = {}
                }
                Handlebars.templates[name] = Handlebars.compile(data)
                d.resolve(Handlebars.templates[name])
            })
        } else {
            d.resolve(Handlebars.templates[name])
        }
        return d.promise()
    }


    //== 날짜 형식 Helper ==//
    Handlebars.registerHelper('momentTimeHelper', function (date) {
        return Utils.dateFormat.time(date)
    })
    Handlebars.registerHelper('momentDateHelper', function (date) {
        return Utils.dateFormat.date(date)
    })
    Handlebars.registerHelper('momentSecondHelper', function (date) {
        return Utils.dateFormat.second(date)
    })

    //== select Helper ==//
    Handlebars.registerHelper('selectHelper', function (value, options) {
        let $el = $('<select />').html(options.fn(this))
        $el.find('[value="' + value + '"]').attr({'selected':'selected'})
        return $el.html()
    })

    //== JSON stringify Helper ==//
    Handlebars.registerHelper('jsonStringifyHelper', function (data) {
        return JSON.stringify(data)
    })

    //== 파일크기 Helper ==//
    Handlebars.registerHelper('fileSizeHelper', function (data) {
        return Utils.fileSizeFormat(data)
    })

    Handlebars.registerHelper('toFixedHelper', function (data, num) {
        return data.toFixed(num)
    })

    Handlebars.registerHelper('dashHelper', function (data, unit) {
        if (typeof unit === "object") {
            unit = null
        }
        return Utils.setDash(data, unit)
    })

    Handlebars.registerHelper('equalHelper', function (value1, value2) {
        return value1 === value2
    })

    Handlebars.registerHelper("safeHelper", function(text) {
        return new Handlebars.SafeString(text)
    })

}) ()