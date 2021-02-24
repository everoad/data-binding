'use strict';

function ItemComponent() {
    this.templateName = 'Item'
    this.state = {}
    this.ui = {}

    this.handleDelBtnClick = this.handleDelBtnClick.bind(this)
}

ItemComponent.prototype.shouldUpdateComponent = function (prevState, newState) {
    return true
}

ItemComponent.prototype.render = function (template) {
    let html = BrowserDOM(template(this.props.data), this.ui)
    $(this.ui.delBtn).on('click', this.handleDelBtnClick)
    return html
}

ItemComponent.prototype.handleDelBtnClick = function () {
    this.props.removeItem(this.props.data)
}