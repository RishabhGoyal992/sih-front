oSpP=false;function oSendpulsePush(){var K="https://login.sendpulse.com";var j="https://login.sendpulse.com";var p="https://login.sendpulse.com";var k="https://login.sendpulse.com";var l=false;var v=false;var z={};var a="";var J="web.com.sendpulse.push";var n="https://pushdata.sendpulse.com:4434";var B="https://pushdata.sendpulse.com:4435";var b="https://android.googleapis.com/gcm/send/";var r=true;var i="02de509b3bff9b5a25d8e48ac274e951";var y="";var m="";var e="";var D="-";var A=null;var q=null;var G=false;var s={};var c={};var h=false;var I="https://updates.push.services.mozilla.com/push/";var t="https://updates.push.services.mozilla.com/wpush/v1/";var x=false;var f=0;var o=false;var E=false;var w=false;var g=false;var H=true;var d="1";var C="sendpulse.com";var F={ru:"ÐŸÑ€ÐµÐ´Ð¾ÑÑ‚Ð°Ð²Ð»ÐµÐ½Ð¾ SendPulse",en:"Powered by SendPulse",ua:"ÐÐ°Ð´Ð°Ð½Ð¾ SendPulse"};var u="0";this.start=function(){if(!oSpP.detectSite()){oSpP.log("Application allowed only for "+K);return false}if(oSpP.detectOs()=="iOS"){oSpP.log("Application can not work on iOS");return false}var L=oSpP.detectOs();if(!H){if((L=="iOS")||(L=="Android")){oSpP.log("Application disabled for your device");return false}}oSpP.detectHttps();z=oSpP.detectBrowser();a=z.name.toLowerCase();if((a=="firefox")&&(parseFloat(z.version)<44)){oSpP.log("Application can not work with Firefox browser version less then 44");return false}if((a=="opera")&&(parseFloat(z.version)<43)){oSpP.log("Application can not work with Opera browser version less then 43");return false}if((a=="firefox")&&(L=="Android")){oSpP.log("Application can not work with Firefox on Android");return false}if(a=="firefox"){p=k}if(v){if(o){w=true;g=true}var N=setInterval(function(){if(E&&w&&g){oSpP.sendToParent("closeme");clearInterval(N)}},50)}if(l){if(r){oSpP.startDelayedSubscription(function(){oSpP.startSubscription();if(a=="safari"||a=="chrome"||a=="firefox"){oSpP.showhelpPromptText()}})}else{oSpP.getDbValue("SPIDs","PromptClosed",function(P){if(P.target.result===undefined){if(a=="safari"||a=="chrome"||a=="firefox"){oSpP.startDelayedSubscription(function(){oSpP.showCustomPrompt()})}}});var O=document.querySelectorAll(".sp_notify_prompt");for(var M=0;M<O.length;M++){O[M].addEventListener("click",function(){oSpP.startSubscription()})}}}if(v){window.addEventListener("message",function(Q){if(oSpP.detectOrigin(Q.origin)){if(Q.data=="init"){q=Q;q.source.postMessage("initend",q.origin)}else{if(Q.data.indexOf("initpage")===0){var P=Q.data.split("|");if(P.length==2){G=P[1]}}else{if(Q.data.indexOf("initvariables")===0){var P=Q.data.split("|");s=JSON.parse(P[1])}}}}},false)}};this.startSubscription=function(){switch(a){case"safari":if(oSpP.isSafariNotificationSupported()){var M=window.safari.pushNotification.permission(J);oSpP.checkSafariPermission(M)}break;case"chrome":case"firefox":case"opera":if(l){var L=document.createElement("link");L.rel="manifest";L.href="/sp-push-manifest.json";document.head.appendChild(L)}if(oSpP.isServiceWorkerChromeSupported()){oSpP.log("ASK for Permission");f=Date.now();Notification.requestPermission(oSpP.doActionsWithPermissions);oSpP.registerChrome()}break}};this.clearDomain=function(L){return L.replace("://www.","://").replace("://www2.","://")};this.detectSite=function(){var L=(!(oSpP.clearDomain(window.location.href.toLowerCase()).indexOf(oSpP.clearDomain(K.toLowerCase()))===-1));if(!L){L=(!(oSpP.clearDomain(window.location.href.toLowerCase()).indexOf(oSpP.clearDomain(j.toLowerCase()))===-1))}return L};this.detectOrigin=function(L){return(!(oSpP.clearDomain(L.toLowerCase()).indexOf(oSpP.clearDomain(p.toLowerCase()))===-1))};this.detectHttps=function(){l=(window.location.href.indexOf("https://")===0)};this.log=function(L){};this.detectBrowser=function(){var N,M=navigator.userAgent,L=M.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)||[];var O=M.match(/(edge(?=\/))\/?\s*(\d+)/i)||[];if("Edge"===O[1]){return{name:O[1],version:O[2]}}return/trident/i.test(L[1])?(N=/\brv[ :]+(\d+)/g.exec(M)||[],{name:"IE",version:N[1]||""}):"Chrome"===L[1]&&(N=M.match(/\bOPR\/(\d+)/),null!=N)?{name:"Opera",version:N[1]}:(L=L[2]?[L[1],L[2]]:[navigator.appName,navigator.appVersion,"-?"],null!=(N=M.match(/version\/(\d+)/i))&&L.splice(1,1,N[1]),{name:L[0],version:L[1]})};this.isServiceWorkerChromeSupported=function(){return"serviceWorker" in navigator};this.isSafariNotificationSupported=function(){return"safari" in window&&"pushNotification" in window.safari};this.getBrowserlanguage=function(){return navigator.language.substring(0,2)};this.setCookie=function(M,O,N){var P=new Date;P.setTime(P.getTime()+24*N*60*60*1000);var L="expires="+P.toUTCString();document.cookie=M+"="+O+"; "+L};this.checkCookie=function(M){for(var O=M+"=",N=document.cookie.split(";"),P=0;P<N.length;P++){for(var L=N[P];" "==L.charAt(0);){L=L.substring(1)}if(0==L.indexOf(O)){return L.substring(O.length,L.length)}}return""};this.doActionsWithPermissions=function(M){var L=Date.now();var N=L-f;if(N<50){x=false}else{x=true}oSpP.log("[DD] Permissions: "+M);oSpP.log("[DD] Time diff: "+N);switch(M){case"granted":if(!o){if(x){oSpP.getDbValue("SPIDs","PromptShowed",function(O){if(O.target.result===undefined){oSpP.sendPromptStat("prompt_showed");oSpP.sendPromptStat("prompt_granted");oSpP.putValueToDb("SPIDs",{type:"PromptShowed",value:1})}else{oSpP.sendPromptStat("prompt_showed_again");oSpP.sendPromptStat("prompt_granted")}})}}switch(a){case"chrome":case"firefox":case"opera":oSpP.subscribe();break}break;case"default":if(!o){if(x){oSpP.getDbValue("SPIDs","PromptShowed",function(O){if(O.target.result===undefined){oSpP.sendPromptStat("prompt_showed");oSpP.sendPromptStat("prompt_closed");oSpP.putValueToDb("SPIDs",{type:"PromptShowed",value:1})}else{oSpP.sendPromptStat("prompt_showed_again");oSpP.sendPromptStat("prompt_closed")}})}}break;case"denied":if(!o){if(x){oSpP.getDbValue("SPIDs","PromptShowed",function(O){if(O.target.result===undefined){oSpP.sendPromptStat("prompt_showed");oSpP.sendPromptStat("prompt_denied");oSpP.putValueToDb("SPIDs",{type:"PromptShowed",value:1})}else{oSpP.sendPromptStat("prompt_showed_again");oSpP.sendPromptStat("prompt_denied")}})}}break}if(!r){if(M=="default"){oSpP.closeCustomPrompt(false)}else{oSpP.closeCustomPrompt(true)}}else{if(M=="default"){oSpP.closePromptHelpText(false)}else{oSpP.closePromptHelpText(true)}}};this.registerChrome=function(){navigator.serviceWorker.register("/sp-push-worker.js").then(function(L){if(L.installing){oSpP.log("Service worker installing")}else{if(L.waiting){oSpP.log("Service worker installed")}else{if(L.active){oSpP.log("Service worker active")}}}})};this.checkSafariPermission=function(L){oSpP.log("[DD] Permissions: "+L.permission);if(L.permission==="default"){if(!r){oSpP.closeCustomPrompt(false)}else{oSpP.closePromptHelpText(false)}x=true;oSpP.getDbValue("SPIDs","PromptShowed",function(M){if(M.target.result===undefined){oSpP.sendPromptStat("prompt_showed");oSpP.putValueToDb("SPIDs",{type:"PromptShowed",value:1})}else{oSpP.sendPromptStat("prompt_showed_again")}});window.safari.pushNotification.requestPermission(n,J,{appkey:i},oSpP.checkSafariPermission)}else{if(L.permission==="denied"){if(!r){oSpP.closeCustomPrompt(true)}else{oSpP.closePromptHelpText(true)}if(x){oSpP.sendPromptStat("prompt_denied")}}else{if(L.permission==="granted"){oSpP.uns();if(!r){oSpP.closeCustomPrompt(true)}else{oSpP.closePromptHelpText(true)}if(x){oSpP.sendPromptStat("prompt_granted")}oSpP.subscribe()}}}};this.initialiseState=function(L){if(!(L.showNotification)){oSpP.log("Notifications aren't supported on service workers.")}else{}if(Notification.permission==="denied"){oSpP.log("The user has blocked notifications.");return}if(!("PushManager" in window)){oSpP.log("Push messaging isn't supported.");return}};this.endpointWorkaround=function(N){switch(a){case"chrome":case"opera":if("subscriptionId" in N){var L=N.subscriptionId}else{var L=N.endpoint}if(~L.indexOf(b)){var M=L.split(b);return M[1]}else{return L}break;case"firefox":var L=N.endpoint;if(~L.indexOf(I)){var M=L.split(I);return M[1]}else{if(~L.indexOf(t)){var M=L.split(t);return M[1]}else{return L}}}};this.subscribe=function(){switch(a){case"chrome":case"firefox":case"opera":navigator.serviceWorker.ready.then(function(N){N.pushManager.subscribe({userVisibleOnly:true}).then(function(T){var P=oSpP.endpointWorkaround(T);var O=T.getKey?T.getKey("p256dh"):"";var R=O?btoa(String.fromCharCode.apply(null,new Uint8Array(O))):"";var Q=T.getKey?T.getKey("auth"):"";var S=Q?btoa(String.fromCharCode.apply(null,new Uint8Array(Q))):"";oSpP.checkLocalSubsctoption(P,R,S);if(v){oSpP.sendToParent(P)}})});break;case"safari":var M=window.safari.pushNotification.permission(J);if(M.permission==="granted"){var L=M.deviceToken;oSpP.checkLocalSubsctoption(L);if(v){oSpP.sendToParent(L)}}break}};this.checkLocalSubsctoption=function(M,N,L){oSpP.log("[DD] subscribe :: subscriptionId: "+M);oSpP.getDbValue("SPIDs","SubscriptionId",function(O){if(O.target.result===undefined){oSpP.sendSubscribeDataToServer(M,"subscribe",undefined,N,L);oSpP.putValueToDb("SPIDs",{type:"SubscriptionId",value:M})}else{if(O.target.result.value!==M){oSpP.sendSubscribeDataToServer(O.target.result.value,"unsubscribe");oSpP.sendSubscribeDataToServer(M,"subscribe",undefined,N,L);oSpP.putValueToDb("SPIDs",{type:"SubscriptionId",value:M})}}})};this.unsubscribe=function(){switch(a){case"chrome":case"firefox":case"opera":navigator.serviceWorker.ready.then(function(N){N.pushManager.getSubscription().then(function(P){var O=oSpP.endpointWorkaround(P);if(!P){return}P.unsubscribe().then(function(Q){})})});break;case"safari":var M=window.safari.pushNotification.permission(safariPushId);if(M.permission==="granted"){var L=M.deviceToken}break}};this.getUserVariables=function(){var M={};var L=document.querySelectorAll("input.sp_push_custom_data");for(var N=0;N<L.length;N++){switch(L[N].type){case"text":case"hidden":M[L[N].name]=L[N].value;break;case"checkbox":M[L[N].name]=(L[N].checked)?1:0;break;case"radio":if(L[N].checked){M[L[N].name]=L[N].value}break}}return M};this.sendSubscribeDataToServer=function(T,R,S,L,M){var Q=new XMLHttpRequest();if((v)&&(R=="subscribe")){Q.onreadystatechange=function(){if((Q.readyState==4)&&(Q.status==200)){E=true}}}Q.open("POST",n,true);Q.setRequestHeader("Content-Type","application/json");if(S===undefined){S={};S.uname=oSpP.checkCookie("lgn");S.os=oSpP.detectOs()}if(L===undefined){L=""}if(v){S.variables=s}else{S.variables=oSpP.getUserVariables()}var U=new Date();var P=-U.getTimezoneOffset()/60;S.timezoneoffset=P;var O=(G)?G:window.location.href;var N={action:"subscription",subscriptionId:T,subscription_action:R,appkey:i,browser:z,lang:oSpP.getBrowserlanguage(),url:O,sPubKey:L,sAuthKey:M,custom_data:S};Q.send(JSON.stringify(N))};this.initDb=function(N){if(A){return void N()}var M=window.indexedDB||window.mozIndexedDB||window.webkitIndexedDB||window.msIndexedDB;var L=M.open("sendpulse_push_db",2);L.onsuccess=function(O){A=O.target.result;N()};L.onupgradeneeded=function(O){var P=O.target.result;P.createObjectStore("SPIDs",{keyPath:"type"})}};this.getDbValue=function(L,M,N){oSpP.initDb(function(){A.transaction([L],"readonly").objectStore(L).get(M).onsuccess=N})};this.putValueToDb=function(L,M){oSpP.initDb(function(){A.transaction([L],"readwrite").objectStore(L).put(M)})};this.deleteDbValue=function(L,M){oSpP.initDb(function(){A.transaction([L],"readwrite").objectStore(L)["delete"](M)})};this.uns=function(){oSpP.deleteDbValue("SPIDs","SubscriptionId")};this.detectOs=function(){var L="";if(navigator.userAgent.indexOf("Windows")!=-1){return("Windows")}if(navigator.userAgent.indexOf("Android")!=-1){return("Android")}if(navigator.userAgent.indexOf("Linux")!=-1){return("Linux")}if(navigator.userAgent.indexOf("iPhone")!=-1){return("iOS")}if(navigator.userAgent.indexOf("iPad")!=-1){return("iOS")}if(navigator.userAgent.indexOf("Mac")!=-1){return("Mac OS")}if(navigator.userAgent.indexOf("FreeBSD")!=-1){return("FreeBSD")}return""};this.sendToParent=function(M){if(q===null){var L=setInterval(function(){if(q!==null){q.source.postMessage(M,q.origin);clearInterval(L)}},100)}else{q.source.postMessage(M,q.origin)}};this.push=function(L,M){if(!oSpP.detectSite()){oSpP.log("Application allowed only for "+K);return false}c[L]=M;oSpP.getDbValue("SPIDs","SubscriptionId",function(N){if(N.target.result===undefined){if(!h){h=setInterval(function(){oSpP.getDbValue("SPIDs","SubscriptionId",function(O){if(O.target.result!==undefined){oSpP.sendUpdatesToServer(O.target.result.value);clearInterval(h);h=false}})},1000)}}else{oSpP.sendUpdatesToServer(N.target.result.value)}})};this.sendUpdatesToServer=function(L){var N=new XMLHttpRequest();N.open("POST",n,true);N.setRequestHeader("Content-Type","application/json");var M={action:"subscription",subscriptionId:L,subscription_action:"update_variables",appkey:i,custom_data:{variables:c}};N.send(JSON.stringify(M))};this.sendPromptStat=function(L){};this.showhelpPromptText=function(){if(D.length>=0){var O=document.getElementsByTagName("head")[0];var N=document.createElement("link");N.rel="stylesheet";N.type="text/css";N.href="https://cdn.sendpulse.com/css/push/sendpulse-prompt.min.css";N.media="all";O.appendChild(N);if(D=="-"){return}var P=document.createElement("div");P.setAttribute("class","sendpulse-backdrop-info");P.setAttribute("style","display:none;");var M=document.createElement("div");M.setAttribute("class","backdrop-close");M.innerHTML+="<big>Ã—</big><br><small>ESC</small>";M.setAttribute("onclick","oSpP.closePromptHelpText(false); return false;");P.appendChild(M);var L=document.createElement("div");L.setAttribute("class","backdrop-message");L.innerHTML+=D;P.appendChild(L);document.body.insertBefore(P,document.body.childNodes[0]);setTimeout(function(){oSpP.getDbValue("SPIDs","PromptClosed",function(Q){if(Q.target.result===undefined){P.className+=P.className?" show-prompt":"show-prompt"}})},1000)}};this.showCustomPrompt=function(){oSpP.getDbValue("SPIDs","PromptShowed",function(ah){if(ah.target.result===undefined){oSpP.sendPromptStat("prompt_showed");oSpP.putValueToDb("SPIDs",{type:"PromptShowed",value:1})}else{oSpP.sendPromptStat("prompt_showed_again")}});var S=document.getElementsByTagName("head")[0];var P=document.createElement("link");P.rel="stylesheet";P.type="text/css";P.href="https://cdn.sendpulse.com/css/push/sendpulse-prompt.min.css";P.media="all";S.appendChild(P);var aa;var W="sendpulse-popover";var ac="display:none;";var T=true;if(typeof d!="undefined"){if(d==0){T=false}}var Q=oSpP.getMessageLang(oSpP.getBrowserlanguage());if(y.length>0){var Z='<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAk1BMVEUNkaAmtrIltLEMj58Mj58mtrIks7EfrK0MkKD///8Pk6EmtrIisK8cp6oTmaQRlqIZoqkVnKaz4OL7/v7t+PhjvsT4/P3l9vbY8PDM6uy74+Ww3uGc2dt3ysx1xMoyrLLx+fro9vat4+Kj2t2NztOB0dF/yc5myMhevsNMwL8/u7pMsLlDr7cyuLY9sbY7p7IkpazkILODAAAABnRSTlPn5ubmSkmZnvKZAAAAiElEQVQI10XHVRbCQBBE0SJGeoCxuONu+18dpDPn5P7UK4SL1WwRwovYnl7jeIgmBd14sWZ3ogsHlqwjOnG4b8uknf6G7dqi5oAevelalXo4ZBqaiIYu+Vr622oYY9K+qcwzy865NZBS2iY9ypGREkqpPqGHciCE+FAuhQPEsUjr2AECP575wQ+doQxkp1hUBQAAAABJRU5ErkJggg==">';var O='<svg style="display: none;"><symbol id="sp_bell_icon"><path d="M139.165 51.42L103.39 15.558C43.412 61.202 3.74 132.185 0 212.402h50.174c3.742-66.41 37.877-124.636 88.99-160.98zM474.98 212.403h50.173c-3.742-80.217-43.413-151.2-103.586-196.845L385.704 51.42c51.398 36.346 85.533 94.572 89.275 160.982zm-49.388 12.582c0-77-53.39-141.463-125.424-158.487v-17.09c0-20.786-16.76-37.613-37.592-37.613s-37.592 16.827-37.592 37.614v17.09C152.95 83.52 99.56 148.004 99.56 224.983v137.918L49.408 413.01v25.076h426.336V413.01l-50.152-50.108V224.984zM262.576 513.358c3.523 0 6.76-.22 10.065-1.007 16.237-3.237 29.825-14.528 36.06-29.626 2.517-5.952 4.05-12.494 4.05-19.54H212.4c0 27.593 22.582 50.174 50.174 50.174z" /></symbol></svg>';aa=JSON.parse(y);W=aa.style;var R=document.createElement("div");R.setAttribute("class","sendpulse-prompt "+W);if(aa.backgroundcolor.length>0){ac=ac+"background-color: "+aa.backgroundcolor+";"}R.setAttribute("style",ac);var af=document.createElement("div");af.setAttribute("class","sendpulse-prompt-message");var ae=document.createElement("img");ae.setAttribute("class","sendpulse-bell-icon");ae.setAttribute("width","14");ae.setAttribute("height","14");ae.setAttribute("src","https://cdn.sendpulse.com/img/push/icon-ring.svg");if(T){var Y=document.createElement("span");Y.setAttribute("class","sp-link-wrapper");var ab=document.createElement("a");ab.setAttribute("class","sp-link");ab.setAttribute("href","https://"+C+"/webpush");ab.setAttribute("target","_blank");var U=document.createElement("span");U.innerHTML=F[Q];if(W!="sendpulse-bar"){ab.innerHTML=Z}ab.appendChild(U);Y.appendChild(ab)}if(W=="sendpulse-bar"){var V=document.createElement("div");V.setAttribute("class","sendpulse-prompt-info sendpulse-prompt-message-text");V.setAttribute("style","color: "+aa.textcolor+" !important;");V.innerHTML+=e;var X=document.createElement("span");af.innerHTML+=O+'<svg viewBox="0 0 525.153 525.153" width="40" height="40" xmlns:xlink="http://www.w3.org/1999/xlink" class="sendpulse-bell-icon"><use class="sendpulse-bell-path" style="fill: '+aa.textcolor+' !important;" xlink:href="#sp_bell_icon" x="0" y="0" />  </svg>'}else{if(W=="sendpulse-fab"){var V=document.createElement("div");V.setAttribute("class","sendpulse-prompt-title sendpulse-prompt-message-text");if(aa.textcolor.length>0){V.setAttribute("style","color: "+aa.textcolor+" !important;")}V.innerHTML=m;var X=document.createElement("div");X.setAttribute("class","sendpulse-prompt-info sendpulse-prompt-message-text");if(aa.textcolor.length>0){X.setAttribute("style","color: "+aa.textcolor+" !important;")}X.innerHTML+=e;var ad=document.createElement("div");ad.setAttribute("class","sendpulse-prompt-fab sp_notify_prompt");ad.setAttribute("onclick","oSpP.startSubscription(); return false;");if(aa.btncolor.length>0){ad.setAttribute("style","background-color: "+aa.btncolor+" !important;")}ad.innerHTML+=O+'<svg viewBox="0 0 525.153 525.153" width="40" height="40" xmlns:xlink="http://www.w3.org/1999/xlink" class="sendpulse-bell-icon" ><use class="sendpulse-bell-path bell-prompt-fab" style="fill: '+aa.iconcolor+' !important;" xlink:href="#sp_bell_icon" x="0" y="0" /></svg>'}}if(W=="sendpulse-bar"){var L=document.createElement("div");L.setAttribute("class","sendpulse-prompt-buttons");var ag=document.createElement("button");ag.setAttribute("class","sendpulse-prompt-btn sendpulse-accept-btn sp_notify_prompt");ag.setAttribute("type","button");ag.setAttribute("onclick","oSpP.startSubscription();oSpP.closeCustomPrompt(false); return false;");var N=document.createElement("button");N.setAttribute("class","sendpulse-prompt-btn sendpulse-disallow-btn");N.setAttribute("type","button");N.setAttribute("onclick","oSpP.sendPromptStat('prompt_denied');oSpP.closeCustomPrompt(true); return false;");ag.innerHTML=aa.allowbtntext;N.innerHTML=aa.disallowbtntext;ag.setAttribute("style","background-color:"+aa.buttoncolor+" !important;border-color:"+aa.buttoncolor+" !important;");N.setAttribute("style","color:"+aa.buttoncolor+" !important;");L.appendChild(N);L.appendChild(ag)}af.appendChild(V);af.appendChild(X);if(W!="sendpulse-fab"){af.appendChild(L);if(T&&typeof Y!="undefined"){R.appendChild(Y)}R.appendChild(af)}else{if(T&&typeof Y!="undefined"){af.appendChild(Y)}R.appendChild(af);R.appendChild(ad)}if(W=="sendpulse-bar"){var M=document.createElement("button");M.setAttribute("class","sendpulse-prompt-close");M.setAttribute("onclick","oSpP.closeCustomPrompt(false); return false;");M.setAttribute("style","color:"+aa.textcolor+" !important;");M.innerHTML="&times;";R.appendChild(M)}document.body.insertBefore(R,document.body.childNodes[0]);setTimeout(function(){R.className+=R.className?" show-prompt":"show-prompt"},1000)}};this.closeCustomPrompt=function(L){oSpP.sendPromptStat("prompt_closed");if(document.querySelector(".sendpulse-prompt")!==null){document.body.removeChild(document.querySelector(".sendpulse-prompt"))}if(L){oSpP.putValueToDb("SPIDs",{type:"PromptClosed",value:1})}};this.closePromptHelpText=function(L){if(document.querySelector(".sendpulse-backdrop-info")!==null){document.body.removeChild(document.querySelector(".sendpulse-backdrop-info"))}if(L){oSpP.sendPromptStat("prompt_closed");oSpP.putValueToDb("SPIDs",{type:"PromptClosed",value:1})}};this.getMessageLang=function(L){L=L.substring(0,2).toLowerCase();if(L=="ua"||L=="uk"){return"ua"}else{if(L=="ru"){return"ru"}else{return"en"}}};this.getPromptDelay=function(){return parseInt(u)};this.startDelayedSubscription=function(M){if((parseInt(u))>0){var L=setInterval(function(){oSpP.getDbValue("SPIDs","PromptDelay",function(N){if(N.target.result!==undefined){if((new Date().getTime())>=N.target.result.value){clearInterval(L);M()}}else{M()}})},1000)}else{M()}};this.getAuthEmailFromUrl=function(){var N=window.location.href;var M="spush";var P=new RegExp("[?&]"+M+"(=([^&#]*)|&|#|$)"),O=P.exec(N);if(!O){return}if(!O[2]){return}var L=atob(decodeURIComponent(O[2].replace(/\+/g," ")));if(typeof L!="undefined"&&L.length>0){oSpP.push("email",L)}}}window.addEventListener("load",function(){if(oSpP.getPromptDelay()>0){oSpP.getDbValue("SPIDs","PromptDelay",function(a){if(a.target.result===undefined){oSpP.putValueToDb("SPIDs",{type:"PromptDelay",value:(new Date().getTime())+oSpP.getPromptDelay()*1000});oSpP.start()}else{oSpP.start()}})}else{oSpP.start()}oSpP.getAuthEmailFromUrl()});var oSpP=new oSendpulsePush();document.onkeyup=function(a){a=a||window.event;if(a.keyCode===27){oSpP.closePromptHelpText(false)}};