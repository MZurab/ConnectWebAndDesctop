define(
	['jquery','template7','v_view'], 
	function ($,Template7,v_view) {


		var View_boxForChatList = `
            <div class="scrolBlockForChat" id="MixItUpFC43CB">
            	{{chats_list}}
            </div>
        `;
	        // @input [uid, iconBig, chatId, icon, userName, lastMsgTime]
		        var View_chatListEl = `
			        <div class="mix usersBlockInMenusBlock" connect_uid="{{uid}}" connect_chatid="{{chatId}}" data-lastmsgtime="{{lastMsgTime}}">
					   
					   <div class="iconBlockInUserBlock">
					      <div class="iconInUserBlock">
					      	<img class="lazy" data-original="{{iconBig}}" src="{{icon}}">
					      </div>
					      <div class="typeInUserBlock"></div>
					   </div>

					   <div class="firstLineInUserBlock">
					      <div class="usersNameInUserBlock">
					         <div class="userNameInChatList">{{userName}}</div>
					      </div>
					      <div class="toCallBlockInUserNameBlock">
					         <div class="btnToVoiceCallInFirstLine"></div>
					         <div class="btnToVideoCallInFirstLine"></div>
					      </div>
					   </div>

					   <div class="secondLineInUserBlock">
					      <div class="leftBlockInSecondLine">
					         <div class="liveStatusTextBlock liveBlocks">
					            <div class="liveStatusTextWriting"></div>
					            <div class="valueInLiveBlocks">
					               Печатает... 
					               <span class="printingAmount"></span>
					            </div>
					         </div>
					      </div>
					      <div class="rightBlockInSecondLine">
					      	<span class="newMsgInSecondLine"></span>
			      		  </div>
					   </div>

					   <div class="thirdLineInUserBlock">
					      <div class="leftBlockInThirdLine">
					        <div class="lastMessageInThirdLine"></div>
					      </div>
					      <div class="rightBlockInThirdLine">
					         <div class="timelastMsgInThirdLine">{{lastMsgTime}}</div>
					      </div>
					   </div>

					</div>
				`;
		/*
			Printing... 
            <span class="printingAmount">
              <span style="visibility: visible;"></span>
              <ul class="texts" style="display: none;">
                 <li></li>
              </ul>
            </span>

			<span style="visibility: hidden;">
            	<span class="word1" style="display: inline-block; transform: translate3d(0px, 0px, 0px);">
	            	<span class="char1" style="display: inline-block; visibility: visible;">d</span>
	            	<span class="char2" style="display: inline-block; visibility: visible;">d</span>
	            	<span class="char3" style="display: inline-block; visibility: visible;">d</span>
	            	<span class="char4" style="display: inline-block; visibility: visible;">d</span>
	            	<span class="char5" style="display: inline-block; visibility: visible;">d</span>
	            	<span class="char6" style="display: inline-block; visibility: visible;">d</span>
        		</span> 
    		</span>
            <ul class="texts" style="display: none;">
               <li class="current">{{lastMsg}}</li>
            </ul>

			uid
			iconBig
			chatId
			icon
			userName
			lastMsgTime
			lastMsgText
		*/
        function getChatElList (iNdata) {
        	/*
        		@inputs
        			iNdata -> object
        				uid 		-> String
        				iconBig 	-> String
        				chatId 		-> String
        				icon 		-> String
        				userName 	-> String
        				lastMsgTime -> String
        	*/
        	var temp = Template7.compile(View_chatListEl);
        	return temp(iNdata);
        }
		function _dom_createChat (iNdata) { // Connect__createChatBlock
        	/*
        		@inputs
        			iNdata -> object
        				uid 		-> String
        				iconBig 	-> String
        				chatId 		-> String
        				icon 		-> String
        				userName 	-> String
        				lastMsgTime -> String
        	*/
        	var data = getChatElList(iNdata);
        	$('.usersBlockContainerInMenusBlock .scrolBlockForChat').prepend(DomBloc);
        }

		return {
			vLoader  : vLoader,
			hLoader	 : hLoader,
			getViewListApps	 : _getViewListApps,
		}

	}
);