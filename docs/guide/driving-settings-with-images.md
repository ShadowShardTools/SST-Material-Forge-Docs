---
title: Driving settings with images
sidebar_position: 8
description: Letting a setting vary across the texture by connecting a map to it.
---

Many settings can vary across the texture instead of being one value everywhere — a noise amplitude that fades out, a blend opacity painted by a mask, a shape radius that grows along a gradient. Settings that support this have a plug button beside them in Properties:

1. Click the plug to show that setting's input on the node, listed under the thumbnail.
2. Connect a grayscale image to it.
3. The image **multiplies** the slider value pixel by pixel: white keeps the slider value, black makes it zero. Set the slider to the largest value you want.

Click the plug again to hide the input; if it is connected, the wire is removed too. Whole-number and on/off settings, such as Scale, Octaves, tile counts or Clamp, take the connected value instead of multiplying it: it is rounded (and kept within the slider's range) or read as on above 0.5. So do the settings of the Math nodes — a Clamp's Min, a Step's Edge, a Rotate Vector's Angle — which are numbers in their own right: the map is the value, so a Min of 0 can be driven as well as any other. The input's tooltip says which it does. A map that varies across the image tears patterns whose grid it sets.

Every setting of the **Text** and **SVG** nodes has a plug too, and it shows a port the same way, but that port takes a material's input rather than an image — these nodes are drawn before any image exists — and sets the setting to what that input is set to (see *Material settings and presets*). Only an **Input** node can be wired to one.
