---
title: The workspace
sidebar_position: 2
description: The Forge, Material Viewer and Scene Viewer tabs, and every panel of the editor.
---

## Forge and the Viewers

The editor has three tabs, beside its name in the menu bar:

- **Forge** builds the material out of nodes. Everything in this guide up to [Material settings and presets](./material-settings-and-presets.md) happens here.
- **Material Viewer** uses it: pick a material in the Explorer on the left, drag it onto the 3D View to look at it, change its settings on the right, and save those settings as presets or export its maps. No nodes, so a material can be used without knowing how it was made. It doesn't show your scenes: the 3D View is a default scene of its own, bare until you drop a material on it. You can change the shape and lighting there to look at it, but nothing is saved — leave the Material Viewer and come back, and that scene is at its defaults again.
- **Scene Viewer** does the same for a scene: what you set, save as presets and bake is the material on the scene's model. Pick a scene in the Explorer and its material is the one shown on the right. Picking a material changes nothing here; drop one on the model to put it on the scene's model.

Both Viewers have the same Explorer Forge has, scenes and packages and all, so anything can be made, found and renamed there too.

## The panels

| Area | What it is for |
| --- | --- |
| Menu bar | The File, Edit, Arrange, View, Window and Help menus on the left, the Forge, Material Viewer and Scene Viewer tabs and the working resolution and precision in the middle, and undo and redo on the right |
| Explorer | Packages, folders, materials, subgraphs and imported textures. Every package has **Materials**, **SubGraphs** and **Resources**, each colored like what it holds; they are part of the package and cannot be renamed, moved or deleted. Right-click a row to make something where it is — **Create Material** under Materials, **Create SubGraph** under SubGraphs, **Import Textures…** under Resources, and **Create Folder** in any of them — or to rename or delete it; the header itself holds only **New package** and **Delete**. Folders of your own go inside those three, never beside them, and stay in the one they were made in. Drag a row onto the edge of another to move it beside it, or into the middle of a folder to file it there; <kbd>Alt</kbd> with the arrow keys does the same from the keyboard. Creating, renaming, moving and deleting here all undo with <kbd>Ctrl</kbd>+<kbd>Z</kbd>, along with the edits in the open graph |
| 3D View | The material on a sphere, cube, plane, cylinder or knot — or on a model of your own, imported into Resources — lit like a real surface. **Renderer**, at the foot of the view, draws it **Raster**, at once and as you turn it, or **Ray Traced**: light is followed as it bounces, so the model shadows itself, reflects itself and picks up light bounced between its folds. A ray traced picture starts grainy and clears over a few seconds while nothing moves, its samples counted beside the choice, up to 1024; turning the view or changing anything shown starts it again. With **Denoise** ticked beside it, the picture is cleaned by Open Image Denoise as it settles — about a second after it starts, and again at 64, 256 and 1024 samples — so a clean picture comes long before the samples alone would give one; the count says *denoised* while it is shown. Untick it to see the samples as they are. The sun button chooses the environment map that lights it, with exposure, rotation, and the environment shown behind the model at any blur. Maps are the environment maps of the asset library's Built-in section, the image files in the project's `resources/library/HDRIs` folder |
| 2D View | The selected node's output, optionally tiled, one channel at a time or all together — or, pinned, one node's output whatever is selected. Save As writes it at any resolution |
| Graph | The nodes of the material or subgraph you are editing. Each graph panel shows a graph of its own |
| Inputs | The open material's or subgraph's inputs, down the left of the graph. The double arrow hides it, and the handle it leaves behind brings it back |
| Properties | The selected node's settings — or, pinned, one node's |
| Status bar | Node count, resolution, GPU memory in use and evaluation time |

Panel dividers can be dragged, or focused and moved with the arrow keys; <kbd>Esc</kbd> during a drag puts one back.
