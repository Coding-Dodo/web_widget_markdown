# Copyright 2021 codingdodo.com - L'ATTENTION Philippe
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl.html)
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
    'category': 'web',
    'version': '14.0',
    'license': 'AGPL-3',
    'depends': ['base', 'web'],
    'data': [
        'views/templates.xml',
    ],
    "qweb": [ 
        'static/src/xml/qweb_template.xml',
    ],
    'auto_install': False,
    'installable': True,
}
