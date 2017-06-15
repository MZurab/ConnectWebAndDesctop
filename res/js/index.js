//@< work with bot loader
	//view
	function rConnect_vBotLoader () {
	  var heightBotLoader = $( "#bottomViewInMsgBlock" ).height() * -1;
	  $( "#bottomViewInMsgBlock" ).animate(
		  {
		    top: heightBotLoader,
		    opacity:1,
		  }, 
		  300, 
		  function() {
		    // Animation complete.
		  }
	  );
	}
	//hide
	function rConnect_hBotLoader () {
	  var heightBotLoader = $( "#bottomViewInMsgBlock" ).height()+10;
	  $( "#bottomViewInMsgBlock" ).animate(
		  {
		    top: heightBotLoader,
		    opacity:0,
		  }, 
		  125, 
		  function() {
		    // Animation complete.
		  }
	  );
	}
//> work with bot loader

//@< work with left loader
	//view
	function rConnect_vRightLoader () {
	  $( "#subViewInViewAndChatBlock" ).animate(
		  {
		    width: '65%',
		  }, 
		  300, 
		  function() {
		    // Animation complete.
		  }
	  );
	}
	//hide
	function rConnect_hRightLoader () {
	   $( "#subViewInViewAndChatBlock" ).animate(
		  {
		    width: '100%',
		  }, 
		  300, 
		  function() {
		    // Animation complete.
		  }
	  );
	}
//> work with left loader

$(document).ready(function () {
	
	Connect_getMyChats();
	$(".usersBlockContainerInMenusBlock").on("click", '.iconBlockInUserBlock, .usersNameInUserBlock', function(event){
		// РѕР±СЂР°Р±РѕС‚С‡РёРє РґР»СЏ РѕС‚СЂС‹С‚РёРµ С‡Р°С‚ РѕРєРЅР°
	    var el = $(this).parents('.usersBlockInMenusBlock').attr('connect_chatid');
	    Connect_openChat(el);
	});
	$('#sendButtonInSenderBlock.sendTextMsgButton').click(function(){
		// РѕР±СЂР°Р±РѕС‚С‡РёРє РґР»СЏ РѕС‚РїСЂР°РІРєРё СЃРѕРѕР±С‰РµРЅРёРµ
		Connect_sendTextMsg();
	});
	$( "#forTextInputInSenderBlock textarea" ).keypress(function() {
	   // РѕР±СЂР°Р±РѕС‚С‡РёРє РґР»СЏ Р¶РёРІРѕРіРѕ С‚РµРєСЃС‚Р°
	   Connect_addTextMsgToLive();
	});
});