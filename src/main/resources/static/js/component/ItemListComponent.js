'use strict';


function ItemListComponent(props) {
    this.templateName = 'ItemList'
    this.props = props
}


ItemListComponent.prototype.shouldUpdateComponent = function (prevState, newState) {
    return JSON.stringify(prevState.items) !== JSON.stringify(newState.items)
}


ItemListComponent.prototype.render = function (template) {
    let props = this.props
    let fragment = BrowserDOM(template())

    props.data.items.forEach(function (item) {
        let itemProps = {
            data        : item,
            editItem    : props.editItem,
            removeItem  : props.removeItem
        }
        $(fragment.nodes.list).addComponent($.component(itemProps, ItemComponent))
    })
    return fragment
}