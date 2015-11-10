/**
* Created by David on 15/09/2014.
*/
//pinterest
function pin_this(e, url) {
    jQuery(window).ready(function(jQuery) {
        window.open(url, 'pinterest', 'screenX=100,screenY=100,height=340,width=730');
        e.preventDefault();
        e.stopPropagation();
    });
}

//q2w3-fixed-widget
function q2w3_sidebar(e){function t(){}function f(t){var n=t.offset_top-t.fixed_margin_top;var s=i-e.margin_bottom;var o;if(e.width_inherit)o="inherit";else o=t.obj.css("width");var u=false;var a=false;var f=false;jQuery(window).on("scroll."+e.sidebar,function(e){var i=jQuery(this).scrollTop();if(i+t.fixed_margin_bottom>=s){if(!a){t.obj.css("position","fixed");t.obj.css("top","");t.obj.css("width",o);if(jQuery("#"+t.clone_id).length<=0)t.obj.before(t.clone);a=true;u=false;f=false}t.obj.css("bottom",i+r+t.next_widgets_height-s)}else if(i>=n){if(!u){t.obj.css("position","fixed");t.obj.css("top",t.fixed_margin_top);t.obj.css("bottom","");t.obj.css("width",o);if(jQuery("#"+t.clone_id).length<=0)t.obj.before(t.clone);u=true;a=false;f=false}}else{if(!f){t.obj.css("position","");t.obj.css("top","");t.obj.css("width","");if(jQuery("#"+t.clone_id).length>0)jQuery("#"+t.clone_id).remove();f=true;u=false;a=false}}}).trigger("scroll."+e.sidebar);jQuery(window).on("resize",function(){if(jQuery(window).width()<=e.screen_max_width){jQuery(window).off("load scroll."+e.sidebar);t.obj.css("position","");t.obj.css("top","");t.obj.css("width","");t.obj.css("margin","");t.obj.css("padding","");if(jQuery("#"+t.clone_id).length>0)jQuery("#"+t.clone_id).remove();f=true;u=false;a=false}}).trigger("resize")}if(!e.widgets)return false;if(e.widgets.length<1)return false;if(!e.sidebar)e.sidebar="q2w3-default-sidebar";var n=new Array;var r=jQuery(window).height();var i=jQuery(document).height();var s=e.margin_top;jQuery(".q2w3-widget-clone-"+e.sidebar).remove();for(var o=0;o<e.widgets.length;o++){widget_obj=jQuery("#"+e.widgets[o]);widget_obj.css("position","");if(widget_obj.attr("id")){n[o]=new t;n[o].obj=widget_obj;n[o].clone=widget_obj.clone();n[o].clone.children().remove();n[o].clone_id=widget_obj.attr("id")+"_clone";n[o].clone.addClass("q2w3-widget-clone-"+e.sidebar);n[o].clone.attr("id",n[o].clone_id);n[o].clone.css("height",widget_obj.height());n[o].clone.css("visibility","hidden");n[o].offset_top=widget_obj.offset().top;n[o].fixed_margin_top=s;n[o].height=widget_obj.outerHeight(true);n[o].fixed_margin_bottom=s+n[o].height;s+=n[o].height}else{n[o]=false}}var u=0;var a;for(var o=n.length-1;o>=0;o--){if(n[o]){n[o].next_widgets_height=u;n[o].fixed_margin_bottom+=u;u+=n[o].height;if(!a){a=widget_obj.parent();a.css("height","");a.height(a.height())}}}jQuery(window).off("load scroll."+e.sidebar);for(var o=0;o<n.length;o++){if(n[o])f(n[o])}}

//blackbird pie

(function() {
    var intentRegex = /twitter\.com(\:\d{2,4})?\/intent\/(\w+)/,
        shortIntents = { tweet: true, retweet:true, favorite:true },
        windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes',
        winHeight = screen.height,
        winWidth = screen.width;

    function handleIntent(e) {
        e = e || window.event;
        var target = e.target || e.srcElement,
            m, width, height, left, top;

        while (target && target.nodeName.toLowerCase() !== 'a') {
            target = target.parentNode;
        }

        if (target && target.nodeName.toLowerCase() === 'a' && target.href) {
            m = target.href.match(intentRegex);
            if (m) {
                width = 550;
                height = (m[2] in shortIntents) ? 420 : 560;

                left = Math.round((winWidth / 2) - (width / 2));
                top = 0;

                if (winHeight > height) {
                    top = Math.round((winHeight / 2) - (height / 2));
                }

                window.open(target.href, 'intent', windowOptions + ',width=' + width + ',height=' + height + ',left=' + left + ',top=' + top);
                e.returnValue = false;
                e.preventDefault && e.preventDefault();
            }
        }
    }

    if (document.addEventListener) {
        document.addEventListener('click', handleIntent, false);
    } else if (document.attachEvent) {
        document.attachEvent('onclick', handleIntent);
    }
}());

