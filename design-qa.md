# Design QA

- Source visual truth: `public/docs/Broschüre2027DE.pdf`, pages 3–4
- Source pixels: 2106 × 1489 per rendered page at 2.5× density
- Implementation screenshot: unavailable
- Viewport and CSS size: unavailable
- Density normalization: unavailable
- State: Concepts table, hover/focus rows, three concept dialogs, and the Design your Event dialog

## Full-view comparison evidence

Pages 3–4 of the source brochure were rendered and inspected. The local Next.js implementation compiled and the development server reached its ready state, but no browser surface was available to capture the rendered page.

## Focused region comparison evidence

The source table, three rounded concept boxes, and Design your Event artwork were inspected individually. Matching implementation captures could not be produced.

## Findings

- [P1] Browser-rendered visual evidence is missing.
  - Location: Concepts section and all four dialog states.
  - Evidence: the in-app browser reported no available browser, so the implementation could not be captured.
  - Impact: layout fidelity, responsive overflow, hover appearance, focus appearance, modal sizing, and console state remain visually unverified.
  - Fix: capture the desktop table, one concept dialog, the Design your Event dialog, and the mobile table at matching viewports when a browser surface is available; compare them with pages 3–4 and resolve any P0–P2 differences.

## Comparison history

No visual comparison iteration was possible because the implementation screenshot could not be captured.

## Implementation checklist

- Capture desktop and mobile Concepts states in a browser.
- Test mouse hover, keyboard activation, Escape closing, backdrop closing, and focus restoration.
- Check the browser console for runtime errors.
- Compare the captured states with the brochure references.

final result: blocked
