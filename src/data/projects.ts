import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

export interface PainPoint {
  icon: string; // emoji
  label: string;
  detail: string;
}

export interface TechPivot {
  title: string;
  description: string;
}

export interface ComponentState {
  component: string;
  states: string[];
}

export interface Takeaway {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  image: string;
  description: string;
  // Hero
  headline: string;
  challenge: string;
  solution: string;
  // Meta
  role: string;
  timeline: string;
  tools: string[];
  // Pain Points (icon + 1 sentence)
  painPoints: PainPoint[];
  // Visual Comparison
  comparison: {
    beforeLabel: string;
    beforeDescription: string;
    afterLabel: string;
    afterDescription: string;
    callout: string;
  };
  // Process (kept lean — max 3 steps)
  process: { title: string; description: string }[];
  // Technical Pivot
  techPivot: TechPivot;
  // Micro Design System
  componentStates: ComponentState[];
  // Outcome Takeaways
  takeaways: Takeaway[];
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
    headline: "From Data Overload to Daily Clarity",
    challenge:
      "A cluttered dashboard showing 20+ unranked metrics caused 'financial anxiety' — users couldn't find their most important number within 3 seconds.",
    solution:
      "A hierarchy-driven single-screen dashboard that surfaces the North Star metric (Total Balance) instantly and uses progressive disclosure to reveal details on demand — reducing time-to-insight by ~60%.",
    role: "Lead Designer & Frontend Developer",
    timeline: "8 weeks",
    tools: ["Figma", "React Native", "D3.js", "Tailwind CSS"],
    painPoints: [
      {
        icon: "🛑",
        label: "No Visual Hierarchy",
        detail: "Every metric had equal visual weight — users couldn't tell what mattered most.",
      },
      {
        icon: "📉",
        label: "Chart Overload",
        detail: "Full-size charts consumed 70% of the viewport, pushing actionable controls below the fold.",
      },
      {
        icon: "🕒",
        label: "Slow Daily Check-ins",
        detail: "Users averaged 45 seconds to find their balance — 3× longer than the target for a 'habit' app.",
      },
    ],
    comparison: {
      beforeLabel: "The Noise",
      beforeDescription:
        "20+ metrics with equal visual weight. Full-size charts dominating the viewport. Key actions buried below the fold. No clear entry point for the eye.",
      afterLabel: "The Signal",
      afterDescription:
        "Total Balance at 2× scale as the clear North Star. Sparklines replacing full charts (saving 60% vertical space). Filter bar for account-type scoping. Actions within thumb-reach at bottom.",
      callout:
        "Sparklines compress 7-day trends into 40px of height — users get the trajectory without the chart taking over.",
    },
    process: [
      {
        title: "Research & Audit",
        description:
          "Interviewed 12 users and found the core insight: people don't want more data — they want fewer, smarter answers. 8 of 12 described 'dashboard fatigue' from competing finance apps.",
      },
      {
        title: "Hierarchy Testing",
        description:
          "Tested 3 layout variants with 5 users. The breakthrough: making Total Balance 2× larger than any other element. Eye-tracking confirmed 100% of users fixated there first within 0.5 seconds.",
      },
      {
        title: "Build & Validate",
        description:
          "Built with React Native, pixel-perfect to spec. Added pull-to-refresh with skeleton states, swipe-to-archive on transactions, and a filter bar — then validated with 8 beta testers over 2 weeks.",
      },
    ],
    techPivot: {
      title: "The Density Problem",
      description:
        "The backend returned 10+ transaction categories simultaneously. Instead of paginating (adding taps), I designed a 'See More' toggle that expands the transaction list in-place — satisfying the API response while keeping the dashboard scannable. A filter bar scopes by account type without navigation, proving the design scales beyond the happy path.",
    },
    componentStates: [
      { component: "Balance Card", states: ["Default", "Loading (skeleton)", "Negative balance (red tint)", "Empty (onboarding CTA)"] },
      { component: "Transaction Row", states: ["Default", "Swiped (archive)", "Pending", "Failed"] },
      { component: "Sparkline Chart", states: ["Positive trend (accent)", "Negative trend (muted)", "No data (dashed line)", "Hover (tooltip)"] },
    ],
    takeaways: [
      { label: "Time-to-Insight", value: "Reduced from 45s → 3s" },
      { label: "Daily Check-in Rate", value: "73% (up from 31%)" },
      { label: "App Store Rating", value: "4.7 stars" },
      { label: "Session Duration", value: "6 min avg (2× benchmark)" },
    ],
    outcome:
      "The redesigned dashboard turned a 'data dump' into a daily habit. User engagement increased 40% and the app launched to a 4.7-star rating — proving that less data, shown smarter, beats more data shown louder.",
  },
  {
    slug: "namely-ecommerce",
    title: "Namely E-Commerce",
    category: "Web Design · Frontend · Shopify",
    image: project2,
    description:
      "A luxury fashion e-commerce platform with a focus on editorial-style product presentation.",
    headline: "From Generic Grid to Editorial Experience",
    challenge:
      "A standard Shopify grid with a 1.2% conversion rate — 67% of users never scrolled past the first product row. The brand felt indistinguishable from fast-fashion competitors.",
    solution:
      "An editorial-rhythm layout that alternates product density with storytelling moments, supported by a slide-out cart with cross-sell intelligence — lifting conversion by 28% and AOV by 15%.",
    role: "UI/UX Designer & Shopify Developer",
    timeline: "6 weeks",
    tools: ["Figma", "Shopify Liquid", "CSS", "JavaScript"],
    painPoints: [
      {
        icon: "🛑",
        label: "Grid Monotony",
        detail: "Uniform 4-column grid caused 'banner blindness' — users scrolled without engaging.",
      },
      {
        icon: "📉",
        label: "Cart Abandonment",
        detail: "Separate cart page created a context switch that lost 34% of users before checkout.",
      },
      {
        icon: "🕒",
        label: "Low Scroll Depth",
        detail: "67% of users bounced without seeing products below the first row.",
      },
    ],
    comparison: {
      beforeLabel: "The Grid",
      beforeDescription:
        "Uniform 4-column product grid. No visual rhythm or breathing room. Separate cart page. Products presented as a catalog, not a story.",
      afterLabel: "The Editorial",
      afterDescription:
        "Alternating 2-column and full-width hero products. 'Complete the Look' slide-out cart. Lifestyle narratives woven between products. Serif/sans-serif typography creating magazine-like hierarchy.",
      callout:
        "The alternating rhythm broke grid monotony — scroll depth increased 35% because users couldn't predict what came next.",
    },
    process: [
      {
        title: "Audit & Heatmaps",
        description:
          "Analyzed Hotjar heatmaps revealing the 'dead zone' after row 1. Benchmarked against Ssense and Mr Porter to define what 'luxury browsing' feels like — slow, curated, editorial.",
      },
      {
        title: "Editorial Framework",
        description:
          "Restructured collections as lifestyle narratives ('Weekend in Amalfi' not 'Summer Collection'). Designed modular templates that blend shoppable products with editorial imagery.",
      },
      {
        title: "Build & Performance",
        description:
          "Custom Shopify Liquid theme built from scratch. Hit the 3-second load target on 3G despite heavy imagery through lazy loading, progressive JPEGs, and dominant-color placeholders.",
      },
    ],
    techPivot: {
      title: "The Shopify Constraint",
      description:
        "No external JavaScript frameworks allowed — everything had to work within Shopify's Liquid templating. I built the slide-out cart and quick-view interactions using vanilla JS and CSS transitions, achieving smooth 60fps animations without React or Vue. The 'Complete the Look' cross-sell logic uses Shopify's product metafields — no external recommendation engine required.",
    },
    componentStates: [
      { component: "Product Card", states: ["Default", "Hover (model view)", "Out of stock (Notify Me)", "Sale (badge)"] },
      { component: "Cart Drawer", states: ["Empty", "Items added", "Quantity update", "Cross-sell expanded"] },
      { component: "Image Gallery", states: ["Loading (color placeholder)", "Loaded", "Zoom (pinch on mobile)", "Swipe navigation"] },
    ],
    takeaways: [
      { label: "Conversion Rate", value: "+28% (1.2% → 1.5%)" },
      { label: "Average Order Value", value: "+15%" },
      { label: "Scroll Depth", value: "+35%" },
      { label: "Load Time (3G)", value: "Under 3 seconds" },
    ],
    outcome:
      "The redesign turned a forgettable Shopify store into a brand destination. Conversion and AOV lifted significantly, but the real win: customers started sharing product pages on social media — something that never happened with the old grid.",
  },
  {
    slug: "mesthane-brand-identity",
    title: "Mesthane Brand Identity",
    category: "Branding · Design System · Print",
    image: project3,
    description:
      "Complete brand identity system including logo, color palette, typography, and marketing collateral.",
    headline: "From Green Cliché to Category Definer",
    challenge:
      "Every sustainable materials startup uses the same visual language — leaf icons, earth tones, recycling symbols. Mesthane's previous branding was invisible in investor pitch decks.",
    solution:
      "A 'science meets nature' identity using deep navy and warm terracotta instead of green, built on a golden-ratio mark that signals precision and innovation — directly supporting a $4.2M Series A.",
    role: "Brand Designer & Art Director",
    timeline: "10 weeks",
    tools: ["Illustrator", "InDesign", "Figma", "After Effects"],
    painPoints: [
      {
        icon: "🛑",
        label: "Visual Invisibility",
        detail: "The old brand was indistinguishable from 5 direct competitors in investor side-by-side comparisons.",
      },
      {
        icon: "📉",
        label: "Green Fatigue",
        detail: "Overuse of 'eco' visual clichés made the brand feel generic rather than innovative.",
      },
      {
        icon: "🕒",
        label: "Inconsistent Touchpoints",
        detail: "No design system existed — every team member created their own version of the brand.",
      },
    ],
    comparison: {
      beforeLabel: "The Cliché",
      beforeDescription:
        "Generic green palette. Leaf/recycling iconography. Inconsistent typography across touchpoints. No clear brand hierarchy or rules.",
      afterLabel: "The Authority",
      afterDescription:
        "Deep navy + terracotta palette (zero green). Golden-ratio mark with organic precision. 48-page brand guidelines. Macro-lens photography direction for material textures.",
      callout:
        "In A/B testing with investors, the new palette scored 40% higher on 'perceived innovation' than the green predecessor.",
    },
    process: [
      {
        title: "Brand Workshops",
        description:
          "Facilitated 3 sessions with the founding team to define values, voice, and competitive positioning. The key insight: their technology is about precision engineering with natural materials — the brand should feel 'engineered nature,' not 'hippie science.'",
      },
      {
        title: "Three Directions",
        description:
          "Presented 'Molecular' (science-forward), 'Terroir' (earth-forward), and 'Blueprint' (engineering-forward) concepts with mood boards and type studies. 'Molecular' won — it felt most aligned with their Series A narrative.",
      },
      {
        title: "System & Rollout",
        description:
          "Built the complete identity through 40+ logo iterations, defined a 6-color palette with 60/30/10 usage ratios, and produced a 48-page brand guidelines document covering digital, print, and environmental applications.",
      },
    ],
    techPivot: {
      title: "The Cross-Medium Challenge",
      description:
        "The brand needed to work on screens (RGB), in print (CMYK/Pantone), and on product packaging (single-color embossing). I designed the logo with this constraint from day one — the mark works in full color, duotone, and single-color without losing recognizability. Every color has documented Pantone, CMYK, RGB, and HEX values with notes on saturation adjustments between screen and paper.",
    },
    componentStates: [
      { component: "Logo Mark", states: ["Full color", "Monochrome (dark bg)", "Monochrome (light bg)", "Embossed (single color)"] },
      { component: "Brand Colors", states: ["Digital (RGB)", "Print (CMYK)", "Spot (Pantone)", "Reduced (duotone)"] },
      { component: "Typography", states: ["Display (headlines)", "Body (digital)", "Body (print)", "Caption (labels)"] },
    ],
    takeaways: [
      { label: "Series A Raised", value: "$4.2M" },
      { label: "Brand Deviation", value: "Zero across all touchpoints" },
      { label: "Investor Perception", value: "+40% 'innovation' score" },
      { label: "Press Coverage", value: "3 industry publications" },
    ],
    outcome:
      "The rebrand didn't just look better — it directly supported fundraising. The $4.2M Series A closed with investors citing the 'professional brand presence' as a factor in their confidence. The 48-page guidelines ensured zero deviation as the team scaled from 8 to 50+.",
  },
];
