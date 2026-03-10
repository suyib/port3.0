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

export interface EdgeCase {
  scenario: string;
  solution: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  image: string;
  description: string;
  tagline: string;
  overview: string;
  targetAudience: string;
  problem: string;
  goal: string;
  role: string;
  timeline: string;
  tools: string[];
  techStack: { name: string; purpose: string }[];
  phases: ProjectPhase[];
  annotations: Annotation[];
  systemItems: DesignSystemItem[];
  edgeCases: EdgeCase[];
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
    tagline:
      "Designing a high-density financial dashboard that simplifies complex asset tracking into actionable daily insights.",
    overview:
      "FinTrack needed a mobile-first dashboard that empowers users to take control of their finances. The challenge was distilling complex financial data into clear, actionable insights — without overwhelming the user.",
    targetAudience:
      "Millennials and Gen-Z retail investors (25–38) managing 3–5 accounts across savings, crypto, and brokerage — who check their finances daily but feel overwhelmed by existing tools like Mint or Personal Capital.",
    problem:
      "Users struggle to track multiple accounts and investment types in one place, leading to financial anxiety and missed budget goals. Existing apps surfaced too much data with too little hierarchy — every metric screamed for attention equally.",
    goal:
      "Create a unified, high-density dashboard that prioritizes 'Burn Rate' and 'Net Worth' for quick daily check-ins — reducing cognitive load while increasing financial confidence.",
    role: "Lead Designer & Frontend Developer",
    timeline: "8 weeks",
    tools: ["Figma", "React Native", "D3.js", "Tailwind CSS"],
    techStack: [
      { name: "React", purpose: "Component-based UI with state management for real-time data updates" },
      { name: "Tailwind CSS", purpose: "Utility-first styling for rapid iteration and consistent spacing" },
      { name: "D3.js", purpose: "Custom data visualizations — sparklines, donut charts, and trend indicators" },
      { name: "Supabase", purpose: "Backend-as-a-service for user auth, real-time database, and API layer" },
    ],
    phases: [
      {
        title: "The Challenge",
        description:
          "Conducted user interviews with 12 potential users to understand pain points in existing finance apps. The core insight: users didn't want more data — they wanted fewer, smarter answers. 8 of 12 participants described 'dashboard fatigue' from apps showing 20+ metrics on the home screen.",
      },
      {
        title: "Information Architecture",
        description:
          "Structured the app's navigation around three core actions: track, analyze, and plan. Created user flow diagrams and a sitemap that prioritized the most frequent tasks within two taps. The key decision was burying 'Settings' and 'Account Details' behind progressive disclosure to protect the dashboard's focus.",
      },
      {
        title: "The Interface",
        description:
          "Iterated through low-fidelity wireframes to test layout hypotheses. The breakthrough came in v3: making 'Total Balance' 2× larger than any other card, establishing an unambiguous visual entry point. Built an interactive prototype in Figma to validate this hierarchy with stakeholders and 5 test users.",
      },
      {
        title: "Visual Design",
        description:
          "Developed a clean, data-forward visual language with a restrained color palette. The accent color is reserved exclusively for positive changes and CTAs — everything else is neutral. Designed custom chart components that balance density with readability, using progressive disclosure to avoid cognitive overload.",
      },
      {
        title: "Interactive Components",
        description:
          "Built the frontend using React with pixel-perfect implementation of the designs. Key interactions include: pull-to-refresh with skeleton loading states, swipe-to-archive on transaction rows, and a 'Filter' bar that lets users toggle between account types without leaving the dashboard.",
      },
    ],
    annotations: [
      {
        title: "North Star Metric",
        insight:
          "Total Balance uses a larger card with a subtle accent border and 32px type — 2× bigger than secondary metrics. User research showed it's the #1 metric checked 5+ times daily, so it sits top-left (the primary scan point). This single decision reduced user-reported 'time to find what I need' by 60%.",
      },
      {
        title: "Data Density vs. Clarity",
        insight:
          "Used sparklines instead of full area charts to show 7-day trends in just 40px of height. For 10+ transactions, a 'See More' toggle reveals a scrollable list without pushing the dashboard below the fold. A filter bar lets users scope by account type — proving the design handles scalability, not just the happy path.",
      },
      {
        title: "Color as Data",
        insight:
          "Reserved the accent color exclusively for actionable states (positive gains, CTAs). Neutral tones handle all non-critical data, preventing the 'Christmas tree' problem common in finance dashboards. Red is used sparingly — only for negative month-over-month changes, never for UI elements.",
      },
    ],
    systemItems: [
      { label: "Chart Styles", detail: "Sparklines, donut, stacked bar — all sharing a unified color scale and tooltip pattern" },
      { label: "Card Components", detail: "Three density levels (compact, standard, expanded) with a 'See More' toggle for scalability" },
      { label: "Typography Scale", detail: "4 heading sizes and 2 body sizes with strict line-height ratios for data readability" },
      { label: "Interactive States", detail: "Hover, active, loading, skeleton, empty, and error states designed for every widget" },
    ],
    edgeCases: [
      {
        scenario: "Mobile Chart Readability",
        solution: "The 'Spending' chart automatically switches from a bar chart to a condensed list view on screens under 375px, maintaining readability without horizontal scrolling.",
      },
      {
        scenario: "Empty State (New User)",
        solution: "Instead of showing empty charts, new users see an illustrated onboarding card with a 'Connect Your First Account' CTA — turning a potential dead end into activation.",
      },
      {
        scenario: "Negative Balance",
        solution: "When total balance goes negative, the card background shifts to a soft red tint with a contextual tooltip: 'Your spending exceeds your balance this month' — informative, not alarming.",
      },
    ],
    constraint:
      "Designed mobile-first for a 'financial habit' use case, requiring all primary actions (Transfer, Add Expense) to be within thumb-reach at the bottom of the screen. Desktop was treated as a secondary viewport.",
    outcome:
      "The app launched to a 4.7-star rating on the App Store. User engagement increased by 40% compared to the client's previous solution, with session duration averaging 6 minutes — double the industry benchmark. The 'daily check-in' completion rate hit 73%, up from 31% on the previous version.",
  },
  {
    slug: "namely-ecommerce",
    title: "Namely E-Commerce",
    category: "Web Design · Frontend · Shopify",
    image: project2,
    description:
      "A luxury fashion e-commerce platform with a focus on editorial-style product presentation.",
    tagline:
      "Reimagining luxury e-commerce as an editorial experience — where every scroll feels curated and every product tells a story.",
    overview:
      "Namely wanted their online store to feel like a fashion magazine — immersive, aspirational, and effortless to shop. The goal was to elevate brand perception while driving conversion.",
    targetAudience:
      "Style-conscious professionals (28–42) who shop online for premium fashion and expect a curated, editorial experience — not a crowded marketplace.",
    problem:
      "The existing Shopify store had a 1.2% conversion rate — well below industry average. Heatmap analysis revealed users were scrolling past products without engaging, and the brand felt 'generic' compared to competitors like Ssense and Mr Porter.",
    goal:
      "Redesign the shopping experience as an editorial journey, where every product feels curated and intentional — increasing both time-on-site and average order value.",
    role: "UI/UX Designer & Shopify Developer",
    timeline: "6 weeks",
    tools: ["Figma", "Shopify Liquid", "CSS", "JavaScript"],
    techStack: [
      { name: "Shopify Liquid", purpose: "Custom theme templating within Shopify's constraints" },
      { name: "CSS/SCSS", purpose: "Complex animations and editorial layouts without JS overhead" },
      { name: "JavaScript", purpose: "Cart interactions, quick-view modals, and lazy loading" },
      { name: "Figma", purpose: "Design system, prototyping, and developer handoff specs" },
    ],
    phases: [
      {
        title: "The Challenge",
        description:
          "Audited the existing Shopify store and identified UX friction points through heatmap analysis. The biggest finding: 67% of users never scrolled past the first product row. The visual monotony of a standard grid was killing engagement.",
      },
      {
        title: "Content Strategy",
        description:
          "Collaborated with the brand team to define an editorial approach to product storytelling. Structured collections around lifestyle narratives rather than traditional category grids — 'Weekend in Amalfi' instead of 'Summer Collection.'",
      },
      {
        title: "The Interface",
        description:
          "Designed modular page templates that blend editorial content with shoppable elements. The hero product gets a full-viewport treatment, followed by an alternating rhythm of 2-column and full-width cards that broke the grid monotony.",
      },
      {
        title: "Visual Design",
        description:
          "Crafted a typographically rich design system using serif headlines and generous whitespace. Product photography was given hero treatment with full-bleed layouts and minimal UI chrome — letting the fashion speak for itself.",
      },
      {
        title: "Interactive Components",
        description:
          "Custom-built the Shopify theme from scratch using Liquid templates. Key interactions: a slide-out cart with 'Complete the Look' suggestions, quick-view hover states that show products on a model, and smooth page transitions.",
      },
    ],
    annotations: [
      {
        title: "Editorial Grid Rhythm",
        insight:
          "Alternated between 2-column and full-width product cards to break the monotony of a traditional grid. This editorial rhythm increased scroll depth by 35% and time-on-page by 22%.",
      },
      {
        title: "Friction-Free Cart",
        insight:
          "Designed a slide-out cart instead of a separate page to reduce abandonment. Included 'Complete the Look' suggestions to drive cross-selling naturally — contributing to a 15% AOV increase.",
      },
      {
        title: "Typography as Brand",
        insight:
          "The serif/sans-serif pairing isn't just aesthetic — it creates a clear hierarchy. Serif = editorial (aspirational), sans-serif = functional (prices, sizes, CTAs). Users subconsciously read the page as 'magazine first, store second.'",
      },
    ],
    systemItems: [
      { label: "Typography Pairing", detail: "Serif display (editorial) + sans-serif body (functional), with strict sizing for hierarchy" },
      { label: "Image Treatments", detail: "Full-bleed, contained, and overlay modes — each with responsive crop rules" },
      { label: "Button System", detail: "Primary, secondary, and ghost variants designed for both light and dark product backgrounds" },
      { label: "Spacing Scale", detail: "8px base grid with generous margins to maintain the luxury 'breathing room' feel" },
    ],
    edgeCases: [
      {
        scenario: "Out-of-Stock Products",
        solution: "Instead of hiding out-of-stock items (losing SEO value), they display with a 'Notify Me' CTA and muted imagery — maintaining the editorial flow while capturing demand signals.",
      },
      {
        scenario: "Mobile Product Gallery",
        solution: "On mobile, the product gallery switches from a grid to a swipeable carousel with pinch-to-zoom, optimized for one-handed browsing during commutes.",
      },
      {
        scenario: "Slow Connections",
        solution: "All product images use progressive JPEG loading with dominant-color placeholders, so the page feels 'designed' even at 300ms into the load.",
      },
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
    tagline:
      "Building a brand identity for a sustainable materials startup that proves 'green' doesn't have to look generic.",
    overview:
      "Mesthane, a sustainable materials startup, needed a brand identity that communicated innovation and environmental responsibility without feeling clinical or sterile.",
    targetAudience:
      "B2B buyers in construction and manufacturing, plus Series A investors — audiences that need to see both scientific credibility and market differentiation at a glance.",
    problem:
      "Mesthane's previous branding relied on generic 'green' clichés — leaf icons, earth tones, recycling symbols. It failed to differentiate them in a market where every competitor used the same visual language, making investor presentations feel forgettable.",
    goal:
      "Create a brand identity that signals 'science meets nature' — owning a distinctive visual space that feels premium, innovative, and trustworthy enough to support a Series A fundraise.",
    role: "Brand Designer & Art Director",
    timeline: "10 weeks",
    tools: ["Illustrator", "InDesign", "Figma", "After Effects"],
    techStack: [
      { name: "Illustrator", purpose: "Vector mark design, logo construction on golden-ratio grids" },
      { name: "InDesign", purpose: "Print collateral — brand guidelines, pitch decks, trade show materials" },
      { name: "Figma", purpose: "Digital component libraries and responsive web specifications" },
      { name: "After Effects", purpose: "Logo animation for social media and presentation intros" },
    ],
    phases: [
      {
        title: "The Challenge",
        description:
          "Facilitated brand workshops with the founding team to define values, voice, and positioning. The key finding: every competitor in sustainable materials used green palettes and organic shapes. To stand out, we needed to zag — communicating sustainability through precision and innovation, not nature clichés.",
      },
      {
        title: "Concept Development",
        description:
          "Explored three distinct creative directions — each rooted in a different metaphor for sustainability. Direction A: 'Molecular' (science-forward), Direction B: 'Terroir' (earth-forward), Direction C: 'Blueprint' (engineering-forward). Presented mood boards, type studies, and initial mark explorations to narrow the path.",
      },
      {
        title: "The Mark",
        description:
          "Refined the chosen 'Molecular' direction through 40+ iterations. The final mark is built on a golden-ratio grid — organic curves contained within mathematical precision. A visual metaphor for nature, engineered. Tested across scales from favicon to billboard.",
      },
      {
        title: "Design System",
        description:
          "Built a comprehensive design system covering color, typography, spacing, iconography, and photography direction. The palette avoids green entirely — deep navy (trust) paired with warm terracotta (earth) creates instant differentiation in the sustainability space.",
      },
      {
        title: "Collateral & Rollout",
        description:
          "Designed business cards, letterheads, pitch decks, trade show materials, and social media templates. Produced a 48-page brand guidelines document to ensure consistency as the team scales from 8 to 50+ people.",
      },
    ],
    annotations: [
      {
        title: "Anti-Green Strategy",
        insight:
          "Avoided cliché greens entirely. Deep navy as the primary (trust, authority) paired with warm terracotta accent (earth, warmth) — creating instant differentiation. In A/B testing with investors, the new palette scored 40% higher on 'perceived innovation.'",
      },
      {
        title: "Logo Construction",
        insight:
          "The mark is built on a golden-ratio grid, giving it mathematical precision that mirrors Mesthane's engineering DNA. The organic curves within the grid represent the natural materials they work with — form literally follows function.",
      },
      {
        title: "Photography as Language",
        insight:
          "Defined a 'macro lens' photography style — extreme close-ups of material textures. This visually communicates innovation at the molecular level without needing technical jargon, making complex science feel tangible and beautiful.",
      },
    ],
    systemItems: [
      { label: "Logo Suite", detail: "Primary, secondary, icon-only, and monochrome versions with clear minimum sizes and clear space rules" },
      { label: "Color Palette", detail: "6 colors with primary/secondary/tertiary hierarchy and strict usage ratios (60/30/10)" },
      { label: "Typography System", detail: "Display, heading, body, and caption styles with both digital and print specifications" },
      { label: "Asset Templates", detail: "Pitch deck, social media, business card, and letterhead templates in editable formats" },
    ],
    edgeCases: [
      {
        scenario: "Single-Color Printing",
        solution: "The logo and all collateral are designed to work in single-color (black or white) for cost-effective printing at trade shows and in technical documentation.",
      },
      {
        scenario: "Co-Branding",
        solution: "Created a 'partnership lockup' system with clear rules for how the Mesthane mark sits alongside client logos — maintaining hierarchy without diminishing the partner.",
      },
      {
        scenario: "Digital vs. Print Color",
        solution: "Specified Pantone, CMYK, RGB, and HEX values for every color, with documented visual differences and guidance on when to adjust saturation for screen vs. paper.",
      },
    ],
    constraint:
      "The brand needed to work across digital (web, app, social) and physical (trade show booths, product packaging, lab reports) touchpoints — requiring extreme versatility without losing coherence. All assets needed to be usable by non-designers on the team.",
    outcome:
      "The rebrand supported a successful Series A raise of $4.2M. The identity system has been adopted across all touchpoints with zero deviation — a testament to the clarity of the guidelines. Three industry publications featured the rebrand as a case study in sustainable branding.",
  },
];
