'use strict';

function ItemContainer(props) {
    this.templateName = 'ItemContainer'
    this.props = props
    this.state = {
        title   : null,
        writer  : null,
        items   : []
    }

    this.onInput = this.onInput.bind(this)
    this.addItem = this.addItem.bind(this)
    this.editItem = this.editItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
}


ItemContainer.prototype.shouldUpdateComponent = function (prevState, newState) {
    return false
}


ItemContainer.prototype.componentDidMount = function () {
    this.getItems()
}


ItemContainer.prototype.render = function (template) {
    let fragment = BrowserDOM(template())

    let formProps = {
        data    : this.state,
        onInput : this.onInput,
        addItem : this.addItem
    }
    $.component(formProps, FormComponent).then(function (component) {
        $(fragment.nodes.form).append(component)
    })

    let listProps = {
        data        : this.state,
        editItem    : this.editItem,
        removeItem  : this.removeItem
    }
    $.component(listProps, ItemListComponent).then(function (component) {
        $(fragment.nodes.list).append(component)
    })
    return fragment
}


ItemContainer.prototype.getItems = function () {
    let state = this.state
    ItemAPI.getItems(function (items) {
        $.setState(state, {
            items   : items
        })
    })
}


ItemContainer.prototype.onInput = function (e) {
    let newState = {}
    newState[e.target.name] = e.target.value
    $.setState(this.state, newState)
}


ItemContainer.prototype.addItem = function () {
    let newItem = {
        title   : this.state.title,
        writer  : this.state.writer
    }
    let _this = this
    ItemAPI.addItem(newItem, function () {
        _this.getItems()
        $.setState(_this.state, {
            title   : null,
            writer  : null
        })
    })
}


ItemContainer.prototype.editItem = function (id, item) {
    let _this = this
    ItemAPI.editItem(id, item, function () {
        _this.getItems()
    })
}


ItemContainer.prototype.removeItem = function (item) {
    let _this = this
    ItemAPI.removeItem(item.id, function () {
        _this.getItems()
    })
}
