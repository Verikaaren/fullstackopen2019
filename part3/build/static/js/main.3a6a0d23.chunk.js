(window.webpackJsonpphonebook=window.webpackJsonpphonebook||[]).push([[0],{15:function(e,t,n){e.exports=n(38)},37:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),o=n(14),c=n.n(o),l=n(4),u=n(2),i=n(3),s=n.n(i),f="/api/persons",m=function(){return s.a.get(f)},p=function(e){return s.a.post(f,e)},b=function(e){return s.a.delete("".concat(f,"/").concat(e)).then((function(e){return e.data}))},d=function(e){return a.a.createElement("div",null,a.a.createElement("p",null,e.person.name," ",e.person.number," ",a.a.createElement("span",{role:"img",onClick:e.deletePerson},"\u274c ")))},g=function(e){return a.a.createElement("div",null,a.a.createElement("h2",null,"Number"),e.persons.map((function(t){return a.a.createElement(d,{deletePerson:function(){return e.deletePerson(t)},person:t,key:t.id})})))},O=function(e){return a.a.createElement("div",null,"filter by name:"," ",a.a.createElement("input",{value:e.newSearch,onChange:e.changeEvent})," ",a.a.createElement("br",null),a.a.createElement("br",null),a.a.createElement("br",null))};function y(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function v(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?y(n,!0).forEach((function(t){Object(l.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):y(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var E=function(e){var t=e.state,n=t.message,r=t.type;if(null===t.message)return null;var o={background:"lightgrey",fontSize:"20px",borderStyle:"solid",borderRadius:"2px",padding:"10px",marginBottom:"10px"},c=null;return c=v({},o,"error"===r?{color:"red"}:{color:"green"}),a.a.createElement("div",{style:c},n,console.log(r))};function j(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function h(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?j(n,!0).forEach((function(t){Object(l.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):j(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var w=function(){Object(r.useEffect)((function(){m().then((function(e){o(e.data)}))}),[]);var e=Object(r.useState)([]),t=Object(u.a)(e,2),n=t[0],o=t[1],c=Object(r.useState)(""),l=Object(u.a)(c,2),i=l[0],s=l[1],f=Object(r.useState)(""),d=Object(u.a)(f,2),y=d[0],v=d[1],j=Object(r.useState)(""),w=Object(u.a)(j,2),P=w[0],S=w[1],k=Object(r.useState)({message:null,type:null}),D=Object(u.a)(k,2),x=D[0],C=D[1];return a.a.createElement("div",null,a.a.createElement("h1",null,"Phonebook"),a.a.createElement(E,{state:x}),a.a.createElement(O,{filterValue:P,changeEvent:function(e){console.log(e.target.value),S(e.target.value);var t=n.filter((function(e){return e.name.includes(P)}));o(t)}}),a.a.createElement("form",{onSubmit:function(e){e.preventDefault();var t={name:i,number:y,id:n.length+2};p(t).then((function(e){o(n.concat(e.data)),C({message:"".concat(i," is added to Phonebook"),type:"note"}),setTimeout((function(){C(h({},x,{message:null}))}),2e3),s(""),v("")}))}},a.a.createElement("div",null,"name: ",a.a.createElement("input",{value:i,onChange:function(e){s(e.target.value)}}),a.a.createElement("br",null),"number:",a.a.createElement("input",{value:y,onChange:function(e){v(e.target.value)}})),a.a.createElement("div",null,a.a.createElement("button",{type:"submit"},"add"))),a.a.createElement(g,{persons:n,deletePerson:function(e){console.log(e),window.confirm("Do you really want to delete ".concat(e.name,"?"))&&b(e.id).then((function(t){o(n.filter((function(t){return t.id!==e.id}))),C({message:"".concat(e.name," was deleted from server"),type:"green"}),setTimeout((function(){C(h({},x,{message:null}))}),2e3)})).catch((function(t){C({message:"Information of".concat(e.name," was already deleted from sever"),type:"error"}),setTimeout((function(){C(h({},x,{message:null}))}),2e3)}))}}))};n(37);c.a.render(a.a.createElement(w,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.3a6a0d23.chunk.js.map