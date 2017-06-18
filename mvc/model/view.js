define(['jquery','dictionary','v_view','sweetalert2'], 
	function ($,Dictionary,v_view,swal) {
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
			_addDataToViewEl(
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

		function _issetDomEl (iNdomElement) {
			/*
				@discr
					check dom element for isset
				@inputs
					@required
						iNdomElement -> string
				@return 
					bool
			*/
			if($(iNdomElement).length >0) return true;
			return false;
		}
		
		function _addDataToViewEl (iNdomElement,iNaddedData,iNwhere) {
			/*
				@inputs
					@required
						iNdomElement -> string
						iNaddedData -> string | object of dom
					@optional
						iNwhere -> string [default = begin] [begin, end, before, after]
			*/
			// if( typeof(iNwhere) != 'string')iNwhere='begin';
			switch(iNwhere){
				case "change":
					$(iNdomElement).html(iNaddedData);
				break;

				case "after":
					$(iNdomElement).append(iNaddedData);
				break;

				case "before":
					$(iNdomElement).before(iNaddedData);
				break;

				case "after":
					$(iNdomElement).after(iNaddedData);
				break;

				default: // begin
					$(iNdomElement).prepend(iNaddedData);
				break;
			}
		}
		//<? work with apps
			var GlobalPageName = 'index';
			function checkAppInList_ (iNapp,iNpage) {
				/*
					@discr
						check for isset in list side by app code (iNapp) [and by page (iNpage)]
					@inputs
						@required
							iNapp -> string
						@optional
							iNpage -> string
				*/
				var el = ".appLeftMenuWindow .app[app-name='"+iNapp+"']";
				var page = iNpage||GlobalPageName;
				if( typeof(page) == 'string' ) el += el + " .view[view-name='"+page+"']"; // CHANGE DELL
				return _issetDomEl(el);
				
			}
			function checkAppInChief_ (iNapp,iNpage) {
				/*
					@discr
						check for isset in chief window by app code (iNapp) [and by page (iNpage)]
					@inputs
						@required
							iNapp -> string
						@optional
							iNpage -> string
				*/
				var el = "#viewWindow .viewesInWindow.app[app-name='"+iNapp+"']";
				var page = iNpage||GlobalPageName;
				if( typeof(page) == 'string' ) el += el + " .view[view-name='"+page+"']";// CHANGE DELL
				return _issetDomEl(el);
			}
			function _addToViewInChief (iNapp,iNpage) {
				/*NOTREADY
					@discr
						add element to view in chief block
					@inputs
						@required
							iNapp -> string
						@optional
							iNpage -> string
				*/
			}
			function _addToPageInChief (iNapp,iNpage) {
				/*NOTREADY
					@discr
						add element to page from view in chief block
					@inputs
						@required
							iNapp -> string
						@optional
							iNpage -> string
				*/
			}
			function _addToViewInList (iNapp,iNpage) {
				/*NOTREADY
					@discr
						add element to view in list block
					@inputs
						@required
							iNapp -> string
						@optional
							iNpage -> string
				*/
			}
			function createAppInList_ (iNapp,iNpage) {
				/*NOTREADY
					@discr
						crea
					@inputs
						@required
							iNapp -> string
						@optional
							iNpage -> string
				*/
			}
			function createAppInChief_ (iNdata) {
				/*
					@discr
						check for isset in chief window by app code (iNapp) [and by page (iNpage)]
					@inputs
						@required
							iNdata -> object
								app 	-> string
								content -> string
								@optional
									page 	-> string [Default - {GlobalPageName}]
						@optional
					@return
					@deps
						function : _addDataToViewEl
						function : v_view.getApp
						var 	 : GlobalPageName

				*/
				var objForGetTemplate = { 'content':iNdata['content'],'app':iNdata['app']  };

				// set page if specified or set default val = index
					if(typeof(iNdata['page'] == 'string')) 
						objForGetTemplate['page'] = iNdata['page']; 
					else 
						objForGetTemplate['page'] = GlobalPageName;

				// get element passed {page,content,app} in objForGetTemplate for generating apptemplate
					var element = v_view.getApp(objForGetTemplate);
				// get element passed objForGetTemplate for generating template
					_addDataToViewEl(
							'#viewWindow',
							element,
							'begin'
					);
			}
			function createAppPageInChief_ (iNdata) {
				/*
					@discr
						check for isset in chief window by app code (iNapp) [and by page (iNpage)]
					@inputs
						@required
							iNdata -> object
								app 	-> string
								content -> string
								@optional
									page 	-> string [Default - {GlobalPageName}]
						@optional
					@return
					@deps
						function : _addDataToViewEl
						function : v_view.getApp
						var 	 : GlobalPageName

				*/
				var objForGetTemplate = { 'content':iNdata['content'],'app':iNdata['app']  };

				// set page if specified or set default val = index
					if(typeof(iNdata['page'] == 'string')) 
						objForGetTemplate['page'] = iNdata['page']; 
					else 
						objForGetTemplate['page'] = GlobalPageName;

				// get element passed {page,content} in objForGetTemplate for generating page template
					var element = v_view.getPage(objForGetTemplate);
				// get element passed objForGetTemplate for generating template
					_addDataToViewEl(
							"#viewWindow .viewesInWindow.app[app-name='"+iNdata['app']+"']",
							element,
							'begin'
					);
			}

			function _openAppInChief (iNapp,iNpage) {
				/*NOTREADY
					@discr
						check for isset in chief window by app code (iNapp) [and by page (iNpage)]
					@inputs
						@required
							iNapp -> string
						@optional
							iNpage -> string
				*/
			}
			function _openAppInChief (iNapp,iNpage) {
				/*NOTREADY
					@discr
						check for isset in chief window by app code (iNapp) [and by page (iNpage)]
					@inputs
						@required
							iNapp -> string
						@optional
							iNpage -> string
				*/
			}
		//>! work with apps

		//<? work with modal windows sweetalert
			function modalWindow_vError(iName,iNtext){
			    swal.swal (
			      iName,
			      iNtext,
			      'error'
			    )
			}
			function modalWindow_vSuccess(iName,iNtext){
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
		var Loader_lastEl 	= '';
		var html_loader 	= v_view.html_loader;
		// for view loader [optional with determine view by path to output loader]
			function showLoader (iNid) {
				if(typeof(iNid) == 'undefined'){
					iNid = 'body';
				}
				Loader_lastEl = iNid;
				hideLoader(iNid);
			    var el = $(iNid);
				$(iNid).append(html_loader);
				Dictionary.start('.rcontent_loader');
			}

		// for hide loader  [optional with determine view by path to delete loader]
			function hideLoader(iNid) {
				if(typeof(iNid) == 'undefined') 
					iNid = Loader_lastEl; 
				else if(typeof(Loader_lastEl) != 'undefined' && Loader_lastEl.length>0)
					Loader_lastEl = iNid;
				else 
					iNid = 'body';
				$(iNid + ' .rcontent_loader').remove();
			}
	//>! work with loader
	return {
		
		showLoader 		: showLoader,
		hideLoader 		: hideLoader,

		isset 			: _issetDomEl,
		add 			: _addDataToViewEl,
		checkAppInList  : _checkAppInList,
		checkAppInChief : _checkAppInChief,

		init 			: _init
	}
});