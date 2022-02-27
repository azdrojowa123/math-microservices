(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{263:function(e,t,n){},364:function(e,t,n){"use strict";n.r(t);var r=n(210),a=n(433),i=n(1),c=n.n(i),o=n(27),s=n.n(o),l=n(209),d=n(437),u=n(442),j=n(436),b=n(23),h=n.n(b),m=n(40),O=n(21),g=n(19),f=n(410),v=n(435),x=n(142),p=n(434),C=n(428),y=n(414),w=n(415),S=n(416),A=n(444),E=n(431),k=n(17),F=n(18),N=n(37),T=n(38),I=n(66),P=n(3),q=function(e){Object(N.a)(n,e);var t=Object(T.a)(n);function n(){return Object(k.a)(this,n),t.apply(this,arguments)}return Object(F.a)(n,[{key:"render",value:function(){return console.log(this.props.data),Object(P.jsx)(P.Fragment,{children:Object(P.jsxs)(I.Chart,{id:"container",dataSource:this.props.data,title:"Kaplan-Meier survival curve",children:[Object(P.jsx)(I.CommonSeriesSettings,{type:"stepline",argumentField:"periodNumber",children:Object(P.jsx)(I.Point,{visible:!1})}),Object(P.jsx)(I.Series,{valueField:"estimatorKM",name:"The likelihood of not having certain side effects",color:"#FC7B09"},"estimatorKM"),Object(P.jsx)(I.ArgumentAxis,{children:Object(P.jsx)(I.Label,{children:Object(P.jsx)(I.Format,{type:"decimal"})})}),Object(P.jsx)(I.Legend,{verticalAlignment:"bottom",horizontalAlignment:"center"}),Object(P.jsx)(I.Export,{enabled:!0})]})})}}]),n}(i.Component),V={survivalResults:function(e,t){return fetch("/survival-curve/estimator/".concat(e),{method:"POST",mode:"cors",headers:{"Content-Type":"application/json; charset=utf-8","Access-Control-Allow-Origin":"*"},body:JSON.stringify(t)})},checkCSVData:function(e,t){return fetch("/csv-validator/csv-data/validate/".concat(e),{method:"POST",mode:"cors",headers:{"Content-Type":"application/json; charset=utf-8","Access-Control-Allow-Origin":"*"},body:JSON.stringify(t)})},survivalResultsCSV:function(e,t){return fetch("/csv-validator/csv-data/calc/".concat(e),{method:"POST",mode:"cors",headers:{"Content-Type":"application/json; charset=utf-8","Access-Control-Allow-Origin":"*"},body:JSON.stringify(t)})}},M=n(29),_=n(212),R=n(154),H=n.n(R),L=n(195),z=n.n(L),D=n(201),B=n.n(D),W=n(202),K=n.n(W),U=n(203),J=n.n(U),G=n(412),Y=n(411),Q=n(200),X=n.n(Q),Z=["message","onClose","variant"],$={success:z.a,warning:X.a,error:B.a,info:K.a},ee=Object(f.a)((function(e){return{success:{backgroundColor:e.palette.success.main},error:{backgroundColor:e.palette.error.main},info:{backgroundColor:"#21B8E2"},warning:{backgroundColor:e.palette.warning.main},snackbarWidth:{width:"20vw",fontSize:20},icon:{fontSize:20},iconVariant:{opacity:.9,marginRight:1},message:{display:"flex",alignItems:"center"}}}));function te(e){var t=e.message,n=e.onClose,r=e.variant,a=Object(_.a)(e,Z),i=$[r],c=ee();return Object(P.jsx)(Y.a,Object(M.a)({className:H()(c[r],c.snackbarWidth),"aria-describedby":"client-snackbar",message:Object(P.jsxs)("span",{id:"client-snackbar",children:[Object(P.jsx)(i,{className:H()(c.icon,c.iconVariant)}),t]}),action:[Object(P.jsx)(G.a,{"aria-label":"Close",color:"inherit",onClick:n,children:Object(P.jsx)(J.a,{className:c.icon})},"close")]},a))}var ne=n(413),re=n(367),ae=n(417),ie=n(418);function ce(e){return Object(P.jsx)(P.Fragment,{children:Object(P.jsx)(ne.a,{component:re.a,children:Object(P.jsxs)(y.a,{"aria-label":"customized table",children:[Object(P.jsx)(w.a,{children:Object(P.jsxs)(S.a,{children:[Object(P.jsx)(ae.a,{align:"right",children:"Period number"}),Object(P.jsx)(ae.a,{align:"right",children:"Number of observations"}),Object(P.jsx)(ae.a,{align:"right",children:"Number of failures"}),Object(P.jsx)(ae.a,{align:"right",children:"Survival probability"}),Object(P.jsx)(ae.a,{align:"right",children:"Kaplan-Meier estimator"})]})}),Object(P.jsx)(ie.a,{children:e.data.map((function(e){return Object(P.jsxs)(S.a,{children:[Object(P.jsx)(ae.a,{component:"th",scope:"row",children:e.periodNumber}),Object(P.jsx)(ae.a,{align:"right",children:e.quantity}),Object(P.jsx)(ae.a,{align:"right",children:e.failures}),Object(P.jsx)(ae.a,{align:"right",children:e.survivalProbability}),Object(P.jsx)(ae.a,{align:"right",children:e.estimatorKM})]},e.periodNumber)}))})]})})})}var oe=n(419),se=n(420),le=n(368),de=n(421),ue=n(426),je=n(427),be=n(70),he=n.n(be),me=Object(f.a)((function(e){return{button:{textAlign:"center",background:"linear-gradient(45deg, #239890 30%, #47EEE3 90%)",color:"#1a0000","&:hover":{backgroundColor:"#A8AEAE"},marginTop:"10px",marginBottom:"10px",width:"20vh",height:"5vh"},form:{display:"flex",width:"10vw"}}}));function Oe(e){var t=e.submitData,n=e.periods,r=Object(i.useState)(),a=Object(g.a)(r,2),c=a[0],o=a[1],s=Object(i.useState)(!0),l=Object(g.a)(s,2),d=l[0],u=l[1],j=Object(i.useState)(!0),b=Object(g.a)(j,2),O=b[0],f=b[1],p=me(),y=Object(i.useState)(""),w=Object(g.a)(y,2),S=w[0],E=w[1],k=V;Object(i.useEffect)((function(){void 0!==n&&0!==n&&void 0!==c&&u(!1)}));var F=function(){var e=Object(m.a)(h.a.mark((function e(){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:void 0!==n&&void 0!==c&&k.survivalResultsCSV(n,c).then(function(){var e=Object(m.a)(h.a.mark((function e(n){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!n.ok){e.next=8;break}return e.t0=t,e.next=4,n.json();case 4:e.t1=e.sent,(0,e.t0)(e.t1),e.next=9;break;case 8:n.text().then((function(e){E(e)}));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(e){console.log(e),E("Error occurred during connection to CSV validation server")}));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),N=function(){E("")};function T(e){return null!=e&&""!==e&&!isNaN(Number(e.toString()))}return Object(P.jsxs)(P.Fragment,{children:[Object(P.jsxs)(oe.a,{container:!0,direction:"row",spacing:10,children:[Object(P.jsx)(oe.a,{item:!0,children:Object(P.jsxs)(v.a,{borderRadius:8,children:[Object(P.jsx)(x.a,{variant:"h1",component:"div",children:"Requirements for importing a CSV file"}),Object(P.jsx)(se.a,{children:Object(P.jsxs)(le.a,{children:[Object(P.jsx)(de.a,{children:Object(P.jsx)(he.a,{})}),Object(P.jsx)(ue.a,{primary:"The first column in the file corresponds to the time of the attempt"}),Object(P.jsx)(de.a,{children:Object(P.jsx)(he.a,{})}),Object(P.jsx)(ue.a,{primary:"The second column takes a value of 0 or 1 depending on whether the sample is cut (0) / successful (0) / failed (1)"}),Object(P.jsx)(de.a,{children:Object(P.jsx)(he.a,{})}),Object(P.jsx)(ue.a,{primary:"Column headers do not matter, the order of the respective columns counts"}),Object(P.jsx)(de.a,{children:Object(P.jsx)(he.a,{})}),Object(P.jsx)(ue.a,{primary:"Blank line must be appended to the end of the file"})]})})]})}),Object(P.jsx)(v.a,{width:"100%"}),Object(P.jsx)(oe.a,{item:!0,children:Object(P.jsx)(je.a,{type:"file",inputProps:{accept:".csv"},id:"csvFile",onChange:function(e){var t,n=null===(t=e.target.files)||void 0===t?void 0:t[0],r=new FileReader,a=[];r.onload=function(e){var t,n=null===(t=e.target)||void 0===t?void 0:t.result,r=n.slice(n.indexOf("\r\n")+2).split("\r\n").slice(0,-1);!function(e,t){var n=!0;return e.forEach((function(e){var r=e.split(t);T(r[0])&&T(r[1])||(n=!1)})),n}(r,",")?(E("Data in in columns are not numeric values"),o(void 0)):(r.forEach((function(e){var t=e.split(",");a.push([Number(t[0]),Number(t[1])])})),o(a))},void 0!=n&&r.readAsText(n)}})})]}),Object(P.jsxs)(oe.a,{container:!0,direction:"row",spacing:10,children:[Object(P.jsx)(oe.a,{item:!0,children:Object(P.jsx)(C.a,{className:p.button,variant:"contained",disabled:d,onClick:function(){void 0!==n&&void 0!==c&&k.checkCSVData(n,c).then((function(e){return e.ok?e.json():Promise.reject(e.statusText)})).then((function(e){0==e?E("Entered CSV data are not correct, please check if period number in data are not bigger than declared periods and if occurrence is 0/1"):(f(!1),E("Your CSV is correct, you can click on generating chart"))})).catch((function(e){E("Error occurred during connection to CSV validation server")}))},children:"Check CSV File"})}),Object(P.jsx)(oe.a,{item:!0,children:Object(P.jsx)(C.a,{className:p.button,variant:"contained",disabled:O,onClick:F,children:"Generate chart base on CSV"})})]}),Object(P.jsx)(A.a,{anchorOrigin:{vertical:"bottom",horizontal:"right"},open:""!=S,autoHideDuration:6e3,onClose:N,children:Object(P.jsx)(te,{onClose:N,variant:"warning",message:S})})]})}var ge=n(430),fe=Object(f.a)((function(e){return{wrapper:{alignItems:"center",justifyContent:"center",height:"100vh",display:"flex",align:"center"},button:{textAlign:"center",background:"linear-gradient(45deg, #239890 30%, #47EEE3 90%)",color:"#1a0000","&:hover":{backgroundColor:"#A8AEAE"},marginTop:"10px",marginBottom:"10px",width:"40vh",height:"3vh"},form:{display:"flex",width:"20vw"}}}));function ve(e){var t=e.adding,n=e.periods,r=e.deleting,a=Array.from(Array(2).keys()),c=fe(),o=Object(i.useState)(),s=Object(g.a)(o,2),l=s[0],d=s[1],u=Object(i.useState)(),j=Object(g.a)(u,2),b=j[0],h=j[1],m=Object(i.useState)(),O=Object(g.a)(m,2),f=O[0],y=O[1],w=Object(i.useState)(),S=Object(g.a)(w,2),A=S[0],E=S[1];Object(i.useEffect)((function(){d(Array.from({length:n},(function(e,t){return t+1}))),r()}),[n]);return Object(P.jsxs)(P.Fragment,{children:[Object(P.jsxs)(oe.a,{container:!0,direction:"row",spacing:10,children:[Object(P.jsx)(oe.a,{item:!0,xs:10,children:Object(P.jsx)(v.a,{borderRadius:8,children:Object(P.jsx)(x.a,{variant:"h1",component:"div",children:"If adding cases manually is your preferred option, please add them in pursuance of the form below"})})}),Object(P.jsx)(oe.a,{item:!0,children:Object(P.jsx)(p.a,{id:"outlined-start-adornment",label:"Time unit",className:c.form,select:!0,defaultValue:"",onChange:function(e){y(e.target.value.toString())},children:["Miesi\u0105c","Dzie\u0144","Rok"].map((function(e){return Object(P.jsx)(ge.a,{value:e,children:e},e)}))})})]}),void 0!==!f&&void 0!==l&&Object(P.jsxs)(oe.a,{container:!0,direction:"row",spacing:10,children:[Object(P.jsx)(oe.a,{item:!0,children:Object(P.jsx)(p.a,{id:"standard-select-currency",className:c.form,select:!0,label:"Duration time",defaultValue:"",onChange:function(e){h(Number(e.target.value))},children:l.map((function(e){return Object(P.jsx)(ge.a,{value:e,children:e},e)}))})}),Object(P.jsx)(oe.a,{item:!0,children:Object(P.jsx)(p.a,{id:"standard-select-currency",select:!0,className:c.form,label:"Occurence",defaultValue:"",onChange:function(e){E("1"==e.target.value.toString())},children:a.map((function(e){return Object(P.jsx)(ge.a,{value:e,children:e},e)}))})}),Object(P.jsx)(oe.a,{item:!0,children:Object(P.jsx)(C.a,{variant:"contained",className:c.button,onClick:function(){void 0!==b&&void 0!==A&&t(b,A)},fullWidth:!0,children:"Add case"})})]})]})}var xe=n(445),pe=n(446),Ce=n(440),ye=n(447),we=Object(f.a)((function(e){return{wrapper:{alignItems:"center",justifyContent:"center",height:"100vh",display:"flex",align:"center",background:"linear-gradient(45deg, #C9E7E7 30%, #E5ECEC 90%)"},button:{textAlign:"center",background:"linear-gradient(45deg, #239890 30%, #47EEE3 90%)",color:"#1a0000","&:hover":{backgroundColor:"#A8AEAE"},marginTop:"10px",width:"20vh",height:"3vh"},form:{display:"flex",flexFlow:"column",height:"30%",width:"20vh",marginBottom:"20px"},divider:{marginBottom:"20px"}}}));function Se(){var e=Object(i.useState)([]),t=Object(g.a)(e,2),n=t[0],r=t[1],a=Object(i.useState)([]),c=Object(g.a)(a,2),o=c[0],s=c[1],l=Object(i.useState)(!0),d=Object(g.a)(l,2),u=d[0],j=d[1],b=Object(i.useState)(!1),f=Object(g.a)(b,2),k=f[0],F=f[1],N=Object(i.useState)(0),T=Object(g.a)(N,2),I=T[0],M=T[1],_=Object(i.useRef)(),R=V,H=Object(i.useState)(""),L=Object(g.a)(H,2),z=L[0],D=L[1];Object(i.useEffect)((function(){0!==n.length&&0!==I&&j(!1)}));var B=function(){D("")},W=we();return Object(P.jsx)(P.Fragment,{children:Object(P.jsxs)(v.a,{m:20,children:[Object(P.jsx)(x.a,{variant:"h1",component:"div",children:"Before deciding which method of adding data you will use, please specify the total time duration."}),Object(P.jsx)(p.a,{id:"outlined-name",className:W.form,inputRef:_,label:"Total duration"}),Object(P.jsx)(C.a,{variant:"contained",className:W.button,onClick:function(){void 0!=_.current&&(M(Number(_.current.value)),F(!0),D("Total duration is successfully saved"))},style:{marginBottom:"10px"},children:"Save"}),Object(P.jsx)(E.a,{className:W.divider}),k&&Object(P.jsxs)(P.Fragment,{children:[Object(P.jsx)(Oe,{submitData:function(e){s(e)},periods:I}),Object(P.jsx)(E.a,{className:W.divider}),Object(P.jsx)(ve,{adding:function(e,t){r([].concat(Object(O.a)(n),[{id:n.length,duration:e,occurrence:t}]))},deleting:function(){r([])},periods:I}),Object(P.jsx)(xe.a,{component:pe.a,children:Object(P.jsxs)(y.a,{"aria-label":"customized table",children:[Object(P.jsx)(w.a,{children:Object(P.jsxs)(S.a,{children:[Object(P.jsx)(Ce.a,{children:"ID"}),Object(P.jsx)(Ce.a,{align:"right",children:"Time of the trial"}),Object(P.jsx)(Ce.a,{align:"right",children:"The occurrence of the trial"})]})}),Object(P.jsx)(ye.a,{children:n.map((function(e){return Object(P.jsxs)(S.a,{children:[Object(P.jsx)(Ce.a,{component:"th",scope:"row",children:e.id}),Object(P.jsx)(Ce.a,{align:"right",children:e.duration}),Object(P.jsx)(Ce.a,{align:"right",children:e.occurrence?"1":"0"})]},e.id)}))})]})}),Object(P.jsx)(C.a,{variant:"contained",className:W.button,onClick:function(){n.find((function(e){return e.duration===I}))?R.survivalResults(I,n).then(function(){var e=Object(m.a)(h.a.mark((function e(t){return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.ok){e.next=8;break}return e.t0=s,e.next=4,t.json();case 4:e.t1=e.sent,(0,e.t0)(e.t1),e.next=9;break;case 8:D("Some error occurred during connection to backend");case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(){D("Connection to backend server refused")})):D("Please enter test case with duration equals declared total duration")},disabled:u,children:"Generate chart"})]}),Object(P.jsx)(A.a,{anchorOrigin:{vertical:"bottom",horizontal:"right"},open:""!=z,autoHideDuration:6e3,onClose:B,children:Object(P.jsx)(te,{onClose:B,variant:"warning",message:z})}),0!==o.length&&Object(P.jsxs)(P.Fragment,{children:[Object(P.jsx)(q,{data:o}),Object(P.jsx)(ce,{data:o})]})]})})}var Ae=n(205),Ee=n.n(Ae),ke=Object(f.a)((function(e){return{wrapper:{alignItems:"center",justifyContent:"center",height:"100vh",display:"flex",align:"center",backgroundImage:"url(".concat("../static/image.jpg",")")},button:{textAlign:"center",background:"linear-gradient(45deg, #667275 30%, #d9d7d7 90%)",color:"#f5fcfc","&:hover":{backgroundColor:"#A8AEAE"},width:"20vw",height:"5vh"},element:{margin:"20px"}}}));function Fe(){var e=ke(),t=Object(d.d)();return Object(P.jsx)(P.Fragment,{children:Object(P.jsxs)(oe.a,{container:!0,spacing:0,direction:"column",alignItems:"center",justifyContent:"center",style:{minHeight:"100vh",background:"linear-gradient(45deg, #C9E7E7 30%, #E5ECEC 90%)",padding:"30px"},children:[Object(P.jsx)(oe.a,{item:!0,children:Object(P.jsx)(x.a,{variant:"h3",component:"div",className:e.element,children:"Welcome in application"})}),Object(P.jsx)(oe.a,{item:!0,children:Object(P.jsx)(x.a,{variant:"h4",component:"div",className:e.element,children:"At the time of application development (11.2021) calculations connected to survival curve and obesity level based on logistic regression are available. Please click button below to enter application."})}),Object(P.jsx)(oe.a,{item:!0,children:Object(P.jsx)(C.a,{variant:"contained",className:e.button,onClick:function(){t.push("/main-page")},endIcon:Object(P.jsx)(Ee.a,{}),children:"Enter app"})})]})})}var Ne=Object(f.a)((function(e){return{wrapper:{background:"linear-gradient(45deg, #C9E7E7 30%, #E5ECEC 90%)"},button:{textAlign:"center",background:"linear-gradient(45deg, #667275 30%, #d9d7d7 90%)",color:"#FFFFFF","&:hover":{backgroundColor:"#A8AEAE"},margin:"20px",width:"20vw",height:"5vh"},element:{margin:"30px"}}}));function Te(){var e=Ne(),t=Object(d.d)();return Object(P.jsx)(P.Fragment,{children:Object(P.jsx)("div",{className:e.wrapper,children:Object(P.jsxs)(oe.a,{container:!0,spacing:0,direction:"column",alignItems:"center",justifyContent:"center",style:{minHeight:"100vh"},children:[Object(P.jsx)(oe.a,{item:!0,children:Object(P.jsx)(x.a,{variant:"h3",component:"div",className:e.element,children:"Select calculation"})}),Object(P.jsxs)(oe.a,{item:!0,children:[Object(P.jsx)(C.a,{variant:"contained",className:e.button,onClick:function(){t.push("/calc/survival-curve")},children:"survival curve"}),Object(P.jsx)(C.a,{variant:"contained",className:e.button,onClick:function(){t.push("/calc/logistic-regression")},children:"Obesity level with logistic regression"})]})]})})})}n(263);var Ie=n(432),Pe={checkCSVData:function(e){return fetch("/message-sender/validation",{method:"POST",mode:"cors",headers:{"Content-Type":"application/json; charset=utf-8","Access-Control-Allow-Origin":"*"},body:JSON.stringify(e)})},checkStatus:function(e){return fetch("/message-sender/validation/status/".concat(e),{method:"GET",mode:"cors",headers:{"Content-Type":"application/json; charset=utf-8","Access-Control-Allow-Origin":"*"}})},logisticRegressionFit:function(e){return fetch("/message-sender/logistic-regression",{method:"POST",mode:"cors",headers:{"Content-Type":"application/json; charset=utf-8","Access-Control-Allow-Origin":"*"},body:JSON.stringify(e)})},logisticRegressionCalcCustom:function(e,t,n){return fetch("/message-sender/logistic-regression/calc/custom",{method:"POST",mode:"cors",headers:{"Content-Type":"application/json; charset=utf-8","Access-Control-Allow-Origin":"*",Model:t,ModelId:n},body:JSON.stringify(e)})},logisticRegressionCalcOwn:function(e,t){return fetch("/message-sender/logistic-regression/calc/own",{method:"POST",mode:"cors",headers:{"Content-Type":"application/json; charset=utf-8","Access-Control-Allow-Origin":"*",Model:t},body:JSON.stringify(e)})}},qe=Object(f.a)((function(e){return{button:{textAlign:"center",background:"linear-gradient(45deg, #239890 30%, #47EEE3 90%)",color:"#1a0000","&:hover":{backgroundColor:"#A8AEAE"},marginTop:"10px",marginBottom:"10px",width:"20vh",height:"5vh"},form:{display:"flex",width:"10vw"}}}));function Ve(e){var t=e.unlockCustomModel,n=Object(i.useState)(),r=Object(g.a)(n,2),a=r[0],c=r[1],o=Object(i.useState)(!1),s=Object(g.a)(o,2),l=s[0],d=s[1],u=Object(i.useState)(!1),j=Object(g.a)(u,2),b=j[0],O=j[1],f=Object(i.useRef)(l),p=Object(i.useRef)(b),y=Object(i.useState)(!0),w=Object(g.a)(y,2),S=w[0],E=w[1],k=qe(),F=Pe,N=Object(i.useState)(""),T=Object(g.a)(N,2),I=T[0],q=T[1];Object(i.useEffect)((function(){f.current=l,p.current=b,void 0!==a&&E(!1)}));var V=function(){q("")};return Object(P.jsxs)(P.Fragment,{children:[Object(P.jsxs)(oe.a,{container:!0,direction:"row",spacing:10,children:[Object(P.jsxs)(oe.a,{item:!0,children:[Object(P.jsx)(x.a,{variant:"h1",component:"div",children:"Requirements for importing a CSV file"}),Object(P.jsxs)(se.a,{children:[Object(P.jsxs)(le.a,{children:[Object(P.jsx)(de.a,{children:Object(P.jsx)(he.a,{})}),Object(P.jsx)(ue.a,{primary:"Blank line must be appended to the end of the file"})]}),Object(P.jsxs)(le.a,{children:[Object(P.jsx)(de.a,{children:Object(P.jsx)(he.a,{})}),Object(P.jsx)(ue.a,{primary:"Specific headers must be placed: Gender, Age, Height, Weight, family_history_with_overweight, FAVC(frequently consuming of high caloric food), FCVC(Frequency of consumption of vegetables), NCP(number of main meals), CAEC(consumption of food between meals),\r SMOKE, CH2O(water of daily), SCC(calories consumption monitoring), FAF(physical activity frequency), TUE(time using technology devices), CALC, MTRANS(way of transport), NObeyesdad(obesity level)"})]}),Object(P.jsxs)(le.a,{children:[Object(P.jsx)(de.a,{children:Object(P.jsx)(he.a,{})}),Object(P.jsx)(ue.a,{style:{fontSize:5},primary:"Specific requirements for columns: Gender(Female/Male), Age(num.), Height(num.), Weight(num.), family_history_with_overweight(yes/no), FAVC(yes/no), FCVC(num.), NCP(num.), CAEC(no/Sometimes/Frequently/Always),\r SMOKE(yes/no), CH2O(num.), SCC(yes/no), FAF(num.), TUE(num.), CALC(no/Sometimes/Frequently/Always), MTRANS(Automobile/Motorbike/Bike/Public_Transportation/Walking), NObeyesdad(Insufficient_Weight/Normal_Weight/Overweight_Level_I/Overweight_Level_II/Obesity_Type_I/Obesity_Type_II/Obesity_Type_III)"})]})]})]}),Object(P.jsx)(v.a,{width:"100%"}),Object(P.jsx)(oe.a,{item:!0,children:Object(P.jsx)(je.a,{type:"file",inputProps:{accept:".csv"},id:"csvFile",onChange:function(e){var t,n=null===(t=e.target.files)||void 0===t?void 0:t[0],r=new FileReader,a=[];r.onload=function(e){var t,n=null===(t=e.target)||void 0===t?void 0:t.result;n.slice(n.indexOf("\r\n")+2).split("\r\n").slice(0,-1).forEach((function(e,t){var n=e.split(",");a.push([n[0].trim(),n[1].trim(),n[2].trim(),n[3].trim(),n[4].trim(),n[5].trim(),n[6].trim(),n[7].trim(),n[8].trim(),n[9].trim(),n[10].trim(),n[11].trim(),n[12].trim(),n[13].trim(),n[14].trim(),n[15].trim(),n[16].trim()])})),c(a)},void 0!=n&&r.readAsText(n)}})})]}),Object(P.jsxs)(oe.a,{container:!0,direction:"row",spacing:10,children:[Object(P.jsx)(oe.a,{item:!0,children:Object(P.jsxs)(C.a,{variant:"contained",className:k.button,disabled:S||b,onClick:function(){O(!0),void 0!==a&&F.checkCSVData(a).then((function(e){return e.json().then((function(e){var t=setInterval((function(){n(e.id_msg)}),5e3),n=function(){var e=Object(m.a)(h.a.mark((function e(n){var r,a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("ID "+n),e.next=3,F.checkStatus(n);case 3:return r=e.sent,e.next=6,r.json();case 6:a=e.sent,p.current&&("success"==a.result?(O(!1),clearInterval(t),q("CSV file is correct")):"fail"==a.result&&(clearInterval(t),q("CSV file is not correct. Please consider to check if all requirements are met"),O(!1)));case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();setTimeout((function(){p.current&&(clearInterval(t),q("Some problems occurred during validation, please try again later"))}),2e5)}))})).catch((function(e){q("Connection with backend service cannot be established"),O(!1)}))},children:[b&&Object(P.jsx)(Ie.a,{size:16}),"Check CSV File"]})}),Object(P.jsx)(oe.a,{item:!0,children:Object(P.jsxs)(C.a,{variant:"contained",className:k.button,onClick:function(){d(!0),void 0!==a&&F.logisticRegressionFit(a).then((function(e){return e.json().then(function(){var e=Object(m.a)(h.a.mark((function e(n){var r,a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=setInterval((function(){a(n.id_msg)}),5e3),a=function(){var e=Object(m.a)(h.a.mark((function e(n){var a,i;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("ID "+n),e.next=3,F.checkStatus(n);case 3:return a=e.sent,e.next=6,a.json();case 6:i=e.sent,f.current&&("fail"==i.result?("validation"==i.stage?q("Something is wrong with CSV validation"):q("Logistic regression calculation failed"),d(!1),clearInterval(r)):"success"==i.result&&"regression"==i.stage&&(q("Logistic regression was successful. Your model's accuracy is ".concat(i.accuracy," ")),t(n),clearInterval(r),d(!1)));case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),setTimeout((function(){f.current&&(q("Some problems occurred during process, please try again later "),d(!1),clearInterval(r))}),2e5);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())})).catch((function(e){q("Connection with backend service cannot be established"),d(!1)}))},disabled:l||S,children:[l&&Object(P.jsx)(Ie.a,{size:16}),"Upload logistic regression model"]})})]}),Object(P.jsx)(A.a,{anchorOrigin:{vertical:"bottom",horizontal:"right"},open:""!=I,autoHideDuration:6e3,onClose:V,children:Object(P.jsx)(te,{onClose:V,variant:"warning",message:I})})]})}var Me=n(429),_e=n(441),Re=n(79),He=n(48),Le=n(213),ze=Object(f.a)((function(e){return{wrapper:{alignItems:"center",justifyContent:"center",height:"100vh",display:"flex",align:"center"},button:{textAlign:"center",background:"linear-gradient(45deg, #239890 30%, #47EEE3 90%)",color:"#1a0000","&:hover":{backgroundColor:"#A8AEAE"},marginTop:"10px",marginBottom:"10px",width:"20vh",height:"5vh"},form:{display:"flex",width:"10vw"},formLong:{display:"flex",width:"13vw"}}}));function De(e){var t,n,r,a,c,o,s,l,d,u,j,b,O,f,v,y,w=ze(),S=e.disableCustomModel,E=e.modelId,k=Pe,F=Object(i.useState)(!1),N=Object(g.a)(F,2),T=N[0],I=N[1],q=Object(i.useState)(!1),V=Object(g.a)(q,2),_=V[0],R=V[1],H=Object(i.useRef)(T),L=Object(i.useRef)(_),z=Object(i.useState)(""),D=Object(g.a)(z,2),B=D[0],W=D[1],K=Object(i.useState)(""),U=Object(g.a)(K,2),J=U[0],G=U[1],Y=He.b().shape({Gender:He.c().required(),Age:He.a().typeError("age must be a number").required("age is required").min(0,"age cannot be less than 0"),Weight:He.a().typeError("weight must be a number").required("weight is required").min(0,"weight cannot be less than 0"),Height:He.a().required().typeError("height must be a number").required("height is required").min(0,"height cannot be less than 0"),family_history_with_overweight:He.c().required(),FAVC:He.c().required(),FCVC:He.c().required(),NCP:He.a().required().typeError("NCP must be a number").required("NCP is required").min(0,"NCP value cannot be less than 0"),CAEC:He.c().required(),SMOKE:He.c().required(),CH2O:He.a().required().typeError("CH2O must be a number").required("CH2O is required").min(0,"CH2O value cannot be less than 0"),SCC:He.c().required(),FAF:He.a().required().typeError("FAF must be a number").required("FAF is required").min(0,"FAF value cannot be less than 0"),TUE:He.a().required().typeError("TUE must be a number").required("TUE is required").min(0,"TUE value cannot be less than 0"),CALC:He.c().required(),MTRANS:He.c().required()}),Q=Object(Re.d)({resolver:Object(Le.a)(Y)}),X=Q.register,Z=Q.handleSubmit,$=Q.formState.errors,ee=(Q.reset,function(){G("")});Object(i.useEffect)((function(){H.current=T,L.current=_}));return Object(P.jsxs)(P.Fragment,{children:[Object(P.jsx)(oe.a,{container:!0,direction:"row",spacing:10,children:Object(P.jsx)(oe.a,{item:!0,xs:10,children:Object(P.jsx)(_e.a,{borderRadius:8,children:Object(P.jsx)(x.a,{variant:"h1",component:"div",children:"Please complete test case with proper values."})})})}),Object(P.jsxs)("form",{onSubmit:Z((function(e,t){var n,r=null===(n=(null===t||void 0===t?void 0:t.nativeEvent).submitter)||void 0===n?void 0:n.id;console.log(r);var a=JSON.parse(JSON.stringify(e,["Gender","Age","Height","Weight","family_history_with_overweight","FAVC","FCVC","NCP","CAEC","SMOKE","CH2O","SCC","FAF","TUE","CALC","MTRANS"]));a.Height=a.Height/100,"ourModel"==r?(I(!0),k.logisticRegressionCalcOwn(a,"own").then((function(e){return e.json().then((function(e){var t=setInterval((function(){n(e.id_msg)}),4e3),n=function(){var e=Object(m.a)(h.a.mark((function e(n){var r,a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("ID test case"+n),e.next=3,k.checkStatus(n);case 3:return r=e.sent,e.next=6,r.json();case 6:a=e.sent,H.current&&("success"==a.result?(G("Logistic regression calculation finished"),W(a.estimation),I(!1),clearInterval(t)):"fail"==a.result&&(clearInterval(t),G("Logistic regression calculation failed, please try again later"),I(!1)));case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();setTimeout((function(){H.current&&(clearInterval(t),G("Some problems occurred during calculation. Probably it is problem with our server. Please try again later"),I(!1))}),2e5)}))})).catch((function(e){G("Connection with backend service cannot be established"),I(!1)}))):"customModel"==r&&void 0!==E&&(R(!0),k.logisticRegressionCalcCustom(a,"custom",E).then((function(e){return e.json().then((function(e){var t=setInterval((function(){n(e.id_msg)}),4e3),n=function(){var e=Object(m.a)(h.a.mark((function e(n){var r,a;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("ID test case"+n),e.next=3,k.checkStatus(n);case 3:return r=e.sent,e.next=6,r.json();case 6:a=e.sent,L.current&&("success"==a.result?(G("Logistic regression calculation finished"),W(a.estimation),R(!1),clearInterval(t)):"fail"==a.result&&(clearInterval(t),G("Logistic regression calculation failed, please try again later"),R(!1)));case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();setTimeout((function(){L.current&&(clearInterval(t),G("Some problems occurred during calculation. Probably it is problem with our server. Please try again later"),R(!1))}),2e5)}))})).catch((function(e){G("Connection with backend service cannot be established"),R(!1)})))})),children:[Object(P.jsxs)(oe.a,{container:!0,direction:"row",spacing:10,children:[Object(P.jsxs)(oe.a,{item:!0,children:[Object(P.jsx)(p.a,Object(M.a)(Object(M.a)({id:"outlined-start-adornment",label:"Gender",className:w.form,select:!0},X("Gender")),{},{children:["Female","Male"].map((function(e){return Object(P.jsx)(ge.a,{value:e,children:e},e)}))})),Object(P.jsx)(Me.a,{error:!0,children:null===(t=$.Gender)||void 0===t?void 0:t.message})]}),Object(P.jsxs)(oe.a,{item:!0,children:[Object(P.jsx)(p.a,Object(M.a)(Object(M.a)({},X("Age")),{},{id:"outlined-start-adornment",label:"Age",className:w.form,type:"number"})),Object(P.jsx)(Me.a,{error:!0,children:null===(n=$.Age)||void 0===n?void 0:n.message})]}),Object(P.jsxs)(oe.a,{item:!0,children:[Object(P.jsx)(p.a,Object(M.a)({id:"outlined-start-adornment",label:"Height [cm]",className:w.form,type:"number"},X("Height"))),Object(P.jsx)(Me.a,{error:!0,children:null===(r=$.Height)||void 0===r?void 0:r.message})]}),Object(P.jsxs)(oe.a,{item:!0,children:[Object(P.jsx)(p.a,Object(M.a)(Object(M.a)({id:"outlined-start-adornment",label:"Weight"},X("Weight")),{},{className:w.form,type:"number"})),Object(P.jsx)(Me.a,{error:!0,children:null===(a=$.Weight)||void 0===a?void 0:a.message})]}),Object(P.jsxs)(oe.a,{item:!0,children:[Object(P.jsx)(p.a,Object(M.a)(Object(M.a)({id:"outlined-start-adornment",label:"Family history with overweight",className:w.formLong,select:!0},X("family_history_with_overweight")),{},{children:["yes","no"].map((function(e){return Object(P.jsx)(ge.a,{value:e,children:e},e)}))})),Object(P.jsx)(Me.a,{error:!0,children:null===(c=$.family_history_with_overweight)||void 0===c?void 0:c.message})]}),Object(P.jsxs)(oe.a,{item:!0,children:[Object(P.jsx)(p.a,Object(M.a)(Object(M.a)({id:"outlined-start-adornment",label:"FAVC",className:w.form,select:!0},X("FAVC")),{},{children:["yes","no"].map((function(e){return Object(P.jsx)(ge.a,{value:e,children:e},e)}))})),Object(P.jsx)(Me.a,{error:!0,children:null===(o=$.FAVC)||void 0===o?void 0:o.message})]}),Object(P.jsxs)(oe.a,{item:!0,children:[Object(P.jsx)(p.a,Object(M.a)(Object(M.a)({id:"outlined-start-adornment",label:"FCVC",className:w.form},X("FCVC")),{},{type:"number"})),Object(P.jsx)(Me.a,{error:!0,children:null===(s=$.FCVC)||void 0===s?void 0:s.message})]})]}),Object(P.jsxs)(oe.a,{container:!0,direction:"row",spacing:10,children:[Object(P.jsxs)(oe.a,{item:!0,children:[Object(P.jsx)(p.a,Object(M.a)(Object(M.a)({id:"outlined-start-adornment",label:"NCP"},X("NCP")),{},{className:w.form,type:"number"})),Object(P.jsx)(Me.a,{error:!0,children:null===(l=$.NCP)||void 0===l?void 0:l.message})]}),Object(P.jsxs)(oe.a,{item:!0,children:[Object(P.jsx)(p.a,Object(M.a)(Object(M.a)({id:"outlined-start-adornment",label:"CAEC",className:w.form,select:!0},X("CAEC")),{},{children:["NO","Sometimes","Frequently","Always"].map((function(e){return Object(P.jsx)(ge.a,{value:e,children:e},e)}))})),Object(P.jsx)(Me.a,{error:!0,children:null===(d=$.CAEC)||void 0===d?void 0:d.message})]}),Object(P.jsxs)(oe.a,{item:!0,children:[Object(P.jsx)(p.a,Object(M.a)(Object(M.a)({id:"outlined-start-adornment",label:"SMOKE",className:w.form,select:!0},X("SMOKE")),{},{children:["yes","no"].map((function(e){return Object(P.jsx)(ge.a,{value:e,children:e},e)}))})),Object(P.jsx)(Me.a,{error:!0,children:null===(u=$.SMOKE)||void 0===u?void 0:u.message})]}),Object(P.jsxs)(oe.a,{item:!0,children:[Object(P.jsx)(p.a,Object(M.a)({id:"outlined-start-adornment",label:"CH2O",className:w.form,type:"number"},X("CH2O"))),Object(P.jsx)(Me.a,{error:!0,children:null===(j=$.CH2O)||void 0===j?void 0:j.message})]}),Object(P.jsxs)(oe.a,{item:!0,children:[Object(P.jsx)(p.a,Object(M.a)(Object(M.a)({id:"outlined-start-adornment",label:"SCC",className:w.form,select:!0},X("SCC")),{},{children:["yes","no"].map((function(e){return Object(P.jsx)(ge.a,{value:e,children:e},e)}))})),Object(P.jsx)(Me.a,{error:!0,children:null===(b=$.SCC)||void 0===b?void 0:b.message})]}),Object(P.jsxs)(oe.a,{item:!0,children:[Object(P.jsx)(p.a,Object(M.a)({id:"outlined-start-adornment",label:"FAF",className:w.form,type:"number"},X("FAF"))),Object(P.jsx)(Me.a,{error:!0,children:null===(O=$.FAF)||void 0===O?void 0:O.message})]}),Object(P.jsxs)(oe.a,{item:!0,children:[Object(P.jsx)(p.a,Object(M.a)(Object(M.a)({id:"outlined-start-adornment",label:"TUE",className:w.form},X("TUE")),{},{type:"number"})),Object(P.jsx)(Me.a,{error:!0,children:null===(f=$.TUE)||void 0===f?void 0:f.message})]})]}),Object(P.jsxs)(oe.a,{container:!0,direction:"row",spacing:10,children:[Object(P.jsxs)(oe.a,{item:!0,children:[Object(P.jsx)(p.a,Object(M.a)(Object(M.a)({id:"outlined-start-adornment",label:"CALC",className:w.form,select:!0},X("CALC")),{},{children:["NO","Sometimes","Frequently","Always"].map((function(e){return Object(P.jsx)(ge.a,{value:e,children:e},e)}))})),Object(P.jsx)(Me.a,{error:!0,children:null===(v=$.CALC)||void 0===v?void 0:v.message})]}),Object(P.jsxs)(oe.a,{item:!0,children:[Object(P.jsx)(p.a,Object(M.a)(Object(M.a)({id:"outlined-start-adornment",label:"MTRANS",className:w.form,select:!0},X("MTRANS")),{},{children:["Automobile","Motorbike","Bike","Public_Transportation","Walking"].map((function(e){return Object(P.jsx)(ge.a,{value:e,children:e},e)}))})),Object(P.jsx)(Me.a,{error:!0,children:null===(y=$.MTRANS)||void 0===y?void 0:y.message})]})]}),Object(P.jsxs)(oe.a,{container:!0,direction:"row",spacing:10,children:[Object(P.jsx)(oe.a,{item:!0,children:Object(P.jsxs)(C.a,{variant:"contained",id:"ourModel",type:"submit",className:w.button,disabled:T,children:[T&&Object(P.jsx)(Ie.a,{size:16}),"Calculate with our model"]})}),Object(P.jsx)(oe.a,{item:!0,children:Object(P.jsxs)(C.a,{variant:"contained",id:"customModel",type:"submit",className:w.button,disabled:_||S,children:[_&&Object(P.jsx)(Ie.a,{size:16}),"Calculate with custom model"]})})]})]}),""!==B&&Object(P.jsxs)(_e.a,{sx:{boxShadow:1,bgcolor:"background.paper",marginLeft:"30px",margin:"20px",width:"80vw",height:"5vh",alignItems:"center",justifyContent:"center",display:"flex"},children:[Object(P.jsx)(x.a,{variant:"h2",align:"center",style:{margin:"5px"},children:"Estimated level of obesity based on eating habits and physical condition is "}),Object(P.jsx)(x.a,{variant:"h6",children:" ".concat(B)})]}),Object(P.jsx)(A.a,{anchorOrigin:{vertical:"bottom",horizontal:"right"},open:""!=J,autoHideDuration:6e3,onClose:ee,children:Object(P.jsx)(te,{onClose:ee,variant:"warning",message:J})})]})}var Be=Object(f.a)((function(e){return{wrapper:{alignItems:"center",justifyContent:"center",height:"100vh",display:"flex",align:"center"},button:{textAlign:"center",background:"linear-gradient(45deg, #239890 30%, #47EEE3 90%)",color:"#1a0000","&:hover":{backgroundColor:"#A8AEAE"},marginTop:"10px",marginBottom:"10px",width:"40vh",height:"3vh"},form:{display:"flex",width:"20vw"}}}));function We(){Be();var e=Object(i.useState)(!0),t=Object(g.a)(e,2),n=t[0],r=t[1],a=Object(i.useState)(),c=Object(g.a)(a,2),o=c[0],s=c[1];return Object(P.jsx)(P.Fragment,{children:Object(P.jsxs)(v.a,{m:20,children:[Object(P.jsx)(Ve,{unlockCustomModel:function(e){r(!1),s(e)}}),Object(P.jsx)(De,{disableCustomModel:n,modelId:o})]})})}var Ke=function(){var e={enter:800,exit:500},t=Object(l.a)(),n=r(t.location);function r(e){return e.pathname.split("/").filter((function(e){return""!==e})).length}function a(){var e=r(t.location)-n>=0;return n=r(t.location),e}return Object(P.jsx)(d.b,{history:t,children:Object(P.jsx)(d.a,{render:function(){return Object(P.jsx)(u.a,{children:Object(P.jsx)(j.a,{timeout:e,classNames:a()?"pageSliderLeft":"pageSliderRight",mountOnEnter:!0,unmountOnExit:!0,children:Object(P.jsxs)(d.c,{location:t.location,children:[Object(P.jsx)(d.a,{path:"/",exact:!0,component:Fe}),Object(P.jsx)(d.a,{path:"/main-page",component:Te}),Object(P.jsx)(d.a,{path:"/calc/survival-curve",component:Se}),Object(P.jsx)(d.a,{path:"/calc/logistic-regression",component:We})]})},t.location.pathname.split("/")[1])})}})})},Ue=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,448)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,i=t.getLCP,c=t.getTTFB;n(e),r(e),a(e),i(e),c(e)}))},Je=Object(r.a)({spacing:3,typography:{fontSize:19,fontFamily:["Palatino","URW Palladio L","serif"].join(","),h1:{fontSize:20,fontFamily:"Palatino"},h2:{fontSize:23,fontFamily:"Palatino"},h3:{fontSize:60,fontFamily:"Palatino",fontStyle:"italic",color:"#68636F",fontVariant:"small-caps",textTransform:"capitalize",textDecoration:"none solid rgb(68, 68, 68)"},h4:{fontSize:25,fontFamily:"Palatino",fontStyle:"italic",color:"#68636F",textDecoration:"none solid rgb(68, 68, 68)"},h6:{fontSize:23,fontFamily:"Palatino",fontStyle:"italic"}},palette:{background:{default:"#31A4A9"},primary:{main:"#153435"},error:{main:"#D72A2A"},warning:{main:"#FC7B09"},success:{main:"#09FE00"},text:{primary:"#000000"}}});s.a.render(Object(P.jsx)(c.a.StrictMode,{children:Object(P.jsx)(a.a,{theme:Je,children:Object(P.jsx)(Ke,{})})}),document.getElementById("root")),Ue()}},[[364,1,2]]]);
//# sourceMappingURL=main.80c1bc63.chunk.js.map