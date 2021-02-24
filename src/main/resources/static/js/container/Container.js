'use strict';

function Container() {

    this.templateName = 'Container'

    this.state = {
        title   : null,
        writer  : null,
        items   : [{ title: 'Hello', writer: 'World!!@@' }]
    }
    this.ui = {}

    this.onInput = this.onInput.bind(this)
    this.addItem = this.addItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
}


Container.prototype.shouldUpdateComponent = function (prevState, newState) {
    return false
}


Container.prototype.render = function (template) {
    let ui = this.ui
    let html = BrowserDOM(template(), ui)

    let formProps = {
        data    : this.state,
        onInput : this.onInput,
        addItem : this.addItem
    }
    $.component(formProps, FormComponent).then(function (component) {
        $(ui.form).append(component)
    })

    let listProps = {
        data        : this.state,
        removeItem  : this.removeItem
    }
    $.component(listProps, ItemListComponent).then(function (component) {
        $(ui.list).append(component)
    })
    return html
}


Container.prototype.onInput = function (e) {
    let newState = {}
    newState[e.target.name] = e.target.value
    $.setState(this.state, newState)
}


Container.prototype.addItem = function () {
    let newItem = {
        title   : this.state.title,
        writer  : this.state.writer
    }
    $.setState(this.state, {
        items   : this.state.items.concat([ newItem ]),
        title   : null,
        writer  : null
    })
}


Container.prototype.removeItem = function (item) {
    let items = this.state.items.slice()
    items.splice(items.indexOf(item), 1)
    $.setState(this.state, {
        items: items
    })
}
