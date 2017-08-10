define(['jquery','m_view'],function($,m_view) {
	const _ = {};
	var templates = {
		'page' : {
			'menus' : {
				'pageName': {
					'index': "template",
					'other': 'otherTemplate'
				},
				'*' : { // принадлежи к app
					'index': 'template',
					'other': 'otherTemplate'
				}	
			},
			

		},
		'apps' : {
			'someName': '',
		}

	};
	_['templates'] = templates;


	return _;
});