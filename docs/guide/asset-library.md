---
title: The asset library
sidebar_position: 11
description: Packages, textures, HDRIs, SVGs, fonts and custom nodes kept between projects, in folders of your own, and used in any of them.
---

The asset library keeps what you use again and again — **packages**, **textures**, **HDRIs**, **SVGs**, **fonts** and **custom nodes** — outside any project, in folders of your own. On the desktop it is a folder of your Documents, under SST Material Forge › Library: files you put there with any file manager appear in it, and what you keep there from the editor is an ordinary file. In a browser it is kept in the browser's own storage.

- **Where it is.** On the start screen it is the **Asset Library** tab, beside Recent Projects. In the editor, open it from **Window → Asset Library**: it opens as a panel under the graph, which can be moved like any other.
- **Bringing files in.** **Import** (the button at the end of its toolbar) or drop files from your system onto it: they are kept in the folder shown. A file of a kind the library does not hold is left out, and named.
- **Folders.** **New Folder** makes one in the folder shown, named as it is made. Drag an item onto a folder — a tile, or a folder in the list down the left — to file it there. Right-click a folder for **Folder Color…**: one of eight colors, or none, shown wherever the folder is. **Rename** (<kbd>F2</kbd>) and **Delete** (<kbd>Delete</kbd>) work on folders and assets alike; on the desktop a deleted item goes to the Recycle Bin.
- **Sizes.** The four buttons in its toolbar show the items as small, medium or large tiles, or as a list with each item's kind, size and date. Each place remembers its own choice.
- **Finding.** **Search** looks through the folder shown and every folder inside it; the kind menu shows only packages, textures, HDRIs, SVGs, fonts or nodes.
- **Using an asset.** Double-click it, or right-click it for **Add to Project**: a texture, HDRI, SVG or font is copied into the project's Resources, a node into Functions, and a package is added beside the project's own. Drag it onto the graph to add it and use it at once — a texture as a Texture node, a drawing as an SVG node, a font in a Text node, a custom node as itself — or onto a folder of the Explorer to copy it there. A project always keeps its own copy, so it opens the same where the library is different.
- **Keeping part of a project.** Right-click a package, an imported file or a custom node in the Explorer and choose **Save to Asset Library**. A package is pictured by the 3D view when the material it shows is in it.
