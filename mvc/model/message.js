define(
    ['jquery', 'v_message', 'm_moment', 'm_user', 'm_app', 'm_category', 'm_storage', 'm_record', 'm_progressbar', 'm_database'],
    function($, VIEW, MOMENT, USER, M_APP, M_CATEGORY, M_STORAGE, M_RECORD, M_PROGRESSBAR, M_DATABASE) {
        const _ = {
            'view': VIEW
        };
        const CONST = {
            'var_prefixNewMessageCount': 'connectNewMsgCountInChat-'
        };
        //@< copied functions from app-chat module
        function msg_getCurrentChatId() {
            return M_APP.get('connectThisOpenChatId');
        }
        //@> copied functions from app-chat module
        function annihilateNewMsgCounterFDB(iNchatId) {
            var chatId = iNchatId; //msg_getCurrentChatId();
            var myUID = USER.getMyId();
            // var baseKey = 'chats/' + chatId + '/member/' + myUID + '/newMsg';
            // var updateArray = {};
            // updateArray[baseKey] = 0;
            // FIREBASE.database().ref().update(updateArray);

            let collection = 'chats',
                pathToDb =  chatId + '/member/' + myUID + '/newMsg';
            M_DATABASE.addRealtimeDb ( collection, pathToDb, 0 )
        }

        function safeHideMessagesCountByChatId(iNchatId) {
            var msgCountFromLocaleStorage = getMyNewMessagesCountByChatId(iNchatId);
            if (msgCountFromLocaleStorage > 0) {
                // send query for firebase db for annihilate newMsgCount in chats/$chatId/member/#myUid/newMsgCount
                setMyNewMessagesCountByChatId(iNchatId, 0);
                annihilateNewMsgCounterFDB(iNchatId);
            }
            VIEW.changeNewMsgCounter(iNchatId, 0);
            VIEW.hideNewMsgCounter();
            M_CATEGORY.view.domHideNewMsgCountInChatBlock(iNchatId);
        }


        function safeViewMessagesCountByChatId(iNchatId) {
            VIEW.plusNewMsgCounter(iNchatId, 1);

            let numberNewMsgFromDom = VIEW.getNewMsgCounter(iNchatId);
            M_CATEGORY.view.domChangeNewMsgCountInChatBlock(iNchatId, numberNewMsgFromDom);


            M_CATEGORY.view.domShowNewMsgCountInChatBlock(iNchatId);
            VIEW.showNewMsgCounter();
        }



        function getMyNewMessagesCountByChatId(iNchatId) {
            return parseInt(M_APP.get(CONST['var_prefixNewMessageCount'] + iNchatId)) || 0;
        }
        _['getMyNewMessagesCountByChatId'] = getMyNewMessagesCountByChatId;

        function plusMyNewMessagesCountByChatId(iNchatId) {
            let number = getMyNewMessagesCountByChatId(iNchatId) + 1;
            setMyNewMessagesCountByChatId(iNchatId, number);
        }
        _['plusMyNewMessagesCountByChatId'] = plusMyNewMessagesCountByChatId;

        function setMyNewMessagesCountByChatId(iNchatId, iNnumber) {
            let path = CONST['var_prefixNewMessageCount'] + iNchatId;
            M_APP.save(path, iNnumber);
        }
        _['setMyNewMessagesCountByChatId'] = setMyNewMessagesCountByChatId;



        function synchronizeWithMessageDb(iNchatId, iNobject) {
            /*
                    @inputs
                        @required
                            iNchatId -> string
                        @optional
                            iNobject -> object
                                functionOnChildChanged
                                functionOnChildAdded
                                functionOnChild
                */
            if (typeof iNobject != 'object') iNobject = {};
            M_APP.view.createLoaderInAppView();

            getMessagesFromDb(iNchatId, 'child_added', iNobject);

            setTimeout(
                () => {
                    let chatId = iNchatId;
                    getMessagesFromDb(chatId, 'child_changed', iNobject);
                },
                5000
            );
        }
        _['synchronizeWithMessageDb'] = synchronizeWithMessageDb;

        function getMessagesFromDb(iNchatId, iNtype, iNobject) {
            /*
                    @inputs
                        @required
                            iNchatId -> string
                            iNtype -> string
                                child_changed || child_added
                        @optional
                            iNobject -> object
                                functionOnChildChanged
                                functionOnChildAdded
                                functionOnChild
                */

            if (typeof iNobject != 'object') iNobject = {};

            // var messagesRef = FIREBASE.database().ref('messages/' + iNchatId);
            // messagesRef.orderByChild("time").limitToLast(40).on(iNtype, (messagesData) => {
            //     callbackAddOrChangeMessageForDb(messagesData, iNchatId, iNtype, iNobject);
            // });

            M_DATABASE.getDataFromRealtimeDb ('messages', iNchatId, 
                {
                    'order' : 'time',
                    limitToLast : 40,
                    type : iNtype,
                    functionOnSuccess : (messagesData) => {
                        callbackAddOrChangeMessageForDb(messagesData, iNchatId, iNtype, iNobject);
                    }
                }
            )
        }

        function callbackAddOrChangeMessageForDb(iNdataFromFB, iNchatId, iNtype, iNobject) {
            /*
                        @inputs
                            @required
                                iNdataFromFB (result from firebase db)
                                iNchatId -> string
                                iNtype -> string 
                                    child_changed || child_added
                                iNobject -> object
                                    @optional
                                        functionOnChildChanged
                                        functionOnChildAdded
                    */
            var messagesData = iNdataFromFB;
            var myUID = USER.getMyId();
            var fullData = messagesData.val()
            var objectForCreateMessage = fullData['info'];
            var msgType = fullData['type'];
            objectForCreateMessage['msgId'] = messagesData.key;

            // add for simple msg text spy for set read state when we watch this msg
            if (objectForCreateMessage['uid'] != myUID && objectForCreateMessage['type'] == 1) {
                let myStateRead = msgFromMe_getReadTime(fullData, myUID);
                if (myStateRead == 0) {
                    objectForCreateMessage['appearClass'] = true;
                }
            }

            if (typeof iNobject['functionOnChild'] == 'function') iNobject['functionOnChild'](iNchatId);

            getTimeTextForAllMessages(objectForCreateMessage, fullData, iNchatId, myUID);

            if (iNtype == 'child_changed') {
                // replace message in chat container

                if (typeof iNobject['functionOnChildChanged'] == 'function') iNobject['functionOnChildAdded'](iNchatId);

                // VIEW.msgSimpleText_safeReplace( objectForCreateMessage, myUID, iNchatId  );

                VIEW.msg_replaceMsgByItsType(msgType, objectForCreateMessage, myUID, iNchatId)

            } else {
                if (typeof iNobject['functionOnChildAdded'] == 'function') iNobject['functionOnChildAdded'](iNchatId);
                msgSimpleText_safeCreateCenterMessageByPassedTime(objectForCreateMessage, fullData, iNchatId, myUID);



                VIEW.msg_createMsgByItsType(msgType, objectForCreateMessage, myUID, iNchatId)
                // VIEW.msgSimpleText_createMsg ( objectForCreateMessage, myUID, iNchatId );

                VIEW.effChatViewScrollToBotWithTimeOut(
                    () => {
                        if (msg_getCurrentChatId() == iNchatId)
                            safeHideMessagesCountByChatId(iNchatId);
                    },
                    () => {
                        if (msg_getCurrentChatId() == iNchatId)
                            if (objectForCreateMessage['uid'] != myUID)
                                safeViewMessagesCountByChatId(iNchatId);
                    }
                );

                msg_setObserverForAppearMessageInVisualScrollByChatId(iNchatId,msgType);
            }
            // ser observer for income non read message to me
        }

        function msg_setObserverForAppearMessageInVisualScrollByChatId(iNchatId,iNMsgType) {
            /*
                @discr
                    set read state when some messages watch in for user
                @inputs
                    @required
                        iNchatId    -> string
                        iNMsgType   -> int
            */
            if(iNMsgType == 1)
                msgSimpleText_setObserverForAppearMessageInVisualScrollByChatId(iNchatId);
        }

        function msgSimpleText_setObserverForAppearMessageInVisualScrollByChatId(iNchatId) {
            let thisSuccessFunction = (iNel) => {
                let element = iNel;
                const chatId = iNchatId;
                //таймер что бы успело создаться в сообщении counter блок
                setTimeout(() => {
                    let thisElement = element;
                    var myUID = USER.getMyId();
                    let msgId = VIEW.msg_getDomAttrByNameMsgId(thisElement);
                    msg_setReadState(msgId, chatId, myUID);
                }, 1200);
            };
            VIEW.msgSimpleText_setObserverForViewMsgInVisualScrollByChatId(iNchatId, {
                'success': thisSuccessFunction,
                'onScrollParentFalse': safeHideMessagesCountByChatId
            });
        }
        _['msgSimpleText_setObserverForAppearMessageInVisualScrollByChatId'] = msgSimpleText_setObserverForAppearMessageInVisualScrollByChatId;

        function msgSimpleText_safeCreateCenterMessageByPassedTime(iNobject, iNfullBlock, iNchatId, iNmyUid) {
            if (iNfullBlock.time > 0) {
                msgSimpleText_createCenterDateText(iNchatId, iNfullBlock.time);
            }

        }


        function msgLiveAudio_safeSerReadState () {
            var msgSelectorText = msg_getPathToDomForMsg (  iNchatId, iNmsgId );
                    var myUID = USER.getMyId();
            msg_getDomAttrByNameMessageTimeSent (msgSelectorText);


                    let thisElement = element;
                    var myUID = USER.getMyId();
                    var chatId = msg_getCurrentChatId();
                    let msgId = VIEW.msg_getDomAttrByNameMsgId(thisElement);
                    msg_setReadState(msgId, chatId, myUID);
        }


        function getTimeTextForAllMessages(iNobject, iNfullBlock, iNchatId, iNmyUid) {

            if (iNfullBlock.time > 0) {
                iNobject.timeSentText = MOMENT().getTimeMiniText(iNfullBlock.time);
                iNobject.timeSent = iNfullBlock.time;
            }
            if (iNobject['uid'] != iNmyUid) {
                // this is message to me
                getTimeForToMeMessages(iNobject, iNfullBlock, iNchatId, iNmyUid)
            } else {
                // this is message from me
                getTimeForFromMeMessages(iNobject)
            }
        }

        function getTimeForToMeMessages(iNobject, iNfullBlock, iNchatId, iNmyUid) {
            //get status by timestamp read,delivered,sent
            console.log('getTimeForToMeMessages iNobjectd',iNobject );
            console.log('getTimeForToMeMessages iNfullBlock', iNfullBlock );
            console.log('getTimeForToMeMessages iNchatId', iNchatId);
            console.log('getTimeForToMeMessages iNmyUid',iNmyUid);
            var myState = msgFromMe_getTimesOfState(iNfullBlock, iNmyUid);
            console.log('getTimeForToMeMessages myState',myState);
            if (typeof myState == 'object') {
                var states = myState;
                if (states.read > 0) {
                    iNobject.timeReadText = MOMENT().getTimeMiniText(states.read);
                    iNobject.timeRead = states.read;
                }
                if (states.delivered > 0) {
                    iNobject.timeDeliveredText = MOMENT().getTimeMiniText(states.delivered);
                    iNobject.timeDelivered = states.delivered;
                } else {
                    setTimeout(() => {
                        let thisObj = iNobject;
                        console.log('getTimeForToMeMessages msg_setDeliveredState',thisObj['msgId'], iNchatId, iNmyUid);
                        // delay for stock
                        msg_setDeliveredState(thisObj['msgId'], iNchatId, iNmyUid);
                    }, 1000);
                }
            }
        }

        function getTimeForFromMeMessages(iNobject) {
            //get status by timestamp read,delivered,sent
            if (typeof iNobject.state == 'object') {
                var states = iNobject.state;
                if (states.read > 0) {
                    iNobject.timeReadText = MOMENT().getTimeMiniText(states.read);
                    iNobject.timeRead = states.read;
                }
                if (states.delivered > 0) {
                    iNobject.timeDeliveredText = MOMENT().getTimeMiniText(states.delivered);
                    iNobject.timeDelivered = states.delivered;
                }
            }
        }


        function getMySateStatusFromMsg(iNobject, myUID) {
            var thisStateObject = msgFromMe_getTimesOfState(iNobject, myUID);
            if (typeof thisStateObject['status'] == 'number')
                return thisStateObject['status'];
            return 0;
        }

        function msgFromMe_getReadTime(iNobject, myUID) {
            var thisStateObject = msgFromMe_getTimesOfState(iNobject, myUID);
            if (typeof thisStateObject['read'] == 'number')
                return thisStateObject['read'];
            return 0;
        }

        function getMyStateDeliveredFromMsg(iNobject, myUID) {
            var thisStateObject = msgFromMe_getTimesOfState(iNobject, myUID);
            if (typeof thisStateObject['delivered'] == 'number')
                return thisStateObject['delivered'];
            return 0;
        }

        function msgFromMe_getTimesOfState(iNobject, myUID) {
            if (typeof iNobject == 'object')
                if (typeof iNobject['member'] == 'object')
                    if (typeof iNobject['member'][myUID] == 'object')
                        if (typeof iNobject['member'][myUID]['state'] == 'object')
                            return iNobject['member'][myUID]['state'];
            return {};//false
        }

        function msgSimpleText_flashSending (iNchatId) {
            /*
                @disrc
                    start sendidng flesh msg to firebase db
                @inputs
                    @required
                        iNdata -> object
                            type
                            data
            */
            objForSendToDb = {
                'data': VIEW.getContentLengthFromMsgSenderBlock(),
                'type': 1
            };
            msg_flashSending(objForSendToDb,iNchatId)
        }
        _['msgSimpleText_flashSending'] = msgSimpleText_flashSending;

            function msg_flashSending (iNdata, iNchatId) {
            /*
                @disrc
                    start sendidng flesh msg to firebase db
                @inputs
                    @required
                        iNdata -> object
                            type
                            data
            */
            var chatId = iNchatId||msg_getCurrentChatId();
            var myUID = USER.getMyId();
            var baseKey = 'chats/' + chatId + '/info/live';
            //change delete fixed type
            var objForSendToDb = {
                'data'  : iNdata['data'],
                'uid'   : iNdata['uid']||myUID,
                'time'  : M_DATABASE.getSeverVarTimestamp(),
                'type'  : iNdata['type']
            }


            // var updateArray = {};
            // updateArray[baseKey] = objForSendToDb;

            // FIREBASE.database().ref().update(updateArray);

            let collection = 'chats',
                pathToDb = chatId + '/info/live';
            M_DATABASE.addRealtimeDb ( collection, pathToDb, objForSendToDb )

        }
        _['msg_flashSending'] = msg_flashSending;

        function msg_setReadState(iNmsgId, iNchatId, myUID) {
            // var baseKey = 'messages/' + iNchatId + '/' + iNmsgId + '/member/' + myUID + '/state';

            // var keyRead = baseKey + '/read';

            // var updateArray = {};
            // updateArray[keyRead] = M_DATABASE.getSeverVarTimestamp();;
            // var result = FIREBASE.database().ref().update(updateArray);

            let collection = 'messages',
                pathToDb = iNchatId + '/' + iNmsgId + '/member/' + myUID + '/state' + '/read';
            M_DATABASE.addRealtimeDb ( collection, pathToDb, M_DATABASE.getSeverVarTimestamp() )
        }

        function msg_setDeliveredState (iNmsgId, iNchatId, myUID) {
            // var baseKey = 'messages/' + iNchatId + '/' + iNmsgId + '/member/' + myUID + '/state';

            // var keyDelivered = baseKey + '/delivered';

            // var updateArray = {};
            // updateArray[keyDelivered] = M_DATABASE.getSeverVarTimestamp();
            // var result = FIREBASE.database().ref().update(updateArray);

            let collection = 'messages',
                pathToDb = iNchatId + '/' + iNmsgId + '/member/' + myUID + '/state' + '/delivered';
            M_DATABASE.addRealtimeDb ( collection, pathToDb, M_DATABASE.getSeverVarTimestamp() )
        }

        function msg_addToDb(iNdata, iNchatId, iNmsgId) {
            /*
        @discr
            send msg to firebase realtime db
        @inputs
            @required
                1 - iNdata
                    @required
                        content
                    @optional
                        block
                        fire
                        group
                        type

                        msgId
                2 - iNchatId
        @return
            result form Firebse update

      */
            //default message type
            iNdata.type = iNdata.type || 1;
            // get my user id
            let myUid = USER.getMyId();//FIREBASE.auth().currentUser.uid;
            // get right object for add to msg db
            let objForSentToDb = prepareObjectForSentToMsgBase(iNdata, myUid);

            let collection = 'messages';

            let msgId = iNmsgId || msg_generateMsgIdByChatId(iNchatId); //   FIREBASE.database().ref().child('messages/'+iNchatId).push().key;

            let pathToDb = iNchatId + '/' + msgId;
            M_DATABASE.addRealtimeDb(collection, pathToDb, objForSentToDb);addRealtimeDb
        }
        _['msg_addToDb'] = msg_addToDb;

        function msg_generateMsgIdByChatId(iNchatId) {
            let collection = 'messages';
            return M_DATABASE.generateIdForRealtimeDbByFullPathToDb(collection, iNchatId);
        }

        function prepareObjectForSentToMsgBase(iNdata, iNmyUid) {
            /*
                @discr
                    return object for base
                @inputs
                @required
                    1 - iNdata
                        @required
                            content
                        @optional
                            block
                            fire
                            group
                            type
                    2 - iNmyUid
            */
            var timeStamp = M_DATABASE.getSeverVarTimestamp();
            var objForSentToDb = {
                'info': {
                    'options': {
                        'base': {}
                    },
                    'state': {
                        'sent': timeStamp
                    },
                    'content': iNdata['content'],
                },
                'time': timeStamp,
                'status': 1,
                'type': iNdata.type,
                'uid': iNmyUid
            };

            if (typeof(iNdata.type) != 'undefined') objForSentToDb['info']['type'] = iNdata.type; // default text key
            if (typeof(iNdata.block) == 'undefined') objForSentToDb['info']['options']['base']['block'] = 0; // default block disable
            if (typeof(iNdata.fire) == 'undefined') objForSentToDb['info']['options']['base']['fire'] = 0; // default fire disable
            if (typeof(iNdata.group) == 'undefined') objForSentToDb['info']['options']['base']['group'] = 0; // default group dissable
            if (typeof(iNmyUid) != 'undefined') {
                objForSentToDb['uid'] = iNmyUid; // default group dissable
                objForSentToDb['info']['uid'] = iNmyUid;
            }
            return objForSentToDb;
        }

        function updateChatLastMsgObject(iNobject, iNchatId) {
            /*
                @discr
                    update last msg block in chat db for show in list menus for all users 
                @inputs
                    @required
                        iNobject
                            info
                                content
                                typw
                            uid
            */
            var timeStamp = M_DATABASE.getSeverVarTimestamp();
            // var updates = {};
            var lastMessage = {
                content: iNobject['info']['content'],
                time: timeStamp,
                type: iNobject['info']['type'],
                uid: iNobject['uid']
            };
            // updates['/chats/info/' + iNchatId + '/msg'] = lastMessage;
            // return FIREBASE.database().ref().update(updates);

            let collection = 'chats',
                pathToDb =  'info/' + iNchatId + '/msg';
            return M_DATABASE.addRealtimeDb ( collection, pathToDb, lastMessage )
        }

        function msgSimpleText_createCenterDateText(iNchatId, iNtime) {
            var lastMsgTimeText = getLastMsgTimeByChatId(iNchatId);
            var lastMsgTime = parseInt(lastMsgTimeText);
            var isThisDay = MOMENT().isThisDay(iNtime);
            var nowTime = MOMENT().getNowTime();
            if ((typeof lastMsgTime != 'number' || lastMsgTime < 1) || (MOMENT().getDayNumberByTime(lastMsgTime) != MOMENT().getDayNumberByTime(iNtime))) {
                // if first && if is not this day || or new date && if is not this day 
                setLastMsgTimeByChatId(iNchatId, iNtime);
                var objForChat = {};

                if (isThisDay) {
                    //change set today from dictionary
                    objForChat['content'] = MOMENT().getWeekDayText(iNtime);
                } else if (MOMENT().isThisWeek(iNtime)) {
                    objForChat['content'] = MOMENT().getWeekDayText(iNtime);
                } else {
                    objForChat['content'] = MOMENT().getFullText(iNtime);
                }
                VIEW.msgSimpleText_addCenter(objForChat, iNchatId);
            }
        }

        function setLastMsgTimeByChatId(iNchatId, iNtime) {
            return M_APP.save('connectLastMsgChatId_' + iNchatId, iNtime);
        }
        _['setLastMsgTimeByChatId'] = setLastMsgTimeByChatId;


        function getLastMsgTimeByChatId(iNchatId) {
            return M_APP.get('connectLastMsgChatId_' + iNchatId);
        }
        // _['getLastMsgTimeByChatId'] = getLastMsgTimeByChatId;

        //onClick events
        function simpleMsgText_onClickSendBtn (e) {
            var chatId = msg_getCurrentChatId();
            var data = {
                'content': VIEW.getContentFromMsgSenderBlock()
            };
            M_APP.playSound('https://cdn.ramman.net/audio/effects/sendMessage.mp3'); //CHANGE do Const
            msg_addToDb(data, chatId);
        }
        _['simpleMsgText_onClickSendBtn'] = simpleMsgText_onClickSendBtn;
        //

    //
        function getDownloadUrl (argument) {
            // body...
        }
    //

    //@<SECTION 'msg live video' type = 21

        function msgLiveVideo_onEventPlayVideo (iNthis) {
            /*
                @discr
                    for video '.liveVideoSrc' event onplay video -> we change btn pause TO play (adding class)
                      
                @inputs
                    @required
                        iNthis -> object (this)
            */
            // pause all other now playing video and audio 
            VIEW.msg_pauseAllOtherPlayingAudioOrVideoEl();

            // safe set read state
            msgLiveVideo_safeSetReadState(iNthis);

            let backElement = $(iNthis).closest('.aCpI_msgLiveVideo_videoMsgContent').find('.aCpI_msgLiveVideo_backgroundVideoOnHover');
            // delete
            $(backElement).removeClass('aCpI_msgLiveVideo_backgroundPlayVideoOnHover').addClass('aCpI_msgLiveVideo_backgroundPauseVideoOnHover')

            // add flag by addClass 'flagForSearchPlayingAudioOrVideo' && 'flagForSearchPlayingLiveVideo'
            VIEW.msgLiveVideo_addPlayingFlags (iNthis);
        }
        window.aCpI_msgLiveVideo_onEventPlayVideo = msgLiveVideo_onEventPlayVideo; 

        function msgLiveVideo_safeSetReadState (iNobject) {
            //@< add read state for to me message if it need
                var msgParentBlock = $(iNobject).closest('.msgTypeLiveVideo');
                if( msgParentBlock.hasClass('toMeMessageInChatView') && VIEW.msg_getDomAttrByNameMessageTimeRead(msgParentBlock) < 1 ) {
                    // 
                    var chatId  = msg_getCurrentChatId();
                    var myUID   = USER.getMyId();
                    let msgId   = VIEW.msg_getDomAttrByNameMsgId(msgParentBlock);
                    msg_setReadState(msgId, chatId, myUID);
                }
            //@> add read state for to me message if it need
        }

        function msgLiveVideo_flashSending (iNsecond,iNchatId) {
            /*
                @disrc
                    start sendidng flesh msg to firebase db
                @inputs
                    @required
                        iNdata -> object
                            type
                            data
            */
            objForSendToDb = {
                'data': iNsecond,
                'type': 21
            };
            msg_flashSending(objForSendToDb,iNchatId)
        }
        _['msgLiveVideo_flashSending'] = msgLiveVideo_flashSending;

        function msgLiveVideo_getDownloadUrl () {
            let path = ''
        }
            function msgLiveVideo_getUploadUrl (iNuid,iN) {
                let path = ''
            }

        function msgLiveVideo_createMsgFromMe(iNsrc, iNmyUid, iNchatId, iNmsgId) {
            var iNdata = {};
            iNdata['content'] = iNsrc;
            iNdata['uid'] = iNmyUid;
            iNdata['msgId'] = iNmsgId;
            // create message element
            VIEW.msgLiveVideo_createMsg(iNdata, iNmyUid, iNchatId);
            // scroll to bot
            VIEW.effChatViewScrollToBotWithTimeOut();
        }

        function msgLiveVideo_sendMsgFromMe(iNsrc, iNchatId, iNmsgId) {
            var iNdata = {
                'content': iNsrc
            };
            iNdata['type'] = 21;
            // add to database
            msg_addToDb(iNdata, iNchatId, iNmsgId)
        }
        //

        //@< COTROLLER msgLiveVideo
        function controller_msgLiveVideo_record_sendVideoToStorage(iNerror, iNblob, iNdata) {
            var blobUrl = URL.createObjectURL(iNblob),
                iNmyUid = USER.getMyId(),
                iNchatId = msg_getCurrentChatId(iNchatId),
                iNmsgId = msg_generateMsgIdByChatId(iNchatId);

            // create message without load to db
            msgLiveVideo_createMsgFromMe(blobUrl, iNmyUid, iNchatId, iNmsgId);


            // upload audio file
            var functionUploadBlob = () => {
                // init loader
                var progressBar     = VIEW.msgLiveVideo_initLoader(iNchatId, iNmsgId);
                var pathForSaveFile = 'chats/'+iNchatId+'/'+iNmyUid+'/liveVideo/'+iNmsgId+'/1.webm';
                M_STORAGE.uploadBlob(
                    iNblob, {
                        'pathForSaveFile': pathForSaveFile,
                        'mimeType': 'video/webm'
                    }, {
                        'onSuccess': (iNdownloadURL) => {
                            // hide uploader block
                            VIEW.msgLiveVideo_hideUploadBlock(iNchatId, iNmsgId);

                            // send message to uplload
                            msgLiveVideo_sendMsgFromMe(iNdownloadURL, iNchatId, iNmsgId);
                        },
                        'onProgress': (iNprogress) => {
                            let progress = iNprogress / 100;

                            // set progres for uploading progress bar
                            progressBar.to(progress);
                        },
                        'onError': (iNerror) => {
                            // hide progress bar -> we need show progress bar
                            console.log('msgLiveVideo_showUploadBtn iNerror');
                            VIEW.msgLiveVideo_showUploadBtn(iNchatId, iNmsgId);
                        },
                    }
                );
            }

            VIEW.msgLiveVideo_setObserverForUploadBtn (iNchatId,iNmsgId,
                () => {
                    console.log('msgLiveVideo_setObserverForUploadBtn start');
                    functionUploadBlob();
                }
            );

            functionUploadBlob();
        }

        function controller_msgLiveVideo_record_run() {
            var flagPermissionForLiveVideoRecord = false,
                flagBoolStartedLoaded = false,
                mediationObjectLiveVideoRecorderObject,
                mediationObjectLiveVideoStreamObject;

            var specialClickObject = VIEW.onSpecialClickForSendLiveAudioOrVideo(
                'video', {
                    // defaultState : false,
                    'onTimerTick': (iNperiods) => {
                        var hours = iNperiods[4],mins = iNperiods[5],sec = iNperiods[6];
                        var allSeconds = (hours*3600) + (mins*60) + sec;
                        msgLiveVideo_flashSending(allSeconds);
                        console.log('tick audioLiveAudio');
                    },
                    'onStartVideoRecord': () => {
                        // when timer finished (we give time for browser to get stream from camera)
                        if (flagPermissionForLiveVideoRecord == true) {
                            // set flag true -> we stared recording
                            flagBoolStartedLoaded = true;
                            // start recording
                            mediationObjectLiveVideoRecorderObject.start(600000);
                        } else {
                            // set flag false -> we don't stared recording
                            flagBoolStartedLoaded = false;
                        }

                    },
                    'onStart': () => {
                        // when mouse up from btn for live recording
                        M_RECORD.video({
                            'onSuccess': (stream, recorderObject, mediationObjectForPassToVideoRecord) => {
                                console.log('specialClickObject video mediationObjectLiveVideoRecorderObject ', mediationObjectLiveVideoRecorderObject);
                                if (typeof mediationObjectLiveVideoRecorderObject != 'undefined') {
                                    // stop recording object (delete tracks from stream)
                                    M_RECORD.stopRecordingByStream(mediationObjectLiveVideoStreamObject);
                                    // stop recording stream
                                    mediationObjectLiveVideoRecorderObject.stop();
                                    // delete stream
                                    mediationObjectLiveVideoStreamObject.stop();
                                }
                                // set stream for global access in function
                                mediationObjectLiveVideoStreamObject = stream;
                                // set recorder for global access in function
                                mediationObjectLiveVideoRecorderObject = recorderObject;
                                // we get perimision for browser -> set true
                                flagPermissionForLiveVideoRecord = true;
                                // set for view element (video tag) our stream as src
                                VIEW.msgLiveVideo_record_setStreamVideoElement(mediationObjectLiveVideoStreamObject);
                                // show stream view box
                                VIEW.msgLiveVideo_record_showStreamVideoViewer();

                                // active special click object
                                // specialClickObject.on();
                            },
                            'onError': (e) => {
                                // deactive special click object
                                // specialClickObject.off();

                                // we don't get perimision for browser -> set false
                                flagPermissionForLiveVideoRecord = false;
                            }
                        })


                    },
                    'onDelete': () => {
                        // when mouse up from outside btn || from cancel btn 

                        // hide stream recorder view
                        VIEW.msgLiveVideo_record_hideStreamVideoViewer();
                        // stop recording object (delete tracks from stream)
                        M_RECORD.stopRecordingByStream(mediationObjectLiveVideoStreamObject);
                        // stop recording stream
                        mediationObjectLiveVideoRecorderObject.stop();
                        // delete stream
                        mediationObjectLiveVideoStreamObject.stop();

                        // annihilate loading because we send
                        flagBoolStartedLoaded = false;

                    },
                    'onSend': () => {
                        // when mouse up from inside btn for live recording

                        // is recording started
                        if (flagBoolStartedLoaded == true) {
                            // hide stream recorder view
                            VIEW.msgLiveVideo_record_hideStreamVideoViewer();
                            // stop recording stream
                            mediationObjectLiveVideoRecorderObject.stop();
                            // upload video to storage
                            mediationObjectLiveVideoRecorderObject.get(controller_msgLiveVideo_record_sendVideoToStorage);
                            // stop recording object (delete tracks from stream)
                            M_RECORD.stopRecordingByStream(mediationObjectLiveVideoStreamObject);
                            // delete stream
                            mediationObjectLiveVideoStreamObject.stop();
                        }
                        // annihilate loading because we send
                        flagBoolStartedLoaded = false;
                    },

                }
            );
        }
        _['controller_msgLiveVideo_record_run'] = controller_msgLiveVideo_record_run;
        //@> COTROLLER record_msgLiveVideo 
    //@SECTION> 'msg live video' type = 21

    //@<SECTION 'msg live audio' type = 20

        function msgLiveAudio_onEventPlay (iNobject) {
            //@GLOBAL pause all other audio & video is now playin
            VIEW.msg_pauseAllOtherPlayingAudioOrVideoEl();

            // add playing flags
            VIEW.msgLiveAudio_addPlayingFlags(iNobject);

            // safe set read state
            msgLiveAudio_safeSetReadState (iNobject);

            // view pause brn & hide play btn
            var parent = $(iNobject).closest('.aCpI_msgLiveAudio_blockInAudioMsg');
            VIEW.msgLiveAudio_smartViewBtnPauseAudio(parent);
        }
        window.aCpI_msgLiveAudio_onEventPlay = msgLiveAudio_onEventPlay;

        function msgLiveAudio_safeSetReadState (iNobject) {
            //@< add read state for to me message if it need
                var msgParentBlock = $(iNobject).closest('.msgTypeLiveAudio');

                if( msgParentBlock.hasClass('toMeMessageInChatView') && VIEW.msg_getDomAttrByNameMessageTimeRead(msgParentBlock) < 1 ) {
                    // 
                    var chatId  = msg_getCurrentChatId();
                    var myUID   = USER.getMyId();
                    let msgId   = VIEW.msg_getDomAttrByNameMsgId(msgParentBlock);
                    msg_setReadState(msgId, chatId, myUID);
                }
            //@> add read state for to me message if it need
        }

        function msgLiveAudio_createMsgFromMe(iNsrc, iNmyUid, iNchatId, iNmsgId) {
            var iNdata = {};
            iNdata['content'] = iNsrc;
            iNdata['uid'] = iNmyUid;
            iNdata['msgId'] = iNmsgId;
            // create message element
            VIEW.msgLiveAudio_createMsg(iNdata, iNmyUid, iNchatId);
            // scroll to bot
            VIEW.effChatViewScrollToBotWithTimeOut();
        }

        function msgLiveAudio_flashSending (iNsecond,iNchatId) {
            /*
                @disrc
                    start sendidng flesh msg to firebase db
                @inputs
                    @required
                        iNdata -> object
                            type
                            data
            */
            objForSendToDb = {
                'data': iNsecond,
                'type': 20
            };
            msg_flashSending(objForSendToDb,iNchatId)
        }
        _['msgLiveAudio_flashSending'] = msgLiveAudio_flashSending;

        function msgLiveAudio_sendMsgFromMe(iNsrc, iNchatId, iNmsgId) {
            var iNdata = {
                'content': iNsrc
            };
            iNdata['type'] = 20;
            // add to database
            msg_addToDb(iNdata, iNchatId, iNmsgId)
        }
        //

        //@< COTROLLER msgLiveAudio record
        function controller_msgLiveAudio_record_sendAudioToStorage(iNerror, iNblob, iNdata) {
            var blobUrl     = URL.createObjectURL(iNblob),
                iNmyUid     = USER.getMyId(),
                iNchatId    = msg_getCurrentChatId(iNchatId),
                iNmsgId     = msg_generateMsgIdByChatId(iNchatId);

            // create message without load to db
            msgLiveAudio_createMsgFromMe(blobUrl, iNmyUid, iNchatId, iNmsgId);


             // upload audio file
            var functionUploadBlob = () => {
                // init loader
                var progressBar = VIEW.msgLiveAudio_initLoader(iNchatId, iNmsgId);
                var pathForSaveFile = 'chats/'+iNchatId+'/'+iNmyUid+'/liveAudio/'+iNmsgId+'/1.ogg';
                M_STORAGE.uploadBlob (
                    iNblob, {
                        'pathForSaveFile': pathForSaveFile,
                        'mimeType': 'audio/ogg; codecs=opus'
                    }, {
                        'onSuccess': (iNdownloadURL) => {
                            // hide uploader block
                            VIEW.msgLiveAudio_hideUploadBlock(iNchatId, iNmsgId);

                            // send message to uplload
                            msgLiveAudio_sendMsgFromMe(iNdownloadURL, iNchatId, iNmsgId);
                        },
                        'onProgress': (iNprogress) => {
                            let progress = iNprogress / 100;

                            // set progres for uploading progress bar
                            progressBar.to(progress);
                        },
                        'onError': (iNerror) => {
                            // hide progress bar -> we need show progress bar
                            VIEW.msgLiveAudio_showUploadBtn(iNchatId, iNmsgId);
                        },
                    }
                );
            }

            VIEW.msgLiveAudio_setObserverForUploadBtn (iNchatId,iNmsgId,
                () => {
                    console.log('msgLiveAudio_setObserverForUploadBtn start');
                    functionUploadBlob();
                }
            );

            functionUploadBlob();
        }

        function controller_msgLiveAudio_record_run() {
            var permissionForLiveAudioRecord = false;
            var mediationObjectLiveAudioRecorderObject;
            var mediationObjectLiveAudioStreamObject;

            var specialClickObject = VIEW.onSpecialClickForSendLiveAudioOrVideo(
                'audio', {
                    // defaultState : false,
                    'onTimerTick': (iNperiods) => {
                        var hours = iNperiods[4],mins = iNperiods[5],sec = iNperiods[6];
                        var allSeconds = (hours*3600) + (mins*60) + sec;
                        msgLiveAudio_flashSending(allSeconds);
                        console.log('tick audioLiveMsg');
                    },
                    'onStart': () => {
                        // when mouse up from btn for live recording
                        // if ( permissionForLiveAudioRecord == false ) {
                        M_RECORD.liveAudioRecord({
                            'onSuccess': (stream, recorderObject) => {
                                if (typeof mediationObjectLiveAudioStreamObject != 'undefined') {
                                    M_RECORD.stopRecordingByStream(mediationObjectLiveAudioStreamObject);
                                    mediationObjectLiveAudioRecorderObject.delete();
                                    mediationObjectLiveAudioStreamObject.stop();
                                }
                                // set stream
                                mediationObjectLiveAudioStreamObject = stream;
                                // set record object
                                mediationObjectLiveAudioRecorderObject = recorderObject;
                                permissionForLiveAudioRecord = true;

                                if (permissionForLiveAudioRecord == true)
                                    mediationObjectLiveAudioRecorderObject.start();


                                // active special click object
                                // specialClickObject.on();

                            },
                            'onError': (e) => {
                                // deactive special click object
                                // specialClickObject.off();
                                permissionForLiveAudioRecord = false;
                            },
                            'onDataAvailable': (error, blob) => {

                                controller_msgLiveAudio_record_sendAudioToStorage(error, blob);
                            }
                        });

                    },
                    'onDelete': () => {
                        // when mouse up from outside btn || from cancel btn 
                        console.log('onDelete permissionForLiveAudioRecord', permissionForLiveAudioRecord);
                        if (permissionForLiveAudioRecord == true) {
                            M_RECORD.stopRecordingByStream(mediationObjectLiveAudioStreamObject);
                            mediationObjectLiveAudioRecorderObject.delete();
                            mediationObjectLiveAudioStreamObject.stop();

                            // mediationObjectLiveAudioRecorderObject.initStream();
                        }

                    },
                    'onSend': () => {
                        // when mouse up from inside btn for live recording
                        if (permissionForLiveAudioRecord == true) {
                            mediationObjectLiveAudioRecorderObject.save();
                            M_RECORD.stopRecordingByStream(mediationObjectLiveAudioStreamObject);

                            mediationObjectLiveAudioStreamObject.stop();
                        }
                    },

                }
            );
        }
        _['controller_msgLiveAudio_record_run'] = controller_msgLiveAudio_record_run;

        //@> COTROLLER msgLiveVideo

    //@SECTION> 'msg live audio' type = 20



        //<CHAT MODEL DUPLICATE
        function msg_getCurrentChatId() {
            return M_APP.get('connectThisOpenChatId');
        }
        //>CHAT MODEL DUPLICATE

        return _;
    }
);