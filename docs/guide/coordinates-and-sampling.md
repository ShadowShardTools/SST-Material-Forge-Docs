---
title: Coordinates and sampling
sidebar_position: 10
description: Bending texture coordinates with UV and UV Transform, and what happens past the edge of an image.
---

Every node generates over the texture's own coordinates, so there is nothing to wire for the ordinary case. When you do want to bend them, the **UV** node gives them to you as a signal — U in red, V in green, with V up — and a **UV Transform** reads its input at whatever coordinates reach its UV port. Between the two, Math and the warps shape the coordinates: add a Vector 2 to slide the image, multiply to tile it, feed a noise in to wobble it. Leave UV unconnected and the transform simply scales, rotates and offsets as before. **Scale X** and **Scale Y** are the image's size — 2 is twice as big, as Scale is everywhere in the app — and are separate, so a square texture can be stretched into a brick, a plank or a tile without a second node; both work along the image's own axes rather than the output's, so a turned stretch stays a stretch instead of shearing. **Rotation** turns it clockwise, as every rotation does. To repeat an image a whole number of times, use **Tile It**.

**Pixel Exact** — on both UV Transform and Normal UV Transform — constrains the transform to one that only rearranges texels: the rotation goes to the nearest quarter turn, each scale to a whole ratio, and the offset to a whole number of texels, and the result is read without blending. Use it when the thing being moved has to stay as crisp as it arrived, such as a mask or a pixel-art tile. It is worth more on a normal map than it looks: the rotation is a quarter turn by then, so the stored vectors are swapped and negated rather than averaged, and every direction that comes out is one that went in.

Every node that reads a texture carries two settings of its own, under **Sampling**:

| Setting | Choices | What it decides |
| --- | --- | --- |
| Sampling | Repeat, Black, White, Transparent | What is there past the edge of the image. Repeat wraps around, which is what keeps a tileable texture tileable through a filter; the other three say the image has an edge and outside it is that color. |
| Filtering | Nearest, Linear | What happens between texels. Linear blends the four around the point; Nearest picks the one the point falls in, which keeps a mask or a pixel-art source hard-edged where a blend would soften it. |

Reach for a border whenever a node is going to leave part of its frame empty — a UV Transform scaling an image down into the middle, a rotation that corners the frame, a crop that keeps its rectangle in place. Transparent is usually the one you want, since it leaves the alpha empty for whatever composites it next.

Both default to what the node did before they existed — Repeat and Linear — so nothing changes until you change it.
