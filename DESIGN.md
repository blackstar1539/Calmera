---
name: Calmera
description: A private wellness companion tuned like an after-hours radio receiver.
colors:
  receiver-ground: "#17142b"
  receiver-panel: "#24203d"
  station-paper: "#f3ede2"
  muted-signal: "#aaa3bb"
  live-lime: "#d7ff5f"
  tuning-coral: "#ff6b78"
  state-violet: "#7c6cff"
  exhale-aqua: "#63d9c6"
  receiver-line: "rgba(243, 237, 226, .16)"
  response-violet-deep: "#4b3cc0"
  disabled-ground: "#3b3651"
  disabled-text: "#b7b0c5"
  paper-line: "#d6cfc4"
typography:
  display:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(3.35rem, 7.2vw, 6rem)"
    fontWeight: 600
    lineHeight: 0.92
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Archivo, sans-serif"
    fontSize: "clamp(2.8rem, 6vw, 5.4rem)"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Archivo, sans-serif"
    fontSize: "1.4rem"
    fontWeight: 600
    lineHeight: 1.12
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Archivo, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.12em"
rounded:
  tight: "10px"
  control: "12px"
  surface: "14px"
  pill: "999px"
  instrument: "50%"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "18px"
  xl: "24px"
  2xl: "32px"
  3xl: "68px"
components:
  button-primary:
    backgroundColor: "{colors.live-lime}"
    textColor: "{colors.receiver-ground}"
    rounded: "{rounded.control}"
    padding: "0 22px"
    height: "54px"
  button-primary-compact:
    backgroundColor: "{colors.live-lime}"
    textColor: "{colors.receiver-ground}"
    rounded: "{rounded.control}"
    padding: "0 18px"
    height: "46px"
  button-primary-disabled:
    backgroundColor: "{colors.disabled-ground}"
    textColor: "{colors.disabled-text}"
    rounded: "{rounded.control}"
    padding: "0 22px"
    height: "54px"
  station-link-active:
    backgroundColor: "{colors.station-paper}"
    textColor: "{colors.receiver-ground}"
    rounded: "{rounded.control}"
    padding: "0 12px"
    height: "50px"
  frequency-badge:
    backgroundColor: "transparent"
    textColor: "{colors.live-lime}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "9px 13px"
  paper-log:
    backgroundColor: "{colors.station-paper}"
    textColor: "{colors.receiver-ground}"
    rounded: "{rounded.surface}"
    padding: "28px"
---

# Design System: Calmera

## Overview

**Creative North Star: "After-Hours Radio"**

Calmera feels like a quiet personal receiver used after dark: composed, private, and immediately legible when someone has little attention to spare. A midnight aubergine casing holds a warm paper station log, fine ruled dividers, and a small set of high-signal colors. The radio language is functional rather than decorative: stations are tasks, frequencies orient the visitor, and instrument geometry communicates state.

Expression is concentrated in the frequency scale, coral tuning needle, circular dials, and one route-level tune-in transition. The rest stays calm and direct. There is no glassmorphism, decorative glow, noisy texture, or ornamental animation; contrast, labels, and one obvious action carry the experience.

**Key Characteristics:**

- Midnight aubergine receiver shell with warm paper inserts.
- Lime for live, selected, focused, and primary-action signals.
- Coral for the tuning needle and urgent support surface; violet for secondary state.
- Self-hosted Archivo display type paired with self-hosted DM Sans body copy.
- Fine rules, restrained 12–14px corners, pills, and circular instrument geometry.
- One blur-and-clip tune-in transition between stations, with reduced-motion support.

## Colors

The palette behaves like illuminated receiver controls against a dark casing: warm, precise, and deliberately sparse.

### Primary

- **Live Lime** (`#d7ff5f`): Primary actions, focus rings, live status, selected mood indicators, and active breathing states.

### Secondary

- **Tuning Coral** (`#ff6b78`): Tuning needle and the high-visibility support panel.
- **State Violet** (`#7c6cff`): Secondary state, waveform and hold-phase color; the deeper `#4b3cc0` anchors the mood response panel.
- **Exhale Aqua** (`#63d9c6`): Reserved for the exhale state of the breathing instrument.

### Neutral

- **Receiver Ground** (`#17142b`): Page ground, ink on bright controls, and the center of instrument dials.
- **Receiver Panel** (`#24203d`): Mobile station tray and secondary receiver casing.
- **Station Paper** (`#f3ede2`): Primary text on dark ground and paper-log surfaces with dark ink.
- **Muted Signal** (`#aaa3bb`): Secondary labels, timestamps, and quiet explanatory text.
- **Receiver Line** (`rgba(243, 237, 226, .16)`): Fine dividers and dark-surface field boundaries.
- **Paper Line** (`#d6cfc4`): Rules and instrument borders on paper surfaces.
- **Disabled Ground / Text** (`#3b3651` / `#b7b0c5`): Unavailable controls without creating false urgency.

### Named Rules

**The Signal Rarity Rule.** Lime is a status and action signal, not a fill color for large passive surfaces. Coral, violet, and aqua each keep their assigned instrument or state role.

**The Two-Material Rule.** The core world is receiver casing plus station paper. New surfaces should choose one material instead of introducing translucent glass, gradients, or new card colors.

## Typography

**Display Font:** Archivo (self-hosted, sans-serif fallback)  
**Body Font:** DM Sans (self-hosted, sans-serif fallback)

**Character:** Archivo supplies the sturdy labeling and compressed confidence of radio hardware; DM Sans keeps supportive copy warm, neutral, and easy to read. The pairing is contemporary without becoming clinical or playful.

### Hierarchy

- **Display** (600, `clamp(3.35rem, 7.2vw, 6rem)`, `0.92`): Home statement; balanced wrapping and `-0.04em` tracking.
- **Headline** (600, `clamp(2.8rem, 6vw, 5.4rem)`, `0.95`): Station titles; also balanced with `-0.04em` tracking.
- **Title** (600, approximately `1.4rem–3.5rem`, `1.04–1.12`): Panels, prompts, and the daily signal; scale to context without changing family.
- **Body** (400, `1rem`, `1.55–1.65`): Supportive instructions and journal content; keep lines near 42–45 characters where controls need fast comprehension.
- **Label** (600, `0.72rem–0.75rem`, `0.12em–0.16em`, uppercase): Frequencies, privacy status, station metadata, and instrument labels.

### Named Rules

**The Receiver Label Rule.** Use Archivo, uppercase, and wide tracking only for compact system metadata. Longer instructions and emotionally supportive copy remain sentence case in DM Sans.

## Layout

The desktop shell is a two-column receiver: a `218px` station rail beside a flexible workspace, beneath a sticky `74px` top bar. Views use `clamp(30px, 4vw, 68px)` padding. The home stage pairs a broad tuner area with a narrower paper signal card using a `1.65fr / 0.65fr` grid; task views use balanced two-column grids with fluid gaps between roughly `24px` and `120px` according to the tool.

At `960px`, the shell collapses to one column and the station rail becomes a hidden, full-width tray below the top bar; all task grids stack. At `620px`, the top bar shortens to `64px`, view padding becomes `26px 18px 42px`, station choices use a three-column menu, and the home view adds a four-button quick station dock. Controls and headings reflow rather than shrink below comfortable touch and reading sizes.

Spacing is deliberate and sectional: fine `7–12px` gaps inside navigation and labels, `18–32px` within components, and fluid `35–120px` separation between major instruments and task content. Dividers establish rhythm before extra containers do.

## Elevation & Depth

Calmera is flat by default. Depth comes primarily from material contrast, fine rules, clipping, and the layering of circular instruments. Shadows are reserved for bright, actionable or paper surfaces that sit above the receiver casing; there is no ambient glow.

### Shadow Vocabulary

- **Action Lift** (`0 10px 30px rgba(0,0,0,.22)`): Primary buttons at rest; increases to `0 14px 34px rgba(0,0,0,.3)` on hover while the button rises `2px`.
- **Paper Float** (`0 22px 70px rgba(0,0,0,.2)`): The daily signal card only.
- **Toast Float** (`0 12px 40px rgba(0,0,0,.25)`): Temporary confirmation above the workspace.

### Named Rules

**The Hardware-First Rule.** Use borders and material changes before shadow. A shadow must communicate an actionable lift or a clearly overlaid surface.

## Shapes

The base form language uses `12px` controls and navigation links, `14px` task and paper surfaces, `10px` compact history and toast shapes, and `999px` frequency badges. Full circles are reserved for receiver instruments, status dots, dial controls, mood markers, and the breathing visualization. One-pixel rules organize lists, forms, and station chrome. Large decorative rounded rectangles and arbitrary blob silhouettes do not belong in this world.

## Components

### Buttons

- **Shape:** Primary buttons use a `12px` radius, at least `54px` height, and `0 22px` horizontal padding; compact buttons use `46px` height and `0 18px` padding.
- **Primary:** Live Lime background with Receiver Ground text and 700 weight. Hover lifts `2px` and deepens the action shadow.
- **Focus:** The global focus-visible treatment is a `3px` Live Lime outline with a `4px` offset.
- **Disabled:** Disabled Ground with Disabled Text, no shadow, lift, or pointer cursor.
- **Text action:** Transparent with a single muted underline; hover changes both text and rule to Station Paper.

### Chips

- **Frequency badge:** Transparent, `1px` Receiver Line border, pill radius, Live Lime label, and `9px 13px` padding.
- **History signal:** `10px` radius, fine receiver border, a circular color marker, and compact two-line metadata.

### Cards / Containers

- **Paper log:** Station Paper with Receiver Ground text, `14px` radius, `28px` padding, and the Paper Float shadow only when used as the elevated daily signal.
- **State panel:** Deep Violet with Station Paper text, `14px` radius, and fluid `32–52px` padding; remains shadowless.
- **Support panel:** Tuning Coral with Receiver Ground text and ruled link rows; urgency comes from color and direct labels, not alarm-like animation.

### Inputs / Fields

- **Style:** Inputs are transparent on the receiver ground. The title field has only a bottom rule; the journal textarea uses a `1px` Receiver Line border and `14px` radius.
- **Focus:** Live Lime global focus outline and Live Lime caret; no glow.
- **Paper search:** Transparent dark text on Station Paper, grouped with a search icon and Paper Line bottom rule.
- **Placeholder:** Quiet violet-gray (`#6f687f`) that remains visibly distinct from entered content.

### Navigation

The station rail uses three aligned columns for icon, label, and frequency. Default links are muted; hover adds a faint paper wash and shifts `3px` toward the content. The active station reverses to Station Paper with Receiver Ground ink. Below `960px`, the rail becomes a dismissible tray; below `620px`, the home quick dock exposes the four core tools directly.

### Frequency Instruments

The tuner scale uses a fine top rule, repeating ticks, and a `2px` Coral needle capped by a `10px` circular marker. Breathing uses three concentric one-pixel orbits around a circular core. State changes alter scale, border color, and the core's semantic color; they never add decorative particles or glow.

### Station Transition

Only the newly active view receives the route-level tune-in animation: `0.65s` with the standard expressive ease, moving from low opacity, `10px` blur, and a `28%` bottom clip to a clear full frame. Under `prefers-reduced-motion: reduce`, it is removed and all other durations collapse to `0.01ms`.

## Do's and Don'ts

### Do:

- **Do** keep primary actions Live Lime with Receiver Ground text and an obvious verb.
- **Do** use direct labels alongside the radio metaphor so every station remains understandable under stress.
- **Do** use one-pixel rules and material contrast to organize dense journal, history, and support content.
- **Do** preserve the semantic state sequence: lime for live/selected/inhale, violet for hold, aqua for exhale, coral for tuning and support.
- **Do** preserve visible focus and the reduced-motion override on every new interactive component.

### Don't:

- **Don't** introduce glass, glow, glossy gradients, noisy textures, or extra ornamental motion.
- **Don't** turn every surface into a card; keep the receiver ground open and use rules for structure.
- **Don't** use Archivo's uppercase label treatment for supportive body copy or journal content.
- **Don't** add new accent colors when lime, coral, violet, aqua, or the two neutral materials already express the state.
- **Don't** let radio terminology replace explicit task labels, privacy language, or urgent-support clarity.
