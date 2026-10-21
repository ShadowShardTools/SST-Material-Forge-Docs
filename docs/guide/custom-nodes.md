---
title: Writing your own nodes
sidebar_position: 7
description: Custom nodes written in code — making, importing and sharing them, how one declares its inputs, controls and passes, and the language they are written in.
---

When no node does what you need, write one. A custom node is a short piece of code in a language close to HLSL: it says what the node takes, what controls it shows and how each pixel of its output is worked out. It runs on the GPU like every other node, and its file is plain text with the extension `.sstmfsl`.

1. Right-click **Functions** in the Explorer and choose **Create Node**. A **Code** panel opens beside the graph with a small working node in it: one input, two controls, one output.
2. Edit the code. Each pause in typing compiles it again, and every graph using the node updates. The line under the code says how it went: **Compiled**, with the number of passes and outputs, or the errors, each with its line and column — click one to go there. Problems are also underlined in the code, with a marker beside the line.
3. Use the node like any other: pick it in the node menu under **Custom**, or drag it from the Explorer onto the canvas. Its inputs, outputs and controls are the ones the code declares, and change when the code does.

While the code does not compile, its nodes keep running the last version that did, so a graph does not go black in the middle of a word. A node whose code has never compiled shows its first error instead of an image.

- **Import Nodes…** (right-click **Functions**) adds `.sstmfsl` files to the package; **Export Node…** (right-click the node) writes one. A file that does not compile is imported all the same, to be fixed in the editor.
- **Save to My Library** keeps a node outside any project. Library nodes are offered in every project, under **Custom › My Library**; using one copies it into the project, so a project always carries the nodes it uses and opens the same on another computer. On the desktop the library is a folder of `.sstmfsl` files in your Documents, under SST Material Forge › Nodes — **Open My Library Folder** shows it — and files put there by hand are offered too.
- A node's code is saved with the project. The Code panel keeps its own undo while you type; deleting a node's code from the Explorer leaves the nodes using it in place, saying their code is gone, until you undo.

## Declaring a node

Everything outside a function declares the node. A declaration is marked with an attribute in square brackets, and the name after the type is how the code refers to it.

```hlsl
[Node("Ripple", Category = "Distort", Description = "Rings spreading from a point.")]

[Input("In")] Texture2D<float4> Source;
[Input("Mask", Default = 1)] Texture2D<float> Mask;
[Param("Frequency", 1, 64)] float Frequency = 12;
[Param("Centre")] float2 Centre = float2(0.5, 0.5);
[Color("Tint")] float3 Tint = float3(1, 0.9, 0.8);
[Toggle("Invert")] bool Invert = false;
[Option("Mode", "Add", "Multiply")] int Mode = 0;

static const float TAU = 6.2831853;

[Output("Out")] float4 Main(float2 uv) {
    float d = distance(uv, Centre);
    float push = sin(d * Frequency * TAU) * 0.01 * Mask.Sample(uv);
    float4 c = Source.Sample(uv + normalize(uv - Centre + 1e-5) * push);
    c.rgb = Mode == 0 ? c.rgb + Tint * 0.1 : c.rgb * Tint;
    if (Invert) c.rgb = 1 - c.rgb;
    return c;
}
```

| Attribute | On | Gives the node |
| --- | --- | --- |
| `[Node("Name", Category = "…", Description = "…")]` | nothing — it stands alone, usually first | Its name in the menu and on the node, the heading it is listed under inside **Custom**, and the text shown when you point at it. All optional: without a name the node is called whatever its entry in the Explorer is. |
| `[Input("Label", Default = …)]` | `Texture2D<float>`, `<float2>`, `<float3>` or `<float4>` | An input port: grayscale, two-channel, RGB or RGBA. `Default` is what it reads with nothing connected — a number, or `float4(…)`. |
| `[Param("Label", min, max, Step = …, Group = …)]` | `float`, `int`, `uint`, or `float2`–`float4` | A slider over that range, or a slider per component for a vector. The value after `=` is the default. |
| `[Color("Label")]` | `float3` or `float4` | A color picker; a `float4` adds an alpha slider. |
| `[Toggle("Label")]` | `bool` | A checkbox. |
| `[Option("Label", "First", "Second", …)]` | `int` | A dropdown; the code reads the chosen one's position, from 0. |
| `[Output("Label")]` | a function taking `float2 uv` | An output port, drawn by that function: see Passes, below. |
| `[Pass]`, `[Pass(Repeat = …, From = …)]` | a function taking `float2 uv` | A step drawn for later functions to read: see Passes, below. |

Inputs, parameters and `static const` values are read-only. Any other global is an error: what it would hold is not clear on a GPU, where every pixel runs at once. A node that reads an input or a pass also gets the **Sampling** and **Filtering** settings every image node has, deciding what lies past the edge of an image and whether it is read smoothly.

## Passes

A function marked `[Output]` or `[Pass]` is drawn once for every pixel. It is handed `uv`, the pixel's position from 0 to 1 across the image, and returns its value there: a `float`, `float2`, `float3` or `float4`, which is also the kind of port an output gets.

- **Outputs** are the node's results. A node has at least one; with several, only those something reads are drawn — except the first, which is always drawn.
- **Passes** are steps between. A pass is read like an input, by its function's name: `Blurred.Sample(uv)`. A pass or output can read the inputs and the passes written **above** it, never one below.
- **Repeating passes**: `[Pass(Repeat = 8)]` draws a pass eight times, each round reading the one before by its own name; `Repeat` can also name an `int` parameter, so the count is a slider. The first round reads `From` — another pass — or black without it. `Iteration` is the round being drawn, from 0. A pass repeats at most 256 times.

```hlsl
[Param("Rounds", 1, 32)] int Rounds = 8;

[Pass] float Seeds(float2 uv) { return hash(int(uv.x * 64), int(uv.y * 64), 7) > 0.98 ? 1 : 0; }

[Pass(Repeat = Rounds, From = Seeds)] float Grown(float2 uv) {
    float best = Grown.Sample(uv);
    for (int i = 0; i < 4; i++) {
        float2 step = float2(i == 0 ? 1 : i == 1 ? -1 : 0, i == 2 ? 1 : i == 3 ? -1 : 0);
        best = max(best, Grown.Sample(uv + step * TexelSize) * 0.97);
    }
    return best;
}

[Output("Out")] float Main(float2 uv) { return Grown.Sample(uv); }
```

## The language

The language is HLSL's, as far as a node needs it, with what a node cannot use left out.

- **Types**: `bool`, `int`, `uint`, `float` and their vectors (`float2`, `int3`, …), matrices `float2x2` to `float4x4`, arrays of a fixed size, and `struct`s. `half` and `double` are read as `float`.
- **Statements**: `if`/`else`, `for`, `while`, `do … while`, `switch` (each case ends with `break` or `return`), `break`, `continue`, `return`, and the usual operators, including `?:`, swizzles such as `c.rgb` or `p.yx`, and writing to them: `c.rg = …`. Every loop stops after 4096 rounds, so a mistake cannot hang the GPU.
- **Functions** of your own can take and return any type, overloads included, and can read the node's inputs and parameters. They cannot call themselves: the GPU has no recursion.
- **Conversions** follow HLSL: a number spreads over a vector (`float3 c = 0.5;`), an `int` becomes a `float` where one is needed, and a longer vector given where a shorter is wanted keeps its first components — which is allowed, and warned about.
- **Matrices** multiply as in HLSL: `mul(M, v)` treats `v` as a column, `mul(v, M)` as a row, and `float2x2(a, b, c, d)` fills rows first.
- **Reading images**: `T.Sample(uv)` reads smoothly between pixels, `T.SamplePoint(uv)` reads the nearest pixel, and `T.Load(int2(x, y))` reads one pixel by its number. Positions past the edge follow the node's **Sampling** setting.
- **Built-in values**: `Resolution` (the image's width in pixels), `TexelSize` (one pixel, as a distance in `uv`) and `Iteration` (the round of a repeating pass).
- **Built-in functions**: HLSL's — `abs`, `sin`, `cos`, `tan`, `atan2`, `pow`, `exp`, `log`, `sqrt`, `rsqrt`, `floor`, `ceil`, `frac`, `fmod`, `min`, `max`, `clamp`, `saturate`, `lerp`, `step`, `smoothstep`, `dot`, `cross`, `length`, `distance`, `normalize`, `reflect`, `refract`, `mul`, `transpose`, `determinant`, `any`, `all`, the bit functions and more — and a few of the editor's own:

| Function | Gives |
| --- | --- |
| `luminance(rgb)` | Brightness, as the editor's grayscale conversions weigh it. |
| `srgbToLinear(rgb)`, `linearToSrgb(rgb)` | A color between the two encodings. |
| `rgbToHsv`, `hsvToRgb`, `rgbToHsl`, `hslToRgb` | A color between RGB and hue, saturation and value or lightness, each from 0 to 1. |
| `hash(x, y, seed)` | A random number from 0 to 1 for three whole numbers: the same numbers always give the same result. |
| `noise(p, period, seed)` | Smooth gradient noise from about −1 to 1 at `p`, repeating every `period` units — so `noise(uv * 8, 8, seed)` tiles. |

Left out, because a node cannot use them: `ddx`, `ddy` and `fwidth` (sample one pixel away instead), `discard` and `clip` (every pixel is written), `out` and `inout` parameters, `#include` and `#define`, and the older `tex2D`. Each says so, and what to do instead, where it is written.
