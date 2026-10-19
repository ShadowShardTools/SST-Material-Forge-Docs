---
title: Placing things by hand
sidebar_position: 11
description: The 2D View frame for UV Transform, Normal UV Transform, Text, SVG and Crop.
---

Select a **Perspective Pin** and the 2D View shows its four corners: drag one to pin it, drag inside to move the whole quad, double-click to put it back over the whole image, and hold Shift to snap.

Select a **UV Transform**, a **Normal UV Transform**, a **Text** node, an **SVG** node or a **Crop** and the 2D View puts a frame around it, the way a free transform works in an image editor. The frame is where the thing actually is, so what you see is what the node is doing (a Text or SVG node whose size, offset or rotation a material's input sets has none, since the input decides where it is):

- **drag inside** to move it,
- **drag a corner** to resize it about the centre — on either transform the two axes follow the pointer separately, so a corner can stretch as well as scale; on a Text node the corner sets the type size, so the letters are re-drawn at it rather than stretched, and on an SVG the frame keeps the drawing's own shape,
- **drag an edge** — the smaller handle in the middle of a side — to move that one side and leave the rest exactly as they were. The side handles appear on the two transforms and on Crop, which are the nodes whose axes are set separately; they belong to the rectangle rather than to the screen, so on a turned one the handle that widens it is the one on its turned side rather than the one nearest the right of the view,
- **drag the knob** on the line above the centre to turn it.

**Normal UV Transform** gets the same frame as **UV Transform**, and it means the same thing — the two read at the same coordinates, so the rectangle is where the normal map lands either way. The difference is what the knob does: turning this one turns the stored vectors with the image, so the relief stays lit from the direction it now faces.

A **Crop** has the same handles and differs in what they mean. Its corners and edges move the side they are on and pin the one opposite, rather than resizing about the centre, because a crop is four edges rather than a size. Its knob turns the rectangle about its own centre, so a crop can follow something that is not square to the image; Left, Right, Top and Bottom describe the rectangle *before* it is turned, which is why widening a turned crop moves Top and Bottom as well. And while its frame is up the 2D View shows the node's **input** rather than its output — the footer says so — because a crop's output cannot show where its edges are: it *is* where its edges are, and a stretched one fills the frame however they are set. Drawn over what it is cropping from, the rectangle sits on the content it selects, the way a crop tool works anywhere else.

Hold <kbd>Shift</kbd> while dragging to snap: eighths for the position, 15° for the angle, quarters for the scale. <kbd>Escape</kbd> during a drag abandons it and puts back what you started from, and each drag is a single step of undo however many settings it moved. A double-click inside the frame clears the transform altogether.

The settings in Properties are the same values and stay in step, so use whichever suits — the frame to find a placement, the numbers to say it exactly. With **Tile 3×3** on, the frame — and a curve's points — sit on the middle tile, with the repeats around it, so something meant to tile is placed where it meets its own copies. Enlarge the image far enough and its corners leave the view along with it; zoom the 2D View out with the wheel and they come back.
