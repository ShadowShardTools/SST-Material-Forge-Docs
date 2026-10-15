---
title: 2D signed distance fields
sidebar_position: 16
description: Building shapes as signed distances — joining them smoothly, reshaping and repeating them — and drawing them as fills, strokes, bevels and glows.
---

The **2D SDF** nodes build shapes the way a vector drawing does, and only turn them into pixels at the end. Every pixel of a signed distance field holds how far it is from the edge of the shape — negative inside, positive outside, zero on the edge, measured in image widths — so a field knows where its outline is to a fraction of a pixel, and an outline, a bevel and a glow all come from the same field without anything being solved again. Fields travel on an **indigo** wire. In a thumbnail they are drawn orange inside and blue outside, with rings every few pixels of distance and a white line on the edge, so you can see the shape and the field around it at once.

A chain usually runs **2D SDF Shape** → **2D SDF Combine**, **2D SDF Modify**, **2D SDF Transform** or **2D SDF Repeat**, as many as you like → **2D SDF to Mask**. The 2D SDF wire connects to grayscale both ways, so a field can go through Math, Levels or a Blend, and a grayscale image can be read as a field. To start from a mask you already have — a Shape, Bricks, a drawing, a scan — use **Mask to 2D SDF**.

**2D SDF Shape** gives over thirty primitives with exact distances: circle, ellipse, box, rhombus, parallelogram, trapezoid, triangles, polygon, star, hexagram, cross, heart, egg, teardrop, vesica, crescent, cut disk, pie, arc, tunnel, stairs, capsule, gear, cloverleaf, line, arrow, chevron and spiral. **Rounding** rounds every corner without changing the shape's size, which a blur cannot do. For one shape as a plain mask, **Shape** under Patterns draws all of these in a single node, with Softness, Outline and Stretch of its own.

**2D SDF Combine** joins two fields. **Union** keeps both, **Subtract** cuts B out of A, **Intersect** keeps their overlap, **XOR** keeps everything but the overlap, and **Morph** blends one shape into the other by **Amount**. The **Join** is what fields are for: **Smooth** melts the two together over **Smoothness**, like wax, and **Chamfer** bevels the seam at 45°, which a mask cannot do at all.

**2D SDF Modify** works on one field. **Offset** grows the shape by **Amount**, rounding its outer corners as an outline round it would, or shrinks it when negative; **Onion** turns it into a shell **Thickness** wide, and more **Rings** split the shell again into concentric outlines; **Invert** swaps inside and outside; **Displace** pushes the edge in and out by a map, for a hand-cut or eroded outline.

**2D SDF Transform** moves, turns and scales a field, and keeps its distances true as it does. **Mirror** folds it across the middle, for a symmetric shape from half of one; **Elongate** pulls the two halves apart and fills the gap with the middle, so a circle becomes a pill; **Bend** curves it. Scaling down gives one smaller shape, not copies — for copies, use **2D SDF Repeat**: a **Grid** of **Columns** × **Rows**, every other row moved along by **Stagger** for brickwork and each copy turned by up to **Random Rotation**, or **Radial**, **Count** copies in a ring that **Face Outward** if you like. Copies in a ring that are big enough to overlap join cleanly rather than being cut off where one meets the next.

**2D SDF to Mask** draws a field. **Fill** is the shape, anti-aliased at any resolution; **Stroke** is a line **Width** wide centred on the edge; **Bevel** rises from the edge inward over Width, ready to be a height map; **Outer Glow** and **Inner Glow** fade out from the edge; **Contours** draws isolines **Spacing** apart, like a topographic map; **Distance** shows the field itself: gray at the edge, white Width inside and black Width outside. **Offset** moves the edge each of these is measured from, so one field gives an outline, a border and an inset.

**Mask to 2D SDF** measures the distance to the edge of a grayscale mask, inside and out, at **Threshold**. A field made this way is as accurate as the mask's pixels, so give it a clean, high-resolution mask; the shapes from 2D SDF Shape are exact.
