# Dineysos: an invitation to play

High-level website proposal · 20 September 2026

## Recommendation

Make the homepage feel like a preview of a Dineysos event: sociable, playful, welcoming, and easy to understand. Let visitors see what they will do, recognise an experience that fits their group, understand the likely budget, and start a conversation. Keep detailed comparisons one clear step away.

The central change is information hierarchy. Replacing every table with equally detailed cards would preserve much of the current reading effort. Instead, give each section one job and reduce how many decisions visitors must make at once.

Recommended direction: a concise, visual homepage supported by three game detail pages, an accessible pricing breakdown, and an ungated brochure download. Keep a comparison table as an optional planning tool. Preserve the cream, blue, orange, character illustrations, and personal tone that make Dineysos distinctive.

This is a proposal, not an implementation. It reviews the current working-tree source, including existing uncommitted changes, and all nine pages of `Broschüre2027DE.pdf`. The brochure was text-extracted and visually reviewed. Website observations come from components, styles, translations, and available assets; this is not a live-browser audit or a measured account of visitor behaviour. The proposed benefits are hypotheses to validate.

## 1. What the current site asks visitors to do

The homepage currently follows this sequence:

**Hero → About → Concepts → Formats → Prices → Gallery → Contact → FAQ → Partners & references**

There is already substantial useful content and a recognisable identity. The difficulty is its order and presentation:

| Current surface | Visitor effort or missed opportunity | Proposed role |
| --- | --- | --- |
| Hero: illustration, logo, “WINES, GAMES, EVENTS”, “Konzepte” | Establishes atmosphere, but does not plainly explain the hosted service or who it is for. | State the offer and invite exploration or an enquiry. |
| About: four paragraphs and founder illustrations | The origin story arrives before visitors understand the experience. Practical service information is embedded in prose. | Bring the service promise forward; retain a shorter founder introduction later. |
| Concepts: six-column desktop table, mobile cards, detail dialogs | Visitors compare unfamiliar names using several dimensions. The dialogs add game types and ratings, but little concrete event narrative. | Introduce three recognisable experiences, with explicit links to useful details. |
| Formats: three games × five settings, with flower ratings and a legend | Requires learning a second classification and interpreting a rating system immediately after the first comparison. | Integrate recommendations into the game introductions; retain the matrix only as optional detail. |
| Pricing: group bands × five cost categories | Useful transparency, but visitors must add the compulsory wine cost to the base price themselves. Mobile prices require opening accordions. | Give visible budget orientation, then preserve an itemised breakdown. |
| Gallery | Real event evidence appears only after all three comparison sections. | Bring selected photographs into the main story earlier. |
| Contact | Email and phone compete with ancillary services and social QR codes. | Make the next step obvious and welcoming, including for undecided visitors. |
| FAQ and partner logos | Reassurance appears after the contact section. | Answer common doubts and show relevant evidence before the final invitation. |

Mobile already has different layouts: concepts become cards below 1170px, and format/pricing tables become accordions below 768px. The proposal therefore goes beyond making tables responsive. It changes what deserves attention in the first place.

## 2. Borrow the brochure's strongest storytelling

The 2027 brochure offers more than the concept table reproduced on the site:

- **Page 2:** distinct messages for businesses and private groups, an explicit welcome for people without wine knowledge, and founder qualifications.
- **Page 3:** factual concept comparison, useful when someone is actively choosing.
- **Page 4:** short game introductions and customisation prompts.
- **Page 5:** an illustrated “Set-Up & Ablauf” journey: wine, play, learning, conversation, optional food, and a winner. This directly answers “What actually happens?”
- **Page 6:** wine education and tailored workshops, a separate offer with a different purpose.
- **Page 7:** photographs showing people, materials, and settings.
- **Pages 8–9:** practical reassurance, references, and contact.

Use the brochure as a content and brand source, without requiring the website to follow its page order. The newer brochure contains neither the website's format matrix nor its numeric pricing schedule; those need their own editorial review.

Keep the humour about discovering wine without intimidation. For businesses, lead with shared challenges and conversation. The brochure's description of games as an “Analyse-Tool” should not become a promise of validated team or leadership assessment without evidence and a defined service behind it.

## 3. A proposed homepage people can browse

The journey should answer: **What is this? → What would we do? → Which experience fits us? → What might it cost? → Who is behind it? → How do we arrange it?**

### A. Hero: make the offer understandable immediately

Keep the distinctive illustration, but give the service a clear sentence. Suggested German copy, for editorial review:

> **Wein entdecken. Zusammen spielen.**
>
> Moderierte Weinspiele für euren Teamevent, Geburtstag oder Abend mit Freunden. Bei euch oder in einer Partnerlocation. Kein Weinwissen nötig.

Use **“Weinspiele entdecken”** as the primary exploration link and **“Event anfragen”** as the secondary action. Visitors ready to enquire should not have to finish the tour.

Show a small reassurance line such as “Für Firmen & Private · Individuell anpassbar · Auch alkoholfrei”. These claims are supported by the supplied material. Confirm geographic coverage before adding a location promise.

The hero currently occupies at least a viewport. Reassess that height so the offer, actions, and a hint of the next section can appear together on typical screens. Preserve atmosphere without making a large logo and illustration the entire first encounter.

### B. Show the experience: a photograph and three moments

Place one strong, real event photograph beside a short sequence adapted from brochure page 5:

1. **Probieren:** discover wines selected for your group.
2. **Spielen & austauschen:** solve challenges, compare impressions, and learn along the way.
3. **Auflösen & feiern:** discover the answers and celebrate the result together.

Explain what Dineysos contributes in one sentence: facilitation, game materials, and an individually agreed wine selection, with food/location options where desired. Make clear elsewhere how these are priced.

Use a caption that identifies what is happening in the photograph. A picture of participants solving something communicates the offer better than an isolated bottle. Select images from existing assets or the gallery after checking context and usage permission; current CMS image availability has not been verified.

This section should be compact. The brochure's entire illustrated flow would be too much to reproduce as another large homepage diagram.

### C. Three games, described as experiences

Replace the default comparison table with three concise, visually distinct introductions. A three-up desktop layout and a simple vertical mobile stack are appropriate here. Keep all three available without swiping through a carousel.

Suggested labels and copy, derived from brochure page 3:

| Experience title | Supporting description | Visible practical fact |
| --- | --- | --- |
| **Classroom — Gemeinsam rätseln und Wein entdecken** | Move through wine stations and solve a tasting puzzle together. | 6–40 people |
| **Trophy — Welcher Wein passt zum Essen?** | Discover wine and food combinations through a game at the table. | 2–8 people |
| **Olympics — Zwei Weine. Euer Urteil.** | Compare wines blind in pairs and discover their differences. | 2–20 people |

These are suggested descriptions, not new product names or final sales copy. In particular, qualify the food arrangements for Trophy so the wording does not imply catering is included.

Each introduction needs only an image or existing illustration, an experiential sentence, group size, one suggested occasion, and a descriptive link such as **“Classroom entdecken”**. Exact wine counts, detailed learning objectives, ratings, and setup requirements belong in the deeper layer.

Follow the three introductions with a small invitation: **“Noch unsicher? Erzählt uns von eurem Anlass — wir finden gemeinsam das passende Spiel.”** Customisation should feel like help, rather than a fourth product visitors must configure.

A secondary **“Alle Spiele vergleichen”** link can open a compact comparison. Keep factual dimensions such as activity, group size, wine count, and setting. The flower/glass ratings can remain optional brand elements, but a sentence explaining a recommendation is more immediately useful than several scores and a legend.

### D. Integrate occasions instead of adding another catalogue

Remove the full “Formate” matrix from the default homepage flow. Attach short occasion suggestions to the game introductions and detail pages. For example, the existing matrix strongly associates Trophy with Wine & Dine and Classroom with afterwork or a standing apéro.

Distinguish the two ideas explicitly when needed: **the game is what guests do; the occasion or setting is where it fits.** A visitor should not have to choose both from separate menus before contacting Dineysos.

Business and private audiences can recognise themselves through copy, photographs, and suggested occasions. Avoid requiring an audience-selection screen. Dedicated corporate/private landing pages are a later option if they can contain genuinely different information, rather than duplicate the same three games.

### E. Budget orientation: visible, honest, and compact

Keep prices on the homepage. Removing every number would make it harder for organisers to decide whether to enquire.

The current code separates the base price from mandatory wine accompaniment. As an illustration of a clearer presentation, the current figures imply:

- **4–7 guests:** CHF 70 base + wine from CHF 35 = **from CHF 105 per person**.
- **8–15 guests:** CHF 50 base + wine from CHF 35 = **from CHF 85 per person**.
- **16–30 guests:** CHF 35 base + wine from CHF 35 = **from CHF 70 per person**.
- **31+ guests:** individual quotation.

These are arithmetic examples from the repository, not validated 2027 package prices. Confirm the tariff, wine quantities, tax treatment, and exclusions before publishing them. The calculation uses the existing five-wine accompaniment; it must not imply that every concept's advertised wine range is covered.

Present confirmed group-band estimates as a small visible price strip or a concise table. This is a good use of a table: visitors are comparing the same quantity across a few group sizes. Pair it with one short “included / quoted separately” explanation and a **“Preisdetails”** link. A selector is optional; with only a few bands, another interaction may add little value.

Keep food, external location, travel, extra time, and wine upgrades close to the estimate. Do not put material exclusions behind the details link. Retain the full breakdown below or on a pricing page, including the current CHF 90 per started additional hour if confirmed.

### F. People, proof, and useful reassurance

Shorten About to a warm introduction to Marina and Clint, their role in hosting, and relevant verified qualifications. Preserve the charming founder illustrations. The longer origin story can sit behind “Mehr über uns”.

Use two or three captioned event photographs and the existing partner/reference logos to add credibility. Keep the distinction between partners and clients clear; a logo alone does not establish a testimonial or a specific event outcome. Add a short quote or event story only when authentic content and permission are available.

Retain FAQ accordions for secondary questions. Bring “no prior knowledge needed”, location flexibility, and the alcohol-free option into visible copy earlier, so visitors do not have to discover essential reassurance inside an accordion. Place the remaining FAQs before the final enquiry section.

### G. A welcoming next step and an easy take-away

Replace the assumption in “Überzeugt?” with an invitation that also welcomes people who need advice:

> **Was plant ihr?**
>
> Erzählt uns von eurem Anlass, der ungefähren Gruppengrösse und eurem Wunschtermin. Ihr müsst noch kein Spiel ausgewählt haben.

Retain direct email and telephone access. If a form is introduced, keep it short: contact details, occasion, approximate group size, optional date/location, and a message. “Noch offen” should be a valid answer. Do not promise a response time until the business commits to it.

The current custom-concept dialog contains preference inputs but no submission or transfer action. Avoid asking visitors to complete that exercise unless their choices carry into a usable enquiry. Initially, a simple “Individuellen Event besprechen” link is sufficient.

Provide **“Broschüre 2027 herunterladen (PDF, Deutsch)”** directly, without requiring an email address. Put the link near the enquiry and in the footer. The old brochure email-capture component is archived; restoring it is not required to make the PDF available. Confirm the English brochure's version before presenting it as equivalent.

Move ancillary consulting, wine-label design, wine-list work, and training out of the main enquiry block into “Weitere Angebote”. Social links can remain in the footer; large QR codes offer little help to someone already browsing on their phone.

## 4. Where deeper information should live

Use three layers, each with a clear purpose:

| Layer | Purpose | Content |
| --- | --- | --- |
| Homepage | Understand and shortlist | Offer, experience, three game summaries, visible budget orientation, reassurance, enquiry. |
| Game details and pricing | Plan and share | How each game works, group sizes, wine counts, example flow, setup, customisation, relevant costs, direct enquiry. |
| Brochure | Save or forward | A coherent branded overview for colleagues, friends, or internal planning. |

Recommended game destinations are dedicated pages, for example `/weinspiele/classroom`, `/weinspiele/trophy`, and `/weinspiele/olympics`. These are proposed routes, not existing pages. They let an organiser share one relevant experience directly and return to it later. Adapt routes and labels consistently for German and English.

Each page should answer “What do we do?”, “Who does it suit?”, “What do we need?”, and “What does it cost?” with real content, not an enlarged version of the current ratings dialog. Confirm duration, venue requirements, facilitation, and availability rather than filling gaps with invented specifics. End with a concept-specific enquiry link and links to alternatives.

For the smallest first release, use well-labelled inline details under the homepage summaries. Move to dedicated pages when there is enough substantive material. Prefer either inline expansion or a page link as the main detail route; avoid multiple competing “learn more” mechanisms for the same content.

Keep one optional concept comparison, accessible from the game section and detail pages. Keep the pricing breakdown independently reachable. Neither the PDF nor a modal should be the only place to find essential planning information.

Suggested navigation: **Weinspiele · Preise · Über uns · Event anfragen**, plus language selection. Add “Weinkurse” only if that offer is confirmed and has substantive content. The active `/events` routes serve a different need, attending scheduled public events; surface them separately only when current listings justify it. Do not reintroduce archived Sip & Solve as part of this redesign by accident.

## 5. Wine education deserves a deliberate place

Brochure page 6 describes one- and multi-day courses and tailored workshops. The current homepage does not give this offer a clear home.

If actively sold, introduce it through a compact “Lieber tiefer in die Weinwelt eintauchen?” teaser after the main games/pricing content, with a dedicated wine-education page. Explain audience, learning goals, format, and how to enquire. Keep it distinct from the playful Classroom event so the names do not imply the same service.

If this offer is not ready for enquiries, leave the homepage focused on wine games until scope and availability are confirmed. The brochure's mention is evidence of an offer to clarify, not proof of a current course schedule.

## 6. Visual rhythm without unnecessary complexity

Alternate illustration, real photography, short narrative, a small set of choices, practical prices, and human reassurance. Avoid making every section another identical card grid.

Retain the brand palette and illustrated characters. Use characters to introduce moments in the journey; reserve repeated decorative symbols for places where they do not compete with factual reading. Test a comfortable body-text size and line length, with headings that describe the visitor's question rather than internal categories such as “Concepts” and “Formate”.

On mobile, stack the game summaries with their key facts visible. Keep essential information out of hover states and horizontal carousels. Use explicit text links, readable contrast, keyboard-operable details, and clear focus states. If dialogs remain temporarily, verify focus containment and restoration. Respect reduced-motion preferences and avoid autoplay or decorative scroll effects that delay reading.

A budget calculator, recommendation quiz, or interactive sample game could be explored later. None is necessary to solve the current hierarchy problem. Start with content that explains the experience without requiring interaction.

## 7. Resolve these content questions before publishing

1. **Price inclusions:** the FAQ says the price generally includes five wines; the tariff lists wine separately as mandatory. Distinguish a base fee from the combined event estimate consistently.
2. **Wine quantities:** the concepts specify 4–5, 5–10, and 6–20 wines, while the standard price accompaniment is five wines. Confirm how each concept changes the quote.
3. **Group sizes:** Trophy and Olympics start at two guests, but pricing starts at four. The formats introduction mentions a 500-person company event while standard concepts top out at 40. Explain what is standard, what scales through a custom arrangement, and how smaller groups are quoted.
4. **Duration:** FAQ says approximately 1–2 hours; the base fee describes two hours. Explain typical activity duration versus the priced facilitation period and how food affects it.
5. **Coverage and logistics:** confirm service area, travel charges, venue arrangements, languages offered, and what hosts must provide. Do not infer these from the Swiss contact numbers.
6. **Offer/version consistency:** confirm wine education, founder credentials, prices, and the English material before promoting them as current. Keep the website and downloadable brochure aligned.

These are normal content decisions, not reasons to postpone the whole design. The first structural improvements can be prepared while the commercial details are settled.

## 8. Suggested sequence and how to judge it

**First pass: make the existing homepage easier to understand.** Rewrite the hero; add the short experience sequence; bring real photographs forward; simplify the game introductions; remove the default formats matrix; provide visible price orientation once confirmed; shorten About; move reassurance ahead of contact; add the direct brochure link. Reuse existing assets and content where suitable.

**Second pass: make planning and sharing easier.** Publish substantive game pages, a clear pricing breakdown, an optional comparison, and a working enquiry handoff. Add wine education if confirmed. Maintain one shared source for repeated facts such as group size and inclusions so homepage, details, and translations do not drift.

**Later: add only what evidence supports.** Authentic event stories, audience-specific pages, a small recommendation helper, or a sample game can follow if visitors still struggle to choose or imagine the event.

Test a mobile and desktop prototype with a small mix of private organisers and people arranging company events. Suggested tasks:

- After a brief look, explain what Dineysos does and whether prior wine knowledge is needed.
- Find a plausible game for a 12-person team and explain why it fits.
- Work out the indicative cost for eight people, including the required wine contribution, and identify what is extra.
- Find alcohol-free information and send a friend a link to one game.
- Start an enquiry without knowing which concept to choose, or obtain the brochure without supplying contact details.

Observe misunderstandings and unnecessary clicks before judging aesthetics. If analytics are available, compare game-detail visits, pricing-detail visits, brochure downloads, contact actions, and completed enquiries where measurable. A mail or phone click is not a completed enquiry. Lower scroll depth can mean people found what they needed sooner; more scrolling is not the objective.

## Sources and review boundaries

- [2027 German brochure](../Broschüre2027DE.pdf): all nine pages, including the visual-only photo collage on page 7 and the form image on page 9.
- `src/pages/index.tsx`: current homepage order.
- `src/components/sections/{Hero,About,Concept,Format,Pricing,Gallery,Contact,Faq,PartnersReferences}.tsx`: content, interactions, pricing values, and existing evidence surfaces.
- Corresponding styles in `src/styles/sections/` and `src/styles/globals.css`: responsive variants, hero height, and visual identity.
- `public/locales/de/common.json`: current German marketing copy, practical details, and FAQ.
- `src/components/layout/{Navbar,Footer}.tsx`, `src/legacy/README.md`, and `src/lib/api.ts`: navigation, archived features, event routes, and CMS-backed gallery sourcing.
- [Nielsen Norman Group: Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/): the general principle of showing primary information first and making secondary detail available on demand. The specific design choices above are recommendations for Dineysos, not measured findings from that source.

No application code, existing user changes, commercial terms, or brochure content were modified in preparing this proposal.
