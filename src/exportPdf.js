import { jsPDF } from 'jspdf'
import { DIMENSIONS, EMERGENCY_TOOLS, PLANNER_ORDER, dimById } from './data'

function blank(value) {
  const text = String(value ?? '').trim()
  return text || '-'
}

export function downloadPlanPdf(plan) {
  const doc = new jsPDF({ unit: 'pt', format: 'letter' })
  const pageW = doc.internal.pageSize.getWidth()
  const pageH = doc.internal.pageSize.getHeight()
  const m = 48
  const maxW = pageW - m * 2
  let y = m

  const navy = [37, 53, 64]
  const magenta = [162, 0, 90]
  const muted = [93, 105, 113]
  const lavender = [220, 167, 255]
  const cyan = [167, 217, 255]
  const peach = [245, 176, 105]
  const teal = [63, 163, 186]

  function addFooter() {
    const pages = doc.getNumberOfPages()
    for (let i = 1; i <= pages; i += 1) {
      doc.setPage(i)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.setTextColor(...muted)
      doc.text(
        'Self-Care Toolkit  ·  Advancing a Healthier Wisconsin  ·  Saved copy for personal use',
        m,
        pageH - 28,
      )
      doc.text(`Page ${i} of ${pages}`, pageW - m, pageH - 28, { align: 'right' })
    }
  }

  function need(height) {
    if (y + height > pageH - 52) {
      doc.addPage()
      y = m
    }
  }

  function band(title, fill) {
    need(32)
    doc.setFillColor(...fill)
    doc.rect(m, y, maxW, 24, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.setTextColor(...navy)
    doc.text(title, m + 10, y + 16)
    y += 34
  }

  function para(text, { size = 10, bold = false, color = navy, gap = 8 } = {}) {
    doc.setFont('helvetica', bold ? 'bold' : 'normal')
    doc.setFontSize(size)
    doc.setTextColor(...color)
    const lines = doc.splitTextToSize(text, maxW)
    need(lines.length * (size + 3) + gap)
    doc.text(lines, m, y)
    y += lines.length * (size + 3) + gap
  }

  function labeledBlock(label, value) {
    const lines = doc.splitTextToSize(blank(value), maxW - 16)
    const h = 22 + lines.length * 13 + 10
    need(h)
    doc.setDrawColor(...teal)
    doc.setLineWidth(1)
    doc.rect(m, y, maxW, h)
    doc.setFillColor(243, 226, 255)
    doc.rect(m, y, maxW, 20, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(...navy)
    doc.text(label, m + 8, y + 14)
    doc.setFont('helvetica', 'normal')
    doc.text(lines, m + 8, y + 36)
    y += h + 8
  }

  const starting = dimById(plan.startingDimension)
  const today = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.setTextColor(...magenta)
  doc.text('Self-Care Toolkit', m, y)
  y += 26

  para('My completed self-care plan', { size: 13, bold: true, gap: 6 })
  para(`Saved on ${today}`, { size: 10, color: muted, gap: 6 })
  para(
    starting
      ? `Starting dimension: ${starting.name}`
      : 'Starting dimension: not selected',
    { size: 11, bold: true, gap: 16 },
  )

  band('Step 1: Evaluate your current state', cyan)
  para('How well you are attending to each dimension right now (1 needs attention · 5 thriving).', {
    size: 9,
    color: muted,
    gap: 10,
  })
  DIMENSIONS.forEach((d) => {
    const score = plan.ratings?.[d.id]
    const label = score ? `${score} / 5` : 'Not rated'
    para(`${d.name}: ${label}`, { size: 10, gap: 4 })
  })
  y += 10

  band('My Daily Self-Care Plan', lavender)
  para('Favorite practices for each category:', { size: 9, color: muted, gap: 10 })
  PLANNER_ORDER.forEach((id) => {
    const d = dimById(id)
    labeledBlock(d.name, plan.daily?.[id])
  })

  band('Step 4: Emergency self-care needs', cyan)
  EMERGENCY_TOOLS.forEach((tool) => {
    const row = plan.emergencyNeeds?.[tool.id] || { helpful: '', harmful: '' }
    para(tool.name, { size: 11, bold: true, gap: 4 })
    para(`Helpful (what to do): ${blank(row.helpful)}`, { size: 10, gap: 4 })
    para(`Harmful (what to avoid): ${blank(row.harmful)}`, { size: 10, gap: 12 })
  })

  band('My Emergency Self-Care Plan', cyan)
  para('Helpful (to do)', { size: 11, bold: true, gap: 4 })
  ;(plan.emergencyHelpful || []).forEach((item, i) => {
    para(`${i + 1}. ${blank(item)}`, { size: 10, gap: 4 })
  })
  y += 8
  para('Harmful (to avoid)', { size: 11, bold: true, gap: 4 })
  ;(plan.emergencyHarmful || []).forEach((item, i) => {
    para(`${i + 1}. ${blank(item)}`, { size: 10, gap: 4 })
  })
  y += 10

  band('My Goals', peach)
  ;(plan.goals || []).forEach((goal, i) => {
    para(`${i + 1}. ${blank(goal)}`, { size: 11, gap: 8 })
  })

  y += 8
  para(
    'Look at this plan regularly. Update it with what works and what does not. This PDF is your copy. Answers in the web app stay only on the device where you typed them.',
    { size: 9, color: muted, gap: 0 },
  )

  addFooter()
  doc.save('self-care-plan.pdf')
}
