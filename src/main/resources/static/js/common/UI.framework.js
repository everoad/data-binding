(function ($) {

    $.state = function (state) {
        let _state = {}
        defineProperties(_state, state)
        function defineProperties(_data, data) {
            Object.keys(data).forEach(function (key) {
                if (!(data[key] instanceof Array) && data[key] instanceof Object) {
                    _data[key] = {}
                    defineProperties(_data[key], data[key])
                } else {
                    let _key = '_' + key
                    _data[key] = data[key]
                    Object.defineProperty(data, _key, {
                        value       : [],
                        writable    : false,
                        configurable: false,
                        enumerable  : false
                    })
                    Object.defineProperty(data, key, {
                        get: function () {
                            return _data[key]
                        },
                        set: function (newValue) {
                            let prevValue = _data[key]
                            _data[key] = newValue
                            data[_key].forEach(function (setter) {
                                setter(newValue, prevValue)
                            })
                        }
                    })
                }
            })
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


    $.setState = function (state, params) {
        let keys = []
        let _currState = $.extend(false, {}, state)
        let _newState = $.extend(false, {}, state, params)
        updateState(state, params)
        if (state.subscribers !== undefined) {
            state.subscribers.forEach(function (subscriber) {
                subscriber(_currState, _newState, keys)
            })
        }
        function updateState (currState, newState, parentKey) {
            Object.keys(newState).forEach(function (key) {
                let newKey = parentKey ? (parentKey + '.' + key) : key
                if (newState[key] instanceof Object && !(newState[key] instanceof Array)) {
                    updateState(currState[key], newState[key], newKey)
                } else {
                    currState[key] = newState[key]
                    keys.push(newKey)
                }
            })
        }
    }


    $.observer = function (state, callback, excludes) {
        let _excludes = excludes || []
        if (state.subscribers === undefined) {
            Object.defineProperty(state, 'subscribers', {
                value       : [],
                writable    : false,
                configurable: false,
                enumerable  : false
            })
        }
        function subscriber (prevState, newState, keys) {
            for (let i = 0; i < keys.length; i++) {
                if (_excludes.indexOf(keys[i]) < 0) {
                    callback(prevState, newState)
                    break
                }
            }
        }
        state.subscribers.push(subscriber)
    }


    $.component = function (props, component) {

        let instance = new component()
        instance.ui = {}
        if (instance.state !== undefined) {
            $.state(instance.state)
            $.observer(instance.state, function (prevState, newState) {
                if (instance.shouldUpdateComponent !== undefined
                    && !instance.shouldUpdateComponent(prevState, newState)) {
                    return
                }
                instance._render(_renderCallback)
            })
        }

        if (props !== undefined) {
            instance.props = props
            if (instance.props.data !== undefined) {
                $.observer(instance.props.data, function (prevState, newState) {
                    if (instance.shouldUpdateComponent !== undefined
                        && !instance.shouldUpdateComponent(prevState, newState)) {
                        return
                    }
                    instance._render(_renderCallback)
                })
            }
        }

        instance._render = function (callback) {
            return Handlebars.getTemplate(instance.templateName).then(function (template) {
                return callback(instance.render(template))
            })
        }

        function _renderCallback (newElement) {
            if (instance.element !== undefined) {
                $(instance.element).replaceWith(newElement)
            }
            instance.element = newElement
            return newElement
        }

        if (instance.componentDidMount !== undefined) {
            instance.componentDidMount()
        }
        return instance._render(_renderCallback)
    }

}) (jQuery)