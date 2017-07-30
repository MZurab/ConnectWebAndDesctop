define([],function(){
	const result = {};
	//@< work with modal window
		function addFullWindowByTemplate (iNdata) {
			/*
				@discr
					add content by template to chief @container
				@inputs
					@required
						iNdata -> object
							@required
								content
							@optional
								defaultHeader => bool
								defaultCloseButton => bool
			*/
			var temp = Template7.compile(iNdata), selector = 'body #container';
			v_view.addDataToViewEl(selector,temp(iNdata));
		}
		result['addFullWindowByTemplate'] = addFullWindowByTemplate;

		function showFullWindow () {
			/*
				@discr
					hide full window element
				@inputs
					@required
			*/
			$('.appModalFullWindow').show();
			
		}
		result['showFullWindow'] = showFullWindow;

		function hideFullWindow () {
			/*
				@discr
					hide full window element
				@inputs
					@required
			*/
			$('.appModalFullWindow').hide();
			
		}
		result['hideFullWindow'] = hideFullWindow;

		function clearFullWindow () {
			/*
				@discr
					remove full window dom element
				@inputs
					@required
			*/
			$('.appModalFullWindow').remove();
		}
		result['clearFullWindow'] = clearFullWindow;
	//@> work with modal window



	return result;
});