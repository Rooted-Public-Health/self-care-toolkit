import { useState } from 'react'
import {
  ADDITIONAL_EXAMPLES,
  COPY,
  EMERGENCY_TOOLS,
  HARMFUL_EXAMPLES,
  HELPFUL_EXAMPLES,
  PLANNER_ORDER,
  SMART,
  dimById,
  orderedDimensions,
} from './data'
import Wheel from './components/Wheel'
import { CornerFlowers, Hibiscus } from './components/Decor'
import { FooterNav, SectionHead } from './components/Shell'

function appendLine(current, item) {
  const lines = (current || '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
  if (lines.includes(item)) return current
  return [...lines, item].join('\n')
}

function setIndex(arr, i, value) {
  const next = [...arr]
  next[i] = value
  return next
}

export function Cover({ onBegin, onResume, canResume }) {
  return (
    <section className="cover">
      <CornerFlowers />
      <p className="eyebrow">Advancing a Healthier Wisconsin</p>
      <h1 className="cover-title">Self-Care Toolkit</h1>
      <div className="cover-copy">
        <p>
          Created for Advancing a Healthier Wisconsin Community Project titled
          <em>
            {' '}
            “Strengthening Minoritized CHW Capacity to Combat Secondary Trauma
            using Natural Approaches”
          </em>
        </p>
        <p>
          In partnership with Medical College of Wisconsin and Lawrence
          University
        </p>
        <p className="muted">
          Toolkit adapted from the Self Care Starter Kit from the University of
          Alberta, CA
        </p>
      </div>
      <div className="cover-actions">
        <button type="button" className="btn btn-primary btn-lg" onClick={onBegin}>
          Open the toolkit
        </button>
        {canResume && (
          <button type="button" className="btn btn-ghost btn-lg" onClick={onResume}>
            Resume where I left off
          </button>
        )}
      </div>
    </section>
  )
}

export function Intro({ onNext }) {
  return (
    <section className="page intro-page">
      <SectionHead kicker="Before you begin" title="What is Self-Care?">
        <p>{COPY.whatIs}</p>
        <p>{COPY.noOneSize}</p>
      </SectionHead>
      <FooterNav next={onNext} nextLabel="Choose a starting area" />
    </section>
  )
}

export function Choose({ selectedId, onSelect, onNext, onBack }) {
  const selected = dimById(selectedId)
  return (
    <section className="page wheel-page">
      <SectionHead
        kicker="8 Dimensions of Wellness"
        title="Which area will you start with first?"
      >
        <p>
          Self-care extends far beyond your basic physical needs. Select a
          dimension on the wheel — or spin — and we will lead with that area
          through your planners.
        </p>
      </SectionHead>
      <div className="wheel-layout">
        <Wheel selectedId={selectedId} onSelect={onSelect} />
        <aside className="wheel-panel">
          {selected ? (
            <>
              <p className="dim-chip" style={{ background: selected.color, color: selected.text }}>
                {selected.name}
              </p>
              <p className="wheel-desc">{selected.description}</p>
              <p className="examples-label">Examples of self-care practices in this area:</p>
              <p>{selected.examples}</p>
              <button type="button" className="btn btn-primary" onClick={onNext}>
                Start with {selected.name}
              </button>
            </>
          ) : (
            <p className="muted">
              Click a slice on the wheel, or use Spin the wheel, to choose your
              first focus.
            </p>
          )}
        </aside>
      </div>
      <FooterNav back={onBack} />
    </section>
  )
}

export function Evaluate({ plan, setPlan, onNext, onBack, startId }) {
  const dims = orderedDimensions(startId)
  return (
    <section className="page">
      <SectionHead kicker="Step 1" title="Evaluate Your Current State">
        <p>{COPY.step1}</p>
        <p>
          Rate how well you are attending to each dimension of wellness right
          now. There is no one-size-fits-all option — be honest with yourself.
        </p>
      </SectionHead>
      <div className="rate-grid">
        {dims.map((d) => (
          <article
            key={d.id}
            className={`rate-card ${startId === d.id ? 'is-start' : ''}`}
            style={{ '--accent': d.color }}
          >
            <header>
              <h3>{d.name}</h3>
              {startId === d.id && <span className="tag">Starting here</span>}
            </header>
            <p>{d.description}</p>
            <div className="dots" role="group" aria-label={`${d.name} rating`}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  className={`dot ${plan.ratings[d.id] === n ? 'is-on' : ''}`}
                  onClick={() =>
                    setPlan((p) => ({
                      ...p,
                      ratings: { ...p.ratings, [d.id]: n },
                    }))
                  }
                  aria-label={`${n} of 5`}
                >
                  {n}
                </button>
              ))}
            </div>
            <p className="scale-hint">
              1 needs attention · 5 thriving
            </p>
          </article>
        ))}
      </div>
      <FooterNav back={onBack} next={onNext} />
    </section>
  )
}

export function Needs({ startId, onNext, onBack }) {
  const dims = orderedDimensions(startId)
  return (
    <section className="page">
      <SectionHead kicker="Step 2" title="Identify Your Self-Care Needs">
        <p>{COPY.step2}</p>
        <p>{COPY.step2Reflect}</p>
      </SectionHead>
      <div className="table-wrap">
        <table className="needs-table">
          <thead>
            <tr>
              <th>Area of Self-Care</th>
              <th>Examples of self-care practices in that area:</th>
            </tr>
          </thead>
          <tbody>
            {dims.map((d) => (
              <tr key={d.id} className={startId === d.id ? 'is-start' : ''}>
                <td>
                  <strong>{d.name}</strong>
                  {startId === d.id && <span className="tag">Start</span>}
                </td>
                <td>{d.examples}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="lede">{COPY.step3Intro}</p>
      <FooterNav back={onBack} next={onNext} nextLabel="Open daily planner" />
    </section>
  )
}

export function DailyPlanner({ plan, setPlan, startId, onNext, onBack }) {
  const dims = orderedDimensions(startId)
  const [focusId, setFocusId] = useState(startId || dims[0].id)

  function setDaily(id, value) {
    setPlan((p) => ({ ...p, daily: { ...p.daily, [id]: value } }))
  }

  function addExample(item) {
    const target = focusId || startId || dims[0].id
    setDaily(target, appendLine(plan.daily[target], item))
  }

  const focusName = dimById(focusId)?.name || 'this area'

  return (
    <section className="page">
      <SectionHead kicker="Step 3" title="Create a Daily Self-Care Planner">
        <p>{COPY.step3Intro}</p>
        <p>{COPY.dailyPrompt}</p>
      </SectionHead>
      <div className="daily-sheet">
        <div className="lavender-bar">
          <h2>My Daily Self-Care Planner</h2>
        </div>
        <div className="daily-grid">
          {dims.map((d) => (
            <div
              key={d.id}
              className={`daily-cell ${startId === d.id ? 'is-start' : ''} ${focusId === d.id ? 'is-focus' : ''}`}
            >
              <div className="daily-head">
                <h3>
                  {d.name}
                  {startId === d.id && <span className="tag">Start here</span>}
                </h3>
                <p>{d.examples}</p>
              </div>
              <textarea
                value={plan.daily[d.id]}
                onChange={(e) => setDaily(d.id, e.target.value)}
                onFocus={() => setFocusId(d.id)}
                placeholder="Your practices…"
                rows={5}
              />
            </div>
          ))}
        </div>
      </div>
      <p className="examples-label">Additional examples — tap to add to {focusName}:</p>
      <div className="chips">
        {ADDITIONAL_EXAMPLES.map((ex) => (
          <button key={ex} type="button" className="chip" onClick={() => addExample(ex)}>
            {ex}
          </button>
        ))}
      </div>
      <FooterNav back={onBack} next={onNext} nextLabel="Emergency self-care" />
    </section>
  )
}

export function EmergencyNeeds({ plan, setPlan, onNext, onBack }) {
  function setField(id, field, value) {
    setPlan((p) => ({
      ...p,
      emergencyNeeds: {
        ...p.emergencyNeeds,
        [id]: { ...p.emergencyNeeds[id], [field]: value },
      },
    }))
  }

  return (
    <section className="page">
      <SectionHead kicker="Step 4" title="Identify your Emergency Self-Care Needs">
        <p>{COPY.step4Intro}</p>
        <p>{COPY.step4Reflect}</p>
      </SectionHead>
      <div className="table-wrap">
        <table className="needs-table emergency-table">
          <thead>
            <tr>
              <th>Emergency Self-Care Tools</th>
              <th>Helpful (What to Do)</th>
              <th>Harmful (What to Avoid)</th>
            </tr>
          </thead>
          <tbody>
            {EMERGENCY_TOOLS.map((t) => (
              <tr key={t.id}>
                <td>
                  <strong>{t.name}</strong>
                  <p className="prompt">{t.prompt}</p>
                </td>
                <td>
                  <textarea
                    value={plan.emergencyNeeds[t.id].helpful}
                    onChange={(e) => setField(t.id, 'helpful', e.target.value)}
                    rows={4}
                    placeholder="Helpful…"
                  />
                </td>
                <td>
                  <textarea
                    value={plan.emergencyNeeds[t.id].harmful}
                    onChange={(e) => setField(t.id, 'harmful', e.target.value)}
                    rows={4}
                    placeholder="Harmful…"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <FooterNav back={onBack} next={onNext} nextLabel="Create emergency planner" />
    </section>
  )
}

export function EmergencyPlanner({ plan, setPlan, onNext, onBack }) {
  function add(kind, item) {
    setPlan((p) => {
      const key = kind === 'helpful' ? 'emergencyHelpful' : 'emergencyHarmful'
      const list = [...p[key]]
      if (list.includes(item)) return p
      const empty = list.findIndex((x) => !String(x).trim())
      if (empty === -1) return p
      list[empty] = item
      return { ...p, [key]: list }
    })
  }

  return (
    <section className="page">
      <SectionHead kicker="Step 5" title="Create an Emergency Self-Care Planner" />
      <div className="emergency-grid">
        <div className="em-col helpful">
          <h2>Helpful (to do)</h2>
          <p>{COPY.helpfulPrompt}</p>
          {plan.emergencyHelpful.map((v, i) => (
            <input
              key={`h-${i}`}
              value={v}
              onChange={(e) =>
                setPlan((p) => ({
                  ...p,
                  emergencyHelpful: setIndex(p.emergencyHelpful, i, e.target.value),
                }))
              }
              placeholder={`${i + 1}.`}
            />
          ))}
        </div>
        <div className="em-col harmful">
          <h2>Harmful (to avoid)</h2>
          <p>{COPY.harmfulPrompt}</p>
          {plan.emergencyHarmful.map((v, i) => (
            <input
              key={`x-${i}`}
              value={v}
              onChange={(e) =>
                setPlan((p) => ({
                  ...p,
                  emergencyHarmful: setIndex(p.emergencyHarmful, i, e.target.value),
                }))
              }
              placeholder={`${i + 1}.`}
            />
          ))}
        </div>
      </div>
      <div className="example-split">
        <div>
          <h3 className="orange-bar">Helpful</h3>
          <div className="chips">
            {HELPFUL_EXAMPLES.map((ex) => (
              <button key={ex} type="button" className="chip" onClick={() => add('helpful', ex)}>
                {ex}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="orange-bar">Not helpful</h3>
          <div className="chips">
            {HARMFUL_EXAMPLES.map((ex) => (
              <button key={ex} type="button" className="chip" onClick={() => add('harmful', ex)}>
                {ex}
              </button>
            ))}
          </div>
        </div>
      </div>
      <FooterNav back={onBack} next={onNext} nextLabel="Set goals" />
    </section>
  )
}

export function Goals({ plan, setPlan, onNext, onBack }) {
  return (
    <section className="page">
      <SectionHead kicker="Step 6" title="Set Achievable Goals for Yourself">
        <p>{COPY.step6Intro}</p>
        <p>{COPY.smartIntro}</p>
      </SectionHead>
      <div className="smart-letters" aria-hidden="true">
        {SMART.map((s) => (
          <span key={s.letter} style={{ color: s.color }}>
            {s.letter}.
          </span>
        ))}
      </div>
      <div className="smart-grid">
        {SMART.map((s) => (
          <article key={s.letter} className="smart-card">
            <h3 style={{ color: s.color }}>{s.word}</h3>
            <p>{s.note}</p>
          </article>
        ))}
      </div>
      <div className="goal-list">
        {plan.goals.map((g, i) => (
          <label key={i} className="goal-row">
            <span>{i + 1}.</span>
            <input
              value={g}
              onChange={(e) =>
                setPlan((p) => ({ ...p, goals: setIndex(p.goals, i, e.target.value) }))
              }
              placeholder="Write a S.M.A.R.T. goal…"
            />
          </label>
        ))}
      </div>
      <div className="final-block">
        <Hibiscus className="hibiscus" />
        <h2>Final Step: Use Your Self-Care Plan!</h2>
        <p>{COPY.finalStep}</p>
      </div>
      <FooterNav back={onBack} next={onNext} nextLabel="View one-sheet planner" />
    </section>
  )
}

export function OneSheet({ plan, onBack, onReset }) {
  return (
    <section className="page onesheet-page">
      <SectionHead title="My one-sheet self-care planner">
        <p>{COPY.onesheetIntro}</p>
      </SectionHead>
      <div className="print-actions">
        <button type="button" className="btn btn-primary" onClick={() => window.print()}>
          Print this page
        </button>
        <button type="button" className="btn btn-ghost" onClick={onReset}>
          Clear my answers
        </button>
      </div>
      <div className="onesheet">
        <div className="os-block lavender">
          <h2>My Daily Self-Care Plan</h2>
          <p className="os-prompt">List your favorite practices for each category:</p>
          <div className="os-daily">
            {PLANNER_ORDER.map((id) => {
              const d = dimById(id)
              return (
                <div key={d.id} className="os-cell">
                  <h3>{d.name}</h3>
                  <p>{plan.daily[d.id] || ' '}</p>
                </div>
              )
            })}
          </div>
        </div>
        <div className="os-block cyan">
          <h2>My Emergency Self-Care Plan</h2>
          <div className="os-em">
            <div>
              <h3>Helpful (to do)</h3>
              <p className="os-prompt">{COPY.helpfulPrompt}</p>
              <ol>
                {plan.emergencyHelpful.map((v, i) => (
                  <li key={i}>{v}</li>
                ))}
              </ol>
            </div>
            <div>
              <h3>Harmful (to avoid)</h3>
              <p className="os-prompt">{COPY.harmfulPrompt}</p>
              <ol>
                {plan.emergencyHarmful.map((v, i) => (
                  <li key={i}>{v}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
        <div className="os-block peach">
          <h2>My Goals</h2>
          <ol className="os-goals">
            {plan.goals.map((g, i) => (
              <li key={i}>{g}</li>
            ))}
          </ol>
        </div>
      </div>
      <FooterNav back={onBack} backLabel="Back to goals" />
    </section>
  )
}
