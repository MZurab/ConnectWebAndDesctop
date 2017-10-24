define(['jquery', 'progressbar'],function($, PROGRESSBAR ) {
	console.log('PROGRESSBAR',PROGRESSBAR);
	window.ProgressBar = PROGRESSBAR;

	const _ 	= {};
	const CONST = {};

	function init (iNselector, iNprogress, iNdata) {
		var r 	= {};
		var bar;

		function start (iNselector, iNprogress, iNdata) {
			/*
				@inputs
					@required
						iNselector -> string
					@optional
						iNprogress 			-> float (from 0.0 to 1.0)
						iNdata 				-> object
							color 			-> string
							duration 		-> int
							#from: section
								colorFrom 	-> string
								widthFrom 	-> int
							#to: section
								colorTo 	-> string
								widthTo		-> int
							fontFamily 		-> int
							fontSize 		-> int
							easing 			-> int
							duration 		-> int
			*/
			var container 	= $(iNselector).get(0),
				color 		= iNdata['color']		|| '#000',
				duration 	= iNdata['duration']	|| 1000,
				colorFrom 	= iNdata['colorFrom']	|| '#aaa',
				widthFrom 	= iNdata['widthFrom']	|| 1,
				widthTo 	= iNdata['widthTo']		|| 4,
				colorTo 	= iNdata['colorTo']		|| '#000',
				fontSize 	= iNdata['fontSize']	|| '1rem',
				easing 		= iNdata['easing']		|| 'easeInOut',
				fontFamily  = iNdata['fontFamily']	|| '"Raleway", Helvetica, sans-serif',
				progress    = iNprogress;
			  bar = new PROGRESSBAR.Circle( container, {
			  color: 		color,
			  // This has to be the same size as the maximum width to 
			  // prevent clipping
			  strokeWidth: 	4,
			  trailWidth: 	1,
			  easing: 		easing,
			  duration: 	duration,
			  text: {
			    autoStyleContainer: false
			  },
			  from: 	{ color: colorFrom, width: widthFrom },
			  to: 		{ color: colorTo, width: widthTo },
			  // Set default step function for all animate calls
			  step: function(state, circle) {
			    circle.path.setAttribute('stroke', state.color);
			    circle.path.setAttribute('stroke-width', state.width);

			    var value = Math.round(circle.value() * 100);
			    if (value === 0) {
			      circle.setText('');
			    } else {
			      circle.setText(value);
			    }

			  }
			});
			bar.text.style.fontFamily 	= fontFamily;
			bar.text.style.fontSize 	= fontSize;

			to(progress);

			return r;
		}
		r['start'] = start;

		function to (iNprogress) {
			if( typeof iNprogress == 'number' )
				bar.animate(iNprogress);  // Number from 0.0 to 1.0
		}
		r['to'] = to;


		return start(iNselector, iNprogress, iNdata);
	}
	_['init'] = init;
	

	return _;
});