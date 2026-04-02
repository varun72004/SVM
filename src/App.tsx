import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// SVG Visual 1: Hyperplane decision boundary
function VizHyperplane() {
  const pts = [
    {x:60,y:80,t:0},{x:90,y:60,t:0},{x:75,y:110,t:0},{x:110,y:75,t:0},{x:50,y:130,t:0},
    {x:200,y:190,t:1},{x:230,y:160,t:1},{x:210,y:220,t:1},{x:250,y:200,t:1},{x:180,y:175,t:1},
  ];
  return (
    <svg width="300" height="240" viewBox="0 0 300 240">
      <defs>
        <linearGradient id="bg1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0d1628"/>
          <stop offset="100%" stopColor="#0a1020"/>
        </linearGradient>
      </defs>
      <rect width="300" height="240" fill="url(#bg1)" rx="10"/>
      {/* bad boundary */}
      <line x1="40" y1="200" x2="260" y2="40" stroke="#ff5b5b" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.4"/>
      <text x="240" y="35" fill="#ff5b5b88" fontSize="9" fontFamily="DM Mono">bad?</text>
      {/* decision hyperplane */}
      <motion.line 
        initial={{ x1: 20, y1: 230, x2: 20, y2: 230 }}
        animate={{ x1: 20, y1: 230, x2: 280, y2: 60 }}
        transition={{ duration: 1, delay: 0.5 }}
        stroke="#5b8fff" strokeWidth="2"
      />
      <text x="245" y="58" fill="#5b8fff" fontSize="9" fontFamily="DM Mono">hyperplane</text>
      {pts.map((p,i) => (
        <motion.circle key={i} cx={p.x} cy={p.y} r="7"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.05 }}
          fill={p.t===0 ? "#ff8c5b" : "#5bffd4"}
          stroke={p.t===0 ? "#ff6030" : "#2de8b0"}
          strokeWidth="1.5" opacity="0.9"
        />
      ))}
      <text x="60" y="230" fill="#7a83a8" fontSize="10" fontFamily="Outfit">Class A</text>
      <circle cx="50" cy="228" r="5" fill="#ff8c5b" stroke="#ff6030" strokeWidth="1.5"/>
      <circle cx="130" cy="228" r="5" fill="#5bffd4" stroke="#2de8b0" strokeWidth="1.5"/>
      <text x="140" y="230" fill="#7a83a8" fontSize="10" fontFamily="Outfit">Class B</text>
    </svg>
  );
}

// SVG Visual 2: Maximum margin
function VizMargin() {
  return (
    <svg width="300" height="220" viewBox="0 0 300 220">
      <rect width="300" height="220" fill="#0a1020" rx="10"/>
      {/* margin band */}
      <motion.rect 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        x="110" y="0" width="80" height="220" fill="#5b8fff0a"
      />
      {/* support vector lines */}
      <motion.line 
        initial={{ y2: 0 }}
        animate={{ y2: 220 }}
        transition={{ duration: 0.8 }}
        x1="110" y1="0" x2="110" y2="220" stroke="#5b8fff" strokeWidth="1.5" strokeDasharray="6,4"
      />
      <motion.line 
        initial={{ y2: 0 }}
        animate={{ y2: 220 }}
        transition={{ duration: 0.8 }}
        x1="190" y1="0" x2="190" y2="220" stroke="#5b8fff" strokeWidth="1.5" strokeDasharray="6,4"
      />
      {/* hyperplane */}
      <motion.line 
        initial={{ y2: 0 }}
        animate={{ y2: 220 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        x1="150" y1="0" x2="150" y2="220" stroke="#fff" strokeWidth="2"
      />
      {/* margin label */}
      <line x1="112" y1="108" x2="188" y2="108" stroke="#5b8fff" strokeWidth="1" markerEnd="url(#arrow)" markerStart="url(#arrowL)"/>
      <text x="134" y="102" fill="#5b8fff" fontSize="11" fontFamily="DM Mono">margin</text>
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
          <path d="M0,0 L0,6 L6,3 z" fill="#5b8fff"/>
        </marker>
        <marker id="arrowL" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse">
          <path d="M0,0 L0,6 L6,3 z" fill="#5b8fff"/>
        </marker>
      </defs>
      {/* points */}
      {[[60,50],[75,100],[55,145],[80,170]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="7" fill="#ff8c5b" stroke="#ff6030" strokeWidth="1.5" opacity="0.9"/>
      ))}
      {[[240,55],[220,110],[245,150],[225,175]].map(([x,y],i)=>(
        <circle key={i} cx={x} cy={y} r="7" fill="#5bffd4" stroke="#2de8b0" strokeWidth="1.5" opacity="0.9"/>
      ))}
      {/* support vectors */}
      {[[98,90],[102,165]].map(([x,y],i)=>(
        <motion.circle 
          key={i} cx={x} cy={y} r="9" fill="none" stroke="#ffe45b" strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 + i * 0.2 }}
        />
      ))}
      {[[202,75],[198,155]].map(([x,y],i)=>(
        <motion.circle 
          key={i} cx={x} cy={y} r="9" fill="none" stroke="#ffe45b" strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.4 + i * 0.2 }}
        />
      ))}
      <circle cx="98" cy="90" r="7" fill="#ff8c5b" stroke="#ff6030" strokeWidth="1.5"/>
      <circle cx="102" cy="165" r="7" fill="#ff8c5b" stroke="#ff6030" strokeWidth="1.5"/>
      <circle cx="202" cy="75" r="7" fill="#5bffd4" stroke="#2de8b0" strokeWidth="1.5"/>
      <circle cx="198" cy="155" r="7" fill="#5bffd4" stroke="#2de8b0" strokeWidth="1.5"/>
      <text x="75" y="210" fill="#ffe45b" fontSize="10" fontFamily="DM Mono">◯ support vectors</text>
    </svg>
  );
}

// SVG Visual 3: Kernel trick
function VizKernel({ type }: { type: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={type}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        {type === "linear" && (
          <svg width="280" height="180" viewBox="0 0 280 180">
            <rect width="280" height="180" fill="#0a1020" rx="10"/>
            <line x1="50" y1="20" x2="230" y2="160" stroke="#5b8fff" strokeWidth="2"/>
            {[[60,80],[70,50],[90,100],[80,70]].map(([x,y],i)=>(
              <circle key={i} cx={x} cy={y} r="6" fill="#ff8c5b" stroke="#ff6030" strokeWidth="1.5"/>
            ))}
            {[[180,100],[200,80],[190,120],[210,105]].map(([x,y],i)=>(
              <circle key={i} cx={x} cy={y} r="6" fill="#5bffd4" stroke="#2de8b0" strokeWidth="1.5"/>
            ))}
            <text x="90" y="172" fill="#7a83a8" fontSize="11" fontFamily="DM Mono">Linearly separable</text>
          </svg>
        )}
        {type === "rbf" && (
          <svg width="280" height="200" viewBox="0 0 280 200">
            <rect width="280" height="200" fill="#0a1020" rx="10"/>
            {/* before kernel: not separable */}
            <text x="10" y="18" fill="#5b8fff88" fontSize="10" fontFamily="DM Mono">original 2D</text>
            {[[50,80],[80,70],[70,100],[60,60],[120,80],[130,70]].map(([x,y],i)=>(
              <circle key={i} cx={x} cy={y} r="5.5" fill="#ff8c5b" stroke="#ff6030" strokeWidth="1.5" opacity="0.9"/>
            ))}
            {[[88,88],[92,80],[85,95]].map(([x,y],i)=>(
              <circle key={i} cx={x} cy={y} r="5.5" fill="#5bffd4" stroke="#2de8b0" strokeWidth="1.5" opacity="0.9"/>
            ))}
            <ellipse cx="90" cy="87" rx="25" ry="22" fill="none" stroke="#ffe45b" strokeWidth="1.5" strokeDasharray="5,3" opacity="0.6"/>
            {/* arrow */}
            <text x="142" y="90" fill="#5b8fff" fontSize="18" fontFamily="DM Mono">→</text>
            <text x="138" y="105" fill="#5b8fff88" fontSize="9" fontFamily="DM Mono">kernel</text>
            {/* after kernel: separable in 3D projection */}
            <text x="172" y="18" fill="#5b8fff88" fontSize="10" fontFamily="DM Mono">higher-D</text>
            {[[185,100],[210,90],[225,110],[200,120],[220,130],[235,95]].map(([x,y],i)=>(
              <circle key={i} cx={x} cy={y} r="5.5" fill="#ff8c5b" stroke="#ff6030" strokeWidth="1.5" opacity="0.9"/>
            ))}
            {[[195,55],[210,45],[220,60],[205,65]].map(([x,y],i)=>(
              <circle key={i} cx={x} cy={y} r="5.5" fill="#5bffd4" stroke="#2de8b0" strokeWidth="1.5" opacity="0.9"/>
            ))}
            <line x1="170" y1="78" x2="265" y2="78" stroke="#5b8fff" strokeWidth="1.8" strokeDasharray="4,3"/>
            <text x="82" y="180" fill="#7a83a8" fontSize="11" fontFamily="DM Mono">RBF maps to higher dims</text>
          </svg>
        )}
        {type === "poly" && (
          <svg width="280" height="180" viewBox="0 0 280 180">
            <rect width="280" height="180" fill="#0a1020" rx="10"/>
            <path d="M30,160 Q140,20 260,160" fill="none" stroke="#5b8fff" strokeWidth="2"/>
            {[[60,130],[90,100],[120,80],[150,75],[160,80]].map(([x,y],i)=>(
              <circle key={i} cx={x} cy={y} r="6" fill="#5bffd4" stroke="#2de8b0" strokeWidth="1.5"/>
            ))}
            {[[40,155],[80,140],[170,120],[210,145],[240,158]].map(([x,y],i)=>(
              <circle key={i} cx={x} cy={y} r="6" fill="#ff8c5b" stroke="#ff6030" strokeWidth="1.5"/>
            ))}
            <text x="68" y="172" fill="#7a83a8" fontSize="11" fontFamily="DM Mono">Polynomial boundary</text>
          </svg>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// SVG Visual 4: Soft margin (C parameter)
function VizSoftMargin({ C }: { C: string }) {
  const pts = [
    {x:80,y:60,t:0},{x:60,y:100,t:0},{x:90,y:130,t:0},
    {x:200,y:70,t:1},{x:220,y:110,t:1},{x:195,y:145,t:1},
  ];
  const outlier = C === "high" ? {x:165,y:90,t:0,out:true} : {x:155,y:95,t:0,out:true};
  return (
    <svg width="300" height="200" viewBox="0 0 300 200">
      <rect width="300" height="200" fill="#0a1020" rx="10"/>
      <line x1="150" y1="0" x2="150" y2="200" stroke="#fff" strokeWidth="2"/>
      <AnimatePresence mode="wait">
        <motion.g key={C} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {C === "high" ? (
            <>
              <line x1="130" y1="0" x2="130" y2="200" stroke="#5b8fff" strokeWidth="1.5" strokeDasharray="5,4"/>
              <line x1="170" y1="0" x2="170" y2="200" stroke="#5b8fff" strokeWidth="1.5" strokeDasharray="5,4"/>
            </>
          ) : (
            <>
              <line x1="100" y1="0" x2="100" y2="200" stroke="#5b8fff" strokeWidth="1.5" strokeDasharray="5,4"/>
              <line x1="200" y1="0" x2="200" y2="200" stroke="#5b8fff" strokeWidth="1.5" strokeDasharray="5,4"/>
            </>
          )}
        </motion.g>
      </AnimatePresence>
      {pts.map((p,i) => (
        <circle key={i} cx={p.x} cy={p.y} r="7"
          fill={p.t===0 ? "#ff8c5b" : "#5bffd4"}
          stroke={p.t===0 ? "#ff6030" : "#2de8b0"}
          strokeWidth="1.5" opacity="0.9"/>
      ))}
      <motion.circle 
        key={C}
        cx={outlier.x} cy={outlier.y} r="7" fill="#ff8c5b" stroke="#ff6030" strokeWidth="1.5" opacity="0.9"
        animate={{ cx: outlier.x, cy: outlier.y }}
        transition={{ type: "spring", stiffness: 100 }}
      />
      {C === "high" && (
        <text x={outlier.x-18} y={outlier.y-12} fill="#ff5b5b" fontSize="10" fontFamily="DM Mono">violation!</text>
      )}
      {C === "low" && (
        <text x={outlier.x-10} y={outlier.y-12} fill="#ffe45b" fontSize="10" fontFamily="DM Mono">allowed</text>
      )}
      <text x="8" y="190" fill="#7a83a8" fontSize="10" fontFamily="DM Mono">C={C==="high"?"large → tight":"small → wide"}</text>
    </svg>
  );
}

export default function SVMExplainer() {
  const [kernel, setKernel] = useState("rbf");
  const [C, setC] = useState("high");

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="svm-root">
      <motion.div 
        className="hero"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="hero-label">Machine Learning · Classification</div>
        <h1 className="hero-title">Support <em>Vector</em><br/>Machines</h1>
        <p className="hero-subtitle">A visual, point-by-point guide to one of ML's most elegant classification algorithms.</p>
      </motion.div>

      <motion.div 
        className="cards"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Card 1: The Problem */}
        <motion.div className="card" variants={itemVariants}>
          <div className="card-header">
            <span className="step-badge">CONCEPT 01</span>
            <h2 className="card-title">The Core Problem</h2>
          </div>
          <p className="card-body">
            Given data points belonging to <strong>two classes</strong>, SVM finds the best possible line (or plane) that <strong>separates them</strong>. But there are infinitely many possible lines — SVM picks the <strong>optimal one</strong>.
          </p>
          <div className="viz-box">
            <VizHyperplane />
          </div>
          <div className="highlight-box">
            → In 2D it's a line. In 3D it's a plane. In N-D it's called a <strong>hyperplane</strong>.
          </div>
        </motion.div>

        {/* Card 2: Max Margin */}
        <motion.div className="card" variants={itemVariants}>
          <div className="card-header">
            <span className="step-badge">CONCEPT 02</span>
            <h2 className="card-title">Maximize the Margin</h2>
          </div>
          <p className="card-body">
            SVM doesn't just find <em>any</em> separating line — it finds the one that is <strong>furthest away from both classes</strong>. This gap is the <strong>margin</strong>. A wider margin means better generalization to new data.
            <br/><br/>
            The data points sitting right on the margin edges are called <strong>Support Vectors</strong> — they literally "support" the hyperplane. Remove any other point, and the hyperplane stays the same.
          </p>
          <div className="viz-box">
            <VizMargin />
          </div>
          <div className="highlight-box">
            → Only 2–3 support vectors (yellow rings) control the entire decision boundary.
          </div>
        </motion.div>

        {/* Card 3: Kernel Trick */}
        <motion.div className="card" variants={itemVariants}>
          <div className="card-header">
            <span className="step-badge">CONCEPT 03</span>
            <h2 className="card-title">The Kernel Trick</h2>
          </div>
          <p className="card-body">
            What if data isn't linearly separable? SVM uses a <strong>kernel function</strong> to secretly project data into a <strong>higher-dimensional space</strong> where a hyperplane CAN separate them — without ever computing the transformation explicitly.
          </p>
          <div className="tab-row">
            {["linear","rbf","poly"].map(k => (
              <button key={k} className={`tab-btn ${kernel===k?"active":""}`} onClick={()=>setKernel(k)}>
                {k==="rbf"?"RBF / Gaussian":k==="poly"?"Polynomial":"Linear"}
              </button>
            ))}
          </div>
          <div className="viz-box">
            <VizKernel type={kernel}/>
          </div>
          <div className="kernel-grid">
            {[
              {k:"linear", name:"Linear", desc:"Straight line boundary. Use when data is already separable."},
              {k:"rbf", name:"RBF", desc:"Circular/curved boundary. Most popular, works great generally."},
              {k:"poly", name:"Polynomial", desc:"Curved polynomial boundary. Good for image data."},
            ].map(({k,name,desc}) => (
              <div key={k} className={`kernel-card ${kernel===k?"active":""}`} onClick={()=>setKernel(k)}>
                <div className="kernel-name">{name}</div>
                <div className="kernel-desc">{desc}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Card 4: Soft Margin / C */}
        <motion.div className="card" variants={itemVariants}>
          <div className="card-header">
            <span className="step-badge">CONCEPT 04</span>
            <h2 className="card-title">Soft Margin & The C Parameter</h2>
          </div>
          <p className="card-body">
            Real data is messy — some points may be on the wrong side. <strong>Soft margin SVM</strong> allows controlled misclassifications using hyperparameter <strong>C</strong>:
            <br/><br/>
            <strong>Large C</strong> → Penalize misclassifications heavily → Narrow margin, risk of overfitting.<br/>
            <strong>Small C</strong> → Tolerate some errors → Wide margin, better generalization.
          </p>
          <div className="tab-row">
            <button className={`tab-btn ${C==="high"?"active":""}`} onClick={()=>setC("high")}>Large C (strict)</button>
            <button className={`tab-btn ${C==="low"?"active":""}`} onClick={()=>setC("low")}>Small C (lenient)</button>
          </div>
          <div className="viz-box">
            <VizSoftMargin C={C}/>
          </div>
          <div className="highlight-box">
            → Think of C as a strictness dial: high C = strict teacher, low C = lenient teacher.
          </div>
        </motion.div>

        {/* Summary */}
        <motion.div className="card" variants={itemVariants}>
          <div className="card-header">
            <span className="step-badge">SUMMARY</span>
            <h2 className="card-title">SVM at a Glance</h2>
          </div>
          <div className="summary-grid">
            {[
              {label:"Type", val:"Supervised classification (& regression)"},
              {label:"Key Idea", val:"Maximize margin between classes"},
              {label:"Works Well When", val:"High-dimensional data, clear margins"},
              {label:"Struggles With", val:"Very large datasets, noisy classes"},
              {label:"Key Params", val:"C (margin trade-off), kernel, gamma"},
              {label:"Real Uses", val:"Text classification, face detection, bioinformatics"},
            ].map(({label,val}) => (
              <div className="summary-item" key={label}>
                <div className="summary-item-label">{label}</div>
                <div className="summary-item-val">{val}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
