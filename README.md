# Odoo 15.0 web widget Markdown

This widget add a markdown Editor to Text field. In Edit mode the Editor is fuly usable
and in readonly mode the widget shows a naive transformation of markdown to HTML as a preview.

This module uses the JavaScript library [EasyMDE](https://github.com/Ionaru/easy-markdown-editor) as a Markdown Editor for the client.

And the python [Markdown library](https://github.com/Python-Markdown/markdown) for backend usage.

```
pip install markdown
```

This is also the source code for the [the article written on codingdodo.com](https://codingdodo.com) about Test Driven Developement in Odoo 14 JavaScript.

## Usage

In your xml view, add `widget="markdown"` to any Text field.

```xml
<field name="mytextfield" widget="markdown" options="{'placeholder': 'Type content here'}">
```

### Edit mode

![Markdown Editor](https://res.cloudinary.com/phildl-cloudinary/image/upload/v1617684353/codingdodo/github-module-screenshot.png)

### Readonly mode

![Markdown Render](https://res.cloudinary.com/phildl-cloudinary/image/upload/v1617684497/codingdodo/github-module-screenshot-2.png)

### Options

In the options attribute, pass any options of [EasyMDE](https://github.com/Ionaru/easy-markdown-editor#configuration) configuration.

## Usage in report / Website templates

There is also a t-options widget markdown available for usage in PDF reports (rendered server side in python)

```xml
<div t-raw="o.content" t-options="{'widget': 'markdown'}"></div>
```

## Bug Tracker

Bugs are tracked on [GitHub Issues](https://github.com/Coding-Dodo/web_widget_markdown/issues). In case of trouble, please check there if your issue has already been reported. If you spotted it first, help us smashing it by providing a detailed and welcomed feedback.

Do not contact contributors directly about support or help with technical issues.

## Credits

Big thanks to the authors of [EasyMDE](https://github.com/Ionaru/easy-markdown-editor), which is based on [SimpleMDE](https://github.com/sparksuite/simplemde-markdown-editor).

### Widget Author

[![Coding Dodo](https://res.cloudinary.com/phildl-cloudinary/image/upload/w_300/v1617638212/codingdodo/Coding_Dodo_rplksw.png)](https://codingdodo.com)

### Widget Contributors

* [XCG](https://xcg-consulting.fr/)
