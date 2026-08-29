import { aboutData } from "../../data/aboutData"
import { AboutIntro } from "./AboutIntro"
import { Journey } from "./Journey"
import { Education } from "./Education"
import { Currently } from "./Currently"
import { AboutClosing } from "./AboutClosing"
import EngineeringCore from "./components/EngineeringCore"
import EducationHelix from "./components/EducationHelix"

export default function About() {
  return (
    <div className="bg-background min-h-screen font-sans relative overflow-hidden">
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--foreground) / 0.05) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse at 50% 0%, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 0%, black, transparent 80%)'
        }}
      />
      <div className="relative z-10 container mx-auto">
        
        {/* Chapter 1: Journey */}
        <div className="flex flex-col lg:flex-row relative">
          <div className="w-full lg:w-[62%]">
            <AboutIntro data={aboutData.intro} />
            
            {/* Mobile 3D Core */}
            <div className="block lg:hidden w-full h-[320px] px-4 md:px-8 mb-8">
              <EngineeringCore />
            </div>

            <Journey data={aboutData.journey} />
          </div>
          
          {/* Desktop Sticky 3D Core */}
          <div className="hidden lg:block lg:w-[38%] sticky top-0 h-screen">
            <EngineeringCore />
          </div>
        </div>

        {/* Chapter 2: Education */}
        <div className="flex flex-col lg:flex-row relative">
          <div className="w-full lg:w-[62%]">
            {/* Mobile 3D Helix */}
            <div className="block lg:hidden w-full h-[320px] px-4 md:px-8 mt-8 mb-4">
              <EducationHelix data={aboutData.education} />
            </div>
            
            <Education data={aboutData.education} />
          </div>
          
          {/* Desktop Sticky 3D Helix */}
          <div className="hidden lg:block lg:w-[38%] sticky top-0 h-screen">
            <EducationHelix data={aboutData.education} />
          </div>
        </div>

        {/* Chapter 3: Currently (Full Width) */}
        <div className="w-full relative mt-16 md:mt-24">
          <Currently data={aboutData.currently} />
        </div>

        {/* Chapter 4: Closing */}
        <div className="flex flex-col lg:flex-row relative">
          <div className="w-full lg:w-[62%]">
            <AboutClosing data={aboutData.closing} />
          </div>
          
          {/* Empty space to balance the grid layout visually */}
          <div className="hidden lg:block lg:w-[38%]">
          </div>
        </div>

      </div>
    </div>
  )
}
