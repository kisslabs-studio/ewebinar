# eWebinar hero globe

This package contains a ready-to-use animated COBE globe for the eWebinar
homepage hero.

The globe uses:

- A light theme
- Unlabelled world-city markers
- Static connecting arcs
- Automatic globe rotation
- Responsive desktop, tablet, and mobile positioning
- Reduced-motion support

## What to send to the developer

The developer needs these two files:

- `handoff/HeroGlobe.tsx`
- `handoff/hero-globe.css`

The included `index.html` is only a standalone visual preview. It does not need
to be copied into the production website.

## Requirements

The supplied component is ready for a React or Next.js project.

- React 18 or newer
- A browser environment with WebGL support
- The `cobe` npm package

The component already includes `"use client"`, so it can be imported into a
Next.js App Router page or component.

## Installation

From the client project's root directory, install COBE:

```bash
npm install cobe@^2.0.1
```

Equivalent commands:

```bash
pnpm add cobe@^2.0.1
yarn add cobe@^2.0.1
```

Next, copy the handoff files into the project. For example:

```text
components/
  HeroGlobe.tsx
  hero-globe.css
```

If the files are placed in different folders, update the CSS import at the top
of `HeroGlobe.tsx`.

## Add the globe to the hero

Import the component into the existing hero:

```tsx
import { HeroGlobe } from "@/components/HeroGlobe";

export function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        {/* Existing headline, copy and CTA */}
      </div>

      <HeroGlobe />
    </section>
  );
}
```

The globe should be a direct child of the hero section, alongside the existing
hero content.

## Required hero styles

The existing hero container must establish the globe's positioning area and
crop anything outside it:

```css
.hero {
  position: relative;
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 2;
}
```

The supplied `.hero-globe` uses `z-index: 1`, so this keeps the headline,
paragraph, and CTA above the canvas.

Do not place the globe inside a narrow content container. It needs to be
positioned relative to the full-width hero section.

## Next.js notes

`HeroGlobe.tsx` is a client component because COBE needs the browser canvas and
WebGL APIs.

It can be imported by either a server or client component. Do not remove:

```tsx
"use client";
```

If the project has strict global-CSS import rules, move the contents of
`hero-globe.css` into the project's global stylesheet, or convert it to a CSS
module and update the component's class names.

## Adjusting its position

The desktop positioning follows the supplied Figma hero:

- Hero reference size: `1728 × 860`
- Globe artwork position: approximately `x: 817`, `y: 109`
- Globe artwork width: approximately `1129px`

The responsive positioning is controlled in `hero-globe.css`.

The developer can fine-tune these properties if the production hero has
different dimensions:

```css
.hero-globe {
  top: ...;
  right: ...;
  width: ...;
}
```

Avoid changing COBE's internal `scale: 1.08` unless necessary. That value leaves
enough room inside the WebGL canvas to prevent the arcs from being clipped.

## Current COBE configuration

The requested visual settings are already configured in `HeroGlobe.tsx`:

- `dark: 0`
- `diffuse: 3`
- `mapSamples: 13000`
- `mapBrightness: 6`
- `scale: 1.08`
- Marker size: `0.04`
- `arcHeight: 0.25`
- `arcWidth: 0.4`
- Auto-rotation enabled

City names exist only as source-code context; no city labels are displayed.

## Accessibility and performance

- The canvas is decorative and hidden from assistive technology.
- Automatic rotation stops when a visitor enables reduced motion.
- Canvas resolution is capped at a device-pixel ratio of `2` to avoid
  unnecessary GPU work on very high-density displays.
- The component destroys its WebGL instance when unmounted.

## Standalone preview

To preview the supplied example locally, run this command from this folder:

```bash
python3 -m http.server 4173
```

Then visit:

```text
http://localhost:4173
```

## License

COBE is distributed under the MIT License:
<https://github.com/shuding/cobe>
