import { useMemo, useRef, useState } from 'react'
import { DIMENSIONS } from '../data'

const SIZE = 420
const CX = SIZE / 2
const CY = SIZE / 2
const R = 188
const INNER = 78

function polar(cx, cy, r, angleDeg) {
  const a = ((angleDeg - 90) * Math.PI) / 180
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)]
}

function slicePath(index, count) {
  const sweep = 360 / count
  const start = index * sweep
  const end = start + sweep
  const [x1, y1] = polar(CX, CY, R, start)
  const [x2, y2] = polar(CX, CY, R, end)
  const [ix1, iy1] = polar(CX, CY, INNER, end)
  const [ix2, iy2] = polar(CX, CY, INNER, start)
  const large = sweep > 180 ? 1 : 0
  return `M ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} L ${ix1} ${iy1} A ${INNER} ${INNER} 0 ${large} 0 ${ix2} ${iy2} Z`
}

function labelPos(index, count) {
  const sweep = 360 / count
  const mid = index * sweep + sweep / 2
  return polar(CX, CY, (R + INNER) / 2 + 4, mid)
}

export default function Wheel({ selectedId, onSelect }) {
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [motion, setMotion] = useState('nudge')
  const spinRef = useRef(0)

  const slices = useMemo(
    () =>
      DIMENSIONS.map((dim, i) => {
        const [lx, ly] = labelPos(i, DIMENSIONS.length)
        return { dim, i, path: slicePath(i, DIMENSIONS.length), lx, ly }
      }),
    [],
  )

  function rotateTo(index, extraTurns, mode) {
    const sweep = 360 / DIMENSIONS.length
    const mid = index * sweep + sweep / 2
    const current = ((rotation % 360) + 360) % 360
    const targetMod = (360 - mid + 360) % 360
    let delta = targetMod - current
    if (delta < 0) delta += 360
    const next = rotation + extraTurns * 360 + delta
    const delayMs = mode === 'spin' ? 4100 : 850
    setMotion(mode)
    setSpinning(true)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setRotation(next)
      })
    })
    window.setTimeout(() => {
      setSpinning(false)
      onSelect(DIMENSIONS[index].id)
    }, delayMs)
  }

  function spin() {
    if (spinning) return
    spinRef.current += 1
    const index = Math.floor(Math.random() * DIMENSIONS.length)
    rotateTo(index, 4 + (spinRef.current % 2), 'spin')
  }

  function clickSlice(index) {
    if (spinning) return
    rotateTo(index, 0, 'nudge')
  }

  return (
    <div className="wheel-wrap">
      <div className="wheel-pointer" aria-hidden="true" />
      <svg
        className={`wheel ${motion === 'spin' ? 'is-spinning' : ''}`}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        role="img"
        aria-label="Eight dimensions of wellness wheel"
      >
        <g
          className="wheel-rotor"
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: `${CX}px ${CY}px`,
          }}
        >
          {slices.map(({ dim, i, path, lx, ly }) => {
            const active = selectedId === dim.id
            return (
              <g key={dim.id}>
                <path
                  d={path}
                  fill={dim.color}
                  className={`wheel-slice ${active ? 'is-active' : ''}`}
                  onClick={() => clickSlice(i)}
                  role="button"
                  tabIndex={spinning ? -1 : 0}
                  aria-label={dim.name}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      clickSlice(i)
                    }
                  }}
                />
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={dim.text}
                  className="wheel-label"
                  style={{ pointerEvents: 'none' }}
                >
                  {dim.name.toUpperCase()}
                </text>
              </g>
            )
          })}
        </g>
        <circle cx={CX} cy={CY} r={INNER - 2} fill="#fff" />
        <circle cx={CX} cy={CY} r={INNER - 2} fill="none" stroke="#253540" strokeWidth="2.5" />
        <text x={CX} y={CY - 10} textAnchor="middle" className="wheel-hub-kicker" fill="#253540">
          8 Dimensions
        </text>
        <text x={CX} y={CY + 16} textAnchor="middle" className="wheel-hub-title" fill="#A2005A">
          of Wellness
        </text>
      </svg>
      <button type="button" className="btn btn-spin" onClick={spin} disabled={spinning}>
        {spinning ? 'Spinning…' : 'Spin the wheel'}
      </button>
      <p className="wheel-hint">Click a slice, or spin to choose which area to start with first.</p>
    </div>
  )
}
