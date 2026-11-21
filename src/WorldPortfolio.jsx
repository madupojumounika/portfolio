import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Html, OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import { ArrowLeft, ArrowUpRight, Github, Linkedin, Mail, X } from "lucide-react";

const worlds = [
  { id:"story", n:"01", name:"My Origin", title:"The person behind the universe", color:"#77caff", desc:"I'm Mounika Madupoju, a B.Tech CSE (AI & ML) student at Bharat Institute of Engineering & Technology, Hyderabad, graduating in 2028.", facts:["Curious builder from Hyderabad","Focused on frontend and full-stack development","Learning by building real projects"] },
  { id:"skills", n:"02", name:"Skills Planet", title:"Tools I work with", color:"#b49aff", desc:"A growing toolkit built through coursework, practice and hands-on projects.", facts:["HTML · CSS · JavaScript","Java · C · Python basics","React · Node.js · MongoDB — project experience"] },
  { id:"projects", n:"03", name:"Project Galaxy", title:"Things I've been building", color:"#78e2c2", desc:"A collection of practical ideas and prototypes that helped me explore product thinking and software development.", facts:["PayPilot — assisted purchasing with budget guardrails","MedLink — emergency referral coordination concept","Code Mentor — coding interview practice","CareerX — opportunities community"] },
  { id:"journey", n:"04", name:"Milestone Moon", title:"My learning journey", color:"#ffc477", desc:"Every challenge, collaboration and milestone is another step forward.", facts:["Smart India Hackathon · BIET internal Top 45","TCS iON Career Edge","JPMorgan Chase Software Engineering simulation · Forage","Campus and community initiatives"] },
  { id:"contact", n:"05", name:"Connection Station", title:"Let's build something", color:"#ff91a8", desc:"Open to connecting with developers, teams and people building useful things.", facts:["Software development opportunities","Internships · Collaborations · Projects"], links:true }
];

function OrbitPath({ radius }) {
  return <mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[radius,0.008,6,220]} /><meshBasicMaterial color="#7896bd" transparent opacity={0.19} /></mesh>;
}
function Planet({ radius, size, color, speed, seed=0, ring=false }) {
  const orbit=useRef(); const body=useRef();
  useFrame((_,dt)=>{ if(orbit.current) orbit.current.rotation.y+=dt*speed; if(body.current) body.current.rotation.y+=dt*.22; });
  return <group ref={orbit} rotation={[0,seed,0]}><group position={[radius,0,0]}><mesh ref={body}><sphereGeometry args={[size,48,48]}/><meshStandardMaterial color={color} roughness={.86} metalness={.06}/></mesh>{ring&&<mesh rotation={[Math.PI/2.5,.15,0]}><torusGeometry args={[size*1.55,size*.12,8,96]}/><meshStandardMaterial color="#c7a77e" transparent opacity={.55}/></mesh>}<mesh scale={1.18}><sphereGeometry args={[size,32,32]}/><meshBasicMaterial color={color} transparent opacity={.045} side={THREE.BackSide}/></mesh></group></group>;
}
function EarthPlanet({ onEnter }) {
  const [map,clouds,normal,lights]=useLoader(THREE.TextureLoader,[
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png",
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.png"
  ]);
  const root=useRef(),cloud=useRef();
  map.colorSpace=THREE.SRGBColorSpace; clouds.colorSpace=THREE.SRGBColorSpace; lights.colorSpace=THREE.SRGBColorSpace;
  const india=useMemo(()=>{const lat=20.5937*Math.PI/180,lon=78.9629*Math.PI/180,r=1.04;return new THREE.Vector3(-r*Math.cos(lat)*Math.sin(lon),r*Math.sin(lat),r*Math.cos(lat)*Math.cos(lon));},[]);
  useFrame((_,dt)=>{if(root.current)root.current.rotation.y+=dt*.12;if(cloud.current)cloud.current.rotation.y+=dt*.15;});
  return <group ref={root}>
    <mesh onClick={(e)=>{e.stopPropagation();onEnter();}} onPointerOver={()=>{document.body.style.cursor="pointer";}} onPointerOut={()=>{document.body.style.cursor="auto";}}>
      <sphereGeometry args={[1,96,96]}/><meshStandardMaterial map={map} normalMap={normal} normalScale={new THREE.Vector2(.2,.2)} emissiveMap={lights} emissive="#fff0c2" emissiveIntensity={.35} roughness={.95}/>
    </mesh>
    <mesh ref={cloud} scale={1.009}><sphereGeometry args={[1,72,72]}/><meshStandardMaterial map={clouds} transparent opacity={.25} depthWrite={false}/></mesh>
    <mesh scale={1.075}><sphereGeometry args={[1,64,64]}/><meshBasicMaterial color="#4b9dff" transparent opacity={.13} side={THREE.BackSide}/></mesh>
    <group position={india}><mesh><sphereGeometry args={[.035,16,16]}/><meshBasicMaterial color="#fff0a6"/></mesh><mesh><sphereGeometry args={[.09,16,16]}/><meshBasicMaterial color="#ffbd63" transparent opacity={.22}/></mesh><Html distanceFactor={5} position={[.12,.1,0]}><span className="india-pin">INDIA · CLICK EARTH</span></Html></group>
    <Html position={[0,-1.35,0]} center distanceFactor={8}><button className="earth-enter" onClick={onEnter}>ENTER EARTH <ArrowUpRight size={13}/></button></Html>
  </group>;
}
function EarthOrbit({ onEnter }) {
  const orbit = useRef();
  useFrame((_, dt) => {
    if (orbit.current) orbit.current.rotation.y += dt * 0.22;
  });
  return (
    <group ref={orbit} position={[5.65, 0, 0]}>
      <EarthPlanet onEnter={onEnter} />
    </group>
  );
}
function SolarSystemContents({ onEnter }) {
  const system = useRef();
  useFrame((_, dt) => {
    if (system.current) system.current.rotation.y += dt * 0.012;
  });
  return (
    <>
      <color attach="background" args={["#02040c"]} />
      <fog attach="fog" args={["#02040c", 24, 55]} />
      <ambientLight intensity={0.34} />
      <pointLight position={[0, 0, 0]} intensity={190} distance={35} color="#ffb45c" />
      <directionalLight position={[-7, 8, 9]} intensity={1.5} color="#b8d9ff" />
      <Stars radius={110} depth={75} count={8500} factor={4.5} saturation={0.25} fade speed={0.35} />
      <group ref={system}>
        <mesh>
          <sphereGeometry args={[0.82, 64, 64]} />
          <meshBasicMaterial color="#ffb64d" />
        </mesh>
        <mesh scale={1.28}>
          <sphereGeometry args={[0.82, 48, 48]} />
          <meshBasicMaterial color="#ff8b36" transparent opacity={0.1} side={THREE.BackSide} />
        </mesh>
        {[2.1, 3.2, 4.4, 5.65, 7.1, 8.6, 10.2].map((r) => <OrbitPath key={r} radius={r} />)}
        <Planet radius={2.1} size={0.17} color="#a9a9a2" speed={0.48} seed={0.3} />
        <Planet radius={3.2} size={0.28} color="#d4a66f" speed={0.31} seed={1.5} />
        <Suspense fallback={null}><EarthOrbit onEnter={onEnter} /></Suspense>
        <Planet radius={7.1} size={0.31} color="#b75c42" speed={0.17} seed={2.1} />
        <Planet radius={8.6} size={0.75} color="#c69a70" speed={0.105} seed={3.1} ring />
        <Planet radius={10.2} size={0.58} color="#8bc5cf" speed={0.075} seed={4.1} ring />
      </group>
      <OrbitControls enablePan={false} minDistance={14} maxDistance={25} minPolarAngle={0.85} maxPolarAngle={2.25} rotateSpeed={0.35} />
    </>
  );
}
function SolarSystem({ onEnter }) {
  return (
    <Canvas camera={{ position: [0, 8.5, 19], fov: 42 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}>
      <SolarSystemContents onEnter={onEnter} />
    </Canvas>
  );
}
function WorldSceneContents({ onSelect }) {
  const group = useRef();
  useFrame((_, dt) => {
    if (group.current) group.current.rotation.y += dt * 0.025;
  });
  return (
    <>
      <color attach="background" args={["#030713"]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 3, 6]} intensity={55} color="#528fd8" />
      <Stars radius={90} depth={60} count={5500} factor={4} fade />
      <group ref={group}>
        {worlds.map((w, i) => {
          const a = (i * Math.PI * 2) / worlds.length - Math.PI / 2;
          const r = 3.15;
          return (
            <group key={w.id} position={[Math.cos(a) * r, Math.sin(a) * r * 0.72, 0]}>
              <mesh
                onClick={(e) => { e.stopPropagation(); onSelect(w.id); }}
                onPointerOver={() => { document.body.style.cursor = "pointer"; }}
                onPointerOut={() => { document.body.style.cursor = "auto"; }}
              >
                <sphereGeometry args={[0.47, 48, 48]} />
                <meshStandardMaterial color={w.color} emissive={w.color} emissiveIntensity={0.24} roughness={0.48} />
              </mesh>
              <mesh scale={1.28}>
                <sphereGeometry args={[0.47, 32, 32]} />
                <meshBasicMaterial color={w.color} transparent opacity={0.08} side={THREE.BackSide} />
              </mesh>
              <Html center distanceFactor={9} position={[0, -0.75, 0]}>
                <button className="world-planet-label" onClick={() => onSelect(w.id)}>{w.n} · {w.name}</button>
              </Html>
            </group>
          );
        })}
      </group>
      <OrbitControls enablePan={false} enableZoom={false} rotateSpeed={0.3} />
    </>
  );
}
function WorldScene({ onSelect }) {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 42 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: false }}>
      <WorldSceneContents onSelect={onSelect} />
    </Canvas>
  );
}

export default function WorldPortfolio() {
  const [page,setPage]=useState(window.location.pathname==="/world"?"world":"universe"),[transition,setTransition]=useState(false),[active,setActive]=useState(null);
  const selected=worlds.find(w=>w.id===active);
  const enterEarth=()=>{if(transition)return;setTransition(true);window.setTimeout(()=>{window.history.pushState({portfolioWorld:true},"","/world");setPage("world");setTransition(false);},1350);};
  const back=()=>{setActive(null);window.history.pushState({portfolioWorld:false},"","/");setPage("universe");};
  useEffect(()=>{const key=e=>{if(e.key==="Escape")setActive(null);};const pop=()=>{setActive(null);setPage(window.location.pathname==="/world"?"world":"universe");};window.addEventListener("keydown",key);window.addEventListener("popstate",pop);return()=>{window.removeEventListener("keydown",key);window.removeEventListener("popstate",pop);};},[]);
  return <main className={page==="universe"?"cosmos-page":"myworld-page"}>
    <div className="scene-canvas">{page==="universe"?<SolarSystem onEnter={enterEarth}/>:<WorldScene onSelect={setActive}/>}</div>
    {page==="universe"?<>
      <div className="cosmos-vignette"/>
      <div className="cosmos-brand"><span className="brand-star">✦</span><span>MOUNIKA MADUPOJU</span><small>AN INTERACTIVE DIGITAL UNIVERSE</small></div>
      <div className="cosmos-heading"><span>THE SOLAR SYSTEM</span><h1>A universe<br/>waiting to be <em>explored.</em></h1><p>Find the blue planet. That's where my world begins.</p></div>
      <div className="cosmos-instruction"><span className="pulse-dot"/> DRAG TO EXPLORE <i/> CLICK EARTH TO ENTER</div>
      <div className="cosmos-footer">A PERSONAL PORTFOLIO EXPERIENCE <span>01 — THE UNIVERSE</span></div>
      {transition&&<div className="warp-transition"><div className="warp-ring"/><span>ENTERING EARTH</span></div>}
    </>:<>
      <header className="world-header"><button onClick={back} className="back-universe"><ArrowLeft size={15}/> BACK TO UNIVERSE</button><div><b>MOUNIKA'S WORLD</b><small>EXPLORE THE DESTINATIONS</small></div><div className="social-links"><a href="https://github.com/madupojumounika" target="_blank" rel="noreferrer"><Github size={17}/></a><a href="https://www.linkedin.com/in/mounikamadupoju/" target="_blank" rel="noreferrer"><Linkedin size={17}/></a></div></header>
      <section className="world-intro"><span>WELCOME TO MY WORLD</span><h1>Every world tells<br/><em>a different story.</em></h1><p>Choose a planet to discover one part of my journey.</p></section>
      <div className="world-hint">SELECT A PLANET TO DISCOVER</div>
      {selected&&<section className="world-detail"><button className="detail-close" onClick={()=>setActive(null)} aria-label="Close"><X size={18}/></button><span style={{color:selected.color}}>{selected.n} / {selected.name.toUpperCase()}</span><h2>{selected.title}</h2><p>{selected.desc}</p><ul>{selected.facts.map(f=><li key={f}>{f}</li>)}</ul>{selected.links&&<div className="detail-links"><a href="mailto:madupojumounika0@gmail.com"><Mail size={15}/> EMAIL</a><a href="https://www.linkedin.com/in/mounikamadupoju/" target="_blank" rel="noreferrer"><Linkedin size={15}/> LINKEDIN</a></div>}{selected.id==="projects"&&<div className="detail-links"><a href="https://github.com/madupojumounika/paypilot" target="_blank" rel="noreferrer">PAYPILOT <ArrowUpRight size={13}/></a><a href="https://github.com/madupojumounika/medlink" target="_blank" rel="noreferrer">MEDLINK <ArrowUpRight size={13}/></a><a href="https://github.com/madupojumounika/code-mentor" target="_blank" rel="noreferrer">CODE MENTOR <ArrowUpRight size={13}/></a><a href="https://github.com/madupojumounika/careerx" target="_blank" rel="noreferrer">CAREERX <ArrowUpRight size={13}/></a></div>}</section>}
      <div className="world-footer">© 2026 MOUNIKA MADUPOJU <span>02 — MY WORLD</span></div>
    </>}
  </main>;
}
