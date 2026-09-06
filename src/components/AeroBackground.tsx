import React, { useEffect, useRef, useState } from 'react';

// Small native WebGL scene: no video downloads or external 3D engine.
const vertexSource = `
attribute vec3 aPosition;
attribute vec3 aNormal;
uniform mat4 uModel;
uniform vec2 uViewport;
varying vec3 vNormal;
varying vec3 vPosition;
void main() {
  vec4 world = uModel * vec4(aPosition, 1.0);
  vPosition = world.xyz;
  vNormal = normalize(mat3(uModel) * aNormal);
  gl_Position = vec4(world.x / (5.0 * uViewport.x / uViewport.y), world.y / 5.0, -world.z / 30.0, 1.0);
}`;
const fragmentSource = `
precision mediump float;
uniform vec3 uColor;
uniform float uLeaf;
varying vec3 vNormal;
varying vec3 vPosition;
void main() {
  vec3 n = normalize(vNormal);
  vec3 light = normalize(vec3(-0.45, 0.8, 1.0));
  float diffuse = max(dot(n, light), 0.0);
  float rim = pow(1.0 - abs(n.z), 2.5);
  float highlight = pow(max(dot(reflect(-light, n), vec3(0.0, 0.0, 1.0)), 0.0), 55.0);
  float glow = 0.5 + 0.5 * sin(vPosition.y * 1.8 + vPosition.x * 0.9);
  vec3 color = mix(uColor, vec3(0.93, 1.0, 1.0), 0.24 + 0.32 * diffuse);
  color = mix(color, vec3(0.38, 0.76, 0.83), rim * 0.45 * (1.0-uLeaf));
  color += highlight * 0.6 + glow * 0.035;
  float alpha = mix(0.13 + rim * 0.39 + highlight * 0.3, 0.5, uLeaf);
  gl_FragColor = vec4(color, alpha);
}`;
type Matrix = Float32Array;
function multiply(a: Matrix, b: Matrix): Matrix {
  const out = new Float32Array(16);
  for (let c=0;c<4;c++) for(let r=0;r<4;r++) for(let k=0;k<4;k++) out[c*4+r]+=a[k*4+r]*b[c*4+k];
  return out;
}
function transform(x:number,y:number,z:number,sx:number,sy:number,sz:number,rx=0,ry=0,rz=0): Matrix {
  const cx=Math.cos(rx), ax=Math.sin(rx), cy=Math.cos(ry), ay=Math.sin(ry), cz=Math.cos(rz), az=Math.sin(rz);
  const rotation = multiply(new Float32Array([cz,az,0,0,-az,cz,0,0,0,0,1,0,0,0,0,1]),multiply(new Float32Array([cy,0,-ay,0,0,1,0,0,ay,0,cy,0,0,0,0,1]),new Float32Array([1,0,0,0,0,cx,ax,0,0,-ax,cx,0,0,0,0,1])));
  for(let i=0;i<3;i++){ rotation[i]*=sx; rotation[4+i]*=sy; rotation[8+i]*=sz; }
  rotation[12]=x;rotation[13]=y;rotation[14]=z;
  return rotation;
}
function sphereGeometry(leaf=false) {
  const vertices:number[]=[], indices:number[]=[];
  const rows=20,cols=28;
  for(let i=0;i<=rows;i++) {
    const theta=i*Math.PI/rows, y=Math.cos(theta), radius=Math.sin(theta);
    for(let j=0;j<=cols;j++) {
      const phi=j*Math.PI*2/cols;
      const x=radius*Math.cos(phi),z=radius*Math.sin(phi);
      vertices.push(leaf?x*radius:x,y,leaf?z*.18+0.15*y*y:z,x,y,z);
    }
  }
  for(let i=0;i<rows;i++) for(let j=0;j<cols;j++) {
    const a=i*(cols+1)+j,b=a+cols+1;
    indices.push(a,b,a+1,b,b+1,a+1);
  }
  return {vertices:new Float32Array(vertices),indices:new Uint16Array(indices)};
}

export default function AeroBackground() {
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const pausedRef=useRef(false);
  const [paused,setPaused]=useState(false);
  const [available,setAvailable]=useState(false);
  useEffect(()=>{
    const canvas=canvasRef.current;
    if(!canvas) return;
    const gl=canvas.getContext('webgl',{alpha:true,antialias:true,powerPreference:'low-power',premultipliedAlpha:true});
    if(!gl) return; // The CSS atmosphere remains available without WebGL.
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
    let disposed=false, lost=false, frame=0, last=0, elapsed=0, width=1, height=1;
    let pointerX=0,pointerY=0,driftX=0,driftY=0,needsRender=true;
    const shaders:WebGLShader[]=[];
    function shader(type:number,source:string) {
      const result=gl!.createShader(type);
      if(!result) return null;
      gl!.shaderSource(result,source);gl!.compileShader(result);
      if(!gl!.getShaderParameter(result,gl!.COMPILE_STATUS)){gl!.deleteShader(result);return null;}
      shaders.push(result);return result;
    }
    const vertex=shader(gl.VERTEX_SHADER,vertexSource), fragment=shader(gl.FRAGMENT_SHADER,fragmentSource);
    const program=gl.createProgram();
    if(!vertex||!fragment||!program){shaders.forEach(s=>gl.deleteShader(s));if(program)gl.deleteProgram(program);return;}
    gl.attachShader(program,vertex);gl.attachShader(program,fragment);gl.linkProgram(program);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS)){shaders.forEach(s=>gl.deleteShader(s));gl.deleteProgram(program);return;}
    gl.useProgram(program);
    setAvailable(true);
    const position=gl.getAttribLocation(program,'aPosition'),normal=gl.getAttribLocation(program,'aNormal');
    const model=gl.getUniformLocation(program,'uModel'),viewport=gl.getUniformLocation(program,'uViewport'),color=gl.getUniformLocation(program,'uColor'),leafUniform=gl.getUniformLocation(program,'uLeaf');
    const buffers:WebGLBuffer[]=[];
    const meshes=[false,true].map(isLeaf=>{
      const geometry=sphereGeometry(isLeaf), vbo=gl.createBuffer(),ibo=gl.createBuffer();
      if(vbo)buffers.push(vbo);if(ibo)buffers.push(ibo);
      gl.bindBuffer(gl.ARRAY_BUFFER,vbo);gl.bufferData(gl.ARRAY_BUFFER,geometry.vertices,gl.STATIC_DRAW);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,ibo);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,geometry.indices,gl.STATIC_DRAW);
      return {vbo,ibo,count:geometry.indices.length};
    });
    gl.enable(gl.BLEND);gl.blendFuncSeparate(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA,gl.ONE,gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.CULL_FACE);gl.cullFace(gl.BACK);gl.frontFace(gl.CW);
    const resize=()=>{
      needsRender=true;
      width=window.innerWidth;height=window.innerHeight;
      // Full 3840×2160 output on 4K screens; cap supersampling and phone GPU load.
      const budget=width<700?1.5e6:3840*2160;
      const ratio=Math.min(window.devicePixelRatio||1,2,Math.sqrt(budget/(width*height)));
      canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);
      gl.viewport(0,0,canvas.width,canvas.height);
    };
    type Part={matrix:Matrix;color:number[];leaf:boolean};
    const render=(now:number)=>{
      if(disposed||lost)return;
      frame=requestAnimationFrame(render);
      if(document.hidden){last=now;return;}
      const still=reduced.matches||pausedRef.current;
      if(still&&!needsRender){last=now;return;}
      if(now-last<32)return;
      if(!still)elapsed+=Math.min((now-last)/1000,0.06);
      last=now;
      driftX+=(pointerX-driftX)*.035;driftY+=(pointerY-driftY)*.035;
      const t=elapsed;
      needsRender=false;
      const aspect=width/height,span=5*aspect;
      gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(viewport,width,height);
      const parts:Part[]=[];
      const add=(parent:Matrix,x:number,y:number,z:number,sx:number,sy:number,sz:number,shade:number[],rx=0,ry=0,rz=0,leaf=false)=>parts.push({matrix:multiply(parent,transform(x,y,z,sx,sy,sz,rx,ry,rz)),color:shade,leaf});
      const aqua=[.4,.82,.88],pearl=[.78,.93,.96],mint=[.45,.77,.55];
      const root=transform(still?0:driftX*.12,still?0:driftY*.08,0,1,1,1);
      // Airy glass droplets drift at different depths around the reading area.
      const bubbles=[[-.87,3.4,.52], [.89,3.0,.85],[-.76,-2.7,1.0],[.76,-3.5,.42],[-.30,4.6,.23],[.31,-.3,.28],[.97,-.1,.3]];
      bubbles.forEach(([x,y,size],i)=>add(root,x*span+Math.sin(t*.18+i)*.17,y+Math.sin(t*.23+i*2)*.23,-3+i*.2,size,size,size,i%2?aqua:pearl));
      // A jointed five-finger hand, with a slowly turning wrist and flexing fingers.
      const handScale=width<700?.53:.8;
      const hand=multiply(root,transform(span*(width<700?.65:-.13),(width<700?1.1:-1.1)+Math.sin(t*.25)*.23,0,handScale,handScale,handScale,.18,Math.sin(t*.17)*.3,-.35));
      add(hand,0,-1.25,0,.4,.62,.25,pearl);
      add(hand,0,-.35,0,.65,.8,.24,pearl);
      for(let finger=0;finger<4;finger++) {
        const x=(finger-1.5)*.34,length=[.58,.73,.67,.49][finger];
        const bend=.16+Math.sin(t*.34+finger*.3)*.09;
        const chain=multiply(hand,transform(x,.3,0,1,1,1,bend,0,-x*.2));
        add(chain,0,.08,0,.16,.16,.16,aqua);
        add(chain,0,length*.55+.14,0,.135,length*.55,.13,pearl);
        add(chain,0,length+.14,0,.145,.14,.145,aqua);
        add(chain,0,length*1.4+.16,.07,.12,length*.36,.12,pearl,-.2);
        add(chain,0,length*1.76+.15,.1,.13,.13,.13,aqua);
      }
      add(hand,-.72,-.4,.1,.2,.48,.18,pearl,0,0,-.7);
      add(hand,-1.02,-.05,.13,.17,.3,.16,aqua,0,0,-.35);
      // Pointed, gently curved glass leaves form a floating botanical sprig.
      const plant=multiply(root,transform(-span*.81,-2.1+Math.sin(t*.21)*.25,1,.85,.85,.85,.1,Math.sin(t*.2)*.3,.25));
      add(plant,0,-.35,0,.035,1.22,.035,mint,0,0,-.12);
      add(plant,-.31,-.22,0,.3,.65,.7,mint,.2,0,.75,true);
      add(plant,.29,.3,.05,.34,.72,.7,mint,-.1,.2,-.6,true);
      add(plant,-.11,.91,.02,.25,.57,.7,[.56,.84,.63],.2,0,.25,true);
      parts.sort((a,b)=>a.matrix[14]-b.matrix[14]);
      parts.forEach(part=>{
        const mesh=meshes[part.leaf?1:0];
        gl.bindBuffer(gl.ARRAY_BUFFER,mesh.vbo);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,mesh.ibo);
        gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,3,gl.FLOAT,false,24,0);
        gl.enableVertexAttribArray(normal);gl.vertexAttribPointer(normal,3,gl.FLOAT,false,24,12);
        gl.uniformMatrix4fv(model,false,part.matrix);gl.uniform3fv(color,part.color);gl.uniform1f(leafUniform,part.leaf?1:0);
        gl.drawElements(gl.TRIANGLES,mesh.count,gl.UNSIGNED_SHORT,0);
      });
    };
    const pointer=(event:PointerEvent)=>{pointerX=event.clientX/width-.5;pointerY=.5-event.clientY/height;};
    const contextLost=(event:Event)=>{event.preventDefault();lost=true;setAvailable(false);cancelAnimationFrame(frame);};
    resize();frame=requestAnimationFrame(render);
    window.addEventListener('resize',resize);window.addEventListener('pointermove',pointer,{passive:true});canvas.addEventListener('webglcontextlost',contextLost);
    return ()=>{disposed=true;cancelAnimationFrame(frame);window.removeEventListener('resize',resize);window.removeEventListener('pointermove',pointer);canvas.removeEventListener('webglcontextlost',contextLost);buffers.forEach(b=>gl.deleteBuffer(b));shaders.forEach(s=>gl.deleteShader(s));gl.deleteProgram(program);};
  },[]);
  return <>
    <canvas ref={canvasRef} className="aero-canvas" aria-hidden="true" />
    {available && <button className="motion-toggle" aria-pressed={paused} onClick={()=>{pausedRef.current=!paused;setPaused(!paused);}}>{paused?'Resume background':'Pause background'}</button>}
  </>;
}
