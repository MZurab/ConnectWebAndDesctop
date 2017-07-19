define(['jquery','v_chat','m_view','m_app'],function($,v_chat,m_view,m_app){
	var pages = {
		'index' 	: '',
		'private' 	: {
			'attr' : {
				'id2' : '2',
				'id3' : '3',
			}
		}
	};
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