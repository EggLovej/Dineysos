# Retired features

This directory keeps UI code that is no longer part of the public site but may be restored later.

## Sip & Solve

- Former route: `/sip&solve`
- Archived page: `sip-and-solve/SipAndSolvePage.tsx`
- Restore by moving the page back to `src/pages/sip&solve/index.tsx` and adding its navbar entry.
- The separate `/feedback/sip&solve` page and feedback API remain active.

## Brochure

- Former location: the `#brochure` section on the homepage
- Archived component: `brochure/BrochureSection.tsx`
- Restore by moving the component back to `src/components/sections/Brochure.tsx`, importing it in `src/pages/index.tsx`, rendering it on the homepage, and adding its navbar entry if desired.
- The brochure request API and PDFs under `public/docs` remain active.

## Events

Events are not retired. Their navbar entry is commented out, while the `/events` routes remain active and directly accessible.
