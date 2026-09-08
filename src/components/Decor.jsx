export function Leaf({ className, color = '#3989F4' }) {
  return (
    <svg className={className} viewBox="0 0 160 180" fill="none" aria-hidden="true">
      <path
        d="M86 8c18 22 44 48 52 86-28 8-58 4-78-16 8-26 16-48 26-70Z"
        fill={color}
      />
      <path
        d="M58 42c16 18 32 42 34 72-24 4-48-6-62-24 8-18 18-34 28-48Z"
        fill={color}
        opacity="0.85"
      />
      <path
        d="M38 78c12 16 22 34 22 56-20 0-38-14-48-30 8-10 16-18 26-26Z"
        fill={color}
        opacity="0.7"
      />
      <path d="M84 20c-6 44-18 78-40 108" stroke={color} strokeWidth="3" />
    </svg>
  )
}

export function Hibiscus({ className, color = '#48DE0D' }) {
  return (
    <svg className={className} viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <path
        d="M40 12c6 10 8 18 4 26 8-2 16 2 22 10-8 4-16 4-24 0 2 8-2 16-10 22-4-8-4-16 0-24-8 4-16 4-24 0 6-8 14-12 22-10-4-8-2-16 4-26 2 8 4 14 6 2Z"
        fill={color}
      />
      <circle cx="40" cy="40" r="5" fill={color} />
    </svg>
  )
}

export function CornerFlowers() {
  return (
    <div className="corner-flowers" aria-hidden="true">
      <svg className="cf cf-tl" viewBox="0 0 120 120" fill="none">
        <path d="M18 86c10-22 28-40 52-48" stroke="#F49E39" strokeWidth="4" strokeLinecap="round" />
        <circle cx="28" cy="70" r="10" fill="#F49E39" />
        <circle cx="48" cy="52" r="12" fill="#FA6DB1" />
        <circle cx="72" cy="40" r="8" fill="#F49E39" />
      </svg>
      <svg className="cf cf-tr" viewBox="0 0 120 120" fill="none">
        <path d="M22 18c22 10 44 28 52 52" stroke="#B9F552" strokeWidth="4" />
        <path d="M70 28c18 22 28 40 22 58-20 4-40-8-52-26 8-14 18-26 30-32Z" fill="#B9F552" />
      </svg>
      <svg className="cf cf-bl" viewBox="0 0 120 120" fill="none">
        <path d="M20 30c8 28 28 52 58 62" stroke="#4EABCC" strokeWidth="4" />
        <circle cx="28" cy="48" r="7" fill="#4EABCC" />
        <circle cx="44" cy="68" r="8" fill="#4EABCC" />
        <circle cx="66" cy="84" r="6" fill="#3989F4" />
      </svg>
      <svg className="cf cf-br" viewBox="0 0 120 120" fill="none">
        <path d="M96 28c-18 16-34 40-36 68" stroke="#FA6DB1" strokeWidth="4" />
        <circle cx="78" cy="46" r="11" fill="#FA6DB1" />
        <circle cx="62" cy="68" r="9" fill="#A2005A" />
        <circle cx="70" cy="88" r="7" fill="#FA6DB1" />
      </svg>
    </div>
  )
}
