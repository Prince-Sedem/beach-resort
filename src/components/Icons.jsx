// Small inline icon set, so the site needs no icon library.
const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const make = (children) =>
  function Icon({ size = 20, className = '', ...rest }) {
    return (
      <svg {...base} width={size} height={size} className={className} {...rest}>
        {children}
      </svg>
    )
  }

export const MenuIcon = make(<path d="M4 7h16M4 12h16M4 17h10" />)
export const CloseIcon = make(<path d="M18 6 6 18M6 6l12 12" />)
export const CalendarIcon = make(
  <>
    <rect x="3" y="4.5" width="18" height="16.5" rx="2.5" />
    <path d="M16 2.5v4M8 2.5v4M3 10h18" />
  </>,
)
export const UsersIcon = make(
  <>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.6a3.5 3.5 0 0 1 0 6.8M18.5 20a6.5 6.5 0 0 0-2.6-5.2" />
  </>,
)
export const BedIcon = make(<path d="M2.5 5v14M2.5 9.5h16a3 3 0 0 1 3 3V19M2.5 15.5h19M6.5 9.5v6" />)
export const BathIcon = make(
  <path d="M3.5 12h17v2.5a5.5 5.5 0 0 1-5.5 5.5H9a5.5 5.5 0 0 1-5.5-5.5zM6 12V6a2 2 0 0 1 3.6-1.2M7 20l-1 2M17 20l1 2" />,
)
export const PinIcon = make(
  <>
    <path d="M19.5 10c0 5.5-7.5 11.5-7.5 11.5S4.5 15.5 4.5 10a7.5 7.5 0 0 1 15 0Z" />
    <circle cx="12" cy="10" r="2.6" />
  </>,
)
export const PhoneIcon = make(
  <path d="M21.5 16.6v2.8a2 2 0 0 1-2.2 2A19.6 19.6 0 0 1 2.6 4.7 2 2 0 0 1 4.6 2.5h2.8a2 2 0 0 1 2 1.7c.12.9.34 1.8.66 2.6a2 2 0 0 1-.45 2.1L8.4 10.1a16 16 0 0 0 5.5 5.5l1.2-1.2a2 2 0 0 1 2.1-.45c.85.32 1.7.54 2.6.66a2 2 0 0 1 1.7 2Z" />,
)
export const MailIcon = make(
  <>
    <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
    <path d="m3 6.5 9 6.5 9-6.5" />
  </>,
)
export const ClockIcon = make(
  <>
    <circle cx="12" cy="12" r="9.5" />
    <path d="M12 6.5V12l3.5 2" />
  </>,
)
export const ArrowIcon = make(<path d="M7 17 17 7M8 7h9v9" />)
export const CopyIcon = make(
  <>
    <rect x="9" y="9" width="12" height="12" rx="2.5" />
    <path d="M5 15H4.5A2 2 0 0 1 2.5 13V4.5a2 2 0 0 1 2-2H13a2 2 0 0 1 2 2V5" />
  </>,
)
export const CheckIcon = make(<path d="M20 6 9 17l-5-5" />)

// WhatsApp mark, drawn as a filled glyph.
export function WhatsAppIcon({ size = 20, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2.2a9.7 9.7 0 0 0-8.4 14.6L2.3 21.7l5-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.7c-1.5 0-3-.4-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9Zm4.4-6c-.24-.12-1.43-.7-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06a6.5 6.5 0 0 1-3.25-2.84c-.25-.42.25-.4.7-1.3.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46a.9.9 0 0 0-.64.3c-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64 1.53.66 2.13.72 2.9.6.47-.07 1.43-.58 1.63-1.15.2-.57.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28Z"
      />
    </svg>
  )
}
