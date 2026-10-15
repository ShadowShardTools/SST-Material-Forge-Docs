---
title: Shaping signals and edges
sidebar_position: 17
description: Easing curves, bevels, sharpening, embossing, edge detection, swirl, posterization and color replacement.
---

## Easing a signal

**Ease** (Math) reshapes values through one of the thirty standard easing curves — the ones used for animation timing, which work just as well on a gradient. Pick a **Function**: the families are Sine, Quad, Cubic, Quart, Quint, Expo, Circ, Back, Elastic and Bounce, each with an **In**, an **Out** and an **In Out** form. In is slow to start, Out is slow to finish, In Out is both and symmetric; within the polynomial families, Quint is the sharpest and Quad the gentlest.

Reach for it when a linear ramp is too even: to give a gradient a falloff, a mask a shoulder, or a height the rounded rise of a moulded edge rather than a flat chamfer. **Back** and **Elastic** deliberately overshoot past 0 and 1 — that is what they are for — and **Bounce** settles in four hops.

**Clamp** holds the input inside 0–1, where the curves are defined, and is on by default. Turn it off to run a wider signal straight through the formula; nothing produces an invalid value either way.

## Shaping and finding edges

Five filters work on what is already in the image rather than on its coordinates:

- **Bevel** takes a shape — anything with an inside and an outside — and answers with how far each pixel lies from its edge, up to **Width**, as a height. **Inner** rises inside the shape, **Outer** outside it, and **Both** makes one ramp through the edge, which is what a normal map wants. **Rounded** eases the ramp at both ends instead of running straight; **Threshold** says where the shape's edge is, for a mask that is not already black and white. Feed the result to Height to Normal for a chamfered edge. It tiles, and **Quality** trades speed for a smoother curve — a low setting bevels a circle as a polygon.
- **Sharpen** adds back the detail a blur of **Radius** would take away. **Threshold** leaves flat areas alone, so fine noise is not amplified along with the detail it sits in.
- **Emboss** turns the image into relief lit from **Angle**: the difference across that direction, over mid grey. Grayscale, since an embossed color is neither the color nor the relief. **Distance** is how far apart the two sides are read, in texels, and **Amount** how strongly.
- **Edge Detect** finds edges as a mask. **Sobel** is the usual choice, **Prewitt** weights every neighbour alike, and **Laplacian** finds thin lines rather than slopes. **Width** spaces the samples, so a wider setting finds softer edges rather than needing a blur first; **Amount** and **Threshold** decide what counts as an edge, and **Invert** turns the mask over.
- **Swirl** twists the image about a centre. The turn is **Angle** at the centre and nothing at **Radius**, so the swirl blends into what surrounds it, and **Falloff** shapes how quickly it lets go.

Two more work on color:

- **Dither** gives every pixel a threshold from a Bayer matrix, so a few levels stand for many by mixing them. In **Levels** mode it cuts each channel to **Levels** steps without the bands Color Bands leaves — a flat 50 % grey at two levels is every other pixel white, for a pixel-art or print look. **Subtract Threshold** gives the input less the threshold, ready for a Step to turn into a stippled fade. **Pattern** is the matrix and **Cell Size** makes its cells that many pixels across; the pattern repeats every 2, 4 or 8 cells, so it tiles.
- **Colorspace Conversion** turns a color from one space to another: **RGB** as a picture is stored, **Linear** for the light it stands for, or **HSV** — hue, saturation and value, each 0 to 1. Set **From** and **To**. It replaces the RGB to HSV and HSV to RGB nodes, which open as it.
- **Color Bands** flattens each channel to **Levels** evenly spaced steps — two give black and white, more give flat bands. It was called Posterization; **Posterize** under Math › Advanced snaps numbers of any size to a grid of 1 ÷ Steps rather than spreading bands from black to white.
- **Replace Color** swaps colors within **Tolerance** of **From** for **To**. **Softness** widens the edge of the selection, and **Keep Shading** moves the color rather than flattening it, so highlights and shadows inside the replaced area survive.
