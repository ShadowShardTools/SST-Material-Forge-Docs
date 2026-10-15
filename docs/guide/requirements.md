---
title: Requirements
sidebar_position: 1
description: What SST Material Forge needs to run, and how working resolution affects GPU memory.
---

SST Material Forge is a desktop application for Windows and Linux. Every node is evaluated on the GPU through **WebGPU**, so it needs a graphics card with **Direct3D 12** (Windows) or **Vulkan** (Linux) — almost every card from the last ten years — and up-to-date drivers. Without WebGPU — usually because of out-of-date graphics drivers — the editor says so when it starts instead of loading. Virtual machines and remote-desktop sessions often offer no WebGPU even on a capable machine.

Saving a project or exporting maps opens a save dialog, and links open in your browser.

## Resolution and GPU memory

The resolution in the menu bar is the **working** resolution used while editing (64 to 2048). Higher is sharper and slower. Exports are baked separately at their own size.

Large graphs at high resolutions need a lot of GPU memory. The editor keeps it in check by dropping intermediate results once their previews are shown and recomputing them when needed. If the GPU still runs out of memory, the editor lowers its memory use and tells you; closing other GPU-heavy tabs or applications also helps.
