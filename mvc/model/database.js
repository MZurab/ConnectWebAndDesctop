define(['m_firebase'],function( FIREBASE ) {
	const _ = {};
	const CONST = {};



	// set firebase realtime db framework 
	const Datebase = FIREBASE.database;

	function updateRealtimeDb ( iNcollection, iNpath, iNdata ) {
			/*
				@disrc
					start sendidng flesh msg to firebase db
				@inputs
					@required
						iNdata -> object
							type
							data
			*/
    		var baseKey = iNcollection + '/' + iNpath;
			var updateArray = {};
    			updateArray[baseKey] = iNdata;
        	Datebase().ref().update(updateArray);
	}
	_['updateRealtimeDb'] = updateRealtimeDb;

	function getSeverVarTimestamp () {
		return FIREBASE.database.ServerValue.TIMESTAMP ;
	}
	_['getSeverVarTimestamp'] = getSeverVarTimestamp;

	function generateId (iNcollection,iNpath) {
	  var path = iNcollection + '/' + iNpath;
      var generateId = Datebase().ref().child(path).push().key;
      return generateId;
	}
	_['generateId'] = generateId;

	function getDataFromRealtimeDb (iNcollection, iNpath, iNdata) {
    	/*
    		@inputs
    			@required
    				iNcollection 	-> string
    				iNpath 			-> string
				@optional
					iNdata -> object
						limitToLast -> number
						order 		-> array
						type 		-> string
							all (Default)
							child_added
							child_removed
							child_changed
							child_moved
						functionOnSuccess
    	*/
    	if( typeof iNdata != 'object') iNdata = {};
    	var path 	= iNcollection + '/' + iNpath;
        var ref 	= Datebase().ref(path);
        var type 	= iNdata['type']||'all';
        var functionOnSuccess 	= iNdata['functionOnSuccess']||function(){};
        var functionOnError 	= iNdata['functionOnError']||function(){};
        
        if( typeof iNdata['order'] != 'undefined' ) {
        	var order = iNdata['order'];
        	if ( !Array.isArray(order)  ) order = [order];
        	for (var iKey in order ) {
        		ref.orderByChild( order['iKey'] );
        	}
        }

        if( typeof iNdata['limitToLast'] == 'number' ) {
        	var limit = iNdata['limit'];
    		ref.limitToLast( limit );
        }

        switch (type) {
        	case "all": 
        		ref.on('value',functionOnSuccess,functionOnError)
        	break;
        	case "child_added": 
        		ref.on('child_added',functionOnSuccess,functionOnError)
        	break;
        	case "child_removed": 
        		ref.on('child_removed',functionOnSuccess,functionOnError)
        	break;
        	case "child_moved": 
        		ref.on('child_moved',functionOnSuccess,functionOnError)
        	break;
        }

    }
    _['getDataFromRealtimeDb'] = getDataFromRealtimeDb;

	function getData (iNcollection, iNpath, iNdata) {
    	/*
    		@inputs
    			@required
    				iNcollection 	-> string
    				iNpath 			-> string
				@optional
					iNdata -> object
						limitToLast -> number
						order 		-> array
						type 		-> string
							all
							child_added
							child_removed
							child_changed
							child_moved
						functionOnSuccess
    	*/
    	if( typeof iNdata != 'object') iNdata = {};
    	var path 	= iNcollection + '/' + iNpath;
        var ref 	= Datebase().ref(path);
        var type 	= iNdata['type']||'all';
        var functionOnSuccess 	= iNdata['functionOnSuccess']||function(){};
        var functionOnError 	= iNdata['functionOnError']||function(){};
        
        if( typeof iNdata['order'] != 'undefined' ) {
        	var order = iNdata['order'];
        	if ( !Array.isArray(order)  ) order = [order];
        	for (var iKey in order ) {
        		ref.orderByChild( order['iKey'] );
        	}
        }

        if( typeof iNdata['limitToLast'] == 'number' ) {
        	var limit = iNdata['limit'];
    		ref.limitToLast( limit );
        }

        switch (type) {
        	case "all": 
        		ref.once('value',functionOnSuccess,functionOnError)
        	break;
        	case "child_added": 
        		ref.once('child_added',functionOnSuccess,functionOnError)
        	break;
        	case "child_removed": 
        		ref.once('child_removed',functionOnSuccess,functionOnError)
        	break;
        	case "child_moved": 
        		ref.once('child_moved',functionOnSuccess,functionOnError)
        	break;
        }

    }
    _['getData'] = getData;

	return _;
});