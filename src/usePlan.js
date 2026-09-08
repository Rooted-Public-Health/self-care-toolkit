import { useCallback, useEffect, useState } from 'react'
import { DIMENSIONS, EMERGENCY_TOOLS } from './data'

const KEY = 'ahw-self-care-toolkit-v1'

function emptyPlan() {
  return {
    view: 'cover',
    startingDimension: null,
    ratings: Object.fromEntries(DIMENSIONS.map((d) => [d.id, 0])),
    daily: Object.fromEntries(DIMENSIONS.map((d) => [d.id, ''])),
    emergencyNeeds: Object.fromEntries(
      EMERGENCY_TOOLS.map((t) => [t.id, { helpful: '', harmful: '' }]),
    ),
    emergencyHelpful: ['', '', '', '', ''],
    emergencyHarmful: ['', '', '', '', ''],
    goals: ['', '', ''],
  }
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return emptyPlan()
    return { ...emptyPlan(), ...JSON.parse(raw) }
  } catch {
    return emptyPlan()
  }
}

export function usePlan() {
  const [plan, setPlan] = useState(load)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(plan))
  }, [plan])

  const update = useCallback((patch) => {
    setPlan((prev) => ({ ...prev, ...patch }))
  }, [])

  const reset = useCallback(() => {
    const next = emptyPlan()
    setPlan(next)
    localStorage.removeItem(KEY)
  }, [])

  return { plan, setPlan, update, reset }
}
