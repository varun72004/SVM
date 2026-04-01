import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, FileText, X, ChevronDown, Info, Sparkles } from "lucide-react";

// 2D Scatter Plot Component
function ScatterPlot2D() {
  const points = useMemo(() => {
    const pts = [];
    // Generate some clusters
    for (let i = 0; i < 30; i++) {
      pts.push({ x: 50 + Math.random() * 80, y: 50 + Math.random() * 80, type: 'red' });
      pts.push({ x: 150 + Math.random() * 80, y: 150 + Math.random() * 80, type: 'red' });
      pts.push({ x: 50 + Math.random() * 180, y: 50 + Math.random() * 180, type: 'blue' });
    }
    // Filter blue points to be outside red clusters
    return pts.filter(p => {
      if (p.type === 'red') return true;
      const d1 = Math.sqrt((p.x - 90)**2 + (p.y - 90)**2);
      const d2 = Math.sqrt((p.x - 190)**2 + (p.y - 190)**2);
      return d1 > 40 && d2 > 40;
    });
  }, []);

  return (
    <div className="relative flex flex-col items-center">
      <svg width="320" height="320" viewBox="0 0 320 320" className="overflow-visible">
        {/* Axes */}
        <line x1="40" y1="280" x2="300" y2="280" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        <line x1="40" y1="280" x2="40" y2="20" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#475569" />
          </marker>
        </defs>

        {/* Axis Labels */}
        <text x="170" y="310" fill="#94a3b8" fontSize="12" textAnchor="middle" className="font-medium">Feature 1</text>
        <text x="10" y="150" fill="#94a3b8" fontSize="12" textAnchor="middle" transform="rotate(-90 10 150)" className="font-medium">Feature 2</text>

        {/* Points */}
        {points.map((p, i) => (
          p.type === 'red' ? (
            <circle key={i} cx={p.x} cy={320 - p.y} r="4" fill="none" stroke="#ef4444" strokeWidth="2" />
          ) : (
            <g key={i} transform={`translate(${p.x}, ${320 - p.y})`}>
              <line x1="-3" y1="-3" x2="3" y2="3" stroke="#3b82f6" strokeWidth="2" />
              <line x1="3" y1="-3" x2="-3" y2="3" stroke="#3b82f6" strokeWidth="2" />
            </g>
          )
        ))}
      </svg>
    </div>
  );
}

// 3D Surface Plot Simulation (using SVG paths)
function SurfacePlot3D({ gamma }: { gamma: number }) {
  const grid = 20;
  const size = 300;
  
  const project = (x: number, y: number, z: number) => {
    const isoX = (x - y) * 0.7;
    const isoY = (x + y) * 0.4 - z * 0.5;
    return { x: 150 + isoX, y: 150 + isoY };
  };

  const getZ = (x: number, y: number) => {
    const d1 = Math.sqrt((x - 90)**2 + (y - 90)**2);
    const d2 = Math.sqrt((x - 190)**2 + (y - 190)**2);
    return Math.exp(-d1 * 0.02 * gamma) * 60 + Math.exp(-d2 * 0.02 * gamma) * 60;
  };

  const paths = [];
  for (let i = 0; i < grid; i++) {
    let dRow = "";
    let dCol = "";
    for (let j = 0; j < grid; j++) {
      const x = (i / grid) * size;
      const y = (j / grid) * size;
      const z = getZ(x, y);
      const p = project(x - size/2, y - size/2, z);
      
      if (j === 0) dRow += `M ${p.x} ${p.y}`;
      else dRow += ` L ${p.x} ${p.y}`;

      const x2 = (j / grid) * size;
      const y2 = (i / grid) * size;
      const z2 = getZ(x2, y2);
      const p2 = project(x2 - size/2, y2 - size/2, z2);
      if (j === 0) dCol += `M ${p2.x} ${p2.y}`;
      else dCol += ` L ${p2.x} ${p2.y}`;
    }
    paths.push(<path key={`r${i}`} d={dRow} fill="none" stroke="url(#grad)" strokeWidth="0.5" opacity="0.4" />);
    paths.push(<path key={`c${i}`} d={dCol} fill="none" stroke="url(#grad)" strokeWidth="0.5" opacity="0.4" />);
  }

  return (
    <svg width="320" height="320" viewBox="0 0 320 320">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      
      {/* Base Grid */}
      <g transform="translate(0, 50)">
        {paths}
      </g>

      {/* Separating Plane */}
      <polygon 
        points="60,180 260,140 260,200 60,240" 
        fill="rgba(16, 185, 129, 0.1)" 
        stroke="rgba(16, 185, 129, 0.4)" 
        strokeWidth="1"
      />

      {/* Points in 3D */}
      {[
        {x: 80, y: 80, z: 50, type: 'red'},
        {x: 180, y: 180, z: 55, type: 'red'},
        {x: 120, y: 120, z: 10, type: 'blue'}
      ].map((p, i) => {
        const pos = project(p.x - 150, p.y - 150, p.z);
        return p.type === 'red' ? (
          <circle key={i} cx={pos.x} cy={pos.y + 50} r="3" fill="none" stroke="#ef4444" strokeWidth="1.5" />
        ) : (
          <g key={i} transform={`translate(${pos.x}, ${pos.y + 50})`}>
            <line x1="-2" y1="-2" x2="2" y2="2" stroke="#3b82f6" strokeWidth="1.5" />
            <line x1="2" y1="-2" x2="-2" y2="2" stroke="#3b82f6" strokeWidth="1.5" />
          </g>
        );
      })}
    </svg>
  );
}

export default function App() {
  const [gamma, setGamma] = useState(1.5);
  const [cParam, setCParam] = useState(10.0);
  const [activeTab, setActiveTab] = useState("RBF / Gaussian");

  const tabs = ["Compute Learning", "RBF / Gaussian", "RBF Analyzation", "Kernel Trick"];

  return (
    <div className="app-container">
      {/* Header */}
      <header className="main-header">
        <div className="flex items-center gap-4">
          <Menu className="w-5 h-5 text-emerald-400 cursor-pointer" />
          <h1 className="text-lg font-semibold tracking-tight">
            Support Vector Machines (SVMs): An Interactive Learning Guide
          </h1>
        </div>
        <div className="concept-badge">Concept 03</div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="learning-card">
          {/* Card Header */}
          <div className="card-header">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-bold">Concept 03: The Kernel Trick</h2>
            </div>
            <X className="w-5 h-5 text-slate-500 cursor-pointer hover:text-white transition-colors" />
          </div>

          {/* Tabs */}
          <div className="tab-container">
            {tabs.map(tab => (
              <div 
                key={tab} 
                className={`tab-item ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* Visualization Grid */}
          <div className="viz-grid">
            <div className="viz-area">
              {/* Headers */}
              <div className="viz-headers">
                <div className="viz-header-box viz-header-blue">
                  2D Data Space (Original Input)
                </div>
                <div className="viz-header-box viz-header-teal">
                  Transformed Feature Space (Higher-Dimensional)
                </div>
              </div>

              {/* Visualizations */}
              <div className="viz-container">
                <ScatterPlot2D />
                
                {/* Arrow */}
                <div className="flex flex-col items-center gap-1">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>

                <SurfacePlot3D gamma={gamma} />
              </div>

              <div className="viz-footer-text">
                Linear separation is now possible in higher dimensions.
              </div>
            </div>

            {/* Sidebar Controls */}
            <div className="control-panel">
              {/* Gamma Slider */}
              <div className="control-group">
                <div className="control-label-row">
                  <label className="control-label">γ (Gamma)</label>
                  <span className="control-value">{gamma.toFixed(1)}</span>
                </div>
                <input 
                  type="range" 
                  min="0.1" 
                  max="5.0" 
                  step="0.1" 
                  value={gamma} 
                  onChange={(e) => setGamma(parseFloat(e.target.value))}
                  className="custom-slider"
                />
              </div>

              {/* C Slider */}
              <div className="control-group">
                <div className="control-label-row">
                  <label className="control-label">C (Regularization)</label>
                  <span className="control-value">{cParam.toFixed(1)}</span>
                </div>
                <input 
                  type="range" 
                  min="0.1" 
                  max="20.0" 
                  step="0.1" 
                  value={cParam} 
                  onChange={(e) => setCParam(parseFloat(e.target.value))}
                  className="custom-slider"
                />
              </div>

              {/* Kernel Dropdown */}
              <div className="control-group">
                <label className="control-label">Kernel Type</label>
                <div className="relative">
                  <div className="w-full bg-slate-900 border border-slate-700 rounded-md p-2 flex items-center justify-between text-sm cursor-pointer">
                    <span>RBF / Gaussian</span>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="info-box">
                <div className="flex items-center gap-2 mb-3 text-blue-400">
                  <Info className="w-4 h-4" />
                </div>
                <ul>
                  <li>Maps input data into an infinite-dimensional space</li>
                  <li>Allows capturing complex non-linear decision boundaries</li>
                  <li>Highly sensitive to parameter tuning (γ and C)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Status Bar */}
      <footer className="status-bar gap-4">
        <div className="flex items-center gap-2">
          <span>Status: Model Training Complete</span>
          <span className="text-slate-700">|</span>
          <span>Accuracy: <span className="status-accuracy">96.8%</span></span>
        </div>
        <Sparkles className="w-4 h-4 text-slate-500" />
      </footer>
    </div>
  );
}
