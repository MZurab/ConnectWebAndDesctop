define(['v_view'],function(v_view){
	const _ = {};
	const templates = {};
	//< template for modal window
		    templates['fullWindow'] = `
				<div class="appModalFullWindow background" {{#if attr}}{{attr}}{{/if}}>
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
			templates['header-miniPage'] = `
				<div class="appPageCloseButton" title="[[appPageCloseTitle]]"></div>
		        <div class="appPageIconDataBlock">
		            <img class="appPageIcon" src="{{icon}}">
		            <div class="appPageDataBlock">
		               <div class="appPageName">{{title}}</div>
		               <div class="appPageDiscr">{{text}}</div>
		            </div>
		        </div>
         	`;

	//@< work with mini page
		function getMiniPageHeader (iNdata) {
			/*
				@discr
					get content by template for header mini page
				@inputs
					@required
						iNdata -> object
							@required
								title 	=> string
								text 	=> string
							@optional
								icon 	=> string
			*/
			var temp = Template7.compile(templates['header-miniPage']);
			return temp(iNdata);
		}
		_['getMiniPageHeader'] = getMiniPageHeader;
	//@> work with mini page
	//----------------------//
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
			// del other pages
			$('.appModalFullWindow.background').remove();
			// get content by template
			var temp = Template7.compile(templates['fullWindow']), selector = 'body #container';
			// add data to view
			v_view.d_addDataToViewEl(selector,temp(iNdata));
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