/*!
 * jQuery Cookie Plugin v1.3
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function ($, document, undefined) {

    var pluses = /\+/g;

    function raw(s) {
        return s;
    }

    function decoded(s) {
        return decodeURIComponent(s.replace(pluses, ' '));
    }

    var config = $.cookie = function (key, value, options) {

        // write
        if (value !== undefined) {
            options = $.extend({}, config.defaults, options);

            if (value === null) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = config.json ? JSON.stringify(value) : String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // read
        var decode = config.raw ? raw : decoded;
        var cookies = document.cookie.split('; ');
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            if (decode(parts.shift()) === key) {
                var cookie = decode(parts.join('='));
                return config.json ? JSON.parse(cookie) : cookie;
            }
        }

        return null;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) !== null) {
            $.cookie(key, null, options);
            return true;
        }
        return false;
    };

})(jQuery, document);


if (typeof stb === "undefined")
    var stb = {};
jQuery(document).ready(function () {
    jQuery("#closebox").click(function () {
        jQuery('#scrolltriggered').stop(true, true).animate({ 'bottom':'-210px' }, 500, function () {
            jQuery('#scrolltriggered').hide();
            stb.hascolsed = true;
            jQuery.cookie('nopopup', 'true', { expires: stb.cookieLife, path: '/' });
        });
        return false;
    });

    stb.windowheight = jQuery(window).height();
    stb.totalheight = jQuery(document).height();
    stb.boxOffset = '';
    if (stb.stbElement != '') {
        stb.boxOffset = jQuery(stb.stbElement).offset().top;
    }
    jQuery(window).resize(function () {
        stb.windowheight = jQuery(window).height();
        stb.totalheight = jQuery(document).height();
    });

    jQuery(window).scroll(function () {
        stb.y = jQuery(window).scrollTop();
        stb.boxHeight = jQuery('#scrolltriggered').outerHeight();
        stb.scrolled = parseInt((stb.y + stb.windowheight) / stb.totalheight * 100);


        if (stb.showBox(stb.scrolled, stb.triggerHeight, stb.y) && jQuery('#scrolltriggered').is(":hidden") && stb.hascolsed != true) {
            jQuery('#scrolltriggered').show();
            jQuery('#scrolltriggered').stop(true, true).animate({ 'bottom':'10px' }, 500, function () {
            });
        }
        else if (!stb.showBox(stb.scrolled, stb.triggerHeight, stb.y) && jQuery('#scrolltriggered').is(":visible") && jQuery('#scrolltriggered:animated').length < 1) {
            jQuery('#scrolltriggered').stop(true, true).animate({ 'bottom':-stb.boxHeight }, 500, function () {
                jQuery('#scrolltriggered').hide();
            });
        }
    });

    jQuery('#stbContactForm').submit(function (e) {
        e.preventDefault();
        stb.data = jQuery('#stbContactForm').serialize();

        jQuery.ajax({
            url:stbAjax.ajaxurl,
            data:{
                action:'stb_form_process',
                stbNonce:stbAjax.stbNonce,
                data:stb.data
            },
            dataType:'html',
            type:'post'

        }).done(function (data) {
            jQuery('#stbMsgArea').html(data).show('fast');
        });

        return false;
    });
});

(function(stb_helpers) {
    stb_helpers.showBox = function(scrolled, triggerHeight, y) {
        if (stb.isMobile()) return false;
        if (stb.stbElement == '') {
            if (scrolled >= triggerHeight) {
                return true;
            }
        }
        else {
            if (stb.boxOffset < (stb.windowheight + y)) {
                return true;
            }
        }
        return false;
    };
    stb_helpers.isMobile = function(){
        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            ) {
            return true;
        }
        else return false;
    }
})(stb);

/**
 * navigation.js
 *
 * Handles toggling the navigation menu for small screens.
 */
( function() {
    var container, button, menu;

    container = document.getElementById( 'site-navigation' );
    if ( ! container )
        return;

    button = container.getElementsByTagName( 'button' )[0];
    if ( 'undefined' === typeof button )
        return;

    menu = container.getElementsByTagName( 'ul' )[0];

    // Hide menu toggle button if menu is empty and return early.
    if ( 'undefined' === typeof menu ) {
        button.style.display = 'none';
        return;
    }

    if ( -1 === menu.className.indexOf( 'nav-menu' ) )
        menu.className += ' nav-menu';

    button.onclick = function() {
        if ( -1 !== container.className.indexOf( 'toggled' ) )
            container.className = container.className.replace( ' toggled', '' );
        else
            container.className += ' toggled';
    };
} )();

( function() {
    var is_webkit = navigator.userAgent.toLowerCase().indexOf( 'webkit' ) > -1,
        is_opera  = navigator.userAgent.toLowerCase().indexOf( 'opera' )  > -1,
        is_ie     = navigator.userAgent.toLowerCase().indexOf( 'msie' )   > -1;

    if ( ( is_webkit || is_opera || is_ie ) && document.getElementById && window.addEventListener ) {
        window.addEventListener( 'hashchange', function() {
            var element = document.getElementById( location.hash.substring( 1 ) );

            if ( element ) {
                if ( ! /^(?:a|select|input|button|textarea)$/i.test( element.tagName ) )
                    element.tabIndex = -1;

                element.focus();
            }
        }, false );
    }
})();

(function($){

    function inputFocus(){
        var input = $(this);
        if (input.val() === input.attr('placeholder')) {
            input.val('');
            input.removeClass('placeholder');
        }
    }

    function inputBlur(){
        var input = $(this);
        if (input.val() === '' || input.val() === input.attr('placeholder')) {
            input.addClass('placeholder');
            input.val(input.attr('placeholder'));
        }
    }

    function removePlaceholderValue(){
        var input = $(this);
        if (input.val() === input.attr('placeholder')) {
            input.val('');
        }
    }

    function formSubmit(){
        $(this).find('[placeholder]').each( removePlaceholderValue );
    }

    // Polyfill for placeholder attribute for older browsers
    function placeholderPolyfill(element){

        var placeholderSupported = !!( 'placeholder' in document.createElement('input') );

        if (!placeholderSupported){

            // If the input has the attribute 'nopolyfill' we skip it. Useful for login page
            var selector     = '[placeholder]:not([nopolyfill])',
                placeholders = element instanceof $ ? element.find(selector) : $(selector),
                forms        = placeholders.parents('form');

            placeholders
                .on('focus', inputFocus)
                .on('blur',  inputBlur)
                .trigger('blur');

            forms.submit( formSubmit );
        }
    }

    placeholderPolyfill();

}(jQuery));

/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-touch-shiv-cssclasses-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes
 */
window.Modernizr=function(a,b,c){function B(a){j.cssText=a}function C(a,b){return B(n.join(a+";")+(b||""))}function D(a,b){return typeof a===b}function E(a,b){return!!~(""+a).indexOf(b)}function F(a,b){for(var d in a){var e=a[d];if(!E(e,"-")&&j[e]!==c)return b=="pfx"?e:!0}return!1}function G(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:D(f,"function")?f.bind(d||b):f}return!1}function H(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+p.join(d+" ")+d).split(" ");return D(b,"string")||D(b,"undefined")?F(e,b):(e=(a+" "+q.join(d+" ")+d).split(" "),G(e,b,c))}function I(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)t[c[d]]=c[d]in k;return t.list&&(t.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),t}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),e.inputtypes=function(a){for(var d=0,e,f,h,i=a.length;d<i;d++)k.setAttribute("type",f=a[d]),e=k.type!=="text",e&&(k.value=l,k.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(f)&&k.style.WebkitAppearance!==c?(g.appendChild(k),h=b.defaultView,e=h.getComputedStyle&&h.getComputedStyle(k,null).WebkitAppearance!=="textfield"&&k.offsetHeight!==0,g.removeChild(k)):/^(search|tel)$/.test(f)||(/^(url|email)$/.test(f)?e=k.checkValidity&&k.checkValidity()===!1:e=k.value!=l)),s[a[d]]=!!e;return s}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var d="2.6.2",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k=b.createElement("input"),l=":)",m={}.toString,n=" -webkit- -moz- -o- -ms- ".split(" "),o="Webkit Moz O ms",p=o.split(" "),q=o.toLowerCase().split(" "),r={},s={},t={},u=[],v=u.slice,w,x=function(a,c,d,e){var f,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),l.appendChild(j);return f=["&#173;",'<style id="s',h,'">',a,"</style>"].join(""),l.id=h,(m?l:n).innerHTML+=f,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=g.style.overflow,g.style.overflow="hidden",g.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),g.style.overflow=k),!!i},y=function(){function d(d,e){e=e||b.createElement(a[d]||"div"),d="on"+d;var f=d in e;return f||(e.setAttribute||(e=b.createElement("div")),e.setAttribute&&e.removeAttribute&&(e.setAttribute(d,""),f=D(e[d],"function"),D(e[d],"undefined")||(e[d]=c),e.removeAttribute(d))),e=null,f}var a={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return d}(),z={}.hasOwnProperty,A;!D(z,"undefined")&&!D(z.call,"undefined")?A=function(a,b){return z.call(a,b)}:A=function(a,b){return b in a&&D(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=v.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(v.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(v.call(arguments)))};return e}),r.canvas=function(){var a=b.createElement("canvas");return!!a.getContext&&!!a.getContext("2d")},r.canvastext=function(){return!!e.canvas&&!!D(b.createElement("canvas").getContext("2d").fillText,"function")},r.touch=function(){var c;return"ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch?c=!0:x(["@media (",n.join("touch-enabled),("),h,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(a){c=a.offsetTop===9}),c},r.postmessage=function(){return!!a.postMessage},r.websqldatabase=function(){return!!a.openDatabase},r.indexedDB=function(){return!!H("indexedDB",a)},r.hashchange=function(){return y("hashchange",a)&&(b.documentMode===c||b.documentMode>7)},r.history=function(){return!!a.history&&!!history.pushState},r.draganddrop=function(){var a=b.createElement("div");return"draggable"in a||"ondragstart"in a&&"ondrop"in a},r.websockets=function(){return"WebSocket"in a||"MozWebSocket"in a},r.video=function(){var a=b.createElement("video"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/,""),c.h264=a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/,""),c.webm=a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,"")}catch(d){}return c},r.audio=function(){var a=b.createElement("audio"),c=!1;try{if(c=!!a.canPlayType)c=new Boolean(c),c.ogg=a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),c.mp3=a.canPlayType("audio/mpeg;").replace(/^no$/,""),c.wav=a.canPlayType('audio/wav; codecs="1"').replace(/^no$/,""),c.m4a=(a.canPlayType("audio/x-m4a;")||a.canPlayType("audio/aac;")).replace(/^no$/,"")}catch(d){}return c},r.localstorage=function(){try{return localStorage.setItem(h,h),localStorage.removeItem(h),!0}catch(a){return!1}},r.sessionstorage=function(){try{return sessionStorage.setItem(h,h),sessionStorage.removeItem(h),!0}catch(a){return!1}},r.webworkers=function(){return!!a.Worker},r.applicationcache=function(){return!!a.applicationCache};for(var J in r)A(r,J)&&(w=J.toLowerCase(),e[w]=r[J](),u.push((e[w]?"":"no-")+w));return e.input||I(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)A(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof f!="undefined"&&f&&(g.className+=" "+(b?"":"no-")+a),e[a]=b}return e},B(""),i=k=null,function(a,b){function k(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function l(){var a=r.elements;return typeof a=="string"?a.split(" "):a}function m(a){var b=i[a[g]];return b||(b={},h++,a[g]=h,i[h]=b),b}function n(a,c,f){c||(c=b);if(j)return c.createElement(a);f||(f=m(c));var g;return f.cache[a]?g=f.cache[a].cloneNode():e.test(a)?g=(f.cache[a]=f.createElem(a)).cloneNode():g=f.createElem(a),g.canHaveChildren&&!d.test(a)?f.frag.appendChild(g):g}function o(a,c){a||(a=b);if(j)return a.createDocumentFragment();c=c||m(a);var d=c.frag.cloneNode(),e=0,f=l(),g=f.length;for(;e<g;e++)d.createElement(f[e]);return d}function p(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return r.shivMethods?n(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+l().join().replace(/\w+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(r,b.frag)}function q(a){a||(a=b);var c=m(a);return r.shivCSS&&!f&&!c.hasCSS&&(c.hasCSS=!!k(a,"article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")),j||p(a,c),a}var c=a.html5||{},d=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,e=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,f,g="_html5shiv",h=0,i={},j;(function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",f="hidden"in a,j=a.childNodes.length==1||function(){b.createElement("a");var a=b.createDocumentFragment();return typeof a.cloneNode=="undefined"||typeof a.createDocumentFragment=="undefined"||typeof a.createElement=="undefined"}()}catch(c){f=!0,j=!0}})();var r={elements:c.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:c.shivCSS!==!1,supportsUnknownElements:j,shivMethods:c.shivMethods!==!1,type:"default",shivDocument:q,createElement:n,createDocumentFragment:o};a.html5=r,q(b)}(this,b),e._version=d,e._prefixes=n,e._domPrefixes=q,e._cssomPrefixes=p,e.hasEvent=y,e.testProp=function(a){return F([a])},e.testAllProps=H,e.testStyles=x,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+u.join(" "):""),e}(this,this.document);

(function (root, ns, factory) {
    'use strict';
    if (typeof(module) !== 'undefined' && module.exports) {
        module.exports = factory(ns, root);
    } else if (typeof(define) === 'function' && define.amd) {
        define('factory', function () {
            return factory(ns, root);
        });
    } else {root[ns] = factory(ns, root);
    }
}
(window, 'detectZoom', function () {
    var devicePixelRatio = function () {
        return window.devicePixelRatio || 1;
    };
    var fallback = function () {
        return {zoom: 1, devicePxPerCssPx: 1};
    };
    var ie8 = function () {var zoom = Math.round((screen.deviceXDPI / screen.logicalXDPI) * 100) / 100;
        return {zoom: zoom, devicePxPerCssPx: zoom * devicePixelRatio()};
    };
    var ie10 = function () {var zoom = Math.round((document.documentElement.offsetHeight / window.innerHeight) * 100) / 100;
        return {zoom: zoom, devicePxPerCssPx: zoom * devicePixelRatio()};
    };
    var webkitMobile=function(){var deviceWidth=(Math.abs(window.orientation)==90)?screen.height:screen.width;var zoom=deviceWidth/window.innerWidth;return{zoom:zoom,devicePxPerCssPx:zoom*devicePixelRatio()};};var webkit=function(){var important=function(str){return str.replace(/;/g," !important;");};var div=document.createElement('div');div.innerHTML="1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>0";div.setAttribute('style',important('font: 100px/1em sans-serif; -webkit-text-size-adjust: none; text-size-adjust: none; height: auto; width: 1em; padding: 0; overflow: visible;'));var container=document.createElement('div');container.setAttribute('style',important('width:0; height:0; overflow:hidden; visibility:hidden; position: absolute;'));container.appendChild(div);document.body.appendChild(container);var zoom=1000/div.clientHeight;zoom=Math.round(zoom*100)/100;document.body.removeChild(container);return{zoom:zoom,devicePxPerCssPx:zoom*devicePixelRatio()};};var firefox4=function(){var zoom=mediaQueryBinarySearch('min--moz-device-pixel-ratio','',0,10,20,0.0001);zoom=Math.round(zoom*100)/100;return{zoom:zoom,devicePxPerCssPx:zoom};};var firefox18=function(){return{zoom:firefox4().zoom,devicePxPerCssPx:devicePixelRatio()};};var opera11=function(){var zoom=window.top.outerWidth/window.top.innerWidth;zoom=Math.round(zoom*100)/100;return{zoom:zoom,devicePxPerCssPx:zoom*devicePixelRatio()};};var mediaQueryBinarySearch=function(property,unit,a,b,maxIter,epsilon){var matchMedia;var head,style,div;if(window.matchMedia){matchMedia=window.matchMedia;}else{head=document.getElementsByTagName('head')[0];style=document.createElement('style');head.appendChild(style);div=document.createElement('div');div.className='mediaQueryBinarySearch';div.style.display='none';document.body.appendChild(div);matchMedia=function(query){style.sheet.insertRule('@media '+query+'{.mediaQueryBinarySearch '+'{text-decoration: underline} }',0);var matched=getComputedStyle(div,null).textDecoration=='underline';style.sheet.deleteRule(0);return{matches:matched};};}
        var ratio=binarySearch(a,b,maxIter);if(div){head.removeChild(style);document.body.removeChild(div);}
        return ratio;function binarySearch(a,b,maxIter){var mid=(a+b)/2;if(maxIter<=0||b-a<epsilon){return mid;}
            var query="("+property+":"+mid+unit+")";if(matchMedia(query).matches){return binarySearch(mid,b,maxIter-1);}else{return binarySearch(a,mid,maxIter-1);}}};var detectFunction=(function(){var func=fallback;if(!isNaN(screen.logicalXDPI)&&!isNaN(screen.systemXDPI)){func=ie8;}
    else if(window.navigator.msMaxTouchPoints){func=ie10;}
    else if('orientation'in window&&typeof document.body.style.webkitMarquee==='string'){func=webkitMobile;}
    else if(typeof document.body.style.webkitMarquee==='string'){func=webkit;}
    else if(navigator.userAgent.indexOf('Opera')>=0){func=opera11;}
    else if(window.devicePixelRatio){func=firefox18;}
    else if(firefox4().zoom>0.001){func=firefox4;}
        return func;}());return({zoom:function(){return detectFunction().zoom;},device:function(){return detectFunction().devicePxPerCssPx;}});}));var wpcom_img_zoomer={zoomed:false,timer:null,interval:1000,imgNeedsSizeAtts:function(img){if(img.getAttribute('width')!==null||img.getAttribute('height')!==null)
    return false;if(img.width<img.naturalWidth||img.height<img.naturalHeight)
    return false;return true;},init:function(){var t=this;try{t.zoomImages();t.timer=setInterval(function(){t.zoomImages();},t.interval);}
catch(e){}},stop:function(){if(this.timer)
    clearInterval(this.timer);},getScale:function(){var scale=detectZoom.device();if(scale<=1.0)scale=1.0;else if(scale<=1.5)scale=1.5;else if(scale<=2.0)scale=2.0;else if(scale<=3.0)scale=3.0;else if(scale<=4.0)scale=4.0;else scale=5.0;return scale;},shouldZoom:function(scale){var t=this;if("innerWidth"in window&&!window.innerWidth)
    return false;if(scale==1.0&&t.zoomed==false)
    return false;return true;},zoomImages:function(){var t=this;var scale=t.getScale();if(!t.shouldZoom(scale)){return;}
    t.zoomed=true;var imgs=document.getElementsByTagName("img");for(var i=0;i<imgs.length;i++){if("complete"in imgs[i]&&!imgs[i].complete)
        continue;var imgScale=imgs[i].getAttribute("scale");if(imgScale==scale||imgScale=="0")
        continue;var scaleFail=imgs[i].getAttribute("scale-fail");if(scaleFail&&scaleFail<=scale)
        continue;if(!(imgs[i].width&&imgs[i].height))
        continue;if(!imgScale&&imgs[i].getAttribute("data-lazy-src")&&(imgs[i].getAttribute("data-lazy-src")!==imgs[i].getAttribute("src")))
        continue;if(t.scaleImage(imgs[i],scale)){imgs[i].setAttribute("scale",scale);}
    else{imgs[i].setAttribute("scale","0");}}},scaleImage:function(img,scale){var t=this;var newSrc=img.src;if(img.parentNode.className.match(/slideshow-slide/))
    return false;if(img.src.match(/^https?:\/\/([^\/]*\.)?gravatar\.com\/.+[?&](s|size)=/)){newSrc=img.src.replace(/([?&](s|size)=)(\d+)/,function($0,$1,$2,$3){var originalAtt="originals",originalSize=img.getAttribute(originalAtt);if(originalSize===null){originalSize=$3;img.setAttribute(originalAtt,originalSize);if(t.imgNeedsSizeAtts(img)){img.width=img.width;img.height=img.height;}}
    var size=img.clientWidth;var targetSize=Math.ceil(img.clientWidth*scale);targetSize=Math.max(targetSize,originalSize);targetSize=Math.min(targetSize,512);return $1+targetSize;});}
else if(img.src.match(/^https?:\/\/([^\/]+)\.files\.wordpress\.com\/.+[?&][wh]=/)){if(img.src.match(/[?&]crop/))
    return false;var changedAttrs={};var matches=img.src.match(/([?&]([wh])=)(\d+)/g);for(var i=0;i<matches.length;i++){var lr=matches[i].split('=');var thisAttr=lr[0].replace(/[?&]/g,'');var thisVal=lr[1];var originalAtt='original'+thisAttr,originalSize=img.getAttribute(originalAtt);if(originalSize===null){originalSize=thisVal;img.setAttribute(originalAtt,originalSize);if(t.imgNeedsSizeAtts(img)){img.width=img.width;img.height=img.height;}}
    var size=thisAttr=='w'?img.clientWidth:img.clientHeight;var naturalSize=(thisAttr=='w'?img.naturalWidth:img.naturalHeight);var targetSize=Math.ceil(size*scale);targetSize=Math.max(targetSize,originalSize);if(scale>img.getAttribute("scale")&&targetSize<=naturalSize)
        targetSize=thisVal;if(naturalSize<thisVal)
        targetSize=thisVal;if(targetSize!=thisVal)
        changedAttrs[thisAttr]=targetSize;}
    var w=changedAttrs.w||false;var h=changedAttrs.h||false;if(w){newSrc=img.src.replace(/([?&])w=\d+/g,function($0,$1){return $1+'w='+w;});}
    if(h){newSrc=newSrc.replace(/([?&])h=\d+/g,function($0,$1){return $1+'h='+h;});}}
else if(img.src.match(/^https?:\/\/([^\/]+\.)*(wordpress|wp)\.com\/mshots\/.+[?&]w=\d+/)){newSrc=img.src.replace(/([?&]w=)(\d+)/,function($0,$1,$2){var originalAtt='originalw',originalSize=img.getAttribute(originalAtt);if(originalSize===null){originalSize=$2;img.setAttribute(originalAtt,originalSize);if(t.imgNeedsSizeAtts(img)){img.width=img.width;img.height=img.height;}}
    var size=img.clientWidth;var targetSize=Math.ceil(size*scale);targetSize=Math.max(targetSize,originalSize);if(scale>img.getAttribute("scale")&&targetSize<=img.naturalWidth)
        targetSize=$2;if($2!=targetSize)
        return $1+targetSize;return $0;});}
else if(img.src.match(/^https?:\/\/([^\/.]+\.)*(wp|wordpress)\.com\/imgpress\?(.+)/)){var imgpressSafeFunctions=["zoom","url","h","w","fit","filter","brightness","contrast","colorize","smooth","unsharpmask"];var qs=RegExp.$3.split('&');for(var q in qs){q=qs[q].split('=')[0];if(imgpressSafeFunctions.indexOf(q)==-1){return false;}}
    img.width=img.width;img.height=img.height;if(scale==1)
        newSrc=img.src.replace(/\?(zoom=[^&]+&)?/,'?');else
        newSrc=img.src.replace(/\?(zoom=[^&]+&)?/,'?zoom='+scale+'&');}
else if(img.src.match(/^https?:\/\/([^\/.]+\.)*(wp|wordpress)\.com\/latex\.php\?(latex|zoom)=(.+)/)||img.src.match(/^https?:\/\/i[\d]{1}\.wp\.com\/(.+)/)){img.width=img.width;img.height=img.height;if(scale==1)
    newSrc=img.src.replace(/\?(zoom=[^&]+&)?/,'?');else
    newSrc=img.src.replace(/\?(zoom=[^&]+&)?/,'?zoom='+scale+'&');}
else if(img.src.match(/^https?:\/\/[^\/]+\/.*[-@]([12])x\.(gif|jpeg|jpg|png)(\?|$)/)){img.width=img.width;img.height=img.height;var currentSize=RegExp.$1,newSize=currentSize;if(scale<=1)
    newSize=1;else
    newSize=2;if(currentSize!=newSize)
    newSrc=img.src.replace(/([-@])[12]x\.(gif|jpeg|jpg|png)(\?|$)/,'$1'+newSize+'x.$2$3');}
else{return false;}
    if(newSrc!=img.src){var prevSrc,origSrc=img.getAttribute("src-orig");if(!origSrc){origSrc=img.src;img.setAttribute("src-orig",origSrc);}
        prevSrc=img.src;img.onerror=function(){img.src=prevSrc;if(img.getAttribute("scale-fail")<scale)
            img.setAttribute("scale-fail",scale);img.onerror=null;};img.src=newSrc;}
    return true;}};wpcom_img_zoomer.init();


var dd_top = 0,
    dd_left = 0,
    dd_offset_from_content = 135,
    dd_top_offset_from_content = 0,
    dd_override_start_anchor_id = 'content',
    dd_override_top_offset = '0';

jQuery(document).ready(function () {

    var $floating_bar = jQuery('#dd_ajax_float'),
        dd_anchorId = 'dd_start',
        $dd_start,
        $dd_end,
        $dd_outer;

    if (typeof dd_override_start_anchor_id !== 'undefined' && dd_override_start_anchor_id.length > 0) {
        dd_anchorId = dd_override_start_anchor_id;
    }

    $dd_start = jQuery('#' + dd_anchorId);
    $dd_end = jQuery('#dd_end');
    $dd_outer = jQuery('.dd_outer');

    // first, move the floating bar out of the content to avoid position: relative issues
    $dd_outer.appendTo('body');

    if (typeof dd_override_top_offset !== 'undefined' && dd_override_top_offset.length > 0) {
        dd_top_offset_from_content = parseInt(dd_override_top_offset, 10);
    }
    dd_top = parseInt($dd_start.offset().top, 10) + dd_top_offset_from_content;

    if ($dd_end.length) {
        $dd_end = parseInt($dd_end.offset().top, 10);
    }

    dd_left = -(dd_offset_from_content + 55);

    dd_adjust_inner_width();
    dd_position_floating_bar(dd_top, dd_left);

    $floating_bar.fadeIn('slow');

    if ($floating_bar.length > 0) {

        var pullX = $floating_bar.css('margin-left');

        jQuery(window).scroll(function () {

            var scroll_from_top = jQuery(window).scrollTop() + 30,
                is_fixed = $dd_outer.css('position') === 'fixed';

            if ($dd_end.length){
                var dd_ajax_float_bottom = $dd_end - ($floating_bar.height() + 30);
            }

            if ($floating_bar.length > 0)
            {
                if (scroll_from_top > dd_ajax_float_bottom && $dd_end.length) {
                    dd_position_floating_bar (dd_ajax_float_bottom, dd_left);
                    $dd_outer.css('position', 'absolute');
                }
                else if (scroll_from_top > dd_top && !is_fixed)
                {
                    dd_position_floating_bar(30, dd_left);
                    $dd_outer.css('position', 'fixed');
                }
                else if (scroll_from_top < dd_top && is_fixed)
                {
                    dd_position_floating_bar(dd_top, dd_left);
                    $dd_outer.css('position', 'absolute');
                }

            }

        });
    }

    // Load Linked In Sharers (Resolves issue with position on page)
    if(jQuery('.dd-linkedin-share').length){
        jQuery('.dd-linkedin-share div').each(function(index) {
            var $linkedinSharer = jQuery(this);

            var linkedinShareURL = $linkedinSharer.attr('data-url');
            var linkedinShareCounter = $linkedinSharer.attr('data-counter');

            var linkedinShareCode = jQuery('<script>').attr('type', 'unparsed-IN/Share').attr('data-url', linkedinShareURL).attr('data-counter', linkedinShareCounter);

            $linkedinSharer.html(linkedinShareCode);

            IN.Event.on(IN, 'systemReady', function () {
                $linkedinSharer.children('script').first().attr('type', 'IN/Share');
                IN.parse();
            });
        });
    }

});


jQuery(window).resize(function () {
    dd_adjust_inner_width();
});

var dd_is_hidden = false;
var dd_resize_timer;
function dd_adjust_inner_width() {

    var $dd_inner = jQuery('.dd_inner'),
        $dd_floating_bar = jQuery('#dd_ajax_float'),
        dd_should_be_hidden,
        dd_is_hidden,
        width = parseInt(jQuery(window).width() - (jQuery('#dd_start').offset().left * 2));

    $dd_inner.width(width);
    dd_should_be_hidden = (((jQuery(window).width() - width) / 2) < -dd_left);
    dd_is_hidden = $dd_floating_bar.is(':hidden');

    if (dd_should_be_hidden && !dd_is_hidden)
    {
        clearTimeout(dd_resize_timer);
        dd_resize_timer = setTimeout(function () { jQuery('#dd_ajax_float').fadeOut(); }, -dd_left);
    }
    else if (!dd_should_be_hidden && dd_is_hidden)
    {
        clearTimeout(dd_resize_timer);
        dd_resize_timer = setTimeout(function () { jQuery('#dd_ajax_float').fadeIn(); }, -dd_left);
    }
}

function dd_position_floating_bar(top, left, position) {
    var $floating_bar = jQuery('#dd_ajax_float');
    if (top === undefined) {top = 0 + dd_top_offset_from_content; }
    if (left === undefined) {left = 0; }
    if (position === undefined) {position = 'absolute'; }

    $floating_bar.css({
        position: position,
        top: top + 'px',
        left: left + 'px'
    });
}
