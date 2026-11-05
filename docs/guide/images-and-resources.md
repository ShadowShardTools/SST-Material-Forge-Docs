---
title: Images and resources
sidebar_position: 10
description: Importing textures, environment maps, drawings and fonts into a project.
---

Import photos or textures with **File → Import Textures…**, or by right-clicking **Resources** in the Explorer, then pick them in a **Texture** node's settings, or drag a texture from the Explorer onto the graph.

PNG, JPEG and WebP are read at 8 bits. **16-bit PNG, OpenEXR (.exr) and Radiance HDR (.hdr)** keep their full precision. EXR and HDR hold linear light, which a Texture node converts to sRGB; set its **Color Space** to **Non-color data** for normal, roughness, height and similar maps so they are used exactly as stored.

## Environment maps, drawings and fonts

Resources holds five kinds of file, each with its own item on its right-click menu:

- **Import Textures…** — images the graph samples. They are decoded and resampled to a square working size.
- **Import HDRIs…** — environment maps for the 3D view. They are kept exactly as imported, because the lighting wants the whole panorama and the extra light an `.hdr` or `.exr` carries. An imported map appears under **Imported** in the 3D view's environment list, above the ones that ship with the editor. An `.exr` or `.hdr` is an environment map only when you import it here (or add it from the library as one): anywhere else — **Import Textures…**, the asset library, Save As — it is a texture, like any other image, kept at full precision.
- **Import SVGs…** — `.svg`. Kept as the vector source it arrived as, which is what lets the SVG node redraw it at any size.
- **Import Fonts…** — `.ttf`, `.otf`, `.woff` and `.woff2`. A font is registered under the name of the file it came from, and the **Text** node can then set type in it. It is kept with the package, so a project opens elsewhere with its fonts.
- **Import Models…** — `.glb`, `.gltf`, `.obj`, `.fbx` and `.stl`: shapes to look at a material on, listed under **Models** in the 3D View's shape list beside the built-in ones. Only the shape is read — every part of the file together, centred and sized like the built-in sphere — and a model with no normals or texture coordinates is given them. Compressed glTF — meshopt or Draco — is read too, and a file's materials, textures, rig and animations are passed over, so a model made for a game imports as its shape alone. A `.gltf` must carry its data inside it; one whose buffers are separate files is refused, so save it as a `.glb`. A model can have up to 10 million triangles — a 2K terrain fits — and a large one is read without holding up the editor; a file with no shape to show is refused, and the editor says why.

All of them are saved inside the project file, so a project opens elsewhere with its images, maps, fonts and models in it. Files can also be dragged in from outside the editor: dropped on the Explorer, each is imported as what its name says it is, into the folder it lands on; a model dropped on the 3D View is imported and shown there at once. A model dragged from the Explorer or the asset library onto the 3D View is shown too, in the scene in use, and **Save to Asset Library** keeps one in the library like any other file. That also means a large environment map makes for a large project file.
