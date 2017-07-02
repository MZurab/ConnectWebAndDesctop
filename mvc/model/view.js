define(['jquery','dictionary','v_view','sweetalert2'], 
	function ($,Dictionary,v_view,swal) {
	//<? transactor methods
		function _t_issetDomEl (iNdomElement) {
			return v_view.d_issetDomEl(iNdomElement,iNaddedData,iNwhere);
		}
		
		function _t_addDataToViewEl (iNdomElement,iNaddedData,iNwhere) {
			v_view.d_addDataToViewEl(iNdomElement,iNaddedData,iNwhere)
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
					v_view.initWithObj(
						{
							'arrListApps' : ArrForTemplate_appsForListApps
						}
					),
					'change'
			);
			Dictionary.start();
		}

	
		
		

		//<? work with modal windows sweetalert
			function _modalWindow_vError(iName,iNtext){
			    swal.swal (
			      iName,
			      iNtext,
			      'error'
			    )
			}
			function _modalWindow_vSuccess(iName,iNtext){
			    swal.swal (
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
        		return v_view.getViewListApps(ArrForTemplate_appsForListApps);
			}	
	//>! View_listApps 

	//<? work with loader
		// for view loader [optional with determine view by path to output loader]
			function _showLoader (iNid) {
				v_view.d_showLoader(iNid);
				Dictionary.start('.rcontent_loader');
			}
			function _t_closeLoader (iNid) {
				v_view.d_closeLoader(iNid);
			}

		// for hide loader  [optional with determine view by path to delete loader]
			
	//>! work with loader
	return {
		
		showLoader 		: _showLoader,
		closeLoader 	: _t_closeLoader,

		isset 			: _issetDomEl,
		add 			: _addDataToViewEl,
		checkAppInList  : _checkAppInList,
		checkAppInChief : _checkAppInChief,

		init 			: _init,

		/* private
			getViewListApps
		*/
	}
});