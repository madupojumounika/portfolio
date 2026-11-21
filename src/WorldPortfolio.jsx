import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { ArrowUpRight, Compass, Github, Linkedin, Mail, Mouse, Move, Sparkles, Volume2, VolumeX, X } from "lucide-react";

const districts = [
  { id: "story", number: "01", name: "Origin District", eyebrow: "THE STORY", color: "#73c9ff", description: "A curious builder from Hyderabad, learning by turning ideas into things people can use.", detail: "I'm Mounika Madupoju, a B.Tech CSE (AI & ML) student at Bharat Institute of Engineering & Technology, graduating in 2028. My focus is building thoughtful web experiences and practical software.", facts: ["B.Tech CSE (AI & ML)", "BIET · Hyderabad", "Class of 2028"] },
  { id: "skills", number: "02", name: "Skills Lab", eyebrow: "THE TOOLKIT", color: "#a78bfa", description: "A growing workshop of languages, interfaces and full-stack foundations.", detail: "I enjoy working across the web stack, from shaping responsive interfaces to understanding the APIs and data behind them. I keep learning by building and experimenting.", facts: ["HTML · CSS · JavaScript", "Java · C · Python basics", "React · Node.js · MongoDB (project experience)"] },
  { id: "projects", number: "03", name: "Innovation Quarter", eyebrow: "SELECTED BUILDS", color: "#72e0bd", description: "Real problems, working prototypes, and ideas that keep evolving.", detail: "Explore a few projects where I have been learning product thinking, frontend engineering, backend APIs and integration.", facts: ["PayPilot — assisted purchasing with budget guardrails", "MedLink — emergency referral coordination concept", "Code Mentor — coding interview practice", "CareerX — opportunities community"] },
  { id: "journey", number: "04", name: "Milestone Island", eyebrow: "THE JOURNEY", color: "#ffbf69", description: "Small milestones that mark a bigger learning journey.", detail: "I value hands-on learning, team collaboration and showing up for challenges. Each experience has helped me become a more thoughtful developer.", facts: ["Smart India Hackathon · BIET internal Top 45", "TCS iON Career Edge", "JPMorgan Chase Software Engineering simulation · Forage", "Campus and community initiatives"] },
  { id: "contact", number: "05", name: "Connection Hub", eyebrow: "LET'S BUILD", color: "#ff8e9e", description: "Have a project, opportunity or interesting problem? Let's talk.", detail: "I'm open to connecting with developers, teams and people building useful things. Reach out and let's see what we can create.", facts: ["Open to software development opportunities", "Collaboration · Internships · Projects"] }
];

function Building({ position, width, depth, height, tone = "#273b52", seed = 0 }) {
  const floors = Math.max(2, Math.floor(height / 0.72));
  const windows = [];
  for (let floor = 0; floor < floors; floor++) {
    for (let col = 0; col < 3; col++) {
      windows.push([col, floor]);
    }
  }
  return <group position={position}>
    <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial color={tone} roughness={0.82} metalness={0.12} />
    </mesh>
    <mesh position={[0, height + 0.035, 0]}>
      <boxGeometry args={[width + 0.12, 0.07, depth + 0.12]} />
      <meshStandardMaterial color="#344a61" roughness={0.8} />
    </mesh>
    {windows.map(([col, floor], i) => <mesh key={i} position={[(col - 1) * width * 0.29, 0.48 + floor * 0.72, depth / 2 + 0.012]}>
      <boxGeometry args={[width * 0.16, 0.34, 0.025]} />
      <meshStandardMaterial color={(i + seed) % 5 === 0 ? "#e8bd76" : "#7898ad"} emissive={(i + seed) % 5 === 0 ? "#d28b39" : "#18324a"} emissiveIntensity={(i + seed) % 5 === 0 ? 0.55 : 0.08} roughness={0.32} />
    </mesh>)}
    <mesh position={[0, 0.18, depth / 2 + 0.025]}>
      <boxGeometry args={[width * 0.24, 0.36, 0.06]} />
      <meshStandardMaterial color="#172b40" />
    </mesh>
    <mesh position={[0, height * 0.78, -depth / 2 - 0.015]}>
      <boxGeometry args={[width * 0.42, 0.12, 0.04]} />
      <meshStandardMaterial color="#45637a" />
    </mesh>
  </group>;
}

function Tree({ position, scale = 1 }) {
  return <group position={position} scale={scale}>
    <mesh position={[0, 0.8, 0]} castShadow><cylinderGeometry args={[0.12, 0.18, 1.6, 8]} /><meshStandardMaterial color="#594735" /></mesh>
    <mesh position={[0, 2, 0]} castShadow><sphereGeometry args={[0.9, 12, 10]} /><meshStandardMaterial color="#315c49" roughness={1} /></mesh>
    <mesh position={[0.48, 2.25, 0.12]} castShadow><sphereGeometry args={[0.58, 10, 9]} /><meshStandardMaterial color="#3c7155" roughness={1} /></mesh>
    <mesh position={[-0.42, 2.18, -0.08]} castShadow><sphereGeometry args={[0.62, 10, 9]} /><meshStandardMaterial color="#284d40" roughness={1} /></mesh>
  </group>;
}

function StreetLight({ position }) {
  return <group position={position}>
    <mesh position={[0, 2, 0]}><cylinderGeometry args={[0.035, 0.055, 4, 8]} /><meshStandardMaterial color="#34485b" metalness={0.7} roughness={0.35} /></mesh>
    <mesh position={[0.25, 3.95, 0]} rotation={[0, 0, -0.25]}><boxGeometry args={[0.65, 0.06, 0.08]} /><meshStandardMaterial color="#53677a" /></mesh>
    <pointLight position={[0.5, 3.82, 0]} color="#f4c77e" intensity={2.4} distance={7} />
    <mesh position={[0.5, 3.82, 0]}><sphereGeometry args={[0.11, 10, 10]} /><meshBasicMaterial color="#ffe0a3" /></mesh>
  </group>;
}

function Car({ position, color, speed = 1 }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.position.z += delta * speed;
    if (ref.current.position.z > 19) ref.current.position.z = -19;
    if (ref.current.position.z < -19) ref.current.position.z = 19;
  });
  return <group ref={ref} position={position}>
    <mesh position={[0, 0.38, 0]} castShadow><boxGeometry args={[0.92, 0.48, 1.75]} /><meshStandardMaterial color={color} metalness={0.55} roughness={0.28} /></mesh>
    <mesh position={[0, 0.7, -0.12]}><boxGeometry args={[0.72, 0.36, 0.82]} /><meshStandardMaterial color="#7e9aaa" metalness={0.3} roughness={0.2} /></mesh>
    {[-1, 1].map((x) => [-0.52, 0.55].map((z) => <mesh key={x + ":" + z} position={[x * 0.43, 0.2, z]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.19, 0.19, 0.12, 16]} /><meshStandardMaterial color="#10151c" roughness={0.9} /></mesh>))}
    <mesh position={[0, 0.42, -0.89]}><boxGeometry args={[0.55, 0.12, 0.025]} /><meshBasicMaterial color="#ff5a45" /></mesh>
  </group>;
}

function Player({ positionRef, movingRef }) {
  const root = useRef();
  const leftLeg = useRef();
  const rightLeg = useRef();
  useFrame((state) => {
    if (!root.current) return;
    const moving = movingRef.current;
    const t = state.clock.elapsedTime * 9;
    if (leftLeg.current) leftLeg.current.rotation.x = moving ? Math.sin(t) * 0.55 : 0;
    if (rightLeg.current) rightLeg.current.rotation.x = moving ? Math.sin(t + Math.PI) * 0.55 : 0;
    root.current.position.set(positionRef.current.x, 0, positionRef.current.z);
    root.current.rotation.y = positionRef.current.angle;
  });
  return <group ref={root}>
    <mesh position={[0, 1.02, 0]} castShadow><capsuleGeometry args={[0.28, 0.65, 5, 10]} /><meshStandardMaterial color="#4d9bd2" roughness={0.58} /></mesh>
    <mesh position={[0, 1.62, 0]} castShadow><sphereGeometry args={[0.22, 18, 16]} /><meshStandardMaterial color="#d6a47e" roughness={0.8} /></mesh>
    <mesh position={[0, 1.78, -0.025]}><sphereGeometry args={[0.22, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.48]} /><meshStandardMaterial color="#20232b" /></mesh>
    <group ref={leftLeg} position={[-0.13, 0.55, 0]}><mesh position={[0, -0.23, 0]} castShadow><capsuleGeometry args={[0.105, 0.42, 4, 8]} /><meshStandardMaterial color="#24374d" /></mesh></group>
    <group ref={rightLeg} position={[0.13, 0.55, 0]}><mesh position={[0, -0.23, 0]} castShadow><capsuleGeometry args={[0.105, 0.42, 4, 8]} /><meshStandardMaterial color="#24374d" /></mesh></group>
    <mesh position={[-0.34, 1.05, 0]} rotation={[0, 0, -0.2]}><capsuleGeometry args={[0.09, 0.42, 4, 8]} /><meshStandardMaterial color="#d6a47e" /></mesh>
    <mesh position={[0.34, 1.05, 0]} rotation={[0, 0, 0.2]}><capsuleGeometry args={[0.09, 0.42, 4, 8]} /><meshStandardMaterial color="#d6a47e" /></mesh>
  </group>;
}

function WorldScene({ active, onSelect }) {
  const { camera } = useThree();
  const playerPosition = useRef({ x: 0, z: 8, angle: 0 });
  const moving = useRef(false);
  const keys = useRef({});
  const city = useMemo(() => Array.from({ length: 54 }, (_, i) => ({
    x: (i % 9 - 4) * 5.2 + ((i % 3) - 1) * 0.35,
    z: (Math.floor(i / 9) - 2.5) * 6.3,
    h: 3.2 + ((i * 13) % 8) * 0.72,
    w: 2.0 + ((i * 7) % 4) * 0.28,
    d: 2.2 + ((i * 11) % 3) * 0.35,
    tone: ["#26394c", "#30465a", "#1e3448", "#3a4b5c"][i % 4]
  })), []);
  useEffect(() => {
    const down = (e) => { if (["KeyW","KeyA","KeyS","KeyD","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","ShiftLeft","ShiftRight"].includes(e.code)) { keys.current[e.code] = true; e.preventDefault(); } };
    const up = (e) => { keys.current[e.code] = false; };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, []);
  useFrame((_, delta) => {
    const k = keys.current;
    const forward = k.KeyW || k.ArrowUp;
    const back = k.KeyS || k.ArrowDown;
    const left = k.KeyA || k.ArrowLeft;
    const right = k.KeyD || k.ArrowRight;
    moving.current = !!(forward || back || left || right);
    const p = playerPosition.current;
    const speed = (k.ShiftLeft || k.ShiftRight ? 7.5 : 4.2) * Math.min(delta, 0.04);
    if (left) p.angle += delta * 2.4;
    if (right) p.angle -= delta * 2.4;
    const direction = (forward ? 1 : 0) - (back ? 1 : 0);
    p.x -= Math.sin(p.angle) * speed * direction;
    p.z -= Math.cos(p.angle) * speed * direction;
    p.x = Math.max(-21, Math.min(21, p.x));
    p.z = Math.max(-20, Math.min(20, p.z));
    const target = new THREE.Vector3(p.x + Math.sin(p.angle) * 8, 5.1, p.z + Math.cos(p.angle) * 8);
    camera.position.lerp(target, 1 - Math.pow(0.001, delta));
    camera.lookAt(p.x, 1.3, p.z);
  });
  return <>
    <color attach="background" args={["#9ab5c3"]} />
    <fog attach="fog" args={["#9ab5c3", 35, 95]} />
    <ambientLight intensity={1.15} />
    <hemisphereLight args={["#d9edff", "#4a5d4b", 1.1]} />
    <directionalLight position={[-18, 28, 12]} intensity={2.4} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.12, 0]} receiveShadow><planeGeometry args={[160, 160]} /><meshStandardMaterial color="#526b57" roughness={1} /></mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 0]}><planeGeometry args={[9, 100]} /><meshStandardMaterial color="#303b43" roughness={0.95} /></mesh>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.035, 0]}><planeGeometry args={[0.12, 100]} /><meshBasicMaterial color="#d8cda5" /></mesh>
    {[-1, 1].map((side) => <mesh key={side} rotation={[-Math.PI / 2, 0, 0]} position={[side * 5.4, 0.01, 0]}><planeGeometry args={[1.8, 100]} /><meshStandardMaterial color="#a6a08a" roughness={1} /></mesh>)}
    {city.map((b, i) => <Building key={i} position={[b.x, 0, b.z]} width={b.w} depth={b.d} height={b.h} tone={b.tone} seed={i} />)}
    {Array.from({length: 18}, (_, i) => <Tree key={"tree"+i} position={[(i%2===0?-1:1)*(7.2 + (i%3)*1.1),0,(i-8.5)*4.7]} scale={0.85 + (i%3)*0.12} />)}
    {Array.from({length: 10}, (_, i) => <StreetLight key={"lamp"+i} position={[i%2===0?-6.5:6.5,0,(i-4.5)*8]} />)}
    <Car position={[-1.8,0,-15]} color="#b75b4c" speed={3.8} />
    <Car position={[1.8,0,7]} color="#d4d9df" speed={-2.8} />
    {districts.map((item, i) => {
      const positions = [[-11,0,-8],[11,0,-8],[0,0,-17],[-12,0,12],[12,0,12]];
      const pos = positions[i];
      return <group key={item.id} position={pos} onClick={(e) => { e.stopPropagation(); onSelect(item.id); }}>
        <mesh position={[0,0.08,0]} rotation={[-Math.PI/2,0,0]}><circleGeometry args={[2.1,48]} /><meshStandardMaterial color={item.color} transparent opacity={0.18} emissive={item.color} emissiveIntensity={0.3} /></mesh>
        <mesh position={[0,0.22,0]}><cylinderGeometry args={[0.12,0.18,0.42,12]} /><meshStandardMaterial color={item.color} emissive={item.color} emissiveIntensity={0.7} /></mesh>
        <mesh position={[0,0.62,0]}><octahedronGeometry args={[0.34,0]} /><meshStandardMaterial color={item.color} emissive={item.color} emissiveIntensity={0.85} /></mesh>
        <Html position={[0,1.25,0]} center distanceFactor={18}><button className="landmark-label" style={{borderColor:item.color,cursor:"pointer"}} onClick={(e)=>{e.stopPropagation();onSelect(item.id);}}>{item.number} · {item.name}</button></Html>
      </group>;
    })}
    <Player positionRef={playerPosition} movingRef={moving} />
  </>;
}

export default function WorldPortfolio() {
  const [active, setActive] = useState(null);
  const [intro, setIntro] = useState(true);
  const [muted, setMuted] = useState(true);
  const [showMap, setShowMap] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const selected = districts.find((d) => d.id === active);
  useEffect(() => { const handle = (e) => { if (e.key === "Escape") { setActive(null); setIntro(false); setMobileMenu(false); } if (e.key === "1") setActive("story"); if (e.key === "2") setActive("skills"); if (e.key === "3") setActive("projects"); if (e.key === "4") setActive("journey"); if (e.key === "5") setActive("contact"); }; window.addEventListener("keydown", handle); return () => window.removeEventListener("keydown", handle); }, []);
  return <main className="universe-shell">
    <div className="world-canvas"><WorldScene active={active} onSelect={(id) => { setActive(id); setIntro(false); }} /></div>
    <div className="world-vignette" />
    <header className="world-topbar"><a className="wordmark" href="#top"><span className="wordmark-mark">M.</span><span>MOUNIKA <i>MADUPOJU</i></span></a><div className="topbar-center"><span className="live-dot" /> PERSONAL DIGITAL UNIVERSE</div><div className="topbar-actions"><a href="https://github.com/madupojumounika" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17}/></a><a href="https://www.linkedin.com/in/mounikamadupoju/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17}/></a><button onClick={() => setMuted(!muted)} aria-label="Toggle sound">{muted ? <VolumeX size={17}/> : <Volume2 size={17}/>}</button></div></header>
    <aside className="world-side"><span className="side-kicker">NAVIGATE THE WORLD</span>{districts.map((d) => <button key={d.id} className={active === d.id ? "side-link active" : "side-link"} onClick={() => { setActive(d.id); setIntro(false); }}><span>{d.number}</span>{d.name}</button>)}<div className="side-line"/><button className="side-link map-link" onClick={() => setShowMap(!showMap)}><Compass size={14}/> {showMap ? "Hide map" : "World map"}</button></aside>
    <section className="hero-copy" id="top"><div className="eyebrow"><span/> A DEVELOPER IN PROGRESS · HYDERABAD, INDIA</div><h1>Ideas become<br/><em>worlds.</em></h1><p>Hey, I'm Mounika — I build thoughtful digital experiences, explore new technologies and turn curious ideas into working projects.</p><div className="hero-actions"><button className="primary-cta" onClick={() => { setIntro(false); setActive("projects"); }}>Explore my work <ArrowUpRight size={16}/></button><a className="text-cta" href="mailto:madupojumounika0@gmail.com">Let's connect <ArrowUpRight size={15}/></a></div><div className="hero-note"><span className="note-rule"/> SELECT A LANDMARK TO EXPLORE</div></section>
    <div className="world-coordinates"><span>17°23' N</span><span className="coord-line"/><span>78°29' E</span><span className="coord-label">HYDERABAD / IN</span></div>
    <div className="world-controls"><div className="control-key"><Move size={14}/><span>WASD / ARROWS TO WALK</span></div><div className="control-key"><span className="keycap">SHIFT</span><span>RUN</span></div><div className="control-key"><Mouse size={14}/><span>SELECT A DESTINATION</span></div><div className="control-key"><span className="keycap">ESC</span><span>CLOSE PANEL</span></div></div>
    <div className="world-status"><span className="status-pulse"/> WORLD ONLINE <span className="status-sep">/</span> 5 DESTINATIONS <span className="status-sep">/</span> BUILD 2026</div>
    {intro && <div className="intro-overlay"><div className="intro-card"><div className="intro-orbit"><div className="intro-globe"><span>IN</span></div><i/><b/></div><div className="intro-overline">WELCOME TO MY DIGITAL UNIVERSE</div><h2>One curious mind.<br/><em>Many worlds to build.</em></h2><p>Travel through my story, skills, projects and milestones — one discovery at a time.</p><button className="primary-cta" onClick={() => setIntro(false)}>Enter the universe <ArrowUpRight size={16}/></button><button className="skip-intro" onClick={() => setIntro(false)}>SKIP INTRO</button></div></div>}
    {selected && <div className="district-panel"><button className="panel-close" onClick={() => setActive(null)} aria-label="Close"><X size={18}/></button><div className="panel-overline" style={{ color: selected.color }}>{selected.number} / {selected.eyebrow}</div><h2>{selected.name}</h2><p className="panel-lead">{selected.description}</p><p className="panel-detail">{selected.detail}</p><div className="panel-facts">{selected.facts.map((f) => <div key={f}><span style={{ background: selected.color }}/>{f}</div>)}</div>{active === "projects" && <div className="project-links"><a href="https://github.com/madupojumounika/paypilot" target="_blank" rel="noreferrer">PayPilot <ArrowUpRight size={13}/></a><a href="https://github.com/madupojumounika/medlink" target="_blank" rel="noreferrer">MedLink <ArrowUpRight size={13}/></a><a href="https://github.com/madupojumounika/code-mentor" target="_blank" rel="noreferrer">Code Mentor <ArrowUpRight size={13}/></a><a href="https://github.com/madupojumounika/careerx" target="_blank" rel="noreferrer">CareerX <ArrowUpRight size={13}/></a></div>}{active === "contact" && <div className="contact-links"><a href="mailto:madupojumounika0@gmail.com"><Mail size={15}/> Email me</a><a href="https://www.linkedin.com/in/mounikamadupoju/" target="_blank" rel="noreferrer"><Linkedin size={15}/> LinkedIn</a></div>}<div className="panel-footer"><span>DESTINATION UNLOCKED</span><span>↗</span></div></div>}
    {showMap && <div className="map-panel"><div className="map-heading">WORLD AT A GLANCE <button onClick={() => setShowMap(false)}><X size={15}/></button></div><div className="map-grid">{districts.map((d) => <button key={d.id} onClick={() => { setActive(d.id); setShowMap(false); setIntro(false); }}><span style={{ background: d.color }}>{d.number}</span>{d.name}<ArrowUpRight size={13}/></button>)}</div></div>}
    <footer className="world-footer"><span>DESIGNED TO BE EXPLORED <Sparkles size={13}/></span><span>© 2026 MOUNIKA MADUPOJU</span><a href="mailto:madupojumounika0@gmail.com">SAY HELLO <ArrowUpRight size={13}/></a></footer>
  </main>;
}
