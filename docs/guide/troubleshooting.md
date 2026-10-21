---
title: Troubleshooting
sidebar_position: 21
description: What to do when something goes wrong, finding your version, and what is recorded.
---

- **"SST Material Forge needs WebGPU"** at startup — no graphics card the editor can use was found. The screen says what it found and what to try on your system; usually it is the graphics driver. On Linux, WebGPU needs a working Vulkan driver: `vulkaninfo --summary` should list your GPU. If the window itself comes up black on Linux, start the editor with `--no-vulkan` to rule out the driver's Vulkan support.
- **"Your graphics card is not being used"** — the only GPU on offer is a software renderer, the processor imitating a graphics card. **Continue anyway** works, very slowly; fixing the driver is the real cure.
- **"Your GPU is not drawing correctly"** — the editor draws a small test image when it starts, and it came back wrong. This is a driver fault; update the driver. If only compute shaders fail the test, the editor starts anyway, says so, and uses a slower way of drawing.
- **"The GPU stopped responding"** — the graphics driver reset. Your work is saved; reload the editor and choose **Restore**.
- **"Something went wrong"** — the editor hit an unexpected error. Your work is saved; reload and restore it. **Copy error details** copies information for a bug report.
- **A node shows a red badge** — it could not be evaluated. Select it; the Properties panel shows the reason.

To report a problem, use **Help → Report a Problem…** and copy the details, then open an issue on the [issue tracker](https://github.com/ShadowShardTools/SST-Material-Forge-Docs/issues) — **Help → Issues & Feature Requests** — with the details and a description of what you were doing. Search it first: someone may have reported it already. Ideas for new nodes and features are welcome there too. Issues are public, so only attach what you are happy to share.

## Which version am I on?

**Help → About SST Material Forge** shows the version, the graphics card WebGPU is running on (where the browser names it) and, on the desktop, the Electron and Chromium it is built with. **Copy build details** puts all of it on the clipboard — include it when you report a problem, since the first question is always which build you are running. The same dialog lists the open-source software included in the application, with each licence.

## Privacy

SST Material Forge collects nothing. It has no analytics, no usage statistics, no crash reporting and no account, and it makes no connection to any server of ours. There is no setting for any of this, because there is no code that could send anything.

When something goes wrong, the problem is written to a log kept in memory while the editor is open — **Help → Privacy & Diagnostics…** and **Help → Report a Problem…** show it — and the log is gone when the editor closes. It leaves your computer only if you copy it and paste it somewhere yourself, such as an issue. What you copy holds the application and GPU versions, your editor settings and the logged messages: no part of a project, though a message may name a file that was involved.

Links to the documentation and the issue tracker open in your browser. Steam collects data of its own when you buy and run the application; that is Valve's, under Valve's privacy policy. The full privacy policy is under **Help → Terms, Privacy and Refunds…**.
