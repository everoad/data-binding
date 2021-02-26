'use strict';


function FormComponent (props) {
    this.templateName = 'Form'
    this.props = props
    this.handleInputKeypress = this.handleInputKeypress.bind(this)
}

FormComponent.prototype.shouldUpdateComponent = function (prevState, newState) {
    return false
}

FormComponent.prototype.render = function (fragment) {
    $(fragment.nodes.title).binding(this.props.data, 'title', this.setValue).on('input', this.props.onInput).on('keypress', this.handleInputKeypress)
    $(fragment.nodes.writer).binding(this.props.data, 'writer', this.setValue).on('input', this.props.onInput).on('keypress', this.handleInputKeypress)
    $(fragment.nodes.addBtn).on('click', this.props.addItem)
    return fragment
}

FormComponent.prototype.setValue = function (value) {
    $(this).val(value)
}

FormComponent.prototype.handleInputKeypress = function (e) {
    if (e.keyCode === 13) {
        this.props.addItem()
    }
}