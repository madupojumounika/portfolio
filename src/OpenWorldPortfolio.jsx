import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Html, PointerLockControls, Sky, Stars } from "@react-three/drei";
import * as THREE from "three";
import { ArrowDown, ArrowUpRight, Compass, Github, Linkedin, Mail, Map, Maximize2, MousePointer2, Pause, Play, Volume2, VolumeX, X } from "lucide-react";

const destinations = [
  { id:"about", number:"01", name:"The Origin", type:"ABOUT", position:[-17,0,-13], color:"#8fc7a1", title:"The person behind the journey", intro:"A curious mind, always becoming.", body:"I'm Mounika Madupoju, a computer science student at Bharat Institute of Engineering & Technology, Hyderabad. I enjoy turning ideas into useful digital experiences and learning by building.", facts:["B.Tech CSE (AI & ML) · Expected 2028","CGPA 8.8 / 10","Interested in frontend and full-stack software development"], symbol:"✦" },
  { id:"skills", number:"02", name:"The Archive", type:"SKILLS", position:[18,0,-17], color:"#8db9ed", title:"Tools of creation", intro:"Every skill opens another door.", body:"My toolkit is growing through coursework, consistent practice and hands-on projects. I focus on understanding how polished interfaces connect to reliable applications.", facts:["HTML · CSS · JavaScript","Java · C · Python basics","React · Node.js · Express · MongoDB (project experience)"], symbol:"⌘" },
  { id:"projects", number:"03", name:"Project District", type:"PROJECTS", position:[20,0,19], color:"#c2a4ec", title:"Things I've brought to life", intro:"Ideas made tangible through code.", body:"Each project is a chance to explore a real problem, make thoughtful product decisions and build something people can interact with.", projects:[["PayPilot","AI-assisted purchasing with research, budget guardrails and human approval.","https://github.com/madupojumounika/paypilot"],["MedLink","Emergency referral coordination concept.","https://github.com/madupojumounika/medlink"],["Code Mentor","Coding interview coach and learning tracker.","https://github.com/madupojumounika/code-mentor"],["CareerX","Community sharing internships, hackathons and opportunities.","https://github.com/madupojumounika/careerx"]],symbol:"⌂" },
  { id:"journey", number:"04", name:"Milestone Ridge", type:"JOURNEY", position:[-19,0,21], color:"#e8c18c", title:"One step at a time", intro:"The path is still unfolding.", body:"I'm at the beginning of my professional journey. Every project, collaboration and learning opportunity helps me become a better engineer.", facts:["BIET Smart India Hackathon internal round — Top 45","TCS iON Career Edge","JPMorgan Chase Software Engineering simulation on Forage","Campus ambassador and student community initiatives"],symbol:"↟" },
  { id:"contact", number:"05", name:"The Beacon", type:"CONTACT", position:[0,0,-34], color:"#e9a9c4", title:"The next chapter is unwritten", intro:"Maybe we can build something together.", body:"I'm open to connecting with developers, teams and people building useful things. If you have an opportunity, project or idea, I'd love to hear from you.", facts:["Internship and entry-level software opportunities","Frontend and full-stack projects","Learning and collaboration"],symbol:"◎" }
];

const treePositions = Array.from({length:130},(_,i)=> {
  const angle=i*2.39996, radius=27+(i%7)*2.8;
  const x=Math.cos(angle)*radius, z=Math.sin(angle)*radius;
  const nearRoad=Math.abs(x)<5 || Math.abs(z)<5;
  return [x+(nearRoad?Math.sign(x)*7:0),0,z+(nearRoad?Math.sign(z)*7:0)];
}).filter(([x,z])=>Math.hypot(x,z)>9 && destinations.every(d=>Math.hypot(x-d.position[0],z-d.position[2])>8));

function Terrain(){
 const geometry=useMemo(()=>{
  const g=new THREE.PlaneGeometry(180,180,120,120);g.rotateX(-Math.PI/2);
  const p=g.attributes.position;
  for(let i=0;i<p.count;i++){const x=p.getX(i),z=p.getZ(i);const hills=Math.sin(x*.075)*Math.cos(z*.06)*1.15+Math.sin((x+z)*.035)*.9;p.setY(i,hills);}
  g.computeVertexNormals();return g;
 },[]);
 return <mesh geometry={geometry} receiveShadow><meshStandardMaterial color="#435d45" roughness={1}/></mesh>;
}
function Pine({position,scale=1}){
 return <group position={position} scale={scale} castShadow>
  <mesh position={[0,.95,0]} castShadow><cylinderGeometry args={[.12,.2,1.9,8]}/><meshStandardMaterial color="#493b30" roughness={1}/></mesh>
  {[0,1,2,3].map(i=><mesh key={i} position={[0,1.25+i*.53,0]} castShadow><coneGeometry args={[1.05-i*.17,1.65,9]}/><meshStandardMaterial color={["#244a39","#2c5941","#376448","#416e4e"][i]} roughness={1}/></mesh>)}
 </group>;
}
function Forest(){
 return <group>{treePositions.map((p,i)=><Pine key={i} position={p} scale={.7+(i%5)*.13}/>)}</group>;
}
function Path({points,width=2.7}){
 const curve=useMemo(()=>new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p))),[points]);
 const geo=useMemo(()=>new THREE.TubeGeometry(curve,100,width/2,8,false),[curve,width]);
 return <mesh geometry={geo} position={[0,.035,0]} receiveShadow><meshStandardMaterial color="#8c806b" roughness={1}/></mesh>;
}
function Landmark({item,onSelect}){
 const [x,_,z]=item.position;
 return <group position={[x,0,z]}>
  <mesh position={[0,.12,0]} receiveShadow><cylinderGeometry args={[4.8,5.5,.24,48]}/><meshStandardMaterial color="#657365" roughness={.9}/></mesh>
  <mesh position={[0,2.1,0]} castShadow><cylinderGeometry args={[.2,.25,4.1,12]}/><meshStandardMaterial color="#c4a77c" metalness:.15} /></mesh>
  <mesh position={[0,4.25,0]} castShadow><torusGeometry args={[1.45,.12,12,48]}/><meshStandardMaterial color={item.color} emissive={item.color} emissiveIntensity={.7} metalness={.35}/></mesh>
  <mesh position={[0,4.25,0]}><sphereGeometry args={[.7,24,24]}/><meshBasicMaterial color={item.color} transparent opacity={.13}/></mesh>
  <mesh position={[0,.42,0]}><cylinderGeometry args={[2.4,3.2,.38,32]}/><meshStandardMaterial color="#343d3a" roughness={.8}/></mesh>
  <Html position={[0,5.2,0]} center distanceFactor={13}>
   <button className="ow-world-label" onClick={(e)=>{e.stopPropagation();onSelect(item.id)}}><small>{item.number} · {item.type}</small><b>{item.name}</b><span>INTERACT · E</span></button>
  </Html>
  <mesh position={[0,1.2,0]} onClick={()=>onSelect(item.id)}><cylinderGeometry args={[2.2,2.2,2.4,24]}/><meshBasicMaterial transparent opacity={0} depthWrite={false}/></mesh>
 </group>;
}
function WorldScene({onSelect,activeId,travelTarget,quality}){
 const controls=useRef(),keys=useRef({}),cameraStart=useRef(true);
 const {camera,gl}=useThree();
 useEffect(()=>{
  camera.position.set(0,2.1,9);
  const down=e=>{keys.current[e.code]=true;if(e.code==="KeyE"){const p=camera.position;let best=null,dist=Infinity;destinations.forEach(d=>{const n=Math.hypot(p.x-d.position[0],p.z-d.position[2]);if(n<dist){dist=n;best=d}});if(best&&dist<10)onSelect(best.id)}};
  const up=e=>{keys.current[e.code]=false};
  window.addEventListener("keydown",down);window.addEventListener("keyup",up);
  const blur=()=>{keys.current={}};window.addEventListener("blur",blur);
  return()=>{window.removeEventListener("keydown",down);window.removeEventListener("keyup",up);window.removeEventListener("blur",blur)};
 },[camera,onSelect]);
 useEffect(()=>{if(!travelTarget)return;const d=destinations.find(x=>x.id===travelTarget);if(!d)return;camera.position.set(d.position[0]+0.5,2.2,d.position[2]+8);camera.lookAt(d.position[0],2,d.position[2]);cameraStart.current=false},[travelTarget,camera]);
 useFrame((_,dt)=>{
  if(!controls.current?.isLocked)return;
  const k=keys.current,forward=(k.KeyW||k.ArrowUp?1:0)-(k.KeyS||k.ArrowDown?1:0),side=(k.KeyD||k.ArrowRight?1:0)-(k.KeyA||k.ArrowLeft?1:0);
  if(!forward&&!side)return;
  const dir=new THREE.Vector3();camera.getWorldDirection(dir);dir.y=0;dir.normalize();
  const right=new THREE.Vector3().crossVectors(dir,camera.up).normalize();
  const move=dir.multiplyScalar(forward).add(right.multiplyScalar(side));
  if(move.lengthSq()>0){move.normalize().multiplyScalar(dt*(k.ShiftLeft?9:5));camera.position.add(move);camera.position.x=THREE.MathUtils.clamp(camera.position.x,-77,77);camera.position.z=THREE.MathUtils.clamp(camera.position.z,-77,77);camera.position.y=2.1}
 });
 return <>
  <color attach="background" args={["#9cb5c2"]}/><fog attach="fog" args={["#9cb5c2",48,135]}/>
  <Sky distance={450000} sunPosition={[30,38,-60]} inclination={.48} azimuth={.22} rayleigh={2.5} turbidity={7} mieCoefficient={.004} mieDirectionalG={.8}/>
  <ambientLight intensity={quality==="high"?.62:.85}/>
  <directionalLight position={[-35,55,-20]} intensity={quality==="high"?2.1:1.35} castShadow shadow-mapSize-width={quality==="high"?2048:1024} shadow-mapSize-height={quality==="high"?2048:1024} shadow-camera-far={150} shadow-camera-left={-70} shadow-camera-right={70} shadow-camera-top={70} shadow-camera-bottom={-70}/>
  <hemisphereLight args={["#c6e5ff","#384c37",.7]}/>
  <Terrain/><Forest/>
  <Path points={[[0,.2,12],[0,.2,4],[3,.2,-3],[0,.2,-12],[-8,.2,-19],[-15,.2,-25]]}/>
  <Path points={[[0,.2,4],[9,.2,8],[18,.2,13],[20,.2,19]]}/>
  <Path points={[[0,.2,4],[-9,.2,8],[-17,.2,14],[-19,.2,21]]}/>
  <Path points={[[0,.2,-12],[8,.2,-15],[18,.2,-17]]}/>
  {destinations.map(d=><Landmark key={d.id} item={d} onSelect={onSelect}/>)}
  {quality!=="low"&&<Stars radius={160} depth={60} count={quality==="high"?1800:600} factor={2} fade speed={.1}/>}
  <Environment preset="forest"/>
  <PointerLockControls ref={controls} selector="#ow-start" />
 </>;
}
function DetailPanel({item,onClose}){
 if(!item)return null;
 return <aside className="ow-detail">
  <button className="ow-close" onClick={onClose}><X size={17}/></button>
  <span className="ow-kicker">{item.number} / {item.type} DESTINATION</span>
  <h2>{item.title}</h2><h3>{item.intro}</h3><p>{item.body}</p>
  {item.facts&&<ul>{item.facts.map(f=><li key={f}>{f}</li>)}</ul>}
  {item.projects&&<div className="ow-projects">{item.projects.map(([n,d,u])=><a href={u} key={n} target="_blank" rel="noreferrer"><b>{n}</b><small>{d}</small><ArrowUpRight size={15}/></a>)}</div>}
  {item.id==="contact"&&<div className="ow-contact"><a href="mailto:madupojumounika0@gmail.com"><Mail size={15}/> Email</a><a href="https://linkedin.com/in/mounikamadupoju" target="_blank" rel="noreferrer"><Linkedin size={15}/> LinkedIn</a><a href="https://github.com/madupojumounika" target="_blank" rel="noreferrer"><Github size={15}/> GitHub</a></div>}
  <div className="ow-panel-foot">DISCOVERED DESTINATION <span>✦</span></div>
 </aside>;
}
function WorldMap({onTravel,onClose}){
 return <div className="ow-map-backdrop" onClick={onClose}><section className="ow-map" onClick={e=>e.stopPropagation()}><div className="ow-map-head"><div><span>WORLD ATLAS</span><h2>Choose your destination</h2></div><button onClick={onClose}><X/></button></div><div className="ow-map-grid">{destinations.map(d=><button key={d.id} onClick={()=>{onTravel(d.id);onClose()}}><i style={{background:d.color}}>{d.number}</i><span><b>{d.name}</b><small>{d.type}</small></span><ArrowUpRight size={16}/></button>)}</div><p>Travel instantly or explore the paths on foot.</p></section></div>;
}
function OpenWorldCanvas({onSelect,travelTarget,quality}){return <Canvas shadows dpr={quality==="high"?[1,1.75]:[1,1.25]} camera={{position:[0,2.1,9],fov:68,near:.1,far:220}} gl={{antialias:quality!=="low",powerPreference:"high-performance"}}><Suspense fallback={null}><WorldScene onSelect={onSelect} travelTarget={travelTarget} quality={quality}/></Suspense></Canvas>}

export default function OpenWorldPortfolio(){
 const [selected,setSelected]=useState(null),[showMap,setShowMap]=useState(false),[travelTarget,setTravelTarget]=useState(null),[quality,setQuality]=useState("balanced"),[started,setStarted]=useState(false),[paused,setPaused]=useState(false),[sound,setSound]=useState(false),[visited,setVisited]=useState([]);
 const active=destinations.find(d=>d.id===selected);
 const select=id=>{setSelected(id);setVisited(v=>v.includes(id)?v:[...v,id])};
 const travel=id=>{setSelected(null);setTravelTarget(id);select(id)};
 useEffect(()=>{const esc=e=>{if(e.key==="Escape"){setSelected(null);setShowMap(false);setPaused(false)}};window.addEventListener("keydown",esc);return()=>window.removeEventListener("keydown",esc)},[]);
 return <main className="open-world">
  <div className="ow-canvas"><OpenWorldCanvas onSelect={select} travelTarget={travelTarget} quality={quality}/></div>
  <div className="ow-vignette"/>
  <header className="ow-header"><a className="ow-brand" href="#top">MM<span>✦</span><i>MOUNIKA MADUPOJU / DIGITAL WORLD</i></a><nav><button onClick={()=>setShowMap(true)}><Map size={15}/> WORLD MAP</button><a href="https://github.com/madupojumounika" target="_blank" rel="noreferrer"><Github size={15}/> GITHUB</a><a href="https://linkedin.com/in/mounikamadupoju" target="_blank" rel="noreferrer"><Linkedin size={15}/> LINKEDIN</a><a href="mailto:madupojumounika0@gmail.com"><Mail size={15}/> CONTACT</a></nav></header>
  {!started&&<div className="ow-intro"><span>AN INTERACTIVE 3D PORTFOLIO</span><h1>Explore my<br/><em>world.</em></h1><p>Five destinations. One journey. Walk through the places that tell my story, discover what I've built and see where I'm headed next.</p><button id="ow-start" onClick={()=>setStarted(true)}><Play size={15} fill="currentColor"/> ENTER THE WORLD <ArrowUpRight size={15}/></button><small><MousePointer2 size={13}/> CLICK ENTER, THEN MOVE WITH W A S D · MOUSE TO LOOK</small></div>}
  {started&&<div className="ow-hud"><div className="ow-location"><Compass size={15}/><span>OPEN WORLD <b>·</b> EXPLORE FREELY</span></div><div className="ow-controls"><span><kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> MOVE</span><span><MousePointer2 size={13}/> LOOK</span><span><kbd>E</kbd> INTERACT</span><button onClick={()=>setShowMap(true)}><Map size={14}/> MAP</button></div></div>}
  {started&&<div className="ow-discovery"><span>DISCOVERED</span><b>{visited.length.toString().padStart(2,"0")} <i>/ 05</i></b><div>{destinations.map(d=><i key={d.id} className={visited.includes(d.id)?"found":""} style={{"--dot":d.color}}/>)}</div></div>}
  {started&&<div className="ow-bottom-tools"><button onClick={()=>setShowMap(true)}><Map size={14}/> DESTINATIONS</button><label>GRAPHICS <select value={quality} onChange={e=>setQuality(e.target.value)}><option value="low">LOW</option><option value="balanced">BALANCED</option><option value="high">HIGH</option></select></label><button onClick={()=>setPaused(v=>!v)}>{paused?<Play size={14}/>:<Pause size={14}/>} {paused?"RESUME":"PAUSE"}</button></div>}
  {active&&<DetailPanel item={active} onClose={()=>setSelected(null)}/>}
  {showMap&&<WorldMap onTravel={travel} onClose={()=>setShowMap(false)}/>}
  {paused&&<div className="ow-pause"><span>PAUSED</span><h2>Take a breath.</h2><button onClick={()=>setPaused(false)}><Play size={15}/> RETURN TO THE WORLD</button></div>}
  <footer className="ow-footer"><span>BUILT WITH CURIOSITY · REACT + THREE.JS</span><span>{visited.length} / 5 DESTINATIONS DISCOVERED</span></footer>
 </main>;
}
