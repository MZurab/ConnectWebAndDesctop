define(['jquery','v_category','m_view','m_app','m_user'], function ( $, VIEW, M_VIEW, M_APP,USER) {
	const _ = {'view':VIEW};




	function getObjectForUpdateChatBlock  (chatBlock) {
        var changeObject = {};
            if( typeof(chatBlock.msg) != 'undefined' ) {
                if( typeof(chatBlock.msg.content) == 'string' ) 	changeObject.lmsgText = chatBlock.msg.content;
                if( typeof(chatBlock.msg.time) != 'undefined' )     changeObject.lmsgTime = chatBlock.msg.time;
            }
            if( typeof(chatBlock.live) != 'undefined' ) {
                if( typeof(chatBlock.live.status) 	!= 'undefined' )  changeObject.liveStatus = chatBlock.live.status;
                if( typeof(chatBlock.live.type) 	!= 'undefined' )    changeObject.liveType = chatBlock.live.type;
                if( typeof(chatBlock.live.data) 	!= 'undefined' )    changeObject.liveData = chatBlock.live.data;
                if( typeof(chatBlock.live.uid) 		!= 'undefined' )     changeObject.liveUser = chatBlock.live.uid;
            }
        return changeObject;
    }
    _['getObjectForUpdateChatBlock'] = getObjectForUpdateChatBlock;


    function userForPrivateChat(iNchatId,iNuser){
	    var prefix ='pchat_user_';
	    if(typeof(iNuser) != 'undefined')
	        return M_APP.save(prefix+iNchatId,iNuser);
	    else
	        return M_APP.get(prefix+iNchatId);
	}
    _['userForPrivateChat'] = userForPrivateChat;



    function safeUpdateChatBlock (iNdata,chatType) {
        /*
           	@inputs
	           	iNdata
	                @required
	                    chatId || uuid 
	                    userName
	                    lmsgText
	                    lmsgTime
	                @optional
	                    uuid
	                    newMsgCount
	                    chatType (default 1 private)
					@depends
	                    findChatBlock - for find chatId object
        */
        console.log('safeUpdateChatBlock start');
        console.log('safeUpdateChatBlock iNdata',iNdata);
        var uuid, chatId=iNdata.chatId,userName;
        var  DomBloc, lmsg_text, lmsg_time, countNewMessages, newMsgBlock, verificate;

        var chatLength = VIEW.findChatBlock(chatId);
        console.log('safeUpdateChatBlock chatObject',chatLength);
        if(  chatLength < 1 ) {
        		//CHANGE STATIC PARAMS
                // chatType = 'private';
                uuid = userForPrivateChat(chatId);
        		var objForCreateChat = iNdata;
        			objForCreateChat['userId'] 		= uuid;
        			objForCreateChat['chatType'] 	= chatType;

        		console.log('safeUpdateChatBlock createChatList objForCreateChat',objForCreateChat);

                VIEW.createChatList (objForCreateChat);
                VIEW.setEffectsForChatList(chatId);
                VIEW.onClickToChatList(objForCreateChat['chatId'],function (iNobj) {
                	var hrefForOpenApp = 'chatName='+iNobj['chatName']+'&chatId='+iNobj['chatId']+'&chatIcon='+iNobj['chatIcon']+'&userLogin='+iNobj['login']+'&uid='+iNobj['uid'];
                	console.log('onClickToChatList hrefForOpenApp',hrefForOpenApp);
	        		M_APP.getGlobalVar('engine').passToApp({'app':'chat','page':'index','user':'Zurab','data': hrefForOpenApp});
                });
		} 
        domChangeChatBlock (chatId,iNdata);
    }
    _['safeUpdateChatBlock'] = safeUpdateChatBlock;

    function createPrivateChat () {
        /*
           	@inputs
	           	iNdata
	                @required
	                    chatId || uuid 
	                    userName
	                    lmsgText
	                    lmsgTime
	                @optional
	                    uuid
	                    newMsgCount
	                    chatType (default 1 private)
					@depends
	                    findChatBlock - for find chatId object
        */

    }
    _['createPrivateChat'] = createPrivateChat;
   
	function domChangeChatBlock (iNchatId,iNdata) {
	    /*
	        change icon,userName,(lmsgText and lmsgTime),new msgCoung in ChatBlock by ChatBlockId and otherNeedData
	        1 - iNchatId (String)
	            defined chat id
	        2 - iNdata
	            new icon src
	    */
	    console.log('domChangeChatBlock iNdata',iNdata);
	    // increase new msg count by $newMsgCount if it isset
	        if(  typeof(iNdata.newMsgCount) != 'undefined' )	VIEW.domPlusCountMessages(iNchatId,iNdata.newMsgCount);
	    // change userName if userName isset
	        if(  typeof(iNdata.chatName) != 'undefined' ) 		
        		VIEW.domChangeChatNameInChatBlock(iNchatId,iNdata.chatName); 
	        else {
		   		// change userPhone if userName isset
		        if(  typeof(iNdata.userPhone) != 'undefined' ) 		VIEW.domChangeChatNameInChatBlock(iNchatId,iNdata.userPhone);

	        }

	    // chat last msg text and last msg time if isset lmsgText
	        if(  typeof(iNdata.lmsgText) != 'undefined' ) 		VIEW.domChangeLastMsgTextAndTimeInChatBlock(iNchatId,iNdata);

	    // chat last msg text and last msg time if isset lmsgText
	        if(  typeof(iNdata.login) != 'undefined' ) 			VIEW.domChangeLoginInChatBlock(iNchatId,iNdata);
	    // change icon if it isset
	        if(  typeof(iNdata.icon) != 'undefined' ) 			VIEW.domChangeIconInChatBlock(iNchatId,iNdata.icon);
	    //addVirificateStatusToBlock
	        if( typeof(iNdata.verificate) != 'undefined' && iNdata.verificate == 1) VIEW.domAddVerificateStatusToChatBlock(iNchatId);

        console.log('domChangeChatBlock USER.getMyId()',USER.getMyId());
        console.log('domChangeChatBlock iNdata.liveUser',  iNdata.liveUser );
        console.log('domChangeChatBlock iNdata.liveType', iNdata.liveType );
        console.log('domChangeChatBlock iNdata.liveData', iNdata.liveData );
	    if( typeof(iNdata.liveData) != 'undefined' &&  typeof(iNdata.liveType) != 'undefined' &&  typeof(iNdata.liveUser) != 'undefined' && USER.getMyId() != iNdata.liveUser) {
	        	console.log('domChangeChatBlock start switch');
	        switch(iNdata.liveType) {
	            case 1: // simple text chat

	        	console.log('domChangeChatBlock start switch case 1');
	                VIEW.domLiveSimpleTextAnimation(iNchatId,iNdata);
	            break;
	        }

	        VIEW.startEffHideLiveInChatsList(iNchatId);
	    }
	}
    _['domChangeChatBlock'] = domChangeChatBlock;

   

    

	return _;
});