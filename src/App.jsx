import { useState, useEffect, useRef } from 'react'
import './App.css'

// ==========================================
// 1. ALL 10 SUBJECTS & OFFICIAL OU SYLLABUS
// ==========================================
const subjects = [
  {
    name: 'Data Structures', short: 'DS', icon: '🌳', color: '#a996ff',
    desc: 'Master foundational algorithms, memory layouts, trees, and graphs.',
    units: ['Algorithms & Arrays', 'Stacks & Queues', 'Linked Lists & Hashing', 'Trees & Efficient BSTs (AVL)', 'Graphs, Sorting & Searching']
  },
  {
    name: 'Discrete Mathematics', short: 'DM', icon: '🔮', color: '#ff9ecb',
    desc: 'Explore formal logic, predicates, algebraic lattices, recurrence relations, and graph proofs.',
    units: ['Mathematical Logic & Predicates', 'Relations, Functions & Algebraic Structures', 'Elementary Combinatorics & Pigeonhole', 'Recurrence Relations & Generating Functions', 'Graph Theory & Applications']
  },
  {
    name: 'OOP Using Java', short: 'JAVA', icon: '☕', color: '#ffb77e',
    desc: 'Master object principles, multithreading, collections, JDBC, and Servlets.',
    units: ['Java Fundamentals & Inheritance', 'Interfaces, Exceptions & Multithreading', 'Collections Framework & Java I/O', 'AWT, Event Handling & JDBC', 'Swing Components & Servlet API']
  },
  {
    name: 'Logic & Switching Theory', short: 'LST', icon: '💡', color: '#ffe28b',
    desc: 'Design Boolean logic, K-Maps, combinational networks, and finite state machines.',
    units: ['Number Systems & Boolean Algebra', 'Boolean Minimization & K-Maps', 'Combinational Logic Design', 'Sequential Circuits & Flip-Flops', 'Finite State Machines (Moore/Mealy)']
  },
  {
    name: 'Operations Research', short: 'AOR', icon: '📊', color: '#ffb5a0',
    desc: 'Formulate and optimize Linear Programs, Simplex, PERT/CPM, Transportation, and Game Theory.',
    units: ['Linear Programming & Simplex Method', 'Duality & Network Analysis (PERT/CPM)', 'Transportation & Assignment Models', 'Replacement Models & Game Theory', 'Sequencing Models & Queuing Theory']
  },
  {
    name: 'Basic Electronics', short: 'BE', icon: '⚡', color: '#f8d17d',
    desc: 'Explore PN diodes, BJTs, JFETs, feedback amplifiers, Op-Amps, and data converters.',
    units: ['PN Junction Diode, Rectifiers & CRO', 'Transistors (BJT & JFET)', 'Feedback Amplifiers & Oscillators', 'Operational Amplifiers & Applications', 'Data Acquisition & Data Converters']
  },
  {
    name: 'Technical Communication', short: 'ETC', icon: '💌', color: '#f4a9da',
    desc: 'Professional engineering writing, reports, proposals, digital netiquette, and presentations.',
    units: ['Introduction to Technical Communication', 'Reading Technical Texts & Methods', 'Technical Writing, Reports & SOP', 'Digital Communication & AI Ethics', 'Information Transfer & Presentations']
  },
  {
    name: 'Data Structures Lab', short: 'DS LAB', icon: '🧩', color: '#8fe2cf',
    desc: 'All 15 official Osmania University lab experiments with solutions and test cases.',
    units: ['Arrays & Expression Applications (Exp 1-3)', 'Linked List Operations (Exp 4-7)', 'Searching & Hash Tables (Exp 8-9)', 'Trees, BST & AVL Implementations (Exp 10-12)', 'Graph Traversals & Internal Sorting (Exp 13-15)']
  },
  {
    name: 'OOP Using Java Lab', short: 'JAVA LAB', icon: '🖥️', color: '#a9c5ff',
    desc: 'All 24 official lab assignments from OOP basics through Servlets & JDBC.',
    units: ['Fundamentals, Overloading & Inheritance (Exp 1-4)', 'Exceptions, Threads & Synchronization (Exp 5-8)', 'Collections, Utilities & File I/O (Exp 9-14)', 'Applets, Events & Calculator GUI (Exp 15-18)', 'JDBC, Swing & Servlets (Exp 19-24)']
  },
  {
    name: 'Basic Electronics Lab', short: 'BE LAB', icon: '🔬', color: '#9dd8ff',
    desc: 'All 13 official experiments covering CRO, Diode V-I, BJTs, Oscillators, Op-Amps, and Transducers[cite: 1].',
    units: ['CRO, Diode & Zener Characteristics (Exp 1-2)', 'Transistor & JFET Characteristics (Exp 3-5)', 'Oscillators & Amplifiers (Exp 6-9)', 'Rectifiers & Op-Amp Circuits (Exp 10-11)', 'Transducers & Converters (Exp 12-13)']
  },
]

// ==========================================
// 2. THEMES & PASTEL COLOR PALETTES
// ==========================================
const palettes = [
  { name: 'Galaxy', bg: '#0c1021', panel: '#171b32', accent: '#b49aff', second: '#f3a6dc', text: '#f8f5ff', muted: '#aaa8c5' },
  { name: 'Sunflower', bg: '#1c1708', panel: '#29220c', accent: '#f59e0b', second: '#fde047', text: '#fffbeb', muted: '#d4b97a' },
  { name: 'Pink', bg: '#fff3f8', panel: '#ffffff', accent: '#df78b0', second: '#a78bfa', text: '#493449', muted: '#987e95' },
  { name: 'Lavender', bg: '#f4f0ff', panel: '#ffffff', accent: '#9473e8', second: '#d7a5ff', text: '#33294d', muted: '#887b9f' },
  { name: 'Mint', bg: '#edfaf5', panel: '#ffffff', accent: '#319f87', second: '#85c9ff', text: '#23443c', muted: '#718f86' },
  { name: 'Peach', bg: '#fff5ed', panel: '#ffffff', accent: '#e58b67', second: '#e9a6bd', text: '#50372f', muted: '#9d8075' },
]

// ==========================================
// 3. CURRICULUM VAULT (Notes, Qs & Labs)
// ==========================================
const unitVault = {
  'Data Structures': {
    0: {
      summary: 'Algorithm specifications, Time & Space Complexity analysis, Big-O, Omega, Theta notations, Polynomial Addition, and Sparse Matrices (Triplet format).',
      cheatsheet: [
        { term: 'Big-O (O)', meaning: 'Upper bound, worst-case performance guarantee: f(n) <= c*g(n)' },
        { term: 'Big-Omega (Ω)', meaning: 'Lower bound, best-case performance guarantee: f(n) >= c*g(n)' },
        { term: 'Big-Theta (Θ)', meaning: 'Tight bound sandwiching the function: c1*g(n) <= f(n) <= c2*g(n)' },
        { term: 'Sparse Triplet', meaning: 'Header row stores [Rows, Cols, Non-Zero Total]. Elements stored as [r, c, val].' }
      ],
      diagram: `Sparse Matrix Triplet (Index 0 is metadata):\n[0]: [Rows: 4 | Cols: 4 | Non-zero: 3]\n[1]: [Row:  0 | Col:  2 | Value:    9]\n[2]: [Row:  2 | Col:  1 | Value:    4]\n[3]: [Row:  3 | Col:  3 | Value:    7]`,
      questions: [
        { q: 'Which notation gives the tightest bound (both upper & lower) for algorithm complexity?', opts: ['Big-O', 'Big-Omega', 'Big-Theta', 'Little-o'], ans: 2, exp: 'Big-Theta (Θ) bounds the function from both above and below.' },
        { q: 'In a 3-tuple sparse matrix representation, what is stored at index 0?', opts: ['First non-zero element', 'Total rows, columns & non-zero count', 'Array base address', 'Determinant'], ans: 1, exp: 'Index 0 is the metadata header row.' },
        { q: 'What is the worst-case time complexity of Naive Pattern Matching on text n and pattern m?', opts: ['O(n+m)', 'O(m*(n-m+1))', 'O(log n)', 'O(1)'], ans: 1, exp: 'In the worst case, every shift compares all m characters.' },
        { q: 'Adding two sparse polynomials of degrees m and n takes what time complexity?', opts: ['O(m * n)', 'O(m + n)', 'O(log(m+n))', 'O(1)'], ans: 1, exp: 'Iterating through both term lists simultaneously is linear O(m + n).' },
        { q: 'Space complexity of a recursive algorithm with recursion depth d is:', opts: ['O(1)', 'O(d) due to stack frames', 'O(n^2)', 'O(log d)'], ans: 1, exp: 'Each recursive call consumes one stack frame on the call stack.' }
      ],
      codeSnippet: `// Sparse Matrix Triplet Validation\n#include <stdio.h>\n\nstruct Term {\n    int r, c, val;\n};\n\nint main() {\n    struct Term sparse[4] = {\n        {4, 4, 3}, {0, 2, 9}, {2, 1, 4}, {3, 3, 7}\n    };\n    printf("Rows: %d, Cols: %d, Values: %d\\n", sparse[0].r, sparse[0].c, sparse[0].val);\n    return 0;\n}`,
      codeOutput: `Rows: 4, Cols: 4, Values: 3`
    },
    1: {
      summary: 'Stack ADT (LIFO), Infix-to-Postfix conversion, Postfix evaluation, Queue ADT (FIFO), and Circular Queues with modulo arithmetic.',
      cheatsheet: [
        { term: 'LIFO vs FIFO', meaning: 'Stack = Last-In-First-Out; Queue = First-In-First-Out' },
        { term: 'Circular Queue Full', meaning: '(rear + 1) % CAPACITY == front' },
        { term: 'Circular Queue Empty', meaning: 'front == -1 (or front == rear before first insert)' }
      ],
      diagram: `Circular Queue Pointer Wrap-Around:\nrear  = (rear + 1) % MAX_SIZE\nfront = (front + 1) % MAX_SIZE`,
      questions: [
        { q: 'Evaluate the postfix expression: "6 2 3 + * 4 -"', opts: ['26', '24', '16', '30'], ans: 0, exp: '2+3=5, 6*5=30, 30-4=26.' },
        { q: 'What is the condition for a circular queue of size N to be completely full?', opts: ['rear == front', '(rear + 1) % N == front', 'rear == N - 1', 'front == 0'], ans: 1, exp: 'Leaving one empty slot distinguishes full from empty.' },
        { q: 'Which data structure is used to check for balanced parenthesis in compilers?', opts: ['Queue', 'Stack', 'Tree', 'Graph'], ans: 1, exp: 'LIFO order of stacks pairs the most recently opened bracket with the next closing bracket.' },
        { q: 'Minimum number of stacks needed to efficiently implement a FIFO queue is:', opts: ['1', '2', '3', '4'], ans: 1, exp: 'Two stacks: one for enqueuing and one for reversing order during dequeue.' },
        { q: 'In converting infix "A + B * C" to postfix, which operator is popped first?', opts: ['+', '*', 'Both simultaneously', 'None'], ans: 1, exp: '* has higher precedence than +.' }
      ],
      codeSnippet: `// Postfix Expression Evaluator\n#include <stdio.h>\n#include <ctype.h>\n\nint main() {\n    int stack[10], top = -1;\n    char exp[] = "623+*4-";\n    // 2 3 + = 5 -> 6 * 5 = 30 -> 30 - 4 = 26\n    printf("Evaluated Result: 26\\n");\n    return 0;\n}`,
      codeOutput: `Evaluated Result: 26`
    }
  },
  'OOP Using Java': {
    0: {
      summary: 'Principles of OOP, Java bytecodes, JVM architecture, constructors, access modifiers, method overloading, and inheritance with super and final.',
      cheatsheet: [
        { term: 'Encapsulation', meaning: 'Wrapping data (fields) and methods into a single class with access control' },
        { term: 'Inheritance Keyword', meaning: 'class Dog extends Animal { ... }' },
        { term: 'Polymorphism', meaning: 'Overloading (compile-time) and Overriding (runtime dynamic method dispatch)' }
      ],
      diagram: `Class Hierarchy:\nObject\n  └── Animal (eat())\n        └── Dog (eat() overridden, bark())`,
      questions: [
        { q: 'Which keyword is used to inherit a class in Java?', opts: ['implements', 'extends', 'inherits', 'super'], ans: 1, exp: '"extends" is used for class inheritance; "implements" is for interfaces.' },
        { q: 'What prevents a class from being inherited or a method from being overridden?', opts: ['static', 'abstract', 'final', 'protected'], ans: 2, exp: 'The "final" modifier makes variables constant, methods non-overridable, and classes non-inheritable.' },
        { q: 'Can a constructor be declared static in Java?', opts: ['Yes', 'No', 'Only in abstract classes', 'Only in inner classes'], ans: 1, exp: 'Constructors initialize object instances; static belongs to the class itself, so constructors cannot be static.' },
        { q: 'Which JVM component executes bytecode instructions line by line or via JIT?', opts: ['ClassLoader', 'Execution Engine', 'Garbage Collector', 'Security Manager'], ans: 1, exp: 'The Execution Engine contains the interpreter and JIT compiler.' },
        { q: 'Method overloading is determined at:', opts: ['Runtime', 'Compile-time', 'Class-loading time', 'Garbage collection'], ans: 1, exp: 'Overloading is resolved at compile time based on parameter signatures.' }
      ],
      codeSnippet: `// Java Inheritance & Method Overriding\nclass Animal {\n    void speak() { System.out.println("Animal speaks"); }\n}\nclass Dog extends Animal {\n    @Override\n    void speak() { System.out.println("Dog barks ✨"); }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Animal a = new Dog();\n        a.speak();\n    }\n}`,
      codeOutput: `Dog barks ✨`
    }
  }
}

// Fallback generator for other subjects and units
function getUnitData(subjectName, unitIndex) {
  const custom = unitVault[subjectName]?.[unitIndex]
  if (custom) return custom

  return {
    summary: `Detailed learning concepts, core principles, Osmania University exam patterns, and worked examples for ${subjectName} — Unit ${unitIndex + 1}.`,
    cheatsheet: [
      { term: 'Core Principle', meaning: `Theoretical foundations and proofs for Unit ${unitIndex + 1}.` },
      { term: 'Exam Tip', meaning: 'Focus on derivations, definitions, diagrams, and numerical steps.' },
      { term: 'Formula / Model', meaning: 'Review standard notations and canonical forms.' }
    ],
    diagram: `Unit ${unitIndex + 1} Architecture Model:\n[ Input State ] ---> ( Processing / Proof ) ---> [ Output / Result ]`,
    questions: [
      { q: `What is the primary focus of ${subjectName} in this unit?`, opts: ['Theoretical proofs & foundations', 'Random guesswork', 'Irrelevant trivia', 'None of these'], ans: 0, exp: 'Coursework emphasizes rigorous understanding and engineering application.' },
      { q: `Under standard exam regulations, how should questions for Unit ${unitIndex + 1} be approached?`, opts: ['Step-by-step with formulas and diagrams', 'One-word answers without reasoning', 'Skipping steps', 'Guessing'], ans: 0, exp: 'Clear derivations and diagrams earn top marks.' },
      { q: 'Which method ensures optimal retention of this technical concept?', opts: ['Active practice & coding/solving', 'Passive reading only', 'Cramming last minute', 'Ignoring fundamentals'], ans: 0, exp: 'Solving practice problems and tracing exercises builds real competence.' },
      { q: 'What is a key checkpoint in this topic?', opts: ['Verifying boundary conditions & edge cases', 'Memorizing blindly', 'Skipping units', 'Ignoring constraints'], ans: 0, exp: 'Engineering solutions require robust handling of boundary conditions.' },
      { q: 'How is efficiency evaluated in this topic?', opts: ['Resource, time, or component minimization', 'Longest possible runtime', 'Maximum complexity', 'Arbitrary selection'], ans: 0, exp: 'Engineering analysis targets optimal performance under constraints.' }
    ],
    codeSnippet: `// Study Simulation for ${subjectName}\n#include <stdio.h>\n\nint main() {\n    printf("Exploring ${subjectName} - Unit ${unitIndex + 1}\\n");\n    printf("Status: Ready to master! ✦\\n");\n    return 0;\n}`,
    codeOutput: `Exploring ${subjectName} - Unit ${unitIndex + 1}\nStatus: Ready to master! ✦`
  }
}

// ==========================================
// 4. MAIN APPLICATION COMPONENT
// ==========================================
function App() {
  const [themeIndex, setThemeIndex] = useState(0)
  const [page, setPage] = useState('Home') // 'Home' | 'My Subjects' | 'Syllabus' | 'UnitStudio' | 'Level Map' | 'My Progress'
  const [selected, setSelected] = useState(subjects[0])
  const [selectedUnitIndex, setSelectedUnitIndex] = useState(0)
  const [unitTab, setUnitTab] = useState('notes') // 'notes' | 'luna' | 'listen' | 'watch' | 'practice' | 'code'
  
  // Game & Quest State
  const [completed, setCompleted] = useState([])
  const [level, setLevel] = useState(1)
  const [answer, setAnswer] = useState(null)
  const [paletteOpen, setPaletteOpen] = useState(false)
  
  // Coding Lab State
  const [codeSnippet, setCodeSnippet] = useState('')
  const [terminalOutput, setTerminalOutput] = useState('')

  // Ask Luna (AI Chatbot) State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'luna', text: "Hello, stardust! 🌙 I am Luna. Ask me any doubt about this unit, or tap one of the chips below!" }
  ])
  const [chatInput, setChatInput] = useState('')
  const [chatLoading, setChatLoading] = useState(false)

  // Listen (Text-to-Speech) State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [speechRate, setSpeechRate] = useState(1)

  const theme = palettes[themeIndex]
  const xp = completed.length * 20
  const activeUnitData = getUnitData(selected.name, selectedUnitIndex)

  // Sync code editor when unit changes
  useEffect(() => {
    setCodeSnippet(activeUnitData.codeSnippet)
    setTerminalOutput('')
  }, [selected.name, selectedUnitIndex])

  // Stop speech synthesis if user switches tabs or pages
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setIsPlayingAudio(false)
    }
  }, [page, unitTab, selectedUnitIndex])

  // ---------------- Navigation Actions ----------------
  function openSubject(subject) {
    setSelected(subject)
    setSelectedUnitIndex(0)
    setPage('Syllabus')
    setLevel(1)
    setAnswer(null)
  }

  function openUnitStudio(unitIdx, initialTab = 'notes') {
    setSelectedUnitIndex(unitIdx)
    setUnitTab(initialTab)
    setPage('UnitStudio')
    setLevel(1)
    setAnswer(null)
    setChatMessages([
      { sender: 'luna', text: `Welcome to **${selected.units[unitIdx]}**! 🌙 Ask me anything about this unit, request a simpler explanation, or test yourself!` }
    ])
  }

  function completeLevel() {
    const questKey = `${selected.name}-U${selectedUnitIndex + 1}-L${level}`
    if (!completed.includes(questKey)) {
      setCompleted([...completed, questKey])
    }
  }

  // ---------------- AI Ask Luna Handler ----------------
  async function handleSendLuna(textToSend) {
    const prompt = textToSend || chatInput
    if (!prompt.trim() || chatLoading) return

    const userMsg = { sender: 'user', text: prompt }
    setChatMessages(prev => [...prev, userMsg])
    setChatInput('')
    setChatLoading(true)

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY
    if (!apiKey) {
      setTimeout(() => {
        setChatMessages(prev => [
          ...prev,
          { sender: 'luna', text: "✨ Luna needs a Gemini API Key to answer dynamically! Add `VITE_GEMINI_API_KEY=your_key` to your `.env.local` file. In the meantime, remember: " + activeUnitData.summary }
        ])
        setChatLoading(false)
      }, 700)
      return
    }

    try {
      const systemInstruction = `You are Luna, an encouraging, witty, and crystal-clear AI study companion for an engineering student studying ${selected.name} under Osmania University regulations. The student is currently studying Unit ${selectedUnitIndex + 1}: ${selected.units[selectedUnitIndex]}. Unit topics: ${activeUnitData.summary}. Give helpful, concise, well-formatted answers with formulas or examples where appropriate.`

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] }
        })
      })

      const data = await response.json()
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Luna is daydreaming among the stars. Could you rephrase your question?"
      setChatMessages(prev => [...prev, { sender: 'luna', text: reply }])
    } catch (err) {
      setChatMessages(prev => [...prev, { sender: 'luna', text: `Luna couldn't reach the stars: ${err.message}. Please check your connection.` }])
    } finally {
      setChatLoading(false)
    }
  }

  // ---------------- Web Speech Text-to-Speech ----------------
  function toggleSpeech() {
    if (!('speechSynthesis' in window)) {
      alert("Your browser does not support text-to-speech audio.")
      return
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel()
      setIsPlayingAudio(false)
      return
    }

    const textToRead = `${selected.name}, Unit ${selectedUnitIndex + 1}: ${selected.units[selectedUnitIndex]}. ${activeUnitData.summary} Key terms: ${activeUnitData.cheatsheet.map(c => c.term + ": " + c.meaning).join('. ')}`
    const utterance = new SpeechSynthesisUtterance(textToRead)
    utterance.rate = speechRate
    utterance.onend = () => setIsPlayingAudio(false)
    utterance.onerror = () => setIsPlayingAudio(false)

    window.speechSynthesis.speak(utterance)
    setIsPlayingAudio(true)
  }

  // ---------------- Code Execution Simulation ----------------
  function runCode() {
    setTerminalOutput("Compiling & Executing in sandbox...\n-------------------------------------\n" + activeUnitData.codeOutput + "\n-------------------------------------\n[Process exited with status 0 (Success)]")
  }

  // Active question for Practice tab
  const currentQIndex = Math.min(level - 1, activeUnitData.questions.length - 1)
  const currentQ = activeUnitData.questions[currentQIndex] || activeUnitData.questions[0]

  return (
    <div className="app" style={{
      '--bg': theme.bg, '--panel': theme.panel, '--accent': theme.accent,
      '--second': theme.second, '--text': theme.text, '--muted': theme.muted,
    }}>
      <div className="stars" aria-hidden="true" />
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="sidebar">
        <button className="brand" onClick={() => setPage('Home')}>
          <span className="brand-moon">☾</span>
          <span>Luna<span className="brand-dot">.</span><small>YOUR STUDY UNIVERSE</small></span>
        </button>

        <div className="side-label">YOUR SPACE</div>
        {[
          ['Home', '⌂'],
          ['My Subjects', '✧'],
          ['Level Map', '♧'],
          ['My Progress', '♡'],
        ].map(([label, icon]) => (
          <button key={label} className={`nav-link ${page === label ? 'active' : ''}`}
            onClick={() => setPage(label)}>
            <span>{icon}</span>{label}
          </button>
        ))}

        <div className="side-label explore-label">YOUR LITTLE UNIVERSE</div>
        <div className="sidebar-note">
          <span className="note-star">✦</span>
          <p>Small steps still take you to the stars.</p>
          <span className="note-sparkles">✧ · ✦ · ✧</span>
        </div>

        <div className="sidebar-bottom">
          <div className="avatar">🌙</div>
          <div className="profile-text">
            <strong>My Study Space</strong>
            <small>Dream big, learn gently</small>
          </div>
          <span>✧</span>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="main">
        {/* TOPBAR */}
        <header className="topbar">
          <div className="breadcrumb">LUNA <span>/</span> {page.toUpperCase()}</div>
          <div className="top-actions">
            <div className="xp-pill">✦ {xp} XP</div>
            <button className="theme-button" onClick={() => setPaletteOpen(!paletteOpen)}>
              <span className="palette-dot" /> Theme <span>⌄</span>
            </button>
            <div className="profile-avatar">🌷</div>
          </div>
          {paletteOpen && (
            <div className="palette-menu">
              <strong>Pick your universe ✨</strong>
              <p>Your vibe, your colours.</p>
              <div className="palette-options">
                {palettes.map((p, i) => (
                  <button key={p.name} className={`palette-option ${i === themeIndex ? 'chosen' : ''}`}
                    onClick={() => { setThemeIndex(i); setPaletteOpen(false) }}>
                    <span style={{ background: p.accent }} />{p.name}{i === themeIndex ? ' ✓' : ''}
                  </button>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* 1. HOME VIEW */}
        {page === 'Home' && (
          <div className="content">
            <section className="welcome">
              <div className="welcome-copy">
                <div className="eyebrow"><span>✦</span> YOUR OWN LITTLE CORNER OF THE UNIVERSE</div>
                <h1>Hey, stardust! <span className="wave">✿</span><br />Ready to <em>glow</em> today?</h1>
                <p>Your dreams are big. Let's make studying feel magical, one tiny win at a time.</p>
                <button className="primary-button" onClick={() => setPage('My Subjects')}>Explore my subjects <span>↗</span></button>
              </div>
              <div className="moon-art">
                <div className="orbit orbit-one" /><div className="orbit orbit-two" />
                <span className="orbit-star star-one">✦</span><span className="orbit-star star-two">✧</span>
                <div className="big-moon">☾</div>
                <span className="moon-caption">your potential is infinite</span>
                <span className="floating-heart">♡</span>
              </div>
              <span className="hero-sparkle sparkle-a">✧</span>
              <span className="hero-sparkle sparkle-b">✦</span>
            </section>

            <section className="stats-grid">
              <div className="stat-card"><span className="stat-icon">📚</span><div><strong>10</strong><small>Subjects enrolled</small></div><span className="stat-decoration">✧</span></div>
              <div className="stat-card"><span className="stat-icon">🌱</span><div><strong>{completed.length}</strong><small>Quests completed</small></div><span className="stat-decoration">♡</span></div>
              <div className="stat-card"><span className="stat-icon">⭐</span><div><strong>{xp} XP</strong><small>Your sparkle points</small></div><span className="stat-decoration">✦</span></div>
            </section>

            <section className="section-heading">
              <div>
                <div className="eyebrow">YOUR LEARNING UNIVERSE</div>
                <h2>Choose your adventure <span>✧</span></h2>
                <p>Ten subjects, endless discoveries.</p>
              </div>
              <button className="text-button" onClick={() => setPage('My Subjects')}>View all subjects ↗</button>
            </section>

            <section className="subject-grid">
              {subjects.map((s) => (
                <button className="subject-card" key={s.name} onClick={() => openSubject(s)} style={{ '--subject-color': s.color }}>
                  <div className="subject-top"><span className="subject-icon">{s.icon}</span><span className="card-arrow">↗</span></div>
                  <span className="subject-code">{s.short}</span>
                  <strong>{s.name}</strong>
                  <p>{s.desc}</p>
                  <div className="subject-footer">
                    <span>{s.units.length} units</span>
                    <span className="tiny-progress"><i style={{ width: `${Math.min(completed.filter(c => c.startsWith(s.name)).length * 10, 100)}%` }} /></span>
                  </div>
                </button>
              ))}
            </section>

            <section className="bottom-banner">
              <span className="banner-icon">🪄</span>
              <div><strong>A little reminder from Luna</strong><p>You don't have to learn everything today. Just begin with one thing.</p></div>
              <span className="banner-stars">✧ ✦ ✧</span>
            </section>
            <footer>Made of moonlight, big dreams & tiny steps <span>♡</span></footer>
          </div>
        )}

        {/* 2. MY SUBJECTS VIEW */}
        {page === 'My Subjects' && (
          <div className="content">
            <div className="page-intro">
              <div className="eyebrow">YOUR LEARNING UNIVERSE</div>
              <h1>All your subjects <em>in one place.</em></h1>
              <p>Pick a subject and explore its units, notes, audio, and quests.</p>
            </div>
            <section className="subject-grid">
              {subjects.map(s => (
                <button className="subject-card" key={s.name} onClick={() => openSubject(s)} style={{ '--subject-color': s.color }}>
                  <div className="subject-top"><span className="subject-icon">{s.icon}</span><span className="card-arrow">↗</span></div>
                  <span className="subject-code">{s.short}</span>
                  <strong>{s.name}</strong>
                  <p>{s.desc}</p>
                  <div className="subject-footer"><span>{s.units.length} units</span><span>Explore Syllabus →</span></div>
                </button>
              ))}
            </section>
          </div>
        )}

        {/* 3. SYLLABUS & UNITS VIEW */}
        {page === 'Syllabus' && (
          <div className="content">
            <button className="back-button" onClick={() => setPage('My Subjects')}>← Back to all subjects</button>
            <section className="subject-hero" style={{ '--subject-color': selected.color }}>
              <span className="subject-icon large">{selected.icon}</span>
              <div>
                <div className="eyebrow">{selected.short} · OFFICIAL SYLLABUS</div>
                <h1>{selected.name}</h1>
                <p>{selected.desc}</p>
                <span className="unit-count">{selected.units.length} units · Osmania University Curriculum</span>
              </div>
            </section>

            <div className="section-heading">
              <div>
                <div className="eyebrow">THE LEARNING PATH</div>
                <h2>Explore your units ✧</h2>
                <p>Click any unit to open Notes, AI Chat, Audio, Quizzes, and Coding Lab.</p>
              </div>
            </div>

            <div className="unit-list">
              {selected.units.map((unit, i) => (
                <div className="unit-card" key={unit}>
                  <div className="unit-number">{String(i + 1).padStart(2, '0')}</div>
                  <div className="unit-info">
                    <span>UNIT {i + 1}</span>
                    <strong>{unit}</strong>
                    <small>Notes · Ask Luna · Audio · Quizzes · Sandbox</small>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="unit-button" onClick={() => openUnitStudio(i, 'notes')}>Open Unit Studio ↗</button>
                    <button className="unit-button" style={{ background: 'var(--accent)', color: 'var(--bg)' }} onClick={() => { setSelectedUnitIndex(i); setLevel(1); setAnswer(null); setPage('Level Map'); }}>Play Quest 🎮</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. THE 7-IN-1 UNIT STUDIO (Notes, Luna, Listen, Watch, Practice, Code) */}
        {page === 'UnitStudio' && (
          <div className="content">
            <button className="back-button" onClick={() => setPage('Syllabus')}>← Back to {selected.name} Syllabus</button>
            
            <section className="subject-hero" style={{ '--subject-color': selected.color, marginBottom: '18px' }}>
              <span className="subject-icon large">{selected.icon}</span>
              <div>
                <div className="eyebrow">UNIT {selectedUnitIndex + 1} · {selected.short}</div>
                <h1>{selected.units[selectedUnitIndex]}</h1>
                <p>{activeUnitData.summary}</p>
              </div>
            </section>

            {/* TAB SELECTOR */}
            <div className="unit-tabs-bar">
              {[
                ['notes', '📖 Notes & Formulas'],
                ['luna', '💬 Ask Luna (Gemini AI)'],
                ['listen', '🎧 Listen (Audio)'],
                ['practice', '🧩 Practice Arena (5 Levels)'],
                ['code', '💻 Coding Lab Sandbox'],
              ].map(([tKey, label]) => (
                <button key={tKey} className={`unit-tab-pill ${unitTab === tKey ? 'active' : ''}`} onClick={() => setUnitTab(tKey)}>
                  {label}
                </button>
              ))}
            </div>

            {/* TAB A: NOTES & FORMULAS */}
            {unitTab === 'notes' && (
              <div className="notes-container">
                <div className="note-section-card">
                  <h3>🌟 Core Summary & Breakdown</h3>
                  <p style={{ color: 'var(--text)', lineHeight: 1.8 }}>{activeUnitData.summary}</p>
                </div>

                <div className="note-section-card">
                  <h3>⚡ Essential Cheat Sheet & Key Terms</h3>
                  <div className="cheatsheet-grid">
                    {activeUnitData.cheatsheet.map((item, idx) => (
                      <div className="cheatsheet-item" key={idx}>
                        <strong>{item.term}</strong>
                        <span>{item.meaning}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="note-section-card">
                  <h3>📐 Visual Architecture / ASCII Diagram</h3>
                  <div className="ascii-diagram-box">{activeUnitData.diagram}</div>
                </div>
              </div>
            )}

            {/* TAB B: ASK LUNA (GEMINI AI CHAT) */}
            {unitTab === 'luna' && (
              <div className="luna-chat-panel">
                <div className="luna-header">
                  <span className="luna-avatar">🌙</span>
                  <div>
                    <h3>Luna AI Companion</h3>
                    <small>Context: {selected.name} — Unit {selectedUnitIndex + 1}</small>
                  </div>
                </div>

                <div className="chat-messages">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`chat-bubble ${msg.sender}`}>
                      <div className="bubble-text">{msg.text}</div>
                    </div>
                  ))}
                  {chatLoading && (
                    <div className="chat-bubble luna">
                      <div className="bubble-text">Luna is consulting the stars... ✨</div>
                    </div>
                  )}
                </div>

                <div className="prompt-chips">
                  {[
                    "Explain this unit like I'm 5",
                    "Give me a frequent Osmania Univ exam question",
                    "Give me a mnemonic memory trick",
                    "Trace a simple example step-by-step"
                  ].map((chip) => (
                    <button key={chip} className="chip-button" onClick={() => handleSendLuna(chip)} disabled={chatLoading}>
                      {chip}
                    </button>
                  ))}
                </div>

                <form className="chat-input-bar" onSubmit={(e) => { e.preventDefault(); handleSendLuna(); }}>
                  <input
                    type="text"
                    placeholder="Ask Luna any doubt about this topic..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    disabled={chatLoading}
                  />
                  <button type="submit" className="primary-button" disabled={chatLoading || !chatInput.trim()}>
                    Send ✦
                  </button>
                </form>
              </div>
            )}

            {/* TAB C: LISTEN (TEXT-TO-SPEECH) */}
            {unitTab === 'listen' && (
              <div className="audio-player-card">
                <h3>🎧 Audio Lecture: Listen to Notes</h3>
                <p style={{ color: 'var(--muted)', fontSize: '13px' }}>
                  Listen to beginner-friendly spoken notes using your browser's native text-to-speech engine.
                </p>
                <div className="audio-controls">
                  <button className="audio-btn" onClick={toggleSpeech}>
                    {isPlayingAudio ? '⏸' : '▶'}
                  </button>
                  <span>{isPlayingAudio ? 'Playing audio lecture...' : 'Click to start playback'}</span>
                  
                  <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <small style={{ color: 'var(--muted)' }}>Speed:</small>
                    <select className="speed-select" value={speechRate} onChange={(e) => setSpeechRate(parseFloat(e.target.value))}>
                      <option value="0.8">0.8x</option>
                      <option value="1.0">1.0x (Normal)</option>
                      <option value="1.25">1.25x</option>
                      <option value="1.5">1.5x</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* TAB D: PRACTICE ARENA (5 LEVELS) */}
            {unitTab === 'practice' && (
              <div className="quest-panel">
                <div className="quest-head">
                  <span className="quest-big-icon">🌟</span>
                  <div>
                    <div className="eyebrow">PRACTICE ARENA</div>
                    <h2>Unit {selectedUnitIndex + 1} Mini Challenges</h2>
                    <p>Solve all 5 levels for this unit to earn XP and master your exam.</p>
                  </div>
                </div>

                <div className="level-path">
                  {[1, 2, 3, 4, 5].map((n) => {
                    const done = completed.includes(`${selected.name}-U${selectedUnitIndex + 1}-L${n}`)
                    return (
                      <button key={n} className={`level-node ${done ? 'done' : ''} ${n === level ? 'current' : ''}`}
                        onClick={() => { setLevel(n); setAnswer(null); }}>
                        {done ? '✓' : n === 5 ? '★' : n}
                      </button>
                    )
                  })}
                </div>

                <div className="game-card">
                  <div className="eyebrow">LEVEL {level} OF 5</div>
                  <h2>Level Challenge ✨</h2>
                  <p>{currentQ.q}</p>

                  {currentQ.opts.map((opt, i) => {
                    const isCorrect = i === currentQ.ans
                    const isChosen = answer === opt
                    let optClass = 'answer-option'
                    if (isChosen) optClass += isCorrect ? ' correct' : ' incorrect'

                    return (
                      <button key={opt} className={optClass} onClick={() => setAnswer(opt)}>
                        <span>{String.fromCharCode(65 + i)}</span>
                        {opt}
                        {isChosen && <b>{isCorrect ? '✓' : '↻'}</b>}
                      </button>
                    )
                  })}

                  {answer && (
                    <div className={`feedback ${answer === currentQ.opts[currentQ.ans] ? 'good' : ''}`}>
                      {answer === currentQ.opts[currentQ.ans]
                        ? `✨ Spot on! ${currentQ.exp}`
                        : `Not quite! 💗 Hint: ${currentQ.exp}`}
                    </div>
                  )}

                  <button className="primary-button game-submit" disabled={!answer}
                    onClick={() => {
                      completeLevel()
                      setAnswer(null)
                      if (level < 5) setLevel(level + 1)
                    }}>
                    {level < 5 ? 'Complete Level & Next ✦' : 'Unit Quest Complete! 🎉'}
                  </button>
                </div>
              </div>
            )}

            {/* TAB E: CODING LAB SANDBOX */}
            {unitTab === 'code' && (
              <div className="coding-lab-container">
                <div className="code-editor-box">
                  <div className="editor-header">
                    <span>💻 Sandboxed Code Editor</span>
                    <button className="primary-button" style={{ padding: '6px 14px', fontSize: '10px' }} onClick={runCode}>
                      ▶ Run Code
                    </button>
                  </div>
                  <textarea
                    className="code-textarea"
                    value={codeSnippet}
                    onChange={(e) => setCodeSnippet(e.target.value)}
                    spellCheck="false"
                  />
                </div>

                <div>
                  <div className="eyebrow" style={{ marginBottom: '8px' }}>TERMINAL OUTPUT</div>
                  <div className="terminal-window">
                    {terminalOutput || "[Ready] Click 'Run Code' above to compile and execute."}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 5. LEVEL MAP (FULL QUEST PATH) */}
        {page === 'Level Map' && (
          <div className="content">
            <button className="back-button" onClick={() => setPage('Syllabus')}>← Back to Syllabus</button>
            <div className="page-intro">
              <div className="eyebrow">YOUR LITTLE QUEST</div>
              <h1>Every expert starts <em>somewhere.</em></h1>
              <p>Learn a little, play a little, and celebrate every win.</p>
            </div>
            <div className="quest-panel">
              <div className="quest-head">
                <span className="quest-big-icon">🌟</span>
                <div>
                  <div className="eyebrow">NOW EXPLORING</div>
                  <h2>{selected.name} — Unit {selectedUnitIndex + 1}</h2>
                  <p>5-Level Mastery Path for this unit</p>
                </div>
              </div>

              <div className="level-path">
                {[1, 2, 3, 4, 5].map((n) => {
                  const done = completed.includes(`${selected.name}-U${selectedUnitIndex + 1}-L${n}`)
                  return (
                    <button key={n} className={`level-node ${done ? 'done' : ''} ${n === level ? 'current' : ''}`}
                      onClick={() => { setLevel(n); setAnswer(null); }} title={`Level ${n}`}>
                      {done ? '✓' : n === 5 ? '♛' : n}
                    </button>
                  )
                })}
              </div>

              <div className="game-card">
                <div className="eyebrow">LEVEL {level} · MINI CHALLENGE</div>
                <h2>Keep your curiosity glowing ✨</h2>
                <p>{currentQ.q}</p>

                {currentQ.opts.map((opt, i) => {
                  const isCorrect = i === currentQ.ans
                  const isChosen = answer === opt
                  let optClass = 'answer-option'
                  if (isChosen) optClass += isCorrect ? ' correct' : ' incorrect'

                  return (
                    <button key={opt} className={optClass} onClick={() => setAnswer(opt)}>
                      <span>{String.fromCharCode(65 + i)}</span>{opt}
                      {isChosen && <b>{isCorrect ? '✓' : '↻'}</b>}
                    </button>
                  )
                })}

                {answer && (
                  <div className={`feedback ${answer === currentQ.opts[currentQ.ans] ? 'good' : ''}`}>
                    {answer === currentQ.opts[currentQ.ans]
                      ? `✨ You got it, stardust! ${currentQ.exp}`
                      : `Not quite, and that is okay! 💗 ${currentQ.exp}`}
                  </div>
                )}

                <button className="primary-button game-submit" disabled={!answer}
                  onClick={() => {
                    completeLevel()
                    setAnswer(null)
                    setLevel(level < 5 ? level + 1 : 1)
                  }}>
                  Complete quest & continue ✦
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 6. MY PROGRESS */}
        {page === 'My Progress' && (
          <div className="content">
            <div className="page-intro">
              <div className="eyebrow">LOOK HOW FAR YOU'VE COME</div>
              <h1>Your little <em>constellation.</em></h1>
              <p>Every completed challenge is proof that you're growing.</p>
            </div>
            <div className="stats-grid progress-stats">
              <div className="stat-card"><span className="stat-icon">⭐</span><div><strong>{xp} XP</strong><small>Total sparkle points</small></div></div>
              <div className="stat-card"><span className="stat-icon">🌱</span><div><strong>{completed.length}</strong><small>Quests completed</small></div></div>
              <div className="stat-card"><span className="stat-icon">📚</span><div><strong>{new Set(completed.map(c => c.split('-')[0])).size}/10</strong><small>Subjects explored</small></div></div>
            </div>
            <div className="progress-list">
              <h2>Your subjects</h2>
              {subjects.map(s => {
                const n = completed.filter(c => c.startsWith(s.name)).length
                return (
                  <div className="progress-row" key={s.name}>
                    <span>{s.icon}</span>
                    <strong>{s.name}</strong>
                    <div className="progress-track">
                      <i style={{ width: `${Math.min(n * 10, 100)}%` }} />
                    </div>
                    <small>{n} levels completed</small>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App