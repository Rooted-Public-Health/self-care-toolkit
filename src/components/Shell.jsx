import { STEPS } from '../data'
import { Leaf } from './Decor'

export default function Shell({ view, onNavigate, starting, children }) {
  const showSteps = ![ 'cover', 'intro', 'wheel'].includes(view)

  return (
    <div className="app">
      <header className="topbar">
        <button type="button" className="brand" onClick={() => onNavigate('cover')}>
          <span className="brand-mark">AHW</span>
          <span className="brand-title">Self-Care Toolkit</span>
        </button>
        {showSteps && (
          <nav className="step-nav" aria-label="Toolkit steps">
            {STEPS.map((s) => (
              <button
                key={s.id}
                type="button"
                className={`step-pill ${view === s.id ? 'is-current' : ''} ${view === 'onesheet' ? '' : ''}`}
                onClick={() => onNavigate(s.id)}
              >
                <span className="step-num">{s.number}</span>
                <span className="step-label">{s.label}</span>
              </button>
            ))}
            <button
              type="button"
              className={`step-pill ${view === 'onesheet' ? 'is-current' : ''}`}
              onClick={() => onNavigate('onesheet')}
            >
              <span className="step-num">★</span>
              <span className="step-label">One-sheet</span>
            </button>
          </nav>
        )}
        <Leaf className="topbar-leaf" />
      </header>
      {starting && showSteps && (
        <div className="start-banner">
          Starting with <strong>{starting.name}</strong>
        </div>
      )}
      <main className="main">{children}</main>
    </div>
  )
}

export function FooterNav({ back, next, nextLabel = 'Continue', backLabel = 'Back' }) {
  return (
    <div className="footer-nav">
      {back ? (
        <button type="button" className="btn btn-ghost" onClick={back}>
          {backLabel}
        </button>
      ) : (
        <span />
      )}
      {next && (
        <button type="button" className="btn btn-primary" onClick={next}>
          {nextLabel}
        </button>
      )}
    </div>
  )
}

export function SectionHead({ kicker, title, children }) {
  return (
    <div className="section-head">
      {kicker && <p className="kicker">{kicker}</p>}
      <h1>{title}</h1>
      {children && <div className="lede">{children}</div>}
    </div>
  )
}
