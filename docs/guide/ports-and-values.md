---
title: Ports and values
sidebar_position: 4
description: What port and wire colors mean, and the range of values a node carries.
---

## Port colors

Port and wire colors show what a signal carries: **gray** for grayscale, **green** for two channels (RG), **yellow** for color (RGB) and **purple** for color with alpha (RGBA), **teal** for integers, **red** for booleans, **pink** for splines — curves rather than an image, which connect only to each other — **indigo** for 2D signed distance fields (2D SDF), which connect to grayscale both ways, **bronze** for matrices — one 2 × 2, 3 × 3 or 4 × 4 matrix for the whole image rather than an image, which connect only to each other — and **cream** for text, **blue** for fonts and **orange** for drawings, which run from a material's input to the setting a node exposes for it. Many filters adapt: two grayscale inputs give a grayscale result. The **Conditional** nodes pass one of their inputs through untouched, so they keep its type — two integers give an integer, two booleans a boolean, two SDFs an SDF, and mixed types the widest of them; **If** picks In 1 where its boolean Condition is true and In 2 where it is false, and the comparing If nodes do the same by Value 1 against Value 2; with nothing wired to In 1 and In 2, any of them gives the condition itself, as a boolean. Click the bar at the bottom of a node to reveal its individual channels, and drag from those to use one channel alone. A material used as a node has no such bar: it already gives one port per channel, so take those apart with a **Separate** node where you need to.

## Values and range

A node carries values, not just colors: they may be negative, and they may go far above 1. Anything between about −65504 and 65504 survives while editing, and full-float exports (EXR 32-bit) keep more. Previews and 8-bit formats show the 0–1 range, so a value outside it looks black or white in a thumbnail while remaining exact for the nodes reading it.
