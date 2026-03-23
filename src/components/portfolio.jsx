import { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Mail, Phone, ExternalLink, ChevronDown, Code2, Database, Globe, Wrench, Award, BookOpen, Cpu, Menu, X, Download, Star, Zap, Terminal } from "lucide-react";


function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}


function Reveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}


function Typewriter({ words }) {
  const [idx, setIdx] = useState(0);
  const [sub, setSub] = useState(0);
  const [del, setDel] = useState(false);
  const [blink, setBlink] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => {
      if (!del) {
        if (sub < words[idx].length) setSub(s => s + 1);
        else { setTimeout(() => setDel(true), 1400); return; }
      } else {
        if (sub > 0) setSub(s => s - 1);
        else { setDel(false); setIdx(i => (i + 1) % words.length); }
      }
    }, del ? 45 : 85);
    return () => clearTimeout(t);
  }, [sub, del, idx, words]);
  useEffect(() => {
    const b = setInterval(() => setBlink(v => !v), 530);
    return () => clearInterval(b);
  }, []);
  return (
    <span>
      {words[idx].slice(0, sub)}
      <span style={{ opacity: blink ? 1 : 0, color: "#00d4ff" }}>|</span>
    </span>
  );
}


function Particles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const dots = Array.from({ length: 60 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.5 + 0.5,
    }));
    let raf;
    function draw() {
      ctx.clearRect(0, 0, w, h);
      dots.forEach(d => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,212,255,0.35)";
        ctx.fill();
      });
      dots.forEach((a, i) => dots.slice(i + 1).forEach(b => {
        const dx = a.x - b.x, dy = a.y - b.y, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(0,212,255,${0.08 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.6; ctx.stroke();
        }
      }));
      raf = requestAnimationFrame(draw);
    }
    draw();
    const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }} />;
}


const NAV = ["About", "Skills", "Projects", "Training", "Education", "Contact"];

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const scroll = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(8,12,20,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(0,212,255,0.1)" : "none",
      transition: "all 0.4s",
      padding: "0 5vw",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22, color: "#00d4ff", letterSpacing: 1 }}>
          SSD<span style={{ color: "#fff" }}>.</span>
        </span>
        <div style={{ display: "flex", gap: 32 }} className="desktop-nav">
          {NAV.map(n => (
            <button key={n} onClick={() => scroll(n)}
              style={{ background: "none", border: "none", color: "#a0aec0", fontSize: 14, fontWeight: 500, cursor: "pointer", letterSpacing: 0.5, transition: "color 0.2s", fontFamily: "'DM Mono', monospace" }}
              onMouseEnter={e => e.target.style.color = "#00d4ff"}
              onMouseLeave={e => e.target.style.color = "#a0aec0"}
            >{n}</button>
          ))}
        </div>
        <button onClick={() => setOpen(v => !v)} style={{ background: "none", border: "none", color: "#00d4ff", cursor: "pointer", display: "none" }} className="burger">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div style={{ background: "rgba(8,12,20,0.98)", padding: "12px 24px 24px", borderBottom: "1px solid rgba(0,212,255,0.15)" }}>
          {NAV.map(n => (
            <div key={n} style={{ padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
              <button onClick={() => scroll(n)} style={{ background: "none", border: "none", color: "#a0aec0", fontSize: 16, cursor: "pointer", fontFamily: "'DM Mono', monospace" }}>{n}</button>
            </div>
          ))}
        </div>
      )}
      <style>{`
        @media (max-width: 768px) { .desktop-nav { display: none !important; } .burger { display: block !important; } }
      `}</style>
    </nav>
  );
}


function Hero() {
  return (
    <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "radial-gradient(ellipse at 20% 50%, rgba(0,60,90,0.35) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(0,212,255,0.06) 0%, transparent 50%), #080c14" }}>
      <Particles />
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 24px", maxWidth: 800 }}>
        
        {/* Profile Photo Tag Added Here */}
        <div style={{ marginBottom: 24, display: "flex", justifyContent: "center" }}>
          <img 
            src="mine/my-portfolio/public/photo.png" 
            alt="Sai Satish Devara" 
            style={{ width: 150, height: 150, borderRadius: "50%", border: "4px solid #00d4ff", objectFit: "cover", boxShadow: "0 0 20px rgba(0,212,255,0.3)" }} 
          />
        </div>

        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.25)", borderRadius: 100, padding: "6px 18px", marginBottom: 32, animation: "fadeDown 0.8s ease" }}>
          <Zap size={14} color="#00d4ff" />
          <span style={{ color: "#00d4ff", fontSize: 13, fontFamily: "'DM Mono', monospace", letterSpacing: 1 }}>Available for opportunities</span>
        </div>

        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2.8rem, 7vw, 5.5rem)", lineHeight: 1.05, color: "#fff", margin: "0 0 16px", animation: "fadeUp 0.9s ease 0.1s both" }}>
          Sai Satish<br />
          <span style={{ background: "linear-gradient(135deg, #00d4ff, #0099cc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Devara</span>
        </h1>

        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "clamp(1rem, 2.5vw, 1.35rem)", color: "#64748b", marginBottom: 28, animation: "fadeUp 0.9s ease 0.2s both" }}>
          <Typewriter words={["Full-Stack Developer", "MERN Stack Engineer", "AI Integration Enthusiast", "Problem Solver"]} />
        </p>

        <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.8, maxWidth: 560, margin: "0 auto 44px", animation: "fadeUp 0.9s ease 0.3s both" }}>
          B.Tech CSE student at LPU crafting scalable web applications with the MERN stack and Generative AI — turning complex problems into elegant digital experiences.
        </p>

        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", animation: "fadeUp 0.9s ease 0.4s both" }}>
          {/* Resume Link with Download Attribute */}
          <a href="/my-resume.pdf" download="Sai_Satish_Devara_Resume.pdf"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#00d4ff", color: "#080c14", padding: "13px 28px", borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: "none", fontFamily: "'Syne', sans-serif", transition: "transform 0.2s, box-shadow 0.2s", boxShadow: "0 0 24px rgba(0,212,255,0.3)" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 0 40px rgba(0,212,255,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 0 24px rgba(0,212,255,0.3)"; }}
          >
            <Download size={16} /> Download Resume
          </a>
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#00d4ff", padding: "13px 28px", borderRadius: 8, fontWeight: 700, fontSize: 15, border: "1.5px solid rgba(0,212,255,0.4)", cursor: "pointer", fontFamily: "'Syne', sans-serif", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,212,255,0.08)"; e.currentTarget.style.borderColor = "#00d4ff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(0,212,255,0.4)"; }}
          >
            Let's Connect
          </button>
        </div>

        <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 48, animation: "fadeUp 0.9s ease 0.5s both" }}>
          {[
            { Icon: Github, href: "https://github.com/Satish-devara", label: "GitHub" },
            { Icon: Linkedin, href: "https://www.linkedin.com/in/saisatishd/", label: "LinkedIn" },
            { Icon: Mail, href: "mailto:saisatishdevara@gmail.com", label: "Email" },
          ].map(({ Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#64748b", transition: "all 0.2s", textDecoration: "none" }}
              onMouseEnter={e => { e.currentTarget.style.color = "#00d4ff"; e.currentTarget.style.borderColor = "rgba(0,212,255,0.4)"; e.currentTarget.style.background = "rgba(0,212,255,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#64748b"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
            ><Icon size={18} /></a>
          ))}
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", animation: "bounce 2s infinite", opacity: 0.4 }}>
        <ChevronDown size={24} color="#00d4ff" />
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeDown { from { opacity:0; transform:translateY(-12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }
      `}</style>
    </section>
  );
}

function Section({ id, title, subtitle, children, accent = false }) {
  return (
    <section id={id} style={{ padding: "100px 5vw", background: accent ? "rgba(0,212,255,0.015)" : "transparent", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <Reveal>
          <div style={{ marginBottom: 60, textAlign: "center" }}>
            <p style={{ color: "#00d4ff", fontFamily: "'DM Mono', monospace", fontSize: 13, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>{subtitle}</p>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 2.8rem)", color: "#fff", margin: 0 }}>{title}</h2>
            <div style={{ width: 48, height: 3, background: "linear-gradient(90deg, #00d4ff, transparent)", margin: "20px auto 0", borderRadius: 2 }} />
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

function About() {
  return (
    <Section id="about" title="About Me" subtitle="// who I am">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="grid-responsive">
        <Reveal>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: -20, top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, #00d4ff, transparent)" }} />
            <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.9, marginBottom: 20 }}>
              I am a <strong style={{ color: "#fff" }}>Mechanical Engineer turned Software Developer</strong>. Currently pursuing B.Tech CSE at LPU, I bridge the gap between industrial precision and digital innovation.
            </p>
            <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.9, marginBottom: 20 }}>
              With <strong style={{ color: "#fff" }}>2.5 years at Maruti Suzuki India Ltd</strong>, I developed a strong foundation in professional systems and workflow optimization, which I now apply to full-stack engineering.
            </p>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              { val: "2.5yrs", label: "MNC Experience" },
              { val: "8.23", label: "B.Tech CGPA" },
              { val: "250+", label: "LeetCode Solved" },
              { val: "MERN", label: "Specialization" },
            ].map(s => (
              <div key={s.label} style={{ background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.12)", borderRadius: 12, padding: "24px 10px", textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: "#00d4ff", fontFamily: "'Syne', sans-serif" }}>{s.val}</div>
                <div style={{ fontSize: 12, color: "#64748b", textTransform: "uppercase", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

const SKILLS = [
  { cat: "Languages", Icon: Terminal, items: ["Java", "C++", "JavaScript", "TypeScript", "Python"] },
  { cat: "Frontend", Icon: Globe, items: ["React.js", "Angular", "Tailwind CSS", "HTML5", "CSS3"] },
  { cat: "Backend", Icon: Cpu, items: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "bcrypt"] },
  { cat: "Database", Icon: Database, items: ["MongoDB", "MySQL", "PostgreSQL", "SQL"] },
  { cat: "Tools & Platforms", Icon: Wrench, items: ["Git / GitHub", "Postman", "VS Code", "Vercel", "CORS"] },
  { cat: "Soft Skills", Icon: Star, items: ["Problem-Solving", "Team Collaboration", "Communication", "Adaptability"] },
];

function Skills() {
  return (
    <Section id="skills" title="Technical Skills" subtitle="// what I use" accent>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
        {SKILLS.map(({ cat, Icon, items }, i) => (
          <Reveal key={cat} delay={i * 60}>
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "24px 22px", transition: "border-color 0.3s, transform 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.3)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = ""; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                <div style={{ width: 36, height: 36, background: "rgba(0,212,255,0.1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={18} color="#00d4ff" />
                </div>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#fff", fontSize: 15 }}>{cat}</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {items.map(item => (
                  <span key={item} style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.15)", borderRadius: 100, padding: "4px 12px", fontSize: 12, color: "#94a3b8", fontFamily: "'DM Mono', monospace" }}>{item}</span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

const PROJECTS = [
  {
    name: "Homease — Flat Searching Web App",
    date: "Jul 2025",
    live: "https://homease-omega.vercel.app/",
    github: null,
    goal: "Build an intelligent, user-centric rental flat search platform with accurate filtering, personalized property descriptions, and a modern, highly responsive interface.",
    built: "Developed the entire MERN-stack application with a clean, responsive UI, optimized backend search queries, and integrated Generative AI to create dynamic, personalized flat and user-profile descriptions.",
    outcome: "Fast, AI-powered rental discovery platform with intuitive filtering, rich property insights, and a seamless, personalized home-search experience across all devices.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind", "Gen AI", "JWT", "bcrypt", "CORS"],
    highlight: "AI-Powered",
    color: "#00d4ff",
  },
  {
    name: "SmartLearn — Learning Platform for Students",
    date: "Nov 2025",
    live: null,
    github: "https://github.com/vivekfaujdar01/SmartLearn.git",
    goal: "Build a secure, responsive, and organized e-learning platform where students can attend classes, take quizzes, and track progress.",
    built: "Developed a fully responsive React + Tailwind front-end, built secure REST APIs with JWT authentication, and managed a well-structured MongoDB database for courses, users, quizzes, and progress.",
    outcome: "Scalable, optimized platform with smooth navigation, secure login, and accurate progress tracking, resulting in improved user engagement and strong system performance.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind", "JWT", "bcrypt", "CORS", "HTML", "CSS"],
    highlight: "MERN Stack",
    color: "#10b981",
  },
];

function Projects() {
  return (
    <Section id="projects" title="Projects" subtitle="// what I've built">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(440px, 1fr))", gap: 28 }}>
        {PROJECTS.map((p, i) => (
          <Reveal key={p.name} delay={i * 120}>
            <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid rgba(255,255,255,0.07)`, borderRadius: 16, overflow: "hidden", height: "100%", display: "flex", flexDirection: "column", transition: "border-color 0.3s, transform 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `rgba(${p.color === "#00d4ff" ? "0,212,255" : "16,185,129"},0.35)`; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.transform = ""; }}
            >
              <div style={{ background: `linear-gradient(135deg, ${p.color}18, transparent)`, borderBottom: `1px solid ${p.color}22`, padding: "20px 24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, color: "#fff", margin: 0, lineHeight: 1.3 }}>{p.name}</h3>
                  <span style={{ background: `${p.color}22`, border: `1px solid ${p.color}44`, borderRadius: 100, padding: "3px 10px", fontSize: 11, color: p.color, fontFamily: "'DM Mono', monospace", whiteSpace: "nowrap" }}>{p.highlight}</span>
                </div>
                <p style={{ color: "#475569", fontSize: 12, fontFamily: "'DM Mono', monospace", marginTop: 6 }}>{p.date}</p>
              </div>
              <div style={{ padding: "20px 24px", flex: 1, display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <p style={{ color: "#475569", fontSize: 11, fontFamily: "'DM Mono', monospace", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>Goal</p>
                  <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{p.goal}</p>
                </div>
                <div>
                  <p style={{ color: "#475569", fontSize: 11, fontFamily: "'DM Mono', monospace", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>Built</p>
                  <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{p.built}</p>
                </div>
                <div>
                  <p style={{ color: "#475569", fontSize: 11, fontFamily: "'DM Mono', monospace", marginBottom: 4, textTransform: "uppercase", letterSpacing: 1 }}>Outcome</p>
                  <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.7, margin: 0 }}>{p.outcome}</p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                  {p.tech.map(t => (
                    <span key={t} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 6, padding: "3px 9px", fontSize: 11, color: "#64748b", fontFamily: "'DM Mono', monospace" }}>{t}</span>
                  ))}
                </div>
              </div>
              <div style={{ padding: "14px 24px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: 12 }}>
                {p.live && (
                  <a href={p.live} target="_blank" rel="noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 6, color: p.color, fontSize: 13, textDecoration: "none", fontFamily: "'DM Mono', monospace", fontWeight: 600 }}>
                    <ExternalLink size={13} /> Live Demo
                  </a>
                )}
                {p.github && (
                  <a href={p.github} target="_blank" rel="noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#64748b", fontSize: 13, textDecoration: "none", fontFamily: "'DM Mono', monospace", transition: "color 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#fff"}
                    onMouseLeave={e => e.currentTarget.style.color = "#64748b"}
                  >
                    <Github size={13} /> GitHub
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

const CERTS = [
  { name: "Angular", issuer: "Infosys Springboard", date: "Jul 2025", href: "https://drive.google.com/file/d/1L00-cYJcg-EzmCsjld8OWp_aNAldGQpB/view?usp=sharing", img: "/cert1.jpg" },
  { name: "MERN Stack", issuer: "w3Grad Schools", date: "Jul 2025", href: "https://drive.google.com/file/d/12vj80hef2JBIz2mLEk-iEBqERaZ3eXVR/view?usp=drive_link", img: "/cert2.jpg" },
  { name: "TypeScript", issuer: "Infosys Springboard", date: "Jul 2025", href: "https://drive.google.com/file/d/1ceLJx8fNwB9DyBz22plCr_Ou5dAy_DwZ/view?usp=sharing", img: "/cert3.jpg" },
  { name: "JavaScript", issuer: "Infosys Springboard", date: "Jun 2025", href: "https://drive.google.com/file/d/1s6gNnSrppxKGwtkeKC_qhSlgxcg5XfBN/view?usp=sharing", img: "/cert4.jpg" },
];

function Training() {
  return (
    <Section id="training" title="Training & Certificates" subtitle="// continuous learning" accent>
      <Reveal>
        <div style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.06), rgba(0,212,255,0.02))", border: "1px solid rgba(0,212,255,0.2)", borderRadius: 16, padding: "32px 36px", marginBottom: 40 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
            <div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: "#fff", margin: "0 0 6px" }}>MERN Stack with Generative AI</h3>
              <p style={{ color: "#00d4ff", fontFamily: "'DM Mono', monospace", fontSize: 14, margin: 0 }}>w3Grad Schools</p>
            </div>
            <span style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.25)", borderRadius: 8, padding: "6px 14px", fontSize: 13, color: "#00d4ff", fontFamily: "'DM Mono', monospace" }}>Jun 2025 – Jul 2025</span>
          </div>
          <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              "Completed an intensive MERN stack program gaining strong foundation in HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB through structured lessons and hands-on practice.",
              "Developed multiple full-stack mini-projects applying real-world development workflows — API development, database operations, component-based UI design, and state management.",
              "Integrated Generative AI concepts by building features such as content generation and intelligent automation, enabling deeper understanding of AI-enhanced MERN applications.",
            ].map((pt, i) => (
              <li key={i} style={{ display: "flex", gap: 12, color: "#94a3b8", fontSize: 15, lineHeight: 1.7 }}>
                <span style={{ color: "#00d4ff", marginTop: 4, flexShrink: 0 }}>›</span>
                {pt}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: 16 }}>
        {CERTS.map((c, i) => (
          <Reveal key={c.name} delay={i * 60}>
            <a href={c.href} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden", transition: "all 0.2s" }}>
                {/* Certificate Photo Added Here */}
                <img src={c.img} alt={c.name} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                <div style={{ padding: "18px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                    <Award size={16} color="#00d4ff" />
                    <span style={{ color: "#fff", fontWeight: 600, fontSize: 14, fontFamily: "'Syne', sans-serif" }}>{c.name}</span>
                  </div>
                  <p style={{ color: "#475569", fontSize: 12, fontFamily: "'DM Mono', monospace", margin: 0 }}>{c.issuer}</p>
                  <p style={{ color: "#334155", fontSize: 11, fontFamily: "'DM Mono', monospace", marginTop: 4 }}>{c.date}</p>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

const EDU = [
  { degree: "B.Tech — Computer Science & Engineering", school: "Lovely Professional University", location: "Phagwara, Punjab", period: "Aug 2024 – Present", stat: "CGPA: 8.23", current: true, icon: "🎓" },
  { degree: "Diploma — Mechanical Engineering", school: "Andhra Polytechnic College", location: "Kakinada, Andhra Pradesh", period: "Jun 2018 – Sep 2021", stat: "85.57%", current: false, icon: "⚙️" },
  { degree: "Matriculation (10th)", school: "Sri Vivekananda EM School", location: "Kasimkota, Andhra Pradesh", period: "Jun 2017 – Mar 2018", stat: "CGPA: 9.7", current: false, icon: "📚" },
];

function Education() {
  return (
    <Section id="education" title="Education" subtitle="// academic journey">
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {EDU.map((e, i) => (
          <Reveal key={e.degree} delay={i * 80}>
            <div style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${e.current ? "rgba(0,212,255,0.25)" : "rgba(255,255,255,0.07)"}`, borderRadius: 14, padding: "26px 28px", display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
              <div style={{ width: 52, height: 52, background: e.current ? "rgba(0,212,255,0.1)" : "rgba(255,255,255,0.04)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{e.icon}</div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
                  <div>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, color: "#fff", margin: "0 0 4px" }}>{e.degree}</h3>
                    <p style={{ color: e.current ? "#00d4ff" : "#64748b", fontSize: 14, margin: "0 0 2px", fontWeight: 600 }}>{e.school}</p>
                    <p style={{ color: "#475569", fontSize: 13, fontFamily: "'DM Mono', monospace", margin: 0 }}>{e.location}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ background: e.current ? "rgba(0,212,255,0.1)" : "rgba(255,255,255,0.04)", border: `1px solid ${e.current ? "rgba(0,212,255,0.3)" : "rgba(255,255,255,0.08)"}`, borderRadius: 8, padding: "4px 12px", fontSize: 13, color: e.current ? "#00d4ff" : "#64748b", fontFamily: "'DM Mono', monospace", display: "block", marginBottom: 6 }}>{e.stat}</span>
                    <span style={{ fontSize: 12, color: "#334155", fontFamily: "'DM Mono', monospace" }}>{e.period}</span>
                    {e.current && <span style={{ display: "block", marginTop: 4, fontSize: 11, color: "#10b981", fontFamily: "'DM Mono', monospace" }}>● Active</span>}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = () => { setSent(true); setForm({ name: "", email: "", message: "" }); };
  const inputStyle = { width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "13px 16px", color: "#e2e8f0", fontSize: 15, outline: "none", fontFamily: "'DM Mono', monospace", boxSizing: "border-box", transition: "border-color 0.2s" };
  return (
    <Section id="contact" title="Get In Touch" subtitle="// let's talk" accent>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
        <Reveal>
          <div>
            <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.9, marginBottom: 36 }}>I'm actively looking for full-stack developer roles and internship opportunities. Whether you have a project, a question, or just want to connect — my inbox is always open.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {[ { Icon: Mail, label: "saisatishdevara@gmail.com", href: "mailto:saisatishdevara@gmail.com" }, { Icon: Phone, label: "+91 6309708759", href: "tel:+916309708759" }, { Icon: Github, label: "github.com/Satish-devara", href: "https://github.com/Satish-devara" }, { Icon: Linkedin, label: "linkedin.com/in/saisatishd", href: "https://www.linkedin.com/in/saisatishd/" } ].map(({ Icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none", padding: "14px 18px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.3)"; e.currentTarget.style.background = "rgba(0,212,255,0.04)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}>
                  <Icon size={16} color="#00d4ff" />
                  <span style={{ color: "#94a3b8", fontSize: 14, fontFamily: "'DM Mono', monospace" }}>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          {sent ? ( <div style={{ textAlign: "center", padding: 60 }}> <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div> <h3 style={{ fontFamily: "'Syne', sans-serif", color: "#fff", marginBottom: 8 }}>Message Sent!</h3> <p style={{ color: "#64748b" }}>I'll get back to you soon.</p> <button onClick={() => setSent(false)} style={{ marginTop: 20, background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", borderRadius: 8, color: "#00d4ff", padding: "10px 20px", cursor: "pointer", fontFamily: "'DM Mono', monospace", fontSize: 13 }}>Send Another</button> </div>
          ) : ( <div style={{ display: "flex", flexDirection: "column", gap: 16 }}> {[ { name: "name", placeholder: "Your Name", type: "text" }, { name: "email", placeholder: "Your Email", type: "email" } ].map(f => ( <input key={f.name} {...f} value={form[f.name]} onChange={handle} style={inputStyle} onFocus={e => e.target.style.borderColor = "rgba(0,212,255,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} /> ))} <textarea name="message" placeholder="Your Message" rows={5} value={form.message} onChange={handle} style={{ ...inputStyle, resize: "vertical" }} onFocus={e => e.target.style.borderColor = "rgba(0,212,255,0.5)"} onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"} /> <button onClick={submit} style={{ background: form.name && form.email && form.message ? "#00d4ff" : "rgba(0,212,255,0.2)", color: form.name && form.email && form.message ? "#080c14" : "#64748b", border: "none", borderRadius: 10, padding: "14px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'Syne', sans-serif", transition: "all 0.2s", boxShadow: form.name && form.email && form.message ? "0 0 20px rgba(0,212,255,0.3)" : "none" }} onMouseEnter={e => { if (form.name && form.email && form.message) e.currentTarget.style.boxShadow = "0 0 36px rgba(0,212,255,0.5)"; }} onMouseLeave={e => { if (form.name && form.email && form.message) e.currentTarget.style.boxShadow = "0 0 20px rgba(0,212,255,0.3)"; }}> Send Message </button> </div> )}
        </Reveal>
      </div>
      <style>{`@media(max-width:768px){#contact .grid{grid-template-columns:1fr !important;}}`}</style>
    </Section>
  );
}


export default function Portfolio() {
  return (
    <div style={{ background: "#080c14", minHeight: "100vh", fontFamily: "'DM Sans', sans-serif", color: "#e2e8f0" }}>
      {/* CSS FIX FOR FULL BACKGROUND SPREAD */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { 
          scroll-behavior: smooth; 
          background: #080c14; 
          width: 100%;
          min-height: 100%;
          overflow-x: hidden;
        }
        ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-track { background: #080c14; } ::-webkit-scrollbar-thumb { background: rgba(0,212,255,0.3); border-radius: 3px; }
      `}</style>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Training />
      <Education />
      <Contact />
      <footer style={{ padding: "32px 5vw", borderTop: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
        <p style={{ color: "#334155", fontSize: 13, fontFamily: "'DM Mono', monospace" }}>
          Crafted with ⚡ by <span style={{ color: "#00d4ff" }}>Sai Satish Devara</span> · 2026
        </p>
      </footer>
    </div>
  );
}