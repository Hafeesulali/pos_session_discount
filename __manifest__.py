{'name': 'Pos Session Discount Limit',
 'installable': True,
 'auto_install': False,
 'version': '16.0.1.0.0',
 'depends': ['base', 'point_of_sale'],
 'data': ['views/pos_settings_views.xml'],
 'assets': {
     'point_of_sale.assets': ['pos_session_discount/static/src/js/discount_limit.js'],
 }
 }
