import React, { useState, useEffect, useRef } from 'react';

const scssStyles = `
/* Modern CSS with SCSS-like variables, nesting, and keyframes */
:root {
  --bg-dark: #0a0e1a;
  --bg-card: rgba(22, 31, 56, 0.75);
  --bg-card-border: rgba(255, 255, 255, 0.1);
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --accent-cyan: #38bdf8;
  --accent-pink: #f43f5e;
  --accent-yellow: #fbbf24;
  --accent-green: #34d399;
  --accent-purple: #c084fc;
  --glow-shadow: 0 0 25px rgba(56, 189, 248, 0.3);
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  --transition-fast: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-smooth: 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg-dark);
  color: var(--text-primary);
  font-family: var(--font-family);
  overflow-x: hidden;
}

.error-page-container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  background: radial-gradient(circle at 50% 30%, #1e1b4b 0%, #0f172a 60%, #020617 100%);
  overflow: hidden;
  user-select: none;
}

/* Background Animated Stars */
.starfield {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.star {
  position: absolute;
  background-color: #ffffff;
  border-radius: 50%;
  animation: starTwinkle var(--duration, 3s) infinite ease-in-out var(--delay, 0s);
}

@keyframes starTwinkle {
  0%, 100% { opacity: 0.2; transform: scale(0.8); }
  50% { opacity: 0.9; transform: scale(1.3); }
}

/* Dynamic Grid Lines */
.cyber-grid {
  position: absolute;
  width: 200%;
  height: 200%;
  top: -50%;
  left: -50%;
  background-image: 
    linear-gradient(to right, rgba(56, 189, 248, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(56, 189, 248, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  transform: perspective(500px) rotateX(60deg);
  animation: gridMove 20s linear infinite;
  pointer-events: none;
  z-index: 1;
}

@keyframes gridMove {
  0% { transform: perspective(500px) rotateX(60deg) translateY(0); }
  100% { transform: perspective(500px) rotateX(60deg) translateY(50px); }
}

/* Top Demo Switcher Navigation */
.error-type-selector {
  position: relative;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--bg-card-border);
  flex-wrap: wrap;
}

.selector-label {
  font-size: 0.85rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  margin-right: 8px;
}

.selector-btn {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-secondary);
  padding: 6px 14px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  transition: var(--transition-fast);
}

.selector-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: var(--text-primary);
}

.selector-btn.active {
  background: var(--accent-cyan);
  color: #020617;
  border-color: var(--accent-cyan);
  font-weight: 700;
  box-shadow: 0 0 12px rgba(56, 189, 248, 0.4);
}

/* Main Content Area */
.main-wrapper {
  position: relative;
  z-index: 10;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.error-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  width: 100%;
}

@media (max-width: 900px) {
  .error-hero {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }
}

/* 2D Canvas / Animation Display Box */
.animation-stage {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 380px;
  width: 100%;
}

/* SVG Scene Floating Elements */
.svg-wrapper {
  width: 100%;
  max-width: 440px;
  height: auto;
  filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.5));
  transition: transform 0.1s ease-out;
}

/* Eye Pupil Motion */
.eye-pupil {
  transition: transform 0.05s ease-out;
}

/* Glitch Animation Effects */
.glitch-code {
  font-size: clamp(4rem, 10vw, 7.5rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -2px;
  background: linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-pink) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  display: inline-block;
  margin-bottom: 0.5rem;
}

.glitch-code::before,
.glitch-code::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-pink) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.glitch-code::before {
  left: 2px;
  text-shadow: -2px 0 #f43f5e;
  clip: rect(24px, 550px, 90px, 0);
  animation: glitch-anim-1 3s infinite linear alternate-reverse;
}

.glitch-code::after {
  left: -2px;
  text-shadow: -2px 0 #38bdf8;
  clip: rect(85px, 550px, 140px, 0);
  animation: glitch-anim-2 2.5s infinite linear alternate-reverse;
}

@keyframes glitch-anim-1 {
  0% { clip: rect(10px, 9999px, 30px, 0); }
  20% { clip: rect(40px, 9999px, 80px, 0); }
  40% { clip: rect(15px, 9999px, 55px, 0); }
  60% { clip: rect(70px, 9999px, 25px, 0); }
  80% { clip: rect(30px, 9999px, 90px, 0); }
  100% { clip: rect(5px, 9999px, 60px, 0); }
}

@keyframes glitch-anim-2 {
  0% { clip: rect(60px, 9999px, 10px, 0); }
  20% { clip: rect(10px, 9999px, 50px, 0); }
  40% { clip: rect(80px, 9999px, 20px, 0); }
  60% { clip: rect(25px, 9999px, 85px, 0); }
  80% { clip: rect(50px, 9999px, 30px, 0); }
  100% { clip: rect(90px, 9999px, 40px, 0); }
}

/* Typography & Info */
.error-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.error-title {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1.2;
}

.error-description {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 520px;
}

/* Interactive Cable Reconnect Box */
.cable-fix-hint {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: rgba(56, 189, 248, 0.1);
  border: 1px dashed var(--accent-cyan);
  padding: 10px 16px;
  border-radius: 12px;
  font-size: 0.9rem;
  color: var(--accent-cyan);
  margin-top: 0.5rem;
  animation: pulseBorder 2s infinite;
}

@keyframes pulseBorder {
  0%, 100% { border-color: rgba(56, 189, 248, 0.4); }
  50% { border-color: rgba(56, 189, 248, 1); }
}

.action-buttons {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  flex-wrap: wrap;
}

@media (max-width: 900px) {
  .action-buttons {
    justify-content: center;
  }
  .error-info {
    align-items: center;
  }
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(135deg, var(--accent-cyan) 0%, #0284c7 100%);
  color: #ffffff;
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: var(--transition-smooth);
  box-shadow: 0 4px 20px rgba(56, 189, 248, 0.3);
  text-decoration: none;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(56, 189, 248, 0.5);
}

.btn-primary:active {
  transform: translateY(0);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
  padding: 14px 24px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  border: 1px solid var(--bg-card-border);
  cursor: pointer;
  transition: var(--transition-fast);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.25);
}

/* Technical Details Expandable Drawer */
.tech-details-container {
  margin-top: 2rem;
  width: 100%;
  max-width: 800px;
}

.tech-details-toggle {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 0;
  transition: color 0.2s;
  margin: 0 auto;
}

.tech-details-toggle:hover {
  color: var(--accent-cyan);
}

.tech-details-content {
  margin-top: 12px;
  background: var(--bg-card);
  border: 1px solid var(--bg-card-border);
  border-radius: 16px;
  padding: 18px;
  text-align: left;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  animation: slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.tech-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}

.tech-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--accent-yellow);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.copy-btn {
  background: rgba(255,255,255,0.08);
  border: none;
  color: var(--text-secondary);
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: var(--transition-fast);
}

.copy-btn:hover {
  background: var(--accent-cyan);
  color: #000;
}

.code-box {
  background: rgba(0, 0, 0, 0.4);
  padding: 12px;
  border-radius: 8px;
  font-family: "Courier New", Courier, monospace;
  font-size: 0.8rem;
  color: #e2e8f0;
  overflow-x: auto;
  max-height: 180px;
  white-space: pre-wrap;
  word-break: break-all;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

/* Success Toast for Reconnect Mini-game */
.toast-notification {
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: var(--accent-green);
  color: #020617;
  padding: 14px 20px;
  border-radius: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 10px 25px rgba(52, 211, 153, 0.4);
  z-index: 100;
  animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes popIn {
  from { opacity: 0; transform: scale(0.8) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

/* Floating animation elements */
.floating-gear {
  transform-origin: center;
  animation: spinGear 12s linear infinite;
}

.floating-gear-reverse {
  transform-origin: center;
  animation: spinGearRev 16s linear infinite;
}

@keyframes spinGear {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes spinGearRev {
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
}

.antenna-pulse {
  animation: antennaGlow 1.5s ease-in-out infinite alternate;
}

@keyframes antennaGlow {
  from { fill: var(--accent-pink); filter: drop-shadow(0 0 2px var(--accent-pink)); }
  to { fill: var(--accent-cyan); filter: drop-shadow(0 0 12px var(--accent-cyan)); }
}

.spark-particle {
  animation: sparkFade 0.6s infinite ease-out;
}

@keyframes sparkFade {
  0% { opacity: 1; transform: translate(0, 0) scale(1); }
  100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(0); }
}
`;

const ERROR_PRESETS = {
  404: {
    code: '404',
    title: 'Lost in Digital Space',
    description: "The page you are looking for has floated into a black hole or never existed in this dimension.",
    color: '#38bdf8',
    statusTag: 'PAGE NOT FOUND',
    techDetail: 'Error: 404 HTTP_NOT_FOUND\nPath: /requested-route-unknown\nTimestamp: ' + new Date().toISOString()
  },
  500: {
    code: '500',
    title: 'Server Circuit Overload',
    description: "Our back-end robots encountered a temporary short circuit. We are rewiring the subroutines right now.",
    color: '#f43f5e',
    statusTag: 'INTERNAL SERVER ERROR',
    techDetail: 'Error 500: NullPointer / Database connection timeout\nAt line 142 in auth_service.py\nStack trace: Exception in thread "main" java.lang.RuntimeException'
  },
  403: {
    code: '403',
    title: 'Access Shield Active',
    description: "Halt traveler! You do not possess the digital clearance pass required to view this sector.",
    color: '#c084fc',
    statusTag: 'FORBIDDEN ACCESS',
    techDetail: 'Error: 403 HTTP_FORBIDDEN\nReason: Missing Bearer Token or Insufficient Permissions (Role: GUEST)'
  },
  OFFLINE: {
    code: 'OFFLINE',
    title: 'Signals Disconnected',
    description: "Your network beam was lost. Please check your internet cable or router connection.",
    color: '#fbbf24',
    statusTag: 'NO CONNECTION',
    techDetail: 'Error: NetworkError when fetching resource.\nStatus: net::ERR_INTERNET_DISCONNECTED'
  }
};

export default function AnimatedErrorPage({ 
  errorCode = '404', 
  customMessage, 
  customTitle,
  onRetry, 
  onGoHome 
}) {
  const [activeCode, setActiveCode] = useState(errorCode);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isCableConnected, setIsCableConnected] = useState(false);
  const [showTechDetails, setShowTechDetails] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  const containerRef = useRef(null);

  const activeError = ERROR_PRESETS[activeCode] || ERROR_PRESETS['404'];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleCableClick = () => {
    if (!isCableConnected) {
      setIsCableConnected(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    } else {
      setIsCableConnected(false);
    }
  };

  const handleCopyTech = () => {
    navigator.clipboard.writeText(activeError.techDetail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderRobotScene = () => {
    // Parallax eye movement math
    const eyeOffsetX = mousePos.x * 12;
    const eyeOffsetY = mousePos.y * 12;

    return (
      <svg className="svg-wrapper" viewBox="0 0 500 450" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Ambient Glow Aura */}
        <circle cx="250" cy="230" r="180" fill={activeError.color} opacity="0.12" filter="blur(30px)" />

        {/* Orbit Ring */}
        <ellipse cx="250" cy="250" rx="210" ry="60" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="6 6" />

        {/* Floating Satellite Background Object */}
        <g transform={`translate(${mousePos.x * -20}, ${mousePos.y * -20})`}>
          <circle cx="90" cy="110" r="16" fill="#1e293b" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          <line x1="74" y1="110" x2="106" y2="110" stroke="#38bdf8" strokeWidth="2" />
          <line x1="90" y1="94" x2="90" y2="126" stroke="#38bdf8" strokeWidth="2" />
        </g>

        {/* Floating Gear Element */}
        <g className="floating-gear" transform="translate(390, 100)">
          <path d="M0 -15 L4 -15 L6 -10 L11 -11 L13 -6 L18 -4 L16 1 L19 5 L15 9 L16 14 L11 14 L8 18 L3 17 L0 21 L-3 17 L-8 18 L-11 14 L-16 14 L-15 9 L-19 5 L-16 1 L-18 -4 L-13 -6 L-11 -11 L-6 -10 Z" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
          <circle cx="0" cy="0" r="6" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
        </g>

        {/* Shadow under Robot */}
        <ellipse cx="250" cy="380" rx={80 + mousePos.y * 10} ry="12" fill="rgba(0,0,0,0.4)" filter="blur(4px)" />

        {/* Main Robot Body Group with Parallax Floating */}
        <g transform={`translate(${mousePos.x * 15}, ${mousePos.y * 15 - 10})`}>
          
          {/* Antenna Body */}
          <line x1="250" y1="140" x2="250" y2="90" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
          <circle cx="250" cy="82" r="10" className="antenna-pulse" />

          {/* Robot Ears / Bolts */}
          <rect x="155" y="175" width="12" height="24" rx="4" fill="#475569" />
          <rect x="333" y="175" width="12" height="24" rx="4" fill="#475569" />

          {/* Robot Head */}
          <rect x="165" y="130" width="170" height="115" rx="24" fill="#1e293b" stroke="#334155" strokeWidth="4" />
          
          {/* Screen Visor */}
          <rect x="180" y="145" width="140" height="85" rx="16" fill="#0f172a" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />

          {/* Robot Eyes (Interactive mouse tracking) */}
          {isCableConnected ? (
            /* Happy Eyes when Cable Connected */
            <g>
              <path d="M 200 185 Q 215 170 230 185" fill="none" stroke={varColor('--accent-green')} strokeWidth="5" strokeLinecap="round" />
              <path d="M 270 185 Q 285 170 300 185" fill="none" stroke={varColor('--accent-green')} strokeWidth="5" strokeLinecap="round" />
            </g>
          ) : activeCode === '500' ? (
            /* X_X Dead Eyes for 500 Server Error */
            <g stroke={activeError.color} strokeWidth="4" strokeLinecap="round">
              <line x1="200" y1="175" x2="220" y2="195" />
              <line x1="220" y1="175" x2="200" y2="195" />
              <line x1="280" y1="175" x2="300" y2="195" />
              <line x1="300" y1="175" x2="280" y2="195" />
            </g>
          ) : (
            /* Glowing Expressive Eyes Following Cursor */
            <g>
              {/* Left Eye socket & pupil */}
              <circle cx="215" cy="185" r="16" fill="#020617" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
              <circle 
                className="eye-pupil" 
                cx={215 + eyeOffsetX} 
                cy={185 + eyeOffsetY} 
                r="7" 
                fill={activeError.color} 
              />
              <circle cx={213 + eyeOffsetX} cy={182 + eyeOffsetY} r="2" fill="#ffffff" />

              {/* Right Eye socket & pupil */}
              <circle cx="285" cy="185" r="16" fill="#020617" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
              <circle 
                className="eye-pupil" 
                cx={285 + eyeOffsetX} 
                cy={185 + eyeOffsetY} 
                r="7" 
                fill={activeError.color} 
              />
              <circle cx={283 + eyeOffsetX} cy={182 + eyeOffsetY} r="2" fill="#ffffff" />
            </g>
          )}

          {/* Robot Mouth */}
          {isCableConnected ? (
            <path d="M 230 212 Q 250 225 270 212" fill="none" stroke={varColor('--accent-green')} strokeWidth="4" strokeLinecap="round" />
          ) : (
            <rect x="230" y="212" width="40" height="6" rx="3" fill="#475569" />
          )}

          {/* Neck */}
          <rect x="235" y="245" width="30" height="15" fill="#334155" rx="3" />

          {/* Robot Torso Body */}
          <rect x="185" y="260" width="130" height="100" rx="20" fill="#1e293b" stroke="#334155" strokeWidth="4" />

          {/* Chest Display Light */}
          <rect x="210" y="280" width="80" height="35" rx="8" fill="#0f172a" />
          <circle cx="230" cy="297" r="5" fill={isCableConnected ? "#34d399" : activeError.color} />
          <line x1="245" y1="297" x2="275" y2="297" stroke="#334155" strokeWidth="4" strokeLinecap="round" />

          {/* Interactive Cable & Plug Component */}
          <g onClick={handleCableClick} style={{ cursor: 'pointer' }}>
            {/* Cable Socket on Body */}
            <rect x="160" y="300" width="25" height="20" rx="4" fill="#334155" />
            <circle cx="170" cy="310" r="4" fill="#020617" />

            {/* Dangling Cable or Plugged In Cable */}
            {isCableConnected ? (
              <path d="M 170 310 L 100 310 C 70 310, 60 370, 110 370" fill="none" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
            ) : (
              <g>
                {/* Loose Disconnected Cable with Sparks */}
                <path d="M 140 330 C 110 340, 100 380, 130 390" fill="none" stroke="#f43f5e" strokeWidth="5" strokeDasharray="4 2" strokeLinecap="round" />
                <circle cx="130" cy="390" r="6" fill="#f43f5e" />
                
                {/* Animated Sparks around disconnected plug */}
                <line x1="130" y1="390" x2="140" y2="385" stroke="#fbbf24" strokeWidth="2" className="spark-particle" style={{ '--dx': '10px', '--dy': '-5px' }} />
                <line x1="130" y1="390" x2="120" y2="400" stroke="#fbbf24" strokeWidth="2" className="spark-particle" style={{ '--dx': '-10px', '--dy': '10px' }} />
              </g>
            )}
          </g>

        </g>
      </svg>
    );
  };

  // Helper for inline CSS color lookups inside SVG
  function varColor(variableName) {
    if (variableName === '--accent-green') return '#34d399';
    return '#38bdf8';
  }

  return (
    <>
      <style>{scssStyles}</style>

      <div className="error-page-container" ref={containerRef}>
        
        {/* Dynamic Starfield Background */}
        <div className="starfield">
          {Array.from({ length: 35 }).map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                top: `${(i * 17) % 100}%`,
                left: `${(i * 29) % 100}%`,
                width: `${(i % 3) + 2}px`,
                height: `${(i % 3) + 2}px`,
                '--duration': `${2 + (i % 4)}s`,
                '--delay': `${(i % 3) * 0.7}s`
              }}
            />
          ))}
        </div>

        {/* Dynamic Moving Grid Floor */}
        <div className="cyber-grid" />

        {/* Top Header Switcher (Useful for demoing multiple error state previews) */}
        <header className="error-type-selector">
          <span className="selector-label">Test Error Preset:</span>
          {Object.keys(ERROR_PRESETS).map((code) => (
            <button
              key={code}
              className={`selector-btn ${activeCode === code ? 'active' : ''}`}
              onClick={() => {
                setActiveCode(code);
                setIsCableConnected(false);
              }}
            >
              {code}
            </button>
          ))}
        </header>

        {/* Main Content Area */}
        <main className="main-wrapper">
          <div className="error-hero">
            
            {/* Left 2D Interactive Scene */}
            <div className="animation-stage">
              {renderRobotScene()}
            </div>

            {/* Right Information & Controls */}
            <div className="error-info">
              
              <div 
                className="glitch-code" 
                data-text={activeError.code}
                style={{
                  background: `linear-gradient(135deg, ${activeError.color} 0%, #ffffff 100%)`,
                  WebkitBackgroundClip: 'text'
                }}
              >
                {activeError.code}
              </div>

              <h1 className="error-title">
                {customTitle || activeError.title}
              </h1>

              <p className="error-description">
                {customMessage || activeError.description}
              </p>

              {/* Interactive cable reconnect hint box */}
              <div 
                className="cable-fix-hint" 
                onClick={handleCableClick}
                style={{ cursor: 'pointer' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2v10M18 8v4a6 6 0 0 1-12 0V8M12 18v4" />
                </svg>
                <span>
                  {isCableConnected 
                    ? '✨ Power Cable Reconnected! Systems Nominal.' 
                    : '💡 Interactive Tip: Click the spark wire on the robot to plug in!'}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="action-buttons">
                <button 
                  className="btn-primary" 
                  onClick={onGoHome || (() => window.location.href = '/')}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  <span>Back to Home</span>
                </button>

                <button 
                  className="btn-secondary" 
                  onClick={onRetry || (() => window.location.reload())}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="23 4 23 10 17 10" />
                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                  </svg>
                  <span>Try Again</span>
                </button>
              </div>

            </div>
          </div>

          {}
          <div className="tech-details-container">
            <button 
              className="tech-details-toggle" 
              onClick={() => setShowTechDetails(!showTechDetails)}
            >
              <svg 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                style={{ transform: showTechDetails ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
              <span>{showTechDetails ? 'Hide' : 'View'} Developer Diagnostics & Logs</span>
            </button>

            {showTechDetails && (
              <div className="tech-details-content">
                <div className="tech-header">
                  <span className="tech-title">System Error Diagnostics ({activeError.statusTag})</span>
                  <button className="copy-btn" onClick={handleCopyTech}>
                    {copied ? 'Copied!' : 'Copy Log'}
                  </button>
                </div>
                <div className="code-box">
                  {activeError.techDetail}
                </div>
              </div>
            )}
          </div>

        </main>

        {/* Floating Toast Notification on Puzzle Win */}
        {showToast && (
          <div className="toast-notification">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Circuit restored! Robot core is operational.</span>
          </div>
        )}

      </div>
    </>
  );
}