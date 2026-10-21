---
title: Text and drawings
sidebar_position: 14
description: Setting type with the Text node and drawing imported SVGs.
---

## Setting text

The **Text** node draws a string into the texture. Pick a **Font** — one imported into the project, or one of the generic families — set the **Size** as a fraction of the texture, and color it; the alpha carries the glyph coverage, so the node feeds a mask directly as well as a color. **Bold**, **Italic**, **Align**, **Line Height** and **Tracking** are the usual controls. The text box takes as many lines as you type, spaced by **Line Height** and aligned to each other by **Align**.

Turn **Antialias** off for hard-edged type: every texel is then either in a glyph or out of it, which is what a stencil, a decal cutout or a pixel-art label wants. It does not re-draw the glyphs, so the switch is free to flick back and forth.

The glyphs are drawn at the resolution the pass is being rendered at, not scaled up from a smaller picture, so they stay crisp at any size and at any angle — and a 4K export sets them again at 4K. Select the node to place it by hand in the 2D View — see [Placing things by hand](./placing-by-hand.md).

Fonts are imported through **Resources → Import Fonts…**. A material using a font that was not imported with it falls back to a generic family, and Properties says which font is missing rather than quietly choosing another. To let whoever uses the material choose the face in the Viewer, give it a **Font** input, and a **Text** input for the words, and wire them to the node's exposed **Font** and **Text** (see *Material settings and presets*).

## Drawings

The **SVG** node draws an imported vector file into the texture. Pick a **Drawing**, set **Scale** — the longest side, as a fraction of the texture, so a wide drawing and a tall one at the same setting take up the same room — and place it with **Offset** and **Rotation**, or by hand in the 2D View. **Tint** multiplies the drawing's own colors, **Background** fills behind it, and the alpha carries its coverage, so it cuts out as a decal or a stencil without a conversion.

Its **Spline** output is the same drawing as curves: every path, rectangle, circle, ellipse, line and polygon in it, through any transforms it sits under, with its curves kept exactly — lying where the image draws it, and moving, turning and scaling with it as you place the node. Wire it into **Spline Render** to stroke the outlines, **Spline Fill** to fill them, or any spline node to trim, offset, wiggle or scatter along them, so a logo from Illustrator, Inkscape or Figma becomes a bevelled emblem or an engraved line. Shapes inside `<defs>` are not drawn and are left out; a path longer than a curve holds comes through as several; at most 256 curves in all.

It is rasterised at the resolution being rendered, not scaled from a small picture, so a logo is sharp in a 256-pixel preview and again in a 4K export. **Antialias** off gives hard edges, one texel either in the drawing or out of it.

Import drawings with **Resources → Import SVGs…**. A file that is not an SVG is refused when it arrives rather than drawn as nothing, and the reason appears under **Help → Report a Problem…**. An imported drawing runs no script and loads nothing from the network: a browser draws SVGs in a restricted mode that forbids both. To let whoever uses the material swap the drawing — a logo, a badge — in the Viewer, give it an **SVG** input and wire it to the node's exposed **Drawing**.
