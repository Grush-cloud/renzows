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
 * @param {array}  fallback  - demo data shown if fetch fails
 */
export function useCloudinaryFolder(cloudName, tag, fallback = []) {
  const [assets, setAssets]   = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  useEffect(() => {
    if (!cloudName || cloudName === 'YOUR_CLOUD_NAME') return

    setLoading(true)

    Promise.all([
      fetch(`https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`)
        .then((r) => r.json())
        .catch(() => ({ resources: [] })),
      fetch(`https://res.cloudinary.com/${cloudName}/video/list/${tag}.json`)
        .then((r) => r.json())
        .catch(() => ({ resources: [] })),
    ])
      .then(([imageData, videoData]) => {
        const all = [
          ...(imageData.resources || []),
          ...(videoData.resources || []),
        ]

        const mapped = all.map((r) => {
          const parts   = (r.asset_folder || '').split('/')
          const cat     = parts.length > 1 ? parts[parts.length - 1] : 'other'
          const isVideo = ['mp4', 'mov', 'webm', 'avi'].includes(r.format)
          const url     = isVideo
            ? `https://res.cloudinary.com/${cloudName}/video/upload/q_auto/${r.public_id}.${r.format}`
            : `https://res.cloudinary.com/${cloudName}/image/upload/q_auto,f_auto/${r.public_id}.${r.format}`
          const name    = r.context?.custom?.name
                        || r.public_id.split('/').pop().replace(/[-_]/g, ' ')

          return { id: r.asset_id, name, cat, url, type: isVideo ? 'video' : 'image' }
        })

        setAssets(mapped.length > 0 ? mapped : fallback)
      })
      .catch((err) => {
        console.warn('Cloudinary fetch failed — using demo content:', err.message)
        setError(err.message)
        setAssets(fallback)
      })
      .finally(() => setLoading(false))
  }, [cloudName, tag])

  return { assets, loading, error }
}