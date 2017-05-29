/*___________________________________________________________________________________________________________________________________________________
 _ jquery.mb.components                                                                                                                             _
 _                                                                                                                                                  _
 _ file: jquery.mb.browser.js                                                                                                                       _
 _ last modified: 21/06/16 0.59                                                                                                                     _
 _                                                                                                                                                  _
 _ Open Lab s.r.l., Florence - Italy                                                                                                                _
 _                                                                                                                                                  _
 _ email: matteo@open-lab.com                                                                                                                       _
 _ site: http://pupunzi.com                                                                                                                         _
 _       http://open-lab.com                                                                                                                        _
 _ blog: http://pupunzi.open-lab.com                                                                                                                _
 _ Q&A:  http://jquery.pupunzi.com                                                                                                                  _
 _                                                                                                                                                  _
 _ Licences: MIT, GPL                                                                                                                               _
 _    http://www.opensource.org/licenses/mit-license.php                                                                                            _
 _    http://www.gnu.org/licenses/gpl.html                                                                                                          _
 _                                                                                                                                                  _
 _ Copyright (c) 2001-2016. Matteo Bicocchi (Pupunzi);                                                                                              _
 ___________________________________________________________________________________________________________________________________________________*/

/*Browser detection patch*/

var nAgt = navigator.userAgent;

if (!jQuery.browser) {

	function isTouchSupported() {
		var msTouchEnabled = nAgt.msMaxTouchPoints;
		var generalTouchEnabled = "ontouchstart" in document.createElement("div");

		if (msTouchEnabled || generalTouchEnabled) {
			return true;
		}
		return false;
	}

	jQuery.browser = {};
	jQuery.browser.mozilla = false;
	jQuery.browser.webkit = false;
	jQuery.browser.opera = false;
	jQuery.browser.safari = false;
	jQuery.browser.chrome = false;
	jQuery.browser.androidStock = false;
	jQuery.browser.msie = false;
	jQuery.browser.edge = false;

	var getOS = function(){

		var os = {};
		os.name = "Unknown OS";
		if (navigator.appVersion.indexOf("Win")!=-1)
			os.name="Windows";
		if (navigator.appVersion.indexOf("Mac")!=-1)
			os.name="Mac";
		if (navigator.appVersion.indexOf("Linux")!=-1)
			os.name="Linux";

		os.version = "Unknown version";

		/**
		 * MAC
		 */
		if (/Mac OS X/.test(nAgt)) {
			os.version = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
			os.version = os.version.replace(/_/g, ".").substring(0,5);
		}

		/**
		 * WIN
		 */

		if (/Windows NT 5.1/.test(nAgt))
			os.version = "5.1"; // XP
		if (/Windows NT 6.0/.test(nAgt))
			os.version = "6.0"; // Vista
		if (/Windows NT 6.1/.test(nAgt))
			os.version = "6.1"; // 7
		if (/Windows NT 6.2/.test(nAgt))
			os.version = "6.2"; // 8
		if (/Windows NT 10.0/.test(nAgt))
			os.version = "10.0"; // 10

		/**
		 * LINUX
		 */

		if (/Linux/.test(nAgt) && /Linux/.test(nAgt))
			os.version = /Android ([\.\_\d]+)/.exec(nAgt)[1];

		os.name = os.name.toLowerCase();
		os.major_version = parseFloat(os.version.split(".")[0]);
		os.minor_version = parseFloat(os.version.split(".")[1]);

		return os;
	};

	jQuery.browser.os = getOS();


	jQuery.browser.hasTouch = isTouchSupported();

	jQuery.browser.ua = nAgt;

	jQuery.browser.name = navigator.appName;
	jQuery.browser.fullVersion = '' + parseFloat(navigator.appVersion);
	jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10);
	var nameOffset, verOffset, ix;

// In Opera, the true version is after "Opera" or after "Version"
	if ((verOffset = nAgt.indexOf("Opera")) != -1) {
		jQuery.browser.opera = true;
		jQuery.browser.name = "Opera";
		jQuery.browser.fullVersion = nAgt.substring(verOffset + 6);
		if ((verOffset = nAgt.indexOf("Version")) != -1)
			jQuery.browser.fullVersion = nAgt.substring(verOffset + 8);
	}

// In Opera > 20 the true version is after "OPR"
	else if ((verOffset = nAgt.indexOf("OPR")) != -1) {
		jQuery.browser.opera = true;
		jQuery.browser.name = "Opera";
		jQuery.browser.fullVersion = nAgt.substring(verOffset + 4);
	}

// In MSIE < 11, the true version is after "MSIE" in userAgent
	else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
		jQuery.browser.msie = true;
		jQuery.browser.name = "Microsoft Internet Explorer";
		jQuery.browser.fullVersion = nAgt.substring(verOffset + 5);
	}

// In TRIDENT (IE11) => 11, the true version is after "rv:" in userAgent
	else if (nAgt.indexOf("Trident") != -1) {
		jQuery.browser.msie = true;
		jQuery.browser.name = "Microsoft Internet Explorer";
		var start = nAgt.indexOf("rv:") + 3;
		var end = start + 4;
		jQuery.browser.fullVersion = nAgt.substring(start, end);
	}
	else if ( (verOffset = nAgt.indexOf("Edge")) != -1) {
		jQuery.browser.edge = true;
		jQuery.browser.name = "Microsoft Edge";
		jQuery.browser.fullVersion = nAgt.substring(verOffset + 5);
	}

// In Chrome, the true version is after "Chrome"
	else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
		jQuery.browser.webkit = true;
		jQuery.browser.chrome = true;
		jQuery.browser.name = "Chrome";
		jQuery.browser.fullVersion = nAgt.substring(verOffset + 7);
	}

// Android stock browser
	else if (((nAgt.indexOf('mozilla/5.0') > -1 && nAgt.indexOf('android ') > -1 && nAgt.indexOf('applewebkit') > -1) && !(nAgt.indexOf('chrome') > -1))) {

		verOffset = nAgt.indexOf("Chrome");
		jQuery.browser.webkit = true;
		jQuery.browser.androidStock = true;
		jQuery.browser.name = "androidStock";
		jQuery.browser.fullVersion = nAgt.substring(verOffset + 7);
	}

// In Safari, the true version is after "Safari" or after "Version"
	else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
		jQuery.browser.webkit = true;
		jQuery.browser.safari = true;
		jQuery.browser.name = "Safari";
		jQuery.browser.fullVersion = nAgt.substring(verOffset + 7);
		if ((verOffset = nAgt.indexOf("Version")) != -1)
			jQuery.browser.fullVersion = nAgt.substring(verOffset + 8);
	}

// In Safari, the true version is after "Safari" or after "Version"
	else if ((verOffset = nAgt.indexOf("AppleWebkit")) != -1) {
		jQuery.browser.webkit = true;
		jQuery.browser.safari = true;
		jQuery.browser.name = "Safari";
		jQuery.browser.fullVersion = nAgt.substring(verOffset + 7);
		if ((verOffset = nAgt.indexOf("Version")) != -1)
			jQuery.browser.fullVersion = nAgt.substring(verOffset + 8);
	}

// In Firefox, the true version is after "Firefox"
	else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
		jQuery.browser.mozilla = true;
		jQuery.browser.name = "Firefox";
		jQuery.browser.fullVersion = nAgt.substring(verOffset + 8);
	}

// In most other browsers, "name/version" is at the end of userAgent
	else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
		jQuery.browser.name = nAgt.substring(nameOffset, verOffset);
		jQuery.browser.fullVersion = nAgt.substring(verOffset + 1);
		if (jQuery.browser.name.toLowerCase() == jQuery.browser.name.toUpperCase()) {
			jQuery.browser.name = navigator.appName;
		}
	}

// trim the fullVersion string at semicolon/space if present
	if ((ix = jQuery.browser.fullVersion.indexOf(";")) != -1)
		jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix);
	if ((ix = jQuery.browser.fullVersion.indexOf(" ")) != -1)
		jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix);

	jQuery.browser.majorVersion = parseInt('' + jQuery.browser.fullVersion, 10);
	if (isNaN(jQuery.browser.majorVersion)) {
		jQuery.browser.fullVersion = '' + parseFloat(navigator.appVersion);
		jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10);
	}
	jQuery.browser.version = jQuery.browser.majorVersion;

}

/*Check all mobile environments*/
jQuery.browser.android = (/Android/i).test(nAgt);
jQuery.browser.blackberry = /BlackBerry|BB|PlayBook/i.test(nAgt);
jQuery.browser.ios = /iPhone|iPad|iPod|webOS/i.test(nAgt);
jQuery.browser.operaMobile = (/Opera Mini/i).test(nAgt);
jQuery.browser.windowsMobile = /IEMobile|Windows Phone/i.test(nAgt);
jQuery.browser.kindle = /Kindle|Silk/i.test(nAgt);

jQuery.browser.mobile = jQuery.browser.android || jQuery.browser.blackberry || jQuery.browser.ios || jQuery.browser.windowsMobile || jQuery.browser.operaMobile || jQuery.browser.kindle;

jQuery.isMobile = jQuery.browser.mobile;
jQuery.isTablet = jQuery.browser.mobile && jQuery(window).width() > 765;

jQuery.isAndroidDefault = jQuery.browser.android && !(/chrome/i).test(nAgt);
