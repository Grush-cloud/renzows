// Petal fan from the SetsByRenzows logo: deep magenta at the bottom, fading to blush at the top
const PETALS = ['#9e0060', '#b5126f', '#c82a80', '#d64492', '#e060a5', '#e97db8', '#f09bcb', '#f6badd']

export function SetsFan({ size = 40 }) {
  return (
    <svg className="sets-fan" width={size} height={size} viewBox="0 0 60 60" aria-hidden="true">
      {/* Petals radiate from (44,40): darkest points lower-left, lightest points up. Drawn light→dark so the dark ones sit in front. */}
      {[...PETALS].reverse().map((fill, i) => (
        <g key={fill} transform={`rotate(${-i * 18} 44 40)`}>
          <ellipse cx="44" cy="23" rx="8" ry="17" fill={fill} opacity="0.92" />
        </g>
      ))}
    </svg>
  )
}

/**
 * SetsLogo — petal fan + SETSBYRENZOWS + "Set design and prop rentals".
 * Text uses currentColor, so it works on the dark hero and the white nav.
 */
export default function SetsLogo() {
  return (
    <span className="sets-logo" role="img" aria-label="SetsByRenzows: set design and prop rentals">
      <SetsFan />
      <span className="sets-logo-text" aria-hidden="true">
        <span className="sets-logo-name">SetsByRenzows</span>
        <span className="sets-logo-sub">Set design and prop rentals</span>
      </span>
    </span>
  )
}
