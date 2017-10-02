define(['moment'], function (MOMENT) {
	MOMENT.locale(getLocale());

	function getLocale () {
		/*
			@discr
				know user language
			@input
				@required
				@optional
			@deps
			@return void
		*/
		var userLang = navigator.language || navigator.userLanguage; 
		return userLang;
	}
	MOMENT.prototype['getLocale'] = getLocale;

	function offsetDayBetweenTwoDays (iNtime1,iNtime2) {
    	return getDayNumberByTime(iNtime1) - getDayNumberByTime(iNtime2)
    }
	MOMENT.prototype['offsetDayBetweenTwoDays'] = offsetDayBetweenTwoDays;

    function isThisDay (iNtime) {
    	if ( typeof iNtime != 'number' ) iNtime = 0;
		var nowDayCode 		= getDayNumberByTime( getNowTime() );
		var thisDayCode 	= getDayNumberByTime(iNtime);
		if( nowDayCode == thisDayCode ) return true;
		return false;
	}
	MOMENT.prototype['isThisDay'] = isThisDay;



	function isThisWeek (iNtime) {
		var nowTime 		= getNowTime();
		var dayNumber 		= getDayNumberByTime (nowTime);
		var weekDay 		= getWeekDay (nowTime);

		var startDay 		= dayNumber - (weekDay-1);
		var endDay 			= dayNumber + (7-weekDay);
		thisDayNumber 		= getDayNumberByTime(iNtime);

		if( thisDayNumber >= startDay && thisDayNumber <= endDay) return true;

		return false;
	}
	MOMENT.prototype['isThisWeek'] = isThisWeek;

		function getWeekDay (iNtime) {
    		return MOMENT(iNtime).day();
		}
		MOMENT.prototype['getWeekDay'] = getWeekDay;

    function getLightTime (iNtime) {
    	if ( typeof iNtime != 'number' ) iNtime = 0;
    	if( isThisDay(iNtime) ) {
    		// if today 
    		return getTimeMiniText(iNtime);
    	} else if (isThisWeek(iNtime)){
    		// if this week
    		return getWeekDayText();
    	}else {
    		//if other
    		return getFullText(iNtime);
		}
	}
	MOMENT.prototype['getLightTime'] = getLightTime;

		function getDayNumberByTime (iNtime) {
    		var thisTime = new Date(iNtime);
			 return Math.floor(thisTime.getTime() / (1000*60*60*24));
		}
		MOMENT.prototype['getDayNumberByTime'] = getDayNumberByTime;

	    function getTimeMiniText (iNtime) {
	    	return MOMENT(iNtime).format('HH:mm');
		}
		MOMENT.prototype['getTimeMiniText'] = getTimeMiniText;

		function getFullText (iNtime) {
	    	return  MOMENT(iNtime).format('DD/MM/YYYY');
		}
		MOMENT.prototype['getFullText'] = getFullText;

		function getWeekDayText (iNtime) {
			return MOMENT(iNtime).format('dddd'); 
		}
		MOMENT.prototype['getWeekDayText'] = getWeekDayText;

	function getNowTime () {
		return MOMENT.now();
	}
	MOMENT.prototype['getNowTime'] = getNowTime;
	window.moment = MOMENT;
	return MOMENT;	
});