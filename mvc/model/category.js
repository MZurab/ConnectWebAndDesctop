define(['jquery','v_category','m_view','m_app','m_user'], function ( $, V_CATEGORY, M_VIEW, M_APP,USER) {
	const _ = {'view':V_CATEGORY};




	function getObjectForUpdateChatBlock  (chatBlock) {
        var changeObject = {};
            if( typeof(chatBlock.msg) != 'undefined' ) {
                if( typeof(chatBlock.msg.content) == 'string' ) 	changeObject.lmsgText = chatBlock.msg.content;
                if( typeof(chatBlock.msg.time) != 'undefined' )     changeObject.lmsgTime = chatBlock.msg.time;
            }
            if( typeof(chatBlock.live) != 'undefined' ) {
                if( typeof(chatBlock.live.status) != 'undefined' )  changeObject.liveStatus = chatBlock.live.status;
                if( typeof(chatBlock.live.type) != 'undefined' )    changeObject.liveType = chatBlock.live.type;
                if( typeof(chatBlock.live.data) != 'undefined' )    changeObject.liveData = chatBlock.live.data;
                if( typeof(chatBlock.live.user) != 'undefined' )    changeObject.liveUser = chatBlock.live.user;
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
        var uuid, chatId=iNdata.chatId,userName;
        var  DomBloc, lmsg_text, lmsg_time, countNewMessages, newMsgBlock, verificate;

        var chatLength = V_CATEGORY.findChatBlock(chatId);
        console.log('safeUpdateChatBlock chatObject',chatLength);
        if(  chatLength < 1 ) {
        		//CHANGE STATIC PARAMS
                chatType = 'private';
                uuid = userForPrivateChat(chatId);
        		console.log('safeUpdateChatBlock uuid',uuid);

                V_CATEGORY.createChatList ( 
                    {
                        chatId   : iNdata.chatId,
                        userId 	 : uuid,
                        chatType : chatType
                    } 
                );
                V_CATEGORY.setEffectsForChatList(chatId);
		} 
        domChangeChatBlock (chatId,iNdata);
    }
    _['safeUpdateChatBlock'] = safeUpdateChatBlock;
   
	function domChangeChatBlock (iNchatId,iNdata) {
	    /*
	        change icon,userName,(lmsgText and lmsgTime),new msgCoung in ChatBlock by ChatBlockId and otherNeedData
	        1 - iNchatId (String)
	            defined chat id
	        2 - iNdata
	            new icon src
	    */

	    // increase new msg count by $newMsgCount if it isset
	        if(  typeof(iNdata.newMsgCount) != 'undefined' )	V_CATEGORY.domPlusCountMessages(iNchatId,iNdata.newMsgCount);
	    // change userName if userName isset
	        if(  typeof(iNdata.userName) != 'undefined' ) 		V_CATEGORY.domChangeUserNameInChatBlock(iNchatId,iNdata.userName);
	    // chat last msg text and last msg time if isset lmsgText
	        if(  typeof(iNdata.lmsgText) != 'undefined' ) 		V_CATEGORY.domChangeLastMsgTextAndTimeInChatBlock(iNchatId,iNdata);
	    // change icon if it isset
	        if(  typeof(iNdata.icon) != 'undefined' ) 			V_CATEGORY.domChangeIconInChatBlock(iNchatId,iNdata.icon);
	    //addVirificateStatusToBlock
	        if( typeof(iNdata.verificate) != 'undefined' && iNdata.verificate == 1) V_CATEGORY.domAddVerificateStatusToChatBlock(iNchatId);

	    if( typeof(iNdata.liveStatus) != 'undefined' &&  typeof(iNdata.liveData) != 'undefined' &&  typeof(iNdata.liveType) != 'undefined' &&  typeof(iNdata.liveUser) != 'undefined' && USER.getMyId() != iNdata.liveUser){
	        switch(iNdata.liveType) {
	            case 1: // simple text chat
	                V_CATEGORY.domLiveSimpleTextAnimation(iNchatId,iNdata);
	            break;
	        }

	        V_CATEGORY.startEffHideLiveInChatsList(iNchatId);
	    }
	}
    _['domChangeChatBlock'] = domChangeChatBlock;

   

    

	return _;
});