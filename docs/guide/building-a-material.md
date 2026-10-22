---
title: Building a material
sidebar_position: 3
description: Adding and connecting nodes, adjusting settings, and the Output node that ends every material.
---

1. **Add nodes.** Right-click empty space in the graph (or press <kbd>Space</kbd>) to open the node menu. Type to search by name or by what you need (for example “voronoi”, “albedo” or “glitter”), or open a category and pick a node. The node is placed where you clicked. To browse instead, open **Window → Nodes**: every node of the menu, by category, as tiles or a list — drag one onto the graph to place it there, or double-click it to add it in the middle of the view.
2. **Connect them.** Drag from an output port on the right of a node to an input port on the left of another. Let go over empty canvas instead and the node menu opens there: pick something and it arrives already wired to the port you pulled from — pulling from an input asks for something to feed it, and from an output for something to feed. Drag from a connected input to move or remove its wire, or <kbd>Alt</kbd>-click a wire to disconnect it.
3. **Adjust settings.** Select a node to see its settings under Properties. Drag a slider, type an exact value, or focus a slider and use the arrow keys.

   A color opens a picker from its swatch: a saturation square, a hue slider, and hex, RGB or HSL fields — the small **RGB** / **HSL** button switches which. Where a color has an opacity, as the Constant node and each gradient stop do, the picker carries an alpha slider for it — that is the only place it is set, beside the color it applies to rather than further down the panel. The **pipette** beside the field picks a color from the screen, where the browser offers it.
4. **Send results to the material.** Every material ends in one **Output** node, which lists the channels it has — Base Color, Normal, Metallic, Roughness, Height and Ambient Occlusion — each with the number of values it takes. Connect your results to those slots; whatever reaches them appears in the 3D View and is exported, and empty slots keep the material's defaults. The node is part of the material, so it cannot be deleted or copied.

   Two settings on the node say what the material is:

   - **Mode** — **PBR** is a lit surface with the channels above. **Unlit** is a plain unlit shader: its Base Color alone, drawn as it is, with no lighting, no reflections and no relief.
   - **Surface Type** — **Opaque** is solid; **Transparent** adds an **Opacity** channel and blends the material where it is thin.
   - **Alpha Clipping**, in Properties when the Output node is selected — a switch and a **Clip Threshold**. Either surface can clip: the material is drawn where its **Opacity** reaches the threshold and cut away where it does not, which is how leaves, grates and fabric edges are made. Turning it on gives the material an Opacity channel even when it is Opaque.

   The settings decide which channels the material has, so choosing Unlit drops the channels it has no use for, and disconnects what fed them. That happens in the same step as the change, so one <kbd>Ctrl</kbd>+<kbd>Z</kbd> brings both back.

   **Add output** under the slots gives the material an output of its own: a slot to wire, named and typed under **Custom Outputs** in Properties — Float, Vector 2, Vector 3 or Vector 4, which is what its port is colored and counted as. Nothing shades it; it is baked and saved beside the material's channels, named after it (`wall_curvature-mask_1024.png`), for whatever reads it. Declare as many as the material needs.
