

## Fix Missing Fields + Reroute Email

### Problem
1. **Email and Phone fields don't appear** — your saved `site_settings` in the database has an older `questions` array (from before email/phone were added). The merge logic uses saved questions as-is, so new defaults never show up.
2. **Email routing is backwards** — currently emails only send when `auto_email_enabled` is on, and only to `owner_email`. You want: the customer's query always goes to your inbox, and optionally an auto-confirmation goes to the customer.

### Changes

**1. `src/hooks/useSiteSettings.ts` — Smart question merging (line 206)**

Replace the flat merge with logic that checks for missing default question IDs in the saved array and inserts them (after "company"). This ensures email and phone fields appear even if your DB settings were saved before they existed.

**2. `src/pages/Contact.tsx` — Fix email routing (lines 76–103)**

- **Always** send the form data to `owner_email` (when set) — remove the `auto_email_enabled` gate for the owner notification
- When `auto_email_enabled` is true AND the submitter provided an email, send a separate confirmation email to the customer
- Pass a `send_confirmation` flag to the API

**3. `api/send-email.ts` — Two emails: owner notification + customer confirmation**

- Always send the detailed submission to `owner_email` (this is how queries reach your inbox)
- When `auto_email_enabled` is true and `email` is provided, send a second email to the customer confirming receipt
- The confirmation uses `from_email` as sender and contains a brief "Thanks, we received your message" body

### File-by-file detail

**`src/hooks/useSiteSettings.ts`** line 206 — replace single-line merge:
```typescript
contact_page: {
  ...DEFAULT_HOMEPAGE.contact_page,
  ...(raw?.contact_page ?? {}),
  questions: (() => {
    const saved = raw?.contact_page?.questions;
    if (!saved?.length) return DEFAULT_HOMEPAGE.contact_page.questions;
    const savedIds = new Set(saved.map(q => q.id));
    const missing = DEFAULT_HOMEPAGE.contact_page.questions.filter(
      dq => !savedIds.has(dq.id)
    );
    if (!missing.length) return saved;
    const result = [...saved];
    const companyIdx = result.findIndex(q => q.id === "company");
    result.splice(companyIdx >= 0 ? companyIdx + 1 : result.length, 0, ...missing);
    return result;
  })(),
  project_types: raw?.contact_page?.project_types?.length
    ? raw.contact_page.project_types
    : DEFAULT_HOMEPAGE.contact_page.project_types,
},
```

**`src/pages/Contact.tsx`** lines 76–103 — change email call:
```typescript
// Always send query to owner's inbox
if (cp.owner_email) {
  try {
    await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name || "",
        email: values.email || "",
        company: values.company || "",
        phone: values.phone || "",
        project_type: values.project_type || "",
        goal: values.goal || "",
        timeline: values.timeline || "",
        budget_range: values.budget_range || "",
        owner_email: cp.owner_email,
        from_email: cp.from_email || "contact@suyin.uk",
        auto_email_enabled: cp.auto_email_enabled,
      }),
    });
  } catch {}
}
```

**`api/send-email.ts`** — add customer confirmation after owner email:
```typescript
// After sending to owner, send confirmation to customer
if (auto_email_enabled && email) {
  await resend.emails.send({
    from: sender,
    to: email,
    subject: "Thanks for reaching out!",
    html: `
      <h2>We received your message</h2>
      <p>Hi ${name || "there"},</p>
      <p>Thanks for getting in touch! I've received your inquiry and will get back to you within 48 hours.</p>
      <p>Best regards</p>
    `,
  });
}
```

### Files to change
1. `src/hooks/useSiteSettings.ts` — smart merge for missing question IDs
2. `src/pages/Contact.tsx` — always send to owner; remove `auto_email_enabled` gate
3. `api/send-email.ts` — add customer confirmation email

