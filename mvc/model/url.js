define( [] , function () {
	const URL = {};
	const _ = {'db':URL};

	//@< user files
		URL['gstorage'] = 'https://gstorage.ramman.net';
		URL['cdn'] 		= 'https://cdn.ramman.net';
		URL['main'] 	= 'https://ramman.net';

		URL['userNonePhoto']= URL['cdn'] + '/web/res/images/icons/user/noPhoto.png';
		URL['userNonePhoto']= URL['cdn'] + '/web/res/images/icons/user/noPhoto.png';


		function getUserIconByUid (iNuid) {
		    return  URL['gstorage'] + '/users/' + iNuid + '/public/icons/1.jpg';
		} _.getUserIconByUid = getUserIconByUid;

		function getChatIconByChatId (iNchatId) {
		    return  URL['gstorage'] + '/chats/' + iNchatId + '/public/icons/1.jpg';
		} _.getChatIconByChatId = getChatIconByChatId;
	//@>



	//@< api 
		const API = {}; URL.api = API;

		//@< api > chat
			const APICHAT 		= {}; API['chat'] = APICHAT;
			APICHAT['create'] 	= URL['main'] + '/api/chat';
		//@> api > chat

      	//@< api > page
			const APIPAGE 		= {}; API['page'] = APIPAGE;
			APIPAGE['get'] 		= URL['main'] + '/api/service/page';
		//@> api > page

		//@< api > user
			const APIUSER 		= {}; API['user'] = APIUSER;
			APIUSER['sign']		= URL['main'] + '/api/web/sign';
		//@> api > user


		//@< api > getUrl
			const APIGETURL 		= {}; API['getUrl'] = APIGETURL;
			APIGETURL['forChat']	= URL['main'] + '/api/geturl/chat';
		//@> api > getUrl

	//@> api 





	return _;
});