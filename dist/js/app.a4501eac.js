(function(t){function e(e){for(var s,a,o=e[0],c=e[1],d=e[2],u=0,h=[];u<o.length;u++)a=o[u],i[a]&&h.push(i[a][0]),i[a]=0;for(s in c)Object.prototype.hasOwnProperty.call(c,s)&&(t[s]=c[s]);l&&l(e);while(h.length)h.shift()();return n.push.apply(n,d||[]),r()}function r(){for(var t,e=0;e<n.length;e++){for(var r=n[e],s=!0,o=1;o<r.length;o++){var c=r[o];0!==i[c]&&(s=!1)}s&&(n.splice(e--,1),t=a(a.s=r[0]))}return t}var s={},i={app:0},n=[];function a(e){if(s[e])return s[e].exports;var r=s[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=t,a.c=s,a.d=function(t,e,r){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)a.d(r,s,function(e){return t[e]}.bind(null,s));return r},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var d=0;d<o.length;d++)e(o[d]);var l=c;n.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("56d7")},"0466":function(t,e,r){},"259a":function(t,e,r){},"42d0":function(t,e,r){},"56d7":function(t,e,r){"use strict";r.r(e);r("cadf"),r("551c"),r("f751"),r("097d");var s=r("2b0e"),i=r("8c4f"),n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("broadcast")},a=[],o=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"wrapper"},t._l(t.windows,function(e,s){return r("div",{key:s,staticClass:"broadcast",class:{"broadcast--loading":e.url,"broadcast--disabled":e.disabled,"broadcast--first":e.index===t.settings.firstWindow&&!e.disabled,"broadcast--hidden":e.index===t.settings.hiddenWindow,"broadcast--scale":1===t.settings.hiddenWindow,"broadcast--flicker":t.checkSelectVideoUrl},on:{click:function(e){t.selectWindow(s,t.checkSelectVideoUrl)}}},[e.disabled?r("div",{staticClass:"broadcast__append",on:{click:t.addBroadcast}}):t._e(),r("div",{staticClass:"broadcast__bar"},[null!==t.settings.hiddenWindow?r("div",{staticClass:"broadcast__btn broadcast__btn--maximize",attrs:{title:"Развернуть окно добавления"},on:{click:function(r){t.toggleWindows(e.index)}}}):t._e(),e.disabled&&null===t.settings.hiddenWindow?r("div",{staticClass:"broadcast__btn broadcast__btn--minimize",attrs:{title:"Свернуть окно"},on:{click:function(r){t.toggleWindows(e.index)}}}):t._e(),e.chat.url.length?r("div",{staticClass:"broadcast__btn broadcast__btn--chat",attrs:{title:"Показать/скрыть чат"},on:{click:function(e){t.toggleChat(s)}}}):t._e(),e.index!==t.settings.firstWindow?r("div",{staticClass:"broadcast__btn broadcast__btn--expand",attrs:{title:"Сделать основным"},on:{click:function(r){t.mainWindow(e.index)}}}):t._e(),r("div",{staticClass:"broadcast__btn broadcast__btn--close",attrs:{title:"Удалить окно"},on:{click:function(r){t.deleteBroadcast(s,e.index)}}})]),r("div",{staticClass:"broadcast__number"},[t._v("\n      "+t._s(e.index)+"\n    ")]),r("div",{staticClass:"broadcast__video"},[r("iframe",{attrs:{width:"560",height:"315",src:e.url,frameborder:"0",allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:""}}),r("transition",{attrs:{name:"broadcast__chat-"}},[r("div",{directives:[{name:"show",rawName:"v-show",value:e.chat.show,expression:"win.chat.show"}],staticClass:"broadcast__chat"},[r("iframe",{attrs:{width:"240",height:"315",src:e.chat.url,frameborder:"0",allow:"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:""}})])])],1),r("div",{staticClass:"broadcast__panel"},[r("keep-alive",[r("input",{directives:[{name:"model",rawName:"v-model.trim.lazy",value:e.url,expression:"win.url",modifiers:{trim:!0,lazy:!0}}],attrs:{type:"text",placeholder:"Вставьте URL"},domProps:{value:e.url},on:{change:[function(r){t.$set(e,"url",r.target.value.trim())},function(e){t.lineProcessing(s)}],blur:function(e){t.$forceUpdate()}}})]),r("div",{staticClass:"broadcast__panel-enter",attrs:{title:"Ввод"},on:{click:function(e){t.lineProcessing(s)}}})],1),r("error-box",{attrs:{index:s}})],1)}),0)},c=[],d=r("f499"),l=r.n(d),u=r("f596"),h=r.n(u),w=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("transition",{attrs:{name:"error-"}},[r("div",{directives:[{name:"show",rawName:"v-show",value:t.error.index===t.index,expression:"error.index === index"}],staticClass:"error-box",on:{mouseenter:t.closeError}},[r("div",{staticClass:"error-box__message"},[t._v("\n      "+t._s(t.error.text)+"\n    ")])])])},f=[],p=(r("c5f6"),{name:"Error",props:{index:{type:[String,Number],required:!0,default:""}},data:function(){return{result:{}}},computed:{error:function(){return this.$store.getters.error}},methods:{closeError:function(){this.$store.dispatch("clearError")}}}),m=p,v=(r("7ab1"),r("2877")),b=Object(v["a"])(m,w,f,!1,null,null,null),g=b.exports,_={name:"Broadcast",components:{errorBox:g},data:function(){return{windows:[{chat:{url:"",show:1},disabled:1,index:1,url:""}],settings:{windowsInterator:0,firstWindow:1,hiddenWindow:null}}},computed:{checkSelectVideoUrl:function(){return this.$store.getters.getSelectVideoUrl}},watch:{windows:function(t){localStorage.windows=l()(t)},settings:{handler:function(t){localStorage.settings=l()(t)},deep:!0}},mounted:function(){localStorage.windows&&(this.windows=JSON.parse(localStorage.windows)),localStorage.settings&&(this.settings=JSON.parse(localStorage.settings))},created:function(){var t=this;localStorage.windows||this.addBroadcast(),ct.$on("urlUpdate",function(e){var r=0;e=e||{url:"https://www.youtube.com/embed/oI3GdbsbDxk",chat:{show:1}},t.lineProcessing(r,e)}),ct.$on("cleanUpdate",function(){t.removeLocalStorage()})},methods:{lineProcessing:function(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=this.windows[t],s=e.url||r.url,i=h.a.parse(s);if(void 0===i&&(this.$store.dispatch("setError",{text:"Введенный адрес ресурса не поддерживается",index:t}),r.url="",r.chat.url=""),e.hasOwnProperty("show")&&(r.chat.show=e.chat.show),"youtube"===i.provider){var n="?autoplay=1"+(t?"&mute=1":"&mute=0");i.id?(r.url="https://www.youtube.com/embed/".concat(i.id).concat(n),r.chat.url="https://www.youtube.com/live_chat?v=".concat(i.id,"&embed_domain=").concat(document.domain)):(this.$store.dispatch("setError",{text:"Проверьте URL введенного YouTube канала",index:t}),r.url="",r.chat.url="")}if("twitch"===i.provider){var a="&autoplay=true"+(t?"&muted=true":"&muted=false");i.channel&&"directory"!==i.channel?(r.url="https://player.twitch.tv/?channel=".concat(i.channel).concat(a),r.chat.url="https://www.twitch.tv/embed/".concat(i.channel,"/chat?darkpopout")):i.id?(r.url="https://player.twitch.tv/?video=".concat(i.id).concat(a),r.chat.url="https://www.twitch.tv/embed/".concat(i.channel,"/chat?darkpopout")):(this.$store.dispatch("setError",{text:"Проверьте URL введенного Twitch канала",index:t}),r.url="",r.chat.url="")}this.$set(this.windows,t,r)},addBroadcast:function(){var t=this.settings,e=this.windows[t.windowsInterator];e.disabled=0,t.windowsInterator++,this.$set(this.windows,t.windowsInterator,{chat:{url:"",show:0},disabled:1,index:e.index+1,url:""})},deleteBroadcast:function(t,e){this.$delete(this.windows,t);var r=this.settings;r.windowsInterator--,r.firstWindow===e&&this.mainWindow(this.windows[0].index),r.windowsInterator||(r.hiddenWindow=null)},mainWindow:function(t){var e=this.settings;e.firstWindow=t},toggleWindows:function(t){var e=this.settings;null===e.hiddenWindow?e.hiddenWindow=t:e.hiddenWindow=null},toggleChat:function(t){var e=this.windows[t],r=e.chat;r.show=!r.show,this.$set(this.windows,t,e)},selectWindow:function(t,e){e&&(this.lineProcessing(t,{url:e}),this.$store.dispatch("clearSelectVideoUrl"))},removeLocalStorage:function(){this.windows=[{chat:{url:"",show:1},disabled:0,index:1,url:""}],this.settings={windowsInterator:0,firstWindow:1,hiddenWindow:null},this.addBroadcast()}}},S=_,x=(r("e9de"),Object(v["a"])(S,o,c,!1,null,"3d2f839f",null)),y=x.exports,C={name:"Home",components:{broadcast:y},data:function(){return{}},methods:{}},k=C,$=Object(v["a"])(k,n,a,!1,null,null,null),U=$.exports,E=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"wrapper"},[r("h1",[t._v("Локальное хранилище:")]),r("pre",[t._v(t._s(t.windows))])])},W=[],R={name:"History",components:{},data:function(){return{windows:{}}},created:function(){this.checkWindows()},methods:{checkWindows:function(){null!==localStorage.windows&&(this.windows=JSON.parse(localStorage.windows))}}},O=R,V=(r("d547"),Object(v["a"])(O,E,W,!1,null,"514a6389",null)),j=V.exports;s["a"].use(i["a"]);var P=new i["a"]({routes:[{path:"",name:"home",component:U},{path:"/history",name:"history",component:j}],mode:"history"}),I=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"app"}},[r("header",{staticClass:"header"},[r("router-link",{staticClass:"logo",attrs:{to:{name:"home"}}}),r("search-bar"),r("span",{staticClass:"guide",on:{click:t.toggleSidebar}})],1),r("transition",{attrs:{name:"shadow-"}},[r("div",{directives:[{name:"show",rawName:"v-show",value:t.checkSearchResult,expression:"checkSearchResult"}],staticClass:"shadow",on:{click:function(e){t.hideSearchResult(!1)}}})]),r("side-bar"),r("error-box",{attrs:{index:"main"}}),r("router-view")],1)},q=[],B=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{directives:[{name:"show",rawName:"v-show",value:t.sidebarShowHold,expression:"sidebarShowHold"}],staticClass:"sidebar"},[r("transition",{attrs:{name:"sidebar__wrapper-"}},[r("div",{directives:[{name:"show",rawName:"v-show",value:t.sidebarShow,expression:"sidebarShow"}],staticClass:"sidebar__wrapper"},[r("div",{staticClass:"sidebar__header"},[r("span",{staticClass:"guide",on:{click:t.toggleSidebar}})]),r("div",{staticClass:"sidebar__content sidebar__content--scroll"},[r("div",{staticClass:"sidebar-group"},[r("div",{staticClass:"sidebar-group__title"},[t._v("\n            Тестовый функционал\n          ")]),r("div",{staticClass:"sidebar-group__item",on:{click:t.insertVideo}},[r("span",[t._v("Показать тестовое видео")])]),r("div",{staticClass:"sidebar-group__item",on:{click:t.openError}},[r("span",[t._v("Показать ошибку")])])])]),r("div",{staticClass:"sidebar__content sidebar__content--scroll"},[r("div",{staticClass:"sidebar-group"},[r("div",{staticClass:"sidebar-group__title"},[t._v("\n            Управление хранилищем\n          ")]),r("div",{staticClass:"sidebar-group__item",on:{click:t.removeWindowsInStorage}},[r("span",[t._v("Удалить сохранённые данные")])])])]),t._e(),r("div",{staticClass:"sidebar__footer"},[t._v("\n        Ресурс позволяет пользователю одновременно просматривать несколько стримов или видео с YouTube и Twitch.\n      ")]),r("div",{staticClass:"sidebar__copyright"},[t._v("\n        © 2018 Levin Pavel, MIT\n      ")])])]),r("transition",{attrs:{name:"sidebar__shadow-"}},[r("div",{directives:[{name:"show",rawName:"v-show",value:t.shadowShow,expression:"shadowShow"}],staticClass:"sidebar__shadow",on:{click:t.toggleSidebar}})])],1)},H=[],L=r("cebc"),N=r("2f62"),T={name:"Sidebar",data:function(){return{sidebarShowHold:0,sidebarShow:0,shadowShow:0}},computed:Object(L["a"])({},Object(N["b"])("menu",{menuList:"items"})),watch:{sidebarShow:function(){var t=this;this.sidebarShowHold?setTimeout(function(){t.sidebarShowHold=!t.sidebarShowHold},200):this.sidebarShowHold=!this.sidebarShowHold}},created:function(){var t=this;ct.$on("sidebarShow",function(){t.toggleSidebar()})},methods:{toggleSidebar:function(){this.sidebarShow=!this.sidebarShow,this.shadowShow=!this.shadowShow,this.sidebarShow?document.querySelector("html").setAttribute("class","hide-scroll"):document.querySelector("html").removeAttribute("class")},insertVideo:function(){ct.$emit("urlUpdate"),this.toggleSidebar()},openError:function(){this.$store.dispatch("setError",{text:"Пример общей ошибки",index:"main"}),this.toggleSidebar()},removeWindowsInStorage:function(){ct.$emit("cleanUpdate"),this.toggleSidebar()}}},D=T,z=(r("f203"),Object(v["a"])(D,B,H,!1,null,null,null)),A=z.exports,J=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"form-search"},[r("keep-alive",[r("input",{directives:[{name:"model",rawName:"v-model.trim.lazy",value:t.query,expression:"query",modifiers:{trim:!0,lazy:!0}}],staticClass:"form-search__input",attrs:{type:"search",placeholder:"Введите запрос"},domProps:{value:t.query},on:{click:t.clearSelectVideoUrl,change:[function(e){t.query=e.target.value.trim()},t.sendingRequest],blur:function(e){t.$forceUpdate()}}})]),r("div",{staticClass:"form-search__btn",on:{click:t.sendingRequest}}),t.showResult?r("ul",{staticClass:"form-search-list form-search-list--scroll"},t._l(t.result.items,function(e,s){return r("li",{key:s,staticClass:"form-search-list__item",on:{click:function(r){t.selectVideoUrl(e.id.videoId)}}},[r("div",{staticClass:"form-search-list__thumb"},[r("img",{attrs:{src:e.snippet.thumbnails.default.url,alt:e.snippet.title}})]),r("div",{staticClass:"form-search-list__title"},[t._v("\n        "+t._s(e.snippet.title)+"\n      ")]),r("div",{staticClass:"form-search-list__channel"},[t._v("\n        "+t._s(e.snippet.channelTitle)+"\n      ")])])}),0):t._e()],1)},M=[],G={name:"SearchBar",data:function(){return{provider:"youtube",query:"",result:!1,showResult:!1}},computed:{checkSearchResult:function(){return this.$store.getters.getSearchShadow}},created:function(){var t=this;ct.$on("searchHide",function(e){t.toggleResult(e)})},methods:{selectVideoUrl:function(t){"youtube"===this.provider&&t.length?this.$store.dispatch("setSelectVideoUrl","https://www.youtube.com/embed/".concat(t)):this.$store.dispatch("setError",{text:"Не удалось получить videoId",index:"main"}),this.toggleResult(!1)},clearSelectVideoUrl:function(){this.$store.dispatch("clearSelectVideoUrl")},sendingRequest:function(){var t=this;"youtube"===this.provider&&this.query.length?this.$store.dispatch("search",this.query).then(function(){t.result=t.$store.getters.getSearchData,t.result.pageInfo.totalResults?t.toggleResult(!0):(t.toggleResult(!1),t.$store.dispatch("setError",{text:"Поиск не дал результатов",index:"main"}))}).catch(function(){}):(this.toggleResult(!1),this.$store.dispatch("setError",{text:"Поисковый запрос пуст",index:"main"}))},toggleResult:function(t){this.showResult=t,this.$store.dispatch("setShadow",t)}}},X=G,Y=(r("c932"),Object(v["a"])(X,J,M,!1,null,"d022a154",null)),F=Y.exports,K={name:"App",components:{errorBox:g,sideBar:A,searchBar:F},data:function(){return{}},computed:{checkSearchResult:function(){return this.$store.getters.getSearchShadow}},methods:{toggleSidebar:function(){ct.$emit("sidebarShow")},hideSearchResult:function(t){ct.$emit("searchHide",t)}}},Q=K,Z=(r("5c0b"),Object(v["a"])(Q,I,q,!1,null,null,null)),tt=Z.exports,et={state:{loading:!1,error:""},mutations:{setLoading:function(t,e){t.loading=e},setError:function(t,e){t.error=e},clearError:function(t){t.error=""}},actions:{setLoading:function(t,e){var r=t.commit;r("setLoading",e)},setError:function(t,e){var r=t.commit;r("setError",e)},clearError:function(t){var e=t.commit;e("clearError")}},getters:{loading:function(t){return t.loading},error:function(t){return t.error}}},rt=(r("96cf"),r("3b8d")),st=r("a236"),it=r.n(st),nt={namespaced:!1,state:{selectVideoUrl:!1,searchData:{},searchShadow:!1},mutations:{setSelectVideoUrl:function(t,e){t.selectVideoUrl=e},setSearchData:function(t,e){t.searchData=e},setShadow:function(t,e){t.searchShadow=e},clearSelectVideoUrl:function(t){t.selectVideoUrl=!1}},actions:{setSelectVideoUrl:function(t,e){var r=t.commit;r("setSelectVideoUrl",e)},setShadow:function(t,e){var r=t.commit;r("setShadow",e)},clearSelectVideoUrl:function(t){var e=t.commit;e("clearSelectVideoUrl")},search:function(){var t=Object(rt["a"])(regeneratorRuntime.mark(function t(e,r){var s,i;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return s=e.commit,s("clearError"),t.prev=2,t.next=5,it()("AIzaSyAOmRCB6nA7SR2_XnPR9XaGWpSyB-f7mrs",{q:r,part:"snippet",type:"video",maxResults:35});case 5:i=t.sent,s("setSearchData",i),s("setLoading",!1),t.next=15;break;case 10:throw t.prev=10,t.t0=t["catch"](2),s("setError",{text:"Неизвестная ошибка",index:"main"}),s("setLoading",!1),t.t0;case 15:case"end":return t.stop()}},t,this,[[2,10]])}));function e(e,r){return t.apply(this,arguments)}return e}()},getters:{getSelectVideoUrl:function(t){return t.selectVideoUrl},getSearchData:function(t){return t.searchData},getSearchShadow:function(t){return t.searchShadow}}},at={namespaced:!0,state:{items:[{url:"/history",text:"Показать историю"}]},getters:{items:function(t){return t.items}}};s["a"].use(N["a"]);var ot=new N["a"].Store({modules:{common:et,search:nt,menu:at}});r.d(e,"eventEmitter",function(){return ct}),s["a"].config.productionTip=!1;var ct=new s["a"];new s["a"]({render:function(t){return t(tt)},router:P,store:ot}).$mount("#app")},"5c0b":function(t,e,r){"use strict";var s=r("5e27"),i=r.n(s);i.a},"5e27":function(t,e,r){},"7ab1":function(t,e,r){"use strict";var s=r("42d0"),i=r.n(s);i.a},9136:function(t,e,r){},a6c8:function(t,e,r){},c932:function(t,e,r){"use strict";var s=r("259a"),i=r.n(s);i.a},d547:function(t,e,r){"use strict";var s=r("9136"),i=r.n(s);i.a},e9de:function(t,e,r){"use strict";var s=r("a6c8"),i=r.n(s);i.a},f203:function(t,e,r){"use strict";var s=r("0466"),i=r.n(s);i.a}});
//# sourceMappingURL=app.a4501eac.js.map