!function(t,s){function i(s,i){this.ele=s,this.dom="string"==typeof s?t(s):s,this.domLi=this.dom.children("div"),this.domNav=this.dom.prev("nav").children("a"),this.len=this.domLi.length,this.opts={duration:300,autoPlay:!1,interval:3e3};for(var e in i)this.opts[e]=i[e];if(this.init(),this.opts.autoPlay){var n=this;clearTimeout(n.opts.flag),this.opts.flag=setTimeout(function(){n.autoPlays.call(n)},n.opts.interval)}}i.prototype={init:function(){document.addEventListener("touchmove",function(t){t.preventDefault});var s=this;s.sLen=0,this.dom.css("width",100*this.len+"%"),this.domNav.eq(0).addClass("on"),this.domNav.tap(function(){s.sLen=t(this).index(),s.slider(s.sLen)});var i=function(t){s.startTime=1*new Date,s.startX=t.touches[0].pageX},e=function(t){t.preventDefault(),s.opts.autoPlay&&clearTimeout(s.opts.flag),s.offsetX=t.targetTouches[0].pageX-s.startX,s.lensW=s.lensW||0;var i=s.lensW+s.offsetX+"px",e=s.opts.duration+"ms";s.dom.css({"-webkit-transform":"translateX("+i+")",transform:"translateX("+i+")","-webkit-transition":"all "+e+" ease-out",transition:"all "+e+" ease-out"})},n=function(t){t.preventDefault();var i=1*new Date,e=i-s.startTime,n=s.domLi.width()/2;e>300&&s.offsetX>=n||300>e&&s.offsetX>50?(s.sLen--,s.sLen<0&&(s.sLen=s.len-1),s.slider(s.sLen)):e>300&&s.offsetX<0&&s.offsetX<-n||300>e&&s.offsetX<-50?(s.sLen++,s.sLen>s.len-1&&(s.sLen=0),s.slider(s.sLen)):s.slider(s.sLen),s.opts.autoPlay&&(clearTimeout(s.opts.flag),s.opts.flag=setTimeout(function(){s.autoPlays.call(s)},s.opts.interval))};this.dom.on("touchstart",i).on("touchmove",e).on("touchend",n)},slider:function(t){var s=this.domLi.index(),i=this.opts.duration+"ms",e=this.domLi.width();this.lensW=-t*e,this.lensWPX=-t*e+"px",this.dom.css({"-webkit-transform":"translateX("+this.lensWPX+")",transform:"translateX("+this.lensWPX+")","-webkit-transition":"all "+i+" linear",transition:"all "+i+" linear"}),this.domNav.eq(s+t).addClass("on").siblings().removeClass("on")},autoPlays:function(){var t=this;t.sLen++,t.sLen>t.len-1&&(t.sLen=0),t.slider(t.sLen),t.domNav.eq("+sLen+").tap(),t.opts.autoPlay&&(t.opts.flag=setTimeout(function(){t.autoPlays.call(t)},t.opts.interval))}},s.Scroll=t.Scroll=i}(window.jQuery||window.Zepto,window),function(t,s,i){var e=1,n=function(s){this.settings=t.extend({},n.defaults,s),this.init()};n.defaults={title:"",content:"",type:null,width:"auto",height:"auto",ok:null,cancel:null,callback:null,okText:"确定",cancelText:"取消",time:null,lock:!0,zIndex:99,closes:!0,interval:1e3},n.prototype={init:function(){this.create(),this.settings.lock&&"toast"!=this.settings.type&&this.lock(),isNaN(this.settings.time)||null==this.settings.time||this.time(),t.isFunction(this.settings.callback)&&this.callback()},create:function(){var i=this.settings.type,n=this;switch(i){case"success":var a='<div class="success"><div class="icon"><div class="line-short"></div><div class="line-long"></div></div></div>';this.settings.time=this.settings.interval;break;case"error":var a='<div class="lose"><div class="icon"><div class="icon-box"><div class="line-left"></div><div class="line-right"></div></div></div></div>';this.settings.time=this.settings.interval;break;case"load":var a="<div class='load sm-load'>";a+="<div class='icon-box'>";for(var o=1;4>o;o++)a+="<div class='cirBox"+o+"'>",a+="<div class='cir1'></div>",a+="<div class='cir2'></div>",a+="<div class='cir3'></div>",a+="<div class='cir4'></div>",a+="</div>";a+="</div>",a+="</div>";break;case"tip":var a='<div class="tip"><div class="icon">i</div></div>';this.settings.time=this.settings.interval;break;default:var a='<div class="bat-dialog-hd"><strong class="bat-dialog-title">'+this.settings.title+"</strong></div>"}var l=null;if("toast"==i)!t("#toast").length>0&&t('<div id="toast" style="display: none;"></div>').appendTo("body"),t("#toast").css({zIndex:9999}).show().html(n.settings.content),l&&clearTimeout(l),l=setTimeout(function(){t("#toast").hide()},2e3);else if("url"==i){var d='<section class="dia-box-ifr" style="padding-top: 0; background: #fff;"><h3><a id="diaCloseIfr">关闭</a></h3><div id="diaIfr"></div></section>';n.settings.lock=!1;var c=t(".dia-box-ifr");n.dialog=0==c.length&&t(d).appendTo("body")||c;var r=t("#diaIfr"),h=this.settings.content;r.load(h,function(t,s,i){n.settings.callback(t,s,i)}),t("body").css({overflow:"hidden"}),r.height(t(s).height()),t("#diaCloseIfr").on("click",function(){t("body").css({overflow:"inherit"}),n.dialog.remove(),null==n.dialog.create})}else{var h='<div class="bat-dialog">'+a+'<div class="bat-dialog-bd">'+this.settings.content+'</div><div class="bat-dialog-ft"></div></div>';this.settings.zIndexs=this.settings.zIndex+e++,this.dialog=t("<div>").addClass("bat-dialog-box").css({zIndex:this.settings.zIndexs}).html(h).prependTo("body"),t(".bat-dialog .load").length>0&&"load"==i&&t(".bat-dialog").css({"min-width":"auto"}),(t.isFunction(this.settings.ok)||"alert"==i)&&this.ok(),(t.isFunction(this.settings.cancel)||"confirm"==i)&&this.cancel(),this.size()}},ok:function(){var s=this,i=this.dialog.find(".bat-dialog-ft");t("<a>",{href:"javascript:;",text:this.settings.okText}).addClass("bat-dialog-ok").on("click",function(){if(null==s.settings.ok)s.close();else{var t=s.settings.ok();("undefined"==typeof t||t)&&s.close()}}).prependTo(i)},cancel:function(){var s=this,i=this.dialog.find(".bat-dialog-ft");t("<a>",{href:"javascript:;",text:this.settings.cancelText}).addClass("bat-dialog-cancel").on("click",function(){if(null==s.settings.cancel)s.close();else{var t=s.settings.cancel();("undefined"==typeof t||t)&&s.close()}}).prependTo(i)},callback:function(){if("url"!=this.settings.type){var t=this.settings.callback();1==t&&this.close()}},size:function(){var t=this.dialog.find(".bat-dialog");t.css({width:this.settings.width,height:this.settings.height})},lock:function(){var s=this;this.lock=t("<div>").css({zIndex:this.settings.zIndexs-1}).addClass("bat-mask"),this.lock.appendTo("body"),t(".bat-mask").css({background:"none"}).last().css({background:"rgba(0, 0, 0, 0.6)"}),this.settings.closes&&t(".bat-mask").click(function(){t(this).remove(),s.close()})},unLock:function(){this.settings.lock&&this.lock.remove()},close:function(){this.dialog.remove(),this.unLock(),null==this.dialog.create,t(".bat-mask").length>0&&t(".bat-mask").last().css({background:"rgba(0, 0, 0, 0.6)"})},time:function(){var t=this;this.closeTimer=setTimeout(function(){t.close()},this.settings.time)}};var a=function(t){return new n(t)};s.batDialog=t.batDialog=t.dialog=a}(window.jQuery||window.Zepto,window);