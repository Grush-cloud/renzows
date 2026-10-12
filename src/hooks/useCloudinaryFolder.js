import { useState, useEffect } from 'react'

/**
 * useCloudinaryFolder
 *
 * Fetches all media assets with a given Cloudinary tag.
 * Fetches from both image and video endpoints and merges results.
 *
 * HOW TO ADD/REMOVE PROJECTS:
 * - Go to Cloudinary Media Library
 * - Click any asset → Tags → add "renzows-events" or "renzows-sets"
 * - The site updates automatically on next load
 *
 * HOW TO SET PROJECT NAME:
 * - Click asset → Edit → Context → add key "name", value "Your Project Name"
 *
 * @param {string} cloudName - your Cloudinary cloud name
 * @param {string} tag       - "renzows-events" or "renzows-sets"
 */
export function useCloudinaryFolder(cloudName, tag) {
  const [assets, setAssets]   = useState([])
  const [loading, setLoading] = useState(Boolean(cloudName))
  const [error, setError]     = useState(null)

  useEffect(() => {
    if (!cloudName) return

    // Cloudinary answers 404 when no asset of that type has the tag — treat as empty
    const list = (type) =>
      fetch(`https://res.cloudinary.com/${cloudName}/${type}/list/${tag}.json`)
        .then((r) => (r.ok ? r.json() : { resources: [] }))

    setLoading(true)

    Promise.all([list('image'), list('video')])
      .then(([imageData, videoData]) => {
        const all = [
          ...(imageData.resources || []),
          ...(videoData.resources || []),
        ]

        setAssets(all.map((r) => {
          const parts   = (r.asset_folder || '').split('/')
          const cat     = parts.length > 1 ? parts[parts.length - 1] : 'other'
          const isVideo = ['mp4', 'mov', 'webm', 'avi'].includes(r.format)
          const base    = `https://res.cloudinary.com/${cloudName}/${isVideo ? 'video' : 'image'}/upload`
          // Videos: an 8s, 480px loop, not the full original (5–16 MB each on mobile data)
          const url     = isVideo
            ? `${base}/so_0,eo_8,w_480,q_auto/${r.public_id}.mp4`
            : `${base}/q_auto,f_auto/${r.public_id}.${r.format}`
          // First frame as a still, so tiles are never a black box while the video loads
          const poster  = isVideo ? `${base}/so_0,w_480,q_auto,f_auto/${r.public_id}.jpg` : undefined
          const name    = r.context?.custom?.name
                        || r.public_id.split('/').pop().replace(/[-_]/g, ' ')

          return { id: r.asset_id, name, cat, url, poster, type: isVideo ? 'video' : 'image' }
        }))
      })
      .catch((err) => {
        console.warn('Cloudinary fetch failed:', err.message)
        setError(err.message)
      })
      .finally(() => setLoading(false))
  }, [cloudName, tag])

  return { assets, loading, error }
}
