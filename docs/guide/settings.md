---
title: Settings
sidebar_position: 21
description: Editor, appearance, shortcuts, backup and privacy settings.
---

**Edit → Settings…** (<kbd>Ctrl</kbd>+<kbd>,</kbd>) opens the settings in a window of its own, so it can stay open beside the editor. Whatever you change there applies at once in every open window, with one exception noted below. Settings are kept in a file of their own on your computer, shared by every copy of the editor you have running: open a second copy for a second project and it starts with your settings, and a change made in one reaches the others.

- **Editor** — snapping to the grid, the wire style, how node thumbnails are shown and whether the Inputs panel is shown. These are the editor's own, not the material's; each material keeps its own settings and presets. **Autosave for recovery** sets how often a copy of unsaved work is kept for after a crash — every 1, 2, 5 or 10 minutes, or off (see Saving, opening and exporting).
- **Appearance** — the theme. **Dark** and **Light** ship with the editor and cannot be changed; every color in them can still be edited, and the first edit copies the theme and carries on in the copy, so the original is always there to go back to. A copy of a theme only stores the colors you change, so everything you leave alone keeps following the theme it was built on — **Built on** chooses which of the two that is. **Duplicate**, rename, **Delete**, and **Export theme… / Import theme…** to move one between machines or pass it to someone else. Every open window follows a color as you change it.
- **Shortcuts** — every command and the keys that reach it. Click a key, press the combination you want, and it is bound; <kbd>Escape</kbd> stops recording without changing anything. A combination already used by another command is refused and says which one has it, so nothing loses its key without you knowing. The arrow beside a row puts that command back to its default, **Reset all to defaults** does the lot, and **Export keys… / Import keys…** carry them as a file of their own. The graph's own controls — the node menu, nudging with the arrows, <kbd>Alt</kbd>-click to disconnect a wire — are fixed and are not listed.
- **Backup** — every setting as one file: the editor's own, the shortcuts, your themes and the 3D view's environment. It holds no project and no material — those are saved with the project. Importing one applies the settings it carries and leaves the rest alone.

Settings files say what they hold, so importing the wrong one tells you rather than doing nothing. A file of everything also counts as a file of shortcuts or of a theme: **Import keys…** and **Import theme…** will take the part they are about out of it.
