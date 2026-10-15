---
title: Images and resources
sidebar_position: 9
description: Importing textures, environment maps, drawings and fonts into a project.
---

Import photos or textures with **File → Import Textures…**, or by right-clicking **Resources** in the Explorer, then pick them in a **Texture** node's settings, or drag a texture from the Explorer onto the graph.

PNG, JPEG and WebP are read at 8 bits. **16-bit PNG, OpenEXR (.exr) and Radiance HDR (.hdr)** keep their full precision. EXR and HDR hold linear light, which a Texture node converts to sRGB; set its **Color Space** to **Non-color data** for normal, roughness, height and similar maps so they are used exactly as stored.

## Environment maps, drawings and fonts

Resources holds four kinds of file, each with its own item on its right-click menu:

- **Import Textures…** — images the graph samples. They are decoded and resampled to a square working size.
- **Import HDRIs…** — environment maps for the 3D view. They are kept exactly as imported, because the lighting wants the whole panorama and the extra light an `.hdr` or `.exr` carries. An imported map appears under **Imported** in the 3D view's environment list, above the ones that ship with the editor.
- **Import SVGs…** — `.svg`. Kept as the vector source it arrived as, which is what lets the SVG node redraw it at any size.
- **Import Fonts…** — `.ttf`, `.otf`, `.woff` and `.woff2`. A font is registered under the name of the file it came from, and the **Text** node can then set type in it. It is kept with the package, so a project opens elsewhere with its fonts.

All four are saved inside the project file, so a project opens elsewhere with its images, maps and fonts in it. That also means a large environment map makes for a large project file.
