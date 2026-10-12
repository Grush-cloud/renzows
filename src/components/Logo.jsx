/**
 * Logo — the stacked RENZOWS / EVENT / DESIGN wordmark in a thin frame
 * with the magenta corner bracket. Uses currentColor, so it works on dark and light.
 */

// EVENT and DESIGN are spread letter-by-letter to the exact width of RENZOWS, as in the original mark
const Spread = ({ word }) => (
  <span className="logo-spread" aria-hidden="true">
    {[...word].map((ch, i) => <span key={i}>{ch}</span>)}
  </span>
)

export default function Logo({ className = '' }) {
  return (
    <span className={`logo ${className}`} role="img" aria-label="Renzows Event Design">
      <span className="logo-l1" aria-hidden="true">RENZOWS</span>
      <Spread word="EVENT" />
      <Spread word="DESIGN" />
    </span>
  )
}
