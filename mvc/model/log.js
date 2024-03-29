define(['m_firebase'],function( FIREBASE ) {
  const CONST = {};
  const _ = {};


// window.logState = 0;

function on (){
  window.logState = 1
}
_['on'] = on;

function off () {
  window.logState = 0
}
_['off'] = off;

function checkAccessForLog () {
  if (window.logState) {
    return true;
  }
  return false
}
_['checkAccessForLog'] = checkAccessForLog;


function print (v1,v2,v3,v4,v5,v6,v7,v8) {
  if(!checkAccessForLog()) return false;

  if( typeof v8 != 'undefined' ) {
    console.log(v1,v2,v3,v4,v5,v6,v7,v8);
  } else if (typeof v7 != 'undefined') {
    console.log(v1,v2,v3,v4,v5,v6,v7);
  } else if (typeof v6 != 'undefined') {
    console.log(v1,v2,v3,v4,v5,v6);
  } else if (typeof v5 != 'undefined') {
    console.log(v1,v2,v3,v4,v5);
  } else if (typeof v4 != 'undefined') {
    console.log(v1,v2,v3,v4);
  } else if (typeof v3 != 'undefined') {
    console.log(v1,v2,v3);
  } else if (typeof v2 != 'undefined') {
    console.log(v1,v2);
  } else if (typeof v1 != 'undefined') {
    console.log(v1);
  } else {
    return false;
  }
  return true;
}
_['print'] = print;

function printObject (v1,v2,v3,v4,v5,v6,v7,v8) {

  v1 = JSON.stringify(v1);
  v2 = JSON.stringify(v2);
  v3 = JSON.stringify(v3);
  v4 = JSON.stringify(v4);
  v5 = JSON.stringify(v5);
  v6 = JSON.stringify(v6);
  v7 = JSON.stringify(v7);
  v8 = JSON.stringify(v8);
  return print (v1,v2,v3,v4,v5,v6,v7,v8);
}
_['printObject'] = printObject;


// window.LOG = _;
return _;
});