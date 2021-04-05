# Odoo 14.0 web widget Markdown
This the source code for the [part 3 of the article written on codingdodo.com](https://codingdodo.com) about Test Driven Developement in Odoo 14 JavaScript.

![Coding Dodo](https://res.cloudinary.com/phildl-cloudinary/image/upload/w_200/v1617638212/codingdodo/Coding_Dodo_rplksw.png)
## Odoo Widget
This widget render markdown content stored in a Text field.

It uses the awesome JavaScript library [SimpleMDE](https://simplemde.com/)

## Basic Usage

```xml
    <field name="myfield" widget="markdown" options="{'placeholder': 'Type content here'}">
```

In the options attribute, pass any options of SimpleMDE configuration.
