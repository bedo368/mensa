(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[323],{1708:(e,t,s)=>{(window.__NEXT_P=window.__NEXT_P||[]).push(["/student/tests",function(){return s(8532)}])},8532:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>i});var a=s(4848),r=s(6540),l=s(1106),n=s.n(l);function i(){let[e,t]=(0,r.useState)([]),[s,l]=(0,r.useState)(!0);return((0,r.useEffect)(()=>{(async()=>{try{let e=await fetch("/api/tests");if(e.ok){let s=await e.json();t(s)}else console.error("Failed to fetch available tests.")}catch(e){console.error("Error fetching available tests:",e)}finally{l(!1)}})()},[]),s)?(0,a.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,a.jsx)("p",{className:"text-xl text-gray-700",children:"جاري تحميل الاختبارات..."})}):(0,a.jsxs)("div",{className:"min-h-screen bg-gradient-to-b from-purple-200 to-purple-400 py-8 px-4 ",children:[(0,a.jsx)("nav",{className:"bg-white text-white shadow-md py-6",children:(0,a.jsx)("div",{className:"container mx-auto flex justify-between items-center px-6",children:(0,a.jsx)("h1",{className:"text-2xl font-extrabold text-blue-600",children:(0,a.jsx)(n(),{href:"/",children:"المنصة التعليمية لمنهج الدراسات رابعة ابتدائي"})})})}),(0,a.jsxs)("div",{className:"container mx-auto py-12 px-6",children:[(0,a.jsx)("h1",{className:"text-3xl font-bold text-gray-800 mb-8 text-center",children:"الاختبارات المتاحة"}),e.length>0?(0,a.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:e.map(e=>(0,a.jsxs)("div",{className:"bg-white shadow-md rounded-lg p-6 hover:shadow-xl hover:scale-105 transition transform",children:[(0,a.jsx)("h2",{className:"text-xl font-bold text-gray-800 mb-2",children:e.title}),(0,a.jsx)("p",{className:"text-gray-600",children:e.description}),(0,a.jsx)("div",{className:"mt-4",children:(0,a.jsxs)("p",{className:"text-sm text-gray-500",children:["عدد الأسئلة: ",e.questions.length]})}),(0,a.jsxs)("div",{className:"mt-4 flex justify-between items-center",children:[(0,a.jsx)(n(),{href:"/test/".concat(e._id),children:(0,a.jsx)("span",{className:"text-blue-500 font-semibold cursor-pointer",children:"ابدأ الاختبار →"})}),(0,a.jsx)(n(),{href:"/top-students/".concat(e._id),children:(0,a.jsx)("button",{className:"bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition",children:"الطلاب المتفوقون"})})]})]},e._id))}):(0,a.jsx)("p",{className:"text-gray-700 text-center",children:"لا توجد اختبارات متاحة في الوقت الحالي."})]})]})}}},e=>{var t=t=>e(e.s=t);e.O(0,[106,636,593,792],()=>t(1708)),_N_E=e.O()}]);