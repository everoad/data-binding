'use strict';


function ItemListComponent() {
    this.templateName = 'ItemList'
    this.state = {}
    this.ui = {}
}


ItemListComponent.prototype.shouldUpdateComponent = function (prevState, newState) {
    return JSON.stringify(prevState.items) !== JSON.stringify(newState.items)
}


ItemListComponent.prototype.render = function (template) {
    let props = this.props
    let ui = this.ui
    let html = BrowserDOM(template(), ui)

    props.data.items.forEach(function (item) {
        let itemProps = {
            data        : item,
            removeItem  : props.removeItem
        }
        $.component(itemProps, ItemComponent).then(function (component) {
            $(ui.itemList).append(component)
        })
    })
    return html
}