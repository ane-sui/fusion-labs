---
name: Fusion Labs
description: A bold blue design and development studio system.
colors:
  blue: "#234bff"
  ink: "#111214"
  paper: "#f3f4f5"
  muted: "#a8abb4"
  line: "#34363c"
  panel: "#1c1f29"
  approach: "#e9edf5"
  approach-ink: "#151a28"
  approach-muted: "#505a70"
  field: "#1b1d23"
  field-border: "#414550"
  placeholder: "#959bad"
  focus: "#87a2ff"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(64px, 7.1vw, 96px)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(32px, 3.4vw, 48px)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "14px"
rounded:
  control: "5px"
  panel: "10px"
  tag: "4px"
spacing:
  section: "100px"
  section-tablet: "75px"
  section-mobile: "62px"
  field-gap: "20px"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "#ffffff"
    rounded: "{rounded.control}"
    padding: "16px 21px"
  button-light:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "16px 21px"
  input:
    backgroundColor: "{colors.field}"
    textColor: "{colors.paper}"
    rounded: "{rounded.control}"
    padding: "12px 13px"
  service-panel:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.panel}"
    padding: "28px 34px 26px"
---

# Design System: Fusion Labs

## Overview

**Creative North Star: "The Blue Studio Sheet"**

A bold blue studio sheet pairs cobalt surfaces with ink, cool paper and generous typography. Crisp rules, restrained corners and geometric marks give the interface a direct, purposeful character.

This is an extraction of the implemented system and the committed direction in SURFACE.md. It records code values; no rendered browser review was available.

**Key Characteristics:**

- Cobalt-led contrast
- Manrope typography
- Flat surfaces and crisp rules
- Geometric studio marks

## Colors

### Primary

Cobalt Blue anchors the major studio surface and primary enquiry action. Lighter blue accents distinguish active services and interactive details.

### Neutral

Ink is the main canvas; Cool Paper carries primary text. Cool Muted carries supporting copy, and Rule Grey separates related content. Slate Panel groups the active service without a shadow. The pale approach surface reverses the palette with dark blue-tinted text. Field and Field Border distinguish editable areas.

## Typography

Manrope is the sole family, with sans-serif fallback. Local TrueType files supply weights 400, 500, 600, 700 and 800 through font-face declarations with font-display: swap. The bundled OFL.txt accompanies the fonts. Large, moderately tight headings contrast with comfortable body copy; no monospace role exists.

Display typography uses the frontmatter scale, with mobile override clamp(40px, 11.6vw, 74px), line-height 1.12. Service headings are 30px; process headings are 26px. Supporting copy is generally 15–16px. Secondary notes and tags use 12px. FAQ answers cap at 65ch and panel copy at 52ch.

## Layout

The main container caps at 1600px with 5% side padding. The cobalt surface caps at 1560px and uses 20px outer margins. Sections follow the section spacing tokens.

The hero action row uses minmax(0, 1fr) auto auto, contracting to minmax(0, 1fr) auto at 1000px and stacking at 640px. The headline begins directly without an eyebrow.

Above 1000px, services use a 1.15fr / 1fr split, process content uses three columns, and FAQ and contact use two columns. At 1000px, spacing and gaps contract and paired fields stack. At 640px, primary content becomes one column, side padding becomes 6%, navigation links hide while the enquiry action remains, and process steps retain a compact label/content split. Paired fields return to two columns on small screens.

These are observed rules, not a claim of tested fit at every intermediate viewport.

## Elevation & Depth

No box shadows are used. Depth comes from contrasting surface tones and single rules. Keep the interface flat.

## Shapes

Controls have gently rounded corners. The main surface and service panel share a restrained larger radius; tags use smaller corners. Thin separators establish structure. Studio geometry uses crisp SVG paths.

## Components

### Buttons

Primary enquiry actions use cobalt and white. The alternate action uses paper and ink. Both use bold 14px text with separated icon space. Background transitions last 0.2s. Primary hover changes to #3b5fff; alternate hover changes to #d8e1ff.

### Stacked service cards

Four image-led cards group nine services. Each has a photo, heading, description and direct enquiry links. The enquiry link selects the matching contact form option. Cards use 14px corners and slate/cobalt surfaces. At widths of at least 900px and heights of at least 760px, fitting cards stack with sticky offsets of 28px + 20px per card. ScrollTrigger scales the outgoing card to 0.97. Too-tall cards, keyboard focus, reduced motion and smaller viewports use ordinary document flow. Mobile images are 210px high above their content. Unsplash assets are local, lazy-loaded, credited and carry embedded source provenance.

### Inputs

Visible wrapping labels accompany all fields. Inputs use slate fills, thin borders, 15px text and blue caret. Native required/email validation applies; submission opens an email draft. Clipboard recovery is offered after submission.

### Navigation and FAQ

Navigation uses quiet 14px links that brighten on hover. FAQs use native details/summary disclosure with divider rules and an expanding mark. Focus-visible outlines are 3px, offset 6px.

### Motion and browser surfaces

Self-hosted GSAP 3.14.2 and ScrollTrigger coordinate a short hero assembly (0.5–1s, expo.out), once-only scroll reveals, a scroll-linked studio mark and scroll-linked stacked-card scaling. Mobile travel distances are smaller. Reduced motion removes entrances and scroll effects and uses static cards in document flow. No idle animation loops. Content is readable without scripts. Selection and WebKit scrollbar colors are themed.

## Do's and Don'ts

- Do use cobalt for major emphasis and primary actions.
- Do preserve clear keyboard focus and reduced-motion support.
- Do use SVG for geometric marks and icons.

- Don't introduce decorative shadows or gradients.
- Don't invent client results or performance claims.
- Don't replace the service index with repetitive cards.

