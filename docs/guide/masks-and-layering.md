---
title: Masks and layering
sidebar_position: 15
description: Distance fields, polar transforms, blending by height, and the masks a height or normal map gives.
---

## Distance, polar and blending

**Distance** measures how far every pixel is from the nearest edge of a mask, which makes it the node other things get built out of. **Grow** pushes the mask outwards, fading from 1 inside it to 0 at Distance away; **Shrink** eats it inwards from its own edge. Threshold the result and you have dilate and erode, but the gradient is usually worth more than the threshold: it follows the shape instead of rounding its corners off the way a blur does, which is what makes it the right way to bed one thing into another. **Signed** gives the whole field at once with the edge sitting at a half — put a Levels or a Histogram Scan after it and the outline slides in and out without anything being solved again, so an outline, a border and an inset all come from one node.

**Polar Transform** bends a flat image round into a disc, or flattens a disc back out. It is worth more than it sounds, because it is not really one effect: a horizontal ramp becomes a sweep, Bricks becomes a cobbled ring, Tile It becomes a rosette. **Wrap** reads the input's x as an angle and its y as a radius; **Unwrap** does the reverse. The two are exact inverses, so the useful trick is to unwrap a disc, work on the result as an ordinary rectangle where filters and tiling behave themselves, and wrap it back. **Repeat** sends the image round more than once and **Angle** turns the whole thing.

**Blend** composites a foreground over a background. **Blending Mode** offers Normal, which lays the foreground on, and the familiar layer modes, with the background as the base and the foreground as the layer blended onto it: Burn, Darken, Difference, Dodge, Divide, Exclusion, Hard Light, Hard Mix, Lighten, Linear Burn, Linear Dodge (Add), Linear Light, Linear Light Add Sub, Multiply, Negation, Overlay, Pin Light, Screen, Soft Light, Subtract and Vivid Light. The result is kept between 0 and 1. **Mask** is where per-pixel control lives — black leaves the background showing, white lets the blend through — and **Opacity** does the same for the whole image at once; the two multiply. Opacity is a slider rather than something you can drive with a map, because a map on it would be the Mask input reached by a less obvious route.

**Height Blend** blends two maps by which of them is higher rather than by mixing them. A plain blend gives the average of two surfaces, which is a third surface that is neither — gravel mixed half and half with a pavement is a soft grey nothing. Here the higher of the two wins wherever it is higher, so the gravel settles into the gaps and the pavement stands proud. Wire the heights to **Height A** and **Height B** to decide the contest with maps other than the ones being blended; leave them and each map is its own height. **Opacity** tips the contest rather than fading between the two — it raises one side's height so that side wins in more places, and the two still meet along a contour — where **Mask** does not enter the contest at all and simply decides where the result of it is used, fading back to A where it is black. Painting a layer on in places is the mask; how much of it shows through where it is on is the opacity. **Transition** is how sharply the two meet. Take the **Mask** output and blend the base color, roughness and normal of a layered material through it, so every channel makes the same decision instead of each working it out again.

## Masks from height

Connect a height map to **Curvature** or **Ambient Occlusion** to derive the masks most materials need:

- **Curvature** finds ridges and cavities at a chosen **Radius**. **Combined** is mid-gray on flat areas, lighter on edges and darker in creases; **Convex** and **Concave** give just the edges (for wear) or just the cavities (for dirt).
- **Ambient Occlusion** darkens places the surrounding relief hides from the sky, such as grooves and the foot of raised shapes. **Depth** sets how tall the height map stands; **Quality** trades speed for smoothness. Feed the result to the Ambient Occlusion output, or use it as a dirt mask.

## Reflectance masks

**Fresnel** turns a normal map into how much the surface reflects at each pixel, viewed straight on: low where it faces you, rising towards 1 where it turns away. **Power** sharpens that falloff, and **IOR** sets the strength face-on — glass, 1.52, gives the familiar 0.04. The **IOR** node holds the indices of common materials — air 1.0, water 1.333, glass 1.52, diamond 2.417 and the rest — and can be wired into Fresnel's IOR input, where it replaces the setting; for any other value, use a Constant. Use the result as a mask for edge highlights, wet rims, or to drive roughness and metallic.
