define(['jquery','m_view'],function($,m_view){
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

	},


	return {
		'templates' : templates,
	}
});