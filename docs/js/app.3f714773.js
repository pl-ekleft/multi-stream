(function(t){function e(e){for(var i,s,n=e[0],c=e[1],d=e[2],u=0,h=[];u<n.length;u++)s=n[u],o[s]&&h.push(o[s][0]),o[s]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);l&&l(e);while(h.length)h.shift()();return a.push.apply(a,d||[]),r()}function r(){for(var t,e=0;e<a.length;e++){for(var r=a[e],i=!0,n=1;n<r.length;n++){var c=r[n];0!==o[c]&&(i=!1)}i&&(a.splice(e--,1),t=s(s.s=r[0]))}return t}var i={},o={app:0},a=[];function s(e){if(i[e])return i[e].exports;var r=i[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=t,s.c=i,s.d=function(t,e,r){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)s.d(r,i,function(e){return t[e]}.bind(null,i));return r},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var n=window["webpackJsonp"]=window["webpackJsonp"]||[],c=n.push.bind(n);n.push=e,n=n.slice();for(var d=0;d<n.length;d++)e(n[d]);var l=c;a.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("56d7")},"007a":function(t,e,r){},"0466":function(t,e,r){},"42d0":function(t,e,r){},"4dd7":function(t,e,r){"use strict";var i=r("007a"),o=r.n(i);o.a},"56d7":function(t,e,r){"use strict";r.r(e);r("cadf"),r("551c"),r("097d");var i=r("2b0e"),o=r("8c4f"),a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("Broadcast")},s=[],n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"wrapper"},t._l(t.windows,function(e,i){return r("div",{key:i,staticClass:"broadcast",class:{"broadcast--disabled":e.disabled,"broadcast--first":i===t.fistWindow,"broadcast--collapse":i===t.collapseWindow,"broadcast--scale":1===t.collapseWindow}},[e.disabled?r("div",{staticClass:"broadcast__append",on:{click:t.addBroadcast}}):t._e(),r("div",{staticClass:"broadcast__bar"},[null!==t.collapseWindow?r("div",{staticClass:"broadcast__btn broadcast__btn--maximize",attrs:{title:"Развернуть окно добавления"},on:{click:function(e){t.toggleWindows(i)}}}):t._e(),e.disabled&&null===t.collapseWindow?r("div",{staticClass:"broadcast__btn broadcast__btn--minimize",attrs:{title:"Свернуть окно"},on:{click:function(e){t.toggleWindows(i)}}}):t._e(),e.chat.url.length?r("div",{staticClass:"broadcast__btn broadcast__btn--chat",attrs:{title:"Показать/скрыть чат"},on:{click:function(e){t.toggleChat(i)}}}):t._e(),i!==t.fistWindow?r("div",{staticClass:"broadcast__btn broadcast__btn--expand",attrs:{title:"Сделать основным"},on:{click:function(e){t.selectWindow(i)}}}):t._e(),r("div",{staticClass:"broadcast__btn broadcast__btn--close",attrs:{title:"Удалить окно"},on:{click:function(e){t.deleteBroadcast(i)}}})]),r("div",{staticClass:"broadcast__number",domProps:{innerHTML:t._s(e.index)}}),r("div",{staticClass:"broadcast__video"},[r("iframe",{attrs:{width:"560",height:"315",src:e.url,frameborder:"0",allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:""}}),r("transition",{attrs:{name:"broadcast__chat-"}},[r("div",{directives:[{name:"show",rawName:"v-show",value:e.chat.show,expression:"win.chat.show"}],staticClass:"broadcast__chat"},[r("iframe",{attrs:{width:"240",height:"315",src:e.chat.url,frameborder:"0",allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:""}})])])],1),r("div",{staticClass:"broadcast__panel"},[r("keep-alive",[r("input",{directives:[{name:"model",rawName:"v-model.trim.lazy",value:e.url,expression:"win.url",modifiers:{trim:!0,lazy:!0}}],attrs:{type:"text",placeholder:"Вставьте URL"},domProps:{value:e.url},on:{change:[function(r){t.$set(e,"url",r.target.value.trim())},function(e){t.lineProcessing(i)}],blur:function(e){t.$forceUpdate()}}})]),r("div",{staticClass:"broadcast__panel-enter",attrs:{title:"Ввод"},on:{click:function(e){t.lineProcessing(i)}}})],1),r("error-box",{attrs:{index:i}})],1)}))},c=[],d=r("f596"),l=r.n(d),u=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("transition",{attrs:{name:"error-"}},[r("div",{directives:[{name:"show",rawName:"v-show",value:t.error.index===t.index,expression:"error.index === index"}],staticClass:"error-box",on:{mouseenter:t.closeError}},[r("div",{staticClass:"error-box__message",domProps:{innerHTML:t._s(t.error.text)}})])])},h=[],w={name:"Error",props:{index:{required:!0,default:""}},data:function(){return{result:{}}},methods:{closeError:function(){this.$store.dispatch("clearError")}},computed:{error:function(){return this.$store.getters.error}}},p=w,b=(r("7ab1"),r("2877")),f=Object(b["a"])(p,u,h,!1,null,null,null);f.options.__file="Error.vue";var v=f.exports,m={name:"Broadcast",data:function(){return{windows:[{index:1,url:"",disabled:0,chat:{url:"",show:1}}],windowsInterator:0,fistWindow:0,collapseWindow:null}},components:{errorBox:v},methods:{lineProcessing:function(t){var e=this.windows[t].url,r=l.a.parse(e);if(void 0===r)return this.$store.dispatch("setError",{text:"Введенный адрес ресурса не поддерживается",index:t}),this.windows[t].url="",this.windows[t].chat.url="",!1;if("youtube"===r.provider){var i="?autoplay=1"+(t?"&mute=1":"&mute=0");if(!r.id)return this.$store.dispatch("setError",{text:"Проверьте URL введенного YouTube канала",index:t}),this.windows[t].url="",this.windows[t].chat.url="",!1;this.windows[t].url="https://www.youtube.com/embed/"+r.id+i,this.windows[t].chat.url="https://www.youtube.com/live_chat?v="+r.id+"&embed_domain="+document.domain}if("twitch"===r.provider){var o="&autoplay=true"+(t?"&muted=true":"&muted=false");if(r.channel&&"directory"!==r.channel)this.windows[t].url="https://player.twitch.tv/?channel="+r.channel+o,this.windows[t].chat.url="https://www.twitch.tv/embed/"+r.channel+"/chat?darkpopout";else{if(!r.id)return this.$store.dispatch("setError",{text:"Проверьте URL введенного Twitch канала",index:t}),this.windows[t].url="",this.windows[t].chat.url="",!1;this.windows[t].url="https://player.twitch.tv/?video="+r.id+o,this.windows[t].chat.url="https://www.twitch.tv/embed/"+r.channel+"/chat?darkpopout"}}},addBroadcast:function(){var t=this.windows[this.windowsInterator];t.disabled=0,this.windowsInterator++,this.$set(this.windows,this.windowsInterator,{url:"",disabled:1,chat:{url:"",show:0},index:t.index+1})},deleteBroadcast:function(t){this.windowsInterator--,this.$delete(this.windows,t)},selectWindow:function(t){this.fistWindow=t},toggleWindows:function(t){null===this.collapseWindow?this.collapseWindow=t:this.collapseWindow=null},toggleChat:function(t){var e=this.windows[t].chat;e.show=!e.show}},mounted:function(){},created:function(){var t=this;this.addBroadcast(),q.$on("urlUpdated",function(){t.windows[0].url="https://www.youtube.com/embed/bpp2KgRSuPQ?autoplay=1",t.lineProcessing(0)})}},_=m,g=(r("4dd7"),Object(b["a"])(_,n,c,!1,null,"80fb9c26",null));g.options.__file="Broadcast.vue";var x=g.exports,S={name:"home",data:function(){return{}},components:{Broadcast:x},methods:{}},y=S,C=(r("dbc2"),Object(b["a"])(y,a,s,!1,null,null,null));C.options.__file="Home.vue";var E=C.exports;i["a"].use(o["a"]);var k=new o["a"]({routes:[{path:"",name:"home",component:E}],mode:"history"}),$=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"app"}},[r("header",{staticClass:"header"},[r("router-link",{staticClass:"logo",attrs:{to:"/"}}),r("span",{staticClass:"guide",on:{click:t.toggleSidebar}})],1),r("Sidebar"),r("error-box",{attrs:{index:"main"}}),r("router-view")],1)},W=[],P=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{directives:[{name:"show",rawName:"v-show",value:t.sidebarShowHold,expression:"sidebarShowHold"}],staticClass:"sidebar"},[r("transition",{attrs:{name:"sidebar__wrapper-"}},[r("div",{directives:[{name:"show",rawName:"v-show",value:t.sidebarShow,expression:"sidebarShow"}],staticClass:"sidebar__wrapper"},[r("div",{staticClass:"sidebar__header"},[r("span",{staticClass:"guide",on:{click:t.toggleSidebar}})]),r("div",{staticClass:"sidebar__content sidebar__content--scroll"},[r("div",{staticClass:"sidebar-group"},[r("div",{staticClass:"sidebar-group__title"},[t._v("\n                        Тестовый функционал\n                    ")]),r("div",{staticClass:"sidebar-group__item",on:{click:t.insertVideo}},[r("span",[t._v("Показать тестовое видео")])]),r("div",{staticClass:"sidebar-group__item",on:{click:t.openError}},[r("span",[t._v("Показать ошибку")])])])]),r("div",{staticClass:"sidebar__footer"},[t._v("\n                Ресурс позволяет пользователю одновременно просматривать несколько стримов или видео с YouTube и Twitch.\n            ")]),r("div",{staticClass:"sidebar__copyright"},[t._v("\n                © 2018 Levin Pavel, MIT\n            ")])])]),r("transition",{attrs:{name:"sidebar__shadow-"}},[r("div",{directives:[{name:"show",rawName:"v-show",value:t.shadowShow,expression:"shadowShow"}],staticClass:"sidebar__shadow",on:{click:t.toggleSidebar}})])],1)},O=[],j={name:"Sidebar",data:function(){return{sidebarShowHold:0,sidebarShow:0,shadowShow:0}},methods:{toggleSidebar:function(){this.sidebarShow=!this.sidebarShow,this.shadowShow=!this.shadowShow,this.sidebarShow?document.querySelector("html").setAttribute("class","hide-scroll"):document.querySelector("html").removeAttribute("class")},insertVideo:function(){q.$emit("urlUpdated"),this.toggleSidebar()},openError:function(){this.$store.dispatch("setError",{text:"Пример общей ошибки",index:"main"}),this.toggleSidebar()}},watch:{sidebarShow:function(){var t=this;this.sidebarShowHold?setTimeout(function(){t.sidebarShowHold=!t.sidebarShowHold},200):this.sidebarShowHold=!this.sidebarShowHold}},created:function(){var t=this;q.$on("sidebarShow",function(){t.toggleSidebar()})}},B=j,H=(r("f203"),Object(b["a"])(B,P,O,!1,null,null,null));H.options.__file="Sidebar.vue";var T=H.exports,L={name:"app",data:function(){return{}},components:{errorBox:v,Sidebar:T},methods:{toggleSidebar:function(){q.$emit("sidebarShow")}},created:function(){}},M=L,I=(r("5c0b"),Object(b["a"])(M,$,W,!1,null,null,null));I.options.__file="App.vue";var N=I.exports,U=r("2f62"),z={state:{loading:!1,error:""},mutations:{setLoading:function(t,e){t.loading=e},setError:function(t,e){t.error=e},clearError:function(t){t.error=""}},actions:{setLoading:function(t,e){var r=t.commit;r("setLoading",e)},setError:function(t,e){var r=t.commit;r("setError",e)},clearError:function(t){var e=t.commit;e("clearError")}},getters:{loading:function(t){return t.loading},error:function(t){return t.error}}};i["a"].use(U["a"]);var R=new U["a"].Store({modules:{common:z}});r.d(e,"eventEmitter",function(){return q}),i["a"].config.productionTip=!1;var q=new i["a"];new i["a"]({render:function(t){return t(N)},router:k,store:R}).$mount("#app")},"5c0b":function(t,e,r){"use strict";var i=r("5e27"),o=r.n(i);o.a},"5e27":function(t,e,r){},"7ab1":function(t,e,r){"use strict";var i=r("42d0"),o=r.n(i);o.a},dbc2:function(t,e,r){"use strict";var i=r("ea59"),o=r.n(i);o.a},ea59:function(t,e,r){},f203:function(t,e,r){"use strict";var i=r("0466"),o=r.n(i);o.a}});
//# sourceMappingURL=app.3f714773.js.map