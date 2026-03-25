

## Add "Contact" Admin Tab

### Overview

Add a third tab ("Contact") to the admin panel that lets you manage the contact page: header/subheading text, your email address, automated email toggle, project type dropdown options, and the ability to add/hide form questions.

### Data Model

Store all contact page configuration in the existing `site_settings.homepage_content` JSONB under a new `contact_page` key (no migration needed):

```text
contact_page: {
  heading: string              // "Let's work together"
  subheading: string           // "Tell me about your project..."
  owner_email: string          // your email for receiving queries
  auto_email_enabled: boolean  // toggle automated confirmation email
  project_types: string[]      // ["UX Design", "UI Design", ...]
  questions: [                 // configurable form fields
    { id: string, label: string, placeholder: string, type: "text"|"textarea"|"select", required: boolean, visible: boolean }
  ]
}
```

Default questions will mirror the current hardcoded fields (Name, Company, Project Type, Project Goal, Timeline, Budget Range).

### Changes

**1. `src/hooks/useSiteSettings.ts`**
- Add `ContactPageConfig` interface with the fields above
- Add `contact_page` to `HomepageContent` interface
- Add defaults matching the current hardcoded Contact.tsx values

**2. `src/pages/Admin.tsx`**
- Update `adminTab` derivation: `viewMode === "blog" ? "blog" : viewMode === "contact" ? "contact" : "projects"`
- Add a third tab button navigating to `/admin/contact`
- Add the Contact tab content panel with:
  - **Header & Subheading**: two text inputs for the page heading and description
  - **Email Settings**: an input for your email address + a toggle switch for automated confirmation emails
  - **Project Types**: an editable list (add/remove items) for the dropdown options
  - **Form Questions**: a list of question cards, each with label, placeholder, type selector, required toggle, and a visibility (show/hide) toggle. Add/remove question buttons.
- Wire the "New" button in the nav to hide when on the contact tab
- Save via existing `handleSaveSettings`

**3. `src/pages/Contact.tsx`**
- Import `useSiteSettings` and read `contact_page` config
- Replace hardcoded heading, subheading, and `PROJECT_TYPES` array with settings values
- Dynamically render visible questions from the settings config
- After form submission, if `auto_email_enabled` and `owner_email` are set, invoke a `send-transactional-email` edge function (or show a placeholder until email infra is wired)

**4. Automated Email (lightweight approach)**
- For now, store the owner email and toggle in settings
- The actual email sending will require email domain setup (a follow-up step) — the admin UI will show the toggle and email input immediately, with a note that email sending requires domain configuration
- On form submit, if enabled, call `supabase.functions.invoke('send-transactional-email', ...)` with the submission data

### Files to Change
1. `src/hooks/useSiteSettings.ts` — add `ContactPageConfig` interface and defaults
2. `src/pages/Admin.tsx` — add Contact tab UI with all management controls
3. `src/pages/Contact.tsx` — read settings and render dynamically

