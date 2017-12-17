define(
    ['jquery','v_category','m_view','m_app','m_user','dictionary','sweetalert2', 'url'], 
    function ( $, VIEW, M_VIEW, M_APP,USER, DICTIONARY, SWAL, URL ) {
	const _        = {'view':VIEW};
	const CONST    = {};



	function getObjectForUpdateChatBlock  (chatBlock) {
        var changeObject = {};
            if( typeof(chatBlock.msg) != 'undefined' ) {
                if( typeof(chatBlock.msg.content) == 'string' ) 	changeObject.lmsgText 	= chatBlock.msg.content;
                if( typeof(chatBlock.msg.time) != 'undefined' )     changeObject.lmsgTime 	= chatBlock.msg.time;
                if( typeof(chatBlock.msg.type) != 'undefined' )     changeObject.lmsgType 	= chatBlock.msg.type;
                if( typeof(chatBlock.msg.uid) != 'undefined'  )     changeObject.lmsgUid 	= chatBlock.msg.uid;
            }
            if( typeof(chatBlock.live) != 'undefined' ) {
                if( typeof(chatBlock.live.status) 	!= 'undefined' )  	changeObject.liveStatus = chatBlock.live.status;
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
        console.log('safeUpdateChatBlock - iNdata', iNdata , chatLength );
        if (  chatLength < 1 ) {
        		//CHANGE STATIC PARAMS
                // chatType = 'private';
                uuid = userForPrivateChat(chatId);
        		var objForCreateChat = iNdata;
        			objForCreateChat['userId'] 		= uuid;
        			objForCreateChat['chatType'] 	= chatType;

                // get chat icon
                var chatIcon    = M_APP.getGlobalVar('m_app-chat').getChatIconByType(chatType ,objForCreateChat); objForCreateChat['icon'] = chatIcon;

                console.log('safeUpdateChatBlock createChatList - objForCreateChat', objForCreateChat , chatIcon );
                // create chat
                VIEW.createChatList (objForCreateChat, () => {
                    // after add chat

                    // set animation effect (eg. scroll )
                    VIEW.setEffectsForChatList(chatId);
                    // add on click for this chat event
                    console.log('safeUpdateChatBlock - objForCreateChat',objForCreateChat);
                    VIEW.addOnClickActionForChatList ( objForCreateChat['chatId']);

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
	        if(  typeof(iNdata.lmsgText) != 'undefined' ) 		{
	        	VIEW.domChangeLastMsgTextAndTimeInChatBlock(iNchatId,iNdata);
        	}
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
	        flash_startEffectByDataFromDb (iNchatId,iNdata);
	        VIEW.startEffHideLiveInChatsList(iNchatId);
	    }
	}
    _['domChangeChatBlock'] = domChangeChatBlock;



    function flash_startEffectByDataFromDb (iNchatId,iNdata) {
    	/*
    		@inputs
    			iNchatId -> string
    			iNdata -> object
	    			liveData
	    			liveType
	    			liveUser
	    			liveTime
    	*/
    	switch(iNdata.liveType) {
            case 1: // simple text chat
            	iNdata.liveData = DICTIONARY.withString("[dictionary-symbols]")+ " - "  + iNdata.liveData;
				VIEW.flash_msgSimpleText_activeFlashEffect(iNchatId,iNdata);
            break;
            case 20: // live audio
            	iNdata.liveData = DICTIONARY.withString("[dictionary-seconds]")+ " - " + iNdata.liveData;
				VIEW.flash_msgLiveAudio_activeFlashEffect(iNchatId,iNdata);
            break;
            case 21: // live video
            	iNdata.liveData = DICTIONARY.withString("[dictionary-seconds]")+ " - " + iNdata.liveData;
				VIEW.flash_msgLiveVideo_activeFlashEffect(iNchatId,iNdata);
            break;
        }
    }

   
    function addChatBlockToCategory (iNuserData,iNchatId,iNuserId) {
        // chatType does not work - CHANGE

        // add chatType > chatIcon > uidType
        var chatName    = VIEW.getChatName (iNchatId),
            href        = "chatId=" + iNchatId + "&userId=" + iNuserId + "&chatType=1&back=1&chatName=" + chatName + '&forUserId=' + USER.getActiveUserId();
        var objForCreateChat = {
           'app'            : 'chat', 
           'code'           : 'chiefChat',
           'page'           : 'index',
           'name'           : DICTIONARY.withString('[app-chat]'),
           'id'             : iNchatId,
           'data'           : href,
           'classForATeg'   : 'privateChatBtn',
        };
        iNuserData['categories']['chat'] = {};
        iNuserData['categories']['chat'][iNchatId] = objForCreateChat;
        return true;

    } _['addChatBlockToCategory'] = addChatBlockToCategory;

    function addDisabledChatBlockToCategory (iNuserData,iNuserId,iNuserLogin) {
        // chatType does not work - CHANGE
        if ( USER.getMyId() ) {
            // if we are auth user -> we created link for create chat
            var objForCreateChat = {
               'app'            : 'chat', 
               'code'           : 'chiefChat',
               'page'           : 'index',
               'name'           : DICTIONARY.withString('[app-chat]'),
               'id'             : iNuserId,
               'classForATeg'   : 'viewCategoryPrompt',//
               'attrForATeg'    : `categoryUserId='${iNuserId}' categoryUserLogin='${iNuserLogin}' activeUserId='${USER.getActiveUserId()}'`,
            };
        } else {
            // if we are NON authed user -> we created link for view error
            var objForCreateChat = {
               'app'            : 'chat', 
               'code'           : 'chiefChat',
               'page'           : 'index',
               'name'           :  DICTIONARY.withString('[app-chat]'),
               'id'             :  iNuserId,
               'classForATeg'   :  'viewError',
               'attrForATeg'    :  "errorText='[phrase-needSignForChat]'",

            };
        }
        
        iNuserData['categories']['chat'] = {};
        iNuserData['categories']['chat'][iNuserId] = objForCreateChat;
        return true;
    }
    _['addDisabledChatBlockToCategory'] = addDisabledChatBlockToCategory;
    
    

	return _;
});