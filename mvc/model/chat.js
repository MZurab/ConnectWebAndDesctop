define(['jquery','v_chat','m_view','m_app'],function($,v_chat,m_view,m_app){
	var pages = ['index','private'];
	var name = 'chat';
	//@<<< APP BLOCK
		function onInit () {
			console.log('onInit');
		}
		function onStart () {
			console.log('onStart');

		}
		//@required
		function onCreate () {
			console.log('onCreate');

		}
		function onLoad () {
			console.log('onLoad');

		}
		//@required
		function onAppear () {
			m_view.closeLoader();
			console.log('onAppear');

		}
		//@required
		function onDisappear () {
			console.log('onDisappear');

		}
		function onClose () {
			console.log('onClose');

		}
	//@>>> APP BLOCK


	return {
		'name' 			: name,
		'pages' 		: pages,
		'onInit' 		: onInit,
		'onStart' 		: onStart,
		'onCreate' 		: onCreate,
		'onLoad' 		: onLoad,
		'onAppear' 		: onAppear,
		'onDisappear' 	: onDisappear,
		'onClose' 		: onClose,
	}
});