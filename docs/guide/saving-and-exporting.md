---
title: Saving and exporting
sidebar_position: 20
description: Project and package files, and baking maps for game engines and other tools.
---

The editor writes two kinds of file, and both are JSON:

| File | Holds | Written by |
| --- | --- | --- |
| **Project** `.sstproj` | The whole workspace: every package, with its materials, subgraphs and imported textures, environment maps and fonts | **File → Save Project** (<kbd>Ctrl</kbd>+<kbd>S</kbd>) or **Save Project As…** (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd>) |
| **Package** `.sstpkg` | One package on its own, to hand to someone else or reuse in another project | Right-click the package in the Explorer → **Export Package…** |

Both are containers: the document and the files it uses, packed together. Imported images, environment maps and fonts go in as the files you chose, byte for byte, so nothing is re-encoded and nothing grows a third in size the way an embedded copy does. A file used by two materials — or by two packages — is stored once. On the desktop, saving writes to a temporary name and renames it into place, so an interrupted save cannot destroy the file it was replacing.

- **New Project** (<kbd>Ctrl</kbd>+<kbd>N</kbd>) closes the project and starts a new one: a package with one blank material, open in the graph.
- **Open Project** (<kbd>Ctrl</kbd>+<kbd>O</kbd>) loads one, replacing what is open.
- **Save Project** (<kbd>Ctrl</kbd>+<kbd>S</kbd>) writes the project back to its own file — the one it was opened from or last saved to — without asking. A project not saved yet asks where, and is named after its first package.
- **Save Project As…** (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd>) saves to a new file, which from then on is the project's own.
- **The start screen** is where SST Material Forge begins, before the editor: **New Project**, **Open Project…**, **Settings** and, in the desktop application, **Exit** down the left, and your recent projects on the right, each with the picture of its 3D view it was last saved or opened with — click one to open it. The editor opens once a project is chosen. **File → Start Screen…** goes back to it; a project with unsaved changes asks first when you start or open another.
- **Open Recent** lists the last ten projects you opened or saved, newest first, with the folder each is in; choose one to open it, or **Clear Recent** to empty the list. A project that has since been moved or deleted drops off it. The list is the desktop application's: a browser never learns where a file was.
- New Project, Open Project and closing the window all ask first when the project has changes since it was last opened or saved: **Save**, **Don't Save**, or **Cancel** to keep working. In a browser, leaving the page with unsaved changes brings up the browser's own warning instead.
- In a browser rather than the desktop application, every save downloads the file, so Save Project always gives you a new copy.
- **New Package** adds an empty package to the project — the File menu, or the button at the top of the Explorer.
- **Import Package…** adds a package file to the project that is open, beside what is already there — the File menu, or right-click any package. Importing the same package twice gives you two of them: the copy is given ids of its own, so the two are separate packages and nothing in one points into the other.
- Opening a `.sstpkg` with **Open Project…** imports it rather than replacing your work, so the wrong menu item costs nothing.
- If a file is damaged, everything that can be loaded is, and a message lists exactly what could not be. Each file inside is checked against its own contents as it is read: one that does not match is left out and named, rather than loaded as the wrong image.
- Every file records the file format it was saved in. A file from an earlier release opens in every later one, brought up to date as it opens, and a message says what changed. The first time you save over it, the original is kept beside it — `Wall (format 2).sstproj` — for an older version of the app to open. A file from a newer release than yours says which release saved it, so you know to update.
- **Bake current preset…** — under Presets in the Viewer — bakes the material's maps at 64 to 8192 pixels — the small sizes for icons and quick previews — as the material is set now, and each downloads as it finishes. **Bake all presets…** bakes the same maps once for every preset, Default included, each set exactly as it was saved, with the preset's name in its files — `wall_worn_basecolor_2048.png` — so a set of variations comes out in one go. The material in the editor is left as it was.

  **Engine** — for a PBR material — writes the files a given engine reads, packed the way it reads them: **Unreal Engine** and **Godot 4** take one ORM image (occlusion, roughness and metallic in its three channels), **Unity URP** wants metallic in red, occlusion in green and smoothness — roughness inverted — in the alpha, which is one texture for both of its slots, **Unity HDRP** its mask map, and **glTF** its occlusion-roughness-metallic image. Each row says underneath what it carries. A channel with nothing connected is written at the value the material leaves it at, so an ORM with no occlusion map has white in its red channel rather than a hole. Presets are only offered for PBR: they name the channels a lit surface has. **Every map on its own** is the plain list.

  A large bake is safe to leave running. **Peak memory** estimates what it needs, and a bake that may not fit asks before it starts. While it runs, the bar shows how long it has taken and roughly how long is left, and **Cancel** stops it within a node. Big passes are drawn in bands, so the GPU is never busy long enough for the driver to reset; if memory runs out with every map baked together, the rest are baked one file at a time; and a file is only written once its maps are known to be whole, so nothing half drawn is ever saved. If the GPU stops responding part way, the bake says which files were finished. On the desktop the computer is kept from sleeping while a bake runs, and closing the window asks first.

  Every map the material has is a row in the table: its channels as the Mode and Surface Type leave them, and every output of its own, under the name you gave it. Each row says whether it is baked, in which file type and at what depth, and what the file will be called; a map with nothing connected has nothing to bake and says so. **All maps** at the top sets every row at once, and a row changed afterwards keeps its own choice — height as 16-bit PNG beside an 8-bit base color, say. Where maps of different depths are baked together, the bake runs at the deepest one asked for, so nothing loses the precision it was chosen for.

  The file types:

| Format | Use it for |
| --- | --- |
| PNG 8-bit | The default for game engines |
| PNG 16-bit, TIFF 16-bit | Height and normal maps without banding |
| TGA 8-bit, TIFF 8-bit | Tools that expect them |
| JPEG, WebP | Small, lossy files for the web (quality setting) |
| OpenEXR half / full float, Radiance HDR | HDR and VFX pipelines; values outside 0–1 survive |

16-bit and float formats are baked in 32-bit float for full precision. Base color is written as sRGB in 8- and 16-bit formats and as linear light in EXR and HDR; data maps are written exactly as computed. Grayscale maps are single-channel where the format allows.

**One node on its own.** The **R**, **G**, **B** and **A** buttons in the 2D View's top-left corner choose the channels it shows: click one to hide or show it, or <kbd>Alt</kbd>-click to see it alone in gray — Alt-click it again for all four. Alpha alone shows the coverage; with alpha off, the color under transparent parts shows. **Save As** (the download button above the 2D View) renders the node it shows at 64 to 8192 pixels, in any of the formats above, with every channel whatever the view shows, as the graph's inputs are set by default — and saves it to a file you choose (a download in a browser), into your **Asset Library**, in one of its folders, or into a **Package**'s Resources as a texture its materials can use. A package takes PNG, TGA, TIFF, JPEG or WebP; EXR and HDR files are environment maps there, so they go to a file or the library instead.

Your project file is only ever written when you save. While a project has unsaved changes, though, a copy of it is kept every minute, apart from the file — **Settings → Editor → Autosave for recovery** sets how often, or turns it off. If the editor closes without saving — a crash, a frozen driver, a power cut — that copy is offered back the next time you open it, and **Restore** brings the work back as it was at the last autosave, still unsaved, with **Save** putting it back in its own file. If the GPU stops responding or the editor hits an error, a copy is kept at once rather than at the next autosave. On the desktop, an editor window that crashes reopens by itself to offer it, and with several copies of the editor open, each keeps its own copy: whichever were left by copies that are no longer running are offered back, one at each start. Closing after **Save** or **Don't Save** keeps nothing, so the same work is not offered twice.
