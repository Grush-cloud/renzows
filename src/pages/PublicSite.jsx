import Hero      from '../components/Hero'
import Ticker    from '../components/Ticker'
import About     from '../components/About'
import Services  from '../components/Services'
import Portfolio from '../components/Portfolio'
import Process   from '../components/Process'
import Founder   from '../components/Founder'
import Contact   from '../components/Contact'
import { useReveal }        from '../hooks/useReveal'
import { useVideoAutoplay } from '../hooks/useVideoAutoplay'

/**
 * PublicSite — Renzows Event Design main page.
 * Nav and Footer are rendered by App.jsx (shared with Sets).
 *
 * @param {array}   projects - event projects from Cloudinary
 * @param {boolean} loading  - true while Cloudinary fetch is in progress
 */
export default function PublicSite({ projects, loading }) {
  useReveal([projects])
  useVideoAutoplay([projects])

  return (
    <div>
      <Hero />
      <Ticker />
      <About />
      <Services />
      <Portfolio projects={projects} loading={loading} />
      <Process />
      <Founder />
      <Contact />
    </div>
  )
}