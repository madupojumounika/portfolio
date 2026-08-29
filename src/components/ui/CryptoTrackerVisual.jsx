import { motion, useReducedMotion } from "framer-motion"
import { Bitcoin, TrendingUp, TrendingDown, BarChart3 } from "lucide-react"

export function CryptoTrackerVisual() {
  const shouldReduceMotion = useReducedMotion()

  // Subtle floating for the entire dashboard
  const floatDashboard = shouldReduceMotion ? {} : {
    y: [-5, 5, -5],
    rotateX: [6, 3, 6],
    rotateY: [-3, 3, -3],
    transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
  }

  // Coin data with SVG sparklines
  const coins = [
    { name: "Bitcoin", symbol: "BTC", price: "$64,230.50", change: "+5.42%", up: true, color: "#F7931A", sparkline: "M 0,20 L 10,15 L 20,18 L 30,10 L 40,12 L 50,5" },
    { name: "Ethereum", symbol: "ETH", price: "$3,450.20", change: "+2.14%", up: true, color: "#627EEA", sparkline: "M 0,20 L 10,18 L 20,12 L 30,14 L 40,8 L 50,2" },
    { name: "Solana", symbol: "SOL", price: "$145.80", change: "-1.25%", up: false, color: "#14F195", sparkline: "M 0,5 L 10,8 L 20,6 L 30,15 L 40,12 L 50,20" },
    { name: "Cardano", symbol: "ADA", price: "$0.45", change: "+0.85%", up: true, color: "#0033AD", sparkline: "M 0,15 L 10,12 L 20,14 L 30,10 L 40,8 L 50,5" }
  ]

  return (
    <div className="w-full h-full flex items-center justify-center p-4 md:p-6 lg:p-8 relative overflow-hidden bg-[#050508]" style={{ perspective: "1200px" }}>
      
      {/* Ambient background lights */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute w-[50%] h-[50%] bg-[#627EEA]/10 rounded-full blur-[100px] -translate-x-1/3" />
        <div className="absolute w-[40%] h-[40%] bg-[#14F195]/10 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />
      </div>

      {/* 3D Dashboard Container */}
      <motion.div
        animate={floatDashboard}
        style={{
          rotateX: shouldReduceMotion ? 0 : 6,
          rotateY: shouldReduceMotion ? 0 : -3,
          transformStyle: "preserve-3d"
        }}
        className="w-full max-w-[280px] sm:max-w-sm md:max-w-md bg-[#0c0c10]/95 backdrop-blur-3xl rounded-xl border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] p-4 sm:p-5 flex flex-col relative z-10"
      >
        {/* Dashboard Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner">
              <BarChart3 className="w-5 h-5 text-white/80" />
            </div>
            <div>
              <h3 className="text-white font-semibold tracking-wide text-xs sm:text-sm">Market Overview</h3>
              <p className="text-muted-foreground text-[9px] sm:text-[10px]">Live tracking portfolio</p>
            </div>
          </div>
          <div className="flex gap-2 opacity-60 hover:opacity-100 transition-opacity">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] shadow-[0_0_5px_rgba(255,95,86,0.5)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] shadow-[0_0_5px_rgba(255,189,46,0.5)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f] shadow-[0_0_5px_rgba(39,201,63,0.5)]" />
          </div>
        </div>

        {/* Crypto Coins List */}
        <div className="flex flex-col gap-2">
          {coins.map((coin, index) => (
            <motion.div
              key={coin.symbol}
              initial={{ opacity: 0, x: -20, z: -50 }}
              whileInView={{ opacity: 1, x: 0, z: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
              whileHover={!shouldReduceMotion ? { scale: 1.02, z: 30, backgroundColor: "rgba(255,255,255,0.06)" } : {}}
              className="flex items-center justify-between p-2 sm:p-3 rounded-lg bg-white/[0.02] border border-white/5 transition-colors cursor-pointer group shadow-sm"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Coin Info */}
              <div className="flex items-center gap-2 sm:gap-3 w-1/3">
                <div 
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-white shadow-lg text-xs"
                  style={{ background: `linear-gradient(135deg, ${coin.color} 0%, ${coin.color}40 100%)` }}
                >
                  {coin.symbol === "BTC" ? <Bitcoin className="w-4 h-4" /> : coin.symbol[0]}
                </div>
                <div>
                  <div className="text-white font-semibold text-xs sm:text-sm group-hover:text-primary transition-colors">{coin.name}</div>
                  <div className="text-muted-foreground text-[10px] sm:text-xs">{coin.symbol}</div>
                </div>
              </div>

              {/* Sparkline Chart */}
              <div className="hidden sm:flex w-1/4 h-8 relative opacity-60 group-hover:opacity-100 transition-opacity items-center justify-center">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 50 25">
                  <motion.path
                    d={coin.sparkline}
                    fill="none"
                    stroke={coin.up ? "#27c93f" : "#ff5f56"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 + index * 0.2 }}
                    style={{ filter: `drop-shadow(0px 0px 3px ${coin.up ? 'rgba(39,201,63,0.4)' : 'rgba(255,95,86,0.4)'})` }}
                  />
                </svg>
              </div>

              {/* Price & Change */}
              <div className="w-1/3 flex flex-col items-end">
                <div className="text-white font-mono font-semibold text-xs sm:text-sm group-hover:scale-105 transition-transform origin-right">{coin.price}</div>
                <div className={`text-[10px] sm:text-xs flex items-center gap-1 font-medium mt-0.5 ${coin.up ? "text-[#27c93f]" : "text-[#ff5f56]"}`}>
                  {coin.up ? <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> : <TrendingDown className="w-2.5 h-2.5 sm:w-3 sm:h-3" />}
                  {coin.change}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
