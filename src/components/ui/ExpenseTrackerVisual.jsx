import { motion, useReducedMotion } from "framer-motion"
import { DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react"

export function ExpenseTrackerVisual() {
  const shouldReduceMotion = useReducedMotion()

  // Static chart data (normalized to percentages)
  const chartData = [35, 65, 40, 85, 60, 80, 100, 45, 70, 50, 75, 55]

  // Floating dashboard animation
  const floatDashboard = shouldReduceMotion ? {} : {
    y: [-5, 5, -5],
    rotateX: [10, 6, 10],
    rotateY: [-8, -4, -8],
    rotateZ: [1, 2, 1],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }

  // Floating transactions
  const transactions = [
    { id: 1, type: "income", amount: "+$2,400", title: "Freelance", delay: 0 },
    { id: 2, type: "expense", amount: "-$120", title: "Software", delay: 2 },
    { id: 3, type: "expense", amount: "-$45", title: "Coffee", delay: 4 },
  ]

  return (
    <div className="w-full h-full flex items-center justify-center p-4 md:p-6 lg:p-8 relative overflow-hidden" style={{ perspective: "1000px" }}>
      
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[70%] h-[70%] bg-primary/10 rounded-full blur-[80px]" />
      </div>

      {/* 3D Dashboard Container */}
      <motion.div
        animate={floatDashboard}
        style={{
          rotateX: shouldReduceMotion ? 0 : 10,
          rotateY: shouldReduceMotion ? 0 : -6,
          rotateZ: shouldReduceMotion ? 0 : 1,
          transformStyle: "preserve-3d"
        }}
        className="w-full max-w-sm sm:max-w-md md:max-w-lg aspect-[1.1] sm:aspect-[4/3] md:aspect-[16/10] bg-[#111113]/95 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] p-4 sm:p-5 md:p-6 flex flex-col relative z-10"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center shadow-[0_0_15px_rgba(var(--primary),0.3)]">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] sm:text-xs text-muted-foreground font-medium mb-1 tracking-wider uppercase">Total Balance</div>
              <div className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">$14,250.00</div>
            </div>
          </div>
          <div className="hidden sm:flex px-3 py-1.5 rounded-full bg-[#27c93f]/10 text-[#27c93f] text-xs font-semibold items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            +12.5%
          </div>
        </div>

        {/* Chart Area */}
        <div className="flex-1 flex items-end justify-between gap-1 sm:gap-2 mb-6 border-b border-white/5 pb-2 relative">
          {/* Subtle horizontal grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
            <div className="w-full h-px bg-white/20"></div>
            <div className="w-full h-px bg-white/20"></div>
            <div className="w-full h-px bg-white/20"></div>
            <div className="w-full h-px bg-white/20"></div>
          </div>

          {/* Bars */}
          {chartData.map((val, i) => (
            <div key={i} className="w-full relative flex justify-center group h-full items-end z-10">
              <motion.div
                className="w-full max-w-[12px] sm:max-w-[16px] rounded-t-sm bg-primary/80 group-hover:bg-primary transition-colors shadow-[0_0_10px_rgba(var(--primary),0.2)]"
                initial={{ height: "0%" }}
                whileInView={{ height: `${val}%` }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 1.2, 
                  delay: i * 0.05,
                  ease: [0.22, 1, 0.36, 1] 
                }}
              />
            </div>
          ))}
        </div>

        {/* Recent Activity Summary */}
        <div className="flex gap-3 sm:gap-4 text-sm mt-auto">
          <div className="flex-1 bg-white/5 rounded-xl p-3 border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff5f56]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-2 text-muted-foreground text-[10px] sm:text-xs mb-1.5 font-medium tracking-wide uppercase">
              <div className="p-1 rounded-full bg-[#ff5f56]/20">
                <ArrowDownRight className="w-3 h-3 text-[#ff5f56]" />
              </div>
              Expenses
            </div>
            <div className="font-semibold text-foreground text-sm sm:text-base">$3,420.50</div>
          </div>
          <div className="flex-1 bg-white/5 rounded-xl p-3 border border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#27c93f]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex items-center gap-2 text-muted-foreground text-[10px] sm:text-xs mb-1.5 font-medium tracking-wide uppercase">
              <div className="p-1 rounded-full bg-[#27c93f]/20">
                <ArrowUpRight className="w-3 h-3 text-[#27c93f]" />
              </div>
              Income
            </div>
            <div className="font-semibold text-foreground text-sm sm:text-base">$8,100.00</div>
          </div>
        </div>
      </motion.div>

      {/* Floating Transactions in 3D Space */}
      <div className="absolute inset-0 pointer-events-none" style={{ transformStyle: "preserve-3d" }}>
        {transactions.map((tx) => (
          <motion.div
            key={tx.id}
            className="absolute left-1/2 top-1/2 flex items-center gap-3 px-3 sm:px-4 py-2 rounded-full bg-[#1e1e1e]/90 backdrop-blur-md border border-white/10 shadow-xl"
            initial={{ opacity: 0, z: -150, y: 80, x: -80, scale: 0.8 }}
            animate={!shouldReduceMotion ? {
              opacity: [0, 1, 1, 0],
              z: [100, 200, 300, 400],
              y: [60, -40, -80, -120],
              x: [-40, 20, 60, 100],
              scale: [0.8, 1, 1, 1.2],
            } : { opacity: 0 }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: tx.delay,
              ease: "easeInOut"
            }}
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${tx.type === "income" ? "bg-[#27c93f]/20 text-[#27c93f]" : "bg-[#ff5f56]/20 text-[#ff5f56]"}`}>
              {tx.type === "income" ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            </div>
            <div className="text-[10px] sm:text-xs font-medium text-white/90 hidden sm:block">{tx.title}</div>
            <div className={`text-xs font-bold ${tx.type === "income" ? "text-[#27c93f]" : "text-white"}`}>
              {tx.amount}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
