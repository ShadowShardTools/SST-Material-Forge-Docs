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

The Effects work on what is already in the image rather than on its coordinates. Every size they take — a radius, a width, a distance — is a share of the image's width, so a preview and a bake look alike; only Denoise and FXAA count in pixels, since what they repair is pixel-sized. Every angle turns clockwise from pointing right, as everywhere else in the app.

- **Blur** softens over **Radius**. **Gaussian** is the usual choice and **Box** the plainest; **Kawase** is a quick stand-in for a wide gaussian; **Bilateral** keeps edges by blurring only across similar values; **Anisotropic** streaks along **Angle**. **Slope** smears up the slope of a map, and **Flow** along the directions of one — an angle map, or a vector map in red and green as Spline Direction Field draws — curving with it, for brushed metal, hair and wood grain. **Radial** zooms towards **Centre** or spins about it; **Median** removes specks and keeps edges; **Map Driven** blurs each pixel by its own amount.
- **Sharpen** adds back the detail a blur of **Radius** would take away. A small radius crisps fine texture; a large one lifts the local contrast of whole shapes. **Threshold** leaves flat areas alone, so fine noise is not amplified along with the detail it sits in.
- **Morphology** grows or shrinks what is bright, by **Radius**. **Dilate** swells bright shapes and closes dark gaps; **Erode** thins them; **Open** removes bright specks and threads narrower than Radius and leaves larger shapes as they were; **Close** fills dark pits and cracks the same way. It works on heights and colors as well as masks, each channel on its own, and **Round** reaches equally far every way.
- **Glow & Shadow** makes an **Outer Glow**, **Inner Glow**, **Drop Shadow** or **Inner Shadow** from a shape — for decals, labels, stickers and raised lettering. **Radius** is how far it reaches and **Spread** how much of that is solid; a shadow falls **Distance** away towards **Angle**. **Out** is the effect as a layer of **Color**, ready to blend under or over the shape, and **Mask** the effect alone.
- **Bevel** takes a shape — anything with an inside and an outside — and answers with how far each pixel lies from its edge, up to **Width**, as a height. **Inner** rises inside the shape, **Outer** outside it, and **Both** makes one ramp through the edge, which is what a normal map wants. **Profile** shapes the rise: **Linear** for a chamfer, **Smooth**, **Rounded** for a bullnose and **Cove** for a hollow. The distance is exact at any Width, so narrow gaps — mortar, cracks between tiles — bevel as cleanly as wide ones. **Threshold** says where the shape's edge is, for a mask that is not already black and white. Feed the result to Height to Normal for a chamfered edge. It tiles.
- **Emboss** reads the image as a height and lights it from **Angle**: slopes facing the light brighten and slopes facing away darken, over mid grey. **Depth** is the one Height to Normal takes, so the two agree, and **Distance** is how far apart the slope is measured. Grayscale, since an embossed color is neither the color nor the relief.
- **Edge Detect** finds edges as a mask. **Sobel** is the usual choice, **Prewitt** weights every neighbour alike, and **Laplacian** finds thin lines rather than slopes. **Width** spaces the samples, so a wider setting finds softer edges rather than needing a blur first. A hard edge from black to white reads 1, times **Amount**; **Threshold** decides what counts as an edge, and **Invert** turns the mask over.
- **Kuwahara** smooths without crossing edges, which looks painted; **Radius** is the brush.
- **Swirl** twists the image about a centre. The turn is **Angle** at the centre and nothing at **Radius**, so the swirl blends into what surrounds it, and **Falloff** shapes how quickly it lets go.
