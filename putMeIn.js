
/*
must figure out namespace polution 
*/

/* 
must figure out object oriented programming and making constructors
*/

var sessionTrack = {
			pageOn: [],
			clickPos: [],
			mousePos: [],
			scrollPos: [],
			waitTime: [],
			pageDim: [], // array [ initial dimensions, (resized dim), (resized dim), ... ]
			actionList: [],
			switchTimes: []
			};
var tehDate = Math.floor(Date.now() / 1000);
sessionTrack.switchTimes.push(tehDate);

var posX = 0;
var posY = 0;
var winHeight = 0;
var winWidth = 0;
var waitTime = 0;
var notHovered = true;


(function () {

unloading();


/*_______________________________________________
@@@											
@@@@	Add EventListener For All Links
@@@@@_____________________________________________*/

var aElements = document.getElementsByTagName("a");
for (var i=0; i < aElements.length; i++){    
    aElements[i].addEventListener("click", localSessSave); //should it be on click?
    aElements[i].addEventListener("mouseenter", unloadOff);
    aElements[i].addEventListener("mouseleave", unloadOn);
}

function localSessSave(){
	sessionStorage.sessionTrack = JSON.stringify(sessionTrack);
	}	
	
	
function unloading(){
	var myEvent = window.attachEvent || window.addEventListener;
	var chkevent = window.attachEvent ? 'onbeforeunload' : 'beforeunload'; /// make IE7, IE8 compitable
	myEvent(chkevent, function(e) { // For >=IE7, Chrome, Firefox
		console.log('unloading');
		if (!notHovered){
			sessionTrack.switchTimes.push(Math.floor(Date.now() / 1000));
		}
		else {	
			sessionTrack.switchTimes.push(Math.floor(Date.now() / 1000));
			
			var sTpageOn = JSON.stringify(sessionTrack.pageOn);
			var sTclickPos = JSON.stringify(sessionTrack.clickPos);
			var sTmousePos = JSON.stringify(sessionTrack.mousePos);
			var sTscrollPos = JSON.stringify(sessionTrack.scrollPos);
			var sTwaitTime = JSON.stringify(sessionTrack.waitTime); 
			var sTpageDim = JSON.stringify(sessionTrack.pageDim);
			var sTactionList = JSON.stringify(sessionTrack.actionList);
			var sTswitchTimes = JSON.stringify(sessionTrack.switchTimes);
			var tehLeave = Math.floor(Date.now() / 1000);
$.post("dataCon.php", {sTpageOn:sTpageOn,sTclickPos:sTclickPos,sTmousePos:sTmousePos,sTscrollPos:sTscrollPos,sTwaitTime:sTwaitTime,sTpageDim:sTpageDim,sTactionList:sTactionList,sTswitchTimes:sTswitchTimes,tehDate:tehDate,tehLeave:tehLeave},function(data,data2,data3){});
   /* var confirmationMessage = 'Are you sure to leave the page?';  // a space
            (e || window.event).returnValue = confirmationMessage;
			return confirmationMessage;*/
		}
	});
}	

function unloadOn(){
		notHovered = true;		
}

function unloadOff(){    
		notHovered = false;
}






/*______________________________________________
@@@											
@@@@	Starter & Tracking Functions
@@@@@_____________________________________________*/
$(document).ready(function(){
startTracking();
});

function startTracking() {
    if(typeof(Storage) !== "undefined") {
        if (sessionStorage.sessionTrack) {
             sessionTrack = JSON.parse(sessionStorage.sessionTrack);
			 //DELETE THAT LINE AND INSTEAD SEND QUERY TO SAVE IT TO DATABASE SOMEWHERE
			record();
        } else {
			record();
        }
    } else {
    //     browser does not support web storage
    }
}

function record(){ //onPage enter. push pageON & actions(-1) -> start recording actions
	
	sessionTrack.actionList.push(-1);
	sessionTrack.pageOn.push(window.location.href);
	getWindowSize();
			trackingClicks();
			trackingMovement();
			trackingScroll();
			}

			

function trackingMovement(){ //  mousePos(-2) mouse movement       waitTime(-5)    TIMER BASED + event listener

		var pos = 0;
(function() {
    var mousePos;
	
    document.onmousemove = handleMouseMove;
    setInterval(getMousePosition, 100); // setInterval repeats every X ms

    function handleMouseMove(event) {
        var dot, eventDoc, doc, body, pageX, pageY;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

        mousePos = {
            x: event.pageX,
            y: event.pageY
        };
    }
	
    function getMousePosition() {
        var mPos = mousePos;
		if (!mPos){
		waitTime = waitTime + 1; //recording initial pause of the user after the script has loaded (if user is inactive)
		}
		else{
        if ((posX == mPos.x)&&(posY == mPos.y)) {
			waitTime = waitTime + 1;
        }
        else {
		posX = mousePos.x;
		posY = mousePos.y;
            if (waitTime){
				sessionTrack.actionList.push(-5);
				sessionTrack.waitTime.push(waitTime);
				waitTime = 0;
				sessionTrack.actionList.push(-2);
				sessionTrack.mousePos.push(posX, posY);
			}
			else{
				sessionTrack.actionList.push(-2);
				sessionTrack.mousePos.push(posX, posY);
			}// Use pos.x and pos.y
			
        }
		}
    }
})();
}

function trackingClicks(){ //  clickPos(-3) left clicks
(function() {
    var mousePos;
	
    document.onclick = handleMouseClick;
	

    function handleMouseClick(event) {
        var dot, eventDoc, doc, body, pageX, pageY;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }
		
			if (waitTime){
				sessionTrack.actionList.push(-5);
				sessionTrack.waitTime.push(waitTime);
				waitTime = 0;
				sessionTrack.actionList.push(-3);
				sessionTrack.clickPos.push(event.pageX, event.pageY);
			}
			else{
				sessionTrack.actionList.push(-3);
				sessionTrack.clickPos.push(event.pageX, event.pageY);
			}
		
    }
})();
}

function trackingScroll(){ //  scrollPos(-4) scrolling
(function() {
	
 window.document.documentElement.onscroll = scrollHandle;
 window.document.body.onscroll = scrollHandle;
 
var sx, sy, d= document, r= d.documentElement, b= d.body;

    function scrollHandle(event) {
       
	
event = event || window.event; // IE-ism

	   if(window.pageYOffset!= undefined){
			sx = window.pageXOffset;
			sy = window.pageYOffset;
		}
		else{
			
			sx= r.scrollLeft || b.scrollLeft || 0;
			sy= r.scrollTop || b.scrollTop || 0;
		}
		
		
			if (waitTime){
				sessionTrack.actionList.push(-5);
				sessionTrack.waitTime.push(waitTime);
				waitTime = 0;
				sessionTrack.actionList.push(-4);
				sessionTrack.clickPos.push(event.pageX, event.pageY);
			}
			else{
				sessionTrack.actionList.push(-4);
				sessionTrack.clickPos.push(event.pageX, event.pageY);
			}
			
		
    }
})();
}

function doSomething() {  // pageDim(-5) resizing window
    getWindowSize();
	sessionTrack.actionList.push(-6);
};
var resizeTimer;
$(window).resize(function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(doSomething, 100);
});
function getWindowSize() {
  if( typeof( window.innerWidth ) == 'number' ) {
    //Non-IE
    winWidth = window.innerWidth;
    winHeight = window.innerHeight;
  } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
    //IE 6+ in 'standards compliant mode'
    winWidth = document.documentElement.clientWidth;
    winHeight = document.documentElement.clientHeight;
  } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
    //IE 4 compatible
    winWidth = document.body.clientWidth;
    winHeight = document.body.clientHeight;
  }
  sessionTrack.pageDim.push(winWidth, winHeight);
}


}());

			