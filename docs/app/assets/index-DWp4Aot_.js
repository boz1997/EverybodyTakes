(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();var pv={exports:{}},Pu={},mv={exports:{}},ne={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var la=Symbol.for("react.element"),RA=Symbol.for("react.portal"),CA=Symbol.for("react.fragment"),PA=Symbol.for("react.strict_mode"),NA=Symbol.for("react.profiler"),xA=Symbol.for("react.provider"),DA=Symbol.for("react.context"),bA=Symbol.for("react.forward_ref"),VA=Symbol.for("react.suspense"),OA=Symbol.for("react.memo"),LA=Symbol.for("react.lazy"),ig=Symbol.iterator;function MA(t){return t===null||typeof t!="object"?null:(t=ig&&t[ig]||t["@@iterator"],typeof t=="function"?t:null)}var gv={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},yv=Object.assign,_v={};function As(t,e,n){this.props=t,this.context=e,this.refs=_v,this.updater=n||gv}As.prototype.isReactComponent={};As.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};As.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function vv(){}vv.prototype=As.prototype;function Yd(t,e,n){this.props=t,this.context=e,this.refs=_v,this.updater=n||gv}var Jd=Yd.prototype=new vv;Jd.constructor=Yd;yv(Jd,As.prototype);Jd.isPureReactComponent=!0;var sg=Array.isArray,wv=Object.prototype.hasOwnProperty,Zd={current:null},Ev={key:!0,ref:!0,__self:!0,__source:!0};function Tv(t,e,n){var r,i={},s=null,o=null;if(e!=null)for(r in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(s=""+e.key),e)wv.call(e,r)&&!Ev.hasOwnProperty(r)&&(i[r]=e[r]);var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){for(var u=Array(l),c=0;c<l;c++)u[c]=arguments[c+2];i.children=u}if(t&&t.defaultProps)for(r in l=t.defaultProps,l)i[r]===void 0&&(i[r]=l[r]);return{$$typeof:la,type:t,key:s,ref:o,props:i,_owner:Zd.current}}function UA(t,e){return{$$typeof:la,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function ef(t){return typeof t=="object"&&t!==null&&t.$$typeof===la}function FA(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var og=/\/+/g;function $c(t,e){return typeof t=="object"&&t!==null&&t.key!=null?FA(""+t.key):e.toString(36)}function ul(t,e,n,r,i){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(s){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case la:case RA:o=!0}}if(o)return o=t,i=i(o),t=r===""?"."+$c(o,0):r,sg(i)?(n="",t!=null&&(n=t.replace(og,"$&/")+"/"),ul(i,e,n,"",function(c){return c})):i!=null&&(ef(i)&&(i=UA(i,n+(!i.key||o&&o.key===i.key?"":(""+i.key).replace(og,"$&/")+"/")+t)),e.push(i)),1;if(o=0,r=r===""?".":r+":",sg(t))for(var l=0;l<t.length;l++){s=t[l];var u=r+$c(s,l);o+=ul(s,e,n,u,i)}else if(u=MA(t),typeof u=="function")for(t=u.call(t),l=0;!(s=t.next()).done;)s=s.value,u=r+$c(s,l++),o+=ul(s,e,n,u,i);else if(s==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function Ua(t,e,n){if(t==null)return t;var r=[],i=0;return ul(t,r,"","",function(s){return e.call(n,s,i++)}),r}function jA(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var mt={current:null},cl={transition:null},BA={ReactCurrentDispatcher:mt,ReactCurrentBatchConfig:cl,ReactCurrentOwner:Zd};function Iv(){throw Error("act(...) is not supported in production builds of React.")}ne.Children={map:Ua,forEach:function(t,e,n){Ua(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Ua(t,function(){e++}),e},toArray:function(t){return Ua(t,function(e){return e})||[]},only:function(t){if(!ef(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};ne.Component=As;ne.Fragment=CA;ne.Profiler=NA;ne.PureComponent=Yd;ne.StrictMode=PA;ne.Suspense=VA;ne.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=BA;ne.act=Iv;ne.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=yv({},t.props),i=t.key,s=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(s=e.ref,o=Zd.current),e.key!==void 0&&(i=""+e.key),t.type&&t.type.defaultProps)var l=t.type.defaultProps;for(u in e)wv.call(e,u)&&!Ev.hasOwnProperty(u)&&(r[u]=e[u]===void 0&&l!==void 0?l[u]:e[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){l=Array(u);for(var c=0;c<u;c++)l[c]=arguments[c+2];r.children=l}return{$$typeof:la,type:t.type,key:i,ref:s,props:r,_owner:o}};ne.createContext=function(t){return t={$$typeof:DA,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:xA,_context:t},t.Consumer=t};ne.createElement=Tv;ne.createFactory=function(t){var e=Tv.bind(null,t);return e.type=t,e};ne.createRef=function(){return{current:null}};ne.forwardRef=function(t){return{$$typeof:bA,render:t}};ne.isValidElement=ef;ne.lazy=function(t){return{$$typeof:LA,_payload:{_status:-1,_result:t},_init:jA}};ne.memo=function(t,e){return{$$typeof:OA,type:t,compare:e===void 0?null:e}};ne.startTransition=function(t){var e=cl.transition;cl.transition={};try{t()}finally{cl.transition=e}};ne.unstable_act=Iv;ne.useCallback=function(t,e){return mt.current.useCallback(t,e)};ne.useContext=function(t){return mt.current.useContext(t)};ne.useDebugValue=function(){};ne.useDeferredValue=function(t){return mt.current.useDeferredValue(t)};ne.useEffect=function(t,e){return mt.current.useEffect(t,e)};ne.useId=function(){return mt.current.useId()};ne.useImperativeHandle=function(t,e,n){return mt.current.useImperativeHandle(t,e,n)};ne.useInsertionEffect=function(t,e){return mt.current.useInsertionEffect(t,e)};ne.useLayoutEffect=function(t,e){return mt.current.useLayoutEffect(t,e)};ne.useMemo=function(t,e){return mt.current.useMemo(t,e)};ne.useReducer=function(t,e,n){return mt.current.useReducer(t,e,n)};ne.useRef=function(t){return mt.current.useRef(t)};ne.useState=function(t){return mt.current.useState(t)};ne.useSyncExternalStore=function(t,e,n){return mt.current.useSyncExternalStore(t,e,n)};ne.useTransition=function(){return mt.current.useTransition()};ne.version="18.3.1";mv.exports=ne;var ae=mv.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var zA=ae,$A=Symbol.for("react.element"),qA=Symbol.for("react.fragment"),HA=Object.prototype.hasOwnProperty,WA=zA.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,GA={key:!0,ref:!0,__self:!0,__source:!0};function Av(t,e,n){var r,i={},s=null,o=null;n!==void 0&&(s=""+n),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)HA.call(e,r)&&!GA.hasOwnProperty(r)&&(i[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)i[r]===void 0&&(i[r]=e[r]);return{$$typeof:$A,type:t,key:s,ref:o,props:i,_owner:WA.current}}Pu.Fragment=qA;Pu.jsx=Av;Pu.jsxs=Av;pv.exports=Pu;var x=pv.exports,Sv={exports:{}},Mt={},kv={exports:{}},Rv={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e($,X){var J=$.length;$.push(X);e:for(;0<J;){var ye=J-1>>>1,Ce=$[ye];if(0<i(Ce,X))$[ye]=X,$[J]=Ce,J=ye;else break e}}function n($){return $.length===0?null:$[0]}function r($){if($.length===0)return null;var X=$[0],J=$.pop();if(J!==X){$[0]=J;e:for(var ye=0,Ce=$.length,zr=Ce>>>1;ye<zr;){var jt=2*(ye+1)-1,$r=$[jt],Qt=jt+1,Wn=$[Qt];if(0>i($r,J))Qt<Ce&&0>i(Wn,$r)?($[ye]=Wn,$[Qt]=J,ye=Qt):($[ye]=$r,$[jt]=J,ye=jt);else if(Qt<Ce&&0>i(Wn,J))$[ye]=Wn,$[Qt]=J,ye=Qt;else break e}}return X}function i($,X){var J=$.sortIndex-X.sortIndex;return J!==0?J:$.id-X.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var o=Date,l=o.now();t.unstable_now=function(){return o.now()-l}}var u=[],c=[],f=1,p=null,m=3,I=!1,R=!1,P=!1,O=typeof setTimeout=="function"?setTimeout:null,A=typeof clearTimeout=="function"?clearTimeout:null,w=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function k($){for(var X=n(c);X!==null;){if(X.callback===null)r(c);else if(X.startTime<=$)r(c),X.sortIndex=X.expirationTime,e(u,X);else break;X=n(c)}}function b($){if(P=!1,k($),!R)if(n(u)!==null)R=!0,Vs(F);else{var X=n(c);X!==null&&Os(b,X.startTime-$)}}function F($,X){R=!1,P&&(P=!1,A(y),y=-1),I=!0;var J=m;try{for(k(X),p=n(u);p!==null&&(!(p.expirationTime>X)||$&&!S());){var ye=p.callback;if(typeof ye=="function"){p.callback=null,m=p.priorityLevel;var Ce=ye(p.expirationTime<=X);X=t.unstable_now(),typeof Ce=="function"?p.callback=Ce:p===n(u)&&r(u),k(X)}else r(u);p=n(u)}if(p!==null)var zr=!0;else{var jt=n(c);jt!==null&&Os(b,jt.startTime-X),zr=!1}return zr}finally{p=null,m=J,I=!1}}var M=!1,v=null,y=-1,_=5,E=-1;function S(){return!(t.unstable_now()-E<_)}function C(){if(v!==null){var $=t.unstable_now();E=$;var X=!0;try{X=v(!0,$)}finally{X?T():(M=!1,v=null)}}else M=!1}var T;if(typeof w=="function")T=function(){w(C)};else if(typeof MessageChannel<"u"){var qe=new MessageChannel,An=qe.port2;qe.port1.onmessage=C,T=function(){An.postMessage(null)}}else T=function(){O(C,0)};function Vs($){v=$,M||(M=!0,T())}function Os($,X){y=O(function(){$(t.unstable_now())},X)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function($){$.callback=null},t.unstable_continueExecution=function(){R||I||(R=!0,Vs(F))},t.unstable_forceFrameRate=function($){0>$||125<$?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):_=0<$?Math.floor(1e3/$):5},t.unstable_getCurrentPriorityLevel=function(){return m},t.unstable_getFirstCallbackNode=function(){return n(u)},t.unstable_next=function($){switch(m){case 1:case 2:case 3:var X=3;break;default:X=m}var J=m;m=X;try{return $()}finally{m=J}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function($,X){switch($){case 1:case 2:case 3:case 4:case 5:break;default:$=3}var J=m;m=$;try{return X()}finally{m=J}},t.unstable_scheduleCallback=function($,X,J){var ye=t.unstable_now();switch(typeof J=="object"&&J!==null?(J=J.delay,J=typeof J=="number"&&0<J?ye+J:ye):J=ye,$){case 1:var Ce=-1;break;case 2:Ce=250;break;case 5:Ce=1073741823;break;case 4:Ce=1e4;break;default:Ce=5e3}return Ce=J+Ce,$={id:f++,callback:X,priorityLevel:$,startTime:J,expirationTime:Ce,sortIndex:-1},J>ye?($.sortIndex=J,e(c,$),n(u)===null&&$===n(c)&&(P?(A(y),y=-1):P=!0,Os(b,J-ye))):($.sortIndex=Ce,e(u,$),R||I||(R=!0,Vs(F))),$},t.unstable_shouldYield=S,t.unstable_wrapCallback=function($){var X=m;return function(){var J=m;m=X;try{return $.apply(this,arguments)}finally{m=J}}}})(Rv);kv.exports=Rv;var KA=kv.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var QA=ae,Ot=KA;function U(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Cv=new Set,Oo={};function vi(t,e){as(t,e),as(t+"Capture",e)}function as(t,e){for(Oo[t]=e,t=0;t<e.length;t++)Cv.add(e[t])}var bn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),bh=Object.prototype.hasOwnProperty,XA=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ag={},lg={};function YA(t){return bh.call(lg,t)?!0:bh.call(ag,t)?!1:XA.test(t)?lg[t]=!0:(ag[t]=!0,!1)}function JA(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function ZA(t,e,n,r){if(e===null||typeof e>"u"||JA(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function gt(t,e,n,r,i,s,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=s,this.removeEmptyString=o}var Xe={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){Xe[t]=new gt(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];Xe[e]=new gt(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){Xe[t]=new gt(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){Xe[t]=new gt(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){Xe[t]=new gt(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){Xe[t]=new gt(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){Xe[t]=new gt(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){Xe[t]=new gt(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){Xe[t]=new gt(t,5,!1,t.toLowerCase(),null,!1,!1)});var tf=/[\-:]([a-z])/g;function nf(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(tf,nf);Xe[e]=new gt(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(tf,nf);Xe[e]=new gt(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(tf,nf);Xe[e]=new gt(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){Xe[t]=new gt(t,1,!1,t.toLowerCase(),null,!1,!1)});Xe.xlinkHref=new gt("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){Xe[t]=new gt(t,1,!1,t.toLowerCase(),null,!0,!0)});function rf(t,e,n,r){var i=Xe.hasOwnProperty(e)?Xe[e]:null;(i!==null?i.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(ZA(e,n,i,r)&&(n=null),r||i===null?YA(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):i.mustUseProperty?t[i.propertyName]=n===null?i.type===3?!1:"":n:(e=i.attributeName,r=i.attributeNamespace,n===null?t.removeAttribute(e):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var zn=QA.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Fa=Symbol.for("react.element"),Oi=Symbol.for("react.portal"),Li=Symbol.for("react.fragment"),sf=Symbol.for("react.strict_mode"),Vh=Symbol.for("react.profiler"),Pv=Symbol.for("react.provider"),Nv=Symbol.for("react.context"),of=Symbol.for("react.forward_ref"),Oh=Symbol.for("react.suspense"),Lh=Symbol.for("react.suspense_list"),af=Symbol.for("react.memo"),tr=Symbol.for("react.lazy"),xv=Symbol.for("react.offscreen"),ug=Symbol.iterator;function Js(t){return t===null||typeof t!="object"?null:(t=ug&&t[ug]||t["@@iterator"],typeof t=="function"?t:null)}var Ie=Object.assign,qc;function co(t){if(qc===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);qc=e&&e[1]||""}return`
`+qc+t}var Hc=!1;function Wc(t,e){if(!t||Hc)return"";Hc=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var r=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){r=c}t.call(e.prototype)}else{try{throw Error()}catch(c){r=c}t()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var i=c.stack.split(`
`),s=r.stack.split(`
`),o=i.length-1,l=s.length-1;1<=o&&0<=l&&i[o]!==s[l];)l--;for(;1<=o&&0<=l;o--,l--)if(i[o]!==s[l]){if(o!==1||l!==1)do if(o--,l--,0>l||i[o]!==s[l]){var u=`
`+i[o].replace(" at new "," at ");return t.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",t.displayName)),u}while(1<=o&&0<=l);break}}}finally{Hc=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?co(t):""}function eS(t){switch(t.tag){case 5:return co(t.type);case 16:return co("Lazy");case 13:return co("Suspense");case 19:return co("SuspenseList");case 0:case 2:case 15:return t=Wc(t.type,!1),t;case 11:return t=Wc(t.type.render,!1),t;case 1:return t=Wc(t.type,!0),t;default:return""}}function Mh(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Li:return"Fragment";case Oi:return"Portal";case Vh:return"Profiler";case sf:return"StrictMode";case Oh:return"Suspense";case Lh:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Nv:return(t.displayName||"Context")+".Consumer";case Pv:return(t._context.displayName||"Context")+".Provider";case of:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case af:return e=t.displayName||null,e!==null?e:Mh(t.type)||"Memo";case tr:e=t._payload,t=t._init;try{return Mh(t(e))}catch{}}return null}function tS(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Mh(e);case 8:return e===sf?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function kr(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Dv(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function nS(t){var e=Dv(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,s=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return i.call(this)},set:function(o){r=""+o,s.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function ja(t){t._valueTracker||(t._valueTracker=nS(t))}function bv(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=Dv(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function Dl(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Uh(t,e){var n=e.checked;return Ie({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function cg(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=kr(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Vv(t,e){e=e.checked,e!=null&&rf(t,"checked",e,!1)}function Fh(t,e){Vv(t,e);var n=kr(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?jh(t,e.type,n):e.hasOwnProperty("defaultValue")&&jh(t,e.type,kr(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function hg(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function jh(t,e,n){(e!=="number"||Dl(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var ho=Array.isArray;function Qi(t,e,n,r){if(t=t.options,e){e={};for(var i=0;i<n.length;i++)e["$"+n[i]]=!0;for(n=0;n<t.length;n++)i=e.hasOwnProperty("$"+t[n].value),t[n].selected!==i&&(t[n].selected=i),i&&r&&(t[n].defaultSelected=!0)}else{for(n=""+kr(n),e=null,i=0;i<t.length;i++){if(t[i].value===n){t[i].selected=!0,r&&(t[i].defaultSelected=!0);return}e!==null||t[i].disabled||(e=t[i])}e!==null&&(e.selected=!0)}}function Bh(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(U(91));return Ie({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function dg(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(U(92));if(ho(n)){if(1<n.length)throw Error(U(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:kr(n)}}function Ov(t,e){var n=kr(e.value),r=kr(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function fg(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Lv(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function zh(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Lv(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Ba,Mv=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,i){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,i)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Ba=Ba||document.createElement("div"),Ba.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Ba.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Lo(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var vo={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},rS=["Webkit","ms","Moz","O"];Object.keys(vo).forEach(function(t){rS.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),vo[e]=vo[t]})});function Uv(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||vo.hasOwnProperty(t)&&vo[t]?(""+e).trim():e+"px"}function Fv(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=Uv(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,i):t[n]=i}}var iS=Ie({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function $h(t,e){if(e){if(iS[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(U(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(U(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(U(61))}if(e.style!=null&&typeof e.style!="object")throw Error(U(62))}}function qh(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Hh=null;function lf(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Wh=null,Xi=null,Yi=null;function pg(t){if(t=ha(t)){if(typeof Wh!="function")throw Error(U(280));var e=t.stateNode;e&&(e=Vu(e),Wh(t.stateNode,t.type,e))}}function jv(t){Xi?Yi?Yi.push(t):Yi=[t]:Xi=t}function Bv(){if(Xi){var t=Xi,e=Yi;if(Yi=Xi=null,pg(t),e)for(t=0;t<e.length;t++)pg(e[t])}}function zv(t,e){return t(e)}function $v(){}var Gc=!1;function qv(t,e,n){if(Gc)return t(e,n);Gc=!0;try{return zv(t,e,n)}finally{Gc=!1,(Xi!==null||Yi!==null)&&($v(),Bv())}}function Mo(t,e){var n=t.stateNode;if(n===null)return null;var r=Vu(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(U(231,e,typeof n));return n}var Gh=!1;if(bn)try{var Zs={};Object.defineProperty(Zs,"passive",{get:function(){Gh=!0}}),window.addEventListener("test",Zs,Zs),window.removeEventListener("test",Zs,Zs)}catch{Gh=!1}function sS(t,e,n,r,i,s,o,l,u){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(f){this.onError(f)}}var wo=!1,bl=null,Vl=!1,Kh=null,oS={onError:function(t){wo=!0,bl=t}};function aS(t,e,n,r,i,s,o,l,u){wo=!1,bl=null,sS.apply(oS,arguments)}function lS(t,e,n,r,i,s,o,l,u){if(aS.apply(this,arguments),wo){if(wo){var c=bl;wo=!1,bl=null}else throw Error(U(198));Vl||(Vl=!0,Kh=c)}}function wi(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Hv(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function mg(t){if(wi(t)!==t)throw Error(U(188))}function uS(t){var e=t.alternate;if(!e){if(e=wi(t),e===null)throw Error(U(188));return e!==t?null:t}for(var n=t,r=e;;){var i=n.return;if(i===null)break;var s=i.alternate;if(s===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===n)return mg(i),t;if(s===r)return mg(i),e;s=s.sibling}throw Error(U(188))}if(n.return!==r.return)n=i,r=s;else{for(var o=!1,l=i.child;l;){if(l===n){o=!0,n=i,r=s;break}if(l===r){o=!0,r=i,n=s;break}l=l.sibling}if(!o){for(l=s.child;l;){if(l===n){o=!0,n=s,r=i;break}if(l===r){o=!0,r=s,n=i;break}l=l.sibling}if(!o)throw Error(U(189))}}if(n.alternate!==r)throw Error(U(190))}if(n.tag!==3)throw Error(U(188));return n.stateNode.current===n?t:e}function Wv(t){return t=uS(t),t!==null?Gv(t):null}function Gv(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=Gv(t);if(e!==null)return e;t=t.sibling}return null}var Kv=Ot.unstable_scheduleCallback,gg=Ot.unstable_cancelCallback,cS=Ot.unstable_shouldYield,hS=Ot.unstable_requestPaint,Ne=Ot.unstable_now,dS=Ot.unstable_getCurrentPriorityLevel,uf=Ot.unstable_ImmediatePriority,Qv=Ot.unstable_UserBlockingPriority,Ol=Ot.unstable_NormalPriority,fS=Ot.unstable_LowPriority,Xv=Ot.unstable_IdlePriority,Nu=null,pn=null;function pS(t){if(pn&&typeof pn.onCommitFiberRoot=="function")try{pn.onCommitFiberRoot(Nu,t,void 0,(t.current.flags&128)===128)}catch{}}var tn=Math.clz32?Math.clz32:yS,mS=Math.log,gS=Math.LN2;function yS(t){return t>>>=0,t===0?32:31-(mS(t)/gS|0)|0}var za=64,$a=4194304;function fo(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Ll(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,i=t.suspendedLanes,s=t.pingedLanes,o=n&268435455;if(o!==0){var l=o&~i;l!==0?r=fo(l):(s&=o,s!==0&&(r=fo(s)))}else o=n&~i,o!==0?r=fo(o):s!==0&&(r=fo(s));if(r===0)return 0;if(e!==0&&e!==r&&!(e&i)&&(i=r&-r,s=e&-e,i>=s||i===16&&(s&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-tn(e),i=1<<n,r|=t[n],e&=~i;return r}function _S(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function vS(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,i=t.expirationTimes,s=t.pendingLanes;0<s;){var o=31-tn(s),l=1<<o,u=i[o];u===-1?(!(l&n)||l&r)&&(i[o]=_S(l,e)):u<=e&&(t.expiredLanes|=l),s&=~l}}function Qh(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Yv(){var t=za;return za<<=1,!(za&4194240)&&(za=64),t}function Kc(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function ua(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-tn(e),t[e]=n}function wS(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var i=31-tn(n),s=1<<i;e[i]=0,r[i]=-1,t[i]=-1,n&=~s}}function cf(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-tn(n),i=1<<r;i&e|t[r]&e&&(t[r]|=e),n&=~i}}var le=0;function Jv(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var Zv,hf,ew,tw,nw,Xh=!1,qa=[],dr=null,fr=null,pr=null,Uo=new Map,Fo=new Map,rr=[],ES="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function yg(t,e){switch(t){case"focusin":case"focusout":dr=null;break;case"dragenter":case"dragleave":fr=null;break;case"mouseover":case"mouseout":pr=null;break;case"pointerover":case"pointerout":Uo.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Fo.delete(e.pointerId)}}function eo(t,e,n,r,i,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:s,targetContainers:[i]},e!==null&&(e=ha(e),e!==null&&hf(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,i!==null&&e.indexOf(i)===-1&&e.push(i),t)}function TS(t,e,n,r,i){switch(e){case"focusin":return dr=eo(dr,t,e,n,r,i),!0;case"dragenter":return fr=eo(fr,t,e,n,r,i),!0;case"mouseover":return pr=eo(pr,t,e,n,r,i),!0;case"pointerover":var s=i.pointerId;return Uo.set(s,eo(Uo.get(s)||null,t,e,n,r,i)),!0;case"gotpointercapture":return s=i.pointerId,Fo.set(s,eo(Fo.get(s)||null,t,e,n,r,i)),!0}return!1}function rw(t){var e=Jr(t.target);if(e!==null){var n=wi(e);if(n!==null){if(e=n.tag,e===13){if(e=Hv(n),e!==null){t.blockedOn=e,nw(t.priority,function(){ew(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function hl(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Yh(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);Hh=r,n.target.dispatchEvent(r),Hh=null}else return e=ha(n),e!==null&&hf(e),t.blockedOn=n,!1;e.shift()}return!0}function _g(t,e,n){hl(t)&&n.delete(e)}function IS(){Xh=!1,dr!==null&&hl(dr)&&(dr=null),fr!==null&&hl(fr)&&(fr=null),pr!==null&&hl(pr)&&(pr=null),Uo.forEach(_g),Fo.forEach(_g)}function to(t,e){t.blockedOn===e&&(t.blockedOn=null,Xh||(Xh=!0,Ot.unstable_scheduleCallback(Ot.unstable_NormalPriority,IS)))}function jo(t){function e(i){return to(i,t)}if(0<qa.length){to(qa[0],t);for(var n=1;n<qa.length;n++){var r=qa[n];r.blockedOn===t&&(r.blockedOn=null)}}for(dr!==null&&to(dr,t),fr!==null&&to(fr,t),pr!==null&&to(pr,t),Uo.forEach(e),Fo.forEach(e),n=0;n<rr.length;n++)r=rr[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<rr.length&&(n=rr[0],n.blockedOn===null);)rw(n),n.blockedOn===null&&rr.shift()}var Ji=zn.ReactCurrentBatchConfig,Ml=!0;function AS(t,e,n,r){var i=le,s=Ji.transition;Ji.transition=null;try{le=1,df(t,e,n,r)}finally{le=i,Ji.transition=s}}function SS(t,e,n,r){var i=le,s=Ji.transition;Ji.transition=null;try{le=4,df(t,e,n,r)}finally{le=i,Ji.transition=s}}function df(t,e,n,r){if(Ml){var i=Yh(t,e,n,r);if(i===null)ih(t,e,r,Ul,n),yg(t,r);else if(TS(i,t,e,n,r))r.stopPropagation();else if(yg(t,r),e&4&&-1<ES.indexOf(t)){for(;i!==null;){var s=ha(i);if(s!==null&&Zv(s),s=Yh(t,e,n,r),s===null&&ih(t,e,r,Ul,n),s===i)break;i=s}i!==null&&r.stopPropagation()}else ih(t,e,r,null,n)}}var Ul=null;function Yh(t,e,n,r){if(Ul=null,t=lf(r),t=Jr(t),t!==null)if(e=wi(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Hv(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return Ul=t,null}function iw(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(dS()){case uf:return 1;case Qv:return 4;case Ol:case fS:return 16;case Xv:return 536870912;default:return 16}default:return 16}}var cr=null,ff=null,dl=null;function sw(){if(dl)return dl;var t,e=ff,n=e.length,r,i="value"in cr?cr.value:cr.textContent,s=i.length;for(t=0;t<n&&e[t]===i[t];t++);var o=n-t;for(r=1;r<=o&&e[n-r]===i[s-r];r++);return dl=i.slice(t,1<r?1-r:void 0)}function fl(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Ha(){return!0}function vg(){return!1}function Ut(t){function e(n,r,i,s,o){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=s,this.target=o,this.currentTarget=null;for(var l in t)t.hasOwnProperty(l)&&(n=t[l],this[l]=n?n(s):s[l]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Ha:vg,this.isPropagationStopped=vg,this}return Ie(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ha)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ha)},persist:function(){},isPersistent:Ha}),e}var Ss={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},pf=Ut(Ss),ca=Ie({},Ss,{view:0,detail:0}),kS=Ut(ca),Qc,Xc,no,xu=Ie({},ca,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:mf,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==no&&(no&&t.type==="mousemove"?(Qc=t.screenX-no.screenX,Xc=t.screenY-no.screenY):Xc=Qc=0,no=t),Qc)},movementY:function(t){return"movementY"in t?t.movementY:Xc}}),wg=Ut(xu),RS=Ie({},xu,{dataTransfer:0}),CS=Ut(RS),PS=Ie({},ca,{relatedTarget:0}),Yc=Ut(PS),NS=Ie({},Ss,{animationName:0,elapsedTime:0,pseudoElement:0}),xS=Ut(NS),DS=Ie({},Ss,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),bS=Ut(DS),VS=Ie({},Ss,{data:0}),Eg=Ut(VS),OS={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},LS={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},MS={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function US(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=MS[t])?!!e[t]:!1}function mf(){return US}var FS=Ie({},ca,{key:function(t){if(t.key){var e=OS[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=fl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?LS[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:mf,charCode:function(t){return t.type==="keypress"?fl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?fl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),jS=Ut(FS),BS=Ie({},xu,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Tg=Ut(BS),zS=Ie({},ca,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:mf}),$S=Ut(zS),qS=Ie({},Ss,{propertyName:0,elapsedTime:0,pseudoElement:0}),HS=Ut(qS),WS=Ie({},xu,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),GS=Ut(WS),KS=[9,13,27,32],gf=bn&&"CompositionEvent"in window,Eo=null;bn&&"documentMode"in document&&(Eo=document.documentMode);var QS=bn&&"TextEvent"in window&&!Eo,ow=bn&&(!gf||Eo&&8<Eo&&11>=Eo),Ig=" ",Ag=!1;function aw(t,e){switch(t){case"keyup":return KS.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function lw(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Mi=!1;function XS(t,e){switch(t){case"compositionend":return lw(e);case"keypress":return e.which!==32?null:(Ag=!0,Ig);case"textInput":return t=e.data,t===Ig&&Ag?null:t;default:return null}}function YS(t,e){if(Mi)return t==="compositionend"||!gf&&aw(t,e)?(t=sw(),dl=ff=cr=null,Mi=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return ow&&e.locale!=="ko"?null:e.data;default:return null}}var JS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Sg(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!JS[t.type]:e==="textarea"}function uw(t,e,n,r){jv(r),e=Fl(e,"onChange"),0<e.length&&(n=new pf("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var To=null,Bo=null;function ZS(t){ww(t,0)}function Du(t){var e=ji(t);if(bv(e))return t}function ek(t,e){if(t==="change")return e}var cw=!1;if(bn){var Jc;if(bn){var Zc="oninput"in document;if(!Zc){var kg=document.createElement("div");kg.setAttribute("oninput","return;"),Zc=typeof kg.oninput=="function"}Jc=Zc}else Jc=!1;cw=Jc&&(!document.documentMode||9<document.documentMode)}function Rg(){To&&(To.detachEvent("onpropertychange",hw),Bo=To=null)}function hw(t){if(t.propertyName==="value"&&Du(Bo)){var e=[];uw(e,Bo,t,lf(t)),qv(ZS,e)}}function tk(t,e,n){t==="focusin"?(Rg(),To=e,Bo=n,To.attachEvent("onpropertychange",hw)):t==="focusout"&&Rg()}function nk(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Du(Bo)}function rk(t,e){if(t==="click")return Du(e)}function ik(t,e){if(t==="input"||t==="change")return Du(e)}function sk(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var sn=typeof Object.is=="function"?Object.is:sk;function zo(t,e){if(sn(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!bh.call(e,i)||!sn(t[i],e[i]))return!1}return!0}function Cg(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Pg(t,e){var n=Cg(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Cg(n)}}function dw(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?dw(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function fw(){for(var t=window,e=Dl();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Dl(t.document)}return e}function yf(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function ok(t){var e=fw(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&dw(n.ownerDocument.documentElement,n)){if(r!==null&&yf(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var i=n.textContent.length,s=Math.min(r.start,i);r=r.end===void 0?s:Math.min(r.end,i),!t.extend&&s>r&&(i=r,r=s,s=i),i=Pg(n,s);var o=Pg(n,r);i&&o&&(t.rangeCount!==1||t.anchorNode!==i.node||t.anchorOffset!==i.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(i.node,i.offset),t.removeAllRanges(),s>r?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var ak=bn&&"documentMode"in document&&11>=document.documentMode,Ui=null,Jh=null,Io=null,Zh=!1;function Ng(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Zh||Ui==null||Ui!==Dl(r)||(r=Ui,"selectionStart"in r&&yf(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Io&&zo(Io,r)||(Io=r,r=Fl(Jh,"onSelect"),0<r.length&&(e=new pf("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=Ui)))}function Wa(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Fi={animationend:Wa("Animation","AnimationEnd"),animationiteration:Wa("Animation","AnimationIteration"),animationstart:Wa("Animation","AnimationStart"),transitionend:Wa("Transition","TransitionEnd")},eh={},pw={};bn&&(pw=document.createElement("div").style,"AnimationEvent"in window||(delete Fi.animationend.animation,delete Fi.animationiteration.animation,delete Fi.animationstart.animation),"TransitionEvent"in window||delete Fi.transitionend.transition);function bu(t){if(eh[t])return eh[t];if(!Fi[t])return t;var e=Fi[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in pw)return eh[t]=e[n];return t}var mw=bu("animationend"),gw=bu("animationiteration"),yw=bu("animationstart"),_w=bu("transitionend"),vw=new Map,xg="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Mr(t,e){vw.set(t,e),vi(e,[t])}for(var th=0;th<xg.length;th++){var nh=xg[th],lk=nh.toLowerCase(),uk=nh[0].toUpperCase()+nh.slice(1);Mr(lk,"on"+uk)}Mr(mw,"onAnimationEnd");Mr(gw,"onAnimationIteration");Mr(yw,"onAnimationStart");Mr("dblclick","onDoubleClick");Mr("focusin","onFocus");Mr("focusout","onBlur");Mr(_w,"onTransitionEnd");as("onMouseEnter",["mouseout","mouseover"]);as("onMouseLeave",["mouseout","mouseover"]);as("onPointerEnter",["pointerout","pointerover"]);as("onPointerLeave",["pointerout","pointerover"]);vi("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));vi("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));vi("onBeforeInput",["compositionend","keypress","textInput","paste"]);vi("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));vi("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));vi("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var po="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),ck=new Set("cancel close invalid load scroll toggle".split(" ").concat(po));function Dg(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,lS(r,e,void 0,t),t.currentTarget=null}function ww(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],i=r.event;r=r.listeners;e:{var s=void 0;if(e)for(var o=r.length-1;0<=o;o--){var l=r[o],u=l.instance,c=l.currentTarget;if(l=l.listener,u!==s&&i.isPropagationStopped())break e;Dg(i,l,c),s=u}else for(o=0;o<r.length;o++){if(l=r[o],u=l.instance,c=l.currentTarget,l=l.listener,u!==s&&i.isPropagationStopped())break e;Dg(i,l,c),s=u}}}if(Vl)throw t=Kh,Vl=!1,Kh=null,t}function pe(t,e){var n=e[id];n===void 0&&(n=e[id]=new Set);var r=t+"__bubble";n.has(r)||(Ew(e,t,2,!1),n.add(r))}function rh(t,e,n){var r=0;e&&(r|=4),Ew(n,t,r,e)}var Ga="_reactListening"+Math.random().toString(36).slice(2);function $o(t){if(!t[Ga]){t[Ga]=!0,Cv.forEach(function(n){n!=="selectionchange"&&(ck.has(n)||rh(n,!1,t),rh(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Ga]||(e[Ga]=!0,rh("selectionchange",!1,e))}}function Ew(t,e,n,r){switch(iw(e)){case 1:var i=AS;break;case 4:i=SS;break;default:i=df}n=i.bind(null,e,n,t),i=void 0,!Gh||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(i=!0),r?i!==void 0?t.addEventListener(e,n,{capture:!0,passive:i}):t.addEventListener(e,n,!0):i!==void 0?t.addEventListener(e,n,{passive:i}):t.addEventListener(e,n,!1)}function ih(t,e,n,r,i){var s=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var l=r.stateNode.containerInfo;if(l===i||l.nodeType===8&&l.parentNode===i)break;if(o===4)for(o=r.return;o!==null;){var u=o.tag;if((u===3||u===4)&&(u=o.stateNode.containerInfo,u===i||u.nodeType===8&&u.parentNode===i))return;o=o.return}for(;l!==null;){if(o=Jr(l),o===null)return;if(u=o.tag,u===5||u===6){r=s=o;continue e}l=l.parentNode}}r=r.return}qv(function(){var c=s,f=lf(n),p=[];e:{var m=vw.get(t);if(m!==void 0){var I=pf,R=t;switch(t){case"keypress":if(fl(n)===0)break e;case"keydown":case"keyup":I=jS;break;case"focusin":R="focus",I=Yc;break;case"focusout":R="blur",I=Yc;break;case"beforeblur":case"afterblur":I=Yc;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":I=wg;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":I=CS;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":I=$S;break;case mw:case gw:case yw:I=xS;break;case _w:I=HS;break;case"scroll":I=kS;break;case"wheel":I=GS;break;case"copy":case"cut":case"paste":I=bS;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":I=Tg}var P=(e&4)!==0,O=!P&&t==="scroll",A=P?m!==null?m+"Capture":null:m;P=[];for(var w=c,k;w!==null;){k=w;var b=k.stateNode;if(k.tag===5&&b!==null&&(k=b,A!==null&&(b=Mo(w,A),b!=null&&P.push(qo(w,b,k)))),O)break;w=w.return}0<P.length&&(m=new I(m,R,null,n,f),p.push({event:m,listeners:P}))}}if(!(e&7)){e:{if(m=t==="mouseover"||t==="pointerover",I=t==="mouseout"||t==="pointerout",m&&n!==Hh&&(R=n.relatedTarget||n.fromElement)&&(Jr(R)||R[Vn]))break e;if((I||m)&&(m=f.window===f?f:(m=f.ownerDocument)?m.defaultView||m.parentWindow:window,I?(R=n.relatedTarget||n.toElement,I=c,R=R?Jr(R):null,R!==null&&(O=wi(R),R!==O||R.tag!==5&&R.tag!==6)&&(R=null)):(I=null,R=c),I!==R)){if(P=wg,b="onMouseLeave",A="onMouseEnter",w="mouse",(t==="pointerout"||t==="pointerover")&&(P=Tg,b="onPointerLeave",A="onPointerEnter",w="pointer"),O=I==null?m:ji(I),k=R==null?m:ji(R),m=new P(b,w+"leave",I,n,f),m.target=O,m.relatedTarget=k,b=null,Jr(f)===c&&(P=new P(A,w+"enter",R,n,f),P.target=k,P.relatedTarget=O,b=P),O=b,I&&R)t:{for(P=I,A=R,w=0,k=P;k;k=Ni(k))w++;for(k=0,b=A;b;b=Ni(b))k++;for(;0<w-k;)P=Ni(P),w--;for(;0<k-w;)A=Ni(A),k--;for(;w--;){if(P===A||A!==null&&P===A.alternate)break t;P=Ni(P),A=Ni(A)}P=null}else P=null;I!==null&&bg(p,m,I,P,!1),R!==null&&O!==null&&bg(p,O,R,P,!0)}}e:{if(m=c?ji(c):window,I=m.nodeName&&m.nodeName.toLowerCase(),I==="select"||I==="input"&&m.type==="file")var F=ek;else if(Sg(m))if(cw)F=ik;else{F=nk;var M=tk}else(I=m.nodeName)&&I.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(F=rk);if(F&&(F=F(t,c))){uw(p,F,n,f);break e}M&&M(t,m,c),t==="focusout"&&(M=m._wrapperState)&&M.controlled&&m.type==="number"&&jh(m,"number",m.value)}switch(M=c?ji(c):window,t){case"focusin":(Sg(M)||M.contentEditable==="true")&&(Ui=M,Jh=c,Io=null);break;case"focusout":Io=Jh=Ui=null;break;case"mousedown":Zh=!0;break;case"contextmenu":case"mouseup":case"dragend":Zh=!1,Ng(p,n,f);break;case"selectionchange":if(ak)break;case"keydown":case"keyup":Ng(p,n,f)}var v;if(gf)e:{switch(t){case"compositionstart":var y="onCompositionStart";break e;case"compositionend":y="onCompositionEnd";break e;case"compositionupdate":y="onCompositionUpdate";break e}y=void 0}else Mi?aw(t,n)&&(y="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(y="onCompositionStart");y&&(ow&&n.locale!=="ko"&&(Mi||y!=="onCompositionStart"?y==="onCompositionEnd"&&Mi&&(v=sw()):(cr=f,ff="value"in cr?cr.value:cr.textContent,Mi=!0)),M=Fl(c,y),0<M.length&&(y=new Eg(y,t,null,n,f),p.push({event:y,listeners:M}),v?y.data=v:(v=lw(n),v!==null&&(y.data=v)))),(v=QS?XS(t,n):YS(t,n))&&(c=Fl(c,"onBeforeInput"),0<c.length&&(f=new Eg("onBeforeInput","beforeinput",null,n,f),p.push({event:f,listeners:c}),f.data=v))}ww(p,e)})}function qo(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Fl(t,e){for(var n=e+"Capture",r=[];t!==null;){var i=t,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=Mo(t,n),s!=null&&r.unshift(qo(t,s,i)),s=Mo(t,e),s!=null&&r.push(qo(t,s,i))),t=t.return}return r}function Ni(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function bg(t,e,n,r,i){for(var s=e._reactName,o=[];n!==null&&n!==r;){var l=n,u=l.alternate,c=l.stateNode;if(u!==null&&u===r)break;l.tag===5&&c!==null&&(l=c,i?(u=Mo(n,s),u!=null&&o.unshift(qo(n,u,l))):i||(u=Mo(n,s),u!=null&&o.push(qo(n,u,l)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var hk=/\r\n?/g,dk=/\u0000|\uFFFD/g;function Vg(t){return(typeof t=="string"?t:""+t).replace(hk,`
`).replace(dk,"")}function Ka(t,e,n){if(e=Vg(e),Vg(t)!==e&&n)throw Error(U(425))}function jl(){}var ed=null,td=null;function nd(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var rd=typeof setTimeout=="function"?setTimeout:void 0,fk=typeof clearTimeout=="function"?clearTimeout:void 0,Og=typeof Promise=="function"?Promise:void 0,pk=typeof queueMicrotask=="function"?queueMicrotask:typeof Og<"u"?function(t){return Og.resolve(null).then(t).catch(mk)}:rd;function mk(t){setTimeout(function(){throw t})}function sh(t,e){var n=e,r=0;do{var i=n.nextSibling;if(t.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){t.removeChild(i),jo(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);jo(e)}function mr(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function Lg(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var ks=Math.random().toString(36).slice(2),dn="__reactFiber$"+ks,Ho="__reactProps$"+ks,Vn="__reactContainer$"+ks,id="__reactEvents$"+ks,gk="__reactListeners$"+ks,yk="__reactHandles$"+ks;function Jr(t){var e=t[dn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Vn]||n[dn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=Lg(t);t!==null;){if(n=t[dn])return n;t=Lg(t)}return e}t=n,n=t.parentNode}return null}function ha(t){return t=t[dn]||t[Vn],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function ji(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(U(33))}function Vu(t){return t[Ho]||null}var sd=[],Bi=-1;function Ur(t){return{current:t}}function ge(t){0>Bi||(t.current=sd[Bi],sd[Bi]=null,Bi--)}function de(t,e){Bi++,sd[Bi]=t.current,t.current=e}var Rr={},st=Ur(Rr),Et=Ur(!1),ai=Rr;function ls(t,e){var n=t.type.contextTypes;if(!n)return Rr;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in n)i[s]=e[s];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=i),i}function Tt(t){return t=t.childContextTypes,t!=null}function Bl(){ge(Et),ge(st)}function Mg(t,e,n){if(st.current!==Rr)throw Error(U(168));de(st,e),de(Et,n)}function Tw(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in e))throw Error(U(108,tS(t)||"Unknown",i));return Ie({},n,r)}function zl(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Rr,ai=st.current,de(st,t),de(Et,Et.current),!0}function Ug(t,e,n){var r=t.stateNode;if(!r)throw Error(U(169));n?(t=Tw(t,e,ai),r.__reactInternalMemoizedMergedChildContext=t,ge(Et),ge(st),de(st,t)):ge(Et),de(Et,n)}var kn=null,Ou=!1,oh=!1;function Iw(t){kn===null?kn=[t]:kn.push(t)}function _k(t){Ou=!0,Iw(t)}function Fr(){if(!oh&&kn!==null){oh=!0;var t=0,e=le;try{var n=kn;for(le=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}kn=null,Ou=!1}catch(i){throw kn!==null&&(kn=kn.slice(t+1)),Kv(uf,Fr),i}finally{le=e,oh=!1}}return null}var zi=[],$i=0,$l=null,ql=0,Bt=[],zt=0,li=null,Rn=1,Cn="";function Qr(t,e){zi[$i++]=ql,zi[$i++]=$l,$l=t,ql=e}function Aw(t,e,n){Bt[zt++]=Rn,Bt[zt++]=Cn,Bt[zt++]=li,li=t;var r=Rn;t=Cn;var i=32-tn(r)-1;r&=~(1<<i),n+=1;var s=32-tn(e)+i;if(30<s){var o=i-i%5;s=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Rn=1<<32-tn(e)+i|n<<i|r,Cn=s+t}else Rn=1<<s|n<<i|r,Cn=t}function _f(t){t.return!==null&&(Qr(t,1),Aw(t,1,0))}function vf(t){for(;t===$l;)$l=zi[--$i],zi[$i]=null,ql=zi[--$i],zi[$i]=null;for(;t===li;)li=Bt[--zt],Bt[zt]=null,Cn=Bt[--zt],Bt[zt]=null,Rn=Bt[--zt],Bt[zt]=null}var xt=null,Ct=null,_e=!1,Zt=null;function Sw(t,e){var n=$t(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function Fg(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,xt=t,Ct=mr(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,xt=t,Ct=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=li!==null?{id:Rn,overflow:Cn}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=$t(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,xt=t,Ct=null,!0):!1;default:return!1}}function od(t){return(t.mode&1)!==0&&(t.flags&128)===0}function ad(t){if(_e){var e=Ct;if(e){var n=e;if(!Fg(t,e)){if(od(t))throw Error(U(418));e=mr(n.nextSibling);var r=xt;e&&Fg(t,e)?Sw(r,n):(t.flags=t.flags&-4097|2,_e=!1,xt=t)}}else{if(od(t))throw Error(U(418));t.flags=t.flags&-4097|2,_e=!1,xt=t}}}function jg(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;xt=t}function Qa(t){if(t!==xt)return!1;if(!_e)return jg(t),_e=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!nd(t.type,t.memoizedProps)),e&&(e=Ct)){if(od(t))throw kw(),Error(U(418));for(;e;)Sw(t,e),e=mr(e.nextSibling)}if(jg(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(U(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){Ct=mr(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}Ct=null}}else Ct=xt?mr(t.stateNode.nextSibling):null;return!0}function kw(){for(var t=Ct;t;)t=mr(t.nextSibling)}function us(){Ct=xt=null,_e=!1}function wf(t){Zt===null?Zt=[t]:Zt.push(t)}var vk=zn.ReactCurrentBatchConfig;function ro(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(U(309));var r=n.stateNode}if(!r)throw Error(U(147,t));var i=r,s=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===s?e.ref:(e=function(o){var l=i.refs;o===null?delete l[s]:l[s]=o},e._stringRef=s,e)}if(typeof t!="string")throw Error(U(284));if(!n._owner)throw Error(U(290,t))}return t}function Xa(t,e){throw t=Object.prototype.toString.call(e),Error(U(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Bg(t){var e=t._init;return e(t._payload)}function Rw(t){function e(A,w){if(t){var k=A.deletions;k===null?(A.deletions=[w],A.flags|=16):k.push(w)}}function n(A,w){if(!t)return null;for(;w!==null;)e(A,w),w=w.sibling;return null}function r(A,w){for(A=new Map;w!==null;)w.key!==null?A.set(w.key,w):A.set(w.index,w),w=w.sibling;return A}function i(A,w){return A=vr(A,w),A.index=0,A.sibling=null,A}function s(A,w,k){return A.index=k,t?(k=A.alternate,k!==null?(k=k.index,k<w?(A.flags|=2,w):k):(A.flags|=2,w)):(A.flags|=1048576,w)}function o(A){return t&&A.alternate===null&&(A.flags|=2),A}function l(A,w,k,b){return w===null||w.tag!==6?(w=fh(k,A.mode,b),w.return=A,w):(w=i(w,k),w.return=A,w)}function u(A,w,k,b){var F=k.type;return F===Li?f(A,w,k.props.children,b,k.key):w!==null&&(w.elementType===F||typeof F=="object"&&F!==null&&F.$$typeof===tr&&Bg(F)===w.type)?(b=i(w,k.props),b.ref=ro(A,w,k),b.return=A,b):(b=wl(k.type,k.key,k.props,null,A.mode,b),b.ref=ro(A,w,k),b.return=A,b)}function c(A,w,k,b){return w===null||w.tag!==4||w.stateNode.containerInfo!==k.containerInfo||w.stateNode.implementation!==k.implementation?(w=ph(k,A.mode,b),w.return=A,w):(w=i(w,k.children||[]),w.return=A,w)}function f(A,w,k,b,F){return w===null||w.tag!==7?(w=ii(k,A.mode,b,F),w.return=A,w):(w=i(w,k),w.return=A,w)}function p(A,w,k){if(typeof w=="string"&&w!==""||typeof w=="number")return w=fh(""+w,A.mode,k),w.return=A,w;if(typeof w=="object"&&w!==null){switch(w.$$typeof){case Fa:return k=wl(w.type,w.key,w.props,null,A.mode,k),k.ref=ro(A,null,w),k.return=A,k;case Oi:return w=ph(w,A.mode,k),w.return=A,w;case tr:var b=w._init;return p(A,b(w._payload),k)}if(ho(w)||Js(w))return w=ii(w,A.mode,k,null),w.return=A,w;Xa(A,w)}return null}function m(A,w,k,b){var F=w!==null?w.key:null;if(typeof k=="string"&&k!==""||typeof k=="number")return F!==null?null:l(A,w,""+k,b);if(typeof k=="object"&&k!==null){switch(k.$$typeof){case Fa:return k.key===F?u(A,w,k,b):null;case Oi:return k.key===F?c(A,w,k,b):null;case tr:return F=k._init,m(A,w,F(k._payload),b)}if(ho(k)||Js(k))return F!==null?null:f(A,w,k,b,null);Xa(A,k)}return null}function I(A,w,k,b,F){if(typeof b=="string"&&b!==""||typeof b=="number")return A=A.get(k)||null,l(w,A,""+b,F);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case Fa:return A=A.get(b.key===null?k:b.key)||null,u(w,A,b,F);case Oi:return A=A.get(b.key===null?k:b.key)||null,c(w,A,b,F);case tr:var M=b._init;return I(A,w,k,M(b._payload),F)}if(ho(b)||Js(b))return A=A.get(k)||null,f(w,A,b,F,null);Xa(w,b)}return null}function R(A,w,k,b){for(var F=null,M=null,v=w,y=w=0,_=null;v!==null&&y<k.length;y++){v.index>y?(_=v,v=null):_=v.sibling;var E=m(A,v,k[y],b);if(E===null){v===null&&(v=_);break}t&&v&&E.alternate===null&&e(A,v),w=s(E,w,y),M===null?F=E:M.sibling=E,M=E,v=_}if(y===k.length)return n(A,v),_e&&Qr(A,y),F;if(v===null){for(;y<k.length;y++)v=p(A,k[y],b),v!==null&&(w=s(v,w,y),M===null?F=v:M.sibling=v,M=v);return _e&&Qr(A,y),F}for(v=r(A,v);y<k.length;y++)_=I(v,A,y,k[y],b),_!==null&&(t&&_.alternate!==null&&v.delete(_.key===null?y:_.key),w=s(_,w,y),M===null?F=_:M.sibling=_,M=_);return t&&v.forEach(function(S){return e(A,S)}),_e&&Qr(A,y),F}function P(A,w,k,b){var F=Js(k);if(typeof F!="function")throw Error(U(150));if(k=F.call(k),k==null)throw Error(U(151));for(var M=F=null,v=w,y=w=0,_=null,E=k.next();v!==null&&!E.done;y++,E=k.next()){v.index>y?(_=v,v=null):_=v.sibling;var S=m(A,v,E.value,b);if(S===null){v===null&&(v=_);break}t&&v&&S.alternate===null&&e(A,v),w=s(S,w,y),M===null?F=S:M.sibling=S,M=S,v=_}if(E.done)return n(A,v),_e&&Qr(A,y),F;if(v===null){for(;!E.done;y++,E=k.next())E=p(A,E.value,b),E!==null&&(w=s(E,w,y),M===null?F=E:M.sibling=E,M=E);return _e&&Qr(A,y),F}for(v=r(A,v);!E.done;y++,E=k.next())E=I(v,A,y,E.value,b),E!==null&&(t&&E.alternate!==null&&v.delete(E.key===null?y:E.key),w=s(E,w,y),M===null?F=E:M.sibling=E,M=E);return t&&v.forEach(function(C){return e(A,C)}),_e&&Qr(A,y),F}function O(A,w,k,b){if(typeof k=="object"&&k!==null&&k.type===Li&&k.key===null&&(k=k.props.children),typeof k=="object"&&k!==null){switch(k.$$typeof){case Fa:e:{for(var F=k.key,M=w;M!==null;){if(M.key===F){if(F=k.type,F===Li){if(M.tag===7){n(A,M.sibling),w=i(M,k.props.children),w.return=A,A=w;break e}}else if(M.elementType===F||typeof F=="object"&&F!==null&&F.$$typeof===tr&&Bg(F)===M.type){n(A,M.sibling),w=i(M,k.props),w.ref=ro(A,M,k),w.return=A,A=w;break e}n(A,M);break}else e(A,M);M=M.sibling}k.type===Li?(w=ii(k.props.children,A.mode,b,k.key),w.return=A,A=w):(b=wl(k.type,k.key,k.props,null,A.mode,b),b.ref=ro(A,w,k),b.return=A,A=b)}return o(A);case Oi:e:{for(M=k.key;w!==null;){if(w.key===M)if(w.tag===4&&w.stateNode.containerInfo===k.containerInfo&&w.stateNode.implementation===k.implementation){n(A,w.sibling),w=i(w,k.children||[]),w.return=A,A=w;break e}else{n(A,w);break}else e(A,w);w=w.sibling}w=ph(k,A.mode,b),w.return=A,A=w}return o(A);case tr:return M=k._init,O(A,w,M(k._payload),b)}if(ho(k))return R(A,w,k,b);if(Js(k))return P(A,w,k,b);Xa(A,k)}return typeof k=="string"&&k!==""||typeof k=="number"?(k=""+k,w!==null&&w.tag===6?(n(A,w.sibling),w=i(w,k),w.return=A,A=w):(n(A,w),w=fh(k,A.mode,b),w.return=A,A=w),o(A)):n(A,w)}return O}var cs=Rw(!0),Cw=Rw(!1),Hl=Ur(null),Wl=null,qi=null,Ef=null;function Tf(){Ef=qi=Wl=null}function If(t){var e=Hl.current;ge(Hl),t._currentValue=e}function ld(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function Zi(t,e){Wl=t,Ef=qi=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(vt=!0),t.firstContext=null)}function Ht(t){var e=t._currentValue;if(Ef!==t)if(t={context:t,memoizedValue:e,next:null},qi===null){if(Wl===null)throw Error(U(308));qi=t,Wl.dependencies={lanes:0,firstContext:t}}else qi=qi.next=t;return e}var Zr=null;function Af(t){Zr===null?Zr=[t]:Zr.push(t)}function Pw(t,e,n,r){var i=e.interleaved;return i===null?(n.next=n,Af(e)):(n.next=i.next,i.next=n),e.interleaved=n,On(t,r)}function On(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var nr=!1;function Sf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Nw(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Dn(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function gr(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,oe&2){var i=r.pending;return i===null?e.next=e:(e.next=i.next,i.next=e),r.pending=e,On(t,n)}return i=r.interleaved,i===null?(e.next=e,Af(r)):(e.next=i.next,i.next=e),r.interleaved=e,On(t,n)}function pl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,cf(t,n)}}function zg(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?i=s=o:s=s.next=o,n=n.next}while(n!==null);s===null?i=s=e:s=s.next=e}else i=s=e;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Gl(t,e,n,r){var i=t.updateQueue;nr=!1;var s=i.firstBaseUpdate,o=i.lastBaseUpdate,l=i.shared.pending;if(l!==null){i.shared.pending=null;var u=l,c=u.next;u.next=null,o===null?s=c:o.next=c,o=u;var f=t.alternate;f!==null&&(f=f.updateQueue,l=f.lastBaseUpdate,l!==o&&(l===null?f.firstBaseUpdate=c:l.next=c,f.lastBaseUpdate=u))}if(s!==null){var p=i.baseState;o=0,f=c=u=null,l=s;do{var m=l.lane,I=l.eventTime;if((r&m)===m){f!==null&&(f=f.next={eventTime:I,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var R=t,P=l;switch(m=e,I=n,P.tag){case 1:if(R=P.payload,typeof R=="function"){p=R.call(I,p,m);break e}p=R;break e;case 3:R.flags=R.flags&-65537|128;case 0:if(R=P.payload,m=typeof R=="function"?R.call(I,p,m):R,m==null)break e;p=Ie({},p,m);break e;case 2:nr=!0}}l.callback!==null&&l.lane!==0&&(t.flags|=64,m=i.effects,m===null?i.effects=[l]:m.push(l))}else I={eventTime:I,lane:m,tag:l.tag,payload:l.payload,callback:l.callback,next:null},f===null?(c=f=I,u=p):f=f.next=I,o|=m;if(l=l.next,l===null){if(l=i.shared.pending,l===null)break;m=l,l=m.next,m.next=null,i.lastBaseUpdate=m,i.shared.pending=null}}while(!0);if(f===null&&(u=p),i.baseState=u,i.firstBaseUpdate=c,i.lastBaseUpdate=f,e=i.shared.interleaved,e!==null){i=e;do o|=i.lane,i=i.next;while(i!==e)}else s===null&&(i.shared.lanes=0);ci|=o,t.lanes=o,t.memoizedState=p}}function $g(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(U(191,i));i.call(r)}}}var da={},mn=Ur(da),Wo=Ur(da),Go=Ur(da);function ei(t){if(t===da)throw Error(U(174));return t}function kf(t,e){switch(de(Go,e),de(Wo,t),de(mn,da),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:zh(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=zh(e,t)}ge(mn),de(mn,e)}function hs(){ge(mn),ge(Wo),ge(Go)}function xw(t){ei(Go.current);var e=ei(mn.current),n=zh(e,t.type);e!==n&&(de(Wo,t),de(mn,n))}function Rf(t){Wo.current===t&&(ge(mn),ge(Wo))}var we=Ur(0);function Kl(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var ah=[];function Cf(){for(var t=0;t<ah.length;t++)ah[t]._workInProgressVersionPrimary=null;ah.length=0}var ml=zn.ReactCurrentDispatcher,lh=zn.ReactCurrentBatchConfig,ui=0,Te=null,Le=null,Be=null,Ql=!1,Ao=!1,Ko=0,wk=0;function Ze(){throw Error(U(321))}function Pf(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!sn(t[n],e[n]))return!1;return!0}function Nf(t,e,n,r,i,s){if(ui=s,Te=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,ml.current=t===null||t.memoizedState===null?Ak:Sk,t=n(r,i),Ao){s=0;do{if(Ao=!1,Ko=0,25<=s)throw Error(U(301));s+=1,Be=Le=null,e.updateQueue=null,ml.current=kk,t=n(r,i)}while(Ao)}if(ml.current=Xl,e=Le!==null&&Le.next!==null,ui=0,Be=Le=Te=null,Ql=!1,e)throw Error(U(300));return t}function xf(){var t=Ko!==0;return Ko=0,t}function cn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Be===null?Te.memoizedState=Be=t:Be=Be.next=t,Be}function Wt(){if(Le===null){var t=Te.alternate;t=t!==null?t.memoizedState:null}else t=Le.next;var e=Be===null?Te.memoizedState:Be.next;if(e!==null)Be=e,Le=t;else{if(t===null)throw Error(U(310));Le=t,t={memoizedState:Le.memoizedState,baseState:Le.baseState,baseQueue:Le.baseQueue,queue:Le.queue,next:null},Be===null?Te.memoizedState=Be=t:Be=Be.next=t}return Be}function Qo(t,e){return typeof e=="function"?e(t):e}function uh(t){var e=Wt(),n=e.queue;if(n===null)throw Error(U(311));n.lastRenderedReducer=t;var r=Le,i=r.baseQueue,s=n.pending;if(s!==null){if(i!==null){var o=i.next;i.next=s.next,s.next=o}r.baseQueue=i=s,n.pending=null}if(i!==null){s=i.next,r=r.baseState;var l=o=null,u=null,c=s;do{var f=c.lane;if((ui&f)===f)u!==null&&(u=u.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:t(r,c.action);else{var p={lane:f,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};u===null?(l=u=p,o=r):u=u.next=p,Te.lanes|=f,ci|=f}c=c.next}while(c!==null&&c!==s);u===null?o=r:u.next=l,sn(r,e.memoizedState)||(vt=!0),e.memoizedState=r,e.baseState=o,e.baseQueue=u,n.lastRenderedState=r}if(t=n.interleaved,t!==null){i=t;do s=i.lane,Te.lanes|=s,ci|=s,i=i.next;while(i!==t)}else i===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function ch(t){var e=Wt(),n=e.queue;if(n===null)throw Error(U(311));n.lastRenderedReducer=t;var r=n.dispatch,i=n.pending,s=e.memoizedState;if(i!==null){n.pending=null;var o=i=i.next;do s=t(s,o.action),o=o.next;while(o!==i);sn(s,e.memoizedState)||(vt=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,r]}function Dw(){}function bw(t,e){var n=Te,r=Wt(),i=e(),s=!sn(r.memoizedState,i);if(s&&(r.memoizedState=i,vt=!0),r=r.queue,Df(Lw.bind(null,n,r,t),[t]),r.getSnapshot!==e||s||Be!==null&&Be.memoizedState.tag&1){if(n.flags|=2048,Xo(9,Ow.bind(null,n,r,i,e),void 0,null),$e===null)throw Error(U(349));ui&30||Vw(n,e,i)}return i}function Vw(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Te.updateQueue,e===null?(e={lastEffect:null,stores:null},Te.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function Ow(t,e,n,r){e.value=n,e.getSnapshot=r,Mw(e)&&Uw(t)}function Lw(t,e,n){return n(function(){Mw(e)&&Uw(t)})}function Mw(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!sn(t,n)}catch{return!0}}function Uw(t){var e=On(t,1);e!==null&&nn(e,t,1,-1)}function qg(t){var e=cn();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Qo,lastRenderedState:t},e.queue=t,t=t.dispatch=Ik.bind(null,Te,t),[e.memoizedState,t]}function Xo(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=Te.updateQueue,e===null?(e={lastEffect:null,stores:null},Te.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function Fw(){return Wt().memoizedState}function gl(t,e,n,r){var i=cn();Te.flags|=t,i.memoizedState=Xo(1|e,n,void 0,r===void 0?null:r)}function Lu(t,e,n,r){var i=Wt();r=r===void 0?null:r;var s=void 0;if(Le!==null){var o=Le.memoizedState;if(s=o.destroy,r!==null&&Pf(r,o.deps)){i.memoizedState=Xo(e,n,s,r);return}}Te.flags|=t,i.memoizedState=Xo(1|e,n,s,r)}function Hg(t,e){return gl(8390656,8,t,e)}function Df(t,e){return Lu(2048,8,t,e)}function jw(t,e){return Lu(4,2,t,e)}function Bw(t,e){return Lu(4,4,t,e)}function zw(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function $w(t,e,n){return n=n!=null?n.concat([t]):null,Lu(4,4,zw.bind(null,e,t),n)}function bf(){}function qw(t,e){var n=Wt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&Pf(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function Hw(t,e){var n=Wt();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&Pf(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function Ww(t,e,n){return ui&21?(sn(n,e)||(n=Yv(),Te.lanes|=n,ci|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,vt=!0),t.memoizedState=n)}function Ek(t,e){var n=le;le=n!==0&&4>n?n:4,t(!0);var r=lh.transition;lh.transition={};try{t(!1),e()}finally{le=n,lh.transition=r}}function Gw(){return Wt().memoizedState}function Tk(t,e,n){var r=_r(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Kw(t))Qw(e,n);else if(n=Pw(t,e,n,r),n!==null){var i=ft();nn(n,t,r,i),Xw(n,e,r)}}function Ik(t,e,n){var r=_r(t),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Kw(t))Qw(e,i);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var o=e.lastRenderedState,l=s(o,n);if(i.hasEagerState=!0,i.eagerState=l,sn(l,o)){var u=e.interleaved;u===null?(i.next=i,Af(e)):(i.next=u.next,u.next=i),e.interleaved=i;return}}catch{}finally{}n=Pw(t,e,i,r),n!==null&&(i=ft(),nn(n,t,r,i),Xw(n,e,r))}}function Kw(t){var e=t.alternate;return t===Te||e!==null&&e===Te}function Qw(t,e){Ao=Ql=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Xw(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,cf(t,n)}}var Xl={readContext:Ht,useCallback:Ze,useContext:Ze,useEffect:Ze,useImperativeHandle:Ze,useInsertionEffect:Ze,useLayoutEffect:Ze,useMemo:Ze,useReducer:Ze,useRef:Ze,useState:Ze,useDebugValue:Ze,useDeferredValue:Ze,useTransition:Ze,useMutableSource:Ze,useSyncExternalStore:Ze,useId:Ze,unstable_isNewReconciler:!1},Ak={readContext:Ht,useCallback:function(t,e){return cn().memoizedState=[t,e===void 0?null:e],t},useContext:Ht,useEffect:Hg,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,gl(4194308,4,zw.bind(null,e,t),n)},useLayoutEffect:function(t,e){return gl(4194308,4,t,e)},useInsertionEffect:function(t,e){return gl(4,2,t,e)},useMemo:function(t,e){var n=cn();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=cn();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=Tk.bind(null,Te,t),[r.memoizedState,t]},useRef:function(t){var e=cn();return t={current:t},e.memoizedState=t},useState:qg,useDebugValue:bf,useDeferredValue:function(t){return cn().memoizedState=t},useTransition:function(){var t=qg(!1),e=t[0];return t=Ek.bind(null,t[1]),cn().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=Te,i=cn();if(_e){if(n===void 0)throw Error(U(407));n=n()}else{if(n=e(),$e===null)throw Error(U(349));ui&30||Vw(r,e,n)}i.memoizedState=n;var s={value:n,getSnapshot:e};return i.queue=s,Hg(Lw.bind(null,r,s,t),[t]),r.flags|=2048,Xo(9,Ow.bind(null,r,s,n,e),void 0,null),n},useId:function(){var t=cn(),e=$e.identifierPrefix;if(_e){var n=Cn,r=Rn;n=(r&~(1<<32-tn(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=Ko++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=wk++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},Sk={readContext:Ht,useCallback:qw,useContext:Ht,useEffect:Df,useImperativeHandle:$w,useInsertionEffect:jw,useLayoutEffect:Bw,useMemo:Hw,useReducer:uh,useRef:Fw,useState:function(){return uh(Qo)},useDebugValue:bf,useDeferredValue:function(t){var e=Wt();return Ww(e,Le.memoizedState,t)},useTransition:function(){var t=uh(Qo)[0],e=Wt().memoizedState;return[t,e]},useMutableSource:Dw,useSyncExternalStore:bw,useId:Gw,unstable_isNewReconciler:!1},kk={readContext:Ht,useCallback:qw,useContext:Ht,useEffect:Df,useImperativeHandle:$w,useInsertionEffect:jw,useLayoutEffect:Bw,useMemo:Hw,useReducer:ch,useRef:Fw,useState:function(){return ch(Qo)},useDebugValue:bf,useDeferredValue:function(t){var e=Wt();return Le===null?e.memoizedState=t:Ww(e,Le.memoizedState,t)},useTransition:function(){var t=ch(Qo)[0],e=Wt().memoizedState;return[t,e]},useMutableSource:Dw,useSyncExternalStore:bw,useId:Gw,unstable_isNewReconciler:!1};function Yt(t,e){if(t&&t.defaultProps){e=Ie({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function ud(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:Ie({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Mu={isMounted:function(t){return(t=t._reactInternals)?wi(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=ft(),i=_r(t),s=Dn(r,i);s.payload=e,n!=null&&(s.callback=n),e=gr(t,s,i),e!==null&&(nn(e,t,i,r),pl(e,t,i))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=ft(),i=_r(t),s=Dn(r,i);s.tag=1,s.payload=e,n!=null&&(s.callback=n),e=gr(t,s,i),e!==null&&(nn(e,t,i,r),pl(e,t,i))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=ft(),r=_r(t),i=Dn(n,r);i.tag=2,e!=null&&(i.callback=e),e=gr(t,i,r),e!==null&&(nn(e,t,r,n),pl(e,t,r))}};function Wg(t,e,n,r,i,s,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,s,o):e.prototype&&e.prototype.isPureReactComponent?!zo(n,r)||!zo(i,s):!0}function Yw(t,e,n){var r=!1,i=Rr,s=e.contextType;return typeof s=="object"&&s!==null?s=Ht(s):(i=Tt(e)?ai:st.current,r=e.contextTypes,s=(r=r!=null)?ls(t,i):Rr),e=new e(n,s),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=Mu,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=i,t.__reactInternalMemoizedMaskedChildContext=s),e}function Gg(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&Mu.enqueueReplaceState(e,e.state,null)}function cd(t,e,n,r){var i=t.stateNode;i.props=n,i.state=t.memoizedState,i.refs={},Sf(t);var s=e.contextType;typeof s=="object"&&s!==null?i.context=Ht(s):(s=Tt(e)?ai:st.current,i.context=ls(t,s)),i.state=t.memoizedState,s=e.getDerivedStateFromProps,typeof s=="function"&&(ud(t,e,s,n),i.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(e=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),e!==i.state&&Mu.enqueueReplaceState(i,i.state,null),Gl(t,n,i,r),i.state=t.memoizedState),typeof i.componentDidMount=="function"&&(t.flags|=4194308)}function ds(t,e){try{var n="",r=e;do n+=eS(r),r=r.return;while(r);var i=n}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:t,source:e,stack:i,digest:null}}function hh(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function hd(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var Rk=typeof WeakMap=="function"?WeakMap:Map;function Jw(t,e,n){n=Dn(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){Jl||(Jl=!0,Ed=r),hd(t,e)},n}function Zw(t,e,n){n=Dn(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var i=e.value;n.payload=function(){return r(i)},n.callback=function(){hd(t,e)}}var s=t.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){hd(t,e),typeof r!="function"&&(yr===null?yr=new Set([this]):yr.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function Kg(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new Rk;var i=new Set;r.set(e,i)}else i=r.get(e),i===void 0&&(i=new Set,r.set(e,i));i.has(n)||(i.add(n),t=Bk.bind(null,t,e,n),e.then(t,t))}function Qg(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Xg(t,e,n,r,i){return t.mode&1?(t.flags|=65536,t.lanes=i,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Dn(-1,1),e.tag=2,gr(n,e,1))),n.lanes|=1),t)}var Ck=zn.ReactCurrentOwner,vt=!1;function ct(t,e,n,r){e.child=t===null?Cw(e,null,n,r):cs(e,t.child,n,r)}function Yg(t,e,n,r,i){n=n.render;var s=e.ref;return Zi(e,i),r=Nf(t,e,n,r,s,i),n=xf(),t!==null&&!vt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,Ln(t,e,i)):(_e&&n&&_f(e),e.flags|=1,ct(t,e,r,i),e.child)}function Jg(t,e,n,r,i){if(t===null){var s=n.type;return typeof s=="function"&&!Bf(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=s,eE(t,e,s,r,i)):(t=wl(n.type,null,r,e,e.mode,i),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!(t.lanes&i)){var o=s.memoizedProps;if(n=n.compare,n=n!==null?n:zo,n(o,r)&&t.ref===e.ref)return Ln(t,e,i)}return e.flags|=1,t=vr(s,r),t.ref=e.ref,t.return=e,e.child=t}function eE(t,e,n,r,i){if(t!==null){var s=t.memoizedProps;if(zo(s,r)&&t.ref===e.ref)if(vt=!1,e.pendingProps=r=s,(t.lanes&i)!==0)t.flags&131072&&(vt=!0);else return e.lanes=t.lanes,Ln(t,e,i)}return dd(t,e,n,r,i)}function tE(t,e,n){var r=e.pendingProps,i=r.children,s=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},de(Wi,St),St|=n;else{if(!(n&1073741824))return t=s!==null?s.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,de(Wi,St),St|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=s!==null?s.baseLanes:n,de(Wi,St),St|=r}else s!==null?(r=s.baseLanes|n,e.memoizedState=null):r=n,de(Wi,St),St|=r;return ct(t,e,i,n),e.child}function nE(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function dd(t,e,n,r,i){var s=Tt(n)?ai:st.current;return s=ls(e,s),Zi(e,i),n=Nf(t,e,n,r,s,i),r=xf(),t!==null&&!vt?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~i,Ln(t,e,i)):(_e&&r&&_f(e),e.flags|=1,ct(t,e,n,i),e.child)}function Zg(t,e,n,r,i){if(Tt(n)){var s=!0;zl(e)}else s=!1;if(Zi(e,i),e.stateNode===null)yl(t,e),Yw(e,n,r),cd(e,n,r,i),r=!0;else if(t===null){var o=e.stateNode,l=e.memoizedProps;o.props=l;var u=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=Ht(c):(c=Tt(n)?ai:st.current,c=ls(e,c));var f=n.getDerivedStateFromProps,p=typeof f=="function"||typeof o.getSnapshotBeforeUpdate=="function";p||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==r||u!==c)&&Gg(e,o,r,c),nr=!1;var m=e.memoizedState;o.state=m,Gl(e,r,o,i),u=e.memoizedState,l!==r||m!==u||Et.current||nr?(typeof f=="function"&&(ud(e,n,f,r),u=e.memoizedState),(l=nr||Wg(e,n,l,r,m,u,c))?(p||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=u),o.props=r,o.state=u,o.context=c,r=l):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{o=e.stateNode,Nw(t,e),l=e.memoizedProps,c=e.type===e.elementType?l:Yt(e.type,l),o.props=c,p=e.pendingProps,m=o.context,u=n.contextType,typeof u=="object"&&u!==null?u=Ht(u):(u=Tt(n)?ai:st.current,u=ls(e,u));var I=n.getDerivedStateFromProps;(f=typeof I=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==p||m!==u)&&Gg(e,o,r,u),nr=!1,m=e.memoizedState,o.state=m,Gl(e,r,o,i);var R=e.memoizedState;l!==p||m!==R||Et.current||nr?(typeof I=="function"&&(ud(e,n,I,r),R=e.memoizedState),(c=nr||Wg(e,n,c,r,m,R,u)||!1)?(f||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,R,u),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,R,u)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&m===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&m===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=R),o.props=r,o.state=R,o.context=u,r=c):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&m===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&m===t.memoizedState||(e.flags|=1024),r=!1)}return fd(t,e,n,r,s,i)}function fd(t,e,n,r,i,s){nE(t,e);var o=(e.flags&128)!==0;if(!r&&!o)return i&&Ug(e,n,!1),Ln(t,e,s);r=e.stateNode,Ck.current=e;var l=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&o?(e.child=cs(e,t.child,null,s),e.child=cs(e,null,l,s)):ct(t,e,l,s),e.memoizedState=r.state,i&&Ug(e,n,!0),e.child}function rE(t){var e=t.stateNode;e.pendingContext?Mg(t,e.pendingContext,e.pendingContext!==e.context):e.context&&Mg(t,e.context,!1),kf(t,e.containerInfo)}function ey(t,e,n,r,i){return us(),wf(i),e.flags|=256,ct(t,e,n,r),e.child}var pd={dehydrated:null,treeContext:null,retryLane:0};function md(t){return{baseLanes:t,cachePool:null,transitions:null}}function iE(t,e,n){var r=e.pendingProps,i=we.current,s=!1,o=(e.flags&128)!==0,l;if((l=o)||(l=t!==null&&t.memoizedState===null?!1:(i&2)!==0),l?(s=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(i|=1),de(we,i&1),t===null)return ad(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=r.children,t=r.fallback,s?(r=e.mode,s=e.child,o={mode:"hidden",children:o},!(r&1)&&s!==null?(s.childLanes=0,s.pendingProps=o):s=ju(o,r,0,null),t=ii(t,r,n,null),s.return=e,t.return=e,s.sibling=t,e.child=s,e.child.memoizedState=md(n),e.memoizedState=pd,t):Vf(e,o));if(i=t.memoizedState,i!==null&&(l=i.dehydrated,l!==null))return Pk(t,e,o,r,l,i,n);if(s){s=r.fallback,o=e.mode,i=t.child,l=i.sibling;var u={mode:"hidden",children:r.children};return!(o&1)&&e.child!==i?(r=e.child,r.childLanes=0,r.pendingProps=u,e.deletions=null):(r=vr(i,u),r.subtreeFlags=i.subtreeFlags&14680064),l!==null?s=vr(l,s):(s=ii(s,o,n,null),s.flags|=2),s.return=e,r.return=e,r.sibling=s,e.child=r,r=s,s=e.child,o=t.child.memoizedState,o=o===null?md(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},s.memoizedState=o,s.childLanes=t.childLanes&~n,e.memoizedState=pd,r}return s=t.child,t=s.sibling,r=vr(s,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function Vf(t,e){return e=ju({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Ya(t,e,n,r){return r!==null&&wf(r),cs(e,t.child,null,n),t=Vf(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function Pk(t,e,n,r,i,s,o){if(n)return e.flags&256?(e.flags&=-257,r=hh(Error(U(422))),Ya(t,e,o,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(s=r.fallback,i=e.mode,r=ju({mode:"visible",children:r.children},i,0,null),s=ii(s,i,o,null),s.flags|=2,r.return=e,s.return=e,r.sibling=s,e.child=r,e.mode&1&&cs(e,t.child,null,o),e.child.memoizedState=md(o),e.memoizedState=pd,s);if(!(e.mode&1))return Ya(t,e,o,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var l=r.dgst;return r=l,s=Error(U(419)),r=hh(s,r,void 0),Ya(t,e,o,r)}if(l=(o&t.childLanes)!==0,vt||l){if(r=$e,r!==null){switch(o&-o){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|o)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,On(t,i),nn(r,t,i,-1))}return jf(),r=hh(Error(U(421))),Ya(t,e,o,r)}return i.data==="$?"?(e.flags|=128,e.child=t.child,e=zk.bind(null,t),i._reactRetry=e,null):(t=s.treeContext,Ct=mr(i.nextSibling),xt=e,_e=!0,Zt=null,t!==null&&(Bt[zt++]=Rn,Bt[zt++]=Cn,Bt[zt++]=li,Rn=t.id,Cn=t.overflow,li=e),e=Vf(e,r.children),e.flags|=4096,e)}function ty(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),ld(t.return,e,n)}function dh(t,e,n,r,i){var s=t.memoizedState;s===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(s.isBackwards=e,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=n,s.tailMode=i)}function sE(t,e,n){var r=e.pendingProps,i=r.revealOrder,s=r.tail;if(ct(t,e,r.children,n),r=we.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&ty(t,n,e);else if(t.tag===19)ty(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(de(we,r),!(e.mode&1))e.memoizedState=null;else switch(i){case"forwards":for(n=e.child,i=null;n!==null;)t=n.alternate,t!==null&&Kl(t)===null&&(i=n),n=n.sibling;n=i,n===null?(i=e.child,e.child=null):(i=n.sibling,n.sibling=null),dh(e,!1,i,n,s);break;case"backwards":for(n=null,i=e.child,e.child=null;i!==null;){if(t=i.alternate,t!==null&&Kl(t)===null){e.child=i;break}t=i.sibling,i.sibling=n,n=i,i=t}dh(e,!0,n,null,s);break;case"together":dh(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function yl(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Ln(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),ci|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(U(153));if(e.child!==null){for(t=e.child,n=vr(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=vr(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function Nk(t,e,n){switch(e.tag){case 3:rE(e),us();break;case 5:xw(e);break;case 1:Tt(e.type)&&zl(e);break;case 4:kf(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,i=e.memoizedProps.value;de(Hl,r._currentValue),r._currentValue=i;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(de(we,we.current&1),e.flags|=128,null):n&e.child.childLanes?iE(t,e,n):(de(we,we.current&1),t=Ln(t,e,n),t!==null?t.sibling:null);de(we,we.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return sE(t,e,n);e.flags|=128}if(i=e.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),de(we,we.current),r)break;return null;case 22:case 23:return e.lanes=0,tE(t,e,n)}return Ln(t,e,n)}var oE,gd,aE,lE;oE=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};gd=function(){};aE=function(t,e,n,r){var i=t.memoizedProps;if(i!==r){t=e.stateNode,ei(mn.current);var s=null;switch(n){case"input":i=Uh(t,i),r=Uh(t,r),s=[];break;case"select":i=Ie({},i,{value:void 0}),r=Ie({},r,{value:void 0}),s=[];break;case"textarea":i=Bh(t,i),r=Bh(t,r),s=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=jl)}$h(n,r);var o;n=null;for(c in i)if(!r.hasOwnProperty(c)&&i.hasOwnProperty(c)&&i[c]!=null)if(c==="style"){var l=i[c];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(Oo.hasOwnProperty(c)?s||(s=[]):(s=s||[]).push(c,null));for(c in r){var u=r[c];if(l=i!=null?i[c]:void 0,r.hasOwnProperty(c)&&u!==l&&(u!=null||l!=null))if(c==="style")if(l){for(o in l)!l.hasOwnProperty(o)||u&&u.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in u)u.hasOwnProperty(o)&&l[o]!==u[o]&&(n||(n={}),n[o]=u[o])}else n||(s||(s=[]),s.push(c,n)),n=u;else c==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,l=l?l.__html:void 0,u!=null&&l!==u&&(s=s||[]).push(c,u)):c==="children"?typeof u!="string"&&typeof u!="number"||(s=s||[]).push(c,""+u):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(Oo.hasOwnProperty(c)?(u!=null&&c==="onScroll"&&pe("scroll",t),s||l===u||(s=[])):(s=s||[]).push(c,u))}n&&(s=s||[]).push("style",n);var c=s;(e.updateQueue=c)&&(e.flags|=4)}};lE=function(t,e,n,r){n!==r&&(e.flags|=4)};function io(t,e){if(!_e)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function et(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=t,i=i.sibling;else for(i=t.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=t,i=i.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function xk(t,e,n){var r=e.pendingProps;switch(vf(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return et(e),null;case 1:return Tt(e.type)&&Bl(),et(e),null;case 3:return r=e.stateNode,hs(),ge(Et),ge(st),Cf(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(Qa(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Zt!==null&&(Ad(Zt),Zt=null))),gd(t,e),et(e),null;case 5:Rf(e);var i=ei(Go.current);if(n=e.type,t!==null&&e.stateNode!=null)aE(t,e,n,r,i),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(U(166));return et(e),null}if(t=ei(mn.current),Qa(e)){r=e.stateNode,n=e.type;var s=e.memoizedProps;switch(r[dn]=e,r[Ho]=s,t=(e.mode&1)!==0,n){case"dialog":pe("cancel",r),pe("close",r);break;case"iframe":case"object":case"embed":pe("load",r);break;case"video":case"audio":for(i=0;i<po.length;i++)pe(po[i],r);break;case"source":pe("error",r);break;case"img":case"image":case"link":pe("error",r),pe("load",r);break;case"details":pe("toggle",r);break;case"input":cg(r,s),pe("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},pe("invalid",r);break;case"textarea":dg(r,s),pe("invalid",r)}$h(n,s),i=null;for(var o in s)if(s.hasOwnProperty(o)){var l=s[o];o==="children"?typeof l=="string"?r.textContent!==l&&(s.suppressHydrationWarning!==!0&&Ka(r.textContent,l,t),i=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(s.suppressHydrationWarning!==!0&&Ka(r.textContent,l,t),i=["children",""+l]):Oo.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&pe("scroll",r)}switch(n){case"input":ja(r),hg(r,s,!0);break;case"textarea":ja(r),fg(r);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(r.onclick=jl)}r=i,e.updateQueue=r,r!==null&&(e.flags|=4)}else{o=i.nodeType===9?i:i.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Lv(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=o.createElement(n,{is:r.is}):(t=o.createElement(n),n==="select"&&(o=t,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):t=o.createElementNS(t,n),t[dn]=e,t[Ho]=r,oE(t,e,!1,!1),e.stateNode=t;e:{switch(o=qh(n,r),n){case"dialog":pe("cancel",t),pe("close",t),i=r;break;case"iframe":case"object":case"embed":pe("load",t),i=r;break;case"video":case"audio":for(i=0;i<po.length;i++)pe(po[i],t);i=r;break;case"source":pe("error",t),i=r;break;case"img":case"image":case"link":pe("error",t),pe("load",t),i=r;break;case"details":pe("toggle",t),i=r;break;case"input":cg(t,r),i=Uh(t,r),pe("invalid",t);break;case"option":i=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},i=Ie({},r,{value:void 0}),pe("invalid",t);break;case"textarea":dg(t,r),i=Bh(t,r),pe("invalid",t);break;default:i=r}$h(n,i),l=i;for(s in l)if(l.hasOwnProperty(s)){var u=l[s];s==="style"?Fv(t,u):s==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&Mv(t,u)):s==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&Lo(t,u):typeof u=="number"&&Lo(t,""+u):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Oo.hasOwnProperty(s)?u!=null&&s==="onScroll"&&pe("scroll",t):u!=null&&rf(t,s,u,o))}switch(n){case"input":ja(t),hg(t,r,!1);break;case"textarea":ja(t),fg(t);break;case"option":r.value!=null&&t.setAttribute("value",""+kr(r.value));break;case"select":t.multiple=!!r.multiple,s=r.value,s!=null?Qi(t,!!r.multiple,s,!1):r.defaultValue!=null&&Qi(t,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(t.onclick=jl)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return et(e),null;case 6:if(t&&e.stateNode!=null)lE(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(U(166));if(n=ei(Go.current),ei(mn.current),Qa(e)){if(r=e.stateNode,n=e.memoizedProps,r[dn]=e,(s=r.nodeValue!==n)&&(t=xt,t!==null))switch(t.tag){case 3:Ka(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Ka(r.nodeValue,n,(t.mode&1)!==0)}s&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[dn]=e,e.stateNode=r}return et(e),null;case 13:if(ge(we),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(_e&&Ct!==null&&e.mode&1&&!(e.flags&128))kw(),us(),e.flags|=98560,s=!1;else if(s=Qa(e),r!==null&&r.dehydrated!==null){if(t===null){if(!s)throw Error(U(318));if(s=e.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(U(317));s[dn]=e}else us(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;et(e),s=!1}else Zt!==null&&(Ad(Zt),Zt=null),s=!0;if(!s)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||we.current&1?Me===0&&(Me=3):jf())),e.updateQueue!==null&&(e.flags|=4),et(e),null);case 4:return hs(),gd(t,e),t===null&&$o(e.stateNode.containerInfo),et(e),null;case 10:return If(e.type._context),et(e),null;case 17:return Tt(e.type)&&Bl(),et(e),null;case 19:if(ge(we),s=e.memoizedState,s===null)return et(e),null;if(r=(e.flags&128)!==0,o=s.rendering,o===null)if(r)io(s,!1);else{if(Me!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=Kl(t),o!==null){for(e.flags|=128,io(s,!1),r=o.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)s=n,t=r,s.flags&=14680066,o=s.alternate,o===null?(s.childLanes=0,s.lanes=t,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=o.childLanes,s.lanes=o.lanes,s.child=o.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=o.memoizedProps,s.memoizedState=o.memoizedState,s.updateQueue=o.updateQueue,s.type=o.type,t=o.dependencies,s.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return de(we,we.current&1|2),e.child}t=t.sibling}s.tail!==null&&Ne()>fs&&(e.flags|=128,r=!0,io(s,!1),e.lanes=4194304)}else{if(!r)if(t=Kl(o),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),io(s,!0),s.tail===null&&s.tailMode==="hidden"&&!o.alternate&&!_e)return et(e),null}else 2*Ne()-s.renderingStartTime>fs&&n!==1073741824&&(e.flags|=128,r=!0,io(s,!1),e.lanes=4194304);s.isBackwards?(o.sibling=e.child,e.child=o):(n=s.last,n!==null?n.sibling=o:e.child=o,s.last=o)}return s.tail!==null?(e=s.tail,s.rendering=e,s.tail=e.sibling,s.renderingStartTime=Ne(),e.sibling=null,n=we.current,de(we,r?n&1|2:n&1),e):(et(e),null);case 22:case 23:return Ff(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?St&1073741824&&(et(e),e.subtreeFlags&6&&(e.flags|=8192)):et(e),null;case 24:return null;case 25:return null}throw Error(U(156,e.tag))}function Dk(t,e){switch(vf(e),e.tag){case 1:return Tt(e.type)&&Bl(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return hs(),ge(Et),ge(st),Cf(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return Rf(e),null;case 13:if(ge(we),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(U(340));us()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return ge(we),null;case 4:return hs(),null;case 10:return If(e.type._context),null;case 22:case 23:return Ff(),null;case 24:return null;default:return null}}var Ja=!1,rt=!1,bk=typeof WeakSet=="function"?WeakSet:Set,q=null;function Hi(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Se(t,e,r)}else n.current=null}function yd(t,e,n){try{n()}catch(r){Se(t,e,r)}}var ny=!1;function Vk(t,e){if(ed=Ml,t=fw(),yf(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var o=0,l=-1,u=-1,c=0,f=0,p=t,m=null;t:for(;;){for(var I;p!==n||i!==0&&p.nodeType!==3||(l=o+i),p!==s||r!==0&&p.nodeType!==3||(u=o+r),p.nodeType===3&&(o+=p.nodeValue.length),(I=p.firstChild)!==null;)m=p,p=I;for(;;){if(p===t)break t;if(m===n&&++c===i&&(l=o),m===s&&++f===r&&(u=o),(I=p.nextSibling)!==null)break;p=m,m=p.parentNode}p=I}n=l===-1||u===-1?null:{start:l,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(td={focusedElem:t,selectionRange:n},Ml=!1,q=e;q!==null;)if(e=q,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,q=t;else for(;q!==null;){e=q;try{var R=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(R!==null){var P=R.memoizedProps,O=R.memoizedState,A=e.stateNode,w=A.getSnapshotBeforeUpdate(e.elementType===e.type?P:Yt(e.type,P),O);A.__reactInternalSnapshotBeforeUpdate=w}break;case 3:var k=e.stateNode.containerInfo;k.nodeType===1?k.textContent="":k.nodeType===9&&k.documentElement&&k.removeChild(k.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(U(163))}}catch(b){Se(e,e.return,b)}if(t=e.sibling,t!==null){t.return=e.return,q=t;break}q=e.return}return R=ny,ny=!1,R}function So(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&t)===t){var s=i.destroy;i.destroy=void 0,s!==void 0&&yd(e,n,s)}i=i.next}while(i!==r)}}function Uu(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function _d(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function uE(t){var e=t.alternate;e!==null&&(t.alternate=null,uE(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[dn],delete e[Ho],delete e[id],delete e[gk],delete e[yk])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function cE(t){return t.tag===5||t.tag===3||t.tag===4}function ry(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||cE(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function vd(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=jl));else if(r!==4&&(t=t.child,t!==null))for(vd(t,e,n),t=t.sibling;t!==null;)vd(t,e,n),t=t.sibling}function wd(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(wd(t,e,n),t=t.sibling;t!==null;)wd(t,e,n),t=t.sibling}var He=null,Jt=!1;function Zn(t,e,n){for(n=n.child;n!==null;)hE(t,e,n),n=n.sibling}function hE(t,e,n){if(pn&&typeof pn.onCommitFiberUnmount=="function")try{pn.onCommitFiberUnmount(Nu,n)}catch{}switch(n.tag){case 5:rt||Hi(n,e);case 6:var r=He,i=Jt;He=null,Zn(t,e,n),He=r,Jt=i,He!==null&&(Jt?(t=He,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):He.removeChild(n.stateNode));break;case 18:He!==null&&(Jt?(t=He,n=n.stateNode,t.nodeType===8?sh(t.parentNode,n):t.nodeType===1&&sh(t,n),jo(t)):sh(He,n.stateNode));break;case 4:r=He,i=Jt,He=n.stateNode.containerInfo,Jt=!0,Zn(t,e,n),He=r,Jt=i;break;case 0:case 11:case 14:case 15:if(!rt&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var s=i,o=s.destroy;s=s.tag,o!==void 0&&(s&2||s&4)&&yd(n,e,o),i=i.next}while(i!==r)}Zn(t,e,n);break;case 1:if(!rt&&(Hi(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){Se(n,e,l)}Zn(t,e,n);break;case 21:Zn(t,e,n);break;case 22:n.mode&1?(rt=(r=rt)||n.memoizedState!==null,Zn(t,e,n),rt=r):Zn(t,e,n);break;default:Zn(t,e,n)}}function iy(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new bk),e.forEach(function(r){var i=$k.bind(null,t,r);n.has(r)||(n.add(r),r.then(i,i))})}}function Xt(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var s=t,o=e,l=o;e:for(;l!==null;){switch(l.tag){case 5:He=l.stateNode,Jt=!1;break e;case 3:He=l.stateNode.containerInfo,Jt=!0;break e;case 4:He=l.stateNode.containerInfo,Jt=!0;break e}l=l.return}if(He===null)throw Error(U(160));hE(s,o,i),He=null,Jt=!1;var u=i.alternate;u!==null&&(u.return=null),i.return=null}catch(c){Se(i,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)dE(e,t),e=e.sibling}function dE(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Xt(e,t),un(t),r&4){try{So(3,t,t.return),Uu(3,t)}catch(P){Se(t,t.return,P)}try{So(5,t,t.return)}catch(P){Se(t,t.return,P)}}break;case 1:Xt(e,t),un(t),r&512&&n!==null&&Hi(n,n.return);break;case 5:if(Xt(e,t),un(t),r&512&&n!==null&&Hi(n,n.return),t.flags&32){var i=t.stateNode;try{Lo(i,"")}catch(P){Se(t,t.return,P)}}if(r&4&&(i=t.stateNode,i!=null)){var s=t.memoizedProps,o=n!==null?n.memoizedProps:s,l=t.type,u=t.updateQueue;if(t.updateQueue=null,u!==null)try{l==="input"&&s.type==="radio"&&s.name!=null&&Vv(i,s),qh(l,o);var c=qh(l,s);for(o=0;o<u.length;o+=2){var f=u[o],p=u[o+1];f==="style"?Fv(i,p):f==="dangerouslySetInnerHTML"?Mv(i,p):f==="children"?Lo(i,p):rf(i,f,p,c)}switch(l){case"input":Fh(i,s);break;case"textarea":Ov(i,s);break;case"select":var m=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var I=s.value;I!=null?Qi(i,!!s.multiple,I,!1):m!==!!s.multiple&&(s.defaultValue!=null?Qi(i,!!s.multiple,s.defaultValue,!0):Qi(i,!!s.multiple,s.multiple?[]:"",!1))}i[Ho]=s}catch(P){Se(t,t.return,P)}}break;case 6:if(Xt(e,t),un(t),r&4){if(t.stateNode===null)throw Error(U(162));i=t.stateNode,s=t.memoizedProps;try{i.nodeValue=s}catch(P){Se(t,t.return,P)}}break;case 3:if(Xt(e,t),un(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{jo(e.containerInfo)}catch(P){Se(t,t.return,P)}break;case 4:Xt(e,t),un(t);break;case 13:Xt(e,t),un(t),i=t.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(Mf=Ne())),r&4&&iy(t);break;case 22:if(f=n!==null&&n.memoizedState!==null,t.mode&1?(rt=(c=rt)||f,Xt(e,t),rt=c):Xt(e,t),un(t),r&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!f&&t.mode&1)for(q=t,f=t.child;f!==null;){for(p=q=f;q!==null;){switch(m=q,I=m.child,m.tag){case 0:case 11:case 14:case 15:So(4,m,m.return);break;case 1:Hi(m,m.return);var R=m.stateNode;if(typeof R.componentWillUnmount=="function"){r=m,n=m.return;try{e=r,R.props=e.memoizedProps,R.state=e.memoizedState,R.componentWillUnmount()}catch(P){Se(r,n,P)}}break;case 5:Hi(m,m.return);break;case 22:if(m.memoizedState!==null){oy(p);continue}}I!==null?(I.return=m,q=I):oy(p)}f=f.sibling}e:for(f=null,p=t;;){if(p.tag===5){if(f===null){f=p;try{i=p.stateNode,c?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(l=p.stateNode,u=p.memoizedProps.style,o=u!=null&&u.hasOwnProperty("display")?u.display:null,l.style.display=Uv("display",o))}catch(P){Se(t,t.return,P)}}}else if(p.tag===6){if(f===null)try{p.stateNode.nodeValue=c?"":p.memoizedProps}catch(P){Se(t,t.return,P)}}else if((p.tag!==22&&p.tag!==23||p.memoizedState===null||p===t)&&p.child!==null){p.child.return=p,p=p.child;continue}if(p===t)break e;for(;p.sibling===null;){if(p.return===null||p.return===t)break e;f===p&&(f=null),p=p.return}f===p&&(f=null),p.sibling.return=p.return,p=p.sibling}}break;case 19:Xt(e,t),un(t),r&4&&iy(t);break;case 21:break;default:Xt(e,t),un(t)}}function un(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(cE(n)){var r=n;break e}n=n.return}throw Error(U(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(Lo(i,""),r.flags&=-33);var s=ry(t);wd(t,s,i);break;case 3:case 4:var o=r.stateNode.containerInfo,l=ry(t);vd(t,l,o);break;default:throw Error(U(161))}}catch(u){Se(t,t.return,u)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Ok(t,e,n){q=t,fE(t)}function fE(t,e,n){for(var r=(t.mode&1)!==0;q!==null;){var i=q,s=i.child;if(i.tag===22&&r){var o=i.memoizedState!==null||Ja;if(!o){var l=i.alternate,u=l!==null&&l.memoizedState!==null||rt;l=Ja;var c=rt;if(Ja=o,(rt=u)&&!c)for(q=i;q!==null;)o=q,u=o.child,o.tag===22&&o.memoizedState!==null?ay(i):u!==null?(u.return=o,q=u):ay(i);for(;s!==null;)q=s,fE(s),s=s.sibling;q=i,Ja=l,rt=c}sy(t)}else i.subtreeFlags&8772&&s!==null?(s.return=i,q=s):sy(t)}}function sy(t){for(;q!==null;){var e=q;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:rt||Uu(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!rt)if(n===null)r.componentDidMount();else{var i=e.elementType===e.type?n.memoizedProps:Yt(e.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=e.updateQueue;s!==null&&$g(e,s,r);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}$g(e,o,n)}break;case 5:var l=e.stateNode;if(n===null&&e.flags&4){n=l;var u=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var f=c.memoizedState;if(f!==null){var p=f.dehydrated;p!==null&&jo(p)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(U(163))}rt||e.flags&512&&_d(e)}catch(m){Se(e,e.return,m)}}if(e===t){q=null;break}if(n=e.sibling,n!==null){n.return=e.return,q=n;break}q=e.return}}function oy(t){for(;q!==null;){var e=q;if(e===t){q=null;break}var n=e.sibling;if(n!==null){n.return=e.return,q=n;break}q=e.return}}function ay(t){for(;q!==null;){var e=q;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{Uu(4,e)}catch(u){Se(e,n,u)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var i=e.return;try{r.componentDidMount()}catch(u){Se(e,i,u)}}var s=e.return;try{_d(e)}catch(u){Se(e,s,u)}break;case 5:var o=e.return;try{_d(e)}catch(u){Se(e,o,u)}}}catch(u){Se(e,e.return,u)}if(e===t){q=null;break}var l=e.sibling;if(l!==null){l.return=e.return,q=l;break}q=e.return}}var Lk=Math.ceil,Yl=zn.ReactCurrentDispatcher,Of=zn.ReactCurrentOwner,qt=zn.ReactCurrentBatchConfig,oe=0,$e=null,De=null,Ke=0,St=0,Wi=Ur(0),Me=0,Yo=null,ci=0,Fu=0,Lf=0,ko=null,_t=null,Mf=0,fs=1/0,Sn=null,Jl=!1,Ed=null,yr=null,Za=!1,hr=null,Zl=0,Ro=0,Td=null,_l=-1,vl=0;function ft(){return oe&6?Ne():_l!==-1?_l:_l=Ne()}function _r(t){return t.mode&1?oe&2&&Ke!==0?Ke&-Ke:vk.transition!==null?(vl===0&&(vl=Yv()),vl):(t=le,t!==0||(t=window.event,t=t===void 0?16:iw(t.type)),t):1}function nn(t,e,n,r){if(50<Ro)throw Ro=0,Td=null,Error(U(185));ua(t,n,r),(!(oe&2)||t!==$e)&&(t===$e&&(!(oe&2)&&(Fu|=n),Me===4&&ir(t,Ke)),It(t,r),n===1&&oe===0&&!(e.mode&1)&&(fs=Ne()+500,Ou&&Fr()))}function It(t,e){var n=t.callbackNode;vS(t,e);var r=Ll(t,t===$e?Ke:0);if(r===0)n!==null&&gg(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&gg(n),e===1)t.tag===0?_k(ly.bind(null,t)):Iw(ly.bind(null,t)),pk(function(){!(oe&6)&&Fr()}),n=null;else{switch(Jv(r)){case 1:n=uf;break;case 4:n=Qv;break;case 16:n=Ol;break;case 536870912:n=Xv;break;default:n=Ol}n=EE(n,pE.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function pE(t,e){if(_l=-1,vl=0,oe&6)throw Error(U(327));var n=t.callbackNode;if(es()&&t.callbackNode!==n)return null;var r=Ll(t,t===$e?Ke:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=eu(t,r);else{e=r;var i=oe;oe|=2;var s=gE();($e!==t||Ke!==e)&&(Sn=null,fs=Ne()+500,ri(t,e));do try{Fk();break}catch(l){mE(t,l)}while(!0);Tf(),Yl.current=s,oe=i,De!==null?e=0:($e=null,Ke=0,e=Me)}if(e!==0){if(e===2&&(i=Qh(t),i!==0&&(r=i,e=Id(t,i))),e===1)throw n=Yo,ri(t,0),ir(t,r),It(t,Ne()),n;if(e===6)ir(t,r);else{if(i=t.current.alternate,!(r&30)&&!Mk(i)&&(e=eu(t,r),e===2&&(s=Qh(t),s!==0&&(r=s,e=Id(t,s))),e===1))throw n=Yo,ri(t,0),ir(t,r),It(t,Ne()),n;switch(t.finishedWork=i,t.finishedLanes=r,e){case 0:case 1:throw Error(U(345));case 2:Xr(t,_t,Sn);break;case 3:if(ir(t,r),(r&130023424)===r&&(e=Mf+500-Ne(),10<e)){if(Ll(t,0)!==0)break;if(i=t.suspendedLanes,(i&r)!==r){ft(),t.pingedLanes|=t.suspendedLanes&i;break}t.timeoutHandle=rd(Xr.bind(null,t,_t,Sn),e);break}Xr(t,_t,Sn);break;case 4:if(ir(t,r),(r&4194240)===r)break;for(e=t.eventTimes,i=-1;0<r;){var o=31-tn(r);s=1<<o,o=e[o],o>i&&(i=o),r&=~s}if(r=i,r=Ne()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Lk(r/1960))-r,10<r){t.timeoutHandle=rd(Xr.bind(null,t,_t,Sn),r);break}Xr(t,_t,Sn);break;case 5:Xr(t,_t,Sn);break;default:throw Error(U(329))}}}return It(t,Ne()),t.callbackNode===n?pE.bind(null,t):null}function Id(t,e){var n=ko;return t.current.memoizedState.isDehydrated&&(ri(t,e).flags|=256),t=eu(t,e),t!==2&&(e=_t,_t=n,e!==null&&Ad(e)),t}function Ad(t){_t===null?_t=t:_t.push.apply(_t,t)}function Mk(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],s=i.getSnapshot;i=i.value;try{if(!sn(s(),i))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function ir(t,e){for(e&=~Lf,e&=~Fu,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-tn(e),r=1<<n;t[n]=-1,e&=~r}}function ly(t){if(oe&6)throw Error(U(327));es();var e=Ll(t,0);if(!(e&1))return It(t,Ne()),null;var n=eu(t,e);if(t.tag!==0&&n===2){var r=Qh(t);r!==0&&(e=r,n=Id(t,r))}if(n===1)throw n=Yo,ri(t,0),ir(t,e),It(t,Ne()),n;if(n===6)throw Error(U(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,Xr(t,_t,Sn),It(t,Ne()),null}function Uf(t,e){var n=oe;oe|=1;try{return t(e)}finally{oe=n,oe===0&&(fs=Ne()+500,Ou&&Fr())}}function hi(t){hr!==null&&hr.tag===0&&!(oe&6)&&es();var e=oe;oe|=1;var n=qt.transition,r=le;try{if(qt.transition=null,le=1,t)return t()}finally{le=r,qt.transition=n,oe=e,!(oe&6)&&Fr()}}function Ff(){St=Wi.current,ge(Wi)}function ri(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,fk(n)),De!==null)for(n=De.return;n!==null;){var r=n;switch(vf(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Bl();break;case 3:hs(),ge(Et),ge(st),Cf();break;case 5:Rf(r);break;case 4:hs();break;case 13:ge(we);break;case 19:ge(we);break;case 10:If(r.type._context);break;case 22:case 23:Ff()}n=n.return}if($e=t,De=t=vr(t.current,null),Ke=St=e,Me=0,Yo=null,Lf=Fu=ci=0,_t=ko=null,Zr!==null){for(e=0;e<Zr.length;e++)if(n=Zr[e],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,s=n.pending;if(s!==null){var o=s.next;s.next=i,r.next=o}n.pending=r}Zr=null}return t}function mE(t,e){do{var n=De;try{if(Tf(),ml.current=Xl,Ql){for(var r=Te.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}Ql=!1}if(ui=0,Be=Le=Te=null,Ao=!1,Ko=0,Of.current=null,n===null||n.return===null){Me=1,Yo=e,De=null;break}e:{var s=t,o=n.return,l=n,u=e;if(e=Ke,l.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var c=u,f=l,p=f.tag;if(!(f.mode&1)&&(p===0||p===11||p===15)){var m=f.alternate;m?(f.updateQueue=m.updateQueue,f.memoizedState=m.memoizedState,f.lanes=m.lanes):(f.updateQueue=null,f.memoizedState=null)}var I=Qg(o);if(I!==null){I.flags&=-257,Xg(I,o,l,s,e),I.mode&1&&Kg(s,c,e),e=I,u=c;var R=e.updateQueue;if(R===null){var P=new Set;P.add(u),e.updateQueue=P}else R.add(u);break e}else{if(!(e&1)){Kg(s,c,e),jf();break e}u=Error(U(426))}}else if(_e&&l.mode&1){var O=Qg(o);if(O!==null){!(O.flags&65536)&&(O.flags|=256),Xg(O,o,l,s,e),wf(ds(u,l));break e}}s=u=ds(u,l),Me!==4&&(Me=2),ko===null?ko=[s]:ko.push(s),s=o;do{switch(s.tag){case 3:s.flags|=65536,e&=-e,s.lanes|=e;var A=Jw(s,u,e);zg(s,A);break e;case 1:l=u;var w=s.type,k=s.stateNode;if(!(s.flags&128)&&(typeof w.getDerivedStateFromError=="function"||k!==null&&typeof k.componentDidCatch=="function"&&(yr===null||!yr.has(k)))){s.flags|=65536,e&=-e,s.lanes|=e;var b=Zw(s,l,e);zg(s,b);break e}}s=s.return}while(s!==null)}_E(n)}catch(F){e=F,De===n&&n!==null&&(De=n=n.return);continue}break}while(!0)}function gE(){var t=Yl.current;return Yl.current=Xl,t===null?Xl:t}function jf(){(Me===0||Me===3||Me===2)&&(Me=4),$e===null||!(ci&268435455)&&!(Fu&268435455)||ir($e,Ke)}function eu(t,e){var n=oe;oe|=2;var r=gE();($e!==t||Ke!==e)&&(Sn=null,ri(t,e));do try{Uk();break}catch(i){mE(t,i)}while(!0);if(Tf(),oe=n,Yl.current=r,De!==null)throw Error(U(261));return $e=null,Ke=0,Me}function Uk(){for(;De!==null;)yE(De)}function Fk(){for(;De!==null&&!cS();)yE(De)}function yE(t){var e=wE(t.alternate,t,St);t.memoizedProps=t.pendingProps,e===null?_E(t):De=e,Of.current=null}function _E(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=Dk(n,e),n!==null){n.flags&=32767,De=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{Me=6,De=null;return}}else if(n=xk(n,e,St),n!==null){De=n;return}if(e=e.sibling,e!==null){De=e;return}De=e=t}while(e!==null);Me===0&&(Me=5)}function Xr(t,e,n){var r=le,i=qt.transition;try{qt.transition=null,le=1,jk(t,e,n,r)}finally{qt.transition=i,le=r}return null}function jk(t,e,n,r){do es();while(hr!==null);if(oe&6)throw Error(U(327));n=t.finishedWork;var i=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(U(177));t.callbackNode=null,t.callbackPriority=0;var s=n.lanes|n.childLanes;if(wS(t,s),t===$e&&(De=$e=null,Ke=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Za||(Za=!0,EE(Ol,function(){return es(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=qt.transition,qt.transition=null;var o=le;le=1;var l=oe;oe|=4,Of.current=null,Vk(t,n),dE(n,t),ok(td),Ml=!!ed,td=ed=null,t.current=n,Ok(n),hS(),oe=l,le=o,qt.transition=s}else t.current=n;if(Za&&(Za=!1,hr=t,Zl=i),s=t.pendingLanes,s===0&&(yr=null),pS(n.stateNode),It(t,Ne()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)i=e[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(Jl)throw Jl=!1,t=Ed,Ed=null,t;return Zl&1&&t.tag!==0&&es(),s=t.pendingLanes,s&1?t===Td?Ro++:(Ro=0,Td=t):Ro=0,Fr(),null}function es(){if(hr!==null){var t=Jv(Zl),e=qt.transition,n=le;try{if(qt.transition=null,le=16>t?16:t,hr===null)var r=!1;else{if(t=hr,hr=null,Zl=0,oe&6)throw Error(U(331));var i=oe;for(oe|=4,q=t.current;q!==null;){var s=q,o=s.child;if(q.flags&16){var l=s.deletions;if(l!==null){for(var u=0;u<l.length;u++){var c=l[u];for(q=c;q!==null;){var f=q;switch(f.tag){case 0:case 11:case 15:So(8,f,s)}var p=f.child;if(p!==null)p.return=f,q=p;else for(;q!==null;){f=q;var m=f.sibling,I=f.return;if(uE(f),f===c){q=null;break}if(m!==null){m.return=I,q=m;break}q=I}}}var R=s.alternate;if(R!==null){var P=R.child;if(P!==null){R.child=null;do{var O=P.sibling;P.sibling=null,P=O}while(P!==null)}}q=s}}if(s.subtreeFlags&2064&&o!==null)o.return=s,q=o;else e:for(;q!==null;){if(s=q,s.flags&2048)switch(s.tag){case 0:case 11:case 15:So(9,s,s.return)}var A=s.sibling;if(A!==null){A.return=s.return,q=A;break e}q=s.return}}var w=t.current;for(q=w;q!==null;){o=q;var k=o.child;if(o.subtreeFlags&2064&&k!==null)k.return=o,q=k;else e:for(o=w;q!==null;){if(l=q,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:Uu(9,l)}}catch(F){Se(l,l.return,F)}if(l===o){q=null;break e}var b=l.sibling;if(b!==null){b.return=l.return,q=b;break e}q=l.return}}if(oe=i,Fr(),pn&&typeof pn.onPostCommitFiberRoot=="function")try{pn.onPostCommitFiberRoot(Nu,t)}catch{}r=!0}return r}finally{le=n,qt.transition=e}}return!1}function uy(t,e,n){e=ds(n,e),e=Jw(t,e,1),t=gr(t,e,1),e=ft(),t!==null&&(ua(t,1,e),It(t,e))}function Se(t,e,n){if(t.tag===3)uy(t,t,n);else for(;e!==null;){if(e.tag===3){uy(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(yr===null||!yr.has(r))){t=ds(n,t),t=Zw(e,t,1),e=gr(e,t,1),t=ft(),e!==null&&(ua(e,1,t),It(e,t));break}}e=e.return}}function Bk(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=ft(),t.pingedLanes|=t.suspendedLanes&n,$e===t&&(Ke&n)===n&&(Me===4||Me===3&&(Ke&130023424)===Ke&&500>Ne()-Mf?ri(t,0):Lf|=n),It(t,e)}function vE(t,e){e===0&&(t.mode&1?(e=$a,$a<<=1,!($a&130023424)&&($a=4194304)):e=1);var n=ft();t=On(t,e),t!==null&&(ua(t,e,n),It(t,n))}function zk(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),vE(t,n)}function $k(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,i=t.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(U(314))}r!==null&&r.delete(e),vE(t,n)}var wE;wE=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||Et.current)vt=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return vt=!1,Nk(t,e,n);vt=!!(t.flags&131072)}else vt=!1,_e&&e.flags&1048576&&Aw(e,ql,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;yl(t,e),t=e.pendingProps;var i=ls(e,st.current);Zi(e,n),i=Nf(null,e,r,t,i,n);var s=xf();return e.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,Tt(r)?(s=!0,zl(e)):s=!1,e.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,Sf(e),i.updater=Mu,e.stateNode=i,i._reactInternals=e,cd(e,r,t,n),e=fd(null,e,r,!0,s,n)):(e.tag=0,_e&&s&&_f(e),ct(null,e,i,n),e=e.child),e;case 16:r=e.elementType;e:{switch(yl(t,e),t=e.pendingProps,i=r._init,r=i(r._payload),e.type=r,i=e.tag=Hk(r),t=Yt(r,t),i){case 0:e=dd(null,e,r,t,n);break e;case 1:e=Zg(null,e,r,t,n);break e;case 11:e=Yg(null,e,r,t,n);break e;case 14:e=Jg(null,e,r,Yt(r.type,t),n);break e}throw Error(U(306,r,""))}return e;case 0:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Yt(r,i),dd(t,e,r,i,n);case 1:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Yt(r,i),Zg(t,e,r,i,n);case 3:e:{if(rE(e),t===null)throw Error(U(387));r=e.pendingProps,s=e.memoizedState,i=s.element,Nw(t,e),Gl(e,r,null,n);var o=e.memoizedState;if(r=o.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){i=ds(Error(U(423)),e),e=ey(t,e,r,n,i);break e}else if(r!==i){i=ds(Error(U(424)),e),e=ey(t,e,r,n,i);break e}else for(Ct=mr(e.stateNode.containerInfo.firstChild),xt=e,_e=!0,Zt=null,n=Cw(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(us(),r===i){e=Ln(t,e,n);break e}ct(t,e,r,n)}e=e.child}return e;case 5:return xw(e),t===null&&ad(e),r=e.type,i=e.pendingProps,s=t!==null?t.memoizedProps:null,o=i.children,nd(r,i)?o=null:s!==null&&nd(r,s)&&(e.flags|=32),nE(t,e),ct(t,e,o,n),e.child;case 6:return t===null&&ad(e),null;case 13:return iE(t,e,n);case 4:return kf(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=cs(e,null,r,n):ct(t,e,r,n),e.child;case 11:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Yt(r,i),Yg(t,e,r,i,n);case 7:return ct(t,e,e.pendingProps,n),e.child;case 8:return ct(t,e,e.pendingProps.children,n),e.child;case 12:return ct(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,i=e.pendingProps,s=e.memoizedProps,o=i.value,de(Hl,r._currentValue),r._currentValue=o,s!==null)if(sn(s.value,o)){if(s.children===i.children&&!Et.current){e=Ln(t,e,n);break e}}else for(s=e.child,s!==null&&(s.return=e);s!==null;){var l=s.dependencies;if(l!==null){o=s.child;for(var u=l.firstContext;u!==null;){if(u.context===r){if(s.tag===1){u=Dn(-1,n&-n),u.tag=2;var c=s.updateQueue;if(c!==null){c=c.shared;var f=c.pending;f===null?u.next=u:(u.next=f.next,f.next=u),c.pending=u}}s.lanes|=n,u=s.alternate,u!==null&&(u.lanes|=n),ld(s.return,n,e),l.lanes|=n;break}u=u.next}}else if(s.tag===10)o=s.type===e.type?null:s.child;else if(s.tag===18){if(o=s.return,o===null)throw Error(U(341));o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),ld(o,n,e),o=s.sibling}else o=s.child;if(o!==null)o.return=s;else for(o=s;o!==null;){if(o===e){o=null;break}if(s=o.sibling,s!==null){s.return=o.return,o=s;break}o=o.return}s=o}ct(t,e,i.children,n),e=e.child}return e;case 9:return i=e.type,r=e.pendingProps.children,Zi(e,n),i=Ht(i),r=r(i),e.flags|=1,ct(t,e,r,n),e.child;case 14:return r=e.type,i=Yt(r,e.pendingProps),i=Yt(r.type,i),Jg(t,e,r,i,n);case 15:return eE(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,i=e.pendingProps,i=e.elementType===r?i:Yt(r,i),yl(t,e),e.tag=1,Tt(r)?(t=!0,zl(e)):t=!1,Zi(e,n),Yw(e,r,i),cd(e,r,i,n),fd(null,e,r,!0,t,n);case 19:return sE(t,e,n);case 22:return tE(t,e,n)}throw Error(U(156,e.tag))};function EE(t,e){return Kv(t,e)}function qk(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function $t(t,e,n,r){return new qk(t,e,n,r)}function Bf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Hk(t){if(typeof t=="function")return Bf(t)?1:0;if(t!=null){if(t=t.$$typeof,t===of)return 11;if(t===af)return 14}return 2}function vr(t,e){var n=t.alternate;return n===null?(n=$t(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function wl(t,e,n,r,i,s){var o=2;if(r=t,typeof t=="function")Bf(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case Li:return ii(n.children,i,s,e);case sf:o=8,i|=8;break;case Vh:return t=$t(12,n,e,i|2),t.elementType=Vh,t.lanes=s,t;case Oh:return t=$t(13,n,e,i),t.elementType=Oh,t.lanes=s,t;case Lh:return t=$t(19,n,e,i),t.elementType=Lh,t.lanes=s,t;case xv:return ju(n,i,s,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Pv:o=10;break e;case Nv:o=9;break e;case of:o=11;break e;case af:o=14;break e;case tr:o=16,r=null;break e}throw Error(U(130,t==null?t:typeof t,""))}return e=$t(o,n,e,i),e.elementType=t,e.type=r,e.lanes=s,e}function ii(t,e,n,r){return t=$t(7,t,r,e),t.lanes=n,t}function ju(t,e,n,r){return t=$t(22,t,r,e),t.elementType=xv,t.lanes=n,t.stateNode={isHidden:!1},t}function fh(t,e,n){return t=$t(6,t,null,e),t.lanes=n,t}function ph(t,e,n){return e=$t(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function Wk(t,e,n,r,i){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Kc(0),this.expirationTimes=Kc(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Kc(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function zf(t,e,n,r,i,s,o,l,u){return t=new Wk(t,e,n,l,u),e===1?(e=1,s===!0&&(e|=8)):e=0,s=$t(3,null,null,e),t.current=s,s.stateNode=t,s.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Sf(s),t}function Gk(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Oi,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function TE(t){if(!t)return Rr;t=t._reactInternals;e:{if(wi(t)!==t||t.tag!==1)throw Error(U(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(Tt(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(U(171))}if(t.tag===1){var n=t.type;if(Tt(n))return Tw(t,n,e)}return e}function IE(t,e,n,r,i,s,o,l,u){return t=zf(n,r,!0,t,i,s,o,l,u),t.context=TE(null),n=t.current,r=ft(),i=_r(n),s=Dn(r,i),s.callback=e??null,gr(n,s,i),t.current.lanes=i,ua(t,i,r),It(t,r),t}function Bu(t,e,n,r){var i=e.current,s=ft(),o=_r(i);return n=TE(n),e.context===null?e.context=n:e.pendingContext=n,e=Dn(s,o),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=gr(i,e,o),t!==null&&(nn(t,i,o,s),pl(t,i,o)),o}function tu(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function cy(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function $f(t,e){cy(t,e),(t=t.alternate)&&cy(t,e)}function Kk(){return null}var AE=typeof reportError=="function"?reportError:function(t){console.error(t)};function qf(t){this._internalRoot=t}zu.prototype.render=qf.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(U(409));Bu(t,e,null,null)};zu.prototype.unmount=qf.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;hi(function(){Bu(null,t,null,null)}),e[Vn]=null}};function zu(t){this._internalRoot=t}zu.prototype.unstable_scheduleHydration=function(t){if(t){var e=tw();t={blockedOn:null,target:t,priority:e};for(var n=0;n<rr.length&&e!==0&&e<rr[n].priority;n++);rr.splice(n,0,t),n===0&&rw(t)}};function Hf(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function $u(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function hy(){}function Qk(t,e,n,r,i){if(i){if(typeof r=="function"){var s=r;r=function(){var c=tu(o);s.call(c)}}var o=IE(e,r,t,0,null,!1,!1,"",hy);return t._reactRootContainer=o,t[Vn]=o.current,$o(t.nodeType===8?t.parentNode:t),hi(),o}for(;i=t.lastChild;)t.removeChild(i);if(typeof r=="function"){var l=r;r=function(){var c=tu(u);l.call(c)}}var u=zf(t,0,!1,null,null,!1,!1,"",hy);return t._reactRootContainer=u,t[Vn]=u.current,$o(t.nodeType===8?t.parentNode:t),hi(function(){Bu(e,u,n,r)}),u}function qu(t,e,n,r,i){var s=n._reactRootContainer;if(s){var o=s;if(typeof i=="function"){var l=i;i=function(){var u=tu(o);l.call(u)}}Bu(e,o,t,i)}else o=Qk(n,e,t,i,r);return tu(o)}Zv=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=fo(e.pendingLanes);n!==0&&(cf(e,n|1),It(e,Ne()),!(oe&6)&&(fs=Ne()+500,Fr()))}break;case 13:hi(function(){var r=On(t,1);if(r!==null){var i=ft();nn(r,t,1,i)}}),$f(t,1)}};hf=function(t){if(t.tag===13){var e=On(t,134217728);if(e!==null){var n=ft();nn(e,t,134217728,n)}$f(t,134217728)}};ew=function(t){if(t.tag===13){var e=_r(t),n=On(t,e);if(n!==null){var r=ft();nn(n,t,e,r)}$f(t,e)}};tw=function(){return le};nw=function(t,e){var n=le;try{return le=t,e()}finally{le=n}};Wh=function(t,e,n){switch(e){case"input":if(Fh(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var i=Vu(r);if(!i)throw Error(U(90));bv(r),Fh(r,i)}}}break;case"textarea":Ov(t,n);break;case"select":e=n.value,e!=null&&Qi(t,!!n.multiple,e,!1)}};zv=Uf;$v=hi;var Xk={usingClientEntryPoint:!1,Events:[ha,ji,Vu,jv,Bv,Uf]},so={findFiberByHostInstance:Jr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Yk={bundleType:so.bundleType,version:so.version,rendererPackageName:so.rendererPackageName,rendererConfig:so.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:zn.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Wv(t),t===null?null:t.stateNode},findFiberByHostInstance:so.findFiberByHostInstance||Kk,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var el=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!el.isDisabled&&el.supportsFiber)try{Nu=el.inject(Yk),pn=el}catch{}}Mt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Xk;Mt.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Hf(e))throw Error(U(200));return Gk(t,e,null,n)};Mt.createRoot=function(t,e){if(!Hf(t))throw Error(U(299));var n=!1,r="",i=AE;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(i=e.onRecoverableError)),e=zf(t,1,!1,null,null,n,!1,r,i),t[Vn]=e.current,$o(t.nodeType===8?t.parentNode:t),new qf(e)};Mt.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(U(188)):(t=Object.keys(t).join(","),Error(U(268,t)));return t=Wv(e),t=t===null?null:t.stateNode,t};Mt.flushSync=function(t){return hi(t)};Mt.hydrate=function(t,e,n){if(!$u(e))throw Error(U(200));return qu(null,t,e,!0,n)};Mt.hydrateRoot=function(t,e,n){if(!Hf(t))throw Error(U(405));var r=n!=null&&n.hydratedSources||null,i=!1,s="",o=AE;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=IE(e,null,t,1,n??null,i,!1,s,o),t[Vn]=e.current,$o(t),r)for(t=0;t<r.length;t++)n=r[t],i=n._getVersion,i=i(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,i]:e.mutableSourceEagerHydrationData.push(n,i);return new zu(e)};Mt.render=function(t,e,n){if(!$u(e))throw Error(U(200));return qu(null,t,e,!1,n)};Mt.unmountComponentAtNode=function(t){if(!$u(t))throw Error(U(40));return t._reactRootContainer?(hi(function(){qu(null,null,t,!1,function(){t._reactRootContainer=null,t[Vn]=null})}),!0):!1};Mt.unstable_batchedUpdates=Uf;Mt.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!$u(n))throw Error(U(200));if(t==null||t._reactInternals===void 0)throw Error(U(38));return qu(t,e,n,!1,r)};Mt.version="18.3.1-next-f1338f8080-20240426";function SE(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(SE)}catch(t){console.error(t)}}SE(),Sv.exports=Mt;var Jk=Sv.exports,kE,dy=Jk;kE=dy.createRoot,dy.hydrateRoot;const Zk=()=>{};var fy={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RE=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[n++]=i:i<2048?(e[n++]=i>>6|192,e[n++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=i>>18|240,e[n++]=i>>12&63|128,e[n++]=i>>6&63|128,e[n++]=i&63|128):(e[n++]=i>>12|224,e[n++]=i>>6&63|128,e[n++]=i&63|128)}return e},eR=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const i=t[n++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const s=t[n++];e[r++]=String.fromCharCode((i&31)<<6|s&63)}else if(i>239&&i<365){const s=t[n++],o=t[n++],l=t[n++],u=((i&7)<<18|(s&63)<<12|(o&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const s=t[n++],o=t[n++];e[r++]=String.fromCharCode((i&15)<<12|(s&63)<<6|o&63)}}return e.join("")},CE={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const s=t[i],o=i+1<t.length,l=o?t[i+1]:0,u=i+2<t.length,c=u?t[i+2]:0,f=s>>2,p=(s&3)<<4|l>>4;let m=(l&15)<<2|c>>6,I=c&63;u||(I=64,o||(m=64)),r.push(n[f],n[p],n[m],n[I])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(RE(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):eR(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const s=n[t.charAt(i++)],l=i<t.length?n[t.charAt(i)]:0;++i;const c=i<t.length?n[t.charAt(i)]:64;++i;const p=i<t.length?n[t.charAt(i)]:64;if(++i,s==null||l==null||c==null||p==null)throw new tR;const m=s<<2|l>>4;if(r.push(m),c!==64){const I=l<<4&240|c>>2;if(r.push(I),p!==64){const R=c<<6&192|p;r.push(R)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class tR extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const nR=function(t){const e=RE(t);return CE.encodeByteArray(e,!0)},nu=function(t){return nR(t).replace(/\./g,"")},PE=function(t){try{return CE.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rR(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iR=()=>rR().__FIREBASE_DEFAULTS__,sR=()=>{if(typeof process>"u"||typeof fy>"u")return;const t=fy.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},oR=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&PE(t[1]);return e&&JSON.parse(e)},Hu=()=>{try{return Zk()||iR()||sR()||oR()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},NE=t=>{var e,n;return(n=(e=Hu())==null?void 0:e.emulatorHosts)==null?void 0:n[t]},Wf=t=>{const e=NE(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},xE=()=>{var t;return(t=Hu())==null?void 0:t.config},DE=t=>{var e;return(e=Hu())==null?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aR{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bE(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",i=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${r}`,aud:r,iat:i,exp:i+3600,auth_time:i,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...t};return[nu(JSON.stringify(n)),nu(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ot(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function lR(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ot())}function uR(){var e;const t=(e=Hu())==null?void 0:e.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function cR(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Gf(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function hR(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function dR(){const t=ot();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function fR(){return!uR()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Kf(){try{return typeof indexedDB=="object"}catch{return!1}}function Qf(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var s;e(((s=i.error)==null?void 0:s.message)||"")}}catch(n){e(n)}})}function VE(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pR="FirebaseError";class Ft extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=pR,Object.setPrototypeOf(this,Ft.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Ei.prototype.create)}}class Ei{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},i=`${this.service}/${e}`,s=this.errors[e],o=s?mR(s,r):"Error",l=`${this.serviceName}: ${o} (${i}).`;return new Ft(i,l,r)}}function mR(t,e){return t.replace(gR,(n,r)=>{const i=e[r];return i!=null?String(i):`<${r}?>`})}const gR=/\{\$([^}]+)}/g;function yR(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function En(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const i of n){if(!r.includes(i))return!1;const s=t[i],o=e[i];if(py(s)&&py(o)){if(!En(s,o))return!1}else if(s!==o)return!1}for(const i of r)if(!n.includes(i))return!1;return!0}function py(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fa(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function _R(t,e){const n=new vR(t,e);return n.subscribe.bind(n)}class vR{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let i;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");wR(e,["next","error","complete"])?i=e:i={next:e,error:n,complete:r},i.next===void 0&&(i.next=mh),i.error===void 0&&(i.error=mh),i.complete===void 0&&(i.complete=mh);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function wR(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function mh(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ER=1e3,TR=2,IR=4*60*60*1e3,AR=.5;function my(t,e=ER,n=TR){const r=e*Math.pow(n,t),i=Math.round(AR*r*(Math.random()-.5)*2);return Math.min(IR,r+i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ce(t){return t&&t._delegate?t._delegate:t}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $n(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Wu(t){return(await fetch(t,{credentials:"include"})).ok}class Lt{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yr="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SR{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new aR;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){const n=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(n)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:n})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(RR(e))try{this.getOrInitializeService({instanceIdentifier:Yr})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(n);try{const s=this.getOrInitializeService({instanceIdentifier:i});r.resolve(s)}catch{}}}}clearInstance(e=Yr){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Yr){return this.instances.has(e)}getOptions(e=Yr){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[s,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(s);r===l&&o.resolve(i)}return i}onInit(e,n){const r=this.normalizeInstanceIdentifier(n),i=this.onInitCallbacks.get(r)??new Set;i.add(e),this.onInitCallbacks.set(r,i);const s=this.instances.get(r);return s&&e(s,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const i of r)try{i(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:kR(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Yr){return this.component?this.component.multipleInstances?e:Yr:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function kR(t){return t===Yr?void 0:t}function RR(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CR{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new SR(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var re;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(re||(re={}));const PR={debug:re.DEBUG,verbose:re.VERBOSE,info:re.INFO,warn:re.WARN,error:re.ERROR,silent:re.SILENT},NR=re.INFO,xR={[re.DEBUG]:"log",[re.VERBOSE]:"log",[re.INFO]:"info",[re.WARN]:"warn",[re.ERROR]:"error"},DR=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),i=xR[e];if(i)console[i](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Gu{constructor(e){this.name=e,this._logLevel=NR,this._logHandler=DR,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in re))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?PR[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,re.DEBUG,...e),this._logHandler(this,re.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,re.VERBOSE,...e),this._logHandler(this,re.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,re.INFO,...e),this._logHandler(this,re.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,re.WARN,...e),this._logHandler(this,re.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,re.ERROR,...e),this._logHandler(this,re.ERROR,...e)}}const bR=(t,e)=>e.some(n=>t instanceof n);let gy,yy;function VR(){return gy||(gy=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function OR(){return yy||(yy=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const OE=new WeakMap,Sd=new WeakMap,LE=new WeakMap,gh=new WeakMap,Xf=new WeakMap;function LR(t){const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("success",s),t.removeEventListener("error",o)},s=()=>{n(wr(t.result)),i()},o=()=>{r(t.error),i()};t.addEventListener("success",s),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&OE.set(n,t)}).catch(()=>{}),Xf.set(e,t),e}function MR(t){if(Sd.has(t))return;const e=new Promise((n,r)=>{const i=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",o),t.removeEventListener("abort",o)},s=()=>{n(),i()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",s),t.addEventListener("error",o),t.addEventListener("abort",o)});Sd.set(t,e)}let kd={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Sd.get(t);if(e==="objectStoreNames")return t.objectStoreNames||LE.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return wr(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function UR(t){kd=t(kd)}function FR(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(yh(this),e,...n);return LE.set(r,e.sort?e.sort():[e]),wr(r)}:OR().includes(t)?function(...e){return t.apply(yh(this),e),wr(OE.get(this))}:function(...e){return wr(t.apply(yh(this),e))}}function jR(t){return typeof t=="function"?FR(t):(t instanceof IDBTransaction&&MR(t),bR(t,VR())?new Proxy(t,kd):t)}function wr(t){if(t instanceof IDBRequest)return LR(t);if(gh.has(t))return gh.get(t);const e=jR(t);return e!==t&&(gh.set(t,e),Xf.set(e,t)),e}const yh=t=>Xf.get(t);function ME(t,e,{blocked:n,upgrade:r,blocking:i,terminated:s}={}){const o=indexedDB.open(t,e),l=wr(o);return r&&o.addEventListener("upgradeneeded",u=>{r(wr(o.result),u.oldVersion,u.newVersion,wr(o.transaction),u)}),n&&o.addEventListener("blocked",u=>n(u.oldVersion,u.newVersion,u)),l.then(u=>{s&&u.addEventListener("close",()=>s()),i&&u.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),l}const BR=["get","getKey","getAll","getAllKeys","count"],zR=["put","add","delete","clear"],_h=new Map;function _y(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(_h.get(e))return _h.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,i=zR.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||BR.includes(n)))return;const s=async function(o,...l){const u=this.transaction(o,i?"readwrite":"readonly");let c=u.store;return r&&(c=c.index(l.shift())),(await Promise.all([c[n](...l),i&&u.done]))[0]};return _h.set(e,s),s}UR(t=>({...t,get:(e,n,r)=>_y(e,n)||t.get(e,n,r),has:(e,n)=>!!_y(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $R{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(qR(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function qR(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Rd="@firebase/app",vy="0.14.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mn=new Gu("@firebase/app"),HR="@firebase/app-compat",WR="@firebase/analytics-compat",GR="@firebase/analytics",KR="@firebase/app-check-compat",QR="@firebase/app-check",XR="@firebase/auth",YR="@firebase/auth-compat",JR="@firebase/database",ZR="@firebase/data-connect",eC="@firebase/database-compat",tC="@firebase/functions",nC="@firebase/functions-compat",rC="@firebase/installations",iC="@firebase/installations-compat",sC="@firebase/messaging",oC="@firebase/messaging-compat",aC="@firebase/performance",lC="@firebase/performance-compat",uC="@firebase/remote-config",cC="@firebase/remote-config-compat",hC="@firebase/storage",dC="@firebase/storage-compat",fC="@firebase/firestore",pC="@firebase/ai",mC="@firebase/firestore-compat",gC="firebase",yC="12.14.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cd="[DEFAULT]",_C={[Rd]:"fire-core",[HR]:"fire-core-compat",[GR]:"fire-analytics",[WR]:"fire-analytics-compat",[QR]:"fire-app-check",[KR]:"fire-app-check-compat",[XR]:"fire-auth",[YR]:"fire-auth-compat",[JR]:"fire-rtdb",[ZR]:"fire-data-connect",[eC]:"fire-rtdb-compat",[tC]:"fire-fn",[nC]:"fire-fn-compat",[rC]:"fire-iid",[iC]:"fire-iid-compat",[sC]:"fire-fcm",[oC]:"fire-fcm-compat",[aC]:"fire-perf",[lC]:"fire-perf-compat",[uC]:"fire-rc",[cC]:"fire-rc-compat",[hC]:"fire-gcs",[dC]:"fire-gcs-compat",[fC]:"fire-fst",[mC]:"fire-fst-compat",[pC]:"fire-vertex","fire-js":"fire-js",[gC]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jo=new Map,vC=new Map,Pd=new Map;function wy(t,e){try{t.container.addComponent(e)}catch(n){Mn.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Gt(t){const e=t.name;if(Pd.has(e))return Mn.debug(`There were multiple attempts to register component ${e}.`),!1;Pd.set(e,t);for(const n of Jo.values())wy(n,t);for(const n of vC.values())wy(n,t);return!0}function qn(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function kt(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wC={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Er=new Ei("app","Firebase",wC);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EC{constructor(e,n,r){this._isDeleted=!1,this._options={...e},this._config={...n},this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Lt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Er.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ti=yC;function UE(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r={name:Cd,automaticDataCollectionEnabled:!0,...e},i=r.name;if(typeof i!="string"||!i)throw Er.create("bad-app-name",{appName:String(i)});if(n||(n=xE()),!n)throw Er.create("no-options");const s=Jo.get(i);if(s){if(En(n,s.options)&&En(r,s.config))return s;throw Er.create("duplicate-app",{appName:i})}const o=new CR(i);for(const u of Pd.values())o.addComponent(u);const l=new EC(n,r,o);return Jo.set(i,l),l}function Rs(t=Cd){const e=Jo.get(t);if(!e&&t===Cd&&xE())return UE();if(!e)throw Er.create("no-app",{appName:t});return e}function TC(){return Array.from(Jo.values())}function it(t,e,n){let r=_C[t]??t;n&&(r+=`-${n}`);const i=r.match(/\s|\//),s=e.match(/\s|\//);if(i||s){const o=[`Unable to register library "${r}" with version "${e}":`];i&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&s&&o.push("and"),s&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Mn.warn(o.join(" "));return}Gt(new Lt(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const IC="firebase-heartbeat-database",AC=1,Zo="firebase-heartbeat-store";let vh=null;function FE(){return vh||(vh=ME(IC,AC,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Zo)}catch(n){console.warn(n)}}}}).catch(t=>{throw Er.create("idb-open",{originalErrorMessage:t.message})})),vh}async function SC(t){try{const n=(await FE()).transaction(Zo),r=await n.objectStore(Zo).get(jE(t));return await n.done,r}catch(e){if(e instanceof Ft)Mn.warn(e.message);else{const n=Er.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Mn.warn(n.message)}}}async function Ey(t,e){try{const r=(await FE()).transaction(Zo,"readwrite");await r.objectStore(Zo).put(e,jE(t)),await r.done}catch(n){if(n instanceof Ft)Mn.warn(n.message);else{const r=Er.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Mn.warn(r.message)}}}function jE(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kC=1024,RC=30;class CC{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new NC(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Ty();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)==null?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:i}),this._heartbeatsCache.heartbeats.length>RC){const o=xC(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Mn.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Ty(),{heartbeatsToSend:r,unsentEntries:i}=PC(this._heartbeatsCache.heartbeats),s=nu(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(n){return Mn.warn(n),""}}}function Ty(){return new Date().toISOString().substring(0,10)}function PC(t,e=kC){const n=[];let r=t.slice();for(const i of t){const s=n.find(o=>o.agent===i.agent);if(s){if(s.dates.push(i.date),Iy(n)>e){s.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Iy(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class NC{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Kf()?Qf().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await SC(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Ey(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Ey(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Iy(t){return nu(JSON.stringify({version:2,heartbeats:t})).length}function xC(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function DC(t){Gt(new Lt("platform-logger",e=>new $R(e),"PRIVATE")),Gt(new Lt("heartbeat",e=>new CC(e),"PRIVATE")),it(Rd,vy,t),it(Rd,vy,"esm2020"),it("fire-js","")}DC("");var bC="firebase",VC="12.14.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */it(bC,VC,"app");function BE(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const OC=BE,zE=new Ei("auth","Firebase",BE());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ru=new Gu("@firebase/auth");function LC(t,...e){ru.logLevel<=re.WARN&&ru.warn(`Auth (${Ti}): ${t}`,...e)}function El(t,...e){ru.logLevel<=re.ERROR&&ru.error(`Auth (${Ti}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Un(t,...e){throw Yf(t,...e)}function gn(t,...e){return Yf(t,...e)}function $E(t,e,n){const r={...OC(),[e]:n};return new Ei("auth","Firebase",r).create(e,{appName:t.name})}function Tr(t){return $E(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Yf(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return zE.create(t,...e)}function Q(t,e,...n){if(!t)throw Yf(e,...n)}function Pn(t){const e="INTERNAL ASSERTION FAILED: "+t;throw El(e),new Error(e)}function Fn(t,e){t||Pn(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nd(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.href)||""}function MC(){return Ay()==="http:"||Ay()==="https:"}function Ay(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function UC(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(MC()||Gf()||"connection"in navigator)?navigator.onLine:!0}function FC(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pa{constructor(e,n){this.shortDelay=e,this.longDelay=n,Fn(n>e,"Short delay should be less than long delay!"),this.isMobile=lR()||hR()}get(){return UC()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jf(t,e){Fn(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qE{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Pn("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Pn("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Pn("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jC={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BC=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],zC=new pa(3e4,6e4);function Ku(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function Cs(t,e,n,r,i={}){return HE(t,i,async()=>{let s={},o={};r&&(e==="GET"?o=r:s={body:JSON.stringify(r)});const l=fa({key:t.config.apiKey,...o}).slice(1),u=await t._getAdditionalHeaders();u["Content-Type"]="application/json",t.languageCode&&(u["X-Firebase-Locale"]=t.languageCode);const c={method:e,headers:u,...s};return cR()||(c.referrerPolicy="no-referrer"),t.emulatorConfig&&$n(t.emulatorConfig.host)&&(c.credentials="include"),qE.fetch()(await GE(t,t.config.apiHost,n,l),c)})}async function HE(t,e,n){t._canInitEmulator=!1;const r={...jC,...e};try{const i=new $C(t),s=await Promise.race([n(),i.promise]);i.clearNetworkTimeout();const o=await s.json();if("needConfirmation"in o)throw tl(t,"account-exists-with-different-credential",o);if(s.ok&&!("errorMessage"in o))return o;{const l=s.ok?o.errorMessage:o.error.message,[u,c]=l.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw tl(t,"credential-already-in-use",o);if(u==="EMAIL_EXISTS")throw tl(t,"email-already-in-use",o);if(u==="USER_DISABLED")throw tl(t,"user-disabled",o);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw $E(t,f,c);Un(t,f)}}catch(i){if(i instanceof Ft)throw i;Un(t,"network-request-failed",{message:String(i)})}}async function WE(t,e,n,r,i={}){const s=await Cs(t,e,n,r,i);return"mfaPendingCredential"in s&&Un(t,"multi-factor-auth-required",{_serverResponse:s}),s}async function GE(t,e,n,r){const i=`${e}${n}?${r}`,s=t,o=s.config.emulator?Jf(t.config,i):`${t.config.apiScheme}://${i}`;return BC.includes(n)&&(await s._persistenceManagerAvailable,s._getPersistenceType()==="COOKIE")?s._getPersistence()._getFinalTarget(o).toString():o}class $C{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(gn(this.auth,"network-request-failed")),zC.get())})}}function tl(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const i=gn(t,e,r);return i.customData._tokenResponse=n,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qC(t,e){return Cs(t,"POST","/v1/accounts:delete",e)}async function iu(t,e){return Cs(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Co(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function HC(t,e=!1){const n=ce(t),r=await n.getIdToken(e),i=Zf(r);Q(i&&i.exp&&i.auth_time&&i.iat,n.auth,"internal-error");const s=typeof i.firebase=="object"?i.firebase:void 0,o=s==null?void 0:s.sign_in_provider;return{claims:i,token:r,authTime:Co(wh(i.auth_time)),issuedAtTime:Co(wh(i.iat)),expirationTime:Co(wh(i.exp)),signInProvider:o||null,signInSecondFactor:(s==null?void 0:s.sign_in_second_factor)||null}}function wh(t){return Number(t)*1e3}function Zf(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return El("JWT malformed, contained fewer than 3 sections"),null;try{const i=PE(n);return i?JSON.parse(i):(El("Failed to decode base64 JWT payload"),null)}catch(i){return El("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Sy(t){const e=Zf(t);return Q(e,"internal-error"),Q(typeof e.exp<"u","internal-error"),Q(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ea(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof Ft&&WC(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function WC({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GC{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const n=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),n}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xd{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Co(this.lastLoginAt),this.creationTime=Co(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function su(t){var p;const e=t.auth,n=await t.getIdToken(),r=await ea(t,iu(e,{idToken:n}));Q(r==null?void 0:r.users.length,e,"internal-error");const i=r.users[0];t._notifyReloadListener(i);const s=(p=i.providerUserInfo)!=null&&p.length?KE(i.providerUserInfo):[],o=QC(t.providerData,s),l=t.isAnonymous,u=!(t.email&&i.passwordHash)&&!(o!=null&&o.length),c=l?u:!1,f={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new xd(i.createdAt,i.lastLoginAt),isAnonymous:c};Object.assign(t,f)}async function KC(t){const e=ce(t);await su(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function QC(t,e){return[...t.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function KE(t){return t.map(({providerId:e,...n})=>({providerId:e,uid:n.rawId||"",displayName:n.displayName||null,email:n.email||null,phoneNumber:n.phoneNumber||null,photoURL:n.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function XC(t,e){const n=await HE(t,{},async()=>{const r=fa({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:s}=t.config,o=await GE(t,i,"/v1/token",`key=${s}`),l=await t._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const u={method:"POST",headers:l,body:r};return t.emulatorConfig&&$n(t.emulatorConfig.host)&&(u.credentials="include"),qE.fetch()(o,u)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function YC(t,e){return Cs(t,"POST","/v2/accounts:revokeToken",Ku(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ts{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){Q(e.idToken,"internal-error"),Q(typeof e.idToken<"u","internal-error"),Q(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Sy(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){Q(e.length!==0,"internal-error");const n=Sy(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(Q(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:i,expiresIn:s}=await XC(e,n);this.updateTokensAndExpiration(r,i,Number(s))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:i,expirationTime:s}=n,o=new ts;return r&&(Q(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(Q(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),s&&(Q(typeof s=="number","internal-error",{appName:e}),o.expirationTime=s),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new ts,this.toJSON())}_performRefresh(){return Pn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function er(t,e){Q(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class en{constructor({uid:e,auth:n,stsTokenManager:r,...i}){this.providerId="firebase",this.proactiveRefresh=new GC(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=n,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new xd(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await ea(this,this.stsTokenManager.getToken(this.auth,e));return Q(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return HC(this,e)}reload(){return KC(this)}_assign(e){this!==e&&(Q(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>({...n})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new en({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){Q(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await su(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(kt(this.auth.app))return Promise.reject(Tr(this.auth));const e=await this.getIdToken();return await ea(this,qC(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){const r=n.displayName??void 0,i=n.email??void 0,s=n.phoneNumber??void 0,o=n.photoURL??void 0,l=n.tenantId??void 0,u=n._redirectEventId??void 0,c=n.createdAt??void 0,f=n.lastLoginAt??void 0,{uid:p,emailVerified:m,isAnonymous:I,providerData:R,stsTokenManager:P}=n;Q(p&&P,e,"internal-error");const O=ts.fromJSON(this.name,P);Q(typeof p=="string",e,"internal-error"),er(r,e.name),er(i,e.name),Q(typeof m=="boolean",e,"internal-error"),Q(typeof I=="boolean",e,"internal-error"),er(s,e.name),er(o,e.name),er(l,e.name),er(u,e.name),er(c,e.name),er(f,e.name);const A=new en({uid:p,auth:e,email:i,emailVerified:m,displayName:r,isAnonymous:I,photoURL:o,phoneNumber:s,tenantId:l,stsTokenManager:O,createdAt:c,lastLoginAt:f});return R&&Array.isArray(R)&&(A.providerData=R.map(w=>({...w}))),u&&(A._redirectEventId=u),A}static async _fromIdTokenResponse(e,n,r=!1){const i=new ts;i.updateFromServerResponse(n);const s=new en({uid:n.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await su(s),s}static async _fromGetAccountInfoResponse(e,n,r){const i=n.users[0];Q(i.localId!==void 0,"internal-error");const s=i.providerUserInfo!==void 0?KE(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(s!=null&&s.length),l=new ts;l.updateFromIdToken(r);const u=new en({uid:i.localId,auth:e,stsTokenManager:l,isAnonymous:o}),c={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:s,metadata:new xd(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(s!=null&&s.length)};return Object.assign(u,c),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ky=new Map;function Nn(t){Fn(t instanceof Function,"Expected a class definition");let e=ky.get(t);return e?(Fn(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,ky.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class QE{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}QE.type="NONE";const Ry=QE;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tl(t,e,n){return`firebase:${t}:${e}:${n}`}class ns{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:i,name:s}=this.auth;this.fullUserKey=Tl(this.userKey,i.apiKey,s),this.fullPersistenceKey=Tl("persistence",i.apiKey,s),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await iu(this.auth,{idToken:e}).catch(()=>{});return n?en._fromGetAccountInfoResponse(this.auth,n,e):null}return en._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new ns(Nn(Ry),e,r);const i=(await Promise.all(n.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let s=i[0]||Nn(Ry);const o=Tl(r,e.config.apiKey,e.name);let l=null;for(const c of n)try{const f=await c._get(o);if(f){let p;if(typeof f=="string"){const m=await iu(e,{idToken:f}).catch(()=>{});if(!m)break;p=await en._fromGetAccountInfoResponse(e,m,f)}else p=en._fromJSON(e,f);c!==s&&(l=p),s=c;break}}catch{}const u=i.filter(c=>c._shouldAllowMigration);return!s._shouldAllowMigration||!u.length?new ns(s,e,r):(s=u[0],l&&await s._set(o,l.toJSON()),await Promise.all(n.map(async c=>{if(c!==s)try{await c._remove(o)}catch{}})),new ns(s,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cy(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(ZE(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(XE(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(tT(e))return"Blackberry";if(nT(e))return"Webos";if(YE(e))return"Safari";if((e.includes("chrome/")||JE(e))&&!e.includes("edge/"))return"Chrome";if(eT(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function XE(t=ot()){return/firefox\//i.test(t)}function YE(t=ot()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function JE(t=ot()){return/crios\//i.test(t)}function ZE(t=ot()){return/iemobile/i.test(t)}function eT(t=ot()){return/android/i.test(t)}function tT(t=ot()){return/blackberry/i.test(t)}function nT(t=ot()){return/webos/i.test(t)}function ep(t=ot()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function JC(t=ot()){var e;return ep(t)&&!!((e=window.navigator)!=null&&e.standalone)}function ZC(){return dR()&&document.documentMode===10}function rT(t=ot()){return ep(t)||eT(t)||nT(t)||tT(t)||/windows phone/i.test(t)||ZE(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iT(t,e=[]){let n;switch(t){case"Browser":n=Cy(ot());break;case"Worker":n=`${Cy(ot())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Ti}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eP{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=s=>new Promise((o,l)=>{try{const u=e(s);o(u)}catch(u){l(u)}});r.onAbort=n,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const i of n)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tP(t,e={}){return Cs(t,"GET","/v2/passwordPolicy",Ku(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nP=6;class rP{constructor(e){var r;const n=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=n.minPasswordLength??nP,n.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=n.maxPasswordLength),n.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=n.containsLowercaseCharacter),n.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=n.containsUppercaseCharacter),n.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=n.containsNumericCharacter),n.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=n.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const n={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,n),this.validatePasswordCharacterOptions(e,n),n.isValid&&(n.isValid=n.meetsMinPasswordLength??!0),n.isValid&&(n.isValid=n.meetsMaxPasswordLength??!0),n.isValid&&(n.isValid=n.containsLowercaseLetter??!0),n.isValid&&(n.isValid=n.containsUppercaseLetter??!0),n.isValid&&(n.isValid=n.containsNumericCharacter??!0),n.isValid&&(n.isValid=n.containsNonAlphanumericCharacter??!0),n}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),i&&(n.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,i,s){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iP{constructor(e,n,r,i){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Py(this),this.idTokenSubscription=new Py(this),this.beforeStateQueue=new eP(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=zE,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(s=>this._resolvePersistenceManagerAvailable=s)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Nn(n)),this._initializationPromise=this.queue(async()=>{var r,i,s;if(!this._deleted&&(this.persistenceManager=await ns.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((i=this._popupRedirectResolver)!=null&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)==null?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await iu(this,{idToken:e}),r=await en._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var s;if(kt(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const n=await this.assertedPersistence.getCurrentUser();let r=n,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(s=this.redirectUser)==null?void 0:s._redirectEventId,l=r==null?void 0:r._redirectEventId,u=await this.tryRedirectSignIn(e);(!o||o===l)&&(u!=null&&u.user)&&(r=u.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=n,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return Q(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await su(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=FC()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(kt(this.app))return Promise.reject(Tr(this));const n=e?ce(e):null;return n&&Q(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&Q(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return kt(this.app)?Promise.reject(Tr(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return kt(this.app)?Promise.reject(Tr(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Nn(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await tP(this),n=new rP(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new Ei("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await YC(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Nn(e)||this._popupRedirectResolver;Q(n,this,"argument-error"),this.redirectPersistenceManager=await ns.create(this,[Nn(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)==null?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((n=this.currentUser)==null?void 0:n.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,i){if(this._deleted)return()=>{};const s=typeof n=="function"?n:n.next.bind(n);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(Q(l,this,"internal-error"),l.then(()=>{o||s(this.currentUser)}),typeof n=="function"){const u=e.addObserver(n,r,i);return()=>{o=!0,u()}}else{const u=e.addObserver(n);return()=>{o=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return Q(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=iT(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var i;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const n=await((i=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:i.getHeartbeatsHeader());n&&(e["X-Firebase-Client"]=n);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var n;if(kt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((n=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:n.getToken());return e!=null&&e.error&&LC(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Qu(t){return ce(t)}class Py{constructor(e){this.auth=e,this.observer=null,this.addObserver=_R(n=>this.observer=n)}get next(){return Q(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tp={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function sP(t){tp=t}function oP(t){return tp.loadJS(t)}function aP(){return tp.gapiScript}function lP(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uP(t,e){const n=qn(t,"auth");if(n.isInitialized()){const i=n.getImmediate(),s=n.getOptions();if(En(s,e??{}))return i;Un(i,"already-initialized")}return n.initialize({options:e})}function cP(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(Nn);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function hP(t,e,n){const r=Qu(t);Q(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,s=sT(e),{host:o,port:l}=dP(e),u=l===null?"":`:${l}`,c={url:`${s}//${o}${u}/`},f=Object.freeze({host:o,port:l,protocol:s.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){Q(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),Q(En(c,r.config.emulator)&&En(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=c,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,$n(o)?Wu(`${s}//${o}${u}`):fP()}function sT(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function dP(t){const e=sT(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const s=i[1];return{host:s,port:Ny(r.substr(s.length+1))}}else{const[s,o]=r.split(":");return{host:s,port:Ny(o)}}}function Ny(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function fP(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oT{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return Pn("not implemented")}_getIdTokenResponse(e){return Pn("not implemented")}_linkToIdToken(e,n){return Pn("not implemented")}_getReauthenticationResolver(e){return Pn("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rs(t,e){return WE(t,"POST","/v1/accounts:signInWithIdp",Ku(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pP="http://localhost";class di extends oT{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new di(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Un("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,...s}=n;if(!r||!i)return null;const o=new di(r,i);return o.idToken=s.idToken||void 0,o.accessToken=s.accessToken||void 0,o.secret=s.secret,o.nonce=s.nonce,o.pendingToken=s.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return rs(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,rs(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,rs(e,n)}buildRequest(){const e={requestUri:pP,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=fa(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aT{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ma extends aT{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sr extends ma{constructor(){super("facebook.com")}static credential(e){return di._fromParams({providerId:sr.PROVIDER_ID,signInMethod:sr.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return sr.credentialFromTaggedObject(e)}static credentialFromError(e){return sr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return sr.credential(e.oauthAccessToken)}catch{return null}}}sr.FACEBOOK_SIGN_IN_METHOD="facebook.com";sr.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class or extends ma{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return di._fromParams({providerId:or.PROVIDER_ID,signInMethod:or.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return or.credentialFromTaggedObject(e)}static credentialFromError(e){return or.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return or.credential(n,r)}catch{return null}}}or.GOOGLE_SIGN_IN_METHOD="google.com";or.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ar extends ma{constructor(){super("github.com")}static credential(e){return di._fromParams({providerId:ar.PROVIDER_ID,signInMethod:ar.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ar.credentialFromTaggedObject(e)}static credentialFromError(e){return ar.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ar.credential(e.oauthAccessToken)}catch{return null}}}ar.GITHUB_SIGN_IN_METHOD="github.com";ar.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lr extends ma{constructor(){super("twitter.com")}static credential(e,n){return di._fromParams({providerId:lr.PROVIDER_ID,signInMethod:lr.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return lr.credentialFromTaggedObject(e)}static credentialFromError(e){return lr.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return lr.credential(n,r)}catch{return null}}}lr.TWITTER_SIGN_IN_METHOD="twitter.com";lr.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mP(t,e){return WE(t,"POST","/v1/accounts:signUp",Ku(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,i=!1){const s=await en._fromIdTokenResponse(e,r,i),o=xy(r);return new Cr({user:s,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const i=xy(r);return new Cr({user:e,providerId:i,_tokenResponse:r,operationType:n})}}function xy(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function gP(t){var i;if(kt(t.app))return Promise.reject(Tr(t));const e=Qu(t);if(await e._initializationPromise,(i=e.currentUser)!=null&&i.isAnonymous)return new Cr({user:e.currentUser,providerId:null,operationType:"signIn"});const n=await mP(e,{returnSecureToken:!0}),r=await Cr._fromIdTokenResponse(e,"signIn",n,!0);return await e._updateCurrentUser(r.user),r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ou extends Ft{constructor(e,n,r,i){super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,ou.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,i){return new ou(e,n,r,i)}}function lT(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(s=>{throw s.code==="auth/multi-factor-auth-required"?ou._fromErrorAndOperation(t,s,e,r):s})}async function yP(t,e,n=!1){const r=await ea(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return Cr._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _P(t,e,n=!1){const{auth:r}=t;if(kt(r.app))return Promise.reject(Tr(r));const i="reauthenticate";try{const s=await ea(t,lT(r,i,e,t),n);Q(s.idToken,r,"internal-error");const o=Zf(s.idToken);Q(o,r,"internal-error");const{sub:l}=o;return Q(t.uid===l,r,"user-mismatch"),Cr._forOperation(t,i,s)}catch(s){throw(s==null?void 0:s.code)==="auth/user-not-found"&&Un(r,"user-mismatch"),s}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vP(t,e,n=!1){if(kt(t.app))return Promise.reject(Tr(t));const r="signIn",i=await lT(t,r,e),s=await Cr._fromIdTokenResponse(t,r,i);return n||await t._updateCurrentUser(s.user),s}function wP(t,e,n,r){return ce(t).onIdTokenChanged(e,n,r)}function EP(t,e,n){return ce(t).beforeAuthStateChanged(e,n)}const au="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uT{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(au,"1"),this.storage.removeItem(au),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const TP=1e3,IP=10;class cT extends uT{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=rT(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),i=this.localCache[n];r!==i&&e(n,i,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,l,u)=>{this.notifyListeners(o,u)});return}const r=e.key;n?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},s=this.storage.getItem(r);ZC()&&s!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,IP):i()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},TP)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}cT.type="LOCAL";const AP=cT;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hT extends uT{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}hT.type="SESSION";const dT=hT;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function SP(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xu{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(i=>i.isListeningto(e));if(n)return n;const r=new Xu(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:i,data:s}=n.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const l=Array.from(o).map(async c=>c(n.origin,s)),u=await SP(l);n.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:u})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Xu.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function np(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kP{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let s,o;return new Promise((l,u)=>{const c=np("",20);i.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(p){const m=p;if(m.data.eventId===c)switch(m.data.status){case"ack":clearTimeout(f),s=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(s),l(m.data.response);break;default:clearTimeout(f),clearTimeout(s),u(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:n},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yn(){return window}function RP(t){yn().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fT(){return typeof yn().WorkerGlobalScope<"u"&&typeof yn().importScripts=="function"}async function CP(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function PP(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)==null?void 0:t.controller)||null}function NP(){return fT()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pT="firebaseLocalStorageDb",xP=1,lu="firebaseLocalStorage",mT="fbase_key";class ga{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Yu(t,e){return t.transaction([lu],e?"readwrite":"readonly").objectStore(lu)}function DP(){const t=indexedDB.deleteDatabase(pT);return new ga(t).toPromise()}function gT(){const t=indexedDB.open(pT,xP);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(lu,{keyPath:mT})}catch(i){n(i)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(lu)?e(r):(r.close(),await DP(),e(await gT()))})})}async function Dy(t,e,n){const r=Yu(t,!0).put({[mT]:e,value:n});return new ga(r).toPromise()}async function bP(t,e){const n=Yu(t,!1).get(e),r=await new ga(n).toPromise();return r===void 0?null:r.value}function by(t,e){const n=Yu(t,!0).delete(e);return new ga(n).toPromise()}const VP=800,OP=3;class yT{constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=gT(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>OP)throw r;this.dbPromise&&((await this.dbPromise).close(),this.dbPromise=null)}}async initializeServiceWorkerMessaging(){return fT()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Xu._getInstance(NP()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var n,r;if(this.activeServiceWorker=await CP(),!this.activeServiceWorker)return;this.sender=new kP(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(n=e[0])!=null&&n.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||PP()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await Dy(e,au,"1"),await by(e,au)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Dy(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>bP(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>by(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(i=>{const s=Yu(i,!1).getAll();return new ga(s).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:s}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(s)&&(this.notifyListeners(i,s),n.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),n.push(i));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),VP)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}yT.type="LOCAL";const LP=yT;new pa(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function MP(t,e){return e?Nn(e):(Q(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rp extends oT{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return rs(e,this._buildIdpRequest())}_linkToIdToken(e,n){return rs(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return rs(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function UP(t){return vP(t.auth,new rp(t),t.bypassAuthState)}function FP(t){const{auth:e,user:n}=t;return Q(n,e,"internal-error"),_P(n,new rp(t),t.bypassAuthState)}async function jP(t){const{auth:e,user:n}=t;return Q(n,e,"internal-error"),yP(n,new rp(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _T{constructor(e,n,r,i,s=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=s,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:i,tenantId:s,error:o,type:l}=e;if(o){this.reject(o);return}const u={auth:this.auth,requestUri:n,sessionId:r,tenantId:s||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(u))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return UP;case"linkViaPopup":case"linkViaRedirect":return jP;case"reauthViaPopup":case"reauthViaRedirect":return FP;default:Un(this.auth,"internal-error")}}resolve(e){Fn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Fn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BP=new pa(2e3,1e4);class Gi extends _T{constructor(e,n,r,i,s){super(e,n,i,s),this.provider=r,this.authWindow=null,this.pollId=null,Gi.currentPopupAction&&Gi.currentPopupAction.cancel(),Gi.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return Q(e,this.auth,"internal-error"),e}async onExecution(){Fn(this.filter.length===1,"Popup operations only handle one event");const e=np();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(gn(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(gn(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Gi.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if((r=(n=this.authWindow)==null?void 0:n.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(gn(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,BP.get())};e()}}Gi.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zP="pendingRedirect",Il=new Map;class $P extends _T{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Il.get(this.auth._key());if(!e){try{const r=await qP(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Il.set(this.auth._key(),e)}return this.bypassAuthState||Il.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function qP(t,e){const n=GP(e),r=WP(t);if(!await r._isAvailable())return!1;const i=await r._get(n)==="true";return await r._remove(n),i}function HP(t,e){Il.set(t._key(),e)}function WP(t){return Nn(t._redirectPersistence)}function GP(t){return Tl(zP,t.config.apiKey,t.name)}async function KP(t,e,n=!1){if(kt(t.app))return Promise.reject(Tr(t));const r=Qu(t),i=MP(r,e),o=await new $P(r,i,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QP=10*60*1e3;class XP{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!YP(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!vT(e)){const i=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";n.onError(gn(this.auth,i))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=QP&&this.cachedEventUids.clear(),this.cachedEventUids.has(Vy(e))}saveEventToCache(e){this.cachedEventUids.add(Vy(e)),this.lastProcessedEventTime=Date.now()}}function Vy(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function vT({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function YP(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return vT(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function JP(t,e={}){return Cs(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ZP=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,e1=/^https?/;async function t1(t){if(t.config.emulator)return;const{authorizedDomains:e}=await JP(t);for(const n of e)try{if(n1(n))return}catch{}Un(t,"unauthorized-domain")}function n1(t){const e=Nd(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!e1.test(n))return!1;if(ZP.test(t))return r===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const r1=new pa(3e4,6e4);function Oy(){const t=yn().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function i1(t){return new Promise((e,n)=>{var i,s,o;function r(){Oy(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Oy(),n(gn(t,"network-request-failed"))},timeout:r1.get()})}if((s=(i=yn().gapi)==null?void 0:i.iframes)!=null&&s.Iframe)e(gapi.iframes.getContext());else if((o=yn().gapi)!=null&&o.load)r();else{const l=lP("iframefcb");return yn()[l]=()=>{gapi.load?r():n(gn(t,"network-request-failed"))},oP(`${aP()}?onload=${l}`).catch(u=>n(u))}}).catch(e=>{throw Al=null,e})}let Al=null;function s1(t){return Al=Al||i1(t),Al}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const o1=new pa(5e3,15e3),a1="__/auth/iframe",l1="emulator/auth/iframe",u1={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},c1=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function h1(t){const e=t.config;Q(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Jf(e,l1):`https://${t.config.authDomain}/${a1}`,r={apiKey:e.apiKey,appName:t.name,v:Ti},i=c1.get(t.config.apiHost);i&&(r.eid=i);const s=t._getFrameworks();return s.length&&(r.fw=s.join(",")),`${n}?${fa(r).slice(1)}`}async function d1(t){const e=await s1(t),n=yn().gapi;return Q(n,t,"internal-error"),e.open({where:document.body,url:h1(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:u1,dontclear:!0},r=>new Promise(async(i,s)=>{await r.restyle({setHideOnLeave:!1});const o=gn(t,"network-request-failed"),l=yn().setTimeout(()=>{s(o)},o1.get());function u(){yn().clearTimeout(l),i(r)}r.ping(u).then(u,()=>{s(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const f1={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},p1=500,m1=600,g1="_blank",y1="http://localhost";class Ly{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function _1(t,e,n,r=p1,i=m1){const s=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const u={...f1,width:r.toString(),height:i.toString(),top:s,left:o},c=ot().toLowerCase();n&&(l=JE(c)?g1:n),XE(c)&&(e=e||y1,u.scrollbars="yes");const f=Object.entries(u).reduce((m,[I,R])=>`${m}${I}=${R},`,"");if(JC(c)&&l!=="_self")return v1(e||"",l),new Ly(null);const p=window.open(e||"",l,f);Q(p,t,"popup-blocked");try{p.focus()}catch{}return new Ly(p)}function v1(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const w1="__/auth/handler",E1="emulator/auth/handler",T1=encodeURIComponent("fac");async function My(t,e,n,r,i,s){Q(t.config.authDomain,t,"auth-domain-config-required"),Q(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Ti,eventId:i};if(e instanceof aT){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",yR(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))o[f]=p}if(e instanceof ma){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(o.scopes=f.join(","))}t.tenantId&&(o.tid=t.tenantId);const l=o;for(const f of Object.keys(l))l[f]===void 0&&delete l[f];const u=await t._getAppCheckToken(),c=u?`#${T1}=${encodeURIComponent(u)}`:"";return`${I1(t)}?${fa(l).slice(1)}${c}`}function I1({config:t}){return t.emulator?Jf(t,E1):`https://${t.authDomain}/${w1}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eh="webStorageSupport";class A1{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=dT,this._completeRedirectFn=KP,this._overrideRedirectResult=HP}async _openPopup(e,n,r,i){var o;Fn((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const s=await My(e,n,r,Nd(),i);return _1(e,s,np())}async _openRedirect(e,n,r,i){await this._originValidation(e);const s=await My(e,n,r,Nd(),i);return RP(s),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:i,promise:s}=this.eventManagers[n];return i?Promise.resolve(i):(Fn(s,"If manager is not set, promise should be"),s)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await d1(e),r=new XP(e);return n.register("authEvent",i=>(Q(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Eh,{type:Eh},i=>{var o;const s=(o=i==null?void 0:i[0])==null?void 0:o[Eh];s!==void 0&&n(!!s),Un(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=t1(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return rT()||YE()||ep()}}const S1=A1;var Uy="@firebase/auth",Fy="1.13.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k1{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){Q(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function R1(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function C1(t){Gt(new Lt("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),s=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=r.options;Q(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:o,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:iT(t)},c=new iP(r,i,s,u);return cP(c,n),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Gt(new Lt("auth-internal",e=>{const n=Qu(e.getProvider("auth").getImmediate());return(r=>new k1(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),it(Uy,Fy,R1(t)),it(Uy,Fy,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const P1=5*60,N1=DE("authIdTokenMaxAge")||P1;let jy=null;const x1=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>N1)return;const i=n==null?void 0:n.token;jy!==i&&(jy=i,await fetch(t,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function D1(t=Rs()){const e=qn(t,"auth");if(e.isInitialized())return e.getImmediate();const n=uP(t,{popupRedirectResolver:S1,persistence:[LP,AP,dT]}),r=DE("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const s=new URL(r,location.origin);if(location.origin===s.origin){const o=x1(s.toString());EP(n,o,()=>o(n.currentUser)),wP(n,l=>o(l))}}const i=NE("auth");return i&&hP(n,`http://${i}`),n}function b1(){var t;return((t=document.getElementsByTagName("head"))==null?void 0:t[0])??document}sP({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=i=>{const s=gn("internal-error");s.customData=i,n(s)},r.type="text/javascript",r.charset="UTF-8",b1().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});C1("Browser");var By=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ir,wT;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(v,y){function _(){}_.prototype=y.prototype,v.F=y.prototype,v.prototype=new _,v.prototype.constructor=v,v.D=function(E,S,C){for(var T=Array(arguments.length-2),qe=2;qe<arguments.length;qe++)T[qe-2]=arguments[qe];return y.prototype[S].apply(E,T)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,n),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(v,y,_){_||(_=0);const E=Array(16);if(typeof y=="string")for(var S=0;S<16;++S)E[S]=y.charCodeAt(_++)|y.charCodeAt(_++)<<8|y.charCodeAt(_++)<<16|y.charCodeAt(_++)<<24;else for(S=0;S<16;++S)E[S]=y[_++]|y[_++]<<8|y[_++]<<16|y[_++]<<24;y=v.g[0],_=v.g[1],S=v.g[2];let C=v.g[3],T;T=y+(C^_&(S^C))+E[0]+3614090360&4294967295,y=_+(T<<7&4294967295|T>>>25),T=C+(S^y&(_^S))+E[1]+3905402710&4294967295,C=y+(T<<12&4294967295|T>>>20),T=S+(_^C&(y^_))+E[2]+606105819&4294967295,S=C+(T<<17&4294967295|T>>>15),T=_+(y^S&(C^y))+E[3]+3250441966&4294967295,_=S+(T<<22&4294967295|T>>>10),T=y+(C^_&(S^C))+E[4]+4118548399&4294967295,y=_+(T<<7&4294967295|T>>>25),T=C+(S^y&(_^S))+E[5]+1200080426&4294967295,C=y+(T<<12&4294967295|T>>>20),T=S+(_^C&(y^_))+E[6]+2821735955&4294967295,S=C+(T<<17&4294967295|T>>>15),T=_+(y^S&(C^y))+E[7]+4249261313&4294967295,_=S+(T<<22&4294967295|T>>>10),T=y+(C^_&(S^C))+E[8]+1770035416&4294967295,y=_+(T<<7&4294967295|T>>>25),T=C+(S^y&(_^S))+E[9]+2336552879&4294967295,C=y+(T<<12&4294967295|T>>>20),T=S+(_^C&(y^_))+E[10]+4294925233&4294967295,S=C+(T<<17&4294967295|T>>>15),T=_+(y^S&(C^y))+E[11]+2304563134&4294967295,_=S+(T<<22&4294967295|T>>>10),T=y+(C^_&(S^C))+E[12]+1804603682&4294967295,y=_+(T<<7&4294967295|T>>>25),T=C+(S^y&(_^S))+E[13]+4254626195&4294967295,C=y+(T<<12&4294967295|T>>>20),T=S+(_^C&(y^_))+E[14]+2792965006&4294967295,S=C+(T<<17&4294967295|T>>>15),T=_+(y^S&(C^y))+E[15]+1236535329&4294967295,_=S+(T<<22&4294967295|T>>>10),T=y+(S^C&(_^S))+E[1]+4129170786&4294967295,y=_+(T<<5&4294967295|T>>>27),T=C+(_^S&(y^_))+E[6]+3225465664&4294967295,C=y+(T<<9&4294967295|T>>>23),T=S+(y^_&(C^y))+E[11]+643717713&4294967295,S=C+(T<<14&4294967295|T>>>18),T=_+(C^y&(S^C))+E[0]+3921069994&4294967295,_=S+(T<<20&4294967295|T>>>12),T=y+(S^C&(_^S))+E[5]+3593408605&4294967295,y=_+(T<<5&4294967295|T>>>27),T=C+(_^S&(y^_))+E[10]+38016083&4294967295,C=y+(T<<9&4294967295|T>>>23),T=S+(y^_&(C^y))+E[15]+3634488961&4294967295,S=C+(T<<14&4294967295|T>>>18),T=_+(C^y&(S^C))+E[4]+3889429448&4294967295,_=S+(T<<20&4294967295|T>>>12),T=y+(S^C&(_^S))+E[9]+568446438&4294967295,y=_+(T<<5&4294967295|T>>>27),T=C+(_^S&(y^_))+E[14]+3275163606&4294967295,C=y+(T<<9&4294967295|T>>>23),T=S+(y^_&(C^y))+E[3]+4107603335&4294967295,S=C+(T<<14&4294967295|T>>>18),T=_+(C^y&(S^C))+E[8]+1163531501&4294967295,_=S+(T<<20&4294967295|T>>>12),T=y+(S^C&(_^S))+E[13]+2850285829&4294967295,y=_+(T<<5&4294967295|T>>>27),T=C+(_^S&(y^_))+E[2]+4243563512&4294967295,C=y+(T<<9&4294967295|T>>>23),T=S+(y^_&(C^y))+E[7]+1735328473&4294967295,S=C+(T<<14&4294967295|T>>>18),T=_+(C^y&(S^C))+E[12]+2368359562&4294967295,_=S+(T<<20&4294967295|T>>>12),T=y+(_^S^C)+E[5]+4294588738&4294967295,y=_+(T<<4&4294967295|T>>>28),T=C+(y^_^S)+E[8]+2272392833&4294967295,C=y+(T<<11&4294967295|T>>>21),T=S+(C^y^_)+E[11]+1839030562&4294967295,S=C+(T<<16&4294967295|T>>>16),T=_+(S^C^y)+E[14]+4259657740&4294967295,_=S+(T<<23&4294967295|T>>>9),T=y+(_^S^C)+E[1]+2763975236&4294967295,y=_+(T<<4&4294967295|T>>>28),T=C+(y^_^S)+E[4]+1272893353&4294967295,C=y+(T<<11&4294967295|T>>>21),T=S+(C^y^_)+E[7]+4139469664&4294967295,S=C+(T<<16&4294967295|T>>>16),T=_+(S^C^y)+E[10]+3200236656&4294967295,_=S+(T<<23&4294967295|T>>>9),T=y+(_^S^C)+E[13]+681279174&4294967295,y=_+(T<<4&4294967295|T>>>28),T=C+(y^_^S)+E[0]+3936430074&4294967295,C=y+(T<<11&4294967295|T>>>21),T=S+(C^y^_)+E[3]+3572445317&4294967295,S=C+(T<<16&4294967295|T>>>16),T=_+(S^C^y)+E[6]+76029189&4294967295,_=S+(T<<23&4294967295|T>>>9),T=y+(_^S^C)+E[9]+3654602809&4294967295,y=_+(T<<4&4294967295|T>>>28),T=C+(y^_^S)+E[12]+3873151461&4294967295,C=y+(T<<11&4294967295|T>>>21),T=S+(C^y^_)+E[15]+530742520&4294967295,S=C+(T<<16&4294967295|T>>>16),T=_+(S^C^y)+E[2]+3299628645&4294967295,_=S+(T<<23&4294967295|T>>>9),T=y+(S^(_|~C))+E[0]+4096336452&4294967295,y=_+(T<<6&4294967295|T>>>26),T=C+(_^(y|~S))+E[7]+1126891415&4294967295,C=y+(T<<10&4294967295|T>>>22),T=S+(y^(C|~_))+E[14]+2878612391&4294967295,S=C+(T<<15&4294967295|T>>>17),T=_+(C^(S|~y))+E[5]+4237533241&4294967295,_=S+(T<<21&4294967295|T>>>11),T=y+(S^(_|~C))+E[12]+1700485571&4294967295,y=_+(T<<6&4294967295|T>>>26),T=C+(_^(y|~S))+E[3]+2399980690&4294967295,C=y+(T<<10&4294967295|T>>>22),T=S+(y^(C|~_))+E[10]+4293915773&4294967295,S=C+(T<<15&4294967295|T>>>17),T=_+(C^(S|~y))+E[1]+2240044497&4294967295,_=S+(T<<21&4294967295|T>>>11),T=y+(S^(_|~C))+E[8]+1873313359&4294967295,y=_+(T<<6&4294967295|T>>>26),T=C+(_^(y|~S))+E[15]+4264355552&4294967295,C=y+(T<<10&4294967295|T>>>22),T=S+(y^(C|~_))+E[6]+2734768916&4294967295,S=C+(T<<15&4294967295|T>>>17),T=_+(C^(S|~y))+E[13]+1309151649&4294967295,_=S+(T<<21&4294967295|T>>>11),T=y+(S^(_|~C))+E[4]+4149444226&4294967295,y=_+(T<<6&4294967295|T>>>26),T=C+(_^(y|~S))+E[11]+3174756917&4294967295,C=y+(T<<10&4294967295|T>>>22),T=S+(y^(C|~_))+E[2]+718787259&4294967295,S=C+(T<<15&4294967295|T>>>17),T=_+(C^(S|~y))+E[9]+3951481745&4294967295,v.g[0]=v.g[0]+y&4294967295,v.g[1]=v.g[1]+(S+(T<<21&4294967295|T>>>11))&4294967295,v.g[2]=v.g[2]+S&4294967295,v.g[3]=v.g[3]+C&4294967295}r.prototype.v=function(v,y){y===void 0&&(y=v.length);const _=y-this.blockSize,E=this.C;let S=this.h,C=0;for(;C<y;){if(S==0)for(;C<=_;)i(this,v,C),C+=this.blockSize;if(typeof v=="string"){for(;C<y;)if(E[S++]=v.charCodeAt(C++),S==this.blockSize){i(this,E),S=0;break}}else for(;C<y;)if(E[S++]=v[C++],S==this.blockSize){i(this,E),S=0;break}}this.h=S,this.o+=y},r.prototype.A=function(){var v=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);v[0]=128;for(var y=1;y<v.length-8;++y)v[y]=0;y=this.o*8;for(var _=v.length-8;_<v.length;++_)v[_]=y&255,y/=256;for(this.v(v),v=Array(16),y=0,_=0;_<4;++_)for(let E=0;E<32;E+=8)v[y++]=this.g[_]>>>E&255;return v};function s(v,y){var _=l;return Object.prototype.hasOwnProperty.call(_,v)?_[v]:_[v]=y(v)}function o(v,y){this.h=y;const _=[];let E=!0;for(let S=v.length-1;S>=0;S--){const C=v[S]|0;E&&C==y||(_[S]=C,E=!1)}this.g=_}var l={};function u(v){return-128<=v&&v<128?s(v,function(y){return new o([y|0],y<0?-1:0)}):new o([v|0],v<0?-1:0)}function c(v){if(isNaN(v)||!isFinite(v))return p;if(v<0)return O(c(-v));const y=[];let _=1;for(let E=0;v>=_;E++)y[E]=v/_|0,_*=4294967296;return new o(y,0)}function f(v,y){if(v.length==0)throw Error("number format error: empty string");if(y=y||10,y<2||36<y)throw Error("radix out of range: "+y);if(v.charAt(0)=="-")return O(f(v.substring(1),y));if(v.indexOf("-")>=0)throw Error('number format error: interior "-" character');const _=c(Math.pow(y,8));let E=p;for(let C=0;C<v.length;C+=8){var S=Math.min(8,v.length-C);const T=parseInt(v.substring(C,C+S),y);S<8?(S=c(Math.pow(y,S)),E=E.j(S).add(c(T))):(E=E.j(_),E=E.add(c(T)))}return E}var p=u(0),m=u(1),I=u(16777216);t=o.prototype,t.m=function(){if(P(this))return-O(this).m();let v=0,y=1;for(let _=0;_<this.g.length;_++){const E=this.i(_);v+=(E>=0?E:4294967296+E)*y,y*=4294967296}return v},t.toString=function(v){if(v=v||10,v<2||36<v)throw Error("radix out of range: "+v);if(R(this))return"0";if(P(this))return"-"+O(this).toString(v);const y=c(Math.pow(v,6));var _=this;let E="";for(;;){const S=b(_,y).g;_=A(_,S.j(y));let C=((_.g.length>0?_.g[0]:_.h)>>>0).toString(v);if(_=S,R(_))return C+E;for(;C.length<6;)C="0"+C;E=C+E}},t.i=function(v){return v<0?0:v<this.g.length?this.g[v]:this.h};function R(v){if(v.h!=0)return!1;for(let y=0;y<v.g.length;y++)if(v.g[y]!=0)return!1;return!0}function P(v){return v.h==-1}t.l=function(v){return v=A(this,v),P(v)?-1:R(v)?0:1};function O(v){const y=v.g.length,_=[];for(let E=0;E<y;E++)_[E]=~v.g[E];return new o(_,~v.h).add(m)}t.abs=function(){return P(this)?O(this):this},t.add=function(v){const y=Math.max(this.g.length,v.g.length),_=[];let E=0;for(let S=0;S<=y;S++){let C=E+(this.i(S)&65535)+(v.i(S)&65535),T=(C>>>16)+(this.i(S)>>>16)+(v.i(S)>>>16);E=T>>>16,C&=65535,T&=65535,_[S]=T<<16|C}return new o(_,_[_.length-1]&-2147483648?-1:0)};function A(v,y){return v.add(O(y))}t.j=function(v){if(R(this)||R(v))return p;if(P(this))return P(v)?O(this).j(O(v)):O(O(this).j(v));if(P(v))return O(this.j(O(v)));if(this.l(I)<0&&v.l(I)<0)return c(this.m()*v.m());const y=this.g.length+v.g.length,_=[];for(var E=0;E<2*y;E++)_[E]=0;for(E=0;E<this.g.length;E++)for(let S=0;S<v.g.length;S++){const C=this.i(E)>>>16,T=this.i(E)&65535,qe=v.i(S)>>>16,An=v.i(S)&65535;_[2*E+2*S]+=T*An,w(_,2*E+2*S),_[2*E+2*S+1]+=C*An,w(_,2*E+2*S+1),_[2*E+2*S+1]+=T*qe,w(_,2*E+2*S+1),_[2*E+2*S+2]+=C*qe,w(_,2*E+2*S+2)}for(v=0;v<y;v++)_[v]=_[2*v+1]<<16|_[2*v];for(v=y;v<2*y;v++)_[v]=0;return new o(_,0)};function w(v,y){for(;(v[y]&65535)!=v[y];)v[y+1]+=v[y]>>>16,v[y]&=65535,y++}function k(v,y){this.g=v,this.h=y}function b(v,y){if(R(y))throw Error("division by zero");if(R(v))return new k(p,p);if(P(v))return y=b(O(v),y),new k(O(y.g),O(y.h));if(P(y))return y=b(v,O(y)),new k(O(y.g),y.h);if(v.g.length>30){if(P(v)||P(y))throw Error("slowDivide_ only works with positive integers.");for(var _=m,E=y;E.l(v)<=0;)_=F(_),E=F(E);var S=M(_,1),C=M(E,1);for(E=M(E,2),_=M(_,2);!R(E);){var T=C.add(E);T.l(v)<=0&&(S=S.add(_),C=T),E=M(E,1),_=M(_,1)}return y=A(v,S.j(y)),new k(S,y)}for(S=p;v.l(y)>=0;){for(_=Math.max(1,Math.floor(v.m()/y.m())),E=Math.ceil(Math.log(_)/Math.LN2),E=E<=48?1:Math.pow(2,E-48),C=c(_),T=C.j(y);P(T)||T.l(v)>0;)_-=E,C=c(_),T=C.j(y);R(C)&&(C=m),S=S.add(C),v=A(v,T)}return new k(S,v)}t.B=function(v){return b(this,v).h},t.and=function(v){const y=Math.max(this.g.length,v.g.length),_=[];for(let E=0;E<y;E++)_[E]=this.i(E)&v.i(E);return new o(_,this.h&v.h)},t.or=function(v){const y=Math.max(this.g.length,v.g.length),_=[];for(let E=0;E<y;E++)_[E]=this.i(E)|v.i(E);return new o(_,this.h|v.h)},t.xor=function(v){const y=Math.max(this.g.length,v.g.length),_=[];for(let E=0;E<y;E++)_[E]=this.i(E)^v.i(E);return new o(_,this.h^v.h)};function F(v){const y=v.g.length+1,_=[];for(let E=0;E<y;E++)_[E]=v.i(E)<<1|v.i(E-1)>>>31;return new o(_,v.h)}function M(v,y){const _=y>>5;y%=32;const E=v.g.length-_,S=[];for(let C=0;C<E;C++)S[C]=y>0?v.i(C+_)>>>y|v.i(C+_+1)<<32-y:v.i(C+_);return new o(S,v.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,wT=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=c,o.fromString=f,Ir=o}).apply(typeof By<"u"?By:typeof self<"u"?self:typeof window<"u"?window:{});var nl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ET,mo,TT,Sl,Dd,IT,AT,ST;(function(){var t,e=Object.defineProperty;function n(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof nl=="object"&&nl];for(var h=0;h<a.length;++h){var d=a[h];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=n(this);function i(a,h){if(h)e:{var d=r;a=a.split(".");for(var g=0;g<a.length-1;g++){var N=a[g];if(!(N in d))break e;d=d[N]}a=a[a.length-1],g=d[a],h=h(g),h!=g&&h!=null&&e(d,a,{configurable:!0,writable:!0,value:h})}}i("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),i("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),i("Object.entries",function(a){return a||function(h){var d=[],g;for(g in h)Object.prototype.hasOwnProperty.call(h,g)&&d.push([g,h[g]]);return d}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var s=s||{},o=this||self;function l(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function u(a,h,d){return a.call.apply(a.bind,arguments)}function c(a,h,d){return c=u,c.apply(null,arguments)}function f(a,h){var d=Array.prototype.slice.call(arguments,1);return function(){var g=d.slice();return g.push.apply(g,arguments),a.apply(this,g)}}function p(a,h){function d(){}d.prototype=h.prototype,a.Z=h.prototype,a.prototype=new d,a.prototype.constructor=a,a.Ob=function(g,N,D){for(var j=Array(arguments.length-2),Z=2;Z<arguments.length;Z++)j[Z-2]=arguments[Z];return h.prototype[N].apply(g,j)}}var m=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function I(a){const h=a.length;if(h>0){const d=Array(h);for(let g=0;g<h;g++)d[g]=a[g];return d}return[]}function R(a,h){for(let g=1;g<arguments.length;g++){const N=arguments[g];var d=typeof N;if(d=d!="object"?d:N?Array.isArray(N)?"array":d:"null",d=="array"||d=="object"&&typeof N.length=="number"){d=a.length||0;const D=N.length||0;a.length=d+D;for(let j=0;j<D;j++)a[d+j]=N[j]}else a.push(N)}}class P{constructor(h,d){this.i=h,this.j=d,this.h=0,this.g=null}get(){let h;return this.h>0?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function O(a){o.setTimeout(()=>{throw a},0)}function A(){var a=v;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class w{constructor(){this.h=this.g=null}add(h,d){const g=k.get();g.set(h,d),this.h?this.h.next=g:this.g=g,this.h=g}}var k=new P(()=>new b,a=>a.reset());class b{constructor(){this.next=this.g=this.h=null}set(h,d){this.h=h,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let F,M=!1,v=new w,y=()=>{const a=Promise.resolve(void 0);F=()=>{a.then(_)}};function _(){for(var a;a=A();){try{a.h.call(a.g)}catch(d){O(d)}var h=k;h.j(a),h.h<100&&(h.h++,a.next=h.g,h.g=a)}M=!1}function E(){this.u=this.u,this.C=this.C}E.prototype.u=!1,E.prototype.dispose=function(){this.u||(this.u=!0,this.N())},E.prototype[Symbol.dispose]=function(){this.dispose()},E.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function S(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}S.prototype.h=function(){this.defaultPrevented=!0};var C=function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};o.addEventListener("test",d,h),o.removeEventListener("test",d,h)}catch{}return a}();function T(a){return/^[\s\xa0]*$/.test(a)}function qe(a,h){S.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,h)}p(qe,S),qe.prototype.init=function(a,h){const d=this.type=a.type,g=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget,h||(d=="mouseover"?h=a.fromElement:d=="mouseout"&&(h=a.toElement)),this.relatedTarget=h,g?(this.clientX=g.clientX!==void 0?g.clientX:g.pageX,this.clientY=g.clientY!==void 0?g.clientY:g.pageY,this.screenX=g.screenX||0,this.screenY=g.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&qe.Z.h.call(this)},qe.prototype.h=function(){qe.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var An="closure_listenable_"+(Math.random()*1e6|0),Vs=0;function Os(a,h,d,g,N){this.listener=a,this.proxy=null,this.src=h,this.type=d,this.capture=!!g,this.ha=N,this.key=++Vs,this.da=this.fa=!1}function $(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function X(a,h,d){for(const g in a)h.call(d,a[g],g,a)}function J(a,h){for(const d in a)h.call(void 0,a[d],d,a)}function ye(a){const h={};for(const d in a)h[d]=a[d];return h}const Ce="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function zr(a,h){let d,g;for(let N=1;N<arguments.length;N++){g=arguments[N];for(d in g)a[d]=g[d];for(let D=0;D<Ce.length;D++)d=Ce[D],Object.prototype.hasOwnProperty.call(g,d)&&(a[d]=g[d])}}function jt(a){this.src=a,this.g={},this.h=0}jt.prototype.add=function(a,h,d,g,N){const D=a.toString();a=this.g[D],a||(a=this.g[D]=[],this.h++);const j=Qt(a,h,g,N);return j>-1?(h=a[j],d||(h.fa=!1)):(h=new Os(h,this.src,D,!!g,N),h.fa=d,a.push(h)),h};function $r(a,h){const d=h.type;if(d in a.g){var g=a.g[d],N=Array.prototype.indexOf.call(g,h,void 0),D;(D=N>=0)&&Array.prototype.splice.call(g,N,1),D&&($(h),a.g[d].length==0&&(delete a.g[d],a.h--))}}function Qt(a,h,d,g){for(let N=0;N<a.length;++N){const D=a[N];if(!D.da&&D.listener==h&&D.capture==!!d&&D.ha==g)return N}return-1}var Wn="closure_lm_"+(Math.random()*1e6|0),Tc={};function om(a,h,d,g,N){if(Array.isArray(h)){for(let D=0;D<h.length;D++)om(a,h[D],d,g,N);return null}return d=um(d),a&&a[An]?a.J(h,d,l(g)?!!g.capture:!1,N):J0(a,h,d,!1,g,N)}function J0(a,h,d,g,N,D){if(!h)throw Error("Invalid event type");const j=l(N)?!!N.capture:!!N;let Z=Ac(a);if(Z||(a[Wn]=Z=new jt(a)),d=Z.add(h,d,g,j,D),d.proxy)return d;if(g=Z0(),d.proxy=g,g.src=a,g.listener=d,a.addEventListener)C||(N=j),N===void 0&&(N=!1),a.addEventListener(h.toString(),g,N);else if(a.attachEvent)a.attachEvent(lm(h.toString()),g);else if(a.addListener&&a.removeListener)a.addListener(g);else throw Error("addEventListener and attachEvent are unavailable.");return d}function Z0(){function a(d){return h.call(a.src,a.listener,d)}const h=eA;return a}function am(a,h,d,g,N){if(Array.isArray(h))for(var D=0;D<h.length;D++)am(a,h[D],d,g,N);else g=l(g)?!!g.capture:!!g,d=um(d),a&&a[An]?(a=a.i,D=String(h).toString(),D in a.g&&(h=a.g[D],d=Qt(h,d,g,N),d>-1&&($(h[d]),Array.prototype.splice.call(h,d,1),h.length==0&&(delete a.g[D],a.h--)))):a&&(a=Ac(a))&&(h=a.g[h.toString()],a=-1,h&&(a=Qt(h,d,g,N)),(d=a>-1?h[a]:null)&&Ic(d))}function Ic(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[An])$r(h.i,a);else{var d=a.type,g=a.proxy;h.removeEventListener?h.removeEventListener(d,g,a.capture):h.detachEvent?h.detachEvent(lm(d),g):h.addListener&&h.removeListener&&h.removeListener(g),(d=Ac(h))?($r(d,a),d.h==0&&(d.src=null,h[Wn]=null)):$(a)}}}function lm(a){return a in Tc?Tc[a]:Tc[a]="on"+a}function eA(a,h){if(a.da)a=!0;else{h=new qe(h,this);const d=a.listener,g=a.ha||a.src;a.fa&&Ic(a),a=d.call(g,h)}return a}function Ac(a){return a=a[Wn],a instanceof jt?a:null}var Sc="__closure_events_fn_"+(Math.random()*1e9>>>0);function um(a){return typeof a=="function"?a:(a[Sc]||(a[Sc]=function(h){return a.handleEvent(h)}),a[Sc])}function Je(){E.call(this),this.i=new jt(this),this.M=this,this.G=null}p(Je,E),Je.prototype[An]=!0,Je.prototype.removeEventListener=function(a,h,d,g){am(this,a,h,d,g)};function at(a,h){var d,g=a.G;if(g)for(d=[];g;g=g.G)d.push(g);if(a=a.M,g=h.type||h,typeof h=="string")h=new S(h,a);else if(h instanceof S)h.target=h.target||a;else{var N=h;h=new S(g,a),zr(h,N)}N=!0;let D,j;if(d)for(j=d.length-1;j>=0;j--)D=h.g=d[j],N=ka(D,g,!0,h)&&N;if(D=h.g=a,N=ka(D,g,!0,h)&&N,N=ka(D,g,!1,h)&&N,d)for(j=0;j<d.length;j++)D=h.g=d[j],N=ka(D,g,!1,h)&&N}Je.prototype.N=function(){if(Je.Z.N.call(this),this.i){var a=this.i;for(const h in a.g){const d=a.g[h];for(let g=0;g<d.length;g++)$(d[g]);delete a.g[h],a.h--}}this.G=null},Je.prototype.J=function(a,h,d,g){return this.i.add(String(a),h,!1,d,g)},Je.prototype.K=function(a,h,d,g){return this.i.add(String(a),h,!0,d,g)};function ka(a,h,d,g){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();let N=!0;for(let D=0;D<h.length;++D){const j=h[D];if(j&&!j.da&&j.capture==d){const Z=j.listener,Oe=j.ha||j.src;j.fa&&$r(a.i,j),N=Z.call(Oe,g)!==!1&&N}}return N&&!g.defaultPrevented}function tA(a,h){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=c(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(h)>2147483647?-1:o.setTimeout(a,h||0)}function cm(a){a.g=tA(()=>{a.g=null,a.i&&(a.i=!1,cm(a))},a.l);const h=a.h;a.h=null,a.m.apply(null,h)}class nA extends E{constructor(h,d){super(),this.m=h,this.l=d,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:cm(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ls(a){E.call(this),this.h=a,this.g={}}p(Ls,E);var hm=[];function dm(a){X(a.g,function(h,d){this.g.hasOwnProperty(d)&&Ic(h)},a),a.g={}}Ls.prototype.N=function(){Ls.Z.N.call(this),dm(this)},Ls.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var kc=o.JSON.stringify,rA=o.JSON.parse,iA=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function fm(){}function pm(){}var Ms={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function Rc(){S.call(this,"d")}p(Rc,S);function Cc(){S.call(this,"c")}p(Cc,S);var qr={},mm=null;function Ra(){return mm=mm||new Je}qr.Ia="serverreachability";function gm(a){S.call(this,qr.Ia,a)}p(gm,S);function Us(a){const h=Ra();at(h,new gm(h))}qr.STAT_EVENT="statevent";function ym(a,h){S.call(this,qr.STAT_EVENT,a),this.stat=h}p(ym,S);function lt(a){const h=Ra();at(h,new ym(h,a))}qr.Ja="timingevent";function _m(a,h){S.call(this,qr.Ja,a),this.size=h}p(_m,S);function Fs(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},h)}function js(){this.g=!0}js.prototype.ua=function(){this.g=!1};function sA(a,h,d,g,N,D){a.info(function(){if(a.g)if(D){var j="",Z=D.split("&");for(let he=0;he<Z.length;he++){var Oe=Z[he].split("=");if(Oe.length>1){const Fe=Oe[0];Oe=Oe[1];const ln=Fe.split("_");j=ln.length>=2&&ln[1]=="type"?j+(Fe+"="+Oe+"&"):j+(Fe+"=redacted&")}}}else j=null;else j=D;return"XMLHTTP REQ ("+g+") [attempt "+N+"]: "+h+`
`+d+`
`+j})}function oA(a,h,d,g,N,D,j){a.info(function(){return"XMLHTTP RESP ("+g+") [ attempt "+N+"]: "+h+`
`+d+`
`+D+" "+j})}function Ri(a,h,d,g){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+lA(a,d)+(g?" "+g:"")})}function aA(a,h){a.info(function(){return"TIMEOUT: "+h})}js.prototype.info=function(){};function lA(a,h){if(!a.g)return h;if(!h)return null;try{const D=JSON.parse(h);if(D){for(a=0;a<D.length;a++)if(Array.isArray(D[a])){var d=D[a];if(!(d.length<2)){var g=d[1];if(Array.isArray(g)&&!(g.length<1)){var N=g[0];if(N!="noop"&&N!="stop"&&N!="close")for(let j=1;j<g.length;j++)g[j]=""}}}}return kc(D)}catch{return h}}var Ca={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},vm={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},wm;function Pc(){}p(Pc,fm),Pc.prototype.g=function(){return new XMLHttpRequest},wm=new Pc;function Bs(a){return encodeURIComponent(String(a))}function uA(a){var h=1;a=a.split(":");const d=[];for(;h>0&&a.length;)d.push(a.shift()),h--;return a.length&&d.push(a.join(":")),d}function Gn(a,h,d,g){this.j=a,this.i=h,this.l=d,this.S=g||1,this.V=new Ls(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Em}function Em(){this.i=null,this.g="",this.h=!1}var Tm={},Nc={};function xc(a,h,d){a.M=1,a.A=Na(an(h)),a.u=d,a.R=!0,Im(a,null)}function Im(a,h){a.F=Date.now(),Pa(a),a.B=an(a.A);var d=a.B,g=a.S;Array.isArray(g)||(g=[String(g)]),Lm(d.i,"t",g),a.C=0,d=a.j.L,a.h=new Em,a.g=eg(a.j,d?h:null,!a.u),a.P>0&&(a.O=new nA(c(a.Y,a,a.g),a.P)),h=a.V,d=a.g,g=a.ba;var N="readystatechange";Array.isArray(N)||(N&&(hm[0]=N.toString()),N=hm);for(let D=0;D<N.length;D++){const j=om(d,N[D],g||h.handleEvent,!1,h.h||h);if(!j)break;h.g[j.key]=j}h=a.J?ye(a.J):{},a.u?(a.v||(a.v="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,h)):(a.v="GET",a.g.ea(a.B,a.v,null,h)),Us(),sA(a.i,a.v,a.B,a.l,a.S,a.u)}Gn.prototype.ba=function(a){a=a.target;const h=this.O;h&&Xn(a)==3?h.j():this.Y(a)},Gn.prototype.Y=function(a){try{if(a==this.g)e:{const Z=Xn(this.g),Oe=this.g.ya(),he=this.g.ca();if(!(Z<3)&&(Z!=3||this.g&&(this.h.h||this.g.la()||$m(this.g)))){this.K||Z!=4||Oe==7||(Oe==8||he<=0?Us(3):Us(2)),Dc(this);var h=this.g.ca();this.X=h;var d=cA(this);if(this.o=h==200,oA(this.i,this.v,this.B,this.l,this.S,Z,h),this.o){if(this.U&&!this.L){t:{if(this.g){var g,N=this.g;if((g=N.g?N.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!T(g)){var D=g;break t}}D=null}if(a=D)Ri(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,bc(this,a);else{this.o=!1,this.m=3,lt(12),Hr(this),zs(this);break e}}if(this.R){a=!0;let Fe;for(;!this.K&&this.C<d.length;)if(Fe=hA(this,d),Fe==Nc){Z==4&&(this.m=4,lt(14),a=!1),Ri(this.i,this.l,null,"[Incomplete Response]");break}else if(Fe==Tm){this.m=4,lt(15),Ri(this.i,this.l,d,"[Invalid Chunk]"),a=!1;break}else Ri(this.i,this.l,Fe,null),bc(this,Fe);if(Am(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Z!=4||d.length!=0||this.h.h||(this.m=1,lt(16),a=!1),this.o=this.o&&a,!a)Ri(this.i,this.l,d,"[Invalid Chunked Response]"),Hr(this),zs(this);else if(d.length>0&&!this.W){this.W=!0;var j=this.j;j.g==this&&j.aa&&!j.P&&(j.j.info("Great, no buffering proxy detected. Bytes received: "+d.length),Bc(j),j.P=!0,lt(11))}}else Ri(this.i,this.l,d,null),bc(this,d);Z==4&&Hr(this),this.o&&!this.K&&(Z==4?Xm(this.j,this):(this.o=!1,Pa(this)))}else SA(this.g),h==400&&d.indexOf("Unknown SID")>0?(this.m=3,lt(12)):(this.m=0,lt(13)),Hr(this),zs(this)}}}catch{}finally{}};function cA(a){if(!Am(a))return a.g.la();const h=$m(a.g);if(h==="")return"";let d="";const g=h.length,N=Xn(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return Hr(a),zs(a),"";a.h.i=new o.TextDecoder}for(let D=0;D<g;D++)a.h.h=!0,d+=a.h.i.decode(h[D],{stream:!(N&&D==g-1)});return h.length=0,a.h.g+=d,a.C=0,a.h.g}function Am(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function hA(a,h){var d=a.C,g=h.indexOf(`
`,d);return g==-1?Nc:(d=Number(h.substring(d,g)),isNaN(d)?Tm:(g+=1,g+d>h.length?Nc:(h=h.slice(g,g+d),a.C=g+d,h)))}Gn.prototype.cancel=function(){this.K=!0,Hr(this)};function Pa(a){a.T=Date.now()+a.H,Sm(a,a.H)}function Sm(a,h){if(a.D!=null)throw Error("WatchDog timer not null");a.D=Fs(c(a.aa,a),h)}function Dc(a){a.D&&(o.clearTimeout(a.D),a.D=null)}Gn.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(aA(this.i,this.B),this.M!=2&&(Us(),lt(17)),Hr(this),this.m=2,zs(this)):Sm(this,this.T-a)};function zs(a){a.j.I==0||a.K||Xm(a.j,a)}function Hr(a){Dc(a);var h=a.O;h&&typeof h.dispose=="function"&&h.dispose(),a.O=null,dm(a.V),a.g&&(h=a.g,a.g=null,h.abort(),h.dispose())}function bc(a,h){try{var d=a.j;if(d.I!=0&&(d.g==a||Vc(d.h,a))){if(!a.L&&Vc(d.h,a)&&d.I==3){try{var g=d.Ba.g.parse(h)}catch{g=null}if(Array.isArray(g)&&g.length==3){var N=g;if(N[0]==0){e:if(!d.v){if(d.g)if(d.g.F+3e3<a.F)Oa(d),ba(d);else break e;jc(d),lt(18)}}else d.xa=N[1],0<d.xa-d.K&&N[2]<37500&&d.F&&d.A==0&&!d.C&&(d.C=Fs(c(d.Va,d),6e3));Cm(d.h)<=1&&d.ta&&(d.ta=void 0)}else Gr(d,11)}else if((a.L||d.g==a)&&Oa(d),!T(h))for(N=d.Ba.g.parse(h),h=0;h<N.length;h++){let he=N[h];const Fe=he[0];if(!(Fe<=d.K))if(d.K=Fe,he=he[1],d.I==2)if(he[0]=="c"){d.M=he[1],d.ba=he[2];const ln=he[3];ln!=null&&(d.ka=ln,d.j.info("VER="+d.ka));const Kr=he[4];Kr!=null&&(d.za=Kr,d.j.info("SVER="+d.za));const Yn=he[5];Yn!=null&&typeof Yn=="number"&&Yn>0&&(g=1.5*Yn,d.O=g,d.j.info("backChannelRequestTimeoutMs_="+g)),g=d;const Jn=a.g;if(Jn){const Ma=Jn.g?Jn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ma){var D=g.h;D.g||Ma.indexOf("spdy")==-1&&Ma.indexOf("quic")==-1&&Ma.indexOf("h2")==-1||(D.j=D.l,D.g=new Set,D.h&&(Oc(D,D.h),D.h=null))}if(g.G){const zc=Jn.g?Jn.g.getResponseHeader("X-HTTP-Session-Id"):null;zc&&(g.wa=zc,fe(g.J,g.G,zc))}}d.I=3,d.l&&d.l.ra(),d.aa&&(d.T=Date.now()-a.F,d.j.info("Handshake RTT: "+d.T+"ms")),g=d;var j=a;if(g.na=Zm(g,g.L?g.ba:null,g.W),j.L){Pm(g.h,j);var Z=j,Oe=g.O;Oe&&(Z.H=Oe),Z.D&&(Dc(Z),Pa(Z)),g.g=j}else Km(g);d.i.length>0&&Va(d)}else he[0]!="stop"&&he[0]!="close"||Gr(d,7);else d.I==3&&(he[0]=="stop"||he[0]=="close"?he[0]=="stop"?Gr(d,7):Fc(d):he[0]!="noop"&&d.l&&d.l.qa(he),d.A=0)}}Us(4)}catch{}}var dA=class{constructor(a,h){this.g=a,this.map=h}};function km(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function Rm(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Cm(a){return a.h?1:a.g?a.g.size:0}function Vc(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function Oc(a,h){a.g?a.g.add(h):a.h=h}function Pm(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}km.prototype.cancel=function(){if(this.i=Nm(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Nm(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let h=a.i;for(const d of a.g.values())h=h.concat(d.G);return h}return I(a.i)}var xm=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function fA(a,h){if(a){a=a.split("&");for(let d=0;d<a.length;d++){const g=a[d].indexOf("=");let N,D=null;g>=0?(N=a[d].substring(0,g),D=a[d].substring(g+1)):N=a[d],h(N,D?decodeURIComponent(D.replace(/\+/g," ")):"")}}}function Kn(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let h;a instanceof Kn?(this.l=a.l,$s(this,a.j),this.o=a.o,this.g=a.g,qs(this,a.u),this.h=a.h,Lc(this,Mm(a.i)),this.m=a.m):a&&(h=String(a).match(xm))?(this.l=!1,$s(this,h[1]||"",!0),this.o=Hs(h[2]||""),this.g=Hs(h[3]||"",!0),qs(this,h[4]),this.h=Hs(h[5]||"",!0),Lc(this,h[6]||"",!0),this.m=Hs(h[7]||"")):(this.l=!1,this.i=new Gs(null,this.l))}Kn.prototype.toString=function(){const a=[];var h=this.j;h&&a.push(Ws(h,Dm,!0),":");var d=this.g;return(d||h=="file")&&(a.push("//"),(h=this.o)&&a.push(Ws(h,Dm,!0),"@"),a.push(Bs(d).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.u,d!=null&&a.push(":",String(d))),(d=this.h)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(Ws(d,d.charAt(0)=="/"?gA:mA,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",Ws(d,_A)),a.join("")},Kn.prototype.resolve=function(a){const h=an(this);let d=!!a.j;d?$s(h,a.j):d=!!a.o,d?h.o=a.o:d=!!a.g,d?h.g=a.g:d=a.u!=null;var g=a.h;if(d)qs(h,a.u);else if(d=!!a.h){if(g.charAt(0)!="/")if(this.g&&!this.h)g="/"+g;else{var N=h.h.lastIndexOf("/");N!=-1&&(g=h.h.slice(0,N+1)+g)}if(N=g,N==".."||N==".")g="";else if(N.indexOf("./")!=-1||N.indexOf("/.")!=-1){g=N.lastIndexOf("/",0)==0,N=N.split("/");const D=[];for(let j=0;j<N.length;){const Z=N[j++];Z=="."?g&&j==N.length&&D.push(""):Z==".."?((D.length>1||D.length==1&&D[0]!="")&&D.pop(),g&&j==N.length&&D.push("")):(D.push(Z),g=!0)}g=D.join("/")}else g=N}return d?h.h=g:d=a.i.toString()!=="",d?Lc(h,Mm(a.i)):d=!!a.m,d&&(h.m=a.m),h};function an(a){return new Kn(a)}function $s(a,h,d){a.j=d?Hs(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function qs(a,h){if(h){if(h=Number(h),isNaN(h)||h<0)throw Error("Bad port number "+h);a.u=h}else a.u=null}function Lc(a,h,d){h instanceof Gs?(a.i=h,vA(a.i,a.l)):(d||(h=Ws(h,yA)),a.i=new Gs(h,a.l))}function fe(a,h,d){a.i.set(h,d)}function Na(a){return fe(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function Hs(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Ws(a,h,d){return typeof a=="string"?(a=encodeURI(a).replace(h,pA),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function pA(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Dm=/[#\/\?@]/g,mA=/[#\?:]/g,gA=/[#\?]/g,yA=/[#\?@]/g,_A=/#/g;function Gs(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function Wr(a){a.g||(a.g=new Map,a.h=0,a.i&&fA(a.i,function(h,d){a.add(decodeURIComponent(h.replace(/\+/g," ")),d)}))}t=Gs.prototype,t.add=function(a,h){Wr(this),this.i=null,a=Ci(this,a);let d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(h),this.h+=1,this};function bm(a,h){Wr(a),h=Ci(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function Vm(a,h){return Wr(a),h=Ci(a,h),a.g.has(h)}t.forEach=function(a,h){Wr(this),this.g.forEach(function(d,g){d.forEach(function(N){a.call(h,N,g,this)},this)},this)};function Om(a,h){Wr(a);let d=[];if(typeof h=="string")Vm(a,h)&&(d=d.concat(a.g.get(Ci(a,h))));else for(a=Array.from(a.g.values()),h=0;h<a.length;h++)d=d.concat(a[h]);return d}t.set=function(a,h){return Wr(this),this.i=null,a=Ci(this,a),Vm(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},t.get=function(a,h){return a?(a=Om(this,a),a.length>0?String(a[0]):h):h};function Lm(a,h,d){bm(a,h),d.length>0&&(a.i=null,a.g.set(Ci(a,h),I(d)),a.h+=d.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],h=Array.from(this.g.keys());for(let g=0;g<h.length;g++){var d=h[g];const N=Bs(d);d=Om(this,d);for(let D=0;D<d.length;D++){let j=N;d[D]!==""&&(j+="="+Bs(d[D])),a.push(j)}}return this.i=a.join("&")};function Mm(a){const h=new Gs;return h.i=a.i,a.g&&(h.g=new Map(a.g),h.h=a.h),h}function Ci(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function vA(a,h){h&&!a.j&&(Wr(a),a.i=null,a.g.forEach(function(d,g){const N=g.toLowerCase();g!=N&&(bm(this,g),Lm(this,N,d))},a)),a.j=h}function wA(a,h){const d=new js;if(o.Image){const g=new Image;g.onload=f(Qn,d,"TestLoadImage: loaded",!0,h,g),g.onerror=f(Qn,d,"TestLoadImage: error",!1,h,g),g.onabort=f(Qn,d,"TestLoadImage: abort",!1,h,g),g.ontimeout=f(Qn,d,"TestLoadImage: timeout",!1,h,g),o.setTimeout(function(){g.ontimeout&&g.ontimeout()},1e4),g.src=a}else h(!1)}function EA(a,h){const d=new js,g=new AbortController,N=setTimeout(()=>{g.abort(),Qn(d,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:g.signal}).then(D=>{clearTimeout(N),D.ok?Qn(d,"TestPingServer: ok",!0,h):Qn(d,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(N),Qn(d,"TestPingServer: error",!1,h)})}function Qn(a,h,d,g,N){try{N&&(N.onload=null,N.onerror=null,N.onabort=null,N.ontimeout=null),g(d)}catch{}}function TA(){this.g=new iA}function Mc(a){this.i=a.Sb||null,this.h=a.ab||!1}p(Mc,fm),Mc.prototype.g=function(){return new xa(this.i,this.h)};function xa(a,h){Je.call(this),this.H=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(xa,Je),t=xa.prototype,t.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=h,this.readyState=1,Qs(this)},t.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const h={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(h.body=a),(this.H||o).fetch(new Request(this.D,h)).then(this.Pa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Ks(this)),this.readyState=0},t.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Qs(this)),this.g&&(this.readyState=3,Qs(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Um(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function Um(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}t.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.B.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?Ks(this):Qs(this),this.readyState==3&&Um(this)}},t.Oa=function(a){this.g&&(this.response=this.responseText=a,Ks(this))},t.Na=function(a){this.g&&(this.response=a,Ks(this))},t.ga=function(){this.g&&Ks(this)};function Ks(a){a.readyState=4,a.l=null,a.j=null,a.B=null,Qs(a)}t.setRequestHeader=function(a,h){this.A.append(a,h)},t.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],h=this.h.entries();for(var d=h.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=h.next();return a.join(`\r
`)};function Qs(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(xa.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Fm(a){let h="";return X(a,function(d,g){h+=g,h+=":",h+=d,h+=`\r
`}),h}function Uc(a,h,d){e:{for(g in d){var g=!1;break e}g=!0}g||(d=Fm(d),typeof a=="string"?d!=null&&Bs(d):fe(a,h,d))}function Ae(a){Je.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(Ae,Je);var IA=/^https?$/i,AA=["POST","PUT"];t=Ae.prototype,t.Fa=function(a){this.H=a},t.ea=function(a,h,d,g){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():wm.g(),this.g.onreadystatechange=m(c(this.Ca,this));try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(D){jm(this,D);return}if(a=d||"",d=new Map(this.headers),g)if(Object.getPrototypeOf(g)===Object.prototype)for(var N in g)d.set(N,g[N]);else if(typeof g.keys=="function"&&typeof g.get=="function")for(const D of g.keys())d.set(D,g.get(D));else throw Error("Unknown input type for opt_headers: "+String(g));g=Array.from(d.keys()).find(D=>D.toLowerCase()=="content-type"),N=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(AA,h,void 0)>=0)||g||N||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[D,j]of d)this.g.setRequestHeader(D,j);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(D){jm(this,D)}};function jm(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.o=5,Bm(a),Da(a)}function Bm(a){a.A||(a.A=!0,at(a,"complete"),at(a,"error"))}t.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,at(this,"complete"),at(this,"abort"),Da(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Da(this,!0)),Ae.Z.N.call(this)},t.Ca=function(){this.u||(this.B||this.v||this.j?zm(this):this.Xa())},t.Xa=function(){zm(this)};function zm(a){if(a.h&&typeof s<"u"){if(a.v&&Xn(a)==4)setTimeout(a.Ca.bind(a),0);else if(at(a,"readystatechange"),Xn(a)==4){a.h=!1;try{const D=a.ca();e:switch(D){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var d;if(!(d=h)){var g;if(g=D===0){let j=String(a.D).match(xm)[1]||null;!j&&o.self&&o.self.location&&(j=o.self.location.protocol.slice(0,-1)),g=!IA.test(j?j.toLowerCase():"")}d=g}if(d)at(a,"complete"),at(a,"success");else{a.o=6;try{var N=Xn(a)>2?a.g.statusText:""}catch{N=""}a.l=N+" ["+a.ca()+"]",Bm(a)}}finally{Da(a)}}}}function Da(a,h){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const d=a.g;a.g=null,h||at(a,"ready");try{d.onreadystatechange=null}catch{}}}t.isActive=function(){return!!this.g};function Xn(a){return a.g?a.g.readyState:0}t.ca=function(){try{return Xn(this)>2?this.g.status:-1}catch{return-1}},t.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.La=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),rA(h)}};function $m(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function SA(a){const h={};a=(a.g&&Xn(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let g=0;g<a.length;g++){if(T(a[g]))continue;var d=uA(a[g]);const N=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const D=h[N]||[];h[N]=D,D.push(d)}J(h,function(g){return g.join(", ")})}t.ya=function(){return this.o},t.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Xs(a,h,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||h}function qm(a){this.za=0,this.i=[],this.j=new js,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Xs("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Xs("baseRetryDelayMs",5e3,a),this.Za=Xs("retryDelaySeedMs",1e4,a),this.Ta=Xs("forwardChannelMaxRetries",2,a),this.va=Xs("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new km(a&&a.concurrentRequestLimit),this.Ba=new TA,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}t=qm.prototype,t.ka=8,t.I=1,t.connect=function(a,h,d,g){lt(0),this.W=a,this.H=h||{},d&&g!==void 0&&(this.H.OSID=d,this.H.OAID=g),this.F=this.X,this.J=Zm(this,null,this.W),Va(this)};function Fc(a){if(Hm(a),a.I==3){var h=a.V++,d=an(a.J);if(fe(d,"SID",a.M),fe(d,"RID",h),fe(d,"TYPE","terminate"),Ys(a,d),h=new Gn(a,a.j,h),h.M=2,h.A=Na(an(d)),d=!1,o.navigator&&o.navigator.sendBeacon)try{d=o.navigator.sendBeacon(h.A.toString(),"")}catch{}!d&&o.Image&&(new Image().src=h.A,d=!0),d||(h.g=eg(h.j,null),h.g.ea(h.A)),h.F=Date.now(),Pa(h)}Jm(a)}function ba(a){a.g&&(Bc(a),a.g.cancel(),a.g=null)}function Hm(a){ba(a),a.v&&(o.clearTimeout(a.v),a.v=null),Oa(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function Va(a){if(!Rm(a.h)&&!a.m){a.m=!0;var h=a.Ea;F||y(),M||(F(),M=!0),v.add(h,a),a.D=0}}function kA(a,h){return Cm(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=h.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=Fs(c(a.Ea,a,h),Ym(a,a.D)),a.D++,!0)}t.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const N=new Gn(this,this.j,a);let D=this.o;if(this.U&&(D?(D=ye(D),zr(D,this.U)):D=this.U),this.u!==null||this.R||(N.J=D,D=null),this.S)e:{for(var h=0,d=0;d<this.i.length;d++){t:{var g=this.i[d];if("__data__"in g.map&&(g=g.map.__data__,typeof g=="string")){g=g.length;break t}g=void 0}if(g===void 0)break;if(h+=g,h>4096){h=d;break e}if(h===4096||d===this.i.length-1){h=d+1;break e}}h=1e3}else h=1e3;h=Gm(this,N,h),d=an(this.J),fe(d,"RID",a),fe(d,"CVER",22),this.G&&fe(d,"X-HTTP-Session-Id",this.G),Ys(this,d),D&&(this.R?h="headers="+Bs(Fm(D))+"&"+h:this.u&&Uc(d,this.u,D)),Oc(this.h,N),this.Ra&&fe(d,"TYPE","init"),this.S?(fe(d,"$req",h),fe(d,"SID","null"),N.U=!0,xc(N,d,null)):xc(N,d,h),this.I=2}}else this.I==3&&(a?Wm(this,a):this.i.length==0||Rm(this.h)||Wm(this))};function Wm(a,h){var d;h?d=h.l:d=a.V++;const g=an(a.J);fe(g,"SID",a.M),fe(g,"RID",d),fe(g,"AID",a.K),Ys(a,g),a.u&&a.o&&Uc(g,a.u,a.o),d=new Gn(a,a.j,d,a.D+1),a.u===null&&(d.J=a.o),h&&(a.i=h.G.concat(a.i)),h=Gm(a,d,1e3),d.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),Oc(a.h,d),xc(d,g,h)}function Ys(a,h){a.H&&X(a.H,function(d,g){fe(h,g,d)}),a.l&&X({},function(d,g){fe(h,g,d)})}function Gm(a,h,d){d=Math.min(a.i.length,d);const g=a.l?c(a.l.Ka,a.l,a):null;e:{var N=a.i;let Z=-1;for(;;){const Oe=["count="+d];Z==-1?d>0?(Z=N[0].g,Oe.push("ofs="+Z)):Z=0:Oe.push("ofs="+Z);let he=!0;for(let Fe=0;Fe<d;Fe++){var D=N[Fe].g;const ln=N[Fe].map;if(D-=Z,D<0)Z=Math.max(0,N[Fe].g-100),he=!1;else try{D="req"+D+"_"||"";try{var j=ln instanceof Map?ln:Object.entries(ln);for(const[Kr,Yn]of j){let Jn=Yn;l(Yn)&&(Jn=kc(Yn)),Oe.push(D+Kr+"="+encodeURIComponent(Jn))}}catch(Kr){throw Oe.push(D+"type="+encodeURIComponent("_badmap")),Kr}}catch{g&&g(ln)}}if(he){j=Oe.join("&");break e}}j=void 0}return a=a.i.splice(0,d),h.G=a,j}function Km(a){if(!a.g&&!a.v){a.Y=1;var h=a.Da;F||y(),M||(F(),M=!0),v.add(h,a),a.A=0}}function jc(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=Fs(c(a.Da,a),Ym(a,a.A)),a.A++,!0)}t.Da=function(){if(this.v=null,Qm(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=Fs(c(this.Wa,this),a)}},t.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,lt(10),ba(this),Qm(this))};function Bc(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function Qm(a){a.g=new Gn(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var h=an(a.na);fe(h,"RID","rpc"),fe(h,"SID",a.M),fe(h,"AID",a.K),fe(h,"CI",a.F?"0":"1"),!a.F&&a.ia&&fe(h,"TO",a.ia),fe(h,"TYPE","xmlhttp"),Ys(a,h),a.u&&a.o&&Uc(h,a.u,a.o),a.O&&(a.g.H=a.O);var d=a.g;a=a.ba,d.M=1,d.A=Na(an(h)),d.u=null,d.R=!0,Im(d,a)}t.Va=function(){this.C!=null&&(this.C=null,ba(this),jc(this),lt(19))};function Oa(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function Xm(a,h){var d=null;if(a.g==h){Oa(a),Bc(a),a.g=null;var g=2}else if(Vc(a.h,h))d=h.G,Pm(a.h,h),g=1;else return;if(a.I!=0){if(h.o)if(g==1){d=h.u?h.u.length:0,h=Date.now()-h.F;var N=a.D;g=Ra(),at(g,new _m(g,d)),Va(a)}else Km(a);else if(N=h.m,N==3||N==0&&h.X>0||!(g==1&&kA(a,h)||g==2&&jc(a)))switch(d&&d.length>0&&(h=a.h,h.i=h.i.concat(d)),N){case 1:Gr(a,5);break;case 4:Gr(a,10);break;case 3:Gr(a,6);break;default:Gr(a,2)}}}function Ym(a,h){let d=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(d*=2),d*h}function Gr(a,h){if(a.j.info("Error code "+h),h==2){var d=c(a.bb,a),g=a.Ua;const N=!g;g=new Kn(g||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||$s(g,"https"),Na(g),N?wA(g.toString(),d):EA(g.toString(),d)}else lt(2);a.I=0,a.l&&a.l.pa(h),Jm(a),Hm(a)}t.bb=function(a){a?(this.j.info("Successfully pinged google.com"),lt(2)):(this.j.info("Failed to ping google.com"),lt(1))};function Jm(a){if(a.I=0,a.ja=[],a.l){const h=Nm(a.h);(h.length!=0||a.i.length!=0)&&(R(a.ja,h),R(a.ja,a.i),a.h.i.length=0,I(a.i),a.i.length=0),a.l.oa()}}function Zm(a,h,d){var g=d instanceof Kn?an(d):new Kn(d);if(g.g!="")h&&(g.g=h+"."+g.g),qs(g,g.u);else{var N=o.location;g=N.protocol,h=h?h+"."+N.hostname:N.hostname,N=+N.port;const D=new Kn(null);g&&$s(D,g),h&&(D.g=h),N&&qs(D,N),d&&(D.h=d),g=D}return d=a.G,h=a.wa,d&&h&&fe(g,d,h),fe(g,"VER",a.ka),Ys(a,g),g}function eg(a,h,d){if(h&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Aa&&!a.ma?new Ae(new Mc({ab:d})):new Ae(a.ma),h.Fa(a.L),h}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function tg(){}t=tg.prototype,t.ra=function(){},t.qa=function(){},t.pa=function(){},t.oa=function(){},t.isActive=function(){return!0},t.Ka=function(){};function La(){}La.prototype.g=function(a,h){return new At(a,h)};function At(a,h){Je.call(this),this.g=new qm(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.sa&&(a?a["X-WebChannel-Client-Profile"]=h.sa:a={"X-WebChannel-Client-Profile":h.sa}),this.g.U=a,(a=h&&h.Qb)&&!T(a)&&(this.g.u=a),this.A=h&&h.supportsCrossDomainXhr||!1,this.v=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!T(h)&&(this.g.G=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new Pi(this)}p(At,Je),At.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},At.prototype.close=function(){Fc(this.g)},At.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.v&&(d={},d.__data__=kc(a),a=d);h.i.push(new dA(h.Ya++,a)),h.I==3&&Va(h)},At.prototype.N=function(){this.g.l=null,delete this.j,Fc(this.g),delete this.g,At.Z.N.call(this)};function ng(a){Rc.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(const d in h){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}p(ng,Rc);function rg(){Cc.call(this),this.status=1}p(rg,Cc);function Pi(a){this.g=a}p(Pi,tg),Pi.prototype.ra=function(){at(this.g,"a")},Pi.prototype.qa=function(a){at(this.g,new ng(a))},Pi.prototype.pa=function(a){at(this.g,new rg)},Pi.prototype.oa=function(){at(this.g,"b")},La.prototype.createWebChannel=La.prototype.g,At.prototype.send=At.prototype.o,At.prototype.open=At.prototype.m,At.prototype.close=At.prototype.close,ST=function(){return new La},AT=function(){return Ra()},IT=qr,Dd={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Ca.NO_ERROR=0,Ca.TIMEOUT=8,Ca.HTTP_ERROR=6,Sl=Ca,vm.COMPLETE="complete",TT=vm,pm.EventType=Ms,Ms.OPEN="a",Ms.CLOSE="b",Ms.ERROR="c",Ms.MESSAGE="d",Je.prototype.listen=Je.prototype.J,mo=pm,Ae.prototype.listenOnce=Ae.prototype.K,Ae.prototype.getLastError=Ae.prototype.Ha,Ae.prototype.getLastErrorCode=Ae.prototype.ya,Ae.prototype.getStatus=Ae.prototype.ca,Ae.prototype.getResponseJson=Ae.prototype.La,Ae.prototype.getResponseText=Ae.prototype.la,Ae.prototype.send=Ae.prototype.ea,Ae.prototype.setWithCredentials=Ae.prototype.Fa,ET=Ae}).apply(typeof nl<"u"?nl:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}nt.UNAUTHENTICATED=new nt(null),nt.GOOGLE_CREDENTIALS=new nt("google-credentials-uid"),nt.FIRST_PARTY=new nt("first-party-uid"),nt.MOCK_USER=new nt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ps="12.14.0";function V1(t){Ps=t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fi=new Gu("@firebase/firestore");function xi(){return fi.logLevel}function z(t,...e){if(fi.logLevel<=re.DEBUG){const n=e.map(ip);fi.debug(`Firestore (${Ps}): ${t}`,...n)}}function jn(t,...e){if(fi.logLevel<=re.ERROR){const n=e.map(ip);fi.error(`Firestore (${Ps}): ${t}`,...n)}}function pi(t,...e){if(fi.logLevel<=re.WARN){const n=e.map(ip);fi.warn(`Firestore (${Ps}): ${t}`,...n)}}function ip(t){if(typeof t=="string")return t;try{return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function W(t,e,n){let r="Unexpected state";typeof e=="string"?r=e:n=e,kT(t,r,n)}function kT(t,e,n){let r=`FIRESTORE (${Ps}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(n!==void 0)try{r+=" CONTEXT: "+JSON.stringify(n)}catch{r+=" CONTEXT: "+n}throw jn(r),new Error(r)}function se(t,e,n,r){let i="Unexpected state";typeof n=="string"?i=n:r=n,t||kT(e,i,r)}function Y(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const V={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class B extends Ft{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _n{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RT{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class O1{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(nt.UNAUTHENTICATED))}shutdown(){}}class L1{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class M1{constructor(e){this.t=e,this.currentUser=nt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){se(this.o===void 0,42304);let r=this.i;const i=u=>this.i!==r?(r=this.i,n(u)):Promise.resolve();let s=new _n;this.o=()=>{this.i++,this.currentUser=this.u(),s.resolve(),s=new _n,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const u=s;e.enqueueRetryable(async()=>{await u.promise,await i(this.currentUser)})},l=u=>{z("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(z("FirebaseAuthCredentialsProvider","Auth not yet detected"),s.resolve(),s=new _n)}},0),o()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(z("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(se(typeof r.accessToken=="string",31837,{l:r}),new RT(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return se(e===null||typeof e=="string",2055,{h:e}),new nt(e)}}class U1{constructor(e,n,r){this.P=e,this.T=n,this.I=r,this.type="FirstParty",this.user=nt.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const e=this.A();return e&&this.R.set("Authorization",e),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class F1{constructor(e,n,r){this.P=e,this.T=n,this.I=r}getToken(){return Promise.resolve(new U1(this.P,this.T,this.I))}start(e,n){e.enqueueRetryable(()=>n(nt.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class zy{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class j1{constructor(e,n){this.V=n,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,kt(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,n){se(this.o===void 0,3512);const r=s=>{s.error!=null&&z("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${s.error.message}`);const o=s.token!==this.m;return this.m=s.token,z("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?n(s.token):Promise.resolve()};this.o=s=>{e.enqueueRetryable(()=>r(s))};const i=s=>{z("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=s,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(s=>i(s)),setTimeout(()=>{if(!this.appCheck){const s=this.V.getImmediate({optional:!0});s?i(s):z("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new zy(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(se(typeof n.token=="string",44558,{tokenResult:n}),this.m=n.token,new zy(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B1(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sp{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const i=B1(40);for(let s=0;s<i.length;++s)r.length<20&&i[s]<n&&(r+=e.charAt(i[s]%62))}return r}}function ee(t,e){return t<e?-1:t>e?1:0}function bd(t,e){const n=Math.min(t.length,e.length);for(let r=0;r<n;r++){const i=t.charAt(r),s=e.charAt(r);if(i!==s)return Th(i)===Th(s)?ee(i,s):Th(i)?1:-1}return ee(t.length,e.length)}const z1=55296,$1=57343;function Th(t){const e=t.charCodeAt(0);return e>=z1&&e<=$1}function ps(t,e,n){return t.length===e.length&&t.every((r,i)=>n(r,e[i]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $y="__name__";class hn{constructor(e,n,r){n===void 0?n=0:n>e.length&&W(637,{offset:n,range:e.length}),r===void 0?r=e.length-n:r>e.length-n&&W(1746,{length:r,range:e.length-n}),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return hn.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof hn?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let i=0;i<r;i++){const s=hn.compareSegments(e.get(i),n.get(i));if(s!==0)return s}return ee(e.length,n.length)}static compareSegments(e,n){const r=hn.isNumericId(e),i=hn.isNumericId(n);return r&&!i?-1:!r&&i?1:r&&i?hn.extractNumericId(e).compare(hn.extractNumericId(n)):bd(e,n)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Ir.fromString(e.substring(4,e.length-2))}}class ue extends hn{construct(e,n,r){return new ue(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new B(V.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(i=>i.length>0))}return new ue(n)}static emptyPath(){return new ue([])}}const q1=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ge extends hn{construct(e,n,r){return new Ge(e,n,r)}static isValidIdentifier(e){return q1.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ge.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===$y}static keyField(){return new Ge([$y])}static fromServerFormat(e){const n=[];let r="",i=0;const s=()=>{if(r.length===0)throw new B(V.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let o=!1;for(;i<e.length;){const l=e[i];if(l==="\\"){if(i+1===e.length)throw new B(V.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[i+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new B(V.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,i+=2}else l==="`"?(o=!o,i++):l!=="."||o?(r+=l,i++):(s(),i++)}if(s(),o)throw new B(V.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ge(n)}static emptyPath(){return new Ge([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H{constructor(e){this.path=e}static fromPath(e){return new H(ue.fromString(e))}static fromName(e){return new H(ue.fromString(e).popFirst(5))}static empty(){return new H(ue.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ue.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return ue.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new H(new ue(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function CT(t,e,n){if(!n)throw new B(V.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function H1(t,e,n,r){if(e===!0&&r===!0)throw new B(V.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function qy(t){if(!H.isDocumentKey(t))throw new B(V.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function Hy(t){if(H.isDocumentKey(t))throw new B(V.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function PT(t){return typeof t=="object"&&t!==null&&(Object.getPrototypeOf(t)===Object.prototype||Object.getPrototypeOf(t)===null)}function Ju(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":W(12329,{type:typeof t})}function Dt(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new B(V.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Ju(t);throw new B(V.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ve(t,e){const n={typeString:t};return e&&(n.value=e),n}function ya(t,e){if(!PT(t))throw new B(V.INVALID_ARGUMENT,"JSON must be an object");let n;for(const r in e)if(e[r]){const i=e[r].typeString,s="value"in e[r]?{value:e[r].value}:void 0;if(!(r in t)){n=`JSON missing required field: '${r}'`;break}const o=t[r];if(i&&typeof o!==i){n=`JSON field '${r}' must be a ${i}.`;break}if(s!==void 0&&o!==s.value){n=`Expected '${r}' field to equal '${s.value}'`;break}}if(n)throw new B(V.INVALID_ARGUMENT,n);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wy=-62135596800,Gy=1e6;class me{static now(){return me.fromMillis(Date.now())}static fromDate(e){return me.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor((e-1e3*n)*Gy);return new me(n,r)}constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new B(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new B(V.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<Wy)throw new B(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new B(V.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Gy}_compareTo(e){return this.seconds===e.seconds?ee(this.nanoseconds,e.nanoseconds):ee(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:me._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(ya(e,me._jsonSchema))return new me(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Wy;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}me._jsonSchemaVersion="firestore/timestamp/1.0",me._jsonSchema={type:Ve("string",me._jsonSchemaVersion),seconds:Ve("number"),nanoseconds:Ve("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K{static fromTimestamp(e){return new K(e)}static min(){return new K(new me(0,0))}static max(){return new K(new me(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ta=-1;function W1(t,e){const n=t.toTimestamp().seconds,r=t.toTimestamp().nanoseconds+1,i=K.fromTimestamp(r===1e9?new me(n+1,0):new me(n,r));return new Pr(i,H.empty(),e)}function G1(t){return new Pr(t.readTime,t.key,ta)}class Pr{constructor(e,n,r){this.readTime=e,this.documentKey=n,this.largestBatchId=r}static min(){return new Pr(K.min(),H.empty(),ta)}static max(){return new Pr(K.max(),H.empty(),ta)}}function K1(t,e){let n=t.readTime.compareTo(e.readTime);return n!==0?n:(n=H.comparator(t.documentKey,e.documentKey),n!==0?n:ee(t.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Q1="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class X1{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ns(t){if(t.code!==V.FAILED_PRECONDITION||t.message!==Q1)throw t;z("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(n=>{this.isDone=!0,this.result=n,this.nextCallback&&this.nextCallback(n)},n=>{this.isDone=!0,this.error=n,this.catchCallback&&this.catchCallback(n)})}catch(e){return this.next(void 0,e)}next(e,n){return this.callbackAttached&&W(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(n,this.error):this.wrapSuccess(e,this.result):new L((r,i)=>{this.nextCallback=s=>{this.wrapSuccess(e,s).next(r,i)},this.catchCallback=s=>{this.wrapFailure(n,s).next(r,i)}})}toPromise(){return new Promise((e,n)=>{this.next(e,n)})}wrapUserFunction(e){try{const n=e();return n instanceof L?n:L.resolve(n)}catch(n){return L.reject(n)}}wrapSuccess(e,n){return e?this.wrapUserFunction(()=>e(n)):L.resolve(n)}wrapFailure(e,n){return e?this.wrapUserFunction(()=>e(n)):L.reject(n)}static resolve(e){return new L((n,r)=>{n(e)})}static reject(e){return new L((n,r)=>{r(e)})}static waitFor(e){return new L((n,r)=>{let i=0,s=0,o=!1;e.forEach(l=>{++i,l.next(()=>{++s,o&&s===i&&n()},u=>r(u))}),o=!0,s===i&&n()})}static or(e){let n=L.resolve(!1);for(const r of e)n=n.next(i=>i?L.resolve(i):r());return n}static forEach(e,n){const r=[];return e.forEach((i,s)=>{r.push(n.call(this,i,s))}),this.waitFor(r)}static mapArray(e,n){return new L((r,i)=>{const s=e.length,o=new Array(s);let l=0;for(let u=0;u<s;u++){const c=u;n(e[c]).next(f=>{o[c]=f,++l,l===s&&r(o)},f=>i(f))}})}static doWhile(e,n){return new L((r,i)=>{const s=()=>{e()===!0?n().next(()=>{s()},i):r()};s()})}}function Y1(t){const e=t.match(/Android ([\d.]+)/i),n=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(n)}function xs(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zu{constructor(e,n){this.previousValue=e,n&&(n.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>n.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}Zu.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const op=-1;function _a(t){return t==null}function uu(t){return t===0&&1/t==-1/0}function J1(t){return typeof t=="number"&&Number.isInteger(t)&&!uu(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NT="";function Z1(t){let e="";for(let n=0;n<t.length;n++)e.length>0&&(e=Ky(e)),e=eN(t.get(n),e);return Ky(e)}function eN(t,e){let n=e;const r=t.length;for(let i=0;i<r;i++){const s=t.charAt(i);switch(s){case"\0":n+="";break;case NT:n+="";break;default:n+=s}}return n}function Ky(t){return t+NT+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qy(t){let e=0;for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e++;return e}function jr(t,e){for(const n in t)Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n])}function xT(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(e,n){this.comparator=e,this.root=n||We.EMPTY}insert(e,n){return new ve(this.comparator,this.root.insert(e,n,this.comparator).copy(null,null,We.BLACK,null,null))}remove(e){return new ve(this.comparator,this.root.remove(e,this.comparator).copy(null,null,We.BLACK,null,null))}get(e){let n=this.root;for(;!n.isEmpty();){const r=this.comparator(e,n.key);if(r===0)return n.value;r<0?n=n.left:r>0&&(n=n.right)}return null}indexOf(e){let n=0,r=this.root;for(;!r.isEmpty();){const i=this.comparator(e,r.key);if(i===0)return n+r.left.size;i<0?r=r.left:(n+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((n,r)=>(e(n,r),!1))}toString(){const e=[];return this.inorderTraversal((n,r)=>(e.push(`${n}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new rl(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new rl(this.root,e,this.comparator,!1)}getReverseIterator(){return new rl(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new rl(this.root,e,this.comparator,!0)}}class rl{constructor(e,n,r,i){this.isReverse=i,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=n?r(e.key,n):1,n&&i&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const n={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return n}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class We{constructor(e,n,r,i,s){this.key=e,this.value=n,this.color=r??We.RED,this.left=i??We.EMPTY,this.right=s??We.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,n,r,i,s){return new We(e??this.key,n??this.value,r??this.color,i??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let i=this;const s=r(e,i.key);return i=s<0?i.copy(null,null,null,i.left.insert(e,n,r),null):s===0?i.copy(null,n,null,null,null):i.copy(null,null,null,null,i.right.insert(e,n,r)),i.fixUp()}removeMin(){if(this.left.isEmpty())return We.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,n){let r,i=this;if(n(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,n),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),n(e,i.key)===0){if(i.right.isEmpty())return We.EMPTY;r=i.right.min(),i=i.copy(r.key,r.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,n))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,We.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,We.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw W(43730,{key:this.key,value:this.value});if(this.right.isRed())throw W(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw W(27949);return e+(this.isRed()?0:1)}}We.EMPTY=null,We.RED=!0,We.BLACK=!1;We.EMPTY=new class{constructor(){this.size=0}get key(){throw W(57766)}get value(){throw W(16141)}get color(){throw W(16727)}get left(){throw W(29726)}get right(){throw W(36894)}copy(e,n,r,i,s){return this}insert(e,n,r){return new We(e,n)}remove(e,n){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue{constructor(e){this.comparator=e,this.data=new ve(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((n,r)=>(e(n),!1))}forEachInRange(e,n){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const i=r.getNext();if(this.comparator(i.key,e[1])>=0)return;n(i.key)}}forEachWhile(e,n){let r;for(r=n!==void 0?this.data.getIteratorFrom(n):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const n=this.data.getIteratorFrom(e);return n.hasNext()?n.getNext().key:null}getIterator(){return new Xy(this.data.getIterator())}getIteratorFrom(e){return new Xy(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let n=this;return n.size<e.size&&(n=e,e=this),e.forEach(r=>{n=n.add(r)}),n}isEqual(e){if(!(e instanceof Ue)||this.size!==e.size)return!1;const n=this.data.getIterator(),r=e.data.getIterator();for(;n.hasNext();){const i=n.getNext().key,s=r.getNext().key;if(this.comparator(i,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(n=>{e.push(n)}),e}toString(){const e=[];return this.forEach(n=>e.push(n)),"SortedSet("+e.toString()+")"}copy(e){const n=new Ue(this.comparator);return n.data=e,n}}class Xy{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt{constructor(e){this.fields=e,e.sort(Ge.comparator)}static empty(){return new Pt([])}unionWith(e){let n=new Ue(Ge.comparator);for(const r of this.fields)n=n.add(r);for(const r of e)n=n.add(r);return new Pt(n.toArray())}covers(e){for(const n of this.fields)if(n.isPrefixOf(e))return!0;return!1}isEqual(e){return ps(this.fields,e.fields,(n,r)=>n.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class DT extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ye{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(i){try{return atob(i)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new DT("Invalid base64 string: "+s):s}}(e);return new Ye(n)}static fromUint8Array(e){const n=function(i){let s="";for(let o=0;o<i.length;++o)s+=String.fromCharCode(i[o]);return s}(e);return new Ye(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ee(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ye.EMPTY_BYTE_STRING=new Ye("");const tN=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Nr(t){if(se(!!t,39018),typeof t=="string"){let e=0;const n=tN.exec(t);if(se(!!n,46558,{timestamp:t}),n[1]){let i=n[1];i=(i+"000000000").substr(0,9),e=Number(i)}const r=new Date(t);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:Pe(t.seconds),nanos:Pe(t.nanos)}}function Pe(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function xr(t){return typeof t=="string"?Ye.fromBase64String(t):Ye.fromUint8Array(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bT="server_timestamp",VT="__type__",OT="__previous_value__",LT="__local_write_time__";function ap(t){var n,r;return((r=(((n=t==null?void 0:t.mapValue)==null?void 0:n.fields)||{})[VT])==null?void 0:r.stringValue)===bT}function ec(t){const e=t.mapValue.fields[OT];return ap(e)?ec(e):e}function na(t){const e=Nr(t.mapValue.fields[LT].timestampValue);return new me(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nN{constructor(e,n,r,i,s,o,l,u,c,f,p){this.databaseId=e,this.appId=n,this.persistenceKey=r,this.host=i,this.ssl=s,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=c,this.isUsingEmulator=f,this.apiKey=p}}const cu="(default)";class ra{constructor(e,n){this.projectId=e,this.database=n||cu}static empty(){return new ra("","")}get isDefaultDatabase(){return this.database===cu}isEqual(e){return e instanceof ra&&e.projectId===this.projectId&&e.database===this.database}}function rN(t,e){if(!Object.prototype.hasOwnProperty.apply(t.options,["projectId"]))throw new B(V.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ra(t.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const MT="__type__",iN="__max__",il={mapValue:{}},UT="__vector__",hu="value";function Dr(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?ap(t)?4:oN(t)?9007199254740991:sN(t)?10:11:W(28295,{value:t})}function Tn(t,e){if(t===e)return!0;const n=Dr(t);if(n!==Dr(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return na(t).isEqual(na(e));case 3:return function(i,s){if(typeof i.timestampValue=="string"&&typeof s.timestampValue=="string"&&i.timestampValue.length===s.timestampValue.length)return i.timestampValue===s.timestampValue;const o=Nr(i.timestampValue),l=Nr(s.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos}(t,e);case 5:return t.stringValue===e.stringValue;case 6:return function(i,s){return xr(i.bytesValue).isEqual(xr(s.bytesValue))}(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return function(i,s){return Pe(i.geoPointValue.latitude)===Pe(s.geoPointValue.latitude)&&Pe(i.geoPointValue.longitude)===Pe(s.geoPointValue.longitude)}(t,e);case 2:return function(i,s){if("integerValue"in i&&"integerValue"in s)return Pe(i.integerValue)===Pe(s.integerValue);if("doubleValue"in i&&"doubleValue"in s){const o=Pe(i.doubleValue),l=Pe(s.doubleValue);return o===l?uu(o)===uu(l):isNaN(o)&&isNaN(l)}return!1}(t,e);case 9:return ps(t.arrayValue.values||[],e.arrayValue.values||[],Tn);case 10:case 11:return function(i,s){const o=i.mapValue.fields||{},l=s.mapValue.fields||{};if(Qy(o)!==Qy(l))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(l[u]===void 0||!Tn(o[u],l[u])))return!1;return!0}(t,e);default:return W(52216,{left:t})}}function ia(t,e){return(t.values||[]).find(n=>Tn(n,e))!==void 0}function ms(t,e){if(t===e)return 0;const n=Dr(t),r=Dr(e);if(n!==r)return ee(n,r);switch(n){case 0:case 9007199254740991:return 0;case 1:return ee(t.booleanValue,e.booleanValue);case 2:return function(s,o){const l=Pe(s.integerValue||s.doubleValue),u=Pe(o.integerValue||o.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(t,e);case 3:return Yy(t.timestampValue,e.timestampValue);case 4:return Yy(na(t),na(e));case 5:return bd(t.stringValue,e.stringValue);case 6:return function(s,o){const l=xr(s),u=xr(o);return l.compareTo(u)}(t.bytesValue,e.bytesValue);case 7:return function(s,o){const l=s.split("/"),u=o.split("/");for(let c=0;c<l.length&&c<u.length;c++){const f=ee(l[c],u[c]);if(f!==0)return f}return ee(l.length,u.length)}(t.referenceValue,e.referenceValue);case 8:return function(s,o){const l=ee(Pe(s.latitude),Pe(o.latitude));return l!==0?l:ee(Pe(s.longitude),Pe(o.longitude))}(t.geoPointValue,e.geoPointValue);case 9:return Jy(t.arrayValue,e.arrayValue);case 10:return function(s,o){var m,I,R,P;const l=s.fields||{},u=o.fields||{},c=(m=l[hu])==null?void 0:m.arrayValue,f=(I=u[hu])==null?void 0:I.arrayValue,p=ee(((R=c==null?void 0:c.values)==null?void 0:R.length)||0,((P=f==null?void 0:f.values)==null?void 0:P.length)||0);return p!==0?p:Jy(c,f)}(t.mapValue,e.mapValue);case 11:return function(s,o){if(s===il.mapValue&&o===il.mapValue)return 0;if(s===il.mapValue)return 1;if(o===il.mapValue)return-1;const l=s.fields||{},u=Object.keys(l),c=o.fields||{},f=Object.keys(c);u.sort(),f.sort();for(let p=0;p<u.length&&p<f.length;++p){const m=bd(u[p],f[p]);if(m!==0)return m;const I=ms(l[u[p]],c[f[p]]);if(I!==0)return I}return ee(u.length,f.length)}(t.mapValue,e.mapValue);default:throw W(23264,{he:n})}}function Yy(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return ee(t,e);const n=Nr(t),r=Nr(e),i=ee(n.seconds,r.seconds);return i!==0?i:ee(n.nanos,r.nanos)}function Jy(t,e){const n=t.values||[],r=e.values||[];for(let i=0;i<n.length&&i<r.length;++i){const s=ms(n[i],r[i]);if(s)return s}return ee(n.length,r.length)}function gs(t){return Vd(t)}function Vd(t){return"nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(n){const r=Nr(n);return`time(${r.seconds},${r.nanos})`}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?function(n){return xr(n).toBase64()}(t.bytesValue):"referenceValue"in t?function(n){return H.fromName(n).toString()}(t.referenceValue):"geoPointValue"in t?function(n){return`geo(${n.latitude},${n.longitude})`}(t.geoPointValue):"arrayValue"in t?function(n){let r="[",i=!0;for(const s of n.values||[])i?i=!1:r+=",",r+=Vd(s);return r+"]"}(t.arrayValue):"mapValue"in t?function(n){const r=Object.keys(n.fields||{}).sort();let i="{",s=!0;for(const o of r)s?s=!1:i+=",",i+=`${o}:${Vd(n.fields[o])}`;return i+"}"}(t.mapValue):W(61005,{value:t})}function kl(t){switch(Dr(t)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=ec(t);return e?16+kl(e):16;case 5:return 2*t.stringValue.length;case 6:return xr(t.bytesValue).approximateByteSize();case 7:return t.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((i,s)=>i+kl(s),0)}(t.arrayValue);case 10:case 11:return function(r){let i=0;return jr(r.fields,(s,o)=>{i+=s.length+kl(o)}),i}(t.mapValue);default:throw W(13486,{value:t})}}function Zy(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function sa(t){return!!t&&"integerValue"in t}function FT(t){return sa(t)||function(n){return!!n&&"doubleValue"in n}(t)}function lp(t){return!!t&&"arrayValue"in t}function e_(t){return!!t&&"nullValue"in t}function t_(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function Rl(t){return!!t&&"mapValue"in t}function sN(t){var n,r;return((r=(((n=t==null?void 0:t.mapValue)==null?void 0:n.fields)||{})[MT])==null?void 0:r.stringValue)===UT}function Po(t){if(t.geoPointValue)return{geoPointValue:{...t.geoPointValue}};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:{...t.timestampValue}};if(t.mapValue){const e={mapValue:{fields:{}}};return jr(t.mapValue.fields,(n,r)=>e.mapValue.fields[n]=Po(r)),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let n=0;n<(t.arrayValue.values||[]).length;++n)e.arrayValue.values[n]=Po(t.arrayValue.values[n]);return e}return{...t}}function oN(t){return(((t.mapValue||{}).fields||{}).__type__||{}).stringValue===iN}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht{constructor(e){this.value=e}static empty(){return new ht({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let n=this.value;for(let r=0;r<e.length-1;++r)if(n=(n.mapValue.fields||{})[e.get(r)],!Rl(n))return null;return n=(n.mapValue.fields||{})[e.lastSegment()],n||null}}set(e,n){this.getFieldsMap(e.popLast())[e.lastSegment()]=Po(n)}setAll(e){let n=Ge.emptyPath(),r={},i=[];e.forEach((o,l)=>{if(!n.isImmediateParentOf(l)){const u=this.getFieldsMap(n);this.applyChanges(u,r,i),r={},i=[],n=l.popLast()}o?r[l.lastSegment()]=Po(o):i.push(l.lastSegment())});const s=this.getFieldsMap(n);this.applyChanges(s,r,i)}delete(e){const n=this.field(e.popLast());Rl(n)&&n.mapValue.fields&&delete n.mapValue.fields[e.lastSegment()]}isEqual(e){return Tn(this.value,e.value)}getFieldsMap(e){let n=this.value;n.mapValue.fields||(n.mapValue={fields:{}});for(let r=0;r<e.length;++r){let i=n.mapValue.fields[e.get(r)];Rl(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},n.mapValue.fields[e.get(r)]=i),n=i}return n.mapValue.fields}applyChanges(e,n,r){jr(n,(i,s)=>e[i]=s);for(const i of r)delete e[i]}clone(){return new ht(Po(this.value))}}function jT(t){const e=[];return jr(t.fields,(n,r)=>{const i=new Ge([n]);if(Rl(r)){const s=jT(r.mapValue).fields;if(s.length===0)e.push(i);else for(const o of s)e.push(i.child(o))}else e.push(i)}),new Pt(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ze{constructor(e,n,r,i,s,o,l){this.key=e,this.documentType=n,this.version=r,this.readTime=i,this.createTime=s,this.data=o,this.documentState=l}static newInvalidDocument(e){return new ze(e,0,K.min(),K.min(),K.min(),ht.empty(),0)}static newFoundDocument(e,n,r,i){return new ze(e,1,n,K.min(),r,i,0)}static newNoDocument(e,n){return new ze(e,2,n,K.min(),K.min(),ht.empty(),0)}static newUnknownDocument(e,n){return new ze(e,3,n,K.min(),K.min(),ht.empty(),2)}convertToFoundDocument(e,n){return!this.createTime.isEqual(K.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=n,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=ht.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=ht.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=K.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ze&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ze(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class du{constructor(e,n){this.position=e,this.inclusive=n}}function n_(t,e,n){let r=0;for(let i=0;i<t.position.length;i++){const s=e[i],o=t.position[i];if(s.field.isKeyField()?r=H.comparator(H.fromName(o.referenceValue),n.key):r=ms(o,n.data.field(s.field)),s.dir==="desc"&&(r*=-1),r!==0)break}return r}function r_(t,e){if(t===null)return e===null;if(e===null||t.inclusive!==e.inclusive||t.position.length!==e.position.length)return!1;for(let n=0;n<t.position.length;n++)if(!Tn(t.position[n],e.position[n]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oa{constructor(e,n="asc"){this.field=e,this.dir=n}}function aN(t,e){return t.dir===e.dir&&t.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BT{}class be extends BT{constructor(e,n,r){super(),this.field=e,this.op=n,this.value=r}static create(e,n,r){return e.isKeyField()?n==="in"||n==="not-in"?this.createKeyFieldInFilter(e,n,r):new uN(e,n,r):n==="array-contains"?new dN(e,r):n==="in"?new fN(e,r):n==="not-in"?new pN(e,r):n==="array-contains-any"?new mN(e,r):new be(e,n,r)}static createKeyFieldInFilter(e,n,r){return n==="in"?new cN(e,r):new hN(e,r)}matches(e){const n=e.data.field(this.field);return this.op==="!="?n!==null&&n.nullValue===void 0&&this.matchesComparison(ms(n,this.value)):n!==null&&Dr(this.value)===Dr(n)&&this.matchesComparison(ms(n,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return W(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class on extends BT{constructor(e,n){super(),this.filters=e,this.op=n,this.Pe=null}static create(e,n){return new on(e,n)}matches(e){return zT(this)?this.filters.find(n=>!n.matches(e))===void 0:this.filters.find(n=>n.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,n)=>e.concat(n.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function zT(t){return t.op==="and"}function $T(t){return lN(t)&&zT(t)}function lN(t){for(const e of t.filters)if(e instanceof on)return!1;return!0}function Od(t){if(t instanceof be)return t.field.canonicalString()+t.op.toString()+gs(t.value);if($T(t))return t.filters.map(e=>Od(e)).join(",");{const e=t.filters.map(n=>Od(n)).join(",");return`${t.op}(${e})`}}function qT(t,e){return t instanceof be?function(r,i){return i instanceof be&&r.op===i.op&&r.field.isEqual(i.field)&&Tn(r.value,i.value)}(t,e):t instanceof on?function(r,i){return i instanceof on&&r.op===i.op&&r.filters.length===i.filters.length?r.filters.reduce((s,o,l)=>s&&qT(o,i.filters[l]),!0):!1}(t,e):void W(19439)}function HT(t){return t instanceof be?function(n){return`${n.field.canonicalString()} ${n.op} ${gs(n.value)}`}(t):t instanceof on?function(n){return n.op.toString()+" {"+n.getFilters().map(HT).join(" ,")+"}"}(t):"Filter"}class uN extends be{constructor(e,n,r){super(e,n,r),this.key=H.fromName(r.referenceValue)}matches(e){const n=H.comparator(e.key,this.key);return this.matchesComparison(n)}}class cN extends be{constructor(e,n){super(e,"in",n),this.keys=WT("in",n)}matches(e){return this.keys.some(n=>n.isEqual(e.key))}}class hN extends be{constructor(e,n){super(e,"not-in",n),this.keys=WT("not-in",n)}matches(e){return!this.keys.some(n=>n.isEqual(e.key))}}function WT(t,e){var n;return(((n=e.arrayValue)==null?void 0:n.values)||[]).map(r=>H.fromName(r.referenceValue))}class dN extends be{constructor(e,n){super(e,"array-contains",n)}matches(e){const n=e.data.field(this.field);return lp(n)&&ia(n.arrayValue,this.value)}}class fN extends be{constructor(e,n){super(e,"in",n)}matches(e){const n=e.data.field(this.field);return n!==null&&ia(this.value.arrayValue,n)}}class pN extends be{constructor(e,n){super(e,"not-in",n)}matches(e){if(ia(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const n=e.data.field(this.field);return n!==null&&n.nullValue===void 0&&!ia(this.value.arrayValue,n)}}class mN extends be{constructor(e,n){super(e,"array-contains-any",n)}matches(e){const n=e.data.field(this.field);return!(!lp(n)||!n.arrayValue.values)&&n.arrayValue.values.some(r=>ia(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gN{constructor(e,n=null,r=[],i=[],s=null,o=null,l=null){this.path=e,this.collectionGroup=n,this.orderBy=r,this.filters=i,this.limit=s,this.startAt=o,this.endAt=l,this.Te=null}}function i_(t,e=null,n=[],r=[],i=null,s=null,o=null){return new gN(t,e,n,r,i,s,o)}function up(t){const e=Y(t);if(e.Te===null){let n=e.path.canonicalString();e.collectionGroup!==null&&(n+="|cg:"+e.collectionGroup),n+="|f:",n+=e.filters.map(r=>Od(r)).join(","),n+="|ob:",n+=e.orderBy.map(r=>function(s){return s.field.canonicalString()+s.dir}(r)).join(","),_a(e.limit)||(n+="|l:",n+=e.limit),e.startAt&&(n+="|lb:",n+=e.startAt.inclusive?"b:":"a:",n+=e.startAt.position.map(r=>gs(r)).join(",")),e.endAt&&(n+="|ub:",n+=e.endAt.inclusive?"a:":"b:",n+=e.endAt.position.map(r=>gs(r)).join(",")),e.Te=n}return e.Te}function cp(t,e){if(t.limit!==e.limit||t.orderBy.length!==e.orderBy.length)return!1;for(let n=0;n<t.orderBy.length;n++)if(!aN(t.orderBy[n],e.orderBy[n]))return!1;if(t.filters.length!==e.filters.length)return!1;for(let n=0;n<t.filters.length;n++)if(!qT(t.filters[n],e.filters[n]))return!1;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!r_(t.startAt,e.startAt)&&r_(t.endAt,e.endAt)}function Ld(t){return H.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ds{constructor(e,n=null,r=[],i=[],s=null,o="F",l=null,u=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=i,this.limit=s,this.limitType=o,this.startAt=l,this.endAt=u,this.Ie=null,this.Ee=null,this.Re=null,this.startAt,this.endAt}}function yN(t,e,n,r,i,s,o,l){return new Ds(t,e,n,r,i,s,o,l)}function tc(t){return new Ds(t)}function s_(t){return t.filters.length===0&&t.limit===null&&t.startAt==null&&t.endAt==null&&(t.explicitOrderBy.length===0||t.explicitOrderBy.length===1&&t.explicitOrderBy[0].field.isKeyField())}function _N(t){return H.isDocumentKey(t.path)&&t.collectionGroup===null&&t.filters.length===0}function GT(t){return t.collectionGroup!==null}function No(t){const e=Y(t);if(e.Ie===null){e.Ie=[];const n=new Set;for(const s of e.explicitOrderBy)e.Ie.push(s),n.add(s.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new Ue(Ge.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(c=>{c.isInequality()&&(l=l.add(c.field))})}),l})(e).forEach(s=>{n.has(s.canonicalString())||s.isKeyField()||e.Ie.push(new oa(s,r))}),n.has(Ge.keyField().canonicalString())||e.Ie.push(new oa(Ge.keyField(),r))}return e.Ie}function vn(t){const e=Y(t);return e.Ee||(e.Ee=vN(e,No(t))),e.Ee}function vN(t,e){if(t.limitType==="F")return i_(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map(i=>{const s=i.dir==="desc"?"asc":"desc";return new oa(i.field,s)});const n=t.endAt?new du(t.endAt.position,t.endAt.inclusive):null,r=t.startAt?new du(t.startAt.position,t.startAt.inclusive):null;return i_(t.path,t.collectionGroup,e,t.filters,t.limit,n,r)}}function Md(t,e){const n=t.filters.concat([e]);return new Ds(t.path,t.collectionGroup,t.explicitOrderBy.slice(),n,t.limit,t.limitType,t.startAt,t.endAt)}function wN(t,e){const n=t.explicitOrderBy.concat([e]);return new Ds(t.path,t.collectionGroup,n,t.filters.slice(),t.limit,t.limitType,t.startAt,t.endAt)}function fu(t,e,n){return new Ds(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt)}function nc(t,e){return cp(vn(t),vn(e))&&t.limitType===e.limitType}function KT(t){return`${up(vn(t))}|lt:${t.limitType}`}function Di(t){return`Query(target=${function(n){let r=n.path.canonicalString();return n.collectionGroup!==null&&(r+=" collectionGroup="+n.collectionGroup),n.filters.length>0&&(r+=`, filters: [${n.filters.map(i=>HT(i)).join(", ")}]`),_a(n.limit)||(r+=", limit: "+n.limit),n.orderBy.length>0&&(r+=`, orderBy: [${n.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),n.startAt&&(r+=", startAt: ",r+=n.startAt.inclusive?"b:":"a:",r+=n.startAt.position.map(i=>gs(i)).join(",")),n.endAt&&(r+=", endAt: ",r+=n.endAt.inclusive?"a:":"b:",r+=n.endAt.position.map(i=>gs(i)).join(",")),`Target(${r})`}(vn(t))}; limitType=${t.limitType})`}function rc(t,e){return e.isFoundDocument()&&function(r,i){const s=i.key.path;return r.collectionGroup!==null?i.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(s):H.isDocumentKey(r.path)?r.path.isEqual(s):r.path.isImmediateParentOf(s)}(t,e)&&function(r,i){for(const s of No(r))if(!s.field.isKeyField()&&i.data.field(s.field)===null)return!1;return!0}(t,e)&&function(r,i){for(const s of r.filters)if(!s.matches(i))return!1;return!0}(t,e)&&function(r,i){return!(r.startAt&&!function(o,l,u){const c=n_(o,l,u);return o.inclusive?c<=0:c<0}(r.startAt,No(r),i)||r.endAt&&!function(o,l,u){const c=n_(o,l,u);return o.inclusive?c>=0:c>0}(r.endAt,No(r),i))}(t,e)}function EN(t){return t.collectionGroup||(t.path.length%2==1?t.path.lastSegment():t.path.get(t.path.length-2))}function QT(t){return(e,n)=>{let r=!1;for(const i of No(t)){const s=TN(i,e,n);if(s!==0)return s;r=r||i.field.isKeyField()}return 0}}function TN(t,e,n){const r=t.field.isKeyField()?H.comparator(e.key,n.key):function(s,o,l){const u=o.data.field(s),c=l.data.field(s);return u!==null&&c!==null?ms(u,c):W(42886)}(t.field,e,n);switch(t.dir){case"asc":return r;case"desc":return-1*r;default:return W(19790,{direction:t.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ii{constructor(e,n){this.mapKeyFn=e,this.equalsFn=n,this.inner={},this.innerSize=0}get(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r!==void 0){for(const[i,s]of r)if(this.equalsFn(i,e))return s}}has(e){return this.get(e)!==void 0}set(e,n){const r=this.mapKeyFn(e),i=this.inner[r];if(i===void 0)return this.inner[r]=[[e,n]],void this.innerSize++;for(let s=0;s<i.length;s++)if(this.equalsFn(i[s][0],e))return void(i[s]=[e,n]);i.push([e,n]),this.innerSize++}delete(e){const n=this.mapKeyFn(e),r=this.inner[n];if(r===void 0)return!1;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return r.length===1?delete this.inner[n]:r.splice(i,1),this.innerSize--,!0;return!1}forEach(e){jr(this.inner,(n,r)=>{for(const[i,s]of r)e(i,s)})}isEmpty(){return xT(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const IN=new ve(H.comparator);function Bn(){return IN}const XT=new ve(H.comparator);function go(...t){let e=XT;for(const n of t)e=e.insert(n.key,n);return e}function YT(t){let e=XT;return t.forEach((n,r)=>e=e.insert(n,r.overlayedDocument)),e}function ti(){return xo()}function JT(){return xo()}function xo(){return new Ii(t=>t.toString(),(t,e)=>t.isEqual(e))}const AN=new ve(H.comparator),SN=new Ue(H.comparator);function te(...t){let e=SN;for(const n of t)e=e.add(n);return e}const kN=new Ue(ee);function RN(){return kN}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ic(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:uu(e)?"-0":e}}function hp(t){return{integerValue:""+t}}function ZT(t,e){return J1(e)?hp(e):ic(t,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sc{constructor(){this._=void 0}}function CN(t,e,n){return t instanceof aa?function(i,s){const o={fields:{[VT]:{stringValue:bT},[LT]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return s&&ap(s)&&(s=ec(s)),s&&(o.fields[OT]=s),{mapValue:o}}(n,e):t instanceof ys?tI(t,e):t instanceof _s?nI(t,e):t instanceof vs?function(i,s){const o=eI(i,s),l=gu(o)+gu(i.Ae);return sa(o)&&sa(i.Ae)?hp(l):ic(i.serializer,l)}(t,e):t instanceof pu?function(i,s){return o_(i,s,Math.min)}(t,e):t instanceof mu?function(i,s){return o_(i,s,Math.max)}(t,e):void 0}function PN(t,e,n){return t instanceof ys?tI(t,e):t instanceof _s?nI(t,e):n}function eI(t,e){return t instanceof vs?FT(e)?e:{integerValue:0}:null}class aa extends sc{}class ys extends sc{constructor(e){super(),this.elements=e}}function tI(t,e){const n=rI(e);for(const r of t.elements)n.some(i=>Tn(i,r))||n.push(r);return{arrayValue:{values:n}}}class _s extends sc{constructor(e){super(),this.elements=e}}function nI(t,e){let n=rI(e);for(const r of t.elements)n=n.filter(i=>!Tn(i,r));return{arrayValue:{values:n}}}class dp extends sc{constructor(e,n){super(),this.serializer=e,this.Ae=n}}class vs extends dp{}class pu extends dp{}class mu extends dp{}function o_(t,e,n){if(!FT(e))return t.Ae;const r=n(gu(e),gu(t.Ae));return sa(e)&&sa(t.Ae)?hp(r):ic(t.serializer,r)}function gu(t){return Pe(t.integerValue||t.doubleValue)}function rI(t){return lp(t)&&t.arrayValue.values?t.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oc{constructor(e,n){this.field=e,this.transform=n}}function NN(t,e){return t.field.isEqual(e.field)&&function(r,i){return r instanceof ys&&i instanceof ys||r instanceof _s&&i instanceof _s?ps(r.elements,i.elements,Tn):r instanceof vs&&i instanceof vs||r instanceof pu&&i instanceof pu||r instanceof mu&&i instanceof mu?Tn(r.Ae,i.Ae):r instanceof aa&&i instanceof aa}(t.transform,e.transform)}class xN{constructor(e,n){this.version=e,this.transformResults=n}}class dt{constructor(e,n){this.updateTime=e,this.exists=n}static none(){return new dt}static exists(e){return new dt(void 0,e)}static updateTime(e){return new dt(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Cl(t,e){return t.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(t.updateTime):t.exists===void 0||t.exists===e.isFoundDocument()}class ac{}function iI(t,e){if(!t.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return t.isNoDocument()?new fp(t.key,dt.none()):new va(t.key,t.data,dt.none());{const n=t.data,r=ht.empty();let i=new Ue(Ge.comparator);for(let s of e.fields)if(!i.has(s)){let o=n.field(s);o===null&&s.length>1&&(s=s.popLast(),o=n.field(s)),o===null?r.delete(s):r.set(s,o),i=i.add(s)}return new Br(t.key,r,new Pt(i.toArray()),dt.none())}}function DN(t,e,n){t instanceof va?function(i,s,o){const l=i.value.clone(),u=l_(i.fieldTransforms,s,o.transformResults);l.setAll(u),s.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(t,e,n):t instanceof Br?function(i,s,o){if(!Cl(i.precondition,s))return void s.convertToUnknownDocument(o.version);const l=l_(i.fieldTransforms,s,o.transformResults),u=s.data;u.setAll(sI(i)),u.setAll(l),s.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(t,e,n):function(i,s,o){s.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,n)}function Do(t,e,n,r){return t instanceof va?function(s,o,l,u){if(!Cl(s.precondition,o))return l;const c=s.value.clone(),f=u_(s.fieldTransforms,u,o);return c.setAll(f),o.convertToFoundDocument(o.version,c).setHasLocalMutations(),null}(t,e,n,r):t instanceof Br?function(s,o,l,u){if(!Cl(s.precondition,o))return l;const c=u_(s.fieldTransforms,u,o),f=o.data;return f.setAll(sI(s)),f.setAll(c),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),l===null?null:l.unionWith(s.fieldMask.fields).unionWith(s.fieldTransforms.map(p=>p.field))}(t,e,n,r):function(s,o,l){return Cl(s.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l}(t,e,n)}function bN(t,e){let n=null;for(const r of t.fieldTransforms){const i=e.data.field(r.field),s=eI(r.transform,i||null);s!=null&&(n===null&&(n=ht.empty()),n.set(r.field,s))}return n||null}function a_(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(r,i){return r===void 0&&i===void 0||!(!r||!i)&&ps(r,i,(s,o)=>NN(s,o))}(t.fieldTransforms,e.fieldTransforms)&&(t.type===0?t.value.isEqual(e.value):t.type!==1||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask))}class va extends ac{constructor(e,n,r,i=[]){super(),this.key=e,this.value=n,this.precondition=r,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Br extends ac{constructor(e,n,r,i,s=[]){super(),this.key=e,this.data=n,this.fieldMask=r,this.precondition=i,this.fieldTransforms=s,this.type=1}getFieldMask(){return this.fieldMask}}function sI(t){const e=new Map;return t.fieldMask.fields.forEach(n=>{if(!n.isEmpty()){const r=t.data.field(n);e.set(n,r)}}),e}function l_(t,e,n){const r=new Map;se(t.length===n.length,32656,{Ve:n.length,de:t.length});for(let i=0;i<n.length;i++){const s=t[i],o=s.transform,l=e.data.field(s.field);r.set(s.field,PN(o,l,n[i]))}return r}function u_(t,e,n){const r=new Map;for(const i of t){const s=i.transform,o=n.data.field(i.field);r.set(i.field,CN(s,o,e))}return r}class fp extends ac{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class oI extends ac{constructor(e,n){super(),this.key=e,this.precondition=n,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VN{constructor(e,n,r,i){this.batchId=e,this.localWriteTime=n,this.baseMutations=r,this.mutations=i}applyToRemoteDocument(e,n){const r=n.mutationResults;for(let i=0;i<this.mutations.length;i++){const s=this.mutations[i];s.key.isEqual(e.key)&&DN(s,e,r[i])}}applyToLocalView(e,n){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(n=Do(r,e,n,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(n=Do(r,e,n,this.localWriteTime));return n}applyToLocalDocumentSet(e,n){const r=JT();return this.mutations.forEach(i=>{const s=e.get(i.key),o=s.overlayedDocument;let l=this.applyToLocalView(o,s.mutatedFields);l=n.has(i.key)?null:l;const u=iI(o,l);u!==null&&r.set(i.key,u),o.isValidDocument()||o.convertToNoDocument(K.min())}),r}keys(){return this.mutations.reduce((e,n)=>e.add(n.key),te())}isEqual(e){return this.batchId===e.batchId&&ps(this.mutations,e.mutations,(n,r)=>a_(n,r))&&ps(this.baseMutations,e.baseMutations,(n,r)=>a_(n,r))}}class pp{constructor(e,n,r,i){this.batch=e,this.commitVersion=n,this.mutationResults=r,this.docVersions=i}static from(e,n,r){se(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let i=function(){return AN}();const s=e.mutations;for(let o=0;o<s.length;o++)i=i.insert(s[o].key,r[o].version);return new pp(e,n,r,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ON{constructor(e,n){this.largestBatchId=e,this.mutation=n}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LN{constructor(e,n){this.count=e,this.unchangedNames=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var xe,ie;function aI(t){switch(t){case V.OK:return W(64938);case V.CANCELLED:case V.UNKNOWN:case V.DEADLINE_EXCEEDED:case V.RESOURCE_EXHAUSTED:case V.INTERNAL:case V.UNAVAILABLE:case V.UNAUTHENTICATED:return!1;case V.INVALID_ARGUMENT:case V.NOT_FOUND:case V.ALREADY_EXISTS:case V.PERMISSION_DENIED:case V.FAILED_PRECONDITION:case V.ABORTED:case V.OUT_OF_RANGE:case V.UNIMPLEMENTED:case V.DATA_LOSS:return!0;default:return W(15467,{code:t})}}function lI(t){if(t===void 0)return jn("GRPC error has no .code"),V.UNKNOWN;switch(t){case xe.OK:return V.OK;case xe.CANCELLED:return V.CANCELLED;case xe.UNKNOWN:return V.UNKNOWN;case xe.DEADLINE_EXCEEDED:return V.DEADLINE_EXCEEDED;case xe.RESOURCE_EXHAUSTED:return V.RESOURCE_EXHAUSTED;case xe.INTERNAL:return V.INTERNAL;case xe.UNAVAILABLE:return V.UNAVAILABLE;case xe.UNAUTHENTICATED:return V.UNAUTHENTICATED;case xe.INVALID_ARGUMENT:return V.INVALID_ARGUMENT;case xe.NOT_FOUND:return V.NOT_FOUND;case xe.ALREADY_EXISTS:return V.ALREADY_EXISTS;case xe.PERMISSION_DENIED:return V.PERMISSION_DENIED;case xe.FAILED_PRECONDITION:return V.FAILED_PRECONDITION;case xe.ABORTED:return V.ABORTED;case xe.OUT_OF_RANGE:return V.OUT_OF_RANGE;case xe.UNIMPLEMENTED:return V.UNIMPLEMENTED;case xe.DATA_LOSS:return V.DATA_LOSS;default:return W(39323,{code:t})}}(ie=xe||(xe={}))[ie.OK=0]="OK",ie[ie.CANCELLED=1]="CANCELLED",ie[ie.UNKNOWN=2]="UNKNOWN",ie[ie.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ie[ie.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ie[ie.NOT_FOUND=5]="NOT_FOUND",ie[ie.ALREADY_EXISTS=6]="ALREADY_EXISTS",ie[ie.PERMISSION_DENIED=7]="PERMISSION_DENIED",ie[ie.UNAUTHENTICATED=16]="UNAUTHENTICATED",ie[ie.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ie[ie.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ie[ie.ABORTED=10]="ABORTED",ie[ie.OUT_OF_RANGE=11]="OUT_OF_RANGE",ie[ie.UNIMPLEMENTED=12]="UNIMPLEMENTED",ie[ie.INTERNAL=13]="INTERNAL",ie[ie.UNAVAILABLE=14]="UNAVAILABLE",ie[ie.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function MN(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const UN=new Ir([4294967295,4294967295],0);function c_(t){const e=MN().encode(t),n=new wT;return n.update(e),new Uint8Array(n.digest())}function h_(t){const e=new DataView(t.buffer),n=e.getUint32(0,!0),r=e.getUint32(4,!0),i=e.getUint32(8,!0),s=e.getUint32(12,!0);return[new Ir([n,r],0),new Ir([i,s],0)]}class mp{constructor(e,n,r){if(this.bitmap=e,this.padding=n,this.hashCount=r,n<0||n>=8)throw new yo(`Invalid padding: ${n}`);if(r<0)throw new yo(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new yo(`Invalid hash count: ${r}`);if(e.length===0&&n!==0)throw new yo(`Invalid padding when bitmap length is 0: ${n}`);this.ge=8*e.length-n,this.pe=Ir.fromNumber(this.ge)}ye(e,n,r){let i=e.add(n.multiply(Ir.fromNumber(r)));return i.compare(UN)===1&&(i=new Ir([i.getBits(0),i.getBits(1)],0)),i.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const n=c_(e),[r,i]=h_(n);for(let s=0;s<this.hashCount;s++){const o=this.ye(r,i,s);if(!this.we(o))return!1}return!0}static create(e,n,r){const i=e%8==0?0:8-e%8,s=new Uint8Array(Math.ceil(e/8)),o=new mp(s,i,n);return r.forEach(l=>o.insert(l)),o}insert(e){if(this.ge===0)return;const n=c_(e),[r,i]=h_(n);for(let s=0;s<this.hashCount;s++){const o=this.ye(r,i,s);this.Se(o)}}Se(e){const n=Math.floor(e/8),r=e%8;this.bitmap[n]|=1<<r}}class yo extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wa{constructor(e,n,r,i,s){this.snapshotVersion=e,this.targetChanges=n,this.targetMismatches=r,this.documentUpdates=i,this.resolvedLimboDocuments=s}static createSynthesizedRemoteEventForCurrentChange(e,n,r){const i=new Map;return i.set(e,Ea.createSynthesizedTargetChangeForCurrentChange(e,n,r)),new wa(K.min(),i,new ve(ee),Bn(),te())}}class Ea{constructor(e,n,r,i,s){this.resumeToken=e,this.current=n,this.addedDocuments=r,this.modifiedDocuments=i,this.removedDocuments=s}static createSynthesizedTargetChangeForCurrentChange(e,n,r){return new Ea(r,n,te(),te(),te())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pl{constructor(e,n,r,i){this.be=e,this.removedTargetIds=n,this.key=r,this.De=i}}class uI{constructor(e,n){this.targetId=e,this.Ce=n}}class cI{constructor(e,n,r=Ye.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=n,this.resumeToken=r,this.cause=i}}class d_{constructor(e){this.targetId=e,this.ve=0,this.Fe=f_(),this.Me=Ye.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=te(),n=te(),r=te();return this.Fe.forEach((i,s)=>{switch(s){case 0:e=e.add(i);break;case 2:n=n.add(i);break;case 1:r=r.add(i);break;default:W(38017,{changeType:s})}}),new Ea(this.Me,this.xe,e,n,r)}qe(){this.Oe=!1,this.Fe=f_()}Ke(e,n){this.Oe=!0,this.Fe=this.Fe.insert(e,n)}Ue(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}$e(){this.ve+=1}We(){this.ve-=1,se(this.ve>=0,3241,{ve:this.ve,targetId:this.targetId})}Qe(){this.Oe=!0,this.xe=!0}}const oo="WatchChangeAggregator";class FN{constructor(e){this.Ge=e,this.ze=new Map,this.je=Bn(),this.Je=sl(),this.He=sl(),this.Ze=new ve(ee)}Xe(e){for(const n of e.be)e.De&&e.De.isFoundDocument()?this.Ye(n,e.De):this.et(n,e.key,e.De);for(const n of e.removedTargetIds)this.et(n,e.key,e.De)}tt(e){this.forEachTarget(e,n=>{const r=this.ze.get(n);if(r)switch(e.state){case 0:this.nt(n)&&r.Le(e.resumeToken);break;case 1:r.We(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.We(),r.Ne||this.removeTarget(n);break;case 3:this.nt(n)&&(r.Qe(),r.Le(e.resumeToken));break;case 4:this.nt(n)&&(this.rt(n),r.Le(e.resumeToken));break;default:W(56790,{state:e.state})}else z(oo,`handleTargetChange received targetChange for untracked target ID (${n}) with state (${e.state})`)})}forEachTarget(e,n){e.targetIds.length>0?e.targetIds.forEach(n):this.ze.forEach((r,i)=>{this.nt(i)&&n(i)})}it(e){const n=e.targetId,r=e.Ce.count,i=this.st(n);if(i){const s=i.target;if(Ld(s))if(r===0){const o=new H(s.path);this.et(n,o,ze.newNoDocument(o,K.min()))}else se(r===1,20013,{expectedCount:r});else{const o=this.ot(n);if(o!==r){const l=this._t(e),u=l?this.ut(l,e,o):1;if(u!==0){this.rt(n);const c=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(n,c)}}}}}_t(e){const n=e.Ce.unchangedNames;if(!n||!n.bits)return null;const{bits:{bitmap:r="",padding:i=0},hashCount:s=0}=n;let o,l;try{o=xr(r).toUint8Array()}catch(u){if(u instanceof DT)return pi("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new mp(o,i,s)}catch(u){return pi(u instanceof yo?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.ge===0?null:l}ut(e,n,r){return n.Ce.count===r-this.ht(e,n.targetId)?0:2}ht(e,n){const r=this.Ge.getRemoteKeysForTarget(n);let i=0;return r.forEach(s=>{const o=this.Ge.lt(),l=`projects/${o.projectId}/databases/${o.database}/documents/${s.path.canonicalString()}`;e.mightContain(l)||(this.et(n,s,null),i++)}),i}Pt(e){const n=new Map;this.ze.forEach((s,o)=>{const l=this.st(o);if(l){if(s.current&&Ld(l.target)){const u=new H(l.target.path);this.Tt(u).has(o)||this.It(o,u)||this.et(o,u,ze.newNoDocument(u,e))}s.Be&&(n.set(o,s.ke()),s.qe())}});let r=te();this.He.forEach((s,o)=>{let l=!0;o.forEachWhile(u=>{const c=this.st(u);return!c||c.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(r=r.add(s))}),this.je.forEach((s,o)=>o.setReadTime(e));const i=new wa(e,n,this.Ze,this.je,r);return this.je=Bn(),this.Je=sl(),this.He=sl(),this.Ze=new ve(ee),i}Ye(e,n){const r=this.ze.get(e);if(!r||!this.nt(e))return void z(oo,`addDocumentToTarget received document for unknown inactive target (${e})`);const i=this.It(e,n.key)?2:0;r.Ke(n.key,i),this.je=this.je.insert(n.key,n),this.Je=this.Je.insert(n.key,this.Tt(n.key).add(e)),this.He=this.He.insert(n.key,this.Et(n.key).add(e))}et(e,n,r){const i=this.ze.get(e);i&&this.nt(e)?(this.It(e,n)?i.Ke(n,1):i.Ue(n),this.He=this.He.insert(n,this.Et(n).delete(e)),this.He=this.He.insert(n,this.Et(n).add(e)),r&&(this.je=this.je.insert(n,r))):z(oo,`removeDocumentFromTarget received document for unknown or inactive target (${e})`)}removeTarget(e){this.ze.delete(e)}ot(e){const n=this.ze.get(e);if(!n)return 0;const r=n.ke();return this.Ge.getRemoteKeysForTarget(e).size+r.addedDocuments.size-r.removedDocuments.size}$e(e){let n=this.ze.get(e);n||(z(oo,`recordPendingTargetRequest set up tracking for target ID ${e}`),n=new d_(e),this.ze.set(e,n)),n.$e()}Et(e){let n=this.He.get(e);return n||(n=new Ue(ee),this.He=this.He.insert(e,n)),n}Tt(e){let n=this.Je.get(e);return n||(n=new Ue(ee),this.Je=this.Je.insert(e,n)),n}nt(e){const n=this.st(e)!==null;return n||z(oo,"Detected inactive target",e),n}st(e){const n=this.ze.get(e);return n===void 0||n.Ne?null:this.Ge.Rt(e)}rt(e){this.ze.set(e,new d_(e)),this.Ge.getRemoteKeysForTarget(e).forEach(n=>{this.et(e,n,null)})}It(e,n){return this.Ge.getRemoteKeysForTarget(e).has(n)}}function sl(){return new ve(H.comparator)}function f_(){return new ve(H.comparator)}const jN={asc:"ASCENDING",desc:"DESCENDING"},BN={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},zN={and:"AND",or:"OR"};class $N{constructor(e,n){this.databaseId=e,this.useProto3Json=n}}function Ud(t,e){return t.useProto3Json||_a(e)?e:{value:e}}function yu(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function hI(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function qN(t,e){return yu(t,e.toTimestamp())}function bt(t){return se(!!t,49232),K.fromTimestamp(function(n){const r=Nr(n);return new me(r.seconds,r.nanos)}(t))}function gp(t,e){return Fd(t,e).canonicalString()}function Fd(t,e){const n=function(i){return new ue(["projects",i.projectId,"databases",i.database])}(t).child("documents");return e===void 0?n:n.child(e)}function dI(t){const e=ue.fromString(t);return se(_I(e),10190,{key:e.toString()}),e}function _u(t,e){return gp(t.databaseId,e.path)}function bo(t,e){const n=dI(e);if(n.get(1)!==t.databaseId.projectId)throw new B(V.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new B(V.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new H(pI(n))}function fI(t,e){return gp(t.databaseId,e)}function HN(t){const e=dI(t);return e.length===4?ue.emptyPath():pI(e)}function jd(t){return new ue(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString()}function pI(t){return se(t.length>4&&t.get(4)==="documents",29091,{key:t.toString()}),t.popFirst(5)}function p_(t,e,n){return{name:_u(t,e),fields:n.value.mapValue.fields}}function WN(t,e){return"found"in e?function(r,i){se(!!i.found,43571),i.found.name,i.found.updateTime;const s=bo(r,i.found.name),o=bt(i.found.updateTime),l=i.found.createTime?bt(i.found.createTime):K.min(),u=new ht({mapValue:{fields:i.found.fields}});return ze.newFoundDocument(s,o,l,u)}(t,e):"missing"in e?function(r,i){se(!!i.missing,3894),se(!!i.readTime,22933);const s=bo(r,i.missing),o=bt(i.readTime);return ze.newNoDocument(s,o)}(t,e):W(7234,{result:e})}function GN(t,e){let n;if("targetChange"in e){e.targetChange;const r=function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:W(39313,{state:c})}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],s=function(c,f){return c.useProto3Json?(se(f===void 0||typeof f=="string",58123),Ye.fromBase64String(f||"")):(se(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),Ye.fromUint8Array(f||new Uint8Array))}(t,e.targetChange.resumeToken),o=e.targetChange.cause,l=o&&function(c){const f=c.code===void 0?V.UNKNOWN:lI(c.code);return new B(f,c.message||"")}(o);n=new cI(r,i,s,l||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const i=bo(t,r.document.name),s=bt(r.document.updateTime),o=r.document.createTime?bt(r.document.createTime):K.min(),l=new ht({mapValue:{fields:r.document.fields}}),u=ze.newFoundDocument(i,s,o,l),c=r.targetIds||[],f=r.removedTargetIds||[];n=new Pl(c,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const i=bo(t,r.document),s=r.readTime?bt(r.readTime):K.min(),o=ze.newNoDocument(i,s),l=r.removedTargetIds||[];n=new Pl([],l,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const i=bo(t,r.document),s=r.removedTargetIds||[];n=new Pl([],s,i,null)}else{if(!("filter"in e))return W(11601,{At:e});{e.filter;const r=e.filter;r.targetId;const{count:i=0,unchangedNames:s}=r,o=new LN(i,s),l=r.targetId;n=new uI(l,o)}}return n}function mI(t,e){let n;if(e instanceof va)n={update:p_(t,e.key,e.value)};else if(e instanceof fp)n={delete:_u(t,e.key)};else if(e instanceof Br)n={update:p_(t,e.key,e.data),updateMask:nx(e.fieldMask)};else{if(!(e instanceof oI))return W(16599,{Vt:e.type});n={verify:_u(t,e.key)}}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(r=>function(s,o){const l=o.transform;if(l instanceof aa)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof ys)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof _s)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof vs)return{fieldPath:o.field.canonicalString(),increment:l.Ae};if(l instanceof pu)return{fieldPath:o.field.canonicalString(),minimum:l.Ae};if(l instanceof mu)return{fieldPath:o.field.canonicalString(),maximum:l.Ae};throw W(20930,{transform:o.transform})}(0,r))),e.precondition.isNone||(n.currentDocument=function(i,s){return s.updateTime!==void 0?{updateTime:qN(i,s.updateTime)}:s.exists!==void 0?{exists:s.exists}:W(27497)}(t,e.precondition)),n}function KN(t,e){return t&&t.length>0?(se(e!==void 0,14353),t.map(n=>function(i,s){let o=i.updateTime?bt(i.updateTime):bt(s);return o.isEqual(K.min())&&(o=bt(s)),new xN(o,i.transformResults||[])}(n,e))):[]}function QN(t,e){return{documents:[fI(t,e.path)]}}function XN(t,e){const n={structuredQuery:{}},r=e.path;let i;e.collectionGroup!==null?(i=r,n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=r.popLast(),n.structuredQuery.from=[{collectionId:r.lastSegment()}]),n.parent=fI(t,i);const s=function(c){if(c.length!==0)return yI(on.create(c,"and"))}(e.filters);s&&(n.structuredQuery.where=s);const o=function(c){if(c.length!==0)return c.map(f=>function(m){return{field:bi(m.field),direction:ZN(m.dir)}}(f))}(e.orderBy);o&&(n.structuredQuery.orderBy=o);const l=Ud(t,e.limit);return l!==null&&(n.structuredQuery.limit=l),e.startAt&&(n.structuredQuery.startAt=function(c){return{before:c.inclusive,values:c.position}}(e.startAt)),e.endAt&&(n.structuredQuery.endAt=function(c){return{before:!c.inclusive,values:c.position}}(e.endAt)),{dt:n,parent:i}}function YN(t){let e=HN(t.parent);const n=t.structuredQuery,r=n.from?n.from.length:0;let i=null;if(r>0){se(r===1,65062);const f=n.from[0];f.allDescendants?i=f.collectionId:e=e.child(f.collectionId)}let s=[];n.where&&(s=function(p){const m=gI(p);return m instanceof on&&$T(m)?m.getFilters():[m]}(n.where));let o=[];n.orderBy&&(o=function(p){return p.map(m=>function(R){return new oa(Vi(R.field),function(O){switch(O){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(R.direction))}(m))}(n.orderBy));let l=null;n.limit&&(l=function(p){let m;return m=typeof p=="object"?p.value:p,_a(m)?null:m}(n.limit));let u=null;n.startAt&&(u=function(p){const m=!!p.before,I=p.values||[];return new du(I,m)}(n.startAt));let c=null;return n.endAt&&(c=function(p){const m=!p.before,I=p.values||[];return new du(I,m)}(n.endAt)),yN(e,i,o,s,l,"F",u,c)}function JN(t,e){const n=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return W(28987,{purpose:i})}}(e.purpose);return n==null?null:{"goog-listen-tags":n}}function gI(t){return t.unaryFilter!==void 0?function(n){switch(n.unaryFilter.op){case"IS_NAN":const r=Vi(n.unaryFilter.field);return be.create(r,"==",{doubleValue:NaN});case"IS_NULL":const i=Vi(n.unaryFilter.field);return be.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const s=Vi(n.unaryFilter.field);return be.create(s,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Vi(n.unaryFilter.field);return be.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return W(61313);default:return W(60726)}}(t):t.fieldFilter!==void 0?function(n){return be.create(Vi(n.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return W(58110);default:return W(50506)}}(n.fieldFilter.op),n.fieldFilter.value)}(t):t.compositeFilter!==void 0?function(n){return on.create(n.compositeFilter.filters.map(r=>gI(r)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return W(1026)}}(n.compositeFilter.op))}(t):W(30097,{filter:t})}function ZN(t){return jN[t]}function ex(t){return BN[t]}function tx(t){return zN[t]}function bi(t){return{fieldPath:t.canonicalString()}}function Vi(t){return Ge.fromServerFormat(t.fieldPath)}function yI(t){return t instanceof be?function(n){if(n.op==="=="){if(t_(n.value))return{unaryFilter:{field:bi(n.field),op:"IS_NAN"}};if(e_(n.value))return{unaryFilter:{field:bi(n.field),op:"IS_NULL"}}}else if(n.op==="!="){if(t_(n.value))return{unaryFilter:{field:bi(n.field),op:"IS_NOT_NAN"}};if(e_(n.value))return{unaryFilter:{field:bi(n.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:bi(n.field),op:ex(n.op),value:n.value}}}(t):t instanceof on?function(n){const r=n.getFilters().map(i=>yI(i));return r.length===1?r[0]:{compositeFilter:{op:tx(n.op),filters:r}}}(t):W(54877,{filter:t})}function nx(t){const e=[];return t.fields.forEach(n=>e.push(n.canonicalString())),{fieldPaths:e}}function _I(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}function vI(t){return!!t&&typeof t._toProto=="function"&&t._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xn{constructor(e,n,r,i,s=K.min(),o=K.min(),l=Ye.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=n,this.purpose=r,this.sequenceNumber=i,this.snapshotVersion=s,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new xn(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,n){return new xn(this.target,this.targetId,this.purpose,this.sequenceNumber,n,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new xn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new xn(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rx{constructor(e){this.gt=e}}function ix(t){const e=YN({parent:t.parent,structuredQuery:t.structuredQuery});return t.limitType==="LAST"?fu(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sx{constructor(){this.Sn=new ox}addToCollectionParentIndex(e,n){return this.Sn.add(n),L.resolve()}getCollectionParents(e,n){return L.resolve(this.Sn.getEntries(n))}addFieldIndex(e,n){return L.resolve()}deleteFieldIndex(e,n){return L.resolve()}deleteAllFieldIndexes(e){return L.resolve()}createTargetIndexes(e,n){return L.resolve()}getDocumentsMatchingTarget(e,n){return L.resolve(null)}getIndexType(e,n){return L.resolve(0)}getFieldIndexes(e,n){return L.resolve([])}getNextCollectionGroupToUpdate(e){return L.resolve(null)}getMinOffset(e,n){return L.resolve(Pr.min())}getMinOffsetFromCollectionGroup(e,n){return L.resolve(Pr.min())}updateCollectionGroup(e,n,r){return L.resolve()}updateIndexEntries(e,n){return L.resolve()}}class ox{constructor(){this.index={}}add(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n]||new Ue(ue.comparator),s=!i.has(r);return this.index[n]=i.add(r),s}has(e){const n=e.lastSegment(),r=e.popLast(),i=this.index[n];return i&&i.has(r)}getEntries(e){return(this.index[e]||new Ue(ue.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const m_={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},wI=41943040;class yt{static withCacheSize(e){return new yt(e,yt.DEFAULT_COLLECTION_PERCENTILE,yt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,n,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=n,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */yt.DEFAULT_COLLECTION_PERCENTILE=10,yt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,yt.DEFAULT=new yt(wI,yt.DEFAULT_COLLECTION_PERCENTILE,yt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),yt.DISABLED=new yt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class br{constructor(e){this.ir=e}next(){return this.ir+=2,this.ir}static sr(){return new br(0)}static _r(){return new br(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const g_="LruGarbageCollector",ax=1048576;function y_([t,e],[n,r]){const i=ee(t,n);return i===0?ee(e,r):i}class lx{constructor(e){this.hr=e,this.buffer=new Ue(y_),this.Pr=0}Tr(){return++this.Pr}Ir(e){const n=[e,this.Tr()];if(this.buffer.size<this.hr)this.buffer=this.buffer.add(n);else{const r=this.buffer.last();y_(n,r)<0&&(this.buffer=this.buffer.delete(r).add(n))}}get maxValue(){return this.buffer.last()[0]}}class ux{constructor(e,n,r){this.garbageCollector=e,this.asyncQueue=n,this.localStore=r,this.Er=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Er&&(this.Er.cancel(),this.Er=null)}get started(){return this.Er!==null}Rr(e){z(g_,`Garbage collection scheduled in ${e}ms`),this.Er=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Er=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(n){xs(n)?z(g_,"Ignoring IndexedDB error during garbage collection: ",n):await Ns(n)}await this.Rr(3e5)})}}class cx{constructor(e,n){this.Ar=e,this.params=n}calculateTargetCount(e,n){return this.Ar.Vr(e).next(r=>Math.floor(n/100*r))}nthSequenceNumber(e,n){if(n===0)return L.resolve(Zu.ce);const r=new lx(n);return this.Ar.forEachTarget(e,i=>r.Ir(i.sequenceNumber)).next(()=>this.Ar.dr(e,i=>r.Ir(i))).next(()=>r.maxValue)}removeTargets(e,n,r){return this.Ar.removeTargets(e,n,r)}removeOrphanedDocuments(e,n){return this.Ar.removeOrphanedDocuments(e,n)}collect(e,n){return this.params.cacheSizeCollectionThreshold===-1?(z("LruGarbageCollector","Garbage collection skipped; disabled"),L.resolve(m_)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(z("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),m_):this.mr(e,n))}getCacheSize(e){return this.Ar.getCacheSize(e)}mr(e,n){let r,i,s,o,l,u,c;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(z("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),i=this.params.maximumSequenceNumbersToCollect):i=p,o=Date.now(),this.nthSequenceNumber(e,i))).next(p=>(r=p,l=Date.now(),this.removeTargets(e,r,n))).next(p=>(s=p,u=Date.now(),this.removeOrphanedDocuments(e,r))).next(p=>(c=Date.now(),xi()<=re.DEBUG&&z("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${i} in `+(l-o)+`ms
	Removed ${s} targets in `+(u-l)+`ms
	Removed ${p} documents in `+(c-u)+`ms
Total Duration: ${c-f}ms`),L.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:s,documentsRemoved:p})))}}function hx(t,e){return new cx(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dx{constructor(){this.changes=new Ii(e=>e.toString(),(e,n)=>e.isEqual(n)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,n){this.assertNotApplied(),this.changes.set(e,ze.newInvalidDocument(e).setReadTime(n))}getEntry(e,n){this.assertNotApplied();const r=this.changes.get(n);return r!==void 0?L.resolve(r):this.getFromCache(e,n)}getEntries(e,n){return this.getAllFromCache(e,n)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fx{constructor(e,n){this.overlayedDocument=e,this.mutatedFields=n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class px{constructor(e,n,r,i){this.remoteDocumentCache=e,this.mutationQueue=n,this.documentOverlayCache=r,this.indexManager=i}getDocument(e,n){let r=null;return this.documentOverlayCache.getOverlay(e,n).next(i=>(r=i,this.remoteDocumentCache.getEntry(e,n))).next(i=>(r!==null&&Do(r.mutation,i,Pt.empty(),me.now()),i))}getDocuments(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.getLocalViewOfDocuments(e,r,te()).next(()=>r))}getLocalViewOfDocuments(e,n,r=te()){const i=ti();return this.populateOverlays(e,i,n).next(()=>this.computeViews(e,n,i,r).next(s=>{let o=go();return s.forEach((l,u)=>{o=o.insert(l,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,n){const r=ti();return this.populateOverlays(e,r,n).next(()=>this.computeViews(e,n,r,te()))}populateOverlays(e,n,r){const i=[];return r.forEach(s=>{n.has(s)||i.push(s)}),this.documentOverlayCache.getOverlays(e,i).next(s=>{s.forEach((o,l)=>{n.set(o,l)})})}computeViews(e,n,r,i){let s=Bn();const o=xo(),l=function(){return xo()}();return n.forEach((u,c)=>{const f=r.get(c.key);i.has(c.key)&&(f===void 0||f.mutation instanceof Br)?s=s.insert(c.key,c):f!==void 0?(o.set(c.key,f.mutation.getFieldMask()),Do(f.mutation,c,f.mutation.getFieldMask(),me.now())):o.set(c.key,Pt.empty())}),this.recalculateAndSaveOverlays(e,s).next(u=>(u.forEach((c,f)=>o.set(c,f)),n.forEach((c,f)=>l.set(c,new fx(f,o.get(c)??null))),l))}recalculateAndSaveOverlays(e,n){const r=xo();let i=new ve((o,l)=>o-l),s=te();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,n).next(o=>{for(const l of o)l.keys().forEach(u=>{const c=n.get(u);if(c===null)return;let f=r.get(u)||Pt.empty();f=l.applyToLocalView(c,f),r.set(u,f);const p=(i.get(l.batchId)||te()).add(u);i=i.insert(l.batchId,p)})}).next(()=>{const o=[],l=i.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),c=u.key,f=u.value,p=JT();f.forEach(m=>{if(!s.has(m)){const I=iI(n.get(m),r.get(m));I!==null&&p.set(m,I),s=s.add(m)}}),o.push(this.documentOverlayCache.saveOverlays(e,c,p))}return L.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,n){return this.remoteDocumentCache.getEntries(e,n).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,n,r,i){return _N(n)?this.getDocumentsMatchingDocumentQuery(e,n.path):GT(n)?this.getDocumentsMatchingCollectionGroupQuery(e,n,r,i):this.getDocumentsMatchingCollectionQuery(e,n,r,i)}getNextDocuments(e,n,r,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,n,r,i).next(s=>{const o=i-s.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,n,r.largestBatchId,i-s.size):L.resolve(ti());let l=ta,u=s;return o.next(c=>L.forEach(c,(f,p)=>(l<p.largestBatchId&&(l=p.largestBatchId),s.get(f)?L.resolve():this.remoteDocumentCache.getEntry(e,f).next(m=>{u=u.insert(f,m)}))).next(()=>this.populateOverlays(e,c,s)).next(()=>this.computeViews(e,u,c,te())).next(f=>({batchId:l,changes:YT(f)})))})}getDocumentsMatchingDocumentQuery(e,n){return this.getDocument(e,new H(n)).next(r=>{let i=go();return r.isFoundDocument()&&(i=i.insert(r.key,r)),i})}getDocumentsMatchingCollectionGroupQuery(e,n,r,i){const s=n.collectionGroup;let o=go();return this.indexManager.getCollectionParents(e,s).next(l=>L.forEach(l,u=>{const c=function(p,m){return new Ds(m,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(n,u.child(s));return this.getDocumentsMatchingCollectionQuery(e,c,r,i).next(f=>{f.forEach((p,m)=>{o=o.insert(p,m)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,n,r,i){let s;return this.documentOverlayCache.getOverlaysForCollection(e,n.path,r.largestBatchId).next(o=>(s=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,n,r,s,i))).next(o=>{s.forEach((u,c)=>{const f=c.getKey();o.get(f)===null&&(o=o.insert(f,ze.newInvalidDocument(f)))});let l=go();return o.forEach((u,c)=>{const f=s.get(u);f!==void 0&&Do(f.mutation,c,Pt.empty(),me.now()),rc(n,c)&&(l=l.insert(u,c))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mx{constructor(e){this.serializer=e,this.Or=new Map,this.Nr=new Map}getBundleMetadata(e,n){return L.resolve(this.Or.get(n))}saveBundleMetadata(e,n){return this.Or.set(n.id,function(i){return{id:i.id,version:i.version,createTime:bt(i.createTime)}}(n)),L.resolve()}getNamedQuery(e,n){return L.resolve(this.Nr.get(n))}saveNamedQuery(e,n){return this.Nr.set(n.name,function(i){return{name:i.name,query:ix(i.bundledQuery),readTime:bt(i.readTime)}}(n)),L.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gx{constructor(){this.overlays=new ve(H.comparator),this.Br=new Map}getOverlay(e,n){return L.resolve(this.overlays.get(n))}getOverlays(e,n){const r=ti();return L.forEach(n,i=>this.getOverlay(e,i).next(s=>{s!==null&&r.set(i,s)})).next(()=>r)}saveOverlays(e,n,r){return r.forEach((i,s)=>{this.wt(e,n,s)}),L.resolve()}removeOverlaysForBatchId(e,n,r){const i=this.Br.get(r);return i!==void 0&&(i.forEach(s=>this.overlays=this.overlays.remove(s)),this.Br.delete(r)),L.resolve()}getOverlaysForCollection(e,n,r){const i=ti(),s=n.length+1,o=new H(n.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const u=l.getNext().value,c=u.getKey();if(!n.isPrefixOf(c.path))break;c.path.length===s&&u.largestBatchId>r&&i.set(u.getKey(),u)}return L.resolve(i)}getOverlaysForCollectionGroup(e,n,r,i){let s=new ve((c,f)=>c-f);const o=this.overlays.getIterator();for(;o.hasNext();){const c=o.getNext().value;if(c.getKey().getCollectionGroup()===n&&c.largestBatchId>r){let f=s.get(c.largestBatchId);f===null&&(f=ti(),s=s.insert(c.largestBatchId,f)),f.set(c.getKey(),c)}}const l=ti(),u=s.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((c,f)=>l.set(c,f)),!(l.size()>=i)););return L.resolve(l)}wt(e,n,r){const i=this.overlays.get(r.key);if(i!==null){const o=this.Br.get(i.largestBatchId).delete(r.key);this.Br.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new ON(n,r));let s=this.Br.get(n);s===void 0&&(s=te(),this.Br.set(n,s)),this.Br.set(n,s.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yx{constructor(){this.sessionToken=Ye.EMPTY_BYTE_STRING}getSessionToken(e){return L.resolve(this.sessionToken)}setSessionToken(e,n){return this.sessionToken=n,L.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yp{constructor(){this.Lr=new Ue(je.kr),this.qr=new Ue(je.Kr)}isEmpty(){return this.Lr.isEmpty()}addReference(e,n){const r=new je(e,n);this.Lr=this.Lr.add(r),this.qr=this.qr.add(r)}Ur(e,n){e.forEach(r=>this.addReference(r,n))}removeReference(e,n){this.$r(new je(e,n))}Wr(e,n){e.forEach(r=>this.removeReference(r,n))}Qr(e){const n=new H(new ue([])),r=new je(n,e),i=new je(n,e+1),s=[];return this.qr.forEachInRange([r,i],o=>{this.$r(o),s.push(o.key)}),s}Gr(){this.Lr.forEach(e=>this.$r(e))}$r(e){this.Lr=this.Lr.delete(e),this.qr=this.qr.delete(e)}zr(e){const n=new H(new ue([])),r=new je(n,e),i=new je(n,e+1);let s=te();return this.qr.forEachInRange([r,i],o=>{s=s.add(o.key)}),s}containsKey(e){const n=new je(e,0),r=this.Lr.firstAfterOrEqual(n);return r!==null&&e.isEqual(r.key)}}class je{constructor(e,n){this.key=e,this.jr=n}static kr(e,n){return H.comparator(e.key,n.key)||ee(e.jr,n.jr)}static Kr(e,n){return ee(e.jr,n.jr)||H.comparator(e.key,n.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _x{constructor(e,n){this.indexManager=e,this.referenceDelegate=n,this.mutationQueue=[],this.Xn=1,this.Jr=new Ue(je.kr)}checkEmpty(e){return L.resolve(this.mutationQueue.length===0)}addMutationBatch(e,n,r,i){const s=this.Xn;this.Xn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new VN(s,n,r,i);this.mutationQueue.push(o);for(const l of i)this.Jr=this.Jr.add(new je(l.key,s)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return L.resolve(o)}lookupMutationBatch(e,n){return L.resolve(this.Hr(n))}getNextMutationBatchAfterBatchId(e,n){const r=n+1,i=this.Zr(r),s=i<0?0:i;return L.resolve(this.mutationQueue.length>s?this.mutationQueue[s]:null)}getHighestUnacknowledgedBatchId(){return L.resolve(this.mutationQueue.length===0?op:this.Xn-1)}getAllMutationBatches(e){return L.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,n){const r=new je(n,0),i=new je(n,Number.POSITIVE_INFINITY),s=[];return this.Jr.forEachInRange([r,i],o=>{const l=this.Hr(o.jr);s.push(l)}),L.resolve(s)}getAllMutationBatchesAffectingDocumentKeys(e,n){let r=new Ue(ee);return n.forEach(i=>{const s=new je(i,0),o=new je(i,Number.POSITIVE_INFINITY);this.Jr.forEachInRange([s,o],l=>{r=r.add(l.jr)})}),L.resolve(this.Xr(r))}getAllMutationBatchesAffectingQuery(e,n){const r=n.path,i=r.length+1;let s=r;H.isDocumentKey(s)||(s=s.child(""));const o=new je(new H(s),0);let l=new Ue(ee);return this.Jr.forEachWhile(u=>{const c=u.key.path;return!!r.isPrefixOf(c)&&(c.length===i&&(l=l.add(u.jr)),!0)},o),L.resolve(this.Xr(l))}Xr(e){const n=[];return e.forEach(r=>{const i=this.Hr(r);i!==null&&n.push(i)}),n}removeMutationBatch(e,n){se(this.Yr(n.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Jr;return L.forEach(n.mutations,i=>{const s=new je(i.key,n.batchId);return r=r.delete(s),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.Jr=r})}tr(e){}containsKey(e,n){const r=new je(n,0),i=this.Jr.firstAfterOrEqual(r);return L.resolve(n.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,L.resolve()}Yr(e,n){return this.Zr(e)}Zr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Hr(e){const n=this.Zr(e);return n<0||n>=this.mutationQueue.length?null:this.mutationQueue[n]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vx{constructor(e){this.ei=e,this.docs=function(){return new ve(H.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,n){const r=n.key,i=this.docs.get(r),s=i?i.size:0,o=this.ei(n);return this.docs=this.docs.insert(r,{document:n.mutableCopy(),size:o}),this.size+=o-s,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const n=this.docs.get(e);n&&(this.docs=this.docs.remove(e),this.size-=n.size)}getEntry(e,n){const r=this.docs.get(n);return L.resolve(r?r.document.mutableCopy():ze.newInvalidDocument(n))}getEntries(e,n){let r=Bn();return n.forEach(i=>{const s=this.docs.get(i);r=r.insert(i,s?s.document.mutableCopy():ze.newInvalidDocument(i))}),L.resolve(r)}getDocumentsMatchingQuery(e,n,r,i){let s=Bn();const o=n.path,l=new H(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:c,value:{document:f}}=u.getNext();if(!o.isPrefixOf(c.path))break;c.path.length>o.length+1||K1(G1(f),r)<=0||(i.has(f.key)||rc(n,f))&&(s=s.insert(f.key,f.mutableCopy()))}return L.resolve(s)}getAllFromCollectionGroup(e,n,r,i){W(9500)}ti(e,n){return L.forEach(this.docs,r=>n(r))}newChangeBuffer(e){return new wx(this)}getSize(e){return L.resolve(this.size)}}class wx extends dx{constructor(e){super(),this.Fr=e}applyChanges(e){const n=[];return this.changes.forEach((r,i)=>{i.isValidDocument()?n.push(this.Fr.addEntry(e,i)):this.Fr.removeEntry(r)}),L.waitFor(n)}getFromCache(e,n){return this.Fr.getEntry(e,n)}getAllFromCache(e,n){return this.Fr.getEntries(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ex{constructor(e){this.persistence=e,this.ni=new Ii(n=>up(n),cp),this.lastRemoteSnapshotVersion=K.min(),this.highestTargetId=0,this.ri=0,this.ii=new yp,this.targetCount=0,this.si=br.sr()}forEachTarget(e,n){return this.ni.forEach((r,i)=>n(i)),L.resolve()}getLastRemoteSnapshotVersion(e){return L.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return L.resolve(this.ri)}allocateTargetId(e){return this.highestTargetId=this.si.next(),L.resolve(this.highestTargetId)}setTargetsMetadata(e,n,r){return r&&(this.lastRemoteSnapshotVersion=r),n>this.ri&&(this.ri=n),L.resolve()}cr(e){this.ni.set(e.target,e);const n=e.targetId;n>this.highestTargetId&&(this.si=new br(n),this.highestTargetId=n),e.sequenceNumber>this.ri&&(this.ri=e.sequenceNumber)}addTargetData(e,n){return this.cr(n),this.targetCount+=1,L.resolve()}updateTargetData(e,n){return this.cr(n),L.resolve()}removeTargetData(e,n){return this.ni.delete(n.target),this.ii.Qr(n.targetId),this.targetCount-=1,L.resolve()}removeTargets(e,n,r){let i=0;const s=[];return this.ni.forEach((o,l)=>{l.sequenceNumber<=n&&r.get(l.targetId)===null&&(this.ni.delete(o),s.push(this.removeMatchingKeysForTargetId(e,l.targetId)),i++)}),L.waitFor(s).next(()=>i)}getTargetCount(e){return L.resolve(this.targetCount)}getTargetData(e,n){const r=this.ni.get(n)||null;return L.resolve(r)}addMatchingKeys(e,n,r){return this.ii.Ur(n,r),L.resolve()}removeMatchingKeys(e,n,r){this.ii.Wr(n,r);const i=this.persistence.referenceDelegate,s=[];return i&&n.forEach(o=>{s.push(i.markPotentiallyOrphaned(e,o))}),L.waitFor(s)}removeMatchingKeysForTargetId(e,n){return this.ii.Qr(n),L.resolve()}getMatchingKeysForTargetId(e,n){const r=this.ii.zr(n);return L.resolve(r)}containsKey(e,n){return L.resolve(this.ii.containsKey(n))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EI{constructor(e,n){this.oi={},this.overlays={},this._i=new Zu(0),this.ai=!1,this.ai=!0,this.ui=new yx,this.referenceDelegate=e(this),this.ci=new Ex(this),this.indexManager=new sx,this.remoteDocumentCache=function(i){return new vx(i)}(r=>this.referenceDelegate.li(r)),this.serializer=new rx(n),this.hi=new mx(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ai=!1,Promise.resolve()}get started(){return this.ai}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let n=this.overlays[e.toKey()];return n||(n=new gx,this.overlays[e.toKey()]=n),n}getMutationQueue(e,n){let r=this.oi[e.toKey()];return r||(r=new _x(n,this.referenceDelegate),this.oi[e.toKey()]=r),r}getGlobalsCache(){return this.ui}getTargetCache(){return this.ci}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.hi}runTransaction(e,n,r){z("MemoryPersistence","Starting transaction:",e);const i=new Tx(this._i.next());return this.referenceDelegate.Pi(),r(i).next(s=>this.referenceDelegate.Ti(i).next(()=>s)).toPromise().then(s=>(i.raiseOnCommittedEvent(),s))}Ii(e,n){return L.or(Object.values(this.oi).map(r=>()=>r.containsKey(e,n)))}}class Tx extends X1{constructor(e){super(),this.currentSequenceNumber=e}}class _p{constructor(e){this.persistence=e,this.Ei=new yp,this.Ri=null}static Ai(e){return new _p(e)}get Vi(){if(this.Ri)return this.Ri;throw W(60996)}addReference(e,n,r){return this.Ei.addReference(r,n),this.Vi.delete(r.toString()),L.resolve()}removeReference(e,n,r){return this.Ei.removeReference(r,n),this.Vi.add(r.toString()),L.resolve()}markPotentiallyOrphaned(e,n){return this.Vi.add(n.toString()),L.resolve()}removeTarget(e,n){this.Ei.Qr(n.targetId).forEach(i=>this.Vi.add(i.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,n.targetId).next(i=>{i.forEach(s=>this.Vi.add(s.toString()))}).next(()=>r.removeTargetData(e,n))}Pi(){this.Ri=new Set}Ti(e){const n=this.persistence.getRemoteDocumentCache().newChangeBuffer();return L.forEach(this.Vi,r=>{const i=H.fromPath(r);return this.di(e,i).next(s=>{s||n.removeEntry(i,K.min())})}).next(()=>(this.Ri=null,n.apply(e)))}updateLimboDocument(e,n){return this.di(e,n).next(r=>{r?this.Vi.delete(n.toString()):this.Vi.add(n.toString())})}li(e){return 0}di(e,n){return L.or([()=>L.resolve(this.Ei.containsKey(n)),()=>this.persistence.getTargetCache().containsKey(e,n),()=>this.persistence.Ii(e,n)])}}class vu{constructor(e,n){this.persistence=e,this.mi=new Ii(r=>Z1(r.path),(r,i)=>r.isEqual(i)),this.garbageCollector=hx(this,n)}static Ai(e,n){return new vu(e,n)}Pi(){}Ti(e){return L.resolve()}forEachTarget(e,n){return this.persistence.getTargetCache().forEachTarget(e,n)}Vr(e){const n=this.gr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>n.next(i=>r+i))}gr(e){let n=0;return this.dr(e,r=>{n++}).next(()=>n)}dr(e,n){return L.forEach(this.mi,(r,i)=>this.yr(e,r,i).next(s=>s?L.resolve():n(i)))}removeTargets(e,n,r){return this.persistence.getTargetCache().removeTargets(e,n,r)}removeOrphanedDocuments(e,n){let r=0;const i=this.persistence.getRemoteDocumentCache(),s=i.newChangeBuffer();return i.ti(e,o=>this.yr(e,o,n).next(l=>{l||(r++,s.removeEntry(o,K.min()))})).next(()=>s.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,n){return this.mi.set(n,e.currentSequenceNumber),L.resolve()}removeTarget(e,n){const r=n.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,n,r){return this.mi.set(r,e.currentSequenceNumber),L.resolve()}removeReference(e,n,r){return this.mi.set(r,e.currentSequenceNumber),L.resolve()}updateLimboDocument(e,n){return this.mi.set(n,e.currentSequenceNumber),L.resolve()}li(e){let n=e.key.toString().length;return e.isFoundDocument()&&(n+=kl(e.data.value)),n}yr(e,n,r){return L.or([()=>this.persistence.Ii(e,n),()=>this.persistence.getTargetCache().containsKey(e,n),()=>{const i=this.mi.get(n);return L.resolve(i!==void 0&&i>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vp{constructor(e,n,r,i){this.targetId=e,this.fromCache=n,this.Ps=r,this.Ts=i}static Is(e,n){let r=te(),i=te();for(const s of n.docChanges)switch(s.type){case 0:r=r.add(s.doc.key);break;case 1:i=i.add(s.doc.key)}return new vp(e,n.fromCache,r,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ix{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ax{constructor(){this.Es=!1,this.Rs=!1,this.As=100,this.Vs=function(){return fR()?8:Y1(ot())>0?6:4}()}initialize(e,n){this.ds=e,this.indexManager=n,this.Es=!0}getDocumentsMatchingQuery(e,n,r,i){const s={result:null};return this.fs(e,n).next(o=>{s.result=o}).next(()=>{if(!s.result)return this.gs(e,n,i,r).next(o=>{s.result=o})}).next(()=>{if(s.result)return;const o=new Ix;return this.ps(e,n,o).next(l=>{if(s.result=l,this.Rs)return this.ys(e,n,o,l.size)})}).next(()=>s.result)}ys(e,n,r,i){return r.documentReadCount<this.As?(xi()<=re.DEBUG&&z("QueryEngine","SDK will not create cache indexes for query:",Di(n),"since it only creates cache indexes for collection contains","more than or equal to",this.As,"documents"),L.resolve()):(xi()<=re.DEBUG&&z("QueryEngine","Query:",Di(n),"scans",r.documentReadCount,"local documents and returns",i,"documents as results."),r.documentReadCount>this.Vs*i?(xi()<=re.DEBUG&&z("QueryEngine","The SDK decides to create cache indexes for query:",Di(n),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,vn(n))):L.resolve())}fs(e,n){if(s_(n))return L.resolve(null);let r=vn(n);return this.indexManager.getIndexType(e,r).next(i=>i===0?null:(n.limit!==null&&i===1&&(n=fu(n,null,"F"),r=vn(n)),this.indexManager.getDocumentsMatchingTarget(e,r).next(s=>{const o=te(...s);return this.ds.getDocuments(e,o).next(l=>this.indexManager.getMinOffset(e,r).next(u=>{const c=this.ws(n,l);return this.Ss(n,c,o,u.readTime)?this.fs(e,fu(n,null,"F")):this.bs(e,c,n,u)}))})))}gs(e,n,r,i){return s_(n)||i.isEqual(K.min())?L.resolve(null):this.ds.getDocuments(e,r).next(s=>{const o=this.ws(n,s);return this.Ss(n,o,r,i)?L.resolve(null):(xi()<=re.DEBUG&&z("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Di(n)),this.bs(e,o,n,W1(i,ta)).next(l=>l))})}ws(e,n){let r=new Ue(QT(e));return n.forEach((i,s)=>{rc(e,s)&&(r=r.add(s))}),r}Ss(e,n,r,i){if(e.limit===null)return!1;if(r.size!==n.size)return!0;const s=e.limitType==="F"?n.last():n.first();return!!s&&(s.hasPendingWrites||s.version.compareTo(i)>0)}ps(e,n,r){return xi()<=re.DEBUG&&z("QueryEngine","Using full collection scan to execute query:",Di(n)),this.ds.getDocumentsMatchingQuery(e,n,Pr.min(),r)}bs(e,n,r,i){return this.ds.getDocumentsMatchingQuery(e,r,i).next(s=>(n.forEach(o=>{s=s.insert(o.key,o)}),s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wp="LocalStore",Sx=3e8;class kx{constructor(e,n,r,i){this.persistence=e,this.Ds=n,this.serializer=i,this.Cs=new ve(ee),this.vs=new Ii(s=>up(s),cp),this.Fs=new Map,this.Ms=e.getRemoteDocumentCache(),this.ci=e.getTargetCache(),this.hi=e.getBundleCache(),this.xs(r)}xs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new px(this.Ms,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ms.setIndexManager(this.indexManager),this.Ds.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",n=>e.collect(n,this.Cs))}}function Rx(t,e,n,r){return new kx(t,e,n,r)}async function TI(t,e){const n=Y(t);return await n.persistence.runTransaction("Handle user change","readonly",r=>{let i;return n.mutationQueue.getAllMutationBatches(r).next(s=>(i=s,n.xs(e),n.mutationQueue.getAllMutationBatches(r))).next(s=>{const o=[],l=[];let u=te();for(const c of i){o.push(c.batchId);for(const f of c.mutations)u=u.add(f.key)}for(const c of s){l.push(c.batchId);for(const f of c.mutations)u=u.add(f.key)}return n.localDocuments.getDocuments(r,u).next(c=>({Os:c,removedBatchIds:o,addedBatchIds:l}))})})}function Cx(t,e){const n=Y(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const i=e.batch.keys(),s=n.Ms.newChangeBuffer({trackRemovals:!0});return function(l,u,c,f){const p=c.batch,m=p.keys();let I=L.resolve();return m.forEach(R=>{I=I.next(()=>f.getEntry(u,R)).next(P=>{const O=c.docVersions.get(R);se(O!==null,48541),P.version.compareTo(O)<0&&(p.applyToRemoteDocument(P,c),P.isValidDocument()&&(P.setReadTime(c.commitVersion),f.addEntry(P)))})}),I.next(()=>l.mutationQueue.removeMutationBatch(u,p))}(n,r,e,s).next(()=>s.apply(r)).next(()=>n.mutationQueue.performConsistencyCheck(r)).next(()=>n.documentOverlayCache.removeOverlaysForBatchId(r,i,e.batch.batchId)).next(()=>n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(l){let u=te();for(let c=0;c<l.mutationResults.length;++c)l.mutationResults[c].transformResults.length>0&&(u=u.add(l.batch.mutations[c].key));return u}(e))).next(()=>n.localDocuments.getDocuments(r,i))})}function II(t){const e=Y(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",n=>e.ci.getLastRemoteSnapshotVersion(n))}function Px(t,e){const n=Y(t),r=e.snapshotVersion;let i=n.Cs;return n.persistence.runTransaction("Apply remote event","readwrite-primary",s=>{const o=n.Ms.newChangeBuffer({trackRemovals:!0});i=n.Cs;const l=[];e.targetChanges.forEach((f,p)=>{const m=i.get(p);if(!m)return;l.push(n.ci.removeMatchingKeys(s,f.removedDocuments,p).next(()=>n.ci.addMatchingKeys(s,f.addedDocuments,p)));let I=m.withSequenceNumber(s.currentSequenceNumber);e.targetMismatches.get(p)!==null?I=I.withResumeToken(Ye.EMPTY_BYTE_STRING,K.min()).withLastLimboFreeSnapshotVersion(K.min()):f.resumeToken.approximateByteSize()>0&&(I=I.withResumeToken(f.resumeToken,r)),i=i.insert(p,I),function(P,O,A){return P.resumeToken.approximateByteSize()===0||O.snapshotVersion.toMicroseconds()-P.snapshotVersion.toMicroseconds()>=Sx?!0:A.addedDocuments.size+A.modifiedDocuments.size+A.removedDocuments.size>0}(m,I,f)&&l.push(n.ci.updateTargetData(s,I))});let u=Bn(),c=te();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&l.push(n.persistence.referenceDelegate.updateLimboDocument(s,f))}),l.push(Nx(s,o,e.documentUpdates).next(f=>{u=f.Ns,c=f.Bs})),!r.isEqual(K.min())){const f=n.ci.getLastRemoteSnapshotVersion(s).next(p=>n.ci.setTargetsMetadata(s,s.currentSequenceNumber,r));l.push(f)}return L.waitFor(l).next(()=>o.apply(s)).next(()=>n.localDocuments.getLocalViewOfDocuments(s,u,c)).next(()=>u)}).then(s=>(n.Cs=i,s))}function Nx(t,e,n){let r=te(),i=te();return n.forEach(s=>r=r.add(s)),e.getEntries(t,r).next(s=>{let o=Bn();return n.forEach((l,u)=>{const c=s.get(l);u.isFoundDocument()!==c.isFoundDocument()&&(i=i.add(l)),u.isNoDocument()&&u.version.isEqual(K.min())?(e.removeEntry(l,u.readTime),o=o.insert(l,u)):!c.isValidDocument()||u.version.compareTo(c.version)>0||u.version.compareTo(c.version)===0&&c.hasPendingWrites?(e.addEntry(u),o=o.insert(l,u)):z(wp,"Ignoring outdated watch update for ",l,". Current version:",c.version," Watch version:",u.version)}),{Ns:o,Bs:i}})}function xx(t,e){const n=Y(t);return n.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=op),n.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function Dx(t,e){const n=Y(t);return n.persistence.runTransaction("Allocate target","readwrite",r=>{let i;return n.ci.getTargetData(r,e).next(s=>s?(i=s,L.resolve(i)):n.ci.allocateTargetId(r).next(o=>(i=new xn(e,o,"TargetPurposeListen",r.currentSequenceNumber),n.ci.addTargetData(r,i).next(()=>i))))}).then(r=>{const i=n.Cs.get(r.targetId);return(i===null||r.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(n.Cs=n.Cs.insert(r.targetId,r),n.vs.set(e,r.targetId)),r})}async function Bd(t,e,n){const r=Y(t),i=r.Cs.get(e),s=n?"readwrite":"readwrite-primary";try{n||await r.persistence.runTransaction("Release target",s,o=>r.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!xs(o))throw o;z(wp,`Failed to update sequence numbers for target ${e}: ${o}`)}r.Cs=r.Cs.remove(e),r.vs.delete(i.target)}function __(t,e,n){const r=Y(t);let i=K.min(),s=te();return r.persistence.runTransaction("Execute query","readwrite",o=>function(u,c,f){const p=Y(u),m=p.vs.get(f);return m!==void 0?L.resolve(p.Cs.get(m)):p.ci.getTargetData(c,f)}(r,o,vn(e)).next(l=>{if(l)return i=l.lastLimboFreeSnapshotVersion,r.ci.getMatchingKeysForTargetId(o,l.targetId).next(u=>{s=u})}).next(()=>r.Ds.getDocumentsMatchingQuery(o,e,n?i:K.min(),n?s:te())).next(l=>(bx(r,EN(e),l),{documents:l,Ls:s})))}function bx(t,e,n){let r=t.Fs.get(e)||K.min();n.forEach((i,s)=>{s.readTime.compareTo(r)>0&&(r=s.readTime)}),t.Fs.set(e,r)}class v_{constructor(){this.activeTargetIds=RN()}Ws(e){this.activeTargetIds=this.activeTargetIds.add(e)}Qs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}$s(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Vx{constructor(){this.Co=new v_,this.vo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,n,r){}addLocalQueryTarget(e,n=!0){return n&&this.Co.Ws(e),this.vo[e]||"not-current"}updateQueryState(e,n,r){this.vo[e]=n}removeLocalQueryTarget(e){this.Co.Qs(e)}isLocalQueryTarget(e){return this.Co.activeTargetIds.has(e)}clearQueryState(e){delete this.vo[e]}getAllActiveQueryTargets(){return this.Co.activeTargetIds}isActiveQueryTarget(e){return this.Co.activeTargetIds.has(e)}start(){return this.Co=new v_,Promise.resolve()}handleUserChange(e,n,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ox{Fo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const w_="ConnectivityMonitor";class E_{constructor(){this.Mo=()=>this.xo(),this.Oo=()=>this.No(),this.Bo=[],this.Lo()}Fo(e){this.Bo.push(e)}shutdown(){window.removeEventListener("online",this.Mo),window.removeEventListener("offline",this.Oo)}Lo(){window.addEventListener("online",this.Mo),window.addEventListener("offline",this.Oo)}xo(){z(w_,"Network connectivity changed: AVAILABLE");for(const e of this.Bo)e(0)}No(){z(w_,"Network connectivity changed: UNAVAILABLE");for(const e of this.Bo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ol=null;function zd(){return ol===null?ol=function(){return 268435456+Math.round(2147483648*Math.random())}():ol++,"0x"+ol.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ih="RestConnection",Lx={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class Mx{get ko(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const n=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.qo=n+"://"+e.host,this.Ko=`projects/${r}/databases/${i}`,this.Uo=this.databaseId.database===cu?`project_id=${r}`:`project_id=${r}&database_id=${i}`}$o(e,n,r,i,s){const o=zd(),l=this.Wo(e,n.toUriEncodedString());z(Ih,`Sending RPC '${e}' ${o}:`,l,r);const u={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Uo};this.Qo(u,i,s);const{host:c}=new URL(l),f=$n(c);return this.Go(e,l,u,r,f).then(p=>(z(Ih,`Received RPC '${e}' ${o}: `,p),p),p=>{throw pi(Ih,`RPC '${e}' ${o} failed with error: `,p,"url: ",l,"request:",r),p})}zo(e,n,r,i,s,o){return this.$o(e,n,r,i,s)}Qo(e,n,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Ps}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),n&&n.headers.forEach((i,s)=>e[s]=i),r&&r.headers.forEach((i,s)=>e[s]=i)}Wo(e,n){const r=Lx[e];let i=`${this.qo}/v1/${n}:${r}`;return this.databaseInfo.apiKey&&(i=`${i}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),i}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ux{constructor(e){this.jo=e.jo,this.Jo=e.Jo}Ho(e){this.Zo=e}Xo(e){this.Yo=e}e_(e){this.t_=e}onMessage(e){this.n_=e}close(){this.Jo()}send(e){this.jo(e)}r_(){this.Zo()}i_(){this.Yo()}s_(e){this.t_(e)}o_(e){this.n_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tt="WebChannelConnection",ao=(t,e,n)=>{t.listen(e,r=>{try{n(r)}catch(i){setTimeout(()=>{throw i},0)}})};class is extends Mx{constructor(e){super(e),this.__=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static a_(){if(!is.u_){const e=AT();ao(e,IT.STAT_EVENT,n=>{n.stat===Dd.PROXY?z(tt,"STAT_EVENT: detected buffering proxy"):n.stat===Dd.NOPROXY&&z(tt,"STAT_EVENT: detected no buffering proxy")}),is.u_=!0}}Go(e,n,r,i,s){const o=zd();return new Promise((l,u)=>{const c=new ET;c.setWithCredentials(!0),c.listenOnce(TT.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case Sl.NO_ERROR:const p=c.getResponseJson();z(tt,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(p)),l(p);break;case Sl.TIMEOUT:z(tt,`RPC '${e}' ${o} timed out`),u(new B(V.DEADLINE_EXCEEDED,"Request time out"));break;case Sl.HTTP_ERROR:const m=c.getStatus();if(z(tt,`RPC '${e}' ${o} failed with status:`,m,"response text:",c.getResponseText()),m>0){let I=c.getResponseJson();Array.isArray(I)&&(I=I[0]);const R=I==null?void 0:I.error;if(R&&R.status&&R.message){const P=function(A){const w=A.toLowerCase().replace(/_/g,"-");return Object.values(V).indexOf(w)>=0?w:V.UNKNOWN}(R.status);u(new B(P,R.message))}else u(new B(V.UNKNOWN,"Server responded with status "+c.getStatus()))}else u(new B(V.UNAVAILABLE,"Connection failed."));break;default:W(9055,{c_:e,streamId:o,l_:c.getLastErrorCode(),h_:c.getLastError()})}}finally{z(tt,`RPC '${e}' ${o} completed.`)}});const f=JSON.stringify(i);z(tt,`RPC '${e}' ${o} sending request:`,i),c.send(n,"POST",f,r,15)})}P_(e,n,r){const i=zd(),s=[this.qo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=this.createWebChannelTransport(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},u=this.longPollingOptions.timeoutSeconds;u!==void 0&&(l.longPollingTimeout=Math.round(1e3*u)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Qo(l.initMessageHeaders,n,r),l.encodeInitMessageHeaders=!0;const c=s.join("");z(tt,`Creating RPC '${e}' stream ${i}: ${c}`,l);const f=o.createWebChannel(c,l);this.T_(f);let p=!1,m=!1;const I=new Ux({jo:R=>{m?z(tt,`Not sending because RPC '${e}' stream ${i} is closed:`,R):(p||(z(tt,`Opening RPC '${e}' stream ${i} transport.`),f.open(),p=!0),z(tt,`RPC '${e}' stream ${i} sending:`,R),f.send(R))},Jo:()=>f.close()});return ao(f,mo.EventType.OPEN,()=>{m||(z(tt,`RPC '${e}' stream ${i} transport opened.`),I.r_())}),ao(f,mo.EventType.CLOSE,()=>{m||(m=!0,z(tt,`RPC '${e}' stream ${i} transport closed`),I.s_(),this.I_(f))}),ao(f,mo.EventType.ERROR,R=>{m||(m=!0,pi(tt,`RPC '${e}' stream ${i} transport errored. Name:`,R.name,"Message:",R.message),I.s_(new B(V.UNAVAILABLE,"The operation could not be completed")))}),ao(f,mo.EventType.MESSAGE,R=>{var P;if(!m){const O=R.data[0];se(!!O,16349);const A=O,w=(A==null?void 0:A.error)||((P=A[0])==null?void 0:P.error);if(w){z(tt,`RPC '${e}' stream ${i} received error:`,w);const k=w.status;let b=function(v){const y=xe[v];if(y!==void 0)return lI(y)}(k),F=w.message;k==="NOT_FOUND"&&F.includes("database")&&F.includes("does not exist")&&F.includes(this.databaseId.database)&&pi(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),b===void 0&&(b=V.INTERNAL,F="Unknown error status: "+k+" with message "+w.message),m=!0,I.s_(new B(b,F)),f.close()}else z(tt,`RPC '${e}' stream ${i} received:`,O),I.o_(O)}}),is.a_(),setTimeout(()=>{I.i_()},0),I}terminate(){this.__.forEach(e=>e.close()),this.__=[]}T_(e){this.__.push(e)}I_(e){this.__=this.__.filter(n=>n===e)}Qo(e,n,r){super.Qo(e,n,r),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return ST()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fx(t){return new is(t)}function Ah(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lc(t){return new $N(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */is.u_=!1;class Ep{constructor(e,n,r=1e3,i=1.5,s=6e4){this.Di=e,this.timerId=n,this.E_=r,this.R_=i,this.A_=s,this.V_=0,this.d_=null,this.m_=Date.now(),this.reset()}reset(){this.V_=0}f_(){this.V_=this.A_}g_(e){this.cancel();const n=Math.floor(this.V_+this.p_()),r=Math.max(0,Date.now()-this.m_),i=Math.max(0,n-r);i>0&&z("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.V_} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.d_=this.Di.enqueueAfterDelay(this.timerId,i,()=>(this.m_=Date.now(),e())),this.V_*=this.R_,this.V_<this.E_&&(this.V_=this.E_),this.V_>this.A_&&(this.V_=this.A_)}y_(){this.d_!==null&&(this.d_.skipDelay(),this.d_=null)}cancel(){this.d_!==null&&(this.d_.cancel(),this.d_=null)}p_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const T_="PersistentStream";class AI{constructor(e,n,r,i,s,o,l,u){this.Di=e,this.w_=r,this.S_=i,this.connection=s,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.b_=0,this.D_=null,this.C_=null,this.stream=null,this.v_=0,this.F_=new Ep(e,n)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.v_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Di.enqueueAfterDelay(this.w_,6e4,()=>this.L_()))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}async close(e,n){this.q_(),this.K_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():n&&n.code===V.RESOURCE_EXHAUSTED?(jn(n.toString()),jn("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):n&&n.code===V.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.e_(n)}U_(){}auth(){this.state=1;const e=this.W_(this.b_),n=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,i])=>{this.b_===n&&this.Q_(r,i)},r=>{e(()=>{const i=new B(V.UNKNOWN,"Fetching auth token failed: "+r.message);return this.G_(i)})})}Q_(e,n){const r=this.W_(this.b_);this.stream=this.z_(e,n),this.stream.Ho(()=>{r(()=>this.listener.Ho())}),this.stream.Xo(()=>{r(()=>(this.state=2,this.C_=this.Di.enqueueAfterDelay(this.S_,1e4,()=>(this.x_()&&(this.state=3),Promise.resolve())),this.listener.Xo()))}),this.stream.e_(i=>{r(()=>this.G_(i))}),this.stream.onMessage(i=>{r(()=>++this.v_==1?this.j_(i):this.onNext(i))})}O_(){this.state=5,this.F_.g_(async()=>{this.state=0,this.start()})}G_(e){return z(T_,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return n=>{this.Di.enqueueAndForget(()=>this.b_===e?n():(z(T_,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class jx extends AI{constructor(e,n,r,i,s,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",n,r,i,o),this.serializer=s}z_(e,n){return this.connection.P_("Listen",e,n)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();const n=GN(this.serializer,e),r=function(s){if(!("targetChange"in s))return K.min();const o=s.targetChange;return o.targetIds&&o.targetIds.length?K.min():o.readTime?bt(o.readTime):K.min()}(e);return this.listener.J_(n,r)}H_(e){const n={};n.database=jd(this.serializer),n.addTarget=function(s,o){let l;const u=o.target;if(l=Ld(u)?{documents:QN(s,u)}:{query:XN(s,u).dt},l.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){l.resumeToken=hI(s,o.resumeToken);const c=Ud(s,o.expectedCount);c!==null&&(l.expectedCount=c)}else if(o.snapshotVersion.compareTo(K.min())>0){l.readTime=yu(s,o.snapshotVersion.toTimestamp());const c=Ud(s,o.expectedCount);c!==null&&(l.expectedCount=c)}return l}(this.serializer,e);const r=JN(this.serializer,e);r&&(n.labels=r),this.k_(n)}Z_(e){const n={};n.database=jd(this.serializer),n.removeTarget=e,this.k_(n)}}class Bx extends AI{constructor(e,n,r,i,s,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",n,r,i,o),this.serializer=s}get X_(){return this.v_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.X_&&this.Y_([])}z_(e,n){return this.connection.P_("Write",e,n)}j_(e){return se(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,se(!e.writeResults||e.writeResults.length===0,55816),this.listener.ea()}onNext(e){se(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.F_.reset();const n=KN(e.writeResults,e.commitTime),r=bt(e.commitTime);return this.listener.ta(r,n)}na(){const e={};e.database=jd(this.serializer),this.k_(e)}Y_(e){const n={streamToken:this.lastStreamToken,writes:e.map(r=>mI(this.serializer,r))};this.k_(n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zx{}class $x extends zx{constructor(e,n,r,i){super(),this.authCredentials=e,this.appCheckCredentials=n,this.connection=r,this.serializer=i,this.ra=!1}ia(){if(this.ra)throw new B(V.FAILED_PRECONDITION,"The client has already been terminated.")}$o(e,n,r,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,o])=>this.connection.$o(e,Fd(n,r),i,s,o)).catch(s=>{throw s.name==="FirebaseError"?(s.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new B(V.UNKNOWN,s.toString())})}zo(e,n,r,i,s){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.zo(e,Fd(n,r),i,o,l,s)).catch(o=>{throw o.name==="FirebaseError"?(o.code===V.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new B(V.UNKNOWN,o.toString())})}terminate(){this.ra=!0,this.connection.terminate()}}function qx(t,e,n,r){return new $x(t,e,n,r)}class Hx{constructor(e,n){this.asyncQueue=e,this.onlineStateHandler=n,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve())))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){const n=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(jn(n),this._a=!1):z("OnlineStateTracker",n)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const In="RemoteStore";class Wx{constructor(e,n,r,i,s){this.localStore=e,this.datastore=n,this.asyncQueue=r,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Map,this.Ea=new Map,this.Ra=new br(1e3),this.Aa=new br(1001),this.Va=new Set,this.da=[],this.ma=s,this.ma.Fo(o=>{r.enqueueAndForget(async()=>{Ai(this)&&(z(In,"Restarting streams for network reachability change."),await async function(u){const c=Y(u);c.Va.add(4),await Ta(c),c.fa.set("Unknown"),c.Va.delete(4),await uc(c)}(this))})}),this.fa=new Hx(r,i)}}async function uc(t){if(Ai(t))for(const e of t.da)await e(!0)}async function Ta(t){for(const e of t.da)await e(!1)}function $d(t,e){return t.Ia.get(e)||void 0}function SI(t,e){const n=Y(t),r=$d(n,e.targetId);if(r!==void 0&&n.Ta.has(r))return;const i=function(l,u){const c=$d(l,u);c!==void 0&&l.Ea.delete(c);const f=function(m,I){return I%2!=0?m.Aa.next():m.Ra.next()}(l,u);return l.Ia.set(u,f),l.Ea.set(f,u),f}(n,e.targetId);z(In,"remoteStoreListen mapping SDK target ID to remote",e.targetId,i);const s=new xn(e.target,i,e.purpose,e.sequenceNumber,e.snapshotVersion,e.lastLimboFreeSnapshotVersion,e.resumeToken);n.Ta.set(i,s),Sp(n)?Ap(n):bs(n).x_()&&Ip(n,s)}function Tp(t,e){const n=Y(t),r=bs(n),i=$d(n,e);z(In,"remoteStoreUnlisten removing mapping of SDK target ID to remote",e,i),n.Ta.delete(i),n.Ia.delete(e),n.Ea.delete(i),r.x_()&&kI(n,i),n.Ta.size===0&&(r.x_()?r.B_():Ai(n)&&n.fa.set("Unknown"))}function Ip(t,e){if(t.ga.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(K.min())>0){const n=t.Ea.get(e.targetId);if(n===void 0)return void z(In,"SDK target ID not found for remote ID: "+e.targetId);const r=t.remoteSyncer.getRemoteKeysForTarget(n).size;e=e.withExpectedCount(r)}bs(t).H_(e)}function kI(t,e){t.ga.$e(e),bs(t).Z_(e)}function Ap(t){t.ga=new FN({getRemoteKeysForTarget:e=>{const n=t.Ea.get(e);return n!==void 0?t.remoteSyncer.getRemoteKeysForTarget(n):te()},Rt:e=>t.Ta.get(e)||null,lt:()=>t.datastore.serializer.databaseId}),bs(t).start(),t.fa.aa()}function Sp(t){return Ai(t)&&!bs(t).M_()&&t.Ta.size>0}function Ai(t){return Y(t).Va.size===0}function RI(t){t.ga=void 0}async function Gx(t){t.fa.set("Online")}async function Kx(t){t.Ta.forEach((e,n)=>{Ip(t,e)})}async function Qx(t,e){RI(t),Sp(t)?(t.fa.la(e),Ap(t)):t.fa.set("Unknown")}async function Xx(t,e,n){if(t.fa.set("Online"),e instanceof cI&&e.state===2&&e.cause)try{await async function(i,s){const o=s.cause;for(const l of s.targetIds){if(i.Ta.has(l)){const u=i.Ea.get(l);u!==void 0&&(await i.remoteSyncer.rejectListen(u,o),i.Ia.delete(u),i.Ea.delete(l)),i.Ta.delete(l)}i.ga.removeTarget(l)}}(t,e)}catch(r){z(In,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await wu(t,r)}else if(e instanceof Pl?t.ga.Xe(e):e instanceof uI?t.ga.it(e):t.ga.tt(e),!n.isEqual(K.min()))try{const r=await II(t.localStore);n.compareTo(r)>=0&&await function(s,o){const l=s.ga.Pt(o);l.targetChanges.forEach((c,f)=>{if(c.resumeToken.approximateByteSize()>0){const p=s.Ta.get(f);p&&s.Ta.set(f,p.withResumeToken(c.resumeToken,o))}}),l.targetMismatches.forEach((c,f)=>{const p=s.Ta.get(c);if(!p)return;s.Ta.set(c,p.withResumeToken(Ye.EMPTY_BYTE_STRING,p.snapshotVersion)),kI(s,c);const m=new xn(p.target,c,f,p.sequenceNumber);Ip(s,m)});const u=function(f,p){const m=new Map;p.targetChanges.forEach((R,P)=>{const O=f.Ea.get(P);O!==void 0&&m.set(O,R)});let I=new ve(ee);return p.targetMismatches.forEach((R,P)=>{const O=f.Ea.get(R);O!==void 0&&(I=I.insert(O,P))}),new wa(p.snapshotVersion,m,I,p.documentUpdates,p.resolvedLimboDocuments)}(s,l);return s.remoteSyncer.applyRemoteEvent(u)}(t,n)}catch(r){z(In,"Failed to raise snapshot:",r),await wu(t,r)}}async function wu(t,e,n){if(!xs(e))throw e;t.Va.add(1),await Ta(t),t.fa.set("Offline"),n||(n=()=>II(t.localStore)),t.asyncQueue.enqueueRetryable(async()=>{z(In,"Retrying IndexedDB access"),await n(),t.Va.delete(1),await uc(t)})}function CI(t,e){return e().catch(n=>wu(t,n,e))}async function cc(t){const e=Y(t),n=Vr(e);let r=e.Pa.length>0?e.Pa[e.Pa.length-1].batchId:op;for(;Yx(e);)try{const i=await xx(e.localStore,r);if(i===null){e.Pa.length===0&&n.B_();break}r=i.batchId,Jx(e,i)}catch(i){await wu(e,i)}PI(e)&&NI(e)}function Yx(t){return Ai(t)&&t.Pa.length<10}function Jx(t,e){t.Pa.push(e);const n=Vr(t);n.x_()&&n.X_&&n.Y_(e.mutations)}function PI(t){return Ai(t)&&!Vr(t).M_()&&t.Pa.length>0}function NI(t){Vr(t).start()}async function Zx(t){Vr(t).na()}async function e2(t){const e=Vr(t);for(const n of t.Pa)e.Y_(n.mutations)}async function t2(t,e,n){const r=t.Pa.shift(),i=pp.from(r,e,n);await CI(t,()=>t.remoteSyncer.applySuccessfulWrite(i)),await cc(t)}async function n2(t,e){e&&Vr(t).X_&&await async function(r,i){if(function(o){return aI(o)&&o!==V.ABORTED}(i.code)){const s=r.Pa.shift();Vr(r).N_(),await CI(r,()=>r.remoteSyncer.rejectFailedWrite(s.batchId,i)),await cc(r)}}(t,e),PI(t)&&NI(t)}async function I_(t,e){const n=Y(t);n.asyncQueue.verifyOperationInProgress(),z(In,"RemoteStore received new credentials");const r=Ai(n);n.Va.add(3),await Ta(n),r&&n.fa.set("Unknown"),await n.remoteSyncer.handleCredentialChange(e),n.Va.delete(3),await uc(n)}async function r2(t,e){const n=Y(t);e?(n.Va.delete(2),await uc(n)):e||(n.Va.add(2),await Ta(n),n.fa.set("Unknown"))}function bs(t){return t.pa||(t.pa=function(n,r,i){const s=Y(n);return s.ia(),new jx(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(t.datastore,t.asyncQueue,{Ho:Gx.bind(null,t),Xo:Kx.bind(null,t),e_:Qx.bind(null,t),J_:Xx.bind(null,t)}),t.da.push(async e=>{e?(t.pa.N_(),Sp(t)?Ap(t):t.fa.set("Unknown")):(await t.pa.stop(),RI(t))})),t.pa}function Vr(t){return t.ya||(t.ya=function(n,r,i){const s=Y(n);return s.ia(),new Bx(r,s.connection,s.authCredentials,s.appCheckCredentials,s.serializer,i)}(t.datastore,t.asyncQueue,{Ho:()=>Promise.resolve(),Xo:Zx.bind(null,t),e_:n2.bind(null,t),ea:e2.bind(null,t),ta:t2.bind(null,t)}),t.da.push(async e=>{e?(t.ya.N_(),await cc(t)):(await t.ya.stop(),t.Pa.length>0&&(z(In,`Stopping write stream with ${t.Pa.length} pending writes`),t.Pa=[]))})),t.ya}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kp{constructor(e,n,r,i,s){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=i,this.removalCallback=s,this.deferred=new _n,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,i,s){const o=Date.now()+r,l=new kp(e,n,o,i,s);return l.start(r),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new B(V.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Rp(t,e){if(jn("AsyncQueue",`${e}: ${t}`),xs(t))return new B(V.UNAVAILABLE,`${e}: ${t}`);throw t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ss{static emptySet(e){return new ss(e.comparator)}constructor(e){this.comparator=e?(n,r)=>e(n,r)||H.comparator(n.key,r.key):(n,r)=>H.comparator(n.key,r.key),this.keyedMap=go(),this.sortedSet=new ve(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const n=this.keyedMap.get(e);return n?this.sortedSet.indexOf(n):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((n,r)=>(e(n),!1))}add(e){const n=this.delete(e.key);return n.copy(n.keyedMap.insert(e.key,e),n.sortedSet.insert(e,null))}delete(e){const n=this.get(e);return n?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(n)):this}isEqual(e){if(!(e instanceof ss)||this.size!==e.size)return!1;const n=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;n.hasNext();){const i=n.getNext().key,s=r.getNext().key;if(!i.isEqual(s))return!1}return!0}toString(){const e=[];return this.forEach(n=>{e.push(n.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,n){const r=new ss;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=n,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A_{constructor(){this.wa=new ve(H.comparator)}track(e){const n=e.doc.key,r=this.wa.get(n);r?e.type!==0&&r.type===3?this.wa=this.wa.insert(n,e):e.type===3&&r.type!==1?this.wa=this.wa.insert(n,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.wa=this.wa.insert(n,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.wa=this.wa.insert(n,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.wa=this.wa.remove(n):e.type===1&&r.type===2?this.wa=this.wa.insert(n,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.wa=this.wa.insert(n,{type:2,doc:e.doc}):W(63341,{At:e,Sa:r}):this.wa=this.wa.insert(n,e)}ba(){const e=[];return this.wa.inorderTraversal((n,r)=>{e.push(r)}),e}}class ws{constructor(e,n,r,i,s,o,l,u,c){this.query=e,this.docs=n,this.oldDocs=r,this.docChanges=i,this.mutatedKeys=s,this.fromCache=o,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=c}static fromInitialDocuments(e,n,r,i,s){const o=[];return n.forEach(l=>{o.push({type:0,doc:l})}),new ws(e,n,ss.emptySet(n),o,r,i,!0,!1,s)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&nc(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const n=this.docChanges,r=e.docChanges;if(n.length!==r.length)return!1;for(let i=0;i<n.length;i++)if(n[i].type!==r[i].type||!n[i].doc.isEqual(r[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class i2{constructor(){this.Da=void 0,this.Ca=[]}va(){return this.Ca.some(e=>e.Fa())}}class s2{constructor(){this.queries=S_(),this.onlineState="Unknown",this.Ma=new Set}terminate(){(function(n,r){const i=Y(n),s=i.queries;i.queries=S_(),s.forEach((o,l)=>{for(const u of l.Ca)u.onError(r)})})(this,new B(V.ABORTED,"Firestore shutting down"))}}function S_(){return new Ii(t=>KT(t),nc)}async function Cp(t,e){const n=Y(t);let r=3;const i=e.query;let s=n.queries.get(i);s?!s.va()&&e.Fa()&&(r=2):(s=new i2,r=e.Fa()?0:1);try{switch(r){case 0:s.Da=await n.onListen(i,!0);break;case 1:s.Da=await n.onListen(i,!1);break;case 2:await n.onFirstRemoteStoreListen(i)}}catch(o){const l=Rp(o,`Initialization of query '${Di(e.query)}' failed`);return void e.onError(l)}n.queries.set(i,s),s.Ca.push(e),e.xa(n.onlineState),s.Da&&e.Oa(s.Da)&&Np(n)}async function Pp(t,e){const n=Y(t),r=e.query;let i=3;const s=n.queries.get(r);if(s){const o=s.Ca.indexOf(e);o>=0&&(s.Ca.splice(o,1),s.Ca.length===0?i=e.Fa()?0:1:!s.va()&&e.Fa()&&(i=2))}switch(i){case 0:return n.queries.delete(r),n.onUnlisten(r,!0);case 1:return n.queries.delete(r),n.onUnlisten(r,!1);case 2:return n.onLastRemoteStoreUnlisten(r);default:return}}function o2(t,e){const n=Y(t);let r=!1;for(const i of e){const s=i.query,o=n.queries.get(s);if(o){for(const l of o.Ca)l.Oa(i)&&(r=!0);o.Da=i}}r&&Np(n)}function a2(t,e,n){const r=Y(t),i=r.queries.get(e);if(i)for(const s of i.Ca)s.onError(n);r.queries.delete(e)}function Np(t){t.Ma.forEach(e=>{e.next()})}var qd,k_;(k_=qd||(qd={})).Na="default",k_.Cache="cache";class xp{constructor(e,n,r){this.query=e,this.Ba=n,this.La=!1,this.ka=null,this.onlineState="Unknown",this.options=r||{}}Oa(e){if(!this.options.includeMetadataChanges){const r=[];for(const i of e.docChanges)i.type!==3&&r.push(i);e=new ws(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let n=!1;return this.La?this.qa(e)&&(this.Ba.next(e),n=!0):this.Ka(e,this.onlineState)&&(this.Ua(e),n=!0),this.ka=e,n}onError(e){this.Ba.error(e)}xa(e){this.onlineState=e;let n=!1;return this.ka&&!this.La&&this.Ka(this.ka,e)&&(this.Ua(this.ka),n=!0),n}Ka(e,n){if(!e.fromCache||!this.Fa())return!0;const r=n!=="Offline";return(!this.options.$a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||n==="Offline")}qa(e){if(e.docChanges.length>0)return!0;const n=this.ka&&this.ka.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!n)&&this.options.includeMetadataChanges===!0}Ua(e){e=ws.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.La=!0,this.Ba.next(e)}Fa(){return this.options.source!==qd.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xI{constructor(e){this.key=e}}class DI{constructor(e){this.key=e}}class l2{constructor(e,n){this.query=e,this.eu=n,this.tu=null,this.hasCachedResults=!1,this.current=!1,this.nu=te(),this.mutatedKeys=te(),this.ru=QT(e),this.iu=new ss(this.ru)}get su(){return this.eu}ou(e,n){const r=n?n._u:new A_,i=n?n.iu:this.iu;let s=n?n.mutatedKeys:this.mutatedKeys,o=i,l=!1;const u=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,c=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((f,p)=>{const m=i.get(f),I=rc(this.query,p)?p:null,R=!!m&&this.mutatedKeys.has(m.key),P=!!I&&(I.hasLocalMutations||this.mutatedKeys.has(I.key)&&I.hasCommittedMutations);let O=!1;m&&I?m.data.isEqual(I.data)?R!==P&&(r.track({type:3,doc:I}),O=!0):this.au(m,I)||(r.track({type:2,doc:I}),O=!0,(u&&this.ru(I,u)>0||c&&this.ru(I,c)<0)&&(l=!0)):!m&&I?(r.track({type:0,doc:I}),O=!0):m&&!I&&(r.track({type:1,doc:m}),O=!0,(u||c)&&(l=!0)),O&&(I?(o=o.add(I),s=P?s.add(f):s.delete(f)):(o=o.delete(f),s=s.delete(f)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),s=s.delete(f.key),r.track({type:1,doc:f})}return{iu:o,_u:r,Ss:l,mutatedKeys:s}}au(e,n){return e.hasLocalMutations&&n.hasCommittedMutations&&!n.hasLocalMutations}applyChanges(e,n,r,i){const s=this.iu;this.iu=e.iu,this.mutatedKeys=e.mutatedKeys;const o=e._u.ba();o.sort((f,p)=>function(I,R){const P=O=>{switch(O){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return W(20277,{At:O})}};return P(I)-P(R)}(f.type,p.type)||this.ru(f.doc,p.doc)),this.uu(r),i=i??!1;const l=n&&!i?this.cu():[],u=this.nu.size===0&&this.current&&!i?1:0,c=u!==this.tu;return this.tu=u,o.length!==0||c?{snapshot:new ws(this.query,e.iu,s,o,e.mutatedKeys,u===0,c,!1,!!r&&r.resumeToken.approximateByteSize()>0),lu:l}:{lu:l}}xa(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({iu:this.iu,_u:new A_,mutatedKeys:this.mutatedKeys,Ss:!1},!1)):{lu:[]}}hu(e){return!this.eu.has(e)&&!!this.iu.has(e)&&!this.iu.get(e).hasLocalMutations}uu(e){e&&(e.addedDocuments.forEach(n=>this.eu=this.eu.add(n)),e.modifiedDocuments.forEach(n=>{}),e.removedDocuments.forEach(n=>this.eu=this.eu.delete(n)),this.current=e.current)}cu(){if(!this.current)return[];const e=this.nu;this.nu=te(),this.iu.forEach(r=>{this.hu(r.key)&&(this.nu=this.nu.add(r.key))});const n=[];return e.forEach(r=>{this.nu.has(r)||n.push(new DI(r))}),this.nu.forEach(r=>{e.has(r)||n.push(new xI(r))}),n}Pu(e){this.eu=e.Ls,this.nu=te();const n=this.ou(e.documents);return this.applyChanges(n,!0)}Tu(){return ws.fromInitialDocuments(this.query,this.iu,this.mutatedKeys,this.tu===0,this.hasCachedResults)}}const Dp="SyncEngine";class u2{constructor(e,n,r){this.query=e,this.targetId=n,this.view=r}}class c2{constructor(e){this.key=e,this.Iu=!1}}class h2{constructor(e,n,r,i,s,o){this.localStore=e,this.remoteStore=n,this.eventManager=r,this.sharedClientState=i,this.currentUser=s,this.maxConcurrentLimboResolutions=o,this.Eu={},this.Ru=new Ii(l=>KT(l),nc),this.Au=new Map,this.Vu=new Set,this.du=new ve(H.comparator),this.mu=new Map,this.fu=new yp,this.gu={},this.pu=new Map,this.yu=br._r(),this.onlineState="Unknown",this.wu=void 0}get isPrimaryClient(){return this.wu===!0}}async function d2(t,e,n=!0){const r=UI(t);let i;const s=r.Ru.get(e);return s?(r.sharedClientState.addLocalQueryTarget(s.targetId),i=s.view.Tu()):i=await bI(r,e,n,!0),i}async function f2(t,e){const n=UI(t);await bI(n,e,!0,!1)}async function bI(t,e,n,r){const i=await Dx(t.localStore,vn(e)),s=i.targetId,o=t.sharedClientState.addLocalQueryTarget(s,n);let l;return r&&(l=await p2(t,e,s,o==="current",i.resumeToken)),t.isPrimaryClient&&n&&SI(t.remoteStore,i),l}async function p2(t,e,n,r,i){t.Su=(p,m,I)=>async function(P,O,A,w){let k=O.view.ou(A);k.Ss&&(k=await __(P.localStore,O.query,!1).then(({documents:v})=>O.view.ou(v,k)));const b=w&&w.targetChanges.get(O.targetId),F=w&&w.targetMismatches.get(O.targetId)!=null,M=O.view.applyChanges(k,P.isPrimaryClient,b,F);return C_(P,O.targetId,M.lu),M.snapshot}(t,p,m,I);const s=await __(t.localStore,e,!0),o=new l2(e,s.Ls),l=o.ou(s.documents),u=Ea.createSynthesizedTargetChangeForCurrentChange(n,r&&t.onlineState!=="Offline",i),c=o.applyChanges(l,t.isPrimaryClient,u);C_(t,n,c.lu);const f=new u2(e,n,o);return t.Ru.set(e,f),t.Au.has(n)?t.Au.get(n).push(e):t.Au.set(n,[e]),c.snapshot}async function m2(t,e,n){const r=Y(t),i=r.Ru.get(e),s=r.Au.get(i.targetId);if(s.length>1)return r.Au.set(i.targetId,s.filter(o=>!nc(o,e))),void r.Ru.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(i.targetId),r.sharedClientState.isActiveQueryTarget(i.targetId)||await Bd(r.localStore,i.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(i.targetId),n&&Tp(r.remoteStore,i.targetId),Hd(r,i.targetId)}).catch(Ns)):(Hd(r,i.targetId),await Bd(r.localStore,i.targetId,!0))}async function g2(t,e){const n=Y(t),r=n.Ru.get(e),i=n.Au.get(r.targetId);n.isPrimaryClient&&i.length===1&&(n.sharedClientState.removeLocalQueryTarget(r.targetId),Tp(n.remoteStore,r.targetId))}async function y2(t,e,n){const r=A2(t);try{const i=await function(o,l){const u=Y(o),c=me.now(),f=l.reduce((I,R)=>I.add(R.key),te());let p,m;return u.persistence.runTransaction("Locally write mutations","readwrite",I=>{let R=Bn(),P=te();return u.Ms.getEntries(I,f).next(O=>{R=O,R.forEach((A,w)=>{w.isValidDocument()||(P=P.add(A))})}).next(()=>u.localDocuments.getOverlayedDocuments(I,R)).next(O=>{p=O;const A=[];for(const w of l){const k=bN(w,p.get(w.key).overlayedDocument);k!=null&&A.push(new Br(w.key,k,jT(k.value.mapValue),dt.exists(!0)))}return u.mutationQueue.addMutationBatch(I,c,A,l)}).next(O=>{m=O;const A=O.applyToLocalDocumentSet(p,P);return u.documentOverlayCache.saveOverlays(I,O.batchId,A)})}).then(()=>({batchId:m.batchId,changes:YT(p)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(i.batchId),function(o,l,u){let c=o.gu[o.currentUser.toKey()];c||(c=new ve(ee)),c=c.insert(l,u),o.gu[o.currentUser.toKey()]=c}(r,i.batchId,n),await Ia(r,i.changes),await cc(r.remoteStore)}catch(i){const s=Rp(i,"Failed to persist write");n.reject(s)}}async function VI(t,e){const n=Y(t);try{const r=await Px(n.localStore,e);e.targetChanges.forEach((i,s)=>{const o=n.mu.get(s);o&&(se(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?o.Iu=!0:i.modifiedDocuments.size>0?se(o.Iu,14607):i.removedDocuments.size>0&&(se(o.Iu,42227),o.Iu=!1))}),await Ia(n,r,e)}catch(r){await Ns(r)}}function R_(t,e,n){const r=Y(t);if(r.isPrimaryClient&&n===0||!r.isPrimaryClient&&n===1){const i=[];r.Ru.forEach((s,o)=>{const l=o.view.xa(e);l.snapshot&&i.push(l.snapshot)}),function(o,l){const u=Y(o);u.onlineState=l;let c=!1;u.queries.forEach((f,p)=>{for(const m of p.Ca)m.xa(l)&&(c=!0)}),c&&Np(u)}(r.eventManager,e),i.length&&r.Eu.J_(i),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function _2(t,e,n){const r=Y(t);r.sharedClientState.updateQueryState(e,"rejected",n);const i=r.mu.get(e),s=i&&i.key;if(s){let o=new ve(H.comparator);o=o.insert(s,ze.newNoDocument(s,K.min()));const l=te().add(s),u=new wa(K.min(),new Map,new ve(ee),o,l);await VI(r,u),r.du=r.du.remove(s),r.mu.delete(e),bp(r)}else await Bd(r.localStore,e,!1).then(()=>Hd(r,e,n)).catch(Ns)}async function v2(t,e){const n=Y(t),r=e.batch.batchId;try{const i=await Cx(n.localStore,e);LI(n,r,null),OI(n,r),n.sharedClientState.updateMutationState(r,"acknowledged"),await Ia(n,i)}catch(i){await Ns(i)}}async function w2(t,e,n){const r=Y(t);try{const i=await function(o,l){const u=Y(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",c=>{let f;return u.mutationQueue.lookupMutationBatch(c,l).next(p=>(se(p!==null,37113),f=p.keys(),u.mutationQueue.removeMutationBatch(c,p))).next(()=>u.mutationQueue.performConsistencyCheck(c)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(c,f,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(c,f)).next(()=>u.localDocuments.getDocuments(c,f))})}(r.localStore,e);LI(r,e,n),OI(r,e),r.sharedClientState.updateMutationState(e,"rejected",n),await Ia(r,i)}catch(i){await Ns(i)}}function OI(t,e){(t.pu.get(e)||[]).forEach(n=>{n.resolve()}),t.pu.delete(e)}function LI(t,e,n){const r=Y(t);let i=r.gu[r.currentUser.toKey()];if(i){const s=i.get(e);s&&(n?s.reject(n):s.resolve(),i=i.remove(e)),r.gu[r.currentUser.toKey()]=i}}function Hd(t,e,n=null){t.sharedClientState.removeLocalQueryTarget(e);for(const r of t.Au.get(e))t.Ru.delete(r),n&&t.Eu.bu(r,n);t.Au.delete(e),t.isPrimaryClient&&t.fu.Qr(e).forEach(r=>{t.fu.containsKey(r)||MI(t,r)})}function MI(t,e){t.Vu.delete(e.path.canonicalString());const n=t.du.get(e);n!==null&&(Tp(t.remoteStore,n),t.du=t.du.remove(e),t.mu.delete(n),bp(t))}function C_(t,e,n){for(const r of n)r instanceof xI?(t.fu.addReference(r.key,e),E2(t,r)):r instanceof DI?(z(Dp,"Document no longer in limbo: "+r.key),t.fu.removeReference(r.key,e),t.fu.containsKey(r.key)||MI(t,r.key)):W(19791,{Du:r})}function E2(t,e){const n=e.key,r=n.path.canonicalString();t.du.get(n)||t.Vu.has(r)||(z(Dp,"New document in limbo: "+n),t.Vu.add(r),bp(t))}function bp(t){for(;t.Vu.size>0&&t.du.size<t.maxConcurrentLimboResolutions;){const e=t.Vu.values().next().value;t.Vu.delete(e);const n=new H(ue.fromString(e)),r=t.yu.next();t.mu.set(r,new c2(n)),t.du=t.du.insert(n,r),SI(t.remoteStore,new xn(vn(tc(n.path)),r,"TargetPurposeLimboResolution",Zu.ce))}}async function Ia(t,e,n){const r=Y(t),i=[],s=[],o=[];r.Ru.isEmpty()||(r.Ru.forEach((l,u)=>{o.push(r.Su(u,e,n).then(c=>{var f;if((c||n)&&r.isPrimaryClient){const p=c?!c.fromCache:(f=n==null?void 0:n.targetChanges.get(u.targetId))==null?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,p?"current":"not-current")}if(c){i.push(c);const p=vp.Is(u.targetId,c);s.push(p)}}))}),await Promise.all(o),r.Eu.J_(i),await async function(u,c){const f=Y(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>L.forEach(c,m=>L.forEach(m.Ps,I=>f.persistence.referenceDelegate.addReference(p,m.targetId,I)).next(()=>L.forEach(m.Ts,I=>f.persistence.referenceDelegate.removeReference(p,m.targetId,I)))))}catch(p){if(!xs(p))throw p;z(wp,"Failed to update sequence numbers: "+p)}for(const p of c){const m=p.targetId;if(!p.fromCache){const I=f.Cs.get(m),R=I.snapshotVersion,P=I.withLastLimboFreeSnapshotVersion(R);f.Cs=f.Cs.insert(m,P)}}}(r.localStore,s))}async function T2(t,e){const n=Y(t);if(!n.currentUser.isEqual(e)){z(Dp,"User change. New user:",e.toKey());const r=await TI(n.localStore,e);n.currentUser=e,function(s,o){s.pu.forEach(l=>{l.forEach(u=>{u.reject(new B(V.CANCELLED,o))})}),s.pu.clear()}(n,"'waitForPendingWrites' promise is rejected due to a user change."),n.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await Ia(n,r.Os)}}function I2(t,e){const n=Y(t),r=n.mu.get(e);if(r&&r.Iu)return te().add(r.key);{let i=te();const s=n.Au.get(e);if(!s)return i;for(const o of s){const l=n.Ru.get(o);i=i.unionWith(l.view.su)}return i}}function UI(t){const e=Y(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=VI.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=I2.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=_2.bind(null,e),e.Eu.J_=o2.bind(null,e.eventManager),e.Eu.bu=a2.bind(null,e.eventManager),e}function A2(t){const e=Y(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=v2.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=w2.bind(null,e),e}class Eu{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=lc(e.databaseInfo.databaseId),this.sharedClientState=this.Fu(e),this.persistence=this.Mu(e),await this.persistence.start(),this.localStore=this.xu(e),this.gcScheduler=this.Ou(e,this.localStore),this.indexBackfillerScheduler=this.Nu(e,this.localStore)}Ou(e,n){return null}Nu(e,n){return null}xu(e){return Rx(this.persistence,new Ax,e.initialUser,this.serializer)}Mu(e){return new EI(_p.Ai,this.serializer)}Fu(e){return new Vx}async terminate(){var e,n;(e=this.gcScheduler)==null||e.stop(),(n=this.indexBackfillerScheduler)==null||n.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Eu.provider={build:()=>new Eu};class S2 extends Eu{constructor(e){super(),this.cacheSizeBytes=e}Ou(e,n){se(this.persistence.referenceDelegate instanceof vu,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new ux(r,e.asyncQueue,n)}Mu(e){const n=this.cacheSizeBytes!==void 0?yt.withCacheSize(this.cacheSizeBytes):yt.DEFAULT;return new EI(r=>vu.Ai(r,n),this.serializer)}}class Wd{async initialize(e,n){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(n),this.remoteStore=this.createRemoteStore(n),this.eventManager=this.createEventManager(n),this.syncEngine=this.createSyncEngine(n,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>R_(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=T2.bind(null,this.syncEngine),await r2(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new s2}()}createDatastore(e){const n=lc(e.databaseInfo.databaseId),r=Fx(e.databaseInfo);return qx(e.authCredentials,e.appCheckCredentials,r,n)}createRemoteStore(e){return function(r,i,s,o,l){return new Wx(r,i,s,o,l)}(this.localStore,this.datastore,e.asyncQueue,n=>R_(this.syncEngine,n,0),function(){return E_.v()?new E_:new Ox}())}createSyncEngine(e,n){return function(i,s,o,l,u,c,f){const p=new h2(i,s,o,l,u,c);return f&&(p.wu=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,n)}async terminate(){var e,n;await async function(i){const s=Y(i);z(In,"RemoteStore shutting down."),s.Va.add(5),await Ta(s),s.ma.shutdown(),s.fa.set("Unknown")}(this.remoteStore),(e=this.datastore)==null||e.terminate(),(n=this.eventManager)==null||n.terminate()}}Wd.provider={build:()=>new Wd};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vp{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Lu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Lu(this.observer.error,e):jn("Uncaught Error in snapshot listener:",e.toString()))}ku(){this.muted=!0}Lu(e,n){setTimeout(()=>{this.muted||e(n)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let k2=class{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastTransactionError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw this.lastTransactionError=new B(V.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes."),this.lastTransactionError;const n=await async function(i,s){const o=Y(i),l={documents:s.map(p=>_u(o.serializer,p))},u=await o.zo("BatchGetDocuments",o.serializer.databaseId,ue.emptyPath(),l,s.length),c=new Map;u.forEach(p=>{const m=WN(o.serializer,p);c.set(m.key.toString(),m)});const f=[];return s.forEach(p=>{const m=c.get(p.toString());se(!!m,55234,{key:p}),f.push(m)}),f}(this.datastore,e);return n.forEach(r=>this.recordVersion(r)),n}set(e,n){this.write(n.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,n){try{this.write(n.toMutation(e,this.preconditionForUpdate(e)))}catch(r){this.lastTransactionError=r}this.writtenDocs.add(e.toString())}delete(e){this.write(new fp(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastTransactionError)throw this.lastTransactionError;const e=this.readVersions;this.mutations.forEach(n=>{e.delete(n.key.toString())}),e.forEach((n,r)=>{const i=H.fromPath(r);this.mutations.push(new oI(i,this.precondition(i)))}),await async function(r,i){const s=Y(r),o={writes:i.map(l=>mI(s.serializer,l))};await s.$o("Commit",s.serializer.databaseId,ue.emptyPath(),o)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let n;if(e.isFoundDocument())n=e.version;else{if(!e.isNoDocument())throw W(50498,{Ju:e.constructor.name});n=K.min()}const r=this.readVersions.get(e.key.toString());if(r){if(!n.isEqual(r))throw new B(V.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),n)}precondition(e){const n=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&n?n.isEqual(K.min())?dt.exists(!1):dt.updateTime(n):dt.none()}preconditionForUpdate(e){const n=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&n){if(n.isEqual(K.min()))throw new B(V.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return dt.updateTime(n)}return dt.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class R2{constructor(e,n,r,i,s){this.asyncQueue=e,this.datastore=n,this.options=r,this.updateFunction=i,this.deferred=s,this.Hu=r.maxAttempts,this.F_=new Ep(this.asyncQueue,"transaction_retry")}Zu(){this.Hu-=1,this.Xu()}Xu(){this.F_.g_(async()=>{const e=new k2(this.datastore),n=this.Yu(e);n&&n.then(r=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(r)}).catch(i=>{this.ec(i)}))}).catch(r=>{this.ec(r)})})}Yu(e){try{const n=this.updateFunction(e);return!_a(n)&&n.catch&&n.then?n:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(n){return this.deferred.reject(n),null}}ec(e){this.Hu>0&&this.tc(e)?(this.Hu-=1,this.asyncQueue.enqueueAndForget(()=>(this.Xu(),Promise.resolve()))):this.deferred.reject(e)}tc(e){if((e==null?void 0:e.name)==="FirebaseError"){const n=e.code;return n==="aborted"||n==="failed-precondition"||n==="already-exists"||!aI(n)}return!1}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Or="FirestoreClient";class C2{constructor(e,n,r,i,s){this.authCredentials=e,this.appCheckCredentials=n,this.asyncQueue=r,this._databaseInfo=i,this.user=nt.UNAUTHENTICATED,this.clientId=sp.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=s,this.authCredentials.start(r,async o=>{z(Or,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(r,o=>(z(Or,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new _n;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(n){const r=Rp(n,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function Sh(t,e){t.asyncQueue.verifyOperationInProgress(),z(Or,"Initializing OfflineComponentProvider");const n=t.configuration;await e.initialize(n);let r=n.initialUser;t.setCredentialChangeListener(async i=>{r.isEqual(i)||(await TI(e.localStore,i),r=i)}),e.persistence.setDatabaseDeletedListener(()=>t.terminate()),t._offlineComponents=e}async function P_(t,e){t.asyncQueue.verifyOperationInProgress();const n=await P2(t);z(Or,"Initializing OnlineComponentProvider"),await e.initialize(n,t.configuration),t.setCredentialChangeListener(r=>I_(e.remoteStore,r)),t.setAppCheckTokenChangeListener((r,i)=>I_(e.remoteStore,i)),t._onlineComponents=e}async function P2(t){if(!t._offlineComponents)if(t._uninitializedComponentsProvider){z(Or,"Using user provided OfflineComponentProvider");try{await Sh(t,t._uninitializedComponentsProvider._offline)}catch(e){const n=e;if(!function(i){return i.name==="FirebaseError"?i.code===V.FAILED_PRECONDITION||i.code===V.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(n))throw n;pi("Error using user provided cache. Falling back to memory cache: "+n),await Sh(t,new Eu)}}else z(Or,"Using default OfflineComponentProvider"),await Sh(t,new S2(void 0));return t._offlineComponents}async function Op(t){return t._onlineComponents||(t._uninitializedComponentsProvider?(z(Or,"Using user provided OnlineComponentProvider"),await P_(t,t._uninitializedComponentsProvider._online)):(z(Or,"Using default OnlineComponentProvider"),await P_(t,new Wd))),t._onlineComponents}function N2(t){return Op(t).then(e=>e.syncEngine)}function x2(t){return Op(t).then(e=>e.datastore)}async function Tu(t){const e=await Op(t),n=e.eventManager;return n.onListen=d2.bind(null,e.syncEngine),n.onUnlisten=m2.bind(null,e.syncEngine),n.onFirstRemoteStoreListen=f2.bind(null,e.syncEngine),n.onLastRemoteStoreUnlisten=g2.bind(null,e.syncEngine),n}function D2(t,e,n,r){const i=new Vp(r),s=new xp(e,i,n);return t.asyncQueue.enqueueAndForget(async()=>Cp(await Tu(t),s)),()=>{i.ku(),t.asyncQueue.enqueueAndForget(async()=>Pp(await Tu(t),s))}}function b2(t,e,n={}){const r=new _n;return t.asyncQueue.enqueueAndForget(async()=>function(s,o,l,u,c){const f=new Vp({next:m=>{f.ku(),o.enqueueAndForget(()=>Pp(s,p));const I=m.docs.has(l);!I&&m.fromCache?c.reject(new B(V.UNAVAILABLE,"Failed to get document because the client is offline.")):I&&m.fromCache&&u&&u.source==="server"?c.reject(new B(V.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):c.resolve(m)},error:m=>c.reject(m)}),p=new xp(tc(l.path),f,{includeMetadataChanges:!0,$a:!0});return Cp(s,p)}(await Tu(t),t.asyncQueue,e,n,r)),r.promise}function V2(t,e,n={}){const r=new _n;return t.asyncQueue.enqueueAndForget(async()=>function(s,o,l,u,c){const f=new Vp({next:m=>{f.ku(),o.enqueueAndForget(()=>Pp(s,p)),m.fromCache&&u.source==="server"?c.reject(new B(V.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):c.resolve(m)},error:m=>c.reject(m)}),p=new xp(l,f,{includeMetadataChanges:!0,$a:!0});return Cp(s,p)}(await Tu(t),t.asyncQueue,e,n,r)),r.promise}function O2(t,e){const n=new _n;return t.asyncQueue.enqueueAndForget(async()=>y2(await N2(t),e,n)),n.promise}function L2(t,e,n){const r=new _n;return t.asyncQueue.enqueueAndForget(async()=>{const i=await x2(t);new R2(t.asyncQueue,i,n,e,r).Zu()}),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function FI(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M2="ComponentProvider",N_=new Map;function U2(t,e,n,r,i){return new nN(t,e,n,i.host,i.ssl,i.experimentalForceLongPolling,i.experimentalAutoDetectLongPolling,FI(i.experimentalLongPollingOptions),i.useFetchStreams,i.isUsingEmulator,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jI="firestore.googleapis.com",x_=!0;class D_{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new B(V.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=jI,this.ssl=x_}else this.host=e.host,this.ssl=e.ssl??x_;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=wI;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<ax)throw new B(V.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}H1("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=FI(e.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new B(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new B(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new B(V.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,i){return r.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class hc{constructor(e,n,r,i){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new D_({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new B(V.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new B(V.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new D_(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new O1;switch(r.type){case"firstParty":return new F1(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new B(V.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=N_.get(n);r&&(z(M2,"Removing Datastore"),N_.delete(n),r.terminate())}(this),Promise.resolve()}}function F2(t,e,n,r={}){var c;t=Dt(t,hc);const i=$n(e),s=t._getSettings(),o={...s,emulatorOptions:t._getEmulatorOptions()},l=`${e}:${n}`;i&&Wu(`https://${l}`),s.host!==jI&&s.host!==l&&pi("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const u={...s,host:l,ssl:i,emulatorOptions:r};if(!En(u,o)&&(t._setSettings(u),r.mockUserToken)){let f,p;if(typeof r.mockUserToken=="string")f=r.mockUserToken,p=nt.MOCK_USER;else{f=bE(r.mockUserToken,(c=t._app)==null?void 0:c.options.projectId);const m=r.mockUserToken.sub||r.mockUserToken.user_id;if(!m)throw new B(V.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");p=new nt(m)}t._authCredentials=new L1(new RT(f,p))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hn{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new Hn(this.firestore,e,this._query)}}class Ee{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ar(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ee(this.firestore,e,this._key)}toJSON(){return{type:Ee._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,n,r){if(ya(n,Ee._jsonSchema))return new Ee(e,r||null,new H(ue.fromString(n.referencePath)))}}Ee._jsonSchemaVersion="firestore/documentReference/1.0",Ee._jsonSchema={type:Ve("string",Ee._jsonSchemaVersion),referencePath:Ve("string")};class Ar extends Hn{constructor(e,n,r){super(e,n,tc(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ee(this.firestore,null,new H(e))}withConverter(e){return new Ar(this.firestore,e,this._path)}}function BI(t,e,...n){if(t=ce(t),CT("collection","path",e),t instanceof hc){const r=ue.fromString(e,...n);return Hy(r),new Ar(t,null,r)}{if(!(t instanceof Ee||t instanceof Ar))throw new B(V.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(ue.fromString(e,...n));return Hy(r),new Ar(t.firestore,null,r)}}function Kt(t,e,...n){if(t=ce(t),arguments.length===1&&(e=sp.newId()),CT("doc","path",e),t instanceof hc){const r=ue.fromString(e,...n);return qy(r),new Ee(t,null,new H(r))}{if(!(t instanceof Ee||t instanceof Ar))throw new B(V.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=t._path.child(ue.fromString(e,...n));return qy(r),new Ee(t.firestore,t instanceof Ar?t.converter:null,new H(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b_="AsyncQueue";class V_{constructor(e=Promise.resolve()){this.nc=[],this.rc=!1,this.sc=[],this.oc=null,this._c=!1,this.ac=!1,this.uc=[],this.F_=new Ep(this,"async_queue_retry"),this.cc=()=>{const r=Ah();r&&z(b_,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this.lc=e;const n=Ah();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.cc)}get isShuttingDown(){return this.rc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.hc(),this.Pc(e)}enterRestrictedMode(e){if(!this.rc){this.rc=!0,this.ac=e||!1;const n=Ah();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.cc)}}enqueue(e){if(this.hc(),this.rc)return new Promise(()=>{});const n=new _n;return this.Pc(()=>this.rc&&this.ac?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.nc.push(e),this.Tc()))}async Tc(){if(this.nc.length!==0){try{await this.nc[0](),this.nc.shift(),this.F_.reset()}catch(e){if(!xs(e))throw e;z(b_,"Operation failed with retryable error: "+e)}this.nc.length>0&&this.F_.g_(()=>this.Tc())}}Pc(e){const n=this.lc.then(()=>(this._c=!0,e().catch(r=>{throw this.oc=r,this._c=!1,jn("INTERNAL UNHANDLED ERROR: ",O_(r)),r}).then(r=>(this._c=!1,r))));return this.lc=n,n}enqueueAfterDelay(e,n,r){this.hc(),this.uc.indexOf(e)>-1&&(n=0);const i=kp.createAndSchedule(this,e,n,r,s=>this.Ic(s));return this.sc.push(i),i}hc(){this.oc&&W(47125,{Ec:O_(this.oc)})}verifyOperationInProgress(){}async Rc(){let e;do e=this.lc,await e;while(e!==this.lc)}Ac(e){for(const n of this.sc)if(n.timerId===e)return!0;return!1}Vc(e){return this.Rc().then(()=>{this.sc.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.sc)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.Rc()})}dc(e){this.uc.push(e)}Ic(e){const n=this.sc.indexOf(e);this.sc.splice(n,1)}}function O_(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+`
`+t.stack),e}class Lr extends hc{constructor(e,n,r,i){super(e,n,r,i),this.type="firestore",this._queue=new V_,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new V_(e),this._firestoreClient=void 0,await e}}}function j2(t,e){const n=typeof t=="object"?t:Rs(),r=typeof t=="string"?t:cu,i=qn(n,"firestore").getImmediate({identifier:r});if(!i._initialized){const s=Wf("firestore");s&&F2(i,...s)}return i}function Aa(t){if(t._terminated)throw new B(V.FAILED_PRECONDITION,"The client has already been terminated.");return t._firestoreClient||B2(t),t._firestoreClient}function B2(t){var r,i,s,o;const e=t._freezeSettings(),n=U2(t._databaseId,((r=t._app)==null?void 0:r.options.appId)||"",t._persistenceKey,(i=t._app)==null?void 0:i.options.apiKey,e);t._componentsProvider||(s=e.localCache)!=null&&s._offlineComponentProvider&&((o=e.localCache)!=null&&o._onlineComponentProvider)&&(t._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),t._firestoreClient=new C2(t._authCredentials,t._appCheckCredentials,t._queue,n,t._componentsProvider&&function(u){const c=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(c),_online:c}}(t._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Rt(Ye.fromBase64String(e))}catch(n){throw new B(V.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new Rt(Ye.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Rt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(ya(e,Rt._jsonSchema))return Rt.fromBase64String(e.bytes)}}Rt._jsonSchemaVersion="firestore/bytes/1.0",Rt._jsonSchema={type:Ve("string",Rt._jsonSchemaVersion),bytes:Ve("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dc{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new B(V.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ge(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Si{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wn{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new B(V.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new B(V.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return ee(this._lat,e._lat)||ee(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:wn._jsonSchemaVersion}}static fromJSON(e){if(ya(e,wn._jsonSchema))return new wn(e.latitude,e.longitude)}}wn._jsonSchemaVersion="firestore/geoPoint/1.0",wn._jsonSchema={type:Ve("string",wn._jsonSchemaVersion),latitude:Ve("number"),longitude:Ve("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,i){if(r.length!==i.length)return!1;for(let s=0;s<r.length;++s)if(r[s]!==i[s])return!1;return!0}(this._values,e._values)}toJSON(){return{type:rn._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(ya(e,rn._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(n=>typeof n=="number"))return new rn(e.vectorValues);throw new B(V.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}rn._jsonSchemaVersion="firestore/vectorValue/1.0",rn._jsonSchema={type:Ve("string",rn._jsonSchemaVersion),vectorValues:Ve("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const z2=/^__.*__$/;class $2{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return this.fieldMask!==null?new Br(e,this.data,this.fieldMask,n,this.fieldTransforms):new va(e,this.data,n,this.fieldTransforms)}}class zI{constructor(e,n,r){this.data=e,this.fieldMask=n,this.fieldTransforms=r}toMutation(e,n){return new Br(e,this.data,this.fieldMask,n,this.fieldTransforms)}}function $I(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw W(40011,{dataSource:t})}}class fc{constructor(e,n,r,i,s,o){this.settings=e,this.databaseId=n,this.serializer=r,this.ignoreUndefinedProperties=i,s===void 0&&this.mc(),this.fieldTransforms=s||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(e){return new fc({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}gc(e){var i;const n=(i=this.path)==null?void 0:i.child(e),r=this.i({path:n,arrayElement:!1});return r.yc(e),r}wc(e){var i;const n=(i=this.path)==null?void 0:i.child(e),r=this.i({path:n,arrayElement:!1});return r.mc(),r}Sc(e){return this.i({path:void 0,arrayElement:!0})}bc(e){return Iu(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find(n=>e.isPrefixOf(n))!==void 0||this.fieldTransforms.find(n=>e.isPrefixOf(n.field))!==void 0}mc(){if(this.path)for(let e=0;e<this.path.length;e++)this.yc(this.path.get(e))}yc(e){if(e.length===0)throw this.bc("Document fields must not be empty");if($I(this.dataSource)&&z2.test(e))throw this.bc('Document fields cannot begin and end with "__"')}}class q2{constructor(e,n,r){this.databaseId=e,this.ignoreUndefinedProperties=n,this.serializer=r||lc(e)}V(e,n,r,i=!1){return new fc({dataSource:e,methodName:n,targetDoc:r,path:Ge.emptyPath(),arrayElement:!1,hasConverter:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function pc(t){const e=t._freezeSettings(),n=lc(t._databaseId);return new q2(t._databaseId,!!e.ignoreUndefinedProperties,n)}function qI(t,e,n,r,i,s={}){const o=t.V(s.merge||s.mergeFields?2:0,e,n,i);jp("Data must be an object, but it was:",o,r);const l=KI(r,o);let u,c;if(s.merge)u=new Pt(o.fieldMask),c=o.fieldTransforms;else if(s.mergeFields){const f=[];for(const p of s.mergeFields){const m=mi(e,p,n);if(!o.contains(m))throw new B(V.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);YI(f,m)||f.push(m)}u=new Pt(f),c=o.fieldTransforms.filter(p=>u.covers(p.field))}else u=null,c=o.fieldTransforms;return new $2(new ht(l),u,c)}class mc extends Si{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.bc(`${this._methodName}() can only appear at the top level of your update data`):e.bc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof mc}}function HI(t,e,n){return new fc({dataSource:3,targetDoc:e.settings.targetDoc,methodName:t._methodName,arrayElement:n},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class Lp extends Si{_toFieldTransform(e){return new oc(e.path,new aa)}isEqual(e){return e instanceof Lp}}class Mp extends Si{constructor(e,n){super(e),this.Cc=n}_toFieldTransform(e){const n=HI(this,e,!0),r=this.Cc.map(s=>ki(s,n)),i=new ys(r);return new oc(e.path,i)}isEqual(e){return e instanceof Mp&&En(this.Cc,e.Cc)}}class Up extends Si{constructor(e,n){super(e),this.Cc=n}_toFieldTransform(e){const n=HI(this,e,!0),r=this.Cc.map(s=>ki(s,n)),i=new _s(r);return new oc(e.path,i)}isEqual(e){return e instanceof Up&&En(this.Cc,e.Cc)}}class Fp extends Si{constructor(e,n){super(e),this.vc=n}_toFieldTransform(e){const n=new vs(e.serializer,ZT(e.serializer,this.vc));return new oc(e.path,n)}isEqual(e){return e instanceof Fp&&(this.vc===e.vc||Number.isNaN(this.vc)&&Number.isNaN(e.vc))}}function WI(t,e,n,r){const i=t.V(1,e,n);jp("Data must be an object, but it was:",i,r);const s=[],o=ht.empty();jr(r,(u,c)=>{const f=XI(e,u,n);c=ce(c);const p=i.wc(f);if(c instanceof mc)s.push(f);else{const m=ki(c,p);m!=null&&(s.push(f),o.set(f,m))}});const l=new Pt(s);return new zI(o,l,i.fieldTransforms)}function GI(t,e,n,r,i,s){const o=t.V(1,e,n),l=[mi(e,r,n)],u=[i];if(s.length%2!=0)throw new B(V.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let m=0;m<s.length;m+=2)l.push(mi(e,s[m])),u.push(s[m+1]);const c=[],f=ht.empty();for(let m=l.length-1;m>=0;--m)if(!YI(c,l[m])){const I=l[m];let R=u[m];R=ce(R);const P=o.wc(I);if(R instanceof mc)c.push(I);else{const O=ki(R,P);O!=null&&(c.push(I),f.set(I,O))}}const p=new Pt(c);return new zI(f,p,o.fieldTransforms)}function H2(t,e,n,r=!1){return ki(n,t.V(r?4:3,e))}function ki(t,e){if(QI(t=ce(t)))return jp("Unsupported field value:",e,t),KI(t,e);if(t instanceof Si)return function(r,i){if(!$I(i.dataSource))throw i.bc(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.bc(`${r._methodName}() is not currently supported inside arrays`);const s=r._toFieldTransform(i);s&&i.fieldTransforms.push(s)}(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.bc("Nested arrays are not supported");return function(r,i){const s=[];let o=0;for(const l of r){let u=ki(l,i.Sc(o));u==null&&(u={nullValue:"NULL_VALUE"}),s.push(u),o++}return{arrayValue:{values:s}}}(t,e)}return function(r,i){if((r=ce(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return ZT(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const s=me.fromDate(r);return{timestampValue:yu(i.serializer,s)}}if(r instanceof me){const s=new me(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:yu(i.serializer,s)}}if(r instanceof wn)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof Rt)return{bytesValue:hI(i.serializer,r._byteString)};if(r instanceof Ee){const s=i.databaseId,o=r.firestore._databaseId;if(!o.isEqual(s))throw i.bc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${s.projectId}/${s.database}`);return{referenceValue:gp(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof rn)return function(o,l){const u=o instanceof rn?o.toArray():o;return{mapValue:{fields:{[MT]:{stringValue:UT},[hu]:{arrayValue:{values:u.map(f=>{if(typeof f!="number")throw l.bc("VectorValues must only contain numeric values.");return ic(l.serializer,f)})}}}}}}(r,i);if(vI(r))return r._toProto(i.serializer);throw i.bc(`Unsupported field value: ${Ju(r)}`)}(t,e)}function KI(t,e){const n={};return xT(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):jr(t,(r,i)=>{const s=ki(i,e.gc(r));s!=null&&(n[r]=s)}),{mapValue:{fields:n}}}function QI(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof me||t instanceof wn||t instanceof Rt||t instanceof Ee||t instanceof Si||t instanceof rn||vI(t))}function jp(t,e,n){if(!QI(n)||!PT(n)){const r=Ju(n);throw r==="an object"?e.bc(t+" a custom object"):e.bc(t+" "+r)}}function mi(t,e,n){if((e=ce(e))instanceof dc)return e._internalPath;if(typeof e=="string")return XI(t,e);throw Iu("Field path arguments must be of type string or ",t,!1,void 0,n)}const W2=new RegExp("[~\\*/\\[\\]]");function XI(t,e,n){if(e.search(W2)>=0)throw Iu(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,n);try{return new dc(...e.split("."))._internalPath}catch{throw Iu(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,n)}}function Iu(t,e,n,r,i){const s=r&&!r.isEmpty(),o=i!==void 0;let l=`Function ${e}() called with invalid data`;n&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(s||o)&&(u+=" (found",s&&(u+=` in field ${r}`),o&&(u+=` in document ${i}`),u+=")"),new B(V.INVALID_ARGUMENT,l+t+u)}function YI(t,e){return t.some(n=>n.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JI{convertValue(e,n="none"){switch(Dr(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Pe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,n);case 5:return e.stringValue;case 6:return this.convertBytes(xr(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,n);case 11:return this.convertObject(e.mapValue,n);case 10:return this.convertVectorValue(e.mapValue);default:throw W(62114,{value:e})}}convertObject(e,n){return this.convertObjectMap(e.fields,n)}convertObjectMap(e,n="none"){const r={};return jr(e,(i,s)=>{r[i]=this.convertValue(s,n)}),r}convertVectorValue(e){var r,i,s;const n=(s=(i=(r=e.fields)==null?void 0:r[hu].arrayValue)==null?void 0:i.values)==null?void 0:s.map(o=>Pe(o.doubleValue));return new rn(n)}convertGeoPoint(e){return new wn(Pe(e.latitude),Pe(e.longitude))}convertArray(e,n){return(e.values||[]).map(r=>this.convertValue(r,n))}convertServerTimestamp(e,n){switch(n){case"previous":const r=ec(e);return r==null?null:this.convertValue(r,n);case"estimate":return this.convertTimestamp(na(e));default:return null}}convertTimestamp(e){const n=Nr(e);return new me(n.seconds,n.nanos)}convertDocumentKey(e,n){const r=ue.fromString(e);se(_I(r),9688,{name:e});const i=new ra(r.get(1),r.get(3)),s=new H(r.popFirst(5));return i.isEqual(n)||jn(`Document ${s} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${n.projectId}/${n.database}) instead.`),s}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gc extends JI{constructor(e){super(),this.firestore=e}convertBytes(e){return new Rt(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new Ee(this.firestore,null,n)}}function yc(){return new Lp("serverTimestamp")}function G2(...t){return new Mp("arrayUnion",t)}function K2(...t){return new Up("arrayRemove",t)}function Es(t){return new Fp("increment",t)}const L_="@firebase/firestore",M_="4.15.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function U_(t){return function(n,r){if(typeof n!="object"||n===null)return!1;const i=n;for(const s of r)if(s in i&&typeof i[s]=="function")return!0;return!1}(t,["next","error","complete"])}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Au{constructor(e,n,r,i,s){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=i,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new Ee(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Q2(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const n=this._document.data.field(mi("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class Q2 extends Au{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ZI(t){if(t.limitType==="L"&&t.explicitOrderBy.length===0)throw new B(V.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Bp{}class zp extends Bp{}function e0(t,e,...n){let r=[];e instanceof Bp&&r.push(e),r=r.concat(n),function(s){const o=s.filter(u=>u instanceof $p).length,l=s.filter(u=>u instanceof _c).length;if(o>1||o>0&&l>0)throw new B(V.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const i of r)t=i._apply(t);return t}class _c extends zp{constructor(e,n,r){super(),this._field=e,this._op=n,this._value=r,this.type="where"}static _create(e,n,r){return new _c(e,n,r)}_apply(e){const n=this._parse(e);return t0(e._query,n),new Hn(e.firestore,e.converter,Md(e._query,n))}_parse(e){const n=pc(e.firestore);return function(s,o,l,u,c,f,p){let m;if(c.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new B(V.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){j_(p,f);const R=[];for(const P of p)R.push(F_(u,s,P));m={arrayValue:{values:R}}}else m=F_(u,s,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||j_(p,f),m=H2(l,o,p,f==="in"||f==="not-in");return be.create(c,f,m)}(e._query,"where",n,e.firestore._databaseId,this._field,this._op,this._value)}}function X2(t,e,n){const r=e,i=mi("where",t);return _c._create(i,r,n)}class $p extends Bp{constructor(e,n){super(),this.type=e,this._queryConstraints=n}static _create(e,n){return new $p(e,n)}_parse(e){const n=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return n.length===1?n[0]:on.create(n,this._getOperator())}_apply(e){const n=this._parse(e);return n.getFilters().length===0?e:(function(i,s){let o=i;const l=s.getFlattenedFilters();for(const u of l)t0(o,u),o=Md(o,u)}(e._query,n),new Hn(e.firestore,e.converter,Md(e._query,n)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class qp extends zp{constructor(e,n){super(),this._field=e,this._direction=n,this.type="orderBy"}static _create(e,n){return new qp(e,n)}_apply(e){const n=function(i,s,o){if(i.startAt!==null)throw new B(V.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new B(V.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new oa(s,o)}(e._query,this._field,this._direction);return new Hn(e.firestore,e.converter,wN(e._query,n))}}function Y2(t,e="asc"){const n=e,r=mi("orderBy",t);return qp._create(r,n)}class Hp extends zp{constructor(e,n,r){super(),this.type=e,this._limit=n,this._limitType=r}static _create(e,n,r){return new Hp(e,n,r)}_apply(e){return new Hn(e.firestore,e.converter,fu(e._query,this._limit,this._limitType))}}function J2(t){return Hp._create("limit",t,"F")}function F_(t,e,n){if(typeof(n=ce(n))=="string"){if(n==="")throw new B(V.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!GT(e)&&n.indexOf("/")!==-1)throw new B(V.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${n}' contains a '/' character.`);const r=e.path.child(ue.fromString(n));if(!H.isDocumentKey(r))throw new B(V.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Zy(t,new H(r))}if(n instanceof Ee)return Zy(t,n._key);throw new B(V.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Ju(n)}.`)}function j_(t,e){if(!Array.isArray(t)||t.length===0)throw new B(V.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function t0(t,e){const n=function(i,s){for(const o of i)for(const l of o.getFlattenedFilters())if(s.indexOf(l.op)>=0)return l.op;return null}(t.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(n!==null)throw n===e.op?new B(V.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new B(V.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${n.toString()}' filters.`)}function n0(t,e,n){let r;return r=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,r}class Z2 extends JI{constructor(e){super(),this.firestore=e}convertBytes(e){return new Rt(e)}convertReference(e){const n=this.convertDocumentKey(e,this.firestore._databaseId);return new Ee(this.firestore,null,n)}}class Ki{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Sr extends Au{constructor(e,n,r,i,s,o){super(e,n,r,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=s}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new Nl(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(mi("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new B(V.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,n={};return n.type=Sr._jsonSchemaVersion,n.bundle="",n.bundleSource="DocumentSnapshot",n.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?n:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),n.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),n)}}Sr._jsonSchemaVersion="firestore/documentSnapshot/1.0",Sr._jsonSchema={type:Ve("string",Sr._jsonSchemaVersion),bundleSource:Ve("string","DocumentSnapshot"),bundleName:Ve("string"),bundle:Ve("string")};class Nl extends Sr{data(e={}){return super.data(e)}}class si{constructor(e,n,r,i){this._firestore=e,this._userDataWriter=n,this._snapshot=i,this.metadata=new Ki(i.hasPendingWrites,i.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new Nl(this._firestore,this._userDataWriter,r.key,r,new Ki(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new B(V.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(i,s){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(l=>{const u=new Nl(i._firestore,i._userDataWriter,l.doc.key,l.doc,new Ki(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(l=>s||l.type!==3).map(l=>{const u=new Nl(i._firestore,i._userDataWriter,l.doc.key,l.doc,new Ki(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);let c=-1,f=-1;return l.type!==0&&(c=o.indexOf(l.doc.key),o=o.delete(l.doc.key)),l.type!==1&&(o=o.add(l.doc),f=o.indexOf(l.doc.key)),{type:eD(l.type),doc:u,oldIndex:c,newIndex:f}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new B(V.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=si._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=sp.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const n=[],r=[],i=[];return this.docs.forEach(s=>{s._document!==null&&(n.push(s._document),r.push(this._userDataWriter.convertObjectMap(s._document.data.value.mapValue.fields,"previous")),i.push(s.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function eD(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return W(61501,{type:t})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */si._jsonSchemaVersion="firestore/querySnapshot/1.0",si._jsonSchema={type:Ve("string",si._jsonSchemaVersion),bundleSource:Ve("string","QuerySnapshot"),bundleName:Ve("string"),bundle:Ve("string")};const tD={maxAttempts:5};function _o(t,e){if((t=ce(t)).firestore!==e)throw new B(V.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nD{constructor(e,n){this._firestore=e,this._transaction=n,this._dataReader=pc(e)}get(e){const n=_o(e,this._firestore),r=new Z2(this._firestore);return this._transaction.lookup([n._key]).then(i=>{if(!i||i.length!==1)return W(24041);const s=i[0];if(s.isFoundDocument())return new Au(this._firestore,r,s.key,s,n.converter);if(s.isNoDocument())return new Au(this._firestore,r,n._key,null,n.converter);throw W(18433,{doc:s})})}set(e,n,r){const i=_o(e,this._firestore),s=n0(i.converter,n,r),o=qI(this._dataReader,"Transaction.set",i._key,s,i.converter!==null,r);return this._transaction.set(i._key,o),this}update(e,n,r,...i){const s=_o(e,this._firestore);let o;return o=typeof(n=ce(n))=="string"||n instanceof dc?GI(this._dataReader,"Transaction.update",s._key,n,r,i):WI(this._dataReader,"Transaction.update",s._key,n),this._transaction.update(s._key,o),this}delete(e){const n=_o(e,this._firestore);return this._transaction.delete(n._key),this}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rD extends nD{constructor(e,n){super(e,n),this._firestore=e}get(e){const n=_o(e,this._firestore),r=new gc(this._firestore);return super.get(e).then(i=>new Sr(this._firestore,r,n._key,i._document,new Ki(!1,!1),n.converter))}}function Wp(t,e,n){t=Dt(t,Lr);const r={...tD,...n};(function(o){if(o.maxAttempts<1)throw new B(V.INVALID_ARGUMENT,"Max attempts must be at least 1")})(r);const i=Aa(t);return L2(i,s=>e(new rD(t,s)),r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iD(t){t=Dt(t,Ee);const e=Dt(t.firestore,Lr),n=Aa(e);return b2(n,t._key).then(r=>i0(e,t,r))}function sD(t){t=Dt(t,Hn);const e=Dt(t.firestore,Lr),n=Aa(e),r=new gc(e);return ZI(t._query),V2(n,t._query).then(i=>new si(e,r,t,i))}function Gp(t,e,n){t=Dt(t,Ee);const r=Dt(t.firestore,Lr),i=n0(t.converter,e,n),s=pc(r);return r0(r,[qI(s,"setDoc",t._key,i,t.converter!==null,n).toMutation(t._key,dt.none())])}function Sa(t,e,n,...r){t=Dt(t,Ee);const i=Dt(t.firestore,Lr),s=pc(i);let o;return o=typeof(e=ce(e))=="string"||e instanceof dc?GI(s,"updateDoc",t._key,e,n,r):WI(s,"updateDoc",t._key,e),r0(i,[o.toMutation(t._key,dt.exists(!0))])}function oD(t,...e){var c,f,p;t=ce(t);let n={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||U_(e[r])||(n=e[r++]);const i={includeMetadataChanges:n.includeMetadataChanges,source:n.source};if(U_(e[r])){const m=e[r];e[r]=(c=m.next)==null?void 0:c.bind(m),e[r+1]=(f=m.error)==null?void 0:f.bind(m),e[r+2]=(p=m.complete)==null?void 0:p.bind(m)}let s,o,l;if(t instanceof Ee)o=Dt(t.firestore,Lr),l=tc(t._key.path),s={next:m=>{e[r]&&e[r](i0(o,t,m))},error:e[r+1],complete:e[r+2]};else{const m=Dt(t,Hn);o=Dt(m.firestore,Lr),l=m._query;const I=new gc(o);s={next:R=>{e[r]&&e[r](new si(o,I,m,R))},error:e[r+1],complete:e[r+2]},ZI(t._query)}const u=Aa(o);return D2(u,l,i,s)}function r0(t,e){const n=Aa(t);return O2(n,e)}function i0(t,e,n){const r=n.docs.get(e._key),i=new gc(t);return new Sr(t,i,e._key,r,new Ki(n.hasPendingWrites,n.fromCache),e.converter)}(function(e,n=!0){V1(Ti),Gt(new Lt("firestore",(r,{instanceIdentifier:i,options:s})=>{const o=r.getProvider("app").getImmediate(),l=new Lr(new M1(r.getProvider("auth-internal")),new j1(o,r.getProvider("app-check-internal")),rN(o,i),o);return s={useFetchStreams:n,...s},l._setSettings(s),l},"PUBLIC").setMultipleInstances(!0)),it(L_,M_,e),it(L_,M_,"esm2020")})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const s0="firebasestorage.googleapis.com",o0="storageBucket",aD=2*60*1e3,lD=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re extends Ft{constructor(e,n,r=0){super(kh(e),`Firebase Storage: ${n} (${kh(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,Re.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return kh(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var ke;(function(t){t.UNKNOWN="unknown",t.OBJECT_NOT_FOUND="object-not-found",t.BUCKET_NOT_FOUND="bucket-not-found",t.PROJECT_NOT_FOUND="project-not-found",t.QUOTA_EXCEEDED="quota-exceeded",t.UNAUTHENTICATED="unauthenticated",t.UNAUTHORIZED="unauthorized",t.UNAUTHORIZED_APP="unauthorized-app",t.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",t.INVALID_CHECKSUM="invalid-checksum",t.CANCELED="canceled",t.INVALID_EVENT_NAME="invalid-event-name",t.INVALID_URL="invalid-url",t.INVALID_DEFAULT_BUCKET="invalid-default-bucket",t.NO_DEFAULT_BUCKET="no-default-bucket",t.CANNOT_SLICE_BLOB="cannot-slice-blob",t.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",t.NO_DOWNLOAD_URL="no-download-url",t.INVALID_ARGUMENT="invalid-argument",t.INVALID_ARGUMENT_COUNT="invalid-argument-count",t.APP_DELETED="app-deleted",t.INVALID_ROOT_OPERATION="invalid-root-operation",t.INVALID_FORMAT="invalid-format",t.INTERNAL_ERROR="internal-error",t.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(ke||(ke={}));function kh(t){return"storage/"+t}function Kp(){const t="An unknown error occurred, please check the error payload for server response.";return new Re(ke.UNKNOWN,t)}function uD(t){return new Re(ke.OBJECT_NOT_FOUND,"Object '"+t+"' does not exist.")}function cD(t){return new Re(ke.QUOTA_EXCEEDED,"Quota for bucket '"+t+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function hD(){const t="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new Re(ke.UNAUTHENTICATED,t)}function dD(){return new Re(ke.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function fD(t){return new Re(ke.UNAUTHORIZED,"User does not have permission to access '"+t+"'.")}function pD(){return new Re(ke.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function mD(){return new Re(ke.CANCELED,"User canceled the upload/download.")}function gD(t){return new Re(ke.INVALID_URL,"Invalid URL '"+t+"'.")}function yD(t){return new Re(ke.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+t+"'.")}function _D(){return new Re(ke.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+o0+"' property when initializing the app?")}function vD(){return new Re(ke.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function wD(){return new Re(ke.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function ED(t){return new Re(ke.UNSUPPORTED_ENVIRONMENT,`${t} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function Gd(t){return new Re(ke.INVALID_ARGUMENT,t)}function a0(){return new Re(ke.APP_DELETED,"The Firebase app was deleted.")}function TD(t){return new Re(ke.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function Vo(t,e){return new Re(ke.INVALID_FORMAT,"String does not match format '"+t+"': "+e)}function lo(t){throw new Re(ke.INTERNAL_ERROR,"Internal error: "+t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nt{constructor(e,n){this.bucket=e,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,n){let r;try{r=Nt.makeFromUrl(e,n)}catch{return new Nt(e,"")}if(r.path==="")return r;throw yD(e)}static makeFromUrl(e,n){let r=null;const i="([A-Za-z0-9.\\-_]+)";function s(b){b.path.charAt(b.path.length-1)==="/"&&(b.path_=b.path_.slice(0,-1))}const o="(/(.*))?$",l=new RegExp("^gs://"+i+o,"i"),u={bucket:1,path:3};function c(b){b.path_=decodeURIComponent(b.path)}const f="v[A-Za-z0-9_]+",p=n.replace(/[.]/g,"\\."),m="(/([^?#]*).*)?$",I=new RegExp(`^https?://${p}/${f}/b/${i}/o${m}`,"i"),R={bucket:1,path:3},P=n===s0?"(?:storage.googleapis.com|storage.cloud.google.com)":n,O="([^?#]*)",A=new RegExp(`^https?://${P}/${i}/${O}`,"i"),k=[{regex:l,indices:u,postModify:s},{regex:I,indices:R,postModify:c},{regex:A,indices:{bucket:1,path:2},postModify:c}];for(let b=0;b<k.length;b++){const F=k[b],M=F.regex.exec(e);if(M){const v=M[F.indices.bucket];let y=M[F.indices.path];y||(y=""),r=new Nt(v,y),F.postModify(r);break}}if(r==null)throw gD(e);return r}}class ID{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function AD(t,e,n){let r=1,i=null,s=null,o=!1,l=0;function u(){return l===2}let c=!1;function f(...O){c||(c=!0,e.apply(null,O))}function p(O){i=setTimeout(()=>{i=null,t(I,u())},O)}function m(){s&&clearTimeout(s)}function I(O,...A){if(c){m();return}if(O){m(),f.call(null,O,...A);return}if(u()||o){m(),f.call(null,O,...A);return}r<64&&(r*=2);let k;l===1?(l=2,k=0):k=(r+Math.random())*1e3,p(k)}let R=!1;function P(O){R||(R=!0,m(),!c&&(i!==null?(O||(l=2),clearTimeout(i),p(0)):O||(l=1)))}return p(0),s=setTimeout(()=>{o=!0,P(!0)},n),P}function SD(t){t(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kD(t){return t!==void 0}function RD(t){return typeof t=="object"&&!Array.isArray(t)}function Qp(t){return typeof t=="string"||t instanceof String}function B_(t){return Xp()&&t instanceof Blob}function Xp(){return typeof Blob<"u"}function z_(t,e,n,r){if(r<e)throw Gd(`Invalid value for '${t}'. Expected ${e} or greater.`);if(r>n)throw Gd(`Invalid value for '${t}'. Expected ${n} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yp(t,e,n){let r=e;return n==null&&(r=`https://${e}`),`${n}://${r}/v0${t}`}function l0(t){const e=encodeURIComponent;let n="?";for(const r in t)if(t.hasOwnProperty(r)){const i=e(r)+"="+e(t[r]);n=n+i+"&"}return n=n.slice(0,-1),n}var oi;(function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"})(oi||(oi={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function CD(t,e){const n=t>=500&&t<600,i=[408,429].indexOf(t)!==-1,s=e.indexOf(t)!==-1;return n||i||s}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PD{constructor(e,n,r,i,s,o,l,u,c,f,p,m=!0,I=!1){this.url_=e,this.method_=n,this.headers_=r,this.body_=i,this.successCodes_=s,this.additionalRetryCodes_=o,this.callback_=l,this.errorCallback_=u,this.timeout_=c,this.progressCallback_=f,this.connectionFactory_=p,this.retry=m,this.isUsingEmulator=I,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((R,P)=>{this.resolve_=R,this.reject_=P,this.start_()})}start_(){const e=(r,i)=>{if(i){r(!1,new al(!1,null,!0));return}const s=this.connectionFactory_();this.pendingConnection_=s;const o=l=>{const u=l.loaded,c=l.lengthComputable?l.total:-1;this.progressCallback_!==null&&this.progressCallback_(u,c)};this.progressCallback_!==null&&s.addUploadProgressListener(o),s.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&s.removeUploadProgressListener(o),this.pendingConnection_=null;const l=s.getErrorCode()===oi.NO_ERROR,u=s.getStatus();if(!l||CD(u,this.additionalRetryCodes_)&&this.retry){const f=s.getErrorCode()===oi.ABORT;r(!1,new al(!1,null,f));return}const c=this.successCodes_.indexOf(u)!==-1;r(!0,new al(c,s))})},n=(r,i)=>{const s=this.resolve_,o=this.reject_,l=i.connection;if(i.wasSuccessCode)try{const u=this.callback_(l,l.getResponse());kD(u)?s(u):s()}catch(u){o(u)}else if(l!==null){const u=Kp();u.serverResponse=l.getErrorText(),this.errorCallback_?o(this.errorCallback_(l,u)):o(u)}else if(i.canceled){const u=this.appDelete_?a0():mD();o(u)}else{const u=pD();o(u)}};this.canceled_?n(!1,new al(!1,null,!0)):this.backoffId_=AD(e,n,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&SD(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class al{constructor(e,n,r){this.wasSuccessCode=e,this.connection=n,this.canceled=!!r}}function ND(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function xD(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function DD(t,e){e&&(t["X-Firebase-GMPID"]=e)}function bD(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function VD(t,e,n,r,i,s,o=!0,l=!1){const u=l0(t.urlParams),c=t.url+u,f=Object.assign({},t.headers);return DD(f,e),ND(f,n),xD(f,s),bD(f,r),new PD(c,t.method,f,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,i,o,l)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function OD(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function LD(...t){const e=OD();if(e!==void 0){const n=new e;for(let r=0;r<t.length;r++)n.append(t[r]);return n.getBlob()}else{if(Xp())return new Blob(t);throw new Re(ke.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function MD(t,e,n){return t.webkitSlice?t.webkitSlice(e,n):t.mozSlice?t.mozSlice(e,n):t.slice?t.slice(e,n):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function UD(t){if(typeof atob>"u")throw ED("base-64");return atob(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fn={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class Rh{constructor(e,n){this.data=e,this.contentType=n||null}}function FD(t,e){switch(t){case fn.RAW:return new Rh(u0(e));case fn.BASE64:case fn.BASE64URL:return new Rh(c0(t,e));case fn.DATA_URL:return new Rh(BD(e),zD(e))}throw Kp()}function u0(t){const e=[];for(let n=0;n<t.length;n++){let r=t.charCodeAt(n);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(n<t.length-1&&(t.charCodeAt(n+1)&64512)===56320))e.push(239,191,189);else{const s=r,o=t.charCodeAt(++n);r=65536|(s&1023)<<10|o&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function jD(t){let e;try{e=decodeURIComponent(t)}catch{throw Vo(fn.DATA_URL,"Malformed data URL.")}return u0(e)}function c0(t,e){switch(t){case fn.BASE64:{const i=e.indexOf("-")!==-1,s=e.indexOf("_")!==-1;if(i||s)throw Vo(t,"Invalid character '"+(i?"-":"_")+"' found: is it base64url encoded?");break}case fn.BASE64URL:{const i=e.indexOf("+")!==-1,s=e.indexOf("/")!==-1;if(i||s)throw Vo(t,"Invalid character '"+(i?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=UD(e)}catch(i){throw i.message.includes("polyfill")?i:Vo(t,"Invalid character found")}const r=new Uint8Array(n.length);for(let i=0;i<n.length;i++)r[i]=n.charCodeAt(i);return r}class h0{constructor(e){this.base64=!1,this.contentType=null;const n=e.match(/^data:([^,]+)?,/);if(n===null)throw Vo(fn.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=n[1]||null;r!=null&&(this.base64=$D(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function BD(t){const e=new h0(t);return e.base64?c0(fn.BASE64,e.rest):jD(e.rest)}function zD(t){return new h0(t).contentType}function $D(t,e){return t.length>=e.length?t.substring(t.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ur{constructor(e,n){let r=0,i="";B_(e)?(this.data_=e,r=e.size,i=e.type):e instanceof ArrayBuffer?(n?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(n?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=i}size(){return this.size_}type(){return this.type_}slice(e,n){if(B_(this.data_)){const r=this.data_,i=MD(r,e,n);return i===null?null:new ur(i)}else{const r=new Uint8Array(this.data_.buffer,e,n-e);return new ur(r,!0)}}static getBlob(...e){if(Xp()){const n=e.map(r=>r instanceof ur?r.data_:r);return new ur(LD.apply(null,n))}else{const n=e.map(o=>Qp(o)?FD(fn.RAW,o).data:o.data_);let r=0;n.forEach(o=>{r+=o.byteLength});const i=new Uint8Array(r);let s=0;return n.forEach(o=>{for(let l=0;l<o.length;l++)i[s++]=o[l]}),new ur(i,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function d0(t){let e;try{e=JSON.parse(t)}catch{return null}return RD(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qD(t){if(t.length===0)return null;const e=t.lastIndexOf("/");return e===-1?"":t.slice(0,e)}function HD(t,e){const n=e.split("/").filter(r=>r.length>0).join("/");return t.length===0?n:t+"/"+n}function f0(t){const e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function WD(t,e){return e}class ut{constructor(e,n,r,i){this.server=e,this.local=n||e,this.writable=!!r,this.xform=i||WD}}let ll=null;function GD(t){return!Qp(t)||t.length<2?t:f0(t)}function p0(){if(ll)return ll;const t=[];t.push(new ut("bucket")),t.push(new ut("generation")),t.push(new ut("metageneration")),t.push(new ut("name","fullPath",!0));function e(s,o){return GD(o)}const n=new ut("name");n.xform=e,t.push(n);function r(s,o){return o!==void 0?Number(o):o}const i=new ut("size");return i.xform=r,t.push(i),t.push(new ut("timeCreated")),t.push(new ut("updated")),t.push(new ut("md5Hash",null,!0)),t.push(new ut("cacheControl",null,!0)),t.push(new ut("contentDisposition",null,!0)),t.push(new ut("contentEncoding",null,!0)),t.push(new ut("contentLanguage",null,!0)),t.push(new ut("contentType",null,!0)),t.push(new ut("metadata","customMetadata",!0)),ll=t,ll}function KD(t,e){function n(){const r=t.bucket,i=t.fullPath,s=new Nt(r,i);return e._makeStorageReference(s)}Object.defineProperty(t,"ref",{get:n})}function QD(t,e,n){const r={};r.type="file";const i=n.length;for(let s=0;s<i;s++){const o=n[s];r[o.local]=o.xform(r,e[o.server])}return KD(r,t),r}function m0(t,e,n){const r=d0(e);return r===null?null:QD(t,r,n)}function XD(t,e,n,r){const i=d0(e);if(i===null||!Qp(i.downloadTokens))return null;const s=i.downloadTokens;if(s.length===0)return null;const o=encodeURIComponent;return s.split(",").map(c=>{const f=t.bucket,p=t.fullPath,m="/b/"+o(f)+"/o/"+o(p),I=Yp(m,n,r),R=l0({alt:"media",token:c});return I+R})[0]}function YD(t,e){const n={},r=e.length;for(let i=0;i<r;i++){const s=e[i];s.writable&&(n[s.server]=t[s.local])}return JSON.stringify(n)}class g0{constructor(e,n,r,i){this.url=e,this.method=n,this.handler=r,this.timeout=i,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function y0(t){if(!t)throw Kp()}function JD(t,e){function n(r,i){const s=m0(t,i,e);return y0(s!==null),s}return n}function ZD(t,e){function n(r,i){const s=m0(t,i,e);return y0(s!==null),XD(s,i,t.host,t._protocol)}return n}function _0(t){function e(n,r){let i;return n.getStatus()===401?n.getErrorText().includes("Firebase App Check token is invalid")?i=dD():i=hD():n.getStatus()===402?i=cD(t.bucket):n.getStatus()===403?i=fD(t.path):i=r,i.status=n.getStatus(),i.serverResponse=r.serverResponse,i}return e}function eb(t){const e=_0(t);function n(r,i){let s=e(r,i);return r.getStatus()===404&&(s=uD(t.path)),s.serverResponse=i.serverResponse,s}return n}function tb(t,e,n){const r=e.fullServerUrl(),i=Yp(r,t.host,t._protocol),s="GET",o=t.maxOperationRetryTime,l=new g0(i,s,ZD(t,n),o);return l.errorHandler=eb(e),l}function nb(t,e){return t&&t.contentType||e&&e.type()||"application/octet-stream"}function rb(t,e,n){const r=Object.assign({},n);return r.fullPath=t.path,r.size=e.size(),r.contentType||(r.contentType=nb(null,e)),r}function ib(t,e,n,r,i){const s=e.bucketOnlyServerUrl(),o={"X-Goog-Upload-Protocol":"multipart"};function l(){let k="";for(let b=0;b<2;b++)k=k+Math.random().toString().slice(2);return k}const u=l();o["Content-Type"]="multipart/related; boundary="+u;const c=rb(e,r,i),f=YD(c,n),p="--"+u+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+f+`\r
--`+u+`\r
Content-Type: `+c.contentType+`\r
\r
`,m=`\r
--`+u+"--",I=ur.getBlob(p,r,m);if(I===null)throw vD();const R={name:c.fullPath},P=Yp(s,t.host,t._protocol),O="POST",A=t.maxUploadRetryTime,w=new g0(P,O,JD(t,n),A);return w.urlParams=R,w.headers=o,w.body=I.uploadData(),w.errorHandler=_0(e),w}class sb{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=oi.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=oi.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=oi.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,n,r,i,s){if(this.sent_)throw lo("cannot .send() more than once");if($n(e)&&r&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(n,e,!0),s!==void 0)for(const o in s)s.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,s[o].toString());return i!==void 0?this.xhr_.send(i):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw lo("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw lo("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw lo("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw lo("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class ob extends sb{initXhr(){this.xhr_.responseType="text"}}function v0(){return new ob}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gi{constructor(e,n){this._service=e,n instanceof Nt?this._location=n:this._location=Nt.makeFromUrl(n,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,n){return new gi(e,n)}get root(){const e=new Nt(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return f0(this._location.path)}get storage(){return this._service}get parent(){const e=qD(this._location.path);if(e===null)return null;const n=new Nt(this._location.bucket,e);return new gi(this._service,n)}_throwIfRoot(e){if(this._location.path==="")throw TD(e)}}function ab(t,e,n){t._throwIfRoot("uploadBytes");const r=ib(t.storage,t._location,p0(),new ur(e,!0),n);return t.storage.makeRequestWithTokens(r,v0).then(i=>({metadata:i,ref:t}))}function lb(t){t._throwIfRoot("getDownloadURL");const e=tb(t.storage,t._location,p0());return t.storage.makeRequestWithTokens(e,v0).then(n=>{if(n===null)throw wD();return n})}function ub(t,e){const n=HD(t._location.path,e),r=new Nt(t._location.bucket,n);return new gi(t.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cb(t){return/^[A-Za-z]+:\/\//.test(t)}function hb(t,e){return new gi(t,e)}function w0(t,e){if(t instanceof Jp){const n=t;if(n._bucket==null)throw _D();const r=new gi(n,n._bucket);return e!=null?w0(r,e):r}else return e!==void 0?ub(t,e):t}function db(t,e){if(e&&cb(e)){if(t instanceof Jp)return hb(t,e);throw Gd("To use ref(service, url), the first argument must be a Storage instance.")}else return w0(t,e)}function $_(t,e){const n=e==null?void 0:e[o0];return n==null?null:Nt.makeFromBucketSpec(n,t)}function fb(t,e,n,r={}){t.host=`${e}:${n}`;const i=$n(e);i&&Wu(`https://${t.host}/b`),t._isUsingEmulator=!0,t._protocol=i?"https":"http";const{mockUserToken:s}=r;s&&(t._overrideAuthToken=typeof s=="string"?s:bE(s,t.app.options.projectId))}class Jp{constructor(e,n,r,i,s,o=!1){this.app=e,this._authProvider=n,this._appCheckProvider=r,this._url=i,this._firebaseVersion=s,this._isUsingEmulator=o,this._bucket=null,this._host=s0,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=aD,this._maxUploadRetryTime=lD,this._requests=new Set,i!=null?this._bucket=Nt.makeFromBucketSpec(i,this._host):this._bucket=$_(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=Nt.makeFromBucketSpec(this._url,e):this._bucket=$_(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){z_("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){z_("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const n=await e.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){if(kt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new gi(this,e)}_makeRequest(e,n,r,i,s=!0){if(this._deleted)return new ID(a0());{const o=VD(e,this._appId,r,i,n,this._firebaseVersion,s,this._isUsingEmulator);return this._requests.add(o),o.getPromise().then(()=>this._requests.delete(o),()=>this._requests.delete(o)),o}}async makeRequestWithTokens(e,n){const[r,i]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,n,r,i).getPromise()}}const q_="@firebase/storage",H_="0.14.3";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E0="storage";function W_(t,e,n){return t=ce(t),ab(t,e,n)}function G_(t){return t=ce(t),lb(t)}function K_(t,e){return t=ce(t),db(t,e)}function pb(t=Rs(),e){t=ce(t);const r=qn(t,E0).getImmediate({identifier:e}),i=Wf("storage");return i&&mb(r,...i),r}function mb(t,e,n,r={}){fb(t,e,n,r)}function gb(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),r=t.getProvider("auth-internal"),i=t.getProvider("app-check-internal");return new Jp(n,r,i,e,Ti)}function yb(){Gt(new Lt(E0,gb,"PUBLIC").setMultipleInstances(!0)),it(q_,H_,""),it(q_,H_,"esm2020")}yb();const T0="@firebase/installations",Zp="0.6.22";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const I0=1e4,A0=`w:${Zp}`,S0="FIS_v2",_b="https://firebaseinstallations.googleapis.com/v1",vb=60*60*1e3,wb="installations",Eb="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tb={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},yi=new Ei(wb,Eb,Tb);function k0(t){return t instanceof Ft&&t.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function R0({projectId:t}){return`${_b}/projects/${t}/installations`}function C0(t){return{token:t.token,requestStatus:2,expiresIn:Ab(t.expiresIn),creationTime:Date.now()}}async function P0(t,e){const r=(await e.json()).error;return yi.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function N0({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function Ib(t,{refreshToken:e}){const n=N0(t);return n.append("Authorization",Sb(e)),n}async function x0(t){const e=await t();return e.status>=500&&e.status<600?t():e}function Ab(t){return Number(t.replace("s","000"))}function Sb(t){return`${S0} ${t}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function kb({appConfig:t,heartbeatServiceProvider:e},{fid:n}){const r=R0(t),i=N0(t),s=e.getImmediate({optional:!0});if(s){const c=await s.getHeartbeatsHeader();c&&i.append("x-firebase-client",c)}const o={fid:n,authVersion:S0,appId:t.appId,sdkVersion:A0},l={method:"POST",headers:i,body:JSON.stringify(o)},u=await x0(()=>fetch(r,l));if(u.ok){const c=await u.json();return{fid:c.fid||n,registrationStatus:2,refreshToken:c.refreshToken,authToken:C0(c.authToken)}}else throw await P0("Create Installation",u)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function D0(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rb(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cb=/^[cdef][\w-]{21}$/,Kd="";function Pb(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const n=Nb(t);return Cb.test(n)?n:Kd}catch{return Kd}}function Nb(t){return Rb(t).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vc(t){return`${t.appName}!${t.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b0=new Map;function V0(t,e){const n=vc(t);O0(n,e),xb(n,e)}function O0(t,e){const n=b0.get(t);if(n)for(const r of n)r(e)}function xb(t,e){const n=Db();n&&n.postMessage({key:t,fid:e}),bb()}let ni=null;function Db(){return!ni&&"BroadcastChannel"in self&&(ni=new BroadcastChannel("[Firebase] FID Change"),ni.onmessage=t=>{O0(t.data.key,t.data.fid)}),ni}function bb(){b0.size===0&&ni&&(ni.close(),ni=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vb="firebase-installations-database",Ob=1,_i="firebase-installations-store";let Ch=null;function em(){return Ch||(Ch=ME(Vb,Ob,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(_i)}}})),Ch}async function Su(t,e){const n=vc(t),i=(await em()).transaction(_i,"readwrite"),s=i.objectStore(_i),o=await s.get(n);return await s.put(e,n),await i.done,(!o||o.fid!==e.fid)&&V0(t,e.fid),e}async function L0(t){const e=vc(t),r=(await em()).transaction(_i,"readwrite");await r.objectStore(_i).delete(e),await r.done}async function wc(t,e){const n=vc(t),i=(await em()).transaction(_i,"readwrite"),s=i.objectStore(_i),o=await s.get(n),l=e(o);return l===void 0?await s.delete(n):await s.put(l,n),await i.done,l&&(!o||o.fid!==l.fid)&&V0(t,l.fid),l}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tm(t){let e;const n=await wc(t.appConfig,r=>{const i=Lb(r),s=Mb(t,i);return e=s.registrationPromise,s.installationEntry});return n.fid===Kd?{installationEntry:await e}:{installationEntry:n,registrationPromise:e}}function Lb(t){const e=t||{fid:Pb(),registrationStatus:0};return M0(e)}function Mb(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const i=Promise.reject(yi.create("app-offline"));return{installationEntry:e,registrationPromise:i}}const n={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=Ub(t,n);return{installationEntry:n,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:Fb(t)}:{installationEntry:e}}async function Ub(t,e){try{const n=await kb(t,e);return Su(t.appConfig,n)}catch(n){throw k0(n)&&n.customData.serverCode===409?await L0(t.appConfig):await Su(t.appConfig,{fid:e.fid,registrationStatus:0}),n}}async function Fb(t){let e=await Q_(t.appConfig);for(;e.registrationStatus===1;)await D0(100),e=await Q_(t.appConfig);if(e.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await tm(t);return r||n}return e}function Q_(t){return wc(t,e=>{if(!e)throw yi.create("installation-not-found");return M0(e)})}function M0(t){return jb(t)?{fid:t.fid,registrationStatus:0}:t}function jb(t){return t.registrationStatus===1&&t.registrationTime+I0<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bb({appConfig:t,heartbeatServiceProvider:e},n){const r=zb(t,n),i=Ib(t,n),s=e.getImmediate({optional:!0});if(s){const c=await s.getHeartbeatsHeader();c&&i.append("x-firebase-client",c)}const o={installation:{sdkVersion:A0,appId:t.appId}},l={method:"POST",headers:i,body:JSON.stringify(o)},u=await x0(()=>fetch(r,l));if(u.ok){const c=await u.json();return C0(c)}else throw await P0("Generate Auth Token",u)}function zb(t,{fid:e}){return`${R0(t)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nm(t,e=!1){let n;const r=await wc(t.appConfig,s=>{if(!U0(s))throw yi.create("not-registered");const o=s.authToken;if(!e&&Hb(o))return s;if(o.requestStatus===1)return n=$b(t,e),s;{if(!navigator.onLine)throw yi.create("app-offline");const l=Gb(s);return n=qb(t,l),l}});return n?await n:r.authToken}async function $b(t,e){let n=await X_(t.appConfig);for(;n.authToken.requestStatus===1;)await D0(100),n=await X_(t.appConfig);const r=n.authToken;return r.requestStatus===0?nm(t,e):r}function X_(t){return wc(t,e=>{if(!U0(e))throw yi.create("not-registered");const n=e.authToken;return Kb(n)?{...e,authToken:{requestStatus:0}}:e})}async function qb(t,e){try{const n=await Bb(t,e),r={...e,authToken:n};return await Su(t.appConfig,r),n}catch(n){if(k0(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await L0(t.appConfig);else{const r={...e,authToken:{requestStatus:0}};await Su(t.appConfig,r)}throw n}}function U0(t){return t!==void 0&&t.registrationStatus===2}function Hb(t){return t.requestStatus===2&&!Wb(t)}function Wb(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+vb}function Gb(t){const e={requestStatus:1,requestTime:Date.now()};return{...t,authToken:e}}function Kb(t){return t.requestStatus===1&&t.requestTime+I0<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qb(t){const e=t,{installationEntry:n,registrationPromise:r}=await tm(e);return r?r.catch(console.error):nm(e).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xb(t,e=!1){const n=t;return await Yb(n),(await nm(n,e)).token}async function Yb(t){const{registrationPromise:e}=await tm(t);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jb(t){if(!t||!t.options)throw Ph("App Configuration");if(!t.name)throw Ph("App Name");const e=["projectId","apiKey","appId"];for(const n of e)if(!t.options[n])throw Ph(n);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function Ph(t){return yi.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const F0="installations",Zb="installations-internal",eV=t=>{const e=t.getProvider("app").getImmediate(),n=Jb(e),r=qn(e,"heartbeat");return{app:e,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},tV=t=>{const e=t.getProvider("app").getImmediate(),n=qn(e,F0).getImmediate();return{getId:()=>Qb(n),getToken:i=>Xb(n,i)}};function nV(){Gt(new Lt(F0,eV,"PUBLIC")),Gt(new Lt(Zb,tV,"PRIVATE"))}nV();it(T0,Zp);it(T0,Zp,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ku="analytics",rV="firebase_id",iV="origin",sV=60*1e3,oV="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",rm="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pt=new Gu("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const aV={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},Vt=new Ei("analytics","Analytics",aV);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lV(t){if(!t.startsWith(rm)){const e=Vt.create("invalid-gtag-resource",{gtagURL:t});return pt.warn(e.message),""}return t}function j0(t){return Promise.all(t.map(e=>e.catch(n=>n)))}function uV(t,e){let n;return window.trustedTypes&&(n=window.trustedTypes.createPolicy(t,e)),n}function cV(t,e){const n=uV("firebase-js-sdk-policy",{createScriptURL:lV}),r=document.createElement("script"),i=`${rm}?l=${t}&id=${e}`;r.src=n?n==null?void 0:n.createScriptURL(i):i,r.async=!0,document.head.appendChild(r)}function hV(t){let e=[];return Array.isArray(window[t])?e=window[t]:window[t]=e,e}async function dV(t,e,n,r,i,s){const o=r[i];try{if(o)await e[o];else{const u=(await j0(n)).find(c=>c.measurementId===i);u&&await e[u.appId]}}catch(l){pt.error(l)}t("config",i,s)}async function fV(t,e,n,r,i){try{let s=[];if(i&&i.send_to){let o=i.send_to;Array.isArray(o)||(o=[o]);const l=await j0(n);for(const u of o){const c=l.find(p=>p.measurementId===u),f=c&&e[c.appId];if(f)s.push(f);else{s=[];break}}}s.length===0&&(s=Object.values(e)),await Promise.all(s),t("event",r,i||{})}catch(s){pt.error(s)}}function pV(t,e,n,r){async function i(s,...o){try{if(s==="event"){const[l,u]=o;await fV(t,e,n,l,u)}else if(s==="config"){const[l,u]=o;await dV(t,e,n,r,l,u)}else if(s==="consent"){const[l,u]=o;t("consent",l,u)}else if(s==="get"){const[l,u,c]=o;t("get",l,u,c)}else if(s==="set"){const[l]=o;t("set",l)}else t(s,...o)}catch(l){pt.error(l)}}return i}function mV(t,e,n,r,i){let s=function(...o){window[r].push(arguments)};return window[i]&&typeof window[i]=="function"&&(s=window[i]),window[i]=pV(s,t,e,n),{gtagCore:s,wrappedGtag:window[i]}}function gV(t){const e=window.document.getElementsByTagName("script");for(const n of Object.values(e))if(n.src&&n.src.includes(rm)&&n.src.includes(t))return n;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yV=30,_V=1e3;class vV{constructor(e={},n=_V){this.throttleMetadata=e,this.intervalMillis=n}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,n){this.throttleMetadata[e]=n}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const B0=new vV;function wV(t){return new Headers({Accept:"application/json","x-goog-api-key":t})}async function EV(t){var o;const{appId:e,apiKey:n}=t,r={method:"GET",headers:wV(n)},i=oV.replace("{app-id}",e),s=await fetch(i,r);if(s.status!==200&&s.status!==304){let l="";try{const u=await s.json();(o=u.error)!=null&&o.message&&(l=u.error.message)}catch{}throw Vt.create("config-fetch-failed",{httpStatus:s.status,responseMessage:l})}return s.json()}async function TV(t,e=B0,n){const{appId:r,apiKey:i,measurementId:s}=t.options;if(!r)throw Vt.create("no-app-id");if(!i){if(s)return{measurementId:s,appId:r};throw Vt.create("no-api-key")}const o=e.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},l=new SV;return setTimeout(async()=>{l.abort()},sV),z0({appId:r,apiKey:i,measurementId:s},o,l,e)}async function z0(t,{throttleEndTimeMillis:e,backoffCount:n},r,i=B0){var l;const{appId:s,measurementId:o}=t;try{await IV(r,e)}catch(u){if(o)return pt.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${u==null?void 0:u.message}]`),{appId:s,measurementId:o};throw u}try{const u=await EV(t);return i.deleteThrottleMetadata(s),u}catch(u){const c=u;if(!AV(c)){if(i.deleteThrottleMetadata(s),o)return pt.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${c==null?void 0:c.message}]`),{appId:s,measurementId:o};throw u}const f=Number((l=c==null?void 0:c.customData)==null?void 0:l.httpStatus)===503?my(n,i.intervalMillis,yV):my(n,i.intervalMillis),p={throttleEndTimeMillis:Date.now()+f,backoffCount:n+1};return i.setThrottleMetadata(s,p),pt.debug(`Calling attemptFetch again in ${f} millis`),z0(t,p,r,i)}}function IV(t,e){return new Promise((n,r)=>{const i=Math.max(e-Date.now(),0),s=setTimeout(n,i);t.addEventListener(()=>{clearTimeout(s),r(Vt.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function AV(t){if(!(t instanceof Ft)||!t.customData)return!1;const e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}class SV{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function kV(t,e,n,r,i){if(i&&i.global){t("event",n,r);return}else{const s=await e,o={...r,send_to:s};t("event",n,o)}}async function RV(t,e,n,r){if(r&&r.global){const i={};for(const s of Object.keys(n))i[`user_properties.${s}`]=n[s];return t("set",i),Promise.resolve()}else{const i=await e;t("config",i,{update:!0,user_properties:n})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function CV(){if(Kf())try{await Qf()}catch(t){return pt.warn(Vt.create("indexeddb-unavailable",{errorInfo:t==null?void 0:t.toString()}).message),!1}else return pt.warn(Vt.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function PV(t,e,n,r,i,s,o){const l=TV(t);l.then(m=>{n[m.measurementId]=m.appId,t.options.measurementId&&m.measurementId!==t.options.measurementId&&pt.warn(`The measurement ID in the local Firebase config (${t.options.measurementId}) does not match the measurement ID fetched from the server (${m.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(m=>pt.error(m)),e.push(l);const u=CV().then(m=>{if(m)return r.getId()}),[c,f]=await Promise.all([l,u]);gV(s)||cV(s,c.measurementId),i("js",new Date);const p=(o==null?void 0:o.config)??{};return p[iV]="firebase",p.update=!0,f!=null&&(p[rV]=f),i("config",c.measurementId,p),c.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NV{constructor(e){this.app=e}_delete(){return delete os[this.app.options.appId],Promise.resolve()}}let os={},Y_=[];const J_={};let Nh="dataLayer",xV="gtag",Z_,im,ev=!1;function DV(){const t=[];if(Gf()&&t.push("This is a browser extension environment."),VE()||t.push("Cookies are not available."),t.length>0){const e=t.map((r,i)=>`(${i+1}) ${r}`).join(" "),n=Vt.create("invalid-analytics-context",{errorInfo:e});pt.warn(n.message)}}function bV(t,e,n){DV();const r=t.options.appId;if(!r)throw Vt.create("no-app-id");if(!t.options.apiKey)if(t.options.measurementId)pt.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${t.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw Vt.create("no-api-key");if(os[r]!=null)throw Vt.create("already-exists",{id:r});if(!ev){hV(Nh);const{wrappedGtag:s,gtagCore:o}=mV(os,Y_,J_,Nh,xV);im=s,Z_=o,ev=!0}return os[r]=PV(t,Y_,J_,e,Z_,Nh,n),new NV(t)}function VV(t=Rs()){t=ce(t);const e=qn(t,ku);return e.isInitialized()?e.getImmediate():OV(t)}function OV(t,e={}){const n=qn(t,ku);if(n.isInitialized()){const i=n.getImmediate();if(En(e,n.getOptions()))return i;throw Vt.create("already-initialized")}return n.initialize({options:e})}async function LV(){if(Gf()||!VE()||!Kf())return!1;try{return await Qf()}catch{return!1}}function MV(t,e,n){t=ce(t),RV(im,os[t.app.options.appId],e,n).catch(r=>pt.error(r))}function $0(t,e,n,r){t=ce(t),kV(im,os[t.app.options.appId],e,n,r).catch(i=>pt.error(i))}const tv="@firebase/analytics",nv="0.10.22";function UV(){Gt(new Lt(ku,(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("installations-internal").getImmediate();return bV(r,i,n)},"PUBLIC")),Gt(new Lt("analytics-internal",t,"PRIVATE")),it(tv,nv),it(tv,nv,"esm2020");function t(e){try{const n=e.getProvider(ku).getImmediate();return{logEvent:(r,i,s)=>$0(n,r,i,s),setUserProperties:(r,i)=>MV(n,r,i)}}catch(n){throw Vt.create("interop-component-reg-failed",{reason:n})}}}UV();const FV={apiKey:"AIzaSyBDZBg0ROX64qVqsqcFi7KoO3svZnkR_Jc",authDomain:"everybodytakes.firebaseapp.com",projectId:"everybodytakes",storageBucket:"everybodytakes.firebasestorage.app",messagingSenderId:"759909661412",appId:"1:759909661412:web:ba27e79b149d28aeeb4af1",measurementId:"G-5QQFFZ0ZBR"},Ec=TC().length?Rs():UE(FV);let Qd=null;LV().then(t=>{t&&(Qd=VV(Ec))}).catch(()=>{});function q0(t,e){Qd&&$0(Qd,t,e)}const xh=D1(Ec),Qe=j2(Ec),rv=pb(Ec);async function jV(){return xh.currentUser?xh.currentUser.uid:(await gP(xh)).user.uid}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const BV="type.googleapis.com/google.protobuf.Int64Value",zV="type.googleapis.com/google.protobuf.UInt64Value";function H0(t,e){const n={};for(const r in t)t.hasOwnProperty(r)&&(n[r]=e(t[r]));return n}function Ru(t){if(t==null)return null;if(t instanceof Number&&(t=t.valueOf()),typeof t=="number"&&isFinite(t)||t===!0||t===!1||Object.prototype.toString.call(t)==="[object String]")return t;if(t instanceof Date)return t.toISOString();if(Array.isArray(t))return t.map(e=>Ru(e));if(typeof t=="function"||typeof t=="object")return H0(t,e=>Ru(e));throw new Error("Data cannot be encoded in JSON: "+t)}function Ts(t){if(t==null)return t;if(t["@type"])switch(t["@type"]){case BV:case zV:{const e=Number(t.value);if(isNaN(e))throw new Error("Data cannot be decoded from JSON: "+t);return e}default:throw new Error("Data cannot be decoded from JSON: "+t)}return Array.isArray(t)?t.map(e=>Ts(e)):typeof t=="function"||typeof t=="object"?H0(t,e=>Ts(e)):t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sm="functions";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iv={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class wt extends Ft{constructor(e,n,r){super(`${sm}/${e}`,n||""),this.details=r,Object.setPrototypeOf(this,wt.prototype)}}function $V(t){if(t>=200&&t<300)return"ok";switch(t){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function Cu(t,e){let n=$V(t),r=n,i;try{const s=e&&e.error;if(s){const o=s.status;if(typeof o=="string"){if(!iv[o])return new wt("internal","internal");n=iv[o],r=o}const l=s.message;typeof l=="string"&&(r=l),i=s.details,i!==void 0&&(i=Ts(i))}}catch{}return n==="ok"?null:new wt(n,r,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qV{constructor(e,n,r,i){this.app=e,this.auth=null,this.messaging=null,this.appCheck=null,this.serverAppAppCheckToken=null,kt(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.auth=n.getImmediate({optional:!0}),this.messaging=r.getImmediate({optional:!0}),this.auth||n.get().then(s=>this.auth=s,()=>{}),this.messaging||r.get().then(s=>this.messaging=s,()=>{}),this.appCheck||i==null||i.get().then(s=>this.appCheck=s,()=>{})}async getAuthToken(){if(this.auth)try{const e=await this.auth.getToken();return e==null?void 0:e.accessToken}catch{return}}async getMessagingToken(){if(!(!this.messaging||!("Notification"in self)||Notification.permission!=="granted"))try{return await this.messaging.getToken()}catch{return}}async getAppCheckToken(e){if(this.serverAppAppCheckToken)return this.serverAppAppCheckToken;if(this.appCheck){const n=e?await this.appCheck.getLimitedUseToken():await this.appCheck.getToken();return n.error?null:n.token}return null}async getContext(e){const n=await this.getAuthToken(),r=await this.getMessagingToken(),i=await this.getAppCheckToken(e);return{authToken:n,messagingToken:r,appCheckToken:i}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xd="us-central1",HV=/^data: (.*?)(?:\n|$)/;function WV(t){let e=null;return{promise:new Promise((n,r)=>{e=setTimeout(()=>{r(new wt("deadline-exceeded","deadline-exceeded"))},t)}),cancel:()=>{e&&clearTimeout(e)}}}class GV{constructor(e,n,r,i,s=Xd,o=(...l)=>fetch(...l)){this.app=e,this.fetchImpl=o,this.emulatorOrigin=null,this.contextProvider=new qV(e,n,r,i),this.cancelAllRequests=new Promise(l=>{this.deleteService=()=>Promise.resolve(l())});try{const l=new URL(s);this.customDomain=l.origin+(l.pathname==="/"?"":l.pathname),this.region=Xd}catch{this.customDomain=null,this.region=s}}_delete(){return this.deleteService()}_url(e){const n=this.app.options.projectId;return this.emulatorOrigin!==null?`${this.emulatorOrigin}/${n}/${this.region}/${e}`:this.customDomain!==null?`${this.customDomain}/${e}`:`https://${this.region}-${n}.cloudfunctions.net/${e}`}}function KV(t,e,n){const r=$n(e);t.emulatorOrigin=`http${r?"s":""}://${e}:${n}`,r&&Wu(t.emulatorOrigin+"/backends")}function QV(t,e,n){const r=i=>YV(t,e,i,{});return r.stream=(i,s)=>ZV(t,e,i,s),r}function W0(t){return t.emulatorOrigin&&$n(t.emulatorOrigin)?"include":void 0}async function XV(t,e,n,r,i){n["Content-Type"]="application/json";let s;try{s=await r(t,{method:"POST",body:JSON.stringify(e),headers:n,credentials:W0(i)})}catch{return{status:0,json:null}}let o=null;try{o=await s.json()}catch{}return{status:s.status,json:o}}async function G0(t,e){const n={},r=await t.contextProvider.getContext(e.limitedUseAppCheckTokens);return r.authToken&&(n.Authorization="Bearer "+r.authToken),r.messagingToken&&(n["Firebase-Instance-ID-Token"]=r.messagingToken),r.appCheckToken!==null&&(n["X-Firebase-AppCheck"]=r.appCheckToken),n}function YV(t,e,n,r){const i=t._url(e);return JV(t,i,n,r)}async function JV(t,e,n,r){n=Ru(n);const i={data:n},s=await G0(t,r),o=r.timeout||7e4,l=WV(o),u=await Promise.race([XV(e,i,s,t.fetchImpl,t),l.promise,t.cancelAllRequests]);if(l.cancel(),!u)throw new wt("cancelled","Firebase Functions instance was deleted.");const c=Cu(u.status,u.json);if(c)throw c;if(!u.json)throw new wt("internal","Response is not valid JSON object.");let f=u.json.data;if(typeof f>"u"&&(f=u.json.result),typeof f>"u")throw new wt("internal","Response is missing data field.");return{data:Ts(f)}}function ZV(t,e,n,r){const i=t._url(e);return eO(t,i,n,r||{})}async function eO(t,e,n,r){var m;n=Ru(n);const i={data:n},s=await G0(t,r);s["Content-Type"]="application/json",s.Accept="text/event-stream";let o;try{o=await t.fetchImpl(e,{method:"POST",body:JSON.stringify(i),headers:s,signal:r==null?void 0:r.signal,credentials:W0(t)})}catch(I){if(I instanceof Error&&I.name==="AbortError"){const P=new wt("cancelled","Request was cancelled.");return{data:Promise.reject(P),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(P)}}}}}}const R=Cu(0,null);return{data:Promise.reject(R),stream:{[Symbol.asyncIterator](){return{next(){return Promise.reject(R)}}}}}}let l,u;const c=new Promise((I,R)=>{l=I,u=R});(m=r==null?void 0:r.signal)==null||m.addEventListener("abort",()=>{const I=new wt("cancelled","Request was cancelled.");u(I)});const f=o.body.getReader(),p=tO(f,l,u,r==null?void 0:r.signal);return{stream:{[Symbol.asyncIterator](){const I=p.getReader();return{async next(){const{value:R,done:P}=await I.read();return{value:R,done:P}},async return(){return await I.cancel(),{done:!0,value:void 0}}}}},data:c}}function tO(t,e,n,r){const i=(o,l)=>{const u=o.match(HV);if(!u)return;const c=u[1];try{const f=JSON.parse(c);if("result"in f){e(Ts(f.result));return}if("message"in f){l.enqueue(Ts(f.message));return}if("error"in f){const p=Cu(0,f);l.error(p),n(p);return}}catch(f){if(f instanceof wt){l.error(f),n(f);return}}},s=new TextDecoder;return new ReadableStream({start(o){let l="";return u();async function u(){if(r!=null&&r.aborted){const c=new wt("cancelled","Request was cancelled");return o.error(c),n(c),Promise.resolve()}try{const{value:c,done:f}=await t.read();if(f){l.trim()&&i(l.trim(),o),o.close();return}if(r!=null&&r.aborted){const m=new wt("cancelled","Request was cancelled");o.error(m),n(m),await t.cancel();return}l+=s.decode(c,{stream:!0});const p=l.split(`
`);l=p.pop()||"";for(const m of p)m.trim()&&i(m.trim(),o);return u()}catch(c){const f=c instanceof wt?c:Cu(0,null);o.error(f),n(f)}}},cancel(){return t.cancel()}})}const sv="@firebase/functions",ov="0.13.5";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nO="auth-internal",rO="app-check-internal",iO="messaging-internal";function sO(t){const e=(n,{instanceIdentifier:r})=>{const i=n.getProvider("app").getImmediate(),s=n.getProvider(nO),o=n.getProvider(iO),l=n.getProvider(rO);return new GV(i,s,o,l,r)};Gt(new Lt(sm,e,"PUBLIC").setMultipleInstances(!0)),it(sv,ov,t),it(sv,ov,"esm2020")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oO(t=Rs(),e=Xd){const r=qn(ce(t),sm).getImmediate({identifier:e}),i=Wf("functions");return i&&aO(r,...i),r}function aO(t,e,n){KV(ce(t),e,n)}function lO(t,e,n){return QV(ce(t),e)}sO();const xl=240,uO=150;class Is extends Error{constructor(e){super(e),this.code=e}}const K0=()=>crypto.randomUUID().replace(/-/g,"").slice(0,21);function av(t){return t&&typeof t.toMillis=="function"?t.toMillis():typeof t=="string"&&Date.parse(t)||0}const cO=t=>[...t].sort((e,n)=>av(n.createdAt)-av(e.createdAt));async function hO(t){const e=t.trim().toUpperCase(),n=await sD(e0(BI(Qe,"events"),X2("shortCode","==",e)));return n.empty?null:n.docs[0].data()}async function dO(t,e,n){const r=Kt(Qe,"events",t),i=Kt(Qe,"events",t,"guests",e);return Wp(Qe,async s=>{const o=await s.get(r);if(!o.exists())throw new Error("Event not found");const l=o.data(),u=await s.get(i);if(u.exists())return u.data().shotsRemaining??0;if(l.maxGuests!=null&&(l.guestCount??0)>=l.maxGuests)throw new Is("event_full");return s.set(i,{userId:e,nickname:n??"Anonymous",shotsRemaining:l.shotsPerGuest,joinedAt:yc()}),s.update(r,{guestCount:Es(1)}),l.shotsPerGuest})}async function fO(t,e){const n=Kt(Qe,"events",t,"guests",e);await Wp(Qe,async r=>{const i=await r.get(n);if(!i.exists())return;const s=i.data().shotsRemaining??0;if(s<=0)throw new Is("no_shots");r.update(n,{shotsRemaining:s-1})})}function Q0(t,e,n){return new Promise((r,i)=>{const s=URL.createObjectURL(t),o=new Image;o.onload=()=>{let l=o.naturalWidth,u=o.naturalHeight;const c=Math.min(1,e/Math.max(l,u));l=Math.round(l*c),u=Math.round(u*c);const f=document.createElement("canvas");f.width=l,f.height=u,f.getContext("2d").drawImage(o,0,0,l,u),URL.revokeObjectURL(s),f.toBlob(p=>p?r(p):i(new Error("encode failed")),"image/jpeg",n)},o.onerror=()=>{URL.revokeObjectURL(s),i(new Error("decode failed"))},o.src=s})}const pO=t=>Q0(t,1920,.85),X0=400;function mO(t){return new Promise((e,n)=>{const r=URL.createObjectURL(t),i=document.createElement("video");i.muted=!0,i.playsInline=!0,i.preload="metadata",i.onloadeddata=()=>{try{i.currentTime=Math.min(.1,(i.duration||1)/2)}catch{n(new Error("seek failed"))}},i.onseeked=()=>{let s=i.videoWidth,o=i.videoHeight;const l=Math.min(1,X0/Math.max(s,o));s=Math.round(s*l),o=Math.round(o*l);const u=document.createElement("canvas");u.width=s,u.height=o,u.getContext("2d").drawImage(i,0,0,s,o),URL.revokeObjectURL(r),u.toBlob(c=>c?e(c):n(new Error("poster failed")),"image/jpeg",.7)},i.onerror=()=>{URL.revokeObjectURL(r),n(new Error("video decode failed"))},i.src=r})}async function gO(t,e,n){try{return n?await mO(t):await Q0(e,X0,.7)}catch{return null}}async function yO(t,e,n,r,i){const s=K0(),o=Kt(Qe,"events",t);await Wp(Qe,async l=>{const u=await l.get(o);if(!u.exists())throw new Error("Event not found");const c=u.data();if(!c.isActive)throw new Is("event_ended");if(c.photoCap!=null&&(c.photoCount??0)>=c.photoCap)throw new Is("photo_cap");l.update(o,{photoCount:Es(1)})});try{const l=i==="video";let u,c;if(l)u=r,c=r.type||"video/mp4";else try{u=await pO(r),c="image/jpeg"}catch{u=r,c=r.type||"image/jpeg"}const f=l?c.split("/")[1]||"mp4":"jpg",p=K_(rv,`events/${t}/photos/${s}.${f}`);await W_(p,u,{contentType:c});const m=await G_(p);let I=m;const R=await gO(r,u,l);if(R)try{const O=K_(rv,`events/${t}/thumbs/${s}.jpg`);await W_(O,R,{contentType:"image/jpeg"}),I=await G_(O)}catch{}const P={id:s,eventId:t,uploadedBy:e,uploaderName:n,imageUrl:m,thumbnailUrl:I,mediaType:i,isVisible:!0,likesCount:0,likedBy:[],createdAt:new Date().toISOString()};return await Gp(Kt(Qe,"events",t,"photos",s),{...P,createdAt:yc()}),P}catch(l){throw await Sa(o,{photoCount:Es(-1)}).catch(()=>{}),l}}function _O(t,e){const n=e0(BI(Qe,"events",t,"photos"),Y2("createdAt","desc"),J2(uO));return oD(n,r=>e(cO(r.docs.map(i=>i.data({serverTimestamps:"estimate"})))))}async function vO(t,e,n,r){const i=r.trim().slice(0,xl);i&&await Gp(Kt(Qe,"events",t,"notes",e),{authorId:e,authorName:(n==null?void 0:n.trim())||null,text:i,createdAt:yc()})}async function Y0(t,e){const n=await iD(Kt(Qe,"events",t,"notes",e));return n.exists()?{id:n.id,...n.data()}:null}async function wO(t){return(await lO(oO(),"createEventZip")({eventId:t})).data}async function EO(t,e,n,r){await Sa(Kt(Qe,"events",t,"photos",e),{likedBy:r?K2(n):G2(n),likesCount:Es(r?-1:1)})}async function TO(t,e){await Sa(Kt(Qe,"events",t,"photos",e),{isVisible:!1})}async function IO(t,e,n){await Gp(Kt(Qe,"reports",K0()),{eventId:t,photoId:e,reporterId:n,reason:"objectionable",createdAt:yc()}),await Sa(Kt(Qe,"events",t,"photos",e),{flagged:!0,reportCount:Es(1)}).catch(()=>{})}async function AO(t,e){await Sa(Kt(Qe,"events",t,"guests",e),{shotsRemaining:Es(1)}).catch(()=>{})}const lv={en:{joining:"Joining event…",notFound:"We couldn't find that event. Check the code and try again.",enterCode:"Enter event code",codeHint:"Find it on the QR card or invite.",tryAgain:"Try another code",live:"Live",codePlaceholder:"ABC123",go:"Join event",yourName:"Your name",anonymous:"Anonymous",namePlaceholder:"You can stay anonymous",photo:"Photo",video:"Video",fromAlbum:"From album",shotsLeft:"{n} left",noShots:"No shots left",uploading:"Uploading…",ended:"This event has ended",gallery:"Gallery",empty:"No photos yet — be the first!",all:"All",mine:"Mine",by:"By",download:"Download",developing:"Photos reveal after the event",full:"This event is full",capReached:"Photo limit reached for this event",opensAt:"Opens {time}",uploadFailed:"Upload failed — your shot was returned. Try again.",report:"Report",reportConfirm:"Report this photo? It will be hidden and reviewed.",reported:"Thanks — the content was reported and hidden.",deleteBtn:"Delete",deleteConfirm:"Delete this photo?",leaveMemory:"Leave a memory",editMemory:"Edit your memory",memorySubtitle:"Share a few words about tonight",memoryPlaceholder:"Write your message…",memorySend:"Leave note",memoryUpdate:"Update",memorySent:"Your note has been added 💌",cancel:"Cancel",downloadZip:"Download all (ZIP)",zipPreparing:"Preparing…",zipFailed:"Could not prepare the ZIP. Try again in a moment."},tr:{joining:"Etkinliğe katılıyor…",notFound:"Bu etkinliği bulamadık. Kodu kontrol edip tekrar dene.",enterCode:"Etkinlik kodunu gir",codeHint:"QR kartında ya da davetiyede yazıyor.",tryAgain:"Başka kod dene",live:"Canlı",codePlaceholder:"ABC123",go:"Etkinliğe katıl",yourName:"Adın",anonymous:"Anonim",namePlaceholder:"Anonim kalabilirsin",photo:"Fotoğraf",video:"Video",fromAlbum:"Albümden",shotsLeft:"{n} kaldı",noShots:"Çekim kalmadı",uploading:"Yükleniyor…",ended:"Bu etkinlik sona erdi",gallery:"Galeri",empty:"Henüz fotoğraf yok — ilk sen ol!",all:"Tümü",mine:"Benim",by:"Çeken",download:"İndir",developing:"Fotoğraflar etkinlikten sonra açılır",full:"Bu etkinlik dolu",capReached:"Bu etkinliğin fotoğraf limiti doldu",opensAt:"{time} açılır",uploadFailed:"Yükleme başarısız — çekim hakkın iade edildi. Tekrar dene.",report:"Bildir",reportConfirm:"Bu fotoğraf bildirilsin mi? Gizlenir ve incelenir.",reported:"Teşekkürler — içerik bildirildi ve gizlendi.",deleteBtn:"Sil",deleteConfirm:"Bu fotoğraf silinsin mi?",leaveMemory:"Bir anı bırak",editMemory:"Anını düzenle",memorySubtitle:"Bu akşam için birkaç kelime",memoryPlaceholder:"Mesajını yaz…",memorySend:"Notu bırak",memoryUpdate:"Güncelle",memorySent:"Notun eklendi 💌",cancel:"İptal",downloadZip:"Hepsini indir (ZIP)",zipPreparing:"Hazırlanıyor…",zipFailed:"ZIP hazırlanamadı. Birazdan tekrar dene."}},SO=(navigator.language||"en").toLowerCase().startsWith("tr")?"tr":"en";function G(t,e){let n=lv[SO][t]??lv.en[t]??t;if(e)for(const[r,i]of Object.entries(e))n=n.replace(`{${r}}`,String(i));return n}function kO({event:t,uid:e,nickname:n,shots:r,onShotsChange:i}){const[s,o]=ae.useState(!1),[l,u]=ae.useState(""),c=ae.useRef(null),f=ae.useRef(null),p=ae.useRef(null),m=r<=0;async function I(R,P){var k;const O=(k=R.target.files)==null?void 0:k[0];if(R.target.value="",!O||s||m)return;const A=P??(O.type.startsWith("video")?"video":"image");o(!0),u("");let w=!1;try{await fO(t.id,e),w=!0,i(r-1),await yO(t.id,e,n.trim()||null,O,A),q0("web_upload",{mediaType:A})}catch(b){b instanceof Is?u(b.code==="no_shots"?G("noShots"):b.code==="photo_cap"?G("capReached"):G("ended")):(w&&(await AO(t.id,e),i(r)),u(G("uploadFailed")))}finally{o(!1)}}return x.jsx("div",{className:"fixed inset-x-0 bottom-0 border-t border-line bg-paper/95 backdrop-blur",children:x.jsxs("div",{className:"mx-auto max-w-md px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]",children:[l&&x.jsx("p",{className:"mb-2 text-center text-xs font-semibold text-brand",children:l}),x.jsx("div",{className:"mb-2 flex justify-center",children:x.jsxs("span",{className:`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${m?"bg-brand/10 text-brand":"bg-paper-card text-ink-soft"}`,children:[x.jsx(uv,{small:!0})," ",m?G("noShots"):G("shotsLeft",{n:r})]})}),x.jsx("input",{ref:c,type:"file",accept:"image/*",capture:"environment",hidden:!0,onChange:R=>I(R,"image")}),x.jsx("input",{ref:f,type:"file",accept:"video/*",capture:"environment",hidden:!0,onChange:R=>I(R,"video")}),x.jsx("input",{ref:p,type:"file",accept:"image/*,video/*",hidden:!0,onChange:R=>I(R)}),x.jsxs("div",{className:"flex items-center gap-2.5",children:[x.jsxs("button",{disabled:s||m,onClick:()=>{var R;return(R=c.current)==null?void 0:R.click()},className:"flex flex-1 items-center justify-center gap-2 rounded-2xl bg-brand py-3.5 font-semibold text-white shadow-sm transition active:scale-[0.98] disabled:opacity-40",children:[x.jsx(uv,{})," ",G(s?"uploading":"photo")]}),x.jsx("button",{disabled:s||m,onClick:()=>{var R;return(R=f.current)==null?void 0:R.click()},"aria-label":G("video"),className:"grid h-[52px] w-[52px] place-items-center rounded-2xl border border-brand text-brand transition active:scale-[0.98] disabled:opacity-40",children:x.jsx(RO,{})}),t.allowGalleryUpload&&x.jsx("button",{disabled:s||m,onClick:()=>{var R;return(R=p.current)==null?void 0:R.click()},"aria-label":G("fromAlbum"),className:"grid h-[52px] w-[52px] place-items-center rounded-2xl border border-line text-ink-soft transition active:scale-[0.98] disabled:opacity-40",children:x.jsx(CO,{})})]})]})})}function uv({small:t}){const e=t?14:20;return x.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[x.jsx("path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z"}),x.jsx("circle",{cx:"12",cy:"13",r:"3"})]})}function RO(){return x.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[x.jsx("path",{d:"m22 8-6 4 6 4V8Z"}),x.jsx("rect",{x:"2",y:"6",width:"14",height:"12",rx:"2"})]})}function CO(){return x.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[x.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),x.jsx("circle",{cx:"9",cy:"9",r:"2"}),x.jsx("path",{d:"m21 15-3.5-3.5L9 20"})]})}function cv(t){if(t.revealTiming!=="next_day")return 0;const e=t.date?new Date(t.date):new Date;return e.setHours(0,0,0,0),e.setDate(e.getDate()+1),e.getTime()}function PO({event:t,uid:e,photos:n}){var v,y;const[r,i]=ae.useState(n),[s,o]=ae.useState("all"),[l,u]=ae.useState(null),[c,f]=ae.useState(!1),p=ae.useRef(null),m=ae.useRef(null);ae.useEffect(()=>i(n),[n]);const I=t.revealTiming==="private",R=t.revealTiming!=="next_day"||Date.now()>=cv(t),P=r.filter(_=>_.isVisible===!1||_.flagged?!1:I||s==="mine"?_.uploadedBy===e:!0),O=_=>{m.current=_,u(_)};ae.useEffect(()=>{l!=null&&m.current!=null&&p.current&&(p.current.scrollLeft=m.current*p.current.clientWidth,m.current=null)},[l]);const A=()=>{const _=p.current;if(!_||m.current!=null)return;const E=Math.round(_.scrollLeft/_.clientWidth);E!==l&&E>=0&&E<P.length&&u(E)},w=_=>{const E=(_.likedBy??[]).includes(e);i(S=>S.map(C=>C.id===_.id?{...C,likedBy:E?(C.likedBy??[]).filter(T=>T!==e):[...C.likedBy??[],e],likesCount:(C.likesCount??0)+(E?-1:1)}:C)),EO(t.id,_.id,e,E).catch(()=>{})},k=_=>{window.confirm(G("deleteConfirm"))&&(u(null),i(E=>E.filter(S=>S.id!==_.id)),TO(t.id,_.id).catch(()=>{}))},b=_=>{window.confirm(G("reportConfirm"))&&(u(null),i(E=>E.filter(S=>S.id!==_.id)),IO(t.id,_.id,e).catch(()=>{}),window.alert(G("reported")))},F=async()=>{if(!c){f(!0);try{const{url:_}=await wO(t.id);window.location.href=_}catch{window.alert(G("zipFailed"))}finally{f(!1)}}},M=l!=null?P[l]:null;return x.jsxs("section",{className:"mt-5",children:[x.jsxs("div",{className:"mb-3 flex items-center justify-between",children:[x.jsx("h2",{className:"text-lg font-bold",children:G("gallery")}),!I&&R&&x.jsx("div",{className:"flex gap-1 rounded-full border border-line bg-paper-card p-0.5",children:["all","mine"].map(_=>x.jsx("button",{onClick:()=>o(_),className:`rounded-full px-3 py-1 text-xs font-semibold ${s===_?"bg-brand text-white":"text-ink-muted"}`,children:G(_==="all"?"all":"mine")},_))})]}),R&&P.length>0&&x.jsx("div",{className:"mb-3 flex justify-center",children:x.jsxs("button",{onClick:F,disabled:c,className:"inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-dark px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(190,106,46,0.7)] transition hover:brightness-105 active:scale-[0.97] disabled:opacity-50",children:[x.jsx(VO,{})," ",G(c?"zipPreparing":"downloadZip")]})}),R?P.length===0?x.jsx(hv,{children:G("empty")}):x.jsx("div",{className:"grid grid-cols-2 gap-1.5",children:P.map((_,E)=>{var C;const S=((C=_.likedBy)==null?void 0:C.length)??0;return x.jsxs("button",{onClick:()=>O(E),className:"relative aspect-[9/13] overflow-hidden rounded-lg bg-paper-deep",children:[x.jsx(NO,{src:_.thumbnailUrl||_.imageUrl}),_.mediaType==="video"&&x.jsx("span",{className:"absolute left-1.5 top-1.5 rounded-full bg-black/55 p-1",children:x.jsx(xO,{})}),_.uploadedBy===e&&x.jsx("span",{className:"absolute right-1.5 top-1.5 h-4 w-4 rounded-full bg-brand"}),S>0&&x.jsxs("span",{className:"absolute bottom-1.5 left-1.5 flex items-center gap-1 rounded-full bg-black/55 px-1.5 py-0.5 text-[11px] font-semibold text-white",children:[x.jsx(dv,{filled:!0})," ",S]})]},_.id)})}):x.jsxs(hv,{children:[G("developing"),x.jsx("span",{className:"mt-1 block text-xs font-semibold text-brand",children:G("opensAt",{time:new Date(cv(t)).toLocaleString(void 0,{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})})})]}),M&&x.jsxs("div",{className:"fixed inset-0 z-50 bg-black",children:[x.jsx("div",{ref:p,onScroll:A,className:"no-scrollbar snap-x-mandatory flex h-full w-full overflow-x-auto overflow-y-hidden",children:P.map(_=>x.jsx("div",{className:"snap-center flex h-full w-full flex-none items-center justify-center",children:_.mediaType==="video"?x.jsx("video",{src:_.imageUrl,controls:!0,playsInline:!0,className:"max-h-full max-w-full"}):x.jsx("img",{src:_.imageUrl,alt:"",className:"max-h-full max-w-full object-contain"})},_.id))}),x.jsx("button",{onClick:()=>u(null),className:"absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/15 text-white",children:x.jsx(DO,{})}),x.jsxs("div",{className:"absolute inset-x-0 bottom-0 flex flex-col items-center gap-3 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6",children:[x.jsxs("p",{className:"text-sm text-white/70",children:[G("by")," ",x.jsx("span",{className:"font-semibold text-white",children:((v=M.uploaderName)==null?void 0:v.trim())||G("anonymous")})," · ",l+1,"/",P.length]}),x.jsxs("div",{className:"flex items-center gap-8 text-white",children:[x.jsxs("button",{onClick:()=>w(M),className:`flex flex-col items-center gap-1 text-xs ${(M.likedBy??[]).includes(e)?"text-brand":"text-white"}`,children:[x.jsx(dv,{filled:(M.likedBy??[]).includes(e),big:!0}),(((y=M.likedBy)==null?void 0:y.length)??0)>0?M.likedBy.length:""]}),x.jsxs("a",{href:M.imageUrl,target:"_blank",rel:"noreferrer",download:!0,className:"flex flex-col items-center gap-1 text-xs",children:[x.jsx(bO,{})," ",G("download")]}),M.uploadedBy===e?x.jsxs("button",{onClick:()=>k(M),className:"flex flex-col items-center gap-1 text-xs",children:[x.jsx(OO,{})," ",G("deleteBtn")]}):x.jsxs("button",{onClick:()=>b(M),className:"flex flex-col items-center gap-1 text-xs",children:[x.jsx(LO,{})," ",G("report")]})]})]})]})]})}function hv({children:t}){return x.jsx("div",{className:"rounded-2xl border border-line bg-paper-card py-12 text-center text-sm text-ink-muted",children:t})}function NO({src:t}){const[e,n]=ae.useState(!1);return e||!t?x.jsx("div",{className:"h-full w-full bg-gradient-to-br from-brand/30 to-brand-dark/50"}):x.jsx("img",{src:t,alt:"",onError:()=>n(!0),className:"h-full w-full object-cover",loading:"lazy"})}function xO(){return x.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"white",children:x.jsx("path",{d:"M8 5v14l11-7z"})})}function DO(){return x.jsx("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",children:x.jsx("path",{d:"M18 6 6 18M6 6l12 12"})})}function bO(){return x.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:x.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"})})}function VO(){return x.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:x.jsx("path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"})})}function OO(){return x.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:x.jsx("path",{d:"M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"})})}function LO(){return x.jsx("svg",{width:"24",height:"24",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:x.jsx("path",{d:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"})})}function dv({filled:t,big:e}){const n=e?24:12;return x.jsx("svg",{width:n,height:n,viewBox:"0 0 24 24",fill:t?"currentColor":"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:x.jsx("path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"})})}function MO({eventId:t,uid:e,nickname:n,onClose:r,onSaved:i}){const[s,o]=ae.useState(""),[l,u]=ae.useState(!1),[c,f]=ae.useState(!1),p=xl-s.length;ae.useEffect(()=>{let R=!0;return Y0(t,e).then(P=>{R&&(o((P==null?void 0:P.text)??""),u(!!P))}).catch(()=>{}),()=>{R=!1}},[t,e]);const m=()=>{c||r()},I=async()=>{if(!(!s.trim()||c)){f(!0);try{await vO(t,e,n.trim()||null,s),i(),r(),window.alert(G("memorySent"))}catch{window.alert(G("uploadFailed"))}finally{f(!1)}}};return x.jsxs("div",{className:"fixed inset-0 z-50 flex items-center justify-center px-5",children:[x.jsx("div",{className:"absolute inset-0 bg-black/45 backdrop-blur-sm",onClick:m}),x.jsxs("div",{className:"relative w-full max-w-sm rounded-3xl border border-line bg-paper p-5 shadow-[0_30px_60px_-30px_rgba(58,38,18,0.55)]",children:[x.jsxs("div",{className:"flex items-center gap-3",children:[x.jsx("div",{className:"grid h-10 w-10 flex-none place-items-center rounded-full bg-brand/12 text-xl",children:"📖"}),x.jsxs("div",{className:"min-w-0",children:[x.jsx("h2",{className:"font-serif text-xl font-semibold leading-tight",children:G(l?"editMemory":"leaveMemory")}),x.jsx("p",{className:"text-sm text-ink-muted",children:G("memorySubtitle")})]})]}),x.jsx("textarea",{value:s,onChange:R=>o(R.target.value.slice(0,xl)),placeholder:G("memoryPlaceholder"),maxLength:xl,rows:4,autoFocus:!0,className:"mt-4 w-full resize-none rounded-2xl border border-line bg-paper-card px-4 py-3 text-[15px] outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"}),x.jsx("div",{className:`mt-1 text-right text-xs ${p<=20?"text-brand":"text-ink-muted"}`,children:p}),x.jsx("button",{onClick:I,disabled:!s.trim()||c,className:"mt-3 w-full rounded-2xl bg-brand py-3.5 font-semibold text-white shadow-sm transition active:scale-[0.98] disabled:opacity-40",children:G(l?"memoryUpdate":"memorySend")}),x.jsx("button",{onClick:m,className:"mt-1 w-full py-2 text-sm font-semibold text-brand",children:G("cancel")})]})]})}const fv="guestcam_nick";function UO(){return(new URLSearchParams(window.location.search).get("code")??"").trim()}function FO(){const[t,e]=ae.useState("loading"),[n,r]=ae.useState(null),[i,s]=ae.useState(""),[o,l]=ae.useState(0),[u,c]=ae.useState([]),[f,p]=ae.useState(()=>localStorage.getItem(fv)??""),[m,I]=ae.useState(""),[R,P]=ae.useState(!1),[O,A]=ae.useState(!1),w=ae.useRef(null);async function k(M){if(!M){e("needCode");return}e("loading");try{const v=await jV();s(v);const y=await hO(M);if(!y){e("error");return}if(r(y),y.isActive)try{const _=await dO(y.id,v,f||null);l(_),q0("web_join",{eventType:y.type})}catch(_){_ instanceof Is&&_.code}w.current=_O(y.id,c),y.notes&&y.notesEnabled!==!1&&Y0(y.id,v).then(_=>A(!!_)).catch(()=>{}),e("ready")}catch{e("error")}}ae.useEffect(()=>(k(UO()),()=>{var M;return(M=w.current)==null?void 0:M.call(w)}),[]);const b=M=>{p(M),localStorage.setItem(fv,M)};if(t==="loading")return x.jsxs(Dh,{children:[x.jsx(uo,{}),x.jsx(jO,{}),x.jsx("p",{className:"text-ink-soft",children:G("joining")})]});if(t==="needCode")return x.jsx(Dh,{children:x.jsxs("div",{className:"w-full max-w-xs rounded-3xl border border-line bg-paper-card/80 px-7 py-9 shadow-[0_30px_60px_-40px_rgba(58,38,18,0.5)] backdrop-blur",children:[x.jsx(uo,{}),x.jsx("h1",{className:"mt-6 font-serif text-2xl font-semibold leading-tight",children:G("enterCode")}),x.jsx("p",{className:"mt-1.5 text-sm text-ink-muted",children:G("codeHint")}),x.jsx("input",{value:m,onChange:M=>I(M.target.value.toUpperCase()),onKeyDown:M=>{M.key==="Enter"&&k(m)},placeholder:G("codePlaceholder"),maxLength:6,autoFocus:!0,className:"mt-6 w-full rounded-2xl border border-line bg-white/70 px-4 py-3.5 text-center text-2xl font-bold tracking-[0.4em] outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"}),x.jsx("button",{onClick:()=>k(m),disabled:m.length<4,className:"mt-4 w-full rounded-2xl bg-brand py-3.5 font-semibold text-white shadow-sm transition active:scale-[0.98] disabled:opacity-40",children:G("go")})]})});if(t==="error"||!n)return x.jsxs(Dh,{children:[x.jsx(uo,{}),x.jsx("div",{className:"mt-2 grid h-16 w-16 place-items-center rounded-full bg-brand/10 text-brand",children:x.jsxs("svg",{width:"30",height:"30",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[x.jsx("circle",{cx:"12",cy:"12",r:"10"}),x.jsx("path",{d:"M12 8v4M12 16h.01"})]})}),x.jsx("p",{className:"max-w-xs text-ink-soft",children:G("notFound")}),x.jsx("button",{onClick:()=>e("needCode"),className:"rounded-2xl border border-line bg-paper-card px-5 py-2.5 text-sm font-semibold text-ink-soft transition active:scale-95",children:G("tryAgain")})]});const F=n.date?new Date(n.date).toLocaleDateString(void 0,{day:"numeric",month:"long",year:"numeric"}):"";return x.jsxs("div",{className:"min-h-full pb-36",children:[x.jsxs("header",{className:"sticky top-0 z-30 flex items-center justify-between border-b border-line/70 bg-paper/80 px-4 py-2.5 backdrop-blur-md",children:[x.jsx(uo,{small:!0}),x.jsxs("span",{className:"inline-flex items-center gap-1.5 rounded-full bg-paper-card px-2.5 py-1 text-xs font-semibold text-ink-soft",children:[x.jsx(zO,{})," ",u.length]})]}),x.jsxs("div",{className:"relative h-60 w-full overflow-hidden",children:[n.coverImageUrl?x.jsx("img",{src:n.coverImageUrl,alt:"",className:"h-full w-full object-cover"}):x.jsx("div",{className:"flex h-full items-center justify-center bg-gradient-to-br from-brand to-brand-dark",children:x.jsx(uo,{})}),n.isActive&&x.jsxs("span",{className:"absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur",children:[x.jsx("span",{className:"h-1.5 w-1.5 animate-pulse rounded-full bg-red-400"})," ",G("live")]}),x.jsxs("div",{className:"absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent px-5 pb-5 pt-16",children:[x.jsx("h1",{className:"font-serif text-3xl font-semibold leading-tight text-white drop-shadow-sm",children:n.name}),F&&x.jsx("p",{className:"mt-1 text-sm font-medium text-white/85",children:F})]})]}),x.jsxs("div",{className:"mx-auto max-w-md px-4",children:[x.jsxs("div",{className:"mt-4 flex items-center gap-3 rounded-2xl border border-line bg-paper-card px-3.5 py-3",children:[x.jsx("div",{className:"grid h-10 w-10 flex-none place-items-center rounded-full bg-brand/12 text-brand",children:f.trim()?x.jsx("span",{className:"font-serif text-lg font-semibold",children:f.trim()[0].toUpperCase()}):x.jsx(BO,{})}),x.jsxs("div",{className:"min-w-0 flex-1",children:[x.jsx("label",{className:"block text-[11px] font-semibold uppercase tracking-wide text-ink-muted",children:G("yourName")}),x.jsx("input",{value:f,onChange:M=>b(M.target.value),placeholder:G("namePlaceholder"),maxLength:30,className:"w-full bg-transparent text-[15px] font-medium outline-none placeholder:font-normal placeholder:text-ink-muted"})]})]}),n.notes&&n.notesEnabled!==!1&&n.isActive&&x.jsxs("button",{onClick:()=>P(!0),className:"mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-brand bg-brand/10 py-3 font-semibold text-brand transition active:scale-[0.98]",children:[x.jsx("span",{className:"text-base leading-none",children:"📖"})," ",G(O?"editMemory":"leaveMemory")]}),x.jsx(PO,{event:n,uid:i,photos:u})]}),n.isActive?x.jsx(kO,{event:n,uid:i,nickname:f,shots:o,onShotsChange:l}):x.jsx("div",{className:"fixed inset-x-0 bottom-0 bg-paper/90 py-4 text-center text-sm text-ink-muted backdrop-blur",children:G("ended")}),R&&x.jsx(MO,{eventId:n.id,uid:i,nickname:f,onClose:()=>P(!1),onSaved:()=>A(!0)})]})}function Dh({children:t}){return x.jsx("div",{className:"flex min-h-full flex-col items-center justify-center gap-4 px-6 text-center",children:t})}function jO(){return x.jsx("div",{className:"h-9 w-9 animate-spin rounded-full border-2 border-line border-t-brand"})}function uo({small:t}){return x.jsxs("div",{className:"flex items-center justify-center gap-2",children:[x.jsx("img",{src:"/app/guestmark.png",alt:"",className:t?"h-7 w-7 rounded-lg":"h-9 w-9 rounded-lg shadow-sm"}),x.jsxs("span",{className:`font-serif font-semibold tracking-tight ${t?"text-lg":"text-2xl"}`,children:["Guest",x.jsx("span",{className:"text-brand",children:"Cam"})]})]})}function BO(){return x.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[x.jsx("path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"}),x.jsx("circle",{cx:"12",cy:"7",r:"4"})]})}function zO(){return x.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[x.jsx("rect",{x:"3",y:"3",width:"18",height:"18",rx:"2"}),x.jsx("circle",{cx:"9",cy:"9",r:"2"}),x.jsx("path",{d:"m21 15-3.5-3.5L9 20"})]})}kE(document.getElementById("root")).render(x.jsx(ae.StrictMode,{children:x.jsx(FO,{})}));
