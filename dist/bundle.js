!function(e){var t={};function n(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(a,o,function(t){return e[t]}.bind(null,o));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/dist/",n(n.s=4)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=new(window.AudioContext||window.webkitAudioContext),n=t.createMediaElementSource(e),a=t.createAnalyser(),o=t.createGain();n.connect(o),n.connect(a),o.gain.value=.7,o.connect(t.destination);a.fftSize;var r=a.frequencyBinCount;return{analyser:a,bufferLength:r,dataArray:new Uint8Array(r),floatArray:new Uint8Array(r),gain:o}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.circle=function(e,t,n,a,o,r){return{x:e+n*Math.cos(a)*o,y:t+n*Math.sin(a)*o,xEnd:e+n*Math.cos(a)*(o+r),yEnd:t+n*Math.sin(a)*(o+r)}},t.barLength=function(e,t,n,a){return t<=.25*n?e[t]*a.gain.value*1:t>.25*n&&t<=.5*n?e[t]*a.gain.value*.8:t>.5*n&&t<=150?e[t]*a.gain.value*.6:e[t]*a.gain.value*.4},t.pokeball=function(e,t,n,a,o,r,i){return{x:e+n*Math.cos(a)*(o*r),y:t+n*Math.sin(a)*(o*r),xEnd:e+n*Math.cos(a)*(o*i),yEnd:t+n*Math.sin(a)*(o*i)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,n,a,o,r,i){i.strokeStyle=r,i.lineWidth=o,i.beginPath(),i.moveTo(e,t),i.lineTo(n,a),i.stroke(),i.closePath()}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.fadeOut=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=1,a=setInterval(function(){n<=0&&(clearInterval(a),e.style.visibility="hidden",t!==Object.keys(t).length>0&&setTimeout(t,100)),e.style.opacity=n,n-=.05},100)},t.fadeIn=function(e){var t=0,n=setInterval(function(){t>=1&&clearInterval(n),e.style.opacity=t,t+=.01},50)}},function(e,t,n){"use strict";var a=n(5),o=n(7),r=n(3);document.addEventListener("DOMContentLoaded",function(){(0,a.pokeWall)(),(0,o.steelBackground)();var e=document.getElementById("visualizer"),t=e.getContext("2d");e.width=window.innerWidth,e.height=window.innerHeight;var n=document.createElement("audio");n.src="audio/eightbitpoke.mp3";e.setAttribute("status","pause");e.getAttribute("status");var i=document.getElementsByTagName("div"),l=document.getElementsByTagName("p");i[0].style.display="flex",i[1].style.positon="absolute";var u=document.getElementById("pika"),d=l[0],s=document.getElementsByTagName("img")[1],c=document.getElementsByTagName("img")[0];c.style.position="absolute",c.style.left="40%",c.style.height="500px",s.style.position="absolute",s.style.left="38%",s.style.top="220px",s.style.height="300px",s.style.width="300px",d.style.position="absolute",d.style.fontFamily="Cute Font, cursive",d.style.top="60%",d.style.left="5%",d.style.fontSize="100px";var y=function(){return(0,a.pokeTheme)(200,e,t,100,n,8)};s.addEventListener("click",function(){e.setAttribute("status","play"),u.play(),(0,r.fadeOut)(d),(0,r.fadeOut)(c,y),(0,r.fadeOut)(s,y)})})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.pokeTheme=t.pokeWall=void 0;var a=l(n(0)),o=n(1),r=n(6),i=l(n(2));n(3);function l(e){return e&&e.__esModule?e:{default:e}}var u=["./images/pokewalk.png","./images/pokemon.png","./images/mudkip.jpg","./images/entei.jpg","./images/twins.jpg","./images/pan.png","./images/ditto.jpg"];t.pokeWall=function(){document.body.style.backgroundImage="url('"+u[0]+"')",document.body.style.backgroundRepeat="no-repeat",document.body.style.backgroundPosition="center",document.body.style.backgroundSize="cover",document.body.style.opacity=1},t.pokeTheme=function(e,t,n,l,d,s){var c=(0,a.default)(d),y=c.dataArray,f=c.floatArray,g=c.gain,p=c.analyser,b=0,v=0,m=void 0;!function a(){n.clearRect(0,0,t.width,t.height);var c=t.width/2,h=t.height/2;p.getByteFrequencyData(y),p.getByteTimeDomainData(f);var k=2*Math.PI/e;n.moveTo(0,0);for(var x=0,E=0;E<f.length;E++){var M=f[E]*g.gain.value;x+=Math.pow(M,2)}var w=x/f.length;(w=Math.sqrt(w)/(l*g.gain.value))>1.45?(0===v&&(m=Math.floor(Math.random()*u.length),document.body.style.backgroundImage="url('"+u[m]+"')"),(v+=.2)>10&&(v=0)):b+=.05;for(var _=0;_<e;_++){var O=.5*y[_],j=(0,o.barLength)(y,_,e,g),P=k*(_+b),A=P/2,T=(0,r.pokemonLineColors)(m,O,w),B=(0,r.pokeballLineColors)(O).black,C=(0,r.pokeballLineColors)(O).white,L=(0,r.pokeballLineColors)(O).red,S=(0,o.circle)(c,h,w,P,l,j),I=S.x,q=S.y,D=S.xEnd,F=S.yEnd,W=(0,o.pokeball)(c,h,w,P,l,.975,1),z=(0,o.pokeball)(c,h,w,A,l,.4,.95),N=(0,o.pokeball)(c,h,w,A,-l,.4,.95),R=(0,o.pokeball)(c,h,w,P,l,.4,.37),U=(0,o.pokeball)(c,h,w,P,l,.2,.19),G=(0,o.pokeball)(c,h,w,A,-l,.21,.37),H=(0,o.pokeball)(c,h,w,A,l,.21,.37),J=(0,o.pokeball)(c,h,w,P,l,.19,0);(0,i.default)(I,q,D,F,s,T,n),(0,i.default)(W.x,W.y,W.xEnd,W.yEnd,s,B,n),(0,i.default)(z.x,z.y,z.xEnd,z.yEnd,s,C,n),(0,i.default)(N.x,N.y,N.xEnd,N.yEnd,s,L,n),(0,i.default)(R.x,R.y,R.xEnd,R.yEnd,s,B,n),(0,i.default)(J.x,J.y,J.xEnd,J.yEnd,s,w>1.45?L:C,n),(0,i.default)(U.x,U.y,U.xEnd,U.yEnd,s,B,n),(0,i.default)(G.x,G.y,G.xEnd,G.yEnd,s,C,n),(0,i.default)(H.x,H.y,H.xEnd,H.yEnd,s,C,n)}window.requestAnimationFrame(a),d.play()}()}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.pokemonLineColors=function(e,t,n){return 5===e?"rgb("+(t-50+231)+", "+(t+50)+", "+(t+100)+")":4===e?"rgb("+(t+50)+", "+(t+130)+", "+(t+150)+")":3===e&&n>1.5?"rgb("+t/2+", "+(t+70)+", "+(t+200)+")":1===e?"rgb("+(t+40)+", "+(t+130)+", "+(t+160)+")":3===e?"rgb(255, "+(t+50)+", "+(t+50)+")":2===e&&n<1.4?"rgb(255, "+(t+180)+", "+(t/2+0)+")":"rgb(255, "+t+", "+t+")"},t.pokeballLineColors=function(e){return{black:"rgb(0, 0, 0)",white:"rgb(255, "+(255-.1*e)+", "+(255-.1*e)+")",red:"rgb(255, "+.5*e+", "+.5*e+")"}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.steelSeries=t.steelBackground=void 0;var a=i(n(0)),o=n(1),r=i(n(2));function i(e){return e&&e.__esModule?e:{default:e}}t.steelBackground=function(){document.body.style.backgroundColor="rgb(73, 63, 79)"},t.steelSeries=function(e,t,n,i,l,u){var d=(0,a.default)(l),s=d.dataArray,c=d.floatArray,y=d.gain,f=d.analyser,g=0;l.play(),function a(){n.clearRect(0,0,t.width,t.height);var l=t.width/2,d=t.height/2;f.getByteFrequencyData(s),f.getByteTimeDomainData(c);for(var p=2*Math.PI/e,b=0,v=0;v<c.length;v++){var m=c[v]*y.gain.value;b+=Math.pow(m,2)}var h=b/c.length;(h=Math.sqrt(h)/(i*y.gain.value))>1.45?g=0:g+=.05;for(var k=0;k<e;k++){var x=.5*s[k],E=(0,o.barLength)(s,k,e,y),M=p*(k+g),w=(0,o.circle)(l,d,h,M,i,E),_=w.x,O=w.y,j=w.xEnd,P=w.yEnd,A="rgb(255, 100, "+x+")";(0,r.default)(_,O,j,P,u,A,n)}window.requestAnimationFrame(a)}()}}]);
//# sourceMappingURL=bundle.js.map