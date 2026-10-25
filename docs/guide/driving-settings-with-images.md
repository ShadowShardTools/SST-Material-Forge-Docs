---
title: Driving settings with images
sidebar_position: 8
description: Letting a setting vary across the texture by connecting a map to it.
---

Many settings can vary across the texture instead of being one value everywhere — a noise amplitude that fades out, a blend opacity painted by a mask, a shape radius that grows along a gradient. Settings that support this have a plug button beside them in Properties:

1. Click the plug to show that setting's input on the node, listed under the thumbnail.
2. Connect an image to it — a mask, a noise, a Constant, a material's input.
3. The image **sets** the setting pixel by pixel, in the setting's own units: where it is 45, a Hue Shift turns the hue 45° and a Rotation turns 45°; where it is 0.2, an Opacity is 0.2. Properties shows *Set by the wired map* in place of the slider. To scale a mask up to the values you want, pass it through a Math node — Multiply, or Remap from 0–1 to the range.

Click the plug again to hide the input; if it is connected, the wire is removed too. Whole-number and on/off settings, such as Scale, Octaves, tile counts or Clamp, are rounded (and kept within the slider's range) or read as on above 0.5. A map that varies across the image tears patterns whose grid it sets. A material's **Float** input wired to the plug is one value everywhere, so it sets the setting outright — and in the Viewer, to whatever the input is set to there.

Every setting of the **Text** and **SVG** nodes has a plug too, and it shows a port the same way, but that port takes a material's input rather than an image — these nodes are drawn before any image exists — and sets the setting to what that input is set to (see *Material settings and presets*). Only an **Input** node can be wired to one.
