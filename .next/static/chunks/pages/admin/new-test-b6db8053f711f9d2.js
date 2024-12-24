(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[243],{9819:(e,t,s)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin/new-test",function(){return s(7639)}])},8177:(e,t,s)=>{"use strict";var n=s(7836);s(9750);var r=s(6540),i=function(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}(r),o=void 0!==n&&n.env&&!0,c=function(e){return"[object String]"===Object.prototype.toString.call(e)},l=function(){function e(e){var t=void 0===e?{}:e,s=t.name,n=void 0===s?"stylesheet":s,r=t.optimizeForSpeed,i=void 0===r?o:r;a(c(n),"`name` must be a string"),this._name=n,this._deletedRulePlaceholder="#"+n+"-deleted-rule____{}",a("boolean"==typeof i,"`optimizeForSpeed` must be a boolean"),this._optimizeForSpeed=i,this._serverSheet=void 0,this._tags=[],this._injected=!1,this._rulesCount=0;var l=document.querySelector('meta[property="csp-nonce"]');this._nonce=l?l.getAttribute("content"):null}var t=e.prototype;return t.setOptimizeForSpeed=function(e){a("boolean"==typeof e,"`setOptimizeForSpeed` accepts a boolean"),a(0===this._rulesCount,"optimizeForSpeed cannot be when rules have already been inserted"),this.flush(),this._optimizeForSpeed=e,this.inject()},t.isOptimizeForSpeed=function(){return this._optimizeForSpeed},t.inject=function(){var e=this;if(a(!this._injected,"sheet already injected"),this._injected=!0,this._optimizeForSpeed){this._tags[0]=this.makeStyleTag(this._name),this._optimizeForSpeed="insertRule"in this.getSheet(),this._optimizeForSpeed||(o||console.warn("StyleSheet: optimizeForSpeed mode not supported falling back to standard mode."),this.flush(),this._injected=!0);return}this._serverSheet={cssRules:[],insertRule:function(t,s){return"number"==typeof s?e._serverSheet.cssRules[s]={cssText:t}:e._serverSheet.cssRules.push({cssText:t}),s},deleteRule:function(t){e._serverSheet.cssRules[t]=null}}},t.getSheetForTag=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]},t.getSheet=function(){return this.getSheetForTag(this._tags[this._tags.length-1])},t.insertRule=function(e,t){if(a(c(e),"`insertRule` accepts only strings"),this._optimizeForSpeed){var s=this.getSheet();"number"!=typeof t&&(t=s.cssRules.length);try{s.insertRule(e,t)}catch(t){return o||console.warn("StyleSheet: illegal rule: \n\n"+e+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),-1}}else{var n=this._tags[t];this._tags.push(this.makeStyleTag(this._name,e,n))}return this._rulesCount++},t.replaceRule=function(e,t){if(this._optimizeForSpeed){var s=this.getSheet();if(t.trim()||(t=this._deletedRulePlaceholder),!s.cssRules[e])return e;s.deleteRule(e);try{s.insertRule(t,e)}catch(n){o||console.warn("StyleSheet: illegal rule: \n\n"+t+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),s.insertRule(this._deletedRulePlaceholder,e)}}else{var n=this._tags[e];a(n,"old rule at index `"+e+"` not found"),n.textContent=t}return e},t.deleteRule=function(e){if(this._optimizeForSpeed)this.replaceRule(e,"");else{var t=this._tags[e];a(t,"rule at index `"+e+"` not found"),t.parentNode.removeChild(t),this._tags[e]=null}},t.flush=function(){this._injected=!1,this._rulesCount=0,this._tags.forEach(function(e){return e&&e.parentNode.removeChild(e)}),this._tags=[]},t.cssRules=function(){var e=this;return this._tags.reduce(function(t,s){return s?t=t.concat(Array.prototype.map.call(e.getSheetForTag(s).cssRules,function(t){return t.cssText===e._deletedRulePlaceholder?null:t})):t.push(null),t},[])},t.makeStyleTag=function(e,t,s){t&&a(c(t),"makeStyleTag accepts only strings as second parameter");var n=document.createElement("style");this._nonce&&n.setAttribute("nonce",this._nonce),n.type="text/css",n.setAttribute("data-"+e,""),t&&n.appendChild(document.createTextNode(t));var r=document.head||document.getElementsByTagName("head")[0];return s?r.insertBefore(n,s):r.appendChild(n),n},function(e,t){for(var s=0;s<t.length;s++){var n=t[s];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}(e.prototype,[{key:"length",get:function(){return this._rulesCount}}]),e}();function a(e,t){if(!e)throw Error("StyleSheet: "+t+".")}var d=function(e){for(var t=5381,s=e.length;s;)t=33*t^e.charCodeAt(--s);return t>>>0},u={};function h(e,t){if(!t)return"jsx-"+e;var s=String(t),n=e+s;return u[n]||(u[n]="jsx-"+d(e+"-"+s)),u[n]}function f(e,t){var s=e+t;return u[s]||(u[s]=t.replace(/__jsx-style-dynamic-selector/g,e)),u[s]}var p=function(){function e(e){var t=void 0===e?{}:e,s=t.styleSheet,n=void 0===s?null:s,r=t.optimizeForSpeed,i=void 0!==r&&r;this._sheet=n||new l({name:"styled-jsx",optimizeForSpeed:i}),this._sheet.inject(),n&&"boolean"==typeof i&&(this._sheet.setOptimizeForSpeed(i),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),this._fromServer=void 0,this._indices={},this._instancesCounts={}}var t=e.prototype;return t.add=function(e){var t=this;void 0===this._optimizeForSpeed&&(this._optimizeForSpeed=Array.isArray(e.children),this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),this._fromServer||(this._fromServer=this.selectFromServer(),this._instancesCounts=Object.keys(this._fromServer).reduce(function(e,t){return e[t]=0,e},{}));var s=this.getIdAndRules(e),n=s.styleId,r=s.rules;if(n in this._instancesCounts){this._instancesCounts[n]+=1;return}var i=r.map(function(e){return t._sheet.insertRule(e)}).filter(function(e){return -1!==e});this._indices[n]=i,this._instancesCounts[n]=1},t.remove=function(e){var t=this,s=this.getIdAndRules(e).styleId;if(function(e,t){if(!e)throw Error("StyleSheetRegistry: "+t+".")}(s in this._instancesCounts,"styleId: `"+s+"` not found"),this._instancesCounts[s]-=1,this._instancesCounts[s]<1){var n=this._fromServer&&this._fromServer[s];n?(n.parentNode.removeChild(n),delete this._fromServer[s]):(this._indices[s].forEach(function(e){return t._sheet.deleteRule(e)}),delete this._indices[s]),delete this._instancesCounts[s]}},t.update=function(e,t){this.add(t),this.remove(e)},t.flush=function(){this._sheet.flush(),this._sheet.inject(),this._fromServer=void 0,this._indices={},this._instancesCounts={}},t.cssRules=function(){var e=this,t=this._fromServer?Object.keys(this._fromServer).map(function(t){return[t,e._fromServer[t]]}):[],s=this._sheet.cssRules();return t.concat(Object.keys(this._indices).map(function(t){return[t,e._indices[t].map(function(e){return s[e].cssText}).join(e._optimizeForSpeed?"":"\n")]}).filter(function(e){return!!e[1]}))},t.styles=function(e){var t,s;return t=this.cssRules(),void 0===(s=e)&&(s={}),t.map(function(e){var t=e[0],n=e[1];return i.default.createElement("style",{id:"__"+t,key:"__"+t,nonce:s.nonce?s.nonce:void 0,dangerouslySetInnerHTML:{__html:n}})})},t.getIdAndRules=function(e){var t=e.children,s=e.dynamic,n=e.id;if(s){var r=h(n,s);return{styleId:r,rules:Array.isArray(t)?t.map(function(e){return f(r,e)}):[f(r,t)]}}return{styleId:h(n),rules:Array.isArray(t)?t:[t]}},t.selectFromServer=function(){return Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]')).reduce(function(e,t){return e[t.id.slice(2)]=t,e},{})},e}(),m=r.createContext(null);m.displayName="StyleSheetContext";var x=i.default.useInsertionEffect||i.default.useLayoutEffect,b=new p;function g(e){var t=b||r.useContext(m);return t&&x(function(){return t.add(e),function(){t.remove(e)}},[e.id,String(e.dynamic)]),null}g.dynamic=function(e){return e.map(function(e){return h(e[0],e[1])}).join(" ")},t.style=g},460:(e,t,s)=>{"use strict";e.exports=s(8177).style},7639:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>d});var n=s(4848),r=s(460),i=s.n(r),o=s(6540),c=s(6715),l=s(1106),a=s.n(l);function d(){let[e,t]=(0,o.useState)(""),[s,r]=(0,o.useState)(""),[l,d]=(0,o.useState)([]),[u,h]=(0,o.useState)(!1),f=(0,c.useRouter)(),p=(e,t,s)=>{let n=[...l];n[e][t]=s,d(n)},m=(e,t,s)=>{let n=[...l];n[e].options[t]=s,d(n)},x=(e,t)=>{let s=[...l];s[e].image=t,d(s)},b=async n=>{if(n.preventDefault(),!e||!s||0===l.length){alert("الرجاء إدخال عنوان الاختبار والوصف وإضافة سؤال واحد على الأقل.");return}h(!0);try{let n=new FormData;n.append("title",e),n.append("description",s);let i=l.map((e,t)=>{let s={...e};return e.image&&e.image instanceof File&&(n.append("image_".concat(t),e.image),s.image="image_".concat(t)),s});n.append("questions",JSON.stringify(i));let o=await fetch("/api/new-test",{method:"POST",body:n});if(o.ok)alert("تم إنشاء الاختبار بنجاح!"),t(""),r(""),d([]),f.push("/admin/dashboard");else{let e=await o.json();alert("خطأ: ".concat(e.error))}}catch(e){console.error("حدث خطأ أثناء إنشاء الاختبار:",e),alert("حدث خطأ. الرجاء المحاولة مرة أخرى.")}finally{h(!1)}};return(0,n.jsxs)("div",{className:"min-h-screen bg-gradient-to-b from-blue-100 to-blue-300",children:[(0,n.jsx)("nav",{className:"bg-white text-white shadow-md py-6",children:(0,n.jsx)("div",{className:"container mx-auto flex justify-between items-center px-6",children:(0,n.jsx)("h1",{className:"text-2xl font-extrabold text-blue-600",children:(0,n.jsx)(a(),{href:"/",children:"المنصة التعليمية لمنهج الدراسات رابعة ابتدائي"})})})}),(0,n.jsxs)("div",{dir:"rtl",className:"jsx-dce129b9fc352640 min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 py-8 px-4",children:[(0,n.jsx)(i(),{id:"dce129b9fc352640",children:"input.jsx-dce129b9fc352640,textarea.jsx-dce129b9fc352640{color:#333;font-size:16px}input.jsx-dce129b9fc352640::-webkit-input-placeholder,textarea.jsx-dce129b9fc352640::-webkit-input-placeholder{color:#6b7280}input.jsx-dce129b9fc352640:-moz-placeholder,textarea.jsx-dce129b9fc352640:-moz-placeholder{color:#6b7280}input.jsx-dce129b9fc352640::-moz-placeholder,textarea.jsx-dce129b9fc352640::-moz-placeholder{color:#6b7280}input.jsx-dce129b9fc352640:-ms-input-placeholder,textarea.jsx-dce129b9fc352640:-ms-input-placeholder{color:#6b7280}input.jsx-dce129b9fc352640::-ms-input-placeholder,textarea.jsx-dce129b9fc352640::-ms-input-placeholder{color:#6b7280}input.jsx-dce129b9fc352640::placeholder,textarea.jsx-dce129b9fc352640::placeholder{color:#6b7280}input.jsx-dce129b9fc352640:focus,textarea.jsx-dce129b9fc352640:focus{color:#000}"}),(0,n.jsxs)("div",{className:"jsx-dce129b9fc352640 max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg",children:[(0,n.jsx)("h1",{className:"jsx-dce129b9fc352640 text-3xl font-bold text-gray-800 mb-6",children:"إنشاء اختبار جديد"}),(0,n.jsxs)("form",{onSubmit:b,className:"jsx-dce129b9fc352640",children:[(0,n.jsxs)("div",{className:"jsx-dce129b9fc352640 mb-4",children:[(0,n.jsx)("label",{className:"jsx-dce129b9fc352640 block text-gray-700 font-bold mb-2",children:"عنوان الاختبار"}),(0,n.jsx)("input",{type:"text",value:e,onChange:e=>t(e.target.value),placeholder:"أدخل عنوان الاختبار",required:!0,className:"jsx-dce129b9fc352640 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"})]}),(0,n.jsxs)("div",{className:"jsx-dce129b9fc352640 mb-4",children:[(0,n.jsx)("label",{className:"jsx-dce129b9fc352640 block text-gray-700 font-bold mb-2",children:"وصف الاختبار"}),(0,n.jsx)("textarea",{value:s,onChange:e=>r(e.target.value),placeholder:"أدخل وصفًا للاختبار",rows:"4",required:!0,className:"jsx-dce129b9fc352640 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"})]}),(0,n.jsxs)("div",{className:"jsx-dce129b9fc352640 mb-6",children:[(0,n.jsx)("h2",{className:"jsx-dce129b9fc352640 text-2xl font-bold text-gray-700 mb-4",children:"الأسئلة"}),l.map((e,t)=>(0,n.jsxs)("div",{className:"jsx-dce129b9fc352640 mb-6 border p-4 rounded-lg shadow-sm bg-gray-50 space-y-4",children:[(0,n.jsxs)("div",{className:"jsx-dce129b9fc352640",children:[(0,n.jsxs)("label",{className:"jsx-dce129b9fc352640 block text-gray-700 font-bold mb-2",children:["السؤال ",t+1]}),(0,n.jsx)("textarea",{value:e.question,onChange:e=>p(t,"question",e.target.value),placeholder:"أدخل نص السؤال",rows:"3",required:!0,className:"jsx-dce129b9fc352640 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"})]}),(0,n.jsxs)("div",{className:"jsx-dce129b9fc352640",children:[(0,n.jsx)("h3",{className:"jsx-dce129b9fc352640 text-lg font-bold text-gray-700 mb-2",children:"الخيارات"}),e.options.map((e,s)=>(0,n.jsxs)("div",{className:"jsx-dce129b9fc352640 mb-2 flex items-center space-x-2",children:[(0,n.jsxs)("span",{className:"jsx-dce129b9fc352640 text-gray-600",children:[s+1,"."]}),(0,n.jsx)("input",{type:"text",value:e,onChange:e=>m(t,s,e.target.value),placeholder:"الخيار ".concat(s+1),required:!0,className:"jsx-dce129b9fc352640 flex-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"})]},s))]}),(0,n.jsxs)("div",{className:"jsx-dce129b9fc352640",children:[(0,n.jsx)("label",{className:"jsx-dce129b9fc352640 block text-gray-700 font-bold mb-2",children:"الإجابة الصحيحة"}),(0,n.jsx)("select",{value:e.correctAnswer,onChange:e=>p(t,"correctAnswer",e.target.value),required:!0,className:"jsx-dce129b9fc352640 w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300",children:e.options.map((e,t)=>(0,n.jsxs)("option",{value:t,className:"jsx-dce129b9fc352640",children:["الخيار ",t+1]},t))})]}),(0,n.jsxs)("div",{className:"jsx-dce129b9fc352640",children:[(0,n.jsx)("label",{className:"jsx-dce129b9fc352640 block text-gray-700 font-bold mb-2",children:"صورة للسؤال (اختياري)"}),(0,n.jsx)("input",{type:"file",onChange:e=>x(t,e.target.files[0]),className:"jsx-dce129b9fc352640 block w-full text-gray-600"}),e.image&&e.image instanceof File&&(0,n.jsxs)("span",{className:"jsx-dce129b9fc352640 text-sm text-gray-500",children:[e.image.name," تم اختيار الملف"]})]})]},t)),(0,n.jsx)("button",{type:"button",onClick:()=>{d([...l,{question:"",options:["","","",""],correctAnswer:0,image:null}])},className:"jsx-dce129b9fc352640 px-6 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition",children:"إضافة سؤال"})]}),(0,n.jsx)("button",{type:"submit",disabled:u,className:"jsx-dce129b9fc352640 "+"px-6 py-3 rounded-lg shadow w-full transition ".concat(u?"bg-gray-400 cursor-not-allowed":"bg-blue-500 hover:bg-blue-600 text-white"),children:u?"جارٍ الإنشاء...":"إنشاء الاختبار"})]})]})]})]})}},9750:()=>{},6715:(e,t,s)=>{e.exports=s(4009)}},e=>{var t=t=>e(e.s=t);e.O(0,[106,636,593,792],()=>t(9819)),_N_E=e.O()}]);