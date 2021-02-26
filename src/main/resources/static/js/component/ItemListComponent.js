'use strict';


function ItemListComponent(props) {
    this.templateName = 'ItemList'
    this.props = props
}


ItemListComponent.prototype.shouldUpdateComponent = function (prevState, newState) {
    return JSON.stringify(prevState.items) !== JSON.stringify(newState.items)
}


ItemListComponent.prototype.render = function (fragment) {
    let props = this.props
    props.data.items.forEach(function (item) {
        let itemProps = {
            data        : item,
            editItem    : props.editItem,
            removeItem  : props.removeItem
        }
        $(fragment.nodes.list).appendComponent(itemProps, ItemComponent)
    })
    return fragment
}