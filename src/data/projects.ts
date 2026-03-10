import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

export interface ProjectPhase {
  title: string;
  description: string;
}

export interface Annotation {
  title: string;
  insight: string;
}

export interface DesignSystemItem {
  label: string;
  detail: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  image: string;
  description: string;
  overview: string;
  problem: string;
  goal: string;
  role: string;
  timeline: string;
  tools: string[];
  phases: ProjectPhase[];
  annotations: Annotation[];
  systemItems: DesignSystemItem[];
  constraint: string;
  outcome: string;
}

export const projects: Project[] = [
  {
    slug: "fintrack-dashboard",
    title: "FinTrack Dashboard",
    category: "Mobile App · UI/UX · Development",
    image: project1,
    description:
      "A comprehensive finance tracking app with real-time analytics and intuitive data visualization.",
    overview:
      "FinTrack needed a mobile-first dashboard that empowers users to take control of their finances. The challenge was distilling complex financial data into clear, actionable insights — without overwhelming the user.",
    problem:
      "Users struggle to track multiple accounts and investment types in one place, leading to financial anxiety and missed budget goals. Existing apps surfaced too much data with too little hierarchy.",
    goal:
      "Create a unified, high-density dashboard that prioritizes 'Burn Rate' and 'Net Worth' for quick daily check-ins — reducing cognitive load while increasing financial confidence.",
    role: "Lead Designer & Frontend Developer",
    timeline: "8 weeks",
    tools: ["Figma", "React Native", "D3.js", "Tailwind CSS"],
    phases: [
      {
        title: "Discovery & Research",
        description:
          "Conducted user interviews with 12 potential users to understand pain points in existing finance apps. Mapped out key user journeys and identified opportunities for simplification through competitive analysis.",
      },
      {
        title: "Information Architecture",
        description:
          "Structured the app's navigation around three core actions: track, analyze, and plan. Created user flow diagrams and a sitemap that prioritized the most frequent tasks within two taps.",
      },
      {
        title: "Wireframing & Prototyping",
        description:
          "Iterated through low-fidelity wireframes to test layout hypotheses. Built an interactive prototype in Figma to validate the dashboard hierarchy and data visualization approach with stakeholders.",
      },
      {
        title: "Visual Design",
        description:
          "Developed a clean, data-forward visual language with a restrained color palette. Designed custom chart components that balance density with readability, using progressive disclosure to avoid cognitive overload.",
      },
      {
        title: "Development & Handoff",
        description:
          "Built the frontend using React Native with pixel-perfect implementation of the designs. Collaborated closely with the backend team to ensure real-time data updates rendered smoothly in the UI.",
      },
    ],
    annotations: [
      {
        title: "Chart Selection",
        insight:
          "Used sparklines instead of full area charts to save vertical space while still conveying 7-day spending trends at a glance. Full charts are accessible via tap-to-expand.",
      },
      {
        title: "Information Hierarchy",
        insight:
          "Placed 'Total Balance' in the top-left — the primary scan point — because user research showed it's the #1 metric checked 5+ times daily. Secondary metrics cascade below by frequency of use.",
      },
      {
        title: "Color as Data",
        insight:
          "Reserved the accent color exclusively for actionable states (positive gains, CTAs). Neutral tones handle all non-critical data, preventing the 'Christmas tree' problem common in finance dashboards.",
      },
    ],
    systemItems: [
      { label: "Chart Styles", detail: "Sparklines, donut, stacked bar — all sharing a unified color scale and tooltip pattern" },
      { label: "Card Components", detail: "Three density levels (compact, standard, expanded) for responsive data display" },
      { label: "Typography Scale", detail: "4 heading sizes and 2 body sizes with strict line-height ratios for data readability" },
      { label: "Interactive States", detail: "Hover, active, loading, and empty states designed for every data widget" },
    ],
    constraint:
      "Designed mobile-first for a 'financial habit' use case, requiring all primary actions (Transfer, Add Expense) to be within thumb-reach at the bottom of the screen. Desktop was treated as a secondary viewport.",
    outcome:
      "The app launched to a 4.7-star rating on the App Store. User engagement increased by 40% compared to the client's previous solution, with session duration averaging 6 minutes — double the industry benchmark.",
  },
  {
    slug: "namely-ecommerce",
    title: "Namely E-Commerce",
    category: "Web Design · Frontend · Shopify",
    image: project2,
    description:
      "A luxury fashion e-commerce platform with a focus on editorial-style product presentation.",
    overview:
      "Namely wanted their online store to feel like a fashion magazine — immersive, aspirational, and effortless to shop. The goal was to elevate brand perception while driving conversion.",
    problem:
      "The existing Shopify store had a 1.2% conversion rate — well below industry average. Heatmap analysis revealed users were scrolling past products without engaging, and the brand felt 'generic' compared to competitors.",
    goal:
      "Redesign the shopping experience as an editorial journey, where every product feels curated and intentional — increasing both time-on-site and average order value.",
    role: "UI/UX Designer & Shopify Developer",
    timeline: "6 weeks",
    tools: ["Figma", "Shopify Liquid", "CSS", "JavaScript"],
    phases: [
      {
        title: "Discovery & Research",
        description:
          "Audited the existing Shopify store and identified UX friction points through heatmap analysis. Studied luxury e-commerce benchmarks (Ssense, Mr Porter) to define the aspirational standard.",
      },
      {
        title: "Content Strategy",
        description:
          "Collaborated with the brand team to define an editorial approach to product storytelling. Structured collections around lifestyle narratives rather than traditional category grids.",
      },
      {
        title: "Wireframing & Prototyping",
        description:
          "Designed modular page templates that blend editorial content with shoppable elements. Prototyped the product detail page to test image gallery interactions and size selection flows.",
      },
      {
        title: "Visual Design",
        description:
          "Crafted a typographically rich design system using serif headlines and generous whitespace. Product photography was given hero treatment with full-bleed layouts and minimal UI chrome.",
      },
      {
        title: "Development & Launch",
        description:
          "Custom-built the Shopify theme from scratch using Liquid templates. Implemented smooth page transitions and lazy-loaded imagery to maintain performance despite the image-heavy design.",
      },
    ],
    annotations: [
      {
        title: "Product Grid Rhythm",
        insight:
          "Alternated between 2-column and full-width product cards to break the monotony of a traditional grid. This editorial rhythm increased scroll depth by 35%.",
      },
      {
        title: "Micro-interactions",
        insight:
          "Added subtle parallax on product images and a 'quick view' hover state that shows the product on a model — reducing the clicks needed to evaluate a product.",
      },
      {
        title: "Cart Experience",
        insight:
          "Designed a slide-out cart instead of a separate page to reduce abandonment. Included 'Complete the Look' suggestions to drive cross-selling naturally.",
      },
    ],
    systemItems: [
      { label: "Typography Pairing", detail: "Serif display (editorial) + sans-serif body (functional), with strict sizing for hierarchy" },
      { label: "Image Treatments", detail: "Full-bleed, contained, and overlay modes — each with responsive crop rules" },
      { label: "Button System", detail: "Primary, secondary, and ghost variants designed for both light and dark product backgrounds" },
      { label: "Spacing Scale", detail: "8px base grid with generous margins to maintain the luxury 'breathing room' feel" },
    ],
    constraint:
      "The entire theme had to be built within Shopify's Liquid templating constraints — no external JavaScript frameworks allowed. Performance budget: under 3s load time on 3G despite heavy imagery.",
    outcome:
      "Conversion rate improved by 28% post-launch. Average order value increased by 15%, attributed to the improved product presentation and cross-selling through editorial content.",
  },
  {
    slug: "mesthane-brand-identity",
    title: "Mesthane Brand Identity",
    category: "Branding · Design System · Print",
    image: project3,
    description:
      "Complete brand identity system including logo, color palette, typography, and marketing collateral.",
    overview:
      "Mesthane, a sustainable materials startup, needed a brand identity that communicated innovation and environmental responsibility without feeling clinical or sterile.",
    problem:
      "Mesthane's previous branding relied on generic 'green' clichés — leaf icons, earth tones, recycling symbols. It failed to differentiate them in a market where every competitor used the same visual language.",
    goal:
      "Create a brand identity that signals 'science meets nature' — owning a distinctive visual space that feels premium, innovative, and trustworthy enough to support a Series A fundraise.",
    role: "Brand Designer & Art Director",
    timeline: "10 weeks",
    tools: ["Illustrator", "InDesign", "Figma", "After Effects"],
    phases: [
      {
        title: "Discovery & Research",
        description:
          "Facilitated brand workshops with the founding team to define values, voice, and positioning. Researched competitors in the sustainable materials space to identify visual white space.",
      },
      {
        title: "Concept Development",
        description:
          "Explored three distinct creative directions — each rooted in a different metaphor for sustainability. Presented mood boards, type studies, and initial mark explorations to narrow the direction.",
      },
      {
        title: "Logo & Mark Design",
        description:
          "Refined the chosen direction through 40+ iterations. The final mark combines organic geometry with precision — a visual metaphor for nature engineered. Tested across scales from favicon to billboard.",
      },
      {
        title: "Design System",
        description:
          "Built a comprehensive design system covering color, typography, spacing, iconography, and photography direction. Created component libraries in Figma for the digital team and style guides for print.",
      },
      {
        title: "Collateral & Rollout",
        description:
          "Designed business cards, letterheads, pitch decks, trade show materials, and social media templates. Produced a brand guidelines document to ensure consistency as the team scales.",
      },
    ],
    annotations: [
      {
        title: "Logo Construction",
        insight:
          "The mark is built on a golden-ratio grid, giving it mathematical precision that mirrors Mesthane's engineering DNA. The organic curves within the grid represent the natural materials they work with.",
      },
      {
        title: "Color Strategy",
        insight:
          "Avoided cliché greens entirely. Chose a deep navy as the primary (trust, authority) paired with a warm terracotta accent (earth, warmth) — creating instant differentiation in the sustainability space.",
      },
      {
        title: "Photography Direction",
        insight:
          "Defined a 'macro lens' photography style — extreme close-ups of material textures. This visually communicates innovation at the molecular level without needing technical jargon.",
      },
    ],
    systemItems: [
      { label: "Logo Suite", detail: "Primary, secondary, icon-only, and monochrome versions with clear minimum sizes and clear space rules" },
      { label: "Color Palette", detail: "6 colors with primary/secondary/tertiary hierarchy and strict usage ratios (60/30/10)" },
      { label: "Typography System", detail: "Display, heading, body, and caption styles with both digital and print specifications" },
      { label: "Asset Templates", detail: "Pitch deck, social media, business card, and letterhead templates in editable formats" },
    ],
    constraint:
      "The brand needed to work across digital (web, app, social) and physical (trade show booths, product packaging, lab reports) touchpoints — requiring extreme versatility without losing coherence.",
    outcome:
      "The rebrand supported a successful Series A raise of $4.2M. The identity system has been adopted across all touchpoints with zero deviation — a testament to the clarity of the guidelines.",
  },
];
