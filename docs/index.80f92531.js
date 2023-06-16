var e=class{constructor(e,t){this.eventTarget=t||new EventTarget,this.value=e}setValue(e){this.value=e,this.eventTarget.dispatchEvent(new CustomEvent("change",{detail:{source:this}}))}},t=class{constructor(e={}){this.isFinished=e.isFinished||!1,this.cells=e.cells||[],this.runCount=e.runCount||0,this.currentCell=e.currentCell||[0,0]}finishParsing(){this.isFinished=!0}addNewlines(){let[,e]=this.currentCell,t=this.runCount||1;this.currentCell=[0,e+t],this.runCount=0}updateRunCount(e){this.runCount=10*this.runCount+e}drawRun(e){let[t,r]=this.currentCell,s=this.runCount||1,i=Array(s).fill(0).map((e,s)=>[t+s,r]);((e,t)=>{t&&(this.cells=this.cells.concat(e))})(i,e),this.currentCell=[t+s,r],this.runCount=0}},r=class{constructor(e,t){this.births=e,this.survivals=t}},s=class{constructor(e,t){this.births=e,this.survivals=t}};const i=e=>{let t=Array.from(e).reduce((e,t)=>{if(!e.success)return e;let{success:r,births:s,survivals:i,isBirth:n}=e;switch(t){case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":case"8":return(n?s:i).push(parseInt(t,10)),{success:r,births:s,survivals:i,isBirth:n};case"b":case"B":return{success:r,births:s,survivals:i,isBirth:!0};case"s":case"S":return{success:r,births:s,survivals:i,isBirth:!1};case"/":return{success:r,births:s,survivals:i,isBirth:!n};default:return{success:!1,births:[],survivals:[],isBirth:!1}}},{success:!0,births:[],survivals:[],isBirth:!1});if(!t.success)return;let r=[...new Set(t.births).keys()],i=[...new Set(t.survivals).keys()];return new s(r,i)},n=e=>{let t=e=>({isBirth:!0,births:e.births,survivals:e.survivals}),s=e=>({isBirth:!1,births:e.births,survivals:e.survivals}),i=e=>({isBirth:!e.isBirth,births:e.births,survivals:e.survivals}),n=[["0"],["1c","1e"],["2c","2e","2a","2k","2i","2n"],["3c","3e","3a","3k","3i","3n","3j","3q","3r","3y"],["4c","4e","4a","4k","4i","4n","4j","4q","4r","4y","4t","4w","4z"],["5c","5e","5a","5k","5i","5n","5j","5q","5r","5y"],["6c","6e","6a","6k","6i","6n"],["7c","7e"],["8"]],a=[new Map,new Map([["c","1c"],["e","1e"]]),new Map([["c","2c"],["e","2e"],["a","2a"],["k","2k"],["i","2i"],["n","2n"]]),new Map([["c","3c"],["e","3e"],["a","3a"],["k","3k"],["i","3i"],["n","3n"],["j","3j"],["q","3q"],["r","3r"],["y","3y"]]),new Map([["c","4c"],["e","4e"],["a","4a"],["k","4k"],["i","4i"],["n","4n"],["j","4j"],["q","4q"],["r","4r"],["y","4y"],["w","4w"],["t","4t"],["z","4z"]]),new Map([["c","5c"],["e","5e"],["a","5a"],["k","5k"],["i","5i"],["n","5n"],["j","5j"],["q","5q"],["r","5r"],["y","5y"]]),new Map([["c","6c"],["e","6e"],["a","6a"],["k","6k"],["i","6i"],["n","6n"]]),new Map([["c","7c"],["e","7e"]]),new Map],l=e=>{let t=new Set,r=parseInt(e[0],10),[s,...i]=e.slice(1).split("-");return""===s?n[r].forEach(e=>t.add(e)):Array.from(s).forEach(e=>t.add(a[r].get(e))),Array.from(i.join("")).forEach(e=>t.delete(a[r].get(e))),t},c={isBirth:!1,births:new Set,survivals:new Set},u=e.match(/[bBsS/]|[0-8][-cekainyqjrtwz]*/g);if(u.reduce((e,t)=>e+t.length,0)!==e.length)return;let o=u.reduce((e,r)=>{if("b"===r||"B"===r)return t(e);if("s"===r||"S"===r)return s(e);if("/"===r)return i(e);let n=l(r),a=e.isBirth?e.births:e.survivals;return n.forEach(e=>a.add(e)),e},c);return new r([...o.births],[...o.survivals])},a=new Map([[".",0],["A",1],["B",0],["C",1],["D",0],["E",1],["F",0],["b",0],["o",1]]),l=(e,t)=>{if(e.isFinished)return e;if("!"===t)return e.finishParsing(),e;if(t>="0"&&t<="9"){let r=t.charCodeAt(0)-48;return e.updateRunCount(r),e}if("$"===t)return e.addNewlines(),e;let r=a.get(t)||0;return e.drawRun(r),e},c=e=>{let r=[...e].reduce(l,new t);return r.finishParsing(),r.cells},u=e=>{let t=e.split("\n").map(e=>e.replace(/\s/g,"")).filter(e=>""!==e),r=t.findIndex(e=>!e.startsWith("#")),s=/^x=\d+,y=\d+,rule=(.*)/.exec(t[r]),i=t.slice(r+(null!==s?1:0)).join(""),n=s?s[1]:null;return{body:i,rule:n}},o=e=>{let{rule:t,body:r}=u(e),s=c(r),a=i(t)||n(t)||void 0;return{pattern:s,rule:a}};class h{constructor(e=1/0,t=-1/0,r=1/0,s=-1/0){this.xmin=e,this.xmax=t,this.ymin=r,this.ymax=s}plus(e){let t=Math.min(this.xmin,e.xmin),r=Math.max(this.xmax,e.xmax),s=Math.min(this.ymin,e.ymin),i=Math.max(this.ymax,e.ymax);return new h(t,r,s,i)}static sum(e){return e.reduce((e,t)=>e.plus(t),new h)}}const d=(e,t)=>`${e} ${t}`,p=e=>e.split(" ").map(e=>parseInt(e,10));class m{constructor(e=[]){this.map=new Map,e.forEach(([e,t],r)=>this.set([e,t],r))}static fromKeys(e){let t=new m;return e.forEach(([e,r])=>t.set([e,r],null)),t}static fromEntries(e){return new m(e)}has(e){let[t,r]=e;return this.map.has(d(t,r))}get(e,t){let[r,s]=e,i=this.map.get(d(r,s));return void 0!==i?i:t}set(e,t){let[r,s]=e;this.map.set(d(r,s),t)}get size(){return this.map.size}keys(){return[...this.map.keys()].map(p)}entries(){return[...this.map.entries()].map(([e,t])=>[p(e),t])}}const y=(e,t=1e3)=>{let r=(e,t)=>e.length===t.size&&e.every(e=>t.has(e)),s=Array(t).fill(),i={result:[],lastBoards:[e],initialCellsSet:m.fromKeys(e.getCells())},n=s.reduce(({result:e,lastBoards:t,initialCellsSet:s})=>{if(0!==e.length)return{result:e,lastBoards:t,initialCellsSet:s};let i=t[t.length-1],n=i.after();return r(n.getCells(),s)?{result:t,lastBoards:[],initialCellsSet:s}:{result:[],lastBoards:t.concat(n),initialCellsSet:s}},i).result;return n},g=e=>{let t=(e,t)=>{let r=new Set(e),s=Array(t).fill().map((e,t)=>t+1).filter(e=>t%e==0),i=s.filter(s=>e.map(e=>(e+s)%t).every(e=>r.has(e)));return Math.min(...i)},r=e.length,s=(e=>{let t=e.map(m.fromKeys),r=m.fromKeys([].concat(...e)).keys(),s=e.map((e,t)=>t);return r.map(e=>({cell:e,aliveGens:s.filter(r=>t[r].has(e))}))})(e.map(e=>e.getCells())).map(({cell:e,aliveGens:s})=>({cell:e,subperiod:t(s,r)}));return s},k=e=>{let t=e=>`${(100*e).toFixed(2)}%`,r=e=>e.filter(({subperiod:e})=>1!==e).length,s=(e,t)=>e.filter(({subperiod:e})=>e===t).length,i=y(e),n=i.length;if(0===n)return{success:!1,message:"Failed to detect period of pattern"};let a=i.map(e=>e.getPop()),l=g(i),c={success:!0,pattern:e.getCells(),period:n,phases:i.map(e=>e.getCells()),subperiods:l,minPop:Math.min(...a),maxPop:Math.max(...a),avgPop:(a.reduce((e,t)=>e+t,0)/a.length).toFixed(2),numCells:l.length,numRotorCells:r(l),numStatorCells:l.length-r(l),numStrictRotorCells:s(l,n),volatility:t(r(l)/l.length),strictVolatility:t(s(l,n)/l.length),boundingBox:h.sum(i.map(e=>e.getBox()))};return c};var v=class{constructor(e,t,r){this.pattern=e,this.rule=t,this.gen=r,this.transitionFunction=void 0}getCells(){return this.pattern}getCellsAndStates(){return this.pattern.map(e=>[e,1])}getBox(){return h.sum(this.pattern.map(([e,t])=>new h(e,e,t,t)))}getPop(){return this.pattern.length}after(e=1){let t=Array(e).fill(),r=this.transitionFunction,s=t.reduce(r,this.pattern),i=this.constructor;return new i(s,this.rule,this.gen+e)}};const f=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,0],[0,1],[1,-1],[1,0],[1,1]],w=(e,t)=>{let r=new m;return e.forEach(([e,s])=>{t.forEach(([t,i])=>{let n=[e+t,s+i],a=r.get(n)||0;r.set(n,a+1)})}),r},j=e=>t=>{let{births:r,survivals:s}=e,i=w(t,f),n=m.fromKeys(t);return[...i.entries()].filter(([e,t])=>n.has(e)?s.includes(t-1):r.includes(t)).map(([e])=>e)};var b=class extends v{constructor(e,t,r=0){super(e,t,r),this.transitionFunction=j(t)}};const C=`
    0 1c 1e 2a 1c 2c 2a 3i 1e 2a 2e 3a 2k 3n 3j 4a
    0 1c 1e 2a 1c 2c 2a 3i 1e 2a 2e 3a 2k 3n 3j 4a
    1e 2k 2e 3j 2a 3n 3a 4a 2i 3r 3e 4r 3r 4i 4r 5i
    1e 2k 2e 3j 2a 3n 3a 4a 2i 3r 3e 4r 3r 4i 4r 5i
    1c 2c 2k 3n 2n 3c 3q 4n 2a 3i 3j 4a 3q 4n 4w 5a
    1c 2c 2k 3n 2n 3c 3q 4n 2a 3i 3j 4a 3q 4n 4w 5a
    2k 3y 3k 4k 3q 4y 4q 5j 3r 4t 4j 5n 4z 5r 5q 6a
    2k 3y 3k 4k 3q 4y 4q 5j 3r 4t 4j 5n 4z 5r 5q 6a
    1e 2k 2i 3r 2k 3y 3r 4t 2e 3j 3e 4r 3k 4k 4j 5n
    1e 2k 2i 3r 2k 3y 3r 4t 2e 3j 3e 4r 3k 4k 4j 5n
    2e 3k 3e 4j 3j 4k 4r 5n 3e 4j 4e 5c 4j 5y 5c 6c
    2e 3k 3e 4j 3j 4k 4r 5n 3e 4j 4e 5c 4j 5y 5c 6c
    2a 3n 3r 4i 3q 4y 4z 5r 3a 4a 4r 5i 4q 5j 5q 6a
    2a 3n 3r 4i 3q 4y 4z 5r 3a 4a 4r 5i 4q 5j 5q 6a
    3j 4k 4j 5y 4w 5k 5q 6k 4r 5n 5c 6c 5q 6k 6n 7c
    3j 4k 4j 5y 4w 5k 5q 6k 4r 5n 5c 6c 5q 6k 6n 7c
    1c 2n 2k 3q 2c 3c 3n 4n 2k 3q 3k 4q 3y 4y 4k 5j
    1c 2n 2k 3q 2c 3c 3n 4n 2k 3q 3k 4q 3y 4y 4k 5j
    2a 3q 3j 4w 3i 4n 4a 5a 3r 4z 4j 5q 4t 5r 5n 6a
    2a 3q 3j 4w 3i 4n 4a 5a 3r 4z 4j 5q 4t 5r 5n 6a
    2c 3c 3y 4y 3c 4c 4y 5e 3n 4n 4k 5j 4y 5e 5k 6e
    2c 3c 3y 4y 3c 4c 4y 5e 3n 4n 4k 5j 4y 5e 5k 6e
    3n 4y 4k 5k 4n 5e 5j 6e 4i 5r 5y 6k 5r 6i 6k 7e
    3n 4y 4k 5k 4n 5e 5j 6e 4i 5r 5y 6k 5r 6i 6k 7e
    2a 3q 3r 4z 3n 4y 4i 5r 3j 4w 4j 5q 4k 5k 5y 6k
    2a 3q 3r 4z 3n 4y 4i 5r 3j 4w 4j 5q 4k 5k 5y 6k
    3a 4q 4r 5q 4a 5j 5i 6a 4r 5q 5c 6n 5n 6k 6c 7c
    3a 4q 4r 5q 4a 5j 5i 6a 4r 5q 5c 6n 5n 6k 6c 7c
    3i 4n 4t 5r 4n 5e 5r 6i 4a 5a 5n 6a 5j 6e 6k 7e
    3i 4n 4t 5r 4n 5e 5r 6i 4a 5a 5n 6a 5j 6e 6k 7e
    4a 5j 5n 6k 5a 6e 6a 7e 5i 6a 6c 7c 6a 7e 7c 8
    4a 5j 5n 6k 5a 6e 6a 7e 5i 6a 6c 7c 6a 7e 7c 8
  `.trim().split(/\s+/),q=new Map([[[-1,-1],1],[[-1,0],2],[[-1,1],4],[[0,-1],8],[[0,0],16],[[0,1],32],[[1,-1],64],[[1,0],128],[[1,1],256]]),x=e=>{let t=new m;return e.forEach(([e,r])=>{q.forEach((s,[i,n])=>{let a=[e-i,r-n],l=t.get(a)||0;t.set(a,l+s)})}),t},S=e=>t=>{let r=x(t),s=[...r.entries()].filter(([,t])=>{let r=(16&t)!=0?e.survivals:e.births;return r.includes(C[t])}).map(([e])=>e);return s};var B=class extends v{constructor(e,t,r=0){super(e,t,r),this.transitionFunction=S(t)}};const E=new s([3],[2,3]),M=(e,t=E)=>{if(t.constructor===s)return new b(e,t);if(t.constructor===r)return new B(e,t);throw Error("Invalid Rule!")};var R=class{constructor(e,t){this.targetState=e,this.sourceElement=t,this.update=e=>{if(!e.target){this.targetState.setValue({success:!1,message:"No event.target"});return}let t=this.sourceElement.value,{pattern:r,rule:s}=o(t);if(!s){this.targetState.setValue({success:!1,message:"Unable to parse rule"});return}let i=M(r,s);this.targetState.setValue(k(i))}}};const $={background:"#eeeeee",stator:"#000000",strictRotor:"#999999",liveCell:"#000000"},I={cell:10,border:1,liveCell:4,liveBorder:2},z=(e,t)=>`hsl(${Math.floor(360*(t/e))}, 100%, 70%)`,P=(e,t)=>{let r=new Set(t);r.delete(1),r.delete(e);let s=[...r.values()].sort((e,t)=>e-t),i=s.map((e,t)=>[e,z(s.length,t)]);return new Map([...i,[1,$.stator],[e,$.strictRotor]])},A=(e,t,r)=>{let{cell:s,border:i}=I,n=r.xmax-r.xmin+1,a=r.ymax-r.ymin+1;e.width=s*(n+2),e.height=s*(a+2),t.fillStyle=$.background,t.fillRect(0,0,e.width,e.height),t.fillStyle="white",Array(a+2).fill().forEach((r,n)=>{t.fillRect(0,s*n,e.width,i),t.fillRect(0,s*(n+1)-i,e.width,i)}),Array(n+2).fill().forEach((r,n)=>{t.fillRect(s*n,0,e.height,i),t.fillRect(s*(n+1)-i,0,i,e.height)})},F=(e,t,r,s)=>{e.fillStyle=s;let i=I.cell,n=I.border;e.fillRect(...[(t+1)*i+n,(r+1)*i+n,i-2*n,i-2*n])},V=new Map([["none",()=>{}],["border",(e,t,r)=>{e.fillStyle=$.liveCell;let{cell:s,border:i,liveBorder:n}=I,a=(t+1)*s+i,l=(t+2)*s-i-n,c=(r+1)*s+i,u=(r+2)*s-i-n,o=s-2*i;e.fillRect(a,c,o,n),e.fillRect(a,u,o,n),e.fillRect(a,c,n,o),e.fillRect(l,c,n,o)}],["interior",(e,t,r)=>{e.fillStyle=$.liveCell;let{cell:s,liveCell:i}=I,n=[(t+1)*s+.5*(s-i),(r+1)*s+.5*(s-i),i,i];e.fillRect(...n)}]]),T=e=>{let t=new Set(e.map(e=>e.subperiod)),r=[...t.values()].sort((e,t)=>e-t);return r};var K=class{constructor(e,t,r){this.oscData=e,this.cellStyle=t,this.targetCanvas=r,this.update=()=>{let e=this.targetCanvas.getContext("2d");if(!e)return;let{success:t,pattern:s,period:i,subperiods:n,boundingBox:a}=this.oscData.value,l=P(i,T(n));e.clearRect(0,0,r.width,r.height),t&&(A(r,e,a),n.forEach(({cell:[t,r],subperiod:s})=>{F(e,t-a.xmin,r-a.ymin,l.get(s))}),s.forEach(([t,r])=>{let s=V.get(this.cellStyle.value||"none");s(e,t-a.xmin,r-a.ymin)}))}}};const L={oscInfo:new e,initialCellStyle:new e};window.Cypress&&(window.appState=L);const D=document.getElementById("input-rle-submitter"),N=document.getElementById("cell-style-selector"),G=document.getElementById("input-rle-container"),H=new R(L.oscInfo,G),U=new class{constructor(e){this.targetState=e,this.update=e=>{e.target&&this.targetState.setValue(e.target.value)}}}(L.initialCellStyle);D.addEventListener("click",H.update),N.addEventListener("change",U.update);const W=document.getElementById("output-osc-canvas"),J=new K(L.oscInfo,L.initialCellStyle,W);L.oscInfo.eventTarget.addEventListener("change",J.update);const O=document.getElementById("output-osc-data"),Q=new class{constructor(e,t){this.sourceState=e,this.targetElement=t,this.update=()=>{let e=this.sourceState.value;e.success?this.targetElement.innerHTML=`
          <table>
            <thead>
              <tr>
                <th>Property</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr class="stripe-dark">
                <td>Period</td>
                <td>${e.period}</td>
              </tr>
              <tr class="stripe-dark">
                <td>Population</td>
                <td>Avg: ${e.avgPop}<br>Min: ${e.minPop}<br>Max: ${e.maxPop}</td>
              </tr>
              <tr class="stripe-dark">
                <td>Cells</td>
                <td>
                  Rotor: ${e.numRotorCells}<br>
                  Stator: ${e.numStatorCells}<br>
                  Total: ${e.numRotorCells+e.numStatorCells}
                </td>
              </tr>
              <tr class="stripe-dark">
                <td>Volatility</td>
                <td>${e.volatility}<br>(Strict: ${e.strictVolatility})</td>
              </tr>
              <tr class="stripe-dark">
                <td>Bounding Box</td>
                <td>
                  ${e.boundingBox.xmax-e.boundingBox.xmin+1}
                  x ${e.boundingBox.ymax-e.boundingBox.ymin+1}
                </td>
              </tr>
            </tbody>
          </table>
        `:this.targetElement.innerText=`Failure: ${e.message}`}}}(L.oscInfo,O);L.oscInfo.eventTarget.addEventListener("change",Q.update);
//# sourceMappingURL=index.80f92531.js.map
