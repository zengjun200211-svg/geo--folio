import { useState } from 'react'
import GlowCursor from './components/GlowCursor.jsx'
import TopNav from './components/TopNav.jsx'
import Hero from './components/Hero.jsx'
import IndexSection from './components/IndexSection.jsx'
import Profile from './components/Profile.jsx'
import ContentHits from './components/ContentHits.jsx'
import Commercial from './components/Commercial.jsx'
import AiWorkflow from './components/AiWorkflow.jsx'
import DataOps from './components/DataOps.jsx'
import GeoLab from './components/GeoLab.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import CornerWidgets from './components/CornerWidgets.jsx'
import useReveal from './hooks/useReveal.js'

export default function App() {
  useReveal()
  // 仅桌面端（pointer: fine）启用发光拖尾光标，移动端回退系统光标
  const [finePointer] = useState(
    () => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(pointer: fine)').matches
  )

  return (
    <>
      {finePointer && (
        <GlowCursor
          overlay
          color="#FF6A64"
          secondaryColor="#EE211E"
          trailLength={32}
          trailWidth={5}
          trailTaper={0.7}
          followSpeed={0.42}
          glowIntensity={2.2}
          glowSpread={1.4}
          hotspot={0.8}
          brightness={1.45}
          opacity={1}
          pulseSpeed={0.9}
          noiseStrength={0.03}
          idleFade
          idleTimeout={700}
          fadeDuration={700}
          blendMode="screen"
          maxDevicePixelRatio={1}
        />
      )}
      <TopNav />
      <main>
        <Hero />
        <IndexSection />
        <Profile />
        <ContentHits />
        <Commercial />
        <AiWorkflow />
        <DataOps />
        <GeoLab />
        <Contact />
      </main>
      <Footer />
      <CornerWidgets />
    </>
  )
}
