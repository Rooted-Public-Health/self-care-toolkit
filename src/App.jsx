import { useState } from 'react'
import Shell from './components/Shell'
import { usePlan } from './usePlan'
import { dimById } from './data'
import {
  Choose,
  Cover,
  DailyPlanner,
  EmergencyNeeds,
  EmergencyPlanner,
  Evaluate,
  Goals,
  Intro,
  Needs,
  OneSheet,
} from './screens'

const FLOW = [
  'cover',
  'intro',
  'wheel',
  'evaluate',
  'needs',
  'daily',
  'emergency-needs',
  'emergency-plan',
  'goals',
  'onesheet',
]

export default function App() {
  const { plan, setPlan, update, reset } = usePlan()
  const [view, setView] = useState('cover')

  function go(id) {
    setView(id)
    if (id !== 'cover') update({ view: id })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function next() {
    const i = FLOW.indexOf(view)
    if (i >= 0 && i < FLOW.length - 1) go(FLOW[i + 1])
  }

  function back() {
    const i = FLOW.indexOf(view)
    if (i > 0) go(FLOW[i - 1])
  }

  const starting = dimById(plan.startingDimension)
  const startId = plan.startingDimension

  let screen = null
  if (view === 'cover')
    screen = (
      <Cover
        onBegin={() => go('intro')}
        canResume={plan.view && plan.view !== 'cover'}
        onResume={() => go(plan.view === 'cover' ? 'intro' : plan.view)}
      />
    )
  else if (view === 'intro') screen = <Intro onNext={next} />
  else if (view === 'wheel')
    screen = (
      <Choose
        selectedId={startId}
        onSelect={(id) => update({ startingDimension: id })}
        onNext={next}
        onBack={back}
      />
    )
  else if (view === 'evaluate')
    screen = (
      <Evaluate
        plan={plan}
        setPlan={setPlan}
        startId={startId}
        onNext={next}
        onBack={back}
      />
    )
  else if (view === 'needs')
    screen = <Needs startId={startId} onNext={next} onBack={back} />
  else if (view === 'daily')
    screen = (
      <DailyPlanner
        plan={plan}
        setPlan={setPlan}
        startId={startId}
        onNext={next}
        onBack={back}
      />
    )
  else if (view === 'emergency-needs')
    screen = (
      <EmergencyNeeds plan={plan} setPlan={setPlan} onNext={next} onBack={back} />
    )
  else if (view === 'emergency-plan')
    screen = (
      <EmergencyPlanner plan={plan} setPlan={setPlan} onNext={next} onBack={back} />
    )
  else if (view === 'goals')
    screen = <Goals plan={plan} setPlan={setPlan} onNext={next} onBack={back} />
  else if (view === 'onesheet')
    screen = (
      <OneSheet
        plan={plan}
        onBack={back}
        onReset={() => {
          if (window.confirm('Clear all saved answers on this device?')) {
            reset()
            go('cover')
          }
        }}
      />
    )

  return (
    <Shell view={view} onNavigate={go} starting={starting}>
      {screen}
    </Shell>
  )
}
