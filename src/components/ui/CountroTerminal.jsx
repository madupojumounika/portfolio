import { useState, useEffect, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"

const SEQUENCE = [
  {
    command: "npm install -g countro",
    output: "✓ countro installed successfully",
  },
  {
    command: "countro crdir components",
    output: "✓ directory components created",
  },
  {
    command: "countro cr app.jsx",
    output: "✓ file app.jsx created",
  },
  {
    command: "countro mv app.jsx components",
    output: "✓ file app.jsx moved to components",
  },
]

export function CountroTerminal() {
  const shouldReduceMotion = useReducedMotion()
  
  const [history, setHistory] = useState([])
  const [currentCmdIndex, setCurrentCmdIndex] = useState(0)
  const [typedText, setTypedText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const [isDone, setIsDone] = useState(false)
  const scrollRef = useRef(null)
  
  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history, typedText])

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(cursorInterval)
  }, [])

  // Typing logic
  useEffect(() => {
    let timeoutId
    let isMounted = true

    const runSequence = async () => {
      if (isDone) {
        timeoutId = setTimeout(() => {
          if (isMounted) {
            setHistory([])
            setCurrentCmdIndex(0)
            setTypedText("")
            setIsDone(false)
          }
        }, 2500)
        return
      }

      if (currentCmdIndex >= SEQUENCE.length) {
        setIsDone(true)
        return
      }

      const currentStep = SEQUENCE[currentCmdIndex]

      if (typedText.length < currentStep.command.length) {
        // Typing characters (even slower speed)
        const charDelay = Math.random() * 50 + 60 // 60-110ms
        timeoutId = setTimeout(() => {
          if (isMounted) {
            setTypedText(currentStep.command.slice(0, typedText.length + 1))
          }
        }, charDelay)
      } else {
        // Finished typing command, show output after pause
        timeoutId = setTimeout(() => {
          if (isMounted) {
            setHistory(prev => [...prev, currentStep])
            setCurrentCmdIndex(prev => prev + 1)
            setTypedText("")
          }
        }, 500) // 500ms pause after typing before output
      }
    }

    // Add a pause before typing the next command
    if (typedText === "" && currentCmdIndex > 0 && currentCmdIndex < SEQUENCE.length) {
      timeoutId = setTimeout(() => {
        if (isMounted) runSequence()
      }, 1200)
    } else {
      runSequence()
    }

    return () => {
      isMounted = false
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [typedText, currentCmdIndex, isDone])

  const floatAnimation = shouldReduceMotion ? {} : {
    y: [-2, 2, -2],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-2 sm:p-3 md:p-4" style={{ perspective: "1000px" }}>
      <motion.div
        animate={floatAnimation}
        className="w-full h-full bg-[#0c0c0e]/95 backdrop-blur-md rounded-xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_20px_rgba(255,255,255,0.05)] overflow-hidden relative flex flex-col"
        style={{
          rotateX: shouldReduceMotion ? 0 : "4deg",
          rotateY: shouldReduceMotion ? 0 : "-2deg",
          transformStyle: "preserve-3d"
        }}
      >
        {/* Subtle top glare */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10 pointer-events-none" />

        {/* Mac OS Header */}
        <div className="h-8 bg-[#1e1e1e]/80 border-b border-white/5 flex items-center px-4 gap-2 relative shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] shadow-[0_0_4px_rgba(255,95,86,0.5)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] shadow-[0_0_4px_rgba(255,189,46,0.5)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f] shadow-[0_0_4px_rgba(39,201,63,0.5)]" />
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[#888888] text-[10px] font-medium tracking-wide">mounika — -zsh</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div 
          ref={scrollRef}
          className="p-4 md:p-5 font-mono text-[11px] md:text-[13px] leading-relaxed flex-1 h-0 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {history.map((item, idx) => (
            <div key={idx} className="mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-start gap-2">
                <span className="text-primary font-bold shrink-0">~ %</span>
                <span className="text-white/90 break-all">{item.command}</span>
              </div>
              <div className="text-[#3ECF8E] mt-1 opacity-90 break-all">
                {item.output}
              </div>
            </div>
          ))}

          {!isDone && (
            <div className="flex items-start gap-2 pb-2">
              <span className="text-primary font-bold shrink-0">~ %</span>
              <span className="text-white/90 break-all">
                {typedText}
                <span className={`inline-block w-1.5 h-3.5 ml-0.5 align-middle bg-white/70 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
