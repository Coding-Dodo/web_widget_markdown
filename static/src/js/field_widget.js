odoo.define('web_widget_markdown', function (require) {
"use strict";

var fieldRegistry = require('web.field_registry');
var basicFields = require('web.basic_fields');


var markdownField = basicFields.DebouncedField.extend(basicFields.TranslatableFieldMixin, {
    supportedFieldTypes: ['text'],
    template: 'FieldMarkdown',
    jsLibs: [
        '/web_widget_markdown/static/lib/easymde.min.js',
        '/web_widget_markdown/static/lib/marked.min.js',
    ],
    events: {},

    /**
     * @constructor
     */
    init: function () {
        this._super.apply(this, arguments);
        this.easymde = {}
    },

    /**
     * When the the widget render, check view mode, if edit we
     * instanciate our EasyMDE
     * 
     * @override
     */
    start: function () {
        if (this.mode === 'edit') {
            var $textarea = this.$el.find('textarea');
            var easymdeConfig = {
                element: $textarea[0],
                initialValue: this.value,
                uniqueId: "markdown-"+this.model+this.res_id,
            }
            if (this.nodeOptions) {
                easymdeConfig = {...easymdeConfig, ...this.nodeOptions};
            }
            this.easymde = new EasyMDE(easymdeConfig);
            this.easymde.codemirror.on("change", this._doDebouncedAction.bind(this));
            this.easymde.codemirror.on("blur", this._doAction.bind(this));
            if (this.field.translate) {
                this.$el = this.$el.add(this._renderTranslateButton());
                this.$el.addClass('o_field_translate');
            }
        }
        return this._super();
    },

    /**
     * return the EasyMDE value
     *
     * @private
     */
    _getValue: function () {
        return this.easymde.value();
    },

    _formatValue: function (value) {
        return this._super.apply(this, arguments) || '';
    },

    _renderEdit: function () {
        this._super.apply(this, arguments);
        var newValue = this._formatValue(this.value);
        if (this.easymde.value() !== newValue) {
            this.easymde.value(newValue);
        }
    },

    _renderReadonly: function () {
        var value = this._formatValue(this.value);
        if (marked) { // Use the marked lib to convert.
            value = marked.marked(value);
        }
        this.$el.html(value);
    },
});

fieldRegistry.add('markdown', markdownField);

return {
    markdownField: markdownField,
};
});
