define(['jquery','v_category','m_view','m_app','m_user'], function ( $, VIEW, M_VIEW, M_APP,USER) {
	const _ = {'view':VIEW};
	const CONST = {
	};



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
        var uuid, chatId=iNdata.chatId,userName;
        var  DomBloc, lmsg_text, lmsg_time, countNewMessages, newMsgBlock, verificate;

        var chatLength = VIEW.findChatBlock(chatId);
        if(  chatLength < 1 ) {
        		//CHANGE STATIC PARAMS
                // chatType = 'private';
                uuid = userForPrivateChat(chatId);
        		var objForCreateChat = iNdata;
        			objForCreateChat['userId'] 		= uuid;
        			objForCreateChat['chatType'] 	= chatType;


                VIEW.createChatList (objForCreateChat);
                VIEW.setEffectsForChatList(chatId);
                VIEW.onClickToChatList(objForCreateChat['chatId'],function (iNobj,iNthis) {
                	var hrefForOpenApp = 'chatName='+iNobj['chatName']+'&chatId='+iNobj['chatId']+'&chatIcon='+iNobj['chatIcon']+'&userLogin='+iNobj['login']+'&uid='+iNobj['uid'];

                	//< safe add online
	                	let thisOnline = $(iNthis).closest('.mix.usersBlockInMenusBlock').attr('connect_online');
	                	if(typeof thisOnline == 'string' && thisOnline.length > 0) {
	            			hrefForOpenApp += '&online='+thisOnline
	                	}
                	//> safe add online
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

        // change user state 
    		if(  typeof(iNdata.userOnline) != 'undefined' ) {
    			if( iNdata.userOnline == 1) {
    				// set user online
    				VIEW.domChangeAddUserOnlineFlag(iNchatId);
    				VIEW.domChangeDidOnlineChatHeader(iNchatId);

    			} else {
    				// set user offline
    				VIEW.domChangeRemoveUserOnlineFlag(iNchatId,iNdata.userOnline);
    				VIEW.domChangeDidOfflineChatHeader(iNchatId,iNdata.userOnline);

    			}
    		}
        
	    if( typeof(iNdata.liveData) != 'undefined' &&  typeof(iNdata.liveType) != 'undefined' &&  typeof(iNdata.liveUser) != 'undefined' && USER.getMyId() != iNdata.liveUser) {
	        
	        switch(iNdata.liveType) {
	            case 1: // simple text chat

	                VIEW.domLiveSimpleTextAnimation(iNchatId,iNdata);
	            break;
	        }

	        VIEW.startEffHideLiveInChatsList(iNchatId);
	    }
	}
    _['domChangeChatBlock'] = domChangeChatBlock;

   

    

	return _;
});