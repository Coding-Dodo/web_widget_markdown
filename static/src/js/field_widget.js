odoo.define('my_field_widget', function (require) {
"use strict";

var AbstractField = require('web.AbstractField');
var fieldRegistry = require('web.field_registry');


var markdownField = AbstractField.extend({
    supportedFieldTypes: ['text'],
    template: 'FieldMarkdown',
    events: {}, // events are triggered manually for this debounced widget
    jsLibs: [
        '/my_library/static/lib/simplemde.min.js',
    ],

    /**
     * @constructor
     */
    init: function () {
        this._super.apply(this, arguments);
        this.simplemde = {}
    },

    /**
     * As it it done in the start function, the autoresize is done only once.
     *
     * @override
     */
    start: function () {
        var self = this;
        if (this.mode === 'edit') {
            var $textarea = this.$el.find('textarea');
            var simpleMdeConfig = {
                element: $textarea[0], 
                initialValue: this.value,
                placeholder: "Type here...",
                autofocus: false,
                renderingConfig: {
                    codeSyntaxHighlighting: true,
                },
            }
            if(this.nodeOptions.autosave) {
                simpleMdeConfig.autosave = {
                    enabled: true,
                    uniqueId: "markdown-"+this.model+this.res_id,
                    delay: 1000
                };
            }
            if(this.nodeOptions.placeholder) {
                simpleMdeConfig.placeholder = this.nodeOptions.placeholder;
            }
            
            this.simplemde = new SimpleMDE(simpleMdeConfig);
            this.simplemde.codemirror.on("change", function(){
                self._setValue(self.simplemde.value());
            })
            // If inehrit basicFields.DebouncedField
            // this.simplemde.codemirror.on("change", this._doDebouncedAction.bind(this))
            self._setValue(self.simplemde.value());
        }
        return this._super();
    },

    /**
     * @override destroy from AbstractField (Widget)
     */
    destroy: function () {
        this.simplemde = null;
        this._super.apply(this, arguments);
    },

    /**
     * return the SimpleMDE value
     *
     * @private
     */
    _getValue: function () {
        return this.simplemde.value();
    },

    _renderReadonly: function () {
        this.$el.html(SimpleMDE.prototype.markdown(this.value));
    },
});

fieldRegistry.add('markdown', markdownField);

return {
    markdownField: markdownField,
};
});
