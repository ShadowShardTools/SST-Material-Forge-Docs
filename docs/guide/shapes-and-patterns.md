---
title: Shapes and patterns
sidebar_position: 15
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

**Scatter** places its **Pattern** many times over the image, and **Scatter Atlas** does the same with each copy picking a cell of an atlas made by **Create Atlas**. Every scatter — these two, **2D SDF Scatter**, **Spline Scatter**, **Spline Scatter Atlas** and **Spline Instancer** — has the same settings, meaning the same thing on each:

- **Mode** says where the copies go. Over an area: **Grid** lays **X Amount** by **Y Amount**, every other row moved along by **Stagger** (half gives brickwork), each copy **Scale** of its cell across; **Random** places **Count** copies **Size** across anywhere, spread evenly enough that none is far from the next but in no grid — pebbles, rivets, debris; **Radial** puts **Count** copies in a ring **Radius** from the middle, and **Face Outward** turns each to point away from it. Along a curve: **Even** spaces **Count** copies along each curve by distance, **Random** puts them anywhere along it.
- **Rotation** turns every copy clockwise. **Random Scale** shrinks each copy by up to that share of its size, **Random Rotation** turns it up to that many degrees either way, and **Random Offset** moves it up to that share of the way to its neighbour — across its cell, round the ring or along the curve. **Random Value** darkens each copy of an image by up to that much. Each comes from its own part of the **Seed**, so turning one up leaves the others as they were.
- **Density** thins the copies out, and a **Mask** thins them where it is dark — read once per copy, so a copy is wholly there or wholly gone.
- **Blend**, on the scatters of images, decides what overlapping copies do: **Max** joins them, which is what a height or a mask wants; **Add** accumulates; **Over** lets later copies cover earlier ones by their alpha.

A scatter tiles: a copy running off one edge is the same copy arriving at the other.
