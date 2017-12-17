define(['m_firebase', 'algolia'],function( FIREBASE, ALGOLIA ) {
    const _ = {};
    const CONST = {};

    //@< algolia
        var algoliaClient = ALGOLIA('OKSL1FNILG', 'c6cadc6f629b4daf66c5b78e4a9ab343');
        _['algolia'] = algoliaClient;
        // var index = client.initIndex('YourIndex');
    //@> algolia

    // set firebase realtime db framework 
    const Datebase      = FIREBASE.database;
    const Datebase2     = FIREBASE.firestore;
    const fstore        = _;
          window.fstore = fstore;
    window.db2 = Datebase2;


    function getBatchFirestoreDb (iNdb) {
        return iNdb.batch();
    }
    _['getBatchFirestoreDb'] = getBatchFirestoreDb;

    function runBatchFirestoreDb (iNfirestoreBatch, iNfunctions) {
        if(typeof iNfunctions != 'object') iNfunctions = {};
          // Commit the batch
          iNfirestoreBatch.commit().then(function () {
              if(typeof iNfunctions['onSuccess'] == 'function') iNfunctions['onSuccess'] ();
          });
    }
    _['runBatchFirestoreDb'] = runBatchFirestoreDb;

    function getFirestoreDb () {
        return Datebase2();
    }
    _['getFirestoreDb'] = getFirestoreDb;


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

        function updateFirestoreDb ( iNcollection, iNpath, iNdata, iNfunctions) {
            /*
                @disrc
                    start sendidng flesh msg to firebase db
                @inputs
                    @required
                        iNdata -> object
                            type
                            data
                    @optional
                        iNfunctions -> function
                            onSuccess -> function
                            onError -> function
            */
            if(typeof iNfunctions != 'object') iNfunctions = {};

            var baseKey = iNcollection + '/' + iNpath;

            var docRef = Datebase2().doc(baseKey);
            console.log("updateFirestoreDb baseKey ", baseKey);
            console.log("updateFirestoreDb iNdata ", iNdata);
            // Update the timestamp field with the value from the server
            var updateTimestamp = docRef.update(iNdata).then(function(docRef) {
                console.log("updateFirestoreDb Document written with ID: ", docRef.id);
                if(typeof iNfunctions['onSuccess'] == 'function' ) iNfunctions['onSuccess'](docRef);
            })
            .catch(function(error) {
                console.log(" updateFirestoreDb error", error);
                if(typeof iNfunctions['onError'] == 'function' ) iNfunctions['onError']();
            });
        }
        _['updateFirestoreDb'] = updateFirestoreDb;

        function safeUpdateFirestoreDb ( iNcollection, iNpath, iNdata, iNfunctions , iNdb) {
            /*
                @disrc
                    safe update firestore db
                @inputs
                    @required
                        iNcollection -> string
                        iNpath -> string
                        iNdata -> object
                            type
                            data
                    @optional
                        iNfunctions -> function
                            onSuccess -> function
                            onError -> function
            */
            if(typeof iNfunctions != 'object') iNfunctions = {};

            var baseKey = iNcollection + '/' + iNpath, docRef;

            if ( typeof iNdb != 'undefined')
                docRef = iNdb.doc(baseKey);
            else
                docRef = Datebase2().doc(baseKey);

            console.log('safeUpdateFirestoreDb baseKey, iNdata',baseKey, iNdata);
            // Update the timestamp field with the value from the server
            var updateTimestamp = docRef.set(iNdata,{ merge : true }).then(function(docRef) {
                console.log('safeUpdateFirestoreDb SUCCESS baseKey, docRef',baseKey, docRef);
                if(typeof iNfunctions['onSuccess'] == 'function' ) iNfunctions['onSuccess'](docRef);
            })
            .catch(function(error) {
                console.log('safeUpdateFirestoreDb EROR baseKey, error',baseKey, error);
                if(typeof iNfunctions['onError'] == 'function' ) iNfunctions['onError']();
            });
        }
        _['safeUpdateFirestoreDb'] = safeUpdateFirestoreDb;


    function addRealtimeDb ( iNcollection, iNpath, iNdata ) {
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
            Datebase().ref(baseKey).set(iNdata);
    }
    _['addRealtimeDb'] = addRealtimeDb;

    function addFirestoreDb ( iNcollection, iNpath, iNdata , iNfunctions) {
            /*
                @disrc
                @inputs
                    @required
                        iNdata -> object
                            type
                            data
                    @optional
                        iNfunctions -> function
                            onSuccess -> function
                            onError -> function
            */
            if(typeof iNfunctions != 'object') iNfunctions = {}
            var baseKey = iNcollection + '/' + iNpath,
                ref,
                typeAdd;


            var lengthBaseKey = baseKey.split('/').length;
            console.log('addFirestoreDb baseKey,lengthBaseKey',baseKey,lengthBaseKey );
            if(lengthBaseKey  % 2 == 0) {
                ref = Datebase2().doc(baseKey);
                typeAdd = 'set';
            } else {
                ref = Datebase2().collection(baseKey);
                typeAdd = 'add';
            }


            console.log("addFirestoreDb typeAdd ", typeAdd);
            console.log("addFirestoreDb iNdata ", iNdata);
            return ref[typeAdd](iNdata).then(function(docRef) {
                console.log("addFirestoreDb Document written with ID: ", docRef);
                if(typeof iNfunctions['onSuccess'] == 'function' ) iNfunctions['onSuccess']();
            })
            .catch(function(error) {
                console.log("addFirestoreDb  error", error);
                if(typeof iNfunctions['onError'] == 'function' ) iNfunctions['onError']();
            });
    }
    _['addFirestoreDb'] = addFirestoreDb;


    function getSeverVarTimestamp () {
        return FIREBASE.database.ServerValue.TIMESTAMP ;
    }
    _['getSeverVarTimestamp'] = getSeverVarTimestamp;

    function getFirestoreSeverVarTimestamp () {
        return FIREBASE.firestore.FieldValue.serverTimestamp();
    }
    _['getFirestoreSeverVarTimestamp'] = getFirestoreSeverVarTimestamp;


    function isFirestoreLocalMutation (doc) {
        console.log('isFirestoreLocalMutation doc',doc);
        return doc.et.hasLocalMutations;
    }
    _['isFirestoreLocalMutation'] = isFirestoreLocalMutation;



    function generateIdForRealtimeDbByFullPathToDb (iNcollection,iNpath) {
      var path = iNcollection + '/' + iNpath;
      var generateIdForRealtimeDbByFullPathToDb = Datebase().ref().child(path).push().key;
      return generateIdForRealtimeDbByFullPathToDb;
    }
    _['generateIdForRealtimeDbByFullPathToDb'] = generateIdForRealtimeDbByFullPathToDb;


    function generateIdForFirestoreByFullPathToDb (iNcollection,iNpath) {
      var path = iNcollection + '/' + iNpath;

      console.log('generateIdForFirestoreByFullPathToDb path', path);
      var generateIdForRealtimeDbByFullPathToDb = Datebase2().collection(path).doc();
      return generateIdForRealtimeDbByFullPathToDb.id;
    }
    _['generateIdForFirestoreByFullPathToDb'] = generateIdForFirestoreByFullPathToDb;

    function getDataFromRealtimeDb (iNcollection, iNpath, iNdata) {
        /*
            @inputs
                @required
                    iNcollection    -> string
                    iNpath          -> string
                @optional
                    iNdata -> object
                        limitToLast -> number
                        order       -> array
                        type        -> string
                            all (Default)
                            child_added
                            child_removed
                            child_changed
                            child_moved
                        functionOnSuccess
        */
        if( typeof iNdata != 'object') iNdata = {};
        var path    = iNcollection + '/' + iNpath;
        var ref     = Datebase().ref(path);
        var type    = iNdata['type']||'all';
        var functionOnSuccess   = iNdata['functionOnSuccess']||function(){};
        var functionOnError     = iNdata['functionOnError']||function(){};
        
        if( typeof iNdata['order'] != 'undefined' ) {
            var order = iNdata['order'];
            if ( !Array.isArray(order)  ) order = [order];
            for (var iKey in order ) {
                ref.orderByChild( order[iKey] );
            }
        }

        if( typeof iNdata['limitToLast'] == 'number' ) {
            var limit = iNdata['limitToLast'];
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

    function getDataFromFirestoreDb (iNcollection,iNpath, iNdata) {
        /*
            @inputs
                @required
                    iNcollection    -> string
                    iNpath          -> string
                @optional
                    iNdata -> object
                        limitToLast -> number
                        order       -> array

                        functionOnGetEmpty 
                        functionOnGetData

        */
         var path    = iNcollection, ref, where, type, counterForTypeDoc = 0;
            if(typeof(iNpath) == 'string' &&  iNpath.length > 0) 
                path = path + '/' +  iNpath;

            if(path.split('/').length % 2 == 0) {
                // its document
                    ref = Datebase2().doc(path);
                    type = 'document';
            } else {
                // its collection
                    ref = Datebase2().collection(path);
                    type = 'collection';
            }
                
        console.log('getRealtimeDataFromFirestoreDb path',path);

        iNdata['where'] = iNdata['where'] || [];

        //@<ORDER
            if( typeof iNdata['order'] != 'undefined' || typeof iNdata['orderByAsc'] != 'undefined') {
                var order = iNdata['order']||iNdata['orderByAsc'];
                if ( !Array.isArray(order)  ) order = [order];
                for (var iKey in order ) {
                    ref = ref.orderBy( order[iKey] );
                }
            }

            if( typeof iNdata['orderByDesc'] != 'undefined' ) {
                var order = iNdata['orderByDesc'];
                if ( !Array.isArray(order)  ) order = [order];
                for (var iKey in order ) {
                    ref = ref.orderBy ( order[iKey] , "desc" );
                }
            }
        //@ORDER>

        //@<WHERE
            console.log( 'whereEquilTo', typeof iNdata['whereEquilTo'] , Array.isArray( iNdata['whereEquilTo'] ) );
            if( typeof iNdata['whereEquilTo'] == 'object' && Array.isArray(iNdata['whereEquilTo']) ) {   // ==
                    where = iNdata['whereEquilTo'];
                    console.log('whereEquilTo', where);
                    for(var iKey in where) {
                        let key     = Object.keys( where[iKey] )[0],
                            value   = where[iKey][key];
                        iNdata['where'].push(
                            {
                                'key'   : key,
                                'value' : value,
                                'mark'  : '==',
                            }
                        );
                    }
                    console.log('whereEquilTo where',iNdata['where']);
            }
            if( typeof iNdata['whereMore'] == 'object' ) {      // ==
                    where = iNdata['whereMore'];
                    for(var iKey in where) {
                        let key     = Object.keys( where[iKey] )[0],
                            value   = where[iKey][key];
                        iNdata['where'].push(
                            {
                                'key'   : key,
                                'value' : value,
                                'mark'  : ">"
                            }
                        );
                    }
            }
            if( typeof iNdata['whereMoreOrEquil'] == 'object' ) { // ==
                    where = iNdata['whereMoreOrEquil'];
                    for(var iKey in where) {
                        let key     = Object.keys( where[iKey] )[0],
                            value   = where[iKey][key];
                        iNdata['where'].push(
                            {
                                'key'   : key,
                                'value' : value,
                                'mark'  : ">="
                            }
                        );
                    }
            }

            if( typeof iNdata['whereLess'] == 'object' ) { // ==
                    where = iNdata['whereLess'];
                    for(var iKey in where) {
                        iNdata['where'].push(
                            {
                                'key'   : iKey,
                                'value' : where[iKey],
                                'mark'  : "<"
                            }
                        );
                    }
            }
            if( typeof iNdata['whereLessOrEquil'] == 'object' ) { // ==
                    where = iNdata['whereLessOrEquil'];
                    for(var iKey in where) {
                        iNdata['where'].push(
                            {
                                'key'   : iKey,
                                'value' : where[iKey],
                                'mark'  : "<="
                            }
                        );
                    }
            }

            //add all
            if( typeof iNdata['where'] == 'object' ) {
                var where = iNdata['where'];
                    console.log("getRealtimeDataFromFirestoreDb where", JSON.stringify(where) );

                for(var iKey in where) {
                    var thisWhere = where[iKey];
                    console.log("getRealtimeDataFromFirestoreDb iNdata['where']",thisWhere['key'], thisWhere['mark'], thisWhere['value'])
                    ref = ref.where(thisWhere['key'], thisWhere['mark'], thisWhere['value'])
                }
            }
        //@WHERE>

        //@<LIMIT
            if( typeof iNdata['limit'] == 'number' ) {
                var limit = iNdata['limit'];
                ref = ref.limit( limit );
            }
                //
                if( typeof iNdata['limitToLast'] == 'number' ) {
                    var limit = iNdata['limitToLast'];
                    ref = ref.orderBy("time", "desc")
                    ref = ref.limit( limit );
                }
                //
                if( typeof iNdata['limitToFirst'] == 'number' ) {
                    var limit = iNdata['limitToFirst'];
                    ref = ref.orderBy("time", "asc")
                    ref = ref.limit( limit );
                }
        //@LIMIT>

        ref.get( 
        (doc) => {
            if(type == 'collection') {
                    // if collection
                    if ( !doc.empty ) {
                        if(typeof iNdata['functionOnGetData'] == 'function') iNdata['functionOnGet'](doc,type);
                    } else {
                        if(typeof iNdata['functionOnGetEmpty'] == 'function') iNdata['functionOnGetEmpty'](type);
                    }
            } else {
                if (doc.exists) {
                    if(typeof iNdata['functionOnGetData'] == 'function') iNdata['functionOnGet']([doc],type);
                } else {
                    if(typeof iNdata['functionOnGetEmpty'] == 'function') iNdata['functionOnGetEmpty'](type);
                }
            }
        });
    }
    _['getDataFromFirestoreDb'] = getDataFromFirestoreDb;

    function getRealtimeDataFromFirestoreDb (iNcollection,iNpath, iNdata) {
        /*
            @inputs
                @required
                    iNcollection    -> string
                    iNpath          -> string
                @optional
                    iNdata -> object
                        limitToLast -> number
                        order       -> array
                        functionOnSuccess
                        functionOnError
                        functionOnDelete
                        functionOnAdd

                        functionOnChange
                        functionOnChangeFromLocal 
                        functionOnChangeFromServer

                        functionOnOther

        */
        var path    = iNcollection, ref, where, type, counterForTypeDoc = 0;
            if(typeof(iNpath) == 'string' &&  iNpath.length > 0) 
                path = path + '/' +  iNpath;

            if(path.split('/').length % 2 == 0) {
                // its document
                    ref = Datebase2().doc(path);
                    type = 'document';
            } else {
                // its collection
                    ref = Datebase2().collection(path);
                    type = 'collection';
            }
                
        console.log('getRealtimeDataFromFirestoreDb path',path);

        iNdata['where'] = iNdata['where'] || [];

        //@<ORDER
            if( typeof iNdata['order'] != 'undefined' || typeof iNdata['orderByAsc'] != 'undefined') {
                var order = iNdata['order']||iNdata['orderByAsc'];
                if ( !Array.isArray(order)  ) order = [order];
                for (var iKey in order ) {
                    ref = ref.orderBy( order[iKey] );
                }
            }

            if( typeof iNdata['orderByDesc'] != 'undefined' ) {
                var order = iNdata['orderByDesc'];
                if ( !Array.isArray(order)  ) order = [order];
                for (var iKey in order ) {
                    ref = ref.orderBy ( order[iKey] , "desc" );
                }
            }
        //@ORDER>

        //@<WHERE
            console.log( 'whereEquilTo', typeof iNdata['whereEquilTo'] , Array.isArray( iNdata['whereEquilTo'] ) );
            if( typeof iNdata['whereEquilTo'] == 'object' && Array.isArray(iNdata['whereEquilTo']) ) {   // ==
                    where = iNdata['whereEquilTo'];
                    console.log('whereEquilTo', where);
                    for(var iKey in where) {
                        let key     = Object.keys( where[iKey] )[0],
                            value   = where[iKey][key];
                        iNdata['where'].push(
                            {
                                'key'   : key,
                                'value' : value,
                                'mark'  : '==',
                            }
                        );
                    }
                    console.log('whereEquilTo where',iNdata['where']);
            }
            if( typeof iNdata['whereMore'] == 'object' ) {      // ==
                    where = iNdata['whereMore'];
                    for(var iKey in where) {
                        let key     = Object.keys( where[iKey] )[0],
                            value   = where[iKey][key];
                        iNdata['where'].push(
                            {
                                'key'   : key,
                                'value' : value,
                                'mark'  : ">"
                            }
                        );
                    }
            }
            if( typeof iNdata['whereMoreOrEquil'] == 'object' ) { // ==
                    where = iNdata['whereMoreOrEquil'];
                    for(var iKey in where) {
                        let key     = Object.keys( where[iKey] )[0],
                            value   = where[iKey][key];
                        iNdata['where'].push(
                            {
                                'key'   : key,
                                'value' : value,
                                'mark'  : ">="
                            }
                        );
                    }
            }

            if( typeof iNdata['whereLess'] == 'object' ) { // ==
                    where = iNdata['whereLess'];
                    for(var iKey in where) {
                        iNdata['where'].push(
                            {
                                'key'   : iKey,
                                'value' : where[iKey],
                                'mark'  : "<"
                            }
                        );
                    }
            }
            if( typeof iNdata['whereLessOrEquil'] == 'object' ) { // ==
                    where = iNdata['whereLessOrEquil'];
                    for(var iKey in where) {
                        iNdata['where'].push(
                            {
                                'key'   : iKey,
                                'value' : where[iKey],
                                'mark'  : "<="
                            }
                        );
                    }
            }

            //add all
            if( typeof iNdata['where'] == 'object' ) {
                var where = iNdata['where'];
                    console.log("getRealtimeDataFromFirestoreDb where", JSON.stringify(where) );

                for(var iKey in where) {
                    var thisWhere = where[iKey];
                    console.log("getRealtimeDataFromFirestoreDb iNdata['where']",thisWhere['key'], thisWhere['mark'], thisWhere['value'])
                    ref = ref.where(thisWhere['key'], thisWhere['mark'], thisWhere['value'])
                }
            }
        //@WHERE>

        //@<LIMIT
            if( typeof iNdata['limit'] == 'number' ) {
                var limit = iNdata['limit'];
                ref = ref.limit( limit );
            }
                //
                if( typeof iNdata['limitToLast'] == 'number' ) {
                    var limit = iNdata['limitToLast'];
                    ref = ref.orderBy("time", "desc")
                    ref = ref.limit( limit );
                }
                //
                if( typeof iNdata['limitToFirst'] == 'number' ) {
                    var limit = iNdata['limitToFirst'];
                    ref = ref.orderBy("time", "asc")
                    ref = ref.limit( limit );
                }
        //@LIMIT>

        ref.onSnapshot( 
        (snapshot) => {
            if(type == 'collection') {
                    if ( snapshot.docChanges.length > 0 )
                        snapshot.docChanges.forEach( function (change) {
                            if (change.type === "added") {
                                if(typeof iNdata['functionOnAdd'] == 'function')
                                    iNdata['functionOnAdd'](change.doc);
                            }
                            if (change.type === "modified") {

                                if(typeof iNdata['functionOnChange'] == 'function')
                                    iNdata['functionOnChange'](change.doc);

                                if(isFirestoreLocalMutation(change.doc)) {
                                    if(typeof iNdata['functionOnChangeFromLocal'] == 'function')
                                        iNdata['functionOnChangeFromLocal'](change.doc);

                                } else { 
                                    if(typeof iNdata['functionOnChangeFromServer'] == 'function')
                                        iNdata['functionOnChangeFromServer'](change.doc);

                                }
                            }
                            if (change.type === "removed") {
                                if(typeof iNdata['functionOnDelete'] == 'function')
                                    iNdata['functionOnDelete'](change.doc);
                            }
                        });
                    else {
                        if(typeof iNdata['functionOnOther'] == 'function')
                            iNdata['functionOnOther'](snapshot);
                    } 
            } else {
                var doc = snapshot;
                if (doc.exists)  {
                    var source = doc.metadata.hasPendingWrites ? "Local" : "Server";

                    if (counterForTypeDoc < 1) {
                        // if firt get add from db
                        if(typeof iNdata['functionOnAdd'] == 'function') iNdata['functionOnAdd']( doc );
                        if (source == 'Local') {
                            // if local add functionOnChangeFromLocal
                            if(typeof iNdata['functionOnAddFromLocal'] == 'function') iNdata['functionOnAddFromLocal']( doc );
                        } else {
                            // if server add functionOnAddFromServer
                            if(typeof iNdata['functionOnAddFromServer'] == 'function') iNdata['functionOnAddFromServer']( doc );
                        }
                    } else {
                        // if we get change 
                        if(typeof iNdata['functionOnChange'] == 'function') iNdata['functionOnChange']( doc );
                        if (source == 'Local') {
                            // if local add functionOnChangeFromLocal
                            if(typeof iNdata['functionOnChangeFromLocal'] == 'function') iNdata['functionOnChangeFromLocal']( doc );
                        } else {
                            // if server add functionOnAddFromServer
                            if(typeof iNdata['functionOnChangeFromServer'] == 'function') iNdata['functionOnChangeFromServer']( doc );
                        }
                    }

                    // increase counter -> we would to recognize difference change and add
                    counterForTypeDoc++;
                } else if ( typeof iNdata['functionOnOther'] == 'function' ) {
                    iNdata['functionOnOther']();
                }
                            
            }
        });
    }
    _['getRealtimeDataFromFirestoreDb'] = getRealtimeDataFromFirestoreDb;

    function getData (iNcollection, iNpath, iNdata) {
        /*
            @inputs
                @required
                    iNcollection    -> string
                    iNpath          -> string
                @optional
                    iNdata -> object
                        limitToLast -> number
                        order       -> array
                        type        -> string
                            all
                            child_added
                            child_removed
                            child_changed
                            child_moved
                        functionOnSuccess
        */
        if( typeof iNdata != 'object') iNdata = {};
        var path    = iNcollection + '/' + iNpath;
        var ref     = Datebase().ref(path);
        var type    = iNdata['type']||'all';
        var functionOnSuccess   = iNdata['functionOnSuccess']||function(){};
        var functionOnError     = iNdata['functionOnError']||function(){};
        
        if( typeof iNdata['order'] != 'undefined' ) {
            var order = iNdata['order'];
            if ( !Array.isArray(order)  ) order = [order];
            for (var iKey in order ) {
                ref.orderByChild( order[iKey] );
            }
        }

        if( typeof iNdata['limitToLast'] == 'number' ) {
            var limit = iNdata['limitToLast'];
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