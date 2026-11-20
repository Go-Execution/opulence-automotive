import type { SVGProps } from 'react'

interface OpulenceCrestProps extends SVGProps<SVGSVGElement> {
  size?: number
}

export function OpulenceCrest({ size = 34, className = '', ...props }: OpulenceCrestProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M24 3L42 13.5V34.5L24 45L6 34.5V13.5L24 3Z"
        stroke="url(#opulence-gold-grad)"
        strokeWidth="1.75"
      />
      <path
        d="M24 9.5L36.5 16.75V31.25L24 38.5L11.5 31.25V16.75L24 9.5Z"
        stroke="url(#opulence-gold-grad)"
        strokeWidth="1.2"
        strokeOpacity="0.65"
      />
      <path
        d="M24 15L31.5 19.3V28.7L24 33L16.5 28.7V19.3L24 15Z"
        stroke="#F5F4F0"
        strokeWidth="1.25"
        strokeOpacity="0.9"
      />
      <path
        d="M24 9.5V15M24 33V38.5M11.5 16.75L16.5 19.3M36.5 16.75L31.5 19.3"
        stroke="url(#opulence-gold-grad)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="opulence-gold-grad" x1="6" y1="3" x2="42" y2="45" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5DE8A" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#9A781F" />
        </linearGradient>
      </defs>
    </svg>
  )
}
