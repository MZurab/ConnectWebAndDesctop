define(['v_view'],function(v_view){
	const _ = {};
	const CONST = {};
	const templates = {};

	templates['msgCenterSimpleText'] = `
		<div class="centerMsgInChatView">{{content}}</div>
	`;
	templates['msgFrom'] = `
		<!--<div class="messagesInChatView fromMeMessageInChatView {{#if note}}noteMessage{{/if}}" connect_msg="{{msgId}}" appear-parent='#leftBlockInViewWindow'>-->
		   <div class="lineInFromMeMessage">
		      <div class="lineInBoxInLine">
		         {{#if timeSentText}}
			         <div class="topCircleInMessages"></div>
			         <div class="timeTopInMessages">{{timeSentText}}</div>
		         {{/if}}

		         
	         	<div class="botCircleInMessages" {{#if timeDeliveredText}}{{else}}style="display:none;"{{/if}}  {{#if timeDeliveredText}}title="{{timeDeliveredText}}"{{/if}}></div>
	         	<div class="timeBotInMessages" {{#if timeReadText}}{{else}}style="display:none;"{{/if}}>{{#if timeReadText}}{{timeReadText}}{{/if}}</div>

		      </div>
		   </div>
		   <div class="contentTextInFromMeMessage">{{content}}</div>
		<!--</div>-->
	`;

	templates['msgTo'] = `
		<!--<div class="messagesInChatView toMeMessageInChatView {{#if note}}noteMessage{{/if}}" connect_msg="{{msgId}}" appear-parent='#leftBlockInViewWindow'>-->
		   <div class="lineInToMeMessage">
		      <div class="lineInBoxInLine">
				 {{#if timeSentText}}
			         <div class="topCircleInMessages"></div>
			         <div class="timeTopInMessages">{{timeSentText}}</div>
		         {{/if}}
		         
		         <div class="botCircleInMessages" {{#if timeDeliveredText}}{{else}}style="display:none;"{{/if}}  {{#if timeDeliveredText}}title="{{timeDeliveredText}}"{{/if}}></div>
	         	<div class="timeBotInMessages" {{#if timeReadText}}{{else}}style="display:none;"{{/if}}>{{#if timeReadText}}{{timeReadText}}{{/if}}</div>

		      </div>
		   </div>
		   <div class="contentTextInToMeMessage">{{content}}</div>

		<!--</div>-->
	`;
	templates['msgBox'] = `
		<div class="messagesInChatView {{#if fromMe}}fromMeMessageInChatView{{/if}}{{#if toMe}}toMeMessageInChatView{{/if}} {{#if note}}noteMessage{{/if}}" connect_msg="{{msgId}}" appear-parent='#leftBlockInViewWindow'>
			{{boxContent}}
		</div>
	`;

	function addCenterSimpleTextToChatPage ( iNdata, iNchatId ) {
        var iNneedView = "#leftBlockInViewWindow .ChatViewInAppWindow[connect_chatid='"+iNchatId+"']";
        $( iNneedView ).append( getCenterSimleTextBlock ( iNdata ) );
	}
	_['addCenterSimpleTextToChatPage'] = addCenterSimpleTextToChatPage;

		function getCenterSimleTextBlock (iNdata) {
			/*
				@inputs
					@required
						iNdata
							@required
								content
							@optional
			*/
			var temp = Template7.compile(templates['msgCenterSimpleText']);
			return temp(iNdata);
		}
		_['getCenterSimleTextBlock'] = getCenterSimleTextBlock;

	// 
});