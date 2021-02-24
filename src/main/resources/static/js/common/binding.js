(function ($) {

    $.component = function (props, component) {
        let html
        let instance = new component()
        if (instance.hasOwnProperty('state')) {
            $.state(instance.state)
        }
        instance.props = props
        instance._render = function (cb) {
            return Handlebars.getTemplate(instance.templateName).then(function (template) {
                let newHtml = instance.render(template)
                return cb(newHtml)
            })
        }
        if (instance.props.data) {
            $.observer(instance.props.data, function (prevState, newState) {
                if (instance.shouldUpdateComponent !== undefined && !instance.shouldUpdateComponent(prevState, newState)) {
                    return
                }
                instance._render(function(template) {
                    $(html).replaceWith(template)
                    html = template
                })
            })
        }
        $.observer(instance.state, function (prevState, newState) {
            if (instance.shouldUpdateComponent !== undefined && !instance.shouldUpdateComponent(prevState, newState)) {
                return
            }
            instance._render(function (template) {
                $(html).replaceWith(template)
                html = template
            })
        })

        return instance._render(function (template) {
            html = template
            return template
        })
    }

    $.state = function (state) {
        let _state = {}

        defineProperties(_state, state)

        function defineProperties(target, props) {
            for (let key in props) {
                if (!(props[key] instanceof Array) && props[key] instanceof Object) {
                    target[key] = {}
                    defineProperties(target[key], props[key])
                } else {
                    let _key = '_' + key
                    target[key] = props[key]
                    Object.defineProperty(props, _key, {
                        value       : [],
                        writable    : false,
                        configurable: false,
                        enumerable  : false
                    })
                    Object.defineProperty(props, key, {
                        get: function () {
                            return target[key]
                        },
                        set: function (newValue) {
                            let prevValue = target[key]
                            target[key] = newValue
                            props[_key].forEach(function (setter) {
                                setter(newValue, prevValue)
                            })
                        }
                    })
                }
            }
        }
        return state
    }

    $.fn.binding = function (state, key, setter) {
        this.data({
            state : state,
            key   : key,
            setter: setter
        })
        setter.bind(this)(state[key])
        state['_' + key].push(setter.bind(this))
        return this
    }

    $.setState = function (state, newState) {
        let keys = []
        let prevTemp = $.extend(false, {}, state)
        let newTemp = $.extend(false, {}, state, newState)
        update(state, newState)
        if (state.subscribers) {
            state.subscribers.forEach(function (subscriber) {
                subscriber(prevTemp, newTemp, keys)
            })
        }
        function update (p, n, k) {
            for (let key in n) {
                let pk = k ? (k + '.' + key) : key
                if (n[key] instanceof Object && !(n[key] instanceof Array)) {
                    update(p[key], n[key], pk)
                } else {
                    p[key] = n[key]
                    keys.push(pk)
                }
            }
        }
    }

    $.observer = function (state, cb, exclude) {
        let _exclude = exclude || []
        if (!state.subscribers) {
            Object.defineProperty(state, 'subscribers', {
                value       : [],
                writable    : false,
                configurable: false,
                enumerable  : false
            })
        }
        function subscriber (prevState, newState, keys) {
            for (let i = 0; i < keys.length; i++) {
                if (_exclude.indexOf(keys[i]) < 0) {
                    cb(prevState, newState)
                    break
                }
            }
        }
        state.subscribers.push(subscriber)
    }

}) (jQuery)