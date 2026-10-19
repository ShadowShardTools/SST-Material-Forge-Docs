---
title: Shapes and patterns
sidebar_position: 14
description: The Shape node and its shapes, outlines, rounding and stretch; Checkerboard and Grid.
---

The **Shape** node draws one shape as a mask. Choose it from **Shape**:

- **Circle**, **Square** and **Diamond**, and **Dome** — a circle that rises to a rounded height in the middle rather than being flat, ready for Height to Normal.
- **N-gon**, a regular polygon of **Sides** sides, and **Star**, of **Points** points whose hollows reach in to **Inner Radius** — near 1 is a polygon with a slight dent between points, 0.4 the classic star.
- **Cloverleaf**, **Heart**, **Teardrop**, **Crescent** (a disc with a **Bite** taken out) and **Gear** (with **Teeth** cut **Tooth Depth** into its rim).
- **Pie**, a slice **Sweep** degrees wide, and **Arc**, a curved band of the same.
- The shapes it shares with 2D SDF Shape: **Ellipse**, **Rhombus**, **Parallelogram** (**Skew**), **Trapezoid** (**Top Width**), **Triangle**, **Isosceles Triangle**, **Hexagram**, **Egg** (**Point**), **Vesica** (**Narrowness**), **Cut Disk** (**Kept**), **Tunnel**, **Stairs** (**Steps**) and **Capsule** (**Top Size**).
- The drawn ones, whose width is **Thickness**: **Line**, a bar with round ends; **Cross**; **X**; **Arrow**; **Chevron**; and **Spiral**, wound **Turns** times from the centre out.

Each shape faces up where it has a way to face — a polygon's point, a pie's opening, an arrow's head — and **Rotation** turns it clockwise from there. **Size** is how far across it reaches, **Centre** places it, y measured down as the image is seen, and a shape placed across an edge comes back in at the opposite one, so it tiles. Three settings change any shape:

- **Stretch X** and **Stretch Y** make it wider or taller: a circle becomes an ellipse, a square a rectangle. An Ellipse, Rhombus, Isosceles Triangle or Tunnel stretched keeps an exact edge, as 2D SDF Shape's **Aspect** does.
- **Corner Rounding** rounds the corners of the shapes that have them — squares, polygons, stars, pies, crosses, gears, arrows and the shapes from 2D SDF Shape — keeping their flat sides where they were.
- **Outline** keeps only a band **Outline Width** wide inside the edge: a ring from a circle, a frame from a square, a star drawn as a line.

**Softness** fades the edge inward. Shape draws a single shape; for many of them, feed it into **Scatter**. Shape is the quick way to a mask in one node; to join shapes smoothly, cut one from another, offset, ring or repeat them, start from **2D SDF Shape** instead (below).

**Checkerboard** and **Grid** fill the image with **Columns** cells across and **Rows** down — whole numbers, so either always tiles. Checkerboard alternates **Color 1** and **Color 2**. Grid draws white lines on black, **Thickness** being a share of a cell's shorter side, so the lines are as thick across as down however unlike the columns and rows. Its **X Offset** slides each row along by that share of a cell more than the row below it, and **Y Offset** does the same for columns, downward: 0.5 gives brickwork, and a smaller offset steps the rows into a diagonal. A grid stays seamless when the offset adds up to whole cells over the image — X Offset times Rows, and Y Offset times Columns, each a whole number.
