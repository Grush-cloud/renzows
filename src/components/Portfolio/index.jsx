import { useState } from 'react'
import VTile from './VTile'
import Lightbox from './Lightbox'

/**
 * Portfolio section — mixed grid layout with a hero tile and supporting tiles.
 * "View all projects" opens the Lightbox overlay.
 *
 * @param {array}   projects - full list of project objects
 * @param {boolean} loading  - true while Cloudinary fetch is in progress
 */
export default function Portfolio({ projects, loading }) {
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const heroProject  = projects[0]
  const gridProjects = projects.slice(1, Math.min(projects.length, 5))

  return (
    <>
      <section className="portfolio" id="work">

        <div className="portfolio-top">
          <div>
            <p className="label rv">Our Work</p>
            <h2 className="sec-title rv d1" style={{ marginBottom: 0 }}>
              Moments we've<br /><em>brought to life.</em>
            </h2>
          </div>

          <button
            className="btn-ghost rv"
            onClick={() => setLightboxOpen(true)}
          >
            View all projects <span className="arr">→</span>
          </button>
        </div>

        {loading ? (
          <div className="vgrid-loading">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="vtile-skeleton" />
            ))}
          </div>
        ) : (
          <div className="vgrid">
            {heroProject && (
              <VTile project={heroProject} isHero={true} />
            )}
            {gridProjects.map((project) => (
              <VTile key={project.id} project={project} isHero={false} />
            ))}
          </div>
        )}

      </section>

      <Lightbox
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        projects={projects}
      />
    </>
  )
}