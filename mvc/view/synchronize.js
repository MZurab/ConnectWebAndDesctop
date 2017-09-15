define([ 'jquery', 'template7', 'v_view'],function( $, Template7, V_VIEW ) {
	const _ = {};
	const CONST = {'name':'base','pageIndex':'index'};
	const templates = {};

	templates['frameSynchronize'] = `
		<iframe id="frameSynchronize" class='frameSynchronize frames' src="https://ramman.net/api/service/synchronize/subdomain/{{login}}"></iframe>
	`;

	_['templates'] = templates;



	function safeAddFrameSynchronize (iNdata) {
		/*
			@inputs
				@required
					iNdata
						@required
							login
						@optional
		*/
		clearFrameSynchronize();
		addFrameSynchronize(iNdata);
	}
	_['safeAddFrameSynchronize'] = safeAddFrameSynchronize;

		function addFrameSynchronize (iNdata) {
			/*
				@inputs
					@required
						iNdata
							@required
								login
							@optional
			*/
			var html = getFrameSynchronize(iNdata);
			var path = "body";
			V_VIEW.d_addDataToViewEl(path,html,'after');
		}
		_['addFrameSynchronize'] = addFrameSynchronize;
			function getFrameSynchronize (iNdata) {
				/*
					@inputs
						@required
							iNdata
								@required
									login
								@optional
				*/
				var temp = Template7.compile(templates['frameSynchronize']);
				return temp(iNdata);
			}
			_['getFrameSynchronize'] = getFrameSynchronize;
		function clearFrameSynchronize () {
			/*
				@inputs
					@required
						iNdata
							@required
								login
							@optional
			*/
			$('.frames.frameSynchronize').remove();
		}
		_['clearFrameSynchronize'] = clearFrameSynchronize;
	

	





	return _;
});