'use strict';


function FormComponent () {
    this.templateName = 'Form'
}

FormComponent.prototype.shouldUpdateComponent = function (prevState, newState) {
    return false
}

FormComponent.prototype.render = function (template) {
    let html = BrowserDOM(template(), this.ui)
    $(this.ui.title).binding(this.props.data, 'title', this.setValue).on('input', this.props.onInput)
    $(this.ui.writer).binding(this.props.data, 'writer', this.setValue).on('input', this.props.onInput)
    $(this.ui.addBtn).on('click', this.props.addItem)
    return html
}

FormComponent.prototype.setValue = function (value) {
    $(this).val(value)
}
