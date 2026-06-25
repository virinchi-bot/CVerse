/**
 * Accessibility Improvements & WCAG 2.1 AA Compliance
 * Helpers for implementing accessibility best practices
 */

/**
 * ARIA labels for common components
 */
export const ARIA_LABELS = {
  mobileMenuButton: 'Toggle mobile navigation menu',
  searchButton: 'Search',
  userMenu: 'User account menu',
  dashboardSidebar: 'Dashboard navigation sidebar',
  mainContent: 'Main content',
  dashboardMain: 'Dashboard main content area',
  footer: 'Site footer',
  header: 'Site header',
};

/**
 * Common alt text patterns
 */
export const ALT_TEXT = {
  logo: 'CVerse - AI Resume and Career Intelligence Platform',
  tool: (toolName: string) => `${toolName} - CVerse Tool`,
  featureIcon: (featureName: string) => `${featureName} feature icon`,
  screenshot: (description: string) => `Screenshot: ${description}`,
};

/**
 * Skip navigation link helper
 */
export const SkipToMainContent = () => (
  <a
    href="#main-content"
    className="skip-to-main"
    style={{
      position: 'absolute',
      top: '-40px',
      left: 0,
      background: '#000',
      color: 'white',
      padding: '8px',
      textDecoration: 'none',
      zIndex: 100,
    }}
    onFocus={(e) => {
      e.currentTarget.style.top = '0';
    }}
    onBlur={(e) => {
      e.currentTarget.style.top = '-40px';
    }}
  >
    Skip to main content
  </a>
);

/**
 * Semantic heading structure
 */
export const HeadingLevels = {
  pageTitle: 'h1', // Page title (one per page)
  sectionTitle: 'h2', // Main sections
  subsectionTitle: 'h3', // Subsections
  minorHeading: 'h4', // Minor sections
};

/**
 * Color contrast ratios (WCAG AA)
 * AA: 4.5:1 for normal text, 3:1 for large text
 * AAA: 7:1 for normal text, 4.5:1 for large text
 */
export const COLOR_CONTRAST = {
  // Dark theme (CVerse uses dark theme)
  textOnDark: '#EAEAEA', // Pass AA on dark background
  textOnLight: '#0F1115', // Pass AA on light background
  accentOnDark: '#7C8CFF', // Pass AA on dark background
  mutedOnDark: '#6B7280', // Check contrast ratio
};

/**
 * Focus indicator styles (required for keyboard navigation)
 */
export const FOCUS_STYLES = {
  outline: '2px solid #7C8CFF',
  outlineOffset: '2px',
  borderRadius: '4px',
};

/**
 * Form accessibility helpers
 */
export const FORM_A11Y = {
  /**
   * Required attributes for form inputs
   */
  input: {
    type: 'text',
    required: true,
    'aria-label': '',
    'aria-required': true,
    'aria-describedby': '', // For error messages
  },

  /**
   * Error message pattern
   */
  errorMessage: (fieldName: string, message: string) => ({
    id: `${fieldName}-error`,
    role: 'alert',
    'aria-live': 'polite',
  }),
};

/**
 * Loading state accessibility
 */
export const LOADING_A11Y = {
  ariaBusy: true,
  ariaLabel: 'Loading content',
  'aria-live': 'polite',
};

/**
 * Modal/Dialog accessibility
 */
export const DIALOG_A11Y = {
  role: 'dialog',
  'aria-modal': true,
  'aria-labelledby': 'dialog-title',
  'aria-describedby': 'dialog-description',
};

/**
 * Common semantic HTML patterns
 */
export const SEMANTIC_HTML = {
  nav: 'navigation',
  main: 'main',
  section: 'section',
  article: 'article',
  aside: 'complementary',
  footer: 'contentinfo',
  header: 'banner',
};

/**
 * Screen reader only text component props
 */
export const SCREEN_READER_ONLY = {
  style: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0,0,0,0)',
    whiteSpace: 'nowrap',
    border: '0',
  } as React.CSSProperties,
};

/**
 * Link accessibility (external link indicator)
 */
export const EXTERNAL_LINK_INDICATOR = {
  title: 'Opens in new tab',
  target: '_blank',
  rel: 'noopener noreferrer',
};

/**
 * Testing checklist for accessibility
 */
export const A11Y_CHECKLIST = [
  '✓ All images have alt text',
  '✓ All form fields have associated labels',
  '✓ Color is not the only indicator of meaning',
  '✓ Keyboard navigation works throughout site',
  '✓ Focus indicators are visible',
  '✓ Heading hierarchy is correct (H1 > H2 > H3...)',
  '✓ Links have descriptive text',
  '✓ Buttons have descriptive labels',
  '✓ Forms have error messages',
  '✓ Videos have captions',
  '✓ Dynamic content updates are announced',
  '✓ No automatic redirects',
  '✓ Sufficient color contrast (4.5:1)',
  '✓ No content that flashes more than 3x per second',
  '✓ Skip to main content link exists',
];

/**
 * WCAG 2.1 Level AA Requirements
 */
export const WCAG_AA_REQUIREMENTS = {
  'Perceivable 1.3.1': 'Info and relationships conveyed through structure',
  'Perceivable 1.4.3': 'Contrast minimum 4.5:1 (normal text)',
  'Perceivable 1.4.11': 'Non-text contrast minimum 3:1',
  'Operable 2.1.1': 'All functionality available via keyboard',
  'Operable 2.4.3': 'Focus order is meaningful',
  'Operable 2.4.7': 'Focus indicator visible',
  'Understandable 3.2.1': 'No unexpected context changes on input',
  'Understandable 3.3.1': 'Error identification',
  'Robust 4.1.2': 'Name, role, value properly exposed',
  'Robust 4.1.3': 'Status messages properly exposed',
};
