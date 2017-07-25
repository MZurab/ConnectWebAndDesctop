define(['jquery','v_chat','m_view','m_app'],function($,v_chat,m_view,m_app) {
	//@< init
		// init from app view templates
			var templates = v_chat.templates;
	//@> init
	var pages = {
		'index' 	: '',
		'private' 	: {
			'attr' : {
				'id2' : '2',
				'id3' : '3',
			},
			'menus': {
				'attr' : {
					'id1' : 'id2',
					'id3' : 'id4'
				}
			}
		}
	};
	var options = {
		'attr' 	: {
			'attr' : {
				'id2' : '2',
				'id3' : '3',
			}
		},
		// options for list app menus
		'menus': {
			'attr' : {
				'id2' : '2',
				'id3' : '3',
			}
		}
	};
	// for chat view
		// var templates = {
		// 	'page' : {
		// 		'menu' : {

		// 		},
		// 		'view' : {

		// 		}

		// 	},
		// 	'app' : {
		// 		'name'
		// 	}

		// }
		
	/*
		getTemplate
		getMenuTemplate
		getViewTemplate

		getPage
		getView
	*/
	// for chat view


	var name = 'chat';
	//@<<< APP BLOCK
		//@required
		function onInit () {
			console.log('onInit');
		}
		
			//@optional	
			function onIn () {
				console.log('onIn');

			}
				//@required
				function onAppear () {
					m_view.closeLoader();
					console.log('onAppear');

				}
				//@required
				function onDisappear () {
					// here must be page disapear functions
					/*
						безопасно берем pages если есть
						безопасно узнаем название открывшегося сейчась page +getPageName +setPageName
						безопасно вызываем pages[openedPageName][onDisapear] функцию

					*/
					console.log('onDisappear');

				}

			//@optional	
			function onOut () {
				// here must be page onOut functions
				console.log('onOut');

			}
		//@required
		function onDeinit () {
			console.log('onDeinit');

		}
	//@>>> APP BLOCK


	return {
		// vars
		'name' 			: name,
		'pages' 		: pages,

		// app functions
		'onInit' 		: onInit,
		'onIn' 			: onIn,
		'onAppear' 		: onAppear,
		'onDisappear' 	: onDisappear,
		'onOut' 		: onOut,
		'onDeinit' 		: onDeinit,
	}
});