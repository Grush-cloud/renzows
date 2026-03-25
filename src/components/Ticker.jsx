import { TICKER_ITEMS } from '../constants'

export default function Ticker() {
  // Duplicate so the seamless loop animation works
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS]

  return (
    <div className="ticker">
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <span key={i} className="ticker-item">{item}</span>
        ))}
      </div>
    </div>
  )
}
