import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Html, OrbitControls, Stars } from "@react-three/drei";
import { ArrowUpRight, Compass, Github, Linkedin, Mail, Mouse, Move, Sparkles, Volume2, VolumeX, X } from "lucide-react";

const districts = [
  { id: "story", number: "01", name: "Origin District", eyebrow: "THE STORY", color: "#73c9ff", description: "A curious builder from Hyderabad, learning by turning ideas into things people can use.", detail: "I'm Mounika Madupoju, a B.Tech CSE (AI & ML) student at Bharat Institute of Engineering & Technology, graduating in 2028. My focus is building thoughtful web experiences and practical software.", facts: ["B.Tech CSE (AI & ML)", "BIET · Hyderabad", "Class of 2028"] },
  { id: "skills", number: "02", name: "Skills Lab", eyebrow: "THE TOOLKIT", color: "#a78bfa", description: "A growing workshop of languages, interfaces and full-stack foundations.", detail: "I enjoy working across the web stack, from shaping responsive interfaces to understanding the APIs and data behind them. I keep learning by building and experimenting.", facts: ["HTML · CSS · JavaScript", "Java · C · Python basics", "React · Node.js · MongoDB (project experience)"] },
  { id: "projects", number: "03", name: "Innovation Quarter", eyebrow: "SELECTED BUILDS", color: "#72e0bd", description: "Real problems, working prototypes, and ideas that keep evolving.", detail: "Explore a few projects where I have been learning product thinking, frontend engineering, backend APIs and integration.", facts: ["PayPilot — assisted purchasing with budget guardrails", "MedLink — emergency referral coordination concept", "Code Mentor — coding interview practice", "CareerX — opportunities community"] },
  { id: "journey", number: "04", name: "Milestone Island", eyebrow: "THE JOURNEY", color: "#ffbf69", description: "Small milestones that mark a bigger learning journey.", detail: "I value hands-on learning, team collaboration and showing up for challenges. Each experience has helped me become a more thoughtful developer.", facts: ["Smart India Hackathon · BIET internal Top 45", "TCS iON Career Edge", "JPMorgan Chase Software Engineering simulation · Forage", "Campus and community initiatives"] },
  { id: "contact", number: "05", name: "Connection Hub", eyebrow: "LET'S BUILD", color: "#ff8e9e", description: "Have a project, opportunity or interesting problem? Let's talk.", detail: "I'm open to connecting with developers, teams and people building useful things. Reach out and let's see what we can create.", facts: ["Open to software development opportunities", "Collaboration · Internships · Projects"] }
];

function Planet({ position, color, size = 1, speed = 0.2 }) {
  const ref = useRef();
  useFrame((_, delta) => { if (ref.current) ref.current.rotation.y += delta * speed; });
  return <mesh ref={ref} position={position}><sphereGeometry args={[size, 48, 48]} /><meshStandardMaterial color={color} roughness={0.72} metalness={0.12} /></mesh>;
}

function Landmark({ item, position, active, onSelect }) {
  const group = useRef();
  useFrame((state) => { if (group.current) group.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.4 + position[0]) * 0.08; });
  return <group ref={group} position={position} onClick={(e) => { e.stopPropagation(); onSelect(item.id); }}>
    <mesh position={[0, 1.25, 0]}><cylinderGeometry args={[0.08, 0.12, 2.5, 8]} /><meshStandardMaterial color={item.color} emissive={item.color} emissiveIntensity={active ? 1.4 : 0.35} /></mesh>
    <mesh position={[0, 2.65, 0]}><octahedronGeometry args={[0.38, 0]} /><meshStandardMaterial color={item.color} emissive={item.color} emissiveIntensity={active ? 1.8 : 0.55} metalness={0.35} roughness={0.25} /></mesh>
    <mesh position={[0, 0.12, 0]} rotation={[-Math.PI / 2, 0, 0]}><ringGeometry args={[0.55, 0.68, 48]} /><meshBasicMaterial color={item.color} transparent opacity={active ? 0.9 : 0.35} /></mesh>
    <Html position={[0, 3.15, 0]} center distanceFactor={14} style={{ pointerEvents: "none" }}><div className="landmark-label" style={{ borderColor: item.color }}>{item.number} / {item.name}</div></Html>
  </group>;
}

function WorldScene({ active, onSelect }) {
  const city = useMemo(() => Array.from({ length: 48 }, (_, i) => ({ x: (i % 8 - 3.5) * 2.3, z: (Math.floor(i / 8) - 2.5) * 2.6, h: 0.7 + ((i * 17) % 13) / 5, w: 0.55 + ((i * 7) % 5) / 10 })), []);
  return <Canvas camera={{ position: [0, 10, 17], fov: 43 }} dpr={[1, 1.6]} shadows gl={{ antialias: true, alpha: true }}>
    <color attach="background" args={["#070b18"]} />
    <fog attach="fog" args={["#070b18", 18, 42]} />
    <ambientLight intensity={0.65} />
    <directionalLight position={[8, 14, 7]} intensity={2.1} castShadow />
    <pointLight position={[-8, 6, -8]} color="#437cff" intensity={30} distance={35} />
    <Stars radius={80} depth={45} count={1800} factor={3} saturation={0.25} fade speed={0.35} />
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.08, 0]} receiveShadow><circleGeometry args={[17, 96]} /><meshStandardMaterial color="#101a2c" roughness={0.9} /></mesh>
    <gridHelper args={[34, 34, "#243957", "#15243a"]} position={[0, 0, 0]} />
    {city.map((b, i) => <mesh key={i} position={[b.x, b.h / 2, b.z]} castShadow><boxGeometry args={[b.w, b.h, b.w]} /><meshStandardMaterial color={i % 4 === 0 ? "#1d3553" : "#14243b"} metalness={0.35} roughness={0.55} /></mesh>)}
    <Planet position={[-10, 5, -11]} color="#183e72" size={2.1} speed={0.08} />
    <Float speed={1.1} rotationIntensity={0.15} floatIntensity={0.45}><mesh position={[8, 4.8, -9]}><torusGeometry args={[1.15, 0.035, 12, 80]} /><meshStandardMaterial color="#4d9cff" emissive="#2764b8" emissiveIntensity={1.1} /></mesh></Float>
    {districts.map((item, i) => <Landmark key={item.id} item={item} position={[[ -6, 0, -3.5], [0, 0, -6], [6, 0, -3.5], [-4.5, 0, 5], [5, 0, 5]][i]} active={active === item.id} onSelect={onSelect} />)}
    <OrbitControls enablePan={false} minDistance={10} maxDistance={25} minPolarAngle={0.45} maxPolarAngle={1.35} />
    <Environment preset="night" />
  </Canvas>;
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
    <div className="world-controls"><div className="control-key"><Mouse size={14}/><span>CLICK LANDMARKS</span></div><div className="control-key"><Move size={14}/><span>DRAG TO ORBIT</span></div><div className="control-key"><span className="keycap">ESC</span><span>CLOSE PANEL</span></div></div>
    <div className="world-status"><span className="status-pulse"/> WORLD ONLINE <span className="status-sep">/</span> 5 DESTINATIONS <span className="status-sep">/</span> BUILD 2026</div>
    {intro && <div className="intro-overlay"><div className="intro-card"><div className="intro-orbit"><div className="intro-globe"><span>IN</span></div><i/><b/></div><div className="intro-overline">WELCOME TO MY DIGITAL UNIVERSE</div><h2>One curious mind.<br/><em>Many worlds to build.</em></h2><p>Travel through my story, skills, projects and milestones — one discovery at a time.</p><button className="primary-cta" onClick={() => setIntro(false)}>Enter the universe <ArrowUpRight size={16}/></button><button className="skip-intro" onClick={() => setIntro(false)}>SKIP INTRO</button></div></div>}
    {selected && <div className="district-panel"><button className="panel-close" onClick={() => setActive(null)} aria-label="Close"><X size={18}/></button><div className="panel-overline" style={{ color: selected.color }}>{selected.number} / {selected.eyebrow}</div><h2>{selected.name}</h2><p className="panel-lead">{selected.description}</p><p className="panel-detail">{selected.detail}</p><div className="panel-facts">{selected.facts.map((f) => <div key={f}><span style={{ background: selected.color }}/>{f}</div>)}</div>{active === "projects" && <div className="project-links"><a href="https://github.com/madupojumounika/paypilot" target="_blank" rel="noreferrer">PayPilot <ArrowUpRight size={13}/></a><a href="https://github.com/madupojumounika/medlink" target="_blank" rel="noreferrer">MedLink <ArrowUpRight size={13}/></a><a href="https://github.com/madupojumounika/code-mentor" target="_blank" rel="noreferrer">Code Mentor <ArrowUpRight size={13}/></a><a href="https://github.com/madupojumounika/careerx" target="_blank" rel="noreferrer">CareerX <ArrowUpRight size={13}/></a></div>}{active === "contact" && <div className="contact-links"><a href="mailto:madupojumounika0@gmail.com"><Mail size={15}/> Email me</a><a href="https://www.linkedin.com/in/mounikamadupoju/" target="_blank" rel="noreferrer"><Linkedin size={15}/> LinkedIn</a></div>}<div className="panel-footer"><span>DESTINATION UNLOCKED</span><span>↗</span></div></div>}
    {showMap && <div className="map-panel"><div className="map-heading">WORLD AT A GLANCE <button onClick={() => setShowMap(false)}><X size={15}/></button></div><div className="map-grid">{districts.map((d) => <button key={d.id} onClick={() => { setActive(d.id); setShowMap(false); setIntro(false); }}><span style={{ background: d.color }}>{d.number}</span>{d.name}<ArrowUpRight size={13}/></button>)}</div></div>}
    <footer className="world-footer"><span>DESIGNED TO BE EXPLORED <Sparkles size={13}/></span><span>© 2026 MOUNIKA MADUPOJU</span><a href="mailto:madupojumounika0@gmail.com">SAY HELLO <ArrowUpRight size={13}/></a></footer>
  </main>;
}
