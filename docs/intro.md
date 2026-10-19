---
title: Introduction
slug: /intro
sidebar_position: 0
description: What SST Material Forge is, how it is laid out, and where to start reading.
---

SST Material Forge builds tileable PBR materials — base color, normal, roughness, metallic, height and ambient occlusion maps — from a graph of nodes. Every node runs on your GPU, so changes show up as you make them, and a finished material bakes out as the texture files your engine reads.

It is a desktop application for Windows and Linux.

## How it fits together

- A **project** holds one or more **packages**. A package holds **materials**, **subgraphs** (pieces of graph you reuse), and **resources** — the images, environment maps, drawings and fonts the graphs use.
- A **material** is a graph of nodes that ends in an **Output** node. Whatever reaches the Output node's channels is what the material looks like in the 3D View and what gets exported.
- The editor has two tabs: **Forge**, where you build a material out of nodes, and **Viewer**, where you use it — change its settings, save presets and export its maps without touching the graph.

## Where to start

1. Check the [requirements](./guide/requirements.md) — the editor needs a graphics card with WebGPU (Direct3D 12 or Vulkan).
2. Get to know [the workspace](./guide/workspace.md).
3. Follow [Building a material](./guide/building-a-material.md) to add, connect and adjust your first nodes.
4. When the material looks right, [save and export](./guide/saving-and-exporting.md) it.

The [node reference](./nodes/index.md) lists every node, with its ports, settings, defaults and ranges.

:::tip

Inside the editor, <kbd>F1</kbd> opens the user guide and <kbd>?</kbd> lists every keyboard shortcut as it is currently bound.

:::
