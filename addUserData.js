
var   nuid = 'edocument';


var addUserData = {
  "info": {
    "data": {
      "icon"    : "https://cdn.ramman.net/images/icons/apps/app_sharepay.png",
      "login"   : "edocument",
      "name"    : "eDocument",
      "phone"   : 79639852525,
      "type"    : 1
      },
    "live": {
      "online"  : 0,
      "status"  : 1,
      "timeout" : 3
      }
  }
};
var pathForAddUser = 'users/' + nuid;
firebase.firestore().doc(pathForAddUser).set(addUserData)



firebase.firestore().collection('/users/769b72df-6e67-465c-9334-b1a8bfb95a1a2/menus').get().then(
  (snapshot) => 
    { 
      if ( snapshot.docChanges.length > 0 ) {
        snapshot.docChanges.forEach( 
          function (change) { 
              var thisDoc     = change.doc;
              var thisDocData = thisDoc.data();
              var thisDocId   = thisDoc.id;

              var pathForAddMenu = 'users/' + nuid + '/menus/' + thisDocId;
              firebase.firestore().doc(pathForAddMenu).set(thisDocData);
              console.log('pathForAddMenu',pathForAddMenu);
          }
        );
      }
    }
)

firebase.firestore().collection('/users/769b72df-6e67-465c-9334-b1a8bfb95a1a2/members').get().then(
  (snapshot) => 
    { 
      if ( snapshot.docChanges.length > 0 ) {
        snapshot.docChanges.forEach( 
          function (change) { 
              var thisDoc     = change.doc;
              var thisDocData = thisDoc.data();
              var thisDocId   = thisDoc.id;

              var pathForAddMember = 'users/' + nuid + '/members/' + thisDocId;
              firebase.firestore().doc(pathForAddMember).set(thisDocData);
              console.log('pathForAddMember',pathForAddMember);
          }
        );
      }
    }
)