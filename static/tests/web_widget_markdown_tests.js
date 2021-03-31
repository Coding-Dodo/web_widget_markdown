odoo.define('web_widget_markdown_tests', function (require) {
    "use strict";
    var FormView = require('web.FormView');
    var testUtils = require('web.test_utils');

QUnit.module('Markdown Widget Tests', {
    beforeEach: function () {
        this.data = {
            blog: { 
                fields: {
                    name: {
                        string: "Name", 
                        type: "char"
                    },
                    content: { 
                        string: "Content", 
                        type: "text"
                    },
                },
                records: [
                    {id: 1, name: "Blog Post 1", content: "# Hello world",},
                    {id: 2, name: "Blog Post 2", content: "## Second title",},
                ]
            }
        };
    }}, 
    function () {
        QUnit.test('web_widget_markdown readonly test 1', async function(assert) {
            assert.expect(2);
            var form = await testUtils.createView({
                View: FormView,
                model: 'blog',
                data: this.data,
                arch: '<form string="Blog">' +
                        '<group>' +
                            '<field name="name"/>' +
                            '<field name="content" widget="markdown"/>' +
                        '</group>' +
                    '</form>',
                res_id: 1,
            });
            assert.strictEqual(
                form.$('.o_field_markdown').find("h1").length, 
                1, 
                "h1 should be present"
            )
            assert.strictEqual(
                form.$('.o_field_markdown h1').text(), 
                "Hello world", 
                "<h1> should contain 'Hello world'"
            )
            form.destroy();
        });
        QUnit.test('web_widget_markdown readonly test 2', async function(assert) {
            assert.expect(2);
            var form = await testUtils.createView({
                View: FormView,
                model: 'blog',
                data: this.data,
                arch: '<form string="Blog">' +
                        '<group>' +
                            '<field name="name"/>' +
                            '<field name="content" widget="markdown"/>' +
                        '</group>' +
                    '</form>',
                res_id: 2,
            });
            assert.strictEqual(
                form.$('.o_field_markdown').find("h2").length, 
                1, 
                "h2 should be present"
            )
            assert.strictEqual(
                form.$('.o_field_markdown h2').text(), 
                "Second title", 
                "<h2> should contain 'Second title'"
            )
            form.destroy();
        });
        QUnit.test('web_widget_markdown edit form', async function(assert) {
            assert.expect(3);
            var form = await testUtils.createView({
                View: FormView,
                model: 'blog',
                data: this.data,
                arch: '<form string="Blog">' +
                        '<group>' +
                        '<field name="name"/>' +
                            '<field name="content" widget="markdown"/>' +
                        '</group>' +
                    '</form>',
                res_id: 1,
            });
            await testUtils.form.clickEdit(form);

            // await testUtils.fields.editInput(form.$('.o_field_markdown'), '**bold content**');
            var markdownField = _.find(form.renderer.allFieldWidgets)[1];
            markdownField.simplemde.codemirror.setValue('**bold content**');
            // markdownField.simplemde.value('**bold content**');
            assert.strictEqual(
                markdownField._getValue(), 
                "**bold content**", 
                "Value of odoo widget should be updated"
            )

            await testUtils.form.clickSave(form);
            assert.strictEqual(
                form.$('.o_field_markdown').find("strong").length, 
                1, 
                "b should be present"
            )
            assert.strictEqual(
                form.$('.o_field_markdown strong').text(), 
                "bold content", 
                "<strong> should contain 'bold content'"
            )
            form.destroy();
        });
    }
);
});