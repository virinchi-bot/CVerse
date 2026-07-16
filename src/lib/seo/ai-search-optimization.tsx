/**
 * AI Search Optimization (GEO) for ChatGPT, Gemini, Claude, Perplexity, etc.
 * Best practices for appearing in AI search results and overviews
 */

/**
 * AI Search Optimization Principles
 */
export const AI_SEO_PRINCIPLES = {
  /**
   * 1. Entity-Based SEO
   * Define clear entity types and relationships
   */
  entities: {
    organization: 'CVerse',
    concept: 'AI Career Intelligence',
    tools: [
      'Resume Analyzer',
      'Skill Gap Detection',
      'Mock Interview',
      'CV Direction',
      'LinkedIn Branding',
      'Portfolio Generator',
    ],
  },

  /**
   * 2. Semantic Content Structure
   * Use clear semantic HTML and structured data
   */
  semanticStructure: {
    use: ['schema.org', 'JSON-LD', 'Semantic HTML5'],
    tags: ['<article>', '<section>', '<aside>', '<main>'],
  },

  /**
   * 3. Topic Authority & Expertise
   */
  topicAuthority: {
    core: 'Career Intelligence',
    subtopics: [
      'Resume Optimization',
      'ATS Scoring',
      'Skill Development',
      'Career Planning',
      'Interview Preparation',
      'Personal Branding',
    ],
  },

  /**
   * 4. Clear Q&A Structure
   * AI models prefer clear question-answer pairs
   */
  qaStructure: true,

  /**
   * 5. Rich Context & Definitions
   */
  context: true,
};

/**
 * Content Requirements for AI Search
 */
export const AI_CONTENT_REQUIREMENTS = {
  /**
   * FAQ Sections
   * Essential for AI comprehension
   */
  faqs: {
    minimum: 5,
    structure: '{question: string, answer: string}[]',
  },

  /**
   * Definitions
   * Define key terms clearly
   */
  definitions: {
    'ATS': 'Applicant Tracking System - software used by recruiters to parse resumes',
    'Skill Gap': 'The difference between current skills and required skills for a target role',
    'CV Direction': 'Career path recommendations based on skill analysis',
    'Mock Interview': 'AI-generated interview practice session',
  },

  /**
   * Statistics & Data
   * AI models value specific, verifiable data
   */
  statistics: {
    accuracy: '94% accuracy in ATS prediction',
    users: '10,000+ users',
    resumes_analyzed: '50,000+ resumes',
    interviews: '100,000+ practice sessions',
  },

  /**
   * Author Information
   */
  authorInfo: true,

  /**
   * Date Information
   */
  datePublished: true,
  dateModified: true,

  /**
   * Citation Structure
   */
  citations: true,
};

/**
 * AI Model-Specific Optimizations
 */
export const AI_MODEL_OPTIMIZATIONS = {
  /**
   * ChatGPT (OpenAI)
   */
  chatgpt: {
    focus: ['Clear structure', 'Semantic HTML', 'FAQs'],
    optimization: 'Use schema.org markup, clear headings, FAQ schema',
    crawler: 'OpenAI web crawler (if available)',
  },

  /**
   * Gemini (Google)
   */
  gemini: {
    focus: ['E-E-A-T', 'Structured data', 'Freshness'],
    optimization: 'Emphasize expertise, update frequently, use Google schema',
    crawler: 'Google crawlers',
  },

  /**
   * Claude (Anthropic)
   */
  claude: {
    focus: ['Clear explanations', 'Context', 'Nuance'],
    optimization: 'Write detailed explanations, provide context, avoid oversimplification',
    crawler: 'Anthropic crawlers',
  },

  /**
   * Perplexity
   */
  perplexity: {
    focus: ['Quick facts', 'Citations', 'Structure'],
    optimization: 'Use FAQs, cite sources, structured data',
    crawler: 'Perplexity crawlers',
  },

  /**
   * AI Overviews (Google SGE)
   */
  googleSGE: {
    focus: ['E-E-A-T', 'Schema', 'Comprehensive content'],
    optimization: 'Show expertise, use rich snippets, comprehensive content',
    crawler: 'Google crawlers',
  },
};

/**
 * E-E-A-T Framework (Experience, Expertise, Authoritativeness, Trustworthiness)
 */
export const EEAT_FRAMEWORK = {
  /**
   * Experience: First-hand knowledge and experience
   */
  experience: {
    actions: [
      'Share specific case studies',
      'Show user testimonials',
      'Include before/after examples',
      'Document AI training methodology',
    ],
  },

  /**
   * Expertise: Deep knowledge in the domain
   */
  expertise: {
    actions: [
      'Define technical terms',
      'Explain methodologies',
      'Show research backing',
      'Provide detailed comparisons',
    ],
  },

  /**
   * Authoritativeness: Recognized as a leader in field
   */
  authoritativeness: {
    actions: [
      'List credentials',
      'Show industry recognition',
      'Link to authoritative sources',
      'Get backlinks from authority sites',
    ],
  },

  /**
   * Trustworthiness: Users can trust the information
   */
  trustworthiness: {
    actions: [
      'Be transparent about limitations',
      'Show data sources',
      'Have privacy policy',
      'Show security measures',
      'Include contact information',
    ],
  },
};

/**
 * Content Optimization Checklist for AI Search
 */
export const AI_CONTENT_CHECKLIST = [
  '✓ Clear page title (H1)',
  '✓ Comprehensive description (150+ words)',
  '✓ FAQ schema implemented',
  '✓ Related content linked',
  '✓ Key terms defined',
  '✓ Statistics with sources',
  '✓ Author information included',
  '✓ Date published/modified',
  '✓ Clear content structure (H2, H3, etc.)',
  '✓ Schema.org markup',
  '✓ Internal linking strategy',
  '✓ Mobile-optimized',
  '✓ Fast loading time',
  '✓ HTTPS enabled',
  '✓ Privacy policy linked',
  '✓ Contact information provided',
  '✓ Unique value proposition clear',
  '✓ Comparisons to alternatives',
  '✓ Use cases documented',
  '✓ Limitations acknowledged',
];

/**
 * Content Structure for AI Comprehension
 */
export const AI_FRIENDLY_STRUCTURE = {
  /**
   * Heading hierarchy
   */
  headings: [
    'H1: Main topic',
    'H2: Key subtopics',
    'H3: Detailed explanations',
    'H4: Supporting details',
  ],

  /**
   * Optimal paragraph length
   */
  paragraphLength: {
    max: 150,
    min: 50,
    average: 100,
  },

  /**
   * Sentence complexity
   */
  readability: {
    grade: 8,
    fleschKincaid: 60,
  },

  /**
   * List usage
   */
  lists: {
    useFor: ['Steps', 'Features', 'Benefits', 'FAQs'],
    format: 'Numbered or bullet points',
  },

  /**
   * Table usage
   */
  tables: {
    useFor: ['Comparisons', 'Features matrix', 'Pricing'],
    accessible: true,
  },
};

/**
 * Key Terms for CVerse AI Optimization
 */
export const CVERSE_KEY_TERMS = {
  primary: [
    'AI resume analyzer',
    'Resume optimization',
    'ATS score',
    'Career intelligence',
    'AI career tools',
  ],
  secondary: [
    'Skill gap analysis',
    'Interview preparation',
    'Personal branding',
    'Portfolio generator',
    'Career planning',
  ],
  related: [
    'Resume format',
    'Job requirements',
    'Reskilling',
    'Career development',
    'LinkedIn optimization',
  ],
};

/**
 * AI Search Optimization Tasks
 */
export const AI_OPTIMIZATION_TASKS = {
  phase1: [
    'Implement comprehensive schema.org markup',
    'Create FAQ sections on all tool pages',
    'Define key terms and concepts',
    'Add statistics with sources',
  ],
  phase2: [
    'Create comparison content (vs competitors)',
    'Document use cases and case studies',
    'Add testimonials and reviews',
    'Create how-to guides',
  ],
  phase3: [
    'Optimize for each AI model specifically',
    'Monitor AI search appearances',
    'Iterate based on AI search performance',
    'Create AI-specific landing pages',
  ],
};

/**
 * Monitoring AI Search Performance
 */
export const AI_SEARCH_MONITORING = {
  tools: [
    'Google AI Overviews (SGE)',
    'ChatGPT web search integration',
    'Perplexity Analytics',
    'Manual searches in each AI',
  ],
  metrics: [
    'Citation count in AI responses',
    'Attribution frequency',
    'Answer position in AI response',
    'Traffic from AI sources',
  ],
  frequency: 'Weekly monitoring',
};
