'use strict';

function ItemComponent(props) {
    this.templateName = 'Item'
    this.state = {
        title   : null,
        writer  : null,
        isEdit  : false
    }
    this.props = props
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

ItemComponent.prototype.getTemplateData = function () {
    return $.extend(true, {}, this.state, this.props.data)
}

ItemComponent.prototype.render = function (fragment) {
    if (this.state.isEdit) {
        $(fragment.nodes.title).binding(this.state, 'title', this.setValue).on('input', this.onInput)
        $(fragment.nodes.writer).binding(this.state, 'writer', this.setValue).on('input', this.onInput)
        $(fragment.nodes.saveBtn).on('click', this.handleSaveBtnClick)
        $(fragment.nodes.cancelBtn).on('click', this.handleEditBtnClick)
    } else {
        $(fragment.nodes.editBtn).on('click', this.handleEditBtnClick)
        $(fragment.nodes.delBtn).on('click', this.handleDelBtnClick)
    }
    return fragment
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