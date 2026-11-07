---
title: Requirements
sidebar_position: 1
description: What SST Material Forge needs to run, and how working resolution affects GPU memory.
---

SST Material Forge is a desktop application for Windows and Linux. Every node is evaluated on the GPU through **WebGPU**, so it needs a graphics card with **Direct3D 12** (Windows) or **Vulkan** (Linux) — almost every card from the last ten years — and up-to-date drivers. Without WebGPU — usually because of out-of-date graphics drivers — the editor says so when it starts instead of loading. Virtual machines and remote-desktop sessions often offer no WebGPU even on a capable machine.

Saving a project or exporting maps opens a save dialog, and links open in your browser.

## Resolution and GPU memory

The resolution in the menu bar is the **working** resolution used while editing (64 to 2048). Higher is sharper and slower. Exports are baked separately at their own size.

Beside it is the working **precision**. Node outputs are held in 16-bit float by default: plenty to look at, but a long chain of math on a height map can band, since 16-bit float keeps about 2,000 steps between 0.5 and 1. Choose **32-bit float** to see exactly what a 16-bit PNG, a 16-bit TIFF or an EXR will bake — those formats bake at 32-bit whatever is chosen here. It takes twice the GPU memory; if memory runs out, the editor goes back to 16-bit first. **8-bit** goes the other way, for a large graph on a small graphics card: half the memory of 16-bit float, every node still computing in 16-bit float but handing on what it made in 256 steps of 0–1 — so gradients can band, and anything outside 0–1 (heights pushed past it, HDR light) is clipped. Integer and 2D SDF results keep 16-bit float, a node set to 16 or 32-bit in its own **Bit Depth** keeps that, and exports bake at the precision their format needs whatever is chosen here.

A node can also choose for itself: **Bit Depth** in the Properties panel, under **Sampling**. **Inherit**, the default, follows the working precision (or the bake's). **16-bit float** and **32-bit float** hold that node at that precision whatever the rest of the graph uses — 32-bit for the one height map that bands. **8-bit** holds the node's outputs in half the memory of 16-bit float, but clamps them to 0–1 and rounds them to steps of 1/255: right for masks and color, wrong for heights, distances or anything outside 0–1. The node still computes at the working precision; only what it hands on is 8-bit, in the editor and in exports alike. Integer and 2D SDF outputs keep the working precision. Every node shows its depth under its thumbnail, beside its resolution.

Large graphs at high resolutions need a lot of GPU memory, and the editor keeps what a graph holds to a fixed amount however many nodes it has — a thousand-node graph at 2048 × 2048 runs in about a gigabyte. Each node's preview is taken as it renders, and an intermediate result goes as soon as nothing still to render needs it, the ones dearest to recompute kept longest; the dearest of those let go are kept in your computer's memory instead and come back from there rather than being recomputed. A result that is one value everywhere costs next to nothing: a Constant, an Input’s value, and a blend, adjustment or math node fed only such values is held as that one value rather than an image of it — and so is any channel of the Output set to one, such as a Metallic of 0 — so tinting a color or scaling a roughness through a few nodes takes no memory to speak of. Only the material you are editing keeps its intermediate results: another material keeps just its finished maps, for the 3D View. How much they may hold is **Settings → Editor → GPU memory for node outputs**: **Auto**, the default, takes a share of what your graphics card is likely to have (browsers don't report it, so Auto errs low), or choose a fixed amount from 512 MB to 8 GB. More lets a large graph recompute less as you edit it; the status bar's tooltip and **Help → About** show the amount in use. If the GPU still runs out of memory, the editor lowers its memory use and tells you — halving that amount until the editor restarts, without changing your setting; closing other GPU-heavy tabs or applications also helps.

While you drag a setting, what it changes renders at half resolution, so the drag keeps up, and at full resolution the moment you let go; turn this off with **Settings → Editor → Lower resolution while dragging**.

The 3D View keeps copies of the maps of its own, at most 2048 × 2048 (height excepted); the 2D View and exports use the maps at full size.
