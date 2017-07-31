define(['v_view'],function(v_view){
	const _ = {};
	const templates = {};
	//< template for modal window
		    templates['fullWindow'] = `
				<div class="appModalFullWindow background {{#if attr}}{{attr}}{{/if}}">
					{{#if defaultHeaderBlock}}
					    <div class="headerForAppFullWindow background">
							{{#if defaultCloseButton}}
					    		<div class="closeButtonInHeaderForAppFullWindow"></div>
					    	{{/if}}
						</div>
					{{/if}}
				    <div class="contentForAppFullWindow background">
				    	{{content}}
				    </div>
				</div>
			`;
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
			var temp = Template7.compile(templates['fullWindow']), selector = 'body #container';
			v_view.d_addDataToViewEl(selector,temp(iNdata)); console.log('temp(iNdata)',temp(iNdata))
		}
		_['addFullWindowByTemplate'] = addFullWindowByTemplate;

		function showFullWindow () {
			/*
				@discr
					hide full window element
				@inputs
					@required
			*/
			$('.appModalFullWindow').show();
			
		}
		_['showFullWindow'] = showFullWindow;

		function hideFullWindow () {
			/*
				@discr
					hide full window element
				@inputs
					@required
			*/
			$('.appModalFullWindow').hide();
			
		}
		_['hideFullWindow'] = hideFullWindow;

		function clearFullWindow () {
			/*
				@discr
					remove full window dom element
				@inputs
					@required
			*/
			$('.appModalFullWindow').remove();
		}
		_['clearFullWindow'] = clearFullWindow;
	//@> work with modal window



	return _;
});