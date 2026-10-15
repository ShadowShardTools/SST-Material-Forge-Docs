---
title: Reusing work with subgraphs
sidebar_position: 6
description: Packaging part of a graph as a node of its own, and using one material inside another.
---

A package holds **Materials** and **SubGraphs**. A subgraph is a piece of a graph you can use in several materials. Any graph can be used inside another: drag it from the Explorer onto a canvas, or pick it in the node menu. A subgraph brings the outputs it declares; a **material** used this way brings the channels it fills — its Base Color, Normal, Roughness and the rest, and only those — so one material can be built on another.

1. Create one by right-clicking **SubGraphs** in the Explorer, or **File → New SubGraph**. It opens with an input wired to its **Output** node.
2. Declare its inputs in the **Inputs** panel down the left of the graph, exactly as for a material, and drag each one onto the graph where it is read. Every input becomes an input port on the subgraph's node, with the default used when nothing is connected to it.
3. Declare its results on the **Output** node, the way a material declares its own outputs: **Add output** under the slots, then a name and a type in Properties. Each becomes an output port on the subgraph's node, and a slot to wire on the Output node. A subgraph is not shaded, so it has no Mode and no Surface Type — only results. There is one Output node per subgraph; it cannot be deleted or copied.
4. Build between them.
5. Use it in a material: open the node menu and pick the subgraph by name, under **SubGraphs**, or drag it from the Explorer onto the canvas. Materials are listed the same way, under **Material**.

Editing a graph updates everything using it. No graph can be placed inside itself, directly or through another, so the menu does not offer it there and a drop is refused. Deleting a subgraph leaves the nodes that used it in place, marked as missing.
