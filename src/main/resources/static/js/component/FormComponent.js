'use strict';


function FormComponent () {
    this.templateName = 'Form'

    this.handleInputKeypress = this.handleInputKeypress.bind(this)
}

FormComponent.prototype.shouldUpdateComponent = function (prevState, newState) {
    return false
}

FormComponent.prototype.render = function (template) {
    let html = BrowserDOM(template(), this.ui)
    $(this.ui.title).binding(this.props.data, 'title', this.setValue).on('input', this.props.onInput).on('keypress', this.handleInputKeypress)
    $(this.ui.writer).binding(this.props.data, 'writer', this.setValue).on('input', this.props.onInput).on('keypress', this.handleInputKeypress)
    $(this.ui.addBtn).on('click', this.props.addItem)
    return html
}

FormComponent.prototype.setValue = function (value) {
    $(this).val(value)
}

FormComponent.prototype.handleInputKeypress = function (e) {
    if (e.keyCode === 13) {
        this.props.addItem()
    }
}