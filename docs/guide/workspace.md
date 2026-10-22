---
title: The workspace
sidebar_position: 2
description: The Forge and Viewer tabs, and every panel of the editor.
---

## Forge and Viewer

The editor has two tabs, beside its name in the menu bar:

- **Forge** builds the material out of nodes. Everything in this guide up to [Material settings and presets](./material-settings-and-presets.md) happens here.
- **Viewer** uses it: pick a material on the left, look at it in the 3D View, change its settings on the right, and save those settings as presets or export its maps. No nodes, so a material can be used without knowing how it was made.

## The panels

| Area | What it is for |
| --- | --- |
| Menu bar | The File, Edit, Arrange, View, Window and Help menus on the left, the Forge and Viewer tabs and the working resolution and precision in the middle, and undo and redo on the right |
| Explorer | Packages, folders, materials, subgraphs and imported textures. Every package has **Materials**, **SubGraphs** and **Resources**, each colored like what it holds; they are part of the package and cannot be renamed, moved or deleted. Right-click a row to make something where it is — **Create Material** under Materials, **Create SubGraph** under SubGraphs, **Import Textures…** under Resources, and **Create Folder** in any of them — or to rename or delete it; the header itself holds only **New package** and **Delete**. Folders of your own go inside those three, never beside them, and stay in the one they were made in. Drag a row onto the edge of another to move it beside it, or into the middle of a folder to file it there; <kbd>Alt</kbd> with the arrow keys does the same from the keyboard. Creating, renaming, moving and deleting here all undo with <kbd>Ctrl</kbd>+<kbd>Z</kbd>, along with the edits in the open graph |
| 3D View | The material on a sphere, cube, plane, cylinder or knot, lit like a real surface. The sun button chooses the environment map that lights it, with exposure, rotation, and the environment shown behind the model at any blur. Maps are the environment maps of the asset library's Built-in section, the image files in the project's `resources/library/HDRIs` folder |
| 2D View | The selected node's output, optionally tiled — or, pinned, one node's output whatever is selected |
| Graph | The nodes of the material or subgraph you are editing. Each graph panel shows a graph of its own |
| Inputs | The open material's or subgraph's inputs, down the left of the graph. The double arrow hides it, and the handle it leaves behind brings it back |
| Properties | The selected node's settings — or, pinned, one node's |
| Status bar | Node count, resolution, GPU memory in use and evaluation time |

Panel dividers can be dragged, or focused and moved with the arrow keys; <kbd>Esc</kbd> during a drag puts one back.
