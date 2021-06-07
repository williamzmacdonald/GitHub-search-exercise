(this["webpackJsonpreact-code-test"]=this["webpackJsonpreact-code-test"]||[]).push([[0],{149:function(e,t,r){},158:function(e,t,r){},160:function(e,t,r){},167:function(e,t,r){},168:function(e,t,r){"use strict";r.r(t);var a=r(14),n=r.n(a),c=(r(149),r(118)),s=r(211),i=r(124),l=r(214),u=r(215),o=r(216),d=r(217),j=r(20),b=r.n(j),h=r(33),O=r(74),f=new(r(121).a),x={results:[],loading:"idle",error:null,selected:void 0},m=Object(O.b)("searchResults/fetchResults",function(){var e=Object(h.a)(b.a.mark((function e(t){var r;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.request("GET /search/repositories",{q:t});case 2:return r=e.sent,e.abrupt("return",r.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),g=Object(O.c)({name:"searchResults",initialState:x,reducers:{select:function(e,t){e.selected=t.payload}},extraReducers:function(e){e.addCase(m.pending,(function(e){e.loading="loading",e.error=null})),e.addCase(m.fulfilled,(function(e,t){e.results=t.payload.items,e.loading="idle"})),e.addCase(m.rejected,(function(e,t){var r;e.error=null!==(r=t.error.message)&&void 0!==r?r:null,e.results=[],e.loading="idle"}))}}),p=g.actions.select,v=g.reducer,N=r(50),y=Object(O.a)({reducer:{searchResults:v}}),R=N.c,S=(r(158),r(7)),w=function(){var e=R((function(e){return function(e){return e.searchResults.results.find((function(t){return t.id===e.searchResults.selected}))}(e)}));return e?Object(S.jsx)("div",{className:"details",children:Object(S.jsx)(s.a,{component:i.a,children:Object(S.jsx)(l.a,{children:Object(S.jsxs)(u.a,{children:[Object(S.jsxs)(o.a,{children:[Object(S.jsx)(d.a,{children:"Name"}),Object(S.jsx)(d.a,{children:e.name})]}),Object(S.jsxs)(o.a,{children:[Object(S.jsx)(d.a,{children:"Description"}),Object(S.jsx)(d.a,{children:e.description})]}),Object(S.jsxs)(o.a,{children:[Object(S.jsx)(d.a,{children:"Stars"}),Object(S.jsx)(d.a,{children:e.stargazers_count})]}),Object(S.jsxs)(o.a,{children:[Object(S.jsx)(d.a,{children:"Language"}),Object(S.jsx)(d.a,{children:e.language})]}),Object(S.jsxs)(o.a,{children:[Object(S.jsx)(d.a,{children:"Owner Name"}),Object(S.jsx)(d.a,{children:e.owner.login})]})]})})})}):Object(S.jsx)("h1",{children:"Whoops, nothing selected!"})},C=r(6),B=r(0),I=r(98),k=r(99),L=r(96),z=r(54),F=r(61),D=r(172),E=r(119),q=r(117),H=r.n(q),J=(r(160),[{field:"repoName",headerName:"Repository Name",flex:1},{field:"stars",flex:.5,renderHeader:function(){return Object(S.jsx)(H.a,{})}},{field:"language",headerName:"Language",flex:.75}]),_=function(){var e=Object(c.d)(),t=R((function(e){return function(e){return e.searchResults.results}(e)})),r=R((function(e){return function(e){return e.searchResults.error}(e)})),a=R((function(e){return function(e){return e.searchResults.loading}(e)})),n=Object(N.b)(),s=t.map((function(e){return{id:e.id,repoName:e.name,stars:e.stargazers_count,language:e.language}}));return"loading"===a?Object(S.jsx)("div",{className:"progress",children:Object(S.jsx)(D.a,{size:100})}):Object(S.jsxs)("div",{className:"searchResults",children:[r?Object(S.jsxs)("p",{className:"error",role:"alert",children:["Failed to fetch repositories: ",r]}):null,Object(S.jsx)(E.a,{rows:s,columns:J,pageSize:30,autoHeight:!0,onRowClick:function(t){n(p(t.id)),e.push("/details")}})]})},G=(r(167),function(){var e=Object(B.useState)(""),t=Object(C.a)(e,2),r=t[0],a=t[1],n=Object(B.useState)(""),c=Object(C.a)(n,2),s=c[0],i=c[1],l=Object(B.useState)(""),u=Object(C.a)(l,2),o=u[0],d=u[1],j=Object(N.b)(),O=function(){var e=Object(h.a)(b.a.mark((function e(t){var a;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),a=r,s&&(a+=" language:".concat(s)),o&&(a+=" sort:".concat(o)),j(m(a));case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(S.jsxs)("div",{className:"searchContainer",children:[Object(S.jsxs)("form",{onSubmit:O,className:"searchForm",children:[Object(S.jsx)("div",{className:"formItem",children:Object(S.jsx)(I.a,{id:"label",label:"Search",value:r,onChange:function(e){a(e.target.value)}})}),Object(S.jsx)("div",{className:"formItem",children:Object(S.jsx)(I.a,{id:"languageFilter",label:"Language Filter",value:s,onChange:function(e){i(e.target.value)}})}),Object(S.jsxs)("div",{className:"formItem",children:[Object(S.jsx)(k.a,{id:"sortByLabel",children:"Sort By..."}),Object(S.jsxs)(L.a,{labelId:"sortByLabel",id:"sortBy",value:o,onChange:function(e){d(e.target.value)},displayEmpty:!0,SelectDisplayProps:{"data-testid":"sortBy"},children:[Object(S.jsx)(z.a,{value:"",children:"Best Match"}),Object(S.jsx)(z.a,{value:"stars",children:"Stars"})]})]}),Object(S.jsx)("div",{className:"formItem",children:Object(S.jsx)(F.a,{type:"submit",variant:"outlined",children:"Submit"})})]}),Object(S.jsx)("div",{className:"resultsContainer",children:Object(S.jsx)(_,{})})]})});var M=function(){return Object(S.jsxs)(c.c,{children:[Object(S.jsx)(c.a,{path:"/details",children:Object(S.jsx)(w,{})}),Object(S.jsx)(c.a,{path:"/",children:Object(S.jsx)(G,{})})]})},P=r(36),T=Object(P.a)();n.a.render(Object(S.jsx)(N.a,{store:y,children:Object(S.jsx)(c.b,{history:T,children:Object(S.jsx)(M,{})})}),document.getElementById("root"))}},[[168,1,2]]]);
//# sourceMappingURL=main.af0a8968.chunk.js.map