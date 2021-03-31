# -*- coding: utf-8 -*-
{
    'name': "Web widget Markdown",

    'summary': """
        Add support of markdown content into an Odoo widget form.
    """,

    'description': """
        Allow the use of the widget markdown to display markdown content into Odoo views 
        in render mode and a markdown Editor in edit mode thanks to SimpleMDE Javascript library
    """,
    'author': "Coding Dodo",
    'website': "https://codingdodo.com",
    'category': 'Technical',
    'version': '0.1',
    'depends': ['base', 'web'],
    'data': [
        'views/templates.xml',
    ],
    "qweb": [],
    # only loaded in demonstration mode
    'demo': [],
}
