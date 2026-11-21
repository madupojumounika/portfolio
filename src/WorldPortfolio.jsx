import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { Html, OrbitControls, Stars } from "@react-three/drei";
import { ArrowUpRight, Compass, Github, Linkedin, Mail, Mouse, Move, Sparkles, Volume2, VolumeX, X } from "lucide-react";

const districts = [
  { id: "story", number: "01", name: "Origin District", eyebrow: "THE STORY", color: "#73c9ff", description: "A curious builder from Hyderabad, learning by turning ideas into things people can use.", detail: "I'm Mounika Madupoju, a B.Tech CSE (AI & ML) student at Bharat Institute of Engineering & Technology, graduating in 2028. My focus is building thoughtful web experiences and practical software.", facts: ["B.Tech CSE (AI & ML)", "BIET · Hyderabad", "Class of 2028"] },
  { id: "skills", number: "02", name: "Skills Lab", eyebrow: "THE TOOLKIT", color: "#a78bfa", description: "A growing workshop of languages, interfaces and full-stack foundations.", detail: "I enjoy working across the web stack, from shaping responsive interfaces to understanding the APIs and data behind them. I keep learning by building and experimenting.", facts: ["HTML · CSS · JavaScript", "Java · C · Python basics", "React · Node.js · MongoDB (project experience)"] },
  { id: "projects", number: "03", name: "Innovation Quarter", eyebrow: "SELECTED BUILDS", color: "#72e0bd", description: "Real problems, working prototypes, and ideas that keep evolving.", detail: "Explore a few projects where I have been learning product thinking, frontend engineering, backend APIs and integration.", facts: ["PayPilot — assisted purchasing with budget guardrails", "MedLink — emergency referral coordination concept", "Code Mentor — coding interview practice", "CareerX — opportunities community"] },
  { id: "journey", number: "04", name: "Milestone Island", eyebrow: "THE JOURNEY", color: "#ffbf69", description: "Small milestones that mark a bigger learning journey.", detail: "I value hands-on learning, team collaboration and showing up for challenges. Each experience has helped me become a more thoughtful developer.", facts: ["Smart India Hackathon · BIET internal Top 45", "TCS iON Career Edge", "JPMorgan Chase Software Engineering simulation · Forage", "Campus and community initiatives"] },
  { id: "contact", number: "05", name: "Connection Hub", eyebrow: "LET'S BUILD", color: "#ff8e9e", description: "Have a project, opportunity or interesting problem? Let's talk.", detail: "I'm open to connecting with developers, teams and people building useful things. Reach out and let's see what we can create.", facts: ["Open to software development opportunities", "Collaboration · Internships · Projects"] }
];

function GlobeMarker({ item, position, onSelect }) {
  return <group position={position}>
    <mesh><sphereGeometry args={[0.055, 16, 16]} /><meshBasicMaterial color={item.color} /></mesh>
    <mesh><sphereGeometry args={[0.14, 16, 16]} /><meshBasicMaterial color={item.color} transparent opacity={0.16} /></mesh>
    <Html center distanceFactor={9} position={[0, 0.23, 0]}>
      <button className="landmark-label" style={{ borderColor: item.color }} onClick={(e) => { e.stopPropagation(); onSelect(item.id); }}>{item.number} · {item.name}</button>
    </Html>
  </group>;
}

function Earth({ onSelect }) {
  const [earthMap, cloudMap, normalMap, nightMap] = useLoader(THREE.TextureLoader, [
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png",
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.png"
  ]);
  const globe = useRef();
  const clouds = useRef();
  earthMap.colorSpace = THREE.SRGBColorSpace;
  cloudMap.colorSpace = THREE.SRGBColorSpace;
  nightMap.colorSpace = THREE.SRGBColorSpace;
  const indiaPin = useMemo(() => {
    const lat = 20.5937 * Math.PI / 180;
    const lon = 78.9629 * Math.PI / 180;
    const r = 2.03;
    return new THREE.Vector3(-r * Math.cos(lat) * Math.sin(lon), r * Math.sin(lat), r * Math.cos(lat) * Math.cos(lon));
  }, []);
  const markers = useMemo(() => [
    new THREE.Vector3(-1.05, 0.9, 1.48),
    new THREE.Vector3(1.45, 0.62, 1.15),
    new THREE.Vector3(0.35, -0.5, 1.9),
    new THREE.Vector3(-1.65, -0.42, 0.9),
    new THREE.Vector3(1.7, -0.72, 0.7)
  ].map((v) => v.normalize().multiplyScalar(2.02)), []);
  useFrame((_, delta) => {
    if (globe.current) globe.current.rotation.y += delta * 0.075;
    if (clouds.current) clouds.current.rotation.y += delta * 0.092;
  });
  return <group position={[1.15, -0.05, 0]} scale={1.08} rotation={[0.04, 1.15, -0.08]}>
    <mesh ref={globe} castShadow receiveShadow>
      <sphereGeometry args={[2, 96, 96]} />
      <meshStandardMaterial map={earthMap} normalMap={normalMap} normalScale={new THREE.Vector2(0.22, 0.22)} emissiveMap={nightMap} emissive="#fff0c2" emissiveIntensity={0.42} roughness={0.94} metalness={0.02} />
    </mesh>
    <mesh ref={clouds} scale={1.012}>
      <sphereGeometry args={[2, 72, 72]} />
      <meshStandardMaterial map={cloudMap} transparent opacity={0.28} depthWrite={false} blending={THREE.AdditiveBlending} />
    </mesh>
    <mesh scale={1.075}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshBasicMaterial color="#4b9dff" transparent opacity={0.11} side={THREE.BackSide} />
    </mesh>
    <mesh rotation={[0.35, 0.2, -0.28]}>
      <torusGeometry args={[2.62, 0.009, 8, 180]} />
      <meshBasicMaterial color="#4a9bdb" transparent opacity={0.34} />
    </mesh>
    <group position={indiaPin}>
      <mesh><sphereGeometry args={[0.07, 18, 18]} /><meshBasicMaterial color="#fff1b0" /></mesh>
      <mesh><sphereGeometry args={[0.19, 18, 18]} /><meshBasicMaterial color="#ffc76a" transparent opacity={0.22} /></mesh>
      <Html position={[0.22, 0.18, 0]} distanceFactor={8}><div className="india-label">INDIA <span>· ORIGIN</span></div></Html>
    </group>
    {districts.map((item, i) => <GlobeMarker key={item.id} item={item} position={markers[i]} onSelect={onSelect} />)}
  </group>;
}

function EarthScene({ onSelect }) {
  return <Canvas camera={{ position: [0, 0, 8.4], fov: 38 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}>
    <color attach="background" args={["#020611"]} />
    <fog attach="fog" args={["#020611", 16, 36]} />
    <ambientLight intensity={0.38} />
    <directionalLight position={[-5, 4, 7]} intensity={3.4} color="#d6e8ff" />
    <pointLight position={[5, -2, -4]} intensity={18} color="#1f5db0" distance={18} />
    <Stars radius={100} depth={65} count={4200} factor={4} saturation={0.3} fade speed={0.45} />
    <Suspense fallback={null}><Earth onSelect={onSelect} /></Suspense>
    <OrbitControls enablePan={false} enableZoom={false} minPolarAngle={Math.PI / 2.8} maxPolarAngle={Math.PI / 1.7} rotateSpeed={0.45} />
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
    <div className="world-canvas"><EarthScene onSelect={(id) => { setActive(id); setIntro(false); }} /></div>
    <div className="world-vignette" />
    <header className="world-topbar"><a className="wordmark" href="#top"><span className="wordmark-mark">M.</span><span>MOUNIKA <i>MADUPOJU</i></span></a><div className="topbar-center"><span className="live-dot" /> PERSONAL DIGITAL UNIVERSE</div><div className="topbar-actions"><a href="https://github.com/madupojumounika" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17}/></a><a href="https://www.linkedin.com/in/mounikamadupoju/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17}/></a><button onClick={() => setMuted(!muted)} aria-label="Toggle sound">{muted ? <VolumeX size={17}/> : <Volume2 size={17}/>}</button></div></header>
    <aside className="world-side"><span className="side-kicker">NAVIGATE THE WORLD</span>{districts.map((d) => <button key={d.id} className={active === d.id ? "side-link active" : "side-link"} onClick={() => { setActive(d.id); setIntro(false); }}><span>{d.number}</span>{d.name}</button>)}<div className="side-line"/><button className="side-link map-link" onClick={() => setShowMap(!showMap)}><Compass size={14}/> {showMap ? "Hide map" : "World map"}</button></aside>
    <section className="hero-copy" id="top"><div className="eyebrow"><span/> A DEVELOPER IN PROGRESS · HYDERABAD, INDIA</div><h1>Ideas become<br/><em>worlds.</em></h1><p>Hey, I'm Mounika — I build thoughtful digital experiences, explore new technologies and turn curious ideas into working projects.</p><div className="hero-actions"><button className="primary-cta" onClick={() => { setIntro(false); setActive("projects"); }}>Explore my work <ArrowUpRight size={16}/></button><a className="text-cta" href="mailto:madupojumounika0@gmail.com">Let's connect <ArrowUpRight size={15}/></a></div><div className="hero-note"><span className="note-rule"/> ROTATING EARTH · INDIA IS HOME</div></section>
    <div className="world-coordinates"><span>17°23' N</span><span className="coord-line"/><span>78°29' E</span><span className="coord-label">HYDERABAD / IN</span></div>
    <div className="world-controls"><div className="control-key"><Mouse size={14}/><span>DRAG TO ROTATE EARTH</span></div><div className="control-key"><span className="keycap">CLICK</span><span>EXPLORE DESTINATIONS</span></div><div className="control-key"><span className="keycap">ESC</span><span>CLOSE PANEL</span></div></div>
    <div className="world-status"><span className="status-pulse"/> EARTH IN MOTION <span className="status-sep">/</span> 5 DESTINATIONS <span className="status-sep">/</span> HYDERABAD, IN</div>
    {intro && <div className="intro-overlay"><div className="intro-card"><div className="intro-orbit"><div className="intro-globe"><span>EARTH</span></div><i/><b/></div><div className="intro-overline">WELCOME TO MY DIGITAL UNIVERSE</div><h2>One planet.<br/><em>A universe of ideas.</em></h2><p>Watch the Earth turn. Find India. Then explore my story, skills, projects and milestones across this digital universe.</p><button className="primary-cta" onClick={() => setIntro(false)}>Enter the universe <ArrowUpRight size={16}/></button><button className="skip-intro" onClick={() => setIntro(false)}>SKIP INTRO</button></div></div>}
    {selected && <div className="district-panel"><button className="panel-close" onClick={() => setActive(null)} aria-label="Close"><X size={18}/></button><div className="panel-overline" style={{ color: selected.color }}>{selected.number} / {selected.eyebrow}</div><h2>{selected.name}</h2><p className="panel-lead">{selected.description}</p><p className="panel-detail">{selected.detail}</p><div className="panel-facts">{selected.facts.map((f) => <div key={f}><span style={{ background: selected.color }}/>{f}</div>)}</div>{active === "projects" && <div className="project-links"><a href="https://github.com/madupojumounika/paypilot" target="_blank" rel="noreferrer">PayPilot <ArrowUpRight size={13}/></a><a href="https://github.com/madupojumounika/medlink" target="_blank" rel="noreferrer">MedLink <ArrowUpRight size={13}/></a><a href="https://github.com/madupojumounika/code-mentor" target="_blank" rel="noreferrer">Code Mentor <ArrowUpRight size={13}/></a><a href="https://github.com/madupojumounika/careerx" target="_blank" rel="noreferrer">CareerX <ArrowUpRight size={13}/></a></div>}{active === "contact" && <div className="contact-links"><a href="mailto:madupojumounika0@gmail.com"><Mail size={15}/> Email me</a><a href="https://www.linkedin.com/in/mounikamadupoju/" target="_blank" rel="noreferrer"><Linkedin size={15}/> LinkedIn</a></div>}<div className="panel-footer"><span>DESTINATION UNLOCKED</span><span>↗</span></div></div>}
    {showMap && <div className="map-panel"><div className="map-heading">WORLD AT A GLANCE <button onClick={() => setShowMap(false)}><X size={15}/></button></div><div className="map-grid">{districts.map((d) => <button key={d.id} onClick={() => { setActive(d.id); setShowMap(false); setIntro(false); }}><span style={{ background: d.color }}>{d.number}</span>{d.name}<ArrowUpRight size={13}/></button>)}</div></div>}
    <footer className="world-footer"><span>DESIGNED TO BE EXPLORED <Sparkles size={13}/></span><span>© 2026 MOUNIKA MADUPOJU</span><a href="mailto:madupojumounika0@gmail.com">SAY HELLO <ArrowUpRight size={13}/></a></footer>
  </main>;
}
