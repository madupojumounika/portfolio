import { Hero } from "./Hero"
import { CurrentStatus } from "./CurrentStatus"
import { SelectedWork } from "./SelectedWork"
import { EngineeringStack } from "./EngineeringStack"
import { EngineeringApproach } from "./EngineeringApproach"

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <CurrentStatus />
      <SelectedWork />
      <EngineeringStack />
      <EngineeringApproach />
    </div>
  )
}
