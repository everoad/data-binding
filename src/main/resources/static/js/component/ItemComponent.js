'use strict';

function ItemComponent() {
    this.templateName = 'Item'
    this.state = {
        title   : null,
        writer  : null,
        isEdit  : false
    }
    this.onInput = this.onInput.bind(this)
    this.handleSaveBtnClick = this.handleSaveBtnClick.bind(this)
    this.handleEditBtnClick = this.handleEditBtnClick.bind(this)
    this.handleDelBtnClick = this.handleDelBtnClick.bind(this)
}

ItemComponent.prototype.shouldUpdateComponent = function (prevState, newState) {
    if (prevState.hasOwnProperty('isEdit')) {
        return prevState.isEdit !== newState.isEdit
    }
    return false
}

ItemComponent.prototype.render = function (template) {
    let data = $.extend(true, {}, this.state, this.props.data)
    let html = BrowserDOM(template(data), this.ui)

    $(this.ui.title).binding(this.state, 'title', this.setValue).on('input', this.onInput)
    $(this.ui.writer).binding(this.state, 'writer', this.setValue).on('input', this.onInput)
    $(this.ui.saveBtn).on('click', this.handleSaveBtnClick)
    $(this.ui.editBtn).on('click', this.handleEditBtnClick)
    $(this.ui.delBtn).on('click', this.handleDelBtnClick)
    $(this.ui.cancelBtn).on('click', this.handleEditBtnClick)
    return html
}

ItemComponent.prototype.setValue = function (value) {
    $(this).val(value)
}

ItemComponent.prototype.onInput = function (e) {
    let newState = {}
    newState[e.target.name] = e.target.value
    $.setState(this.state, newState)
}

ItemComponent.prototype.handleDelBtnClick = function () {
    this.props.removeItem(this.props.data)
}

ItemComponent.prototype.handleEditBtnClick = function () {
    let isEdit = !this.state.isEdit
    $.setState(this.state, {
        isEdit  : isEdit,
        title   : isEdit ? this.props.data.title : null,
        writer  : isEdit ? this.props.data.writer : null
    })
}

ItemComponent.prototype.handleSaveBtnClick = function () {
    this.props.editItem(this.props.data.id, {
        title   : this.state.title,
        writer  : this.state.writer
    })
    $.setState(this.state, {
        isEdit  : false,
        title   : null,
        writer  : null
    })
}