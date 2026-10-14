// Shared design tokens for Marlin Beach Resort.
// Layout idea: full-bleed photography framed by deep Atlantic navy, with
// salt-white reading sections and lantern gold reserved for booking actions.
export default {
  extend: {
    colors: {
      ink: '#0F2238', // night ocean, main dark surface
      deep: '#173A5E', // shallower water, raised dark surface
      marlin: '#2453B3', // the brand blue from the logo and bed runners
      lagoon: '#8FD6E4', // infinity-pool aqua, highlights on dark
      salt: '#F5F7F6', // page background
      shell: '#E9E1D3', // beach sand, quiet section background
      lantern: '#F0B341', // string-light gold, booking actions only
      mist: '#5B6B7C', // secondary text on light
    },
    fontFamily: {
      display: ['Gloock', 'Georgia', 'Times New Roman', 'serif'],
      sans: ['"Hanken Grotesk"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
    },
    maxWidth: {
      page: '76rem',
    },
    letterSpacing: {
      label: '0.06em',
    },
  },
}
