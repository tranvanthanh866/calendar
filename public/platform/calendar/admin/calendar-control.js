!function(t){var e={};function r(n){if(e[n])return e[n].exports;var a=e[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,r),a.l=!0,a.exports}r.m=t,r.c=e,r.d=function(t,e,n){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)r.d(n,a,function(e){return t[e]}.bind(null,a));return n},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="/",r(r.s=12)}({0:function(t,e,r){t.exports=r(14)},12:function(t,e,r){t.exports=r(13)},13:function(t,e,r){"use strict";r.r(e);var n=r(0),a=r.n(n);function o(t,e,r,n,a,o,i){try{var c=t[o](i),l=c.value}catch(t){return void r(t)}c.done?e(l):Promise.resolve(l).then(n,a)}function i(t){return function(){var e=this,r=arguments;return new Promise((function(n,a){var i=t.apply(e,r);function c(t){o(i,n,a,c,l,"next",t)}function l(t){o(i,n,a,c,l,"throw",t)}c(void 0)}))}}moment().format("YYYY-MM-DD"),moment().format("HH:mm:ss");Vue.config.devtools=!0;var c=new Vue({el:"#form-time",data:{from_data:{title:"",description:"",date_start:"",time_start:"",date_end:"",time_end:"",allDay:!1,_allDay:0,background_group:[{_text_display:"Black",hex_color_code:"#212529",class:"Black"},{_text_display:"White",hex_color_code:"#fff",class:"white"},{_text_display:"Blue",hex_color_code:"#3788d8",class:"Blue"},{_text_display:"Green",hex_color_code:"#008000",class:"green"},{_text_display:"Red",hex_color_code:"#ff0000",class:"red"},{_text_display:"Yellow",hex_color_code:"#ffff00",class:"yellow"},{_text_display:"Brown",hex_color_code:"#a52a2a",class:"brown"},{_text_display:"Orange",hex_color_code:"#ffa500",class:"orange"},{_text_display:"Pink",hex_color_code:"#ffc0cb",class:"pink"},{_text_display:"Silver",hex_color_code:"#c0c0c0",class:"silver"},{_text_display:"TEAL",hex_color_code:"#008080",class:"TEAL"},{_text_display:"OLIVE",hex_color_code:"#000080",class:"OLIVE"},{_text_display:"LIME",hex_color_code:"#00FF00",class:"LIME"}],background_color:"#3788d8",name_background_color:"Blue",text_color:"#212529",name_text_color:"Black",repeat_weeks:[{value:1,name:"Every Mondays"},{value:2,name:"Every Tuesdays"},{value:3,name:"Every Wednesdays"},{value:4,name:"Every Thursdays"},{value:5,name:"Every Fridays"},{value:6,name:"Every Saturdays"},{value:0,name:"Every Sundays"}],repeat:[]}},methods:{setDateTimeDefault:function(){this.from_data.title="",this.from_data.description="",this.from_data.background_color="#3788d8",this.from_data.name_background_color="Blue",this.from_data.name_text_color="Black",this.from_data.text_color="#212529",this.from_data.repeat=[]},checkData:function(){console.log(1),console.log(this.repeat)}}});$((function(){(new Date).getFullYear();var t=$("#form-time");$("#form-date-time"),$("#calendar");$(".repeat-date").SumoSelect({triggerChangeCombined:!1,placeholder:"Repeat event"}),$("#date-time .time").timepicker({showDuration:!0,timeFormat:"H:i:s"}),$("#form-date-time .input-daterange").datepicker({format:"yyyy-mm-dd",startDate:new Date,endDate:new Date((new Date).setDate((new Date).getDate()+90)),autoclose:!0}),$("#form-date-time .input-daterange").datepicker().on("changeDate",(function(t){c.$data.from_data.date_start=$("#date_start").val(),c.$data.from_data.date_end=$("#date_end").val()})),$("#date-time .time").on("changeTime",(function(t){var e=$(this);e.hasClass("start")&&(c.$data.from_data.time_start=e.val()),e.hasClass("end")&&(c.$data.from_data.time_end=e.val())})),$(".SumoSelect li").bind("click.check",(function(t){c.$data.from_data.repeat=$("#repeat-date").val()}));for(var e=$("._select_color_drop li"),r=e.length-1;r>=0;r--)$(e[r]).click((function(){var t=$(this).find("span").attr("_text_display"),e=$(this).closest("._select_color_drop"),r=$(this).find("span").attr("data-hex_code"),n=e.find(".input_color");n.hasClass("background_color")&&(c.$data.from_data.background_color=r,c.$data.from_data.name_background_color=t),n.hasClass("text_color")&&(c.$data.from_data.text_color=r,c.$data.from_data.name_text_color=t)}));var n,o,l,s,d=document.getElementById("calendar"),u=new FullCalendar.Calendar(d,{plugins:["interaction","dayGrid","timeGrid","list"],header:{left:"prev,next,today",center:"title",right:"listWeek,timeGridDay,timeGridWeek,dayGridMonth"},eventLimit:!0,defaultView:"timeGridWeek",displayEventTime:!0,editable:!0,events:SITEURL+"/get_data",selectable:!0,firstDay:1,select:(s=i(a.a.mark((function e(r){var n,o,i,l;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:_(r)?(n=moment(r.start).format("YYYY-MM-DD"),o=moment(r.start).format("HH:mm:ss"),i=moment(r.end).format("YYYY-MM-DD"),l=moment(r.end).format("HH:mm:ss"),c.$data.from_data.date_start=n,c.$data.from_data.date_end=i,c.$data.from_data.time_start=o,c.$data.from_data.time_end=l,c.$data.from_data.allDay=r.allDay,t.modal("show")):(a="Past day can not add events",$.notify(a,"error"));case 1:case"end":return e.stop()}var a}),e)}))),function(t){return s.apply(this,arguments)}),eventDragStart:function(t){if(console.log(t),!1===_(t))return!1},eventDragStop:function(t){console.log("eventDragStop")},eventReceive:function(){console.log("eventReceive")},eventResize:(l=i(a.a.mark((function t(e){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!_(e)){t.next=6;break}return t.next=3,f(e);case 3:u.refetchEvents(),t.next=6;break;case 6:case"end":return t.stop()}}),t)}))),function(t){return l.apply(this,arguments)}),eventDrop:(o=i(a.a.mark((function t(e){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!_(e)){t.next=6;break}return t.next=3,f(e);case 3:u.refetchEvents(),t.next=6;break;case 6:case"end":return t.stop()}}),t)}))),function(t){return o.apply(this,arguments)}),eventClick:(n=i(a.a.mark((function t(e){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:_(e.event)&&$("#ex1").modal();case 1:case"end":return t.stop()}}),t)}))),function(t){return n.apply(this,arguments)}),dayRender:function(t){var e=moment().format("YYYY-MM-DD");new Date;moment(t.date).format("YYYY-MM-DD")<e&&$(t.el).addClass("no-change-event").css("background-color","#e9e9e9")},selectAllow:function(t){return!!_(t)}});function f(t){return m.apply(this,arguments)}function m(){return(m=i(a.a.mark((function t(e){var r,n,o,i,c,l;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:r=moment(e.event.start).format("YYYY-MM-DD"),n=moment(e.event.start).format("HH:mm:ss"),o=r,i=n,null!==e.event.end&&(o=moment(e.event.end).format("YYYY-MM-DD"),i=moment(e.event.end).format("HH:mm:ss")),c=e.event._def.extendedProps,console.log(e.event.end),l={title:e.event.title,date_start:r,time_start:n,date_end:o,time_end:i,calendar_event_id:c.calendar_event_id,calendar_date_id:c.calendar_date_id,allDay:e.event.allDay?1:0},console.log(l),console.log(e.event.allDay),$.ajax({url:SITEURL+"/fullcalendar/update",data:{title:e.event.title,date_start:r,time_start:n,date_end:o,time_end:i,calendar_event_id:c.calendar_event_id,calendar_date_id:c.calendar_date_id,allDay:e.event.allDay?1:0},type:"POST",success:function(t){y("Updated Successfully")}});case 11:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function h(t){return p.apply(this,arguments)}function p(){return(p=i(a.a.mark((function t(e){return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:$.ajax({url:SITEURL+"/fullcalendar/create",data:e,type:"POST",success:function(t){y("Added Successfully")}});case 1:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function _(t){return moment(t.start).format("YYYY-MM-DD")>=moment().format("YYYY-MM-DD")}function v(e){t.find("#time_start").attr("disabled",e),t.find("#time_end").attr("disabled",e),c.$data.from_data._allDay=e?1:0}function y(t){$.notify(t,"success")}u.render(),$(".save-time").click(i(a.a.mark((function t(){var e;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=c.$data.from_data,t.next=3,h(e);case 3:u.refetchEvents();case 4:case"end":return t.stop()}}),t)})))),t.on("hidden.bs.modal",(function(){c.$data.from_data.title="",c.$data.from_data.description="",c.$data.from_data.background_color="#3788d8",c.$data.from_data.name_background_color="Blue",c.$data.from_data.name_text_color="Black",c.$data.from_data.text_color="#212529",c.$data.from_data.repeat=[],$(".optWrapper ul li").removeClass("selected"),$("#repeat-date").val([]),$(".SumoSelect p.CaptionCont").attr("title","Repeat event").find("span").addClass("placeholder").text("Repeat event")})),t.on("shown.bs.modal",(function(){v(t.find("#allDay").is(":checked"))})),$("#allDay").change((function(){v(this.checked)}))}))},14:function(t,e,r){var n=function(t){"use strict";var e=Object.prototype,r=e.hasOwnProperty,n="function"==typeof Symbol?Symbol:{},a=n.iterator||"@@iterator",o=n.asyncIterator||"@@asyncIterator",i=n.toStringTag||"@@toStringTag";function c(t,e,r,n){var a=e&&e.prototype instanceof d?e:d,o=Object.create(a.prototype),i=new b(n||[]);return o._invoke=function(t,e,r){var n="suspendedStart";return function(a,o){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===a)throw o;return k()}for(r.method=a,r.arg=o;;){var i=r.delegate;if(i){var c=g(i,r);if(c){if(c===s)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var d=l(t,e,r);if("normal"===d.type){if(n=r.done?"completed":"suspendedYield",d.arg===s)continue;return{value:d.arg,done:r.done}}"throw"===d.type&&(n="completed",r.method="throw",r.arg=d.arg)}}}(t,r,i),o}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=c;var s={};function d(){}function u(){}function f(){}var m={};m[a]=function(){return this};var h=Object.getPrototypeOf,p=h&&h(h($([])));p&&p!==e&&r.call(p,a)&&(m=p);var _=f.prototype=d.prototype=Object.create(m);function v(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function y(t,e){var n;this._invoke=function(a,o){function i(){return new e((function(n,i){!function n(a,o,i,c){var s=l(t[a],t,o);if("throw"!==s.type){var d=s.arg,u=d.value;return u&&"object"==typeof u&&r.call(u,"__await")?e.resolve(u.__await).then((function(t){n("next",t,i,c)}),(function(t){n("throw",t,i,c)})):e.resolve(u).then((function(t){d.value=t,i(d)}),(function(t){return n("throw",t,i,c)}))}c(s.arg)}(a,o,n,i)}))}return n=n?n.then(i,i):i()}}function g(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,g(t,e),"throw"===e.method))return s;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return s}var n=l(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,s;var a=n.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,s):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,s)}function x(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function w(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function b(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(x,this),this.reset(!0)}function $(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:k}}function k(){return{value:void 0,done:!0}}return u.prototype=_.constructor=f,f.constructor=u,f[i]=u.displayName="GeneratorFunction",t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===u||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,f):(t.__proto__=f,i in t||(t[i]="GeneratorFunction")),t.prototype=Object.create(_),t},t.awrap=function(t){return{__await:t}},v(y.prototype),y.prototype[o]=function(){return this},t.AsyncIterator=y,t.async=function(e,r,n,a,o){void 0===o&&(o=Promise);var i=new y(c(e,r,n,a),o);return t.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},v(_),_[i]="Generator",_[a]=function(){return this},_.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=$,b.prototype={constructor:b,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(w),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return i.type="throw",i.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var a=this.tryEntries.length-1;a>=0;--a){var o=this.tryEntries[a],i=o.completion;if("root"===o.tryLoc)return n("end");if(o.tryLoc<=this.prev){var c=r.call(o,"catchLoc"),l=r.call(o,"finallyLoc");if(c&&l){if(this.prev<o.catchLoc)return n(o.catchLoc,!0);if(this.prev<o.finallyLoc)return n(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return n(o.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return n(o.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var a=this.tryEntries[n];if(a.tryLoc<=this.prev&&r.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var o=a;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,s):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),s},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),w(r),s}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var a=n.arg;w(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:$(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),s}},t}(t.exports);try{regeneratorRuntime=n}catch(t){Function("r","regeneratorRuntime = r")(n)}}});