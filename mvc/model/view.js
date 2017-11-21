define(['jquery','dictionary','v_view','sweetalert2'], 
	function ( $, DICTIONARY, VIEW, SWAL ) {
	//<? transactor methods
		function _t_issetDomEl (iNdomElement) {
			return VIEW.d_issetDomEl(iNdomElement,iNaddedData,iNwhere);
		}
		
		function _t_addDataToViewEl (iNdomElement,iNaddedData,iNwhere) {
			VIEW.d_addDataToViewEl(iNdomElement,iNaddedData,iNwhere)
		}
		function _td_setTextInLoader (iNtext) {
			VIEW.setTextInLoader(iNtext)
		}
		
	//>! transactor methods

	//<? base methods
		function _init () {
			/*
				@discr
					create base canvas 
				@inputs
					@required
						iNdomElement -> string
				@return 
					bool
			*/
			_t_addDataToViewEl(
					'body',
					VIEW.initWithObj(
						{
							'arrListApps' : ArrForTemplate_appsForListApps
						}
					),
					'change'
			);
			DICTIONARY.start();
		}

	
		
		

		//<? work with modal windows sweetalert
			function _modalWindow_vError(iName,iNtext){
			    SWAL (
			      iName,
			      iNtext,
			      'error'
			    )
			}
			function _modalWindow_vSuccess(iName,iNtext){
			    SWAL (
			      iName,
			      iNtext,
			      'success'
			    )
			}
		//>! work with modal windows sweetalert
	//>? base methods

	//<? View_listApps 
		var ArrForTemplate_appsForListApps = [
    		{
    			'icon' : 'https://cdn.ramman.net/images/icons/apps/app_chat.png',
    			'dc'   : '[app-chat]',
    			'name' : 'Talking'
    		},
    		{
    			'icon' : 'https://cdn.ramman.net/images/icons/apps/app_market.png',
    			'dc'   : '[app-market]',
    			'name' : 'Market'
    		},
    		{
    			'icon' : 'https://cdn.ramman.net/images/icons/apps/app_onepay.png',
    			'dc'   : '[app-onepay]',
    			'name' : 'OnePay'
    		},
    		{
    			'icon' : 'https://cdn.ramman.net/images/icons/apps/app_sharepay.png',
    			'dc'   : '[app-sharepay]',
    			'name' : 'SharePay'
    		}
    	];
    	//methods
			function getViewListApps() {
        		return VIEW.getViewListApps(ArrForTemplate_appsForListApps);
			}	
	//>! View_listApps 

	//<? work with loader
		// for view loader [optional with determine view by path to output loader]
			function _showLoader (iNid) {
				VIEW.d_showLoader(iNid);
				DICTIONARY.start('.rcontent_loader');
			}
			function _t_closeLoader (iNid) {
				VIEW.d_closeLoader(iNid);
			}
			function _d_setTextInLoaderByKey (iNkey) {
				/*
					@discr
						set text in loader by dictionary key
					@inputs
						@required
							iNtext -> string
					@deps
						function: DICTIONARY -> withString
						function: _t_setTextInLoader

				*/
				var text = DICTIONARY.withString(iNkey);
				_t_setTextInLoader(text);
			}

		// for hide loader  [optional with determine view by path to delete loader]
			
	//>! work with loader
	return {
		
		// showLoader 		: _showLoader,
		// closeLoader 	: _t_closeLoader,

		isset 			: _t_issetDomEl,
		add 			: _t_addDataToViewEl,

		success 		: _modalWindow_vSuccess,
		error 			: _modalWindow_vError,
		// checkAppInList  : _checkAppInList,
		// checkAppInChief : _checkAppInChief,

		init 					: _init,
		view 			: VIEW,
		// d_setTextInLoader 		: _td_setTextInLoader,
		// d_setTextInLoaderByKey 	: _d_setTextInLoaderByKey,

		/* private
			getViewListApps
		*/
	}
});