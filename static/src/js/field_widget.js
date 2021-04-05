odoo.define('web_widget_markdown', function (require) {
"use strict";

var AbstractField = require('web.AbstractField');
var fieldRegistry = require('web.field_registry');
var basicFields = require('web.basic_fields');


var markdownField = basicFields.FieldText.extend({
    supportedFieldTypes: ['text'],
    // className: 'o_field_markdown',
    template: 'FieldMarkdown',
    jsLibs: [
        '/web_widget_markdown/static/lib/simplemde.min.js',
    ],
    // events: {}, // events are triggered manually for this debounced widget

    /**
     * @constructor
     */
    init: function () {
        this._super.apply(this, arguments);
        // this.tagName = 'div';
        // this.autoResizeOptions = {min_height: 200};
        this.simplemde = {}
    },

    /**
     * When the the widget render, check view mode, if edit we
     * instanciate our SimpleMDE
     * 
     * @override
     */
    start: function () {
        if (this.mode === 'edit') {
            var $textarea = this.$el.find('textarea');
            this.simplemde = new SimpleMDE({
                element: $textarea[0],
                initialValue: this.value,
            });
            var self = this;
            this.simplemde.codemirror.on("change", function(){
                self._setValue(self.simplemde.value());
            })
        }
        return this._super();
    },

    /**
     * return the SimpleMDE value
     *
     * @private
     */
    _getValue: function () {
        return this.simplemde.value();
    },

    // /**
    //  * @override destroy from AbstractField (Widget)
    //  */
    // destroy: function () {
    //     this.simplemde = null;
    //     this._super.apply(this, arguments);
    // },

    // /**
    //  * return the SimpleMDE value
    //  *
    //  * @private
    //  */
    // _getValue: function () {
    //     return this.simplemde.value();
    // },

    _renderReadonly: function () {
        this.$el.html(SimpleMDE.prototype.markdown(this.value));
    },
});

fieldRegistry.add('markdown', markdownField);

return {
    markdownField: markdownField,
};
});
