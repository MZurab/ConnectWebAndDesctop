define(['jquery','v_chat','m_view','m_app'],function($,v_chat,m_view,m_app){
	var pages = ['index','private'];
	var name = 'chat';
	//@<<< APP BLOCK
		function onInit () {

		}
		function onStart () {

		}
		//@required
		function onCreate () {

		}
		function onLoad () {

		}
		//@required
		function onAppear () {

		}
		//@required
		function onDisappear () {

		}
		function onClose () {

		}
	//@>>> APP BLOCK


	return {
		'name' 			: name,
		'pages' 		: pages,
		'onInit' 		: onInit,
		'onStart' 		: onStart,
		'onCreate' 		: onCreate,
		'onAppear' 		: onAppear,
		'onDisappear' 	: onDisappear,
		'onClose' 		: onClose,
	}
});