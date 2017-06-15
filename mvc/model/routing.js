define([],function(){
	//@<<< URL FUNCTIONS
		function Connect_goToUrl (iNurl) {
			/*
				@inputs
				@example
					Connect_goToUrl('/zurab')
			*/
			 if(navigator.userAgent.match(/Android/i)) 
			    document.location=iNurl;      
			  else
			    window.top.location.replace(iNurl);
		}
		function Connect_urlSet (iNurl) {
			/*
				@inputs
				@example
					Connect_urlSet('/zurab')
			*/
		    try {
		      history.pushState(null, null, iNurl);
		      return;
		    } catch(e) {}
		    location.hash = '#' + iNurl;
		}
		function Connect_urlGetDomain (iNnumber) {
			/*
				@inputs
				@example
					Connect_urlGetDomain(1)
			*/
			var loc 	= location.host;

			if(typeof(iNnumber) != 'number') return loc;
			var locArr 	= loc.split('.'); iNnumber--;
			if(typeof(locArr[iNnumber]) != 'undefined')
				return locArr[iNnumber];
			else 
				return null;
		}
		function Connect_urlGetPath (iNnumber) {
			/*
				@inputs
				@example
					Connect_urlGetPath(1)
			*/
			var loc 	= location.pathname;
			if(typeof(iNnumber) != 'number') return loc;
			var locArr 	= loc.split('/').splice(1);
			if(iNnumber == 0) return locArr;
			if(typeof(locArr[iNnumber]) != 'undefined')
				if(typeof(locArr[iNnumber]) == 'string' && locArr[iNnumber].length > 0)
					return locArr[iNnumber];
			return null;
		}
		function Connect_urlGetLength () {
			/*
				@inputs
				@example
					Connect_urlGetLength(1)
			*/
			var loc 	= location.pathname;
			var locArr 	= loc.split('/').splice(1),
				count   = 0;
			for(var iKey in locArr) {
				if(locArr[iKey].length > 0 )count ++
			}
			return count;
		}
		
		return {
			goToUrl 	: Connect_goToUrl,
			setUrl  	: Connect_urlSet,
			getDomain 	: Connect_urlGetDomain,
			getUrlPath 	: Connect_urlGetPath,
			getUrlLength: Connect_urlGetLength,
		}
	//@>>> URL FUNCTIONS
});
/*
	@schema
		url
*/