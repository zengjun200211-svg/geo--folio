import CustomCursor from './components/CustomCursor.jsx'
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

  return (
    <>
      <CustomCursor />
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
